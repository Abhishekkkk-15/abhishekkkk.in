import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "<h1>Error: SPOTIFY_CLIENT_ID is not configured in .env.local</h1>",
      { headers: { "Content-Type": "text/html" }, status: 400 }
    );
  }

  // Spotify requires explicit 127.0.0.1 IP literal instead of "localhost"
  const host = req.headers.get("host") || "127.0.0.1:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const protocol = isLocal ? "http" : "https";
  const cleanHost = host.replace("localhost", "127.0.0.1");
  const redirectUri = `${protocol}://${cleanHost}/api/spotify/callback`;

  const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
  ].join(" ");

  const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
  }).toString()}`;

  return NextResponse.redirect(authUrl);
}
