import { motion } from "framer-motion";
import { useState } from "react";
import GlitchText from "./GlitchText";
import NoiseBlob from "./NoiseBlob";
import ParticleBackground from "./ParticleBackground";
import ScrollIndicator from "./ScrollIndicator";
import TextScramble from "./TextScramble";
import TypewriterText from "./TypewriterText";

export default function Hero() {
  const [nameComplete, setNameComplete] = useState(false);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <ParticleBackground />
      <NoiseBlob />

      {/* Warm radial overlays */}
      <div className="absolute inset-0 -z-[5]">
        <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-accent/[0.04] blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-accent-secondary/[0.05] blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col items-start">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "3rem" }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="mb-8 h-px bg-accent"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-foreground-dark-muted"
          >
            <TextScramble text="Software Developer — India" trigger="view" speed={25} />
          </motion.p>

          {/* Name — large editorial */}
          <h1 className="font-display text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.9] tracking-[-0.02em]">
            <TypewriterText
              text="Thatipelly"
              className="block text-foreground-dark"
              speed={60}
              delay={2.0}
              onComplete={() => setNameComplete(true)}
            />
            {nameComplete && (
              <GlitchText
                text="Sushank"
                className="mt-1 block italic text-accent"
                delay={0.1}
              />
            )}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={nameComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-lg text-[15px] leading-[1.8] text-foreground-dark-muted"
          >
            I craft interactive, performant web experiences at the intersection of 
            design and engineering — turning ideas into immersive digital realities.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={nameComplete ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex items-center gap-6"
          >
            <a
              href="#projects"
              className="group relative overflow-hidden rounded-full bg-accent px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-surface-dark transition-shadow hover:shadow-glow"
              data-cursor-text="Explore"
            >
              <span className="relative z-10">Selected Work</span>
              <div className="absolute inset-0 -translate-x-full bg-accent-hover transition-transform duration-400 group-hover:translate-x-0" />
            </a>
            <a
              href="#contact"
              className="text-[12px] font-medium uppercase tracking-[0.18em] text-foreground-dark-muted underline decoration-foreground-dark-muted/30 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/40"
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
