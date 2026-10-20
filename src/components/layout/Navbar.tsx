import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "../../data/content";

export default function Navbar() {
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
        if (el.offsetTop <= scrollPos) {
          setActiveSection(`#${el.id}`);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/95 backdrop-blur-sm border-b border-[#e2e0d8] px-6 sm:px-8 py-4 transition-colors">
      <div className="flex items-center justify-between font-mono text-[11px] tracking-widest uppercase">
        <a
          aria-label={`${profile.name} Home`}
          href="#hero"
          className="font-display font-medium text-sm tracking-tight text-[#111111] hover:text-[#0051d5] transition-colors flex items-center gap-2"
        >
          {profile.labBrand}
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] text-[#555452]">
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
        <div className="md:hidden border-t border-[#e2e0d8] mt-4 pt-4 pb-2 flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-[#555452]">
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
