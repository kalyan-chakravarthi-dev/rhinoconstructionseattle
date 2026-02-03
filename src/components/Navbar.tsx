import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import rhinoLogo from "@/assets/rhino-logo-new.png";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { href: ROUTES.HOME, label: t('nav.home') },
    { href: "/services", label: t('nav.services') },
    { href: "/about", label: t('nav.about') },
    { href: "/contact", label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-40 transition-all duration-300 bg-card",
          isScrolled && "shadow-md"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
              <img 
                src={rhinoLogo} 
                alt="Rhino Remodeler" 
                className="h-12 sm:h-14 lg:h-20 w-auto"
              />
              <span className="text-lg font-bold text-foreground tracking-tight lg:hidden">
                RHINO REMODELER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative px-4 py-2 font-medium text-sm transition-colors rounded-md",
                    "hover:text-secondary hover:bg-muted/50",
                    isActive(item.href) 
                      ? "text-secondary" 
                      : "text-foreground"
                  )}
                >
                  {item.label}
                  {/* Active Indicator */}
                  {isActive(item.href) && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-secondary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Desktop Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <LanguageSwitcher variant="compact" />

              {/* Phone */}
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors px-3 py-2 rounded-md hover:bg-muted/50"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span className="font-medium text-sm">{COMPANY_INFO.phone}</span>
              </a>

              {/* Sign In */}
              <Button variant="outline" size="default" asChild>
                <Link to={ROUTES.SIGN_IN}>{t('nav.signIn')}</Link>
              </Button>

              {/* Request Quote */}
              <Button variant="hero" size="default" asChild>
                <Link to={ROUTES.REQUEST_QUOTE}>{t('nav.requestQuote')}</Link>
              </Button>
            </div>

            {/* Mobile Right Side */}
            <div className="flex lg:hidden items-center gap-2">
              <LanguageSwitcher variant="compact" />
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full max-w-sm bg-card shadow-2xl z-50 transition-transform duration-300 ease-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <img 
              src={rhinoLogo} 
              alt="Rhino Remodeler" 
              className="h-8 w-auto"
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-foreground hover:bg-muted rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* Navigation Links */}
            <nav className="px-4 space-y-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-secondary/10 text-secondary border-l-4 border-secondary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Divider */}
            <div className="my-6 mx-4 border-t border-border" />

            {/* Auth Links */}
            <div className="px-4 space-y-3">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                asChild
              >
                <Link to={ROUTES.SIGN_IN} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.signIn')}
                </Link>
              </Button>
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                asChild
              >
                <Link to={ROUTES.REQUEST_QUOTE} onClick={() => setIsMobileMenuOpen(false)}>
                  {t('nav.requestQuote')}
                </Link>
              </Button>
            </div>
          </div>

          {/* Drawer Footer - Call to Action */}
          <div className="p-4 border-t border-border bg-muted/30">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold text-lg hover:bg-rhino-blue-dark transition-colors"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              {t('hero.callNow')} {COMPANY_INFO.phone}
            </a>
            <p className="text-center text-muted-foreground text-sm mt-3">
              Available 24/7 for emergencies
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
