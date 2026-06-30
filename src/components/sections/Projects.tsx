import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import Squiggle from "../ui/Squiggle";
import HandCircle from "../ui/HandCircle";

export default function Projects() {
  return (
    <section id="projects" className="relative bg-white py-28 md:py-36">
      <div className="section-container">
        <SectionHeader
          index="04"
          title="Selected Work"
          description="A selection of recent work showcasing full-stack development, modern architecture, and creative problem-solving."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.06}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group flex h-full flex-col justify-between rounded-2xl border border-black/10 p-8 transition-colors hover:border-black/40"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-black">
                    {project.title}
                  </h3>
                  <Squiggle width={44} className="mt-1 text-black/20" />
                  <p className="mt-4 font-light leading-relaxed text-black/60">
                    {project.description}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-black/15 px-3 py-1 text-xs text-black/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-black/70 transition-colors hover:text-black"
                    >
                      <span className="relative inline-flex h-6 w-6 items-center justify-center">
                        <HandCircle className="text-black/20" />
                        <Github size={14} className="relative z-10" />
                      </span>
                      Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-black/70 transition-colors hover:text-black"
                      >
                        <span className="relative inline-flex h-6 w-6 items-center justify-center">
                          <HandCircle className="text-black/20" />
                          <ExternalLink size={14} className="relative z-10" />
                        </span>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
