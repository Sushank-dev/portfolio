import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { useRef, useState } from "react";
import { projects, type Project } from "../data/projects";
import { fadeInUp, staggerContainer } from "../utils/animations";
import ScrollRevealText from "./ScrollRevealText";
import ProjectModal from "./ProjectModal";
import SectionWrapper from "./SectionWrapper";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
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
              <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-fg-muted">
                Selected Work
              </span>
            </motion.div>
            <ScrollRevealText
              text="Featured projects"
              mode="mask"
              as="h2"
              className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.01em]"
              delay={0.15}
            />
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, i) => (
              <FloatingCard
                key={project.id}
                project={project}
                index={i}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

/* ── Floating Card with Parallax ── */
function FloatingCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [30 + index * 10, -(30 + index * 10)]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: -y * 6, y: x * 6 });
  };

  return (
    <div ref={ref}>
      <motion.div style={{ y: parallaxY }}>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ perspective: 1200 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          onClick={onSelect}
          className="group cursor-pointer"
        >
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated transition-shadow duration-500 group-hover:shadow-soft-lg"
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative h-56 overflow-hidden sm:h-64">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-6">
              <div className="mb-3 flex flex-wrap gap-2">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-fg-faint"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-fg transition-colors group-hover:text-accent sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-fg-muted line-clamp-2">
                {project.description}
              </p>

              <div className="mt-5 flex items-center gap-3">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-faint transition-all hover:border-accent hover:text-accent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ArrowUpRight size={14} />
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-fg-faint transition-all hover:border-accent hover:text-accent"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={14} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
