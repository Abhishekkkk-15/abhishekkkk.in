"use client";

import { motion } from "framer-motion";
import type { ISkillMatrix } from "@/models/Portfolio";
import { Terminal } from "lucide-react";

export default function PlayerZeroStack({
  skills,
}: {
  skills: ISkillMatrix[];
}) {
  return (
    <section
      className="max-w-6xl mx-auto px-6 py-12 scroll-mt-20"
      data-purpose="stack-and-tools"
      id="about"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#e5e5e8]"
      >
        <div>
          <span className="text-xs font-mono font-medium tracking-widest text-stone-400 uppercase flex items-center gap-2">
            <Terminal size={13} />
            CAPABILITIES // STACK &amp; TOOLS
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-1">
            Technical Stack &amp; Infrastructure
          </h3>
        </div>
        <div className="text-xs font-mono text-stone-500 mt-2 sm:mt-0">
          Evaluated &amp; Hardened for High-Throughput Production
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: 0.55,
              delay: idx * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-[#f2f2f4]/50 border border-[#e5e5e8] hover:border-stone-400 rounded-2xl p-6 flex flex-col justify-between shadow-xs transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                <h4 className="font-matrix text-xs text-neutral-900 tracking-wider font-bold">
                  {cat.category.toUpperCase()}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, itemIdx) => (
                  <span
                    key={itemIdx}
                    className="bg-white border border-stone-200/80 rounded-xl py-2 px-3 font-mono text-xs text-stone-700 hover:border-neutral-900 transition-colors shadow-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-stone-200/60 text-[10px] font-mono text-stone-400">
              {cat.items.length} tools indexed
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
