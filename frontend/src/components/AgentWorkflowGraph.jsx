import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Database,
  Terminal,
  Cpu,
  CheckCircle2,
  RefreshCw,
  GitBranch,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Sparkles,
  Search,
  Layers,
  ArrowRight
} from "lucide-react";

export const WORKFLOWS = {
  rag: {
    id: "rag",
    name: "KABPL RAG Assistant",
    badge: "GEMINI & MONGODB RAG PIPELINE",
    description: "Conversational product catalog assistant with Gemini embeddings, MongoDB Vector Search, and LangChain",
    nodes: [
      {
        id: "n1",
        label: "Query Ingest",
        role: "Gemini Embedding & Intent",
        icon: Search,
        status: "done",
        latency: "14ms",
        col: 1,
        row: "center",
        thought: "Normalized agrochemical inquiry. Generated Gemini dense vector representation.",
        tag: "Input Parser"
      },
      {
        id: "n2a",
        label: "MongoDB Vector",
        role: "Semantic Vector Search",
        icon: Database,
        status: "done",
        latency: "38ms",
        col: 2,
        row: "top",
        thought: "Queried MongoDB Vector Search: retrieved top 8 matching product catalog chunks.",
        tag: "Vector Index"
      },
      {
        id: "n2b",
        label: "Product Catalog",
        role: "Domain Catalog Filter",
        icon: Layers,
        status: "done",
        latency: "20ms",
        col: 2,
        row: "bottom",
        thought: "Filtered by active ingredient, application dosage, and crop protection taxonomy.",
        tag: "Catalog Match"
      },
      {
        id: "n3",
        label: "LangChain Grounding",
        role: "Context Assembly & Rank",
        icon: ShieldCheck,
        status: "active",
        latency: "52ms",
        col: 3,
        row: "center",
        thought: "Synthesized grounded context window. Applied relevance re-ranking with zero hallucination.",
        tag: "Grounded Synthesis"
      },
      {
        id: "n4",
        label: "Verified Output",
        role: "Client Validated Answer",
        icon: CheckCircle2,
        status: "ready",
        latency: "90% Acc",
        col: 4,
        row: "center",
        thought: "Streamed answer with validated technical specs. 60% faster information retrieval.",
        tag: "90% Accuracy"
      }
    ],
    thoughtStream: [
      "query_ingest: parsed agrochemical inquiry, generated Gemini dense embeddings (14ms)",
      "vector_search: MongoDB Vector Search returned top 8 contextual catalog chunks",
      "catalog_filter: filtered by crop taxonomy, dosage, and chemical formulations",
      "grounded_synthesis: LangChain verified factual consistency against product documentation",
      "response_stream: streamed context-aware answer with client-validated 90% accuracy ✓"
    ]
  },
  campaign: {
    id: "campaign",
    name: "WhatsApp AI Agent",
    badge: "LANGGRAPH AGENTIC WORKFLOW",
    description: "Agentic campaign orchestration with natural language drafting, audience targeting, and mandatory human signoff",
    nodes: [
      {
        id: "n1",
        label: "Prompt Ingest",
        role: "Goal & Audience Input",
        icon: Terminal,
        status: "done",
        latency: "16ms",
        col: 1,
        row: "center",
        thought: "Parsed campaign objective in natural language. Formulated execution graph in LangGraph.",
        tag: "Goal Parser"
      },
      {
        id: "n2a",
        label: "Draft Synthesis",
        role: "LangChain Copy Engine",
        icon: Sparkles,
        status: "done",
        latency: "62ms",
        col: 2,
        row: "top",
        thought: "Drafted 3 personalized marketing message variations with clear calls to action.",
        tag: "AI Drafter"
      },
      {
        id: "n2b",
        label: "Audience Target",
        role: "Customer Segment Filter",
        icon: Database,
        status: "done",
        latency: "28ms",
        col: 2,
        row: "bottom",
        thought: "Filtered recipient segments from database based on previous purchasing behavior.",
        tag: "Segment Query"
      },
      {
        id: "n3",
        label: "Human Signoff",
        role: "Mandatory Approval Gate",
        icon: ShieldCheck,
        status: "active",
        latency: "HITL Gate",
        col: 3,
        row: "center",
        thought: "Generated interactive preview card. Staged for one-click human verification.",
        tag: "100% Oversight"
      },
      {
        id: "n4",
        label: "API Dispatch",
        role: "Scheduled WhatsApp Send",
        icon: CheckCircle2,
        status: "ready",
        latency: "₹72k Saved",
        col: 4,
        row: "center",
        thought: "Approved by manager. Dispatched via WhatsApp API middleware. Saved ₹72,000/month.",
        tag: "Zero SaaS Cost"
      }
    ],
    thoughtStream: [
      "prompt_ingest: parsed natural language campaign goal into structured execution plan",
      "draft_engine: LangGraph synthesized personalized copy variants with call to action",
      "audience_segment: MongoDB queried and segmented targeted customer groups",
      "human_signoff: preview staged, awaiting one-click administrator verification ✓",
      "dispatch_middleware: scheduled broadcast sent via WhatsApp API, saving ₹72,000/mo ✓"
    ]
  },
  zoho: {
    id: "zoho",
    name: "Zoho Process Engine",
    badge: "ZOHO DELUGE AUTOMATION",
    description: "Cross-platform orchestration synchronizing CRM, Books, People, ERP, and Webhooks",
    nodes: [
      {
        id: "n1",
        label: "Webhook Trigger",
        role: "Inbound Lead & Form Event",
        icon: Zap,
        status: "done",
        latency: "9ms",
        col: 1,
        row: "center",
        thought: "Captured real-time lead event from web form and WhatsApp lead capture pipeline.",
        tag: "Event Hook"
      },
      {
        id: "n2a",
        label: "Deluge Script",
        role: "Custom Business Logic",
        icon: Cpu,
        status: "done",
        latency: "46ms",
        col: 2,
        row: "top",
        thought: "Executed custom Deluge script: computed lead score and product cross-sell tier.",
        tag: "Deluge Script"
      },
      {
        id: "n2b",
        label: "CRM Pipeline",
        role: "Zoho CRM Routing",
        icon: Bot,
        status: "done",
        latency: "26ms",
        col: 2,
        row: "bottom",
        thought: "Created lead record, assigned sales rep, and set automated deal stage triggers.",
        tag: "Zoho CRM"
      },
      {
        id: "n3",
        label: "ERP & Books Sync",
        role: "Cross-Platform Entity Sync",
        icon: RefreshCw,
        status: "active",
        latency: "54ms",
        col: 3,
        row: "center",
        thought: "Synchronized customer profile into Zoho Books, ERP, and People records.",
        tag: "Books & ERP"
      },
      {
        id: "n4",
        label: "Instant Outreach",
        role: "Automated Communication",
        icon: CheckCircle2,
        status: "ready",
        latency: "−50% Time",
        col: 4,
        row: "center",
        thought: "Triggered personalized follow-up notification. Reduced manual overhead by 50%.",
        tag: "Zero Manual Work"
      }
    ],
    thoughtStream: [
      "webhook_trigger: captured real-time lead event from web form and WhatsApp chat",
      "deluge_engine: custom Deluge script parsed data, calculated tier, and applied business rules",
      "crm_pipeline: automated deal record created in Zoho CRM with assigned representative",
      "multi_app_sync: real-time data sync completed across Zoho Books, ERP, and Analytics",
      "automated_outreach: instant customer response triggered, eliminating manual data entry ✓"
    ]
  }
};

