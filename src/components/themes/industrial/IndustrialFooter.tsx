"use client";

import type { IProfile } from "@/models/Portfolio";
import { hardwareSound } from "./hardwareSound";
import { ArrowUp, Mail, Linkedin, Github } from "lucide-react";

export default function IndustrialFooter({ profile }: { profile: IProfile }) {
  const scrollToTop = () => {
    hardwareSound.playMechanicalClick(1400, 0.03, "high");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#DCD9CE] border-t-2 border-[#CAC8BD] pt-12 pb-14 px-4 sm:px-6 select-none mt-16 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Safety Caution Striping Bar */}
        <div className="w-full h-3 rounded-[2px] border border-[#BCBAAD] overflow-hidden"
          style={{
            backgroundImage: "repeating-linear-gradient(-45deg, #1C1B1A, #1C1B1A 10px, #FFD000 10px, #FFD000 20px)",
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Machine Spec Plate (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-[#B5B3A6] bg-[#CFCBC0] flex items-center justify-center text-[8px] text-[#78766C] font-mono font-bold">+</span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1C1B1A]">
                {profile.name} // FIELD SYSTEM LAB
              </span>
            </div>
            <p className="text-xs font-sans text-[#5A584F] max-w-md leading-relaxed">
              Designed &amp; engineered for autonomous agent intelligence, distributed inference topology, and deterministic software reliability.
            </p>
            <div className="font-mono text-[10.5px] text-[#78766C] space-y-0.5">
              <div>SERIAL: ENG-2026-AI-INSTRUMENT</div>
              <div>ORIGIN: TOKYO // NEW DELHI // SAN FRANCISCO</div>
            </div>
          </div>

          {/* Connect Links (4 cols) */}
          <div className="md:col-span-4 space-y-2 font-mono text-xs">
            <span className="text-[10px] uppercase font-bold text-[#78766C] block mb-2">
              EXTERNAL SIGNAL TERMINALS
            </span>
            <div className="flex flex-wrap gap-2">
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  onClick={() => hardwareSound.playMechanicalClick(1100, 0.02, "high")}
                  className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#F3F2EC] text-[#1C1B1A] rounded-[4px] border border-[#BCBAAD] flex items-center gap-1.5 font-semibold active:translate-y-[1px]"
                >
                  <Mail size={12} className="text-[#FF4F00]" />
                  <span>MAIL</span>
                </a>
              )}
              {profile.socials?.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => hardwareSound.playMechanicalClick(1100, 0.02, "high")}
                  className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#F3F2EC] text-[#1C1B1A] rounded-[4px] border border-[#BCBAAD] flex items-center gap-1.5 font-semibold active:translate-y-[1px]"
                >
                  <Github size={12} className="text-[#FF4F00]" />
                  <span>GITHUB</span>
                </a>
              )}
              {profile.socials?.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => hardwareSound.playMechanicalClick(1100, 0.02, "high")}
                  className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#F3F2EC] text-[#1C1B1A] rounded-[4px] border border-[#BCBAAD] flex items-center gap-1.5 font-semibold active:translate-y-[1px]"
                >
                  <Linkedin size={12} className="text-[#FF4F00]" />
                  <span>LINKEDIN</span>
                </a>
              )}
            </div>
          </div>

          {/* Back to Top Mechanical Pushbutton (2 cols) */}
          <div className="md:col-span-2 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="px-4 py-2.5 bg-[#FF4F00] hover:bg-[#E54500] text-white rounded-[6px] font-mono text-xs font-bold tracking-wider uppercase border border-[#B83700] shadow-[0_3px_0_#A83200,0_5px_8px_rgba(0,0,0,0.15)] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2"
            >
              <span>TOP</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
