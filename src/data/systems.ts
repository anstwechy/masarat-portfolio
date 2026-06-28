/**
 * Single source of truth for the systems in the Masarat portfolio.
 * Content sourced from each repo's README.md and AGENTS.md.
 * Edit here to update the entire site.
 *
 * NOTE: system count is NEVER hard-coded — components derive it from
 * this array's length so adding/removing a system updates the whole site.
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
  /** A punchy impact line for the card (short) */
  impact: string;
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
      "Digital wallet & double-entry ledger platform for Libyan banks — money movement engineered for consistency at scale.",
    impact: "Money movement that never loses a cent — even under 10k concurrent users.",
    category: "Core Finance",
    problem:
      "Libyan banks needed a digital wallet that customers could trust with real money: onboarding, wallet-to-wallet transfers, merchant payments, cash withdrawals, and pooled accounts. It had to stay strictly consistent under heavy concurrent load, recover cleanly from failures, and prove — not just claim — that every transaction balanced.",
    role: "Architected and engineered the entire platform end to end: the double-entry ledger and its correctness guarantees, durable event publishing, wallet lifecycle, PIN-based debit authorization, the customer gateway, the load-testing harness, and the reconciliation pipeline.",
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
      "Double-entry ledger with zero-sum atomic PostJournal — every journal balances to zero or it's rejected",
      "Unique idempotency keys per ledger entry make retries safe and duplicates impossible",
      "Transactional outbox (MassTransit EF outbox on PostgreSQL) — domain events publish durably with the same commit, never lost",
      "Load-tested to 10,000 concurrent wallets with full ledger-consistency verification on every run",
      "Sub-1.5s p99 transfer latency SLO held at ~121 transfer ops/s under the 10k profile",
      "Wallet PIN (PBKDF2) + short-lived transaction-authorization tokens gate every debit flow",
      "Configurable concurrency and backpressure gates on both ledger and transactions prevent overload collapse",
      "Reconciliation job exports ledger entries and matches them against bank statements automatically",
    ],
    capabilities: [
      "User onboarding (resident & foreign) with wallet provisioning",
      "Wallet-to-wallet transfers, merchant payments, cash withdrawals",
      "Pooled accounts and wallet funding with full reversal support",
      "Pending-transaction repair and idempotency-retention cleanup workers",
      "Customer Gateway: REST façade with JWT, per-app API keys, persona routing, and rate limiting",
      "Optional webhooks with HMAC-SHA256 signed payloads",
      "Per-bank session assignment (deferred) to remove write-path contention",
      "PgBouncer pooling tuned for high-throughput ledger writes",
    ],
    architecture:
      "A microservices platform organized around bounded contexts. Users handles onboarding; Wallets owns wallet lifecycle and calls Ledger over gRPC to create liability accounts; Transactions orchestrates money movement and reads the shared wallets database, posting atomic journals to Ledger. All cross-service calls are gRPC (contracts in Masarat.GrpcContracts); async events flow over RabbitMQ via MassTransit using a transactional outbox so nothing is lost. Each service owns its PostgreSQL database. A Customer Gateway exposes REST for bank mobile apps with JWT and per-app keys. OpenTelemetry feeds Prometheus, Loki, and Tempo, unified in Grafana.",
    architectureMermaid: `flowchart TB
    subgraph clients["Clients"]
        Mobile["Flutter mobile app"]
        Direct["gRPC integrators"]
    end

    subgraph gateway["Customer Gateway :5006"]
        GW["REST façade\\nJWT + per-app API keys\\nrate limiting + persona routing"]
    end

    subgraph core["Core services"]
        Users["Users :5003\\nonboarding + registration"]
        Wallets["Wallets :5002\\nlifecycle + PIN\\ntx-outbox"]
        Tx["Transactions :5004\\ntransfers + payments\\ntx-outbox"]
        Ledger["Ledger :5001\\ndouble-entry\\natomic PostJournal"]
    end

    subgraph async["Async + data"]
        RMQ[("RabbitMQ / MassTransit")]
        UsersDb[("MasaratUsers")]
        WalletsDb[("MasaratWallets")]
        LedgerDb[("MasaratLedger")]
    end

    subgraph obs["Observability"]
        OTel["OpenTelemetry → Prometheus · Loki · Tempo · Grafana"]
    end

    Mobile --> GW
    Direct --> Tx
    GW --> Users & Wallets & Tx
    Users -->|"create wallet"| Wallets
    Wallets -->|"create liability · get balance"| Ledger
    Tx -->|"getBalance · postJournal"| Ledger
    Wallets -->|"publish WalletCreatedEvent"| RMQ
    Tx -->|"publish TransferCompletedEvent"| RMQ
    Users --> UsersDb
    Wallets --> WalletsDb
    Tx -.->|"shared reads"| WalletsDb
    Ledger --> LedgerDb
    core -.-> obs`,
    repoUrl: "https://github.com/anstwechy/wallet-services",
    accent: "#2dd4bf",
    metrics: [
      { label: "Concurrent users", value: "10k" },
      { label: "Transfer p99", value: "<1.5s" },
      { label: "Ledger", value: "Double-entry" },
    ],
  },
  {
    slug: "payment-ecosystem",
    name: "MITF Payment Ecosystem",
    folder: "mitf_payment_eco_system",
    tagline:
      "Online payments V1/V2, a merchant portal, and an API-key control plane — replacing direct bank-credential integrations with a secure ecosystem.",
    impact: "Merchants pay by API key; bank credentials never leave the internal boundary.",
    category: "Core Finance",
    problem:
      "MITF online payments were built on direct bank-credential integrations — every merchant and channel had to handle real bank credentials. The goal was to transform this into a secure Merchant Integration Ecosystem: merchants onboard through a portal, integrators authenticate with API keys, and bank credentials stay strictly internal, all while the proven payment engine keeps running unchanged.",
    role: "Designed the multi-repo architecture and authored the formal CONTRACT.md that governs split write-ownership. Built the dual-auth V2 API, the dedicated API-key secret plane, the thin gRPC bank gateway, and the merchant portal.",
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
      "Dual-auth V2 API: a JWT path proxies the frozen V1 verbatim (zero breaking change), a new x-api-key path serves fresh /v2/* RESTful routes",
      "Dedicated API Key Service with Argon2id hashing and full lifecycle — issue, list, revoke, rotate, scopes, expiry — plus audit",
      "Thin gRPC bank gateway (mitf-legacy-core) is the sole owner of V1 bank clients and SQL Server DBs",
      "Strict boundary rule: only legacy-core may reference V1 internals; everything else talks to it over gRPC",
      "Idempotent payment-session lifecycle with quotas, audit, OnUs and cross-bank (OnePay/QR) payments",
      "Full report suite: refund, webhook-delivery, funnel, by-channel, transactions-export",
      "MerchantIntegrationDb shared under split write-ownership per the CONTRACT.md contract",
    ],
    capabilities: [
      "Merchant Portal API + Web: Integration CRUD, masked credential view, plugin releases",
      "V2-owned session lifecycle with idempotency, audit, and quota enforcement",
      "OnUs payments and cross-bank OnePay/QR payments",
      "Report suite spanning refunds, webhook delivery, funnels, and channel breakdowns",
      "WooCommerce channel with a hard cut to API keys only — no bank creds in WordPress",
    ],
    architecture:
      "A workspace of cooperating services governed by a formal contract. Online Payment API V2 (FastEndpoints, Postgres) owns the new surface with a dual-auth model: JWT requests proxy the frozen V1, API-key requests hit fresh /v2/* routes. mitf-legacy-core is a thin .NET 10 gRPC gateway and the sole owner of V1's bank clients and SQL Server DBs. The API Key Service owns the secret plane — Argon2id-hashed keys with audit — and shares MerchantIntegrationDb with the portal under split write-ownership.",
    architectureMermaid: `flowchart TB
    subgraph channels["Channels"]
        Woo["WooCommerce plugin\\n(api_key only)"]
        Direct["Direct API / POS"]
    end

    subgraph portal["Merchant Portal"]
        Web["Portal Web (Angular)"]
        API["Portal API\\nIntegration CRUD + masked creds"]
    end

    subgraph keyplane["API Key Service :5240"]
        Key["Argon2id hashing\\nlifecycle + audit\\n/internal/resolve-key"]
    end

    subgraph v2["Payment API V2 :5109"]
        V2["FastEndpoints + Postgres\\ndual-auth"]
        Sess["V2 sessions\\nidempotency · audit · quotas"]
    end

    subgraph legacy["Legacy core"]
        Core["mitf-legacy-core :5118\\nthin gRPC gateway"]
        Bank[("Bank / bank-mock")]
    end

    Woo & Direct --> V2
    Web --> API
    V2 -->|"JWT path: proxy V1"| V1["frozen V1"]
    V2 -->|"API-key path"| Sess
    Sess -->|"gRPC Pay/Balance/Status"| Core
    V2 -.->|"resolve-key (cached 30s)"| Key
    API -->|"gRPC GetMerchantCredentials"| Core
    Key -->|"gRPC GetMerchantCredentials"| Core
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
      "A multi-service voucher platform — stock management, per-bank internal APIs, external reservations, a gateway BFF, and saga-based purchase orchestration.",
    impact: "Vouchers issued, stocked, reserved, and reconciled across banks and partners.",
    category: "Core Finance",
    problem:
      "Issuing and redeeming vouchers across an admin back office, multiple partner banks, and external reservation channels requires careful coordination: encrypted stock distribution to each bank, real-time reservation counters, and reliable multi-step purchase flows — all kept consistent across services.",
    role: "Engineered the full five-service voucher platform: the stock/management API and admin SPA, the per-bank internal APIs, the external reservation service with Redis counters and MassTransit coordination, the gateway BFF, and the saga-based purchase orchestrator.",
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
      "Encrypted stock export from management to per-bank internal deployments",
      "External API owns Redis-backed reservation counters and RabbitMQ/MassTransit consumers",
      "Saga/bundle purchase orchestration coordinated over SQL Server and RabbitMQ",
      "Third-party provider health monitoring and finance-oriented reporting",
      "Full QA tiers: Newman/Postman API regression, Playwright UI CRUD, Maestro mobile smoke",
    ],
    capabilities: [
      "Stock catalog: imports/exports, branches, reports, third-party provider health",
      "Per-bank internal APIs serving bank-specific databases with reservation behaviour",
      "External reservations with Redis counters and MassTransit event consumers",
      "Gateway BFF (Mitf.VoucherProvider) for consumer-facing HTTP",
      "Purchase orchestrator for bundle and saga flows",
      "Remote foreign-stock operations over gRPC only (no cross-service DB access)",
    ],
    architecture:
      "A workspace monorepo of five .NET API hosts. Management exports encrypted stock to per-bank Internal deployments. External owns reservations with Redis counters and RabbitMQ consumers coordinating with other services. The Gateway is a backend-for-frontend for consumer flows. The Purchase Orchestrator coordinates bundle and saga flows over SQL Server and RabbitMQ. Shared infrastructure: SQL Server (many databases), Redis, and RabbitMQ.",
    architectureMermaid: `flowchart TB
    subgraph clients["Clients"]
        SPA["Stock SPA (Angular)"]
        Partner["Partner banks"]
        Ext["External reservation flows"]
    end

    subgraph edge["Edge"]
        GW["Gateway BFF\\nconsumer-facing HTTP"]
    end

    subgraph core["Core APIs"]
        Stock["Stock / Management\\ncatalog · reports · health"]
        Internal["Internal API\\n(per bank deployment)"]
        External["External API\\nreservations + consumers"]
        Orch["Purchase Orchestrator\\nsaga / bundle flows"]
    end

    subgraph data["Data & messaging"]
        SQL[("SQL Server\\nmany DBs")]
        Redis[("Redis\\ncounters")]
        RMQ[("RabbitMQ\\nMassTransit")]
    end

    SPA --> Stock
    Partner --> Internal
    Ext --> External
    clients & External -.-> GW
    GW --> Internal
    Stock --> SQL
    External --> SQL & Redis & RMQ
    Internal --> SQL
    Orch --> SQL & RMQ
    Stock -.->|"encrypt / export"| Internal`,
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
      "A provider-neutral insurance integration hub — Sanad and INC/Tameen unified behind one secure, stable API.",
    impact: "Client apps integrate once; partner credentials stay server-side.",
    category: "Integrations",
    problem:
      "Each external insurance provider (Sanad, INC/Tameen) exposes a different API with its own auth, envelope shape, and quirks. Client apps shouldn't have to know which provider they're calling or hold partner credentials. The hub abstracts all of that behind one stable, secure surface.",
    role: "Designed the hub-and-adapter architecture with a provider-neutral route surface, per-provider clients with Polly resilience, and config-toggleable middleware for rate limiting, forwarded headers, and telemetry.",
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
      "Partner X-Api-Key and bearer tokens stay server-side — clients never hold them",
      "Per-provider adapters (Sanad → sanadapi.ly, INC/Tameen → devtameen.webapi.ly) each with Polly retries",
      "Toggleable rate limiting, forwarded headers, and OTLP telemetry via configuration",
      "Full insurance journeys: travel, compulsory, orange card across both providers",
      "EF migrations applied on startup; health and readiness endpoints",
    ],
    capabilities: [
      "Connectivity, customers/vehicles, quotes/policies, payments, verification",
      "Factory + adapter pattern: GetClient('sanad' | 'inc') → typed, resilient client",
      "PostgreSQL persistence for flows and correlation metadata",
      "Newman/Postman hub integration suites plus direct provider test suites",
      "Configurable dangerous-dev certificate-validation guardrail for production safety",
    ],
    architecture:
      "An ASP.NET Core API that integrates external insurers behind a hub route surface. Middleware (forwarded headers, rate limiting, correlation ID, hub authentication) runs before the integration routes. A factory selects the right provider adapter; each adapter maps the stable hub contract to its upstream API with Polly resilience and maps provider-specific response envelopes (for example INC's MainResponse success semantics) into a unified shape. PostgreSQL persists flow and correlation metadata.",
    architectureMermaid: `flowchart TB
    subgraph clients["Clients"]
        CL["Mobile · web · BFF"]
    end

    subgraph hub["Insurance Hub — ASP.NET Core"]
        MW["Middleware\\nforwarded headers · rate limit\\ncorrelation ID · hub auth"]
        RTE["Integration API\\n/v1/hub/{provider}/…"]
        FAC["Provider Client Factory\\nGetClient(sanad|inc)"]
    end

    subgraph adapters["Adapters (per provider)"]
        SA["Sanad client\\n+ Polly retries"]
        INC["INC client\\n+ Polly retries\\nMainResponse mapping"]
    end

    subgraph upstream["Upstream insurers"]
        SANAPI["sanadapi.ly\\n/api/integration/*"]
        INCAPI["devtameen.webapi.ly\\n/api/*"]
    end

    CL -->|"HTTPS"| MW
    MW --> RTE --> FAC
    FAC --> SA & INC
    SA -->|"X-Api-Key"| SANAPI
    INC -->|"Bearer"| INCAPI
    RTE --> PG[("PostgreSQL\\nflows + correlation")]
    hub -.-> OTel["OpenTelemetry"]`,
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
      "Bank-scoped push notifications — template design, bulk send, and Firebase/Huawei delivery with a fully bilingual admin.",
    impact: "Operators launch bank-wide campaigns; customers get the right message, every time.",
    category: "Communications",
    problem:
      "Bank operations teams needed a controlled way to design notification templates, manage banks and applications, run large bulk sends, and review content before it reaches customers — delivering reliably through Firebase and Huawei to the right recipients, including complex joint-bank and UCD audience lookups.",
    role: "Built the notification API (auth, templates, bulk jobs, structure, surveys), the bilingual React admin, recipient resolution including joint-bank and UCD lookups, and the Firebase/Huawei delivery pipeline with chunked batching.",
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
      "Recipient resolution including joint-bank and UCD HTTP lookups; large lists chunked in batches of 500",
      "Firebase and Huawei delivery via device tokens and FCM topic conditions (OR joins)",
      "Fully bilingual EN/AR admin (React 19 + Vite + Mantine) with complete RTL support",
      "Hangfire one-shot scheduling on SQL Server — no Redis dependency",
      "Template lifecycle: draft → review → published, with feature-level permissions via JWT",
    ],
    capabilities: [
      "Template design with targeting modes (topics, filters, file-based lists)",
      "Bulk Send for large file-based recipient uploads with staging",
      "FCM topic management with multi-topic OR conditions",
      "UCD/joint-bank HTTP expansion of phone lists",
      "Permission-aware routes and feature-level permissions exposed through the session JWT",
      "Optional UCD mock server for local integration without real upstream services",
    ],
    architecture:
      "A .NET API persists to SQL Server, resolves recipients (optionally calling UCD/joint-bank services to expand phone lists), and batches Firebase and Huawei sends. A React admin built with Mantine and Vite provides bilingual operations UI. Hangfire on SQL Server handles one-shot scheduling with no Redis dependency. An optional UCD mock server enables local integration testing without real upstream services.",
    architectureMermaid: `flowchart LR
    subgraph ops["Operators"]
        UI["React admin (EN/AR · RTL)\\nMantine + Vite"]
    end

    subgraph core["Core"]
        API[".NET Notification API\\nauth · templates · structure"]
        HF["Hangfire\\none-shot scheduling"]
        DB[("SQL Server")]
    end

    subgraph resolve["Recipient resolution"]
        UCD["UCD / joint-bank HTTP\\nphone-list expansion"]
    end

    subgraph outbound["Outbound delivery"]
        FCM["Firebase"]
        HW["Huawei"]
        Topics["FCM topics\\n(OR conditions)"]
    end

    UI -->|"HTTPS /api"| API
    API --> DB
    API --> HF
    API --> UCD
    API -->|"chunked batches of 500"| FCM
    API --> HW
    FCM --> Topics
    FCM -.-> Devices["customer devices"]
    HW -.-> Devices`,
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
      "A production-grade Anti-Money-Laundering platform — configurable rules, ML.NET anomaly scoring, and sanctions/PEP screening, multi-tenant.",
    impact: "Every transaction screened in real time; suspicious activity routed to compliance.",
    category: "Risk & Compliance",
    problem:
      "Libyan banking institutions must screen transactions in real time against configurable AML business rules, machine-learning anomaly detection, and sanctions and politically-exposed-person (PEP) lists — then route alerts through a centralized case-management workflow that compliance teams can actually operate.",
    role: "Architected and built the entire AML platform: the multi-tenant analyzer pipeline (rules + ML scoring + sanctions/PEP), the central management API with case lifecycle, the Angular compliance portal, and the service-discovery and observability stack.",
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
      "Hybrid screening: configurable business rules (RulesEngine) + ML.NET Randomized PCA anomaly detection + sanctions/PEP",
      "Multi-tenant: a dedicated Analyzer instance per bank (Tejari, Sahara, Jumhoria) consuming its own transaction queue",
      "RabbitMQ topic exchange with dead-letter queue and exponential retry via MassTransit",
      "Centralized case management: idempotent alert creation and round-robin analyst assignment",
      "Angular 17 compliance portal with dashboards, alerts, cases, and analytics",
      "Separate fraud-review path that emits FRAUD_REVIEW webhooks when enabled",
      "Full observability: OTel → Prometheus, Grafana Loki, Grafana Tempo",
    ],
    capabilities: [
      "Real-time transaction ingestion via HMAC-signed webhooks and RabbitMQ",
      "Parallel and sequential AML rule evaluation from JSON-defined rule sets",
      "ML.NET anomaly scoring with documented retraining and tuning",
      "Sanctions and PEP screening applied per transaction",
      "Compliance reporting scoped to date ranges plus portfolio risk snapshots",
      "Consul service discovery and KV configuration with health checks",
    ],
    architecture:
      "Banks and mock adapters publish TransactionQueueMessages to RabbitMQ; per-tenant FlowGuard.Analyzer instances consume them, run rules plus ML plus sanctions, then send HMAC-signed webhooks to FlowGuard.Management. Management handles idempotent alert creation, auto-assigns cases round-robin to analysts, and exposes REST to the Angular compliance portal. Consul provides service discovery and KV config; OpenTelemetry feeds Prometheus, Grafana Loki, and Grafana Tempo.",
    architectureMermaid: `flowchart TB
    subgraph banks["Banks / adapters"]
        B1["Tejari adapter"]
        B2["Sahara adapter"]
        B3["Jumhoria adapter"]
    end

    subgraph queue["Ingestion"]
        RMQ[("RabbitMQ\\ntopic exchange + DLQ\\nexponential retry")]
    end

    subgraph analyzer["FlowGuard.Analyzer (per bank)"]
        Rules["RulesEngine\\nJSON rules"]
        ML["ML.NET\\nRandomized PCA"]
        Sanctions["Sanctions / PEP"]
        Fraud["Fraud review\\n(optional)"]
    end

    subgraph mgmt["FlowGuard.Management"]
        Mgmt["alert lifecycle\\nidempotent create\\nround-robin assign"]
    end

    subgraph ui["Compliance"]
        Portal["AML Portal (Angular 17)\\ndashboards · alerts · cases"]
    end

    subgraph infra["Infra & obs"]
        PG[("PostgreSQL")]
        Redis[("Redis")]
        Consul["Consul\\ndiscovery + KV"]
        OTel["OpenTelemetry → Grafana"]
    end

    B1 & B2 & B3 -->|"publish tx"| RMQ
    RMQ --> analyzer
    Rules --> ML --> Sanctions --> Fraud
    analyzer -->|"HMAC webhook"| Mgmt
    Mgmt --> Portal
    analyzer --> PG
    Mgmt --> PG
    analyzer -.-> Redis
    RMQ -.-> Consul
    analyzer & mgmt -.-> OTel`,
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
      "A voice AI banking assistant in Arabic and the Libyan dialect — a LangGraph agent, speech recognition, and a self-hosted fine-tuning pipeline.",
    impact: "Customers bank by voice in their own dialect; high-risk actions pause for approval.",
    category: "AI",
    problem:
      "Bank customers should be able to check balances, see transactions, transfer money, buy vouchers, and ask general questions using their voice — in Arabic and the specific Libyan dialect — while risky actions like transfers stay safe behind human-in-the-loop approval. Off-the-shelf assistants don't understand the dialect or the banking domain.",
    role: "Built the polyglot, multi-service system: the ASP.NET backend gateway, the LangGraph agent pipeline with its supervisor→specialist→critic design, the speech service, the self-hosted fine-tuning pipeline, and the Blazor admin for config and data cleansing.",
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
      "Bilingual voice and chat assistant understanding Arabic and the Libyan dialect",
      "LangGraph agent with a supervisor → specialist → critic graph and dual execution paths (compiled + streaming)",
      "Human-in-the-loop approval for high-value transfers above a configurable threshold",
      "Self-hosted LoRA/QLoRA fine-tuning pipeline (Unsloth → GGUF for Ollama)",
      "Deepgram Nova-3 for Libyan-Arabic speech recognition (17 Arabic dialects, lower WER)",
      "Training-data cleansing: voice recordings and chat 'Real meaning' correction before export",
      "Compliance node with a configurable checklist; regression suite with golden intent/entities data",
    ],
    capabilities: [
      "Balance, transactions, transfer, voucher purchase, and general Q&A by voice or chat",
      "Bill and invoice image OCR (PaddleOCR) merged into the intent pipeline",
      "Compliance node with configurable checklist (transfer limits, AML re-verify)",
      "ChromaDB RAG knowledge base for FAQs, fees, and policies",
      "Intent extraction with dictionary, embedding, and fuzzy fallbacks",
      "Dialect normalization handling Arabizi, spelling, and Libyan variants",
    ],
    architecture:
      "A Flutter mobile app talks to an ASP.NET backend (HTTP and gRPC gateway) that orchestrates a Speech service (FastAPI with Whisper/Deepgram) and an AI Agent (FastAPI with LangGraph and Ollama). The agent executes through either a compiled LangGraph pipeline or a low-latency streaming path, calling back into the backend for banking tools. A Training service (Unsloth) handles fine-tuning; a Blazor admin manages configuration, data cleansing, and jobs. Config lives in PostgreSQL and is refreshed by the AI and speech services.",
    architectureMermaid: `flowchart TB
    subgraph client["Client"]
        Mobile["Flutter app\\nvoice + chat + image"]
    end

    subgraph gateway["Backend gateway"]
        Backend["ASP.NET :8102\\nHTTP + gRPC\\norchestration"]
        Admin["Blazor Admin :8103\\nconfig · cleansing · jobs"]
    end

    subgraph ai["AI services"]
        Speech["Speech :8100/50053\\nWhisper / Deepgram Nova-3"]
        Agent["AI Agent :8101/50051\\nLangGraph + Ollama"]
        Train["Training :8104\\nUnsloth LoRA/QLoRA"]
    end

    subgraph graph["Agent graph"]
        Sup["supervisor → specialist\\ncritic → response"]
        Comply["compliance node"]
    end

    subgraph data["Data & models"]
        PG[("PostgreSQL\\nconfig")]
        Chroma[("ChromaDB RAG")]
        Ollama(("Ollama LLM"))
        GGUF["GGUF model"]
    end

    Mobile --> Backend
    Admin --> Backend
    Backend -->|"Transcribe"| Speech
    Backend -->|"Process / Stream"| Agent
    Agent -->|"banking tools gRPC"| Backend
    Agent --> Sup
    Sup --> Comply
    Agent <--> Chroma
    Sup --> Ollama
    Backend --> PG
    Admin --> Train
    Train --> GGUF
    GGUF -.-> Ollama`,
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
      "An internal release and developer-performance platform with a semantic-graph intelligence layer (Cortex).",
    impact: "Releases tracked, developers measured, duplicate bugs caught automatically.",
    category: "Engineering",
    problem:
      "An engineering organization needs a platform to manage releases, projects, tasks, and bugs, measure developer performance fairly, and surface intelligence — release notes, forecasting, and duplicate detection — without one service reaching into another's database.",
    role: "Architected the microservices platform and led the active decomposition from a shared monolith database to per-service databases with gRPC cross-service access, plus the Cortex/Intelligence semantic-graph layer.",
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
      "Microservices: API Gateway, Auth, Management, Reporting, and Cortex/Intelligence",
      "Active decomposition: per-service databases with gRPC for cross-service data (no EF fallback to another service's DB)",
      "Cortex/Intelligence: embeddings and a semantic graph for release notes and duplicate-bug detection",
      "Developer-performance ratings, release forecasting, and dashboard aggregates",
      "Clean Architecture: libraries/, application/core/, application/features/",
      "Internal gRPC readers replace monolith EF access across Management, Reporting, and Cortex",
    ],
    capabilities: [
      "Release and project management with tasks and bugs",
      "Developer ratings and per-developer performance metrics",
      "Release-notes generation and forecasting",
      "Duplicate-bug detection via semantic embeddings",
      "In-app notifications, rankings, and achievements",
      "Per-service EF migrations with separate migration history tables",
    ],
    architecture:
      "A .NET microservices solution — API Gateway, Auth, Management, Reporting, and Cortex/Intelligence — communicating over internal gRPC and MassTransit/RabbitMQ. Each service owns its database and migrations; the decomposition actively removes monolith DbContext usage in favour of internal gRPC readers. Cortex uses a dedicated CortexDbContext for embeddings and the semantic graph. An Angular UI consumes the gateway.",
    architectureMermaid: `flowchart TB
    subgraph ui["Frontend"]
        UI["Angular UI"]
    end

    subgraph gateway["Edge"]
        GW["API Gateway"]
    end

    subgraph services["Services (own DB each)"]
        Auth["Auth"]
        Mgmt["Management"]
        Rpt["Reporting"]
        Cortex["Cortex / Intelligence\\nembeddings + semantic graph"]
    end

    subgraph cross["Cross-service (gRPC only)"]
        Readers["IAuthUserReader\\nIInternalManagementReader\\n(no EF fallback)"]
    end

    subgraph data["Data & messaging"]
        PG[("PostgreSQL\\nper-service DBs\\nCortexDbContext")]
        RMQ[("RabbitMQ / MassTransit")]
    end

    UI --> GW
    GW --> Auth & Mgmt & Rpt & Cortex
    Mgmt -.->|"internal gRPC"| Auth
    Rpt -.->|"internal gRPC"| Mgmt & Auth
    Cortex -.->|"internal gRPC"| Mgmt
    Readers -.-> services
    Auth & Mgmt & Rpt & Cortex --> PG
    Auth & Mgmt & Rpt & Cortex -.-> RMQ`,
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
      "A bespoke QA platform — API, Web (Playwright), and Mobile (Maestro) testing combined in one visual flow builder.",
    impact: "One tool tests API, web, and mobile together — built because nothing else could.",
    category: "Engineering",
    problem:
      "The platform spans many interconnected systems across API, web, and mobile. Testing them required a unified tool that could mix all three in single flows with a shared variable context — but off-the-shelf tools couldn't combine them. So I built one.",
    role: "Designed and built the entire QA studio: the Playground, the visual flow Builder (API/Web/Mobile steps), the reporting and evidence system, the visual web recorder, distributed runner agents, and team authentication.",
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
      "Visual web recorder: a live headless Chromium streamed into the UI with selector capture and assertions",
      "Distributed runner agents on QA workstations plus an Android emulator pool",
      "Run comparison, flaky-step detection, and HTML/PDF evidence export with redacted secrets",
      "Scheduling, CI tokens, Slack-compatible notifications, flow tags and suites",
    ],
    capabilities: [
      "JSONPath extractions and assertions across mixed API/Web/Mobile steps",
      "Importers: cURL, Postman v2.1, OpenAPI 3.x / Swagger 2",
      "Variables and environments with secret masking and log redaction",
      "Team auth: admin/editor/viewer roles with a full audit trail",
      "Cross-system QA wired to test wallet, payments, insurance, and release management",
      "Remote runner execution of web and mobile jobs on QA workstations",
    ],
    architecture:
      "A pnpm monorepo: apps/web (Next.js 15, Tailwind v4, React Flow, Monaco, TanStack Query) and apps/api (NestJS, Prisma, BullMQ, undici, the Playwright library, and the Maestro CLI). The API and worker run on the host so they can launch Playwright browsers and spawn Maestro and adb. PostgreSQL and Redis run via Docker Compose. Remote runner agents execute web and mobile jobs on QA workstations and report back.",
    architectureMermaid: `flowchart TB
    subgraph web["Web — Next.js 15"]
        PG["Playground\\nPostman-style"]
        Builder["Builder\\nReact Flow canvas"]
        Recorder["Visual recorder\\nlive headless Chromium"]
        Reports["Reports + evidence"]
    end

    subgraph api["API — NestJS"]
        Exec["Execution worker\\nAPI · Web · Mobile steps"]
        Jobs["BullMQ jobs\\nscheduling · retention"]
        Prisma["Prisma"]
    end

    subgraph exec["Executors"]
        HTTP["undici HTTP"]
        PW["Playwright browsers"]
        Maestro["Maestro CLI + adb"]
    end

    subgraph runners["Runners"]
        QA["QA workstation agents"]
        Pool["Android emulator pool"]
    end

    subgraph data["Data"]
        DB[("PostgreSQL")]
        RD[("Redis")]
    end

    web -->|"REST"| api
    api --> Exec
    Exec --> HTTP & PW & Maestro
    QA & Pool -.->|"web + mobile jobs"| Exec
    api --> Jobs
    Prisma --> DB
    Jobs --> RD`,
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
      "An internal leadership and delivery workspace — triage, planning, team management, and office operations for the development team.",
    impact: "The dev team's day-to-day, pulled out of scattered chats into one place.",
    category: "Engineering",
    problem:
      "Running a delivery team means constantly triaging incoming requests, planning work, managing people, and handling day-to-day office operations. When that lives across scattered chats and spreadsheets, things slip. The team needed a single workspace to steer it all.",
    role: "Designed and built the internal dev-office-assistance app: the request-triage workflow, the planning board, team management, and the office-operations tooling used to run the delivery organization.",
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
      "A centralized leadership workspace for triage, planning, team, and office management",
      "Request-triage workflow that pulls work out of scattered chats into one pipeline",
      "Planning board and team management for the delivery organization",
      "Office-operations tooling for day-to-day dev-team management",
      "The 'Helm' codename reflects its role steering the development office",
    ],
    capabilities: [
      "Incoming-request triage with prioritization and routing",
      "Work planning and task assignment across the team",
      "Team and member management",
      "Office-operations workflows for the development organization",
    ],
    architecture:
      "An internal Next.js web app backed by Node.js, Prisma, and PostgreSQL. It centralizes the dev team's leadership workflow — triaging requests, planning work, managing people, and running office operations — in a single workspace. As a leadership surface it sits alongside the engineering systems, giving the team one place to steer delivery.",
    architectureMermaid: `flowchart TB
    subgraph inputs["Incoming"]
        Req["Requests and signals"]
    end

    subgraph helm["Dev Office Assistance — Helm"]
        Triage["Triage\\nprioritize + route"]
        Plan["Planning board\\ntasks + assignment"]
        Team["Team management"]
        Ops["Office operations"]
    end

    subgraph team["Delivery team"]
        Leads["Leads"]
        Devs["Developers"]
    end

    subgraph data["Data"]
        PG[("PostgreSQL")]
    end

    Req --> Triage
    Triage --> Plan
    Plan --> Devs
    Team --> Leads & Devs
    Ops --> team
    Triage & Plan & Team & Ops --> PG`,
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

/** Total system count — derived, never hard-coded. */
export const systemCount = systems.length;

/** All categories present in the data, for filtering. */
export const categories: SystemCategory[] = [
  "Core Finance",
  "Risk & Compliance",
  "Communications",
  "AI",
  "Integrations",
  "Engineering",
];
