"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { IFlagshipDossier } from "@/models/Portfolio";
import { hardwareSound } from "./hardwareSound";
import { Cpu, ArrowUpRight, Github, Activity, Sliders, CheckCircle2 } from "lucide-react";

export default function IndustrialDossier({ dossier }: { dossier: IFlagshipDossier }) {
  const [activeStage, setActiveStage] = useState(0);

  if (!dossier) return null;

  const PIPELINE_STEPS = [
    { title: "TOKEN STREAM INGEST", desc: "Non-blocking SSE parser & raw semantic AST normalizer", time: "1.2ms" },
    { title: "DAG STATE ROUTER", desc: "LangGraph speculative state evaluator with cyclical fallback", time: "8.4ms" },
    { title: "TENSORRT-LLM ENGINE", desc: "FP8 kernel quantization with sub-second KV-cache reuse", time: "14.6ms" },
    { title: "SELF-HEALING EVAL", desc: "Deterministic JSON schema validator & auto-retry gate", time: "3.1ms" },
  ];

  const handleSelectStage = (idx: number) => {
    hardwareSound.playMechanicalClick(900 + idx * 120, 0.025, "high");
    setActiveStage(idx);
  };

  return (
    <section id="dossier" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-[#CAC8BD] pb-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="px-2 py-0.5 bg-[#1C1B1A] text-[#00E676] font-mono text-[10px] font-bold rounded-[3px]">
            SECTION // 03
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#1C1B1A] uppercase tracking-wider">
            FLAGSHIP SILICON DOSSIER
          </h2>
        </div>
        <div className="font-mono text-xs text-[#78766C] hidden sm:block">
          SPECIFICATION // {dossier.sectionIndex || "01"}
        </div>
      </div>

      {/* Main Stamped Aluminum Workstation */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#EBE9E1] border-2 border-[#CAC8BD] rounded-[14px] p-6 sm:p-10 shadow-[0_6px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
      >
        {/* Fastener Screws */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[8px] text-[#78766C] font-mono font-bold">+</div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[8px] text-[#78766C] font-mono font-bold">+</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Spec Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="px-2 py-0.5 bg-[#FF4F00] text-white font-bold rounded-[3px]">
                {dossier.category || "FLAGSHIP ARCHITECTURE"}
              </span>
              <span className="text-[#78766C]">{dossier.subtitle}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-mono font-bold text-[#1C1B1A] leading-tight">
              {dossier.title}
            </h3>

            <p className="text-sm sm:text-base font-sans text-[#4A4840] leading-relaxed">
              {dossier.description}
            </p>

            {/* Metrics LCD Grid */}
            {dossier.metrics && dossier.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {dossier.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="bg-[#181716] border border-[#2D2B27] rounded-[6px] p-3 font-mono shadow-inner text-[#FF4F00]"
                  >
                    <span className="text-[9px] text-[#8C8A7E] uppercase block tracking-wider">
                      {m.label}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-white block mt-0.5">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#CCCABF]">
              {dossier.github && (
                <a
                  href={dossier.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => hardwareSound.playMechanicalClick(1100, 0.02, "high")}
                  className="px-4 py-2 bg-[#1C1B1A] hover:bg-black text-[#F4F3EF] rounded-[4px] font-mono text-xs font-semibold flex items-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-[1px]"
                >
                  <Github size={13} />
                  <span>INSPECT SCHEMATIC (GH)</span>
                </a>
              )}

              {dossier.live && (
                <a
                  href={dossier.live}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => hardwareSound.playMechanicalClick(1300, 0.02, "high")}
                  className="px-4 py-2 bg-[#FF4F00] hover:bg-[#E54500] text-white rounded-[4px] font-mono text-xs font-semibold flex items-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] active:translate-y-[1px]"
                >
                  <span>LIVE REASONING BUS</span>
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>

          {/* Right Pipeline Interactive Hardware Test Board (5 cols) */}
          <div className="lg:col-span-5 bg-[#DFDCD3] border-2 border-[#BCBAAD] rounded-[10px] p-5 shadow-inner">
            <div className="flex items-center justify-between border-b border-[#CCCABF] pb-3 mb-4 font-mono text-xs text-[#1C1B1A]">
              <div className="flex items-center gap-2 font-bold">
                <Activity size={14} className="text-[#FF4F00]" />
                <span>SIGNAL ROUTE DIAGRAM</span>
              </div>
              <span className="text-[10px] text-[#78766C]">STAGE // 0{activeStage + 1} OF 04</span>
            </div>

            {/* Stage Selector Tactile Pushbuttons */}
            <div className="space-y-2 mb-4">
              {PIPELINE_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectStage(idx)}
                  className={`w-full text-left p-2.5 rounded-[6px] border font-mono transition-all flex items-center justify-between active:translate-y-[1px] ${
                    activeStage === idx
                      ? "bg-[#1C1B1A] text-white border-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
                      : "bg-[#EBE9E1] text-[#4A4840] border-[#CCCABF] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activeStage === idx ? "bg-[#FF4F00] animate-ping" : "bg-[#B5B3A6]"
                      }`}
                    />
                    <span className="text-xs font-bold">{step.title}</span>
                  </div>
                  <span className={`text-[10px] font-bold ${activeStage === idx ? "text-[#00E676]" : "text-[#78766C]"}`}>
                    {step.time}
                  </span>
                </button>
              ))}
            </div>

            {/* Recessed Stage Inspector Box */}
            <div className="bg-[#141312] border border-[#2D2B27] rounded-[6px] p-4 text-[#FF4F00] font-mono text-xs shadow-inner">
              <span className="text-[9px] text-[#8C8A7E] uppercase block mb-1">
                EXECUTION TELEMETRY
              </span>
              <p className="text-xs font-sans text-stone-200 leading-relaxed mb-3">
                {PIPELINE_STEPS[activeStage].desc}
              </p>
              <div className="flex items-center justify-between text-[10px] border-t border-[#292825] pt-2 text-[#00E676]">
                <span>STATUS: DETERMINISTIC</span>
                <span>LATENCY: {PIPELINE_STEPS[activeStage].time}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
