import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";
import {
  verifyPassword,
  createSessionToken,
  AUTH_COOKIE_NAME,
} from "@/lib/auth";
import { ensureInitialAdminUser } from "@/lib/portfolioService";
import {
  checkLoginRateLimit,
  recordFailedLogin,
  resetLoginRateLimit,
  getClientIp,
} from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // 1. Check Rate Limit (Anti Brute-Force)
  const rateLimitStatus = checkLoginRateLimit(ip);
  if (!rateLimitStatus.allowed) {
    const minutesLeft = Math.ceil((rateLimitStatus.retryAfterSeconds || 60) / 60);
    return NextResponse.json(
      {
        error: `Too many failed login attempts. For security, your IP has been temporarily locked out. Please try again in ${minutesLeft} minute(s).`,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitStatus.retryAfterSeconds || 900),
        },
      }
    );
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();
    await ensureInitialAdminUser();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const { remainingAttempts } = recordFailedLogin(ip);
      return NextResponse.json(
        {
          error:
            remainingAttempts > 0
              ? `Invalid credentials. (${remainingAttempts} attempt(s) remaining before temporary lockout)`
              : "Invalid credentials. Maximum attempts reached. Account locked for 15 minutes.",
        },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      const { remainingAttempts } = recordFailedLogin(ip);
      return NextResponse.json(
        {
          error:
            remainingAttempts > 0
              ? `Invalid credentials. (${remainingAttempts} attempt(s) remaining before temporary lockout)`
              : "Invalid credentials. Maximum attempts reached. Account locked for 15 minutes.",
        },
        { status: 401 }
      );
    }

    // Reset rate limit on successful authentication
    resetLoginRateLimit(ip);

    const token = await createSessionToken({
      userId: user._id.toString(),
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      email: user.email,
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
