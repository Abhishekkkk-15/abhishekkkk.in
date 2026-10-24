"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CALIBRATION_STAGES = [
  { code: "01", label: "CALIBRATING ANALOG POTENTIOMETERS" },
  { code: "02", label: "COMPILING TENSORRT-LLM KERNEL BUFFERS" },
  { code: "03", label: "MOUNTING EVENT-DRIVEN BUS ROUTER" },
  { code: "04", label: "INITIALIZING PHOSPHOR LED TELEMETRY" },
  { code: "05", label: "HARDWARE READY // SIGNAL LOCKED" },
];

export default function IndustrialLoading() {
  const [stageIndex, setStageIndex] = useState(0);
  const [progress, setProgress] = useState(14);

  useEffect(() => {
    const stageInterval = setInterval(() => {
      setStageIndex((prev) => (prev < CALIBRATION_STAGES.length - 1 ? prev + 1 : prev));
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 98;
        const jump = Math.floor(Math.random() * 18) + 8;
        return Math.min(prev + jump, 98);
      });
    }, 240);

    return () => {
      clearInterval(stageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#E6E5DE] text-[#1C1B1A] font-mono select-none overflow-x-hidden justify-between">
      {/* Aluminum Top Bar */}
      <header className="w-full bg-[#E5E4DD] border-b-2 border-[#CAC8BD] px-6 h-14 sm:h-16 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[9px] text-[#78766C] font-bold">+</div>
          <div className="px-2 py-0.5 bg-[#1C1B1A] text-[#FF4F00] text-[10px] font-bold rounded-[3px]">
            FIELD CALIBRATION
          </div>
          <span className="text-xs font-bold text-[#1C1B1A] hidden sm:inline">
            // HARDWARE_BOOT_v4.2
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E676] animate-ping" />
          <span className="text-xs font-bold bg-[#1C1B1A] text-white px-2 py-0.5 rounded-[3px]">
            {progress}% HYDRATING
          </span>
        </div>
      </header>

      {/* Main Center Calibration Console */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 sm:p-12 max-w-2xl mx-auto w-full">
        <div className="w-full bg-[#EBE9E1] border-2 border-[#CAC8BD] rounded-[14px] p-6 sm:p-8 shadow-[0_6px_24px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)] relative space-y-6">
          {/* Corner Screws */}
          <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[7px] text-[#78766C] font-bold">+</div>
          <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border border-[#B5B3A6] bg-[#D7D5CB] flex items-center justify-center text-[7px] text-[#78766C] font-bold">+</div>

          {/* Stamped Model Header */}
          <div className="flex items-center justify-between border-b border-[#CCCABF] pb-3 text-xs">
            <span className="text-[#FF4F00] font-bold uppercase tracking-wider">
              UNIT: OP-2026 // SYSTEM BOOT
            </span>
            <span className="text-[#78766C]">STAGE: 0{stageIndex + 1}/05</span>
          </div>

          {/* Recessed Amber LCD Screen */}
          <div className="bg-[#141312] border-2 border-[#292825] rounded-[10px] p-5 shadow-inner text-[#FF4F00] space-y-4">
            <div className="flex items-center justify-between text-[10px] text-[#8C8A7E] border-b border-[#292825] pb-2">
              <span className="text-[#00E676] font-bold">STATE: BUS_LOCK</span>
              <span>SAMPLING: 96kHz</span>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] text-[#8C8A7E] uppercase block">ACTIVE SUBROUTINE</span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide h-7">
                {CALIBRATION_STAGES[stageIndex].label}
              </h2>
            </div>

            {/* VU Segmented Bar */}
            <div className="grid grid-cols-12 gap-1 h-2.5 pt-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full rounded-[1px] transition-all duration-200 ${
                    i < Math.floor((progress / 100) * 12) + 1
                      ? i > 9
                        ? "bg-[#FF3333]"
                        : i > 6
                        ? "bg-[#FFD000]"
                        : "bg-[#00E676]"
                      : "bg-[#252320]"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Precision Linear Hardware Progress Bar */}
          <div className="space-y-2">
            <div className="w-full h-3 bg-[#D5D3C9] rounded-[3px] border border-[#BCBAAD] p-0.5 overflow-hidden">
              <motion.div
                className="h-full bg-[#FF4F00] rounded-[2px]"
                initial={{ width: "10%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#78766C]">
              <span>CLOCK: 4.2 GHz</span>
              <span className="font-bold text-[#1C1B1A]">{progress}% CALIBRATED</span>
              <span>SYS_BUS: LOCKED</span>
            </div>
          </div>
        </div>
      </main>

      {/* Safety Stripe Bar */}
      <footer className="w-full h-3 border-t border-[#BCBAAD]"
        style={{
          backgroundImage: "repeating-linear-gradient(-45deg, #1C1B1A, #1C1B1A 10px, #FFD000 10px, #FFD000 20px)",
        }}
      />
    </div>
  );
}
