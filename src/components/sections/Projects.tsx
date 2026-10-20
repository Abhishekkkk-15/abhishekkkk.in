import type { IProjectItem } from "../../models/Portfolio";
import { projects as defaultProjects } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";

interface ProjectsProps {
  items?: IProjectItem[];
}

export default function Projects({ items = defaultProjects }: ProjectsProps) {
  return (
    <section className="border-b border-[#e2e0d8]" data-purpose="selected-projects-list" id="projects">
      {/* Header bar */}
      <div className="px-6 sm:px-8 py-5 border-b border-[#e2e0d8] flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#8a8883]">04 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            SELECTED PROJECTS
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#8a8883] uppercase tracking-wider">
          SYSTEMS &amp; INFRASTRUCTURE
        </span>
      </div>

      {/* Projects List */}
      <div className="divide-y divide-[#e2e0d8]">
        {items.map((project) => (
          <article
            key={project.title}
            className="px-6 sm:px-8 py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline hover:bg-[#f7f6f0]/40 transition-colors"
          >
            <Reveal className="contents">
              {/* Left Column: Code Index and Tech Stack */}
              <div className="md:col-span-3 font-mono text-xs text-[#8a8883]">
                <span className="block">{project.codeIndex}</span>
                <div className="text-[#111111] text-[11px] pt-1 font-mono">
                  {project.techStack}
                </div>
              </div>

              {/* Middle Column: Title, Version, Description & Links */}
              <div className="md:col-span-6 space-y-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <h4 className="text-lg font-display font-medium text-[#111111]">
                    {project.title} // {project.version}
                  </h4>
                  {project.status && (
                    <span className="font-mono text-[10.5px] text-[#0051d5] uppercase tracking-wider border border-[#0051d5]/20 px-1.5 py-0.2 rounded-sm bg-[#0051d5]/5">
                      {project.status}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#555452] leading-relaxed pt-1">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 pt-2 font-mono text-xs">
                  {project.github && (
                    <a
                      className="text-[#111111] hover:text-[#0051d5] underline underline-offset-4 decoration-[#cbc8be] transition-colors"
                      href={project.github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Code ↗
                    </a>
                  )}
                  {project.live && (
                    <a
                      className="text-[#111111] hover:text-[#0051d5] underline underline-offset-4 decoration-[#cbc8be] transition-colors"
                      href={project.live}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Performance Metric */}
              <div className="md:col-span-3 md:text-right font-mono text-xs text-[#111111] pt-2 md:pt-0">
                {project.metric}
                <div className="text-[#8a8883] text-[10.5px] pt-0.5">
                  {project.metricSub}
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
