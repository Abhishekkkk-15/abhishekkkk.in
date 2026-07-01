import { Code2, Coffee, Lightbulb } from "lucide-react";
import { about } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import HandCircle from "../ui/HandCircle";
import Squiggle from "../ui/Squiggle";

const icons = [Code2, Lightbulb, Coffee];

export default function About() {
  return (
    <section id="about" className="relative bg-white py-28 md:py-36">
      <div className="section-container">
        <SectionHeader index="02" title="About Me" />

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-12">
          <div>
            <Reveal delay={0}>
              <p className="mb-5 font-light leading-relaxed text-black/65">
                I'm Abhishek Jangid, a software engineer specializing in{" "}
                <span className="rounded-sm bg-black/[0.06] px-0.5 font-normal text-black/80">autonomous AI agents</span>
                ,{" "}
                <span className="rounded-sm bg-black/[0.06] px-0.5 font-normal text-black/80">RAG systems</span>
                , and developer-automation tooling. I build backend-heavy products with{" "}
                <span className="rounded-sm bg-black/[0.06] px-0.5 font-normal text-black/80">TypeScript, Go, and Rust</span>
                .
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mb-5 font-light leading-relaxed text-black/65">
                Currently learning Rust &amp; diving deeper into{" "}
                <span className="rounded-sm bg-black/[0.06] px-0.5 font-normal text-black/80">distributed systems design</span>
                . My work focuses on building systems that are intelligent, scalable, and developer-friendly.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-5">
            {about.traits.map((trait, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={trait.title} delay={i * 0.12}>
                  <div className="group rounded-2xl border border-black/10 p-7 transition-colors hover:border-black/40">
                    <div className="relative mb-4 inline-flex h-11 w-11 items-center justify-center">
                      <HandCircle className="text-black/25" />
                      <Icon size={20} className="relative z-10 text-black/80" />
                    </div>
                    <h3 className="text-lg font-semibold text-black">
                      {trait.title}
                    </h3>
                    <Squiggle width={32} className="mt-1 text-black/20" />
                    <p className="mt-2 font-light leading-relaxed text-black/55">
                      {trait.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
