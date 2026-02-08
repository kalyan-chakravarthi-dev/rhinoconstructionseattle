import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Check, 
  CreditCard, 
  AlertTriangle,
  Phone,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPANY_INFO, ROUTES } from '@/lib/constants';
import { getRelatedServices, type ServiceData } from '@/data/services';

interface ServiceSidebarProps {
  currentService: ServiceData;
}

const QuickQuoteForm = () => {
  return (
    <Card className="border-primary/20 shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-lg">Get a Free Quote</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4">
        <div>
          <Label htmlFor="sidebar-name">Name *</Label>
          <Input id="sidebar-name" placeholder="Your name" />
        </div>
        <div>
          <Label htmlFor="sidebar-email">Email *</Label>
          <Input id="sidebar-email" type="email" placeholder="your@email.com" />
        </div>
        <div>
          <Label htmlFor="sidebar-phone">Phone</Label>
          <Input id="sidebar-phone" type="tel" placeholder="(206) 555-1234" />
        </div>
        <div>
          <Label htmlFor="sidebar-message">Project Details</Label>
          <Textarea 
            id="sidebar-message" 
            placeholder="Tell us about your project..."
            rows={3}
          />
        </div>
        <Button className="w-full" size="lg">
          Get Free Quote
          <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          We'll respond within 4 hours
        </p>
      </CardContent>
    </Card>
  );
};

const ServiceAreas = () => {
  const cities = ['Seattle', 'Bellevue', 'Kirkland', 'Redmond', 'Bothell', 'Shoreline'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
          Service Areas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          Serving Seattle & {COMPANY_INFO.serviceRadius}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {cities.map((city) => (
            <span 
              key={city}
              className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
            >
              {city}
            </span>
          ))}
        </div>
        <Link 
          to={ROUTES.CONTACT}
          className="text-sm text-primary hover:underline"
        >
          Check if we serve your area →
        </Link>
      </CardContent>
    </Card>
  );
};

const WhyChooseUs = () => {
  const reasons = [
    'Licensed & Insured',
    '10+ Years Experience',
    'Free Estimates',
    'Quality Guarantee',
    'On-Time Completion',
    'Transparent Pricing',
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Why Choose Us</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {reasons.map((reason) => (
            <li key={reason} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-muted-foreground">{reason}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const RelatedServices = ({ currentSlug }: { currentSlug: string }) => {
  const related = getRelatedServices(currentSlug);
  
  if (related.length === 0) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Related Services</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {related.map((service) => (
            <li key={service.slug}>
              <Link 
                to={`/services/${service.slug}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

const FinancingOptions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-primary" aria-hidden="true" />
          Financing Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          Flexible Payment Plans Available
        </p>
        <Button variant="outline" className="w-full mb-2" asChild>
          <Link to={ROUTES.CONTACT}>Apply Now</Link>
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          Major credit cards accepted
        </p>
      </CardContent>
    </Card>
  );
};

const EmergencyContact = () => {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-destructive" aria-hidden="true" />
          <span className="font-semibold text-destructive">Need Emergency Service?</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          We're available 24/7 for emergencies
        </p>
        <Button 
          variant="destructive" 
          className="w-full"
          asChild
        >
          <a href={`tel:${COMPANY_INFO.phoneRaw}`}>
            <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
            {COMPANY_INFO.emergency}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

const ServiceSidebar = ({ currentService }: ServiceSidebarProps) => {
  return (
    <aside className="space-y-6 lg:sticky lg:top-6">
      <ServiceAreas />
      <WhyChooseUs />
      <RelatedServices currentSlug={currentService.slug} />
      <FinancingOptions />
      <EmergencyContact />
    </aside>
  );
};

export default ServiceSidebar;
