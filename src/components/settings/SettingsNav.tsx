import { useLocation, useNavigate } from "react-router-dom";
import { 
  User, 
  Shield, 
  Bell, 
  MapPin, 
  CreditCard 
} from "lucide-react";
import { cn } from "@/lib/utils";

const settingsNavItems = [
  { 
    id: "profile", 
    label: "Profile", 
    icon: User, 
    path: "/dashboard/settings/profile",
    description: "Personal information and photo"
  },
  { 
    id: "security", 
    label: "Security", 
    icon: Shield, 
    path: "/dashboard/settings/security",
    description: "Password and two-factor auth"
  },
  { 
    id: "notifications", 
    label: "Notifications", 
    icon: Bell, 
    path: "/dashboard/settings/notifications",
    description: "Email, SMS, and push preferences"
  },
  { 
    id: "addresses", 
    label: "Addresses", 
    icon: MapPin, 
    path: "/dashboard/settings/addresses",
    description: "Service and mailing addresses"
  },
  { 
    id: "payments", 
    label: "Payments", 
    icon: CreditCard, 
    path: "/dashboard/settings/payments",
    description: "Payment methods and billing"
  },
];

const SettingsNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Default to profile if on /dashboard/settings
  const currentPath = location.pathname === "/dashboard/settings" 
    ? "/dashboard/settings/profile" 
    : location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <>
      {/* Desktop: Vertical sidebar */}
      <nav className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-card rounded-xl border border-border p-2 sticky top-28">
          <div className="space-y-1">
            {settingsNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  "w-full flex items-start gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                  isActive(item.path)
                    ? "bg-secondary/10 text-secondary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 mt-0.5 flex-shrink-0",
                  isActive(item.path) ? "text-secondary" : "text-muted-foreground"
                )} />
                <div>
                  <span className={cn(
                    "font-medium block",
                    isActive(item.path) && "text-secondary"
                  )}>
                    {item.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile: Horizontal scrolling tabs */}
      <nav className="lg:hidden -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {settingsNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors",
                isActive(item.path)
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default SettingsNav;
