// ── Editable content placeholders ──────────────────────────────
// Replace links, metrics, copy and entries with real data later.

export const PROFILE = {
  name: "Aashay Soni",
  firstName: "Aashay",
  role: "GenAI & Agentic Systems Engineer",
  tagline: "Autonomous agents, RAG architectures, and intelligent automation — engineered, not demoed.",
  email: "hello@aashaysoni.dev",
  location: "Mumbai, IN",
  availability: "Accepting select projects & advisory",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "X / Twitter", href: "#" },
    { label: "Hugging Face", href: "#" },
    { label: "Substack", href: "#" },
  ],
};

export const HERO_STREAM = [
  "agent.orchestrator → planning task DAG…",
  "retriever: 14 chunks · cosine ≥ 0.87",
  "tool_call: calendar.schedule() ✓ 200ms",
  "self-critique pass 2/2 — confidence 0.94",
  "workflow latency ↓ 63% vs baseline",
  "deploy: agent-mesh v2.4.1 → production",
];

export const CAPABILITIES = [
  {
    id: "genai",
    index: "01",
    title: "Generative AI Systems",
    blurb:
      "Production-grade LLM pipelines — structured output, eval harnesses, prompt/version governance, and cost-aware routing across model tiers.",
    tags: ["LLM Ops", "Eval Harnesses", "Structured Output", "Prompt Governance"],
  },
  {
    id: "agentic",
    index: "02",
    title: "Agentic AI",
    blurb:
      "Multi-agent orchestration with planning, tool use, memory, and self-critique loops. Agents that recover from failure instead of hallucinating through it.",
    tags: ["Multi-Agent", "Tool Use", "Memory", "Self-Critique"],
  },
  {
    id: "automation",
    index: "03",
    title: "Intelligent Automation",
    blurb:
      "Event-driven workflows that fuse deterministic pipelines with model reasoning — the boring reliability of automation, the judgment of an agent.",
    tags: ["Workflow Engines", "Event-Driven", "Human-in-the-Loop"],
  },
];

export const METRICS = [
  { label: "Task accuracy on evals", value: "94.2%" },
  { label: "Workflow latency reduction", value: "−63%" },
  { label: "Token efficiency gain", value: "3.1×" },
  { label: "Agents shipped to prod", value: "17" },
];

export const AGENT_SIMULATIONS = {
  researcher: {
    label: "Research Agent",
    steps: [
      "→ parsing query intent…",
      "→ decomposing into 4 sub-questions",
      "→ searching vector store (top-k=12)",
      "→ cross-checking sources for contradiction",
      "→ synthesising answer with citations",
      "✓ report ready · confidence 0.93",
    ],
  },
  operator: {
    label: "Ops Automator",
    steps: [
      "→ watching event bus: new_ticket",
      "→ classifying severity: P2",
      "→ drafting resolution from runbook v7",
      "→ staging change in sandbox",
      "→ requesting human approval",
      "✓ merged · mttr −41%",
    ],
  },
  builder: {
    label: "Code Builder",
    steps: [
      "→ reading repo graph (1,204 files)",
      "→ planning patch across 3 modules",
      "→ writing tests first (tdd mode)",
      "→ executing suite: 48/48 pass",
      "→ opening PR with rationale",
      "✓ review requested · 0 regressions",
    ],
  },
};

export const EXPERIENCE_FILTERS = ["All Systems", "Agentic AI", "Automation", "RAG & Tuning"];

export const EXPERIENCE = [
  {
    id: "exp-1",
    period: "2024 — Present",
    role: "Lead Agentic Systems Engineer",
    org: "Example — Nebula AI Labs",
    category: "Agentic AI",
    summary:
      "Owning the multi-agent platform behind customer-facing autonomous workflows.",
    details:
      "Designed a planner–executor–critic mesh handling 2M+ tasks/month. Introduced typed tool contracts and replayable agent traces, cutting incident triage from hours to minutes.",
    stack: ["LangGraph", "FastAPI", "Temporal", "Postgres", "Ray"],
    impact: "2M+ autonomous tasks / month",
  },
  {
    id: "exp-2",
    period: "2022 — 2024",
    role: "Senior GenAI Engineer",
    org: "Example — Vectorfield",
    category: "RAG & Tuning",
    summary:
      "Built retrieval and fine-tuning infrastructure for enterprise knowledge products.",
    details:
      "Shipped a hybrid retrieval stack (dense + sparse + rerank) lifting answer faithfulness 31%. Led domain-adaptive fine-tunes with automated eval gates before every deploy.",
    stack: ["PyTorch", "vLLM", "Qdrant", "Modal", "Weights & Biases"],
    impact: "+31% answer faithfulness",
  },
  {
    id: "exp-3",
    period: "2021 — 2022",
    role: "Automation Engineer",
    org: "Example — Orbitworks",
    category: "Automation",
    summary:
      "Replaced brittle RPA with event-driven, model-assisted workflows.",
    details:
      "Migrated 140+ legacy bots to resilient workflow orchestration with human-in-the-loop checkpoints. Added LLM classification at decision points where rules used to break.",
    stack: ["Python", "Airflow", "Kafka", "OpenAI", "dbt"],
    impact: "140+ bots retired, 99.95% uptime",
  },
  {
    id: "exp-4",
    period: "2020 — 2021",
    role: "ML Engineer",
    org: "Example — Northwind Studio",
    category: "RAG & Tuning",
    summary:
      "First ML hire; took prototypes from notebooks to serving infrastructure.",
    details:
      "Built the model serving layer, CI for data + models, and the company's first semantic search product used by 40k monthly users.",
    stack: ["scikit-learn", "Docker", "GCP", "Elastic", "React"],
    impact: "0 → 40k monthly search users",
  },
];

