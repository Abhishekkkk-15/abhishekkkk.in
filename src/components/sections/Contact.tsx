import { useState } from "react";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { contact, profile } from "../../data/content";
import Reveal from "../ui/Reveal";
import SectionHeader from "../ui/SectionHeader";
import Sketch from "../ui/Sketch";
import HandCircle from "../ui/HandCircle";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
};

const links: ContactLink[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "Abhishek Jangid",
    href: profile.socials.linkedin,
    icon: Linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "View my projects",
    href: profile.socials.github,
    icon: Github,
    external: true,
  },
];

export default function Contact() {
  const [ctaSettled, setCtaSettled] = useState(false);

  return (
    <section id="contact" className="relative bg-white py-28 md:py-40">
      <div className="section-container text-center">
        <SectionHeader
          index="06"
          title={contact.title}
          description={contact.description}
          align="center"
        />

        <Reveal delay={0.2}>
          <div className="mt-16 grid gap-4 sm:grid-cols-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
                className="group rounded-2xl border border-black/10 p-8 transition-all hover:border-black hover:bg-black hover:text-white"
              >
                <div className="relative mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center">
                  <HandCircle className="text-black/20 group-hover:text-white/30" />
                  <link.icon size={22} className="relative z-10" />
                </div>
                <h3 className="text-base font-semibold">{link.label}</h3>
                <p className="mt-1 text-sm font-light opacity-60 group-hover:opacity-90">
                  {link.value}
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3} onAnimationComplete={() => setCtaSettled(true)}>
          <div className="mt-16">
            <p className="mb-6 font-light text-black/60">
              Ready to start your{" "}
              <Sketch type="underline" color="#0a0a0a" enabled={ctaSettled}>
                next project
              </Sketch>
              ?
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
            >
              Get In Touch <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
