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
    name: "Enterprise Hybrid RAG",
    badge: "LANGGRAPH RETRIEVAL ENGINE",
    description: "Hybrid search combining dense vectors & sparse BM25 with reciprocal rank fusion",
    nodes: [
      {
        id: "n1",
        label: "Query Ingest",
        role: "Intent Parsing & Embedding",
        icon: Search,
        status: "done",
        latency: "12ms",
        col: 1,
        row: "center",
        thought: "Normalized user query. Generated text-embedding-3-large dense vector.",
        tag: "Input Router"
      },
      {
        id: "n2a",
        label: "Dense Vector",
        role: "Qdrant HNSW Search",
        icon: Database,
        status: "done",
        latency: "44ms",
        col: 2,
        row: "top",
        thought: "Retrieved 20 candidate chunks with semantic cosine similarity ≥ 0.87.",
        tag: "Qdrant Vector"
      },
      {
        id: "n2b",
        label: "Sparse BM25",
        role: "Exact Lexical Index",
        icon: Layers,
        status: "done",
        latency: "22ms",
        col: 2,
        row: "bottom",
        thought: "Retrieved 15 chunks matching specific domain keywords and SKU tokens.",
        tag: "BM25 Lexical"
      },
      {
        id: "n3",
        label: "Cohere Rerank",
        role: "Cross-Encoder Fusion",
        icon: ShieldCheck,
        status: "active",
        latency: "58ms",
        col: 3,
        row: "center",
        thought: "Applied Reciprocal Rank Fusion (RRF) + cross-encoder rerank. Retained top 4 chunks.",
        tag: "RRF Fusion"
      },
      {
        id: "n4",
        label: "Grounded Synthesis",
        role: "Faithful Response Stream",
        icon: CheckCircle2,
        status: "ready",
        latency: "96ms",
        col: 4,
        row: "center",
        thought: "Generated synthesized response with 3 inline verified citations. 0 hallucination.",
        tag: "Verified Answer"
      }
    ],
    thoughtStream: [
      "query_ingest: parsed enterprise question → dense embedding vector generated (12ms)",
      "retrieval_mesh: parallel dispatch [Qdrant: 20 chunks · BM25: 15 chunks] completed",
      "rrf_fusion: reciprocal rank fusion reranked 35 items → top 4 selected (score: 0.94)",
      "faithfulness_gate: hallucination verification pass 100% · citations grounded ✓",
      "response_stream: streaming production answer with token latency 18ms/tok ✓"
    ]
  },
  code: {
    id: "code",
    name: "Code Review & Auto-Patch",
    badge: "CYCLIC CI/CD AGENT",
    description: "Automated PR scanner running SAST security, sandbox tests & patch generator",
    nodes: [
      {
        id: "n1",
        label: "PR Webhook",
        role: "Diff Parser & AST Tree",
        icon: GitBranch,
        status: "done",
        latency: "16ms",
        col: 1,
        row: "center",
        thought: "Ingested PR #142: 3 files changed (+84 / -12). AST symbol graph mapped.",
        tag: "Git Hook"
      },
      {
        id: "n2a",
        label: "Security SAST",
        role: "Injection & Auth Scan",
        icon: ShieldCheck,
        status: "done",
        latency: "68ms",
        col: 2,
        row: "top",
        thought: "Scanned AST tree: flagged missing boundary check on endpoint parameter.",
        tag: "SAST Checker"
      },
      {
        id: "n2b",
        label: "Pytest Runner",
        role: "Docker Sandbox Execution",
        icon: Terminal,
        status: "done",
        latency: "92ms",
        col: 2,
        row: "bottom",
        thought: "Executed test suite: 47 passed, 1 failed on edge-case empty payload.",
        tag: "Sandbox Pytest"
      },
      {
        id: "n3",
        label: "Critic Auto-Patch",
        role: "Self-Correction Engine",
        icon: RefreshCw,
        status: "active",
        latency: "74ms",
        col: 3,
        row: "center",
        thought: "Synthesized auto-patch v2 inserting Pydantic validator. Re-executing tests.",
        tag: "Self-Healing Loop"
      },
      {
        id: "n4",
        label: "PR Merge Gate",
        role: "Zero Regression Check",
        icon: CheckCircle2,
        status: "ready",
        latency: "48/48 pass",
        col: 4,
        row: "center",
        thought: "Re-run successful. All 48/48 tests passing. Pushed approved review comment.",
        tag: "Merge Approved"
      }
    ],
    thoughtStream: [
      "git_ingest: parsed PR diff across 3 modules (+84 lines changed)",
      "parallel_audit: security scan clean · pytest runner identified 1 boundary failure",
      "self_critique: analyzing stack trace → generated targeted validator patch v2",
      "sandbox_retest: suite re-executed in Docker container: 48/48 passed (0 regressions)",
      "merge_gate: approved PR review comment posted with full audit trail ✓"
    ]
  },
  sre: {
    id: "sre",
    name: "SRE Incident Triage",
    badge: "EVENT-DRIVEN SRE AGENT",
    description: "Alert responder analyzing telemetry, diagnosing root-cause & staging canary",
    nodes: [
      {
        id: "n1",
        label: "Prometheus Hook",
        role: "P1 Alert Ingestion",
        icon: AlertTriangle,
        status: "done",
        latency: "8ms",
        col: 1,
        row: "center",
        thought: "P1 Alert: api-gateway p99 latency spike to 2,400ms across 4 pods.",
        tag: "P1 Trigger"
      },
      {
        id: "n2a",
        label: "Jaeger Tracing",
        role: "Span Bottleneck Scan",
        icon: Zap,
        status: "done",
        latency: "52ms",
        col: 2,
        row: "top",
        thought: "Correlated 480 distributed spans. Root span isolated to db-pool exhaustion.",
        tag: "OpenTelemetry"
      },
      {
        id: "n2b",
        label: "Log Anomaly",
        role: "Cluster Error Parsing",
        icon: Bot,
        status: "done",
        latency: "64ms",
        col: 2,
        row: "bottom",
        thought: "Parsed Elasticsearch logs: 120 connection timeout errors in last 2 minutes.",
        tag: "Log Analyzer"
      },
      {
        id: "n3",
        label: "Canary Stager",
        role: "K8s Patch Sandbox",
        icon: Cpu,
        status: "active",
        latency: "46ms",
        col: 3,
        row: "center",
        thought: "Formed hypothesis: Pool capacity insufficient. Staged pool scale 20 → 50 in canary.",
        tag: "Canary Staged"
      },
      {
        id: "n4",
        label: "Slack HITL",
        role: "Human-in-the-Loop Signoff",
        icon: CheckCircle2,
        status: "ready",
        latency: "Dispatched",
        col: 4,
        row: "center",
        thought: "Pushed verified runbook + 1-click canary rollout button to #sre-oncall.",
        tag: "1-Click Signoff"
      }
    ],
    thoughtStream: [
      "alert_hook: Prometheus P1 triggered (api-gateway p99 latency > 2.4s)",
      "telemetry_scan: Jaeger traces isolate database pool connection starvation",
      "diagnosis: unindexed analytical query blocking pool connections",
      "canary_staged: temporary replica pool scaling applied to canary namespace",
      "slack_dispatch: runbook summary and 1-click approval sent to #sre-incidents ✓"
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
      className="relative rounded-2xl border border-white/10 bg-[#12141D]/90 backdrop-blur p-6 sm:p-7 shadow-[0_0_60px_rgba(224,109,59,0.14)] w-full overflow-hidden transition-all duration-300"
      data-testid="hero-agent-workflow-graph"
    >
      {/* Top Titlebar */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E06D3B]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono2 text-[11px] tracking-[0.2em] uppercase text-[#94A3B8]">
            {workflow.badge}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#38BDF8]" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38BDF8]" />
          </span>
          <span className="font-mono2 text-[10px] tracking-wider text-[#38BDF8] uppercase font-semibold">
            Live Execution Mesh
          </span>
        </div>
      </div>

      {/* Switcher Buttons: Real-world Workflows */}
      <div className="mb-5">
        <p className="font-mono2 text-[10px] tracking-widest uppercase text-[#64748B] mb-2.5">
          Switch Production Agent Pipeline:
        </p>
        <div className="grid grid-cols-3 gap-2.5">
          {Object.values(WORKFLOWS).map((wf) => {
            const isActive = wf.id === activeWorkflowKey;
            return (
              <button
                key={wf.id}
                onClick={() => setActiveWorkflowKey(wf.id)}
                className={`group relative rounded-xl px-3 py-2.5 font-mono2 text-xs tracking-wide transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                  isActive
                    ? "bg-[#E06D3B] text-[#0A0B10] font-bold shadow-[0_0_24px_rgba(224,109,59,0.35)] scale-[1.02]"
                    : "border border-white/10 bg-white/[0.02] text-[#94A3B8] hover:border-[#E06D3B]/50 hover:text-[#F4F5F8]"
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
      <div className="relative rounded-xl border border-white/10 bg-[#090A0F] p-4 sm:p-5 overflow-hidden min-h-[220px]">
        {/* Dot grid canvas background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "16px 16px"
          }}
        />

        {/* Dynamic SVG Connecting Wires */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Wire 1: Col 1 -> Col 2 Top */}
          <path
            d="M 130 110 C 145 110, 150 55, 175 55"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />
          <motion.path
            d="M 130 110 C 145 110, 150 55, 175 55"
            fill="none"
            stroke="#E06D3B"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Wire 2: Col 1 -> Col 2 Bottom */}
          <path
            d="M 130 110 C 145 110, 150 165, 175 165"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />
          <motion.path
            d="M 130 110 C 145 110, 150 165, 175 165"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Wire 3: Col 2 Top -> Col 3 */}
          <path
            d="M 330 55 C 345 55, 350 110, 365 110"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />
          <motion.path
            d="M 330 55 C 345 55, 350 110, 365 110"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Wire 4: Col 2 Bottom -> Col 3 */}
          <path
            d="M 330 165 C 345 165, 350 110, 365 110"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />
          <motion.path
            d="M 330 165 C 345 165, 350 110, 365 110"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="6 8"
            animate={{ strokeDashoffset: [28, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
          />

          {/* Wire 5: Col 3 -> Col 4 Output */}
          <path
            d="M 505 110 C 515 110, 520 110, 530 110"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="2"
          />
          <motion.path
            d="M 505 110 C 515 110, 520 110, 530 110"
            fill="none"
            stroke="#34D399"
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
              stroke="#F59E0B"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              animate={{ strokeDashoffset: [20, 0] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
            />
          )}
        </svg>

        {/* Nodes Layer: 4 Columns */}
        <div className="relative z-10 grid grid-cols-12 gap-3 items-center min-h-[190px]">
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
          <div className="col-span-3 flex flex-col justify-between gap-3">
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
      <div className="mt-4 rounded-xl border border-white/10 bg-[#090A0F]/90 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#E06D3B]" />
            <span className="font-mono2 text-xs tracking-wider uppercase text-[#E06D3B] font-bold">
              Inspecting: {selectedNode.label}
            </span>
            <span className="font-mono2 text-[10px] text-[#64748B]">
              ({selectedNode.latency})
            </span>
          </div>
          <span className="font-mono2 text-[10px] tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase font-medium">
            {selectedNode.tag}
          </span>
        </div>

        {/* Selected Node's live thought */}
        <p className="font-mono2 text-xs text-[#F4F5F8] leading-relaxed">
          <span className="text-[#38BDF8]">state.thought:</span> "{selectedNode.thought}"
        </p>

        {/* Real-time streaming log */}
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-mono2 text-[#64748B]">
          <span className="truncate max-w-[500px]">
            <span className="text-[#E06D3B]">▸</span> {workflow.thoughtStream[streamIndex]}
          </span>
          <span className="caret-blink text-[#E06D3B]">▍</span>
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
      className={`group relative cursor-pointer rounded-xl border p-2.5 transition-all select-none ${
        isSelected
          ? "border-[#E06D3B] bg-[#181B26] shadow-[0_0_24px_rgba(224,109,59,0.3)] ring-1 ring-[#E06D3B]"
          : isOutput
          ? "border-emerald-500/40 bg-[#12141D] hover:border-emerald-500/70"
          : isSpecial
          ? "border-[#38BDF8]/50 bg-[#12141D] hover:border-[#38BDF8]/80"
          : "border-white/10 bg-[#12141D]/90 hover:border-white/30"
      }`}
    >
      {/* Port connection dots */}
      <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full border border-black bg-[#E06D3B]" />
      <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full border border-black bg-[#38BDF8]" />

      <div className="flex items-start gap-2">
        <div
          className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            isOutput
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : isSpecial
              ? "bg-[#E06D3B]/20 text-[#E06D3B] border border-[#E06D3B]/30"
              : "bg-white/5 text-[#38BDF8] border border-white/10"
          }`}
        >
          <Icon size={14} className={isActive ? "animate-pulse" : ""} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-xs text-[#F4F5F8] group-hover:text-[#E06D3B] transition-colors leading-tight">
            {node.label}
          </p>
          <p className="font-mono2 text-[9px] text-[#64748B] leading-tight mt-0.5">
            {node.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
