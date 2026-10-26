import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState("default"); // 'default' | 'pointer' | 'text' | 'card'
  const [isClicking, setIsClicking] = useState(false);

  // Exact 1:1 mouse coordinates (zero lag for center focal point)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth spring physics for outer targeting reticle
  const springConfig = { damping: 26, stiffness: 320, mass: 0.45 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Detect element under cursor
      const target = e.target;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer");
      const card = target.closest(".spotlight-card, [data-testid*='card']");
      const isInput = target.closest("input, textarea");

      if (isInput) {
        setCursorType("text");
      } else if (interactive) {
        setCursorType("pointer");
      } else if (card) {
        setCursorType("card");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("pointermove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, rawX, rawY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* 1. Outer Engineering Reticle / Corner Brackets (Smooth follow) */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <motion.div
          animate={{
            width: cursorType === "pointer" ? 44 : cursorType === "card" ? 38 : cursorType === "text" ? 18 : 28,
            height: cursorType === "pointer" ? 44 : cursorType === "card" ? 38 : cursorType === "text" ? 30 : 28,
            rotate: cursorType === "pointer" ? 45 : cursorType === "card" ? 90 : 0,
            scale: isClicking ? 0.78 : 1,
          }}
          transition={{ type: "spring", damping: 20, stiffness: 350 }}
          className="relative flex items-center justify-center"
        >
          {cursorType !== "text" ? (
            <>
              {/* Corner 1: Top-Left */}
              <span
                className={`absolute top-0 left-0 w-2 h-2 border-t-[1.5px] border-l-[1.5px] transition-colors duration-200 ${
                  cursorType === "pointer"
                    ? "border-[#FF5A2B]"
                    : cursorType === "card"
                    ? "border-[#1F4D40]"
                    : "border-[#14261F]/60"
                }`}
              />
              {/* Corner 2: Top-Right */}
              <span
                className={`absolute top-0 right-0 w-2 h-2 border-t-[1.5px] border-r-[1.5px] transition-colors duration-200 ${
                  cursorType === "pointer"
                    ? "border-[#FF5A2B]"
                    : cursorType === "card"
                    ? "border-[#1F4D40]"
                    : "border-[#14261F]/60"
                }`}
              />
              {/* Corner 3: Bottom-Left */}
              <span
                className={`absolute bottom-0 left-0 w-2 h-2 border-b-[1.5px] border-l-[1.5px] transition-colors duration-200 ${
                  cursorType === "pointer"
                    ? "border-[#FF5A2B]"
                    : cursorType === "card"
                    ? "border-[#1F4D40]"
                    : "border-[#14261F]/60"
                }`}
              />
              {/* Corner 4: Bottom-Right */}
              <span
                className={`absolute bottom-0 right-0 w-2 h-2 border-b-[1.5px] border-r-[1.5px] transition-colors duration-200 ${
                  cursorType === "pointer"
                    ? "border-[#FF5A2B]"
                    : cursorType === "card"
                    ? "border-[#1F4D40]"
                    : "border-[#14261F]/60"
                }`}
              />

              {/* Hover crosshair micro-lines */}
              {cursorType === "pointer" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF5A2B]/30 animate-ping" />
                </motion.div>
              )}
            </>
          ) : (
            /* Text cursor indicator: technical I-beam bracket */
            <div className="flex flex-col items-center justify-between h-full">
              <span className="w-2.5 h-[1.5px] bg-[#FF5A2B]" />
              <span className="w-[1.5px] h-full bg-[#FF5A2B]" />
              <span className="w-2.5 h-[1.5px] bg-[#FF5A2B]" />
            </div>
          )}
        </motion.div>

        {/* Subtle dynamic technical mode pill on interactive target */}
        {cursorType === "pointer" && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono2 text-[8px] font-bold tracking-widest text-white uppercase bg-[#FF5A2B] px-1.5 py-0.5 rounded-[2px] whitespace-nowrap shadow-sm pointer-events-none"
          >
            ACTIVATE
          </motion.span>
        )}

        {cursorType === "card" && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono2 text-[8px] font-semibold tracking-wider text-[#1F4D40] uppercase bg-[#BCEDDB] px-1.5 py-0.5 rounded-[2px] whitespace-nowrap shadow-sm pointer-events-none"
          >
            INSPECT
          </motion.span>
        )}
      </motion.div>

      {/* 2. Precision Center Focal Cross (Instant 1:1 sync with mouse) */}
      <motion.div
        style={{
          x: rawX,
          y: rawY,
        }}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.6 : 1,
            backgroundColor: cursorType === "pointer" ? "#FF5A2B" : "#14261F",
          }}
          transition={{ duration: 0.12 }}
          className="w-1.5 h-1.5 rotate-45 rounded-[0.5px] shadow-[0_0_6px_rgba(255,90,43,0.3)]"
        />
      </motion.div>
    </div>
  );
};
