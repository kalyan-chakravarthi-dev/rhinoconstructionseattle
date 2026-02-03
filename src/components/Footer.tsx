import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import rhinoLogo from "@/assets/rhino-logo-footer-white.png";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('nav.home'), href: ROUTES.HOME },
    { label: t('nav.services'), href: "/services" },
    { label: t('nav.beforeAfter'), href: ROUTES.GALLERY },
    { label: t('nav.about'), href: "/about" },
    { label: t('footer.blog'), href: "/blog" },
    { label: t('nav.contact'), href: "/contact" },
    { label: t('footer.privacy'), href: "/privacy" },
    { label: t('footer.terms'), href: "/terms" },
  ];

  const services = [
    { label: "Kitchen Remodeling", href: "/services/kitchen-remodeling" },
    { label: "Bathroom Renovation", href: "/services/bathroom-renovation" },
    { label: "Roofing Services", href: "/services/roofing" },
    { label: "Electrical Work", href: "/services/electrical" },
    { label: "Plumbing", href: "/services/plumbing" },
    { label: "General Repairs", href: "/services/general-repairs" },
    { label: t('footer.emergency'), href: "/services/emergency" },
  ];

  return (
    <footer className="bg-foreground text-muted">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 - Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center mb-4">
              <img 
                src={rhinoLogo} 
                alt="Rhino Remodeler" 
                className="h-20 sm:h-24 lg:h-28 w-auto"
              />
            </Link>

            {/* Tagline */}
            <p className="text-secondary font-medium mb-3">
              {t('footer.tagline')}
            </p>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-muted-foreground/20 hover:bg-secondary flex items-center justify-center transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-background font-semibold text-lg mb-5">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-background font-semibold text-lg mb-5">{t('footer.ourServices')}</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    to={service.href}
                    className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 className="text-background font-semibold text-lg mb-5">{t('footer.getInTouch')}</h4>
            <ul className="space-y-4">
              {/* Phone */}
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="text-background hover:text-secondary transition-colors font-medium"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-muted-foreground hover:text-secondary transition-colors text-sm break-all"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>

              {/* Address */}
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground text-sm">
                  {COMPANY_INFO.address.street}<br />
                  {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state} {COMPANY_INFO.address.zip}
                </span>
              </li>

              {/* Hours */}
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground text-sm">
                  {t('footer.hours.weekdays')}<br />
                  {t('footer.hours.saturday')}
                </span>
              </li>

            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-muted-foreground/20">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright & License */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-muted-foreground text-center sm:text-left">
              <span>© {currentYear} {COMPANY_INFO.name}. {t('footer.rights')}</span>
              <span className="hidden sm:inline">|</span>
              <span>{t('footer.licensedBonded')} | {t('footer.license')} {COMPANY_INFO.license}</span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground mr-2">{t('footer.weAccept')}</span>
              {/* Visa */}
              <div className="w-10 h-6 bg-background rounded flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-8 h-4" aria-label="Visa">
                  <path fill="#1565C0" d="M45 35c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V13c0-2.2 1.8-4 4-4h34c2.2 0 4 1.8 4 4v22z"/>
                  <path fill="#FFF" d="M15.2 29l1.7-10.5h2.7L17.9 29h-2.7zm13.5-10.5l-2.6 7.2-.3-1.5-.9-4.6c-.2-.6-.6-.9-1.2-1h-4.2l-.1.3c1 .3 2 .7 2.6 1.1l2.2 8.5h2.8l4.3-10h-2.6zm4.5 10.5h2.5l-2.2-10.5h-2.2c-.5 0-1 .3-1.2.8l-4 9.7h2.8l.6-1.6h3.4l.3 1.6zm-2.9-3.8l1.4-3.9.8 3.9h-2.2zM22.8 20.2l.4-2.3c-.8-.3-1.6-.5-2.5-.5-1.4 0-2.8.6-2.8 2.1 0 1.4 1.8 1.8 2.7 2.3.6.3.6.5.6.7 0 .4-.5.6-1 .6-.7 0-1.7-.3-2.4-.5l-.4 2.3c.6.2 1.6.5 2.7.5 2 0 3.2-.9 3.2-2.3 0-1.7-2.7-2-2.7-2.7 0-.3.3-.5.9-.5.5 0 1.1.1 1.3.3z"/>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="w-10 h-6 bg-background rounded flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-8 h-4" aria-label="Mastercard">
                  <path fill="#3F51B5" d="M45 35c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V13c0-2.2 1.8-4 4-4h34c2.2 0 4 1.8 4 4v22z"/>
                  <circle fill="#FFC107" cx="30" cy="24" r="10"/>
                  <circle fill="#FF3D00" cx="18" cy="24" r="10"/>
                  <path fill="#FF9800" d="M24 17.2c-2.3 1.7-3.8 4.5-3.8 7.5s1.5 5.8 3.8 7.5c2.3-1.7 3.8-4.5 3.8-7.5s-1.5-5.8-3.8-7.5z"/>
                </svg>
              </div>
              {/* Amex */}
              <div className="w-10 h-6 bg-background rounded flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-8 h-4" aria-label="American Express">
                  <path fill="#1976D2" d="M45 35c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V13c0-2.2 1.8-4 4-4h34c2.2 0 4 1.8 4 4v22z"/>
                  <path fill="#FFF" d="M22 20l-2 8h-2l2-8h2zm8 0v1.3l-.2-.3c-.2-.5-.7-1-1.6-1h-2l-2 8h2l1-4h.6c.4 0 .6.1.7.3l.2.3.8 3.4h2l-1-4c-.1-.4-.3-.7-.5-.9.5-.3.9-.7 1.2-1.4l.8-1.7h-2zm-12-1l-3 10h7l.4-1.5h-4.5l.5-2h4l.4-1.5h-4l.5-2h4.5l.4-1.5h-6.2l-.5 1.5-1 3z"/>
                </svg>
              </div>
              {/* Discover */}
              <div className="w-10 h-6 bg-background rounded flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-8 h-4" aria-label="Discover">
                  <path fill="#E65100" d="M45 35c0 2.2-1.8 4-4 4H7c-2.2 0-4-1.8-4-4V13c0-2.2 1.8-4 4-4h34c2.2 0 4 1.8 4 4v22z"/>
                  <circle fill="#FFF" cx="30" cy="24" r="8"/>
                  <path fill="#E65100" d="M30 18c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
