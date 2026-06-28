/**
 * Site-wide profile + non-system content.
 * Anas Almesbahi — Head of Development, Masarat (Tripoli, Libya).
 */

export const profile = {
  name: "Anas Almesbahi",
  title: "Head of Development",
  org: "Masarat",
  location: "Tripoli, Libya",
  tagline:
    "Leading software architecture at Masarat — the systems that power Libya's digital banking & fintech.",
  intro:
    "I lead software architecture and development at Masarat, working alongside a talented team of developers to build Libya's digital banking and fintech platform. The systems in this portfolio are ones I personally designed and engineered end to end — from architecture through implementation, CI/CD, observability, and operational maintenance.",
  email: "a.mesbahi@masarat.ly",
  github: "https://github.com/anstwechy",
  githubHandle: "anstwechy",
} as const;

/** Headline metrics for the stats band. */
export const stats: { value: string; label: string; suffix?: string }[] = [
  { value: "10", label: "k concurrent wallet users load-tested", suffix: "+" },
  { value: "6", label: "Libyan banks on the platform" },
  { value: "1.5", label: "s p99 transfer SLO", suffix: "<" },
  { value: "99.9", label: "% target uptime across services", suffix: "" },
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
