import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { EXPERIENCE, EXPERIENCE_FILTERS } from "../data/content";

export const Experience = () => {
  const [filter, setFilter] = useState("All Systems");
  const [openId, setOpenId] = useState(EXPERIENCE[0].id);

  const items = EXPERIENCE.filter((e) => filter === "All Systems" || e.category === filter);

  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-[#F2F5EE]" data-testid="experience-section">
      {/* Numeral watermark */}
      <div className="spec-numeral absolute -top-16 -left-6 z-0">04</div>

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono2 text-[10px] font-semibold tracking-widest text-[#1F4D40] uppercase">04 / WORK EXPERIENCE</span>
          <div className="h-px flex-1 bg-[#C8D1C3]" />
          <span className="font-mono2 text-[9px] text-[#52635B] uppercase hidden sm:block">CHRONOLOGY: AUDITED LOG</span>
        </div>

        <Reveal>
          <p className="font-mono2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#FF5A2B] mb-4" data-testid="experience-eyebrow">
            04 — Work Experience
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#14261F] leading-[1.08] mb-10">
            Featured deployments & roles.
          </h2>
        </Reveal>

        {/* Filter Bar — square solid buttons */}
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-12" data-testid="experience-filters">
            {EXPERIENCE_FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`filter-${f.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                onClick={() => setFilter(f)}
                className={`rounded-[4px] px-4 py-2 font-mono2 text-[10px] tracking-wide transition-colors font-semibold ${
                  filter === f
                    ? "bg-[#14261F] text-white"
                    : "bg-[#FFFFFF] hover:bg-[#E4E8DF] text-[#14261F] border border-[#C8D1C3]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative border-l border-[#C8D1C3] ml-2 md:ml-6 pl-6 md:pl-10 space-y-8 max-w-5xl xl:max-w-6xl">
          <AnimatePresence mode="popLayout">
            {items.map((e, i) => {
              const open = openId === e.id;
              return (
                <motion.div
                  key={e.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-[27px] md:-left-[43px] top-7 h-3 w-3 rounded-[2px] border-2 border-[#F2F5EE] ${
                      i === 0 ? "bg-[#FF5A2B]" : i < 2 ? "bg-[#14261F]" : "bg-[#52635B]"
                    }`}
                  />
                  <div
                    className={`rounded-[6px] border transition-colors ${
                      open ? "border-[#FF5A2B]/40 bg-[#FFFFFF]" : "border-[#C8D1C3] bg-[#FFFFFF] hover:border-[#B0BBA9]"
                    }`}
                    data-testid={`experience-card-${e.id}`}
                  >
                    <button
                      data-testid={`experience-toggle-${e.id}`}
                      onClick={() => setOpenId(open ? null : e.id)}
                      className="w-full text-left p-5 sm:p-7 flex items-start justify-between gap-4"
                      aria-expanded={open}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <p className={`font-mono2 text-[10px] tracking-wider uppercase font-semibold ${i === 0 ? "text-[#FF5A2B]" : "text-[#52635B]"}`}>
                            {e.period}
                          </p>
                          <span className="h-1 w-1 rounded-full bg-[#C8D1C3]" />
                          <span className="font-mono2 text-[9px] tracking-wider uppercase text-[#52635B] bg-[#E4E8DF] border border-[#C8D1C3] rounded-[3px] px-2 py-0.5">
                            {e.category}
                          </span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#14261F] tracking-tight">
                          {e.org}
                        </h3>
                        <p className="mt-1 text-sm sm:text-base font-semibold text-[#1F4D40]">{e.role}</p>
                        <p className="mt-2 text-sm sm:text-base text-[#424845] max-w-2xl leading-relaxed">{e.summary}</p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`mt-2 shrink-0 text-[#52635B] transition-transform duration-300 ${open ? "rotate-180 text-[#FF5A2B]" : ""}`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-7 pb-7 pt-0">
                            <p className="text-sm sm:text-base text-[#424845] leading-relaxed max-w-3xl border-t border-[#C8D1C3] pt-5">
                              {e.details}
                            </p>
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                              {e.stack.map((s) => (
                                <span key={s} className="rounded-[3px] bg-[#E4E8DF] border border-[#C8D1C3] px-2.5 py-1 font-mono2 text-[10px] text-[#424845]">
                                  {s}
                                </span>
                              ))}
                            </div>
                            <p className="mt-4 font-mono2 text-[10px] tracking-wider uppercase text-[#FF5A2B]" data-testid={`experience-impact-${e.id}`}>
                              ▸ {e.impact}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 font-mono2 text-[10px] text-[#52635B] tracking-wider">
            // production track record · verified across client deployments and enterprise operations
          </p>
        </Reveal>
      </div>
    </section>
  );
};
