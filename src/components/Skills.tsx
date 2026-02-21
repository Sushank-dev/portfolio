import { motion } from "framer-motion";
import {
  Cloud,
  Code2,
  Container,
  Database,
  FileCode,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Server,
  Smartphone,
  Zap,
} from "lucide-react";
import { skills, skillCategories } from "../data/skills";
import { fadeInUp, staggerContainer } from "../utils/animations";
import Marquee from "./Marquee";
import SectionWrapper from "./SectionWrapper";
import SplitText from "./SplitText";

import { SpotlightCard } from "./SpotlightCard";

const iconMap: Record<string, React.ReactNode> = {
  react: <Globe size={22} />,
  threejs: <Layers size={22} />,
  tailwind: <Palette size={22} />,
  typescript: <FileCode size={22} />,
  framer: <Smartphone size={22} />,
  nodejs: <Server size={22} />,
  python: <Code2 size={22} />,
  mongodb: <Database size={22} />,
  express: <Zap size={22} />,
  git: <GitBranch size={22} />,
  docker: <Container size={22} />,
  aws: <Cloud size={22} />,
};

export default function Skills() {
  return (
    <SectionWrapper id="skills" className="py-24 sm:py-36">
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
            <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-foreground-dark-muted">
              Technologies
            </span>
          </motion.div>
          <SplitText
            text="Tools I work with"
            className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.01em]"
            delay={0.2}
          />
        </motion.div>

        {/* Marquee strip */}
        <Marquee
          items={skills.map((s) => s.name)}
          className="mb-14 border-y border-foreground-dark-muted/8 py-4"
          speed={30}
        />

        <div className="space-y-14">
          {skillCategories.map((category) => (
            <motion.div
              key={category.key}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground-dark-muted/60"
              >
                {category.label}
              </motion.p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {skills
                  .filter((s) => s.category === category.key)
                  .map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      variants={fadeInUp}
                      custom={i}
                      whileHover={{ y: -6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    >
                      <SpotlightCard className="flex h-full flex-col items-center gap-3 p-5">
                        <div className="text-foreground-dark-muted/50 transition-colors duration-300 group-hover:text-accent">
                          {iconMap[skill.icon] || <Code2 size={22} />}
                        </div>
                        <span className="text-center text-[11px] font-medium tracking-[0.06em] text-foreground-dark-muted transition-colors duration-300 group-hover:text-foreground-dark">
                          {skill.name}
                        </span>
                      </SpotlightCard>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
