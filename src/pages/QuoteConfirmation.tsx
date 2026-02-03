import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Phone, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import rhinoLogo from "@/assets/rhino-remodeler-logo.png";
import { COMPANY_INFO } from "@/lib/constants";

const QuoteConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showAnimation, setShowAnimation] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);

  const quoteId = searchParams.get("id") || "RQT-0000";

  useEffect(() => {
    // Load quote data from localStorage
    const savedQuote = localStorage.getItem("lastSubmittedQuote");
    if (savedQuote) {
      setQuoteData(JSON.parse(savedQuote));
    }

    // Trigger animation after mount
    const timer = setTimeout(() => setShowAnimation(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getServiceName = (serviceId: string) => {
    const serviceNames: Record<string, string> = {
      kitchen: "Kitchen Remodeling",
      bathroom: "Bathroom Renovation",
      roofing: "Roofing Services",
      electrical: "Electrical Work",
      plumbing: "Plumbing Services",
      repairs: "General Repairs",
      painting: "Painting",
      flooring: "Flooring",
      other: "Other / Custom Project",
    };
    return serviceNames[serviceId] || serviceId || "Not specified";
  };

  // Check if service is emergency-related
  const isEmergencyService = ["electrical", "plumbing", "roofing"].includes(
    quoteData?.service?.toLowerCase() || ""
  );

  const customerEmail = quoteData?.contactInfo?.email || "your email address";
  const serviceType = getServiceName(quoteData?.service);
  const location = quoteData?.address
    ? `${quoteData.address.city}, ${quoteData.address.state}`
    : "Not specified";
  const submittedDate = format(new Date(), "MMMM d, yyyy");

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Minimal Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={rhinoLogo}
              alt="Rhino Remodeler"
              className="h-10 sm:h-12 w-auto"
            />
            <span className="text-lg sm:text-xl font-bold text-primary tracking-tight hidden sm:inline">
              RHINO REMODELER
            </span>
          </Link>

          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-2 text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="hidden sm:inline">{COMPANY_INFO.phone}</span>
            <span className="sm:hidden">Call Us</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-12 sm:py-16">
        <div className="max-w-md mx-auto space-y-8">
          {/* Success Confirmation */}
          <div className="text-center space-y-4">
            {/* Animated Checkmark */}
            <div
              className={`relative mx-auto w-20 h-20 transition-all duration-500 ${
                showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full bg-primary flex items-center justify-center transition-all duration-300 delay-200 ${
                  showAnimation ? "scale-100" : "scale-0"
                }`}
              >
                <Check
                  className={`w-10 h-10 text-primary-foreground transition-all duration-300 delay-400 ${
                    showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  strokeWidth={3}
                />
              </div>
            </div>

            <div
              className={`space-y-2 transition-all duration-500 delay-300 ${
                showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                Request Submitted Successfully
              </h1>
              <p className="text-muted-foreground">
                We've received your request and our team will contact you shortly.
              </p>
            </div>
          </div>

          {/* Quote Summary Card */}
          <div
            className={`bg-card border rounded-2xl p-6 space-y-4 transition-all duration-500 delay-500 ${
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Quote ID</span>
                <span className="font-mono font-semibold text-foreground">
                  {quoteId}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Service</span>
                <span className="font-medium text-foreground">{serviceType}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Location</span>
                <span className="font-medium text-foreground">{location}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Submitted</span>
                <span className="font-medium text-foreground">{submittedDate}</span>
              </div>
            </div>
          </div>

          {/* Email Confirmation Message */}
          <p
            className={`text-center text-sm text-muted-foreground transition-all duration-500 delay-600 ${
              showAnimation ? "opacity-100" : "opacity-0"
            }`}
          >
            A confirmation has been sent to{" "}
            <span className="font-medium text-foreground">{customerEmail}</span>.
          </p>

          {/* What Happens Next */}
          <div
            className={`space-y-3 transition-all duration-500 delay-700 ${
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h2 className="text-lg font-semibold text-foreground text-center">
              What Happens Next
            </h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>Our team will review your request within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>A site visit will be scheduled if needed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>Your quote will be valid for 30 days</span>
              </li>
            </ul>
          </div>

          {/* Emergency Contact (Conditional) */}
          {isEmergencyService && (
            <div
              className={`flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-xl transition-all duration-500 delay-800 ${
                showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
              <p className="text-sm text-foreground">
                For urgent issues, call{" "}
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="font-semibold text-destructive hover:underline"
                >
                  {COMPANY_INFO.phone}
                </a>
              </p>
            </div>
          )}

          {/* Primary CTA */}
          <div
            className={`space-y-4 transition-all duration-500 delay-900 ${
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button
              onClick={() => navigate(`/dashboard/quotes/${quoteId}`)}
              className="w-full rounded-xl"
              size="lg"
            >
              View Quote Status
            </Button>

            <div className="flex justify-center gap-6 text-sm">
              <Link
                to="/request-quote"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Request another quote
              </Link>
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuoteConfirmation;
