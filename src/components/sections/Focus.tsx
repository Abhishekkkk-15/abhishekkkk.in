import { architecturalFocus } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";

export default function Focus() {
  return (
    <section className="border-b border-[#e2e0d8]" data-purpose="core-competencies" id="focus">
      {/* Section Header */}
      <div className="px-6 sm:px-8 py-5 border-b border-[#e2e0d8] flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#8a8883]">02 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            ARCHITECTURAL FOCUS
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#8a8883] uppercase tracking-wider">
          COMPETENCIES
        </span>
      </div>

      {/* 3-Column Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e2e0d8]">
        {architecturalFocus.map((focus) => (
          <article
            key={focus.index}
            className="p-8 md:p-12 space-y-4 bg-transparent hover:bg-[#f7f6f0]/50 transition-colors"
          >
            <Reveal>
              <span className="font-mono text-xs text-[#8a8883] block">
                ↘ {focus.index}
              </span>
              <CharFadeText
                as="h4"
                className="text-xl font-display font-medium text-[#111111] tracking-tight block pt-1"
              >
                {focus.title}
              </CharFadeText>
              <p className="text-sm text-[#555452] leading-relaxed pt-3">
                {focus.description}
              </p>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
