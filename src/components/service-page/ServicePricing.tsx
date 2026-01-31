import { DollarSign, Info } from 'lucide-react';
import type { PricingTier } from '@/data/services';

interface ServicePricingProps {
  pricing: PricingTier[];
  pricingNote: string;
}

const ServicePricing = ({ pricing, pricingNote }: ServicePricingProps) => {
  return (
    <section className="mb-12" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" className="text-2xl font-bold text-foreground mb-6">
        Pricing Guide
      </h2>
      
      <div className="space-y-3 mb-4">
        {pricing.map((tier, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{tier.name}</h3>
              {tier.description && (
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="font-bold text-primary whitespace-nowrap">{tier.range}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pricing Note */}
      <div className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg border border-secondary/30">
        <Info className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          {pricingNote}
        </p>
      </div>
    </section>
  );
};

export default ServicePricing;
