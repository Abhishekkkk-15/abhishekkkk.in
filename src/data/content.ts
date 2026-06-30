export const profile = {
  name: "Abhishek Jangid",
  shortName: "Abhishek",
  role: "Software Engineer",
  tagline: "AI Agents · Backend Systems · Developer Tooling",
  bio: "Building autonomous AI systems, developer tooling, and scalable backend infrastructure.",
  headline: ["Building software", "that thinks."],
  avatar: "https://avatars.githubusercontent.com/u/164181412?v=4",
  email: "abhishekjangid3489@gmail.com",
  socials: {
    github: "https://github.com/abhishekkkk-15",
    linkedin: "https://www.linkedin.com/in/abhishek-jangid-3532b1323",
  },
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  paragraphs: [
    "I'm Abhishek Jangid, a software engineer specializing in autonomous AI agents, RAG systems, and developer-automation tooling. I build backend-heavy products with TypeScript, Go, and Rust.",
    "Currently learning Rust & diving deeper into distributed systems design. My work focuses on building systems that are intelligent, scalable, and developer-friendly.",
  ],
  traits: [
    {
      title: "Systems Thinker",
      description:
        "Designing backend architectures that scale — from distributed queues to multi-agent pipelines.",
    },
    {
      title: "AI-First Builder",
      description:
        "Embedding LLMs, RAG, and autonomous agents into real products that solve real problems.",
    },
    {
      title: "Open Source",
      description:
        "Building in public — shipping tools developers actually want to use.",
    },
  ],
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "2026 — Present",
    role: "Full Stack Developer",
    company: "Adiyogi Technosoft",
    description:
      "Building and maintaining full-stack web applications using React, Next.js, and Node.js with PostgreSQL and MongoDB backends.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
};

export const projects: Project[] = [
  {
    title: "Jarvis Assistant",
    description:
      "A sentient-like, multi-modal AI desktop companion that lives on your screen as an animated character, hears your voice, sees your screen, and executes complex system actions via a LangGraph multi-agent architecture.",
    tech: ["TypeScript", "LangGraph", "Electron", "Next.js"],
    github: "https://github.com/Abhishekkkk-15/jarvis-assistant",
    live: "https://jarvis.abhishekkkk.in",
  },
  {
    title: "Infra-CD",
    description:
      "A self-hosted CI/CD platform where developers register Git repositories, manage environments, and automate builds and deployments via lightweight Go-based agents with real-time log streaming over SSE.",
    tech: ["Go", "TypeScript", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/Abhishekkkk-15/infra-cd",
    live: "https://infra-cd.abhishekkkk.in",
  },
  {
    title: "Eden",
    description:
      "An AI-driven team workspace for organizing, searching, and automating data through semantic search with pgvector, autonomous agents, and real-time background job processing via BullMQ and Redis.",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "pgvector", "Redis"],
    github: "https://github.com/Abhishekkkk-15/Eden",
    live: "",
  },
  {
    title: "Collabflow",
    description:
      "A real-time collaboration platform for managing workspaces, projects, and tasks with live updates, role-based access control, and a scalable backend architecture.",
    tech: ["TypeScript", "NestJS", "Next.js", "PostgreSQL"],
    github: "https://github.com/Abhishekkkk-15/collabflow",
    live: "https://collabflow.abhishekkkk.in/",
  },
  {
    title: "Email Scheduler",
    description:
      "A full-stack automated email campaign tool with a visual workflow builder, real-time updates via Socket.IO, and scheduled email execution using Agenda.js and Redis.",
    tech: ["Next.js", "TypeScript", "Redis", "Socket.IO"],
    github: "https://github.com/Abhishekkkk-15/email_scheduler",
    live: "https://email-scheduler-oqpk.vercel.app/",
  },
  {
    title: "Internal Search",
    description:
      "An AI-powered search platform that aggregates data from Slack, Notion, GitHub, and Jira, enabling semantic queries against your company's knowledge base using RAG with OpenAI embeddings and pgvector.",
    tech: [
      "TypeScript",
      "Next.js",
      "OpenAI",
      "LangChain",
      "PostgreSQL",
      "pgvector",
    ],
    github: "https://github.com/Abhishekkkk-15/internal-search",
    live: "",
  },
];

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Go", "Rust"],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "Express",
      "Gin",
      "Socket.IO",
      "LangChain",
      "LangGraph",
      "Tailwind CSS",
    ],
  },
  {
    category: "AI & Data",
    skills: [
      "OpenAI",
      "RAG",
      "pgvector",
      "Vector Embeddings",
      "Multi-Agent Systems",
    ],
  },
  {
    category: "Tools & Infrastructure",
    skills: [
      "Docker",
      "Kubernetes",
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "Kafka",
      "AWS",
      "GraphQL",
      "CI/CD",
      "Git",
    ],
  },
];

export const contact = {
  title: "Let's build something great together.",
  description:
    "I'm always excited to discuss new projects, innovative ideas, and opportunities to collaborate on meaningful digital solutions.",
};
