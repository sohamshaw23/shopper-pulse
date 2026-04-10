export const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-[#02010a]/90 backdrop-blur-xl pt-16 pb-8">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="mb-8 text-4xl font-['VT323',monospace] font-bold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
          PULSE
        </div>
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {['Features', 'Dashboard', 'Company', 'Contact'].map(link => (
             <a 
                key={link} 
                href="#" 
                className="font-mono text-sm tracking-widest uppercase text-blue-200/50 hover:text-cyan-300 hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] transition-all duration-300"
             >
                {link}
             </a>
          ))}
        </div>
        <p className="text-cyan-900/60 font-mono text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Shopper Pulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
