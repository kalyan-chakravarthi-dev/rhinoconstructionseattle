import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            Get a free, no-obligation estimate for your construction or repair project. Our team is ready to help bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl">
              Request Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Button>
            <a
              href="tel:+12065551234"
              className="inline-flex items-center gap-2 text-primary-foreground font-medium hover:text-secondary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <span>Or call (206) 555-1234</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
