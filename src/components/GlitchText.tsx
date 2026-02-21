import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function GlitchText({ text, className = "", delay = 0 }: GlitchTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      setIsGlitching(true);
      const end = setTimeout(() => setIsGlitching(false), 600);
      return () => clearTimeout(end);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, delay]);

  return (
    <motion.span
      ref={ref}
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <span
            className="glitch-layer-1 absolute left-0 top-0 z-20"
            aria-hidden
          >
            {text}
          </span>
          <span
            className="glitch-layer-2 absolute left-0 top-0 z-20"
            aria-hidden
          >
            {text}
          </span>
        </>
      )}
    </motion.span>
  );
}
