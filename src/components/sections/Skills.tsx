import { skillCategories } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import Squiggle from "../ui/Squiggle";

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
          {skillCategories.map((category, i) => (
            <Reveal
              key={category.category}
              delay={i * 0.08}
              className="bg-white p-8"
            >
              <h3 className="eyebrow">{category.category}</h3>
              <Squiggle width={36} className="mt-2 text-black/25" />
              <ul className="mt-5 flex flex-col gap-3">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-lg font-medium text-black/80 transition-colors hover:text-black"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
