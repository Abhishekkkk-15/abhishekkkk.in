import PlayerZeroHeader from "./PlayerZeroHeader";
import PlayerZeroHero from "./PlayerZeroHero";
import PlayerZeroBenchmarks from "./PlayerZeroBenchmarks";
import PlayerZeroArchitecture from "./PlayerZeroArchitecture";
import PlayerZeroProjects from "./PlayerZeroProjects";
import PlayerZeroExperience from "./PlayerZeroExperience";
import PlayerZeroGithub from "./PlayerZeroGithub";
import PlayerZeroStack from "./PlayerZeroStack";
import PlayerZeroFooter from "./PlayerZeroFooter";
import StickySpotifyPlayer from "@/components/ui/StickySpotifyPlayer";
import type { IPortfolioData } from "@/models/Portfolio";
import type { FormattedGithubData } from "@/lib/github";

export default function PlayerZeroTheme({
  portfolio,
  githubData,
}: {
  portfolio: IPortfolioData;
  githubData: FormattedGithubData;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f8f8f9] text-stone-900 font-sans antialiased selection:bg-stone-900 selection:text-white justify-between overflow-x-hidden">
      {/* Sticky Header */}
      <PlayerZeroHeader profile={portfolio.profile} />

      {/* Main Flow Content */}
      <main className="flex-grow flex flex-col">
        {/* Animated DAG Flowchart Hero */}
        <PlayerZeroHero
          profile={portfolio.profile}
          skills={portfolio.skillMatrix}
        />

        {/* 3-Column Benchmarks & Impact */}
        <PlayerZeroBenchmarks profile={portfolio.profile} />

        {/* Flagship System Deep-Dive + Interactive Latent Point Cloud Canvas */}
        <PlayerZeroArchitecture dossier={portfolio.flagshipDossier} />

        {/* Featured Production AI Systems Grid */}
        <PlayerZeroProjects projects={portfolio.projects} />

        {/* Career Track Record Timeline */}
        <PlayerZeroExperience experience={portfolio.experience} />

        {/* 52-Week Dot-Matrix Heatmap & Live Commit Stream */}
        <PlayerZeroGithub data={githubData} />

        {/* Stack & Tools Matrix */}
        <PlayerZeroStack skills={portfolio.skillMatrix} />
      </main>

      {/* Footer */}
      <PlayerZeroFooter profile={portfolio.profile} />

      {/* Sticky Spotify Player */}
      {portfolio.profile?.showSpotifyPlayer !== false && <StickySpotifyPlayer />}
    </div>
  );
}
