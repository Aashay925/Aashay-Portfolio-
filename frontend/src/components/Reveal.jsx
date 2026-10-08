import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ eyebrow, title, id }) => (
  <div className="mb-12 sm:mb-16">
    <Reveal>
      <p className="font-mono2 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#7C8CFF] mb-4" data-testid={`${id}-eyebrow`}>
        {eyebrow}
      </p>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F2F4F7] max-w-3xl leading-[1.1]" data-testid={`${id}-heading`}>
        {title}
      </h2>
    </Reveal>
  </div>
);