export const VIBE_MODES = [
  {
    id: "deep",
    label: "Deep Work Mode",
    readout: "lo-fi playlist on · notifications dead · shipping agents until 3am and calling it 'a quick fix'",
    stat: "focus: 100%",
  },
  {
    id: "builder",
    label: "Builder Mode",
    readout: "not your average wrapper dev — we build autonomous systems, not pitch decks",
    stat: "commits today: 27",
  },
  {
    id: "touch",
    label: "Touch Grass Mode",
    readout: "agents are running, evals are green, laptop is closed. the machines can handle it",
    stat: "steps: 12,408",
  },
  {
    id: "chaos",
    label: "Chaos Gremlin Mode",
    readout: "it works on my cluster · pushing to prod on a friday because the rollback plan is the deploy plan",
    stat: "risk appetite: yes",
  },
];

export const MARQUEE_ITEMS = [
  "autonomous systems",
  "retrieval that actually retrieves",
  "agents with receipts",
  "evals before vibes",
  "ship, measure, iterate",
  "boring reliability × model judgment",
];

export const PROJECT_SCOPES = [
  "Multi-Agent Systems",
  "Workflow Automation",
  "Custom RAG Architectures",
  "Fine-tuning & Evals",
  "AI Advisory",
];

export const PROJECTS = [
  {
    id: "agentmesh",
    index: "01",
    title: "AgentMesh Consensus Runtime",
    subtitle: "Distributed multi-agent coordination engine with deterministic rollback",
    description:
      "Engineered an asynchronous orchestration layer enabling multiple LLM agents to communicate over structured event buses, negotiate sub-tasks via voting consensus, and self-heal failed tool invocations.",
    metrics: [
      { label: "Consensus Rate", value: "99.8%" },
      { label: "Dispatch Latency", value: "<42ms" },
      { label: "Tasks Routed", value: "4.2M" },
    ],
    features: [
      "Dynamic DAG dependency resolution",
      "Strict schema-enforced tool contracts",
      "Sandboxed Python & shell runtime execution",
      "Replayable state logs with time-travel debugging",
    ],
    stack: ["LangGraph", "Python", "Redis", "FastAPI", "OpenTelemetry"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    badge: "Open Source Core",
  },
  {
    id: "cognitiverag",
    index: "02",
    title: "CognitiveRAG Engine",
    subtitle: "Self-corrective hybrid retrieval with multi-hop query decomposition",
    description:
      "Enterprise knowledge retrieval engine combining dense vector embeddings with sparse BM25 indexing and cross-encoder reranking. Features self-reflective critique loops that re-write queries when semantic confidence drops.",
    metrics: [
      { label: "P95 Latency", value: "88ms" },
      { label: "NDCG@10 Lift", value: "+38%" },
      { label: "Zero-Result Fallback", value: "0.2%" },
    ],
    features: [
      "Hybrid dense + BM25 reciprocal rank fusion (RRF)",
      "Contextual chunking with sliding window compression",
      "Cross-encoder re-ranking threshold calibration",
      "Real-time vector index updates with Qdrant",
    ],
    stack: ["Qdrant", "vLLM", "Cross-Encoder", "PyTorch", "Docker"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    badge: "Production Deployed",
  },
  {
    id: "traceguard",
    index: "03",
    title: "TraceGuard Eval & Safety Harness",
    subtitle: "Automated regression testing and token governance platform",
    description:
      "Continuous evaluation pipeline that stress-tests LLM agents against synthetic adversarial datasets, prompt injection probes, and cost budgets before pull requests can merge to main branches.",
    metrics: [
      { label: "Evals / Run", value: "12.5k" },
      { label: "Leak Regressions", value: "0" },
      { label: "Cost Savings", value: "44%" },
    ],
    features: [
      "Adversarial jailbreak and prompt-injection test suite",
      "Semantic similarity & factual consistency metrics",
      "Token allocation budgets with hard circuit breakers",
      "Automated regression reporting to GitHub actions",
    ],
    stack: ["ClickHouse", "Next.js", "Python", "DeepEval", "Temporal"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    badge: "CI/CD Gate",
  },
  {
    id: "autoops",
    index: "04",
    title: "AutoOps Kubernetes Sentinel",
    subtitle: "Autonomous SRE agent for cluster incident diagnosis and recovery",
    description:
      "Incident triage agent that ingests Prometheus alerts, inspects pod metrics and cluster logs, generates root-cause hypotheses, and stages verified remedial manifest patches with human approval checkpoints.",
    metrics: [
      { label: "MTTR Reduction", value: "−54%" },
      { label: "Diagnostic Accuracy", value: "98.2%" },
      { label: "False Positive Cut", value: "71%" },
    ],
    features: [
      "Automated log anomaly detection and trace correlation",
      "Kubernetes ephemeral container sandbox validation",
      "Deterministic rollbacks via ArgoCD integration",
      "Interactive Slack bot with human-in-the-loop approval",
    ],
    stack: ["Kubernetes", "Prometheus", "FastAPI", "ArgoCD", "LangChain"],
    githubUrl: "https://github.com",
    demoUrl: "https://demo.example.com",
    badge: "Infrastructure AI",
  },
];

export const SKILLS_CATEGORIES = [
  {
    id: "agentic",
    title: "Agentic Systems & Orchestration",
    tagline: "Deterministic multi-agent execution, planning & tool sandboxing",
    icon: "Bot",
    skills: [
      { name: "LangGraph", level: "Expert", highlight: "State graphs & cycles" },
      { name: "Multi-Agent Consensus", level: "Expert", highlight: "Voting protocols" },
      { name: "Tool Calling & Sandboxes", level: "Advanced", highlight: "Strict JSON contracts" },
      { name: "ReAct & Plan-and-Solve", level: "Expert", highlight: "Task decomposition" },
      { name: "Agent Memory Systems", level: "Advanced", highlight: "Semantic & episodic" },
      { name: "Self-Correction Loops", level: "Expert", highlight: "Reflective retry gates" },
    ],
  },
  {
    id: "rag",
    title: "Retrieval & Vector Infrastructure",
    tagline: "Sub-100ms hybrid search engines with zero hallucinated context",
    icon: "Database",
    skills: [
      { name: "Qdrant & Pinecone", level: "Expert", highlight: "HNSW & payload filtering" },
      { name: "Hybrid Search (BM25 + Dense)", level: "Expert", highlight: "Reciprocal Rank Fusion" },
      { name: "Cross-Encoder Reranking", level: "Advanced", highlight: "Cohere & BGE models" },
      { name: "Contextual Chunking", level: "Advanced", highlight: "Semantic boundary splits" },
      { name: "GraphRAG & Knowledge Graphs", level: "Proficient", highlight: "Entity-relation triples" },
      { name: "Document Ingestion", level: "Advanced", highlight: "Unstructured & PDF parsing" },
    ],
  },
  {
    id: "evals",
    title: "LLM Ops, Evals & Model Serving",
    tagline: "Production test gates, structured outputs & high-throughput serving",
    icon: "Cpu",
    skills: [
      { name: "vLLM & TensorRT-LLM", level: "Advanced", highlight: "Continuous batching" },
      { name: "Eval Harnesses (DeepEval)", level: "Expert", highlight: "Automated CI/CD gates" },
      { name: "Structured Outputs", level: "Expert", highlight: "Pydantic & Instructor" },
      { name: "Fine-Tuning & LoRA", level: "Advanced", highlight: "Domain adaptation" },
      { name: "Prompt Governance", level: "Expert", highlight: "Versioned rollout & diffs" },
      { name: "Cost & Tier Routing", level: "Expert", highlight: "Dynamic model allocation" },
    ],
  },
  {
    id: "backend",
    title: "Backend, Cloud & Distributed Systems",
    tagline: "Resilient asynchronous primitives supporting enterprise model execution",
    icon: "Layers",
    skills: [
      { name: "Python (FastAPI, Asyncio)", level: "Expert", highlight: "High-concurrency services" },
      { name: "Temporal.io Workflows", level: "Advanced", highlight: "Durable execution & sagas" },
      { name: "Docker & Kubernetes", level: "Advanced", highlight: "Containerized deployments" },
      { name: "Kafka & Redis", level: "Advanced", highlight: "Pub/sub & state caching" },
      { name: "PostgreSQL & pgvector", level: "Expert", highlight: "Relational & vector storage" },
      { name: "OpenTelemetry & Tracing", level: "Advanced", highlight: "Distributed agent spans" },
    ],
  },
];

