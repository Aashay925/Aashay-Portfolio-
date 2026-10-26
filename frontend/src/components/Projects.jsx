import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { PROJECTS } from "../data/content";

export const Projects = () => {
  return (
    <section id="projects" className="relative py-20 sm:py-32 lg:py-36 overflow-hidden bg-[#F7FBF1]" data-testid="projects-section">
      {/* Spec numeral */}
      <div className="spec-numeral absolute -top-16 -left-6 z-0">02</div>

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-8 sm:mb-12">
          <span className="font-mono2 text-[10px] font-semibold tracking-widest text-[#1F4D40] uppercase">02 / FEATURED PROJECTS</span>
          <div className="h-px flex-1 bg-[#C8D1C3]" />
          <span className="font-mono2 text-[9px] text-[#52635B] uppercase hidden sm:block">INDEX: ENTERPRISE AUTOMATION</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <Reveal>
              <p className="font-mono2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#FF5A2B] mb-3 sm:mb-4" data-testid="projects-eyebrow">
                02 — Featured Projects
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-2xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-tight text-[#14261F] leading-[1.1]" data-testid="projects-heading">
                Architectures that ship to production.
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-[#424845] leading-relaxed max-w-2xl font-normal">
                Production AI systems and real-world applications engineered to eliminate manual bottlenecks, replace expensive commercial SaaS, and automate business operations.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-2 border border-[#C8D1C3] bg-[#FFFFFF] rounded-[4px] px-3.5 py-2 font-mono2 text-[10px] text-[#14261F] self-start lg:self-auto">
              <span className="h-2 w-2 rounded-full bg-[#1F4D40] animate-pulse shrink-0" />
              <span>{PROJECTS.length} PRODUCTION DEPLOYMENTS VERIFIED</span>
            </div>
          </Reveal>
        </div>

        {/* Bento Showcase Grid — responsive cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.id}
              delay={0.08 + i * 0.06}
              className={`h-full ${i === PROJECTS.length - 1 && PROJECTS.length % 2 === 1 ? "lg:col-span-2" : ""}`}
            >
              <div
                data-testid={`project-card-${p.id}`}
                className="spotlight-card group relative h-full rounded-2xl border border-[#C8D1C3] bg-[#FFFFFF] p-5 sm:p-7 xl:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#FF5A2B]/50 hover:shadow-md"
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div>
                  {/* Top Bar: Index, Badge & Links */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono2 text-xs font-semibold text-[#FF5A2B]">{p.index}</span>
                      <span className="h-1 w-1 rounded-full bg-[#C8D1C3]" />
                      <span className="font-mono2 text-[10px] sm:text-[10.5px] tracking-wider uppercase text-[#480C00] bg-[#FFDBD1] border border-[#FF5A2B]/30 rounded-full px-2.5 py-0.5 font-semibold">
                        {p.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-8 w-8 rounded-full border border-[#C8D1C3] bg-[#E4E8DF] flex items-center justify-center text-[#52635B] hover:text-[#FF5A2B] hover:border-[#FF5A2B]/50 hover:bg-[#FFFFFF] transition-all"
                        aria-label={`View ${p.title} source`}
                      >
                        <Github size={14} />
                      </a>
                      <a
                        href={p.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="h-8 w-8 rounded-full border border-[#C8D1C3] bg-[#E4E8DF] flex items-center justify-center text-[#52635B] hover:text-[#FF5A2B] hover:border-[#FF5A2B]/50 hover:bg-[#FFFFFF] transition-all"
                        aria-label={`Open ${p.title} live demo`}
                      >
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display text-lg sm:text-2xl font-bold text-[#14261F] group-hover:text-[#FF5A2B] transition-colors tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono2 text-xs text-[#52635B] tracking-wide leading-relaxed">
                    {p.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-[#424845] leading-relaxed">
                    {p.description}
                  </p>

                  {/* High-Impact Metrics Strip — responsive mobile layout prevents text collision */}
                  <div className="mt-4 grid grid-cols-1 min-[480px]:grid-cols-3 gap-2 p-3 rounded-xl border border-[#C8D1C3] bg-[#F7FBF1] divide-y min-[480px]:divide-y-0 min-[480px]:divide-x divide-[#C8D1C3]/60">
                    {p.metrics.map((m, mi) => (
                      <div
                        key={m.label}
                        className="flex items-center justify-between min-[480px]:flex-col min-[480px]:justify-center text-left min-[480px]:text-center pt-2 min-[480px]:pt-0 first:pt-0 min-[480px]:px-2"
                      >
                        <p className={`font-display text-base sm:text-lg lg:text-xl font-bold tracking-tight ${mi === 0 ? "text-[#FF5A2B]" : "text-[#14261F]"} group-hover:text-[#FF5A2B] transition-colors`}>
                          {m.value}
                        </p>
                        <p className="font-mono2 text-[9px] sm:text-[10px] tracking-wider uppercase text-[#52635B]">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Architectural Highlights */}
                  <div className="mt-4 space-y-1.5">
                    <p className="font-mono2 text-[10px] tracking-wider uppercase text-[#52635B] mb-1 font-semibold">Key Highlights</p>
                    {p.features.map((f) => (
                      <div key={f} className="flex items-start gap-2 text-xs text-[#424845] leading-normal">
                        <CheckCircle2 size={13} className="text-[#1F4D40] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-5 pt-4 border-t border-[#C8D1C3] flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-[#C8D1C3] bg-[#E4E8DF] px-2.5 py-0.5 font-mono2 text-[10px] sm:text-[10.5px] text-[#14261F] transition-colors"
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
