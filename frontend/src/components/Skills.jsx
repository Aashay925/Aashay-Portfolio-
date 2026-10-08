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
    title: "Determinism Over Vibes",
    desc: "Rigorous automated evals run before any prompt or agent reaches staging.",
  },
  {
    icon: Zap,
    title: "Zero Tool Hallucination",
    desc: "Strict Pydantic schemas and sandbox verification on every tool call.",
  },
  {
    icon: Sliders,
    title: "Resilient Agent Sagas",
    desc: "Durable workflow orchestration for long-running multi-step agents.",
  },
  {
    icon: Server,
    title: "Cost & Tier Routing",
    desc: "Intelligent dynamic routing across frontier, fast, and local models.",
  },
];

export const Skills = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories =
    activeTab === "all"
      ? SKILLS_CATEGORIES
      : SKILLS_CATEGORIES.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="relative py-28 sm:py-36 bg-[#0D0F12] overflow-hidden" data-testid="skills-section">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-[#7C8CFF]/[0.05] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 rounded-full bg-[#7C8CFF]/[0.03] blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7C8CFF] mb-4" data-testid="skills-eyebrow">
                03 — Skills & Capabilities
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-[#F2F4F7] leading-[1.08]" data-testid="skills-heading">
                Engineering arsenal & AI stack.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-base sm:text-lg text-[#A1A7B3] leading-relaxed max-w-2xl font-normal">
                Hands-on production proficiency across multi-agent consensus protocols, hybrid vector retrieval, and distributed backend infrastructure.
              </p>
            </Reveal>
          </div>

          {/* Domain Filter Pills */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2" data-testid="skills-filter-pills">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-full px-5 py-2 font-mono2 text-xs tracking-wide transition-all ${
                  activeTab === "all"
                    ? "bg-[#7C8CFF] text-[#0D0F12] font-semibold shadow-[0_0_20px_rgba(124,140,255,0.25)]"
                    : "border border-[#262B33] bg-[#191D23] text-[#A1A7B3] hover:border-[#7C8CFF]/50 hover:text-[#F2F4F7]"
                }`}
              >
                All Domains
              </button>
              {SKILLS_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  className={`rounded-full px-5 py-2 font-mono2 text-xs tracking-wide transition-all ${
                    activeTab === c.id
                      ? "bg-[#7C8CFF] text-[#0D0F12] font-semibold shadow-[0_0_20px_rgba(124,140,255,0.25)]"
                      : "border border-[#262B33] bg-[#191D23] text-[#A1A7B3] hover:border-[#7C8CFF]/50 hover:text-[#F2F4F7]"
                  }`}
                >
                  {c.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                  className="rounded-2xl border border-[#262B33] bg-[#14171C]/90 backdrop-blur p-8 sm:p-9 flex flex-col justify-between hover:border-[#7C8CFF]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,140,255,0.06)]"
                  data-testid={`skill-domain-${cat.id}`}
                >
                  <div>
                    {/* Domain Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-[#262B33] mb-6">
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-xl bg-[#7C8CFF]/10 border border-[#7C8CFF]/20 flex items-center justify-center text-[#7C8CFF]">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#F2F4F7]">
                            {cat.title}
                          </h3>
                          <p className="font-mono2 text-xs text-[#6B7280] mt-0.5">
                            {cat.tagline}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Skill List with Level Badges & Real-World Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {cat.skills.map((s) => (
                        <div
                          key={s.name}
                          className="group relative rounded-xl border border-[#262B33] bg-[#0D0F12] p-3.5 hover:border-[#7C8CFF]/30 hover:bg-[#191D23] transition-all"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-display font-medium text-sm text-[#F2F4F7] group-hover:text-[#7C8CFF] transition-colors">
                              {s.name}
                            </span>
                            <span
                              className={`font-mono2 text-[10px] tracking-wider px-2 py-0.5 rounded-full uppercase ${
                                s.level === "Expert"
                                  ? "bg-[#7C8CFF]/15 text-[#7C8CFF] border border-[#7C8CFF]/30"
                                  : "bg-white/[0.04] text-[#A1A7B3] border border-[#262B33]"
                              }`}
                            >
                              {s.level}
                            </span>
                          </div>
                          <p className="font-mono2 text-[11px] text-[#6B7280] leading-tight">
                            {s.highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Architectural Principles Banner */}
        <Reveal delay={0.25}>
          <div className="rounded-2xl border border-[#262B33] bg-[#14171C]/60 backdrop-blur p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-2 w-2 rounded-full bg-[#7C8CFF]" />
              <p className="font-mono2 text-xs tracking-[0.25em] uppercase text-[#A1A7B3]">
                Architectural Core Principles
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRINCIPLES.map((pr) => {
                const Icon = pr.icon;
                return (
                  <div key={pr.title} className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-[#7C8CFF]">
                      <Icon size={18} />
                      <h4 className="font-display font-semibold text-base text-[#F2F4F7]">
                        {pr.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A1A7B3] leading-relaxed">
                      {pr.desc}
                    </p>
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
