"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, Check, X } from "lucide-react";

const THEMES = [
  { id: "terminal", label: "01 TERMINAL", short: "TERM" },
  { id: "playerzero", label: "02 MATRIX", short: "MATR" },
  { id: "industrial", label: "03 INDUSTRIAL", short: "IND" },
  { id: "minimal", label: "04 MINIMAL", short: "MIN" },
] as const;

export default function FloatingThemeSwitcher({ currentTheme }: { currentTheme: string }) {
  const router = useRouter();
  const [active, setActive] = useState(currentTheme);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("active_theme");
    if (saved && saved !== active) {
      setActive(saved);
    }
  }, [active]);

  const switchTheme = async (themeId: string) => {
    if (themeId === active) return;
    setActive(themeId);
    localStorage.setItem("active_theme", themeId);
    document.cookie = `active_theme=${themeId}; path=/; max-age=31536000; SameSite=Lax`;

    try {
      await fetch("/api/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: themeId }),
      });
    } catch {
      // Fallback to client-side cookie
    }

    router.refresh();
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none font-mono">
      <AnimatePresence>
        {isExpanded ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="bg-[#F4F3EF]/95 dark:bg-[#18181b]/95 backdrop-blur-md border border-[#E2E0D8] dark:border-[#26262a] rounded-2xl p-2 shadow-xl flex flex-col gap-1 min-w-[200px]"
          >
            <div className="flex items-center justify-between px-2.5 py-1 border-b border-[#E2E0D8]/70 dark:border-[#26262a]/70 mb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#6E6D68] dark:text-[#9e9ea6]">
                Theme Selector
              </span>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-[#6E6D68] hover:text-[#111111] dark:hover:text-white p-0.5 rounded cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>

            {THEMES.map((t) => {
              const isSelected = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => switchTheme(t.id)}
                  className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#111111] text-[#F4F3EF] dark:bg-[#f0f0f2] dark:text-[#0d0d0e] font-semibold shadow-xs"
                      : "text-[#6E6D68] dark:text-[#9e9ea6] hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#111111] dark:hover:text-[#f0f0f2]"
                  }`}
                >
                  <span>{t.label}</span>
                  {isSelected && <Check size={12} className="stroke-[2.5]" />}
                </button>
              );
            })}
          </motion.div>
        ) : (
          <motion.button
            type="button"
            onClick={() => setIsExpanded(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F4F3EF]/90 dark:bg-[#18181b]/90 backdrop-blur-md border border-[#E2E0D8] dark:border-[#26262a] text-[#111111] dark:text-[#f0f0f2] shadow-md hover:shadow-lg transition-all text-xs tracking-wider uppercase cursor-pointer"
            title="Switch Portfolio Theme"
          >
            <SlidersHorizontal size={13} className="text-[#2563EB] dark:text-[#60A5FA]" />
            <span className="font-medium text-[11px]">
              {THEMES.find((t) => t.id === active)?.short || "THEME"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
