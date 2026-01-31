import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/data/services';

interface ServiceTestimonialsProps {
  testimonials: Testimonial[];
  serviceName: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

const ServiceTestimonials = ({ testimonials, serviceName }: ServiceTestimonialsProps) => {
  return (
    <section className="mb-12" aria-labelledby="testimonials-heading">
      <h2 id="testimonials-heading" className="text-2xl font-bold text-foreground mb-6">
        Customer Testimonials
      </h2>
      
      <div className="space-y-4">
        {testimonials.map((testimonial, index) => (
          <article 
            key={index}
            className="bg-muted/30 rounded-lg p-5 border border-border relative"
          >
            <Quote 
              className="absolute top-4 right-4 w-8 h-8 text-primary/10" 
              aria-hidden="true"
            />
            
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.location}</p>
              </div>
            </div>
            
            <StarRating rating={testimonial.rating} />
            
            <p className="mt-3 text-muted-foreground italic">
              "{testimonial.text}"
            </p>
            
            {testimonial.projectType && (
              <p className="mt-2 text-xs text-primary font-medium">
                Project: {testimonial.projectType}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default ServiceTestimonials;
