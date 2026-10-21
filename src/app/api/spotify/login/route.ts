import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return new NextResponse(
      "<h1>Error: SPOTIFY_CLIENT_ID is not configured in .env.local</h1>",
      { headers: { "Content-Type": "text/html" }, status: 400 }
    );
  }

  const redirectUri = "http://localhost:3000/api/spotify/callback";
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
