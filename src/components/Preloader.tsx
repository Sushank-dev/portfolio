import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type PreloaderProps = {
  loading?: boolean;
  progress?: number;
  onSkip?: () => void;
};

export default function Preloader({ loading, onSkip }: PreloaderProps) {
  const isControlled = typeof loading === "boolean";
  const [isLoading, setIsLoading] = useState(true);

  const visible = isControlled ? loading : isLoading;

  useEffect(() => {
    if (isControlled) return;

    const timer = setTimeout(() => setIsLoading(false), 3000);

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        onSkip?.();
        setIsLoading(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [isControlled, onSkip]);

  useEffect(() => {
    if (!isControlled || !visible) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "Enter") onSkip?.();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isControlled, onSkip, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-surface"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Breathing circle */}
          <motion.div
            className="relative mb-12 flex h-24 w-24 items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="absolute h-24 w-24 rounded-full border border-fg-faint/20"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="h-16 w-16 rounded-full border border-fg-faint/30"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div
              className="absolute h-2 w-2 rounded-full bg-accent"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-heading text-2xl tracking-[0.3em] text-fg">
              SUSHANK<span className="text-accent">.</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 font-mono text-[9px] uppercase tracking-[0.35em] text-fg-faint"
          >
            press space to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
