"use client";

import type { IFlagshipDossier } from "../../models/Portfolio";
import { flagshipDossier as defaultDossier } from "../../data/content";
import CharFadeText from "../ui/CharFadeText";
import Reveal from "../ui/Reveal";
import TokenDecodingScrub from "../ui/TokenDecodingScrub";
import TelemetryCounter from "../ui/TelemetryCounter";
import HairlineDivider from "../ui/HairlineDivider";
import ArchitecturePipeline from "../ui/ArchitecturePipeline";

interface DossierProps {
  dossier?: IFlagshipDossier;
}

export default function ProjectDossier({ dossier = defaultDossier }: DossierProps) {
  return (
    <section className="border-b border-[#E2E0D8] bg-[#F4F3EF]" data-purpose="project-dossier" id="project-spec">
      {/* Header bar */}
      <div className="px-5 sm:px-8 py-4 sm:py-5 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#6E6D68]">{dossier.sectionIndex}</span>
          <CharFadeText
            as="h3"
            className="font-mono text-xs uppercase tracking-widest text-[#111111] font-medium inline-block"
          >
            {`ARCHITECTURAL DOSSIER // ${dossier.title}`}
          </CharFadeText>
        </div>
        <span className="font-mono text-[10px] text-[#6E6D68] uppercase tracking-wider">
          {dossier.category}
        </span>
      </div>

      <HairlineDivider leftLabel="04.1" rightLabel="SPEC_ENGINE" />

      {/* Live Token Stream & Decoding Timeline (Speculative Decoding Scrub) */}
      <TokenDecodingScrub />

      {/* Dossier Body */}
      <div className="p-5 sm:p-8 md:p-12 lg:p-16">
        <Reveal className="max-w-3xl space-y-6">
          <div className="font-mono text-xs text-[#6E6D68] uppercase tracking-widest">
            {dossier.subtitle}
          </div>

          <CharFadeText
            as="h2"
            className="text-3xl md:text-5xl font-display font-normal text-[#111111] tracking-tight block"
          >
            {dossier.title}
          </CharFadeText>

          <CharFadeText
            as="p"
            className="text-base text-[#111111] leading-relaxed block"
          >
            {dossier.description}
          </CharFadeText>

          {/* Metric Specifications with TelemetryCounter Interpolation */}
          <div className="flex flex-wrap items-center gap-8 pt-4 font-mono text-sm">
            {dossier.metrics.map((spec) => (
              <div key={spec.label} className="space-y-0.5">
                <div className="text-[10px] text-[#6E6D68] uppercase">{spec.label}</div>
                <div className="font-medium text-[#111111]">
                  <TelemetryCounter value={spec.value} />
                </div>
              </div>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-6 pt-6 font-mono text-xs">
            {dossier.github && (
              <a
                className="text-[#111111] hover:text-[#2563EB] underline underline-offset-4 decoration-[#D8D6CE] transition-colors"
                href={dossier.github}
                rel="noreferrer"
                target="_blank"
              >
                Code Repository ↗
              </a>
            )}
            {dossier.live && (
              <a
                className="text-[#111111] hover:text-[#2563EB] underline underline-offset-4 decoration-[#D8D6CE] transition-colors"
                href={dossier.live}
                rel="noreferrer"
                target="_blank"
              >
                Live Production Demo ↗
              </a>
            )}
          </div>

          {/* Interactive Systems Architecture Pipeline (Toggleable via Admin) */}
          {dossier?.showArchitecturePipeline && <ArchitecturePipeline />}
        </Reveal>
      </div>
    </section>
  );
}
