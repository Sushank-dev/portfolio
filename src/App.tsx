import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import CursorFollower from "./components/CursorFollower";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MagneticCursor from "./components/MagneticCursor";
import Navbar from "./components/Navbar";
import NoiseBlob from "./components/NoiseBlob";
import ParticleBackground from "./components/ParticleBackground";
import Preloader from "./components/Preloader";
import Projects from "./components/Projects";
import ShortcutHelp from "./components/ShortcutHelp";
import Skills from "./components/Skills";
import { personalInfo } from "./data/socialLinks";
import { usePageTitle } from "./hooks/usePageTitle";
import { usePortfolioShortcuts } from "./hooks/usePortfolioShortcuts";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { preloadPortfolioResources } from "./utils/resourcePreloader";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showShortcutHelp, setShowShortcutHelp] = useState(false);

  useSmoothScroll();
  usePageTitle("Thatipelly Sushank | Interactive Portfolio");
  usePortfolioShortcuts({
    enabled: isLoaded,
    onToggleHelp: () => setShowShortcutHelp((current) => !current),
    onOpenResume: () => {
      if (!personalInfo.resumePath) return;
      window.open(personalInfo.resumePath, "_blank", "noopener,noreferrer");
    },
  });

  useEffect(() => {
    let isMounted = true;

    preloadPortfolioResources((progress) => {
      if (isMounted) setLoadingProgress(progress);
    }).finally(() => {
      if (!isMounted) return;
      setLoadingProgress(100);
      setTimeout(() => setIsLoaded(true), 250);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSkipPreload = () => setIsLoaded(true);

  return (
    <>
      <Preloader loading={!isLoaded} progress={loadingProgress} onSkip={handleSkipPreload} />
      <MagneticCursor />
      <CursorFollower />

      <ParticleBackground />
      <NoiseBlob />
      <ShortcutHelp open={showShortcutHelp} onClose={() => setShowShortcutHelp(false)} />

      <div className="relative min-h-screen bg-surface-light text-foreground-light transition-colors duration-500 dark:bg-surface-dark dark:text-foreground-dark">
        {/* Background effects */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-30 dark:opacity-100"
          style={{
            background:
              "radial-gradient(circle at 10% 10%, rgba(212,98,43,0.06), transparent 35%), radial-gradient(circle at 85% 20%, rgba(201,169,110,0.04), transparent 34%)",
          }}
        />
        <div
          aria-hidden
          className="grain pointer-events-none fixed inset-0 -z-10 opacity-[0.03] dark:opacity-[0.04]"
        />

        <Navbar />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: isLoaded ? 0.05 : 0.2 }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </motion.main>

        <button
          type="button"
          onClick={() => setShowShortcutHelp(true)}
          className="fixed bottom-6 right-6 z-40 rounded-full border border-foreground-dark-muted/20 bg-surface-dark-elevated/85 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-dark-muted transition-colors hover:border-accent hover:text-accent"
          data-magnetic
          aria-label="Open keyboard shortcuts"
          title="Keyboard shortcuts (H)"
        >
          shortcuts
        </button>

        <Footer />
      </div>
    </>
  );
}
