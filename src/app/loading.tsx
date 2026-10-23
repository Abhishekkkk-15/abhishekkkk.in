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

  return (
    <PlayerZeroLoading
      topHeadline={topHeadline}
      bottomHeadline={bottomHeadline}
    />
  );
}
