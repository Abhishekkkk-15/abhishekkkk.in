"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IPortfolioData } from "@/models/Portfolio";
import type { FormattedGithubData } from "@/lib/github";
import { Sun, Moon, ArrowUpRight, GitCommit, CheckCircle2 } from "lucide-react";

export default function MinimalTheme({
  portfolio,
  githubData,
}: {
  portfolio: IPortfolioData;
  githubData: FormattedGithubData;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [personaMode, setPersonaMode] = useState<"hum" | "agn">("hum");
  const [expandedProjects, setExpandedProjects] = useState(false);

  // Sync theme with document class and localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved === "dark" || (!saved && prefersDark);
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const { profile, experience = [], projects = [], flagshipDossier } = portfolio;
  const name = (profile?.name || "Abhishek Jangid").toLowerCase();
  const shortName = (profile?.shortName || "abhishek").toLowerCase();

  // Combine projects and dossier for a rich project list
  const allProjects: Array<any> = projects.length > 0 ? projects : [
    {
      title: "rolloutcore",
      codeIndex: "rl rollout runtime",
      description: "versioned rl rollout runtime for vllm with nccl hot weight updates, version-pure rollouts, and cache-coherent transitions.",
      techStack: "PyTorch, NCCL, vLLM, RL",
      metric: "< 14ms",
      metricSub: "hot weight sync",
      github: profile?.socials?.github || "https://github.com/Abhishekkkk-15",
      live: "https://abhishekkkk.in",
    },
    {
      title: "hiqcache",
      codeIndex: "quantized sglang hicache",
      description: "int8 hierarchical kv caching for sglang hicache, delivering 43.75% lower host kv memory and 1.78x more l2 cache capacity for qwen3-8b.",
      techStack: "PyTorch, SGLang, Quantization",
      metric: "43.75%",
      metricSub: "kv memory saved",
      github: profile?.socials?.github || "https://github.com/Abhishekkkk-15",
    },
    {
      title: "miniserve",
      codeIndex: "llm inference runtime",
      description: "a from-scratch llm serving runtime with continuous batching, chunked prefill, block-based kv management, preemption, and prefix caching.",
      techStack: "Python 3.12, PyTorch, Paged KV Cache, Continuous Batching",
      metric: "3.2x",
      metricSub: "token throughput",
      github: profile?.socials?.github || "https://github.com/Abhishekkkk-15",
    },
    {
      title: "cloud-agent",
      codeIndex: "autonomous agent daemon",
      description: "distributed node.js & vps daemon pairing webrtc datachannel p2p with pure typescript werift and zero-db session pagination.",
      techStack: "Node.js, WebRTC, Werift, Docker, TypeScript",
      metric: "0.8ms",
      metricSub: "p2p signaling",
      github: "https://github.com/Abhishekkkk-15/cloud-agent",
    },
  ];

  // Upstream commits from live GitHub activity or curated real commits
  const commits = githubData?.recentCommits?.length > 0 ? githubData.recentCommits : [
    {
      sha: "2831b0a",
      message: "feat: implement WebRTC DataChannel P2P with pure TypeScript werift and gateway signaling",
      repo: "Abhishekkkk-15/cloud-agent",
      url: "https://github.com/Abhishekkkk-15/cloud-agent",
      timeAgo: "just now",
    },
    {
      sha: "a9f076e",
      message: "feat: restore full projects list without select badges and integrate manta ray matrix into dossiers",
      repo: "Abhishekkkk-15/abhishekkkk.in",
      url: "https://github.com/Abhishekkkk-15/abhishekkkk.in",
      timeAgo: "15m ago",
    },
    {
      sha: "0962b8d",
      message: "feat: implement dedicated Node.js gateway with MongoDB pairing and multi-tenant security",
      repo: "Abhishekkkk-15/cloud-agent",
      url: "https://github.com/Abhishekkkk-15/cloud-agent",
      timeAgo: "30m ago",
    },
  ];

  const initialProjectsCount = 3;
  const visibleProjects = expandedProjects ? allProjects : allProjects.slice(0, initialProjectsCount);
  const remainingCount = Math.max(0, allProjects.length - initialProjectsCount);

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] text-[#1a1c1c] dark:text-[#f0f0f2] font-sans antialiased selection:bg-[#1a1c1c] selection:text-[#f9f9f9] dark:selection:bg-[#f0f0f2] dark:selection:text-[#0d0d0e] transition-colors duration-200">
      
      {/* FIXED MINIMAL HEADER (Calibrated 680px width) */}
      <header className="fixed top-0 w-full z-50 bg-[#f9f9f9]/85 dark:bg-[#0d0d0e]/85 backdrop-blur-xl border-b border-transparent dark:border-[#26262a]/60 transition-colors duration-200">
        <div className="h-16 max-w-[680px] mx-auto px-6 flex items-center justify-between">
          
          {/* Brandmark + Live Status Dot */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="font-mono text-xs font-medium tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2] lowercase hover:text-black dark:hover:text-white transition-colors"
            >
              {shortName}
            </a>
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-[2px] rounded-full bg-[#f3f3f4] dark:bg-[#18181b] border border-transparent dark:border-[#26262a]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] font-mono text-[#5e5e5e] dark:text-[#9e9ea6]">online</span>
            </div>
          </div>

          {/* Right Controls: Persona Switcher & Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Mode Switcher: Human vs Agent */}
            <div className="inline-flex items-center bg-[#f3f3f4] dark:bg-[#18181b] border border-transparent dark:border-[#26262a] rounded p-[2px]">
              <button
                type="button"
                onClick={() => setPersonaMode("hum")}
                className={`px-2 py-[1px] font-mono text-[10px] rounded transition-all cursor-pointer ${
                  personaMode === "hum"
                    ? "bg-white dark:bg-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] shadow-2xs font-medium"
                    : "text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2]"
                }`}
                title="Human Perspective"
              >
                hum
              </button>
              <button
                type="button"
                onClick={() => setPersonaMode("agn")}
                className={`px-2 py-[1px] font-mono text-[10px] rounded transition-all cursor-pointer ${
                  personaMode === "agn"
                    ? "bg-white dark:bg-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] shadow-2xs font-medium"
                    : "text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2]"
                }`}
                title="Agentic Telemetry Mode"
              >
                agn
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f0f2] hover:bg-[#f3f3f4] dark:hover:bg-[#1e1e22] transition-colors cursor-pointer"
            >
              {mounted && isDark ? (
                <Sun size={15} className="text-[#f0f0f2]" />
              ) : (
                <Moon size={15} className="text-[#1a1c1c]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER (Constrained to 680px editorial mono layout) */}
      <main className="w-full pt-16 min-h-[calc(100vh-140px)]" id="hero">
        <div className="max-w-[680px] mx-auto px-6">
          <div className="flex flex-col w-full pb-16">

            {/* BIO / HERO SECTION */}
            <section className="flex flex-col gap-5 pt-8 pb-10">
              <div className="flex flex-col gap-2">
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1a1c1c] dark:text-[#f0f0f2] tracking-tight lowercase">
                  {name}
                </h1>
                
                {personaMode === "hum" ? (
                  <p className="font-serif text-lg sm:text-[1.125rem] text-[#1a1c1c] dark:text-[#f0f0f2] leading-relaxed">
                    i do <strong className="font-semibold text-black dark:text-white">applied ai &amp; systems engineering</strong>, &amp; build the <strong className="font-semibold text-black dark:text-white">autonomous agents &amp; inference runtimes</strong> that serve them.
                  </p>
                ) : (
                  <div className="p-3 bg-[#f3f3f4] dark:bg-[#18181b] border border-transparent dark:border-[#26262a] rounded font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] space-y-1">
                    <div className="text-[#10B981] font-semibold flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                      SYS_AGENT // ACTIVE_PIPELINE
                    </div>
                    <div>runtime: node v24.x · llm router: tensorrt-llm · fp8 quantized</div>
                    <div>active context: {shortName}.in // calibrated for 680px mono readouts</div>
                  </div>
                )}
              </div>

              {/* Persona Ethos Paragraphs */}
              <div className="flex flex-col gap-3.5 text-[#5e5e5e] dark:text-[#9e9ea6] text-[0.9375rem] leading-relaxed">
                <p>
                  i like working when the world is sleeping. my work cycle is generally 12pm to 4am. and i usually write my thoughts in my <a className="text-[#1a1c1c] dark:text-[#f0f0f2] underline underline-offset-4 decoration-black dark:decoration-[#9e9ea6] hover:text-black dark:hover:text-white transition-colors" href="#projects">architecture dossiers</a>.
                </p>
                <p>
                  i live the part after the launch day. when the reasoning breaks, when the cost skyrockets, when the first traffic hits — all the similar thrills :)
                </p>
              </div>

              {/* Quick Contact Strip */}
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] pt-1">
                {profile?.email && (
                  <a
                    className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                    href={`mailto:${profile.email}`}
                  >
                    mail
                  </a>
                )}
                <span className="text-[#dadada] dark:text-[#26262a] select-none">/</span>
                {profile?.socials?.twitter && (
                  <a
                    className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                    href={profile.socials.twitter}
                    rel="noreferrer"
                    target="_blank"
                  >
                    x ↗
                  </a>
                )}
                <span className="text-[#dadada] dark:text-[#26262a] select-none">/</span>
                {profile?.socials?.github && (
                  <a
                    className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                    href={profile.socials.github}
                    rel="noreferrer"
                    target="_blank"
                  >
                    github ↗
                  </a>
                )}
                <span className="text-[#dadada] dark:text-[#26262a] select-none">/</span>
                {profile?.socials?.linkedin && (
                  <a
                    className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                    href={profile.socials.linkedin}
                    rel="noreferrer"
                    target="_blank"
                  >
                    linkedin ↗
                  </a>
                )}
                <span className="text-[#dadada] dark:text-[#26262a] select-none">/</span>
                <a
                  className="inline-flex items-center gap-1.5 hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                  href="/resume.pdf"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>resume</span>
                </a>
              </div>
            </section>

            {/* EXPERIENCE / TRAJECTORY SECTION */}
            <section className="flex flex-col pt-8 pb-6 gap-4">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-[#26262a] pb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#5e5e5e] dark:text-[#9e9ea6]">
                  experience
                </span>
                <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
                  trajectory
                </span>
              </div>

              {/* Vertical Continuous Timeline with Nodes */}
              <div className="relative pt-2 pb-1 ml-1">
                {/* Connecting hairline vertical trace */}
                <div className="absolute left-[7px] top-3.5 bottom-3.5 w-[1.5px] bg-[#d0d0d5] dark:bg-[#26262a]" />

                <div className="flex flex-col gap-6">
                  {experience.map((item, idx) => (
                    <div key={item.company || idx} className="relative flex items-start gap-3.5 group">
                      {/* Node circle */}
                      <div className={`relative z-10 w-3.5 h-3.5 rounded-full border-2 ${
                        idx === 0
                          ? "border-black dark:border-[#f0f0f2]"
                          : "border-[#5e5e5e] dark:border-[#9e9ea6]"
                      } bg-[#f9f9f9] dark:bg-[#0d0d0e] shrink-0 mt-1 flex items-center justify-center`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          idx === 0 ? "bg-black dark:bg-[#f0f0f2]" : "bg-[#5e5e5e] dark:bg-[#9e9ea6]"
                        }`} />
                      </div>

                      <div className="flex flex-col w-full min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-3 gap-y-1">
                          <div className="flex flex-wrap items-baseline gap-x-2">
                            <span className="font-sans text-sm font-semibold text-[#1a1c1c] dark:text-[#f0f0f2]">
                              {item.company}
                            </span>
                            <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6]">
                              {item.role}
                            </span>
                            {item.location && (
                              <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6]/70">
                                {item.location.toLowerCase()}
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] shrink-0">
                            {item.period}
                          </span>
                        </div>
                        <p className="font-sans text-sm text-[#5e5e5e] dark:text-[#9e9ea6] leading-relaxed mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Accolades Node at bottom */}
                  <div className="relative flex items-start gap-3.5 group">
                    <div className="relative z-10 w-3.5 h-3.5 rounded-full border border-[#E5E5E5] dark:border-[#26262a] bg-[#f9f9f9] dark:bg-[#0d0d0e] shrink-0 mt-1 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#c4c7c7] dark:bg-[#38383e]" />
                    </div>
                    <div className="flex flex-col w-full min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-x-3 gap-y-1">
                        <span className="font-sans text-sm font-semibold text-[#1a1c1c] dark:text-[#f0f0f2]">
                          accolades &amp; honors
                        </span>
                        <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] shrink-0">
                          milestones
                        </span>
                      </div>
                      <p className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] leading-relaxed lowercase mt-1">
                        amazon ml summer school · top 1% typescript engineer, algora · autonomous agent architecture consultant
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* OPEN SOURCE / MERGED UPSTREAM SECTION */}
            <section className="flex flex-col pt-8 pb-6 gap-3.5">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-[#26262a] pb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#5e5e5e] dark:text-[#9e9ea6]">
                  open source
                </span>
                <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
                  merged upstream
                </span>
              </div>

              {/* Commit Stream List */}
              <div className="flex flex-col divide-y divide-[#EEEEEE] dark:divide-[#26262a]">
                {commits.map((commit, cIdx) => (
                  <div
                    key={commit.sha || cIdx}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 py-2.5 group"
                  >
                    <div className="flex items-baseline gap-2 min-w-0 pr-2">
                      <a
                        className="font-mono text-xs text-[#1a1c1c] dark:text-[#f0f0f2] hover:underline truncate"
                        href={commit.url}
                        rel="noreferrer"
                        target="_blank"
                        title={commit.message}
                      >
                        {commit.message}
                      </a>
                      <span className="font-mono text-[11px] text-[#5e5e5e] dark:text-[#9e9ea6] shrink-0">
                        {commit.repo} #{commit.sha}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
                      <span className="text-[#5e5e5e] dark:text-[#9e9ea6]">
                        {commit.timeAgo}
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-[1px] rounded bg-[#8B5CF6]/10 dark:bg-[#8B5CF6]/20 text-[#8B5CF6] font-mono text-[10.5px] leading-tight">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                        merged
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* All contributions link */}
              <div className="pt-1">
                <a
                  className="font-mono text-xs text-[#1a1c1c] dark:text-[#f0f0f2] hover:text-black dark:hover:text-white inline-flex items-center gap-1 group transition-colors"
                  href={profile?.socials?.github || "https://github.com/Abhishekkkk-15"}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>all contributions</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </a>
              </div>
            </section>

            {/* PROJECTS / RUNTIMES & ENGINES SECTION */}
            <section className="flex flex-col pt-8 pb-6 gap-6" id="projects">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-[#26262a] pb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#5e5e5e] dark:text-[#9e9ea6]">
                  projects
                </span>
                <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
                  runtimes &amp; engines
                </span>
              </div>

              {/* Projects List */}
              <div className="flex flex-col divide-y divide-[#EEEEEE] dark:divide-[#26262a] gap-6">
                {visibleProjects.map((proj, pIdx) => (
                  <div key={proj.title || pIdx} className={pIdx > 0 ? "pt-6 flex flex-col gap-2" : "flex flex-col gap-2"}>
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="font-serif text-[1.125rem] font-semibold text-[#1a1c1c] dark:text-[#f0f0f2] lowercase">
                        {proj.title}
                      </h3>
                      <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6]">
                        {proj.codeIndex || proj.category || "runtime engine"}
                      </span>
                    </div>

                    <p className="font-sans text-sm text-[#5e5e5e] dark:text-[#9e9ea6] leading-relaxed">
                      {proj.description}
                    </p>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
                      {proj.github && (
                        <a
                          className="text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors lowercase"
                          href={proj.github}
                          rel="noreferrer"
                          target="_blank"
                        >
                          github ↗
                        </a>
                      )}
                      {proj.live && (
                        <a
                          className="text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors lowercase"
                          href={proj.live}
                          rel="noreferrer"
                          target="_blank"
                        >
                          live demo ↗
                        </a>
                      )}
                    </div>

                    {/* Stack & Keywords Pill Meta */}
                    <div className="mt-1 font-mono text-[11px] flex flex-col gap-1 text-[#5e5e5e] dark:text-[#9e9ea6]">
                      {proj.techStack && (
                        <div>
                          <span className="text-[#1a1c1c] dark:text-[#f0f0f2] font-medium">stack:</span>{" "}
                          {proj.techStack}
                        </div>
                      )}
                      {proj.metric && (
                        <div className="text-[11px] text-[#5e5e5e]/80 dark:text-[#9e9ea6]/80">
                          benchmark: {proj.metric} ({proj.metricSub || "latency"})
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Expandable Toggle Button */}
              {allProjects.length > initialProjectsCount && (
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setExpandedProjects(!expandedProjects)}
                    className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>
                      {expandedProjects
                        ? "collapse projects ↑"
                        : `${remainingCount} more projects ↓`}
                    </span>
                  </button>
                </div>
              )}
            </section>

          </div>
        </div>
      </main>

      {/* FOOTER (680px constrained) */}
      <footer className="w-full bg-[#f9f9f9] dark:bg-[#0d0d0e] py-10 border-t border-transparent dark:border-[#26262a]/40 transition-colors duration-200">
        <div className="max-w-[680px] mx-auto px-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-3 text-[#5e5e5e] dark:text-[#9e9ea6]">
              {profile?.email && (
                <a className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors" href={`mailto:${profile.email}`}>
                  email ↗
                </a>
              )}
              <a className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors" href="/resume.pdf" target="_blank">
                resume ↗
              </a>
              {profile?.socials?.github && (
                <a className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors" href={profile.socials.github} target="_blank">
                  github ↗
                </a>
              )}
              {profile?.socials?.linkedin && (
                <a className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors" href={profile.socials.linkedin} target="_blank">
                  linkedin ↗
                </a>
              )}
              {profile?.socials?.twitter && (
                <a className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors" href={profile.socials.twitter} target="_blank">
                  x ↗
                </a>
              )}
            </div>

            <div className="flex items-center gap-1 text-[#5e5e5e] dark:text-[#9e9ea6] font-mono text-xs">
              <span>sys.node: 01</span>
              <span className="text-[#5e5e5e] dark:text-[#9e9ea6]/60">·</span>
              <span>latency: 0.8ms</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[#5e5e5e] dark:text-[#9e9ea6] font-mono text-[11px]">
            <span>© 2026 {profile?.name || "Abhishek Jangid"}. Distributed under CC BY-NC 4.0.</span>
            <span className="text-[#5e5e5e] dark:text-[#9e9ea6]/60">calibrated for 680px mono readouts</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
