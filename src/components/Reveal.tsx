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
      initial={{ opacity: 0, y: 40, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      {children}
    </motion.section>
  );
}
