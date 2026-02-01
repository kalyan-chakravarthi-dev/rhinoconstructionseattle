import { Navigate } from "react-router-dom";

// Default settings route redirects to profile
const DashboardSettings = () => {
  return <Navigate to="/dashboard/settings/profile" replace />;
};

export default DashboardSettings;
