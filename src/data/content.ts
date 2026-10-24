export const profile = {
  name: "Abhishek Jangid",
  shortName: "Abhishek",
  labBrand: "ABHISHEK / LAB",
  role: "Applied AI Engineer & Systems Developer",
  location: "Jaipur, India · Remote Worldwide",
  tagline: "Autonomous AI Agents · Distributed Systems · Developer Tooling",
  headline: "Building autonomous AI systems, developer tooling, and scalable backend infrastructure.",
  japaneseBio: "自律エージェントのアーキテクチャ設計と大規模リアルタイム分散システムの構築に従事。LLMの推論と決定論的信頼性を融合。",
  avatar: "https://avatars.githubusercontent.com/u/164181412?v=4",
  email: "abhishekjangid3489@gmail.com",
  socials: {
    github: "https://github.com/abhishekkkk-15",
    linkedin: "https://www.linkedin.com/in/abhishek-jangid-3532b1323",
  },
  stats: {
    throughput: {
      label: "STREAMING LATENCY",
      value: "<45",
      unit: "ms SSE",
    },
    coreEngines: {
      label: "CORE STACK",
      value: "LangGraph · Go · TypeScript · Rust",
    },
    status: {
      label: "SYSTEM STATUS",
      value: "Active in Production",
    },
  },
  showCurlBadge: false,
  showJapaneseBio: true,
  showSpotifyPlayer: true,
  matrixTopHeadline: "BUILD. TRAIN.",
  matrixBottomHeadline: "DEPLOY. SCALE.",
};

export const navLinks = [
  { label: "FOCUS", href: "#focus" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "WORK", href: "#projects" },
  { label: "DEEP DIVE", href: "#project-spec" },
  { label: "CAPABILITIES", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

export type ArchitecturalFocus = {
  index: string;
  title: string;
  description: string;
  tags?: string[];
};

export const architecturalFocus: ArchitecturalFocus[] = [
  {
    index: "01",
    title: "Autonomous Multi-Agent Systems",
    description:
      "LangGraph orchestration graphs, multimodal sensory perception (voice audio + real-time screen inspection), dynamic context paging, and deterministic tool routing.",
  },
  {
    index: "02",
    title: "Distributed Systems & Real-Time CD",
    description:
      "Lightweight Go runner agents, live build log streaming over Server-Sent Events (SSE), asynchronous queue processing via Redis/BullMQ, and containerized deployment topologies.",
  },
  {
    index: "03",
    title: "Semantic Retrieval & Enterprise RAG",
    description:
      "Production RAG architectures with pgvector, hybrid semantic re-ranking, schema-verified structured outputs, and multi-source connectors across Slack, Notion, and Jira.",
  },
];

export type ExperienceItem = {
  period: string;
  location: string;
  role: string;
  company: string;
  description: string;
  metric: string;
  metricSub: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    period: "2026 — PRESENT",
    location: "Adiyogi Technosoft",
    role: "Full Stack Developer",
    company: "Adiyogi Technosoft",
    description:
      "Architecting and shipping production full-stack web applications with Next.js, React, Node.js, and TypeScript. Engineering high-concurrency PostgreSQL and MongoDB data pipelines.",
    metric: "Production Web Apps",
    metricSub: "React · Next.js · Node.js",
    tags: ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB"],
  },
  {
    period: "2024 — PRESENT",
    location: "Open Source / Independent",
    role: "AI Systems & Distributed Infrastructure Engineer",
    company: "Autonomous Systems Lab",
    description:
      "Designing speculative agent frameworks, self-hosted deployment daemons (Infra-CD) in Go, and multi-modal AI desktop companions (Jarvis Assistant) utilizing LangGraph state machines.",
    metric: "4+ Flagship Systems",
    metricSub: "LangGraph · Go · pgvector",
    tags: ["LangGraph", "Go", "Docker", "pgvector", "Redis", "TypeScript"],
  },
];

export type Project = {
  codeIndex: string;
  category: string;
  title: string;
  version: string;
  status?: string;
  description: string;
  techStack: string;
  tech: string[];
  github: string;
  live?: string;
  metric: string;
  metricSub: string;
};

export const projects: Project[] = [
  {
    codeIndex: "01 // AGENT RUNTIME",
    category: "AI COMPANION",
    title: "JARVIS-ASSISTANT",
    version: "v2.0",
    status: "Active",
    description:
      "Sentient-like, multi-modal AI desktop companion that lives on screen as an animated character. Captures live screen viewports, streams microphone voice, and triggers complex desktop system actions via LangGraph multi-agent graphs.",
    techStack: "TypeScript · LangGraph · Electron · Next.js",
    tech: ["TypeScript", "LangGraph", "Electron", "Next.js"],
    github: "https://github.com/Abhishekkkk-15/jarvis-assistant",
    live: "https://jarvis.abhishekkkk.in",
    metric: "Multimodal Vision",
    metricSub: "LangGraph Multi-Agent Runtime",
  },
  {
    codeIndex: "02 // INFRASTRUCTURE",
    category: "CI/CD ENGINE",
    title: "INFRA-CD",
    version: "v1.4",
    status: "Production",
    description:
      "A self-hosted CI/CD platform where developers register Git repositories, configure isolated build environments, and automate deploys via lightweight Go worker daemons with real-time SSE log streaming.",
    techStack: "Go · TypeScript · React · PostgreSQL · Docker",
    tech: ["Go", "TypeScript", "React", "PostgreSQL", "Docker"],
    github: "https://github.com/Abhishekkkk-15/infra-cd",
    live: "https://infra-cd.abhishekkkk.in",
    metric: "Real-Time SSE",
    metricSub: "Lightweight Go Runner Daemons",
  },
  {
    codeIndex: "03 // DATA WORKSPACE",
    category: "VECTOR WORKSPACE",
    title: "EDEN",
    version: "v1.1",
    description:
      "AI-driven team workspace for organizing, searching, and automating internal assets through semantic vector search with pgvector, autonomous agent workflows, and asynchronous background queues via BullMQ and Redis.",
    techStack: "TypeScript · React · Node.js · pgvector · Redis",
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "pgvector", "Redis"],
    github: "https://github.com/Abhishekkkk-15/Eden",
    metric: "pgvector Indexing",
    metricSub: "BullMQ & Redis Background Pipeline",
  },
  {
    codeIndex: "04 // REALTIME PLATFORM",
    category: "COLLABORATION",
    title: "COLLABFLOW",
    version: "v1.0",
    description:
      "Real-time team collaboration platform for managing workspaces, projects, and active tasks with live state sync, role-based access control, and a resilient NestJS microservices backend.",
    techStack: "TypeScript · NestJS · Next.js · PostgreSQL",
    tech: ["TypeScript", "NestJS", "Next.js", "PostgreSQL"],
    github: "https://github.com/Abhishekkkk-15/collabflow",
    live: "https://collabflow.abhishekkkk.in/",
    metric: "Sub-20ms Sync",
    metricSub: "Role-Based Access Control",
  },
  {
    codeIndex: "05 // RETRIEVAL RAG",
    category: "ENTERPRISE SEARCH",
    title: "INTERNAL-SEARCH",
    version: "v1.2",
    description:
      "Enterprise knowledge search platform aggregating data across Slack, Notion, GitHub, and Jira. Enables semantic cross-source queries using LangChain RAG pipelines, OpenAI embeddings, and pgvector cosine similarity ranking.",
    techStack: "TypeScript · Next.js · LangChain · pgvector",
    tech: ["TypeScript", "Next.js", "OpenAI", "LangChain", "PostgreSQL", "pgvector"],
    github: "https://github.com/Abhishekkkk-15/internal-search",
    metric: "Cross-App RAG",
    metricSub: "Cosine Distance Semantic Search",
  },
  {
    codeIndex: "06 // WORKFLOW QUEUE",
    category: "AUTOMATION",
    title: "EMAIL-SCHEDULER",
    version: "v1.0",
    description:
      "Full-stack automated email campaign system featuring a visual workflow pipeline builder, live state updates via Socket.IO, and cron-scheduled job dispatching powered by Agenda.js and Redis.",
    techStack: "Next.js · TypeScript · Redis · Socket.IO · Agenda.js",
    tech: ["Next.js", "TypeScript", "Redis", "Socket.IO", "Agenda.js"],
    github: "https://github.com/Abhishekkkk-15/email_scheduler",
    live: "https://email-scheduler-oqpk.vercel.app/",
    metric: "Visual Pipeline",
    metricSub: "Socket.IO + Agenda.js Execution",
  },
];

