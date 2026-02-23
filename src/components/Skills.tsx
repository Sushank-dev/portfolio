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
import ScrollRevealText from "./ScrollRevealText";
import SectionWrapper from "./SectionWrapper";

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
    <SectionWrapper id="skills" className="py-24 sm:py-36" transparent>
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
              Technologies
            </span>
          </motion.div>
          <ScrollRevealText
            text="Tools I work with"
            mode="mask"
            as="h2"
            className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.01em]"
            delay={0.2}
          />
        </motion.div>

        {/* Skill labels overlay — 3D physics spheres animate behind these */}
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
                className="mb-5 font-mono text-[11px] uppercase tracking-[0.25em] text-fg-faint"
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
                      whileHover={{ y: -6, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                      className="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-surface/60 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-accent/20 hover:bg-surface-card/80"
                    >
                      <div className="text-fg-faint transition-colors duration-300 group-hover:text-accent">
                        {iconMap[skill.icon] || <Code2 size={22} />}
                      </div>
                      <span className="text-center text-[11px] font-medium tracking-[0.06em] text-fg-muted transition-colors duration-300 group-hover:text-fg">
                        {skill.name}
                      </span>
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
