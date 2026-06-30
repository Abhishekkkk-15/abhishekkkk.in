import { useState } from "react";
import { Code2, Coffee, Lightbulb } from "lucide-react";
import { about } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import HandCircle from "../ui/HandCircle";
import Squiggle from "../ui/Squiggle";
import Sketch from "../ui/Sketch";

const icons = [Code2, Lightbulb, Coffee];

export default function About() {
  const [bioSettled, setBioSettled] = useState(false);

  return (
    <section id="about" className="relative bg-white py-28 md:py-36">
      <div className="section-container">
        <SectionHeader index="02" title="About Me" />

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-12">
          <div>
            {about.paragraphs.map((paragraph, i) => (
              <Reveal
                key={paragraph}
                delay={i * 0.1}
                onAnimationComplete={i === 1 ? () => setBioSettled(true) : undefined}
              >
                <p className="mb-5 font-light leading-relaxed text-black/65">
                  {i === 1 ? (
                    <>
                      I&apos;m currently working on open-source projects like{" "}
                      <Sketch
                        type="underline"
                        color="#0a0a0a"
                        enabled={bioSettled}
                      >
                        Forge and DevCon
                      </Sketch>
                      . I have experience with TypeScript, JavaScript, and
                      I&apos;m currently expanding my skill set by learning
                      Golang.
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              </Reveal>
            ))}
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
