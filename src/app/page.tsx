import { getPortfolioData, ensureInitialAdminUser } from "../lib/portfolioService";
import { getGitHubActivity } from "../lib/github";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Focus from "../components/sections/Focus";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import ProjectDossier from "../components/sections/ProjectDossier";
import GithubActivity from "../components/sections/GithubActivity";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import StickySpotifyPlayer from "../components/ui/StickySpotifyPlayer";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureInitialAdminUser();
  const portfolio = await getPortfolioData();
  const githubData = await getGitHubActivity(
    portfolio.profile?.socials?.github,
    portfolio.githubActivity
  );

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F4F3EF] relative">
      {/* Full-width sticky top navbar */}
      <Navbar
        labBrand={portfolio.profile?.labBrand}
        role={portfolio.profile?.role}
        socials={portfolio.profile?.socials}
      />

      {/* Main architectural container with responsive boundary borders */}
      <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1536px] mx-auto flex-grow flex flex-col bg-[#F4F3EF] border-x border-[#E2E0D8] relative shadow-sm">
        <main className="flex-grow flex flex-col">
          <Hero profile={portfolio.profile} />
          <Focus items={portfolio.architecturalFocus} />
          <Experience items={portfolio.experience} />
          <Projects items={portfolio.projects} />
          <ProjectDossier dossier={portfolio.flagshipDossier} />
          <GithubActivity data={githubData} />
          <Skills skills={portfolio.skillMatrix} />
          <Contact contactInfo={portfolio.contactInfo} profile={portfolio.profile} />
        </main>
      </div>

      {/* Sticky Bottom-Right Spotify Live Audio Player */}
      <StickySpotifyPlayer />
    </div>
  );
}
