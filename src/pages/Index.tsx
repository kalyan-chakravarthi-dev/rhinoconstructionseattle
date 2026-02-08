import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { COMPANY_INFO } from "@/lib/constants";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: COMPANY_INFO.name,
  description: "Seattle's premier home remodeling company. Kitchen remodeling, bathroom renovation, roofing, electrical, plumbing, painting, flooring, and general repairs.",
  url: "https://rhinoremodeler.com",
  telephone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY_INFO.address.street,
    addressLocality: COMPANY_INFO.address.city,
    addressRegion: COMPANY_INFO.address.state,
    postalCode: COMPANY_INFO.address.zip,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.3885,
    longitude: -122.2365,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "08:00",
      closes: "16:00",
    },
  ],
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 47.6062,
      longitude: -122.3321,
    },
    geoRadius: "64000",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
    bestRating: "5",
  },
  priceRange: "$$",
  image: "https://rhinoremodeler.com/assets/rhino-logo-new.png",
  sameAs: [
    "https://www.facebook.com/rhinoremodeler",
    "https://www.instagram.com/rhinoremodeler",
  ],
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>{COMPANY_INFO.name} | Seattle Home Remodeling & Repair Experts</title>
        <meta
          name="description"
          content="Seattle's trusted home remodeling experts. Kitchen remodeling, bathroom renovation, roofing, electrical, plumbing, and more. Licensed & insured. Free estimates!"
        />
        <link rel="canonical" href="https://rhinoremodeler.com/" />
        <meta property="og:title" content={`${COMPANY_INFO.name} | Seattle Home Remodeling`} />
        <meta property="og:description" content="Seattle's trusted home renovation experts since 2015. 10+ years, 100+ projects, 50+ 5-star reviews." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rhinoremodeler.com/" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <BeforeAfterGallery />
        <Testimonials />
        <ServiceAreas />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
};

export default Index;
