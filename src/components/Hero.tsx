import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP scroll parallax — content moves up and fades as you scroll
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current || !contentRef.current) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });

        tl.to(contentRef.current, {
          y: -120,
          opacity: 0.2,
          scale: 0.95,
          ease: "none",
        });

        cleanup = () => {
          tl.kill();
          ScrollTrigger.getAll().forEach((st: { kill: () => void }) => st.kill());
        };
      } catch {
        // GSAP not available, skip parallax
      }
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 h-px w-12 origin-left bg-fg-faint"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-fg-muted"
          >
            Software Developer — India
          </motion.p>

          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] tracking-[-0.02em]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="block text-fg"
              >
                Thatipelly
              </motion.span>
            </span>
            <span className="mt-1 block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="block italic text-accent"
              >
                Sushank
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-lg text-[15px] leading-[1.8] text-fg-muted"
          >
            I craft interactive, performant web experiences at the intersection of
            design and engineering — turning ideas into immersive digital realities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-accent px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-surface transition-shadow hover:shadow-glow"
            >
              <span className="relative z-10">Selected Work</span>
            </a>
            <a
              href="#contact"
              className="text-[12px] font-medium uppercase tracking-[0.18em] text-fg-muted underline decoration-fg-faint underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
            >
              Get in touch →
            </a>
          </motion.div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
