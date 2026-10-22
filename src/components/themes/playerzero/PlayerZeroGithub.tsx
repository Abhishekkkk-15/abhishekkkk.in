"use client";

import type { FormattedGithubData } from "@/lib/github";
import { GitCommit, ArrowUpRight } from "lucide-react";

export default function PlayerZeroGithub({
  data,
}: {
  data: FormattedGithubData;
}) {
  const getCellBg = (level: number) => {
    switch (level) {
      case 1:
        return "bg-stone-300";
      case 2:
        return "bg-stone-400";
      case 3:
        return "bg-neutral-800";
      case 4:
        return "bg-emerald-500";
      default:
        return "bg-stone-200/70";
    }
  };

  return (
    <section
      className="max-w-6xl mx-auto px-6 py-16 scroll-mt-20"
      data-purpose="open-source-commits"
      id="commits"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#e5e5e8]">
        <div>
          <span className="text-xs font-mono font-medium tracking-widest text-stone-400 uppercase">
            OPEN SOURCE &amp; CODE COMMITS
          </span>
          <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-1">
            Public Engineering Activity
          </h3>
        </div>
        <a
          className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-800 hover:text-black hover:underline mt-2 sm:mt-0"
          href={data.url}
          target="_blank"
          rel="noreferrer"
        >
          <span>@{data.username} on GitHub</span>
          <ArrowUpRight size={13} />
        </a>
      </div>

      {/* Contribution Heatmap Card */}
      <div className="bg-[#f2f2f4]/60 border border-[#e5e5e8] rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
        {/* Metric Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200/70">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-2xl font-matrix text-neutral-900 tracking-wider">
                {data.totalContributions}
              </div>
              <div className="text-xs font-mono text-stone-500">
                contributions in the last year
              </div>
            </div>
            <div className="border-l border-stone-200 pl-6">
              <div className="text-2xl font-matrix text-neutral-900 tracking-wider">
                {data.prsMerged || "48"} PRs
              </div>
              <div className="text-xs font-mono text-stone-500">
                merged pull requests
              </div>
            </div>
            <div className="border-l border-stone-200 pl-6 hidden md:block">
              <div className="text-2xl font-matrix text-neutral-900 tracking-wider">
                {data.starsAccumulated || "180 ★"}
              </div>
              <div className="text-xs font-mono text-stone-500">
                accumulated stars
              </div>
            </div>
          </div>

          {/* Languages Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            {data.topLanguages.slice(0, 3).map((lang, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-white border border-stone-200 text-stone-700 rounded-full"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* 52-Week Dot-Matrix Heatmap */}
        <div className="pt-6 overflow-x-auto">
          <div className="min-w-[720px]">
            {/* Month Markers */}
            <div className="flex justify-between text-[10px] font-mono text-stone-400 mb-2 pl-6 pr-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
            <div className="flex items-start gap-2">
              {/* Day Labels */}
              <div className="flex flex-col justify-between h-[84px] text-[9px] font-mono text-stone-400 py-0.5 select-none">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Grid Columns (52 Weeks x 7 Days) */}
              <div
                className="flex-1 grid grid-flow-col grid-rows-7 gap-1"
                style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
              >
                {data.weeks.map((week, wIdx) =>
                  week.map((day, dIdx) => (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      title={`${day.count} contributions on ${day.date}`}
                      className={`w-2.5 h-2.5 rounded-[2px] transition-colors hover:scale-125 ${getCellBg(
                        day.level
                      )}`}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-stone-400 mt-4 pr-1">
              <span>Less</span>
              <span className="w-2.5 h-2.5 rounded-[2px] bg-stone-200/70" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-stone-300" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-stone-400" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-neutral-800" />
              <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500" />
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Commit Stream Log */}
      <div className="bg-[#f2f2f4]/50 border border-[#e5e5e8] rounded-2xl p-6 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs font-semibold text-neutral-900 flex items-center gap-1.5">
              <GitCommit size={14} />
              Recent Public Commits
            </span>
          </div>
          <span className="text-[11px] font-mono text-stone-500">
            Synced with GitHub API
          </span>
        </div>

        <div className="divide-y divide-stone-200/70 text-xs font-mono">
          {data.recentCommits && data.recentCommits.length > 0 ? (
            data.recentCommits.map((commit, idx) => (
              <a
                key={idx}
                href={commit.url}
                target="_blank"
                rel="noreferrer"
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/70 px-2 rounded-lg transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <span className="text-stone-500 bg-stone-200/70 px-1.5 py-0.5 rounded text-[11px] font-mono group-hover:bg-[#121213] group-hover:text-white transition-colors">
                    {commit.sha}
                  </span>
                  <div>
                    <span className="text-neutral-900 font-medium group-hover:underline">
                      {commit.message}
                    </span>
                    <span className="text-stone-400 ml-1.5 text-[11px]">
                      {commit.repo}
                    </span>
                  </div>
                </div>
                <div className="text-stone-400 text-[11px] whitespace-nowrap pl-9 sm:pl-0">
                  {commit.timeAgo}
                </div>
              </a>
            ))
          ) : (
            <div className="py-4 text-center text-stone-500 font-mono text-xs">
              No recent commits found.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
