"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = saved === "dark" || (!saved && prefersDark);
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (e?: React.MouseEvent) => {
    const next = !isDark;

    const applyTheme = () => {
      setIsDark(next);
      localStorage.setItem("theme", next ? "dark" : "light");
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    if (
      typeof document !== "undefined" &&
      "startViewTransition" in document &&
      e
    ) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      document.documentElement.style.setProperty("--reveal-x", `${x}px`);
      document.documentElement.style.setProperty("--reveal-y", `${y}px`);
      document.documentElement.style.setProperty("--reveal-radius", `${endRadius}px`);

      (document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        applyTheme();
      });
    } else {
      applyTheme();
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] text-[#1a1c1c] dark:text-[#f0f0f2] font-sans antialiased selection:bg-[#1a1c1c] selection:text-[#f9f9f9] dark:selection:bg-[#f0f0f2] dark:selection:text-[#0d0d0e] transition-colors duration-200 flex flex-col justify-between">
      {/* Minimal Header */}
      <header className="w-full bg-[#f9f9f9]/85 dark:bg-[#0d0d0e]/85 backdrop-blur-xl">
        <div className="max-w-[680px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs font-medium tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2] lowercase hover:text-black dark:hover:text-white transition-colors"
          >
            abhishek
          </Link>

          <button
            type="button"
            onClick={(e) => toggleTheme(e)}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f0f2] hover:bg-[#f3f3f4] dark:hover:bg-[#1e1e22] transition-all cursor-pointer overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ opacity: 0, rotate: -40, scale: 0.75 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 40, scale: 0.75 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                {mounted && isDark ? (
                  <Sun size={15} className="text-[#f0f0f2]" />
                ) : (
                  <Moon size={15} className="text-[#1a1c1c]" />
                )}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[680px] w-full mx-auto px-6 py-16 flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-start">
          <div className="font-mono text-xs text-[#737373] dark:text-[#8e8e93] tracking-widest uppercase mb-3">
            404 // ROUTE_NOT_FOUND
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2] mb-4">
            the requested coordinates do not exist.
          </h1>

          <p className="font-serif text-[15px] sm:text-base leading-relaxed text-[#737373] dark:text-[#8e8e93] max-w-[540px] mb-8">
            you seem to have ventured outside the documented system boundary.
            the page or resource you are looking for has been relocated, archived,
            or never committed to this branch.
          </p>

          <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a1c1c] text-[#f9f9f9] dark:bg-[#f0f0f2] dark:text-[#0d0d0e] font-medium hover:opacity-90 transition-opacity"
            >
              <ArrowLeft size={13} />
              return to home
            </Link>

            <Link
              href="/#projects"
              className="text-[#737373] dark:text-[#8e8e93] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors underline underline-offset-4 decoration-[#E5E5E5] dark:decoration-[#26262a]"
            >
              explore architecture dossiers ↗
            </Link>

            <a
              href="mailto:abhishekjangid3489@gmail.com"
              className="text-[#737373] dark:text-[#8e8e93] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors underline underline-offset-4 decoration-[#E5E5E5] dark:decoration-[#26262a]"
            >
              contact / dispatch
            </a>
          </div>
        </div>
      </main>

      {/* Footer System Line */}
      <footer className="w-full border-t border-[#E5E5E5]/60 dark:border-[#26262a]/60 py-6">
        <div className="max-w-[680px] mx-auto px-6 flex items-center justify-between font-mono text-[11px] text-[#737373] dark:text-[#8e8e93]">
          <span>STATUS: 404_PAGE_NOT_FOUND</span>
          <span>NODE: EDGE_ROUTER</span>
        </div>
      </footer>
    </div>
  );
}
