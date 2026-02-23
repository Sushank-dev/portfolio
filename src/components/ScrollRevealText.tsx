import { useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>";

interface ScrollRevealTextProps {
  text: string;
  mode?: "scramble" | "mask";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
}

export default function ScrollRevealText({
  text,
  mode = "scramble",
  className = "",
  as: Tag = "div",
  delay = 0,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let cleanup: (() => void) | undefined;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        if (mode === "scramble") {
          // Start with scrambled text
          el.textContent = text.replace(/\S/g, () =>
            CHARS[Math.floor(Math.random() * CHARS.length)]
          );
          el.style.opacity = "1";

          const st = ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => {
              setTimeout(() => {
                let iter = 0;
                const max = text.length * 3;
                intervalId = setInterval(() => {
                  el.textContent = text
                    .split("")
                    .map((ch, i) => {
                      if (ch === " ") return " ";
                      return i < iter / 3
                        ? text[i]
                        : CHARS[Math.floor(Math.random() * CHARS.length)];
                    })
                    .join("");
                  if (++iter > max) {
                    el.textContent = text;
                    clearInterval(intervalId);
                    intervalId = undefined;
                  }
                }, 25);
              }, delay * 1000);
            },
          });

          cleanup = () => st.kill();
        } else {
          // Mask mode — words slide up from behind overflow-hidden wrappers
          const words = text.split(" ");
          el.innerHTML = words
            .map(
              (w) =>
                `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.05em"><span class="reveal-word" style="display:inline-block;transform:translateY(110%)">${w}</span></span>`
            )
            .join(
              '<span style="display:inline-block;width:0.3em"></span>'
            );
          el.style.opacity = "1";

          const inners = el.querySelectorAll(".reveal-word");
          gsap.to(inners, {
            y: "0%",
            duration: 0.7,
            stagger: 0.035,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });

          cleanup = () =>
            ScrollTrigger.getAll().forEach(
              (st: { trigger: Element | null; kill: () => void }) => {
                if (st.trigger === el) st.kill();
              }
            );
        }
      } catch {
        // GSAP not available — show text immediately
        if (el) {
          el.textContent = text;
          el.style.opacity = "1";
        }
      }
    })();

    return () => {
      if (intervalId) clearInterval(intervalId);
      cleanup?.();
    };
  }, [text, mode, delay]);

  return (
    <Tag
      ref={ref as React.Ref<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
      className={className}
      style={{ opacity: 0 }}
      aria-label={text}
    />
  );
}
