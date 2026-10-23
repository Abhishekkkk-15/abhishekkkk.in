"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  User,
  Layers,
  Briefcase,
  FolderGit2,
  FileCode,
  GitCommit,
  Terminal,
  Send,
  ShieldCheck,
  Key,
  Radio,
  Layout,
  Palette,
  Sparkles,
} from "lucide-react";
import type { IPortfolioData } from "@/models/Portfolio";

type TabKey =
  | "themes"
  | "profile"
  | "focus"
  | "experience"
  | "projects"
  | "dossier"
  | "activity"
  | "skills"
  | "contact"
  | "security";

export default function EditorPage() {
  const router = useRouter();
  const [data, setData] = useState<IPortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("profile");

  // Security & Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await fetch("/api/admin/portfolio");
        if (res.status === 401) {
          router.push("/admin/login");
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setStatusMessage({
          type: "error",
          text: "Failed to load portfolio data.",
        });
      } finally {
        setLoading(false);
      }
    }
    loadPortfolio();
  }, [router]);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Save failed");
      }

      const resJson = await res.json();
      setData(resJson.data);
      setStatusMessage({
        type: "success",
        text: "Portfolio updated successfully. Public SSR page revalidated.",
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Error saving changes.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordStatus({
        type: "error",
        text: "Please fill in all password fields.",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        text: "New password must be at least 8 characters long.",
      });
      return;
    }

    setPasswordSaving(true);
    setPasswordStatus(null);
    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to update password.");
      }
      setPasswordStatus({
        type: "success",
        text: "Password updated successfully! Your admin credentials are now secured.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setPasswordStatus({
        type: "error",
        text: err?.message || "Failed to update password.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] flex items-center justify-center font-mono text-xs text-[#6E6D68]">
        INITIALIZING CMS DATA STORE...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] flex items-center justify-center font-mono text-xs text-red-600">
        Failed to initialize portfolio document.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#F4F3EF]">
      {/* Top Admin Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#F4F3EF]/95 backdrop-blur-sm border-b border-[#E2E0D8] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-display font-medium text-base tracking-tight text-[#111111]">
            {data.profile.labBrand || "PORTFOLIO"} // CMS
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-wider bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/25 px-2 py-0.5 rounded-none">
            SSR Mongo Connected
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("themes")}
            className="hidden sm:flex items-center gap-1.5 font-mono text-xs border border-[#E2E0D8] bg-[#EBEAE4]/60 hover:bg-[#EBEAE4] px-2.5 py-1.5 transition-colors cursor-pointer"
            title="Configure Active Site Theme"
          >
            <Palette size={13} className="text-[#2563EB]" />
            <span className="text-[#6E6D68] uppercase text-[10.5px]">Theme:</span>
            <span className="font-semibold text-[#111111]">
              {data.activeTheme === "playerzero" ? "PlayerZero Matrix" : "Terminal Swiss"}
            </span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[#444442] hover:text-[#111111] flex items-center gap-1 transition-colors px-3 py-1.5 border border-[#E2E0D8] rounded-none hover:border-[#111111]"
          >
            Live Site <ExternalLink size={13} />
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="font-mono text-xs uppercase tracking-wider bg-[#111111] text-[#F4F3EF] hover:bg-[#2563EB] px-4 py-1.5 flex items-center gap-2 transition-colors disabled:opacity-50 rounded-none"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="text-[#6E6D68] hover:text-[#111111] p-1.5 transition-colors border border-transparent hover:border-[#E2E0D8] rounded-none"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Alert Notification Toast */}
      {statusMessage && (
        <div
          className={`px-6 py-3 border-b text-xs font-mono flex items-center gap-2 ${
            statusMessage.type === "success"
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Editor Body Grid */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row border-x border-[#E2E0D8] min-h-[calc(100vh-60px)]">
        {/* Left Side Tab Navigation */}
        <nav className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#E2E0D8] bg-[#EBEAE4]/40 p-3 sm:p-4 flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 md:gap-1 font-mono text-xs uppercase tracking-wider shrink-0 scrollbar-none">
          <div className="hidden md:block text-[10px] text-[#6E6D68] px-3 py-2">SECTIONS</div>

          {[
            { id: "themes", label: "00 // Themes & Layouts", icon: Layout },
            { id: "profile", label: "01 // Profile & Hero", icon: User },
            { id: "focus", label: "02 // Arch Focus", icon: Layers },
            { id: "experience", label: "03 // Experience", icon: Briefcase },
            { id: "projects", label: "04 // Projects", icon: FolderGit2 },
            { id: "dossier", label: "04.1 // Deep Dive", icon: FileCode },
            { id: "activity", label: "04.2 // GitHub Activity", icon: GitCommit },
            { id: "skills", label: "05 // Skills & Stack", icon: Terminal },
            { id: "contact", label: "06 // Contact & Colophon", icon: Send },
            { id: "security", label: "07 // Security & Access", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`shrink-0 md:w-full text-left px-3.5 py-2.5 rounded-none flex items-center gap-2.5 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-[#111111] text-[#F4F3EF]"
                    : "text-[#444442] hover:text-[#111111] hover:bg-[#EBEAE4]"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side Tab Form Content */}
        <main className="flex-1 p-6 sm:p-10 bg-[#F4F3EF]">
          {/* TAB 0: THEMES & LAYOUTS */}
          {activeTab === "themes" && (
            <div className="space-y-8 max-w-4xl">
              <div className="border-b border-[#E2E0D8] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-display font-medium text-[#111111] flex items-center gap-2.5">
                    <Palette className="text-[#2563EB]" size={22} />
                    Themes &amp; Site Layouts
                  </h2>
                  <p className="font-mono text-xs text-[#6E6D68] mt-1">
                    Select which theme layout is rendered on your public portfolio. Themes are strictly controlled here in Admin.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 font-mono text-xs">
                  <span className="text-[#6E6D68]">Active:</span>
                  <span className="font-bold text-[#111111] uppercase">
                    {data.activeTheme === "playerzero"
                      ? "PlayerZero Matrix"
                      : data.activeTheme === "industrial"
                      ? "Teenage Hardware"
                      : "Terminal Swiss"}
                  </span>
                </div>
              </div>

              {/* Admin-only notice callout */}
              <div className="p-4 bg-blue-50/60 border border-blue-200/80 rounded-none flex items-start gap-3 text-xs font-mono text-blue-900">
                <Sparkles className="text-blue-600 shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="font-semibold uppercase tracking-wider block mb-0.5">
                    Admin-Controlled Exclusivity
                  </span>
                  Public visitors cannot switch or override the active theme. The active theme is stored in your database and rendered via SSR. Choose a theme below and click <strong>&quot;Save Changes&quot;</strong> in the top bar to apply it instantly to your live website.
                </div>
              </div>

              {/* Themes Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* THEME 1: Terminal Swiss Technical */}
                <div
                  className={`border-2 p-6 flex flex-col justify-between transition-all bg-[#F4F3EF] relative ${
                    (data.activeTheme || "terminal") === "terminal"
                      ? "border-[#111111] shadow-md ring-1 ring-[#111111]"
                      : "border-[#E2E0D8] opacity-85 hover:opacity-100 hover:border-stone-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#111111]">
                        01 // Swiss Monospace
                      </span>
                      {(data.activeTheme || "terminal") === "terminal" ? (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                          ● Live on Site
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#EBEAE4] text-[#6E6D68] border border-[#E2E0D8]">
                          Available
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-display font-medium text-[#111111] mb-2">
                      Classic Terminal / Swiss Technical
                    </h3>
                    <p className="text-xs text-[#444442] font-mono leading-relaxed mb-5">
                      The signature brutalist monospace aesthetic inspired by high-frequency trading terminals and minimalist Swiss typography.
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-2 font-mono text-[11px] text-[#6E6D68] mb-6 border-y border-[#E2E0D8] py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#111111]">✓</span> JetBrains Mono &amp; Hanken Grotesk
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#111111]">✓</span> Character fade scroll dynamics
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#111111]">✓</span> Live telemetry counter &amp; sumi dark mode
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#111111]">✓</span> Full JSON Schema / Pipeline toggles
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setData({ ...data, activeTheme: "terminal" })}
                    disabled={(data.activeTheme || "terminal") === "terminal"}
                    className={`w-full font-mono text-xs uppercase tracking-wider py-2.5 px-4 text-center transition-all ${
                      (data.activeTheme || "terminal") === "terminal"
                        ? "bg-[#111111] text-[#F4F3EF] cursor-default font-bold"
                        : "bg-[#EBEAE4] text-[#111111] hover:bg-[#111111] hover:text-[#F4F3EF] border border-[#E2E0D8] cursor-pointer"
                    }`}
                  >
                    {(data.activeTheme || "terminal") === "terminal"
                      ? "Currently Active"
                      : "Activate Terminal Theme"}
                  </button>
                </div>

                {/* THEME 2: PlayerZero / Applied AI Matrix */}
                <div
                  className={`border-2 p-6 flex flex-col justify-between transition-all bg-[#f8f8f9] relative ${
                    data.activeTheme === "playerzero"
                      ? "border-[#111111] shadow-md ring-1 ring-[#111111]"
                      : "border-[#E2E0D8] opacity-85 hover:opacity-100 hover:border-stone-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#111111]">
                        02 // Applied AI Matrix
                      </span>
                      {data.activeTheme === "playerzero" ? (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                          ● Live on Site
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#EBEAE4] text-[#6E6D68] border border-[#E2E0D8]">
                          Available
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-display font-medium text-[#111111] mb-2">
                      PlayerZero / Applied AI Matrix
                    </h3>
                    <p className="text-xs text-stone-600 font-mono leading-relaxed mb-5">
                      The ultra-clean PlayerZero engineering aesthetic featuring an animated DAG pipeline hero, Silkscreen dot-matrix titles, and latent point cloud visualizer.
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-2 font-mono text-[11px] text-[#6E6D68] mb-6 border-y border-[#e5e5e8] py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#111111]">✓</span> Silkscreen &amp; Space Mono typography
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#111111]">✓</span> Animated SVG flowing connector wires
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#111111]">✓</span> Generative latent point-cloud canvas visualizer
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#111111]">✓</span> 52-week dot-matrix heatmap &amp; live commit stream
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setData({ ...data, activeTheme: "playerzero" })}
                    disabled={data.activeTheme === "playerzero"}
                    className={`w-full font-mono text-xs uppercase tracking-wider py-2.5 px-4 text-center transition-all ${
                      data.activeTheme === "playerzero"
                        ? "bg-[#111111] text-[#F4F3EF] cursor-default font-bold"
                        : "bg-[#EBEAE4] text-[#111111] hover:bg-[#111111] hover:text-[#F4F3EF] border border-[#E2E0D8] cursor-pointer"
                    }`}
                  >
                    {data.activeTheme === "playerzero"
                      ? "Currently Active"
                      : "Activate PlayerZero Theme"}
                  </button>
                </div>

                {/* THEME 3: Teenage Engineering / Industrial Hardware */}
                <div
                  className={`border-2 p-6 flex flex-col justify-between transition-all bg-[#E6E5DE] relative ${
                    data.activeTheme === "industrial"
                      ? "border-[#1C1B1A] shadow-md ring-1 ring-[#1C1B1A]"
                      : "border-[#CAC8BD] opacity-85 hover:opacity-100 hover:border-stone-400"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#1C1B1A]">
                        03 // Teenage Hardware
                      </span>
                      {data.activeTheme === "industrial" ? (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                          ● Live on Site
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#D7D5CB] text-[#6E6C60] border border-[#BCBAAD]">
                          Available
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-display font-medium text-[#1C1B1A] mb-2">
                      Teenage Engineering / Hardware
                    </h3>
                    <p className="text-xs text-[#55534A] font-mono leading-relaxed mb-5">
                      Tactile industrial hardware aesthetic inspired by OP-1 &amp; EP-133: anodized aluminum chassis, interactive rotary dials, backlit phosphor matrix, and mechanical click sound effects.
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-2 font-mono text-[11px] text-[#55534A] mb-6 border-y border-[#CCCABF] py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF4F00] font-bold">✓</span> Stamped anodized aluminum chassis
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF4F00] font-bold">✓</span> Interactive 4-knob rotary encoders
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF4F00] font-bold">✓</span> Web Audio mechanical tactile clicks
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF4F00] font-bold">✓</span> 52-week backlit phosphor LED sequencer
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setData({ ...data, activeTheme: "industrial" })}
                    disabled={data.activeTheme === "industrial"}
                    className={`w-full font-mono text-xs uppercase tracking-wider py-2.5 px-4 text-center transition-all ${
                      data.activeTheme === "industrial"
                        ? "bg-[#1C1B1A] text-[#F4F3EF] cursor-default font-bold"
                        : "bg-[#FF4F00] text-white hover:bg-[#E54500] border border-[#B83700] cursor-pointer font-bold shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
                    }`}
                  >
                    {data.activeTheme === "industrial"
                      ? "Currently Active"
                      : "Activate Hardware Theme"}
                  </button>
                </div>
              </div>

              {/* PlayerZero Theme Headlines Configuration Card */}
              <div className="p-5 border border-[#E2E0D8] bg-[#f8f8f9] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold">
                      PlayerZero Hero Headlines
                    </h3>
                    <p className="font-mono text-[11px] text-[#6E6D68] mt-0.5">
                      Configure the upper and lower dot-matrix titles displayed in the PlayerZero Hero section.
                    </p>
                  </div>
                  <span className="font-mono text-[9.5px] px-2 py-0.5 bg-[#EBEAE4] text-[#6E6D68] border border-[#E2E0D8]">
                    DOT-MATRIX TITLES
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[#6E6D68] uppercase font-semibold">Upper Headline</label>
                    <input
                      type="text"
                      value={data.profile.matrixTopHeadline || ""}
                      placeholder="BUILD. TRAIN."
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            matrixTopHeadline: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                    />
                    <span className="text-[10px] text-[#6E6D68] block">Default: BUILD. TRAIN.</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#6E6D68] uppercase font-semibold">Lower Headline</label>
                    <input
                      type="text"
                      value={data.profile.matrixBottomHeadline || ""}
                      placeholder="DEPLOY. SCALE."
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            matrixBottomHeadline: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                    />
                    <span className="text-[10px] text-[#6E6D68] block">Default: DEPLOY. SCALE.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: PROFILE & HERO */}
          {activeTab === "profile" && (
            <div className="space-y-8 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Profile &amp; Hero Section
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Manage primary identity, avatars, headline statements, and live telemetry badges.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Full Name</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, name: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Short Brand / Logo</label>
                  <input
                    type="text"
                    value={data.profile.labBrand}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, labBrand: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Professional Role</label>
                  <input
                    type="text"
                    value={data.profile.role}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, role: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Location</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, location: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Avatar Image URL</label>
                  <input
                    type="text"
                    value={data.profile.avatar}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, avatar: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">
                    Lead Headline Statement (Character Fade)
                  </label>
                  <textarea
                    rows={3}
                    value={data.profile.headline}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, headline: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[#6E6D68] uppercase">
                      Japanese Subtitle Translation
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9.5px] px-1.5 py-0.2 bg-[#E2E0D8] text-[#6E6D68]">
                        {data.profile.showJapaneseBio !== false ? "VISIBLE (DEFAULT)" : "HIDDEN"}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setData({
                            ...data,
                            profile: {
                              ...data.profile,
                              showJapaneseBio: data.profile.showJapaneseBio === false ? true : false,
                            },
                          })
                        }
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          data.profile.showJapaneseBio !== false ? "bg-[#2563EB]" : "bg-[#D8D6CE]"
                        }`}
                        role="switch"
                        aria-checked={data.profile.showJapaneseBio !== false}
                        title="Toggle Japanese Bio visibility"
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            data.profile.showJapaneseBio !== false ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  <input
                    type="text"
                    value={data.profile.japaneseBio}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, japaneseBio: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                  <p className="font-mono text-[10.5px] text-[#6E6D68]">
                    Toggle ON/OFF to control whether the Japanese text is displayed under the headline in the Hero section.
                  </p>
                </div>
              </div>

              {/* PlayerZero Theme Matrix Headlines */}
              <div className="pt-6 border-t border-[#E2E0D8]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111]">
                    Applied AI Matrix Headlines (PlayerZero Theme)
                  </h3>
                  <span className="font-mono text-[9.5px] px-1.5 py-0.5 bg-[#E2E0D8] text-[#6E6D68]">
                    HERO DOT-MATRIX
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#6E6D68] mb-4">
                  Customize the dot-matrix titles displayed above and below the pipeline diagram in the PlayerZero theme hero section.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[#6E6D68] uppercase">Upper Headline</label>
                    <input
                      type="text"
                      value={data.profile.matrixTopHeadline || ""}
                      placeholder="BUILD. TRAIN."
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            matrixTopHeadline: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                    />
                    <span className="font-mono text-[10px] text-[#6E6D68] block">
                      Default: BUILD. TRAIN.
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#6E6D68] uppercase">Lower Headline</label>
                    <input
                      type="text"
                      value={data.profile.matrixBottomHeadline || ""}
                      placeholder="DEPLOY. SCALE."
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            matrixBottomHeadline: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                    />
                    <span className="font-mono text-[10px] text-[#6E6D68] block">
                      Default: DEPLOY. SCALE.
                    </span>
                  </div>
                </div>
              </div>

              {/* Telemetry Stats Bar Section */}
              <div className="pt-6 border-t border-[#E2E0D8]">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] mb-4">
                  Telemetry Stats Bar
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[#6E6D68]">Throughput Label</label>
                    <input
                      type="text"
                      value={data.profile.stats.throughput.label}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            stats: {
                              ...data.profile.stats,
                              throughput: {
                                ...data.profile.stats.throughput,
                                label: e.target.value,
                              },
                            },
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs focus:outline-none rounded-none"
                    />
                    <label className="text-[#6E6D68] pt-1 block">Value &amp; Unit</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={data.profile.stats.throughput.value}
                        onChange={(e) =>
                          setData({
                            ...data,
                            profile: {
                              ...data.profile,
                              stats: {
                                ...data.profile.stats,
                                throughput: {
                                  ...data.profile.stats.throughput,
                                  value: e.target.value,
                                },
                              },
                            },
                          })
                        }
                        className="w-2/3 bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs focus:outline-none rounded-none"
                      />
                      <input
                        type="text"
                        value={data.profile.stats.throughput.unit}
                        onChange={(e) =>
                          setData({
                            ...data,
                            profile: {
                              ...data.profile,
                              stats: {
                                ...data.profile.stats,
                                throughput: {
                                  ...data.profile.stats.throughput,
                                  unit: e.target.value,
                                },
                              },
                            },
                          })
                        }
                        className="w-1/3 bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs focus:outline-none rounded-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#6E6D68]">Core Engines Label</label>
                    <input
                      type="text"
                      value={data.profile.stats.coreEngines.label}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            stats: {
                              ...data.profile.stats,
                              coreEngines: {
                                ...data.profile.stats.coreEngines,
                                label: e.target.value,
                              },
                            },
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs focus:outline-none rounded-none"
                    />
                    <label className="text-[#6E6D68] pt-1 block">Core Engines Value</label>
                    <input
                      type="text"
                      value={data.profile.stats.coreEngines.value}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            stats: {
                              ...data.profile.stats,
                              coreEngines: {
                                ...data.profile.stats.coreEngines,
                                value: e.target.value,
                              },
                            },
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs focus:outline-none rounded-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#6E6D68]">Status Label</label>
                    <input
                      type="text"
                      value={data.profile.stats.status.label}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            stats: {
                              ...data.profile.stats,
                              status: {
                                ...data.profile.stats.status,
                                label: e.target.value,
                              },
                            },
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs focus:outline-none rounded-none"
                    />
                    <label className="text-[#6E6D68] pt-1 block">Status Value</label>
                    <input
                      type="text"
                      value={data.profile.stats.status.value}
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            stats: {
                              ...data.profile.stats,
                              status: {
                                ...data.profile.stats.status,
                                value: e.target.value,
                              },
                            },
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs focus:outline-none rounded-none"
                    />
                  </div>
                </div>

                {/* Public JSON Schema ($ curl badge) Toggle */}
                <div className="pt-6 border-t border-[#E2E0D8]/60">
                  <div className="flex items-center justify-between p-4 bg-[#EBEAE4]/60 border border-[#E2E0D8]">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs uppercase font-medium text-[#111111]">
                          Public JSON Schema ($ curl badge)
                        </span>
                        <span
                          className={`font-mono text-[9.5px] px-1.5 py-0.2 ${
                            data.profile.showCurlBadge
                              ? "bg-[#2563EB]/10 text-[#2563EB] font-medium"
                              : "bg-[#E2E0D8] text-[#6E6D68]"
                          }`}
                        >
                          {data.profile.showCurlBadge ? "VISIBLE" : "HIDDEN (DEFAULT)"}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#6E6D68]">
                        Display the copyable <code className="text-[#111111]">$ curl -s https://abhishekkkk.in/api/profile</code> telemetry chip in the Hero section.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            showCurlBadge: !data.profile.showCurlBadge,
                          },
                        })
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        data.profile.showCurlBadge ? "bg-[#2563EB]" : "bg-[#D8D6CE]"
                      }`}
                      role="switch"
                      aria-checked={Boolean(data.profile.showCurlBadge)}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          data.profile.showCurlBadge ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Sticky Spotify Live Music Player Toggle */}
                  <div className="p-4 border border-[#E2E0D8] bg-[#EBEAE4]/40 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs uppercase font-medium text-[#111111]">
                          Sticky Spotify Vinyl Player
                        </span>
                        <span
                          className={`font-mono text-[9.5px] px-1.5 py-0.5 ${
                            data.profile.showSpotifyPlayer !== false
                              ? "bg-[#2563EB]/10 text-[#2563EB] font-medium"
                              : "bg-[#E2E0D8] text-[#6E6D68]"
                          }`}
                        >
                          {data.profile.showSpotifyPlayer !== false
                            ? "VISIBLE (DEFAULT)"
                            : "HIDDEN"}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-[#6E6D68]">
                        Show or hide the floating interactive vinyl record player with live audio telemetry across your site.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            showSpotifyPlayer:
                              data.profile.showSpotifyPlayer === false ? true : false,
                          },
                        })
                      }
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        data.profile.showSpotifyPlayer !== false
                          ? "bg-[#2563EB]"
                          : "bg-[#D8D6CE]"
                      }`}
                      role="switch"
                      aria-checked={data.profile.showSpotifyPlayer !== false}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          data.profile.showSpotifyPlayer !== false
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURAL FOCUS */}
          {activeTab === "focus" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Architectural Focus (02 //)
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Configure the 3 core competency pillars.
                </p>
              </div>

              <div className="space-y-6">
                {data.architecturalFocus.map((focus, index) => (
                  <div
                    key={index}
                    className="p-5 border border-[#E2E0D8] bg-[#EBEAE4]/40 space-y-4 rounded-none"
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-medium text-[#111111]">
                        Pillar 0{index + 1}
                      </span>
                      <input
                        type="text"
                        value={focus.index}
                        onChange={(e) => {
                          const updated = [...data.architecturalFocus];
                          updated[index].index = e.target.value;
                          setData({ ...data, architecturalFocus: updated });
                        }}
                        className="w-16 bg-[#EBEAE4] border border-[#E2E0D8] px-2 py-1 text-xs text-center rounded-none"
                      />
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[#6E6D68]">Pillar Title</label>
                      <input
                        type="text"
                        value={focus.title}
                        onChange={(e) => {
                          const updated = [...data.architecturalFocus];
                          updated[index].title = e.target.value;
                          setData({ ...data, architecturalFocus: updated });
                        }}
                        className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-sm font-sans focus:outline-none rounded-none"
                      />
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[#6E6D68]">Description</label>
                      <textarea
                        rows={3}
                        value={focus.description}
                        onChange={(e) => {
                          const updated = [...data.architecturalFocus];
                          updated[index].description = e.target.value;
                          setData({ ...data, architecturalFocus: updated });
                        }}
                        className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-sm font-sans focus:outline-none rounded-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: WORK EXPERIENCE */}
          {activeTab === "experience" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-medium text-[#111111]">
                    Experience Timeline (03 //)
                  </h2>
                  <p className="font-mono text-xs text-[#6E6D68] mt-1">
                    Manage roles, engineering accomplishments, and technical tags.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setData({
                      ...data,
                      experience: [
                        {
                          period: "2026 — PRESENT",
                          location: "Remote",
                          role: "Systems Engineer",
                          company: "Company Name",
                          description: "Role overview and impact...",
                          metric: "Key Metric",
                          metricSub: "Sub-metric detail",
                          tags: ["TypeScript", "Go"],
                        },
                        ...data.experience,
                      ],
                    });
                  }}
                  className="font-mono text-xs bg-[#111111] text-[#F4F3EF] px-3 py-1.5 flex items-center gap-1.5 rounded-none hover:bg-[#2563EB] transition-colors"
                >
                  <Plus size={13} /> Add Role
                </button>
              </div>

              <div className="space-y-6">
                {data.experience.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 border border-[#E2E0D8] bg-[#EBEAE4]/40 space-y-4 relative rounded-none"
                  >
                    <button
                      onClick={() => {
                        const updated = data.experience.filter((_, i) => i !== index);
                        setData({ ...data, experience: updated });
                      }}
                      title="Remove Role"
                      className="absolute right-4 top-4 text-[#6E6D68] hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div>
                        <label className="text-[#6E6D68]">Period</label>
                        <input
                          type="text"
                          value={item.period}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].period = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#6E6D68]">Location / Office</label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].location = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#6E6D68]">Role Title</label>
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].role = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#6E6D68]">Company Name</label>
                        <input
                          type="text"
                          value={item.company}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].company = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[#6E6D68]">Description</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].description = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs font-sans rounded-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#6E6D68]">Right Metric Title</label>
                        <input
                          type="text"
                          value={item.metric}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].metric = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#6E6D68]">Right Metric Sub</label>
                        <input
                          type="text"
                          value={item.metricSub}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].metricSub = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[#6E6D68]">
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={item.tags.join(", ")}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].tags = e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean);
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SELECTED PROJECTS */}
          {activeTab === "projects" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-medium text-[#111111]">
                    Selected Projects (04 //)
                  </h2>
                  <p className="font-mono text-xs text-[#6E6D68] mt-1">
                    Manage featured engineering repositories, demos, and live metrics.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setData({
                      ...data,
                      projects: [
                        {
                          codeIndex: `0${data.projects.length + 1} // SYSTEM`,
                          category: "AI SYSTEM",
                          title: "NEW-PROJECT",
                          version: "v1.0",
                          status: "Active",
                          description: "Project architecture and capabilities...",
                          techStack: "TypeScript · Node.js",
                          tech: ["TypeScript", "Node.js"],
                          github: "https://github.com/Abhishekkkk-15",
                          live: "",
                          metric: "Performance Metric",
                          metricSub: "Sub-metric detail",
                        },
                        ...data.projects,
                      ],
                    });
                  }}
                  className="font-mono text-xs bg-[#111111] text-[#F4F3EF] px-3 py-1.5 flex items-center gap-1.5 rounded-none hover:bg-[#2563EB] transition-colors"
                >
                  <Plus size={13} /> Add Project
                </button>
              </div>

              <div className="space-y-6">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className="p-5 border border-[#E2E0D8] bg-[#EBEAE4]/40 space-y-4 relative rounded-none"
                  >
                    <button
                      onClick={() => {
                        const updated = data.projects.filter((_, i) => i !== index);
                        setData({ ...data, projects: updated });
                      }}
                      title="Remove Project"
                      className="absolute right-4 top-4 text-[#6E6D68] hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                      <div>
                        <label className="text-[#6E6D68]">Code Index</label>
                        <input
                          type="text"
                          value={project.codeIndex}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].codeIndex = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#6E6D68]">Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].title = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs font-semibold rounded-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#6E6D68]">Version &amp; Status</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={project.version}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[index].version = e.target.value;
                              setData({ ...data, projects: updated });
                            }}
                            className="w-1/2 bg-[#EBEAE4] border border-[#E2E0D8] px-2 py-1.5 text-xs rounded-none"
                          />
                          <input
                            type="text"
                            value={project.status || ""}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[index].status = e.target.value;
                              setData({ ...data, projects: updated });
                            }}
                            placeholder="Active"
                            className="w-1/2 bg-[#EBEAE4] border border-[#E2E0D8] px-2 py-1.5 text-xs rounded-none"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[#6E6D68]">Tech Stack Summary</label>
                        <input
                          type="text"
                          value={project.techStack}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].techStack = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[#6E6D68]">Project Description</label>
                        <textarea
                          rows={2}
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].description = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs font-sans rounded-none"
                        />
                      </div>

                      <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[#6E6D68]">GitHub URL</label>
                          <input
                            type="text"
                            value={project.github}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[index].github = e.target.value;
                              setData({ ...data, projects: updated });
                            }}
                            className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                          />
                        </div>
                        <div>
                          <label className="text-[#6E6D68]">Live Demo URL</label>
                          <input
                            type="text"
                            value={project.live || ""}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[index].live = e.target.value;
                              setData({ ...data, projects: updated });
                            }}
                            className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[#6E6D68]">Metric Highlight</label>
                        <input
                          type="text"
                          value={project.metric}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].metric = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[#6E6D68]">Metric Subtext</label>
                        <input
                          type="text"
                          value={project.metricSub}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].metricSub = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FLAGSHIP DOSSIER DEEP DIVE */}
          {activeTab === "dossier" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Flagship Architectural Dossier (04.1 //)
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Configure the deep-dive technical showcase for your flagship system.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-[#6E6D68]">Dossier Title</label>
                  <input
                    type="text"
                    value={data.flagshipDossier.title}
                    onChange={(e) =>
                      setData({
                        ...data,
                        flagshipDossier: {
                          ...data.flagshipDossier,
                          title: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-sm font-sans rounded-none"
                  />
                </div>
                <div>
                  <label className="text-[#6E6D68]">Subtitle Tag</label>
                  <input
                    type="text"
                    value={data.flagshipDossier.subtitle}
                    onChange={(e) =>
                      setData({
                        ...data,
                        flagshipDossier: {
                          ...data.flagshipDossier,
                          subtitle: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-sm font-sans rounded-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[#6E6D68]">Deep Dive Architecture Summary</label>
                  <textarea
                    rows={3}
                    value={data.flagshipDossier.description}
                    onChange={(e) =>
                      setData({
                        ...data,
                        flagshipDossier: {
                          ...data.flagshipDossier,
                          description: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-sm font-sans rounded-none"
                  />
                </div>
                <div>
                  <label className="text-[#6E6D68]">GitHub Code Target</label>
                  <input
                    type="text"
                    value={data.flagshipDossier.github}
                    onChange={(e) =>
                      setData({
                        ...data,
                        flagshipDossier: {
                          ...data.flagshipDossier,
                          github: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                  />
                </div>
                <div>
                  <label className="text-[#6E6D68]">Live Target</label>
                  <input
                    type="text"
                    value={data.flagshipDossier.live || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        flagshipDossier: {
                          ...data.flagshipDossier,
                          live: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E0D8] space-y-3 font-mono text-xs">
                <label className="text-[#6E6D68] block uppercase tracking-wider">
                  Specification Telemetry (Key/Value)
                </label>
                {data.flagshipDossier.metrics.map((m, idx) => (
                  <div key={idx} className="flex gap-3">
                    <input
                      type="text"
                      value={m.label}
                      onChange={(e) => {
                        const updated = [...data.flagshipDossier.metrics];
                        updated[idx].label = e.target.value;
                        setData({
                          ...data,
                          flagshipDossier: {
                            ...data.flagshipDossier,
                            metrics: updated,
                          },
                        });
                      }}
                      className="w-1/3 bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                    />
                    <input
                      type="text"
                      value={m.value}
                      onChange={(e) => {
                        const updated = [...data.flagshipDossier.metrics];
                        updated[idx].value = e.target.value;
                        setData({
                          ...data,
                          flagshipDossier: {
                            ...data.flagshipDossier,
                            metrics: updated,
                          },
                        });
                      }}
                      className="w-2/3 bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                    />
                  </div>
                ))}
              </div>

              {/* System Architecture Pipeline Toggle */}
              <div className="pt-4 border-t border-[#E2E0D8]">
                <div className="flex items-center justify-between p-4 bg-[#EBEAE4]/60 border border-[#E2E0D8]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase font-medium text-[#111111]">
                        System Architecture Pipeline
                      </span>
                      <span
                        className={`font-mono text-[9.5px] px-1.5 py-0.2 ${
                          data.flagshipDossier.showArchitecturePipeline
                            ? "bg-[#2563EB]/10 text-[#2563EB] font-medium"
                            : "bg-[#E2E0D8] text-[#6E6D68]"
                        }`}
                      >
                        {data.flagshipDossier.showArchitecturePipeline
                          ? "VISIBLE"
                          : "HIDDEN (DEFAULT)"}
                      </span>
                    </div>
                    <p className="font-mono text-[11px] text-[#6E6D68]">
                      Display the interactive 4-stage systems architecture pipeline in the Flagship Architectural Dossier.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        flagshipDossier: {
                          ...data.flagshipDossier,
                          showArchitecturePipeline: !data.flagshipDossier.showArchitecturePipeline,
                        },
                      })
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      data.flagshipDossier.showArchitecturePipeline ? "bg-[#2563EB]" : "bg-[#D8D6CE]"
                    }`}
                    role="switch"
                    aria-checked={Boolean(data.flagshipDossier.showArchitecturePipeline)}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        data.flagshipDossier.showArchitecturePipeline ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5.5: GITHUB ACTIVITY (04.2) */}
          {activeTab === "activity" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Open Source Activity // GitHub (04.2)
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Connected to your GitHub profile URL stored in 01 // Profile (
                  <span className="text-[#111111] font-semibold">
                    {data.profile.socials?.github || "Not configured"}
                  </span>
                  ). The 52-week commit density heatmap and live metrics are fetched dynamically via Next.js SSR.
                </p>
              </div>

              <div className="p-4 bg-[#EBEAE4]/40 border border-[#E2E0D8] space-y-4 font-mono text-xs">
                <div className="text-[11px] uppercase tracking-wider text-[#111111] font-semibold border-b border-[#E2E0D8] pb-2">
                  TELEMETRY STATUS &amp; OVERRIDES
                </div>

                <div>
                  <label className="text-[#6E6D68] block mb-1">
                    Activity Status Badge (default: Active Development)
                  </label>
                  <input
                    type="text"
                    value={data.githubActivity?.status || ""}
                    placeholder="Active Development"
                    onChange={(e) =>
                      setData({
                        ...data,
                        githubActivity: {
                          ...(data.githubActivity || {}),
                          status: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#6E6D68] block mb-1">
                      Custom Commits Display (leave blank for live count)
                    </label>
                    <input
                      type="text"
                      value={data.githubActivity?.customCommits || ""}
                      placeholder="e.g. 1,740+ (auto from API if blank)"
                      onChange={(e) =>
                        setData({
                          ...data,
                          githubActivity: {
                            ...(data.githubActivity || {}),
                            customCommits: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#6E6D68] block mb-1">
                      PRs Merged Metric
                    </label>
                    <input
                      type="text"
                      value={data.githubActivity?.customPrs || ""}
                      placeholder="e.g. 140+"
                      onChange={(e) =>
                        setData({
                          ...data,
                          githubActivity: {
                            ...(data.githubActivity || {}),
                            customPrs: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#6E6D68] block mb-1">
                      Code Reviews Completed
                    </label>
                    <input
                      type="text"
                      value={data.githubActivity?.customReviews || ""}
                      placeholder="e.g. 45"
                      onChange={(e) =>
                        setData({
                          ...data,
                          githubActivity: {
                            ...(data.githubActivity || {}),
                            customReviews: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#6E6D68] block mb-1">
                      Stars Accumulated (leave blank for live repo star sum)
                    </label>
                    <input
                      type="text"
                      value={data.githubActivity?.customStars || ""}
                      placeholder="e.g. 820+ (auto from public repos if blank)"
                      onChange={(e) =>
                        setData({
                          ...data,
                          githubActivity: {
                            ...(data.githubActivity || {}),
                            customStars: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[#6E6D68] block mb-1">
                      Top Languages (leave blank to auto-detect from repos)
                    </label>
                    <input
                      type="text"
                      value={data.githubActivity?.customLanguages || ""}
                      placeholder="e.g. TypeScript, Python, C++"
                      onChange={(e) =>
                        setData({
                          ...data,
                          githubActivity: {
                            ...(data.githubActivity || {}),
                            customLanguages: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#EBEAE4] border border-[#E2E0D8] text-[11px] text-[#6E6D68]">
                  Tip: To switch the GitHub account, update the GitHub URL in the &quot;01 // Profile &amp; Hero&quot; tab. The system will automatically fetch that profile&apos;s live contributions, public repos, and primary languages.
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SKILLS & INFRASTRUCTURE */}
          {activeTab === "skills" && (
            <div className="space-y-6 max-w-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E0D8] pb-4 gap-4">
                <div>
                  <h2 className="text-2xl font-display font-medium text-[#111111]">
                    Technical Capabilities (05 //)
                  </h2>
                  <p className="font-mono text-xs text-[#6E6D68] mt-1">
                    Manage core technology categories and skill tags. Add as many categories as needed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setData({
                      ...data,
                      skillMatrix: [
                        ...data.skillMatrix,
                        {
                          category: `DOMAIN ${String(data.skillMatrix.length + 1).padStart(2, "0")}`,
                          items: ["Tool A", "Tool B", "Framework"],
                        },
                      ],
                    });
                  }}
                  className="font-mono text-xs bg-[#111111] text-[#F4F3EF] px-3.5 py-2 flex items-center gap-1.5 rounded-none hover:bg-[#2563EB] transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <Plus size={13} /> Add Category
                </button>
              </div>

              <div className="space-y-6">
                {data.skillMatrix.length === 0 ? (
                  <div className="p-8 border border-dashed border-[#E2E0D8] text-center space-y-3 font-mono text-xs text-[#6E6D68]">
                    <p>No technical capability categories configured.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setData({
                          ...data,
                          skillMatrix: [
                            {
                              category: "CORE STACK",
                              items: ["TypeScript", "Next.js", "Python"],
                            },
                          ],
                        });
                      }}
                      className="inline-flex items-center gap-1.5 bg-[#111111] text-[#F4F3EF] px-3 py-1.5 rounded-none hover:bg-[#2563EB] transition-colors"
                    >
                      <Plus size={13} /> Add Initial Category
                    </button>
                  </div>
                ) : (
                  data.skillMatrix.map((matrix, index) => (
                    <div
                      key={index}
                      className="p-5 border border-[#E2E0D8] bg-[#EBEAE4]/40 space-y-3.5 relative rounded-none"
                    >
                      <div className="flex items-center justify-between border-b border-[#E2E0D8]/60 pb-2">
                        <span className="font-mono text-xs uppercase font-medium text-[#111111]">
                          Category {String(index + 1).padStart(2, "0")}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = data.skillMatrix.filter((_, i) => i !== index);
                            setData({ ...data, skillMatrix: updated });
                          }}
                          title="Remove Category"
                          className="text-[#6E6D68] hover:text-red-600 transition-colors p-1 flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>

                      <div className="font-mono text-xs">
                        <label className="text-[#6E6D68] uppercase">
                          Category Name
                        </label>
                        <input
                          type="text"
                          value={matrix.category}
                          onChange={(e) => {
                            const updated = [...data.skillMatrix];
                            updated[index].category = e.target.value;
                            setData({ ...data, skillMatrix: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-sm font-sans focus:outline-none mt-1 rounded-none"
                        />
                      </div>
                      <div className="font-mono text-xs">
                        <label className="text-[#6E6D68] uppercase">
                          Skills (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={matrix.items.join(", ")}
                          onChange={(e) => {
                            const updated = [...data.skillMatrix];
                            updated[index].items = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            setData({ ...data, skillMatrix: updated });
                          }}
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-sm font-sans focus:outline-none mt-1 rounded-none"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT & AVAILABILITY */}
          {activeTab === "contact" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Contact &amp; Availability (06 //)
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Configure location details, direct links, and open-to-work status.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-[#6E6D68] uppercase">
                    Location Lines (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={data.contactInfo.locationLines.join("\n")}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactInfo: {
                          ...data.contactInfo,
                          locationLines: e.target.value
                            .split("\n")
                            .filter(Boolean),
                        },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-sm font-sans focus:outline-none mt-1 rounded-none"
                  />
                </div>

                <div>
                  <label className="text-[#6E6D68] uppercase">
                    Availability Statement
                  </label>
                  <textarea
                    rows={3}
                    value={data.contactInfo.availability}
                    onChange={(e) =>
                      setData({
                        ...data,
                        contactInfo: {
                          ...data.contactInfo,
                          availability: e.target.value,
                        },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-sm font-sans focus:outline-none mt-1 rounded-none"
                  />
                </div>

                <div className="pt-4 border-t border-[#E2E0D8]">
                  <label className="text-[#6E6D68] uppercase block mb-3">
                    Connect Links
                  </label>
                  {data.contactInfo.connectLinks.map((link, idx) => (
                    <div key={idx} className="flex gap-3 mb-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const updated = [...data.contactInfo.connectLinks];
                          updated[idx].label = e.target.value;
                          setData({
                            ...data,
                            contactInfo: {
                              ...data.contactInfo,
                              connectLinks: updated,
                            },
                          });
                        }}
                        className="w-1/2 bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) => {
                          const updated = [...data.contactInfo.connectLinks];
                          updated[idx].href = e.target.value;
                          setData({
                            ...data,
                            contactInfo: {
                              ...data.contactInfo,
                              connectLinks: updated,
                            },
                          });
                        }}
                        className="w-1/2 bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SECURITY & ACCESS CONTROL */}
          {activeTab === "security" && (
            <div className="space-y-6 max-w-2xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Security &amp; Access Control (07 //)
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Rotate your admin credentials and manage defense-in-depth settings.
                </p>
              </div>

              {/* Security Telemetry Status Card */}
              <div className="p-4 bg-[#EBEAE4]/40 border border-[#E2E0D8] space-y-3 font-mono text-xs">
                <div className="text-[11px] uppercase tracking-wider text-[#111111] font-semibold border-b border-[#E2E0D8] pb-2">
                  SECURITY POLICY &amp; DEFENSE POSTURE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11.5px]">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block"></span>
                    <span className="text-[#6E6D68]">Encryption:</span>
                    <span className="font-medium text-[#111111]">Bcrypt (Cost 10)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block"></span>
                    <span className="text-[#6E6D68]">Token:</span>
                    <span className="font-medium text-[#111111]">HMAC-SHA256 JWT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 inline-block"></span>
                    <span className="text-[#6E6D68]">Cookies:</span>
                    <span className="font-medium text-[#111111]">HttpOnly + SameSite=Lax</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] inline-block animate-pulse"></span>
                    <span className="text-[#6E6D68]">Rate Limiter:</span>
                    <span className="font-medium text-[#2563EB]">5-Attempt / 15m Lockout</span>
                  </div>
                </div>
              </div>

              {/* Spotify Live Audio Telemetry Integration Card */}
              <div className="p-5 border border-[#E2E0D8] bg-[#EBEAE4]/40 space-y-3 font-mono text-xs">
                <div className="text-xs uppercase tracking-wider font-semibold text-[#111111] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio size={14} className="text-[#2563EB]" />
                    <span>Spotify Live Audio Telemetry</span>
                  </div>
                  <span className="text-[10px] text-[#2563EB] bg-[#2563EB]/10 border border-[#2563EB]/25 px-1.5 py-0.5">
                    ADMIN AUTH REQUIRED
                  </span>
                </div>
                <p className="text-[11px] text-[#6E6D68] leading-relaxed">
                  Authenticate your personal Spotify account to stream currently playing music directly into your portfolio's sticky audio widget.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E0D8]/60">
                  <a
                    href="/api/spotify/login"
                    className="inline-flex items-center gap-2 bg-[#111111] text-[#F4F3EF] hover:bg-[#2563EB] px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Authenticate Spotify Account ↗</span>
                  </a>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#6E6D68]">Widget Status:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setData({
                          ...data,
                          profile: {
                            ...data.profile,
                            showSpotifyPlayer:
                              data.profile.showSpotifyPlayer === false ? true : false,
                          },
                        })
                      }
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        data.profile.showSpotifyPlayer !== false ? "bg-[#2563EB]" : "bg-[#D8D6CE]"
                      }`}
                      role="switch"
                      aria-checked={data.profile.showSpotifyPlayer !== false}
                    >
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          data.profile.showSpotifyPlayer !== false ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="text-[10px] font-bold text-[#111111]">
                      {data.profile.showSpotifyPlayer !== false ? "ON" : "OFF"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Change Password Form */}
              <form onSubmit={handleChangePassword} className="space-y-4 font-mono text-xs">
                <div className="p-5 border border-[#E2E0D8] bg-[#EBEAE4]/40 space-y-4">
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#111111] flex items-center gap-2">
                    <Key size={14} />
                    <span>Change Admin Password</span>
                  </div>

                  {passwordStatus && (
                    <div
                      className={`p-3 border text-xs flex items-center gap-2 ${
                        passwordStatus.type === "success"
                          ? "bg-green-50 text-green-800 border-green-200"
                          : "bg-red-50 text-red-800 border-red-200"
                      }`}
                    >
                      {passwordStatus.type === "success" ? (
                        <CheckCircle size={15} />
                      ) : (
                        <AlertCircle size={15} />
                      )}
                      <span>{passwordStatus.text}</span>
                    </div>
                  )}

                  <div>
                    <label className="text-[#6E6D68] block mb-1">
                      CURRENT PASSWORD
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none focus:outline-none focus:border-[#111111]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[#6E6D68] block mb-1">
                        NEW PASSWORD (MIN 8 CHARS)
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none focus:outline-none focus:border-[#111111]"
                      />
                    </div>

                    <div>
                      <label className="text-[#6E6D68] block mb-1">
                        CONFIRM NEW PASSWORD
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none focus:outline-none focus:border-[#111111]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="bg-[#111111] text-[#F4F3EF] hover:bg-[#2563EB] px-5 py-2 font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50 rounded-none flex items-center gap-2"
                    >
                      <ShieldCheck size={14} />
                      {passwordSaving ? "Updating Password..." : "Update Password"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
