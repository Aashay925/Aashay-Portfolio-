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
