"use client";

import { useEffect, useRef } from "react";

interface AsciiSharkProps {
  className?: string;
  interactive?: boolean;
}

// Authentic square matrix glyphs
const SQUARE_CHARS = ["▪", "■", "█", "▫", "◽", "◾", "◻", "◼"];

interface SampledPixel {
  x: number; // normalized 0..1 in source image
  y: number; // normalized 0..1 in source image
  brightness: number; // 0..1
  r: number;
  g: number;
  b: number;
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

          // 1. ISOLATE SHARK SILHOUETTE: Filter top-right flare and outer margins
          if (ny < 0.22 || ny > 0.78) continue; // head and tail bounds
          if (ny < 0.35 && nx > 0.65) continue; // top-right flare artifact
          if (nx < 0.14 || nx > 0.92) continue; // outer side margins

          // 2. REMOVE DETACHED OBJECT / FIN BESIDE THE FISH:
          // Strictly eliminates the disconnected artifact at ny > 0.50, nx < 0.32
          if (ny > 0.50 && nx < 0.32) continue;

          const idx = (r * cols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];
          // Perceived luminance
          const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

          // Strict threshold so only the actual glowing shark body & fins are captured
          if (luminance > 0.20) {
            pixels.push({
              x: nx,
              y: ny,
              brightness: luminance,
              r: red,
              g: green,
              b: blue,
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
        const ny = 0.24 + (r / rows) * 0.50;
        // Shark spine center curving diagonally from snout to tail
        const spineX = 0.22 + (r / rows) * 0.60;
        // Body width tapering smoothly from head/torso to tail
        let bodyW = 0.12 * Math.sin((r / rows) * Math.PI);
        if (r / rows > 0.6) bodyW = 0.06 * (1 - (r / rows - 0.6) / 0.4);

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

      // Positioned on the right side of the dossier with generous padding so the tail never clips
      const baseCenterX = isMobile ? width * 0.65 : width * 0.70;
      const baseCenterY = height * 0.50;

      // Gentle swimming locomotion: gliding drift + forward acceleration pulses
      const swimCycle = time * 2.2;
      const driftX = Math.sin(time * 0.6) * (isMobile ? 6 : 10);
      const driftY = Math.cos(time * 0.8) * (isMobile ? 8 : 10);

      // Responsive shark scale with safe bounds preserving right margin
      const sharkScale = isMobile
        ? Math.min(width * 0.65, height * 0.70)
        : Math.min(width * 0.38, height * 0.86);

      // Render ambient bioluminescent background glow field
      const glowGrad = ctx.createRadialGradient(
        baseCenterX + driftX,
        baseCenterY + driftY,
        25,
        baseCenterX + driftX,
        baseCenterY + driftY,
        sharkScale * 0.68
      );
      glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.16)"); // soft cyan core glow
      glowGrad.addColorStop(0.4, "rgba(37, 99, 235, 0.08)"); // cobalt ring
      glowGrad.addColorStop(1, "rgba(244, 243, 239, 0)"); // fade cleanly into paper canvas

      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Select active shark pixel source (filtered contiguous shark silhouette)
      const activePixels = sampledShark.length > 0 ? sampledShark : fallbackShark;

      // Cell size for rendering square box matrix
      const cellSize = isMobile ? 8.5 : 10.5;
      const mouse = mousePosRef.current;

      // True geometric centroid of the clean contiguous shark body
      const sharkMidX = 0.514;
      const sharkMidY = 0.491;

      // Loop through each pixel of the shark matrix ONLY
      for (let i = 0; i < activePixels.length; i++) {
        const pt = activePixels[i];

        // Normalized relative coordinates centered on shark midpoint
        const relX = (pt.x - sharkMidX) * sharkScale;
        const relY = (pt.y - sharkMidY) * sharkScale;

        // REAL-TIME SHARK LOCOMOTION WAVE:
        // Spine traveling wave with organic tail whip undulation
        const spineProgress = Math.max(0, Math.min(1, (pt.y - 0.24) / 0.50)); // 0 at snout, 1 at tail
        const waveAmp = (isMobile ? 2 : 3) + Math.pow(spineProgress, 2.0) * (isMobile ? 14 : 20);
        const wavePhase = swimCycle - spineProgress * 5.2;
        const waveOffset = Math.sin(wavePhase) * waveAmp;

        // Whole-body swimming yaw angle
        const bodyYaw = Math.cos(swimCycle) * 0.045;
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

        // Color & geometry computation for square box matrix
        const b = pt.brightness;

        // Dynamic square box sizing based on luminance
        const boxScale = 0.32 + Math.pow(b, 1.25) * 0.68;
        const boxSize = (cellSize - 1.2) * boxScale;
        const halfSize = boxSize / 2;

        let boxColor: string;
        let borderColor: string | null = null;
        let showInnerCore = false;

        if (b > 0.78) {
          // Intense bioluminescent core: signal cobalt with white center core
          boxColor = "#2563EB";
          borderColor = "#1D4ED8";
          showInnerCore = true;
        } else if (b > 0.54) {
          // Mid-body: electric cyan / sky azure
          boxColor = "#0284C7";
          borderColor = "#0369A1";
        } else if (b > 0.36) {
          // Torso perimeter: oceanic cobalt
          boxColor = "#3B82F6";
        } else {
          // Fading fins / tail: muted slate cobalt
          boxColor = "#60A5FA";
        }

        // Interactive cursor proximity reaction
        if (mouse.active) {
          const mdx = finalX - mouse.x;
          const mdy = finalY - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120) {
            boxColor = "#1D4ED8";
          }
        }

        const renderX = Math.round(finalX - halfSize);
        const renderY = Math.round(finalY - halfSize);
        const renderSize = Math.max(2, Math.round(boxSize));

        // 1. Draw solid square box
        ctx.fillStyle = boxColor;
        ctx.fillRect(renderX, renderY, renderSize, renderSize);

        // 2. Draw fine architectural hairline border on prominent square boxes
        if (borderColor && renderSize > 5) {
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 0.75;
          ctx.strokeRect(renderX + 0.5, renderY + 0.5, renderSize - 1, renderSize - 1);
        }

        // 3. For dense core boxes, draw a luminous inner square box (nested square box)
        if (showInnerCore && renderSize > 6) {
          const innerSize = Math.max(2, Math.round(renderSize * 0.40));
          const innerX = Math.round(finalX - innerSize / 2);
          const innerY = Math.round(finalY - innerSize / 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(innerX, innerY, innerSize, innerSize);
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
        className="w-full h-full block"
      />
      {/* Soft paper canvas gradient overlay on the left to preserve text legibility */}
      <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-[#F4F3EF] via-[#F4F3EF]/80 to-transparent pointer-events-none" />
    </div>
  );
}
