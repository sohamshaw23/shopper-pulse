import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Index from "@/pages/Index";

export const DashboardPreview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [40, 0]), { stiffness: 100, damping: 30 });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.8, 1]), { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <section ref={containerRef} className="relative z-10 py-32 overflow-hidden perspective-[1200px]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-['VT323',monospace] uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-300 to-cyan-300 drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]">
            Command Center
          </h2>
          <p className="mt-4 text-cyan-100/60 font-mono text-sm tracking-widest uppercase">Experience your data streams in perfect clarity.</p>
        </motion.div>

        <motion.div
          style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
          className="w-full h-[80vh] border-2 border-cyan-500/30 shadow-[0_0_80px_rgba(0,255,255,0.15)] bg-[#02010a] relative mx-auto max-w-6xl before:absolute before:-inset-[2px] before:border before:border-fuchsia-500/20 before:z-[-1]"
        >
          {/* Tech frame decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-50"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 z-50"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 z-50"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-50"></div>

          {/* Glass glare effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 to-transparent pointer-events-none z-40"></div>
          
          <div className="w-full h-full overflow-hidden pointer-events-none opacity-90 transition-opacity duration-500 will-change-transform bg-background relative isolate">
             <div className="w-[1280px] h-[800px] origin-top-left scale-[0.8] md:scale-100 md:w-full md:h-full overflow-hidden flex">
               <Index />
             </div>
          </div>
          
          <a href="/dashboard" className="absolute inset-0 z-50 cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 bg-[#050314]/80 backdrop-blur-md transition-all duration-300 group">
            <div className="px-10 py-5 bg-cyan-950/40 backdrop-blur-md border border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.3)] flex items-center gap-3 group-hover:bg-cyan-900/60 group-hover:shadow-[0_0_50px_rgba(0,255,255,0.5)] transition-all">
              <span className="text-2xl font-['VT323',monospace] uppercase text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                Initialize Matrix
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
