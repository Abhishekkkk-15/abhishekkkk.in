"use client";

import { useEffect, useState } from "react";
import { Music, Radio, ExternalLink } from "lucide-react";
import type { SpotifyTrackData } from "@/lib/spotify";

interface SpotifyNowPlayingProps {
  variant?: "compact" | "editorial";
  className?: string;
}

export default function SpotifyNowPlaying({
  variant = "compact",
  className = "",
}: SpotifyNowPlayingProps) {
  const [data, setData] = useState<SpotifyTrackData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/spotify");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.warn("Could not fetch Spotify status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    // Poll every 30 seconds
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    if (variant === "compact") {
      return (
        <div
          className={`h-7 w-28 bg-[#EBEAE4]/40 border border-[#E2E0D8] animate-pulse ${className}`}
        />
      );
    }
    return (
      <div
        className={`h-20 w-full bg-[#EBEAE4]/40 border border-[#E2E0D8] animate-pulse ${className}`}
      />
    );
  }

  const isPlaying = data?.isPlaying ?? false;
  const title = data?.title || "Ambient Systems";
  const artist = data?.artist || "Spotify";
  const songUrl = data?.songUrl || "https://open.spotify.com";
  const albumImageUrl = data?.albumImageUrl;

  // COMPACT NAVBAR PILL VARIANT
  if (variant === "compact") {
    return (
      <a
        href={songUrl}
        target="_blank"
        rel="noreferrer"
        title={`${isPlaying ? "Now Playing:" : "Recently Played:"} ${title} — ${artist}`}
        className={`group hidden xl:flex items-center gap-2.5 px-2.5 py-1 font-mono text-[10px] tracking-wider border border-[#E2E0D8] hover:border-[#111111] transition-all bg-[#EBEAE4]/40 hover:bg-[#EBEAE4] text-[#111111] max-w-[240px] truncate select-none ${className}`}
      >
        {/* Animated Equalizer Waveform Bars */}
        <div className="flex items-end gap-[2px] h-3.5 w-3.5 shrink-0">
          {isPlaying ? (
            <>
              <span className="w-[2px] bg-[#2563EB] equalizer-bar-1 inline-block" />
              <span className="w-[2px] bg-[#2563EB] equalizer-bar-2 inline-block" />
              <span className="w-[2px] bg-[#2563EB] equalizer-bar-3 inline-block" />
              <span className="w-[2px] bg-[#2563EB] equalizer-bar-4 inline-block" />
            </>
          ) : (
            <Radio size={11} className="text-[#6E6D68]" />
          )}
        </div>

        {/* Text */}
        <div className="truncate flex items-center gap-1.5">
          <span className="text-[#2563EB] uppercase font-medium shrink-0">
            {isPlaying ? "ON AIR" : "AUDIO"}
          </span>
          <span className="text-[#6E6D68] truncate">
            {title} — {artist}
          </span>
        </div>
      </a>
    );
  }

  // EDITORIAL FULL VARIANT (FOR CONTACT / FOOTER / TELEMETRY)
  return (
    <div
      className={`border border-[#E2E0D8] bg-[#EBEAE4]/40 p-4 font-mono text-xs space-y-3 transition-colors hover:bg-[#EBEAE4] ${className}`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between text-[10px] text-[#6E6D68] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5 w-3.5">
              <span className="w-[2px] bg-[#2563EB] equalizer-bar-1 inline-block" />
              <span className="w-[2px] bg-[#2563EB] equalizer-bar-2 inline-block" />
              <span className="w-[2px] bg-[#2563EB] equalizer-bar-3 inline-block" />
              <span className="w-[2px] bg-[#2563EB] equalizer-bar-4 inline-block" />
            </div>
          ) : (
            <Music size={12} className="text-[#6E6D68]" />
          )}
          <span className="text-[#111111] font-medium">
            {isPlaying ? "NOW STREAMING // SPOTIFY" : "RECENT FREQUENCY // SPOTIFY"}
          </span>
        </div>
        <span className="text-[#2563EB]">{isPlaying ? "LIVE" : "ARCHIVED"}</span>
      </div>

      {/* Track details row */}
      <div className="flex items-center gap-3.5 pt-1">
        {albumImageUrl && (
          <div className="w-11 h-11 border border-[#E2E0D8] shrink-0 bg-[#E2E0D8] overflow-hidden">
            <img
              src={albumImageUrl}
              alt={title}
              className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300"
            />
          </div>
        )}

        <div className="min-w-0 flex-1 space-y-0.5">
          <a
            href={songUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-display font-medium text-[#111111] hover:text-[#2563EB] transition-colors truncate block flex items-center gap-1 group"
          >
            <span className="truncate">{title}</span>
            <ExternalLink
              size={12}
              className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
            />
          </a>
          <p className="text-[11px] text-[#6E6D68] truncate">{artist}</p>
        </div>
      </div>
    </div>
  );
}
