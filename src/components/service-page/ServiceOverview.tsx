import { Shield, Award, Clock } from 'lucide-react';

interface ServiceOverviewProps {
  introduction: string;
  whyChooseUs: string[];
}

const ServiceOverview = ({ introduction, whyChooseUs }: ServiceOverviewProps) => {
  const trustIndicators = [
    { icon: Shield, label: 'Licensed & Insured' },
    { icon: Award, label: '20+ Years Experience' },
    { icon: Clock, label: 'On-Time Guarantee' },
  ];

  return (
    <section className="py-12 bg-background" aria-labelledby="overview-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 id="overview-heading" className="sr-only">Service Overview</h2>
          
          {/* Introduction */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            {introduction}
          </p>
          
          {/* Why Choose Us */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {whyChooseUs.map((reason, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm font-bold">✓</span>
                </div>
                <span className="text-foreground">{reason}</span>
              </div>
            ))}
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 pt-8 border-t border-border">
            {trustIndicators.map(({ icon: Icon, label }) => (
              <div 
                key={label}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
