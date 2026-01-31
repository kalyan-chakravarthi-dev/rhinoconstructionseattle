import { Link } from 'react-router-dom';
import { Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO, ROUTES } from '@/lib/constants';

interface ServiceBottomCTAProps {
  serviceName: string;
}

const ServiceBottomCTA = ({ serviceName }: ServiceBottomCTAProps) => {
  const benefits = [
    '100% Free, No-Obligation Quote',
    'Same-Day Response Guaranteed',
    'Transparent Pricing',
  ];

  return (
    <section 
      className="py-16 bg-primary text-primary-foreground"
      aria-labelledby="bottom-cta-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 
            id="bottom-cta-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Start Your {serviceName}?
          </h2>
          
          <p className="text-lg text-primary-foreground/90 mb-6">
            Get your free estimate today and take the first step toward your dream home.
          </p>
          
          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {benefits.map((benefit) => (
              <div 
                key={benefit}
                className="flex items-center gap-2 text-sm"
              >
                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
            >
              <Link to={ROUTES.REQUEST_QUOTE}>
                Get Your Free Quote
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-8"
            >
              <a href={`tel:${COMPANY_INFO.phoneRaw}`}>
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                {COMPANY_INFO.phone}
              </a>
            </Button>
          </div>
          
          <p className="mt-6 text-sm text-primary-foreground/70">
            Licensed & Insured • {COMPANY_INFO.license} • Serving {COMPANY_INFO.address.city} & Surrounding Areas
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceBottomCTA;
