"use client";

import { motion } from "framer-motion";
import type { IExperienceItem } from "@/models/Portfolio";
import { hardwareSound } from "./hardwareSound";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function IndustrialExperience({ experience }: { experience: IExperienceItem[] }) {
  if (!experience || experience.length === 0) return null;

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-[#CAC8BD] pb-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="px-2 py-0.5 bg-[#FFD000] text-[#1C1B1A] font-mono text-[10px] font-bold rounded-[3px]">
            SECTION // 04
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#1C1B1A] uppercase tracking-wider">
            PRODUCTION SERVICE LEDGER
          </h2>
        </div>
        <div className="font-mono text-xs text-[#78766C] hidden sm:block">
          TOTAL POSTS: {experience.length}
        </div>
      </div>

      {/* Vertical Stamped Mechanical Track */}
      <div className="space-y-6">
        {experience.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => hardwareSound.playMechanicalClick(850 + idx * 80, 0.02, "mid")}
            className="group relative bg-[#EBE9E1] border-2 border-[#CAC8BD] hover:border-[#1C1B1A] rounded-[10px] p-6 shadow-[0_3px_12px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all cursor-pointer"
          >
            {/* Top Serial & Period Bar */}
            <div className="flex flex-wrap items-center justify-between border-b border-[#CCCABF] pb-3 mb-4 gap-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#1C1B1A] text-white font-bold rounded-[3px]">
                  POST-0{idx + 1}
                </span>
                <span className="font-bold text-[#FF4F00]">{item.company}</span>
                <span className="text-[#8C8A7E]">/</span>
                <span className="text-[#6B695E] flex items-center gap-1">
                  <MapPin size={11} /> {item.location}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#78766C]">
                <Calendar size={12} className="text-[#FF4F00]" />
                <span className="font-bold text-[#1C1B1A] bg-[#DFDCD3] px-2 py-0.5 rounded-[3px] border border-[#BCBAAD]">
                  {item.period}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Role & Description (8 cols) */}
              <div className="lg:col-span-8 space-y-3">
                <h3 className="text-lg sm:text-xl font-mono font-bold text-[#1C1B1A] group-hover:text-[#FF4F00] transition-colors">
                  {item.role}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#4A4840] leading-relaxed">
                  {item.description}
                </p>

                {/* Tech Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-[#DFDCD3] border border-[#CCCABF] text-[#55534A] font-mono text-[10.5px] font-medium rounded-[3px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hardware Metric Readout (4 cols) */}
              {item.metric && (
                <div className="lg:col-span-4 bg-[#181716] border border-[#2D2B27] rounded-[8px] p-4 font-mono shadow-inner text-[#FFD000] flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] text-[#8C8A7E] uppercase block tracking-wider">
                      IMPACT TELEMETRY
                    </span>
                    <span className="text-xl sm:text-2xl font-bold text-white block mt-1">
                      {item.metric}
                    </span>
                  </div>
                  {item.metricSub && (
                    <span className="text-xs text-[#00E676] font-semibold mt-2 block border-t border-[#292825] pt-2">
                      {item.metricSub}
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
