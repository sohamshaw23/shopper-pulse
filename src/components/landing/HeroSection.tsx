import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export const HeroSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll within the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Global Camera effects (simulating camera moving forward)
  const globalRotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const globalRotateY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  // Layer 1: "Shopper Pulse"
  // Starts near (z=0), moves far (z=-4000), fades & blurs out by 35% scroll.
  const l1_z = useTransform(scrollYProgress, [0, 0.35], [0, -4000]);
  const l1_opacity = useTransform(scrollYProgress, [0, 0.2, 0.35], [1, 0.8, 0]);
  const l1_blur = useTransform(scrollYProgress, [0, 0.35], ["0px", "40px"]);
  const l1_scale = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  
  // Layer 2: "Decode The Spatial Matrix"
  // Starts extremely far (z=4000), reaches near (z=0) at 50%, moves far (z=-4000) at 85%
  const l2_z = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [3000, 0, -4000]);
  const l2_opacity = useTransform(scrollYProgress, [0.15, 0.3, 0.5, 0.7, 0.85], [0, 0.8, 1, 0.8, 0]);
  const l2_blur = useTransform(scrollYProgress, [0.15, 0.5, 0.85], ["40px", "0px", "40px"]);
  const l2_scale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [3, 1, 0]);
  
  // Layer 3: "Track. Analyze. Predict." & CTA
  const l3_z = useTransform(scrollYProgress, [0.6, 0.9, 1], [3000, 0, 0]);
  const l3_opacity = useTransform(scrollYProgress, [0.6, 0.85, 1], [0, 1, 1]);
  const l3_blur = useTransform(scrollYProgress, [0.6, 0.9, 1], ["40px", "0px", "0px"]);
  const l3_scale = useTransform(scrollYProgress, [0.6, 0.9, 1], [3, 1, 1]);

  // Elegant Background Scrolling Text
  const bg_op = useTransform(scrollYProgress, [0, 0.1], [0.15, 0]);
  const bg1_y = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const bg2_y = useTransform(scrollYProgress, [0, 1], [0, -400]);

  return (
    <section ref={containerRef} className="relative z-10 h-[500vh] w-full">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden perspective-[1200px] flex items-center justify-center">
        
        {/* Parallax Background Texts */}
        <motion.div style={{ opacity: bg_op }} className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center font-['VT323',monospace] uppercase text-[12vw] leading-[0.8] text-white/5 whitespace-nowrap select-none mix-blend-overlay">
           <motion.div style={{ y: bg1_y, x: "-10vw" }} className="drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Intelligence</motion.div>
           <motion.div style={{ y: bg2_y, x: "15vw" }} className="drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">Matrix</motion.div>
        </motion.div>

        {/* Global Camera Rotation / Scene wrapper wrapper */}
        <motion.div
           style={{ rotateX: globalRotateX, rotateY: globalRotateY, transformStyle: "preserve-3d" }}
           className="w-full h-full absolute inset-0 flex items-center justify-center"
        >
          {/* Layer 1 */}
          <motion.div
            style={{ 
              z: l1_z, 
              scale: l1_scale,
              opacity: l1_opacity, 
              filter: `blur(0px)` // placeholder, we apply blur to H1 natively
            }}
            className="absolute text-center flex flex-col items-center will-change-transform pointer-events-none"
          >
            <motion.h1 
              style={{ filter: l1_blur }}
              className="text-7xl md:text-9xl tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-purple-400 drop-shadow-[0_0_25px_rgba(0,255,255,0.6)] uppercase pb-2 font-['VT323',monospace] font-bold"
            >
              Shopper Pulse
            </motion.h1>
          </motion.div>

          {/* Layer 2 */}
          <motion.div
            style={{ 
              z: l2_z, 
              scale: l2_scale,
              opacity: l2_opacity
            }}
            className="absolute text-center flex flex-col items-center px-4 will-change-transform pointer-events-none"
          >
            <motion.h2 
              style={{ filter: l2_blur }}
              className="text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-200 to-blue-400 tracking-widest uppercase drop-shadow-[0_0_20px_rgba(0,255,255,0.6)] font-['VT323',monospace] leading-tight font-bold pb-2"
            >
              Real-Time<br/>
              Consumer Intelligence
            </motion.h2>
            <p className="mt-6 text-2xl text-white max-w-2xl font-mono tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] font-bold">
              Decode The Spatial Matrix
            </p>
          </motion.div>

          {/* Layer 3 */}
          <motion.div
            style={{ 
              z: l3_z, 
              scale: l3_scale,
              opacity: l3_opacity,
              pointerEvents: useTransform(scrollYProgress, (v) => v > 0.7 ? "auto" : "none")
            }}
            className="absolute text-center flex flex-col items-center w-full max-w-4xl px-4 will-change-transform"
          >
            <motion.h2 
              style={{ filter: l3_blur }}
              className="text-5xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] uppercase font-['VT323',monospace] font-bold"
            >
              Track. Analyze. Predict.
            </motion.h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/dashboard")}
              className="mt-12 px-10 py-5 bg-gradient-to-r from-blue-600/80 to-purple-600/80 border-2 border-cyan-400/50 rounded-lg backdrop-blur-md text-3xl tracking-widest text-white shadow-[0_0_40px_-5px_rgba(0,255,255,0.4)] flex items-center justify-center gap-3 mx-auto hover:shadow-[0_0_60px_-5px_rgba(0,255,255,0.6)] hover:bg-white/10 transition-all duration-300 uppercase font-['VT323',monospace] pointer-events-auto"
            >
              Get Insights <ArrowRight className="w-6 h-6 border-2 border-white rounded-sm p-0.5 bg-black" />
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
