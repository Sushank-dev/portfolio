import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export default function Reveal({ id, children, className }: RevealProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
