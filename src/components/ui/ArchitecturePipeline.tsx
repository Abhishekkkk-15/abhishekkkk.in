"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Cpu, Terminal, ArrowRight, Layers } from "lucide-react";

interface PipelineNode {
  id: string;
  step: string;
  label: string;
  subtitle: string;
  badge: string;
  details: {
    protocol: string;
    throughput: string;
    safetyCheck: string;
    description: string;
  };
  icon: typeof Activity;
}

const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "sensors",
    step: "01 // SENSORS",
    label: "MULTIMODAL SENSORY",
    subtitle: "Screen & Audio Capture",
    badge: "1080p @ 60fps",
    details: {
      protocol: "Native Electron Desktop IPC",
      throughput: "<12ms viewport frame capture",
      safetyCheck: "Hardware sandbox buffer isolation",
      description:
        "High-frequency screen viewport streaming coupled with local microphone voice audio chunking for continuous contextual awareness.",
    },
    icon: Activity,
  },
  {
    id: "graph",
    step: "02 // GRAPH",
    label: "LANGGRAPH ROUTER",
    subtitle: "Cyclical State DAG",
    badge: "State Machine",
    details: {
      protocol: "Dynamic State Graph Orchestrator",
      throughput: "Zero-copy context paging",
      safetyCheck: "Cyclic recursion depth limits",
      description:
        "Multi-agent intent classification and task routing using state machines with checkpointing, conditional branching, and fallback recovery.",
    },
    icon: Layers,
  },
  {
    id: "reasoning",
    step: "03 // INFERENCE",
    label: "COGNITIVE REASONING",
    subtitle: "Schema-Verified Tools",
    badge: "Zod / Function Call",
    details: {
      protocol: "OpenAI / Claude API Tool Specs",
      throughput: "P95 latency: 240ms",
      safetyCheck: "Runtime schema validation & sanitization",
      description:
        "Parallel model inference producing strictly typed JSON tool invocations with automated parameter verification before dispatch.",
    },
    icon: Cpu,
  },
  {
    id: "actuation",
    step: "04 // ACTUATION",
    label: "DESKTOP ACTUATION",
    subtitle: "OS Shell Execution",
    badge: "Guarded Execution",
    details: {
      protocol: "Sandboxed Child Process Dispatch",
      throughput: "Atomic command execution",
      safetyCheck: "Deterministic allowlist + human-in-the-loop",
      description:
        "Controlled desktop action execution including automated terminal commands, keystrokes, and application control with safety limits.",
    },
    icon: Terminal,
  },
];

export default function ArchitecturePipeline() {
  const [activeNode, setActiveNode] = useState<string>("graph");

  const selected = PIPELINE_NODES.find((n) => n.id === activeNode) || PIPELINE_NODES[0];

  return (
    <div className="w-full pt-8 font-mono select-none">
      {/* Header telemetry strip */}
      <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E2E0D8] dark:border-[#242422] text-[10px] uppercase tracking-wider text-[#6E6D68] gap-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
          <span className="text-[#111111] dark:text-[#F4F3EF] font-medium">
            SYSTEM ARCHITECTURE PIPELINE // INTERACTIVE SPEC
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>PIPELINE: 4 STAGES</span>
          <span className="text-[#A8A7A1]">|</span>
          <span className="text-[#2563EB]">LATENCY: DETERMINISTIC</span>
        </div>
      </div>

      {/* Pipeline Grid: 4 connected stages */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
        {PIPELINE_NODES.map((node, index) => {
          const isSelected = activeNode === node.id;
          const Icon = node.icon;

          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`relative text-left p-3.5 sm:p-4 border transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#EBEAE4] dark:bg-[#171716] border-[#111111] dark:border-[#F4F3EF] shadow-sm"
                  : "bg-[#F4F3EF] dark:bg-[#0D0D0C] border-[#E2E0D8] dark:border-[#242422] hover:border-[#8E8D88] hover:bg-[#EBEAE4]/40"
              }`}
            >
              {/* Top step number & status */}
              <div className="flex items-center justify-between text-[10px] text-[#6E6D68] pb-2 mb-2 border-b border-[#E2E0D8]/60 dark:border-[#242422]">
                <span>{node.step}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 uppercase ${
                    isSelected
                      ? "text-[#2563EB] font-medium bg-[#2563EB]/10"
                      : "text-[#8E8D88]"
                  }`}
                >
                  {node.badge}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-1.5 rounded-none shrink-0 ${
                    isSelected
                      ? "bg-[#2563EB] text-[#F4F3EF]"
                      : "bg-[#EBEAE4] dark:bg-[#1F1F1E] text-[#6E6D68]"
                  }`}
                >
                  <Icon size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-display font-medium text-[#111111] dark:text-[#F4F3EF] truncate">
                    {node.label}
                  </h4>
                  <p className="text-[10px] text-[#6E6D68] pt-0.5 truncate">
                    {node.subtitle}
                  </p>
                </div>
              </div>

              {/* Active selection accent line */}
              {isSelected && (
                <motion.div
                  layoutId="active-stage-line"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2563EB]"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Inspection Terminal View */}
      <div className="mt-3 p-4 sm:p-5 bg-[#EBEAE4]/60 dark:bg-[#171716] border border-[#E2E0D8] dark:border-[#242422] space-y-3">
        <div className="flex flex-wrap items-center justify-between text-[10.5px] border-b border-[#E2E0D8] dark:border-[#242422] pb-2 text-[#6E6D68]">
          <div className="flex items-center gap-2 text-[#111111] dark:text-[#F4F3EF]">
            <span className="text-[#2563EB] font-bold">&gt;&gt;</span>
            <span className="font-medium uppercase tracking-wider">
              STAGE INSPECTION: {selected.label}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span>PROTOCOL: <span className="text-[#111111] dark:text-[#F4F3EF]">{selected.details.protocol}</span></span>
          </div>
        </div>

        <p className="text-xs text-[#444442] dark:text-[#BDBBB5] leading-relaxed">
          {selected.details.description}
        </p>

        {/* Telemetry specs breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
          <div className="flex items-center gap-2 p-2 bg-[#F4F3EF] dark:bg-[#0D0D0C] border border-[#E2E0D8]/60 dark:border-[#242422]">
            <span className="text-[10px] text-[#6E6D68] uppercase">PERF:</span>
            <span className="text-[#111111] dark:text-[#F4F3EF] font-medium">
              {selected.details.throughput}
            </span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-[#F4F3EF] dark:bg-[#0D0D0C] border border-[#E2E0D8]/60 dark:border-[#242422]">
            <span className="text-[10px] text-[#6E6D68] uppercase">SAFETY:</span>
            <span className="text-[#2563EB] font-medium">
              {selected.details.safetyCheck}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
