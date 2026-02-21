import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  delay?: number;
  staggerSpeed?: number;
  once?: boolean;
}

export default function SplitText({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  staggerSpeed = 0.03,
  once = true,
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  // Split into words, preserving spaces
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block overflow-hidden">
          <span className="inline-flex">
            {word.split("").map((char, cIdx) => {
              const globalIdx =
                words.slice(0, wIdx).reduce((a, w) => a + w.length, 0) + cIdx;
              return (
                <motion.span
                  key={`${wIdx}-${cIdx}`}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={
                    isInView
                      ? { y: "0%", opacity: 1 }
                      : { y: "110%", opacity: 0 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: delay + globalIdx * staggerSpeed,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-hidden="true"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
          {wIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </Tag>
  );
}
