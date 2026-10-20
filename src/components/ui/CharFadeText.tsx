"use client";

import { useEffect, useRef, useState } from "react";

interface CharFadeTextProps {
  children: string | string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function CharFadeText({
  children,
  className = "",
  as: Component = "span",
}: CharFadeTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const text = Array.isArray(children) ? children.join("") : children;

  const [isComplete, setIsComplete] = useState(false);
  const [opacities, setOpacities] = useState<number[]>(() =>
    Array.from({ length: text.length }, () => 1)
  );

  const maxProgressRef = useRef(0);

  useEffect(() => {
    maxProgressRef.current = 0;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setOpacities(Array.from({ length: text.length }, () => 1));
      setIsComplete(true);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(text);
    const total = chars.length;
    if (total === 0) {
      setIsComplete(true);
      return;
    }

    let ticking = false;

    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start fade-in wave at 96% of viewport (just as it enters view)
      // Fully reveal at 75% of viewport (already 100% solid in the lower quarter of the screen)
      const startY = windowHeight * 0.96;
      const endY = windowHeight * 0.75;

      let progress = 0;
      if (rect.top <= endY) {
        progress = 1;
      } else if (rect.top < startY) {
        progress = (startY - rect.top) / (startY - endY);
      } else {
        progress = 0;
      }

      progress = Math.max(0, Math.min(1, progress));

      // Latch to the maximum progress reached so text NEVER fades backward or looks washed out once in view
      maxProgressRef.current = Math.max(maxProgressRef.current, progress);
      const effectiveProgress = maxProgressRef.current;

      if (effectiveProgress >= 1) {
        setOpacities(Array.from({ length: total }, () => 1));
        setIsComplete(true);
        ticking = false;
        return;
      }

      const spread = 0.22;
      const nextOpacities = chars.map((_, index) => {
        const charThreshold = index / total;
        const charProgress = Math.max(
          0,
          Math.min(1, (effectiveProgress - charThreshold * (1 - spread)) / spread)
        );
        return 0.35 + charProgress * 0.65;
      });

      setOpacities(nextOpacities);
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (isComplete) return;
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [text, isComplete]);

  const chars = Array.from(text);

  return (
    // @ts-expect-error dynamic component tag
    <Component ref={containerRef} className={`char-fade-scroll ${className}`}>
      {chars.map((char, index) => {
        if (char === " ") {
          return (
            <span key={index} className="char-unit char-space">
              {" "}
            </span>
          );
        }
        return (
          <span
            key={index}
            className="char-unit"
            style={{
              opacity: isComplete ? 1 : (opacities[index] ?? 1),
              transition: isComplete ? "none" : "opacity 100ms ease-out",
            }}
          >
            {char}
          </span>
        );
      })}
    </Component>
  );
}
