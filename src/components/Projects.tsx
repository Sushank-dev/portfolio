import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef, useState } from "react";
import { projects, type Project } from "../data/projects";
import { fadeInUp, staggerContainer } from "../utils/animations";
import SectionWrapper from "./SectionWrapper";
import SplitText from "./SplitText";
import ProjectModal from "./ProjectModal";

export default function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  return (
    <SectionWrapper id="projects" className="py-24 sm:py-36">
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
              Selected Work
            </span>
          </motion.div>
          <SplitText
            text="Featured projects"
            className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.01em]"
            delay={0.2}
          />
        </motion.div>

        {/* Project list — editorial style */}
        <div ref={scrollRef} className="space-y-1">
          {projects.map((project, index) => {
            const isHovered = hoveredId === project.id;

            return (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                isHovered={isHovered}
                onHover={() => setHoveredId(project.id)}
                onLeave={() => setHoveredId(null)}
                onSelect={() => setSelectedProject(project)}
                scrollProgress={scrollYProgress}
              />
            );
          })}
          {/* Final border */}
          <div className="border-t border-foreground-dark-muted/10" />
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionWrapper>
  );
}

function ProjectRow({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
  onSelect,
  scrollProgress,
}: {
  project: Project;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rowProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(rowProgress, [0, 1], [4, 0]);
  const opacity = useTransform(rowProgress, [0, 0.3], [0.4, 1]);

  return (
    <motion.article
      ref={rowRef}
      style={{ rotateX, opacity, transformPerspective: 1200 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="group relative cursor-pointer"
      onClick={onSelect}
      data-cursor-text="View"
    >
      <div className="relative grid items-center gap-6 border-t border-foreground-dark-muted/10 py-8 transition-all duration-500 md:grid-cols-[1fr_1.2fr_auto] md:py-10">
        {/* Number + Title + Description */}
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-[11px] text-foreground-dark-muted/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl font-semibold tracking-[-0.01em] transition-colors duration-300 group-hover:text-accent md:text-3xl">
              {project.title}
            </h3>
          </div>
          <p className="mt-2 pl-9 text-[13px] leading-relaxed text-foreground-dark-muted/50 transition-colors duration-300 group-hover:text-foreground-dark-muted/70 md:pl-10">
            {project.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground-dark-muted/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-foreground-dark-muted/60 transition-colors duration-300 group-hover:border-accent/15 group-hover:text-foreground-dark-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground-dark-muted/10 text-foreground-dark-muted/40 transition-all duration-300 hover:border-accent hover:text-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={16} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-foreground-dark-muted/10 text-foreground-dark-muted/40 transition-all duration-300 hover:border-accent hover:text-accent"
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={16} />
            </a>
          )}
        </div>

        {/* Hover image preview */}
        <motion.div
          className="pointer-events-none absolute -right-4 top-1/2 z-20 hidden w-72 -translate-y-1/2 overflow-hidden rounded-xl shadow-soft-lg lg:block"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : 20,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-auto w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>
    </motion.article>
  );
}
