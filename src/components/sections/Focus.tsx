"use client";

import type { IArchitecturalFocus } from "../../models/Portfolio";
import { architecturalFocus as defaultFocus } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";
import HairlineDivider from "../ui/HairlineDivider";

interface FocusProps {
  items?: IArchitecturalFocus[];
}

export default function Focus({ items = defaultFocus }: FocusProps) {
  return (
    <section className="border-b border-[#E2E0D8]" data-purpose="core-competencies" id="focus">
      {/* Section Header */}
      <div className="px-6 sm:px-8 py-5 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6E6D68]">02 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            ARCHITECTURAL FOCUS
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#6E6D68] uppercase tracking-wider">
          COMPETENCIES
        </span>
      </div>

      <HairlineDivider leftLabel="02" rightLabel="FOCUS_AREAS" />

      {/* 3-Column Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E0D8]">
        {items.map((focus) => (
          <article
            key={focus.index}
            className="p-8 md:p-12 space-y-4 bg-transparent hover:bg-[#EBEAE4] transition-colors"
          >
            <Reveal>
              <span className="font-mono text-xs text-[#6E6D68] block">
                ↘ {focus.index}
              </span>
              <CharFadeText
                as="h4"
                className="text-xl font-display font-medium text-[#111111] tracking-tight block pt-1"
              >
                {focus.title}
              </CharFadeText>
              <p className="text-sm text-[#444442] leading-relaxed pt-3">
                {focus.description}
              </p>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
