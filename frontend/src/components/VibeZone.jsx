import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { VIBE_MODES, MARQUEE_ITEMS } from "../data/content";

const Marquee = () => (
  <div className="marquee-paused relative overflow-hidden border-y border-white/5 py-6 select-none" data-testid="vibe-marquee" aria-hidden="true">
    <div className="animate-marquee flex w-max whitespace-nowrap">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-stroke px-6">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#E06D3B]/60" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const VibeZone = () => {
  const [mode, setMode] = useState(VIBE_MODES[1]);

  return (
    <section id="vibe" className="relative py-28 sm:py-36 overflow-hidden" data-testid="vibe-section">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[#38BDF8]/[0.05] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Reveal>
          <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#E06D3B] mb-4" data-testid="vibe-eyebrow">
            03 — The Vibe Zone
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F4F5F8] max-w-3xl leading-[1.1]" data-testid="vibe-heading">
            Serious systems. Not-so-serious human.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-[#94A3B8]">
            Off the clock the agents keep running. Pick a mode — the readout is
            alarmingly accurate.
          </p>
        </Reveal>
      </div>

      <Marquee />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col gap-3 h-full justify-center" data-testid="vibe-mode-selector">
              {VIBE_MODES.map((m) => (
                <button
                  key={m.id}
                  data-testid={`vibe-mode-${m.id}`}
                  onClick={() => setMode(m)}
                  className={`group text-left rounded-xl border px-5 py-4 transition-colors ${
                    mode.id === m.id
                      ? "border-[#E06D3B]/50 bg-[#181B26]/80"
                      : "border-white/10 bg-transparent hover:border-white/25 hover:bg-[#12141D]"
                  }`}
                >
                  <span className={`font-display font-semibold text-base sm:text-lg transition-colors ${
                    mode.id === m.id ? "text-[#E06D3B]" : "text-[#F4F5F8] group-hover:text-[#E06D3B]"
                  }`}>
                    {m.label}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              className="spotlight-card relative h-full min-h-[260px] rounded-2xl border border-white/10 bg-[#12141D] p-8 sm:p-10 flex flex-col justify-between"
              data-testid="vibe-readout-card"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#64748B]">aashay.current_mode</p>
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#E06D3B]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E06D3B]" />
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mt-8 font-display text-xl sm:text-3xl font-bold leading-snug text-[#F4F5F8]" data-testid="vibe-readout-text">
                    "{mode.readout}"
                  </p>
                  <p className="mt-6 font-mono2 text-xs tracking-widest uppercase text-[#38BDF8]" data-testid="vibe-readout-stat">
                    ▸ {mode.stat}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
