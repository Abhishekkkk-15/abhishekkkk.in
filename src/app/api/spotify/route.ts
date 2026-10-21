import { NextResponse } from "next/server";
import { getSpotifyStatus } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const status = await getSpotifyStatus();
    return NextResponse.json(status, {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch Spotify status" },
      { status: 500 }
    );
  }
}
