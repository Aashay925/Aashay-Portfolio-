import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { EXPERIENCE, EXPERIENCE_FILTERS } from "../data/content";

export const Experience = () => {
  const [filter, setFilter] = useState("All Systems");
  const [openId, setOpenId] = useState(EXPERIENCE[0].id);

  const items = EXPERIENCE.filter((e) => filter === "All Systems" || e.category === filter);

  return (
    <section id="experience" className="relative py-28 sm:py-36 bg-[#0D0F12]" data-testid="experience-section">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <SectionHeading
          id="experience"
          eyebrow="04 — Work Experience"
          title="Featured deployments & roles."
        />

        <Reveal>
          <div className="flex flex-wrap gap-2 mb-14" data-testid="experience-filters">
            {EXPERIENCE_FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`filter-${f.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 font-mono2 text-xs tracking-wide transition-colors ${
                  filter === f
                    ? "bg-[#F2F4F7] text-[#0D0F12] font-semibold"
                    : "border border-[#262B33] text-[#A1A7B3] hover:border-[#7C8CFF]/60 hover:text-[#F2F4F7]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative border-l border-[#262B33] ml-2 md:ml-6 pl-6 md:pl-12 space-y-8 max-w-5xl xl:max-w-6xl">
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
                  <span className="absolute -left-[31px] md:-left-[55px] top-8 h-3 w-3 rounded-full border-2 border-[#7C8CFF] bg-[#0D0F12]" />
                  <div
                    className={`rounded-2xl border transition-colors ${
                      open ? "border-[#7C8CFF]/40 bg-[#191D23]/80" : "border-[#262B33] bg-[#14171C]/60 hover:border-[#303640]"
                    }`}
                    data-testid={`experience-card-${e.id}`}
                  >
                    <button
                      data-testid={`experience-toggle-${e.id}`}
                      onClick={() => setOpenId(open ? null : e.id)}
                      className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4"
                      aria-expanded={open}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <p className="font-mono2 text-xs tracking-wider uppercase text-[#7C8CFF] font-semibold">{e.period}</p>
                          <span className="h-1 w-1 rounded-full bg-white/25" />
                          <span className="font-mono2 text-[10.5px] tracking-wider uppercase text-[#A1A7B3] bg-[#191D23] border border-[#262B33] rounded-full px-2.5 py-0.5">
                            {e.category}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-[1.75rem] font-bold text-[#F2F4F7] tracking-tight">
                          {e.org}
                        </h3>
                        <p className="mt-1 text-base sm:text-lg font-medium text-[#A5AEFF]">{e.role}</p>
                        <p className="mt-3 text-sm sm:text-base text-[#A1A7B3] max-w-2xl leading-relaxed">{e.summary}</p>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`mt-2 shrink-0 text-[#6B7280] transition-transform duration-300 ${open ? "rotate-180 text-[#7C8CFF]" : ""}`}
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
                          <div className="px-6 sm:px-8 pb-8 pt-0">
                            <p className="text-sm sm:text-base text-[#A1A7B3] leading-relaxed max-w-3xl border-t border-[#262B33] pt-6">
                              {e.details}
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-2">
                              {e.stack.map((s) => (
                                <span key={s} className="rounded-md bg-[#0D0F12] border border-[#262B33] px-3 py-1 font-mono2 text-[11px] text-[#A1A7B3]">
                                  {s}
                                </span>
                              ))}
                            </div>
                            <p className="mt-5 font-mono2 text-xs tracking-wider uppercase text-[#7C8CFF]" data-testid={`experience-impact-${e.id}`}>
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
          <p className="mt-12 font-mono2 text-xs text-[#6B7280] tracking-wider">
            // production track record · verified across client deployments and enterprise operations
          </p>
        </Reveal>
      </div>
    </section>
  );
};
