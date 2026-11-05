"use client";

import { useEffect, useState } from "react";
import TerminalLoading from "@/components/loading/TerminalLoading";
import PlayerZeroLoading from "@/components/loading/PlayerZeroLoading";
import IndustrialLoading from "@/components/loading/IndustrialLoading";

export default function Loading() {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const match = document.cookie.match(/active_theme=([^;]+)/);
      if (match?.[1]) return match[1];
      const stored = localStorage.getItem("active_theme");
      if (stored) return stored;
    }
    return "playerzero";
  });

  const [topHeadline, setTopHeadline] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("matrix_top_headline") || "BUILD. TRAIN.";
    }
    return "BUILD. TRAIN.";
  });

  const [bottomHeadline, setBottomHeadline] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("matrix_bottom_headline") || "DEPLOY. SCALE.";
    }
    return "DEPLOY. SCALE.";
  });

  useEffect(() => {
    // Quickly verify with backend theme endpoint if not set or changed
    fetch("/api/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data.activeTheme && data.activeTheme !== theme) {
          setTheme(data.activeTheme);
          localStorage.setItem("active_theme", data.activeTheme);
          document.cookie = `active_theme=${data.activeTheme}; path=/; max-age=31536000; SameSite=Lax`;
        }
        if (data.matrixTopHeadline) {
          setTopHeadline(data.matrixTopHeadline);
          localStorage.setItem("matrix_top_headline", data.matrixTopHeadline);
        }
        if (data.matrixBottomHeadline) {
          setBottomHeadline(data.matrixBottomHeadline);
          localStorage.setItem("matrix_bottom_headline", data.matrixBottomHeadline);
        }
      })
      .catch(() => {});
  }, [theme]);

  if (theme === "terminal") {
    return <TerminalLoading />;
  }

  if (theme === "industrial") {
    return <IndustrialLoading />;
  }

  if (theme === "minimal") {
    return (
      <div className="w-full min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] flex flex-col items-center justify-center p-6 select-none font-mono text-xs">
        <div className="max-w-[680px] w-full flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#5e5e5e] dark:text-[#9e9ea6]">abhishek.in // reading 680px buffer...</span>
          </div>
          <div className="w-48 h-[1.5px] bg-[#E5E5E5] dark:bg-[#26262a] overflow-hidden">
            <div className="w-1/2 h-full bg-[#1a1c1c] dark:bg-[#f0f0f2] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <PlayerZeroLoading
      topHeadline={topHeadline}
      bottomHeadline={bottomHeadline}
    />
  );
}
