import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  FolderOpen, 
  Settings, 
  LogOut, 
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "quotes", label: "My Quotes", icon: FileText, path: "/dashboard/quotes" },
  { id: "appointments", label: "Appointments", icon: Calendar, path: "/dashboard" },
  { id: "projects", label: "Projects", icon: FolderOpen, path: "/dashboard" },
  { id: "profile", label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const DashboardSidebar = ({ isOpen, onClose, activeItem, onItemClick }: SidebarProps) => {
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    initials: "JS",
  };

  const handleSignOut = () => {
    localStorage.removeItem("signInData");
    window.location.href = "/";
  };

  const handleNavigation = (item: typeof menuItems[0]) => {
    onItemClick(item.id);
    navigate(item.path);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-72 bg-card border-r border-border z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">R</span>
                </div>
                <div>
                  <span className="font-bold text-foreground">RHINO</span>
                  <span className="font-medium text-muted-foreground ml-1">CONSTRUCTION</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-semibold text-lg">
                  {user.initials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-left",
                  activeItem === item.id
                    ? "bg-secondary/10 text-secondary border-l-4 border-secondary -ml-1 pl-5"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
