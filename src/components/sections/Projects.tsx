"use client";

import type { IProjectItem } from "../../models/Portfolio";
import { projects as defaultProjects } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";
import TelemetryCounter from "../ui/TelemetryCounter";
import HairlineDivider from "../ui/HairlineDivider";

interface ProjectsProps {
  items?: IProjectItem[];
}

export default function Projects({ items = defaultProjects }: ProjectsProps) {
  return (
    <section className="border-b border-[#E2E0D8]" data-purpose="selected-projects-list" id="projects">
      {/* Header bar */}
      <div className="px-5 sm:px-8 py-4 sm:py-5 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6E6D68]">04 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            SELECTED PROJECTS
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#6E6D68] uppercase tracking-wider">
          SYSTEMS &amp; INFRASTRUCTURE
        </span>
      </div>

      <HairlineDivider leftLabel="04" rightLabel="PROJECTS" />

      {/* Projects List */}
      <div className="divide-y divide-[#E2E0D8]">
        {items.map((project) => (
          <article
            key={project.title}
            className="px-5 sm:px-8 py-6 sm:py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline hover:bg-[#EBEAE4] transition-colors"
          >
            <Reveal className="contents">
              {/* Left Column: Code Index and Tech Stack */}
              <div className="md:col-span-3 font-mono text-xs text-[#6E6D68]">
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
                    <span className="font-mono text-[10.5px] text-[#2563EB] uppercase tracking-wider border border-[#2563EB]/25 px-1.5 py-0.2 rounded-none bg-[#2563EB]/5">
                      {project.status}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#444442] leading-relaxed pt-1">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 pt-2 font-mono text-xs">
                  {project.github && (
                    <a
                      className="text-[#111111] hover:text-[#2563EB] underline underline-offset-4 decoration-[#D8D6CE] transition-colors"
                      href={project.github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Code ↗
                    </a>
                  )}
                  {project.live && (
                    <a
                      className="text-[#111111] hover:text-[#2563EB] underline underline-offset-4 decoration-[#D8D6CE] transition-colors"
                      href={project.live}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Performance Metric with Telemetry Counter */}
              <div className="md:col-span-3 md:text-right font-mono text-xs text-[#111111] pt-3 md:pt-0 border-t md:border-t-0 border-[#E2E0D8]/50 mt-3 md:mt-0">
                <TelemetryCounter value={project.metric} />
                <div className="text-[#6E6D68] text-[10.5px] pt-0.5">
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
