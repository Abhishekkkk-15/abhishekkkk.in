import { profile } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";

export default function Hero() {
  return (
    <section className="border-b border-[#e2e0d8]" data-purpose="hero-statement" id="hero">
      <div className="p-8 md:p-14 lg:p-16">
        <Reveal className="w-full">
          {/* Top metadata strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono text-[10.5px] uppercase tracking-widest text-[#8a8883] mb-12 pb-4 border-b border-[#e2e0d8] gap-2">
            <span>EST. 2024 // AUTONOMOUS AI &amp; DISTRIBUTED SYSTEMS</span>
            <span>AI RESEARCH &amp; BACKEND SYSTEMS</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Portrait and Identity */}
            <div className="lg:col-span-5 flex flex-col items-start gap-6">
              <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-square bg-[#f2f0ea] border border-[#e2e0d8] overflow-hidden shrink-0 shadow-sm">
                <img
                  alt={profile.name}
                  className="w-full h-full object-cover grayscale contrast-105 block"
                  src={profile.avatar}
                />
              </div>
              <div className="space-y-1.5 pt-2">
                <CharFadeText
                  as="h1"
                  className="text-4xl sm:text-5xl font-display font-normal tracking-tight text-[#111111] mb-2 block"
                >
                  {profile.name}
                </CharFadeText>
                <div className="font-mono text-xs uppercase tracking-widest text-[#8a8883]">
                  {profile.role}
                </div>
                <div className="font-mono text-xs text-[#555452] flex items-center gap-1 pt-1">
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Statement, Japanese Bio, and Telemetry Metrics */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <CharFadeText
                  as="p"
                  className="text-xl sm:text-2xl font-light text-[#111111] leading-relaxed block"
                >
                  Specializing in autonomous AI agents, LangGraph multi-agent runtimes, low-latency streaming pipelines, and production backend infrastructure.
                </CharFadeText>
                <p className="font-mono text-xs leading-relaxed text-[#8a8883]">
                  {profile.japaneseBio}
                </p>
              </div>

              {/* Technical Telemetry Bar */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#e2e0d8] font-mono md:grid-cols-3">
                <div className="space-y-1">
                  <div className="text-[10px] text-[#8a8883] uppercase tracking-wider">
                    {profile.stats.throughput.label}
                  </div>
                  <div className="text-2xl font-display text-[#111111]">
                    {profile.stats.throughput.value}{" "}
                    <span className="text-xs text-[#8a8883]">
                      {profile.stats.throughput.unit}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-[#8a8883] uppercase tracking-wider">
                    {profile.stats.coreEngines.label}
                  </div>
                  <div className="text-sm text-[#111111] pt-1">
                    {profile.stats.coreEngines.value}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-[#8a8883] uppercase tracking-wider">
                    {profile.stats.status.label}
                  </div>
                  <div className="text-sm text-[#111111] pt-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] inline-block animate-pulse"></span>
                    {profile.stats.status.value}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
