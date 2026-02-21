import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type PreloaderProps = {
  loading?: boolean;
  progress?: number;
  onSkip?: () => void;
};

function clampProgress(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export default function Preloader({ loading, progress = 0, onSkip }: PreloaderProps) {
  const isControlled = typeof loading === "boolean";
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackProgress, setFallbackProgress] = useState(0);

  const visible = isControlled ? loading : isLoading;
  const displayProgress = isControlled ? clampProgress(progress) : fallbackProgress;

  useEffect(() => {
    if (isControlled) return;

    const timer = setTimeout(() => setIsLoading(false), 2200);
    const progressTimer = setInterval(() => {
      setFallbackProgress((current) => {
        if (current >= 100) return 100;
        return current + 5;
      });
    }, 100);

    // Allow skip with Space or Enter
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        onSkip?.();
        setIsLoading(false);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [isControlled, onSkip]);

  useEffect(() => {
    if (!isControlled || !visible) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "Enter") {
        onSkip?.();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isControlled, onSkip, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-surface-dark"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span className="font-heading text-3xl tracking-[0.3em] text-foreground-dark">
                SUSHANK<span className="text-accent">.</span>
              </span>
            </motion.div>

            {/* Minimal loading bar */}
            <div className="mx-auto h-[1px] w-32 overflow-hidden bg-foreground-dark-muted/10">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${displayProgress}%` }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 font-mono text-[9px] uppercase tracking-[0.35em] text-foreground-dark-muted/30"
            >
              {displayProgress}% • press space to skip
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
