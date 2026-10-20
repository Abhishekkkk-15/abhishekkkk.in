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

  // Subtle depth shift relative to scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ["-2.5%", "2.5%"]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[280px] sm:max-w-[320px] aspect-square bg-[#EBEAE4] border border-[#E2E0D8] overflow-hidden shrink-0 shadow-sm rounded-none select-none ${className}`}
    >
      {/* High-contrast monochrome black & white portrait */}
      <motion.img
        alt={alt}
        src={src}
        style={{
          y: imageY,
        }}
        className="w-full h-full object-cover block scale-105 grayscale contrast-110"
      />
    </div>
  );
}
