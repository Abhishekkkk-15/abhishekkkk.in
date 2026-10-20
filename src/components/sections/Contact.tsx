import type { IContactInfo, IProfile } from "../../models/Portfolio";
import {
  contactInfo as defaultContact,
  profile as defaultProfile,
} from "../../data/content";
import Reveal from "../ui/Reveal";

interface ContactProps {
  contactInfo?: IContactInfo;
  profile?: IProfile;
}

export default function Contact({
  contactInfo = defaultContact,
  profile = defaultProfile,
}: ContactProps) {
  const currentYear = new Date().getFullYear();

  return (
    <section className="p-8 md:p-14 bg-[#faf9f5]" data-purpose="contact-colophon" id="contact">
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-14 border-b border-[#e2e0d8]">
          {/* Location */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-[#8a8883] uppercase tracking-widest block">LOCATION</span>
            <p className="text-[#111111] leading-relaxed">
              {contactInfo.locationLines?.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>

          {/* Connect */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-[#8a8883] uppercase tracking-widest block">CONNECT</span>
            <div className="space-y-1.5">
              {contactInfo.connectLinks?.map((link) => (
                <div key={link.label}>
                  <a
                    className="text-[#111111] hover:text-[#0051d5] underline underline-offset-4 decoration-[#cbc8be] transition-colors"
                    href={link.href}
                    rel="noreferrer"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-[#8a8883] uppercase tracking-widest block">AVAILABILITY</span>
            <p className="text-[#555452] leading-relaxed">
              {contactInfo.availability}
            </p>
          </div>
        </div>

        {/* Footer Bar */}
        <footer className="pt-8 flex items-center justify-between text-xs font-mono text-[#8a8883] uppercase">
          <div>© {currentYear} {profile.labBrand || profile.name}</div>
          <div className="flex items-center gap-6">
            <a
              className="text-[#8a8883] hover:text-[#111111] transition-colors text-[11px]"
              href="/admin/editor"
            >
              [CMS / EDITOR]
            </a>
            <a
              className="hover:text-[#111111] transition-colors flex items-center gap-1"
              href="#hero"
            >
              ↑ TOP
            </a>
          </div>
        </footer>
      </Reveal>
    </section>
  );
}
