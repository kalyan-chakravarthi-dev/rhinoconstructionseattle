import { Home, Hammer, Paintbrush, Wrench, Building, HardHat } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Home Renovations",
    description: "Complete home makeovers from kitchens to bathrooms. Transform your living space with expert craftsmanship.",
  },
  {
    icon: Building,
    title: "New Construction",
    description: "Custom home building from foundation to finish. Bring your dream home vision to life.",
  },
  {
    icon: Hammer,
    title: "Structural Repairs",
    description: "Foundation, framing, and structural repairs to keep your home safe and sound.",
  },
  {
    icon: Paintbrush,
    title: "Interior Finishing",
    description: "Drywall, painting, flooring, and trim work for a polished interior look.",
  },
  {
    icon: Wrench,
    title: "General Repairs",
    description: "From minor fixes to major repairs, we handle all your home maintenance needs.",
  },
  {
    icon: HardHat,
    title: "Commercial Projects",
    description: "Office buildouts, retail spaces, and commercial construction services.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Quality Construction Services
          </h2>
          <p className="text-muted-foreground text-lg">
            From small repairs to major renovations, we provide comprehensive construction services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 lg:p-8 bg-card rounded-xl border border-border hover:border-secondary/50 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/10 transition-colors">
                <service.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
