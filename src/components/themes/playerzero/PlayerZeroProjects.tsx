"use client";

import { useState } from "react";
import type { IProjectItem } from "@/models/Portfolio";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";

export default function PlayerZeroProjects({
  projects,
}: {
  projects: IProjectItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Derive unique categories
  const categories = ["ALL", ...Array.from(new Set(projects.map((p) => p.category.toUpperCase())))];

  const filteredProjects =
    activeCategory === "ALL"
      ? projects
      : projects.filter((p) => p.category.toUpperCase() === activeCategory);

  return (
    <section
      className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20"
      data-purpose="featured-ai-systems"
      id="projects"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#e5e5e8]">
        <div>
          <span className="text-xs font-mono font-medium tracking-widest text-stone-400 uppercase">
            FEATURED AI SYSTEMS // PRODUCTION DEPLOYMENTS
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mt-1 tracking-tight">
            Autonomous Agents &amp; Distributed Systems
          </h3>
        </div>
        <p className="text-xs text-stone-500 max-w-sm mt-3 md:mt-0 font-normal">
          Bespoke model fine-tunes, recursive agent state machines, and high-performance inference stacks running in production.
        </p>
      </div>

      {/* Filter Pills */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs font-mono px-3 py-1 rounded-full transition-all ${
                activeCategory === cat
                  ? "bg-[#121213] text-white shadow-sm"
                  : "bg-white border border-[#e5e5e8] text-stone-600 hover:border-stone-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => {
          const indexFormatted = String(index + 1).padStart(2, "0");
          return (
            <article
              key={project.codeIndex || index}
              className="bg-[#f2f2f4]/60 rounded-2xl p-6 sm:p-7 border border-[#e5e5e8] hover:border-stone-400 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-matrix text-xs text-neutral-800 font-bold tracking-wider">
                      #{indexFormatted} // {project.category.toUpperCase()}
                    </span>
                    {project.status && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">
                    {project.version || "v1.0.0"}
                  </span>
                </div>

                {/* Project Title */}
                <h4 className="text-lg font-semibold text-neutral-900 mb-2 group-hover:text-black transition-colors">
                  {project.title}
                </h4>

                {/* Project Description */}
                <p className="text-xs text-stone-600 leading-relaxed mb-4 font-normal">
                  {project.description}
                </p>

                {/* 3-Column Metrics Pill Box */}
                <div className="grid grid-cols-3 gap-2 py-3 my-3 bg-white/70 border border-stone-200/70 rounded-xl px-3 font-mono text-center">
                  <div>
                    <div className="text-neutral-900 font-semibold text-xs">
                      {project.metric || "99.4%"}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {project.metricSub || "Accuracy"}
                    </div>
                  </div>
                  <div className="border-x border-stone-200/70">
                    <div className="text-neutral-900 font-semibold text-xs">
                      {index % 2 === 0 ? "4.2x" : "sub-50ms"}
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {index % 2 === 0 ? "Speedup" : "Latency"}
                    </div>
                  </div>
                  <div>
                    <div className="text-neutral-900 font-semibold text-xs">0</div>
                    <div className="text-[10px] text-stone-500">Human Intervention</div>
                  </div>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(project.tech && project.tech.length > 0
                    ? project.tech
                    : project.techStack.split(",").map((s) => s.trim())
                  ).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Links */}
              <div className="pt-4 border-t border-stone-200/70 flex items-center justify-between text-xs">
                <span className="font-mono text-stone-500 text-[11px] truncate max-w-[180px]">
                  {project.category} Architecture
                </span>
                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      className="font-mono text-xs text-stone-600 hover:text-black hover:underline flex items-center gap-1"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={12} />
                      <span>Repo</span>
                    </a>
                  )}
                  {project.live ? (
                    <a
                      className="inline-flex items-center gap-1 font-medium text-neutral-900 hover:underline"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Live App</span>
                      <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    project.github && (
                      <a
                        className="inline-flex items-center gap-1 font-medium text-neutral-900 hover:underline"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span>Inspect Code →</span>
                      </a>
                    )
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
