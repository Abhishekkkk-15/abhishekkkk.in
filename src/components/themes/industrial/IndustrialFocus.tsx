"use client";

import { motion } from "framer-motion";
import type { IArchitecturalFocus } from "@/models/Portfolio";
import { hardwareSound } from "./hardwareSound";
import { Cpu, Zap, Layers, Network } from "lucide-react";

export default function IndustrialFocus({ items }: { items: IArchitecturalFocus[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section id="focus" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full select-none">
      {/* Section Header Plate */}
      <div className="flex items-center justify-between border-b-2 border-[#CAC8BD] pb-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="px-2 py-0.5 bg-[#1C1B1A] text-[#FF4F00] font-mono text-[10px] font-bold rounded-[3px]">
            SECTION // 01
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#1C1B1A] uppercase tracking-wider">
            ARCHITECTURAL SPECIFICATIONS
          </h2>
        </div>
        <div className="font-mono text-xs text-[#78766C] hidden sm:block">
          TOTAL MODULES: {items.length}
        </div>
      </div>

      {/* Grid of Machined Modular Silicon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item, idx) => (
          <motion.div
            key={item.index || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => hardwareSound.playMechanicalClick(800 + idx * 100, 0.025, "mid")}
            className="group relative bg-[#EBE9E1] border-2 border-[#CAC8BD] hover:border-[#1C1B1A] rounded-[10px] p-6 shadow-[0_3px_10px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-200 cursor-pointer"
          >
            {/* Corner Fastener Screws */}
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[7px] text-[#78766C] font-mono font-bold">+</div>
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[7px] text-[#78766C] font-mono font-bold">+</div>

            {/* Perforated Speaker / Ventilation Grille Pattern */}
            <div className="flex justify-end gap-1 mb-4 pt-1 pr-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCCABF]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCCABF]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCCABF]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#CCCABF]" />
            </div>

            {/* Module Serial Stamping */}
            <div className="flex items-center gap-2 mb-3 font-mono text-[11px]">
              <span className="px-1.5 py-0.5 bg-[#1C1B1A] text-[#FF4F00] font-bold rounded-[2px]">
                MOD-0{idx + 1}
              </span>
              <span className="text-[#78766C] font-medium tracking-wide">
                SYS-CORE // {item.index}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-mono font-bold text-[#1C1B1A] mb-3 group-hover:text-[#FF4F00] transition-colors leading-snug">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm font-sans text-[#4A4840] leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Bottom Technical Status Bar */}
            <div className="pt-3 border-t border-[#CCCABF] flex items-center justify-between text-[10px] font-mono text-[#78766C]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] group-hover:animate-ping" />
                <span>BENCHMARK OPTIMAL</span>
              </span>
              <span className="text-[#1C1B1A] font-bold group-hover:translate-x-1 transition-transform">
                ACTIVE &gt;&gt;
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
