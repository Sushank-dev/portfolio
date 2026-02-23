import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Projects from "./components/Projects";
import Scene3D from "./components/Scene3D";
import Skills from "./components/Skills";
import { useTheme } from "./context/ThemeContext";
import { usePageTitle } from "./hooks/usePageTitle";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { preloadPortfolioResources } from "./utils/resourcePreloader";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const { theme } = useTheme();

  useSmoothScroll();
  usePageTitle("Thatipelly Sushank | Interactive Portfolio");

  useEffect(() => {
    let isMounted = true;
    const start = Date.now();

    preloadPortfolioResources((progress) => {
      if (isMounted) setLoadingProgress(progress);
    }).finally(() => {
      if (!isMounted) return;
      setLoadingProgress(100);
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 3000 - elapsed);
      setTimeout(() => {
        if (isMounted) setIsLoaded(true);
      }, remaining + 300);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Preloader loading={!isLoaded} progress={loadingProgress} onSkip={() => setIsLoaded(true)} />

      <Scene3D theme={theme} />

      {/* Grain overlay — above canvas, below content */}
      <div
        aria-hidden
        className="grain pointer-events-none fixed inset-0 z-[1]"
      />

      <div className="relative z-10 min-h-screen text-fg transition-colors duration-500">
        <Navbar />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </motion.main>

        <Footer />
      </div>
    </>
  );
}
