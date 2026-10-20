import { FormattedGithubData } from "@/lib/github";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";

interface GithubActivityProps {
  data: FormattedGithubData;
}

const levelColors = [
  "bg-[#EBEAE4]", // 0: baseline paper gray
  "bg-[#C4C2BA]", // 1: subtle ink
  "bg-[#82807A]", // 2: mid graphite
  "bg-[#403F3C]", // 3: dark charcoal
  "bg-[#111111]", // 4: deep sumi black
];

export default function GithubActivity({ data }: GithubActivityProps) {
  return (
    <section
      className="border-b border-[#E2E0D8] bg-[#F4F3EF]"
      data-purpose="open-source-activity"
      id="activity"
    >
      {/* Header bar */}
      <div className="px-6 sm:px-8 py-5 border-b border-[#E2E0D8] flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6E6D68]">04.2 //</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            OPEN SOURCE ACTIVITY // GITHUB
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#6E6D68] uppercase tracking-wider">
          COMMITS &amp; REPOSITORIES
        </span>
      </div>

      <div className="p-8 md:p-14 lg:p-16 space-y-12">
        <Reveal>
          {/* Organization & Repositories Header */}
          <div className="space-y-2">
            <div className="font-mono text-xs uppercase tracking-widest text-[#6E6D68]">
              ORGANIZATION &amp; REPOSITORIES
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pt-1">
              <div className="flex items-baseline gap-4 flex-wrap">
                <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#111111] tracking-tight">
                  @{data.username}
                </h2>
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#2563EB]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
                  <span>{data.status}</span>
                </div>
              </div>

              <div className="font-mono text-xs text-[#111111] flex items-center gap-3 flex-wrap">
                <span>
                  <strong className="font-medium text-[#111111]">
                    {data.publicRepos}
                  </strong>{" "}
                  <span className="text-[#6E6D68]">REPOSITORIES</span>
                </span>
                <span className="text-[#E2E0D8]">|</span>
                <span>
                  <strong className="font-medium text-[#111111]">
                    {data.totalContributions}
                  </strong>{" "}
                  <span className="text-[#6E6D68]">
                    CONTRIBUTIONS ({data.currentYear})
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* 52-Week Commit Density Bar Header */}
          <div className="pt-8">
            <div className="flex items-center justify-between font-mono text-xs text-[#6E6D68] mb-3 uppercase tracking-wider">
              <span>52-WEEK COMMIT DENSITY // JAN — DEC {data.currentYear}</span>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>LESS</span>
                <span className="w-2.5 h-2.5 bg-[#EBEAE4] inline-block border border-[#E2E0D8]"></span>
                <span className="w-2.5 h-2.5 bg-[#C4C2BA] inline-block"></span>
                <span className="w-2.5 h-2.5 bg-[#82807A] inline-block"></span>
                <span className="w-2.5 h-2.5 bg-[#111111] inline-block"></span>
                <span>MORE</span>
              </div>
            </div>

            {/* 52-Week Grid Heatmap (52 columns x 7 rows) */}
            <div className="overflow-x-auto pb-2 pt-1 border border-[#E2E0D8] bg-[#F4F3EF] p-4">
              <div className="grid grid-rows-7 grid-flow-col gap-[3px] min-w-[720px] justify-between">
                {data.weeks.map((week, wIdx) =>
                  week.map((day, dIdx) => (
                    <div
                      key={`${wIdx}-${dIdx}`}
                      title={`${day.count} contributions on ${day.date}`}
                      className={`w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] transition-colors hover:scale-125 hover:z-10 cursor-pointer ${
                        levelColors[Math.min(day.level, 4)] || levelColors[0]
                      }`}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Metrics Strip (5 Columns) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 pt-10 border-t border-[#E2E0D8] font-mono">
            {/* Metric 1: Commits */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#6E6D68] tracking-wider">
                COMMITS
              </div>
              <div className="text-2xl sm:text-3xl font-display text-[#111111] font-normal">
                {data.commitsCount}
              </div>
              <div className="text-xs text-[#6E6D68] pt-0.5">
                in {data.currentYear}
              </div>
            </div>

            {/* Metric 2: PRs Merged */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#6E6D68] tracking-wider">
                PRS MERGED
              </div>
              <div className="text-2xl sm:text-3xl font-display text-[#111111] font-normal">
                {data.prsMerged}
              </div>
              <div className="text-xs text-[#6E6D68] pt-0.5">
                open source &amp; core
              </div>
            </div>

            {/* Metric 3: Code Reviews */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#6E6D68] tracking-wider">
                CODE REVIEWS
              </div>
              <div className="text-2xl sm:text-3xl font-display text-[#111111] font-normal">
                {data.codeReviews}
              </div>
              <div className="text-xs text-[#6E6D68] pt-0.5">
                audits &amp; verify
              </div>
            </div>

            {/* Metric 4: Stars Accumulated */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#6E6D68] tracking-wider">
                STARS ACCUMULATED
              </div>
              <div className="text-2xl sm:text-3xl font-display text-[#111111] font-normal">
                {data.starsAccumulated}
              </div>
              <div className="text-xs text-[#6E6D68] pt-0.5">
                across {data.publicRepos} public repos
              </div>
            </div>

            {/* Metric 5: Top Languages */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase text-[#6E6D68] tracking-wider">
                TOP LANGUAGES
              </div>
              <div className="text-xs text-[#111111] pt-1 space-y-0.5 font-mono">
                {data.topLanguages.map((lang, lIdx) => (
                  <div key={lIdx} className="truncate">
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action Link */}
          <div className="pt-8">
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-[#111111] hover:text-[#2563EB] underline underline-offset-4 decoration-[#D8D6CE] transition-colors"
            >
              View full activity on {data.url.replace(/^https?:\/\//, "")} ↗
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
