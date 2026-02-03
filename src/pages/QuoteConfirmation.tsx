import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Check,
  Mail,
  Clock,
  Phone,
  Calendar,
  FileText,
  MapPin,
  Star,
  Shield,
  Lock,
  Award,
  Home,
  Plus,
  Printer,
  ChevronDown,
  ChevronUp,
  QrCode,
  Share2,
  ExternalLink,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { format } from "date-fns";
import rhinoLogo from "@/assets/rhino-remodeler-logo.png";
import { COMPANY_INFO } from "@/lib/constants";

const QuoteConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showAnimation, setShowAnimation] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(false);
  const [quoteData, setQuoteData] = useState<any>(null);

  const quoteId = searchParams.get("id") || "RQT-2024-0001";

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

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Rhino Remodeler Quote Request",
          text: `Quote Request Confirmation - ${quoteId}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
  };

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
    return serviceNames[serviceId] || serviceId;
  };

  const timelineSteps = [
    {
      step: 1,
      status: "complete",
      icon: Check,
      title: "CONFIRMATION",
      time: "Now",
      description: "You'll receive an email confirmation within minutes",
    },
    {
      step: 2,
      status: "pending",
      icon: Clock,
      title: "REVIEW",
      time: "2-4 hours",
      description: "Our team will review your request and photos",
    },
    {
      step: 3,
      status: "pending",
      icon: Phone,
      title: "CONTACT",
      time: "4-24 hours",
      description: `A specialist will call you at ${quoteData?.contactInfo?.phone || "your phone number"} to discuss details`,
    },
    {
      step: 4,
      status: "pending",
      icon: Calendar,
      title: "SITE VISIT",
      time: "Scheduled",
      description: "We'll schedule an on-site evaluation if needed",
    },
    {
      step: 5,
      status: "pending",
      icon: FileText,
      title: "QUOTE",
      time: "24-48 hours",
      description: "You'll receive a detailed written estimate",
    },
  ];

  const faqItems = [
    {
      question: "How does the quote process work?",
      answer: "After reviewing your submission, one of our specialists will call to discuss your project in detail. We may schedule a site visit if needed. You'll receive a comprehensive written quote within 24-48 hours.",
    },
    {
      question: "What information will you need during the call?",
      answer: "We may ask about your preferred materials, timeline flexibility, access to the work area, and any specific design preferences. Having your project photos handy can be helpful.",
    },
    {
      question: "How should I prepare for the site visit?",
      answer: "Clear access to the work area, have any relevant documents ready (permits, HOA requirements, previous work details), and prepare a list of questions for our specialist.",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Minimal Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo - links to home */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img 
              src={rhinoLogo} 
              alt="Rhino Remodeler" 
              className="h-10 sm:h-12 w-auto"
            />
            <span className="text-lg sm:text-xl font-bold text-primary tracking-tight hidden sm:inline">
              RHINO REMODELER
            </span>
          </Link>

          {/* Phone Number - tap to call */}
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

      <div className="py-8 px-4 print:bg-white print:py-0">
        <div className="max-w-2xl mx-auto space-y-8">
        {/* Success Header */}
        <div className="text-center space-y-6">
          {/* Animated Checkmark */}
          <div
            className={`relative mx-auto w-24 h-24 transition-all duration-700 ${
              showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            {/* Outer ring animation */}
            <div
              className={`absolute inset-0 rounded-full border-4 border-primary transition-all duration-1000 ${
                showAnimation ? "scale-100 opacity-100" : "scale-150 opacity-0"
              }`}
            />
            {/* Inner fill */}
            <div
              className={`absolute inset-2 rounded-full bg-primary flex items-center justify-center transition-all duration-500 delay-300 ${
                showAnimation ? "scale-100" : "scale-0"
              }`}
            >
              <Check
                className={`w-10 h-10 text-primary-foreground transition-all duration-300 delay-500 ${
                  showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
                strokeWidth={3}
              />
            </div>
            {/* Celebration particles */}
            {showAnimation && (
              <>
                <div className="absolute -top-2 left-1/2 w-2 h-2 bg-secondary rounded-full animate-ping" />
                <div className="absolute top-1/2 -right-2 w-2 h-2 bg-primary rounded-full animate-ping delay-100" />
                <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-secondary rounded-full animate-ping delay-200" />
                <div className="absolute top-1/2 -left-2 w-2 h-2 bg-primary rounded-full animate-ping delay-300" />
              </>
            )}
          </div>

          <div
            className={`space-y-2 transition-all duration-500 delay-300 ${
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Quote Request Submitted!
            </h1>
            <p className="text-muted-foreground text-lg">
              We've received your request and will be in touch soon
            </p>
          </div>
        </div>

        {/* Quote Details Card */}
        <div
          className={`bg-card border rounded-xl shadow-lg overflow-hidden transition-all duration-500 delay-500 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-primary p-6 text-center">
            <p className="text-primary-foreground/80 text-sm uppercase tracking-wide mb-1">
              Quote Request Number
            </p>
            <p className="text-3xl md:text-4xl font-mono font-bold text-primary-foreground">
              {quoteId}
            </p>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Submission Date</span>
              <span className="font-medium text-foreground">
                {format(new Date(), "MMMM d, yyyy 'at' h:mm a")}
              </span>
            </div>

            {quoteData?.service && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service Type</span>
                <span className="font-medium text-foreground">
                  {getServiceName(quoteData.service)}
                </span>
              </div>
            )}

            {quoteData?.address && (
              <div className="flex justify-between items-start">
                <span className="text-muted-foreground">Property Location</span>
                <span className="font-medium text-foreground text-right">
                  {quoteData.address.city}, {quoteData.address.state}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Email Confirmation */}
        <div
          className={`flex items-start gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg transition-all duration-500 delay-700 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Confirmation Email Sent</p>
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to{" "}
              <span className="font-medium text-foreground">
                {quoteData?.contactInfo?.email || "your email address"}
              </span>
            </p>
          </div>
        </div>

        {/* Next Steps Timeline */}
        <div
          className={`bg-card border rounded-xl p-6 transition-all duration-500 delay-800 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-xl font-semibold text-foreground mb-6">Next Steps</h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-border" />

            <div className="space-y-6">
              {timelineSteps.map((step, index) => (
                <div key={step.step} className="relative flex gap-4">
                  {/* Step icon */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      step.status === "complete"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.status === "complete" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wide ${
                          step.status === "complete" ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          step.status === "complete"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div
          className={`bg-card border rounded-xl p-6 space-y-4 transition-all duration-500 delay-900 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-xl font-semibold text-foreground">Important Information</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
              <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Emergency Contact</p>
                <p className="text-sm text-muted-foreground">Need urgent service?</p>
                <a
                  href="tel:+12065557446"
                  className="text-sm font-medium text-secondary hover:underline"
                >
                  Call (206) 555-RHINO
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Clock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Quote Validity</p>
                <p className="text-sm text-muted-foreground">
                  Quotes are valid for 30 days from issue date
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-lg">
            <Shield className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">No Obligation</span> - This is a free,
              no-obligation estimate. You're under no pressure to proceed.
            </p>
          </div>
        </div>

        {/* Save Reference */}
        <div
          className={`bg-muted/30 border border-dashed rounded-xl p-6 text-center transition-all duration-500 delay-1000 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-sm text-muted-foreground mb-2">
            Save this confirmation number for reference
          </p>
          <p className="text-2xl font-mono font-bold text-foreground mb-4">{quoteId}</p>
          <div className="flex justify-center gap-2 print:hidden">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            {navigator.share && (
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div
          className={`space-y-3 print:hidden transition-all duration-500 delay-1100 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg">
              <MapPin className="w-4 h-4 mr-2" />
              View Quote Status
            </Button>
            <Button variant="outline" onClick={handlePrint} className="w-full" size="lg">
              <Printer className="w-4 h-4 mr-2" />
              Print Confirmation
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Button variant="ghost" onClick={() => navigate("/request-quote")} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Request Another Quote
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link to="/contact">
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>

        {/* What to Expect (Expandable FAQ) */}
        <Collapsible open={expandedFaq} onOpenChange={setExpandedFaq} className="print:hidden">
          <div
            className={`bg-card border rounded-xl overflow-hidden transition-all duration-500 delay-1200 ${
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full p-6 hover:bg-muted/50 transition-colors">
              <h2 className="text-xl font-semibold text-foreground">What to Expect</h2>
              {expandedFaq ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6 space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="border-t pt-4 first:border-t-0 first:pt-0">
                    <h3 className="font-medium text-foreground mb-2">{item.question}</h3>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
                <div className="pt-4">
                  <Link
                    to="/faq"
                    className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                  >
                    View all FAQs
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </CollapsibleContent>
          </div>
        </Collapsible>

        {/* Social Proof */}
        <div
          className={`bg-card border rounded-xl p-6 text-center transition-all duration-500 delay-1300 print:hidden ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-muted-foreground mb-3">
            Join 1,000+ happy customers who trust Rhino Remodeler
          </p>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-secondary text-secondary" />
            ))}
            <span className="ml-2 font-semibold text-foreground">4.9/5</span>
          </div>
          <blockquote className="text-sm text-muted-foreground italic max-w-md mx-auto">
            "Rhino Remodeler provided a detailed quote and completed our kitchen remodel on time
            and on budget. Highly recommend!"
          </blockquote>
          <p className="text-xs text-muted-foreground mt-2">— Sarah M., Seattle</p>
        </div>

        {/* Trust Indicators */}
        <div
          className={`grid grid-cols-3 gap-4 transition-all duration-500 delay-1400 ${
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="text-center p-4 bg-card border rounded-lg">
            <Lock className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Secure</p>
            <p className="text-xs text-muted-foreground">Data protected</p>
          </div>
          <div className="text-center p-4 bg-card border rounded-lg">
            <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Insured</p>
            <p className="text-xs text-muted-foreground">Fully covered</p>
          </div>
          <div className="text-center p-4 bg-card border rounded-lg">
            <Award className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">Licensed</p>
            <p className="text-xs text-muted-foreground">WA #RHINO*001</p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-muted-foreground pb-8 print:hidden">
          Questions? Contact us at{" "}
          <a href="mailto:quotes@rhinoconstruction.com" className="text-primary hover:underline">
            quotes@rhinoconstruction.com
          </a>{" "}
          or call{" "}
          <a href="tel:+12065557446" className="text-primary hover:underline">
            (206) 555-RHINO
          </a>
        </p>
        </div>
      </div>
    </div>
  );
};

export default QuoteConfirmation;
