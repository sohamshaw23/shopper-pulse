import { motion } from "framer-motion";

export const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Data Flows", desc: "SENSORS CAPTURE SPATIAL BEHAVIOR CONTINUOUSLY." },
    { num: "02", title: "Processing", desc: "ENGINE MAPS PHYSICAL ACTIONS TO SEMANTIC DATA." },
    { num: "03", title: "Insights", desc: "ACTIONABLE METRICS SURFACE ON THE HUD." }
  ];

  return (
    <section className="relative z-10 py-32 min-h-[80vh] flex items-center bg-gradient-to-b from-transparent to-[#02010a]">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-6xl text-center font-['VT323',monospace] uppercase font-bold text-white mb-24 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          System Architecture
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 relative max-w-5xl mx-auto">
          {/* Connecting energy line */}
          <div className="hidden md:block absolute top-12 left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-fuchsia-500/0 z-0"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.3, duration: 0.7, ease: "backOut" }}
              className="relative z-10 flex flex-col items-center flex-1 text-center group"
            >
              <div className="w-24 h-24 bg-[#0b081c]/80 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-fuchsia-500 group-hover:shadow-[0_0_40px_rgba(255,0,255,0.3)] transition-all duration-500 relative">
                {/* Abstract corner markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50"></div>
                
                <span className="text-5xl font-['VT323',monospace] text-cyan-400 group-hover:text-fuchsia-400 drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] transition-colors">
                  {step.num}
                </span>
              </div>
              <h3 className="text-3xl font-['VT323',monospace] uppercase text-white mb-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:text-cyan-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-cyan-100/50 font-mono text-xs leading-loose tracking-widest uppercase">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
