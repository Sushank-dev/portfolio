import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { sectionConfigs } from "../config/sections";
import { socialLinks } from "../data/socialLinks";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-foreground-dark-muted/8 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a
              href="#home"
              className="font-heading text-lg tracking-[0.2em] text-foreground-dark"
            >
              SUSHANK<span className="text-accent">.</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground-dark-muted/50">
              Software developer crafting interactive, performant digital
              experiences.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-dark-muted/40">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {sectionConfigs.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground-dark-muted/60 transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA + Socials */}
          <div>
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-dark-muted/40">
              Get in Touch
            </h4>
            <a
              href="#contact"
              className="inline-block rounded-full border border-accent/30 bg-accent/10 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent transition-all duration-300 hover:bg-accent hover:text-surface-dark"
            >
              Start a project
            </a>
            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: <Github size={15} />, href: socialLinks.github, label: "GitHub" },
                { icon: <Linkedin size={15} />, href: socialLinks.linkedin, label: "LinkedIn" },
                { icon: <Mail size={15} />, href: `mailto:${socialLinks.email}`, label: "Email" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground-dark-muted/10 text-foreground-dark-muted/40 transition-all duration-300 hover:border-accent/30 hover:text-accent"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-foreground-dark-muted/8 pt-6 sm:flex-row">
          <p className="font-mono text-[10px] tracking-[0.1em] text-foreground-dark-muted/25">
            &copy; {currentYear} Thatipelly Sushank
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-foreground-dark-muted/30 transition-colors hover:text-accent"
          >
            Back to top
            <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
