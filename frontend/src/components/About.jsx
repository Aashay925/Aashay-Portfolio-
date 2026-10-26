import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, Bot, Workflow, Layers, Database } from "lucide-react";
import { Reveal } from "./Reveal";
import { CAPABILITIES, METRICS, AGENT_SIMULATIONS, PROFILE } from "../data/content";

const CAP_ICONS = {
  agentic: Bot,
  rag: Database,
  zoho: Workflow,
  fullstack: Layers,
};

const AgentSandbox = () => {
  const defaultAgent = Object.keys(AGENT_SIMULATIONS)[0] || "rag";
  const [active, setActive] = useState(defaultAgent);
  const [visible, setVisible] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    setVisible(0);
    clearInterval(timer.current);
    if (!AGENT_SIMULATIONS[active]) return;
    timer.current = setInterval(() => {
      setVisible((v) => {
        if (v >= AGENT_SIMULATIONS[active].steps.length) {
          clearInterval(timer.current);
          return v;
        }
        return v + 1;
      });
    }, 650);
    return () => clearInterval(timer.current);
  }, [active]);

  return (
    <div
      className="rounded-[6px] border border-[#C8D1C3] bg-[#FFFFFF] overflow-hidden flex flex-col shadow-sm"
      data-testid="agent-sandbox"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#C8D1C3] bg-[#FFFFFF]">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#FF5A2B]" />
          <p className="font-mono2 text-[10px] tracking-[0.25em] uppercase text-[#14261F] font-semibold">AGENT.SANDBOX — SIMULATED RUNTIME</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#1F4D40] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1F4D40]" />
          </span>
          <span className="font-mono2 text-[9px] tracking-wider text-[#1F4D40] uppercase bg-[#E4E8DF] border border-[#C8D1C3] px-2 py-0.5 rounded-[3px]">STATE: READY</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#C8D1C3] bg-[#E4E8DF]">
        {Object.entries(AGENT_SIMULATIONS).map(([key, a]) => (
          <button
            key={key}
            data-testid={`sandbox-agent-${key}`}
            onClick={() => setActive(key)}
            className={`px-3.5 py-1.5 font-mono2 text-[10px] tracking-wide transition-all border-r border-[#C8D1C3] last:border-r-0 font-semibold ${
              active === key
                ? "bg-[#FFFFFF] text-[#14261F] border-t-2 border-t-[#1F4D40]"
                : "bg-transparent text-[#52635B] hover:text-[#14261F] border-t-2 border-t-transparent"
            }`}
          >
            [{a.label}]
          </button>
        ))}
      </div>

      {/* Output */}
      <div
        className="flex-1 bg-[#F7FBF1] border-0 p-4 font-mono2 text-xs sm:text-sm leading-7 text-[#14261F] min-h-[220px]"
        data-testid="sandbox-output"
      >
        <div className="text-[#52635B] text-[9px] mb-2">
          // EXECUTION LOG: TASK_ID #8921-AGRO-QUERY
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {AGENT_SIMULATIONS[active].steps.slice(0, visible).map((s, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={
                  s.startsWith("✓")
                    ? "text-[#1F4D40] font-medium"
                    : s.startsWith("→")
                    ? "text-[#FF5A2B]"
                    : "text-[#424845]"
                }
              >
                {s}
              </motion.p>
            ))}
            {visible < AGENT_SIMULATIONS[active].steps.length && (
              <span className="caret-blink text-[#FF5A2B]">▍</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer bar */}
      <div className="bg-[#E4E8DF] px-4 py-2 border-t border-[#C8D1C3] flex justify-between items-center font-mono2 text-[9px] text-[#52635B]">
        <span>ENV: GCP CONTAINER RUNTIME</span>
        <span>MEMORY: 184MB // CPU: 0.04 CORE</span>
      </div>
    </div>
  );
};

export const About = () => (
  <section id="work" className="relative py-28 sm:py-36 overflow-hidden bg-[#F2F5EE]" data-testid="about-section">
    {/* Spec numeral watermark */}
    <div className="spec-numeral absolute -top-16 -left-6 z-0">01</div>

    <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
      {/* Section label */}
      <div className="flex items-center gap-4 mb-12">
        <span className="font-mono2 text-[10px] font-semibold tracking-widest text-[#1F4D40] uppercase">01 / ABOUT MY WORK</span>
        <div className="h-px flex-1 bg-[#C8D1C3]" />
        <span className="font-mono2 text-[9px] text-[#52635B] uppercase hidden sm:block">SYSTEM SPEC: AGENTIC CORE</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-6">
          <Reveal>
            <h2
              className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#14261F] leading-[1.08]"
              data-testid="about-heading"
            >
              Practical AI systems and reliable automation{" "}
              <span className="text-[#FF5A2B]">built to ship.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base sm:text-lg text-[#424845] leading-relaxed max-w-xl font-normal">
              {PROFILE.summary}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base text-[#424845] leading-relaxed max-w-xl font-normal">
              Rather than generic wrapper demos, I design fault-tolerant multi-agent loops with deterministic state validation, human-in-the-loop triggers, and rigorous cost-to-latency balance across high-volume workflows.
            </p>
          </Reveal>

          {/* Spec Metrics strip */}
          <Reveal delay={0.14}>
            <div className="grid grid-cols-3 gap-3 p-4 bg-[#FFFFFF] border border-[#C8D1C3] rounded-[6px]">
              {METRICS.map((m, i) => (
                <div key={m.label} data-testid={`metric-${m.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                  <div className={`font-display text-2xl sm:text-3xl font-bold tracking-tight ${i === 1 ? "text-[#FF5A2B]" : "text-[#14261F]"}`}>
                    {m.value}
                  </div>
                  <div className="font-mono2 text-[9px] text-[#52635B] uppercase tracking-wider mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Capability cards */}
          <div className="space-y-3">
            {CAPABILITIES.map((c, i) => {
              const Icon = CAP_ICONS[c.id] || Sparkles;
              return (
                <Reveal key={c.id} delay={0.15 + i * 0.06}>
                  <div
                    data-testid={`capability-card-${c.id}`}
                    className="spotlight-card group relative rounded-[4px] border border-[#C8D1C3] bg-[#FFFFFF] p-4 sm:p-5 hover:border-[#FF5A2B]/50 transition-all duration-300 hover:shadow-sm"
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono2 text-[10px] text-[#1F4D40] font-semibold">{c.index}</span>
                        <div className="h-1 w-1 rounded-full bg-[#C8D1C3]" />
                        <h3 className="font-display text-base sm:text-lg font-semibold text-[#14261F] group-hover:text-[#FF5A2B] transition-colors">
                          {c.title}
                        </h3>
                      </div>
                      <div className="h-7 w-7 rounded-[4px] bg-[#E4E8DF] border border-[#C8D1C3] flex items-center justify-center text-[#52635B] group-hover:text-[#FF5A2B] group-hover:border-[#FF5A2B]/30 transition-all">
                        <Icon size={14} />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-[#424845] leading-relaxed">{c.blurb}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-[3px] border border-[#C8D1C3] bg-[#E4E8DF] px-2 py-0.5 font-mono2 text-[9px] tracking-wider text-[#52635B]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Right Column: Agent Sandbox */}
        <div className="lg:col-span-6 flex flex-col gap-6 sm:gap-8">
          <Reveal delay={0.15}>
            <AgentSandbox />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
