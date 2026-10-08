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
    <span className="font-mono2 text-xs sm:text-sm text-[#A1A7B3] tabular-nums" data-testid="footer-clock">
      {now.toISOString().slice(11, 19)} UTC
    </span>
  );
};

export const Footer = () => (
  <footer className="relative border-t border-[#262B33] overflow-hidden bg-[#0D0F12]" data-testid="footer">
    <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 pt-10 sm:pt-12 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={34} />
            <p className="font-display font-semibold text-base sm:text-lg text-[#F2F4F7]">{PROFILE.name}</p>
          </div>
          <p className="mt-2.5 max-w-lg text-sm sm:text-[15px] text-[#A1A7B3] leading-relaxed">
            {PROFILE.role}. {PROFILE.tagline}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3" data-testid="footer-socials">
            {PROFILE.socials.map((s) => (
              <a
                key={s.label}
                data-testid={`social-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-1 py-1 font-mono2 text-sm sm:text-[15px] tracking-wider uppercase text-[#A1A7B3] hover:text-[#F2F4F7] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{s.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7C8CFF] rounded-full transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(124,140,255,0.6)]" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <UtcClock />
            <button
              data-testid="scroll-top-btn"
              onClick={() => window.__lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full border border-[#262B33] px-4 py-1.5 font-mono2 text-xs tracking-widest uppercase text-[#A1A7B3] hover:border-[#7C8CFF]/60 hover:text-[#7C8CFF] hover:bg-[#7C8CFF]/5 transition-all"
              aria-label="Scroll to top"
            >
              Top <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#262B33] flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="font-mono2 text-xs sm:text-[13px] text-[#A1A7B3]">
          © {new Date().getFullYear()} {PROFILE.name}. All systems operational.
        </p>
        <p className="font-mono2 text-xs sm:text-[13px] text-[#6B7280]">designed & engineered with intent</p>
      </div>
    </div>

    <div className="pointer-events-none select-none overflow-hidden -mb-2 sm:-mb-3 opacity-25" aria-hidden="true">
      <p className="text-stroke font-display font-semibold text-center whitespace-nowrap leading-none text-[7vw] tracking-tight">
        AASHAY SONI
      </p>
    </div>
  </footer>
);
