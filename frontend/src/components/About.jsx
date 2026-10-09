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
      className="rounded-2xl border border-[#262B33] bg-[#14171C]/90 backdrop-blur p-6 sm:p-8 flex flex-col shadow-[0_0_50px_rgba(124,140,255,0.04)]"
      data-testid="agent-sandbox"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#262B33]">
        <div className="flex items-center gap-2.5">
          <Terminal size={16} className="text-[#7C8CFF]" />
          <p className="font-mono2 text-xs tracking-[0.25em] uppercase text-[#A1A7B3]">agent.sandbox — simulated runtime</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#65C18C] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#65C18C]" />
          </span>
          <span className="font-mono2 text-[10px] tracking-wider text-[#65C18C] uppercase hidden sm:inline">Active</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(AGENT_SIMULATIONS).map(([key, a]) => (
          <button
            key={key}
            data-testid={`sandbox-agent-${key}`}
            onClick={() => setActive(key)}
            className={`rounded-full px-4 py-1.5 font-mono2 text-xs transition-all ${
              active === key
                ? "bg-[#7C8CFF] text-[#0D0F12] font-semibold shadow-[0_0_20px_rgba(124,140,255,0.25)]"
                : "border border-[#262B33] bg-[#191D23] text-[#A1A7B3] hover:border-[#7C8CFF]/60 hover:text-[#F2F4F7]"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div
        className="flex-1 rounded-xl bg-[#0D0F12] border border-[#262B33] p-5 font-mono2 text-xs sm:text-sm leading-7 text-[#A1A7B3] min-h-[220px] shadow-inner"
        data-testid="sandbox-output"
      >
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {AGENT_SIMULATIONS[active].steps.slice(0, visible).map((s, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={s.startsWith("✓") ? "text-[#65C18C] font-medium" : s.startsWith("→") ? "text-[#7C8CFF]" : ""}
              >
                {s}
              </motion.p>
            ))}
            {visible < AGENT_SIMULATIONS[active].steps.length && (
              <span className="caret-blink text-[#7C8CFF]">▍</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const About = () => (
  <section id="work" className="relative py-28 sm:py-36 overflow-hidden" data-testid="about-section">
    {/* Subtle atmospheric glow */}
    <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-[#7C8CFF]/[0.05] blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#7C8CFF]/[0.03] blur-[120px] pointer-events-none" />

    <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
        {/* Left Column: Heading, intro & stacked capability cards */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7C8CFF] mb-4" data-testid="about-eyebrow">
              01 — About My Work
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-[#F2F4F7] leading-[1.08]" data-testid="about-heading">
              Practical AI systems and reliable automation <span className="text-[#7C8CFF]">built to ship.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-base sm:text-lg text-[#A1A7B3] leading-relaxed max-w-xl font-normal">
              {PROFILE.summary}
            </p>
          </Reveal>

          {/* Stacked capability cards */}
          <div className="mt-10 space-y-4 sm:space-y-5">
            {CAPABILITIES.map((c, i) => {
              const Icon = CAP_ICONS[c.id] || Sparkles;
              return (
                <Reveal key={c.id} delay={0.15 + i * 0.08}>
                  <div
                    data-testid={`capability-card-${c.id}`}
                    className="spotlight-card group relative rounded-2xl border border-[#262B33] bg-[#14171C]/90 p-6 sm:p-7 hover:border-[#7C8CFF]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,140,255,0.06)]"
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono2 text-xs text-[#7C8CFF] font-semibold">{c.index}</span>
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F2F4F7] group-hover:text-[#7C8CFF] transition-colors">
                          {c.title}
                        </h3>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-white/[0.03] border border-[#262B33] flex items-center justify-center text-[#A1A7B3] group-hover:text-[#7C8CFF] group-hover:border-[#7C8CFF]/30 transition-all">
                        <Icon size={16} />
                      </div>
                    </div>

                    <p className="mt-3 text-sm sm:text-base text-[#A1A7B3] leading-relaxed">{c.blurb}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-[#262B33] bg-[#191D23] px-3 py-1 font-mono2 text-[10px] tracking-wider text-[#6B7280] transition-colors"
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

        {/* Right Column: Interactive Agent Sandbox & Production Metrics */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col gap-6 sm:gap-8">
          <Reveal delay={0.15}>
            <AgentSandbox />
          </Reveal>

          {/* 2x2 Metrics Grid */}
          <Reveal delay={0.25}>
            <div className="grid grid-cols-2 gap-4">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  data-testid={`metric-${m.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  className="group relative rounded-2xl border border-[#262B33] bg-[#14171C]/90 backdrop-blur p-5 sm:p-6 hover:border-[#7C8CFF]/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono2 text-[10px] tracking-widest uppercase text-[#6B7280]">METRIC 0{i + 1}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7C8CFF]/70 group-hover:scale-125 transition-transform" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl xl:text-4xl font-semibold text-[#F2F4F7] group-hover:text-[#7C8CFF] transition-colors">
                    {m.value}
                  </p>
                  <p className="mt-2 font-mono2 text-[11px] sm:text-xs tracking-wider uppercase text-[#A1A7B3] leading-tight">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);
