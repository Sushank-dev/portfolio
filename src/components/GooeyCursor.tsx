import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect } from "react";

type GooeyCursorProps = {
  enabled: boolean;
};

export default function GooeyCursor({ enabled }: GooeyCursorProps) {
  const x = useMotionValue(50);
  const y = useMotionValue(50);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      const px = (event.clientX / window.innerWidth) * 100;
      const py = (event.clientY / window.innerHeight) * 100;
      x.set(px);
      y.set(py);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, x, y]);

  const hotspot = useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, rgba(22,224,217,0.28), rgba(255,122,24,0.12) 30%, transparent 58%)`;

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ backgroundImage: hotspot }}
      className="pointer-events-none fixed inset-0 z-0 hidden blur-2xl md:block"
    />
  );
}
