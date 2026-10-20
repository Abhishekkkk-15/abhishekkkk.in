"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface TelemetryCounterProps {
  value: string | number;
  className?: string;
  duration?: number; // duration in ms, default 800
}

const HEX_CHARS = "0123456789ABCDEF!#$*~>";

export default function TelemetryCounter({
  value,
  className = "",
  duration = 850,
}: TelemetryCounterProps) {
  const targetStr = String(value);
  const [displayStr, setDisplayStr] = useState<string>(targetStr);
  const ref = useRef<HTMLSpanElement>(null);

  // Trigger when element enters the lower 25% of the screen
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -25% 0px",
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    // Check reduced motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayStr(targetStr);
      setHasAnimated(true);
      return;
    }

    setHasAnimated(true);
    const startTime = performance.now();
    const len = targetStr.length;

    let rafId: number;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      // Number of characters from left that have fully settled
      const settledCount = Math.floor(easeProgress * len);

      let current = "";
      for (let i = 0; i < len; i++) {
        const char = targetStr[i];
        // Retain whitespace and common punctuation immediately
        if (char === " " || char === "/" || char === "%" || char === ":") {
          current += char;
          continue;
        }

        if (i < settledCount || progress >= 1) {
          current += char;
        } else {
          // Cryptographic character scramble
          const randomHex =
            HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)];
          current += randomHex;
        }
      }

      setDisplayStr(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      } else {
        setDisplayStr(targetStr);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, hasAnimated, targetStr, duration]);

  return (
    <span
      ref={ref}
      aria-label={targetStr}
      className={`font-mono inline-block tabular-nums ${className}`}
    >
      {displayStr}
    </span>
  );
}
