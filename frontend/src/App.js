import { useEffect } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import "@/App.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { VibeZone } from "./components/VibeZone";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

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
    <div className="grain relative bg-[#0A0B10] text-[#F4F5F8] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <VibeZone />
        <Contact />
      </main>
      <Footer />
      <Toaster theme="dark" position="bottom-right" toastOptions={{ style: { background: "#12141D", border: "1px solid rgba(255,255,255,0.1)", color: "#F4F5F8" } }} />
    </div>
  );
}

export default App;
