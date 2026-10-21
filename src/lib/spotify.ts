const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN || "";

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

export interface SpotifyTrackData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  configured: boolean;
}

const FALLBACK_TRACK: SpotifyTrackData = {
  isPlaying: false,
  title: "Ambient 1: Music for Airports",
  artist: "Brian Eno",
  album: "Ambient 1",
  albumImageUrl:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=160&auto=format&fit=crop&q=80",
  songUrl: "https://open.spotify.com",
  configured: false,
};

async function getAccessToken(): Promise<string | null> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    return null;
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.warn("Spotify token refresh failed:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data.access_token || null;
  } catch (err) {
    console.error("Spotify getAccessToken error:", err);
    return null;
  }
}

export async function getSpotifyStatus(): Promise<SpotifyTrackData> {
  const token = await getAccessToken();

  if (!token) {
    return FALLBACK_TRACK;
  }

  try {
    // 1. Check Currently Playing
    const nowPlayingRes = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (nowPlayingRes.status === 200) {
      const song = await nowPlayingRes.json();
      if (song && song.item) {
        const isPlaying = song.is_playing === true;
        const title = song.item.name || "Unknown Track";
        const artist =
          song.item.artists
            ?.map((_artist: { name: string }) => _artist.name)
            .join(", ") || "Unknown Artist";
        const album = song.item.album?.name || "";
        const albumImageUrl =
          song.item.album?.images?.[0]?.url || FALLBACK_TRACK.albumImageUrl;
        const songUrl =
          song.item.external_urls?.spotify || FALLBACK_TRACK.songUrl;

        return {
          isPlaying,
          title,
          artist,
          album,
          albumImageUrl,
          songUrl,
          configured: true,
        };
      }
    }

    // 2. Fall back to Recently Played
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (recentlyPlayedRes.status === 200) {
      const recent = await recentlyPlayedRes.json();
      const item = recent?.items?.[0]?.track;
      if (item) {
        const title = item.name || "Unknown Track";
        const artist =
          item.artists
            ?.map((_artist: { name: string }) => _artist.name)
            .join(", ") || "Unknown Artist";
        const album = item.album?.name || "";
        const albumImageUrl =
          item.album?.images?.[0]?.url || FALLBACK_TRACK.albumImageUrl;
        const songUrl = item.external_urls?.spotify || FALLBACK_TRACK.songUrl;

        return {
          isPlaying: false,
          title,
          artist,
          album,
          albumImageUrl,
          songUrl,
          configured: true,
        };
      }
    }

    return {
      ...FALLBACK_TRACK,
      configured: true,
    };
  } catch (err) {
    console.error("Spotify getSpotifyStatus error:", err);
    return FALLBACK_TRACK;
  }
}
