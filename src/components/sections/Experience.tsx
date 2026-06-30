import { experience } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import HandCircle from "../ui/HandCircle";

export default function Experience() {
  return (
    <section id="experience" className="relative bg-white py-28 md:py-36">
      <div className="section-container">
        <SectionHeader index="03" title="Where I've Worked" />

        <div className="relative mt-16">
          <div className="absolute inset-y-0 left-5 w-px bg-black/10 md:left-7" />

          <div className="flex flex-col gap-16">
            {experience.map((item, i) => (
              <Reveal key={`${item.company}-${item.period}`} delay={i * 0.08}>
                <div className="flex gap-6 md:gap-10">
                  <div className="flex w-10 flex-shrink-0 justify-center md:w-14">
                    <div className="relative mt-1.5 flex h-4 w-4 items-center justify-center">
                      <HandCircle className="text-black/70" />
                      <span className="h-1.5 w-1.5 rounded-full bg-black" />
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <span className="eyebrow">{item.period}</span>
                    <h3 className="mt-2 text-2xl font-semibold text-black md:text-3xl">
                      {item.role}{" "}
                      <span className="text-black/40">· {item.company}</span>
                    </h3>
                    <p className="mt-4 max-w-2xl font-light leading-relaxed text-black/60">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
