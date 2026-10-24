"use client";

import { useEffect } from "react";

export default function ThemeSync({
  theme,
  topHeadline,
  bottomHeadline,
}: {
  theme: string;
  topHeadline?: string;
  bottomHeadline?: string;
}) {
  useEffect(() => {
    try {
      localStorage.setItem("active_theme", theme);
      document.cookie = `active_theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;

      if (topHeadline) {
        localStorage.setItem("matrix_top_headline", topHeadline);
      }
      if (bottomHeadline) {
        localStorage.setItem("matrix_bottom_headline", bottomHeadline);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [theme, topHeadline, bottomHeadline]);

  return null;
}
