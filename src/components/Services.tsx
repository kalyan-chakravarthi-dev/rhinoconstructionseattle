import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChefHat, Bath, Home, Zap, Wrench, Hammer, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: ChefHat,
    id: "kitchen",
    href: "/services/kitchen-remodeling",
  },
  {
    icon: Bath,
    id: "bathroom",
    href: "/services/bathroom-renovation",
  },
  {
    icon: Home,
    id: "roofing",
    href: "/services/roofing-services",
  },
  {
    icon: Zap,
    id: "electrical",
    href: "/services/electrical-work",
  },
  {
    icon: Wrench,
    id: "plumbing",
    href: "/services/plumbing-services",
  },
  {
    icon: Hammer,
    id: "repairs",
    href: "/services/general-repairs",
  },
];

const Services = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            {t('services.sectionLabel', 'What We Do')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={service.href}
              className="group relative bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient accent on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-rhino-orange to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
              
              {/* Icon */}
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 lg:w-8 lg:h-8 text-secondary" aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                {t(`services.serviceList.${service.id}.title`)}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {t(`services.serviceList.${service.id}.description`)}
              </p>

              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-secondary font-medium">
                <span>{t('services.learnMore')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="default" size="lg" asChild>
            <Link to="/services" className="inline-flex items-center gap-2">
              {t('services.viewAll')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link to="/before-after" className="inline-flex items-center gap-2">
              {t('services.seeOurWork')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
