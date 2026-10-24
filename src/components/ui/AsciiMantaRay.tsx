"use client";

import { useEffect, useRef } from "react";

interface SampledPixel {
  x: number; // normalized 0..1 in source image
  y: number; // normalized 0..1 in source image
  brightness: number; // 0..1 (inverted from light source background)
  r: number;
  g: number;
  b: number;
}

interface AsciiMantaRayProps {
  className?: string;
  interactive?: boolean;
}

export default function AsciiMantaRay({
  className = "",
  interactive = true,
}: AsciiMantaRayProps) {
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

    // Load source manta ray ASCII image
    const img = new Image();
    img.src = "/images/project-ascii.jfif";

    let sampledRay: SampledPixel[] = [];

    img.onload = () => {
      const offCanvas = document.createElement("canvas");
      const cols = 42;
      const rows = 56;
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

          // Bounding filter isolating manta ray body and wings
          if (ny < 0.20 || ny > 0.88) continue;
          if (nx < 0.11 || nx > 0.89) continue;

          const idx = (r * cols + c) * 4;
          const red = imgData[idx];
          const green = imgData[idx + 1];
          const blue = imgData[idx + 2];

          // Source image has light background (~243); dark foreground points are the creature
          const lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
          const invertedLum = Math.max(0, 1 - lum);

          if (invertedLum > 0.10) {
            pixels.push({
              x: nx,
              y: ny,
              brightness: invertedLum,
              r: red,
              g: green,
              b: blue,
            });
          }
        }
      }

      sampledRay = pixels;
    };

    // Fallback manta ray parametric geometry
    const generateFallbackManta = (): SampledPixel[] => {
      const fallback: SampledPixel[] = [];
      const cols = 36;
      const rows = 48;

      for (let r = 0; r < rows; r++) {
        const ny = 0.22 + (r / rows) * 0.64;
        const progress = r / rows;

        // Wing span reaches max around progress = 0.35, then narrows to tail
        let span = 0.05;
        if (progress < 0.50) {
          span = 0.06 + Math.sin(progress * Math.PI) * 0.38;
        } else {
          span = 0.04 + (1 - (progress - 0.50) / 0.50) * 0.05;
        }

        for (let c = 0; c < cols; c++) {
          const nx = c / cols;
          const distFromSpine = Math.abs(nx - 0.50);
          if (distFromSpine < span) {
            const b = 1 - distFromSpine / span;
            fallback.push({
              x: nx,
              y: ny,
              brightness: b,
              r: 30,
              g: 60,
              b: 120,
            });
          }
        }
      }
      return fallback;
    };

    const fallbackRay = generateFallbackManta();

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
      const time = (now - startTime) * 0.001;
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 640;
      const baseCenterX = width * 0.50;
      const baseCenterY = height * 0.50;

      // Gentle floating heave & drift
      const swimCycle = time * 2.2;
      const driftY = Math.sin(time * 0.8) * 8;
      const driftX = Math.cos(time * 0.6) * 6;

      const mantaScale = Math.min(width * 0.85, height * 0.90);

      // Ambient bioluminescent background glow field
      const glowGrad = ctx.createRadialGradient(
        baseCenterX + driftX,
        baseCenterY + driftY,
        30,
        baseCenterX + driftX,
        baseCenterY + driftY,
        mantaScale * 0.55
      );
      glowGrad.addColorStop(0, "rgba(56, 189, 248, 0.20)");
      glowGrad.addColorStop(0.4, "rgba(37, 99, 235, 0.10)");
      glowGrad.addColorStop(1, "rgba(244, 243, 239, 0)");

      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      const activePixels = sampledRay.length > 0 ? sampledRay : fallbackRay;
      const cellSize = isMobile ? 8.0 : 10.0;
      const mouse = mousePosRef.current;

      const mantaMidX = 0.500;
      const mantaMidY = 0.534;

      // Render each pixel as a dynamic geometric square box
      for (let i = 0; i < activePixels.length; i++) {
        const pt = activePixels[i];

        const relX = (pt.x - mantaMidX) * mantaScale;
        const relY = (pt.y - mantaMidY) * mantaScale;

        // REAL-TIME MANTA RAY WING FLAPPING & TAIL WHIP:
        // Distance from central spine
        const wingProgress = Math.min(1, Math.abs(pt.x - 0.500) / 0.364);

        // Undulating traveling wave from center outwards to wingtips
        const wingPhase = swimCycle - wingProgress * 2.6 - (pt.y - 0.20) * 1.6;
        const wingLift = Math.sin(wingPhase) * (Math.pow(wingProgress, 1.8) * 16);

        // Tail whip wave for points along the lower spine
        const tailProgress = Math.max(0, (pt.y - 0.55) / 0.31);
        const tailWhip = Math.sin(swimCycle * 1.3 - tailProgress * 3.5) * (Math.pow(tailProgress, 1.6) * 12);

        let finalX = baseCenterX + driftX + relX + (wingProgress < 0.15 ? tailWhip : 0);
        let finalY = baseCenterY + driftY + relY + wingLift;

        // Interactive cursor push
        if (mouse.active) {
          const mdx = finalX - mouse.x;
          const mdy = finalY - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 120) {
            const push = (1 - mDist / 120) * 10;
            finalX += (mdx / mDist) * push;
            finalY += (mdy / mDist) * push;
          }
        }

        const b = pt.brightness;
        const boxScale = 0.30 + Math.pow(b, 1.25) * 0.70;
        const boxSize = (cellSize - 1.2) * boxScale;
        const halfSize = boxSize / 2;

        let boxColor: string;
        let borderColor: string | null = null;
        let showInnerCore = false;

        if (b > 0.50) {
          // Intense core: signal cobalt with white center
          boxColor = "#2563EB";
          borderColor = "#1D4ED8";
          showInnerCore = true;
        } else if (b > 0.28) {
          // Mid wing: electric cyan / sky azure
          boxColor = "#0284C7";
          borderColor = "#0369A1";
        } else if (b > 0.16) {
          // Outer wing: oceanic cobalt
          boxColor = "#3B82F6";
        } else {
          // Fading wingtips / tail: slate cobalt
          boxColor = "#60A5FA";
        }

        const renderX = Math.round(finalX - halfSize);
        const renderY = Math.round(finalY - halfSize);
        const renderSize = Math.max(2, Math.round(boxSize));

        // 1. Draw solid square box
        ctx.fillStyle = boxColor;
        ctx.fillRect(renderX, renderY, renderSize, renderSize);

        // 2. Draw fine architectural hairline border
        if (borderColor && renderSize > 5) {
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 0.75;
          ctx.strokeRect(renderX + 0.5, renderY + 0.5, renderSize - 1, renderSize - 1);
        }

        // 3. Nested luminous white core for high-density cells
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
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