export const flagshipDossier = {
  sectionIndex: "04.1 //",
  category: "OPEN SOURCE CORE",
  subtitle: "ARCHITECTURE V2.0 // MULTIMODAL RUNTIME",
  title: "JARVIS-ASSISTANT // v2.0",
  description:
    "Multimodal desktop intelligence engine coupling Electron with a LangGraph state graph. Continuously synthesizes screen viewports and real-time audio streams to reason over system state, execute shell commands, and automate user workflows with complete safety bounds.",
  metrics: [
    { label: "ORCHESTRATION", value: "LangGraph State Machine" },
    { label: "PERCEPTION", value: "Live Screen + Audio Vision" },
    { label: "PLATFORM", value: "Electron + Next.js" },
  ],
  github: "https://github.com/Abhishekkkk-15/jarvis-assistant",
  live: "https://jarvis.abhishekkkk.in",
  showArchitecturePipeline: false,
};

export type SkillMatrix = {
  category: string;
  items: string[];
};

export const skillMatrix: SkillMatrix[] = [
  {
    category: "LANGUAGES",
    items: ["TypeScript", "JavaScript", "Go (Golang)", "Rust", "Python", "SQL"],
  },
  {
    category: "FRAMEWORKS & ENGINES",
    items: [
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "Express",
      "Gin",
      "LangGraph",
      "LangChain",
      "Socket.IO",
      "Tailwind CSS",
    ],
  },
  {
    category: "AI & VECTOR RETRIEVAL",
    items: [
      "Autonomous Multi-Agent Systems",
      "RAG Architectures",
      "OpenAI API & LLM Tooling",
      "pgvector Cosine Search",
      "Vector Embeddings",
      "Structured Schema Verification",
    ],
  },
  {
    category: "SYSTEMS & INFRASTRUCTURE",
    items: [
      "Docker & Containerization",
      "PostgreSQL",
      "Redis & BullMQ",
      "MongoDB",
      "Kafka Event Streams",
      "Linux Server Administration",
      "CI/CD Pipelines",
      "Git & GitHub Actions",
    ],
  },
];

export const contactInfo = {
  locationLines: [
    "Jaipur, Rajasthan, India",
    "Active Worldwide (Remote)",
    "UTC+05:30 (IST)",
  ],
  connectLinks: [
    {
      label: "github.com/abhishekkkk-15 ↗",
      href: "https://github.com/abhishekkkk-15",
    },
    {
      label: "linkedin.com/in/abhishek-jangid ↗",
      href: "https://www.linkedin.com/in/abhishek-jangid-3532b1323",
    },
    {
      label: "abhishekjangid3489@gmail.com ↗",
      href: "mailto:abhishekjangid3489@gmail.com",
    },
  ],
  availability:
    "Open for full-time engineering roles, AI agent architecture consulting, and high-impact distributed systems development.",
};
