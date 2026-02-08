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
      {/* Background image - visible on all sizes */}
      <div className="relative lg:min-h-screen lg:flex lg:items-center lg:justify-center">
        {/* Mobile: image as banner; Desktop: full-screen background */}
        <div className="relative w-full aspect-[16/10] lg:absolute lg:inset-0 lg:aspect-auto">
          <img
            src={heroImage}
            alt="Professional Rhino Remodeler service van in front of residential home"
            className="w-full h-full object-cover object-center"
          />
          {/* Mobile gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-foreground/80 lg:hidden" />
          {/* Desktop gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/65 to-foreground/85 hidden lg:block" />
        </div>

        {/* Content */}
        <div className="bg-foreground lg:bg-transparent px-4 py-8 lg:py-32 text-center lg:container lg:mx-auto lg:px-8 lg:relative lg:z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight mb-4 lg:mb-6 animate-fade-up lg:text-primary-foreground">
              <span className="text-primary-foreground">{t('hero.title1')}</span>
              {" "}<br />
              <span className="text-secondary">{t('hero.title2')}</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-base sm:text-lg lg:text-xl xl:text-2xl text-primary-foreground/85 mb-8 lg:mb-10 max-w-md lg:max-w-2xl mx-auto leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              {t('hero.subtitle')}
              {" "}<br className="hidden sm:block" />
              <span className="font-medium">{t('hero.subtitleBold')}</span>
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 mb-10 lg:mb-12 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                variant="hero"
                size="xl"
                asChild
                className="w-full lg:w-auto min-h-[56px] lg:min-h-[52px] text-lg font-semibold lg:px-10"
              >
                <Link to={ROUTES.REQUEST_QUOTE}>{t('hero.getQuote')}</Link>
              </Button>
              <Button
                variant="hero-outline"
                size="xl"
                asChild
                className="w-full lg:w-auto min-h-[56px] lg:min-h-[52px] text-lg lg:px-8"
              >
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                  {t('hero.callNow')} {COMPANY_INFO.phone}
                </a>
              </Button>
            </div>

            {/* Trust Badges */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 lg:max-w-3xl lg:mx-auto animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/20 lg:bg-primary-foreground/10 border border-muted/30 lg:border-primary-foreground/20 lg:backdrop-blur-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/40 lg:border-0">
                    <badge.icon className="w-6 h-6 text-secondary" aria-hidden="true" />
                  </div>
                  <span className="text-sm lg:text-base font-medium text-primary-foreground text-center">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade - Desktop only */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 hidden lg:block" />

        {/* Scroll Indicator - Desktop only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden lg:block" aria-hidden="true">
          <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
