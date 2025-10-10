import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onToggleSidebar: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar = ({ onToggleSidebar, isDark, onToggleTheme }: NavbarProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-card border-b border-border shadow-sm">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Customer Tracking Dashboard</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          className="rounded-lg"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};
