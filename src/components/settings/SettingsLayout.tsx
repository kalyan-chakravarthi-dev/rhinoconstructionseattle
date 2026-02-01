import { useState } from "react";
import { Menu, Bell, ChevronRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import SettingsNav from "./SettingsNav";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const SettingsLayout = ({ children, title, description }: SettingsLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (item: string) => {
    if (item === "dashboard") {
      navigate("/dashboard");
    } else if (item === "quotes") {
      navigate("/dashboard/quotes");
    } else if (item === "profile") {
      navigate("/dashboard/settings");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Main Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem="profile"
        onItemClick={handleItemClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span 
                  className="hover:text-foreground cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground font-medium">Settings</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>

            {/* Settings Navigation + Content */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Settings Sub-Nav */}
              <SettingsNav />

              {/* Settings Content Area */}
              <div className="flex-1 min-w-0">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
