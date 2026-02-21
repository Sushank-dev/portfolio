import { useEffect } from "react";
import { sectionConfigs } from "../config/sections";

type UsePortfolioShortcutsOptions = {
  enabled?: boolean;
  onToggleHelp?: () => void;
  onOpenResume?: () => void;
};

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

export function usePortfolioShortcuts({
  enabled = true,
  onToggleHelp,
  onOpenResume,
}: UsePortfolioShortcutsOptions = {}) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;

      const key = event.key.toLowerCase();

      const matchedSection = sectionConfigs.find((section) => section.shortcut === key);
      if (matchedSection) {
        event.preventDefault();
        const sectionElement = document.getElementById(matchedSection.id);
        sectionElement?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      if (key === "h") {
        event.preventDefault();
        onToggleHelp?.();
        return;
      }

      if (key === "t") {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (key === "r" && onOpenResume) {
        event.preventDefault();
        onOpenResume();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled, onOpenResume, onToggleHelp]);
}
