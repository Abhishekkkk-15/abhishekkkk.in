"use client";

import { useState } from "react";
import type { IProjectItem } from "../../models/Portfolio";
import { projects as defaultProjects } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";
import TelemetryCounter from "../ui/TelemetryCounter";
import HairlineDivider from "../ui/HairlineDivider";
import AsciiMantaRay from "../ui/AsciiMantaRay";

interface ProjectsProps {
  items?: IProjectItem[];
}

export default function Projects({ items = defaultProjects }: ProjectsProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeProject = items[selectedIdx] || items[0];

  return (
    <section className="border-b border-[#E2E0D8] bg-[#F4F3EF] relative" data-purpose="selected-projects-list" id="projects">
      {/* Header bar */}
      <div className="px-5 sm:px-8 py-4 sm:py-5 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6E6D68]">04 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            SELECTED PROJECTS // MANTA RAY MATRIX
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#6E6D68] uppercase tracking-wider">
          SYSTEMS &amp; INFRASTRUCTURE
        </span>
      </div>

      <HairlineDivider leftLabel="04" rightLabel="PROJECTS_MATRIX" />

      {/* Main Project Showcase with Animated Manta Ray ASCII Creature */}
      <div className="relative min-h-[520px] md:min-h-[580px] p-6 sm:p-10 md:p-12 flex flex-col justify-between overflow-hidden">
        {/* Animated Manta Ray ASCII Creature Background from download (3).jfif */}
        <AsciiMantaRay />

        {/* Top Interactive Project Tabs Selector */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 mb-6">
          {items.map((project, idx) => (
            <button
              key={project.title}
              onClick={() => setSelectedIdx(idx)}
              className={`font-mono text-xs px-3.5 py-1.5 transition-all duration-200 border flex items-center gap-2 cursor-pointer ${
                selectedIdx === idx
                  ? "bg-[#111111] text-[#F4F3EF] border-[#111111] shadow-xs"
                  : "bg-[#F4F3EF]/90 hover:bg-[#EBEAE4] text-[#6E6D68] hover:text-[#111111] border-[#E2E0D8] backdrop-blur-xs"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${selectedIdx === idx ? "bg-[#2563EB]" : "bg-transparent border border-[#6E6D68]"}`} />
              <span>{project.codeIndex || `PRJ_0${idx + 1}`}</span>
              <span className="opacity-80">// {project.title}</span>
            </button>
          ))}
        </div>

        {/* Selected Project Details Overlay Card */}
        {activeProject && (
          <Reveal className="relative z-10 max-w-xl bg-[#F4F3EF]/92 backdrop-blur-sm border border-[#E2E0D8] p-6 sm:p-8 space-y-4 shadow-sm my-auto">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#6E6D68]">
              <span>{activeProject.codeIndex} // {activeProject.techStack}</span>
              {activeProject.status && (
                <span className="text-[#2563EB] border border-[#2563EB]/30 px-2 py-0.5 bg-[#2563EB]/5 font-medium">
                  {activeProject.status}
                </span>
              )}
            </div>

            <h4 className="text-2xl sm:text-3xl font-display font-medium text-[#111111]">
              {activeProject.title} <span className="font-mono text-base font-normal text-[#6E6D68]">/ {activeProject.version}</span>
            </h4>

            <p className="text-sm text-[#444442] leading-relaxed">
              {activeProject.description}
            </p>

            {/* Performance Metric & Action Links */}
            <div className="pt-3 border-t border-[#E2E0D8] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div className="space-y-0.5">
                <div className="text-[10px] text-[#6E6D68] uppercase">{activeProject.metricSub || "BENCHMARK"}</div>
                <div className="font-medium text-[#111111] text-sm">
                  <TelemetryCounter value={activeProject.metric} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                {activeProject.github && (
                  <a
                    className="text-[#111111] hover:text-[#2563EB] underline underline-offset-4 decoration-[#D8D6CE] hover:decoration-[#2563EB] transition-all flex items-center gap-1 font-medium"
                    href={activeProject.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>Source Code</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                )}
                {activeProject.live && (
                  <a
                    className="bg-[#111111] text-[#F4F3EF] hover:bg-[#2563EB] px-3.5 py-1.5 transition-colors flex items-center gap-1.5 font-medium shadow-xs"
                    href={activeProject.live}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span>Live Production Demo</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* Bottom subtle Colophon */}
        <div className="relative z-10 pt-4 flex items-center justify-between font-mono text-[10px] text-[#6E6D68]">
          <span>MANTA RAY MATRIX KINEMATICS // 42x56 TENSOR FIELD</span>
          <span>OPTICAL FLOW // UNDULATING WINGS</span>
        </div>
      </div>
    </section>
  );
}
