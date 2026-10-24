"use client";

import { motion } from "framer-motion";
import type { FormattedGithubData } from "@/lib/github";
import { hardwareSound } from "./hardwareSound";
import { GitCommit, GitPullRequest, Star, Terminal, GitFork, ArrowUpRight } from "lucide-react";

export default function IndustrialGithub({ data }: { data: FormattedGithubData }) {
  if (!data) return null;

  return (
    <section id="github" className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full select-none">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-[#CAC8BD] pb-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="px-2 py-0.5 bg-[#1C1B1A] text-[#FF4F00] font-mono text-[10px] font-bold rounded-[3px]">
            SECTION // 05
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold text-[#1C1B1A] uppercase tracking-wider">
            FIRMWARE COMMIT TELEMETRY
          </h2>
        </div>
        <div className="font-mono text-xs text-[#78766C] hidden sm:block">
          STATUS: {data.status || "CONTINUOUS INTEGRATION"}
        </div>
      </div>

      {/* Main Backlit Workstation Chassis */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
        className="bg-[#EBE9E1] border-2 border-[#CAC8BD] rounded-[14px] p-6 sm:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] space-y-8"
      >
        {/* Top 4 Hardware Digital Readout Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "ANNUAL COMMITS", value: data.commitsCount || data.totalContributions, color: "#FF4F00", icon: GitCommit },
            { label: "PRS SHIPPED", value: data.prsMerged, color: "#00E676", icon: GitPullRequest },
            { label: "CODE AUDITS", value: data.codeReviews, color: "#FFD000", icon: Terminal },
            { label: "GITHUB STARS", value: data.starsAccumulated, color: "#0088FF", icon: Star },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#181716] border border-[#2D2B27] rounded-[8px] p-3.5 font-mono shadow-inner flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-[#8C8A7E] text-[10px] mb-2 uppercase">
                <span>{stat.label}</span>
                <stat.icon size={12} style={{ color: stat.color }} />
              </div>
              <div className="text-2xl font-bold tracking-wider text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* 52-Week Backlit Phosphor LED Sequencer Matrix */}
        <div className="bg-[#141312] border-2 border-[#292825] rounded-[10px] p-4 sm:p-6 shadow-[inset_0_3px_10px_rgba(0,0,0,0.9)] overflow-hidden">
          <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8A7E] border-b border-[#292825] pb-2 mb-4">
            <span className="text-[#FF4F00] font-bold">52-WEEK PHOSPHOR LED MATRIX</span>
            <span className="hidden sm:inline">CYCLE: 365 DAYS // SAMPLE RATE: 1 DAY/DOT</span>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="flex gap-[3.5px] min-w-[700px] justify-between">
              {data.weeks &&
                data.weeks.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-[3.5px]">
                    {week.map((day, dIdx) => {
                      const level = day.level || 0;
                      return (
                        <div
                          key={dIdx}
                          title={`${day.date}: ${day.count} contributions`}
                          onClick={() => hardwareSound.playDialTick()}
                          className={`w-[11px] h-[11px] rounded-[2px] transition-all cursor-pointer ${
                            level === 0
                              ? "bg-[#252422] hover:bg-[#383733]"
                              : level === 1
                              ? "bg-[#8A3300] hover:bg-[#B34200]"
                              : level === 2
                              ? "bg-[#C44400] hover:bg-[#E65000] shadow-[0_0_4px_rgba(255,79,0,0.4)]"
                              : level === 3
                              ? "bg-[#FF5500] hover:bg-[#FF7700] shadow-[0_0_6px_rgba(255,79,0,0.7)]"
                              : "bg-[#FF8800] hover:bg-[#FFAA00] shadow-[0_0_8px_rgba(255,136,0,0.9)]"
                          }`}
                        />
                      );
                    })}
                  </div>
                ))}
            </div>
          </div>

          {/* Scale Legend */}
          <div className="flex items-center justify-between text-[9px] font-mono text-[#8C8A7E] pt-3 border-t border-[#292825] mt-2">
            <span>OFFLINE</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-[1px] bg-[#252422]" />
              <span className="w-2.5 h-2.5 rounded-[1px] bg-[#8A3300]" />
              <span className="w-2.5 h-2.5 rounded-[1px] bg-[#C44400]" />
              <span className="w-2.5 h-2.5 rounded-[1px] bg-[#FF5500]" />
              <span className="w-2.5 h-2.5 rounded-[1px] bg-[#FF8800]" />
            </div>
            <span>PEAK ACTIVITY</span>
          </div>
        </div>

        {/* Recent Commit Rolling Telemetry Tape */}
        {data.recentCommits && data.recentCommits.length > 0 && (
          <div className="bg-[#DFDCD3] border border-[#BCBAAD] rounded-[10px] p-5 shadow-inner">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#1C1B1A] border-b border-[#CCCABF] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <GitCommit size={14} className="text-[#FF4F00]" />
                <span>RECENT TELEMETRY TAPE STREAM</span>
              </div>
              <span className="text-[10px] text-[#78766C]">REAL-TIME REPOSITORY BUFFER</span>
            </div>

            <div className="divide-y divide-[#CCCABF]/80">
              {data.recentCommits.slice(0, 4).map((commit, cIdx) => (
                <div
                  key={cIdx}
                  className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs hover:bg-white/40 px-2 rounded transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="px-1.5 py-0.5 bg-[#1C1B1A] text-[#FF4F00] rounded text-[10px] font-bold">
                      {commit.sha.substring(0, 7)}
                    </span>
                    <span className="text-[#1C1B1A] font-medium truncate">
                      {commit.message}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10.5px] text-[#78766C] shrink-0">
                    <span className="bg-[#EBE9E1] px-2 py-0.5 rounded border border-[#CCCABF]">
                      {commit.repo}
                    </span>
                    <span>{commit.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
