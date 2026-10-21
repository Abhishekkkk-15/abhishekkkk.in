"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({
  className = "",
  showLabel = true,
}: {
  className?: string;
  showLabel?: boolean;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Prevent layout shift during SSR hydration
  if (!mounted) {
    return (
      <div
        className={`h-7 w-16 border border-[#E2E0D8] bg-[#EBEAE4]/40 animate-pulse ${className}`}
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={
        theme === "dark"
          ? "Switch to Paper Light mode"
          : "Switch to Sumi Dark mode"
      }
      aria-label="Toggle Sumi Dark Mode"
      className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[#E2E0D8] hover:border-[#111111] transition-all flex items-center gap-1.5 bg-[#EBEAE4]/40 hover:bg-[#EBEAE4] text-[#111111] select-none rounded-none cursor-pointer ${className}`}
    >
      {theme === "dark" ? (
        <>
          <Sun size={12} className="text-[#F4F3EF]" />
          {showLabel && <span>LIGHT</span>}
        </>
      ) : (
        <>
          <Moon size={12} className="text-[#111111]" />
          {showLabel && <span>SUMI</span>}
        </>
      )}
    </button>
  );
}
