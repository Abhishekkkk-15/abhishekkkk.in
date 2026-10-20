import { useEffect, useRef, useState } from "react";

interface CharFadeTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export default function CharFadeText({
  children,
  className = "",
  as: Component = "span",
}: CharFadeTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [opacities, setOpacities] = useState<number[]>(() =>
    Array.from({ length: children.length }, () => 1)
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setOpacities(Array.from({ length: children.length }, () => 1));
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const chars = Array.from(children);
    const total = chars.length;
    if (total === 0) return;

    let ticking = false;

    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Range: start fading at 92% of viewport height, fully revealed at 40%
      const startY = windowHeight * 0.92;
      const endY = windowHeight * 0.38;

      let progress = (startY - rect.top) / (startY - endY);
      progress = Math.max(0, Math.min(1, progress));

      const spread = 0.18;
      const nextOpacities = chars.map((_, index) => {
        const charThreshold = index / total;
        const charProgress = Math.max(
          0,
          Math.min(1, (progress - charThreshold * (1 - spread)) / spread)
        );
        return 0.2 + charProgress * 0.8;
      });

      setOpacities(nextOpacities);
      ticking = false;
    };

    const onScrollOrResize = () => {
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
  }, [children]);

  const chars = Array.from(children);

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
              opacity: opacities[index] ?? 1,
            }}
          >
            {char}
          </span>
        );
      })}
    </Component>
  );
}
