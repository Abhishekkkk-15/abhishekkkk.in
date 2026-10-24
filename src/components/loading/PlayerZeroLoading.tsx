"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DAG_BOOT_STAGES = [
  { code: "01", label: "ANALYZING REASONING DAG TOPOLOGY" },
  { code: "02", label: "COMPILING SPECULATIVE DECODING KERNELS" },
  { code: "03", label: "HYDRATING TENSORRT-LLM ENGINE BUFFER" },
  { code: "04", label: "STREAMING 52-WEEK COMMIT HEATMAP" },
  { code: "05", label: "SYSTEM HYDRATION COMPLETE" },
];

export default function PlayerZeroLoading({
  topHeadline = "BUILD. TRAIN.",
  bottomHeadline = "DEPLOY. SCALE.",
}: {
  topHeadline?: string;
  bottomHeadline?: string;
}) {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex((prev) => (prev < DAG_BOOT_STAGES.length - 1 ? prev + 1 : prev));
    }, 420);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 98;
        const jump = Math.floor(Math.random() * 16) + 8;
        return Math.min(prev + jump, 98);
      });
    }, 250);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f8f8f9] text-stone-900 font-sans select-none overflow-x-hidden justify-between">
      {/* Top Engineering Header */}
      <header className="w-full bg-[#f8f8f9]/90 backdrop-blur-md border-b border-[#e5e5e8] px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AI Core Monogram */}
          <div className="w-7 h-7 bg-[#121213] rounded-lg flex items-center justify-center p-1 shadow-xs">
            <svg className="w-full h-full text-white fill-current" viewBox="0 0 24 24">
              <path d="M7 2h4v5H7V2zm6 0h4v5h-4V2zM2 7h5v4H2V7zm15 0h5v4h-5V7zM7 17h4v5H7v-5zm6 0h4v5h-4v-5zm-11-4h5v4H2v-4zm15 0h5v4h-5v-4z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-900">
            APPLIED AI
          </span>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-mono hidden sm:inline-block">
            // DAG_BOOT_v3.2
          </span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3 font-mono text-xs text-stone-600">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-white border border-stone-200 rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] text-stone-700 font-medium hidden sm:inline">
              DAG PIPELINE: HYDRATING
            </span>
            <span className="text-[11px] font-semibold text-neutral-950">
              {progress}%
            </span>
          </div>
        </div>
      </header>

      {/* Telemetry Strip */}
      <div className="w-full border-b border-[#e5e5e8] px-6 py-2.5 bg-stone-100/60 font-mono text-[10.5px] text-stone-500 uppercase tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>PIPELINE_GRAPH // 0x8F</span>
          <span className="text-stone-300">|</span>
          <span>MEMORY: 24.8MB</span>
          <span className="text-stone-300 hidden sm:inline">|</span>
          <span className="hidden sm:inline">ACCELERATOR: TENSORRT-LLM</span>
        </div>
        <div className="flex items-center gap-2 font-medium text-stone-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>EXECUTING LATENT SSR</span>
        </div>
      </div>

      {/* Main Hero & Pipeline Canvas Stage */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden max-w-6xl mx-auto w-full">
        {/* Subtle Square Dot Matrix Grid Pattern Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: "radial-gradient(#d4d4d8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center w-full space-y-8 max-w-3xl">
          {/* Upper Dot-Matrix Title */}
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dot-matrix-title text-2xl sm:text-4xl md:text-5xl text-neutral-900 tracking-widest select-none"
          >
            {topHeadline}
          </motion.h1>

          {/* Animated Mini DAG Node Architecture */}
          <div className="relative w-full max-w-xl h-44 flex items-center justify-between px-4 sm:px-10">
            {/* SVG Connecting Flow Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 500 176"
            >
              <defs>
                <linearGradient id="pipeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d4d4d8" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#d4d4d8" />
                </linearGradient>
              </defs>
              {/* Left-to-Center curved wires */}
              <path
                d="M 60 40 C 140 40, 160 88, 250 88"
                fill="none"
                stroke="url(#pipeGradient1)"
                strokeDasharray="4 4"
                strokeWidth="1.5"
                className="animate-pulse"
              />
              <path
                d="M 60 136 C 140 136, 160 88, 250 88"
                fill="none"
                stroke="#d4d4d8"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              {/* Center-to-Right curved wires */}
              <path
                d="M 250 88 C 340 88, 360 40, 440 40"
                fill="none"
                stroke="url(#pipeGradient1)"
                strokeDasharray="4 4"
                strokeWidth="1.5"
                className="animate-pulse"
              />
              <path
                d="M 250 88 C 340 88, 360 136, 440 136"
                fill="none"
                stroke="#d4d4d8"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
            </svg>

            {/* Left Node Chips */}
            <div className="flex flex-col justify-between h-36 z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 rounded-full text-[10px] font-mono text-stone-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Synthetic Corpus
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 rounded-full text-[10px] font-mono text-stone-700 shadow-2xs">
                Speculative Decoding
              </div>
            </div>

            {/* Center Core Emblem Module */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-stone-300 p-2 flex items-center justify-center shadow-md">
                <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-white shadow-xs">
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                    <rect height="4" rx="1" width="4" x="7" y="2" />
                    <rect height="4" rx="1" width="4" x="13" y="2" />
                    <rect height="4" rx="1" width="4" x="2" y="7" />
                    <rect height="4" rx="1" width="4" x="18" y="7" />
                    <rect height="4" rx="1" width="4" x="7" y="18" />
                    <rect height="4" rx="1" width="4" x="13" y="18" />
                    <rect height="4" rx="1" width="4" x="2" y="13" />
                    <rect height="4" rx="1" width="4" x="18" y="13" />
                    <circle cx="12" cy="12" r="2.5" />
                  </svg>
                </div>
                {/* Active node beacon */}
                <div
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white animate-ping"
                  title="DAG Node Active"
                />
              </div>
              <span className="mt-2 text-[9px] font-mono uppercase tracking-wider text-stone-500 bg-stone-200/60 px-2 py-0.5 rounded-full border border-stone-300">
                AI REASONING CORE
              </span>
            </div>

            {/* Right Node Chips */}
            <div className="flex flex-col justify-between h-36 z-10 text-right">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 rounded-full text-[10px] font-mono text-stone-700 shadow-2xs">
                TensorRT-LLM
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-300 rounded-full text-[10px] font-mono text-stone-700 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Self-Healing Evals
              </div>
            </div>
          </div>

          {/* Lower Dot-Matrix Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dot-matrix-title text-2xl sm:text-4xl md:text-5xl text-neutral-900 tracking-widest select-none"
          >
            {bottomHeadline}
          </motion.h2>

          {/* Boot Stage Label & Ticking Code */}
          <div className="space-y-2 pt-2">
            <div className="text-[11px] font-mono text-stone-500 uppercase tracking-widest flex items-center justify-center gap-2">
              <span>STAGE [{DAG_BOOT_STAGES[stageIndex].code}/05]</span>
              <span className="text-stone-300">/</span>
              <span className="text-emerald-700 font-semibold">PIPELINE ACTIVE</span>
            </div>
            <p className="text-xs sm:text-sm font-mono font-medium text-neutral-800 tracking-tight h-5">
              {DAG_BOOT_STAGES[stageIndex].label}
            </p>
          </div>

          {/* High-Precision Progress Bar */}
          <div className="w-full max-w-xs space-y-2">
            <div className="relative w-full h-[4px] bg-stone-200 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#121213] rounded-full"
                initial={{ width: "15%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-500">
              <span>LATENCY: &lt;12ms</span>
              <span className="font-semibold text-neutral-900">
                {progress}% // HYDRATING
              </span>
              <span>BUS: OPTIMAL</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Colophon */}
      <footer className="w-full border-t border-[#e5e5e8] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] font-mono text-stone-500 bg-[#f8f8f9]">
        <div className="flex items-center gap-2">
          <span className="text-neutral-900 font-medium">EST. 2024</span>
          <span>// APPLIED AI ARCHITECTURES &amp; REASONING ENGINES</span>
        </div>
        <div>
          <span>SAN FRANCISCO // TOKYO // JAIPUR</span>
        </div>
      </footer>
    </div>
  );
}
