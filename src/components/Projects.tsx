import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Collabflow',
      description:
        'A real-time collaboration platform for managing workspaces, projects, and tasks with live updates, role-based access, and scalable backend architecture.',
      tech: ['TypeScript'],
      github: 'https://github.com/Abhishekkkk-15/collabflow',
      live: 'https://abhishekkkk.in',
    },
    {
      title: 'Email Scheduler',
      description:
        'A full-stack automated email campaign tool with a visual workflow builder, real-time updates, and scheduled email execution using Agenda.js and Socket.IO.',
      tech: ['TypeScript'],
      github: 'https://github.com/Abhishekkkk-15/email_scheduler',
      live: 'https://abhishekkkk.in',
    },
    {
      title: 'Event Management',
      description:
        'A scalable event management and ticketing platform built with an event-driven architecture using Kafka, Redis caching, and distributed background jobs.',
      tech: ['JavaScript'],
      github: 'https://github.com/Abhishekkkk-15/Event_Management',
      live: 'https://abhishekkkk.in',
    },
    {
      title: 'AI Notes Summarizer',
      description:
        'An AI-powered web application that takes long notes or text input and generates concise, meaningful summaries using advanced language models.',
      tech: ['TypeScript'],
      github: 'https://github.com/Abhishekkkk-15/AI_NOTES_SUMMARIZER',
      live: 'https://abhishekkkk.in',
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-lg font-light text-black/50 max-w-2xl">
            A selection of recent work showcasing full-stack development, modern architecture, and creative problem-solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative border border-black/8 rounded-xl p-8 hover:border-black/25 hover:shadow-md hover:bg-black/1 transition-all duration-300 overflow-hidden hover-lift"
            >
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-black/2 rounded-full blur-3xl group-hover:bg-black/3 transition-all opacity-0 group-hover:opacity-100" />

              <div className="relative z-10">
                <h3 className="text-2xl font-light mb-3 group-hover:text-black transition-colors">
                  {project.title}
                </h3>
                <p className="text-black/60 font-light mb-6 leading-relaxed text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-light px-3 py-1.5 border border-black/15 text-black/70 rounded-full hover:border-black/30 transition-all group-hover:bg-black/2"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-light text-black/70 hover:text-black transition-colors group/link"
                  >
                    <Github size={16} className="group-hover/link:scale-110 transition-transform" />
                    Code
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-light text-black/70 hover:text-black transition-colors group/link"
                  >
                    <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform" />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
