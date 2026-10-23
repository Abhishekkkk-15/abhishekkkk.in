"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { IProfile } from "@/models/Portfolio";
import { hardwareSound } from "./hardwareSound";
import { ArrowDown, Cpu, Sliders, Radio, Sparkles } from "lucide-react";

export default function IndustrialHero({ profile }: { profile: IProfile }) {
  // Interactive Rotary Dial States (Teenage Engineering style 4-knob control block)
  const [knobValues, setKnobValues] = useState({
    latency: 38, // ms
    quant: 8, // bit
    agents: 16, // active pods
    temp: 0.2, // sampling
  });

  const [activeSignal, setActiveSignal] = useState<"RUN" | "EVAL" | "BENCH">("RUN");

  const rotateKnob = (key: keyof typeof knobValues, delta: number) => {
    hardwareSound.playDialTick();
    setKnobValues((prev) => {
      let val = prev[key] + delta;
      if (key === "latency") val = Math.max(12, Math.min(120, val));
      if (key === "quant") val = val > 8 ? 4 : 8;
      if (key === "agents") val = Math.max(2, Math.min(64, val));
      if (key === "temp") val = Number(Math.max(0.0, Math.min(1.0, val)).toFixed(1));
      return { ...prev, [key]: val };
    });
  };

  const handleButtonPress = (signal: "RUN" | "EVAL" | "BENCH") => {
    hardwareSound.playMechanicalClick(signal === "RUN" ? 880 : signal === "EVAL" ? 1040 : 1240, 0.03, "high");
    setActiveSignal(signal);
  };

  return (
    <section className="relative pt-8 pb-16 px-4 sm:px-6 select-none max-w-7xl mx-auto w-full">
      {/* Precision Millimeter Ruler Scale */}
      <div className="w-full h-4 flex items-center justify-between text-[8px] font-mono text-[#8C8A7E] border-b border-[#CCCABF] pb-1 mb-6 overflow-hidden">
        <span className="tracking-widest hidden sm:inline">000mm</span>
        <div className="flex-1 mx-4 text-center tracking-[4px] text-[7px] text-[#A6A498] truncate">
          |'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|'''|
        </div>
        <span className="tracking-widest hidden sm:inline">980mm // CHASSIS-SPEC</span>
      </div>

      {/* Main Industrial Chassis Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#EBE9E1] border-2 border-[#CAC8BD] rounded-[14px] p-5 sm:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
      >
        {/* Corner Screws */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[8px] text-[#78766C] font-mono font-bold">+</div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[8px] text-[#78766C] font-mono font-bold">+</div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[8px] text-[#78766C] font-mono font-bold">+</div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[8px] text-[#78766C] font-mono font-bold">+</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Block: Primary Typography & Identity Stamping (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Model Tag Line */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className="px-2 py-0.5 bg-[#FF4F00] text-white font-bold rounded-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                MODEL: AP-2026
              </span>
              <span className="px-2 py-0.5 bg-[#DCD9CE] text-[#55534A] rounded-[3px] border border-[#BCBAAD]">
                REV: 3.4
              </span>
              <span className="text-[#78766C] uppercase hidden sm:inline">
                // AUTONOMOUS AGENT RUNTIME
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-mono font-bold text-[#1C1B1A] uppercase tracking-tight leading-none">
                {profile.name}
              </h1>
              <div className="inline-block bg-[#1C1B1A] text-[#FF4F00] font-mono text-xs sm:text-sm px-2.5 py-1 rounded-[3px] font-semibold tracking-wider">
                {profile.role}
              </div>
            </div>

            {/* Lead Statement */}
            <p className="text-sm sm:text-base font-sans text-[#4A4840] leading-relaxed max-w-xl">
              {profile.headline ||
                "Architecting ultra-low-latency autonomous AI agent state machines, distributed inference pipelines, and deterministic systems software."}
            </p>

            {/* Physical Mechanical Pushbuttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => hardwareSound.playMechanicalClick(750, 0.03, "high")}
                className="px-5 py-2.5 bg-[#FF4F00] hover:bg-[#E54500] text-white rounded-[6px] font-mono text-xs font-bold tracking-wider uppercase border border-[#B83700] shadow-[0_3px_0_#A83200,0_5px_8px_rgba(0,0,0,0.2)] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2"
              >
                <span>DEPLOYED WORK</span>
                <ArrowDown size={14} />
              </a>

              <a
                href="#dossier"
                onClick={() => hardwareSound.playMechanicalClick(950, 0.03, "mid")}
                className="px-5 py-2.5 bg-[#FFFFFF] hover:bg-[#F7F6F2] text-[#1C1B1A] rounded-[6px] font-mono text-xs font-bold tracking-wider uppercase border border-[#CCCABF] shadow-[0_3px_0_#B5B3A6,0_5px_8px_rgba(0,0,0,0.1)] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2"
              >
                <span>FLAGSHIP SPEC</span>
                <Cpu size={14} className="text-[#FF4F00]" />
              </a>

              <div className="flex items-center gap-1.5 p-1 bg-[#DAD8CE] rounded-[6px] border border-[#BCBAAD]">
                {(["RUN", "EVAL", "BENCH"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleButtonPress(mode)}
                    className={`px-2.5 py-1 rounded-[3px] font-mono text-[10px] font-bold transition-all ${
                      activeSignal === mode
                        ? "bg-[#1C1B1A] text-[#FF4F00] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]"
                        : "bg-[#E6E4DB] text-[#6B695E] hover:text-[#1C1B1A]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Block: OP-1 Inspired Recessed Dark LCD & Tactile Rotary Encoders (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Recessed Amber/Orange OLED Screen */}
            <div className="bg-[#141312] border-2 border-[#292825] rounded-[10px] p-4 text-[#FF4F00] font-mono shadow-[inset_0_3px_8px_rgba(0,0,0,0.9)] relative overflow-hidden">
              {/* Scanline CRT overlay effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)",
                }}
              />

              {/* Screen Top Status Ribbon */}
              <div className="flex items-center justify-between text-[9.5px] border-b border-[#292825] pb-2 mb-3 text-[#A84000]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                  <span className="text-[#00E676] font-bold">STATE // ACTIVE</span>
                </div>
                <span>FPS: 60.0 // BUS: OPTIMAL</span>
              </div>

              {/* Dynamic Readout Parameters */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-[#1C1B19] p-2 rounded border border-[#2D2B27]">
                  <span className="text-[9px] text-[#8A7D75] block uppercase">LATENCY // INFERENCE</span>
                  <div className="text-xl font-bold text-white tracking-wider">
                    {knobValues.latency} <span className="text-xs text-[#FF4F00]">ms</span>
                  </div>
                </div>

                <div className="bg-[#1C1B19] p-2 rounded border border-[#2D2B27]">
                  <span className="text-[9px] text-[#8A7D75] block uppercase">PRECISION // ENGINE</span>
                  <div className="text-xl font-bold text-[#FFD000] tracking-wider">
                    FP{knobValues.quant}
                  </div>
                </div>

                <div className="bg-[#1C1B19] p-2 rounded border border-[#2D2B27]">
                  <span className="text-[9px] text-[#8A7D75] block uppercase">CONCURRENCY // PODS</span>
                  <div className="text-xl font-bold text-[#00E676] tracking-wider">
                    {knobValues.agents}x
                  </div>
                </div>

                <div className="bg-[#1C1B19] p-2 rounded border border-[#2D2B27]">
                  <span className="text-[9px] text-[#8A7D75] block uppercase">TEMPERATURE // SEED</span>
                  <div className="text-xl font-bold text-white tracking-wider">
                    {knobValues.temp}
                  </div>
                </div>
              </div>

              {/* Animated VU / Signal Meter */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[8.5px] text-[#8A7D75]">
                  <span>AGENT THROUGHPUT SIGNAL</span>
                  <span>+3.2 dB (PEAK)</span>
                </div>
                <div className="grid grid-cols-12 gap-1 h-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-full rounded-[1px] transition-all duration-150 ${
                        i < (activeSignal === "RUN" ? 10 : activeSignal === "EVAL" ? 7 : 5)
                          ? i > 9
                            ? "bg-[#FF3333]"
                            : i > 6
                            ? "bg-[#FFD000]"
                            : "bg-[#00E676]"
                          : "bg-[#252320]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Teenage Engineering Knurled Control Knobs Block */}
            <div className="bg-[#DFDCD3] p-3.5 rounded-[10px] border border-[#BCBAAD] shadow-inner">
              <div className="flex items-center justify-between text-[9.5px] font-mono text-[#6E6C60] font-bold uppercase mb-2.5 tracking-wider">
                <span>PARAMETRIC ROTARY ENCODERS</span>
                <span className="text-[#FF4F00] flex items-center gap-1">
                  <Sliders size={11} /> TAP TO TWEAK
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                {/* Knob 1: Orange (Latency) */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => rotateKnob("latency", 5)}
                    className="w-10 h-10 rounded-full bg-[#FF4F00] border-2 border-[#D63E00] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform"
                    title="Adjust Latency Param"
                  >
                    <div className="w-1 h-3 bg-white rounded-full absolute top-1" />
                  </button>
                  <span className="text-[9px] font-mono font-bold text-[#1C1B1A] mt-1.5 uppercase">LATENCY</span>
                </div>

                {/* Knob 2: Yellow (Quantization) */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => rotateKnob("quant", 4)}
                    className="w-10 h-10 rounded-full bg-[#FFD000] border-2 border-[#D4A900] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform"
                    title="Toggle Quantization Mode"
                  >
                    <div className="w-1 h-3 bg-[#1C1B1A] rounded-full absolute top-1" />
                  </button>
                  <span className="text-[9px] font-mono font-bold text-[#1C1B1A] mt-1.5 uppercase">QUANT</span>
                </div>

                {/* Knob 3: Blue / Cyan (Pods) */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => rotateKnob("agents", 4)}
                    className="w-10 h-10 rounded-full bg-[#0088FF] border-2 border-[#006ECC] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform"
                    title="Adjust Pod Count"
                  >
                    <div className="w-1 h-3 bg-white rounded-full absolute top-1" />
                  </button>
                  <span className="text-[9px] font-mono font-bold text-[#1C1B1A] mt-1.5 uppercase">AGENTS</span>
                </div>

                {/* Knob 4: White (Temperature) */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => rotateKnob("temp", 0.1)}
                    className="w-10 h-10 rounded-full bg-[#FFFFFF] border-2 border-[#B8B6AA] shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.9)] flex items-center justify-center relative hover:scale-105 active:scale-95 transition-transform"
                    title="Adjust Sampling Temp"
                  >
                    <div className="w-1 h-3 bg-[#FF4F00] rounded-full absolute top-1" />
                  </button>
                  <span className="text-[9px] font-mono font-bold text-[#1C1B1A] mt-1.5 uppercase">TEMP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
