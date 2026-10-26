// ── Aashay Soni Portfolio Data ──────────────────────────────
// Production-ready data covering Agentic AI, Generative AI, RAG, Zoho Ecosystem, and Full-Stack Engineering.

export const PROFILE = {
  name: "Aashay Soni",
  firstName: "Aashay",
  role: "Generative AI & Automation Engineer",
  tagline: "Designing and shipping production ready AI applications, multi-agent systems, and business automation that solve real business challenges.",
  email: "aashaysoni.2005@gmail.com",
  phone: "+91 9644437133",
  location: "Jabalpur, Madhya Pradesh, India",
  availability: "Available for high-impact AI and automation projects",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com/Aashay925" },
    { label: "LinkedIn", href: "https://linkedin.com/in/aashay-sonii" },
    { label: "Email", href: "mailto:aashaysoni.2005@gmail.com" },
    { label: "Phone", href: "tel:+919644437133" },
  ],
  summary:
    "I am a Generative AI and Automation Engineer passionate about designing and shipping production-ready AI applications that solve practical business challenges. My work combines Agentic AI, Generative AI, Retrieval-Augmented Generation (RAG), workflow automation, and full-stack development to build reliable, scalable solutions for real-world business use cases.",
  secondarySummary:
    "I engineer complete solutions from backend architecture and APIs to intelligent agents that retrieve knowledge, automate workflows, interact with external tools, and streamline business operations. I also specialize in the Zoho ecosystem including Zoho CRM, Books, People, ERP, Analytics, and custom Deluge scripting for cross-platform automation.",
};

export const HERO_STREAM = [
  "agent.orchestrator: compiling LangGraph state graph…",
  "rag_retriever: MongoDB Vector Search cosine similarity ≥ 0.91",
  "zoho_engine: webhook trigger → Deluge business logic executed ✓",
  "campaign_agent: natural language prompt → draft generated",
  "human_gate: approval confirmed → WhatsApp API dispatch scheduled",
  "production: in-house middleware running with 90% cost savings",
];

export const CAPABILITIES = [
  {
    id: "agentic",
    index: "01",
    title: "Agentic AI & Multi-Agent Systems",
    blurb:
      "Autonomous systems built with LangGraph, LangChain, and CrewAI. Agents capable of multi-step planning, tool invocation, structured reasoning, and human-in-the-loop oversight.",
    tags: ["LangGraph", "CrewAI", "Multi-Agent Planning", "Tool Invocation", "HITL Oversight"],
  },
  {
    id: "rag",
    index: "02",
    title: "Generative AI & RAG Architectures",
    blurb:
      "Production retrieval pipelines powered by Gemini, GPT, Claude, and Llama. Grounded knowledge assistants using MongoDB Vector Search, FAISS, and ChromaDB with zero hallucinated context.",
    tags: ["RAG Pipelines", "Gemini & LLMs", "MongoDB Vector Search", "FAISS", "ChromaDB"],
  },
  {
    id: "zoho",
    index: "03",
    title: "Zoho Ecosystem & Deluge Automation",
    blurb:
      "End-to-end business process orchestration across Zoho CRM, Books, People, ERP, Analytics, and POS using custom Deluge scripting and real-time webhooks.",
    tags: ["Zoho Deluge", "Zoho CRM", "Zoho Books & ERP", "Webhooks", "API Integrations"],
  },
  {
    id: "fullstack",
    index: "04",
    title: "Full-Stack AI Engineering",
    blurb:
      "Building high-performance user interfaces in React and Next.js connected to asynchronous FastAPI and Flask backends, with Docker containerization and cloud deployment.",
    tags: ["FastAPI", "React", "Next.js", "Python", "Docker", "GCP"],
  },
];

export const METRICS = [
  { label: "Cost Reduction on Marketing SaaS", value: "90%" },
  { label: "Faster Catalog Retrieval with RAG", value: "60%" },
  { label: "Manual Process Time Reduced", value: "50%" },
  { label: "Lead Drop-Off Reduction", value: "45%" },
];

