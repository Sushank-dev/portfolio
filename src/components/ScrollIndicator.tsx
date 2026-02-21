import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute bottom-10 left-6 lg:left-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            opacity: { duration: 0.3 },
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <a
            href="#about"
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-foreground-dark-muted/50 transition-colors hover:text-accent"
            aria-label="Scroll down"
          >
            <ChevronDown size={14} />
            <span className="hidden sm:block">Scroll to explore</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
