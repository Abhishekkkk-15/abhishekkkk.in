"use client";

import { useEffect, useState } from "react";
import type { IProfile } from "../../models/Portfolio";
import { profile as defaultProfile } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";
import ParallaxPortrait from "../ui/ParallaxPortrait";
import TelemetryCounter from "../ui/TelemetryCounter";
import HairlineDivider from "../ui/HairlineDivider";

interface HeroProps {
  profile?: IProfile;
}

export default function Hero({ profile = defaultProfile }: HeroProps) {
  const [timeStr, setTimeStr] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTimeStr(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCurl = async () => {
    try {
      await navigator.clipboard.writeText("curl -s https://abhishekkkk.in/api/profile");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.warn("Could not copy curl command:", err);
    }
  };

  return (
    <section className="border-b border-[#E2E0D8]" data-purpose="hero-statement" id="hero">
      <div className="p-5 sm:p-8 md:p-12 lg:p-16">
        <Reveal className="w-full">
          {/* Top metadata strip with live IST telemetry */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between font-mono text-[10.5px] uppercase tracking-widest text-[#6E6D68] mb-8 pb-4 border-b border-[#E2E0D8] dark:border-[#242422] gap-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block" />
              <span>EST. 2024 // AUTONOMOUS AI &amp; DISTRIBUTED SYSTEMS</span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                {profile.location?.toUpperCase().replace(".", "") || "INDIA"} // {timeStr ? `${timeStr} IST [UTC+05:30]` : "IST [UTC+05:30]"}
              </span>
              <span className="hidden sm:inline text-[#2563EB] font-medium">SYS_STATUS: OPTIMAL</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Portrait with 0.2x Parallax Film-Grain & Identity */}
            <div className="lg:col-span-5 flex flex-col items-start gap-6">
              <ParallaxPortrait
                src={profile.avatar}
                alt={profile.name}
              />
              <div className="space-y-1.5 pt-2">
                <CharFadeText
                  as="h1"
                  className="text-4xl sm:text-5xl font-display font-normal tracking-tight text-[#111111] mb-2 block"
                >
                  {profile.name}
                </CharFadeText>
                <div className="font-mono text-xs uppercase tracking-widest text-[#6E6D68]">
                  {profile.role}
                </div>
                <div className="font-mono text-xs text-[#6E6D68] flex items-center gap-1 pt-1">
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
                  {profile.headline || profile.tagline}
                </CharFadeText>
                <p className="font-mono text-xs leading-relaxed text-[#6E6D68]">
                  {profile.japaneseBio}
                </p>
              </div>

              {/* Technical Telemetry Bar with Viewport Counter Interpolation */}
              <div className="pt-8">
                <HairlineDivider leftLabel="TELEMETRY" rightLabel="SYS_CORE" className="mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 font-mono">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#6E6D68] uppercase tracking-wider">
                      {profile.stats?.throughput?.label || "THROUGHPUT"}
                    </div>
                    <div className="text-2xl font-display text-[#111111]">
                      <TelemetryCounter value={profile.stats?.throughput?.value || "2,840"} />{" "}
                      <span className="text-xs text-[#6E6D68]">
                        {profile.stats?.throughput?.unit}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-[#6E6D68] uppercase tracking-wider">
                      {profile.stats?.coreEngines?.label || "CORE STACK"}
                    </div>
                    <div className="text-sm text-[#111111] pt-1">
                      {profile.stats?.coreEngines?.value}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-[#6E6D68] uppercase tracking-wider">
                      {profile.stats?.status?.label || "STATUS"}
                    </div>
                    <div className="text-sm text-[#111111] pt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] inline-block animate-pulse"></span>
                      {profile.stats?.status?.value}
                    </div>
                  </div>
                </div>

                {/* CLI Direct Access Telemetry Chip */}
                <div className="pt-6 flex flex-wrap items-center gap-3 font-mono text-[11px]">
                  <div className="flex items-center gap-2 bg-[#EBEAE4]/80 dark:bg-[#171716] border border-[#E2E0D8] dark:border-[#242422] px-3 py-1.5 text-[#6E6D68]">
                    <span className="text-[#2563EB] font-bold">$</span>
                    <span className="text-[#111111] dark:text-[#F4F3EF] selection:bg-[#2563EB]">
                      curl -s https://abhishekkkk.in/api/profile
                    </span>
                    <button
                      onClick={handleCopyCurl}
                      className="ml-2 pl-2 border-l border-[#D8D6CE] dark:border-[#2E2E2C] text-[#111111] dark:text-[#F4F3EF] hover:text-[#2563EB] transition-colors cursor-pointer"
                      title="Copy curl command"
                    >
                      {copied ? (
                        <span className="text-[#2563EB] font-medium">COPIED ✓</span>
                      ) : (
                        "COPY"
                      )}
                    </button>
                  </div>
                  <span className="text-[10px] text-[#6E6D68] uppercase tracking-wider">
                    // PUBLIC JSON SCHEMA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
