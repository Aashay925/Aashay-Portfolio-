import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { PROFILE, HERO_STREAM } from "../data/content";
import { AgentWorkflowGraph } from "./AgentWorkflowGraph";

/* Lightweight agent-signal node mesh */
const NodeMesh = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, w, h;
    const N = 42;
    let nodes = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    nodes = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
      r: Math.random() * 1.6 + 0.6,
      ember: Math.random() > 0.82,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > 1) n.vx *= -1;
        if (n.y < 0 || n.y > 1) n.vy *= -1;
      }
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = (a.x - b.x) * w, dy = (a.y - b.y) * h;
          const d = Math.hypot(dx, dy);
          if (d < w * 0.09) {
            ctx.strokeStyle = `rgba(148,163,184,${0.10 * (1 - d / (w * 0.09))})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.ember ? "rgba(224,109,59,0.85)" : "rgba(148,163,184,0.5)";
        ctx.beginPath();
        ctx.arc(n.x * w, n.y * h, n.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
};

/* Live simulated agent output stream */
const AgentStream = () => {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const current = HERO_STREAM[line];
    if (chars < current.length) {
      const t = setTimeout(() => setChars((c) => c + 1), 26);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setLine((l) => (l + 1) % HERO_STREAM.length); setChars(0); }, 1800);
    return () => clearTimeout(t);
  }, [chars, line]);

  return (
    <div
      data-testid="agent-stream-badge"
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#12141D]/80 backdrop-blur px-4 py-2"
    >
      <span className="relative flex h-2 w-2">
        <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#38BDF8]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#38BDF8]" />
      </span>
      <span className="font-mono2 text-xs sm:text-sm text-[#94A3B8]">
        {HERO_STREAM[line].slice(0, chars)}
        <span className="caret-blink text-[#E06D3B]">▍</span>
      </span>
    </div>
  );
};

const MaskedLine = ({ children, delay, className = "" }) => (
  <span className="block overflow-hidden pb-1" style={{ overflowClipMargin: "50px" }}>
    <motion.span
      className={`inline-block pr-8 sm:pr-10 lg:pr-12 ${className}`}
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const sectionRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16" data-testid="hero-section">
      {/* atmosphere */}
      <motion.div style={{ y: yBg }} className="absolute inset-0">
        <NodeMesh />
        <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-[#E06D3B]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-[#38BDF8]/[0.07] blur-[140px]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative w-full max-w-[1800px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col lg:flex-row items-center justify-between gap-8 xl:gap-12"
      >
        <div className="w-full lg:max-w-[580px] xl:max-w-[640px] shrink-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
            <AgentStream />
          </motion.div>

          <h1 className="mt-7 font-display font-extrabold tracking-tight leading-[0.98] text-[2.5rem] sm:text-[3.5rem] lg:text-[4.15rem] xl:text-[4.65rem] text-[#F4F5F8]" data-testid="hero-title">
            <MaskedLine delay={0.25}>AASHAY</MaskedLine>
            <MaskedLine delay={0.37} className="text-stroke">SONI</MaskedLine>
            <MaskedLine delay={0.49} className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold leading-[1.15] mt-5 text-[#94A3B8]">
              builds <span className="text-[#E06D3B]">agentic systems</span>
            </MaskedLine>
            <MaskedLine delay={0.58} className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold leading-[1.15] text-[#94A3B8]">
              that ship to production.
            </MaskedLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="mt-6 max-w-lg text-base sm:text-lg text-[#94A3B8] leading-relaxed"
            data-testid="hero-tagline"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-cta-explore"
              onClick={() => scrollTo("#work")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#E06D3B] px-7 py-3.5 text-sm font-semibold text-[#0A0B10] hover:bg-[#F4F5F8] hover:text-[#0A0B10] transition-colors"
            >
              Explore Architecture
              <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              data-testid="hero-cta-contact"
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-[#F4F5F8] hover:border-[#E06D3B] hover:text-[#E06D3B] transition-colors"
            >
              Initiate Contact
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              data-testid="hero-cta-resume"
              href={PROFILE.resumeUrl}
              className="group inline-flex items-center gap-2 font-mono2 text-xs tracking-[0.15em] uppercase text-[#64748B] hover:text-[#38BDF8] transition-colors"
            >
              <FileDown size={15} /> Resume.pdf
            </a>
          </motion.div>
        </div>

        {/* Interactive AI Agent Orchestration Workflow Node Graph (Side-by-side on the right) */}
        <motion.div
          style={{ y: yCard }}
          className="hidden lg:block w-full max-w-[540px] xl:max-w-[590px] shrink-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <AgentWorkflowGraph />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono2 text-[10px] tracking-[0.35em] uppercase text-[#64748B]"
      >
        scroll to descend
      </motion.div>
    </section>
  );
};
