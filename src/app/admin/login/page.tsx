"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col justify-center items-center px-6 py-12 selection:bg-[#111111] selection:text-[#F4F3EF]">
      <div className="w-full max-w-md border border-[#E2E0D8] bg-[#F4F3EF] p-8 sm:p-10 shadow-sm relative rounded-none">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between border-b border-[#E2E0D8] pb-4 mb-8 font-mono text-[10.5px] uppercase tracking-widest text-[#6E6D68]">
          <span>ADMIN AUTHENTICATION</span>
          <span>CMS // 01</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-[#111111] tracking-tight">
            Portfolio Editor
          </h1>
          <p className="mt-2 text-xs font-mono text-[#444442] leading-relaxed">
            Enter authorized administrator credentials to manage portfolio telemetry, projects, and architecture records.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-mono rounded-none">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5 font-mono text-xs">
            <label className="text-[#6E6D68] uppercase tracking-wider block">
              Admin Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2.5 text-sm font-sans focus:outline-none focus:border-[#111111] transition-colors rounded-none"
              />
              <Mail
                size={16}
                className="absolute right-3.5 top-3 text-[#6E6D68] pointer-events-none"
              />
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <label className="text-[#6E6D68] uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2.5 text-sm font-sans focus:outline-none focus:border-[#111111] transition-colors rounded-none"
              />
              <Lock
                size={16}
                className="absolute right-3.5 top-3 text-[#6E6D68] pointer-events-none"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] text-[#F4F3EF] font-mono text-xs uppercase tracking-widest py-3 px-4 hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 rounded-none"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  Authenticate Session <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-4 border-t border-[#E2E0D8] flex justify-between items-center font-mono text-[11px] text-[#6E6D68]">
          <a href="/" className="hover:text-[#111111] transition-colors">
            ← Return to Live Site
          </a>
          <span className="text-[10px]">SECURED // JWT</span>
        </div>
      </div>
    </div>
  );
}
