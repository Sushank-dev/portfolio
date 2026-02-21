import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`${className} will-change-transform`}
      initial={{ opacity: 0, y: 40, clipPath: "inset(8% 0% 8% 0%)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" }
          : { opacity: 0, y: 40, clipPath: "inset(8% 0% 8% 0%)" }
      }
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
