import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function MagneticCursor() {
  const { theme } = useTheme();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onHoverStart = () => setIsHovering(true);
    const onHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const interactives = document.querySelectorAll("a, button, [data-magnetic]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onHoverStart);
      el.addEventListener("mouseleave", onHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onHoverStart);
        el.removeEventListener("mouseleave", onHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  const glowColor = theme === "dark"
    ? "rgba(212,98,43,0.04)"
    : "rgba(201,169,110,0.04)";

  const glow = useMotionTemplate`radial-gradient(600px circle at ${cursorX}px ${cursorY}px, ${glowColor}, transparent 50%)`;

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-50 hidden md:block"
        style={{ background: glow }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[100] hidden rounded-full mix-blend-difference md:block"
        style={{ x: cursorX, y: cursorY }}
        animate={{
          width: isHovering ? 56 : 28,
          height: isHovering ? 56 : 28,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
      >
        <div className="h-full w-full rounded-full border border-white/60 bg-white/5" />
      </motion.div>
    </>
  );
}
