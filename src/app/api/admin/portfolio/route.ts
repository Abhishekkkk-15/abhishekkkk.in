import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { verifySessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";
import { getPortfolioData, updatePortfolioData } from "@/lib/portfolioService";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getPortfolioData();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updatePortfolioData(body);
    revalidatePath("/");
    const res = NextResponse.json({ success: true, data: updated });
    if (updated.activeTheme) {
      res.cookies.set("active_theme", updated.activeTheme, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }
    return res;
  } catch (err: any) {
    console.error("Update portfolio error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to update portfolio" },
      { status: 500 }
    );
  }
}
