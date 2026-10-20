"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxPortraitProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ParallaxPortrait({
  src,
  alt,
  className = "",
}: ParallaxPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 0.2x speed ratio parallax shift for the grain texture
  const grainY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Subtle counter-drift for image depth
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  // Contrast shift that deepens slightly as user scrolls through the hero
  const filterStyle = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "grayscale(100%) contrast(102%) brightness(99%)",
      "grayscale(100%) contrast(110%) brightness(97%)",
      "grayscale(100%) contrast(103%) brightness(98%)",
    ]
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[280px] sm:max-w-[320px] aspect-square bg-[#EBEAE4] border border-[#E2E0D8] overflow-hidden shrink-0 shadow-sm rounded-none select-none ${className}`}
    >
      {/* Base Image with Parallax Depth */}
      <motion.img
        alt={alt}
        src={src}
        style={{
          y: imageY,
          filter: filterStyle,
        }}
        className="w-full h-full object-cover block scale-105"
      />

      {/* Latent Monochrome Film-Grain Parallax Layer (0.2x scroll ratio) */}
      <motion.div
        style={{
          y: grainY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.7'/%3E%3C/svg%3E")`,
        }}
        className="pointer-events-none absolute -inset-[20%] opacity-35 mix-blend-overlay"
      />

      {/* Subtle Analog Vignette Ring */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_rgba(17,17,17,0.12)] border border-[#E2E0D8]/40" />

      {/* Engineering Corner Index */}
      <div className="absolute top-1.5 left-2 font-mono text-[8px] text-[#F4F3EF] bg-[#111111]/70 px-1 py-0.5 tracking-tighter">
        ISO_400 // KAI_PORTRAIT
      </div>
    </div>
  );
}
