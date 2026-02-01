import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Menu, 
  Bell, 
  FileText, 
  Calendar, 
  FolderCheck, 
  Plus,
  Clock,
  ArrowRight,
  Phone,
  MessageSquare,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DashboardSidebar from "@/components/DashboardSidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

// Mock data
const mockUser = {
  firstName: "John",
  lastName: "Smith",
};

const mockStats = {
  activeQuotes: 2,
  scheduledAppointments: 1,
  nextAppointment: "Feb 15, 2024 at 10:00 AM",
  completedProjects: 3,
};

const mockRecentActivity = [
  {
    id: 1,
    type: "Kitchen Remodeling",
    status: "pending",
    date: "Jan 28, 2024",
    description: "Full kitchen renovation with new cabinets and countertops",
  },
  {
    id: 2,
    type: "Bathroom Renovation",
    status: "reviewed",
    date: "Jan 22, 2024",
    description: "Master bathroom update with walk-in shower",
  },
  {
    id: 3,
    type: "Roof Repair",
    status: "approved",
    date: "Jan 15, 2024",
    description: "Emergency roof leak repair after storm damage",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>;
    case "reviewed":
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Reviewed</Badge>;
    case "approved":
      return <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">Approved</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/sign-in");
    }
  }, [user, loading, navigate]);

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Get user's first name from metadata or email
  const firstName = user?.user_metadata?.firstName || user?.email?.split('@')[0] || 'User';

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
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
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground hidden sm:block">{currentDate}</p>
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

        {/* Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
              Welcome back, {firstName}!
            </h2>
            <p className="text-muted-foreground">
              {currentDate} • {currentTime}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {/* Active Quotes */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <span className="text-3xl font-bold text-foreground">{mockStats.activeQuotes}</span>
              </div>
              <h3 className="font-medium text-foreground">Active Quotes</h3>
              <p className="text-sm text-muted-foreground">Awaiting response</p>
            </div>

            {/* Scheduled Appointments */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <span className="text-3xl font-bold text-foreground">{mockStats.scheduledAppointments}</span>
              </div>
              <h3 className="font-medium text-foreground">Scheduled Appointments</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {mockStats.nextAppointment}
              </p>
            </div>

            {/* Completed Projects */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <FolderCheck className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-3xl font-bold text-foreground">{mockStats.completedProjects}</span>
              </div>
              <h3 className="font-medium text-foreground">Completed Projects</h3>
              <p className="text-sm text-muted-foreground">All time</p>
            </div>

            {/* Quick Action */}
            <div className="bg-gradient-to-br from-primary to-rhino-blue-dark rounded-xl p-6 text-primary-foreground shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                  <Plus className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-medium mb-3">Need a new project?</h3>
              <Button 
                variant="secondary" 
                size="sm"
                className="w-full"
                onClick={() => window.location.href = "/request-quote"}
              >
                Request New Quote
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-xl border border-border shadow-sm mb-8">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                <Button variant="ghost" size="sm" className="text-secondary">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Activity List */}
            <div className="divide-y divide-border">
              {mockRecentActivity.length > 0 ? (
                mockRecentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-4 lg:p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium text-foreground">{activity.type}</h4>
                          {getStatusBadge(activity.status)}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {activity.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 sm:flex-shrink-0">
                        <span className="text-sm text-muted-foreground">{activity.date}</span>
                        <Button variant="ghost" size="sm" className="text-secondary">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="font-medium text-foreground mb-2">No recent activity</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start by requesting a quote for your next project
                  </p>
                  <Button variant="default">Request a Quote</Button>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button
                variant="hero"
                size="lg"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => window.location.href = "/request-quote"}
              >
                <FileText className="w-6 h-6" />
                <span>Request a Quote</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-auto py-4 flex-col gap-2"
              >
                <Calendar className="w-6 h-6" />
                <span>Schedule Appointment</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-auto py-4 flex-col gap-2"
              >
                <MessageSquare className="w-6 h-6" />
                <span>Contact Support</span>
              </Button>
            </div>
          </div>

          {/* Contact Banner */}
          <div className="mt-8 bg-muted rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Need immediate assistance?</p>
                <p className="text-sm text-muted-foreground">Our team is available 24/7 for emergencies</p>
              </div>
            </div>
            <Button variant="secondary" asChild>
              <a href="tel:+12065557446">
                Call (206) 555-RHINO
              </a>
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
