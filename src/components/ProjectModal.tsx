import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useEffect } from "react";
import type { Project } from "../data/projects";
import DisplacementImage from "./DisplacementImage";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-surface-dark/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 z-[90] overflow-y-auto rounded-2xl border border-foreground-dark-muted/10 bg-surface-dark-elevated sm:inset-8 lg:inset-16"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-foreground-dark-muted/15 bg-surface-dark/80 text-foreground-dark-muted transition-all hover:border-accent hover:text-accent"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Hero image */}
            <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
              <DisplacementImage
                src={project.image}
                alt={project.title}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark-elevated via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="px-6 pb-12 sm:px-10 lg:px-16">
              {/* Title + meta */}
              <div className="-mt-12 relative">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="font-display text-4xl font-bold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
                  {project.title}
                </h2>
              </div>

              {/* Description */}
              <p className="mt-8 max-w-2xl text-base leading-[1.9] text-foreground-dark-muted/70">
                {project.description}
              </p>

              {/* Extended description placeholder */}
              <div className="mt-10 grid gap-8 border-t border-foreground-dark-muted/8 pt-10 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-dark-muted/40">
                    Overview
                  </h3>
                  <p className="text-sm leading-[1.8] text-foreground-dark-muted/60">
                    This project showcases modern web development techniques
                    including responsive design, smooth animations, and
                    performance optimization. Built with a focus on user
                    experience and clean architecture.
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-dark-muted/40">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-foreground-dark-muted/10 bg-surface-dark-card px-3 py-2 text-[11px] text-foreground-dark-muted/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="mt-10 flex gap-4">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-accent transition-all hover:bg-accent hover:text-surface-dark"
                  >
                    Live Demo
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-foreground-dark-muted/15 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground-dark-muted transition-all hover:border-accent hover:text-accent"
                  >
                    <Github size={14} />
                    Source Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
