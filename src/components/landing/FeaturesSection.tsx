import { motion } from "framer-motion";
import { Activity, BrainCircuit, Users } from "lucide-react";

const features = [
  {
    title: "Real-Time Analytics",
    description: "Monitor foot traffic and spatial behavior as it happens with our high-frequency data streams.",
    icon: Activity,
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-[0_0_20px_rgba(0,255,255,0.4)]"
  },
  {
    title: "AI Predictions",
    description: "Anticipate trends and optimize store layouts using our predictive machine learning models.",
    icon: BrainCircuit,
    color: "from-fuchsia-400 to-purple-500",
    shadow: "shadow-[0_0_20px_rgba(255,0,255,0.4)]"
  },
  {
    title: "Customer Behavior",
    description: "Track dwell times, heatmaps, and zone interactions to understand absolute user intent.",
    icon: Users,
    color: "from-cyan-300 to-emerald-400",
    shadow: "shadow-[0_0_20px_rgba(0,255,150,0.4)]"
  },
];

export const FeaturesSection = () => {
  return (
    <section className="relative z-10 py-32 bg-[#050314]/80 backdrop-blur-md border-y border-cyan-500/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-['VT323',monospace] uppercase font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
            Intelligent Tracking
          </h2>
          <p className="mt-4 text-cyan-100/60 max-w-2xl mx-auto font-mono text-sm tracking-widest uppercase">
            Everything you need to visualize retail environments dynamically.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-[#0b081c]/80 border border-cyan-500/20 p-8 backdrop-blur-xl cursor-pointer group hover:border-fuchsia-500/50 hover:bg-[#150a3b]/60 transition-colors duration-500 shadow-[0_0_15px_rgba(0,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,0,255,0.15)] relative overflow-hidden"
            >
              {/* Scanline decoration */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 ${feature.shadow}`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-['VT323',monospace] uppercase text-white mb-3 group-hover:text-fuchsia-300 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                {feature.title}
              </h3>
              <p className="text-cyan-100/50 font-mono text-xs leading-loose tracking-widest uppercase group-hover:text-cyan-100/80 transition-colors">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
