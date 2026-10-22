"use client";

import { useEffect, useRef } from "react";

interface InteractiveSquareGridProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  cellSize?: number;
  className?: string;
}

export default function InteractiveSquareGrid({
  containerRef,
  cellSize = 44,
  className = "",
}: InteractiveSquareGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use containerRef if provided, else canvas parent element
    const container = containerRef?.current || (canvas.parentElement as HTMLElement | null);
    if (!container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let grid = new Float32Array(0);
    let width = 0;
    let height = 0;
    let mouse = { x: -9999, y: -9999, active: false };
    let animationId: number;
    let lastSparkTime = 0;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      if (!canvas || !container || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / cellSize);
      rows = Math.ceil(height / cellSize);

      const prevGrid = grid;
      grid = new Float32Array(cols * rows);
      if (prevGrid && prevGrid.length > 0) {
        for (let i = 0; i < Math.min(prevGrid.length, grid.length); i++) {
          grid[i] = prevGrid[i] * 0.8;
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
        mouse.active = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", resize, { passive: true });

    let lastTime = performance.now();

    function render(currentTime: number) {
      if (!ctx) return;
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const decayFactor = Math.exp(-dt * 3.2);

      // Ambient periodic faint spark so canvas feels alive
      if (!reducedMotion && currentTime - lastSparkTime > 1400) {
        lastSparkTime = currentTime;
        const randCol = Math.floor(Math.random() * cols);
        const randRow = Math.floor(Math.random() * rows);
        const idx = randRow * cols + randCol;
        if (idx >= 0 && idx < grid.length) {
          grid[idx] = Math.max(grid[idx], 0.45);
        }
      }

      // If mouse is active, illuminate square under mouse and nearby cells with radial falloff
      if (mouse.active && !reducedMotion) {
        const mouseCol = mouse.x / cellSize;
        const mouseRow = mouse.y / cellSize;
        const radius = 2.8;

        const minC = Math.max(0, Math.floor(mouseCol - radius));
        const maxC = Math.min(cols - 1, Math.ceil(mouseCol + radius));
        const minR = Math.max(0, Math.floor(mouseRow - radius));
        const maxR = Math.min(rows - 1, Math.ceil(mouseRow + radius));

        for (let r = minR; r <= maxR; r++) {
          for (let c = minC; c <= maxC; c++) {
            const centerCellX = c + 0.5;
            const centerCellY = r + 0.5;
            const dist = Math.hypot(centerCellX - mouseCol, centerCellY - mouseRow);
            if (dist <= radius) {
              const intensity = Math.pow(Math.cos((dist / radius) * (Math.PI / 2)), 1.8);
              const idx = r * cols + c;
              grid[idx] = Math.max(grid[idx], intensity);
            }
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Base faint grid wire
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(23, 23, 24, 0.045)";

      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        const x = Math.round(c * cellSize) + 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r <= rows; r++) {
        const y = Math.round(r * cellSize) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw highlighted square boxes
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          let val = grid[idx];

          if (val > 0.005) {
            const x = c * cellSize;
            const y = r * cellSize;

            // Fill illuminated square box with sleek monochrome fill
            const fillAlpha = (val * 0.075).toFixed(3);
            ctx.fillStyle = `rgba(18, 18, 20, ${fillAlpha})`;
            ctx.fillRect(x + 1, y + 1, cellSize - 1, cellSize - 1);

            // Border glow
            const borderAlpha = (val * 0.22).toFixed(3);
            ctx.strokeStyle = `rgba(23, 23, 24, ${borderAlpha})`;
            ctx.strokeRect(x + 0.5, y + 0.5, cellSize, cellSize);

            // Subtle corner indicator / emerald telemetry dot for highest intensity cells
            if (val > 0.45) {
              const dotAlpha = ((val - 0.45) / 0.55).toFixed(2);
              ctx.fillStyle = `rgba(16, 185, 129, ${Number(dotAlpha) * 0.75})`;
              ctx.beginPath();
              ctx.arc(x + cellSize - 5, y + 5, 1.4, 0, Math.PI * 2);
              ctx.fill();
            }

            // Decay cell intensity smoothly
            grid[idx] = val * decayFactor;
          } else {
            grid[idx] = 0;
          }
        }
      }

      animationId = requestAnimationFrame(render);
    }

    resize();
    animationId = requestAnimationFrame(render);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [cellSize, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-[1] ${className}`}
    />
  );
}
