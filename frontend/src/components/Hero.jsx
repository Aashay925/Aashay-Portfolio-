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
            ctx.strokeStyle = `rgba(161,167,179,${0.08 * (1 - d / (w * 0.09))})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.ember ? "rgba(124,140,255,0.75)" : "rgba(161,167,179,0.35)";
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
      className="inline-flex items-center gap-3 rounded-full border border-[#262B33] bg-[#14171C]/80 backdrop-blur px-4 py-2"
    >
      <span className="relative flex h-2 w-2">
        <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#7C8CFF]" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#7C8CFF]" />
      </span>
      <span className="font-mono2 text-xs sm:text-sm text-[#A1A7B3]">
        {HERO_STREAM[line].slice(0, chars)}
        <span className="caret-blink text-[#7C8CFF]">▍</span>
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
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-start lg:justify-center pt-24 sm:pt-28 lg:pt-32 pb-16 overflow-x-hidden" data-testid="hero-section">
      {/* atmosphere */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <NodeMesh />
        <div className="absolute -top-40 -left-40 w-[34rem] h-[34rem] rounded-full bg-[#7C8CFF]/[0.05] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] rounded-full bg-[#7C8CFF]/[0.03] blur-[140px]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative w-full max-w-[1800px] mx-auto px-5 sm:px-10 lg:px-14 xl:px-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 xl:gap-14"
      >
        <div className="w-full lg:max-w-[580px] xl:max-w-[640px] shrink-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}>
            <AgentStream />
          </motion.div>

          <h1 className="mt-5 sm:mt-6 font-display tracking-tight text-[#F2F4F7]" data-testid="hero-title">
            <div className="leading-[0.92] text-[2.4rem] sm:text-[3.5rem] lg:text-[4.15rem] xl:text-[4.65rem] font-semibold">
              <MaskedLine delay={0.2} className="pr-3 sm:pr-4">AASHAY</MaskedLine>
              <MaskedLine delay={0.3} className="pr-3 sm:pr-4 text-[#A1A7B3]">SONI</MaskedLine>
            </div>

            <div className="mt-3.5 flex flex-col gap-0.5 leading-tight text-lg sm:text-2xl lg:text-[1.85rem] font-medium">
              <MaskedLine delay={0.4} className="text-[#F2F4F7]">
                Architecting <span className="text-[#7C8CFF] font-semibold">Autonomous Systems</span>
              </MaskedLine>
              <MaskedLine delay={0.5} className="text-[#A1A7B3]">
                and intelligent automation built for real impact.
              </MaskedLine>
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-4 max-w-lg text-sm sm:text-base lg:text-lg text-[#A1A7B3] leading-relaxed font-normal"
            data-testid="hero-tagline"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4"
          >
            <button
              data-testid="hero-cta-explore"
              onClick={() => scrollTo("#work")}
              className="group inline-flex items-center gap-2 rounded-full bg-[#7C8CFF] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#0D0F12] hover:bg-[#A5AEFF] hover:text-[#0D0F12] transition-colors"
            >
              Explore Architecture
              <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </button>
            <button
              data-testid="hero-cta-contact"
              onClick={() => scrollTo("#contact")}
              className="group inline-flex items-center gap-2 rounded-full border border-[#303640] px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold text-[#F2F4F7] hover:border-[#7C8CFF] hover:text-[#7C8CFF] transition-colors"
            >
              Initiate Contact
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              data-testid="hero-cta-resume"
              href={PROFILE.resumeUrl}
              className="group inline-flex items-center gap-2 font-mono2 text-xs tracking-[0.15em] uppercase text-[#6B7280] hover:text-[#A5AEFF] transition-colors py-2"
            >
              <FileDown size={14} /> Resume.pdf
            </a>
          </motion.div>
        </div>

        {/* Interactive AI Agent Orchestration Workflow Node Graph (Visible on all devices, fully responsive) */}
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
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 font-mono2 text-[10px] tracking-[0.35em] uppercase text-[#6B7280]"
      >
        scroll to descend
      </motion.div>
    </section>
  );
};
