import React from "react";
import { Code2, Palette, Rocket } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-6 bg-gradient-to-b from-neutral-950 to-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-extralight text-neutral-100 mb-20 tracking-tight">
          About
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            .
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-6 text-neutral-300 leading-relaxed">
            <p className="text-lg font-light">
              I'm <strong>Abhishek Jangid</strong>, a confident full-stack
              developer focused on building scalable, real-time, and distributed
              systems. I specialize in event-driven architectures, GraphQL APIs,
              and production-ready web applications.
            </p>
            <p className="text-lg font-light">
              I enjoy turning complex backend challenges into reliable,
              maintainable systems — using technologies like Kafka, Redis,
              PostgreSQL, and modern Node/Nest stacks — while delivering
              polished React/Next.js frontends.
            </p>
            <div className="pt-6 flex gap-4">
              <div className="px-4 py-2 border border-emerald-500/30 rounded-full text-sm text-emerald-400/80 bg-emerald-500/5">
                Confident Developer
              </div>
              <div className="px-4 py-2 border border-emerald-500/30 rounded-full text-sm text-emerald-400/80 bg-emerald-500/5">
                Event-driven Systems
              </div>
              <div className="px-4 py-2 border border-emerald-500/30 rounded-full text-sm text-emerald-400/80 bg-emerald-500/5">
                Scalable Backends
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              {
                icon: Code2,
                title: "Scalable Architecture",
                desc: "Event-driven, microservices-ready designs",
              },
              {
                icon: Palette,
                title: "Polished Frontends",
                desc: "User-friendly, responsive React/Next.js interfaces",
              },
              {
                icon: Rocket,
                title: "Performance & Reliability",
                desc: "Optimized systems with caching and background jobs",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative p-6 bg-neutral-800/30 backdrop-blur-sm border border-emerald-500/10 rounded-xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <item.icon className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-neutral-100 font-medium mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
