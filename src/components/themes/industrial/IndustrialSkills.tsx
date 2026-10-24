"use client";

import { motion } from "framer-motion";
import type { ISkillMatrix } from "@/models/Portfolio";
import { hardwareSound } from "./hardwareSound";
import { Sliders, Cpu, Terminal, Radio } from "lucide-react";

export default function IndustrialSkills({ skills }: { skills: ISkillMatrix[] }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-[#CAC8BD] pb-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="px-2 py-0.5 bg-[#FF4F00] text-white font-mono text-[10px] font-bold rounded-[3px]">
            SECTION // 06
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#1C1B1A] uppercase tracking-wider">
            EURORACK PATCH BAY // STACK
          </h2>
        </div>
        <div className="font-mono text-xs text-[#78766C] hidden sm:block">
          {skills.length} PARALLEL BUS CHANNELS
        </div>
      </div>

      {/* Grid of Synthesizer Channel Strips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-[#EBE9E1] border-2 border-[#CAC8BD] rounded-[10px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] relative"
          >
            {/* Channel Top Header */}
            <div className="flex items-center justify-between border-b border-[#CCCABF] pb-3 mb-4 font-mono text-xs">
              <span className="px-2 py-0.5 bg-[#1C1B1A] text-[#FF4F00] font-bold rounded-[3px]">
                BUS // CH-0{idx + 1}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                <span className="text-[10px] text-[#78766C] uppercase font-bold">ARMED</span>
              </div>
            </div>

            {/* Category Title */}
            <h3 className="text-base font-mono font-bold text-[#1C1B1A] uppercase tracking-wide mb-4">
              {cat.category}
            </h3>

            {/* Tactile Silicone Pushbuttons for Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cat.items.map((skill, sIdx) => (
                <button
                  key={sIdx}
                  onClick={() => hardwareSound.playMechanicalClick(700 + sIdx * 50, 0.02, "high")}
                  className="px-3 py-1.5 rounded-[5px] bg-[#FFFFFF] hover:bg-[#F3F2EC] active:translate-y-[2px] active:shadow-none border border-[#CCCABF] shadow-[0_2px_0_#BDBBAE,0_3px_5px_rgba(0,0,0,0.06)] font-mono text-xs font-semibold text-[#1C1B1A] transition-all flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00]" />
                  <span>{skill}</span>
                </button>
              ))}
            </div>

            {/* Channel Potentiometer Dial */}
            <div className="pt-3 border-t border-[#CCCABF] flex items-center justify-between font-mono text-[10px] text-[#78766C]">
              <span>ATTENUATION: 0.0dB</span>
              <span className="text-[#1C1B1A] font-bold">100% WET // PASS</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
