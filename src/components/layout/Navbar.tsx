"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  navLinks as defaultLinks,
  profile as defaultProfile,
} from "../../data/content";
import ThemeToggle from "../ui/ThemeToggle";

interface NavbarProps {
  labBrand?: string;
  role?: string;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  navLinks?: Array<{ label: string; href: string }>;
}

export default function Navbar({
  labBrand = defaultProfile.labBrand,
  role = defaultProfile.role,
  socials = defaultProfile.socials,
  navLinks = defaultLinks,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter((el): el is HTMLElement => Boolean(el));

      const scrollPos = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${el.id}`);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F4F3EF]/95 backdrop-blur-md border-b border-[#E2E0D8] transition-colors">
      <div className="w-full px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 py-3.5 sm:py-4 flex items-center justify-between font-mono text-[11px] tracking-widest uppercase">
        {/* Left Side: Brandmark Heading & Status Telemetry */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            aria-label="Home"
            href="#hero"
            onClick={() => setMobileOpen(false)}
            className="font-display font-medium text-sm sm:text-base tracking-tight text-[#111111] hover:text-[#2563EB] transition-colors flex items-center gap-2 group"
          >
            <span>{labBrand}</span>
          </a>

          {/* Hairline Divider */}
          <div className="hidden sm:block h-3.5 w-px bg-[#E2E0D8]" />

          {/* Live Status Pill */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#6E6D68] tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block" />
            <span className="font-mono">ONLINE // V2.0</span>
          </div>

          {/* Role pill on widescreen displays */}
          {role && (
            <>
              <div className="hidden 2xl:block h-3.5 w-px bg-[#E2E0D8]" />
              <span className="hidden 2xl:inline text-[10px] text-[#82807A] font-mono tracking-wider">
                {role}
              </span>
            </>
          )}
        </div>

        {/* Right Side: Desktop Nav Items, Theme Toggle & Quick Links */}
        <div className="flex items-center gap-4 lg:gap-6 xl:gap-8">
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] text-[#6E6D68]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors relative py-1 ${
                    isActive
                      ? "text-[#111111] font-semibold"
                      : "hover:text-[#111111]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#111111]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Tools: Sumi Dark Mode Toggle Button */}
          <ThemeToggle />

          {/* External Social Badges */}
          <div className="hidden sm:flex items-center gap-3.5 text-[#6E6D68] text-[10.5px]">
            <div className="h-3.5 w-px bg-[#E2E0D8] hidden lg:block" />
            {socials?.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#111111] transition-colors"
                title="GitHub"
              >
                GH ↗
              </a>
            )}
            {socials?.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline hover:text-[#111111] transition-colors"
                title="LinkedIn"
              >
                IN ↗
              </a>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden text-[#111111] p-1.5 -mr-1.5 focus:outline-none hover:bg-[#EBEAE4] transition-colors rounded-none"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-[#E2E0D8] bg-[#F4F3EF]/98 backdrop-blur-md shadow-lg"
          >
            <div className="px-6 py-6 space-y-5 font-mono text-xs uppercase tracking-widest">
              {/* Quick Utility Row: Theme Toggle */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E0D8]/60">
                <span className="text-[10px] text-[#6E6D68]">THEME // PALETTE</span>
                <ThemeToggle />
              </div>

              {/* Section links */}
              <div className="space-y-1">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between py-3 px-3 transition-colors ${
                        isActive
                          ? "bg-[#111111] text-[#F4F3EF]"
                          : "text-[#444442] hover:text-[#111111] hover:bg-[#EBEAE4]"
                      }`}
                    >
                      <span className="font-medium">{link.label}</span>
                      <span
                        className={`text-[10px] ${
                          isActive ? "text-[#E2E0D8]" : "text-[#82807A]"
                        }`}
                      >
                        0{idx + 1} //
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Status pill in mobile drawer */}
              <div className="pt-2 flex items-center justify-between text-[10.5px] text-[#6E6D68] border-t border-[#E2E0D8]/60">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
                  ONLINE // PRODUCTION RUNTIME
                </span>
                <span className="text-[#82807A]">IST (UTC+5:30)</span>
              </div>

              {/* Mobile Quick Links Footer */}
              <div className="pt-3 border-t border-[#E2E0D8] flex items-center justify-between text-[11px] text-[#6E6D68]">
                <div className="flex items-center gap-4">
                  {socials?.github && (
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#111111] transition-colors"
                    >
                      GITHUB ↗
                    </a>
                  )}
                  {socials?.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#111111] transition-colors"
                    >
                      LINKEDIN ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
