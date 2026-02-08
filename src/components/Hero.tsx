import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Phone, Shield, Award, Users, Star } from "lucide-react";
import heroImage from "@/assets/hero-van.png";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";

const Hero = () => {
  const { t } = useTranslation();

  const trustBadges = [
    { icon: Shield, label: t('trustBadges.licensed') },
    { icon: Award, label: t('trustBadges.experience') },
    { icon: Users, label: t('trustBadges.customers') },
    { icon: Star, label: t('trustBadges.rating') },
  ];

  return (
    <section className="relative">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Hero image as banner on mobile */}
        <div className="relative w-full aspect-[16/10]">
          <img
            src={heroImage}
            alt="Professional Rhino Remodeler service van in front of residential home"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle gradient overlay for transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/80" />
        </div>

        {/* Content section on dark background */}
        <div className="bg-foreground px-4 py-8 text-center">
          {/* Main Headline */}
          <p className="text-3xl sm:text-4xl font-bold leading-tight mb-4 animate-fade-up" aria-hidden="true">
            <span className="text-primary-foreground">{t('hero.title1')}</span>
            {" "}<br />
            <span className="text-secondary">{t('hero.title2')}</span>
          </p>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-primary-foreground/85 mb-8 max-w-md mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {t('hero.subtitle')}
            <br />
            <span className="font-medium">{t('hero.subtitleBold')}</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col gap-4 mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button
              variant="hero"
              size="xl"
              asChild
              className="w-full min-h-[56px] text-lg font-semibold"
            >
              <Link to={ROUTES.REQUEST_QUOTE}>{t('hero.getQuote')}</Link>
            </Button>
            <Button 
              variant="hero-outline" 
              size="xl" 
              asChild
              className="w-full min-h-[56px] text-lg"
            >
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" aria-hidden="true" />
                {t('hero.callNow')} {COMPANY_INFO.phone}
              </a>
            </Button>
          </div>

          {/* Trust Badges - 2x2 grid with card style */}
          <div className="grid grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {trustBadges.map((badge) => (
              <div 
                key={badge.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/20 border border-muted/30"
              >
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/40">
                  <badge.icon className="w-6 h-6 text-secondary" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-primary-foreground text-center">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original */}
      <div className="hidden lg:flex relative min-h-screen items-center justify-center">
        {/* Hero background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professional Rhino Remodeler service van in front of residential home"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/65 to-foreground/85" />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up">
              {t('hero.title1')}
              {" "}<br />
              <span className="text-secondary">{t('hero.title2')}</span>
            </h1>

            {/* Subheadline */}
            <p 
              className="text-xl lg:text-2xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {t('hero.subtitle')}
              <br className="hidden sm:block" />
              <span className="font-medium">{t('hero.subtitleBold')}</span>
            </p>

            {/* CTAs */}
            <div 
              className="flex flex-row items-center justify-center gap-6 mb-12 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                variant="hero"
                size="xl"
                asChild
                className="min-h-[52px] text-lg px-10"
              >
                <Link to={ROUTES.REQUEST_QUOTE}>{t('hero.getQuote')}</Link>
              </Button>
              <Button 
                variant="hero-outline" 
                size="xl" 
                asChild
                className="min-h-[52px] text-lg px-8"
              >
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {t('hero.callNow')} {COMPANY_INFO.phone}
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div 
              className="grid grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              {trustBadges.map((badge) => (
                <div 
                  key={badge.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <badge.icon className="w-6 h-6 text-secondary" aria-hidden="true" />
                  </div>
                  <span className="text-base font-medium text-primary-foreground text-center">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce" aria-hidden="true">
          <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