export const AgentWorkflowGraph = () => {
  const [activeWorkflowKey, setActiveWorkflowKey] = useState("rag");
  const [selectedNodeId, setSelectedNodeId] = useState("n3");
  const [streamIndex, setStreamIndex] = useState(0);

  const workflow = WORKFLOWS[activeWorkflowKey];
  const selectedNode =
    workflow.nodes.find((n) => n.id === selectedNodeId) || workflow.nodes[3];

  useEffect(() => {
    setSelectedNodeId("n3");
    setStreamIndex(0);
    const interval = setInterval(() => {
      setStreamIndex((prev) => (prev + 1) % workflow.thoughtStream.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeWorkflowKey, workflow.thoughtStream.length]);

  const col1Node = workflow.nodes.find((n) => n.col === 1);
  const col2Top = workflow.nodes.find((n) => n.col === 2 && n.row === "top");
  const col2Bottom = workflow.nodes.find((n) => n.col === 2 && n.row === "bottom");
  const col3Node = workflow.nodes.find((n) => n.col === 3);
  const col4Node = workflow.nodes.find((n) => n.col === 4);

  return (
    <div
      className="relative rounded-2xl border border-[#262B33] bg-[#14171C]/90 backdrop-blur p-4.5 sm:p-5 shadow-[0_0_50px_rgba(124,140,255,0.06)] w-full overflow-hidden transition-all duration-300"
      data-testid="hero-agent-workflow-graph"
    >
      {/* Top Titlebar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#262B33] mb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#7C8CFF]/80" />
            <span className="h-2 w-2 rounded-full bg-[#FBBF24]/70" />
            <span className="h-2 w-2 rounded-full bg-[#65C18C]/80" />
          </div>
          <span className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[#A1A7B3]">
            {workflow.badge}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#7C8CFF]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C8CFF]" />
          </span>
          <span className="font-mono2 text-[9.5px] tracking-wider text-[#7C8CFF] uppercase font-semibold">
            Live Execution Mesh
          </span>
        </div>
      </div>

      {/* Switcher Buttons: Real-world Workflows */}
      <div className="mb-3.5">
        <p className="font-mono2 text-[9.5px] tracking-widest uppercase text-[#6B7280] mb-2">
          Switch Production Agent Pipeline:
        </p>
        <div className="grid grid-cols-3 gap-2">
          {Object.values(WORKFLOWS).map((wf) => {
            const isActive = wf.id === activeWorkflowKey;
            return (
              <button
                key={wf.id}
                onClick={() => setActiveWorkflowKey(wf.id)}
                className={`group relative rounded-lg px-2.5 py-1.5 font-mono2 text-[11px] tracking-wide transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                  isActive
                    ? "bg-[#7C8CFF] text-[#0D0F12] font-semibold shadow-[0_0_20px_rgba(124,140,255,0.25)] scale-[1.02]"
                    : "border border-[#262B33] bg-[#191D23] text-[#A1A7B3] hover:border-[#7C8CFF]/50 hover:text-[#F2F4F7]"
                }`}
                data-testid={`workflow-switch-${wf.id}`}
              >
                <span className="font-semibold">{wf.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Node Graph Canvas (Wide 4-Column Layout with Bezier Cables) */}
      <div className="relative rounded-xl border border-[#262B33] bg-[#0D0F12] p-3 sm:p-3.5 overflow-hidden min-h-[185px]">
        {/* Dot grid canvas background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "16px 16px"
          }}
        />

        {/* Dynamic SVG Connecting Wires */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 630 220"
          preserveAspectRatio="none"
        >
          {/* Wire 1: Col 1 -> Col 2 Top */}
          <path
            d="M 130 110 C 145 110, 150 55, 175 55"
            fill="none"
            stroke="#262B33"
            strokeWidth="2"
          />
          <motion.path
            d="M 130 110 C 145 110, 150 55, 175 55"
            fill="none"
            stroke="#7C8CFF"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Wire 2: Col 1 -> Col 2 Bottom */}
          <path
            d="M 130 110 C 145 110, 150 165, 175 165"
            fill="none"
            stroke="#262B33"
            strokeWidth="2"
          />
          <motion.path
            d="M 130 110 C 145 110, 150 165, 175 165"
            fill="none"
            stroke="#A1A7B3"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Wire 3: Col 2 Top -> Col 3 */}
          <path
            d="M 330 55 C 345 55, 350 110, 365 110"
            fill="none"
            stroke="#262B33"
            strokeWidth="2"
          />
          <motion.path
            d="M 330 55 C 345 55, 350 110, 365 110"
            fill="none"
            stroke="#7C8CFF"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Wire 4: Col 2 Bottom -> Col 3 */}
          <path
            d="M 330 165 C 345 165, 350 110, 365 110"
            fill="none"
            stroke="#262B33"
            strokeWidth="2"
          />
          <motion.path
            d="M 330 165 C 345 165, 350 110, 365 110"
            fill="none"
            stroke="#A1A7B3"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Wire 5: Col 3 -> Col 4 Output */}
          <path
            d="M 505 110 C 515 110, 520 110, 530 110"
            fill="none"
            stroke="#262B33"
            strokeWidth="2"
          />
          <motion.path
            d="M 505 110 C 515 110, 520 110, 530 110"
            fill="none"
            stroke="#65C18C"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Cyclic loop wire for code mode */}
          {activeWorkflowKey === "code" && (
            <motion.path
              d="M 460 85 C 470 15, 230 15, 220 30"
              fill="none"
              stroke="#7C8CFF"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              animate={{ strokeDashoffset: [20, 0] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
            />
          )}
        </svg>

        {/* Nodes Layer: 4 Columns */}
        <div className="relative z-10 grid grid-cols-12 gap-2.5 items-center min-h-[165px]">
          {/* Col 1: Trigger / Input Node (Span 3) */}
          <div className="col-span-3 flex flex-col justify-center">
            {col1Node && (
              <WideNodeCard
                node={col1Node}
                isSelected={selectedNodeId === col1Node.id}
                onSelect={() => setSelectedNodeId(col1Node.id)}
              />
            )}
          </div>

          {/* Col 2: Parallel Workers (Span 3) */}
          <div className="col-span-3 flex flex-col justify-between gap-2.5">
            {col2Top && (
              <WideNodeCard
                node={col2Top}
                isSelected={selectedNodeId === col2Top.id}
                onSelect={() => setSelectedNodeId(col2Top.id)}
              />
            )}
            {col2Bottom && (
              <WideNodeCard
                node={col2Bottom}
                isSelected={selectedNodeId === col2Bottom.id}
                onSelect={() => setSelectedNodeId(col2Bottom.id)}
              />
            )}
          </div>

          {/* Col 3: Evaluator / Fusion / Patch Node (Span 3) */}
          <div className="col-span-3 flex flex-col justify-center">
            {col3Node && (
              <WideNodeCard
                node={col3Node}
                isSelected={selectedNodeId === col3Node.id}
                onSelect={() => setSelectedNodeId(col3Node.id)}
                isSpecial={true}
              />
            )}
          </div>

          {/* Col 4: Verified Terminal / Signoff Node (Span 3) */}
          <div className="col-span-3 flex flex-col justify-center">
            {col4Node && (
              <WideNodeCard
                node={col4Node}
                isSelected={selectedNodeId === col4Node.id}
                onSelect={() => setSelectedNodeId(col4Node.id)}
                isOutput={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* State Inspector & Live Agent Thought */}
      <div className="mt-3 rounded-xl border border-[#262B33] bg-[#0D0F12]/90 p-3">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-[#7C8CFF]" />
            <span className="font-mono2 text-[11px] tracking-wider uppercase text-[#7C8CFF] font-semibold">
              Inspecting: {selectedNode.label}
            </span>
            <span className="font-mono2 text-[9.5px] text-[#6B7280]">
              ({selectedNode.latency})
            </span>
          </div>
          <span className="font-mono2 text-[9.5px] tracking-wider text-[#65C18C] bg-[#65C18C]/10 border border-[#65C18C]/20 px-2 py-0.5 rounded-full uppercase font-medium">
            {selectedNode.tag}
          </span>
        </div>

        {/* Selected Node's live thought */}
        <p className="font-mono2 text-[11px] text-[#F2F4F7] leading-relaxed">
          <span className="text-[#7C8CFF]">state.thought:</span> "{selectedNode.thought}"
        </p>

        {/* Real-time streaming log */}
        <div className="mt-2.5 pt-2 border-t border-[#262B33] flex items-center justify-between text-[11px] font-mono2 text-[#6B7280]">
          <span className="truncate max-w-[440px]">
            <span className="text-[#7C8CFF]">▸</span> {workflow.thoughtStream[streamIndex]}
          </span>
          <span className="caret-blink text-[#7C8CFF]">▍</span>
        </div>
      </div>
    </div>
  );
};

/* Wide Node Card Component with Full Text Visibility */
const WideNodeCard = ({ node, isSelected, onSelect, isSpecial = false, isOutput = false }) => {
  const Icon = node.icon;
  const isActive = node.status === "active";

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative cursor-pointer rounded-xl border p-2 transition-all select-none ${
        isSelected
          ? "border-[#7C8CFF] bg-[#191D23] shadow-[0_0_20px_rgba(124,140,255,0.25)] ring-1 ring-[#7C8CFF]"
          : isOutput
          ? "border-[#65C18C]/40 bg-[#14171C] hover:border-[#65C18C]/70"
          : isSpecial
          ? "border-[#7C8CFF]/40 bg-[#14171C] hover:border-[#7C8CFF]/70"
          : "border-[#262B33] bg-[#14171C] hover:border-[#303640]"
      }`}
    >
      {/* Port connection dots */}
      <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full border border-black bg-[#7C8CFF]" />
      <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full border border-black bg-[#A1A7B3]" />

      <div className="flex items-start gap-1.5">
        <div
          className={`h-6 w-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
            isOutput
              ? "bg-[#65C18C]/15 text-[#65C18C] border border-[#65C18C]/30"
              : isSpecial
              ? "bg-[#7C8CFF]/15 text-[#7C8CFF] border border-[#7C8CFF]/30"
              : "bg-white/[0.03] text-[#A1A7B3] border border-[#262B33]"
          }`}
        >
          <Icon size={12} className={isActive ? "animate-pulse" : ""} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-semibold text-[11px] text-[#F2F4F7] group-hover:text-[#7C8CFF] transition-colors leading-tight truncate">
            {node.label}
          </p>
          <p className="font-mono2 text-[8.5px] text-[#6B7280] leading-tight mt-0.5 truncate">
            {node.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
