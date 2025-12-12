import React from "react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-xl border-b border-emerald-500/10 py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => scrollToSection("hero")}
          className="relative group text-2xl font-light tracking-wider text-neutral-100 hover:text-emerald-400 transition-all duration-300">
          Abhishek<span className="text-emerald-400">.in</span>
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent group-hover:w-full transition-all duration-500" />
        </button>

        <div className="hidden md:flex gap-10">
          {["about", "work", "skills", "contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="relative text-xs uppercase tracking-[0.15em] text-neutral-400 hover:text-emerald-400 transition-colors duration-300 group">
              {item}
              <div className="absolute -bottom-1.5 left-0 w-0 h-px bg-emerald-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neutral-100 hover:text-emerald-400 transition-colors">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-neutral-950/95 backdrop-blur-xl border-t border-emerald-500/10 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-6 p-6">
            {["about", "work", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left text-xs uppercase tracking-[0.15em] text-neutral-400 hover:text-emerald-400 transition-colors duration-300">
                {item}
              </button>
            ))}
            <a
              href="https://abhishek.in"
              onClick={() => setIsOpen(false)}
              className="text-left text-xs uppercase tracking-[0.15em] text-neutral-400 hover:text-emerald-400 transition-colors duration-300">
              Visit Portfolio
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
