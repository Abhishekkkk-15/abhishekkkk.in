"use client";

import { useEffect, useRef } from "react";

interface AsciiSharkProps {
  className?: string;
  interactive?: boolean;
}

// Authentic ASCII characters extracted from the Shark.jfif matrix
const SHARK_CHARS = [
  "0", "S", "X", "8", "9", "B", "6", "1", "4", "3", "d", "7", "%", "&", "@", "S8", "08"
];

interface SampledPixel {
  x: number; // normalized 0..1 in source image
  y: number; // normalized 0..1 in source image
  brightness: number; // 0..1
  r: number;
  g: number;
  b: number;
  char: string;
}

export default function AsciiShark({
  className = "",
  interactive = true,
}: AsciiSharkProps) {
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

    // Load source image to extract exact shark silhouette & chromatic pixel data
    const img = new Image();
    img.src = "/images/shark.jfif";

    let sampledShark: SampledPixel[] = [];

    img.onload = () => {
      // Offscreen downsampling canvas
      const offCanvas = document.createElement("canvas");
      // Downsample grid matching ASCII cell resolution
      const cols = 36;
      const rows = 54;
      offCanvas.width = cols;
      offCanvas.height = rows;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows).data;

      const pixels: SampledPixel[] = [];

      for (let r = 0; r < rows; r++) {
        const ny = r / rows;
        for (let c = 0; c < cols; c++) {
          const nx = c / cols;

          // 1. ISOLATE SHARK ONLY: Filter out top-right lens flare and outer background artifacts
          if (ny < 0.22) continue; // above shark snout
          if (ny < 0.35 && nx > 0.65) continue; // top-right flare artifact
          if (ny > 0.82) continue; // below tail
          if (nx < 0.14 || nx > 0.92) continue; // outer side margins

          const idx = (r * cols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];
          // Perceived luminance
          const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          // Strict threshold so only the actual glowing shark body & fins are captured
          if (luminance > 0.20) {
            const charIdx = Math.floor(luminance * (SHARK_CHARS.length - 1));
            pixels.push({
              x: nx,
              y: ny,
              brightness: luminance,
              r: red,
              g: green,
              b: blue,
              char: SHARK_CHARS[charIdx] || "8",
            });
          }
        }
      }

      sampledShark = pixels;
    };

    // Parametric fallback points ensuring shark is always visible immediately
    const generateFallbackShark = (): SampledPixel[] => {
      const fallback: SampledPixel[] = [];
      const cols = 32;
      const rows = 48;

      for (let r = 0; r < rows; r++) {
        const ny = 0.22 + (r / rows) * 0.58;
        // Shark spine center curving diagonally
        const spineX = 0.30 + (r / rows) * 0.45;
        // Body width tapering from head/torso to tail
        let bodyW = 0.14 * Math.sin((r / rows) * Math.PI);
        if (r / rows > 0.6) bodyW = 0.07 * (1 - (r / rows - 0.6) / 0.4);

        // Pectoral fin extensions
        if (r / rows > 0.22 && r / rows < 0.44) {
          bodyW += 0.12 * Math.sin(((r / rows - 0.22) / 0.22) * Math.PI);
        }

        for (let c = 0; c < cols; c++) {
          const nx = c / cols;
          const dist = Math.abs(nx - spineX);
          if (dist < bodyW) {
            const b = 1 - dist / bodyW;
            fallback.push({
              x: nx,
              y: ny,
              brightness: b,
              r: Math.floor(180 + b * 75),
              g: Math.floor(220 + b * 35),
              b: 255,
              char: SHARK_CHARS[Math.floor(b * (SHARK_CHARS.length - 1))] || "8",
            });
          }
        }
      }
      return fallback;
    };

    const fallbackShark = generateFallbackShark();

    // High-DPI handling
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

    // Mouse tracking for subtle interactive steering & luminescence
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

    const startTime = performance.now();

    const render = (now: number) => {
      const time = (now - startTime) * 0.001; // elapsed seconds
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 640;

      // CENTERED FISH POSITION:
      // Desktop: centered at 55% width (centered visual focus, balanced beside text)
      // Mobile: centered at 50% width
      const baseCenterX = isMobile ? width * 0.50 : width * 0.56;
      const baseCenterY = height * 0.50;

      // Gentle swimming locomotion: gliding drift + forward acceleration pulses
      const swimCycle = time * 2.2;
      const driftX = Math.sin(time * 0.6) * 16;
      const driftY = Math.cos(time * 0.8) * 12;

      // Responsive shark scale
      const sharkScale = Math.min(width * 0.48, height * 1.05);

      // Render ambient bioluminescent background glow field
      const glowGrad = ctx.createRadialGradient(
        baseCenterX + driftX,
        baseCenterY + driftY,
        25,
        baseCenterX + driftX,
        baseCenterY + driftY,
        sharkScale * 0.72
      );
      glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.18)"); // soft cyan core glow
      glowGrad.addColorStop(0.4, "rgba(37, 99, 235, 0.09)"); // cobalt ring
      glowGrad.addColorStop(1, "rgba(244, 243, 239, 0)"); // fade cleanly into paper canvas

      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Select active shark pixel source (filtered without any extraneous objects)
      const activePixels = sampledShark.length > 0 ? sampledShark : fallbackShark;

      // Cell size for rendering ASCII tiles
      const cellSize = isMobile ? 8.5 : 10.5;
      ctx.font = `700 ${cellSize - 0.5}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const mouse = mousePosRef.current;

      // Center bounding offset of the shark body
      const sharkMidX = 0.50;
      const sharkMidY = 0.50;

      // Loop through each pixel of the shark matrix ONLY
      for (let i = 0; i < activePixels.length; i++) {
        const pt = activePixels[i];

        // Normalized relative coordinates centered on shark midpoint
        const relX = (pt.x - sharkMidX) * sharkScale;
        const relY = (pt.y - sharkMidY) * sharkScale;

        // REAL-TIME SHARK LOCOMOTION WAVE:
        // Spine traveling wave with exponential tail whip amplitude
        const spineProgress = Math.max(0, Math.min(1, (pt.y - 0.22) / 0.58)); // 0 at snout, 1 at tail
        const waveAmp = 5 + Math.pow(spineProgress, 2.2) * 38;
        const wavePhase = swimCycle - spineProgress * 5.2;
        const waveOffset = Math.sin(wavePhase) * waveAmp;

        // Whole-body swimming yaw angle
        const bodyYaw = Math.cos(swimCycle) * 0.07;
        const cosYaw = Math.cos(bodyYaw);
        const sinYaw = Math.sin(bodyYaw);

        const rotatedX = relX * cosYaw - relY * sinYaw + waveOffset;
        const rotatedY = relX * sinYaw + relY * cosYaw;

        let finalX = baseCenterX + driftX + rotatedX;
        let finalY = baseCenterY + driftY + rotatedY;

        // Interactive cursor proximity reaction
        if (mouse.active) {
          const mdx = finalX - mouse.x;
          const mdy = finalY - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140) {
            const push = (1 - mDist / 140) * 12;
            finalX += (mdx / mDist) * push;
            finalY += (mdy / mDist) * push;
          }
        }

        // Color computation matching Shark.jfif:
        const b = pt.brightness;
        let charColor: string;
        let tileBg: string | null = null;

        if (b > 0.8) {
          // Intense bioluminescent white core
          charColor = "#FFFFFF";
          tileBg = "rgba(224, 242, 254, 0.45)";
        } else if (b > 0.55) {
          // Electric cyan / sky blue
          charColor = `rgb(${Math.floor(pt.r * 1.1)}, ${Math.floor(pt.g * 1.15)}, 255)`;
          tileBg = "rgba(56, 189, 248, 0.22)";
        } else if (b > 0.35) {
          // Signal cobalt / oceanic deep blue
          charColor = "#2563EB";
          tileBg = "rgba(37, 99, 235, 0.12)";
        } else {
          // Fading tail / perimeter graphite blue
          charColor = "#4B6B94";
        }

        // Subtle matrix glitch / character scramble over time
        let displayChar = pt.char;
        if (Math.sin(time * 3 + i * 17) > 0.94) {
          const scrambleIdx = (i + Math.floor(time * 8)) % SHARK_CHARS.length;
          displayChar = SHARK_CHARS[scrambleIdx];
        }

        // Draw individual ASCII block background tile for dense glowing cells
        if (tileBg) {
          ctx.fillStyle = tileBg;
          ctx.fillRect(
            finalX - cellSize / 2 + 0.5,
            finalY - cellSize / 2 + 0.5,
            cellSize - 1,
            cellSize - 1
          );
        }

        // Draw the ASCII character glyph
        ctx.fillStyle = charColor;
        ctx.fillText(displayChar, finalX, finalY);
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
        className="w-full h-full block"
      />
      {/* Soft paper canvas gradient overlay on the left to preserve text legibility */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#F4F3EF] via-[#F4F3EF]/75 to-transparent pointer-events-none" />
    </div>
  );
}
