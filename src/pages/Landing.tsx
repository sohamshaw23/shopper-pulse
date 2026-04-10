import { useEffect } from "react";
import { LandingScene } from "@/components/landing/LandingScene";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";

const Landing = () => {
  // Ensure dark mode is active to match the theme
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-[#02020a] text-white selection:bg-purple-500/30 font-sans">
      <LandingHeader />
      <LandingScene />
      
      {/* Scrollable Content Layer */}
      <div className="relative z-10">
        <HeroSection />
        <div id="features-section" className="relative group/features">
          <FeaturesSection />
        </div>
        <div id="preview-section" className="relative">
          <DashboardPreview />
        </div>
        <div id="how-it-works-section" className="relative">
          <HowItWorks />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
