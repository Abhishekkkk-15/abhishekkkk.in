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
} from "lucide-react";
import type { IPortfolioData } from "@/models/Portfolio";

type TabKey =
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
                  <label className="text-[#6E6D68] uppercase">
                    Japanese Subtitle Translation
                  </label>
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
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Technical Capabilities (05 //)
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Manage core technology categories and skill tags.
                </p>
              </div>

              <div className="space-y-6">
                {data.skillMatrix.map((matrix, index) => (
                  <div
                    key={index}
                    className="p-5 border border-[#E2E0D8] bg-[#EBEAE4]/40 space-y-3 rounded-none"
                  >
                    <div className="font-mono text-xs">
                      <label className="text-[#6E6D68] uppercase">
                        Category 0{index + 1}
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
                ))}
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
                <div className="pt-1">
                  <a
                    href="/api/spotify/login"
                    className="inline-flex items-center gap-2 bg-[#111111] text-[#F4F3EF] hover:bg-[#2563EB] px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Authenticate Spotify Account ↗</span>
                  </a>
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