export const AGENT_SIMULATIONS = {
  rag: {
    label: "RAG Assistant",
    steps: [
      "→ parsing technical product query with Gemini…",
      "→ querying MongoDB Vector Search (top-k=8)",
      "→ ranking agrochemical catalog context",
      "→ assembling prompt with verified grounding",
      "→ streaming context-aware response via FastAPI",
      "✓ 90% client-validated accuracy · 60% faster lookup",
    ],
  },
  campaign: {
    label: "Campaign Agent",
    steps: [
      "→ ingesting natural language campaign requirements…",
      "→ generating segmented marketing copy options with LangChain",
      "→ formatting interactive WhatsApp message templates",
      "→ requesting human review and approval",
      "→ scheduling automated broadcast via middleware",
      "✓ dispatched · saved ₹80,000/annum vs SaaS tools",
    ],
  },
  zoho: {
    label: "Zoho Automator",
    steps: [
      "→ capturing inbound lead webhook event…",
      "→ executing custom Deluge script on Zoho CRM",
      "→ synchronizing customer record into Books and ERP",
      "→ scheduling intelligent follow-up notification",
      "→ logging analytics telemetry in real time",
      "✓ synchronized · eliminated manual data entry",
    ],
  },
};

export const EXPERIENCE_FILTERS = ["All Systems", "Full-Stack & Systems", "CRM & Automation", "GenAI & Zoho", "Python Automation"];

export const EXPERIENCE = [
  {
    id: "exp-hemisphere",
    period: "August 2026 — Present",
    role: "Software Developer",
    org: "Hemisphere · Freelance",
    category: "Full-Stack & Systems",
    summary:
      "Designed a conversion-focused business website and architecting an end-to-end wedding management software platform.",
    details:
      "Architecting a comprehensive enterprise platform handling logistics, guest management, vehicle coordination, vendor contracts, and procurement workflows. Completed Phase 1 with a solid functional core, with Phase 2 underway for advanced automation and reporting. The platform is projected to reduce manual event coordination effort by 60% and eliminate spreadsheet tracking across events.",
    stack: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Workflow Automation"],
    impact: "60% projected reduction in manual event coordination",
  },
  {
    id: "exp-sreemoyee",
    period: "July 2026 — Present",
    role: "Full-Stack Developer & CRM Engineer",
    org: "Sreemoyee Enterprises · Freelance",
    category: "CRM & Automation",
    summary:
      "Engineered an e-commerce platform, WhatsApp chatbot lead capture, and a custom AI-integrated CRM.",
    details:
      "Built a full-scale e-commerce platform for a premier machinery distributor with product catalog and inventory controls. Integrated a centralized WhatsApp lead capture system connecting social media and advertisements, reducing lead drop-off by 45%. Designed a custom CRM featuring smart lead capture, cross-sell recommendation logic, and automated AI follow-ups, lifting sales conversion rates by 30% and cutting manual outreach time by 50%.",
    stack: ["React", "FastAPI", "WhatsApp API", "AI Follow-ups", "Custom CRM", "MySQL"],
    impact: "+30% sales conversion & 45% drop-off reduction",
  },
  {
    id: "exp-nexora-engineer",
    period: "December 2025 — August 2026",
    role: "Automation Engineer",
    org: "Nexora",
    category: "GenAI & Zoho",
    summary:
      "Built production Generative AI and RAG applications alongside enterprise Zoho ecosystem automations.",
    details:
      "Engineered production-grade Generative AI and RAG systems using LangChain, Gemini, FAISS, and ChromaDB. Developed custom Deluge scripts and multi-app workflows across Zoho CRM, CRM Plus, People, Books, Recruit, ERP, Analytics, POS, and Webhooks. Connected external REST APIs to eliminate manual bottlenecks and conducted rigorous regression testing across deployed pipelines.",
    stack: ["LangChain", "Gemini", "FAISS", "ChromaDB", "Zoho Deluge", "REST APIs"],
    impact: "Unified operational pipelines across 8 Zoho platforms",
  },
  {
    id: "exp-nexora-intern",
    period: "September 2025 — December 2025",
    role: "AI Automation Intern",
    org: "Nexora",
    category: "GenAI & Zoho",
    summary:
      "Developed business automation workflows and intelligent SalesIQ chatbot flows driving conversion gains.",
    details:
      "Built and deployed AI-powered automations to optimize operational workflows. Designed and integrated SalesIQ chatbot conversational flows that drove a 35% increase in visitor-to-lead conversions on the Nexora platform. Structured scalable website architectures for business services spanning CRM, HRMS, finance, and analytics.",
    stack: ["SalesIQ", "Zoho Ecosystem", "Deluge Scripting", "JavaScript", "Python"],
    impact: "+35% visitor-to-lead conversion lift",
  },
  {
    id: "exp-sworn",
    period: "June 2024 — August 2025",
    role: "Python Automation Developer",
    org: "Sworn Agritech",
    category: "Python Automation",
    summary:
      "Developed Python automation scripts to streamline agricultural business processes and cut commercial SaaS costs.",
    details:
      "Built resilient, cost-effective automation scripts in Python tailored to agricultural business operations. Replaced dependencies on expensive third-party tools with maintainable internal utilities, improving day-to-day workflow efficiency and operational consistency.",
    stack: ["Python", "Automation Scripts", "Data Pipelines", "Workflow Optimization"],
    impact: "Replaced third-party commercial tools with custom scripts",
  },
];

