import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Phone, 
  ArrowRight, 
  Check, 
  Shield, 
  Award, 
  Clock, 
  Users,
  MapPin,
  Star,
  Gift,
  ChevronRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { COMPANY_INFO, ROUTES } from '@/lib/constants';
import { SERVICES_OVERVIEW, PROCESS_STEPS, SPECIAL_OFFERS } from '@/data/services-overview';

// Hero Section
const ServicesHero = () => (
  <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 lg:py-28">
    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center" aria-hidden="true" />
    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Professional Home Repair & Renovation Services
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4">
          Expert craftsmanship for every room in your home
        </p>
        <div className="flex items-center justify-center gap-2 text-primary-foreground/80 mb-8">
          <MapPin className="w-5 h-5" aria-hidden="true" />
          <span>Serving Seattle and surrounding areas</span>
        </div>
        <Button 
          asChild 
          size="lg"
          className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
        >
          <Link to={ROUTES.REQUEST_QUOTE}>
            Get Free Quote
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

// Trust Badges Section
const TrustBadges = () => {
  const badges = [
    { icon: Shield, label: 'Licensed & Insured', value: 'Full Coverage' },
    { icon: Award, label: 'Experience', value: '20+ Years' },
    { icon: Users, label: 'Completed Projects', value: '1,000+' },
    { icon: Star, label: 'Customer Rating', value: '4.9/5 Stars' },
  ];

  return (
    <section className="py-12 bg-muted/50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-lg text-muted-foreground">
            At Rhino Remodeler, we're committed to delivering exceptional quality and service on every project. 
            From minor repairs to major renovations, our team of skilled professionals brings expertise, 
            reliability, and attention to detail to your home improvement needs.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {badges.map(({ icon: Icon, label, value }) => (
            <div 
              key={label}
              className="flex flex-col items-center text-center p-4 bg-background rounded-lg border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <span className="font-bold text-foreground">{value}</span>
              <span className="text-sm text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Service Card Component
const ServiceCard = ({ service }: { service: typeof SERVICES_OVERVIEW[0] }) => {
  const Icon = service.icon;
  
  return (
    <Card 
      className={`h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        service.isEmergency 
          ? 'border-destructive/50 bg-destructive/5' 
          : 'border-border hover:border-primary/30'
      }`}
    >
      <CardHeader className="text-center pb-2">
        <div 
          className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
            service.isEmergency 
              ? 'bg-destructive/10' 
              : 'bg-primary/10'
          }`}
        >
          <Icon 
            className={`w-8 h-8 ${service.isEmergency ? 'text-destructive' : 'text-primary'}`} 
            aria-hidden="true" 
          />
        </div>
        <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
        {service.isEmergency && (
          <span className="inline-block px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded-full">
            24/7 Available
          </span>
        )}
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-center mb-4">
          {service.description}
        </p>
        
        <div className="text-center mb-4">
          <span className={`font-semibold ${service.isEmergency ? 'text-destructive' : 'text-primary'}`}>
            {service.startingPrice}
          </span>
        </div>
        
        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm">
              <Check 
                className={`w-4 h-4 flex-shrink-0 ${
                  service.isEmergency ? 'text-destructive' : 'text-primary'
                }`} 
                aria-hidden="true" 
              />
              <span className="text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-2 pt-4">
        <Button 
          asChild 
          className="w-full"
          variant={service.isEmergency ? 'destructive' : 'default'}
        >
          <Link to={`/services/${service.slug}`}>
            Learn More
            <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to={ROUTES.REQUEST_QUOTE}>Get Quote</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Services Grid Section
const ServicesGrid = () => (
  <section className="py-16 bg-background" aria-labelledby="services-grid-heading">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 id="services-grid-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Our Services
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          From quick repairs to complete renovations, we have the expertise to handle any project
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_OVERVIEW.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* See Our Work CTA */}
      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto border-secondary/30 bg-gradient-to-br from-secondary/5 to-secondary/10">
          <CardContent className="py-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
                <Star className="w-7 h-7 text-secondary" aria-hidden="true" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">See Our Work in Action</h3>
                <p className="text-muted-foreground mb-4">
                  Browse our before & after gallery to see the quality of our craftsmanship
                </p>
              </div>
              <Button asChild variant="default" size="lg">
                <Link to={ROUTES.GALLERY} className="inline-flex items-center gap-2">
                  View Before & After Gallery
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// Comparison Table Section
const ComparisonTable = () => (
  <section className="py-16 bg-muted/30" aria-labelledby="comparison-heading">
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 id="comparison-heading" className="text-3xl font-bold text-foreground mb-4">
          Not Sure Which Service You Need?
        </h2>
        <p className="text-muted-foreground">
          Compare our services to find the right fit for your project
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Service</TableHead>
              <TableHead>Best For</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Price Range</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SERVICES_OVERVIEW.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">
                  <Link 
                    to={`/services/${service.slug}`}
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <service.icon className="w-4 h-4" aria-hidden="true" />
                    {service.name}
                  </Link>
                </TableCell>
                <TableCell className="text-muted-foreground">{service.bestFor}</TableCell>
                <TableCell className="text-muted-foreground">{service.timeline}</TableCell>
                <TableCell className="font-medium">{service.priceRange}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </section>
);

// Process Section
const ProcessSection = () => (
  <section className="py-16 bg-background" aria-labelledby="process-heading">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 id="process-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-lg text-muted-foreground">
          Our simple 5-step process makes home improvement stress-free
        </p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-4">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector line */}
              {index < PROCESS_STEPS.length - 1 && (
                <div 
                  className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border"
                  aria-hidden="true"
                />
              )}
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl mb-4">
                  {step.icon}
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  Step {step.step}: {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Special Offers Section
const SpecialOffers = () => (
  <section className="py-12 bg-secondary/10" aria-labelledby="offers-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Gift className="w-6 h-6 text-secondary" aria-hidden="true" />
          <h2 id="offers-heading" className="text-2xl font-bold text-foreground">
            Special Offers
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          {SPECIAL_OFFERS.map((offer) => (
            <div 
              key={offer.title}
              className={`p-5 rounded-lg border ${
                offer.highlight 
                  ? 'bg-secondary/20 border-secondary' 
                  : 'bg-background border-border'
              }`}
            >
              <h3 className={`font-bold mb-2 ${offer.highlight ? 'text-secondary' : 'text-foreground'}`}>
                {offer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {offer.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Service Area Section
const ServiceAreaSection = () => {
  const cities = ['Seattle', 'Bellevue', 'Kirkland', 'Redmond', 'Bothell', 'Shoreline', 'Issaquah', 'Renton'];
  
  return (
    <section className="py-16 bg-muted/30" aria-labelledby="service-area-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
            <h2 id="service-area-heading" className="text-2xl font-bold text-foreground">
              Service Area
            </h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-6">
            Serving Seattle & 40 miles radius
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {cities.map((city) => (
              <span 
                key={city}
                className="px-3 py-1 bg-background rounded-full text-sm text-muted-foreground border border-border"
              >
                {city}
              </span>
            ))}
            <span className="px-3 py-1 bg-primary/10 rounded-full text-sm text-primary font-medium">
              + More
            </span>
          </div>
          
          <Link 
            to={ROUTES.CONTACT}
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            Check if we serve your area
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Bottom CTA Section
const BottomCTA = () => (
  <section className="py-16 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8">
          Free estimates, no obligation. Let us bring your vision to life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button 
            asChild 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
          >
            <Link to={ROUTES.REQUEST_QUOTE}>
              Request Free Quote
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
        
        <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80">
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4" aria-hidden="true" />
            Free Estimates
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4" aria-hidden="true" />
            No Obligation
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-4 h-4" aria-hidden="true" />
            Same-Day Response
          </span>
        </div>
      </div>
    </div>
  </section>
);

// Main Services Page Component
const ServicesPage = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Home Repair & Renovation Services',
    description: 'Professional home repair and renovation services in Seattle',
    itemListElement: SERVICES_OVERVIEW.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: {
          '@type': 'LocalBusiness',
          name: COMPANY_INFO.name,
        },
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Services | {COMPANY_INFO.name} - Seattle Home Repair & Renovation</title>
        <meta 
          name="description" 
          content="Professional home repair and renovation services in Seattle. Kitchen remodeling, bathroom renovation, roofing, electrical, plumbing, and more. Licensed & insured. Free estimates!" 
        />
        <meta 
          name="keywords" 
          content="home repair Seattle, renovation services, kitchen remodeling, bathroom renovation, roofing, electrical, plumbing, handyman" 
        />
        <link rel="canonical" href="https://rhinoremodeler.com/services" />
        
        <meta property="og:title" content={`Services | ${COMPANY_INFO.name}`} />
        <meta property="og:description" content="Professional home repair and renovation services in Seattle. Free estimates!" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main id="main-content" className="flex-1">
          <ServicesHero />
          <TrustBadges />
          <ServicesGrid />
          <ComparisonTable />
          <ProcessSection />
          <SpecialOffers />
          <ServiceAreaSection />
          <BottomCTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ServicesPage;
