/**
 * Single source of truth for the systems in the Masarat portfolio.
 * Content sourced from each repo's README.md and AGENTS.md.
 * Edit here to update the entire site.
 */

export type SystemCategory =
  | "Core Finance"
  | "Risk & Compliance"
  | "Communications"
  | "AI"
  | "Integrations"
  | "Engineering";

export interface SystemStat {
  label: string;
  value: string;
}

export interface PortfolioSystem {
  /** URL slug — used for /systems/[slug] */
  slug: string;
  /** Display name */
  name: string;
  /** Codename / alternate name if any */
  codename?: string;
  /** Folder name in the workspace */
  folder: string;
  /** One-line tagline for cards */
  tagline: string;
  /** Category for grouping/filtering */
  category: SystemCategory;
  /** The problem it solves */
  problem: string;
  /** What I built / my role */
  role: string;
  /** Tech stack badges */
  stack: string[];
  /** Headline achievements for the detail page */
  highlights: string[];
  /** Key technical capabilities */
  capabilities: string[];
  /** Architecture description (plain text, shown beside the diagram) */
  architecture: string;
  /** Mermaid diagram source for the detail page */
  architectureMermaid: string;
  /** Repo URL */
  repoUrl?: string;
  /** Accent color for this system's card */
  accent: string;
  /** Short metrics for the card */
  metrics: SystemStat[];
}

