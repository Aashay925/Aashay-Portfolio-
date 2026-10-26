import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { PROFILE, HERO_STREAM } from "../data/content";
import { AgentWorkflowGraph } from "./AgentWorkflowGraph";

/* Lightweight node mesh — sage/forest palette */
const NodeMesh = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf, w, h;
    const N = 38;
    let nodes = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    nodes = Array.from({ length: N }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
      r: Math.random() * 1.4 + 0.5,
      accent: Math.random() > 0.82,
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
            ctx.strokeStyle = `rgba(31,77,64,${0.07 * (1 - d / (w * 0.09))})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.accent ? "rgba(255,90,43,0.45)" : "rgba(31,77,64,0.2)";
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
      className="inline-flex items-center gap-2.5 sm:gap-3 rounded-full border border-[#C8D1C3] bg-[#E4E8DF] px-3.5 sm:px-4 py-1.5 sm:py-2 shadow-sm max-w-full"
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="pulse-dot-accent absolute inline-flex h-full w-full rounded-full bg-[#FF5A2B]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5A2B]" />
      </span>
      <span className="font-mono2 text-[11px] sm:text-sm text-[#14261F] tracking-wide truncate">
        {HERO_STREAM[line]?.slice(0, chars)}
        <span className="caret-blink text-[#FF5A2B]">▍</span>
      </span>
    </div>
  );
};

const MaskedLine = ({ children, delay, className = "", wrapperClassName = "" }) => (
  <span className={`block overflow-hidden ${wrapperClassName}`}>
    <motion.span
      className={`inline-block ${className}`}
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el && window.__lenis) window.__lenis.scrollTo(el, { offset: -70 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-start lg:justify-center pt-20 sm:pt-24 lg:pt-28 pb-16 overflow-x-hidden border-b border-[#C8D1C3]"
      data-testid="hero-section"
    >
      {/* atmosphere */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <NodeMesh />
        <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-[#1F4D40]/[0.04] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-[#FF5A2B]/[0.03] blur-[140px]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 xl:gap-14"
      >
        <div className="w-full lg:max-w-[580px] xl:max-w-[640px] shrink-0 space-y-5 sm:space-y-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
            <AgentStream />
          </motion.div>

          <h1 className="font-display tracking-tight text-[#14261F]" data-testid="hero-title">
            <div className="leading-[0.88] text-[2.5rem] min-[380px]:text-[2.9rem] sm:text-[4.2rem] lg:text-[5rem] xl:text-[5.5rem] font-bold uppercase tracking-[-0.04em]">
              <MaskedLine delay={0.2}>AASHAY</MaskedLine>
              <MaskedLine delay={0.3} className="text-[#52635B]">SONI</MaskedLine>
            </div>

            <div className="mt-3.5 sm:mt-4 space-y-1 text-base min-[380px]:text-lg sm:text-2xl lg:text-[1.6rem] font-semibold leading-tight tracking-tight">
              <MaskedLine delay={0.4} className="text-[#14261F]">
                Architecting <span className="text-[#FF5A2B]">Autonomous Systems</span>
              </MaskedLine>
              <MaskedLine delay={0.5} className="text-[#52635B] font-normal text-sm sm:text-lg lg:text-xl">
                and intelligent automation built for real impact.
              </MaskedLine>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="max-w-lg text-sm sm:text-base text-[#424845] leading-relaxed font-normal"
            data-testid="hero-tagline"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-1"
          >
            <button
              data-testid="hero-cta-explore"
              onClick={() => scrollTo("#work")}
              className="group inline-flex items-center gap-2 rounded-[4px] bg-[#FF5A2B] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white hover:bg-[#e0481b] active:bg-[#c4380f] transition-colors shadow-sm"
            >
              Explore Architecture
              <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              data-testid="hero-cta-contact"
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-2 rounded-[4px] border border-[#C8D1C3] bg-[#FFFFFF] px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-[#14261F] hover:bg-[#E4E8DF] transition-colors"
            >
              Initiate Contact
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              data-testid="hero-cta-resume"
              href={PROFILE.resumeUrl}
              className="group inline-flex items-center gap-1.5 font-mono2 text-[10px] tracking-[0.15em] uppercase text-[#52635B] hover:text-[#FF5A2B] transition-colors py-2"
            >
              <FileDown size={13} /> Resume.pdf
            </a>
          </motion.div>

          {/* Spec strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="pt-4 grid grid-cols-1 min-[380px]:grid-cols-3 gap-2 sm:gap-3 border-t border-[#C8D1C3]"
          >
            <div>
              <span className="font-mono2 text-[9px] text-[#52635B] block uppercase tracking-wider">SPECIALTY</span>
              <span className="font-mono2 text-[10px] text-[#14261F] font-semibold uppercase">AGENTIC RAG</span>
            </div>
            <div>
              <span className="font-mono2 text-[9px] text-[#52635B] block uppercase tracking-wider">ORCHESTRATION</span>
              <span className="font-mono2 text-[10px] text-[#14261F] font-semibold uppercase">LANGGRAPH</span>
            </div>
            <div>
              <span className="font-mono2 text-[9px] text-[#52635B] block uppercase tracking-wider">DEPLOY STATUS</span>
              <span className="font-mono2 text-[10px] text-[#1F4D40] font-semibold uppercase">PRODUCTION</span>
            </div>
          </motion.div>
        </div>

        {/* Interactive AI Agent Orchestration Workflow Node Graph */}
        <motion.div
          style={{ y: yCard }}
          className="w-full max-w-[540px] xl:max-w-[590px] shrink-0 mt-6 lg:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            <AgentWorkflowGraph />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden lg:flex flex-col items-center gap-2 absolute bottom-8 left-1/2 -translate-x-1/2 text-[#52635B]"
      >
        <span className="font-mono2 text-[9px] tracking-[0.35em] uppercase"></span>
        <div className="w-px h-8 bg-[#C8D1C3]" />
      </motion.div>
    </section>
  );
};
