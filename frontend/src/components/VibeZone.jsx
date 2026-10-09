import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { VIBE_MODES, MARQUEE_ITEMS } from "../data/content";

const Marquee = () => (
  <div
    className="marquee-paused relative overflow-hidden border-y border-[#262B33] bg-[#14171C]/90 backdrop-blur py-5 sm:py-6 select-none mt-16 sm:mt-20"
    data-testid="vibe-marquee"
    aria-hidden="true"
  >
    <div className="animate-marquee flex w-max whitespace-nowrap">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span className="font-display text-base sm:text-xl font-bold tracking-wider uppercase text-[#F2F4F7] px-8">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#7C8CFF] shadow-[0_0_10px_rgba(124,140,255,0.9)]" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const VibeZone = () => {
  const [mode, setMode] = useState(VIBE_MODES[0]);

  return (
    <section id="vibe" className="relative py-28 sm:py-36 overflow-hidden" data-testid="vibe-section">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[#7C8CFF]/[0.04] blur-[160px] pointer-events-none" />

      {/* Header */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-14">
        <Reveal>
          <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7C8CFF] mb-4" data-testid="vibe-eyebrow">
            05 — The Vibe Zone
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F2F4F7] max-w-3xl leading-[1.1]" data-testid="vibe-heading">
            Serious systems. Not-so-serious human.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-[#A1A7B3] font-normal">
            Off the clock the agents keep running. Pick a mode to inspect the active engineering mindset.
          </p>
        </Reveal>
      </div>

      {/* Interactive Modes Grid */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col gap-3 h-full justify-center" data-testid="vibe-mode-selector">
              {VIBE_MODES.map((m) => {
                const isSelected = mode.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m)}
                    className={`group text-left rounded-xl border px-5 py-4 transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-[#7C8CFF]/60 bg-[#1A1F29] shadow-[0_0_25px_rgba(124,140,255,0.12)]"
                        : "border-[#262B33] bg-[#14171C]/60 hover:border-[#38404D] hover:bg-[#191D24]"
                    }`}
                    data-testid={`vibe-mode-${m.id}`}
                  >
                    <span className={`font-display font-semibold text-base sm:text-lg transition-colors ${
                      isSelected ? "text-[#7C8CFF]" : "text-[#F2F4F7] group-hover:text-[#FFFFFF]"
                    }`}>
                      {m.label}
                    </span>
                    <span className={`h-2 w-2 rounded-full transition-all ${
                      isSelected ? "bg-[#7C8CFF] scale-125 shadow-[0_0_8px_rgba(124,140,255,0.9)]" : "bg-[#262B33] group-hover:bg-[#4B5563]"
                    }`} />
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              className="spotlight-card relative h-full min-h-[260px] rounded-2xl border border-[#262B33] bg-[#14171C] p-8 sm:p-10 flex flex-col justify-between"
              data-testid="vibe-readout-card"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <div className="flex items-center justify-between">
                <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#6B7280]">aashay.current_mode</p>
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#7C8CFF]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C8CFF]" />
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
                  <p className="mt-8 font-display text-xl sm:text-3xl font-semibold leading-snug text-[#F2F4F7]" data-testid="vibe-readout-text">
                    "{mode.readout}"
                  </p>
                  <p className="mt-6 font-mono2 text-xs tracking-widest uppercase text-[#7C8CFF]" data-testid="vibe-readout-stat">
                    ▸ {mode.stat}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee Ticker Strip positioned below the modes with high contrast */}
      <Marquee />
    </section>
  );
};
