import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DashboardQuotes from "./pages/DashboardQuotes";
import DashboardSettings from "./pages/DashboardSettings";
import { 
  SettingsProfile, 
  SettingsSecurity, 
  SettingsNotifications, 
  SettingsAddresses, 
  SettingsPayments 
} from "./pages/settings";
import RequestQuote from "./pages/RequestQuote";
import QuoteConfirmation from "./pages/QuoteConfirmation";
import BeforeAfterGalleryPage from "./pages/BeforeAfterGalleryPage";
import ServicesPage from "./pages/ServicesPage";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/quotes" element={<DashboardQuotes />} />
            {/* Settings Routes */}
            <Route path="/dashboard/settings" element={<DashboardSettings />} />
            <Route path="/dashboard/settings/profile" element={<SettingsProfile />} />
            <Route path="/dashboard/settings/security" element={<SettingsSecurity />} />
            <Route path="/dashboard/settings/notifications" element={<SettingsNotifications />} />
            <Route path="/dashboard/settings/addresses" element={<SettingsAddresses />} />
            <Route path="/dashboard/settings/payments" element={<SettingsPayments />} />
            <Route path="/request-quote" element={<RequestQuote />} />
            <Route path="/request-quote/confirmation" element={<QuoteConfirmation />} />
            <Route path="/gallery" element={<BeforeAfterGalleryPage />} />
            {/* Services Hub Page */}
            <Route path="/services" element={<ServicesPage />} />
            {/* Individual Service Pages - Dynamic routing */}
            <Route path="/services/:slug" element={<ServicePage />} />
            {/* About Page */}
            <Route path="/about" element={<AboutPage />} />
            {/* Contact Page */}
            <Route path="/contact" element={<ContactPage />} />
            {/* FAQ Page */}
            <Route path="/faq" element={<FAQPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
