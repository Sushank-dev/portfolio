import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CursorFollower() {
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 });

  useEffect(() => {
    // Hide on mobile/touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const text = el.dataset.cursorText;
      if (text) {
        setLabel(text);
        setVisible(true);
      }
    };

    const onLeave = () => {
      setVisible(false);
    };

    window.addEventListener("mousemove", onMove);

    const observe = () => {
      document.querySelectorAll("[data-cursor-text]").forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };

    // Observe initially and on DOM changes
    observe();
    const observer = new MutationObserver(observe);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document.querySelectorAll("[data-cursor-text]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="pointer-events-none fixed z-[100] flex items-center justify-center"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-accent"
        animate={{
          width: visible ? 80 : 0,
          height: visible ? 80 : 0,
          opacity: visible ? 0.95 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <motion.span
          className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-surface-dark"
          animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.5 }}
          transition={{ delay: visible ? 0.05 : 0 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
