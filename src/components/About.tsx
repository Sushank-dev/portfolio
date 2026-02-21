import { motion } from "framer-motion";
import { Download, User } from "lucide-react";
import { personalInfo } from "../data/socialLinks";
import { fadeInUp, staggerContainer } from "../utils/animations";
import SectionWrapper from "./SectionWrapper";
import SplitText from "./SplitText";

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section label */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-foreground-dark-muted">
              About
            </span>
          </motion.div>
        </motion.div>

        <div className="grid items-start gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <SplitText
              text="Passionate about crafting digital experiences that matter."
              className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.01em]"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 max-w-xl text-[15px] leading-[1.85] text-foreground-dark-muted"
            >
              I'm {personalInfo.name}, a {personalInfo.role} who thrives at the
              intersection of clean code, thoughtful design, and meaningful
              interactions. With expertise spanning React, Three.js, and the
              modern web ecosystem, I transform complex ideas into seamless user
              experiences.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-5 max-w-xl text-[15px] leading-[1.85] text-foreground-dark-muted"
            >
              Every project is an opportunity to push boundaries and create
              something memorable — where performance meets artistry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-10"
            >
              <a
                href={personalInfo.resumePath}
                download
                className="group inline-flex items-center gap-3 border-b border-foreground-dark-muted/20 pb-2 text-[12px] font-medium uppercase tracking-[0.18em] text-foreground-dark-muted transition-all hover:border-accent hover:text-accent"
              >
                <Download size={14} className="transition-transform group-hover:-translate-y-0.5" />
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-foreground-dark-muted/10 bg-surface-dark-elevated">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-foreground-dark-muted/15 bg-surface-dark-card">
                    <User size={32} className="text-accent/60" />
                  </div>
                  <p className="text-sm text-foreground-dark-muted/60">Your Photo</p>
                </div>
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-secondary to-transparent" />
            </div>

            <motion.div
              className="absolute -right-3 -top-3 h-14 w-14 rounded-full border border-accent/15"
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
