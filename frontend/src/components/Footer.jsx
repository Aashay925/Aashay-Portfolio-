import { ArrowUp } from "lucide-react";
import { PROFILE } from "../data/content";
import { LogoMark } from "./Navbar";

export const Footer = () => (
  <footer className="relative border-t border-[#C8D1C3] overflow-hidden bg-[#E4E8DF]" data-testid="footer">
    <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 pt-10 sm:pt-12 pb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark size={28} />
            <div>
              <p className="font-display font-bold text-sm text-[#14261F]">{PROFILE.name}</p>
              <p className="font-mono2 text-[9px] text-[#52635B]">Generative AI & Automation Engineer · Designed & engineered with intent</p>
            </div>
          </div>
          <p className="mt-3 max-w-lg text-sm text-[#424845] leading-relaxed">
            {PROFILE.role}. {PROFILE.tagline}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-3.5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5" data-testid="footer-socials">
            {PROFILE.socials.map((s) => (
              <a
                key={s.label}
                data-testid={`social-${s.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center gap-1 py-1 font-mono2 text-xs tracking-wider uppercase text-[#424845] hover:text-[#14261F] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>{s.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FF5A2B] rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono2 text-[#52635B]">
            <a href={`mailto:${PROFILE.email}`} className="text-[#14261F] hover:text-[#FF5A2B] transition-colors font-medium">
              {PROFILE.email}
            </a>
            <span className="text-[#C8D1C3]">•</span>
            <a href={`tel:${PROFILE.phone}`} className="hover:text-[#FF5A2B] transition-colors">
              {PROFILE.phone}
            </a>
            <span className="text-[#C8D1C3]">•</span>
            <span>IST (UTC +5:30)</span>
          </div>

          <div className="flex items-center gap-5 pt-1">
            <button
              data-testid="scroll-top-btn"
              onClick={() => window.__lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-[4px] border border-[#C8D1C3] px-4 py-1.5 font-mono2 text-[10px] tracking-widest uppercase text-[#424845] hover:border-[#FF5A2B]/60 hover:text-[#FF5A2B] hover:bg-[#FF5A2B]/5 transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              Top <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t border-[#C8D1C3] flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="font-mono2 text-xs text-[#52635B]">
          © {new Date().getFullYear()} AASHAY SONI. ALL SYSTEMS OPERATIONAL. SPEC-MIL-STD-810H.
        </p>
        <p className="font-mono2 text-xs text-[#52635B]">GEO: JABALPUR, MP, INDIA // REMOTE</p>
      </div>
    </div>

    {/* Giant Bottom Wordmark */}
    <div className="pointer-events-none select-none overflow-hidden -mb-2 sm:-mb-3 text-center" aria-hidden="true">
      <p className="text-stroke font-display font-bold whitespace-nowrap leading-none text-[7vw] tracking-tight">
        AASHAY SONI
      </p>
    </div>
  </footer>
);
