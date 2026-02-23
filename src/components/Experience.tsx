import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experiences } from "../data/experience";
import { fadeInUp, staggerContainer } from "../utils/animations";
import Counter from "./Counter";
import ScrollRevealText from "./ScrollRevealText";
import SectionWrapper from "./SectionWrapper";

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <SectionWrapper id="experience" className="py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-fg-muted">
              Experience
            </span>
          </motion.div>
          <ScrollRevealText
            text="The journey"
            mode="mask"
            as="h2"
            className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.01em]"
            delay={0.2}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-14 grid grid-cols-2 gap-6 border-y border-border py-8 sm:grid-cols-4"
        >
          {[
            { value: experiences.length, label: "Roles" },
            { value: 10, label: "Projects" },
            { value: 5, label: "Technologies" },
            { value: 2, label: "Years" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <Counter value={stat.value} suffix="+" className="font-display text-3xl font-bold text-accent" />
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-fg-faint">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <div ref={containerRef} className="relative pl-8 sm:pl-12">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-border sm:left-5">
            <motion.div
              className="w-full bg-accent"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <TimelineEntry key={exp.period} item={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function TimelineEntry({
  item,
  index,
}: {
  item: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <motion.div
        className="absolute -left-[25px] top-6 flex h-3 w-3 items-center justify-center rounded-full border-2 border-accent bg-surface sm:-left-[33px]"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.2 }}
      />

      <div className="group rounded-xl border border-border bg-surface-elevated/40 p-6 transition-all duration-300 hover:border-accent/15 hover:bg-surface-card sm:p-8">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent/70">
            {item.period}
          </span>
          <span className="hidden h-px flex-1 bg-border sm:block" />
        </div>

        <h3 className="font-heading text-xl font-semibold tracking-[-0.01em]">
          {item.role}
        </h3>
        <p className="mt-1 text-sm font-medium text-fg-muted">
          {item.company}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-fg-muted">
          {item.description}
        </p>

        {item.technologies && (
          <div className="mt-5 flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-fg-faint"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
