import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { PROFILE } from "../data/content";
import { LogoMark } from "./Navbar";

const UtcClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="font-mono2 text-xs text-[#64748B] tabular-nums" data-testid="footer-clock">
      {now.toISOString().slice(11, 19)} UTC
    </span>
  );
};

export const Footer = () => (
  <footer className="relative border-t border-white/5 overflow-hidden" data-testid="footer">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={30} />
            <p className="font-display font-bold text-[#F4F5F8]">{PROFILE.name}</p>
          </div>
          <p className="mt-3 max-w-sm text-sm text-[#64748B] leading-relaxed">
            {PROFILE.role}. {PROFILE.tagline}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2" data-testid="footer-socials">
            {PROFILE.socials.map((s) => (
              <a
                key={s.label}
                data-testid={`social-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                href={s.href}
                className="font-mono2 text-xs tracking-wider uppercase text-[#94A3B8] hover:text-[#E06D3B] transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <UtcClock />
            <button
              data-testid="scroll-top-btn"
              onClick={() => window.__lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono2 text-[10px] tracking-widest uppercase text-[#94A3B8] hover:border-[#E06D3B]/60 hover:text-[#E06D3B] transition-colors"
              aria-label="Scroll to top"
            >
              Top <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3">
        <p className="font-mono2 text-[11px] text-[#64748B]">© {new Date().getFullYear()} {PROFILE.name}. All systems operational.</p>
        <p className="font-mono2 text-[11px] text-[#3d4658]">designed & engineered with intent</p>
      </div>
    </div>

    <div className="pointer-events-none select-none overflow-hidden -mb-6 sm:-mb-10" aria-hidden="true">
      <p className="text-stroke font-display font-extrabold text-center whitespace-nowrap leading-none text-[18vw] tracking-tight">
        AASHAY SONI
      </p>
    </div>
  </footer>
);
