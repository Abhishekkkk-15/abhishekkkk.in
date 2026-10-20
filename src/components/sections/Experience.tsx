import type { IExperienceItem } from "../../models/Portfolio";
import { experience as defaultExperience } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";

interface ExperienceProps {
  items?: IExperienceItem[];
}

export default function Experience({ items = defaultExperience }: ExperienceProps) {
  return (
    <section className="border-b border-[#e2e0d8]" data-purpose="experience-timeline" id="experience">
      {/* Header bar */}
      <div className="px-6 sm:px-8 py-5 border-b border-[#e2e0d8] flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#8a8883]">03 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            EXPERIENCE // 経歴
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#8a8883] uppercase tracking-wider">
          CAREER TIMELINE
        </span>
      </div>

      {/* Experience Rows */}
      <div className="divide-y divide-[#e2e0d8]">
        {items.map((item, index) => (
          <article
            key={`${item.company}-${index}`}
            className="px-6 sm:px-8 py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline hover:bg-[#f7f6f0]/40 transition-colors"
          >
            <Reveal className="contents">
              {/* Left Column: Period & Location */}
              <div className="md:col-span-3 font-mono text-xs text-[#8a8883]">
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
                <div className="font-mono text-xs text-[#555452]">{item.company}</div>
                <p className="text-sm text-[#555452] leading-relaxed pt-1">
                  {item.description}
                </p>
                {/* Tech Pills */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 font-mono text-[11px]">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-[#efeeea] border border-[#e2e0d8] px-2 py-0.5 text-[#555452] rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Column: Key Technical Metric */}
              <div className="md:col-span-3 md:text-right font-mono text-xs text-[#111111] pt-2 md:pt-0">
                {item.metric}
                <div className="text-[#8a8883] text-[10.5px] pt-0.5">{item.metricSub}</div>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
