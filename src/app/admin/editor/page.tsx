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
  Terminal,
  Send,
} from "lucide-react";
import type { IPortfolioData } from "@/models/Portfolio";

type TabKey =
  | "profile"
  | "focus"
  | "experience"
  | "projects"
  | "dossier"
  | "skills"
  | "contact";

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
      } catch (err: any) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center font-mono text-xs text-[#8a8883]">
        INITIALIZING CMS DATA STORE...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#faf9f5] flex items-center justify-center font-mono text-xs text-red-600">
        Failed to initialize portfolio document.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f5] text-[#111111] font-sans selection:bg-[#111111] selection:text-[#faf9f5]">
      {/* Top Admin Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#faf9f5]/95 backdrop-blur-sm border-b border-[#e2e0d8] px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-display font-medium text-base tracking-tight text-[#111111]">
            {data.profile.labBrand || "PORTFOLIO"} // CMS
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-wider bg-[#0051d5]/10 text-[#0051d5] border border-[#0051d5]/20 px-2 py-0.5 rounded-sm">
            SSR Mongo Connected
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[#555452] hover:text-[#111111] flex items-center gap-1 transition-colors px-3 py-1.5 border border-[#e2e0d8] rounded-sm hover:border-[#111111]"
          >
            Live Site <ExternalLink size={13} />
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="font-mono text-xs uppercase tracking-wider bg-[#111111] text-[#faf9f5] hover:bg-[#0051d5] px-4 py-1.5 flex items-center gap-2 transition-colors disabled:opacity-50 rounded-sm"
          >
            <Save size={14} />
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={handleLogout}
            title="Log Out"
            className="text-[#8a8883] hover:text-[#111111] p-1.5 transition-colors border border-transparent hover:border-[#e2e0d8] rounded-sm"
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
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row border-x border-[#e2e0d8] min-h-[calc(100vh-60px)]">
        {/* Left Side Tab Navigation */}
        <nav className="w-full md:w-64 border-b md:border-b-0 md:border-r border-[#e2e0d8] bg-[#f7f6f0]/60 p-4 space-y-1 font-mono text-xs uppercase tracking-wider shrink-0">
          <div className="text-[10px] text-[#8a8883] px-3 py-2">SECTIONS</div>

          {[
            { id: "profile", label: "01 // Profile & Hero", icon: User },
            { id: "focus", label: "02 // Arch Focus", icon: Layers },
            { id: "experience", label: "03 // Experience", icon: Briefcase },
            { id: "projects", label: "04 // Projects", icon: FolderGit2 },
            { id: "dossier", label: "04.1 // Deep Dive", icon: FileCode },
            { id: "skills", label: "05 // Skills & Stack", icon: Terminal },
            { id: "contact", label: "06 // Contact & Colophon", icon: Send },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`w-full text-left px-3.5 py-2.5 rounded-sm flex items-center gap-2.5 transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#111111] text-[#faf9f5]"
                    : "text-[#555452] hover:text-[#111111] hover:bg-[#efeeea]"
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side Tab Form Content */}
        <main className="flex-1 p-6 sm:p-10 bg-[#faf9f5]">
          {/* TAB 1: PROFILE & HERO */}
          {activeTab === "profile" && (
            <div className="space-y-8 max-w-3xl">
              <div className="border-b border-[#e2e0d8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Profile &amp; Hero Section
                </h2>
                <p className="font-mono text-xs text-[#8a8883] mt-1">
                  Manage primary identity, avatars, headline statements, and live telemetry badges.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
                <div className="space-y-1.5">
                  <label className="text-[#8a8883] uppercase">Full Name</label>
                  <input
                    type="text"
                    value={data.profile.name}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, name: e.target.value },
                      })
                    }
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#8a8883] uppercase">Short Brand / Logo</label>
                  <input
                    type="text"
                    value={data.profile.labBrand}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, labBrand: e.target.value },
                      })
                    }
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#8a8883] uppercase">Professional Role</label>
                  <input
                    type="text"
                    value={data.profile.role}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, role: e.target.value },
                      })
                    }
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#8a8883] uppercase">Location</label>
                  <input
                    type="text"
                    value={data.profile.location}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, location: e.target.value },
                      })
                    }
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#8a8883] uppercase">Avatar Image URL</label>
                  <input
                    type="text"
                    value={data.profile.avatar}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, avatar: e.target.value },
                      })
                    }
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#8a8883] uppercase">
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#8a8883] uppercase">
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              {/* Telemetry Stats Bar Section */}
              <div className="pt-6 border-t border-[#e2e0d8]">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#111111] mb-4">
                  Telemetry Stats Bar
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[#8a8883]">Throughput Label</label>
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
                      className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs focus:outline-none"
                    />
                    <label className="text-[#8a8883] pt-1 block">Value &amp; Unit</label>
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
                        className="w-2/3 bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs focus:outline-none"
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
                        className="w-1/3 bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#8a8883]">Core Engines Label</label>
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
                      className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs focus:outline-none"
                    />
                    <label className="text-[#8a8883] pt-1 block">Core Engines Value</label>
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
                      className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[#8a8883]">Status Label</label>
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
                      className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs focus:outline-none"
                    />
                    <label className="text-[#8a8883] pt-1 block">Status Value</label>
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
                      className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARCHITECTURAL FOCUS */}
          {activeTab === "focus" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#e2e0d8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Architectural Focus (02 //)
                </h2>
                <p className="font-mono text-xs text-[#8a8883] mt-1">
                  Configure the 3 core competency pillars.
                </p>
              </div>

              <div className="space-y-6">
                {data.architecturalFocus.map((focus, index) => (
                  <div
                    key={index}
                    className="p-5 border border-[#e2e0d8] bg-[#f7f6f0]/40 space-y-4"
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
                        className="w-16 bg-[#f2f0ea] border border-[#e2e0d8] px-2 py-1 text-xs text-center"
                      />
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[#8a8883]">Pillar Title</label>
                      <input
                        type="text"
                        value={focus.title}
                        onChange={(e) => {
                          const updated = [...data.architecturalFocus];
                          updated[index].title = e.target.value;
                          setData({ ...data, architecturalFocus: updated });
                        }}
                        className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-2 text-sm font-sans focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1 font-mono text-xs">
                      <label className="text-[#8a8883]">Description</label>
                      <textarea
                        rows={3}
                        value={focus.description}
                        onChange={(e) => {
                          const updated = [...data.architecturalFocus];
                          updated[index].description = e.target.value;
                          setData({ ...data, architecturalFocus: updated });
                        }}
                        className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-2 text-sm font-sans focus:outline-none"
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
              <div className="border-b border-[#e2e0d8] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-medium text-[#111111]">
                    Experience Timeline (03 //)
                  </h2>
                  <p className="font-mono text-xs text-[#8a8883] mt-1">
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
                  className="font-mono text-xs bg-[#111111] text-[#faf9f5] px-3 py-1.5 flex items-center gap-1.5 rounded-sm hover:bg-[#0051d5] transition-colors"
                >
                  <Plus size={13} /> Add Role
                </button>
              </div>

              <div className="space-y-6">
                {data.experience.map((item, index) => (
                  <div
                    key={index}
                    className="p-5 border border-[#e2e0d8] bg-[#f7f6f0]/40 space-y-4 relative"
                  >
                    <button
                      onClick={() => {
                        const updated = data.experience.filter((_, i) => i !== index);
                        setData({ ...data, experience: updated });
                      }}
                      title="Remove Role"
                      className="absolute right-4 top-4 text-[#8a8883] hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div>
                        <label className="text-[#8a8883]">Period</label>
                        <input
                          type="text"
                          value={item.period}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].period = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[#8a8883]">Location / Office</label>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].location = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[#8a8883]">Role Title</label>
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].role = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[#8a8883]">Company Name</label>
                        <input
                          type="text"
                          value={item.company}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].company = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[#8a8883]">Description</label>
                        <textarea
                          rows={2}
                          value={item.description}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].description = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs font-sans"
                        />
                      </div>
                      <div>
                        <label className="text-[#8a8883]">Right Metric Title</label>
                        <input
                          type="text"
                          value={item.metric}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].metric = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[#8a8883]">Right Metric Sub</label>
                        <input
                          type="text"
                          value={item.metricSub}
                          onChange={(e) => {
                            const updated = [...data.experience];
                            updated[index].metricSub = e.target.value;
                            setData({ ...data, experience: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[#8a8883]">
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
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
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
              <div className="border-b border-[#e2e0d8] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-medium text-[#111111]">
                    Selected Projects (04 //)
                  </h2>
                  <p className="font-mono text-xs text-[#8a8883] mt-1">
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
                  className="font-mono text-xs bg-[#111111] text-[#faf9f5] px-3 py-1.5 flex items-center gap-1.5 rounded-sm hover:bg-[#0051d5] transition-colors"
                >
                  <Plus size={13} /> Add Project
                </button>
              </div>

              <div className="space-y-6">
                {data.projects.map((project, index) => (
                  <div
                    key={index}
                    className="p-5 border border-[#e2e0d8] bg-[#f7f6f0]/40 space-y-4 relative"
                  >
                    <button
                      onClick={() => {
                        const updated = data.projects.filter((_, i) => i !== index);
                        setData({ ...data, projects: updated });
                      }}
                      title="Remove Project"
                      className="absolute right-4 top-4 text-[#8a8883] hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                      <div>
                        <label className="text-[#8a8883]">Code Index</label>
                        <input
                          type="text"
                          value={project.codeIndex}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].codeIndex = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[#8a8883]">Title</label>
                        <input
                          type="text"
                          value={project.title}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].title = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <label className="text-[#8a8883]">Version &amp; Status</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={project.version}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[index].version = e.target.value;
                              setData({ ...data, projects: updated });
                            }}
                            className="w-1/2 bg-[#f2f0ea] border border-[#e2e0d8] px-2 py-1.5 text-xs"
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
                            className="w-1/2 bg-[#f2f0ea] border border-[#e2e0d8] px-2 py-1.5 text-xs"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[#8a8883]">Tech Stack Summary</label>
                        <input
                          type="text"
                          value={project.techStack}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].techStack = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="text-[#8a8883]">Project Description</label>
                        <textarea
                          rows={2}
                          value={project.description}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].description = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs font-sans"
                        />
                      </div>

                      <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[#8a8883]">GitHub URL</label>
                          <input
                            type="text"
                            value={project.github}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[index].github = e.target.value;
                              setData({ ...data, projects: updated });
                            }}
                            className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[#8a8883]">Live Demo URL</label>
                          <input
                            type="text"
                            value={project.live || ""}
                            onChange={(e) => {
                              const updated = [...data.projects];
                              updated[index].live = e.target.value;
                              setData({ ...data, projects: updated });
                            }}
                            className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[#8a8883]">Metric Highlight</label>
                        <input
                          type="text"
                          value={project.metric}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].metric = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[#8a8883]">Metric Subtext</label>
                        <input
                          type="text"
                          value={project.metricSub}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].metricSub = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
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
              <div className="border-b border-[#e2e0d8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Flagship Architectural Dossier (04.1 //)
                </h2>
                <p className="font-mono text-xs text-[#8a8883] mt-1">
                  Configure the deep-dive technical showcase for your flagship system.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-[#8a8883]">Dossier Title</label>
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-2 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="text-[#8a8883]">Subtitle Tag</label>
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-2 text-sm font-sans"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[#8a8883]">Deep Dive Architecture Summary</label>
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-2 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="text-[#8a8883]">GitHub Code Target</label>
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[#8a8883]">Live Target</label>
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#e2e0d8] space-y-3 font-mono text-xs">
                <label className="text-[#8a8883] block uppercase tracking-wider">
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
                      className="w-1/3 bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
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
                      className="w-2/3 bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SKILLS & INFRASTRUCTURE */}
          {activeTab === "skills" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#e2e0d8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Technical Capabilities (05 //)
                </h2>
                <p className="font-mono text-xs text-[#8a8883] mt-1">
                  Manage core technology categories and skill tags.
                </p>
              </div>

              <div className="space-y-6">
                {data.skillMatrix.map((matrix, index) => (
                  <div
                    key={index}
                    className="p-5 border border-[#e2e0d8] bg-[#f7f6f0]/40 space-y-3"
                  >
                    <div className="font-mono text-xs">
                      <label className="text-[#8a8883] uppercase">
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
                        className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-sm font-sans focus:outline-none mt-1"
                      />
                    </div>
                    <div className="font-mono text-xs">
                      <label className="text-[#8a8883] uppercase">
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
                        className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-2 text-sm font-sans focus:outline-none mt-1"
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
              <div className="border-b border-[#e2e0d8] pb-4">
                <h2 className="text-2xl font-display font-medium text-[#111111]">
                  Contact &amp; Availability (06 //)
                </h2>
                <p className="font-mono text-xs text-[#8a8883] mt-1">
                  Configure location details, direct links, and open-to-work status.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-[#8a8883] uppercase">
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-2 text-sm font-sans focus:outline-none mt-1"
                  />
                </div>

                <div>
                  <label className="text-[#8a8883] uppercase">
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
                    className="w-full bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-2 text-sm font-sans focus:outline-none mt-1"
                  />
                </div>

                <div className="pt-4 border-t border-[#e2e0d8]">
                  <label className="text-[#8a8883] uppercase block mb-3">
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
                        className="w-1/2 bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
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
                        className="w-1/2 bg-[#f2f0ea] border border-[#e2e0d8] px-3 py-1.5 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
