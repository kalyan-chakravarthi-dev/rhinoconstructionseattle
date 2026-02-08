import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Phone, ChevronDown, Images, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import { SERVICES_OVERVIEW } from "@/data/services-overview";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import rhinoLogo from "@/assets/rhino-logo-new.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { href: ROUTES.HOME, label: t('nav.home') },
    { href: ROUTES.ABOUT, label: t('nav.about') },
    { href: ROUTES.FAQ, label: t('nav.faq') },
    { href: ROUTES.CONTACT, label: t('nav.contact') },
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

  // Reset services expanded state when mobile menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsServicesExpanded(false);
    }
  }, [isMobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const isServicesActive = isActive(ROUTES.SERVICES) || isActive(ROUTES.GALLERY);

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
              {/* Home link */}
              <Link
                to={ROUTES.HOME}
                className={cn(
                  "relative px-4 py-2 font-medium text-base transition-colors rounded-md",
                  "hover:text-secondary hover:bg-muted/50",
                  isActive(ROUTES.HOME) ? "text-secondary" : "text-foreground"
                )}
              >
                {t('nav.home')}
                {isActive(ROUTES.HOME) && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-secondary rounded-full" />
                )}
              </Link>

              {/* Services Mega Menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "relative px-4 py-2 font-medium text-base transition-colors rounded-md bg-transparent",
                        "hover:text-secondary hover:bg-muted/50",
                        isServicesActive ? "text-secondary" : "text-foreground"
                      )}
                    >
                      {t('nav.services')}
                      {isServicesActive && (
                        <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-secondary rounded-full" />
                      )}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[600px] gap-0 p-4 lg:w-[700px] lg:grid-cols-[1fr_220px]">
                        {/* Left: Services Grid */}
                        <div className="pr-4 border-r border-border">
                          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            {t('nav.ourServices')}
                          </h3>
                          <div className="grid grid-cols-2 gap-1">
                            {SERVICES_OVERVIEW.map((service) => {
                              const Icon = service.icon;
                              return (
                                <NavigationMenuLink key={service.id} asChild>
                                  <Link
                                    to={`/services/${service.slug}`}
                                    className="flex items-center gap-3 rounded-md p-2.5 transition-colors hover:bg-muted/80 group"
                                  >
                                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-colors">
                                      <Icon className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium text-foreground group-hover:text-secondary transition-colors">
                                      {service.name}
                                    </span>
                                  </Link>
                                </NavigationMenuLink>
                              );
                            })}
                          </div>
                          <div className="mt-3 pt-3 border-t border-border">
                            <NavigationMenuLink asChild>
                              <Link
                                to={ROUTES.SERVICES}
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                              >
                                {t('nav.viewAllServices')}
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                            </NavigationMenuLink>
                          </div>
                        </div>

                        {/* Right: Portfolio Section */}
                        <div className="pl-4">
                          <h3 className="mb-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                            {t('nav.portfolio')}
                          </h3>
                          <NavigationMenuLink asChild>
                            <Link
                              to={ROUTES.GALLERY}
                              className="flex flex-col gap-3 rounded-lg p-4 bg-muted/50 hover:bg-muted transition-colors group"
                            >
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10 text-secondary group-hover:bg-secondary/20 transition-colors">
                                <Images className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-foreground group-hover:text-secondary transition-colors">
                                  {t('nav.beforeAfter')}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                  {t('gallery.subtitle')}
                                </p>
                              </div>
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary">
                                {t('nav.viewGallery')}
                                <ArrowRight className="h-3 w-3" />
                              </span>
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              {/* Remaining nav items: About, FAQ, Contact */}
              {navItems.slice(1).map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "relative px-4 py-2 font-medium text-base transition-colors rounded-md",
                    "hover:text-secondary hover:bg-muted/50",
                    isActive(item.href)
                      ? "text-secondary"
                      : "text-foreground"
                  )}
                >
                  {item.label}
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
                <span className="font-medium text-base">{COMPANY_INFO.phone}</span>
              </a>


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
              {/* Home */}
              <Link
                to={ROUTES.HOME}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-lg font-medium transition-colors",
                  isActive(ROUTES.HOME)
                    ? "bg-secondary/10 text-secondary border-l-4 border-secondary"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {t('nav.home')}
              </Link>

              {/* Services - Expandable */}
              <div>
                <button
                  onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  className={cn(
                    "flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-colors",
                    isServicesActive
                      ? "bg-secondary/10 text-secondary border-l-4 border-secondary"
                      : "text-foreground hover:bg-muted"
                  )}
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isServicesExpanded && "rotate-180"
                    )}
                  />
                </button>

                {/* Expandable sub-items */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200",
                    isServicesExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="pl-4 mt-1 space-y-0.5">
                    {/* Service sub-items */}
                    {SERVICES_OVERVIEW.map((service) => {
                      const Icon = service.icon;
                      const serviceHref = `/services/${service.slug}`;
                      return (
                        <Link
                          key={service.id}
                          to={serviceHref}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
                            isActive(serviceHref)
                              ? "bg-secondary/10 text-secondary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4 flex-shrink-0" />
                          <span>{service.name}</span>
                        </Link>
                      );
                    })}

                    {/* View All Services */}
                    <Link
                      to={ROUTES.SERVICES}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-secondary hover:bg-muted transition-colors"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                      <span>{t('nav.viewAllServices')}</span>
                    </Link>

                    {/* Portfolio sub-heading */}
                    <div className="pt-2 pb-1 px-4">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {t('nav.portfolio')}
                      </span>
                    </div>

                    {/* Before & After */}
                    <Link
                      to={ROUTES.GALLERY}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors",
                        isActive(ROUTES.GALLERY)
                          ? "bg-secondary/10 text-secondary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Images className="h-4 w-4 flex-shrink-0" />
                      <span>{t('nav.beforeAfter')}</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* About, FAQ, Contact */}
              {navItems.slice(1).map((item) => (
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

            {/* CTA */}
            <div className="px-4 space-y-3">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
