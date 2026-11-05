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
  Briefcase,
  FolderGit2,
  GitCommit,
  ShieldCheck,
  Key,
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

      setStatusMessage({
        type: "success",
        text: "Portfolio data successfully saved and published.",
      });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "An unexpected error occurred while saving.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({
        type: "error",
        text: "New passwords do not match.",
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
        text: "Admin password successfully updated.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordStatus(null), 4000);
    } catch (err: any) {
      setPasswordStatus({
        type: "error",
        text: err.message || "Failed to update password.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F3EF] flex flex-col items-center justify-center font-mono text-xs text-[#6E6D68]">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>AUTHENTICATING CMS SESSION...</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#F4F3EF] text-[#111111] antialiased">
      {/* Top Fixed Admin Header */}
      <header className="sticky top-0 z-40 bg-[#F4F3EF]/95 backdrop-blur border-b border-[#E2E0D8] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-widest font-bold text-[#111111]">
            CMS // MINIMAL PORTFOLIO
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] bg-black text-white px-2 py-0.5 uppercase tracking-wider">
            680px Mono
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-[#6E6D68] hover:text-[#111111] flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">View Site</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="font-mono text-xs uppercase tracking-wider bg-[#111111] text-[#F4F3EF] hover:bg-[#2563EB] disabled:opacity-50 px-4 py-2 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Save size={13} />
            <span>{saving ? "Saving..." : "Save Changes"}</span>
          </button>

          <button
            onClick={handleLogout}
            title="Log out of CMS"
            className="font-mono text-xs text-[#6E6D68] hover:text-red-600 p-2 transition-colors cursor-pointer"
          >
            <LogOut size={15} />
          </button>
        </div>
      </header>

      {/* Status Alert Banner */}
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
            { id: "profile", label: "01 // Profile & Bio", icon: User },
            { id: "experience", label: "02 // Trajectory", icon: Briefcase },
            { id: "projects", label: "03 // Projects & Engines", icon: FolderGit2 },
            { id: "activity", label: "04 // Upstream Commits", icon: GitCommit },
            { id: "security", label: "05 // Security & Access", icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`shrink-0 md:w-full text-left px-3.5 py-2.5 rounded-none flex items-center gap-2.5 transition-colors whitespace-nowrap cursor-pointer ${
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
          {/* TAB 1: PROFILE & BIO */}
          {activeTab === "profile" && (
            <div className="space-y-8 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-serif font-medium text-[#111111]">
                  Profile &amp; Editorial Bio
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Manage primary identity, bio statements, contact details, and social links.
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
                  <label className="text-[#6E6D68] uppercase">Short Name / Brandmark</label>
                  <input
                    type="text"
                    value={data.profile.shortName || "abhishek"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, shortName: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">
                    Headline Bio Statement
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
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-serif focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Tagline / Ethos</label>
                  <input
                    type="text"
                    value={data.profile.tagline || ""}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, tagline: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Contact Email</label>
                  <input
                    type="email"
                    value={data.profile.email}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, email: e.target.value },
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

                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">GitHub Profile URL</label>
                  <input
                    type="text"
                    value={data.profile.socials?.github || ""}
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
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">LinkedIn URL</label>
                  <input
                    type="text"
                    value={data.profile.socials?.linkedin || ""}
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
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Twitter / X URL</label>
                  <input
                    type="text"
                    value={data.profile.socials?.twitter || ""}
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
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">Resume Document URL</label>
                  <input
                    type="text"
                    value={data.profile.resumeUrl || "/resume.pdf"}
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, resumeUrl: e.target.value },
                      })
                    }
                    placeholder="/resume.pdf"
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5 pt-3 border-t border-[#E2E0D8]">
                  <label className="text-[#6E6D68] uppercase">
                    Ethos Bio Paragraph 1 (Work Cycle / Dossiers)
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
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[#6E6D68] uppercase">
                    Ethos Bio Paragraph 2 (Launch / Thrills)
                  </label>
                  <textarea
                    rows={2}
                    value={data.profile.bioParagraph2 || ""}
                    placeholder="i live the part after the launch day. when the reasoning breaks..."
                    onChange={(e) =>
                      setData({
                        ...data,
                        profile: { ...data.profile, bioParagraph2: e.target.value },
                      })
                    }
                    className="w-full bg-[#EBEAE4] border border-[#E2E0D8] text-[#111111] px-3.5 py-2 text-sm font-sans focus:outline-none focus:border-[#111111] rounded-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXPERIENCE / TRAJECTORY */}
          {activeTab === "experience" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-medium text-[#111111]">
                    Trajectory Timeline
                  </h2>
                  <p className="font-mono text-xs text-[#6E6D68] mt-1">
                    Manage continuous vertical timeline milestones, roles, and descriptions.
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
                          description: "Role overview and impact...",
                          metric: "Key Metric",
                          metricSub: "Sub-metric detail",
                          tags: ["TypeScript", "Next.js"],
                        },
                        ...data.experience,
                      ],
                    });
                  }}
                  className="font-mono text-xs bg-[#111111] text-[#F4F3EF] px-3 py-1.5 flex items-center gap-1.5 rounded-none hover:bg-[#2563EB] transition-colors cursor-pointer"
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
                      type="button"
                      onClick={() => {
                        const updated = data.experience.filter((_, i) => i !== index);
                        setData({ ...data, experience: updated });
                      }}
                      title="Remove Role"
                      className="absolute right-4 top-4 text-[#6E6D68] hover:text-red-600 transition-colors cursor-pointer"
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
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs font-semibold rounded-none"
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS / RUNTIMES */}
          {activeTab === "projects" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-serif font-medium text-[#111111]">
                    Projects &amp; Runtimes
                  </h2>
                  <p className="font-mono text-xs text-[#6E6D68] mt-1">
                    Manage core systems, repositories, demo links, and latency benchmarks.
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
                          description: "Architecture overview and operational details...",
                          techStack: "TypeScript · Next.js · Node.js",
                          tech: ["TypeScript", "Next.js"],
                          github: data.profile.socials?.github || "https://github.com/Abhishekkkk-15",
                          live: "",
                          metric: "< 20ms",
                          metricSub: "latency",
                        },
                        ...data.projects,
                      ],
                    });
                  }}
                  className="font-mono text-xs bg-[#111111] text-[#F4F3EF] px-3 py-1.5 flex items-center gap-1.5 rounded-none hover:bg-[#2563EB] transition-colors cursor-pointer"
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
                      type="button"
                      onClick={() => {
                        const updated = data.projects.filter((_, i) => i !== index);
                        setData({ ...data, projects: updated });
                      }}
                      title="Remove Project"
                      className="absolute right-4 top-4 text-[#6E6D68] hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
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
                        <label className="text-[#6E6D68]">Category / Code Tag</label>
                        <input
                          type="text"
                          value={project.codeIndex || project.category || ""}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].codeIndex = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          placeholder="e.g. multimodal agent or ai runtime"
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-[#6E6D68]">Description</label>
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

                      <div className="sm:col-span-2">
                        <label className="text-[#6E6D68]">Tech Stack</label>
                        <input
                          type="text"
                          value={project.techStack}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].techStack = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          placeholder="e.g. TypeScript, LangGraph, Electron"
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>

                      <div>
                        <label className="text-[#6E6D68]">Benchmark Metric</label>
                        <input
                          type="text"
                          value={project.metric}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].metric = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          placeholder="sub-50ms"
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                      <div>
                        <label className="text-[#6E6D68]">Metric Sub / Context</label>
                        <input
                          type="text"
                          value={project.metricSub}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].metricSub = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          placeholder="latency"
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>

                      <div>
                        <label className="text-[#6E6D68]">GitHub Repository URL</label>
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
                        <label className="text-[#6E6D68]">Live Demo URL (Optional)</label>
                        <input
                          type="text"
                          value={project.live || ""}
                          onChange={(e) => {
                            const updated = [...data.projects];
                            updated[index].live = e.target.value;
                            setData({ ...data, projects: updated });
                          }}
                          placeholder="https://..."
                          className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-1.5 text-xs rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GITHUB ACTIVITY */}
          {activeTab === "activity" && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-serif font-medium text-[#111111]">
                  GitHub &amp; Upstream Activity
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Connected to your GitHub account (
                  <span className="text-[#111111] font-semibold">
                    {data.profile.socials?.github || "Not configured"}
                  </span>
                  ). Real upstream commits and merged PRs are fetched dynamically via Next.js SSR.
                </p>
              </div>

              <div className="p-4 bg-[#EBEAE4]/40 border border-[#E2E0D8] space-y-4 font-mono text-xs">
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
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#6E6D68] block mb-1">
                      Custom PRs Merged (leave blank for live count)
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
                      className="w-full bg-[#EBEAE4] border border-[#E2E0D8] px-3 py-2 text-xs rounded-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & ACCESS */}
          {activeTab === "security" && (
            <div className="space-y-6 max-w-2xl">
              <div className="border-b border-[#E2E0D8] pb-4">
                <h2 className="text-2xl font-serif font-medium text-[#111111]">
                  Security &amp; Access Control
                </h2>
                <p className="font-mono text-xs text-[#6E6D68] mt-1">
                  Manage administrative credentials and security settings.
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
                      className="bg-[#111111] text-[#F4F3EF] hover:bg-[#2563EB] px-5 py-2 font-mono text-xs uppercase tracking-wider transition-colors disabled:opacity-50 rounded-none flex items-center gap-2 cursor-pointer"
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
