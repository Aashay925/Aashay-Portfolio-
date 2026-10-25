import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { VibeZone } from "./components/VibeZone";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AIAssistant } from "./components/AIAssistant";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="grain relative bg-[#0D0F12] text-[#F2F4F7] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <VibeZone />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: "#14171C", border: "1px solid #262B33", color: "#F2F4F7" } }} />
    </div>
  );
}

export default App;
