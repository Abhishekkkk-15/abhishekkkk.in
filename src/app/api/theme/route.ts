import { NextResponse } from "next/server";
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
