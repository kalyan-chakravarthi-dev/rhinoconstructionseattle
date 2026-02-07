import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  ServiceHero,
  ServiceBreadcrumb,
  ServiceOverview,
  ServiceOfferings,
  ServiceProcess,
  ServiceMaterials,
  ServicePricing,
  ServiceTestimonials,
  ServiceFAQ,
  ServiceSidebar,
  ServiceBottomCTA,
} from '@/components/service-page';
import { getServiceBySlug } from '@/data/services';
import { COMPANY_INFO } from '@/lib/constants';

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Get service data
  const service = slug ? getServiceBySlug(slug) : undefined;
  
  // Redirect to 404 if service not found
  if (!service) {
    return <Navigate to="/404" replace />;
  }

  // JSON-LD structured data for this service
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.metaDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY_INFO.name,
      telephone: COMPANY_INFO.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.zip,
      },
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 47.6062,
        longitude: -122.3321,
      },
      geoRadius: '40 miles',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Services`,
      itemListElement: service.offerings.map((offering, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offering.title,
          description: offering.description,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <>
      <Helmet>
        <title>{service.name} | {COMPANY_INFO.name} - Seattle</title>
        <meta name="description" content={service.metaDescription} />
        <meta name="keywords" content={service.keywords.join(', ')} />
        <link rel="canonical" href={`https://rhinoremodeler.com/services/${service.slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${service.name} | ${COMPANY_INFO.name}`} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://rhinoremodeler.com/services/${service.slug}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <ServiceHero 
            name={service.name}
            tagline={service.tagline}
            heroImage={service.heroImage}
            backgroundImages={service.heroBackgroundImages}
          />
          
          {/* Breadcrumb */}
          <ServiceBreadcrumb serviceName={service.name} />
          
          {/* Overview Section */}
          <ServiceOverview 
            introduction={service.introduction}
            whyChooseUs={service.whyChooseUs}
          />
          
          {/* Two-Column Layout */}
          <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <ServiceOfferings 
                    offerings={service.offerings}
                    serviceName={service.name}
                  />
                  
                  <ServiceProcess steps={service.process} />
                  
                  <ServiceMaterials materials={service.materials} />
                  
                  <ServicePricing 
                    pricing={service.pricing}
                    pricingNote={service.pricingNote}
                  />
                  
                  <ServiceTestimonials 
                    testimonials={service.testimonials}
                    serviceName={service.name}
                  />
                  
                  <ServiceFAQ 
                    faqs={service.faqs}
                    serviceName={service.name}
                  />
                </div>
                
                {/* Right Column - Sidebar */}
                <div className="lg:col-span-1 order-1 lg:order-2">
                  <ServiceSidebar currentService={service} />
                </div>
              </div>
            </div>
          </section>
          
          {/* Bottom CTA */}
          <ServiceBottomCTA serviceName={service.name} />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ServicePage;
