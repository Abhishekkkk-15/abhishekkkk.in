"use client";

import { motion } from "framer-motion";
import type { IProfile } from "@/models/Portfolio";

export default function PlayerZeroFooter({ profile }: { profile: IProfile }) {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full border-t border-[#e5e5e8] py-8 bg-[#f8f8f9] text-stone-500 text-xs"
      data-purpose="site-footer"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-stone-600">
            System Status: All inference clusters nominal
          </span>
        </div>
        <div className="flex items-center space-x-6 font-mono text-[11px]">
          {profile.socials?.github && (
            <a
              className="hover:text-black transition-colors"
              href={profile.socials.github}
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          )}
          {profile.socials?.linkedin && (
            <a
              className="hover:text-black transition-colors"
              href={profile.socials.linkedin}
              rel="noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          )}
          {profile.socials?.twitter && (
            <a
              className="hover:text-black transition-colors"
              href={profile.socials.twitter}
              rel="noreferrer"
              target="_blank"
            >
              X (Twitter)
            </a>
          )}
          <span className="text-stone-400">
            © {currentYear} {profile.name}
          </span>
        </div>
      </div>
    </motion.footer>
  );
}
