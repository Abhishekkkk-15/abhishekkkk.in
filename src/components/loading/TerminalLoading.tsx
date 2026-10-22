"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOOT_STAGES = [
  { code: "01", label: "INIT // MEMORY_PAGE_ALLOCATION" },
  { code: "02", label: "DATABASE // MONGODB_SESSION_POOL" },
  { code: "03", label: "TELEMETRY // LASTFM_AUDIO_BITSTREAM" },
  { code: "04", label: "GITHUB // 52_WEEK_ACTIVITY_GRAPH" },
  { code: "05", label: "SYSTEM_CORE // CLIENT_HYDRATION" },
];

export default function TerminalLoading() {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(18);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex((prev) => (prev < BOOT_STAGES.length - 1 ? prev + 1 : prev));
    }, 450);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 96) return 96;
        const jump = Math.floor(Math.random() * 18) + 8;
        return Math.min(prev + jump, 96);
      });
    }, 280);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F4F3EF] dark:bg-[#0D0D0C] font-mono select-none transition-colors duration-200">
      {/* Top Navbar Skeleton Placeholder */}
      <header className="w-full h-14 sm:h-16 border-b border-[#E2E0D8] dark:border-[#242422] flex items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-ping" />
          <span className="text-xs font-semibold tracking-wider text-[#111111] dark:text-[#F4F3EF]">
            ABHISHEK / SYS_LAB
          </span>
          <span className="hidden sm:inline text-[#6E6D68] text-[10.5px]">
            // KERNEL_BOOT_v2.0
          </span>
        </div>
        <div className="flex items-center gap-4 text-[10.5px] text-[#6E6D68]">
          <span className="hidden sm:inline">STATE: HYDRATING</span>
          <span className="text-[#2563EB] font-medium">{progress}%</span>
        </div>
      </header>

      {/* Main Container mirroring the main site grid */}
      <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] mx-auto flex-grow flex flex-col border-x border-[#E2E0D8] dark:border-[#242422] relative">
        {/* Top telemetry strip */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3 border-b border-[#E2E0D8] dark:border-[#242422] text-[10px] text-[#6E6D68] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span>SYS_THREAD // 0x4A</span>
            <span className="text-[#D8D6CE] dark:text-[#2E2E2C]">|</span>
            <span>MEMORY: 16.2MB</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-[#111111] dark:text-[#F4F3EF]">
              EXECUTING SSR PIPELINE
            </span>
          </div>
        </div>

        {/* Center Animated Core Visual */}
        <div className="flex-grow flex flex-col items-center justify-center p-6 sm:p-12 relative overflow-hidden">
          {/* Subtle Background Radial Radar Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 dark:opacity-20">
            <div className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full border border-[#E2E0D8] dark:border-[#242422]" />
            <div className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] rounded-full border border-[#E2E0D8] dark:border-[#242422]" />
            <div className="absolute w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-full border border-[#E2E0D8] dark:border-[#242422]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full space-y-6">
            {/* Spinning Radar / Turntable Reticle */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              {/* Outer rotating tick ring */}
              <div
                className="absolute inset-0 rounded-full border border-[#E2E0D8] dark:border-[#242422] animate-[spin_8s_linear_infinite]"
                style={{
                  borderTopColor: "#2563EB",
                  borderRightColor: "transparent",
                }}
              />

              {/* Counter-rotating grooved vinyl / radar core */}
              <div
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-[#111111]/20 dark:border-white/20 animate-[spin_4s_linear_infinite_reverse] flex items-center justify-center shadow-lg"
                style={{
                  background:
                    "radial-gradient(circle, #202020 0%, #111111 25%, #242424 28%, #0f0f0f 50%, #222222 53%, #080808 100%)",
                }}
              >
                {/* Conic sheen */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none opacity-40"
                  style={{
                    background:
                      "conic-gradient(from 45deg, rgba(255,255,255,0.2) 0deg, transparent 40deg, transparent 140deg, rgba(255,255,255,0.2) 180deg, transparent 220deg, transparent 320deg, rgba(255,255,255,0.2) 360deg)",
                  }}
                />
                {/* Center glowing cobalt beacon */}
                <div className="w-4 h-4 rounded-full bg-[#2563EB] ring-4 ring-[#2563EB]/20 flex items-center justify-center shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              {/* Corner crosshairs */}
              <span className="absolute -top-1 -left-1 text-[11px] text-[#6E6D68]">+</span>
              <span className="absolute -top-1 -right-1 text-[11px] text-[#6E6D68]">+</span>
              <span className="absolute -bottom-1 -left-1 text-[11px] text-[#6E6D68]">+</span>
              <span className="absolute -bottom-1 -right-1 text-[11px] text-[#6E6D68]">+</span>
            </div>

            {/* Stage Title & Ticking Code */}
            <div className="space-y-1.5 w-full">
              <div className="text-[10px] text-[#6E6D68] uppercase tracking-widest flex items-center justify-center gap-2">
                <span>STAGE [{BOOT_STAGES[stageIndex].code}/05]</span>
                <span className="text-[#D8D6CE] dark:text-[#2E2E2C]">/</span>
                <span className="text-[#2563EB] font-medium">SSR ACTIVE</span>
              </div>
              <h2 className="text-sm sm:text-base font-display font-medium text-[#111111] dark:text-[#F4F3EF] tracking-tight h-6">
                {BOOT_STAGES[stageIndex].label}
              </h2>
            </div>

            {/* Hairline Progress Bar */}
            <div className="w-full max-w-xs space-y-2">
              <div className="relative w-full h-[3px] bg-[#E2E0D8] dark:bg-[#242422] overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#2563EB]"
                  initial={{ width: "10%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <div className="flex items-center justify-between text-[9.5px] text-[#6E6D68]">
                <span>LATENCY: &lt;18ms</span>
                <span className="font-medium text-[#111111] dark:text-[#F4F3EF]">
                  {progress}% // HYDRATING
                </span>
                <span>SYS_BUS: OPTIMAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <footer className="w-full border-t border-[#E2E0D8] dark:border-[#242422] px-5 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#6E6D68]">
          <div className="flex items-center gap-2">
            <span className="text-[#111111] dark:text-[#F4F3EF] font-medium">
              EST. 2024
            </span>
            <span>// AUTONOMOUS AI &amp; DISTRIBUTED SYSTEMS</span>
          </div>
          <div>
            <span>TOKYO // NEW DELHI // SAN FRANCISCO</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
