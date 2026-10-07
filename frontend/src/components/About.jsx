import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Sparkles, Bot, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";
import { CAPABILITIES, METRICS, AGENT_SIMULATIONS } from "../data/content";

const CAP_ICONS = {
  genai: Sparkles,
  agentic: Bot,
  automation: Workflow,
};

const AgentSandbox = () => {
  const [active, setActive] = useState("researcher");
  const [visible, setVisible] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    setVisible(0);
    clearInterval(timer.current);
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
      className="rounded-2xl border border-white/10 bg-[#12141D]/90 backdrop-blur p-6 sm:p-8 flex flex-col shadow-[0_0_50px_rgba(224,109,59,0.06)]"
      data-testid="agent-sandbox"
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <Terminal size={16} className="text-[#E06D3B]" />
          <p className="font-mono2 text-xs tracking-[0.25em] uppercase text-[#94A3B8]">agent.sandbox — simulated runtime</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono2 text-[10px] tracking-wider text-emerald-400 uppercase hidden sm:inline">Active</span>
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
                ? "bg-[#E06D3B] text-[#0A0B10] font-semibold shadow-[0_0_20px_rgba(224,109,59,0.35)]"
                : "border border-white/10 bg-white/[0.02] text-[#94A3B8] hover:border-[#E06D3B]/60 hover:text-[#F4F5F8]"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div
        className="flex-1 rounded-xl bg-[#090A0F] border border-white/10 p-5 font-mono2 text-xs sm:text-sm leading-7 text-[#94A3B8] min-h-[220px] shadow-inner"
        data-testid="sandbox-output"
      >
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {AGENT_SIMULATIONS[active].steps.slice(0, visible).map((s, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={s.startsWith("✓") ? "text-emerald-400 font-medium" : s.startsWith("→") ? "text-[#38BDF8]" : ""}
              >
                {s}
              </motion.p>
            ))}
            {visible < AGENT_SIMULATIONS[active].steps.length && (
              <span className="caret-blink text-[#E06D3B]">▍</span>
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
    <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-[#E06D3B]/5 blur-[120px] pointer-events-none" />
    <div className="absolute bottom-1/4 -right-48 w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-[120px] pointer-events-none" />

    <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-start">
        {/* Left Column: Heading, intro & stacked capability cards */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#E06D3B] mb-4" data-testid="about-eyebrow">
              01 — About My Work
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#F4F5F8] leading-[1.08]" data-testid="about-heading">
              Systems that reason, retrieve, and act <span className="text-[#E06D3B]">—</span> without hand-holding.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-xl">
              Architecting autonomous agents and production LLM pipelines that recover from failure, verify their own outputs, and scale deterministically.
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
                    className="spotlight-card group relative rounded-2xl border border-white/10 bg-[#141620]/80 p-6 sm:p-7 hover:border-[#E06D3B]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(224,109,59,0.08)]"
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono2 text-xs text-[#E06D3B] font-semibold">{c.index}</span>
                        <div className="h-1 w-1 rounded-full bg-white/20" />
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F5F8] group-hover:text-[#E06D3B] transition-colors">
                          {c.title}
                        </h3>
                      </div>
                      <div className="h-8 w-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] group-hover:text-[#E06D3B] group-hover:border-[#E06D3B]/30 transition-all">
                        <Icon size={16} />
                      </div>
                    </div>

                    <p className="mt-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed">{c.blurb}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 font-mono2 text-[10px] tracking-wider text-[#94A3B8] group-hover:border-white/15 transition-colors"
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
                  className="group relative rounded-2xl border border-white/10 bg-[#12141D]/90 backdrop-blur p-5 sm:p-6 hover:border-[#E06D3B]/40 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono2 text-[10px] tracking-widest uppercase text-[#64748B]">METRIC 0{i + 1}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E06D3B]/70 group-hover:scale-125 transition-transform" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl xl:text-4xl font-bold text-[#F4F5F8] group-hover:text-[#E06D3B] transition-colors">
                    {m.value}
                  </p>
                  <p className="mt-2 font-mono2 text-[11px] sm:text-xs tracking-wider uppercase text-[#94A3B8] leading-tight">
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
