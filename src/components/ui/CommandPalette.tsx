"use client";

import { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Moon,
  Sun,
  Mail,
  Github,
  Linkedin,
  Radio,
  FileCode,
  Layers,
  Briefcase,
  Terminal,
  Send,
  CornerDownLeft,
  X,
  Lock,
} from "lucide-react";

interface CommandItem {
  id: string;
  category: "NAVIGATION" | "ACTIONS" | "SOCIAL";
  label: string;
  sublabel?: string;
  icon: any;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener for ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen for custom open event
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener("open-command-palette", handleOpen);
    return () => window.removeEventListener("open-command-palette", handleOpen);
  }, []);

  // Reset search and selection on open
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setOpen(false);
  };

  const jumpTo = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = useMemo(
    () => [
      {
        id: "theme",
        category: "ACTIONS",
        label: "Toggle Sumi Dark Mode",
        sublabel: "Invert paper and sumi ink palette",
        icon: Moon,
        action: toggleTheme,
        shortcut: "⌘T",
      },
      {
        id: "copy-email",
        category: "ACTIONS",
        label: "Copy Direct Email",
        sublabel: "abhishekjangid3489@gmail.com",
        icon: Mail,
        action: () => {
          navigator.clipboard.writeText("abhishekjangid3489@gmail.com");
          setOpen(false);
        },
      },
      {
        id: "hero",
        category: "NAVIGATION",
        label: "00 // Hero Statement & Identity",
        icon: Terminal,
        action: () => jumpTo("hero"),
      },
      {
        id: "focus",
        category: "NAVIGATION",
        label: "01 // Architectural Focus",
        sublabel: "Multi-Agent Systems & Distributed CD",
        icon: Layers,
        action: () => jumpTo("focus"),
      },
      {
        id: "experience",
        category: "NAVIGATION",
        label: "02 // Career Experience",
        sublabel: "Adiyogi Technosoft & Autonomous Systems Lab",
        icon: Briefcase,
        action: () => jumpTo("experience"),
      },
      {
        id: "projects",
        category: "NAVIGATION",
        label: "03 // Selected Projects",
        sublabel: "Jarvis, Infra-CD, Eden, CollabFlow",
        icon: FileCode,
        action: () => jumpTo("projects"),
      },
      {
        id: "project-spec",
        category: "NAVIGATION",
        label: "04 // Jarvis Assistant Dossier",
        sublabel: "Multimodal Runtime & Speculative Decoding",
        icon: Radio,
        action: () => jumpTo("project-spec"),
      },
      {
        id: "skills",
        category: "NAVIGATION",
        label: "05 // Technical Capabilities Matrix",
        sublabel: "Go, Rust, TypeScript, LangGraph, pgvector",
        icon: Terminal,
        action: () => jumpTo("skills"),
      },
      {
        id: "contact",
        category: "NAVIGATION",
        label: "06 // Contact & Colophon",
        sublabel: "Availability, Location & Spotify Telemetry",
        icon: Send,
        action: () => jumpTo("contact"),
      },
      {
        id: "github",
        category: "SOCIAL",
        label: "GitHub Profile",
        sublabel: "github.com/abhishekkkk-15",
        icon: Github,
        action: () => {
          window.open("https://github.com/abhishekkkk-15", "_blank");
          setOpen(false);
        },
      },
      {
        id: "linkedin",
        category: "SOCIAL",
        label: "LinkedIn Profile",
        sublabel: "abhishek-jangid",
        icon: Linkedin,
        action: () => {
          window.open(
            "https://www.linkedin.com/in/abhishek-jangid-3532b1323",
            "_blank"
          );
          setOpen(false);
        },
      },
      {
        id: "admin",
        category: "ACTIONS",
        label: "CMS Admin Portal",
        sublabel: "Manage and edit portfolio state",
        icon: Lock,
        action: () => {
          window.location.href = "/admin/editor";
          setOpen(false);
        },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const lower = query.toLowerCase();
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(lower) ||
        c.sublabel?.toLowerCase().includes(lower) ||
        c.category.toLowerCase().includes(lower)
    );
  }, [commands, query]);

  // Handle arrow key navigation inside search results
  useEffect(() => {
    const handleKeyNav = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length)
        );
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [open, filtered, selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-[#111111]/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#F4F3EF] border border-[#E2E0D8] shadow-2xl overflow-hidden font-mono text-xs z-10"
          >
            {/* Top Search Input Strip */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E2E0D8] bg-[#EBEAE4]/40">
              <Search size={15} className="text-[#6E6D68] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or jump to section..."
                autoFocus
                className="w-full bg-transparent text-[#111111] placeholder-[#6E6D68] focus:outline-none font-mono text-xs"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-[#6E6D68] hover:text-[#111111] p-1"
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[340px] overflow-y-auto p-2 divide-y divide-[#E2E0D8]/40">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-[#6E6D68]">
                  No matching telemetry commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = selectedIndex === idx;

                  return (
                    <button
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-3 transition-colors ${
                        isSelected
                          ? "bg-[#111111] text-[#F4F3EF]"
                          : "text-[#444442] hover:bg-[#EBEAE4] hover:text-[#111111]"
                      }`}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <Icon
                          size={14}
                          className={
                            isSelected ? "text-[#F4F3EF]" : "text-[#6E6D68]"
                          }
                        />
                        <div className="truncate">
                          <div className="font-medium truncate">{item.label}</div>
                          {item.sublabel && (
                            <div
                              className={`text-[10px] truncate ${
                                isSelected ? "text-[#D8D6CE]" : "text-[#6E6D68]"
                              }`}
                            >
                              {item.sublabel}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.shortcut && (
                          <span
                            className={`px-1.5 py-0.5 text-[9.5px] border ${
                              isSelected
                                ? "border-[#D8D6CE] text-[#F4F3EF]"
                                : "border-[#E2E0D8] text-[#6E6D68] bg-[#EBEAE4]/40"
                            }`}
                          >
                            {item.shortcut}
                          </span>
                        )}
                        {isSelected && (
                          <CornerDownLeft
                            size={12}
                            className="text-[#F4F3EF] opacity-80"
                          />
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2 border-t border-[#E2E0D8] bg-[#EBEAE4]/30 flex items-center justify-between text-[10px] text-[#6E6D68]">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="border border-[#E2E0D8] px-1 py-0.2 bg-[#F4F3EF]">
                    ↑↓
                  </kbd>{" "}
                  Navigate
                </span>
                <span>
                  <kbd className="border border-[#E2E0D8] px-1 py-0.2 bg-[#F4F3EF]">
                    ↵
                  </kbd>{" "}
                  Select
                </span>
                <span>
                  <kbd className="border border-[#E2E0D8] px-1 py-0.2 bg-[#F4F3EF]">
                    ESC
                  </kbd>{" "}
                  Close
                </span>
              </div>
              <span className="text-[#2563EB]">COMMAND_PALETTE // V1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
