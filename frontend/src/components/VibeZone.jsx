import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { VIBE_MODES, MARQUEE_ITEMS } from "../data/content";

const Marquee = () => (
  <div className="marquee-paused relative overflow-hidden border-y border-[#262B33] py-6 select-none" data-testid="vibe-marquee" aria-hidden="true">
    <div className="animate-marquee flex w-max whitespace-nowrap">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-stroke px-6">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-[#7C8CFF]/60" />
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
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[#7C8CFF]/[0.04] blur-[160px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-16">
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
            Off the clock the agents keep running. Pick a mode — the readout is
            alarmingly accurate.
          </p>
        </Reveal>
      </div>

      <Marquee />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mt-16">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col gap-3 h-full justify-center" data-testid="vibe-mode-selector">
              {VIBE_MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m)}
                  className={`group text-left rounded-xl border px-5 py-4 transition-colors ${
                    mode.id === m.id
                      ? "border-[#7C8CFF]/50 bg-[#191D23]"
                      : "border-[#262B33] bg-transparent hover:border-[#303640] hover:bg-[#14171C]"
                  }`}
                  data-testid={`vibe-mode-${m.id}`}
                >
                  <span className={`font-display font-semibold text-base sm:text-lg transition-colors ${
                    mode.id === m.id ? "text-[#7C8CFF]" : "text-[#F2F4F7] group-hover:text-[#7C8CFF]"
                  }`}>
                    {m.label}
                  </span>
                </button>
              ))}
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
    </section>
  );
};
