import { Brain, Layers, Server, Terminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { skillCategories } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import Squiggle from "../ui/Squiggle";

const categoryIcons: Record<string, LucideIcon> = {
  "Languages": Terminal,
  "Frameworks & Libraries": Layers,
  "AI & Data": Brain,
  "Tools & Infrastructure": Server,
};

export default function Skills() {
  return (
    <section id="skills" className="relative bg-white py-28 md:py-36">
      <div className="section-container">
        <SectionHeader
          index="05"
          title="Skills & Expertise"
          align="center"
          description="A comprehensive set of technologies and tools I've mastered to deliver exceptional solutions."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => {
            const Icon = categoryIcons[category.category] ?? Terminal;
            return (
              <Reveal
                key={category.category}
                delay={i * 0.08}
                className="bg-white p-8"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 bg-black/[0.03]">
                    <Icon size={16} className="text-black/60" />
                  </div>
                  <h3 className="eyebrow">{category.category}</h3>
                </div>
                <Squiggle width={36} className="mb-5 text-black/20" />
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <span className="inline-block rounded-full border border-black/12 bg-black/[0.02] px-3 py-1.5 text-sm text-black/65 transition-all hover:border-black/35 hover:bg-black/[0.05] hover:text-black">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
