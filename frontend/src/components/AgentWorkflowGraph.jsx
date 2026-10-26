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
        latency: "₹80k Saved",
        col: 4,
        row: "center",
        thought: "Approved by manager. Dispatched via WhatsApp API middleware. Saved ₹80,000/annum.",
        tag: "Zero SaaS Cost"
      }
    ],
    thoughtStream: [
      "prompt_ingest: parsed natural language campaign goal into structured execution plan",
      "draft_engine: LangGraph synthesized personalized copy variants with call to action",
      "audience_segment: MongoDB queried and segmented targeted customer groups",
      "human_signoff: preview staged, awaiting one-click administrator verification ✓",
      "dispatch_middleware: scheduled broadcast sent via WhatsApp API, saving ₹80,000/mo ✓"
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
      className="relative rounded-[6px] border border-[#C8D1C3] bg-[#FFFFFF] p-0 shadow-sm w-full overflow-hidden transition-all duration-300"
      data-testid="hero-agent-workflow-graph"
    >
      {/* Top Titlebar — white */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#C8D1C3] bg-[#FFFFFF]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1F4D40]" />
          <span className="font-mono2 text-[10px] tracking-[0.2em] uppercase text-[#14261F] font-semibold">
            {workflow.badge}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#1F4D40]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1F4D40]" />
          </span>
          <span className="font-mono2 text-[9px] tracking-wider text-[#1F4D40] uppercase font-semibold bg-[#BCEDDB] px-2 py-0.5 rounded-[3px]">
            Live Execution Mesh
          </span>
        </div>
      </div>

      {/* Switcher Tabs — active tab is #FF5A2B highlighted */}
      <div className="flex border-b border-[#C8D1C3] bg-[#E4E8DF]">
        {Object.values(WORKFLOWS).map((wf) => {
          const isActive = wf.id === activeWorkflowKey;
          return (
            <button
              key={wf.id}
              onClick={() => setActiveWorkflowKey(wf.id)}
              className={`flex-1 px-3 py-2 font-mono2 text-[10px] tracking-wide transition-all text-center font-semibold border-r border-[#C8D1C3] last:border-r-0 ${isActive
                  ? "bg-[#FFFFFF] text-[#14261F] border-t-2 border-t-[#FF5A2B]"
                  : "bg-transparent text-[#52635B] hover:text-[#14261F] border-t-2 border-t-transparent"
                }`}
              data-testid={`workflow-switch-${wf.id}`}
            >
              {wf.name}
            </button>
          );
        })}
      </div>

      {/* Node Graph Canvas — dark technical panel */}
      <div className="p-4 bg-[#FFFFFF]">
        {/* Topology label */}
        <p className="font-mono2 text-[9px] tracking-widest uppercase text-[#52635B] mb-3">
          TOPOLOGY: DETERMINISTIC RETRIEVAL & VECTOR GROUNDING
        </p>

        <div className="relative rounded-[4px] border border-[#C8D1C3] bg-[#14171C] p-3 overflow-hidden">
          <div className="overflow-x-auto pb-1 scrollbar-none">
            <div className="min-w-[490px] sm:min-w-0 relative min-h-[175px]">
              {/* Dot grid */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
                  backgroundSize: "16px 16px"
                }}
              />

              {/* SVG Connecting Wires */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 630 220"
                preserveAspectRatio="none"
              >
                {/* Wire 1: Col 1 -> Col 2 Top */}
                <path d="M 130 110 C 145 110, 150 55, 175 55" fill="none" stroke="#262B33" strokeWidth="2" />
                <motion.path
                  d="M 130 110 C 145 110, 150 55, 175 55"
                  fill="none" stroke="#FF5A2B" strokeWidth="1.5" strokeDasharray="6 8"
                  animate={{ strokeDashoffset: [28, 0] }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
                />

                {/* Wire 2: Col 1 -> Col 2 Bottom */}
                <path d="M 130 110 C 145 110, 150 165, 175 165" fill="none" stroke="#262B33" strokeWidth="2" />
                <motion.path
                  d="M 130 110 C 145 110, 150 165, 175 165"
                  fill="none" stroke="#A1A7B3" strokeWidth="1.5" strokeDasharray="6 8"
                  animate={{ strokeDashoffset: [28, 0] }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
                />

                {/* Wire 3: Col 2 Top -> Col 3 */}
                <path d="M 330 55 C 345 55, 350 110, 365 110" fill="none" stroke="#262B33" strokeWidth="2" />
                <motion.path
                  d="M 330 55 C 345 55, 350 110, 365 110"
                  fill="none" stroke="#FF5A2B" strokeWidth="1.5" strokeDasharray="6 8"
                  animate={{ strokeDashoffset: [28, 0] }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
                />

                {/* Wire 4: Col 2 Bottom -> Col 3 */}
                <path d="M 330 165 C 345 165, 350 110, 365 110" fill="none" stroke="#262B33" strokeWidth="2" />
                <motion.path
                  d="M 330 165 C 345 165, 350 110, 365 110"
                  fill="none" stroke="#A1A7B3" strokeWidth="1.5" strokeDasharray="6 8"
                  animate={{ strokeDashoffset: [28, 0] }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
                />

                {/* Wire 5: Col 3 -> Col 4 */}
                <path d="M 505 110 C 515 110, 520 110, 530 110" fill="none" stroke="#262B33" strokeWidth="2" />
                <motion.path
                  d="M 505 110 C 515 110, 520 110, 530 110"
                  fill="none" stroke="#BCEDDB" strokeWidth="1.5" strokeDasharray="6 8"
                  animate={{ strokeDashoffset: [28, 0] }}
                  transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
                />
              </svg>

              {/* Nodes Layer */}
              <div className="relative z-10 grid grid-cols-12 gap-2.5 items-center min-h-[165px]">
                <div className="col-span-3 flex flex-col justify-center">
                  {col1Node && (
                    <WideNodeCard
                      node={col1Node}
                      isSelected={selectedNodeId === col1Node.id}
                      onSelect={() => setSelectedNodeId(col1Node.id)}
                    />
                  )}
                </div>
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
          </div>
        </div>
      </div>

      {/* State Inspector — dark technical telemetry box */}
      <div className="mx-4 mb-4 mt-0 rounded-[4px] border border-[#1F4D40] bg-[#14261F] p-3.5">
        <div className="flex items-center justify-between mb-1.5 pb-1.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={12} className="text-[#FF5A2B]" />
            <span className="font-mono2 text-[10px] tracking-wider uppercase text-[#FF5A2B] font-semibold">
              Inspecting: {selectedNode.label}
            </span>
            <span className="font-mono2 text-[9px] text-white/50">
              ({selectedNode.latency})
            </span>
          </div>
          <span className="font-mono2 text-[9px] tracking-wider text-white font-semibold bg-[#FF5A2B] px-2 py-0.5 rounded-[2px] uppercase">
            {selectedNode.tag}
          </span>
        </div>

        <p className="font-mono2 text-[10px] text-[#BCEDDB] leading-relaxed">
          <span className="text-[#FF5A2B]">state.thought:</span> "{selectedNode.thought}"
        </p>

        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono2 text-white/50">
          <span className="truncate max-w-[440px]">
            <span className="text-[#BCEDDB]">▸</span> {workflow.thoughtStream[streamIndex]}
          </span>
          <span className="caret-blink text-[#FF5A2B]">▍</span>
        </div>
      </div>
    </div>
  );
};

/* Wide Node Card — stays dark for technical readability */
const WideNodeCard = ({ node, isSelected, onSelect, isSpecial = false, isOutput = false }) => {
  const Icon = node.icon;
  const isActive = node.status === "active";

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative cursor-pointer rounded-[6px] border p-2 transition-all select-none ${isSelected
          ? "border-[#FF5A2B] bg-[#1A1005] shadow-[0_0_20px_rgba(255,90,43,0.25)] ring-1 ring-[#FF5A2B]"
          : isOutput
            ? "border-[#BCEDDB]/40 bg-[#14171C] hover:border-[#BCEDDB]/70"
            : isSpecial
              ? "border-[#FF5A2B]/40 bg-[#14171C] hover:border-[#FF5A2B]/70"
              : "border-[#262B33] bg-[#14171C] hover:border-[#303640]"
        }`}
    >
      {/* Port connection dots */}
      <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full border border-black bg-[#FF5A2B]" />
      <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full border border-black bg-[#A1A7B3]" />

      <div className="flex items-start gap-1.5">
        <div
          className={`h-6 w-6 rounded-[4px] flex items-center justify-center shrink-0 mt-0.5 ${isOutput
              ? "bg-[#BCEDDB]/15 text-[#BCEDDB] border border-[#BCEDDB]/30"
              : isSpecial
                ? "bg-[#FF5A2B]/15 text-[#FF5A2B] border border-[#FF5A2B]/30"
                : "bg-white/[0.03] text-[#A1A7B3] border border-[#262B33]"
            }`}
        >
          <Icon size={12} className={isActive ? "animate-pulse" : ""} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-semibold text-[11px] text-[#F2F4F7] group-hover:text-[#FF5A2B] transition-colors leading-tight truncate">
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
