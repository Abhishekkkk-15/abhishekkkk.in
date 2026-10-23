"use client";

import { useState, useEffect } from "react";
import type { IProfile } from "@/models/Portfolio";
import { hardwareSound } from "./hardwareSound";
import { Volume2, VolumeX, ArrowUpRight, Menu, X } from "lucide-react";

export default function IndustrialHeader({ profile }: { profile: IProfile }) {
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundActive(hardwareSound.isEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = hardwareSound.toggleSound();
    setSoundActive(next);
  };

  const handleClickNav = () => {
    hardwareSound.playMechanicalClick(950, 0.02, "high");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#E5E4DD] border-b-2 border-[#CAC8BD] shadow-[0_2px_10px_rgba(0,0,0,0.06)] select-none">
      {/* Aluminum Top Edge Highlight */}
      <div className="h-[2px] w-full bg-white/70" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Machine Unit Emblem & Model Stamping */}
        <div className="flex items-center gap-3">
          {/* Mechanical Fastener Screw */}
          <div className="w-3.5 h-3.5 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] shadow-inner flex items-center justify-center text-[9px] text-[#78766C] font-mono font-bold leading-none select-none">
            +
          </div>

          <a
            href="#"
            onClick={() => hardwareSound.playMechanicalClick(1100, 0.025, "high")}
            className="flex items-center gap-2.5 group"
          >
            {/* Pocket Operator Style Power Pill */}
            <div className="px-2 py-0.5 bg-[#1C1B1A] text-[#FF4F00] font-mono text-[10px] font-bold tracking-widest rounded-[3px] border border-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F00] animate-pulse" />
              <span>OP-SYS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-wider text-[#1C1B1A] uppercase font-mono">
                {profile.name}
              </span>
              <span className="text-[9.5px] font-mono text-[#78766C] tracking-tight">
                SERIES-01 // FIELD INSTRUMENT
              </span>
            </div>
          </a>
        </div>

        {/* Center Precision Pushbuttons Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#DAD8CE] p-1 rounded-[5px] border border-[#BCBAAD] shadow-inner">
          {[
            { label: "01/FOCUS", href: "#focus" },
            { label: "02/SYSTEMS", href: "#projects" },
            { label: "03/DOSSIER", href: "#dossier" },
            { label: "04/EXPERIENCE", href: "#experience" },
            { label: "05/TELEMETRY", href: "#github" },
            { label: "06/STACK", href: "#skills" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleClickNav}
              className="px-2.5 py-1 text-[11px] font-mono font-semibold text-[#4A4840] hover:text-[#1C1B1A] hover:bg-white/80 active:translate-y-[1px] rounded-[3px] transition-all tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Hardware Control Deck */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mechanical Sound Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundActive ? "Mechanical Audio Feedback: Active" : "Enable Tactile Mechanical Click Audio"}
            className={`px-2.5 py-1 rounded-[4px] border font-mono text-[10.5px] font-semibold flex items-center gap-1.5 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.1)] active:scale-95 ${
              soundActive
                ? "bg-[#FF4F00] text-white border-[#D63E00] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                : "bg-[#E0DED5] text-[#5A584F] border-[#BDBBAE] hover:bg-[#D5D3C9]"
            }`}
          >
            {soundActive ? <Volume2 size={13} /> : <VolumeX size={13} />}
            <span className="hidden sm:inline">
              {soundActive ? "SFX // ON" : "SFX // OFF"}
            </span>
          </button>

          {/* GitHub Out Jack Link */}
          {profile.socials?.github && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => hardwareSound.playMechanicalClick(1200, 0.02, "high")}
              className="px-2.5 py-1 bg-[#1C1B1A] hover:bg-black text-[#F4F3EF] border border-black rounded-[4px] font-mono text-[11px] font-semibold flex items-center gap-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] active:translate-y-[1px]"
            >
              <span>OUT // GH</span>
              <ArrowUpRight size={12} className="text-[#FF4F00]" />
            </a>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => {
              hardwareSound.playMechanicalClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-1.5 rounded-[4px] bg-[#D7D5CB] border border-[#BCBAAD] text-[#1C1B1A]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Fastener Screw */}
          <div className="w-3.5 h-3.5 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] shadow-inner flex items-center justify-center text-[9px] text-[#78766C] font-mono font-bold leading-none select-none">
            +
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#E2E1D8] border-b-2 border-[#BCBAAD] px-5 py-4 space-y-2 font-mono text-xs">
          {[
            { label: "01/FOCUS // ARCHITECTURES", href: "#focus" },
            { label: "02/SYSTEMS // FEATURED WORK", href: "#projects" },
            { label: "03/DOSSIER // FLAGSHIP SPEC", href: "#dossier" },
            { label: "04/EXPERIENCE // TRACK RECORD", href: "#experience" },
            { label: "05/TELEMETRY // COMMIT STREAM", href: "#github" },
            { label: "06/STACK // HARDWARE MATRIX", href: "#skills" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleClickNav}
              className="block p-2 rounded bg-[#D6D4C8] text-[#1C1B1A] font-semibold border border-[#BCBAAD]"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
