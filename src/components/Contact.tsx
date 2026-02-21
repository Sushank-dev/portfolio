import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";
import { socialLinks } from "../data/socialLinks";
import { fadeInUp, staggerContainer } from "../utils/animations";
import SectionWrapper from "./SectionWrapper";
import SplitText from "./SplitText";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${socialLinks.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
    window.location.href = mailtoLink;
  };

  const socials = [
    { icon: <Github size={18} />, label: "GitHub", href: socialLinks.github },
    { icon: <Linkedin size={18} />, label: "LinkedIn", href: socialLinks.linkedin },
    { icon: <Mail size={18} />, label: "Email", href: `mailto:${socialLinks.email}` },
    { icon: <Phone size={18} />, label: "Phone", href: `tel:${socialLinks.phone}` },
  ];

  return (
    <SectionWrapper id="contact" className="py-24 sm:py-36">
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
              Contact
            </span>
          </motion.div>
          <SplitText
            text="Let's work together"
            className="mt-6 font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.01em]"
            delay={0.2}
          />
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="mt-4 max-w-lg text-sm leading-relaxed text-foreground-dark-muted/60"
          >
            I'm always open to discussing new projects, creative ideas, or
            opportunities. Feel free to reach out.
          </motion.p>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-foreground-dark-muted/50"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border-b border-foreground-dark-muted/15 bg-transparent px-0 py-3 text-sm text-foreground-dark outline-none transition-colors duration-300 placeholder:text-foreground-dark-muted/25 focus:border-accent/40"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-foreground-dark-muted/50"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-b border-foreground-dark-muted/15 bg-transparent px-0 py-3 text-sm text-foreground-dark outline-none transition-colors duration-300 placeholder:text-foreground-dark-muted/25 focus:border-accent/40"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block font-mono text-[10px] uppercase tracking-[0.25em] text-foreground-dark-muted/50"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none border-b border-foreground-dark-muted/15 bg-transparent px-0 py-3 text-sm text-foreground-dark outline-none transition-colors duration-300 placeholder:text-foreground-dark-muted/25 focus:border-accent/40"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="group mt-2 inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/10 px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent transition-all duration-300 hover:bg-accent hover:text-surface-dark"
            >
              <Send size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              Send Message
            </button>
          </motion.form>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex items-center justify-between border-b border-foreground-dark-muted/8 py-4 transition-colors duration-300 hover:border-accent/20"
                  data-magnetic
                >
                  <div className="flex items-center gap-4">
                    <span className="text-foreground-dark-muted/40 transition-colors duration-300 group-hover:text-accent">
                      {social.icon}
                    </span>
                    <span className="text-sm text-foreground-dark-muted transition-colors duration-300 group-hover:text-foreground-dark">
                      {social.label}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={14}
                    className="text-foreground-dark-muted/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </a>
              ))}
            </div>

            <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground-dark-muted/30">
              Based in India
            </p>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
