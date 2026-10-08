import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { PROJECTS } from "../data/content";

export const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section id="projects" className="relative py-28 sm:py-36 overflow-hidden" data-testid="projects-section">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[#7C8CFF]/[0.05] blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-full bg-[#7C8CFF]/[0.03] blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7C8CFF] mb-4" data-testid="projects-eyebrow">
                02 — Featured Projects
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-semibold tracking-tight text-[#F2F4F7] leading-[1.08]" data-testid="projects-heading">
                Architectures that ship to production.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-base sm:text-lg text-[#A1A7B3] leading-relaxed max-w-2xl font-normal">
                Real-world autonomous systems designed to eliminate model hallucinations, enforce deterministic validation, and coordinate multi-agent consensus.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-2 border border-[#262B33] bg-[#14171C]/80 rounded-full px-4 py-2 font-mono2 text-xs text-[#A1A7B3]">
              <span className="h-2 w-2 rounded-full bg-[#65C18C] animate-pulse" />
              <span>4 PRODUCTION ARCHITECTURES VERIFIED</span>
            </div>
          </Reveal>
        </div>

        {/* 2x2 Bento Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={0.1 + i * 0.1} className="h-full">
              <div
                data-testid={`project-card-${p.id}`}
                className="spotlight-card group relative h-full rounded-2xl border border-[#262B33] bg-[#14171C]/90 backdrop-blur p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#7C8CFF]/50 hover:shadow-[0_0_50px_rgba(124,140,255,0.06)]"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div>
                  {/* Top Bar: Index, Badge & Links */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono2 text-xs font-semibold text-[#7C8CFF]">{p.index}</span>
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      <span className="font-mono2 text-[11px] tracking-wider uppercase text-[#7C8CFF] bg-[#7C8CFF]/10 border border-[#7C8CFF]/20 rounded-full px-3 py-1">
                        {p.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-9 w-9 rounded-full border border-[#262B33] bg-[#191D23] flex items-center justify-center text-[#A1A7B3] hover:text-[#F2F4F7] hover:border-[#7C8CFF]/50 hover:bg-[#7C8CFF]/10 transition-all"
                        aria-label={`View ${p.title} source`}
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-9 w-9 rounded-full border border-[#262B33] bg-[#191D23] flex items-center justify-center text-[#A1A7B3] hover:text-[#7C8CFF] hover:border-[#7C8CFF]/50 hover:bg-[#7C8CFF]/10 transition-all"
                        aria-label={`Open ${p.title} live demo`}
                      >
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F2F4F7] group-hover:text-[#7C8CFF] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-mono2 text-xs sm:text-sm text-[#A1A7B3] tracking-wide">
                    {p.subtitle}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-[#A1A7B3] leading-relaxed">
                    {p.description}
                  </p>

                  {/* High-Impact Metrics Strip */}
                  <div className="mt-6 grid grid-cols-3 gap-3 p-4 rounded-xl border border-[#262B33] bg-[#0D0F12]">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="font-display text-xl sm:text-2xl font-semibold text-[#F2F4F7] group-hover:text-[#7C8CFF] transition-colors">
                          {m.value}
                        </p>
                        <p className="mt-1 font-mono2 text-[10px] sm:text-[11px] tracking-wider uppercase text-[#6B7280]">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Architectural Highlights */}
                  <div className="mt-6 space-y-2">
                    <p className="font-mono2 text-[11px] tracking-wider uppercase text-[#6B7280] mb-2">Key Highlights</p>
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs sm:text-sm text-[#A1A7B3]">
                        <CheckCircle2 size={14} className="text-[#65C18C] shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-8 pt-6 border-t border-[#262B33] flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[#262B33] bg-[#191D23] px-3 py-1 font-mono2 text-[11px] text-[#A1A7B3] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
