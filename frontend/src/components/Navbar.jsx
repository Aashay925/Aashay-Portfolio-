import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PROFILE } from "../data/content";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Vibe", href: "#vibe" },
  { label: "Contact", href: "#contact" },
];

export const LogoMark = ({ size = 34 }) => (
  <div
    style={{ width: size, height: size }}
    className="rounded-[4px] bg-[#14261F] text-white flex items-center justify-center font-mono2 font-semibold tracking-wider text-xs shrink-0"
    aria-hidden="true"
  >
    A
  </div>
);

const scrollTo = (href) => {
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#C8D1C3] bg-[#F2F5EE]/95 backdrop-blur-md">
      <nav className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 h-14 sm:h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <button
          data-testid="nav-logo"
          onClick={() => window.__lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          aria-label="Back to top"
        >
          <LogoMark size={28} />
          <div className="flex flex-col items-start">
            <span className="font-mono2 text-[10px] min-[380px]:text-[11px] font-semibold tracking-widest text-[#14261F] uppercase leading-tight">
              {PROFILE.name}
            </span>
            <span className="font-mono2 text-[8px] min-[380px]:text-[9px] text-[#52635B] uppercase tracking-wider leading-tight hidden min-[360px]:block">
              SYS.ENG // GENAI CORE
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-${l.label.toLowerCase()}-link`}
              onClick={() => scrollTo(l.href)}
              className="font-mono2 text-[10px] tracking-[0.18em] uppercase text-[#424845] hover:text-[#1F4D40] transition-colors font-medium"
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Available badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-[#FFFFFF] border border-[#C8D1C3] rounded-[4px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1F4D40] inline-block" />
            <span className="font-mono2 text-[9px] tracking-wider text-[#14261F] uppercase">
              AVAILABLE FOR PROJECTS
            </span>
          </div>

          <button
            data-testid="nav-contact-btn"
            onClick={() => scrollTo("#contact")}
            className="hidden sm:inline-flex rounded-[4px] bg-[#FF5A2B] px-3.5 sm:px-4 py-1.5 text-xs font-semibold tracking-normal text-white hover:bg-[#e0481b] active:bg-[#c4380f] transition-colors shadow-sm shrink-0"
          >
            Initiate Contact
          </button>

          <button
            data-testid="nav-mobile-toggle"
            className="md:hidden text-[#14261F] p-1.5 rounded-[4px] hover:bg-[#E4E8DF] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-[#C8D1C3] bg-[#F2F5EE]/98 backdrop-blur-xl"
            data-testid="nav-mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}-link`}
                  onClick={() => { setOpen(false); scrollTo(l.href); }}
                  className="text-left font-display text-xl font-semibold text-[#14261F] hover:text-[#FF5A2B] transition-colors py-1"
                >
                  {l.label}
                </button>
              ))}
              <div className="pt-2 border-t border-[#C8D1C3]">
                <button
                  onClick={() => { setOpen(false); scrollTo("#contact"); }}
                  className="w-full text-center rounded-[4px] bg-[#FF5A2B] py-2.5 text-xs font-semibold text-white uppercase tracking-wider"
                >
                  Initiate Contact
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
