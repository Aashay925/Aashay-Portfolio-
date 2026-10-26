import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";
import { VIBE_MODES, MARQUEE_ITEMS } from "../data/content";

const Marquee = () => (
  <div
    className="marquee-paused relative overflow-hidden border-y border-[#C8D1C3] bg-[#E4E8DF] py-3.5 sm:py-4 select-none mt-14 sm:mt-16"
    data-testid="vibe-marquee"
    aria-hidden="true"
  >
    <div className="animate-marquee flex w-max whitespace-nowrap">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={`${dup}-${i}`} className="flex items-center">
              <span className="font-display text-sm sm:text-base font-bold tracking-wider uppercase text-[#14261F] px-7">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A2B]" />
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
    <section id="vibe" className="relative py-28 sm:py-36 overflow-hidden bg-[#F7FBF1]" data-testid="vibe-section">
      {/* Numeral watermark */}
      <div className="spec-numeral absolute -top-16 -left-6 z-0">05</div>

      {/* Header */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 mb-12 relative z-10">
        {/* Section rule */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono2 text-[10px] font-semibold tracking-widest text-[#1F4D40] uppercase">05 / THE VIBE ZONE</span>
          <div className="h-px flex-1 bg-[#C8D1C3]" />
          <span className="font-mono2 text-[9px] text-[#52635B] uppercase hidden sm:block">SYSTEM SPEC: RUNTIME MODES</span>
        </div>

        <Reveal>
          <p className="font-mono2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#FF5A2B] mb-4" data-testid="vibe-eyebrow">
            05 — The Vibe Zone
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#14261F] max-w-3xl leading-[1.1]" data-testid="vibe-heading">
            Serious systems. Not-so-serious human.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-[#424845] font-normal">
            Off the clock the agents keep running. Pick a mode to inspect the active engineering mindset.
          </p>
        </Reveal>
      </div>

      {/* Interactive Modes Grid */}
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col gap-3 h-full justify-center" data-testid="vibe-mode-selector">
              {VIBE_MODES.map((m) => {
                const isSelected = mode.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setMode(m)}
                    className={`group text-left rounded-[4px] border px-5 py-4 transition-all flex items-center justify-between ${
                      isSelected
                        ? "border-l-4 border-l-[#FF5A2B] border border-[#C8D1C3] bg-[#FFFFFF]"
                        : "border border-[#C8D1C3] bg-[#FFFFFF] hover:bg-[#F7FBF1]"
                    }`}
                    data-testid={`vibe-mode-${m.id}`}
                  >
                    <div>
                      <span className={`font-display font-semibold text-base sm:text-lg transition-colors block ${
                        isSelected ? "text-[#14261F]" : "text-[#14261F] group-hover:text-[#FF5A2B]"
                      }`}>
                        {m.label}
                      </span>
                      <span className={`font-mono2 text-[9px] mt-0.5 ${isSelected ? "text-[#FF5A2B]" : "text-[#52635B]"}`}>
                        {isSelected ? "[SELECTED]" : "[STANDBY]"}
                      </span>
                    </div>
                    <span className={`h-2 w-2 rounded-full transition-all ${
                      isSelected ? "bg-[#FF5A2B]" : "bg-[#C8D1C3] group-hover:bg-[#52635B]"
                    }`} />
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div
              className="spotlight-card relative h-full min-h-[280px] rounded-[6px] border border-[#C8D1C3] bg-[#FFFFFF] p-7 sm:p-10 flex flex-col justify-between"
              data-testid="vibe-readout-card"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              <div className="flex items-center justify-between border-b border-[#C8D1C3] pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1F4D40]" />
                  <p className="font-mono2 text-[10px] tracking-[0.3em] uppercase text-[#14261F] font-semibold">AASHAY.CURRENT_MODE</p>
                </div>
                <span className="font-mono2 text-[9px] px-2 py-0.5 bg-[#BCEDDB] text-[#1F4D40] rounded-[3px] font-semibold uppercase">
                  FOCUS: 100%
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
                  <blockquote className="mt-6 font-body2 text-lg sm:text-xl font-normal leading-relaxed text-[#14261F] italic" data-testid="vibe-readout-text">
                    "{mode.readout}"
                  </blockquote>
                  <p className="mt-5 font-mono2 text-[10px] tracking-widest uppercase text-[#FF5A2B]" data-testid="vibe-readout-stat">
                    ▸ {mode.stat}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Fun readout panels */}
              <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#C8D1C3] mt-6">
                <div className="p-3 bg-[#E4E8DF] rounded-[4px]">
                  <span className="font-mono2 text-[9px] text-[#52635B] block uppercase">PREFERRED COFFEE</span>
                  <span className="font-mono2 text-[10px] text-[#14261F] font-semibold">DOUBLE ESPRESSO // PURE</span>
                </div>
                <div className="p-3 bg-[#E4E8DF] rounded-[4px]">
                  <span className="font-mono2 text-[9px] text-[#52635B] block uppercase">EDITOR SHELL</span>
                  <span className="font-mono2 text-[10px] text-[#14261F] font-semibold">NEOVIM + TMUX DOCKED</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Marquee */}
      <Marquee />
    </section>
  );
};
