import React from "react";
import { useEffect, useState } from "react";
import { ExternalLink, Github, Loader2 } from "lucide-react";
import { supabase, type Project } from "../lib/supabase";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      setProjects(data);
      setLoading(false);
      return;
    }

    const fallback: Project[] = [
      {
        id: "event-buddy",
        title: "Event Buddy — Event Management Platform",
        description:
          "Scalable Kafka-based event & ticketing platform with high-concurrency workflows.",
        long_description:
          "Built a scalable event management and ticketing platform using Kafka-based event-driven architecture for high-concurrency workflows. Designed efficient PostgreSQL + Prisma data models, added Redis caching for performance, and used BullMQ for background jobs (email notifications, ticket confirmations). Frontend deployed on Vercel; backend on AWS EC2.",
        image_url:
          "https://res.cloudinary.com/dha7ofrer/image/upload/v1765561128/ChatGPT_Image_Dec_12_2025_11_04_53_PM_x4dpzy.png",
        tech_stack: [
          "Node.js",
          "GraphQL",
          "PostgreSQL",
          "Prisma",
          "Redis",
          "Kafka",
          "BullMQ",
          "React",
        ],
        display_order: 1,
        live_url: "",
        github_url: "",
      },
      {
        id: "email-scheduler",
        title: "Email Scheduler — Campaign Automation",
        description:
          "Visual workflow email automation with real-time updates and scheduling.",
        long_description:
          "Developed a full-stack email automation system with a visual workflow builder using React Flow. Implemented scheduling/automation pipelines using Agenda.js, and real-time campaign feedback with Socket.IO. Built to support reliable campaign execution and monitoring.",
        image_url:
          "https://res.cloudinary.com/dha7ofrer/image/upload/v1765561129/ChatGPT_Image_Dec_12_2025_11_00_48_PM_bfqt4l.png",
        tech_stack: [
          "Node.js",
          "MongoDB",
          "Socket.IO",
          "React",
          "Agenda.js",
          "Nodemailer",
        ],
        display_order: 2,
        live_url: "",
        github_url: "",
      },
      {
        id: "fun-blogging-app",
        title: "Fun-Blogging App",
        description:
          "Full blogging platform with authentication, CRUD, and real-time chat.",
        long_description:
          "Built a complete blogging platform with authentication, CRUD features, and theme customization using DaisyUI. Integrated real-time chat using Socket.IO with online/offline indicators and fast message delivery. Redux for state management and a responsive, user-friendly frontend.",
        image_url:
          "https://res.cloudinary.com/dha7ofrer/image/upload/v1765561258/ChatGPT_Image_Dec_12_2025_11_10_41_PM_iwk1wy.png",
        tech_stack: [
          "Node.js",
          "MongoDB",
          "Socket.IO",
          "Redux",
          "React",
          "DaisyUI",
        ],
        display_order: 3,
        live_url: "",
        github_url: "",
      },
    ];

    setProjects(fallback);
    setLoading(false);
  };

  if (loading) {
    return (
      <section id="work" className="py-32 px-6 bg-neutral-900">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin text-emerald-400" size={32} />
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="work" className="py-32 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-extralight text-neutral-100 mb-20 tracking-tight">
            Selected
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Work
            </span>
            <span className="text-emerald-400">.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <button
                key={project.id ?? idx}
                onClick={() => setSelectedProject(project)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-800 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />

                <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/20 rounded-2xl transition-colors duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span className="text-xs uppercase tracking-widest text-emerald-400/80">
                        Featured Project
                      </span>
                    </div>
                    <h3 className="text-2xl font-light text-neutral-100">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                    {(project.tech_stack || [])
                      .slice(0, 3)
                      .map((tech, tidx) => (
                        <span
                          key={tidx}
                          className="text-xs px-3 py-1.5 bg-emerald-500/15 text-emerald-300 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-lg flex items-center justify-center p-6 animate-fadeIn"
          onClick={() => setSelectedProject(null)}>
          <div
            className="bg-gradient-to-b from-neutral-800/40 to-neutral-900/40 backdrop-blur-xl border border-emerald-500/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-emerald-500/10"
            onClick={(e) => e.stopPropagation()}>
            <div className="aspect-video w-full overflow-hidden rounded-t-2xl">
              <img
                src={selectedProject.image_url}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                <span className="text-xs uppercase tracking-widest text-emerald-400">
                  Project Details
                </span>
              </div>
              <h3 className="text-4xl font-light text-neutral-100 mb-6">
                {selectedProject.title}
              </h3>
              <p className="text-neutral-300 leading-relaxed mb-8 text-lg">
                {selectedProject.long_description}
              </p>

              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-neutral-400 mb-4">
                  Technology Stack
                </p>
                <div className="flex flex-wrap gap-3">
                  {(selectedProject.tech_stack || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-sm px-5 py-2.5 bg-emerald-500/10 text-emerald-300 rounded-full border border-emerald-500/30 backdrop-blur-sm font-light">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-emerald-500/10">
                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-neutral-950 rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 font-medium">
                    <ExternalLink size={18} />
                    <span>View Live Demo</span>
                  </a>
                )}
                {selectedProject.github_url && (
                  <a
                    href={selectedProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-neutral-700/50 border border-neutral-600 text-neutral-100 rounded-lg hover:border-emerald-500/50 hover:bg-neutral-700 transition-all duration-300">
                    <Github size={18} />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
