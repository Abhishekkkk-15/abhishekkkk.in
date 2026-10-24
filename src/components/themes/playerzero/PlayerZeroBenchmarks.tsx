"use client";

import { motion } from "framer-motion";
import type { IProfile } from "@/models/Portfolio";

export default function PlayerZeroBenchmarks({ profile }: { profile: IProfile }) {
  const throughputVal = profile.stats?.throughput?.value || "4.2";
  const throughputUnit = profile.stats?.throughput?.unit || "X";
  const enginesVal = profile.stats?.coreEngines?.value || "96.8%";

  return (
    <section
      className="max-w-6xl mx-auto px-6 py-8"
      data-purpose="benchmarks-and-impact"
      id="benchmarks"
    >
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#f2f2f4]/80 rounded-2xl p-6 sm:p-8 border border-[#e5e5e8] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-stone-200 shadow-sm"
      >
        {/* Metric Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col justify-between pt-4 md:pt-0 md:pr-4"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs text-stone-500 font-semibold uppercase tracking-wider">
              {profile.stats?.throughput?.label || "Inference Latency & Speed"}
            </span>
          </div>
          <div>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-matrix text-4xl sm:text-5xl text-neutral-900 tracking-wider mb-2"
            >
              {throughputVal}
              {throughputUnit}
            </motion.div>
            <p className="text-xs text-stone-600 font-normal leading-relaxed">
              Faster token time-to-first-byte (TTFT) achieved using speculative decoding, kernel-level optimizations &amp; custom CUDA pipelines.
            </p>
          </div>
        </motion.div>

        {/* Metric Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col justify-between pt-6 md:pt-0 md:px-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="font-mono text-xs text-stone-500 font-semibold uppercase tracking-wider">
              {profile.stats?.coreEngines?.label || "Agent Autonomy"}
            </span>
          </div>
          <div>
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-matrix text-4xl sm:text-5xl text-neutral-900 tracking-wider mb-2"
            >
              {enginesVal}
            </motion.div>
            <p className="text-xs text-stone-600 font-normal leading-relaxed">
              Task resolution across autonomous evaluation benches with self-healing reflection, dynamic AST routing &amp; memory retention.
            </p>
          </div>
        </motion.div>

        {/* Metric Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col justify-between pt-6 md:pt-0 md:pl-6"
        >
          <p className="text-xs sm:text-sm text-stone-800 font-normal leading-relaxed mb-6">
            Connecting real-world unstructured data to low-latency reasoning engines. Maintaining resilient multi-agent orchestration systems with strict enterprise SLAs.
          </p>
          <div>
            <a
              className="inline-flex items-center gap-2.5 bg-[#121213] hover:bg-neutral-800 text-white text-xs font-medium px-4 py-2.5 rounded-full transition-all w-fit shadow-xs active:scale-95"
              href={`mailto:${profile.email}`}
            >
              {/* Dot grid icon */}
              <span className="w-2 h-2 grid grid-cols-2 gap-0.5">
                <span className="bg-stone-300 rounded-[1px]"></span>
                <span className="bg-stone-300 rounded-[1px]"></span>
                <span className="bg-stone-300 rounded-[1px]"></span>
                <span className="bg-stone-300 rounded-[1px]"></span>
              </span>
              <span>Request System Audit</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
