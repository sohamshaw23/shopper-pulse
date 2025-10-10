import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Navbar } from "@/components/Navbar";
import { Overview } from "./Overview";
import { ZoneAnalytics } from "./ZoneAnalytics";
import { Heatmap } from "./Heatmap";
import { SpeedAnalysis } from "./SpeedAnalysis";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initialize theme from system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const renderPage = () => {
    switch (currentPage) {
      case "overview":
        return <Overview />;
      case "zones":
        return <ZoneAnalytics />;
      case "heatmap":
        return <Heatmap />;
      case "speed":
        return <SpeedAnalysis />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <Navbar
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      <Sidebar
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
      />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="pt-16 lg:pl-64">
        <div className="container mx-auto p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
};

export default Index;
