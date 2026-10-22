import type { IProfile, ISkillMatrix } from "@/models/Portfolio";

export default function PlayerZeroHero({
  profile,
  skills,
}: {
  profile: IProfile;
  skills?: ISkillMatrix[];
}) {
  // Extract dynamic skill keywords if available, else high-tech defaults
  const topSkill1 = skills?.[0]?.items?.[0] || "Synthetic Corpus";
  const topSkill2 = skills?.[0]?.items?.[1] || "Speculative Decoding";
  const topSkill3 = skills?.[1]?.items?.[0] || "TensorRT-LLM";
  const topSkill4 = skills?.[1]?.items?.[1] || "LoRA Merging";
  const topSkill5 = skills?.[2]?.items?.[0] || "Agent State Machine";

  return (
    <section
      className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden bg-dot-pattern"
      data-purpose="hero-pipeline-diagram"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Top Matrix Headline */}
        <h1 className="dot-matrix-title text-3xl sm:text-5xl md:text-6xl text-neutral-900 mb-8 select-none tracking-widest">
          BUILD. TRAIN.
        </h1>

        {/* Diagram Area (Convergence Flowchart mimicking PlayerZero reference) */}
        <div
          className="relative w-full max-w-4xl mx-auto my-4 py-8 px-4"
          data-purpose="agent-pipeline-flowchart"
        >
          {/* Background SVG Wire Connections */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            preserveAspectRatio="none"
            viewBox="0 0 800 240"
          >
            {/* Left upper to center */}
            <path className="connector-wire" d="M 120 40 C 260 40, 260 120, 390 120" />
            {/* Left lower to center */}
            <path className="connector-wire" d="M 160 200 C 260 200, 260 120, 390 120" />
            {/* Right upper to center */}
            <path className="connector-wire-right" d="M 680 40 C 540 40, 540 120, 410 120" />
            {/* Right lower to center */}
            <path className="connector-wire-right" d="M 640 200 C 540 200, 540 120, 410 120" />

            {/* Sub branch links */}
            <line className="connector-wire-solid" x1="80" x2="200" y1="40" y2="40" />
            <line className="connector-wire-solid" x1="100" x2="220" y1="200" y2="200" />
            <line className="connector-wire-solid" x1="580" x2="720" y1="40" y2="40" />
            <line className="connector-wire-solid" x1="560" x2="740" y1="200" y2="200" />

            {/* Pipeline Node Dots */}
            <circle cx="85" cy="40" fill="#1c1c1e" r="3.5" />
            <circle cx="215" cy="40" fill="#1c1c1e" r="3" />
            <circle cx="95" cy="200" fill="#1c1c1e" r="3" />
            <circle cx="230" cy="200" fill="#1c1c1e" r="3.5" />
            <circle cx="575" cy="40" fill="#1c1c1e" r="3" />
            <circle cx="715" cy="40" fill="#1c1c1e" r="3.5" />
            <circle cx="565" cy="200" fill="#1c1c1e" r="3.5" />
            <circle cx="735" cy="200" fill="#1c1c1e" r="3" />
          </svg>

          {/* Interactive Node Containers */}
          <div className="relative z-10 grid grid-cols-3 items-center min-h-[220px]">
            {/* Left Branch Nodes */}
            <div className="flex flex-col justify-between h-44 items-start pl-2 sm:pl-6 text-left">
              {/* Top Left Node */}
              <div className="node-float-1">
                <div className="diagram-chip inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-300 rounded-full text-[11px] font-mono font-medium text-stone-700 shadow-sm transition-all duration-200">
                  <span>{topSkill1}</span>
                </div>
              </div>
              {/* Bottom Left Node */}
              <div className="node-float-2 flex flex-wrap items-center gap-2">
                <span className="diagram-chip inline-flex items-center px-2.5 py-0.5 bg-white border border-stone-300 rounded-full text-[10px] font-mono text-stone-600 shadow-xs">
                  {topSkill2}
                </span>
                <span className="diagram-chip inline-flex items-center px-2.5 py-0.5 bg-white border border-stone-300 rounded-full text-[10px] font-mono text-stone-600 shadow-xs">
                  Evals-v4
                </span>
              </div>
            </div>

            {/* Center Core Emblem Module */}
            <div className="flex flex-col items-center justify-center">
              <div className="core-floating-emblem relative w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-neutral-200/60 p-2.5 flex items-center justify-center border border-neutral-300 shadow-inner group">
                <div className="w-full h-full rounded-2xl bg-white border border-neutral-300 flex items-center justify-center shadow-subtle-card transition-all duration-300 group-hover:scale-105">
                  {/* Central AI Engine Monogram */}
                  <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center p-2.5 text-white shadow-md transition-transform duration-300 group-hover:rotate-3">
                    <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
                      <rect height="4" rx="1" width="4" x="7" y="2" />
                      <rect height="4" rx="1" width="4" x="13" y="2" />
                      <rect height="4" rx="1" width="4" x="2" y="7" />
                      <rect height="4" rx="1" width="4" x="18" y="7" />
                      <rect height="4" rx="1" width="4" x="7" y="18" />
                      <rect height="4" rx="1" width="4" x="13" y="18" />
                      <rect height="4" rx="1" width="4" x="2" y="13" />
                      <rect height="4" rx="1" width="4" x="18" y="13" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  </div>
                </div>
                {/* Node activity indicator with animated pulsing glow */}
                <div
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ping-slow"
                  title="Pipeline Active"
                />
              </div>
            </div>

            {/* Right Branch Nodes */}
            <div className="flex flex-col justify-between h-44 items-end pr-2 sm:pr-6 text-right">
              {/* Top Right Node */}
              <div className="node-float-3">
                <div className="diagram-chip inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-300 rounded-full text-[11px] font-mono font-medium text-stone-700 shadow-sm transition-all duration-200">
                  <span>{topSkill3}</span>
                </div>
              </div>
              {/* Bottom Right Node */}
              <div className="node-float-4 flex flex-wrap items-center justify-end gap-2">
                <span className="diagram-chip inline-flex items-center px-2 py-0.5 bg-white border border-stone-300 rounded-full text-[10px] font-mono text-stone-600 shadow-xs">
                  {topSkill4}
                </span>
                <span className="diagram-chip inline-flex items-center px-2.5 py-0.5 bg-white border border-stone-300 rounded-full text-[10px] font-mono text-stone-600 shadow-xs">
                  {topSkill5}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Dot-Matrix Word */}
        <h2 className="dot-matrix-title text-3xl sm:text-5xl md:text-6xl text-neutral-900 mt-4 mb-6 select-none tracking-widest">
          DEPLOY. SCALE.
        </h2>

        {/* Subtitle Pitch */}
        <p className="max-w-2xl mx-auto text-stone-600 text-sm sm:text-base font-normal leading-relaxed mb-8">
          {profile.headline ||
            `${profile.name} builds enterprise-grade agentic systems, sub-second multimodal inference, and self-healing LLM pipelines beyond standard API wrappers.`}
        </p>

        {/* Primary Action Pill with Dot-Matrix Icon */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            className="inline-flex items-center gap-3 bg-[#121213] hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium px-5 py-3 rounded-full transition-all duration-200 shadow-md active:scale-95 group"
            href="#projects"
          >
            {/* Halftone dot icon matrix inside pill */}
            <div className="w-4 h-4 grid grid-cols-3 gap-0.5 opacity-80 group-hover:opacity-100">
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
              <span className="w-1 h-1 bg-white rounded-full" />
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
              <span className="w-1 h-1 bg-amber-400 rounded-full" />
            </div>
            <span>Explore Deployed Architectures</span>
          </a>

          {profile.socials?.github && (
            <a
              className="inline-flex items-center gap-2 bg-stone-200/70 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-medium px-4 py-3 rounded-full transition-all duration-200"
              href={profile.socials.github}
              rel="noreferrer"
              target="_blank"
            >
              <span>GitHub Profile</span>
              <svg
                className="w-3.5 h-3.5 text-stone-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
