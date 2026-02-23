import { AnimatePresence, motion } from "framer-motion";
import { sectionConfigs } from "../config/sections";

type ShortcutHelpProps = {
  open: boolean;
  onClose: () => void;
};

export default function ShortcutHelp({ open, onClose }: ShortcutHelpProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[180] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md rounded-2xl border border-foreground-light-muted dark:border-foreground-dark-muted/20 bg-surface-dark-elevated p-6 text-foreground-light dark:text-foreground-dark shadow-soft-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="font-heading text-lg tracking-wide">Keyboard Shortcuts</h3>

            <div className="mt-4 space-y-2">
              {sectionConfigs.map((section) => (
                <div key={section.id} className="flex items-center justify-between text-sm">
                  <span className="text-foreground-light-muted dark:text-foreground-dark-muted">{section.label}</span>
                  <kbd className="rounded border border-foreground-light-muted dark:border-foreground-dark-muted/30 px-2 py-1 font-mono text-xs">
                    {section.shortcut}
                  </kbd>
                </div>
              ))}
              <div className="mt-4 border-t border-foreground-light-muted dark:border-foreground-dark-muted/20 pt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-light-muted dark:text-foreground-dark-muted">Toggle Help</span>
                  <kbd className="rounded border border-foreground-light-muted dark:border-foreground-dark-muted/30 px-2 py-1 font-mono text-xs">
                    H
                  </kbd>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-foreground-light-muted dark:text-foreground-dark-muted">Back to Top</span>
                  <kbd className="rounded border border-foreground-light-muted dark:border-foreground-dark-muted/30 px-2 py-1 font-mono text-xs">
                    T
                  </kbd>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-foreground-light-muted dark:text-foreground-dark-muted">Open Resume</span>
                  <kbd className="rounded border border-foreground-light-muted dark:border-foreground-dark-muted/30 px-2 py-1 font-mono text-xs">
                    R
                  </kbd>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-full border border-foreground-light-muted dark:border-foreground-dark-muted/30 px-4 py-2 text-xs uppercase tracking-[0.15em] text-foreground-light-muted dark:text-foreground-dark-muted transition-colors hover:border-accent hover:text-accent"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
