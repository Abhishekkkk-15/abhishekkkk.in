import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RoughNotation } from "react-rough-notation";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "../../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    setActiveHash(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-black/10 bg-white/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="section-container flex h-20 items-center justify-between">
        <a
          href="#home"
          onClick={() => handleLinkClick("#home")}
          className="font-hand text-3xl text-black"
        >
          {profile.shortName}
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`font-sans text-sm transition-colors ${
                  activeHash === link.href
                    ? "text-black"
                    : "text-black/45 hover:text-black"
                }`}
              >
                <RoughNotation
                  type="underline"
                  show={activeHash === link.href}
                  color="#0a0a0a"
                  strokeWidth={1.5}
                  animationDuration={500}
                  padding={2}
                >
                  {link.label}
                </RoughNotation>
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={() => handleLinkClick("#contact")}
          className="hidden rounded-full border border-black px-5 py-2 font-sans text-sm text-black transition-colors hover:bg-black hover:text-white md:inline-block"
        >
          Say hello
        </a>

        <button
          aria-label="Toggle menu"
          className="text-black md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-black/10 bg-white md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className="block py-3 text-2xl text-black"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
