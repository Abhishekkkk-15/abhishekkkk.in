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

function getCredentials() {
  return {
    clientId: process.env.SPOTIFY_CLIENT_ID || "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN || "",
    lastfmUser:
      process.env.LAST_FM_USERNAME ||
      process.env.LASTFM_USERNAME ||
      "abhishekkkk-15",
    lastfmKey:
      process.env.LAST_FM_API_KEY ||
      process.env.LASTFM_API_KEY ||
      process.env.LAST_FM_KEY ||
      "",
  };
}

async function getLastFmStatus(): Promise<SpotifyTrackData | null> {
  const { lastfmUser, lastfmKey } = getCredentials();

  if (!lastfmUser || !lastfmKey) {
    return null;
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${encodeURIComponent(
      lastfmUser
    )}&api_key=${encodeURIComponent(lastfmKey)}&format=json&limit=1`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      console.warn("Last.fm fetch notice:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    const rawTrack = data?.recenttracks?.track;
    const track = Array.isArray(rawTrack) ? rawTrack[0] : rawTrack;

    if (!track || !track.name) {
      return null;
    }

    const isPlaying = track["@attr"]?.nowplaying === "true";
    const title = track.name || "Unknown Track";
    const artist =
      typeof track.artist === "object"
        ? track.artist?.["#text"] || "Unknown Artist"
        : track.artist || "Unknown Artist";
    const album =
      typeof track.album === "object"
        ? track.album?.["#text"] || ""
        : track.album || "";

    const images = track.image || [];
    const imageObj =
      images.find((img: any) => img.size === "extralarge") ||
      images.find((img: any) => img.size === "large") ||
      images[images.length - 1];
    const albumImageUrl = imageObj?.["#text"] || FALLBACK_TRACK.albumImageUrl;
    const songUrl = track.url || FALLBACK_TRACK.songUrl;

    return {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      configured: true,
    };
  } catch (err) {
    console.error("Last.fm get status error:", err);
    return null;
  }
}

async function getAccessToken(): Promise<string | null> {
  const { clientId, clientSecret, refreshToken } = getCredentials();

  if (
    !clientId ||
    !clientSecret ||
    !refreshToken ||
    refreshToken === "your_refresh_token"
  ) {
    return null;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
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
  // 1. Try Last.fm first if configured (100% free, works for all Spotify users without Premium)
  const lastFmTrack = await getLastFmStatus();
  if (lastFmTrack) {
    return lastFmTrack;
  }

  // 2. Otherwise try direct Spotify Web API (works for Spotify Premium accounts)
  const token = await getAccessToken();

  if (!token) {
    return FALLBACK_TRACK;
  }

  try {
    // Check Currently Playing
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

    // Fall back to Recently Played
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
