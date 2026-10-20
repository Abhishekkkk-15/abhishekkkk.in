import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET =
  process.env.JWT_SECRET || "fallback-super-secret-jwt-key-minimum-32-chars-long";
const encodedKey = new TextEncoder().encode(JWT_SECRET);
const AUTH_COOKIE_NAME = "portfolio_admin_token";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  let isAuthenticated = false;
  if (token) {
    try {
      await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // Protecting /admin/editor UI route
  if (pathname.startsWith("/admin/editor")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protecting admin API mutation/data routes at the Edge
  if (
    pathname.startsWith("/api/admin/portfolio") ||
    pathname.startsWith("/api/admin/auth/change-password")
  ) {
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // If already logged in, redirect away from /admin/login to /admin/editor
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/editor", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/portfolio/:path*",
    "/api/admin/auth/change-password",
  ],
};
