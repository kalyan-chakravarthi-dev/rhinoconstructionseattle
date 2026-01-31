import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-black text-xl">R</span>
              </div>
              <div>
                <span className="font-bold text-xl text-background">Rhino</span>
                <span className="font-medium text-xl text-background/80 ml-1">Construction</span>
              </div>
            </div>
            <p className="text-background/70 mb-4">
              Building trust, one project at a time. Seattle's trusted partner for quality construction and home repair services.
            </p>
            <p className="text-sm text-background/50">
              Licensed • Bonded • Insured
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Services", "About Us", "Projects", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-background/70 hover:text-secondary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-3">
              {["Home Renovations", "New Construction", "Structural Repairs", "Interior Finishing", "Commercial Projects"].map((service) => (
                <li key={service}>
                  <a href="#services" className="text-background/70 hover:text-secondary transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-background/70">
                  1234 Construction Way<br />
                  Seattle, WA 98101
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="tel:+12065551234" className="text-background/70 hover:text-secondary transition-colors">
                  (206) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <a href="mailto:info@rhinoconstruction.com" className="text-background/70 hover:text-secondary transition-colors">
                  info@rhinoconstruction.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-background/70">
                  Mon - Fri: 7:00 AM - 6:00 PM<br />
                  Sat: 8:00 AM - 4:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
            <p>© {currentYear} Rhino Construction. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
