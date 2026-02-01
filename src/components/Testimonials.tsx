import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  name: string;
  location: string;
  project: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote: "Rhino Construction transformed our outdated kitchen into a modern masterpiece. Professional, on-time, and within budget. Highly recommend!",
    name: "Sarah Johnson",
    location: "Seattle, WA",
    project: "Kitchen Remodeling",
    initials: "SJ",
  },
  {
    id: 2,
    rating: 5,
    quote: "Quick response to our emergency roof leak. The team was professional and the work quality exceeded expectations. Will definitely use again.",
    name: "Mike Chen",
    location: "Bellevue, WA",
    project: "Roof Repair",
    initials: "MC",
  },
  {
    id: 3,
    rating: 5,
    quote: "From quote to completion, the experience was seamless. They respected our home and timeline. Our bathroom looks amazing!",
    name: "Jennifer Martinez",
    location: "Redmond, WA",
    project: "Bathroom Renovation",
    initials: "JM",
  },
];

interface StarRatingProps {
  rating: number;
}

const StarRating = ({ rating }: StarRatingProps) => {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-5 h-5",
            i < rating ? "fill-secondary text-secondary" : "fill-muted text-muted"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-rotate
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-background to-muted/30" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            {t('testimonials.label')}
          </span>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Google Reviews Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 bg-card border border-border rounded-full px-5 py-3 shadow-sm">
            <svg viewBox="0 0 24 24" className="w-6 h-6" aria-label="Google">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <span className="font-bold text-foreground">4.9</span>
              <span className="text-muted-foreground text-sm">{t('testimonials.fromReviews')}</span>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Customer testimonials carousel"
        >
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 lg:gap-8">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)]"
                >
                  <div className="h-full bg-card rounded-2xl p-6 lg:p-8 shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
                    {/* Quote Icon */}
                    <div className="mb-4" aria-hidden="true">
                      <Quote className="w-10 h-10 text-secondary/20" />
                    </div>

                    {/* Rating */}
                    <div className="mb-4">
                      <StarRating rating={testimonial.rating} />
                    </div>

                    {/* Quote */}
                    <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Customer Info */}
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <span className="text-primary-foreground font-semibold">
                          {testimonial.initials}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>

                    {/* Project Type */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="inline-block text-xs font-semibold text-secondary uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full">
                        {testimonial.project}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-12 h-12 bg-card rounded-full shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors hidden md:flex"
            aria-label={t('testimonials.prev')}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-12 h-12 bg-card rounded-full shadow-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors hidden md:flex"
            aria-label={t('testimonials.next')}
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2 mt-8" role="tablist" aria-label="Testimonial slides">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                selectedIndex === index
                  ? "bg-secondary w-8"
                  : "bg-border hover:bg-muted-foreground"
              )}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Read More Link */}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-secondary transition-colors font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('testimonials.readMore')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
