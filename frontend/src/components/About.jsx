import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, SectionHeading } from "./Reveal";
import { CAPABILITIES, METRICS, AGENT_SIMULATIONS } from "../data/content";

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
    <div className="rounded-2xl border border-white/10 bg-[#0A0B10] p-6 sm:p-8 h-full flex flex-col" data-testid="agent-sandbox">
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#64748B]">agent.sandbox — simulated</p>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E06D3B]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#38BDF8]/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(AGENT_SIMULATIONS).map(([key, a]) => (
          <button
            key={key}
            data-testid={`sandbox-agent-${key}`}
            onClick={() => setActive(key)}
            className={`rounded-full px-4 py-1.5 font-mono2 text-xs transition-colors ${
              active === key
                ? "bg-[#E06D3B] text-[#0A0B10] font-semibold"
                : "border border-white/10 text-[#94A3B8] hover:border-[#E06D3B]/60 hover:text-[#F4F5F8]"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="flex-1 rounded-xl bg-[#12141D] border border-white/5 p-5 font-mono2 text-xs sm:text-sm leading-7 text-[#94A3B8] min-h-[220px]" data-testid="sandbox-output">
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {AGENT_SIMULATIONS[active].steps.slice(0, visible).map((s, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className={s.startsWith("✓") ? "text-emerald-400" : ""}
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
  <section id="work" className="relative py-28 sm:py-36" data-testid="about-section">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="about"
        eyebrow="01 — About My Work"
        title="Systems that reason, retrieve, and act — without hand-holding."
      />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        {CAPABILITIES.map((c, i) => (
          <Reveal
            key={c.id}
            delay={i * 0.1}
            className={i === 0 ? "md:col-span-4" : i === 1 ? "md:col-span-2" : "md:col-span-2"}
          >
            <div
              data-testid={`capability-card-${c.id}`}
              className="spotlight-card group h-full rounded-2xl border border-white/10 bg-[#181B26]/80 p-7 sm:p-8 hover:border-[#E06D3B]/40 transition-colors"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <p className="font-mono2 text-xs text-[#E06D3B]">{c.index}</p>
              <h3 className="mt-3 font-display text-xl sm:text-2xl font-semibold text-[#F4F5F8] group-hover:text-[#E06D3B] transition-colors">
                {c.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] leading-relaxed">{c.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono2 text-[10px] tracking-wider text-[#64748B]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.15} className="md:col-span-4">
          <AgentSandbox />
        </Reveal>

        <Reveal delay={0.2} className="md:col-span-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {METRICS.map((m) => (
              <div
                key={m.label}
                data-testid={`metric-${m.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                className="rounded-2xl border border-white/10 bg-[#12141D] p-6 text-center"
              >
                <p className="font-display text-3xl sm:text-4xl font-bold text-[#E06D3B]">{m.value}</p>
                <p className="mt-2 font-mono2 text-[10px] sm:text-xs tracking-wider uppercase text-[#64748B]">{m.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
