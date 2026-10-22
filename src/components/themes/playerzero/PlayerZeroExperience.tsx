"use client";

import { motion } from "framer-motion";
import type { IExperienceItem } from "@/models/Portfolio";

export default function PlayerZeroExperience({
  experience,
}: {
  experience: IExperienceItem[];
}) {
  return (
    <section
      className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20"
      data-purpose="career-experience"
      id="experience"
    >
      {/* Header with reveal animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#e5e5e8]"
      >
        <div>
          <span className="text-xs font-mono font-medium tracking-widest text-stone-400 uppercase">
            CAREER TRACK RECORD
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-1">
            Engineering Timeline &amp; Impact
          </h3>
        </div>
        <div className="text-xs font-mono text-stone-500 mt-2 sm:mt-0">
          Designing &amp; Scaling Distributed AI Systems
        </div>
      </motion.div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l border-stone-300 space-y-12">
        {experience.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.65,
              delay: idx * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative group"
          >
            {/* Timeline Dot Indicator */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-neutral-900 flex items-center justify-center transition-transform group-hover:scale-125">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>

            {/* Content Card */}
            <div className="bg-[#f2f2f4]/50 border border-[#e5e5e8] hover:border-stone-400 rounded-2xl p-6 transition-all duration-200 hover:shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <span className="font-matrix text-xs text-neutral-900 tracking-wider font-bold">
                    {item.role.toUpperCase()}
                  </span>
                  <span className="text-xs font-medium text-stone-600 ml-2">
                    @ {item.company}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {idx === 0 && (
                    <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Present
                    </span>
                  )}
                  <span className="font-mono text-xs text-stone-500">
                    {item.period}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4 font-normal">
                {item.description}
              </p>

              {/* Metric Highlights Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 px-4 bg-white/80 border border-stone-200/80 rounded-xl font-mono text-xs mb-4">
                <div>
                  <div className="text-neutral-900 font-semibold">
                    {item.metric || "99.9%"}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {item.metricSub || "Core SLA"}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-900 font-semibold">Production</div>
                  <div className="text-[10px] text-stone-500">
                    {item.location || "Remote"}
                  </div>
                </div>
                <div>
                  <div className="text-neutral-900 font-semibold">High-Scale</div>
                  <div className="text-[10px] text-stone-500">Throughput</div>
                </div>
                <div>
                  <div className="text-neutral-900 font-semibold">Autonomous</div>
                  <div className="text-[10px] text-stone-500">State Machines</div>
                </div>
              </div>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono bg-white px-2.5 py-0.5 rounded-full border border-stone-200 text-stone-600 shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
