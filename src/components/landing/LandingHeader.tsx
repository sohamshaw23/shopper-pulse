import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export const LandingHeader = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { label: "Features", id: "features-section" },
    { label: "Dashboard", id: "preview-section" },
    { label: "How It Works", id: "how-it-works-section" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050314]/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,255,255,0.1)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <Activity className="w-8 h-8 text-cyan-400 select-none group-hover:text-fuchsia-400 transition-colors" />
            <div className="absolute inset-0 bg-cyan-400 blur-md opacity-40 group-hover:bg-fuchsia-400 group-hover:opacity-60 transition-colors" />
          </div>
          <span className="text-3xl font-bold font-['VT323',monospace] tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
            PULSE
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex flex-1 justify-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="text-sm font-mono tracking-widest uppercase text-blue-200/70 hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => scrollTo("preview-section")}
            className="px-6 py-2.5 rounded border border-cyan-400/30 text-cyan-300 text-sm font-mono tracking-widest uppercase hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all duration-300"
          >
            Launch MVP
          </button>
        </div>
      </div>
    </motion.header>
  );
};
