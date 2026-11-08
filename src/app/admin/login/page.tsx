"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon, ArrowRight, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin/editor");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] text-[#1a1c1c] dark:text-[#f0f0f2] flex flex-col justify-between px-6 py-8 antialiased transition-colors duration-200">
      {/* Top Bar */}
      <header className="max-w-[440px] w-full mx-auto flex items-center justify-between">
        <a
          href="/"
          className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] transition-colors lowercase"
        >
          ← return to site
        </a>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f0f2] hover:bg-[#E5E5E5]/60 dark:hover:bg-[#26262a] transition-colors cursor-pointer"
        >
          {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </header>

      {/* Main Centered Login Card */}
      <main className="max-w-[440px] w-full mx-auto my-auto">
        <div className="bg-white dark:bg-[#141416] border border-[#E5E5E5] dark:border-[#26262a] rounded-xl p-8 sm:p-10 shadow-sm transition-colors">
          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-mono text-[11px] text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
              cms portal // authenticated access
            </span>
          </div>

          <div className="mb-8 space-y-2">
            <h1 className="font-serif text-3xl font-normal lowercase tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2]">
              portfolio editor
            </h1>
            <p className="text-sm font-sans text-[#5e5e5e] dark:text-[#9e9ea6] leading-relaxed">
              enter credentials to manage profile, trajectory milestones, and system runtimes.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@abhishekkkk.in"
                  className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] placeholder:text-[#5e5e5e]/50 dark:placeholder:text-[#9e9ea6]/40 px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
                <Mail
                  size={15}
                  className="absolute right-3.5 top-3 text-[#5e5e5e] dark:text-[#9e9ea6] pointer-events-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] placeholder:text-[#5e5e5e]/50 dark:placeholder:text-[#9e9ea6]/40 px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                />
                <Lock
                  size={15}
                  className="absolute right-3.5 top-3 text-[#5e5e5e] dark:text-[#9e9ea6] pointer-events-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#1a1c1c] dark:bg-[#f0f0f2] hover:bg-black dark:hover:bg-white text-[#f9f9f9] dark:text-[#0d0d0e] font-mono text-xs py-2.5 rounded-lg font-medium transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-xs"
            >
              <span>{loading ? "authenticating..." : "sign in to cms"}</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-[440px] w-full mx-auto text-center font-mono text-[11px] text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
        <span>© {new Date().getFullYear()} abhishek jangid // all rights reserved</span>
      </footer>
    </div>
  );
}
