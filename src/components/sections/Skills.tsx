import type { ISkillMatrix } from "../../models/Portfolio";
import { skillMatrix as defaultSkills } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";

interface SkillsProps {
  skills?: ISkillMatrix[];
}

export default function Skills({ skills = defaultSkills }: SkillsProps) {
  return (
    <section className="border-b border-[#E2E0D8]" data-purpose="technical-capabilities" id="skills">
      {/* Header bar */}
      <div className="px-6 sm:px-8 py-5 border-b border-[#E2E0D8] flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6E6D68]">05 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            TECHNICAL CAPABILITIES
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#6E6D68] uppercase tracking-wider">
          CORE STACK &amp; INFRASTRUCTURE
        </span>
      </div>

      {/* Editorial Matrix */}
      <div className="divide-y divide-[#E2E0D8]">
        {skills.map((item, idx) => (
          <div
            key={item.category}
            className="px-6 sm:px-8 py-6 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:bg-[#EBEAE4] transition-colors"
          >
            <Reveal className="contents">
              <div className="md:w-1/4 font-mono text-xs text-[#6E6D68] flex items-center gap-2">
                <span>0{idx + 1} //</span>
                <span className="text-[#111111] font-medium">{item.category}</span>
              </div>

              <div className="md:w-3/4">
                <div className="flex flex-wrap gap-2">
                  {item.items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs bg-[#EBEAE4] text-[#111111] border border-[#E2E0D8] px-3 py-1 rounded-none hover:border-[#111111] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
