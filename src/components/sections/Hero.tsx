import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "../../data/content";
import Sketch from "../ui/Sketch";

const taglineWords = profile.tagline.split(" · ");

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [headlineSettled, setHeadlineSettled] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex(i => (i + 1) % taglineWords.length), 2500);
    return () => clearInterval(id);
  }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-white pt-24"
    >
      <div className="bg-grain pointer-events-none absolute inset-0" />
      <motion.div
        style={{ y: contentY, opacity }}
        className="section-container relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-8 flex h-32 w-32 items-center justify-center"
        >
          {/*<HandCircle className="text-black/80" />*/}
          <Sketch
            type="circle"
            color="#0a0a0a"
            strokeWidth={1}
            padding={[8, 8]}
            enabled={headlineSettled}
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="relative z-10 h-24 w-24 rounded-full object-cover"
            />
          </Sketch>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="eyebrow flex items-center gap-1.5"
        >
          {profile.role} ·{" "}
          <span className="relative inline-block overflow-hidden" style={{ minWidth: "9rem" }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineWords[wordIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {taglineWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setHeadlineSettled(true)}
          className="mt-6 max-w-3xl text-6xl font-semibold leading-[1.05] tracking-tight text-black sm:text-7xl md:text-8xl"
        >
          {profile.headline[0]}
          <br />
          <Sketch
            type="circle"
            color="#0a0a0a"
            strokeWidth={2}
            padding={[4, 14]}
            enabled={headlineSettled}
          >
            {profile.headline[1]}
          </Sketch>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 max-w-xl text-lg font-light leading-relaxed text-black/60"
        >
          Hi, I&apos;m {profile.name}. {profile.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-80"
          >
            View My Work <ArrowRight size={16} />
          </a>
          <a
            href="#about"
            className="inline-flex items-center rounded-full border border-black/20 px-7 py-3.5 text-sm font-medium text-black transition-colors hover:border-black"
          >
            About Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex items-center gap-4"
        >
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-black/15 p-3 text-black/70 transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-black/15 p-3 text-black/70 transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="rounded-full border border-black/15 p-3 text-black/70 transition-colors hover:border-black hover:bg-black hover:text-white"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-black/40"
        >
          <span className="font-hand text-lg">scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
