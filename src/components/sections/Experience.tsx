"use client";

import type { IExperienceItem } from "../../models/Portfolio";
import { experience as defaultExperience } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";
import TelemetryCounter from "../ui/TelemetryCounter";
import HairlineDivider from "../ui/HairlineDivider";

interface ExperienceProps {
  items?: IExperienceItem[];
}

export default function Experience({ items = defaultExperience }: ExperienceProps) {
  return (
    <section className="border-b border-[#E2E0D8]" data-purpose="experience-timeline" id="experience">
      {/* Header bar */}
      <div className="px-5 sm:px-8 py-4 sm:py-5 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6E6D68]">03 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            EXPERIENCE // 経歴
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#6E6D68] uppercase tracking-wider">
          CAREER TIMELINE
        </span>
      </div>

      <HairlineDivider leftLabel="03" rightLabel="TIMELINE" />

      {/* Experience Rows */}
      <div className="divide-y divide-[#E2E0D8]">
        {items.map((item, index) => (
          <article
            key={`${item.company}-${index}`}
            className="px-5 sm:px-8 py-6 sm:py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline hover:bg-[#EBEAE4] transition-colors"
          >
            <Reveal className="contents">
              {/* Left Column: Period & Location */}
              <div className="md:col-span-3 font-mono text-xs text-[#6E6D68]">
                {item.period}
                <div className="text-[#111111] text-[11px] pt-1">{item.location}</div>
              </div>

              {/* Middle Column: Role, Company & Description */}
              <div className="md:col-span-6 space-y-2">
                <CharFadeText
                  as="h4"
                  className="text-lg font-display font-medium text-[#111111] block"
                >
                  {item.role}
                </CharFadeText>
                <div className="font-mono text-xs text-[#444442]">{item.company}</div>
                <p className="text-sm text-[#444442] leading-relaxed pt-1">
                  {item.description}
                </p>
                {/* Tech Pills */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-[#EBEAE4] border border-[#E2E0D8] px-2 py-0.5 text-[#444442] rounded-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Key Technical Metric with Telemetry Counter */}
              <div className="md:col-span-3 md:text-right font-mono text-xs text-[#111111] pt-3 md:pt-0 border-t md:border-t-0 border-[#E2E0D8]/50 mt-3 md:mt-0">
                <TelemetryCounter value={item.metric} />
                <div className="text-[#6E6D68] text-[10.5px] pt-0.5">{item.metricSub}</div>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
