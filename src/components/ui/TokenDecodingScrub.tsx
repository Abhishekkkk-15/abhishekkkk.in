"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TokenChip {
  id: string;
  stage: string;
  token: string;
  threshold: number; // scroll progress 0.0 - 1.0 to activate
}

const SPECULATIVE_STREAM: TokenChip[] = [
  { id: "t0", stage: "CTX", token: "⟨prompt_ctx⟩", threshold: 0.05 },
  { id: "t1", stage: "DRAFT_1", token: "⟨kv_attn⟩", threshold: 0.16 },
  { id: "t2", stage: "DRAFT_2", token: "⟨sparse_k⟩", threshold: 0.28 },
  { id: "t3", stage: "DRAFT_3", token: "⟨cuda_fused⟩", threshold: 0.4 },
  { id: "t4", stage: "DRAFT_4", token: "⟨logits_top1⟩", threshold: 0.52 },
  { id: "t5", stage: "TARGET", token: "⟨eval_target⟩", threshold: 0.65 },
  { id: "t6", stage: "VERIFY", token: "⟨verify:OK⟩", threshold: 0.76 },
  { id: "t7", stage: "ACCEPT", token: "⟨γ=4_pass⟩", threshold: 0.88 },
  { id: "t8", stage: "COMMIT", token: "⟨2840_tok/s⟩", threshold: 0.96 },
];

export default function TokenDecodingScrub() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 20%"],
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#EBEAE4]/60 border-y border-[#E2E0D8] px-4 sm:px-8 py-3 select-none overflow-hidden"
    >
      {/* Top Scrub Header & Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#6E6D68] uppercase tracking-wider mb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block" />
          <span className="text-[#111111] font-medium">
            LIVE TOKEN STREAM // SPECULATIVE DECODING SCRUB
          </span>
          <span className="hidden sm:inline text-[#A8A7A1]">|</span>
          <span className="hidden sm:inline">DRAFT γ = 4 → TARGET VERIFY → COMMIT</span>
        </div>
        <div className="flex items-center gap-3">
          <span>LATENCY: &lt;38ms</span>
          <span className="text-[#2563EB] font-medium">ACCEPT: 99.4%</span>
        </div>
      </div>

      {/* Hairline Timeline Scrub Bar Track */}
      <div className="relative w-full h-[2px] bg-[#E2E0D8] mb-3 overflow-hidden">
        <motion.div
          style={{ width: progressWidth }}
          className="absolute top-0 left-0 h-full bg-[#2563EB]"
        />
      </div>

      {/* Live Stream Token Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono text-[10px]">
        {SPECULATIVE_STREAM.map((chip, idx) => (
          <TokenChipView
            key={chip.id}
            chip={chip}
            index={idx}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

function TokenChipView({
  chip,
  index,
  scrollYProgress,
}: {
  chip: TokenChip;
  index: number;
  scrollYProgress: any;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, chip.threshold - 0.08), chip.threshold],
    [0.35, 1]
  );

  const scale = useTransform(
    scrollYProgress,
    [Math.max(0, chip.threshold - 0.08), chip.threshold],
    [0.92, 1]
  );

  const border = useTransform(
    scrollYProgress,
    [
      Math.max(0, chip.threshold - 0.05),
      chip.threshold,
      Math.min(1, chip.threshold + 0.1),
    ],
    ["#E2E0D8", "#2563EB", "#111111"]
  );

  const color = useTransform(
    scrollYProgress,
    [
      Math.max(0, chip.threshold - 0.05),
      chip.threshold,
      Math.min(1, chip.threshold + 0.1),
    ],
    ["#82807A", "#2563EB", "#111111"]
  );

  const bg = useTransform(
    scrollYProgress,
    [
      Math.max(0, chip.threshold - 0.05),
      chip.threshold,
      Math.min(1, chip.threshold + 0.1),
    ],
    ["rgba(244, 243, 239, 0.4)", "rgba(37, 99, 235, 0.08)", "rgba(235, 234, 228, 0.9)"]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        borderColor: border,
        color,
        backgroundColor: bg,
      }}
      className="shrink-0 flex items-center gap-1 px-2 py-1 border transition-all duration-150"
    >
      <span className="text-[8.5px] uppercase text-[#6E6D68]">0{index + 1}.</span>
      <span className="font-semibold">{chip.token}</span>
      <span className="text-[8px] tracking-tight opacity-75">[{chip.stage}]</span>
    </motion.div>
  );
}
