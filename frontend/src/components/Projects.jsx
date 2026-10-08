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
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-[#E06D3B]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-48 w-96 h-96 rounded-full bg-[#38BDF8]/5 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div>
            <Reveal>
              <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#E06D3B] mb-4" data-testid="projects-eyebrow">
                02 — Featured Projects
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#F4F5F8] leading-[1.08]" data-testid="projects-heading">
                Architectures that ship to production.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
                Real-world autonomous systems designed to eliminate model hallucinations, enforce deterministic validation, and coordinate multi-agent consensus.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-2 border border-white/10 bg-[#12141D]/80 rounded-full px-4 py-2 font-mono2 text-xs text-[#94A3B8]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
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
                className="spotlight-card group relative h-full rounded-2xl border border-white/10 bg-[#12141D]/90 backdrop-blur p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#E06D3B]/50 hover:shadow-[0_0_60px_rgba(224,109,59,0.12)]"
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
                      <span className="font-mono2 text-xs font-bold text-[#E06D3B]">{p.index}</span>
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      <span className="font-mono2 text-[11px] tracking-wider uppercase text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 rounded-full px-3 py-1">
                        {p.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-9 w-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#94A3B8] hover:text-[#F4F5F8] hover:border-[#E06D3B]/50 hover:bg-[#E06D3B]/10 transition-all"
                        aria-label={`View ${p.title} source`}
                      >
                        <Github size={16} />
                      </a>
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-9 w-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-[#94A3B8] hover:text-[#E06D3B] hover:border-[#E06D3B]/50 hover:bg-[#E06D3B]/10 transition-all"
                        aria-label={`Open ${p.title} live demo`}
                      >
                        <ArrowUpRight size={17} />
                      </a>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4F5F8] group-hover:text-[#E06D3B] transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2 font-mono2 text-xs sm:text-sm text-[#38BDF8] tracking-wide">
                    {p.subtitle}
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    {p.description}
                  </p>

                  {/* High-Impact Metrics Strip */}
                  <div className="mt-6 grid grid-cols-3 gap-3 p-4 rounded-xl border border-white/5 bg-[#090A0F]">
                    {p.metrics.map((m) => (
                      <div key={m.label} className="text-center">
                        <p className="font-display text-xl sm:text-2xl font-bold text-[#F4F5F8] group-hover:text-[#E06D3B] transition-colors">
                          {m.value}
                        </p>
                        <p className="mt-1 font-mono2 text-[10px] sm:text-[11px] tracking-wider uppercase text-[#64748B]">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Architectural Highlights */}
                  <div className="mt-6 space-y-2">
                    <p className="font-mono2 text-[11px] tracking-wider uppercase text-[#64748B] mb-2">Key Highlights</p>
                    {p.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8]">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/[0.02] px-3 py-1 font-mono2 text-[11px] text-[#94A3B8] group-hover:border-white/20 transition-colors"
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