export const VIBE_MODES = [
  {
    id: "agentic",
    label: "Autonomous Agent Mode",
    readout: "compiling LangGraph state graphs, tuning vector retrieval thresholds, and letting autonomous agents orchestrate multi-step workflows.",
    stat: "focus: 100%",
  },
  {
    id: "builder",
    label: "Full-Stack Architect Mode",
    readout: "connecting high-throughput FastAPI backends to responsive React frontends and real-time APIs that ship to production.",
    stat: "velocity: shipping daily",
  },
  {
    id: "automator",
    label: "Workflow Automator Mode",
    readout: "eliminating manual bottlenecks with custom Deluge scripts, smart CRM pipelines, and zero-maintenance automation.",
    stat: "manual overhead: 0%",
  },
  {
    id: "production",
    label: "Production Deploy Mode",
    readout: "tested, grounded, and verified with client metrics. Real systems that deliver measurable business results, not pitch decks.",
    stat: "uptime: 99.9%",
  },
];

export const MARQUEE_ITEMS = [
  "production ready ai systems",
  "retrieval that actually grounds answers",
  "multi agent orchestration with oversight",
  "zoho ecosystem & deluge mastery",
  "practical engineering over empty demos",
  "measurable business impact",
];

export const PROJECT_SCOPES = [
  "Agentic AI & Multi-Agent Systems",
  "RAG & Knowledge Assistants",
  "Zoho Ecosystem & Deluge Automation",
  "Custom AI-Powered CRM",
  "Full-Stack Web & API Engineering",
  "Business Process Automation",
  "Consultation Meet",
];

