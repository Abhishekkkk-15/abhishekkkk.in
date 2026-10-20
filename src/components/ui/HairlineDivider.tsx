"use client";

import { motion } from "framer-motion";

interface HairlineDividerProps {
  className?: string;
  crosshairs?: boolean;
  leftLabel?: string;
  rightLabel?: string;
}

export default function HairlineDivider({
  className = "",
  crosshairs = true,
  leftLabel,
  rightLabel,
}: HairlineDividerProps) {
  return (
    <div className={`relative w-full overflow-visible select-none ${className}`}>
      {/* Oscilloscope Hairline Draw Trace */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left" }}
        className="w-full h-[1px] bg-[#E2E0D8]"
      />

      {/* Coordinate Pins and Crosshairs */}
      {crosshairs && (
        <>
          <motion.span
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.5, duration: 0.3, ease: "easeOut" }}
            className="absolute -top-[7px] left-0 font-mono text-[9px] text-[#A8A7A1] leading-none pointer-events-none"
          >
            {leftLabel ? `+ [${leftLabel}]` : "+"}
          </motion.span>

          <motion.span
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
            className="absolute -top-[7px] right-0 font-mono text-[9px] text-[#A8A7A1] leading-none pointer-events-none"
          >
            {rightLabel ? `[${rightLabel}] +` : "+"}
          </motion.span>
        </>
      )}
    </div>
  );
}
