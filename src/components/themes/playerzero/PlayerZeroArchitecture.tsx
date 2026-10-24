"use client";

import { motion } from "framer-motion";
import type { IFlagshipDossier } from "@/models/Portfolio";
import { ArrowUpRight, Cpu } from "lucide-react";
import AsciiShark from "@/components/ui/AsciiShark";

export default function PlayerZeroArchitecture({
  dossier,
}: {
  dossier: IFlagshipDossier;
}) {
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

        {/* Right Animated ASCII Shark Graphic Column with scale & fade entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 25 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex items-center justify-center min-h-[400px] lg:min-h-[480px] bg-white rounded-3xl border border-stone-200/80 p-4 overflow-hidden shadow-xs select-none"
        >
          {/* Animated Bioluminescent Matrix Shark Canvas */}
          <AsciiShark
            centerXRatio={0.50}
            centerYRatio={0.50}
            scaleRatio={0.72}
            showLeftFade={false}
          />

          {/* Minimalist floating info pills over canvas */}
          <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-xl px-3 py-2 text-[10px] font-mono text-stone-600 shadow-sm pointer-events-none">
            <span className="font-semibold text-neutral-900">Locomotion:</span> Undulating Spine
            &nbsp;•&nbsp;
            <span className="font-semibold text-neutral-900">Latency:</span> 0.8ms
          </div>
          <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm border border-stone-200/80 rounded-xl px-3 py-2 text-[10px] font-mono text-stone-600 shadow-sm pointer-events-none flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Bioluminescent Square Matrix Shark</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
