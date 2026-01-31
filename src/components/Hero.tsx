import { Button } from "@/components/ui/button";
import { Phone, Shield, Award, Users, Star } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const trustBadges = [
  { icon: Shield, label: "Licensed & Insured" },
  { icon: Award, label: "20+ Years Experience" },
  { icon: Users, label: "1000+ Happy Customers" },
  { icon: Star, label: "A+ BBB Rating" },
];

const Hero = () => {
  const handleGetQuote = () => {
    // Navigate to quote page or scroll to form
    window.location.href = "/request-quote";
  };

  return (
    <section className="relative min-h-[80vh] lg:min-h-screen flex items-center justify-center">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional construction site in Seattle"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/90" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up"
          >
            Seattle's Trusted
            <br />
            <span className="text-secondary">Home Repair Experts</span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Professional repairs and renovations within 40 miles of Seattle.
            <br className="hidden sm:block" />
            <span className="font-medium">Licensed, Bonded & Insured.</span>
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleGetQuote}
              className="w-full sm:w-auto min-h-[52px] text-lg px-10"
            >
              Get Free Quote
            </Button>
            <Button 
              variant="hero-outline" 
              size="xl" 
              asChild
              className="w-full sm:w-auto min-h-[52px] text-lg px-8"
            >
              <a href="tel:+12065557446" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call Now: (206) 555-RHINO
              </a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {trustBadges.map((badge) => (
              <div 
                key={badge.label}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <badge.icon className="w-5 h-5 lg:w-6 lg:h-6 text-secondary" />
                </div>
                <span className="text-sm lg:text-base font-medium text-primary-foreground text-center">
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden lg:block">
        <div className="w-8 h-12 rounded-full border-2 border-primary-foreground/40 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary-foreground/60 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
