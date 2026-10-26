import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Database, Cpu, Layers, CheckCircle2, ShieldCheck, Zap, Sliders, Server } from "lucide-react";
import { Reveal } from "./Reveal";
import { SKILLS_CATEGORIES } from "../data/content";

const DOMAIN_ICONS = {
  Bot,
  Database,
  Cpu,
  Layers,
};

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: "Production Engineering Over Demos",
    desc: "Building reliable, tested AI applications rather than fragile prototypes.",
  },
  {
    icon: Zap,
    title: "Grounded Knowledge Retrieval",
    desc: "Strict vector indexing and domain validation to eliminate hallucination.",
  },
  {
    icon: Sliders,
    title: "Human-in-the-Loop Oversight",
    desc: "Strategic review checkpoints before high-stakes actions or automated dispatches.",
  },
  {
    icon: Server,
    title: "Cross-Platform Orchestration",
    desc: "Seamless integration across APIs, databases, Zoho ecosystem, and cloud services.",
  },
];

export const Skills = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories =
    activeTab === "all"
      ? SKILLS_CATEGORIES
      : SKILLS_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    /* Full-bleed forest inset — deep green bg like the reference */
    <section
      id="skills"
      className="relative py-28 sm:py-36 bg-[#14261F] overflow-hidden"
      data-testid="skills-section"
    >
      {/* Subtle tint glow */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-[#1F4D40]/30 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 rounded-full bg-[#FF5A2B]/[0.04] blur-[150px] pointer-events-none" />
      {/* Numeral watermark in dark tint */}
      <div className="absolute -top-12 -left-4 font-display font-extrabold text-[#1F3D32] select-none pointer-events-none"
        style={{ fontSize: "clamp(100px, 15vw, 200px)", lineHeight: 0.85, letterSpacing: "-0.06em" }}>
        03
      </div>

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono2 text-[10px] font-semibold tracking-widest text-[#FF5A2B] uppercase">03 / SKILLS & CAPABILITIES</span>
          <div className="h-px flex-1 bg-white/20" />
          <span className="font-mono2 text-[9px] text-[#BCEDDB] uppercase hidden sm:block">SYSTEM SPEC: FULL STACK ARSENAL</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <p className="font-mono2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#FF5A2B] mb-4" data-testid="skills-eyebrow">
                03 — Skills & Capabilities
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.08]" data-testid="skills-heading">
                Engineering arsenal & AI stack.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-normal">
                Hands-on production proficiency across multi-agent consensus protocols, hybrid vector retrieval, and distributed backend infrastructure.
              </p>
            </Reveal>
          </div>

          {/* Domain Filter — square buttons */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2" data-testid="skills-filter-pills">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-[4px] px-4 py-2 font-mono2 text-[10px] tracking-wide transition-all font-semibold ${
                  activeTab === "all"
                    ? "bg-[#FF5A2B] text-white shadow-sm"
                    : "border border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
                }`}
              >
                All Domains
              </button>
              {SKILLS_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  className={`rounded-[4px] px-4 py-2 font-mono2 text-[10px] tracking-wide transition-all ${
                    activeTab === c.id
                      ? "bg-[#FF5A2B] text-white font-semibold shadow-sm"
                      : "border border-white/20 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {c.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Skill Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-14">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat, idx) => {
              const Icon = DOMAIN_ICONS[cat.icon] || Bot;
              return (
                <motion.div
                  key={cat.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="rounded-[6px] border border-white/10 bg-white/5 p-5 sm:p-6 flex flex-col justify-between hover:border-[#FF5A2B]/30 transition-all duration-300"
                  data-testid={`skill-domain-${cat.id}`}
                >
                  {/* Domain Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-[4px] bg-[#FF5A2B]/15 border border-[#FF5A2B]/25 flex items-center justify-center text-[#FF5A2B] shrink-0">
                        <Icon size={17} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg sm:text-xl font-semibold text-white">{cat.title}</h3>
                        <p className="font-mono2 text-[10px] text-white/50 mt-0.5">{cat.tagline}</p>
                      </div>
                    </div>
                    <span className="font-mono2 text-[9px] px-2 py-0.5 border border-[#BCEDDB]/60 text-[#BCEDDB] rounded-[2px] uppercase">
                      EXPERT
                    </span>
                  </div>

                  {/* Skill List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.skills.map((s) => (
                      <div
                        key={s.name}
                        className="group relative rounded-[4px] border border-white/10 bg-white/5 p-2.5 sm:p-3 hover:border-[#FF5A2B]/30 hover:bg-white/8 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                          <span className="font-display font-medium text-xs sm:text-[13px] text-white/90 group-hover:text-white transition-colors">
                            {s.name}
                          </span>
                          <span
                            className={`font-mono2 text-[9px] tracking-wider px-1.5 py-0.5 rounded-[2px] uppercase shrink-0 ${
                              s.level === "Expert"
                                ? "bg-[#BCEDDB]/15 text-[#BCEDDB] border border-[#BCEDDB]/30"
                                : "bg-white/[0.04] text-white/50 border border-white/10"
                            }`}
                          >
                            [ACTIVE]
                          </span>
                        </div>
                        <p className="font-mono2 text-[10px] sm:text-[10.5px] text-white/40 leading-snug">
                          {s.highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Architectural Principles Banner */}
        <Reveal delay={0.25}>
          <div className="border-t border-white/15 pt-10">
            <div className="font-mono2 text-[9px] text-white/40 uppercase tracking-widest mb-6">ENGINEERING DIRECTIVES</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PRINCIPLES.map((pr, i) => {
                const Icon = pr.icon;
                return (
                  <div key={pr.title} className="p-4 bg-white/5 border border-white/10 rounded-[4px] space-y-2">
                    <div className="font-mono2 text-[9px] text-[#FF5A2B]">PRINCIPLE 0{i + 1}</div>
                    <h4 className="font-display font-semibold text-sm text-white">{pr.title}</h4>
                    <p className="text-xs text-white/50 leading-relaxed">{pr.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
