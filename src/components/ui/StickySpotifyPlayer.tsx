"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, ExternalLink, X, ChevronUp, Radio } from "lucide-react";
import type { SpotifyTrackData } from "@/lib/spotify";

export default function StickySpotifyPlayer() {
  const [data, setData] = useState<SpotifyTrackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

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

  if (loading) {
    return null;
  }

  const isPlaying = data?.isPlaying ?? false;
  const title = data?.title || "Ambient Systems";
  const artist = data?.artist || "Spotify";
  const songUrl = data?.songUrl || "https://open.spotify.com";
  const albumImageUrl = data?.albumImageUrl;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 select-none font-mono">
      <AnimatePresence mode="wait">
        {/* EXPANDED MINI PLAYER CARD */}
        {isExpanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-[290px] sm:w-[320px] bg-[#F4F3EF] border border-[#E2E0D8] shadow-2xl p-4 space-y-3.5 backdrop-blur-md"
          >
            {/* Top header row */}
            <div className="flex items-center justify-between text-[10px] text-[#6E6D68] uppercase tracking-wider pb-2 border-b border-[#E2E0D8]">
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
                <span className="text-[#111111] font-medium">
                  {isPlaying ? "STREAMING // LIVE" : "RECENT FREQUENCY"}
                </span>
              </div>

              {/* Close/Minimize button */}
              <button
                onClick={() => setIsExpanded(false)}
                className="text-[#6E6D68] hover:text-[#111111] p-0.5 transition-colors"
                aria-label="Minimize Spotify player"
              >
                <X size={14} />
              </button>
            </div>

            {/* Track info & Album Art */}
            <div className="flex items-center gap-3">
              {/* Spinning Vinyl Cover Art */}
              <div className="relative w-12 h-12 shrink-0 border border-[#E2E0D8] overflow-hidden bg-[#EBEAE4]">
                {albumImageUrl ? (
                  <img
                    src={albumImageUrl}
                    alt={title}
                    className={`w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-300 ${
                      isPlaying ? "animate-[spin_9s_linear_infinite]" : ""
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#EBEAE4] text-[#6E6D68]">
                    <Music size={16} />
                  </div>
                )}
                {/* Center spindle hole */}
                <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-[#F4F3EF] border border-[#E2E0D8]" />
              </div>

              {/* Title & Artist */}
              <div className="min-w-0 flex-1 space-y-0.5">
                <a
                  href={songUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-display font-medium text-[#111111] hover:text-[#2563EB] transition-colors truncate block flex items-center gap-1 group"
                  title={title}
                >
                  <span className="truncate">{title}</span>
                  <ExternalLink
                    size={11}
                    className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                </a>
                <p className="text-[10.5px] text-[#6E6D68] truncate">{artist}</p>
              </div>
            </div>

            {/* Footer action badge */}
            <div className="pt-2 border-t border-[#E2E0D8]/60 flex items-center justify-between text-[9.5px] text-[#6E6D68]">
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
                className="hover:text-[#111111] transition-colors underline underline-offset-2 decoration-[#D8D6CE]"
              >
                OPEN TRACK ↗
              </a>
            </div>
          </motion.div>
        ) : (
          /* COLLAPSED FLOATING PILL WITH DANCING EQUALIZER & SPINNING DISC */
          <motion.button
            key="collapsed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsExpanded(true)}
            className="group flex items-center gap-2.5 px-3 py-2 bg-[#F4F3EF] border border-[#E2E0D8] shadow-lg hover:border-[#111111] transition-all cursor-pointer backdrop-blur-md"
            title="Click to view live Spotify track"
            aria-label="Spotify live audio stream"
          >
            {/* Spinning mini disc */}
            <div className="relative w-6 h-6 shrink-0 rounded-full border border-[#E2E0D8] overflow-hidden bg-[#111111] flex items-center justify-center">
              {albumImageUrl ? (
                <img
                  src={albumImageUrl}
                  alt={title}
                  className={`w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all ${
                    isPlaying ? "animate-[spin_6s_linear_infinite]" : ""
                  }`}
                />
              ) : (
                <Music size={11} className="text-[#F4F3EF]" />
              )}
              {/* Spindle hole */}
              <div className="absolute w-1.5 h-1.5 rounded-full bg-[#F4F3EF]" />
            </div>

            {/* Live Equalizer soundwave bars */}
            <div className="flex items-end gap-[2px] h-3.5 w-3 shrink-0">
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

            {/* Track info preview */}
            <div className="flex items-center gap-1.5 text-[10px] tracking-wider max-w-[140px] sm:max-w-[180px] truncate">
              <span className="text-[#2563EB] font-medium uppercase shrink-0">
                {isPlaying ? "LIVE" : "AUDIO"}
              </span>
              <span className="text-[#111111] truncate">{title}</span>
            </div>

            <ChevronUp
              size={12}
              className="text-[#6E6D68] group-hover:text-[#111111] transition-transform group-hover:-translate-y-0.5"
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
