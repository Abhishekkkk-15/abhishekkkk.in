"use client";

import { useEffect, useRef } from "react";

interface AsciiDensityFieldProps {
  className?: string;
  interactive?: boolean;
}

// Discrete ASCII characters mapped by topographic elevation / density
const DENSITY_CHARACTERS = [
  " ", " ", " ", " ", " ", " ", " ", // 0-6: empty space
  "·", ".", ":",                     // 7-9: sparse outer halo
  "-", "+", "=", "~",               // 10-13: low elevation
  "x", "*", "#", "s",               // 14-17: mid elevation
  "%", "&", "8", "$", "@", "█",     // 18-23: dense core peak
];

// Color palette matching the "Kinetic Silence" Japanese Sumi-ink scale
const INK_COLORS = [
  "#C8C6BE", // faint halo
  "#9E9C95", // low density
  "#6E6D68", // medium graphite
  "#3A3935", // dark charcoal
  "#111111", // deep sumi black
];

export default function AsciiDensityField({
  className = "",
  interactive = true,
}: AsciiDensityFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Character grid configuration
    const cellW = 12; // character width in pixels
    const cellH = 15; // character height in pixels

    // Handle high-DPI crisp rendering
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);

    // Mouse tracking for subtle interactive ripple
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    // Topographic peak clusters matching the uploaded screenshot:
    // Large primary cluster on right, satellite cluster on left, and micro-islands
    const peaks = [
      // Primary right mountain ridge
      { cx: 0.76, cy: 0.44, rx: 0.22, ry: 0.32, weight: 1.0, rot: -0.15 },
      { cx: 0.84, cy: 0.28, rx: 0.16, ry: 0.22, weight: 0.88, rot: 0.2 },
      { cx: 0.70, cy: 0.68, rx: 0.18, ry: 0.26, weight: 0.82, rot: -0.1 },
      { cx: 0.62, cy: 0.38, rx: 0.14, ry: 0.18, weight: 0.65, rot: 0.1 },
      { cx: 0.88, cy: 0.52, rx: 0.15, ry: 0.25, weight: 0.78, rot: 0.05 },

      // Left satellite island (matching screenshot left-middle cluster)
      { cx: 0.13, cy: 0.62, rx: 0.09, ry: 0.14, weight: 0.72, rot: 0.1 },
      { cx: 0.03, cy: 0.65, rx: 0.06, ry: 0.10, weight: 0.55, rot: -0.2 },

      // Small scattered satellite constellations
      { cx: 0.28, cy: 0.24, rx: 0.04, ry: 0.05, weight: 0.42, rot: 0 },
      { cx: 0.52, cy: 0.52, rx: 0.03, ry: 0.04, weight: 0.38, rot: 0 },
      { cx: 0.38, cy: 0.74, rx: 0.03, ry: 0.04, weight: 0.30, rot: 0 },
    ];

    // Ultra-smooth pseudo-random noise lookup
    const pseudoNoise = (nx: number, ny: number, t: number) => {
      const s1 = Math.sin(nx * 12.9898 + ny * 78.233 + t * 0.4) * 43758.5453;
      const s2 = Math.cos(nx * 26.345 - ny * 45.123 - t * 0.3) * 21873.1234;
      return ((s1 - Math.floor(s1)) + (s2 - Math.floor(s2))) * 0.5;
    };

    let startTime = performance.now();

    const render = (now: number) => {
      const time = (now - startTime) * 0.0006; // very slow, meditative phase shift
      ctx.clearRect(0, 0, width, height);

      ctx.font = `600 10.5px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = Math.ceil(width / cellW);
      const rows = Math.ceil(height / cellH);

      const mouse = mousePosRef.current;

      for (let r = 0; r < rows; r++) {
        const y = r * cellH + cellH / 2;
        const ny = y / height;

        for (let c = 0; c < cols; c++) {
          const x = c * cellW + cellW / 2;
          const nx = x / width;

          // Compute raw elevation from overlapping Gaussian peaks
          let elevation = 0;

          for (let i = 0; i < peaks.length; i++) {
            const p = peaks[i];
            const cosR = Math.cos(p.rot);
            const sinR = Math.sin(p.rot);

            const dx = nx - p.cx;
            const dy = ny - p.cy;

            // Rotate coordinates for directional orientation
            const rx = dx * cosR - dy * sinR;
            const ry = dx * sinR + dy * cosR;

            const distSq = (rx * rx) / (p.rx * p.rx) + (ry * ry) / (p.ry * p.ry);
            if (distSq < 3.5) {
              const val = Math.exp(-distSq * 1.8) * p.weight;
              elevation += val;
            }
          }

          // Add cellular noise perturbation for natural organic stepped contours
          const noise = pseudoNoise(nx * 3.5, ny * 3.5, time);
          elevation += (noise - 0.5) * 0.22;

          // Interactive cursor proximity reaction
          if (mouse.active) {
            const mdx = (x - mouse.x) / width;
            const mdy = (y - mouse.y) / height;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 0.18) {
              const wave = Math.sin((mDist / 0.18) * Math.PI) * 0.25;
              elevation += wave;
            }
          }

          // Clamp elevation
          elevation = Math.max(0, Math.min(1.1, elevation));

          // Quantize into discrete elevation bands (creating the stepped topographic look)
          if (elevation < 0.18) {
            continue; // transparent background canvas
          }

          const normalizedIndex = Math.min(
            DENSITY_CHARACTERS.length - 1,
            Math.floor(((elevation - 0.18) / (1.1 - 0.18)) * DENSITY_CHARACTERS.length)
          );

          const char = DENSITY_CHARACTERS[normalizedIndex];
          if (!char || char === " ") continue;

          // Color selection based on density
          let colorIndex = 0;
          if (normalizedIndex > 18) colorIndex = 4; // deep sumi
          else if (normalizedIndex > 14) colorIndex = 3; // charcoal
          else if (normalizedIndex > 10) colorIndex = 2; // graphite
          else if (normalizedIndex > 7) colorIndex = 1; // muted
          else colorIndex = 0; // faint halo

          ctx.fillStyle = INK_COLORS[colorIndex];
          ctx.fillText(char, x, y);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [interactive]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 select-none overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-75 sm:opacity-85"
      />
      {/* Subtle linear paper fade on the left to ensure headline contrast */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F4F3EF] via-[#F4F3EF]/70 to-transparent pointer-events-none" />
    </div>
  );
}
