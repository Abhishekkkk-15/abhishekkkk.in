import { NextRequest, NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolioService";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getPortfolioData();
    const activeTheme = data.activeTheme || "terminal";
    const matrixTopHeadline = data.profile?.matrixTopHeadline || "BUILD. TRAIN.";
    const matrixBottomHeadline = data.profile?.matrixBottomHeadline || "DEPLOY. SCALE.";

    const res = NextResponse.json({
      activeTheme,
      matrixTopHeadline,
      matrixBottomHeadline,
    });

    // Cache lightly and set cookie for client / SSR sync
    res.headers.set("Cache-Control", "public, s-maxage=30, stale-while-revalidate=120");
    res.cookies.set("active_theme", activeTheme, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });

    return res;
  } catch {
    return NextResponse.json({
      activeTheme: "terminal",
      matrixTopHeadline: "BUILD. TRAIN.",
      matrixBottomHeadline: "DEPLOY. SCALE.",
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const theme = body?.theme;

    if (["terminal", "playerzero", "industrial", "minimal"].includes(theme)) {
      const res = NextResponse.json({ success: true, theme });
      res.cookies.set("active_theme", theme, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
      return res;
    }

    return NextResponse.json({ error: "Invalid theme requested" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Failed to update theme preference" }, { status: 500 });
  }
}
