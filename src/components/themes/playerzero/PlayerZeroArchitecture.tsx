"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { IFlagshipDossier } from "@/models/Portfolio";
import { ArrowUpRight, Cpu } from "lucide-react";

export default function PlayerZeroArchitecture({
  dossier,
}: {
  dossier: IFlagshipDossier;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    function resize() {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
      drawCluster(rect.width, rect.height);
    }

    function drawCluster(width: number, height: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const cols = 48;
      const rows = 36;
      const stepX = width / cols;
      const stepY = height / rows;

      // Animate organic attractor coordinates slightly over time
      const t = tick * 0.015;
      const a1x = width * (0.72 + Math.sin(t) * 0.04);
      const a1y = height * (0.45 + Math.cos(t * 0.8) * 0.04);
      const a2x = width * (0.38 + Math.cos(t * 0.7) * 0.03);
      const a2y = height * (0.75 + Math.sin(t * 0.6) * 0.03);
      const a3x = width * 0.85;
      const a3y = height * 0.85;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * stepX + stepX / 2;
          const y = j * stepY + stepY / 2;

          const d1 = Math.hypot(x - a1x, y - a1y);
          const d2 = Math.hypot(x - a2x, y - a2y);
          const d3 = Math.hypot(x - a3x, y - a3y);

          let influence =
            Math.exp(-Math.pow(d1 / (width * 0.28), 2)) * 1.3 +
            Math.exp(-Math.pow(d2 / (width * 0.22), 2)) * 0.9 +
            Math.exp(-Math.pow(d3 / (width * 0.18), 2)) * 0.7;

          const noise =
            (Math.sin(i * 1.5 + t) * Math.cos(j * 1.5 - t) + 1) * 0.15;
          influence += noise;

          if (influence > 0.25) {
            const radius = Math.min(Math.max((influence - 0.2) * 3.8, 0.4), 3.2);
            const opacity = Math.min(Math.max(influence * 0.75, 0.12), 0.85);

            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(20, 20, 24, ${opacity})`;
            ctx.fill();
          }
        }
      }
    }

    function animate() {
      tick++;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        drawCluster(rect.width, rect.height);
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      className="max-w-6xl mx-auto px-6 py-16 sm:py-24"
      data-purpose="highlight-architecture"
      id="architecture"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Content Column with smooth reveal animation */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          <span className="text-xs font-mono font-medium tracking-widest text-stone-400 uppercase mb-3 flex items-center gap-2">
            <Cpu size={14} />
            {dossier.category || "FLAGSHIP SYSTEM"}
          </span>
          <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-950 mb-3">
            Introducing{" "}
            <span className="font-normal text-stone-700">{dossier.title}</span>
          </h3>
          <p className="text-lg sm:text-xl font-light text-stone-600 leading-snug mb-6">
            {dossier.subtitle ||
              "Autonomous multi-model routing engine capable of synthesizing execution plans in high-throughput enterprise environments."}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mb-8 max-w-lg">
            {dossier.description}
          </p>

          {/* Metrics Pill Grid */}
          {dossier.metrics && dossier.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              {dossier.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#e5e5e8] rounded-xl p-3 font-mono shadow-xs"
                >
                  <div className="text-base font-semibold text-neutral-900">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-stone-500 uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4">
            {dossier.github && (
              <a
                className="inline-flex items-center gap-2.5 bg-[#121213] hover:bg-neutral-800 text-white text-xs font-medium px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm active:scale-95"
                href={dossier.github}
                target="_blank"
                rel="noreferrer"
              >
                <span className="w-2.5 h-2.5 grid grid-cols-2 gap-0.5">
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                  <span className="w-1 h-1 bg-white rounded-full"></span>
                </span>
                <span>Read Architecture Deep-Dive</span>
                <ArrowUpRight size={13} />
              </a>
            )}
            <span className="text-xs font-mono text-stone-400">
              v2.4.0 (Active)
            </span>
          </div>

          {/* Bottom Micro Tagline */}
          <div className="mt-12 pt-6 border-t border-[#e5e5e8]/80">
            <p className="text-xs sm:text-sm text-stone-800 font-medium">
              Debug any distributed hallucination down to an individual embedding slice,{" "}
              <span className="text-stone-500 font-normal">
                and ensure prompt drifts never leak into production.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Right Point-Cloud Graphic Column with scale & fade entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 25 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] lg:min-h-[460px] bg-stone-100/60 rounded-3xl border border-stone-200/70 p-4 overflow-hidden shadow-sm"
        >
          {/* Halftone canvas simulating latent space & weights */}
          <canvas
            ref={canvasRef}
            aria-label="Latent Space Vector Embedding Point Cloud Visualizer"
            className="w-full h-full opacity-85 mix-blend-multiply"
          />

          {/* Minimalist floating info pills over canvas */}
          <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-xl px-3 py-2 text-[10px] font-mono text-stone-600 shadow-sm pointer-events-none">
            <span className="font-semibold text-neutral-900">Latent Dim:</span> 4,096
            &nbsp;•&nbsp;
            <span className="font-semibold text-neutral-900">Cosine Sim:</span> 0.994
          </div>
          <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-xl px-3 py-2 text-[10px] font-mono text-stone-600 shadow-sm pointer-events-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Organic Attractor Topology</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
