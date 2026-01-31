import { Check } from 'lucide-react';
import type { ServiceOffering } from '@/data/services';

interface ServiceOfferingsProps {
  offerings: ServiceOffering[];
  serviceName: string;
}

const ServiceOfferings = ({ offerings, serviceName }: ServiceOfferingsProps) => {
  return (
    <section className="mb-12" aria-labelledby="offerings-heading">
      <h2 id="offerings-heading" className="text-2xl font-bold text-foreground mb-6">
        What We Offer
      </h2>
      
      <div className="space-y-4">
        {offerings.map((offering, index) => (
          <div 
            key={index}
            className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {offering.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {offering.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceOfferings;
