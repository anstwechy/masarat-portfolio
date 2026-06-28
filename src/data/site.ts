/**
 * Site-wide profile + non-system content.
 * Anas Almesbahi — Head of Development, Masarat (Tripoli, Libya).
 */

export const profile = {
  name: "Anas Almesbahi",
  title: "Head of Development",
  org: "Masarat",
  location: "Tripoli, Libya",
  yearsExperience: "10+",
  availability: "Open to work",
  tagline:
    "Leading software architecture at Masarat — the systems that power Libya's digital banking & fintech.",
  intro:
    "I lead software architecture and development at Masarat, working alongside a talented team of developers to build Libya's digital banking and fintech platform. The systems in this portfolio are ones I personally designed and engineered end to end — from architecture through implementation, CI/CD, observability, and operational maintenance.",
  email: "a.mesbahi@masarat.ly",
  phone: "+218 91 425 7887",
  phoneDisplay: "0914257887",
  github: "https://github.com/anstwechy",
  githubHandle: "anstwechy",
  linkedin: "https://www.linkedin.com/in/anstwechy",
} as const;

/**
 * Career timeline — chronological work history. Recruiters expect this.
 * Joined Masarat in 2018; progressed from specialist to Head of Development
 * through demonstrated achievements and hard work.
 */
export const career: {
  role: string;
  org: string;
  period: string;
  current?: boolean;
  summary: string;
  achievements: string[];
}[] = [
  {
    role: "Head of Development",
    org: "Masarat",
    period: "2022 — Present",
    current: true,
    summary:
      "Lead the development organization and own the technical direction of the entire Masarat platform — a multi-bank fintech ecosystem serving Libyan financial institutions.",
    achievements: [
      "Architected and engineered the full platform: wallet & ledger, payments, vouchers, insurance, notifications, AML, voice AI, and QA automation",
      "Grew and led the engineering team, mentoring developers and setting standards across architecture, CI/CD, and observability",
      "Load-tested the wallet platform to 10,000 concurrent users with sub-1.5s p99 latency and full ledger consistency",
      "Onboarded six Libyan banks onto the platform",
    ],
  },
  {
    role: "Senior Software Engineer",
    org: "Masarat",
    period: "2020 — 2022",
    summary:
      "Owned core backend services and scaled the platform's payment and wallet infrastructure as the company expanded its bank integrations.",
    achievements: [
      "Designed the online-payment ecosystem and the API-key control plane replacing direct bank-credential integrations",
      "Built the multi-service voucher platform and the insurance provider hub",
      "Introduced double-entry ledger correctness and durable messaging (transactional outbox) across financial services",
    ],
  },
  {
    role: "Software Engineer",
    org: "Masarat",
    period: "2018 — 2020",
    summary:
      "Joined as a specialist and delivered foundational systems, rapidly taking on ownership of major platform components.",
    achievements: [
      "Built foundational wallet and notification systems still in production today",
      "Established the CI/CD and Docker-based deployment practices the team still uses",
      "Rose through the ranks on the strength of delivered, production-grade work",
    ],
  },
];

/** Headline metrics for the stats band. */
export const stats: { value: string; label: string; suffix?: string }[] = [
  { value: "10", label: "years building software", suffix: "+" },
  { value: "6", label: "Libyan banks on the platform" },
  { value: "10", label: "k concurrent wallet users load-tested", suffix: "+" },
  { value: "1.5", label: "s p99 transfer SLO", suffix: "<" },
];

/** Categorized tech stack. */
export const techStack: { category: string; items: string[] }[] = [
  {
    category: "Backend",
    items: [
      ".NET 9 / 10",
      "ASP.NET Core",
      "FastEndpoints",
      "Node.js / NestJS",
      "Python / FastAPI",
      "gRPC",
      "MassTransit",
    ],
  },
  {
    category: "Frontend",
    items: [
      "Next.js 15",
      "React 19",
      "Angular 17",
      "Blazor",
      "Flutter",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    category: "AI & ML",
    items: [
      "LangGraph",
      "ML.NET",
      "Ollama",
      "Whisper / Deepgram",
      "Unsloth (LoRA/QLoRA)",
      "ChromaDB RAG",
    ],
  },
  {
    category: "Data & Infra",
    items: [
      "PostgreSQL",
      "SQL Server",
      "Redis",
      "RabbitMQ",
      "EF Core",
      "Prisma",
      "Docker / Swarm",
    ],
  },
  {
    category: "DevOps & Obs.",
    items: [
      "GitHub Actions",
      "GitLab CI",
      "OpenTelemetry",
      "Prometheus / Grafana",
      "Loki / Tempo",
      "Consul",
    ],
  },
  {
    category: "Domain",
    items: [
      "Double-entry ledger",
      "AML & sanctions/PEP",
      "Payment processing",
      "Multi-tenant SaaS",
      "Fintech security",
      "Argon2id / JWT",
    ],
  },
];

/** Engineering depth proof-points. */
export const practices: {
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    title: "Double-entry ledger correctness",
    description:
      "Zero-sum atomic PostJournal with unique idempotency keys per entry and explicit retry/reconcile outcomes — money is never lost or double-counted.",
    icon: "scale",
  },
  {
    title: "Transactional outbox",
    description:
      "MassTransit EF outbox on PostgreSQL guarantees domain events publish durably with the same DB commit as business state — no lost events.",
    icon: "database",
  },
  {
    title: "gRPC + async messaging",
    description:
      "Synchronous inter-service calls over gRPC with protobuf contracts; async events over RabbitMQ via MassTransit with DLQs and exponential retry.",
    icon: "network",
  },
  {
    title: "Full observability",
    description:
      "OpenTelemetry → Prometheus + Grafana Loki + Tempo with trace-to-log correlation, structured Serilog logging, and correlation IDs end-to-end.",
    icon: "activity",
  },
  {
    title: "Tiered CI/CD",
    description:
      "GitHub Actions + GitLab CI with smoke → PR → full gates, Docker Hub publishing, and Docker Swarm deployment across every system in the platform.",
    icon: "gitBranch",
  },
  {
    title: "Security by design",
    description:
      "Argon2id API-key hashing, BCrypt passwords, PBKDF2 wallet PINs, short-lived debit tokens, HMAC-signed webhooks, and vault-based secret discipline.",
    icon: "shield",
  },
];
