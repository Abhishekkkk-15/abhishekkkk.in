"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { IPortfolioData } from "@/models/Portfolio";
import type { FormattedGithubData } from "@/lib/github";
import { Sun, Moon, ArrowUpRight, GitCommit, CheckCircle2 } from "lucide-react";
import { VenomTransitionOverlay, triggerVenomTransition } from "@/components/VenomTransition";

export default function MinimalTheme({
  portfolio,
  githubData,
}: {
  portfolio: IPortfolioData;
  githubData: FormattedGithubData;
}) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState(false);

  // Track scroll position to transition navbar size
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const toggleTheme = (e?: React.MouseEvent) => {
    const next = !isDark;

    const applyTheme = () => {
      setIsDark(next);
      localStorage.setItem("theme", next ? "dark" : "light");
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    // Venom theme transition
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      applyTheme();
      return;
    }

    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : 0;

    triggerVenomTransition({
      x,
      y,
      nextDark: next,
      onSwap: applyTheme,
    });
  };

  const { profile, experience = [], projects = [] } = portfolio;
  const name = (profile?.name || "Abhishek Jangid").toLowerCase();
  const shortName = (profile?.shortName || "abhishek").toLowerCase();

  const allExperience = experience.length > 0 ? experience : [
    {
      company: "Adiyogi Technosoft",
      role: "Full Stack Developer",
      location: "Jaipur, India",
      period: "2026 — PRESENT",
      description: "Architecting and shipping production full-stack web applications with Next.js, React, Node.js, and TypeScript. Engineering high-concurrency PostgreSQL and MongoDB data pipelines.",
    },
    {
      company: "Autonomous Systems Lab",
      role: "AI Systems & Distributed Infrastructure Engineer",
      location: "Remote",
      period: "2024 — PRESENT",
      description: "Designing speculative agent frameworks, self-hosted deployment daemons (Infra-CD) in Go, and multi-modal AI desktop companions (Jarvis Assistant) utilizing LangGraph state machines.",
    },
  ];

  // Combine projects for a rich project list (falling back to core systems if empty)
  const allProjects: Array<any> = projects.length > 0 ? projects : [
    {
      title: "jarvis-assistant",
      description: "multimodal ai desktop companion that lives on screen. captures viewports, streams microphone audio, and triggers system actions via langgraph state machines.",
      techStack: "TypeScript, LangGraph, Electron, Next.js",
      metric: "sub-50ms",
      metricSub: "agent loop",
      github: "https://github.com/Abhishekkkk-15/jarvis-assistant",
      live: "https://jarvis.abhishekkkk.in",
    },
    {
      title: "infra-cd",
      description: "self-hosted continuous deployment platform with isolated build environments and lightweight go worker daemons streaming live build logs over sse.",
      techStack: "Go, TypeScript, React, Docker, SSE",
      metric: "real-time sse",
      metricSub: "go runner daemons",
      github: "https://github.com/Abhishekkkk-15/infra-cd",
      live: "https://infra-cd.abhishekkkk.in",
    },
    {
      title: "eden",
      description: "ai-driven workspace for indexing and searching internal knowledge via pgvector semantic embeddings and redis background queues.",
      techStack: "TypeScript, React, Node.js, pgvector, Redis",
      metric: "pgvector",
      metricSub: "semantic search",
      github: "https://github.com/Abhishekkkk-15/Eden",
    },
    {
      title: "collabflow",
      description: "real-time team workspace platform with live document sync, role-based access controls, and a resilient nestjs microservice architecture.",
      techStack: "TypeScript, NestJS, Next.js, PostgreSQL",
      metric: "sub-20ms",
      metricSub: "websocket sync",
      github: "https://github.com/Abhishekkkk-15/collabflow",
      live: "https://collabflow.abhishekkkk.in/",
    },
    {
      title: "internal-search",
      description: "cross-platform knowledge retrieval aggregating data across slack, notion, github, and jira with langchain rag pipelines and hybrid vector ranking.",
      techStack: "TypeScript, Next.js, LangChain, pgvector",
      metric: "cross-app rag",
      metricSub: "cosine similarity",
      github: "https://github.com/Abhishekkkk-15/internal-search",
    },
    {
      title: "email-scheduler",
      description: "full-stack automated email campaign system featuring a visual workflow builder and cron-scheduled job dispatching powered by agenda.js.",
      techStack: "Next.js, TypeScript, Redis, Agenda.js",
      metric: "visual pipeline",
      metricSub: "socket.io dispatch",
      github: "https://github.com/Abhishekkkk-15/email_scheduler",
      live: "https://email-scheduler-oqpk.vercel.app/",
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

  // GitHub contribution matrix data
  const weeks = githubData?.weeks && githubData.weeks.length > 0 ? githubData.weeks : [];
  const totalContributions =
    githubData?.totalContributions || githubData?.commitsCount || "1,776";
  const prsMerged = githubData?.prsMerged || "48";
  const starsAccumulated = githubData?.starsAccumulated || "180 ★";

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] text-[#1a1c1c] dark:text-[#f0f0f2] font-sans antialiased selection:bg-[#1a1c1c] selection:text-[#f9f9f9] dark:selection:bg-[#f0f0f2] dark:selection:text-[#0d0d0e] transition-colors duration-200">
      <VenomTransitionOverlay />
      
      {/* FIXED MINIMAL HEADER (Transitions to a more compact bar on scroll) */}
      <header
        className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-[#f9f9f9]/90 dark:bg-[#0d0d0e]/90 border-b border-[#E5E5E5]/80 dark:border-[#26262a]/80 shadow-2xs"
            : "bg-[#f9f9f9]/85 dark:bg-[#0d0d0e]/85 border-b border-transparent"
        }`}
      >
        <div
          className={`max-w-[680px] mx-auto px-6 flex items-center justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? "h-11 sm:h-12" : "h-16"
          }`}
        >
          {/* Brandmark */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className={`font-mono font-medium tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2] lowercase hover:text-black dark:hover:text-white transition-all duration-300 ${
                isScrolled ? "text-[11px]" : "text-xs"
              }`}
            >
              {shortName}
            </a>
          </div>

          {/* Right Controls: Dark/Light Mode Toggle */}
          <div className="flex items-center gap-3">
            <button
              id="theme-toggle"
              type="button"
              onClick={(e) => toggleTheme(e)}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`rounded-full flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f0f2] hover:bg-[#f3f3f4] dark:hover:bg-[#1e1e22] transition-all duration-300 cursor-pointer overflow-hidden ${
                isScrolled ? "w-7 h-7" : "w-8 h-8"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isDark ? "dark" : "light"}
                  initial={{ opacity: 0, rotate: -40, scale: 0.75 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 40, scale: 0.75 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  {mounted && isDark ? (
                    <Sun size={isScrolled ? 13.5 : 15} className="text-[#f0f0f2]" />
                  ) : (
                    <Moon size={isScrolled ? 13.5 : 15} className="text-[#1a1c1c]" />
                  )}
                </motion.div>
              </AnimatePresence>
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
                
                <p className="font-serif text-lg sm:text-[1.125rem] text-[#1a1c1c] dark:text-[#f0f0f2] leading-relaxed">
                  {profile?.headline ? (
                    profile.headline.toLowerCase()
                  ) : (
                    <>
                      i do <strong className="font-semibold text-black dark:text-white">applied ai &amp; systems engineering</strong>, &amp; build the <strong className="font-semibold text-black dark:text-white">autonomous agents &amp; inference runtimes</strong> that serve them.
                    </>
                  )}
                </p>
              </div>

              {/* Persona Ethos Paragraphs */}
              <div className="flex flex-col gap-3.5 text-[#5e5e5e] dark:text-[#9e9ea6] text-[0.9375rem] leading-relaxed">
                {profile?.tagline && (
                  <p className="font-mono text-xs text-[#1a1c1c] dark:text-[#f0f0f2]">
                    {profile.tagline}
                  </p>
                )}
                {profile?.bioParagraph1 ? (
                  <p>{profile.bioParagraph1}</p>
                ) : (
                  <p>
                    i like working when the world is sleeping. my work cycle is generally 12pm to 4am. and i usually write my thoughts in my <a className="text-[#1a1c1c] dark:text-[#f0f0f2] underline underline-offset-4 decoration-black dark:decoration-[#9e9ea6] hover:text-black dark:hover:text-white transition-colors" href="#projects">architecture dossiers</a>.
                  </p>
                )}
                {profile?.bioParagraph2 ? (
                  <p>{profile.bioParagraph2}</p>
                ) : (
                  <p>
                    i live the part after the launch day. when the reasoning breaks, when the cost skyrockets, when the first traffic hits — all the similar thrills :)
                  </p>
                )}
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
                {profile?.socials?.twitter && (
                  <>
                    <span className="text-[#dadada] dark:text-[#26262a] select-none">/</span>
                    <a
                      className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                      href={profile.socials.twitter}
                      rel="noreferrer"
                      target="_blank"
                    >
                      x ↗
                    </a>
                  </>
                )}
                {profile?.socials?.github && (
                  <>
                    <span className="text-[#dadada] dark:text-[#26262a] select-none">/</span>
                    <a
                      className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                      href={profile.socials.github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      github ↗
                    </a>
                  </>
                )}
                {profile?.socials?.linkedin && (
                  <>
                    <span className="text-[#dadada] dark:text-[#26262a] select-none">/</span>
                    <a
                      className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                      href={profile.socials.linkedin}
                      rel="noreferrer"
                      target="_blank"
                    >
                      linkedin ↗
                    </a>
                  </>
                )}
                <span className="text-[#dadada] dark:text-[#26262a] select-none">/</span>
                <a
                  className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors"
                  href={profile?.resumeUrl || "/resume.pdf"}
                  rel="noreferrer"
                  target="_blank"
                >
                  resume ↗
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
                  {allExperience.map((item, idx) => (
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
                </div>
              </div>
            </section>

            {/* OPEN SOURCE SECTION */}
            <section className="flex flex-col pt-8 pb-6 gap-4" id="open-source">
              <div className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-[#26262a] pb-2">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#5e5e5e] dark:text-[#9e9ea6]">
                  open source
                </span>
                <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
                  52-week activity
                </span>
              </div>

              {/* 52-Week GitHub Contribution Graph */}
              {weeks.length > 0 && (
                <div className="flex flex-col gap-3 py-1">
                  {/* Summary Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-sm font-semibold text-[#1a1c1c] dark:text-[#f0f0f2]">
                        {totalContributions} contributions
                      </span>
                      <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6]">
                        in the last year
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-[11px] text-[#5e5e5e] dark:text-[#9e9ea6]">
                      {prsMerged && (
                        <span>
                          <strong className="font-medium text-[#1a1c1c] dark:text-[#f0f0f2]">
                            {prsMerged}
                          </strong>{" "}
                          prs
                        </span>
                      )}
                      {starsAccumulated && (
                        <>
                          <span className="text-[#dadada] dark:text-[#26262a]">·</span>
                          <span>
                            <strong className="font-medium text-[#1a1c1c] dark:text-[#f0f0f2]">
                              {starsAccumulated}
                            </strong>
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 52-Week Grid */}
                  <div className="overflow-x-auto scrollbar-none pb-1">
                    <div className="min-w-[560px] flex flex-col gap-1.5">
                      {/* Months */}
                      <div className="flex justify-between text-[10px] font-mono text-[#5e5e5e]/80 dark:text-[#9e9ea6]/70 pl-5 pr-1 select-none lowercase">
                        <span>jan</span>
                        <span>feb</span>
                        <span>mar</span>
                        <span>apr</span>
                        <span>may</span>
                        <span>jun</span>
                        <span>jul</span>
                        <span>aug</span>
                        <span>sep</span>
                        <span>oct</span>
                        <span>nov</span>
                        <span>dec</span>
                      </div>

                      {/* Day Markers + Squares Matrix */}
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col justify-between h-[72px] text-[9px] font-mono text-[#5e5e5e]/70 dark:text-[#9e9ea6]/60 select-none py-0.5 lowercase shrink-0 w-3">
                          <span>m</span>
                          <span>w</span>
                          <span>f</span>
                        </div>

                        <div
                          className="flex-1 grid grid-flow-col grid-rows-7 gap-[2.5px]"
                          style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
                        >
                          {weeks.map((week, wIdx) =>
                            week.map((day, dIdx) => (
                              <div
                                key={`${wIdx}-${dIdx}`}
                                title={`${day.count} contributions on ${day.date}`}
                                className={`w-full aspect-square rounded-[2px] transition-transform duration-100 hover:scale-125 cursor-pointer ${
                                  day.level === 0
                                    ? "bg-[#ebedf0] dark:bg-[#1f1f23]"
                                    : day.level === 1
                                    ? "bg-[#bbf7d0] dark:bg-[#064e3b]"
                                    : day.level === 2
                                    ? "bg-[#4ade80] dark:bg-[#059669]"
                                    : day.level === 3
                                    ? "bg-[#16a34a] dark:bg-[#10b981]"
                                    : "bg-[#14532d] dark:bg-[#34d399]"
                                }`}
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Scale Legend */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#5e5e5e] dark:text-[#9e9ea6] pt-1">
                        <span>github stream</span>
                        <div className="flex items-center gap-1.5">
                          <span>less</span>
                          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#ebedf0] dark:bg-[#1f1f23]" />
                          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#bbf7d0] dark:bg-[#064e3b]" />
                          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#4ade80] dark:bg-[#059669]" />
                          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#16a34a] dark:bg-[#10b981]" />
                          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#14532d] dark:bg-[#34d399]" />
                          <span>more</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
          <div className="flex flex-wrap items-center gap-3 text-[#5e5e5e] dark:text-[#9e9ea6] font-mono text-xs">
            {profile?.email && (
              <a className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors" href={`mailto:${profile.email}`}>
                email ↗
              </a>
            )}
            <a className="hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors" href={profile?.resumeUrl || "/resume.pdf"} target="_blank">
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

          <div className="text-[#5e5e5e] dark:text-[#9e9ea6] font-mono text-[11px]">
            © {new Date().getFullYear()} {profile?.name || "Abhishek Jangid"}
          </div>
        </div>
      </footer>

    </div>
  );
}
