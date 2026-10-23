"use client";

import { motion } from "framer-motion";
import type { IProjectItem } from "@/models/Portfolio";
import { hardwareSound } from "./hardwareSound";
import { ArrowUpRight, Github, ExternalLink, Terminal, Radio } from "lucide-react";

export default function IndustrialProjects({ projects }: { projects: IProjectItem[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-[#CAC8BD] pb-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="px-2 py-0.5 bg-[#FF4F00] text-white font-mono text-[10px] font-bold rounded-[3px]">
            SECTION // 02
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#1C1B1A] uppercase tracking-wider">
            PRODUCTION HARDWARE &amp; SYSTEM UNITS
          </h2>
        </div>
        <div className="font-mono text-xs text-[#78766C] hidden sm:block">
          STATUS: {projects.length} UNITS RUNNING
        </div>
      </div>

      {/* Grid of Modular Hardware Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.codeIndex || idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="group bg-[#EBE9E1] border-2 border-[#CAC8BD] hover:border-[#1C1B1A] rounded-[12px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Unit Header Bar with Stamping & Version */}
              <div className="flex items-center justify-between border-b border-[#CCCABF] pb-3 mb-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 bg-[#1C1B1A] text-white font-bold rounded-[3px]">
                    SYS-0{idx + 1}
                  </span>
                  <span className="text-[#FF4F00] font-bold">{proj.codeIndex}</span>
                  <span className="text-[#8C8A7E]">/</span>
                  <span className="text-[#6B695E] text-[11px]">{proj.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                  <span className="font-mono text-[10.5px] font-bold text-[#1C1B1A] bg-[#DFDCD3] px-2 py-0.5 rounded-[3px] border border-[#BCBAAD]">
                    {proj.version || "REV. 1.0"}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-xl font-mono font-bold text-[#1C1B1A] group-hover:text-[#FF4F00] transition-colors mb-2">
                {proj.title}
              </h3>

              <p className="text-xs sm:text-sm font-sans text-[#4A4840] leading-relaxed mb-5">
                {proj.description}
              </p>

              {/* Recessed Mini LCD Telemetry Readout */}
              <div className="bg-[#181716] border border-[#2D2B27] rounded-[6px] p-3 mb-5 font-mono text-xs flex items-center justify-between text-[#FFD000] shadow-inner">
                <div>
                  <span className="text-[9px] text-[#8C8A7E] uppercase block">BENCHMARK METRIC</span>
                  <span className="text-sm font-bold text-white">{proj.metric}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-[#8C8A7E] uppercase block">SPEC / SUB</span>
                  <span className="text-xs text-[#00E676] font-semibold">{proj.metricSub}</span>
                </div>
              </div>

              {/* Tech Stack Hardware Jumpers */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {(proj.tech || proj.techStack.split(",")).map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-[#DFDCD3] border border-[#CCCABF] text-[#4A4840] font-mono text-[10.5px] font-medium rounded-[3px]"
                  >
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom 3.5mm Metal Audio Jack Output Connections */}
            <div className="pt-4 border-t border-[#CCCABF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => hardwareSound.playMechanicalClick(1100, 0.02, "high")}
                    className="px-3 py-1.5 bg-[#1C1B1A] hover:bg-black text-[#F4F3EF] rounded-[4px] font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                  >
                    <Github size={12} />
                    <span>SOURCE // GH</span>
                  </a>
                )}

                {proj.live && (
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => hardwareSound.playMechanicalClick(1300, 0.02, "high")}
                    className="px-3 py-1.5 bg-[#FF4F00] hover:bg-[#E54500] text-white rounded-[4px] font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px]"
                  >
                    <span>LIVE OUT</span>
                    <ArrowUpRight size={12} />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-1 text-[10px] font-mono text-[#78766C]">
                <Radio size={12} className="text-[#FF4F00]" />
                <span>ONLINE</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