export const systems: PortfolioSystem[] = [
  {
    slug: "masarat-wallet",
    name: "Masarat Wallet",
    codename: "MITF Wallet",
    folder: "mitf_wallet",
    tagline:
      "Digital wallet & double-entry ledger platform for Libyan banks — money movement at scale.",
    category: "Core Finance",
    problem:
      "Banks needed a reliable, consistent, and secure digital wallet with onboarding, transfers, merchant payments, cash withdrawals, and pooled accounts — built to handle real concurrent load without losing a cent.",
    role: "Architected and built the entire platform: ledger correctness, durable messaging, wallet lifecycle, PIN-based debit authorization, the customer gateway, load testing, and reconciliation.",
    stack: [
      ".NET 10",
      "ASP.NET Core",
      "gRPC",
      "MassTransit",
      "PostgreSQL",
      "RabbitMQ",
      "Redis",
      "Consul",
      "OpenTelemetry",
      "Flutter",
    ],
    highlights: [
      "Double-entry ledger with zero-sum atomic PostJournal and unique idempotency keys",
      "Transactional outbox (MassTransit EF outbox on PostgreSQL) — no lost events after commit",
      "Load-tested to 10,000 concurrent wallets with full ledger-consistency verification",
      "Sub-1.5s p99 transfer latency SLO under 10k profile load (~121 ops/s)",
      "Wallet PIN + short-lived transaction-authorization tokens for debit flows",
    ],
    capabilities: [
      "Wallet-to-wallet transfers, merchant payments, cash withdrawals",
      "Pooled accounts & wallet funding with reversals",
      "Configurable concurrency/backpressure gates on ledger & transactions",
      "Idempotency keys with TTL + retention cleanup on all financial ops",
      "Customer Gateway: REST façade with JWT + per-app API keys + rate limiting",
      "Reconciliation job for bank-vs-ledger exports",
    ],
    architecture:
      "Microservices with bounded contexts: Users, Wallets, Transactions, Ledger, plus a Customer Gateway (REST) and optional Webhooks & Reconciliation. Synchronous calls use gRPC (protobuf contracts in Masarat.GrpcContracts); async events flow over RabbitMQ via MassTransit with a transactional outbox. Each service owns its PostgreSQL database. Full observability through OpenTelemetry → Prometheus, Loki, Tempo, Grafana.",
    architectureMermaid: `flowchart LR
    subgraph clients["Clients"]
        Rest["REST clients"]
        Grpc["gRPC clients"]
    end
    subgraph core["Core services"]
        Gateway["Customer Gateway :5006"]
        Users["Users :5003"]
        Wallets["Wallets :5002"]
        Transactions["Transactions :5004"]
        Ledger["Ledger :5001"]
    end
    subgraph data["Data & messaging"]
        RMQ["RabbitMQ"]
        PG[("PostgreSQL")]
    end
    Rest --> Gateway
    Gateway --> Users & Wallets & Transactions
    Users --> Wallets
    Wallets --> Ledger
    Transactions --> Ledger
    Wallets --> RMQ
    Transactions --> RMQ
    core --> PG`,
    repoUrl: "https://github.com/anstwechy/wallet-services",
    accent: "#2dd4bf",
    metrics: [
      { label: "Concurrent users", value: "10k" },
      { label: "Transfer p99", value: "<1.5s" },
      { label: "Services", value: "6+" },
    ],
  },
  {
    slug: "payment-ecosystem",
    name: "MITF Payment Ecosystem",
    folder: "mitf_payment_eco_system",
    tagline:
      "Online payments V1/V2 + merchant portal + API-key control plane — replacing bank-credential integrations.",
    category: "Core Finance",
    problem:
      "Transform MITF online payments from direct bank-credential integrations into a secure Merchant Integration Ecosystem where merchants onboard via a portal, integrators authenticate with API keys, and bank credentials never leave the internal boundary.",
    role: "Designed the multi-repo architecture with a formal CONTRACT.md governing split write-ownership. Built the V2 dual-auth API, the API Key Service secret plane, the thin gRPC bank gateway, and the merchant portal.",
    stack: [
      ".NET 10",
      "FastEndpoints",
      "gRPC",
      "PostgreSQL",
      "SQL Server",
      "Redis",
      "RabbitMQ",
      "Angular",
      "WooCommerce",
    ],
    highlights: [
      "Dual-auth V2 API: JWT path proxies frozen V1 verbatim; new x-api-key path serves /v2/* RESTful routes",
      "Dedicated API Key Service with Argon2id hashing, lifecycle (issue/revoke/rotate/scopes/expiry), and audit",
      "Thin gRPC bank gateway (mitf-legacy-core) — sole owner of V1 bank clients + SQL Server DBs",
      "Boundary rule: only legacy-core may reference V1 internals; everything else talks to it over gRPC",
      "Idempotent payment-session lifecycle, quotas, OnUs + cross-bank (OnePay/QR) payments, full report suite",
    ],
    capabilities: [
      "Merchant Portal API + Web: Integration CRUD, masked credential view, plugin releases",
      "V2-owned session lifecycle with idempotency, audit, and quota enforcement",
      "OnUs + cross-bank (OnePay/QR) payments",
      "Report suite: refund, webhook-delivery, funnel, by-channel, transactions-export",
      "WooCommerce channel with hard-cut to API keys only",
    ],
    architecture:
      "A workspace of cooperating services. Online Payment API V2 (FastEndpoints, Postgres) owns the new surface with a dual-auth model. mitf-legacy-core is a thin .NET 10 gRPC gateway that is the sole owner of V1's bank clients and SQL Server DBs. The API Key Service owns the secret plane (Argon2id-hashed keys + audit). All share MerchantIntegrationDb with split write-ownership per CONTRACT.md.",
    architectureMermaid: `flowchart TB
    subgraph channels["Channels"]
        Woo["WooCommerce"]
        Direct["Direct API / POS"]
    end
    subgraph portal["Merchant Portal"]
        Web["Portal Web"]
        API["Portal API"]
    end
    subgraph v2["Payment API V2 :5109"]
        V2["FastEndpoints + Postgres"]
    end
    subgraph key["API Key Service :5240"]
        KeySvc["Argon2id + lifecycle"]
    end
    subgraph legacy["Legacy"]
        Core["Legacy Core :5118 (gRPC)"]
        Bank[("Bank / mock")]
    end
    Woo & Direct --> V2
    Web --> API
    V2 -->|"gRPC Pay/Balance"| Core
    V2 -.->|"resolve-key"| KeySvc
    Core --> Bank`,
    repoUrl: "https://github.com/anstwechy/mitf-payment-ecosystem",
    accent: "#38bdf8",
    metrics: [
      { label: "Sub-repos", value: "7" },
      { label: "Auth modes", value: "Dual" },
      { label: "Key hashing", value: "Argon2id" },
    ],
  },
  {
    slug: "voucher-provider",
    name: "Voucher Provider",
    folder: "voucher-provider-workspace",
    tagline:
      "Multi-service voucher platform — stock, internal, external, gateway & purchase orchestration.",
    category: "Core Finance",
    problem:
      "Issue, stock, reserve, and reconcile vouchers across management (admin), partner banks (internal APIs), external reservation flows, and a browser gateway — with encrypted stock distribution to per-bank deployments.",
    role: "Built the full five-service voucher platform: stock/management, per-bank internal APIs, external reservation service with Redis counters & MassTransit, the gateway BFF, and a saga-based purchase orchestrator.",
    stack: [
      ".NET 10",
      "ASP.NET Core",
      "MassTransit",
      "SQL Server",
      "Redis",
      "RabbitMQ",
      "Angular",
    ],
    highlights: [
      "Five cooperating .NET services: Stock/Management, Internal (per-bank), External, Gateway BFF, Purchase Orchestrator",
      "Encrypted stock export from management → per-bank internal deployments",
      "External API owns Redis-backed counters and RabbitMQ/MassTransit coordination",
      "Saga/bundle purchase orchestration over SQL + RabbitMQ",
      "Full QA tiers: Newman/Postman, Playwright, and Maestro mobile smoke",
    ],
    capabilities: [
      "Stock catalog: imports/exports, branches, reports, third-party provider health",
      "Per-bank internal APIs serving bank-specific DBs",
      "External reservations with Redis counters + MassTransit consumers",
      "Gateway BFF (Mitf.VoucherProvider) for consumer-facing HTTP",
      "Purchase orchestrator for bundle/saga flows",
    ],
    architecture:
      "A workspace monorepo of five .NET API hosts. Management exports encrypted stock to per-bank Internal deployments. External owns reservations with Redis counters and RabbitMQ consumers. The Gateway is a BFF for consumer flows. The Purchase Orchestrator coordinates bundle/saga flows. Shared infra: SQL Server (many DBs), Redis, RabbitMQ.",
    architectureMermaid: `flowchart LR
    subgraph clients["Clients"]
        SPA["Stock SPA (Angular)"]
        GW["Gateway clients"]
    end
    subgraph core["Core APIs"]
        Stock["Stock / Management"]
        Ext["External"]
        Int["Internal x banks"]
        Orch["Purchase Orchestrator"]
    end
    subgraph data["Data & messaging"]
        SQL[("SQL Server")]
        Redis[("Redis")]
        RMQ[("RabbitMQ")]
    end
    SPA --> Stock
    GW --> Gateway
    Stock --> SQL
    Ext --> SQL & Redis & RMQ
    Int --> SQL
    Orch --> SQL & RMQ
    Stock -.->|"encrypt/export"| Int`,
    repoUrl: "https://github.com/anstwechy/voucher-provider-workspace",
    accent: "#a78bfa",
    metrics: [
      { label: "Services", value: "5" },
      { label: "Databases", value: "Multi" },
      { label: "Orchestration", value: "Saga" },
    ],
  },
  {
    slug: "insurance-hub",
    name: "Insurance Provider Hub",
    folder: "insurance-provider-hub",
    tagline:
      "Provider-neutral insurance integration — Sanad & INC/Tameen behind one secure hub.",
    category: "Integrations",
    problem:
      "Integrate multiple external insurance providers (Sanad, INC/Tameen) behind one stable API so client apps never hold partner credentials, while each provider's quirks are isolated in its own adapter.",
    role: "Designed the hub-and-adapter architecture with a provider-neutral route surface, per-provider clients with Polly resilience, and config-toggleable middleware (rate limiting, forwarded headers, telemetry).",
    stack: [
      ".NET 10",
      "ASP.NET Core",
      "EF Core",
      "PostgreSQL",
      "Polly",
      "OpenTelemetry",
    ],
    highlights: [
      "Provider-neutral routes: /v1/hub/{provider}/integration/… (sanad | inc)",
      "Partner X-Api-Key & bearer tokens stay server-side — clients never hold them",
      "Per-provider adapters (Sanad → sanadapi.ly, INC/Tameen → devtameen.webapi.ly) with Polly retries",
      "Toggleable rate limiting, forwarded headers, and OTLP telemetry via config",
      "Full hub journeys: travel, compulsory, orange card across both providers",
    ],
    capabilities: [
      "Connectivity, customers/vehicles, quotes/policies, payments, verification",
      "Factory + adapter pattern: GetClient('sanad' | 'inc') → typed client",
      "PostgreSQL persistence for flows & correlation metadata",
      "EF migrations on startup; health & readiness endpoints",
      "Newman/Postman hub integration suites + direct provider test suites",
    ],
    architecture:
      "An ASP.NET Core API integrating external insurers behind a hub route surface. Middleware (forwarded headers, rate limiting, correlation ID, hub auth) runs before integration routes. A factory selects the right provider adapter; each adapter maps the stable hub contract to its upstream API with Polly resilience. PostgreSQL persists flow/correlation metadata.",
    architectureMermaid: `flowchart TB
    subgraph clients["Clients"]
        CL["Mobile · web · BFF"]
    end
    subgraph hub["Insurance Hub (ASP.NET Core)"]
        MW["Middleware\nauth · rate-limit · correlation"]
        RTE["Integration API\n/v1/hub/{provider}/…"]
        FAC["Provider Client Factory"]
    end
    subgraph adapters["Adapters"]
        SA["Sanad client + Polly"]
        INC["INC client + Polly"]
    end
    subgraph upstream["Upstream insurers"]
        SANAPI["sanadapi.ly"]
        INCAPI["devtameen.webapi.ly"]
    end
    CL --> MW --> RTE --> FAC
    FAC --> SA & INC
    SA --> SANAPI
    INC --> INCAPI
    RTE --> PG[("PostgreSQL")]`,
    repoUrl: "https://github.com/anstwechy/insurance-provider-hub",
    accent: "#fbbf24",
    metrics: [
      { label: "Providers", value: "2" },
      { label: "Journeys", value: "Travel+" },
      { label: "Pattern", value: "Hub/Adapter" },
    ],
  },
  {
    slug: "notification-system",
    name: "MITF Notification System",
    folder: "mitf_notification_system",
    tagline:
      "Bank-scoped push notifications — templates, bulk send, Firebase/Huawei, bilingual admin.",
    category: "Communications",
    problem:
      "Operators needed a controlled system to design notification templates, manage banks/applications/topics, run large bulk sends, and review content — delivering to bank customers via Firebase and Huawei.",
    role: "Built the notification API (auth, templates, bulk jobs, structure, surveys), the bilingual React admin, recipient resolution (incl. joint-bank/UCD lookups), and the Firebase/Huawei delivery pipeline.",
    stack: [
      ".NET",
      "EF Core",
      "SQL Server",
      "Hangfire",
      "Serilog",
      "React 19",
      "Vite",
      "Mantine",
    ],
    highlights: [
      "Bank-scoped push: staff design templates, manage banks/apps/topics, run bulk sends",
      "Recipient resolution incl. joint-bank/UCD lookups; large lists chunked in batches of 500",
      "Firebase & Huawei delivery via device tokens and FCM topic conditions",
      "Bilingual EN/AR admin (React 19 + Vite + Mantine) with full RTL support",
      "Hangfire one-shot scheduling on SQL Server (no Redis dependency)",
    ],
    capabilities: [
      "Template lifecycle: draft → review → published",
      "Bulk Send for file-based recipient uploads with staging",
      "FCM topic management with OR conditions across topics",
      "UCD/joint-bank HTTP expansion of phone lists",
      "Permission-aware routes + feature-level permissions via JWT",
    ],
    architecture:
      "A .NET API persists to SQL Server, resolves recipients (optionally calling UCD/joint-bank services), and batches Firebase/Huawei sends. A React admin (Mantine/Vite) provides bilingual operations UI. Hangfire on SQL Server handles one-shot scheduling. An optional UCD mock enables local integration without real upstream services.",
    architectureMermaid: `flowchart LR
    subgraph ops["Operators"]
        UI["React admin (EN/AR)"]
    end
    subgraph core["Core"]
        API[".NET Notification API"]
        DB[("SQL Server")]
        HF["Hangfire"]
    end
    subgraph outbound["Outbound"]
        UCD["UCD / joint-bank"]
        FCM["Firebase / Huawei"]
    end
    UI -->|"HTTPS /api"| API
    API --> DB
    API --> HF
    API --> UCD
    API --> FCM`,
    repoUrl: "https://github.com/anstwechy/mitf_notification_system",
    accent: "#f472b6",
    metrics: [
      { label: "Languages", value: "EN/AR" },
      { label: "Channels", value: "FCM+Huawei" },
      { label: "Bulk batching", value: "500" },
    ],
  },
  {
    slug: "aml-flowguard",
    name: "FlowGuard — AML Platform",
    codename: "AML System",
    folder: "AMLSystem",
    tagline:
      "Production-grade Anti-Money-Laundering — rules + ML.NET scoring + sanctions/PEP, multi-tenant.",
    category: "Risk & Compliance",
    problem:
      "Libyan banking institutions needed real-time transaction screening against configurable AML rules, ML anomaly detection, and sanctions/PEP lists — with a centralized case-management workflow for compliance teams.",
    role: "Built the entire AML platform: the multi-tenant analyzer pipeline (rules + ML scoring + sanctions), the central management API, the Angular compliance portal, and the observability + service-discovery stack.",
    stack: [
      ".NET 9",
      "ASP.NET Core",
      "ML.NET",
      "RulesEngine",
      "MassTransit",
      "RabbitMQ",
      "PostgreSQL",
      "Redis",
      "Consul",
      "Angular 17",
    ],
    highlights: [
      "Hybrid screening: configurable business rules + ML.NET Randomized PCA anomaly detection + sanctions/PEP",
      "Multi-tenant: per-bank Analyzer instance (Tejari, Sahara, Jumhoria) consuming transaction queue messages",
      "RabbitMQ topic exchange with DLQ + exponential retry via MassTransit",
      "Centralized case management: idempotent alert creation, round-robin analyst assignment",
      "Angular 17 compliance portal with dashboards, alerts, cases, analytics",
      "Separate fraud-review path emitting FRAUD_REVIEW webhooks",
    ],
    capabilities: [
      "Real-time transaction ingestion via HMAC-signed webhooks & RabbitMQ",
      "Parallel + sequential AML rule evaluation (RulesEngine, JSON-defined)",
      "ML.NET anomaly scoring with retraining/tuning",
      "Sanctions & PEP screening per transaction",
      "Compliance reporting scoped to date ranges + portfolio snapshots",
    ],
    architecture:
      "Banks/MockAdapters publish TransactionQueueMessages to RabbitMQ; per-tenant FlowGuard.Analyzer instances consume them, run rules + ML + sanctions, then HMAC-sign webhooks to FlowGuard.Management. Management handles idempotent alert creation, auto-assignment, and exposes REST to the Angular compliance portal. Consul provides service discovery + KV; OTel feeds Prometheus/Grafana/Loki/Tempo.",
    architectureMermaid: `flowchart TB
    Bank["Bank / MockAdapter"] -->|"publishes tx"| RMQ[("RabbitMQ")]
    RMQ --> AZ["FlowGuard.Analyzer (per bank)"]
    AZ -->|"rules + ML + sanctions"| AZ
    AZ -->|"HMAC webhook"| MG["FlowGuard.Management"]
    MG -->|"alert lifecycle"| Portal["AML Portal (Angular)"]
    AZ --> PG[("PostgreSQL")]
    MG --> PG
    AZ -.-> Redis[("Redis")]
    RMQ -.-> Consul["Consul"]
    MG -.-> OTel["OpenTelemetry → Grafana"]`,
    repoUrl: "https://github.com/anstwechy/mitf-aml-system",
    accent: "#34d399",
    metrics: [
      { label: "Screening", value: "Hybrid" },
      { label: "Tenants", value: "Multi-bank" },
      { label: "Detection", value: "ML + Rules" },
    ],
  },
  {
    slug: "voice-banking-assistant",
    name: "Account Assistance",
    folder: "account_assistance",
    tagline:
      "Voice AI banking assistant in Arabic & Libyan dialect — LangGraph agent, STT, fine-tuning.",
    category: "AI",
    problem:
      "Bank customers needed a voice-enabled conversational assistant that understands Arabic and the Libyan dialect to check balances, view transactions, transfer money, buy vouchers, and ask questions — with safe handling of high-risk actions.",
    role: "Built the polyglot multi-service system: the ASP.NET backend gateway, the LangGraph agent pipeline (supervisor → specialist → critic), the speech service, the self-hosted fine-tuning pipeline, and the Blazor admin.",
    stack: [
      ".NET 9",
      "LangGraph",
      "Ollama",
      "Whisper",
      "Deepgram",
      "FastAPI",
      "Unsloth",
      "Flutter",
      "Blazor",
      "PostgreSQL",
    ],
    highlights: [
      "Bilingual voice/chat assistant understanding Arabic + Libyan dialect",
      "LangGraph agent: supervisor → specialist → critic with dual execution paths (compiled + streaming)",
      "Human-in-the-loop approval for high-value transfers (HITL threshold)",
      "Self-hosted LoRA/QLoRA fine-tuning pipeline (Unsloth → GGUF for Ollama)",
      "Deepgram Nova-3 for Libyan-Arabic STT (17 Arabic dialects, lower WER)",
      "Training-data cleansing: voice recordings + chat 'Real meaning' correction → export",
    ],
    capabilities: [
      "Balance, transactions, transfer, voucher purchase, general Q&A via voice or chat",
      "Bill/invoice image OCR (PaddleOCR) merged into the intent pipeline",
      "Compliance node with configurable checklist (transfer limits, AML re-verify)",
      "ChromaDB RAG knowledge base for FAQs/fees/policies",
      "Regression suite with golden intent/entities data (95% recognition threshold)",
    ],
    architecture:
      "A Flutter mobile app talks to an ASP.NET backend (HTTP+gRPC gateway) that orchestrates a Speech service (FastAPI + Whisper/Deepgram) and an AI Agent (FastAPI + LangGraph + Ollama). The agent executes through a compiled LangGraph pipeline or a low-latency streaming path, calling back into the backend for banking tools. A Training service (Unsloth) handles fine-tuning; a Blazor admin manages config, data cleansing, and jobs.",
    architectureMermaid: `flowchart LR
    Mobile["Flutter app\n(voice/chat)"] --> Backend["ASP.NET Backend\n(.NET 9, gRPC)"]
    Admin["Blazor Admin"] --> Backend
    Backend --> Speech["Speech Service\n(Whisper/Deepgram)"]
    Backend --> Agent["AI Agent\n(LangGraph + Ollama)"]
    Agent -->|"banking tools"| Backend
    Agent --> Graph["supervisor → specialist\ncritic → response"]
    Backend --> DB[("PostgreSQL")]
    Backend --> Train["Training Service\n(Unsloth LoRA)"]
    Agent --> Chroma[("ChromaDB RAG")]
    Graph --> Ollama(("Ollama LLM"))`,
    accent: "#c084fc",
    metrics: [
      { label: "Language", value: "AR/Libyan" },
      { label: "Agent graph", value: "LangGraph" },
      { label: "Fine-tuning", value: "LoRA/QLoRA" },
    ],
  },
  {
    slug: "release-management",
    name: "Release Management",
    folder: "release_management",
    tagline:
      "Internal release & dev-performance platform with semantic-graph intelligence (Cortex).",
    category: "Engineering",
    problem:
      "The engineering org needed a platform to manage releases, projects, developer performance, and reporting — with a semantic-graph intelligence layer for release notes, forecasting, and duplicate detection.",
    role: "Architected the microservices platform and led the active decomposition from a monolith to per-service databases + gRPC cross-service access, plus the Cortex/Intelligence semantic-graph layer.",
    stack: [
      ".NET 10",
      "ASP.NET Core",
      "gRPC",
      "MassTransit",
      "PostgreSQL",
      "RabbitMQ",
      "Angular",
    ],
    highlights: [
      "Microservices: API Gateway, Auth, Management, Reporting, Cortex/Intelligence",
      "Active decomposition: per-service databases + gRPC (no EF fallback to another service's DB)",
      "Cortex/Intelligence: embeddings + semantic graph for release notes & duplicate-bug detection",
      "Developer-performance ratings, release forecasting, dashboard aggregates",
      "Clean Architecture: libraries/, application/core/, application/features/",
    ],
    capabilities: [
      "Release & project management with tasks and bugs",
      "Developer ratings & per-developer performance metrics",
      "Release notes generation + forecasting",
      "Duplicate-bug detection via semantic embeddings",
      "In-app notifications, rankings, achievements",
    ],
    architecture:
      "A .NET microservices solution (API Gateway, Auth, Management, Reporting, Cortex/Intelligence) communicating via internal gRPC and MassTransit/RabbitMQ. Each service owns its database and migrations. Cortex uses a separate CortexDbContext for embeddings/semantic graph. An Angular UI consumes a gateway. The decomposition tracks removing monolith DbContext usage in favor of gRPC readers.",
    architectureMermaid: `flowchart TB
    UI["Angular UI"] --> GW["API Gateway"]
    GW --> Auth & Mgmt["Management"] & Rpt["Reporting"] & Cortex["Cortex / Intelligence"]
    Mgmt -.->|"internal gRPC"| Auth
    Rpt -.->|"internal gRPC"| Mgmt & Auth
    Cortex -.->|"internal gRPC"| Mgmt
    Auth & Mgmt & Rpt & Cortex --> PG[("PostgreSQL\nper-service DBs")]
    Auth & Mgmt & Rpt & Cortex -.-> RMQ[("RabbitMQ")]`,
    repoUrl: "https://github.com/anstwechy/release-management",
    accent: "#60a5fa",
    metrics: [
      { label: "Services", value: "5" },
      { label: "Intelligence", value: "Cortex" },
      { label: "Decomposition", value: "gRPC" },
    ],
  },
  {
    slug: "omnitest-studio",
    name: "OmniTest Studio",
    folder: "omnitest-studio",
    tagline:
      "Bespoke QA platform — API + Web (Playwright) + Mobile (Maestro) in one visual flow builder.",
    category: "Engineering",
    problem:
      "Testing ten interconnected systems across API, web, and mobile required a unified tool that could mix all three in single flows with shared context — off-the-shelf tools couldn't combine them. So I built one.",
    role: "Designed and built the entire QA studio: the Playground, the visual flow Builder (API/Web/Mobile steps), the reporting & evidence system, the visual web recorder, distributed runner agents, and team auth.",
    stack: [
      "Next.js 15",
      "NestJS",
      "Prisma",
      "BullMQ",
      "React Flow",
      "Playwright",
      "Maestro",
      "PostgreSQL",
      "Redis",
      "Tailwind",
    ],
    highlights: [
      "Three test surfaces in one app: Playground (Postman-style), Builder (visual flows), Reports",
      "Mix API + Web (Playwright) + Mobile (Maestro) steps sharing one variable context",
      "Visual web recorder: live headless Chromium streamed into the UI with selector capture",
      "Distributed runner agents on QA workstations + Android emulator pool",
      "Run comparison, flaky-step detection, HTML/PDF evidence export with redacted secrets",
      "Scheduling, CI tokens, Slack-compatible notifications, flow tags & suites",
    ],
    capabilities: [
      "JSONPath extractions + assertions across mixed API/Web/Mobile steps",
      "Importers: cURL, Postman v2.1, OpenAPI 3.x / Swagger 2",
      "Variables & environments with secret masking + log redaction",
      "Team auth: admin/editor/viewer roles + audit trail",
      "Cross-system QA: wired to test wallet, payments, insurance, release-management",
    ],
    architecture:
      "A pnpm monorepo: apps/web (Next.js 15, Tailwind v4, React Flow, Monaco, TanStack Query) and apps/api (NestJS, Prisma, BullMQ, undici, Playwright library, Maestro CLI). API & worker run on the host so they can launch Playwright browsers and spawn Maestro/adb. Postgres + Redis via Docker Compose. Remote runner agents execute web/mobile jobs on QA workstations.",
    architectureMermaid: `flowchart LR
    subgraph web["Web (Next.js 15)"]
        PG["Playground"]
        BUILDER["Builder (React Flow)"]
        REC["Recorder"]
        RPT["Reports"]
    end
    subgraph api["API (NestJS)"]
        EXEC["Execution worker\n(Playwright + Maestro)"]
        BULL["BullMQ jobs"]
        PRISMA["Prisma"]
    end
    subgraph runners["Runners"]
        QA["QA workstation agents"]
        POOL["Android emulator pool"]
    end
    web -->|"REST"| api
    api --> EXEC
    EXEC -.->|"Web steps"| PW["Playwright browsers"]
    EXEC -.->|"Mobile steps"| MAE["Maestro CLI + adb"]
    QA & POOL -.-> EXEC
    PRISMA --> PG2[("PostgreSQL")]
    BULL --> RD[("Redis")]`,
    repoUrl: "https://github.com/anstwechy/omnitest-studio",
    accent: "#10b981",
    metrics: [
      { label: "Test surfaces", value: "3" },
      { label: "Platforms", value: "API/Web/Mobile" },
      { label: "Runners", value: "Distributed" },
    ],
  },
  {
    slug: "dev-office-assistance",
    name: "Dev Office Assistance",
    codename: "Helm",
    folder: "dev-office-assistance",
    tagline:
      "Internal leadership & delivery workspace — triage, planning, team management & office ops for the dev team.",
    category: "Engineering",
    problem:
      "Running a delivery team requires a single workspace to triage incoming requests, plan work, manage the team, and handle day-to-day office operations — pulling these out of scattered chats and spreadsheets into one place.",
    role: "Designed and built the internal dev-office-assistance app: the request-triage workflow, planning board, team management, and the office-operations tooling used to run the delivery organization.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "Node.js",
    ],
    highlights: [
      "Centralized leadership workspace for triage, planning, team & office management",
      "Request triage workflow pulling work out of scattered chats into one pipeline",
      "Planning board + team management for the delivery organization",
      "Office-operations tooling for day-to-day dev-team management",
    ],
    capabilities: [
      "Incoming-request triage with prioritization & routing",
      "Work planning and task assignment across the team",
      "Team & member management",
      "Office-operations workflows for the development organization",
    ],
    architecture:
      "An internal Next.js web app backed by Node.js/Prisma and PostgreSQL. It centralizes the dev team's leadership workflow — triaging requests, planning work, managing people, and running office operations — in a single workspace. The 'Helm' codename reflects its role as the steering surface for the development office.",
    architectureMermaid: `flowchart TB
    subgraph inputs["Incoming"]
        Req["Requests & signals"]
    end
    subgraph helm["Dev Office Assistance (Helm)"]
        Triage["Triage"]
        Plan["Planning board"]
        Team["Team management"]
        Ops["Office operations"]
    end
    subgraph team["Delivery team"]
        Members["Devs & leads"]
    end
    Req --> Triage
    Triage --> Plan
    Plan --> Members
    Team --> Members
    Ops --> Helm
    Triage & Plan & Team & Ops --> PG[("PostgreSQL")]`,
    repoUrl: "https://github.com/anstwechy/dev-office-assistance",
    accent: "#0ea5e9",
    metrics: [
      { label: "Purpose", value: "Leadership" },
      { label: "Workflows", value: "Triage+Plan" },
      { label: "Users", value: "Dev team" },
    ],
  },
];

/** Quick lookup by slug. */
export const systemBySlug = (slug: string) =>
  systems.find((s) => s.slug === slug);

/** All categories present in the data, for filtering. */
export const categories: SystemCategory[] = [
  "Core Finance",
  "Risk & Compliance",
  "Communications",
  "AI",
  "Integrations",
  "Engineering",
];
