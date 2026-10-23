"use client";

import IndustrialHeader from "./IndustrialHeader";
import IndustrialHero from "./IndustrialHero";
import IndustrialFocus from "./IndustrialFocus";
import IndustrialProjects from "./IndustrialProjects";
import IndustrialDossier from "./IndustrialDossier";
import IndustrialExperience from "./IndustrialExperience";
import IndustrialGithub from "./IndustrialGithub";
import IndustrialSkills from "./IndustrialSkills";
import IndustrialFooter from "./IndustrialFooter";
import StickySpotifyPlayer from "@/components/ui/StickySpotifyPlayer";
import type { IPortfolioData } from "@/models/Portfolio";
import type { FormattedGithubData } from "@/lib/github";

export default function IndustrialTheme({
  portfolio,
  githubData,
}: {
  portfolio: IPortfolioData;
  githubData: FormattedGithubData;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[#E6E5DE] text-[#1C1B1A] font-sans antialiased selection:bg-[#FF4F00] selection:text-white justify-between overflow-x-hidden">
      {/* Precision Industrial Header */}
      <IndustrialHeader profile={portfolio.profile} />

      {/* Main Flow Content */}
      <main className="flex-grow flex flex-col">
        {/* OP-1 Style Parametric Synthesizer Hero */}
        <IndustrialHero profile={portfolio.profile} />

        {/* Specification Modules */}
        <IndustrialFocus items={portfolio.architecturalFocus} />

        {/* Modular Hardware & Systems Grid */}
        <IndustrialProjects projects={portfolio.projects} />

        {/* Flagship Silicon Dossier */}
        <IndustrialDossier dossier={portfolio.flagshipDossier} />

        {/* Service Record Ledger */}
        <IndustrialExperience experience={portfolio.experience} />

        {/* 52-Week Phosphor LED Grid & Telemetry Tape */}
        <IndustrialGithub data={githubData} />

        {/* Eurorack Patch Bay Stack */}
        <IndustrialSkills skills={portfolio.skillMatrix} />
      </main>

      {/* Footer Stamped Colophon */}
      <IndustrialFooter profile={portfolio.profile} />

      {/* Sticky Spotify Player */}
      {portfolio.profile?.showSpotifyPlayer !== false && <StickySpotifyPlayer />}
    </div>
  );
}
