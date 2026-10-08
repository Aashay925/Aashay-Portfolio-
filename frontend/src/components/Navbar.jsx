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
  <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
    <rect width="64" height="64" rx="14" fill="#14171C" stroke="#262B33" />
    <path d="M19 47 L32 17 L45 47" stroke="#7C8CFF" strokeWidth="4.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="25" y1="36" x2="39" y2="36" stroke="#F2F4F7" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="32" cy="17" r="4.5" fill="#7C8CFF" />
  </svg>
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
    <header className="fixed top-0 inset-x-0 z-50 border-b border-[#262B33] bg-[#0D0F12]/80 backdrop-blur-xl">
      <nav className="w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 h-16 sm:h-20 flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => window.__lenis?.scrollTo(0) ?? window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
          aria-label="Back to top"
        >
          <LogoMark size={36} />
          <span className="font-display font-semibold tracking-tight text-base sm:text-lg text-[#F2F4F7] group-hover:text-[#7C8CFF] transition-colors">
            {PROFILE.name}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-${l.label.toLowerCase()}-link`}
              onClick={() => scrollTo(l.href)}
              className="font-mono2 text-xs tracking-[0.18em] uppercase text-[#6B7280] hover:text-[#F2F4F7] transition-colors font-medium"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-contact-btn"
            onClick={() => scrollTo("#contact")}
            className="rounded-full bg-[#7C8CFF] px-6 py-2.5 text-sm font-semibold tracking-wide text-[#0D0F12] hover:bg-[#A5AEFF] hover:text-[#0D0F12] transition-colors shadow-sm"
          >
            Initiate Contact
          </button>
        </div>

        <button
          data-testid="nav-mobile-toggle"
          className="md:hidden text-[#F2F4F7] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-[#262B33] bg-[#0D0F12]/95 backdrop-blur-xl"
            data-testid="nav-mobile-menu"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {LINKS.map((l) => (
                <button
                  key={l.href}
                  data-testid={`nav-mobile-${l.label.toLowerCase()}-link`}
                  onClick={() => { setOpen(false); scrollTo(l.href); }}
                  className="text-left font-display text-2xl font-semibold text-[#F2F4F7] hover:text-[#7C8CFF] transition-colors"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
