import { useEffect, useRef, type ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  transparent?: boolean;
}

export default function SectionWrapper({ id, children, className = "", transparent = false }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (!ref.current) return;

        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        cleanup = () => {
          ScrollTrigger.getAll().forEach((st: { trigger: Element | null; kill: () => void }) => {
            if (st.trigger === ref.current) st.kill();
          });
        };
      } catch {
        // GSAP not available — show section immediately
        if (ref.current) ref.current.style.opacity = "1";
      }
    })();

    return () => cleanup?.();
  }, []);

  return (
    <section id={id} ref={ref} className={`relative ${transparent ? "" : "bg-surface"} ${className}`} style={{ opacity: 0 }}>
      {children}
    </section>
  );
}
