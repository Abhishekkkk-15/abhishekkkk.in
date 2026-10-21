"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, ExternalLink, X } from "lucide-react";
import type { SpotifyTrackData } from "@/lib/spotify";

export default function StickySpotifyPlayer() {
  const [data, setData] = useState<SpotifyTrackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    // Poll every 25 seconds
    const interval = setInterval(fetchStatus, 25000);
    return () => clearInterval(interval);
  }, []);

  // Close card when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  if (loading) {
    return null;
  }

  const isPlaying = data?.isPlaying ?? false;
  const title = data?.title || "Ambient Systems";
  const artist = data?.artist || "Spotify";
  const songUrl = data?.songUrl || "https://open.spotify.com";
  const albumImageUrl = data?.albumImageUrl;
  const album = data?.album;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none font-mono"
    >
      {/* EXPANDED TRACK CARD POPOVER */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="expanded-card"
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 sm:bottom-20 right-0 w-[280px] sm:w-[310px] bg-[#F4F3EF] dark:bg-[#0D0D0C] border border-[#E2E0D8] dark:border-[#242422] shadow-2xl p-4 space-y-3.5 backdrop-blur-md"
          >
            {/* Top header row */}
            <div className="flex items-center justify-between text-[10px] text-[#6E6D68] uppercase tracking-wider pb-2 border-b border-[#E2E0D8] dark:border-[#242422]">
              <div className="flex items-center gap-2">
                {/* Live soundwave animation */}
                <div className="flex items-end gap-[2px] h-3.5 w-3.5">
                  <span
                    className={`w-[2px] bg-[#2563EB] inline-block ${
                      isPlaying ? "equalizer-bar-1" : "h-1"
                    }`}
                  />
                  <span
                    className={`w-[2px] bg-[#2563EB] inline-block ${
                      isPlaying ? "equalizer-bar-2" : "h-2"
                    }`}
                  />
                  <span
                    className={`w-[2px] bg-[#2563EB] inline-block ${
                      isPlaying ? "equalizer-bar-3" : "h-1.5"
                    }`}
                  />
                  <span
                    className={`w-[2px] bg-[#2563EB] inline-block ${
                      isPlaying ? "equalizer-bar-4" : "h-2.5"
                    }`}
                  />
                </div>
                <span className="text-[#111111] dark:text-[#F4F3EF] font-medium">
                  {isPlaying ? "STREAMING // LIVE" : "RECENT FREQUENCY"}
                </span>
              </div>

              {/* Close/Minimize button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[#6E6D68] hover:text-[#111111] dark:hover:text-[#F4F3EF] p-0.5 transition-colors"
                aria-label="Minimize Spotify player"
              >
                <X size={14} />
              </button>
            </div>

            {/* Track info & Album Art */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 border border-[#E2E0D8] dark:border-[#242422] overflow-hidden bg-[#EBEAE4] dark:bg-[#171716]">
                {albumImageUrl ? (
                  <img
                    src={albumImageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#6E6D68]">
                    <Music size={16} />
                  </div>
                )}
              </div>

              {/* Title & Artist */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <a
                  href={songUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-display font-medium text-[#111111] dark:text-[#F4F3EF] hover:text-[#2563EB] dark:hover:text-[#2563EB] transition-colors truncate block flex items-center gap-1 group"
                  title={title}
                >
                  <span className="truncate">{title}</span>
                  <ExternalLink
                    size={11}
                    className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </a>
                <p className="text-[10.5px] text-[#6E6D68] truncate">{artist}</p>
                {album && (
                  <p className="text-[9.5px] text-[#888888] truncate italic">
                    {album}
                  </p>
                )}
              </div>
            </div>

            {/* Audio Telemetry & Stream Progress */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-[9px] text-[#6E6D68] uppercase tracking-wider">
                <span>{isPlaying ? "LIVE BITSTREAM" : "CACHED SCROBBLE"}</span>
                <span>{isPlaying ? "320 KBPS // FLAC" : "LAST PLAYED"}</span>
              </div>
              <div className="relative w-full h-[3px] bg-[#E2E0D8] dark:bg-[#242422] overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#2563EB]"
                  animate={
                    isPlaying
                      ? {
                          width: ["20%", "45%", "70%", "88%", "98%"],
                          transition: {
                            duration: 22,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }
                      : { width: "100%" }
                  }
                />
              </div>
            </div>

            {/* Footer action badge */}
            <div className="pt-2 border-t border-[#E2E0D8]/60 dark:border-[#242422] flex items-center justify-between text-[9.5px] text-[#6E6D68]">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isPlaying ? "bg-[#2563EB] animate-pulse" : "bg-[#82807A]"
                  }`}
                />
                SPOTIFY TELEMETRY
              </span>
              <a
                href={songUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#111111] dark:hover:text-[#F4F3EF] transition-colors underline underline-offset-2 decoration-[#D8D6CE] dark:decoration-[#383835]"
              >
                OPEN TRACK ↗
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING VINYL DISC ONLY */}
      <div className="relative group">
        {/* Hover preview tooltip (desktop) */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#121212] text-[#F4F3EF] text-[10px] tracking-wider whitespace-nowrap border border-[#2A2A2A] shadow-xl">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPlaying ? "bg-[#2563EB] animate-pulse" : "bg-[#6E6D68]"
            }`}
          />
          <span className="font-medium max-w-[140px] truncate">{title}</span>
          <span className="text-[#6E6D68]">/</span>
          <span className="text-[#AAAAAA] max-w-[100px] truncate">{artist}</span>
        </div>

        {/* Vinyl Disc Button Container */}
        <div className="relative">
          {/* Mechanical Tonearm / Stylus */}
          <motion.div
            className="absolute -top-3.5 -right-2 w-5 h-10 pointer-events-none z-20"
            style={{ transformOrigin: "6px 6px" }}
            animate={{
              rotate: isPlaying ? 22 : -6,
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 14,
              mass: 0.8,
            }}
          >
            {/* Tonearm Pivot Base */}
            <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-[#2A2A2A] border border-[#555555] shadow-md flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-[#8E8D88]" />
            </div>
            {/* Arm Shaft */}
            <div className="absolute top-2.5 left-1 w-[1.5px] h-7 bg-gradient-to-b from-[#8E8D88] via-[#BBBBBB] to-[#666666] shadow-[0_1px_3px_rgba(0,0,0,0.5)] origin-top" />
            {/* Stylus Headshell */}
            <div className="absolute bottom-0 -left-0.5 w-2 h-2.5 bg-[#1A1A1A] border border-[#444444] rounded-[1px] shadow-sm transform -rotate-12" />
          </motion.div>

          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="relative block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer"
            aria-label={
              isPlaying
                ? `Currently playing: ${title} by ${artist}. Click to view details.`
                : `Recently played: ${title} by ${artist}. Click to view details.`
            }
            title={`${title} - ${artist}`}
          >
            {/* Subtle sonic ripple ring on hover */}
            <div className="absolute inset-0 -m-1.5 rounded-full border border-[#2563EB]/40 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

            {/* Vinyl Record */}
          <div
            className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full transition-transform duration-300 group-hover:scale-105 active:scale-95 ${
              isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
            }`}
            style={{
              background:
                "radial-gradient(circle, #202020 0%, #111111 20%, #242424 22%, #0f0f0f 36%, #222222 38%, #101010 54%, #202020 56%, #0d0d0d 72%, #1e1e1e 74%, #080808 100%)",
              boxShadow:
                "0 8px 24px -4px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08) inset, 0 0 0 1px rgba(0, 0, 0, 0.7)",
            }}
          >
            {/* Vinyl Sheen / Reflection Highlight Overlay */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 45deg, rgba(255,255,255,0.14) 0deg, transparent 40deg, transparent 140deg, rgba(255,255,255,0.12) 180deg, transparent 220deg, transparent 320deg, rgba(255,255,255,0.14) 360deg)",
              }}
            />

            {/* Center Label (Album Artwork Sticker) */}
            <div className="absolute inset-0 m-auto w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden border border-[#000000]/80 shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] bg-[#1c1c1c] flex items-center justify-center">
              {albumImageUrl ? (
                <img
                  src={albumImageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Music size={11} className="text-[#F4F3EF]" />
              )}
            </div>

            {/* Center Spindle Hole */}
            <div
              className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full border border-black/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.9)]"
              style={{ backgroundColor: "#F4F3EF" }}
            />
          </div>
        </button>
      </div>
    </div>
  </div>
);
}
