import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
}

export default function Marquee({
  items,
  speed = 25,
  className = "",
  separator = "·",
}: MarqueeProps) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          x: { duration: speed, ease: "linear", repeat: Infinity },
        }}
      >
        {duplicated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint transition-colors hover:text-accent">
              {item}
            </span>
            {i < duplicated.length - 1 && (
              <span className="text-fg-faint/30">{separator}</span>
            )}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
