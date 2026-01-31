import { CheckCircle, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const cities = [
  { name: "Seattle", primary: true, time: "Primary Location" },
  { name: "Bellevue", time: "15 min" },
  { name: "Redmond", time: "20 min" },
  { name: "Kirkland", time: "18 min" },
  { name: "Renton", time: "15 min" },
  { name: "Federal Way", time: "25 min" },
  { name: "Tacoma", time: "35 min" },
  { name: "Everett", time: "30 min" },
  { name: "Bothell", time: "22 min" },
  { name: "Sammamish", time: "25 min" },
  { name: "Issaquah", time: "20 min" },
  { name: "Mercer Island", time: "12 min" },
];

const ServiceAreas = () => {
  return (
    <section className="py-20 lg:py-28 bg-rhino-gray-light">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Service Coverage
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Serving Seattle & Surrounding Areas
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl">
            Professional home repairs within 40 miles of Seattle
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column - Map */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border">
            {/* Map Container */}
            <div className="relative h-[50vh] lg:h-[500px] bg-muted">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d344089.5587242702!2d-122.47872029614498!3d47.61312975603701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1706900000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rhino Construction Service Area - Seattle and surrounding areas"
                className="absolute inset-0"
              />
              
              {/* Service Radius Overlay */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full border-4 border-secondary/40 bg-secondary/10 animate-pulse" />
              </div>

              {/* Legend Badge */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg border border-border">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="font-medium text-foreground">40-mile service radius</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Cities List */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">Cities We Serve</h3>
                <p className="text-sm text-muted-foreground">King County & beyond</p>
              </div>
            </div>

            {/* Cities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {cities.map((city) => (
                <div
                  key={city.name}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    city.primary 
                      ? "bg-secondary/10 border border-secondary/30" 
                      : "bg-muted/50 hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                      city.primary ? "text-secondary" : "text-green-500"
                    }`} />
                    <span className={`font-medium ${
                      city.primary ? "text-secondary" : "text-foreground"
                    }`}>
                      {city.name}
                    </span>
                    {city.primary && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">
                        HQ
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{city.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* More Cities Note */}
            <div className="text-center text-muted-foreground text-sm mb-6 py-2 border-y border-border">
              + More cities throughout King County, Snohomish County & Pierce County
            </div>

            {/* Contact CTA */}
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium mb-1">
                    Don't see your city?
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Contact us - we may still serve your area!
                  </p>
                  <Button variant="default" size="sm" asChild>
                    <a href="/contact">Check Availability</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;
