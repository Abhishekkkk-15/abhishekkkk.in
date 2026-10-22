"use client";

import { useState } from "react";
import type { IProfile } from "@/models/Portfolio";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function PlayerZeroHeader({ profile }: { profile: IProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#f8f8f9]/85 backdrop-blur-md sticky top-0 z-50 border-b border-[#e5e5e8]/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          aria-label={`${profile.name} Portfolio Home`}
        >
          {/* AI Core Geometric Emblem */}
          <div className="w-7 h-7 bg-[#121213] rounded-lg flex items-center justify-center p-1 transition-transform group-hover:scale-95 duration-200">
            <svg className="w-full h-full text-white fill-current" viewBox="0 0 24 24">
              <path d="M7 2h4v5H7V2zm6 0h4v5h-4V2zM2 7h5v4H2V7zm15 0h5v4h-5V7zM7 17h4v5H7v-5zm6 0h4v5h-4v-5zm-11-4h5v4H2v-4zm15 0h5v4h-5v-4z" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-tight text-neutral-900 hidden sm:inline-block">
            {profile.name}
          </span>
          <span className="text-xs uppercase tracking-widest text-stone-400 font-mono hidden md:inline-block">
            / {profile.labBrand || "Applied AI"}
          </span>
        </a>

        {/* Center Navigation Links */}
        <nav
          aria-label="Navigation Menu"
          className="hidden md:flex items-center space-x-7 text-xs font-medium text-stone-600 tracking-wide font-sans"
        >
          <a className="hover:text-black transition-colors duration-150" href="#projects">
            Projects
          </a>
          <a className="hover:text-black transition-colors duration-150" href="#experience">
            Experience
          </a>
          <a className="hover:text-black transition-colors duration-150" href="#commits">
            Commit History
          </a>
          <a className="hover:text-black transition-colors duration-150" href="#architecture">
            Architecture
          </a>
          <a className="hover:text-black transition-colors duration-150" href="#benchmarks">
            Benchmarks
          </a>
          <a className="hover:text-black transition-colors duration-150" href="#about">
            Stack
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {profile.socials?.github && (
            <a
              className="text-xs font-mono text-stone-600 hover:text-neutral-950 px-2 py-1 transition-colors hidden sm:inline-flex items-center gap-1"
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight size={12} />
            </a>
          )}
          <a
            className="inline-flex items-center gap-2 bg-[#121213] hover:bg-neutral-800 text-white text-xs font-medium px-4 py-2 rounded-full transition-all duration-200 shadow-sm active:scale-95"
            href={`mailto:${profile.email}`}
          >
            <span>Get in Touch</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-stone-700 hover:text-black"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f8f8f9] border-b border-[#e5e5e8] px-6 py-4 space-y-3 font-mono text-xs">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-700 hover:text-black py-1"
          >
            // 01 Projects
          </a>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-700 hover:text-black py-1"
          >
            // 02 Experience
          </a>
          <a
            href="#commits"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-700 hover:text-black py-1"
          >
            // 03 Commit History
          </a>
          <a
            href="#architecture"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-700 hover:text-black py-1"
          >
            // 04 Architecture
          </a>
          <a
            href="#benchmarks"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-700 hover:text-black py-1"
          >
            // 05 Benchmarks
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-700 hover:text-black py-1"
          >
            // 06 Stack
          </a>
        </div>
      )}
    </header>
  );
}
