import { motion } from "framer-motion";
import About from "./components/About";
import Contact from "./components/Contact";
import CursorFollower from "./components/CursorFollower";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MagneticCursor from "./components/MagneticCursor";
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Preloader />
      <MagneticCursor />
      <CursorFollower />

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
          transition={{ duration: 0.5, delay: 1.5 }}
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
