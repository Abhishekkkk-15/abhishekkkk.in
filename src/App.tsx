import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Focus from "./components/sections/Focus";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import ProjectDossier from "./components/sections/ProjectDossier";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

export default function App() {
  return (
    <div className="w-full max-w-7xl mx-auto min-h-screen flex flex-col bg-[#faf9f5] border-x border-[#e2e0d8] relative shadow-sm">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Hero />
        <Focus />
        <Experience />
        <Projects />
        <ProjectDossier />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
