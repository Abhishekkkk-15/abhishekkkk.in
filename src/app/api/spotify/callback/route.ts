import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifySessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Only authenticated admins can link Spotify via callback
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return new NextResponse(
      `<div style="font-family: monospace; padding: 30px; background: #0D0D0C; color: #F87171;">
        <h2>Unauthorized</h2>
        <p>You must be logged in as an administrator to authorize Spotify.</p>
        <p><a href="/admin/login" style="color: #38BDF8;">Log in to Admin Portal ↗</a></p>
      </div>`,
      { headers: { "Content-Type": "text/html" }, status: 401 }
    );
  }

  const session = await verifySessionToken(token);
  if (!session || !session.userId) {
    return new NextResponse(
      `<div style="font-family: monospace; padding: 30px; background: #0D0D0C; color: #F87171;">
        <h2>Unauthorized</h2>
        <p>Invalid or expired administrator session.</p>
        <p><a href="/admin/login" style="color: #38BDF8;">Log in to Admin Portal ↗</a></p>
      </div>`,
      { headers: { "Content-Type": "text/html" }, status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  // If the admin visited /api/spotify/callback directly without a code, redirect to /api/spotify/login
  if (!code && !error) {
    return NextResponse.redirect(new URL("/api/spotify/login", req.url));
  }

  if (error || !code) {
    return new NextResponse(
      `<div style="font-family: monospace; padding: 30px; background: #0D0D0C; color: #F87171;">
        <h2>Spotify Authorization Error</h2>
        <p>${error || "No authorization code was returned."}</p>
        <p><a href="/api/spotify/login" style="color: #38BDF8;">Click here to retry Spotify Login ↗</a></p>
      </div>`,
      { headers: { "Content-Type": "text/html" }, status: 400 }
    );
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  // Spotify requires explicit 127.0.0.1 loopback literal instead of "localhost"
  const host = req.headers.get("host") || "127.0.0.1:3000";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");
  const protocol = isLocal ? "http" : "https";
  const cleanHost = host.replace("localhost", "127.0.0.1");
  const redirectUri = `${protocol}://${cleanHost}/api/spotify/callback`;

  if (!clientId || !clientSecret) {
    return new NextResponse(
      `<div style="font-family: monospace; padding: 30px; background: #0D0D0C; color: #F87171;">
        <h2>Configuration Error</h2>
        <p>SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is missing from .env.local</p>
      </div>`,
      { headers: { "Content-Type": "text/html" }, status: 400 }
    );
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || !data.refresh_token) {
      return new NextResponse(
        `<div style="font-family: monospace; padding: 30px; background: #0D0D0C; color: #F87171;">
          <h2>Token Exchange Failed (${res.status})</h2>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>`,
        { headers: { "Content-Type": "text/html" }, status: 400 }
      );
    }

    const refreshToken = data.refresh_token;

    // Automatically update .env.local file with the real refresh token
    const envPath = path.resolve(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      let envContent = fs.readFileSync(envPath, "utf8");
      if (envContent.includes("SPOTIFY_REFRESH_TOKEN=")) {
        envContent = envContent.replace(
          /SPOTIFY_REFRESH_TOKEN=.*/,
          `SPOTIFY_REFRESH_TOKEN=${refreshToken}`
        );
      } else {
        envContent += `\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`;
      }
      fs.writeFileSync(envPath, envContent, "utf8");
    }

    // Set process.env for current running process
    process.env.SPOTIFY_REFRESH_TOKEN = refreshToken;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Spotify Telemetry Connected</title>
          <style>
            body {
              background: #0D0D0C;
              color: #F4F3EF;
              font-family: monospace;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              padding: 24px;
              box-sizing: border-box;
            }
            .card {
              background: #171716;
              border: 1px solid #242422;
              padding: 36px;
              max-width: 640px;
              width: 100%;
              border-radius: 2px;
              box-shadow: 0 16px 40px rgba(0,0,0,0.6);
            }
            h1 { color: #22C55E; font-size: 18px; margin-top: 0; letter-spacing: 0.05em; }
            p { font-size: 13px; line-height: 1.7; color: #BDBBB5; }
            .token-box {
              background: #0D0D0C;
              border: 1px solid #242422;
              padding: 14px;
              font-size: 11px;
              word-break: break-all;
              color: #38BDF8;
              margin: 12px 0 20px 0;
              user-select: all;
            }
            .label { font-size: 11px; text-transform: uppercase; color: #8C8A84; letter-spacing: 0.1em; }
            .btn {
              display: inline-block;
              background: #2563EB;
              color: #F4F3EF;
              text-decoration: none;
              padding: 10px 20px;
              font-size: 11px;
              font-weight: bold;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              border-radius: 1px;
              transition: background 0.2s;
            }
            .btn:hover { background: #1D4ED8; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>✅ SPOTIFY TELEMETRY CONNECTED</h1>
            <p>Your Spotify authorization was successful! Your refresh token has been <strong>authenticated and saved to <code>.env.local</code></strong>.</p>
            
            <div class="label">Your Real SPOTIFY_REFRESH_TOKEN (Save this for Vercel/Production deployment):</div>
            <div class="token-box">${refreshToken}</div>

            <p>Your live playing song and animated equalizer are now active!</p>
            
            <a href="http://127.0.0.1:3000" class="btn">Return to Portfolio ↗</a>
          </div>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err: any) {
    return new NextResponse(
      `<div style="font-family: monospace; padding: 30px; background: #0D0D0C; color: #F87171;">
        <h2>Error: ${err?.message || "Unknown error"}</h2>
      </div>`,
      { headers: { "Content-Type": "text/html" }, status: 500 }
    );
  }
}
