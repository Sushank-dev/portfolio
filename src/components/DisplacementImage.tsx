import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface DisplacementImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function DisplacementImage({
  src,
  alt,
  className = "",
}: DisplacementImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);
  const scale = useMotionValue(1);
  const brightness = useTransform(smoothX, [0, 0.5, 1], [0.95, 1, 1.05]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseEnter = () => {
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    scale.set(1);
  };

  const scaleSpring = useSpring(scale, { stiffness: 200, damping: 25 });

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 800,
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          filter: useTransform(brightness, (v) => `brightness(${v})`),
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
    </motion.div>
  );
}
