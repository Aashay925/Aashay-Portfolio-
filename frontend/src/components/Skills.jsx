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
    <section id="skills" className="relative py-28 sm:py-36 bg-[#0B0D14] overflow-hidden" data-testid="skills-section">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 rounded-full bg-[#E06D3B]/5 blur-[150px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <Reveal>
              <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#E06D3B] mb-4" data-testid="skills-eyebrow">
                03 — Skills & Capabilities
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#F4F5F8] leading-[1.08]" data-testid="skills-heading">
                Engineering arsenal & AI stack.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
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
                    ? "bg-[#E06D3B] text-[#0A0B10] font-bold shadow-[0_0_20px_rgba(224,109,59,0.3)]"
                    : "border border-white/10 bg-white/[0.02] text-[#94A3B8] hover:border-[#E06D3B]/50 hover:text-[#F4F5F8]"
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
                      ? "bg-[#E06D3B] text-[#0A0B10] font-bold shadow-[0_0_20px_rgba(224,109,59,0.3)]"
                      : "border border-white/10 bg-white/[0.02] text-[#94A3B8] hover:border-[#E06D3B]/50 hover:text-[#F4F5F8]"
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
                  className="rounded-2xl border border-white/10 bg-[#12141D]/90 backdrop-blur p-8 sm:p-9 flex flex-col justify-between hover:border-[#E06D3B]/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(224,109,59,0.08)]"
                  data-testid={`skill-domain-${cat.id}`}
                >
                  <div>
                    {/* Domain Header */}
                    <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 rounded-xl bg-[#E06D3B]/10 border border-[#E06D3B]/20 flex items-center justify-center text-[#E06D3B]">
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F5F8]">
                            {cat.title}
                          </h3>
                          <p className="font-mono2 text-xs text-[#64748B] mt-0.5">
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
                          className="group relative rounded-xl border border-white/5 bg-[#090A0F] p-3.5 hover:border-[#E06D3B]/30 hover:bg-[#141620] transition-all"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="font-display font-semibold text-sm text-[#F4F5F8] group-hover:text-[#E06D3B] transition-colors">
                              {s.name}
                            </span>
                            <span
                              className={`font-mono2 text-[10px] tracking-wider px-2 py-0.5 rounded-full uppercase ${
                                s.level === "Expert"
                                  ? "bg-[#E06D3B]/15 text-[#E06D3B] border border-[#E06D3B]/30"
                                  : "bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20"
                              }`}
                            >
                              {s.level}
                            </span>
                          </div>
                          <p className="font-mono2 text-[11px] text-[#64748B] leading-tight">
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
          <div className="rounded-2xl border border-white/10 bg-[#12141D]/60 backdrop-blur p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-2 w-2 rounded-full bg-[#E06D3B]" />
              <p className="font-mono2 text-xs tracking-[0.25em] uppercase text-[#94A3B8]">
                Architectural Core Principles
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRINCIPLES.map((pr) => {
                const Icon = pr.icon;
                return (
                  <div key={pr.title} className="space-y-2.5">
                    <div className="flex items-center gap-2.5 text-[#38BDF8]">
                      <Icon size={18} />
                      <h4 className="font-display font-bold text-base text-[#F4F5F8]">
                        {pr.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
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
