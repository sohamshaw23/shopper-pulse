import { BarChart3, Map, Flame, Activity } from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
}

const navItems = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "zones", label: "Zone Analytics", icon: Map },
  { id: "heatmap", label: "Heatmap", icon: Flame },
  { id: "speed", label: "Speed Analysis", icon: Activity },
];

export const Sidebar = ({ currentPage, onPageChange, isOpen }: SidebarProps) => {
  return (
    <aside
      className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } w-64`}
    >
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition-all ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
