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
    <div className="grain relative bg-[#F2F5EE] text-[#14261F] min-h-screen">
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
      <Toaster theme="light" position="bottom-right" toastOptions={{ style: { background: "#FFFFFF", border: "1px solid #C8D1C3", color: "#14261F" } }} />
    </div>
  );
}

export default App;
