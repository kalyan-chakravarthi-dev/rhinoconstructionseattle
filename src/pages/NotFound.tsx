import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowRight, Phone, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";

const popularLinks = [
  { label: "Home", href: ROUTES.HOME, description: "Return to the homepage" },
  { label: "Services", href: ROUTES.SERVICES, description: "Browse our services" },
  { label: "Contact Us", href: ROUTES.CONTACT, description: "Get in touch with our team" },
  { label: "Request a Quote", href: ROUTES.REQUEST_QUOTE, description: "Get a free estimate" },
  { label: "Before & After", href: ROUTES.GALLERY, description: "See our project gallery" },
  { label: "FAQ", href: ROUTES.FAQ, description: "Frequently asked questions" },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main id="main-content" className="flex-1 flex items-center justify-center bg-background py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Header */}
          <p className="text-8xl md:text-9xl font-bold text-primary/20 mb-2">404</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Sorry, the page <code className="text-sm bg-muted px-2 py-1 rounded">{location.pathname}</code> doesn't exist or has been moved.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="font-semibold">
              <Link to={ROUTES.HOME}>
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${COMPANY_INFO.phoneRaw}`}>
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                Call {COMPANY_INFO.phone}
              </a>
            </Button>
          </div>

          {/* Popular Links */}
          <div className="border-t border-border pt-8">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center justify-center gap-2">
              <Search className="w-5 h-5 text-primary" aria-hidden="true" />
              Popular Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {popularLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="text-left">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {link.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{link.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-3" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
