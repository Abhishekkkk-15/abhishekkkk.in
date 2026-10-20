import { getPortfolioData, ensureInitialAdminUser } from "../lib/portfolioService";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import Focus from "../components/sections/Focus";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import ProjectDossier from "../components/sections/ProjectDossier";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureInitialAdminUser();
  const portfolio = await getPortfolioData();

  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col bg-[#F4F3EF] border-x border-[#E2E0D8] relative shadow-sm">
      <Navbar labBrand={portfolio.profile?.labBrand} />
      <main className="flex-grow flex flex-col">
        <Hero profile={portfolio.profile} />
        <Focus items={portfolio.architecturalFocus} />
        <Experience items={portfolio.experience} />
        <Projects items={portfolio.projects} />
        <ProjectDossier dossier={portfolio.flagshipDossier} />
        <Skills skills={portfolio.skillMatrix} />
        <Contact contactInfo={portfolio.contactInfo} profile={portfolio.profile} />
      </main>
    </div>
  );
}
