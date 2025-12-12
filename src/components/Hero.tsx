import React from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-emerald-950/30" />

      <div className="absolute top-20 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-32 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-10 animate-pulse delay-1000" />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="space-y-8 animate-fadeIn">
          <div className="inline-block">
            <span className="text-xs uppercase tracking-[0.2em] text-emerald-400/60 font-medium">
              Welcome —{" "}
              <span className="text-neutral-100 font-medium text-xs ">
                I'm Abhishek
              </span>
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-[120px] font-extralight tracking-tighter text-neutral-100 leading-none">
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400">
                Full Stack Developer
              </span>
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 blur-sm opacity-30" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-300 tracking-wide max-w-2xl mx-auto leading-relaxed font-light">
            I build scalable, real-time and distributed web applications —
            event-driven systems, GraphQL APIs and polished full-stack
            experiences.
          </p>
        </div>

        <button
          onClick={scrollToWork}
          className="mt-20 group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm uppercase tracking-[0.15em] text-emerald-400 border border-emerald-500/50 rounded-full hover:border-emerald-400 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-500/20">
          <span className="relative z-10">Explore My Work</span>
          <ArrowDown
            size={16}
            className="group-hover:translate-y-1 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

        <div className="mt-20 flex justify-center gap-8 text-neutral-500 text-sm">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            React
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-100" />
            Node.js
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-200" />
            PostgreSQL
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
    </section>
  );
}
