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
    <section id="experience" className="relative py-28 sm:py-36 bg-[#0D0F16]" data-testid="experience-section">
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
                    ? "bg-[#F4F5F8] text-[#0A0B10] font-semibold"
                    : "border border-white/10 text-[#94A3B8] hover:border-[#E06D3B]/60 hover:text-[#F4F5F8]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative border-l border-white/10 ml-2 md:ml-6 pl-6 md:pl-12 space-y-8 max-w-5xl xl:max-w-6xl">
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
                  <span className="absolute -left-[31px] md:-left-[55px] top-8 h-3 w-3 rounded-full border-2 border-[#E06D3B] bg-[#0A0B10]" />
                  <div
                    className={`rounded-2xl border transition-colors ${
                      open ? "border-[#E06D3B]/40 bg-[#181B26]/80" : "border-white/10 bg-[#12141D]/60 hover:border-white/25"
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
                        <p className="font-mono2 text-xs tracking-widest text-[#38BDF8]">{e.period}</p>
                        <h3 className="mt-2 font-display text-xl sm:text-2xl font-semibold text-[#F4F5F8]">{e.role}</h3>
                        <p className="mt-1 text-sm text-[#64748B]">{e.org}</p>
                        <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-2xl">{e.summary}</p>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`mt-2 shrink-0 text-[#64748B] transition-transform duration-300 ${open ? "rotate-180 text-[#E06D3B]" : ""}`}
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
                            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed max-w-3xl border-t border-white/10 pt-6">
                              {e.details}
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-2">
                              {e.stack.map((s) => (
                                <span key={s} className="rounded-md bg-[#0A0B10] border border-white/10 px-3 py-1 font-mono2 text-[11px] text-[#38BDF8]">
                                  {s}
                                </span>
                              ))}
                            </div>
                            <p className="mt-5 font-mono2 text-xs tracking-wider uppercase text-[#E06D3B]" data-testid={`experience-impact-${e.id}`}>
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
          <p className="mt-12 font-mono2 text-xs text-[#64748B] tracking-wider">
            // example entries — swap in real roles, orgs, and metrics
          </p>
        </Reveal>
      </div>
    </section>
  );
};
