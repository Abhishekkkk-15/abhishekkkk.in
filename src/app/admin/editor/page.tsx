"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sun,
  Moon,
  User,
  Briefcase,
  FolderGit2,
  GitCommit,
  ShieldCheck,
  Key,
  Upload,
  Loader2,
  GripVertical,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { IPortfolioData } from "@/models/Portfolio";

type TabKey = "profile" | "experience" | "projects" | "activity" | "security";

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
  const [draggedProjectIndex, setDraggedProjectIndex] = useState<number | null>(null);

  // Dark/Light Mode State
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Security & Password Change State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Resume PDF Direct Upload State
  const [uploadingResume, setUploadingResume] = useState(false);
  const [resumeUploadStatus, setResumeUploadStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

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
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const x = e ? e.clientX : window.innerWidth / 2;
      const y = e ? e.clientY : 0;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        applyTheme();
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];
        document.documentElement.animate(
          {
            clipPath: next ? clipPath : [...clipPath].reverse(),
          },
          {
            duration: 420,
            easing: "ease-in-out",
            pseudoElement: next
              ? "::view-transition-new(root)"
              : "::view-transition-old(root)",
          }
        );
      });
    } else {
      document.documentElement.classList.add("theme-transition");
      applyTheme();
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 450);
    }
  };

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
          text: "failed to load portfolio data.",
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

      setStatusMessage({
        type: "success",
        text: "portfolio changes published successfully.",
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "an unexpected error occurred while saving.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        text: "new passwords do not match.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordStatus({
        type: "error",
        text: "new password must be at least 8 characters long.",
      });
      return;
    }

    setPasswordSaving(true);
    try {
      const res = await fetch("/api/admin/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Password change failed");
      }

      setPasswordStatus({
        type: "success",
        text: "admin password successfully updated.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordStatus(null), 4000);
    } catch (err: any) {
      setPasswordStatus({
        type: "error",
        text: err.message || "failed to update password.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleResumeFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (
      !file.name.toLowerCase().endsWith(".pdf") &&
      file.type !== "application/pdf"
    ) {
      setResumeUploadStatus({
        type: "error",
        text: "only pdf documents (.pdf) can be uploaded.",
      });
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setResumeUploadStatus({
        type: "error",
        text: "file exceeds 15mb maximum limit.",
      });
      return;
    }

    setUploadingResume(true);
    setResumeUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/resume/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "failed to upload resume.");
      }

      if (data) {
        setData({
          ...data,
          profile: {
            ...data.profile,
            resumeUrl: json.url,
          },
        });
      }

      const kb = Math.round(json.size / 1024);
      setResumeUploadStatus({
        type: "success",
        text: `uploaded "${json.filename}" (${kb} KB) successfully.`,
      });
      setTimeout(() => setResumeUploadStatus(null), 5000);
    } catch (err: any) {
      setResumeUploadStatus({
        type: "error",
        text: err.message || "failed to upload resume.",
      });
    } finally {
      setUploadingResume(false);
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] flex flex-col items-center justify-center font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>authenticating cms session...</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const moveProject = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= data.projects.length) return;
    const projects = [...data.projects];
    const [movedProject] = projects.splice(fromIndex, 1);
    projects.splice(toIndex, 0, movedProject);
    setData({ ...data, projects });
  };

  const tabs: Array<{ id: TabKey; label: string; icon: any }> = [
    { id: "profile", label: "profile & bio", icon: User },
    { id: "experience", label: "trajectory", icon: Briefcase },
    { id: "projects", label: "projects & engines", icon: FolderGit2 },
    { id: "activity", label: "github activity", icon: GitCommit },
    { id: "security", label: "security", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#0d0d0e] text-[#1a1c1c] dark:text-[#f0f0f2] antialiased transition-colors duration-200">
      
      {/* Sticky Editorial Header */}
      <header className="sticky top-0 z-40 bg-[#f9f9f9]/90 dark:bg-[#0d0d0e]/90 backdrop-blur-xl border-b border-[#E5E5E5] dark:border-[#26262a] transition-colors">
        <div className="max-w-5xl mx-auto px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Brand & Status */}
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="font-mono text-xs font-semibold text-[#1a1c1c] dark:text-[#f0f0f2] lowercase tracking-tight hover:underline"
            >
              {data.profile.shortName || "abhishek"}
            </a>
            <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6]">/</span>
            <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
              cms editor
            </span>
            <div className="hidden sm:flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>live</span>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#1a1c1c] dark:text-[#f0f0f2] hover:bg-[#E5E5E5]/60 dark:hover:bg-[#26262a] transition-colors cursor-pointer"
            >
              {mounted && isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* View Site External Link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1 font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] px-2.5 py-1.5 rounded-md hover:bg-[#E5E5E5]/50 dark:hover:bg-[#26262a]/50 transition-colors"
            >
              <span>view site</span>
              <ExternalLink size={12} />
            </a>

            {/* Save Changes Button */}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="bg-[#1a1c1c] dark:bg-[#f0f0f2] hover:bg-black dark:hover:bg-white text-[#f9f9f9] dark:text-[#0d0d0e] font-mono text-xs px-3.5 py-1.5 rounded-full font-medium transition-all duration-150 flex items-center gap-1.5 disabled:opacity-50 cursor-pointer shadow-2xs"
            >
              <Save size={13} />
              <span>{saving ? "saving..." : "save changes"}</span>
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              title="Sign out of CMS"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Sub-bar */}
        <div className="max-w-5xl mx-auto px-6 overflow-x-auto scrollbar-none border-t border-[#E5E5E5]/60 dark:border-[#26262a]/60">
          <nav className="flex items-center gap-1 py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-full font-mono text-xs lowercase flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-[#1a1c1c] dark:bg-[#f0f0f2] text-[#f9f9f9] dark:text-[#0d0d0e] font-medium shadow-2xs"
                      : "text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] hover:bg-[#E5E5E5]/50 dark:hover:bg-[#26262a]/50"
                  }`}
                >
                  <Icon size={12} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Floating Status Notification */}
      {statusMessage && (
        <div className="max-w-5xl mx-auto px-6 pt-4">
          <div
            className={`p-3 rounded-lg text-xs font-mono flex items-center gap-2 border transition-all ${
              statusMessage.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300"
                : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 size={15} className="shrink-0" />
            ) : (
              <AlertCircle size={15} className="shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        
        {/* ========================================================= */}
        {/* TAB 1: PROFILE & BIO                                     */}
        {/* ========================================================= */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal lowercase tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2]">
                profile &amp; bio
              </h2>
              <p className="text-sm font-sans text-[#5e5e5e] dark:text-[#9e9ea6]">
                manage your core identity, editorial headline, ethos paragraphs, and public handles.
              </p>
            </div>

            <div className="bg-white dark:bg-[#141416] border border-[#E5E5E5] dark:border-[#26262a] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    full name
                  </label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, name: e.target.value },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Short Name */}
                <div className="space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    short name / brandmark
                  </label>
                  <input
                    type="text"
                    value={data.profile.shortName || "abhishek"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, shortName: e.target.value },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Lead Headline Statement */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    editorial headline statement
                  </label>
                  <textarea
                    rows={2}
                    value={data.profile.headline}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, headline: e.target.value },
                      })
                    }
                    placeholder="i do applied ai & systems engineering, & build the autonomous agents & inference runtimes that serve them."
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-serif focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Tagline / Subtitle */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    tagline / focus domains
                  </label>
                  <input
                    type="text"
                    value={data.profile.tagline || ""}
                    placeholder="Autonomous AI Agents · Distributed Systems · Developer Tooling"
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, tagline: e.target.value },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    contact email
                  </label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, email: e.target.value },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    location / timezone
                  </label>
                  <input
                    type="text"
                    value={data.profile.location}
                    placeholder="Jaipur, India · Remote"
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, location: e.target.value },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* GitHub URL */}
                <div className="space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    github profile url
                  </label>
                  <input
                    type="text"
                    value={data.profile.socials?.github || ""}
                    placeholder="https://github.com/..."
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: {
                          ...data.profile,
                          socials: {
                            ...(data.profile.socials || {}),
                            github: e.target.value,
                            linkedin: data.profile.socials?.linkedin || "",
                          },
                        },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* LinkedIn URL */}
                <div className="space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    linkedin url
                  </label>
                  <input
                    type="text"
                    value={data.profile.socials?.linkedin || ""}
                    placeholder="https://linkedin.com/in/..."
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: {
                          ...data.profile,
                          socials: {
                            ...(data.profile.socials || {}),
                            linkedin: e.target.value,
                            github: data.profile.socials?.github || "",
                          },
                        },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Twitter / X URL */}
                <div className="space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    x (twitter) url
                  </label>
                  <input
                    type="text"
                    value={data.profile.socials?.twitter || ""}
                    placeholder="https://x.com/..."
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: {
                          ...data.profile,
                          socials: {
                            ...(data.profile.socials || {}),
                            twitter: e.target.value,
                            github: data.profile.socials?.github || "",
                            linkedin: data.profile.socials?.linkedin || "",
                          },
                        },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Resume URL & Direct PDF Upload */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                      resume document (url or upload new pdf)
                    </label>
                    {data.profile.resumeUrl && (
                      <a
                        href={data.profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-mono text-[#737373] dark:text-[#8e8e93] hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors flex items-center gap-1"
                      >
                        view current document ↗
                      </a>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={data.profile.resumeUrl || "/resume.pdf"}
                      placeholder="/resume.pdf or https://..."
                      onChange={(e) =>
                        setData({
                          ...data,
                          profile: { ...data.profile, resumeUrl: e.target.value },
                        })
                      }
                      className="flex-1 bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />

                    <label
                      className={`relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#E5E5E5] dark:border-[#26262a] bg-white dark:bg-[#1e1e22] hover:bg-[#f3f3f4] dark:hover:bg-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] text-xs font-mono font-medium transition-colors shrink-0 ${
                        uploadingResume ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="file"
                        accept="application/pdf"
                        className="sr-only"
                        disabled={uploadingResume}
                        onChange={handleResumeFileUpload}
                      />
                      {uploadingResume ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          <span>upload .pdf</span>
                        </>
                      )}
                    </label>
                  </div>

                  {resumeUploadStatus && (
                    <p
                      className={`text-xs font-mono ${
                        resumeUploadStatus.type === "error"
                          ? "text-red-500"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {resumeUploadStatus.text}
                    </p>
                  )}
                </div>

                {/* Bio Paragraph 1 */}
                <div className="sm:col-span-2 space-y-1.5 pt-2 border-t border-[#E5E5E5] dark:border-[#26262a]">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    ethos bio paragraph 1 (work cycle &amp; thoughts)
                  </label>
                  <textarea
                    rows={2}
                    value={data.profile.bioParagraph1 || ""}
                    placeholder="i like working when the world is sleeping. my work cycle is generally 12pm to 4am..."
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, bioParagraph1: e.target.value },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>

                {/* Bio Paragraph 2 */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    ethos bio paragraph 2 (post-launch thrills)
                  </label>
                  <textarea
                    rows={2}
                    value={data.profile.bioParagraph2 || ""}
                    placeholder="i live the part after the launch day. when the reasoning breaks, when the cost skyrockets..."
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, bioParagraph2: e.target.value },
                      })
                    }
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] text-[#1a1c1c] dark:text-[#f0f0f2] px-3.5 py-2.5 rounded-lg text-sm font-sans focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: TRAJECTORY / EXPERIENCE                            */}
        {/* ========================================================= */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal lowercase tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2]">
                  trajectory timeline
                </h2>
                <p className="text-sm font-sans text-[#5e5e5e] dark:text-[#9e9ea6]">
                  chronological milestones connecting previous and current systems engineering roles.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setData({
                    ...data,
                    experience: [
                      {
                        period: "2026 — PRESENT",
                        location: "Remote",
                        role: "Systems Engineer",
                        company: "Company Name",
                        description: "Architected high-throughput agent systems and real-time inference runtimes...",
                        metric: "Key Metric",
                        metricSub: "Latency",
                        tags: ["TypeScript", "Go"],
                      },
                      ...data.experience,
                    ],
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a1c1c] dark:bg-[#f0f0f2] hover:bg-black dark:hover:bg-white text-[#f9f9f9] dark:text-[#0d0d0e] font-mono text-xs font-medium cursor-pointer transition-colors shadow-2xs shrink-0"
              >
                <Plus size={13} />
                <span>add milestone</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.experience.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#141416] border border-[#E5E5E5] dark:border-[#26262a] rounded-xl p-6 relative space-y-4 transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between border-b border-[#E5E5E5]/60 dark:border-[#26262a]/60 pb-3">
                    <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
                      milestone #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = data.experience.filter((_, i) => i !== index);
                        setData({ ...data, experience: updated });
                      }}
                      title="Remove milestone"
                      className="text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-red-600 dark:hover:text-red-400 p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">period</label>
                      <input
                        type="text"
                        value={item.period}
                        placeholder="2026 — PRESENT"
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[index].period = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">location / office</label>
                      <input
                        type="text"
                        value={item.location}
                        placeholder="Jaipur, India or Remote"
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[index].location = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">company name</label>
                      <input
                        type="text"
                        value={item.company}
                        placeholder="Adiyogi Technosoft"
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[index].company = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-sans font-semibold text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">role title</label>
                      <input
                        type="text"
                        value={item.role}
                        placeholder="Full Stack Developer"
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[index].role = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">milestone overview</label>
                      <textarea
                        rows={2}
                        value={item.description}
                        placeholder="Architecting and shipping production full-stack web applications..."
                        onChange={(e) => {
                          const updated = [...data.experience];
                          updated[index].description = e.target.value;
                          setData({ ...data, experience: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-sans text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PROJECTS / RUNTIMES & ENGINES                      */}
        {/* ========================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="space-y-1">
                <h2 className="font-serif text-2xl sm:text-3xl font-normal lowercase tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2]">
                  projects &amp; engines
                </h2>
                <p className="text-sm font-sans text-[#5e5e5e] dark:text-[#9e9ea6]">
                  drag projects into the order you want on your portfolio, then save changes to publish.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setData({
                    ...data,
                    projects: [
                      {
                        codeIndex: "runtime engine",
                        category: "runtime engine",
                        title: "new-system",
                        version: "v1.0",
                        status: "Active",
                        description: "architecture overview and operational details...",
                        techStack: "TypeScript, Next.js, Node.js",
                        tech: ["TypeScript", "Next.js"],
                        github: data.profile.socials?.github || "https://github.com/Abhishekkkk-15",
                        live: "",
                        metric: "sub-20ms",
                        metricSub: "latency",
                      },
                      ...data.projects,
                    ],
                  });
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1a1c1c] dark:bg-[#f0f0f2] hover:bg-black dark:hover:bg-white text-[#f9f9f9] dark:text-[#0d0d0e] font-mono text-xs font-medium cursor-pointer transition-colors shadow-2xs shrink-0"
              >
                <Plus size={13} />
                <span>add project</span>
              </button>
            </div>

            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (draggedProjectIndex !== null) moveProject(draggedProjectIndex, index);
                    setDraggedProjectIndex(null);
                  }}
                  className={`bg-white dark:bg-[#141416] border border-[#E5E5E5] dark:border-[#26262a] rounded-xl p-6 relative space-y-4 transition-all shadow-2xs ${
                    draggedProjectIndex === index ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-[#E5E5E5]/60 dark:border-[#26262a]/60 pb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <button
                        type="button"
                        draggable
                        onDragStart={(event) => {
                          event.dataTransfer.effectAllowed = "move";
                          event.dataTransfer.setData("text/plain", String(index));
                          setDraggedProjectIndex(index);
                        }}
                        onDragEnd={() => setDraggedProjectIndex(null)}
                        title="Drag to reorder project"
                        aria-label={`Drag ${project.title || "project"} to reorder`}
                        className="touch-none cursor-grab active:cursor-grabbing text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] p-1"
                      >
                        <GripVertical size={16} />
                      </button>
                      <span className="font-mono text-[10px] text-[#5e5e5e] dark:text-[#9e9ea6] w-5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-serif text-base font-semibold lowercase text-[#1a1c1c] dark:text-[#f0f0f2]">
                        {project.title || "untitled-project"}
                      </span>
                      <span className="font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6]">
                        // {project.codeIndex || "runtime engine"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveProject(index, index - 1)}
                        disabled={index === 0}
                        aria-label={`Move ${project.title || "project"} up`}
                        title="Move up"
                        className="text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] disabled:opacity-30 p-1 transition-colors"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveProject(index, index + 1)}
                        disabled={index === data.projects.length - 1}
                        aria-label={`Move ${project.title || "project"} down`}
                        title="Move down"
                        className="text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-[#1a1c1c] dark:hover:text-[#f0f0f2] disabled:opacity-30 p-1 transition-colors"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = data.projects.filter((_, i) => i !== index);
                          setData({ ...data, projects: updated });
                        }}
                        title="Remove project"
                        aria-label={`Remove ${project.title || "project"}`}
                        className="text-[#5e5e5e] dark:text-[#9e9ea6] hover:text-red-600 dark:hover:text-red-400 p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">title (lowercase slug)</label>
                      <input
                        type="text"
                        value={project.title}
                        placeholder="jarvis-assistant"
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[index].title = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono font-medium text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">category / classification tag</label>
                      <input
                        type="text"
                        value={project.codeIndex || project.category || ""}
                        placeholder="multimodal agent"
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[index].codeIndex = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">description</label>
                      <textarea
                        rows={2}
                        value={project.description}
                        placeholder="multimodal ai desktop companion that lives on screen..."
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[index].description = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-sans text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">tech stack</label>
                      <input
                        type="text"
                        value={project.techStack}
                        placeholder="TypeScript, LangGraph, Electron, Next.js"
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[index].techStack = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">benchmark metric</label>
                      <input
                        type="text"
                        value={project.metric}
                        placeholder="sub-50ms"
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[index].metric = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">metric sub / context</label>
                      <input
                        type="text"
                        value={project.metricSub}
                        placeholder="agent loop"
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[index].metricSub = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">github repository url</label>
                      <input
                        type="text"
                        value={project.github}
                        placeholder="https://github.com/..."
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[index].github = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">live demo url (optional)</label>
                      <input
                        type="text"
                        value={project.live || ""}
                        placeholder="https://..."
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[index].live = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3 py-2 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: GITHUB ACTIVITY                                    */}
        {/* ========================================================= */}
        {activeTab === "activity" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal lowercase tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2]">
                github &amp; upstream commits
              </h2>
              <p className="text-sm font-sans text-[#5e5e5e] dark:text-[#9e9ea6]">
                live upstream commits are automatically queried across public repositories.
              </p>
            </div>

            <div className="bg-white dark:bg-[#141416] border border-[#E5E5E5] dark:border-[#26262a] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[#5e5e5e] dark:text-[#9e9ea6]">connected account:</span>
                <span className="font-semibold text-[#1a1c1c] dark:text-[#f0f0f2]">
                  {data.profile.socials?.github || "not configured"}
                </span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                    activity status badge (e.g. active development)
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
                    className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3.5 py-2.5 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                      custom commits display (leave blank for live count)
                    </label>
                    <input
                      type="text"
                      value={data.githubActivity?.customCommits || ""}
                      placeholder="e.g. 500+"
                      onChange={(e) =>
                        setData({
                          ...data,
                          githubActivity: {
                            ...(data.githubActivity || {}),
                            customCommits: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3.5 py-2.5 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">
                      custom prs merged (leave blank for live count)
                    </label>
                    <input
                      type="text"
                      value={data.githubActivity?.customPrs || ""}
                      placeholder="e.g. 42"
                      onChange={(e) =>
                        setData({
                          ...data,
                          githubActivity: {
                            ...(data.githubActivity || {}),
                            customPrs: e.target.value,
                          },
                        })
                      }
                      className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3.5 py-2.5 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: SECURITY & ACCESS                                 */}
        {/* ========================================================= */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal lowercase tracking-tight text-[#1a1c1c] dark:text-[#f0f0f2]">
                security &amp; access
              </h2>
              <p className="text-sm font-sans text-[#5e5e5e] dark:text-[#9e9ea6]">
                manage cms administrator credentials.
              </p>
            </div>

            <div className="bg-white dark:bg-[#141416] border border-[#E5E5E5] dark:border-[#26262a] rounded-xl p-6 sm:p-8 shadow-2xs">
              {/* Password Change Form */}
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-medium text-[#1a1c1c] dark:text-[#f0f0f2] lowercase">
                  <Key size={14} />
                  <span>update administrator password</span>
                </div>

                {passwordStatus && (
                  <div
                    className={`p-3 rounded-lg text-xs font-mono flex items-center gap-2 border ${
                      passwordStatus.type === "success"
                        ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300"
                        : "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300"
                    }`}
                  >
                    {passwordStatus.type === "success" ? (
                      <CheckCircle2 size={15} />
                    ) : (
                      <AlertCircle size={15} />
                    )}
                    <span>{passwordStatus.text}</span>
                  </div>
                )}

                <div className="space-y-3 font-mono text-xs">
                  <div className="space-y-1">
                    <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">current password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3.5 py-2.5 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">new password (min 8 chars)</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3.5 py-2.5 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[#5e5e5e] dark:text-[#9e9ea6] lowercase block">confirm new password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••••••"
                        required
                        className="w-full bg-[#f9f9f9] dark:bg-[#19191c] border border-[#E5E5E5] dark:border-[#26262a] px-3.5 py-2.5 rounded-lg text-xs font-mono text-[#1a1c1c] dark:text-[#f0f0f2] focus:outline-none focus:border-black dark:focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1c1c] dark:bg-[#f0f0f2] hover:bg-black dark:hover:bg-white text-[#f9f9f9] dark:text-[#0d0d0e] font-mono text-xs font-medium cursor-pointer transition-colors shadow-2xs disabled:opacity-50"
                    >
                      <ShieldCheck size={14} />
                      <span>{passwordSaving ? "updating password..." : "update password"}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-6 py-10 border-t border-[#E5E5E5]/60 dark:border-[#26262a]/60 text-center font-mono text-xs text-[#5e5e5e] dark:text-[#9e9ea6] lowercase">
        <span>portfolio cms // minimal editorial editor // © {new Date().getFullYear()}</span>
      </footer>

    </div>
  );
}