export const PROJECTS = [
  {
    id: "whatsapp-campaigns",
    index: "01",
    title: "WhatsApp Campaigns Automation Tool",
    subtitle: "Agentic campaign orchestration with natural language drafting and human approval",
    description:
      "In-house marketing middleware developed to replace an expensive third-party SaaS tool costing ₹80,000 per month. Powered by LangGraph and LangChain, the agent converts natural language instructions into campaign drafts, segments target audiences, and schedules delivery after human signoff.",
    metrics: [
      { label: "Cost Reduction", value: "90%" },
      { label: "Savings", value: "₹80,000/annum" },
      { label: "Human Oversight", value: "100% HITL" },
    ],
    features: [
      "Natural language campaign generation using LangGraph and LangChain",
      "Automated marketing copy drafting with audience segmentation",
      "Mandatory human review checkpoint before any message dispatch",
      "High-throughput delivery tracking and webhook status logging",
    ],
    stack: ["React", "FastAPI", "Python", "LangGraph", "LangChain", "MongoDB"],
    githubUrl: "https://github.com/Aashay925",
    demoUrl: "https://github.com/Aashay925",
    badge: "Agentic Middleware",
  },
  {
    id: "kabpl-rag",
    index: "02",
    title: "KABPL Quiz App & RAG Knowledge Assistant",
    subtitle: "Conversational knowledge retrieval for agrochemical product catalogs",
    description:
      "Full-stack AI assistant engineered for KABPL to replace time-consuming manual lookups across complex agrochemical documentation. Employs Gemini embeddings, MongoDB Vector Search, and LangChain to provide instant, context-aware answers verified by client domain specialists.",
    metrics: [
      { label: "Retrieval Speed", value: "+60%" },
      { label: "Client Accuracy", value: "90%" },
      { label: "Productivity Gain", value: "+35%" },
    ],
    features: [
      "Semantic product catalog retrieval with MongoDB Vector Search",
      "Gemini powered embeddings and conversational language generation",
      "Robust LangChain RAG pipeline with relevance re-ranking",
      "Responsive full-stack architecture linking React with FastAPI",
    ],
    stack: ["React", "FastAPI", "Python", "LangChain", "Gemini", "MongoDB Vector Search"],
    githubUrl: "https://github.com/Aashay925",
    demoUrl: "https://github.com/Aashay925",
    badge: "Production RAG",
  },
  {
    id: "civic-pwa",
    index: "03",
    title: "Civic Issue Reporting & Resolution System",
    subtitle: "Progressive Web App with AI issue classification and real-time mapping",
    description:
      "A citizen engagement Progressive Web App enabling residents to report municipal issues using photos, descriptions, and geolocation. Combines computer vision classification, real-time map visualizations, and an administrative dashboard for dispatch tracking.",
    metrics: [
      { label: "Response Delay", value: "−40%" },
      { label: "Classification", value: "YOLOv8" },
      { label: "App Architecture", value: "PWA" },
    ],
    features: [
      "Citizen grievance submission with photo capture and GPS coordinates",
      "AI classification using YOLOv8 and Scikit-learn models",
      "Interactive real-time map view with administrative dispatch dashboard",
      "Automated resident status alerts and resolution notifications",
    ],
    stack: ["React", "Python", "YOLOv8", "Scikit-learn", "MySQL", "Maps API", "PWA"],
    githubUrl: "https://github.com/Aashay925",
    demoUrl: "https://github.com/Aashay925",
    badge: "Civic Tech PWA",
  },
  {
    id: "zoho-suite",
    index: "04",
    title: "Zoho Workflows & Enterprise Automation Suite",
    subtitle: "Cross-platform business process orchestration across sales, HR, and finance",
    description:
      "Comprehensive business automation suite deployed across multiple Zoho platforms. Uses custom Deluge scripting, webhooks, and REST APIs to synchronize data and eliminate repetitive manual workflows across HR, CRM, sales, books, and operations.",
    metrics: [
      { label: "Manual Overhead", value: "−50%" },
      { label: "Apps Integrated", value: "8 Zoho Apps" },
      { label: "Data Bottlenecks", value: "Eliminated" },
    ],
    features: [
      "Custom Deluge scripts for multi-application synchronization",
      "Automated lead routing and sales stage progression in Zoho CRM",
      "Synchronized financial records across Zoho Books and Zoho ERP",
      "Employee lifecycle and onboarding automations in Zoho People",
    ],
    stack: ["Zoho CRM", "Zoho Books", "Zoho People", "Zoho ERP", "Deluge", "Webhooks"],
    githubUrl: "https://github.com/Aashay925",
    demoUrl: "https://github.com/Aashay925",
    badge: "Enterprise Suite",
  },
  {
    id: "nexora-portal",
    index: "05",
    title: "Nexora Business Automation Platform",
    subtitle: "High-performance solution portal with SalesIQ chatbot and CRM requirement capture",
    description:
      "Scalable digital portal engineered to connect enterprise business solutions across CRM, HRMS, finance, sales, and analytics. Integrated intelligent SalesIQ chatbot flows to qualify leads in real time and guide prospects to relevant automation workflows.",
    metrics: [
      { label: "Lead Conversion", value: "+35%" },
      { label: "User Engagement", value: "+40%" },
      { label: "CRM Sync", value: "Instant" },
    ],
    features: [
      "Interactive solution workflows for CRM, HRMS, and finance automation",
      "SalesIQ conversational chatbot integration for instant lead capture",
      "Automated CRM requirement routing and prospect qualification",
      "Scalable responsive frontend architecture built for high conversion",
    ],
    stack: ["React", "JavaScript", "SalesIQ", "CRM Integration", "Tailwind CSS"],
    githubUrl: "https://github.com/Aashay925",
    demoUrl: "https://github.com/Aashay925",
    badge: "Full-Stack Portal",
  },
];

