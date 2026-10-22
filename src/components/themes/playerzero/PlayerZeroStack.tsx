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
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#e5e5e8]">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((cat, idx) => (
          <div
            key={idx}
            className="bg-[#f2f2f4]/50 border border-[#e5e5e8] rounded-2xl p-6 flex flex-col justify-between"
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
          </div>
        ))}
      </div>
    </section>
  );
}
