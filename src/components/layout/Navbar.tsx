"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navLinks as defaultLinks, profile as defaultProfile } from "../../data/content";

interface NavbarProps {
  labBrand?: string;
  navLinks?: Array<{ label: string; href: string }>;
}

export default function Navbar({
  labBrand = defaultProfile.labBrand,
  navLinks = defaultLinks,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .map((link) => document.querySelector(link.href))
        .filter((el): el is HTMLElement => Boolean(el));

      const scrollPos = window.scrollY + 120;
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

  return (
    <header className="sticky top-0 z-40 bg-[#F4F3EF]/95 backdrop-blur-sm border-b border-[#E2E0D8] px-6 sm:px-8 py-4 transition-colors">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest uppercase">
        <a
          aria-label="Home"
          href="#hero"
          className="font-display font-medium text-sm tracking-tight text-[#111111] hover:text-[#2563EB] transition-colors flex items-center gap-2"
        >
          {labBrand}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] text-[#6E6D68]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                activeSection === link.href
                  ? "text-[#111111] font-semibold border-b border-[#111111] pb-0.5"
                  : "hover:text-[#111111]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden text-[#111111] p-1 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E2E0D8] mt-4 pt-4 pb-2 flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-[#6E6D68] bg-[#F4F3EF]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-1 hover:text-[#111111] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