export const SKILLS_CATEGORIES = [
  {
    id: "agentic",
    title: "Agentic AI & Orchestration",
    tagline: "Autonomous multi-agent execution, planning, and tool orchestration",
    icon: "Bot",
    skills: [
      { name: "LangGraph", level: "Expert", highlight: "State graphs & cyclic flows" },
      { name: "LangChain", level: "Expert", highlight: "Chains & tool integration" },
      { name: "CrewAI", level: "Advanced", highlight: "Multi-agent collaboration" },
      { name: "Agent Planning & Memory", level: "Expert", highlight: "Task decomposition & state" },
      { name: "Tool Calling & APIs", level: "Expert", highlight: "Structured function calling" },
      { name: "Human-in-the-Loop", level: "Expert", highlight: "Approval gates & safety" },
    ],
  },
  {
    id: "genai",
    title: "Generative AI, LLMs & RAG",
    tagline: "High-accuracy retrieval pipelines and grounded language applications",
    icon: "Cpu",
    skills: [
      { name: "Frontier LLMs", level: "Expert", highlight: "Gemini, GPT, Claude, Llama" },
      { name: "RAG Pipelines", level: "Expert", highlight: "Contextual retrieval & reranking" },
      { name: "MongoDB Vector Search", level: "Expert", highlight: "Semantic vector indexing" },
      { name: "FAISS & ChromaDB", level: "Expert", highlight: "High-density similarity search" },
      { name: "Embeddings & Chunking", level: "Advanced", highlight: "Semantic chunk optimization" },
      { name: "Machine Learning & Scikit-learn", level: "Advanced", highlight: "Classification & regression" },
    ],
  },
  {
    id: "zoho",
    title: "Zoho Ecosystem & Deluge",
    tagline: "Enterprise workflow automation across sales, HR, operations, and finance",
    icon: "Layers",
    skills: [
      { name: "Custom Deluge Scripting", level: "Expert", highlight: "Complex business logic" },
      { name: "Zoho CRM & CRM Plus", level: "Expert", highlight: "Lead pipelines & automation" },
      { name: "Zoho Books & ERP", level: "Advanced", highlight: "Financial workflow sync" },
      { name: "Zoho People & Recruit", level: "Advanced", highlight: "HRMS process optimization" },
      { name: "Zoho Analytics & POS", level: "Advanced", highlight: "Reporting & store operations" },
      { name: "Webhooks & REST APIs", level: "Expert", highlight: "Cross-platform data flow" },
    ],
  },
  {
    id: "fullstack",
    title: "Full-Stack & Cloud Deployment",
    tagline: "Resilient backend APIs, responsive frontends, and production infrastructure",
    icon: "Database",
    skills: [
      { name: "Python (FastAPI, Flask)", level: "Expert", highlight: "High-performance async APIs" },
      { name: "React & Next.js", level: "Expert", highlight: "Modern reactive user interfaces" },
      { name: "JavaScript & TypeScript", level: "Advanced", highlight: "Type-safe web development" },
      { name: "PostgreSQL, MySQL, SQLite", level: "Advanced", highlight: "Relational schema design" },
      { name: "MongoDB & pgvector", level: "Advanced", highlight: "Document & vector databases" },
      { name: "Docker & GCP", level: "Advanced", highlight: "Containerized cloud deployments" },
    ],
  },
];
