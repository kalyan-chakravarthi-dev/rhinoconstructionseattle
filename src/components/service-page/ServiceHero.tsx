import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO, ROUTES } from '@/lib/constants';
import { useState, useEffect } from 'react';

interface ServiceHeroProps {
  name: string;
  tagline: string;
  heroImage: string;
  backgroundImages?: string[];
}

const ServiceHero = ({ name, tagline, heroImage, backgroundImages }: ServiceHeroProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = backgroundImages && backgroundImages.length > 1 ? backgroundImages : [heroImage];
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <section 
      className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
      aria-label={`${name} hero section`}
    >
      {/* Background images with crossfade */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url(${image})`,
            opacity: index === currentImageIndex ? 1 : 0,
          }}
          aria-hidden="true"
        />
      ))}
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      
      <div className="relative z-10 container mx-auto px-4 text-center text-white py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
          {tagline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
          >
            <Link to={ROUTES.REQUEST_QUOTE}>Get Free Quote</Link>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-foreground font-semibold px-8"
          >
            <a href={`tel:${COMPANY_INFO.phoneRaw}`}>
              <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
              Call: {COMPANY_INFO.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
