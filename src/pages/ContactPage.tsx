import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { formatPhoneNumber } from "@/lib/validations";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  AlertTriangle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Star,
  MessageSquare,
  Calendar,
  FileText,
  CheckCircle,
  Shield,
  ExternalLink,
  Send,
  Loader2,
} from "lucide-react";

// Contact form schema
const contactPageSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone must be in format (XXX) XXX-XXXX"),
  service: z.string().optional(),
  heardFrom: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

type ContactFormData = z.infer<typeof contactPageSchema>;

const SERVICE_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "kitchen", label: "Kitchen Remodeling" },
  { value: "bathroom", label: "Bathroom Renovation" },
  { value: "roofing", label: "Roofing Services" },
  { value: "electrical", label: "Electrical Work" },
  { value: "plumbing", label: "Plumbing Services" },
  { value: "other", label: "Other" },
];

const HEARD_FROM_OPTIONS = [
  { value: "google", label: "Google Search" },
  { value: "social", label: "Social Media" },
  { value: "referral", label: "Friend/Family Referral" },
  { value: "previous", label: "Previous Customer" },
  { value: "advertisement", label: "Advertisement" },
  { value: "other", label: "Other" },
];

const FAQ_ITEMS = [
  {
    question: "What areas do you serve?",
    answer:
      "We serve Seattle and the surrounding areas within a 40-mile radius. This includes Bellevue, Tacoma, Everett, Renton, Kent, and many more communities.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes! We provide free, no-obligation estimates for all projects. Our team will assess your needs and provide a detailed quote within 24-48 hours.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. Rhino Construction is fully licensed (License #123456), bonded, and insured up to $2M for your complete peace of mind.",
  },
  {
    question: "What is your typical response time?",
    answer:
      "For quote requests, we respond within 4 hours during business hours. Email inquiries are answered within 24 hours. Emergency calls receive immediate attention 24/7.",
  },
  {
    question: "Do you offer financing options?",
    answer:
      "Yes, we offer flexible financing options for qualifying projects. Ask our team about payment plans during your consultation.",
  },
  {
    question: "What warranties do you provide?",
    answer:
      "We stand behind our work with comprehensive warranties. Most projects include a 2-year workmanship warranty, and we honor all manufacturer warranties on materials.",
  },
  {
    question: "Can you work on weekends?",
    answer:
      "We offer Saturday appointments from 8 AM to 4 PM. Sunday work can be arranged for emergency services or by special request.",
  },
];

const SOCIAL_LINKS = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

// ============================================
// HERO SECTION
// ============================================
const ContactHero = () => (
  <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
    <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-cover bg-center" />
    <div className="container mx-auto px-4 relative z-10 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
      <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
        We're here to help with your home repair needs
      </p>
    </div>
  </section>
);

// ============================================
// EMERGENCY BANNER
// ============================================
const EmergencyBanner = () => (
  <div className="bg-destructive text-destructive-foreground py-3">
    <div className="container mx-auto px-4 flex items-center justify-center gap-3 flex-wrap">
      <AlertTriangle className="h-5 w-5" />
      <span className="font-semibold">Need Emergency Service?</span>
      <a
        href={`tel:${COMPANY_INFO.emergency.replace(/\D/g, "")}`}
        className="font-bold underline hover:no-underline"
      >
        Call Now: {COMPANY_INFO.emergency}
      </a>
    </div>
  </div>
);

// ============================================
// CONTACT FORM
// ============================================
const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactPageSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      heardFrom: "",
      message: "",
    },
  });

  const messageValue = watch("message") || "";
  const messageLength = messageValue.length;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue("phone", formatted);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    reset();
  };

  if (isSubmitted) {
    return (
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground mb-4">
            Thank you for contacting Rhino Construction. We'll respond within 24
            hours.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            variant="outline"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Send Us a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="John Smith"
              {...register("fullName")}
              className={errors.fullName ? "border-destructive" : ""}
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(206) 555-1234"
              {...register("phone")}
              onChange={handlePhoneChange}
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Service Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="service">Service Interested In</Label>
            <Select onValueChange={(value) => setValue("service", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* How did you hear about us */}
          <div className="space-y-2">
            <Label htmlFor="heardFrom">How did you hear about us?</Label>
            <Select onValueChange={(value) => setValue("heardFrom", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {HEARD_FROM_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="message">
                Message <span className="text-destructive">*</span>
              </Label>
              <span
                className={`text-sm ${messageLength > 450 ? "text-amber-600" : "text-muted-foreground"} ${messageLength >= 500 ? "text-destructive" : ""}`}
              >
                {messageLength}/500
              </span>
            </div>
            <Textarea
              id="message"
              placeholder="Tell us about your project or question..."
              rows={5}
              {...register("message")}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          {/* Privacy Note */}
          <p className="text-sm text-muted-foreground text-center flex items-center justify-center gap-2">
            <Shield className="h-4 w-4" />
            Your information is secure and will only be used to respond to your
            inquiry.
          </p>

          {/* Quote Link */}
          <p className="text-center text-sm">
            Prefer to request a quote?{" "}
            <Link
              to={ROUTES.REQUEST_QUOTE}
              className="text-primary font-medium hover:underline"
            >
              Click here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

// ============================================
// CONTACT INFO SECTION
// ============================================
const ContactInfo = () => (
  <div className="space-y-6">
    {/* Office Location */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          Office Location
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <address className="not-italic text-muted-foreground">
          {COMPANY_INFO.address.street}
          <br />
          {COMPANY_INFO.address.city}, {COMPANY_INFO.address.state}{" "}
          {COMPANY_INFO.address.zip}
        </address>
        {/* Map Embed Placeholder */}
        <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden">
          <iframe
            title="Rhino Construction Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172055.9861179649!2d-122.45211751718383!3d47.61475992454509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C%20WA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
        >
          Get Directions <ExternalLink className="h-3 w-3" />
        </a>
      </CardContent>
    </Card>

    {/* Phone Numbers */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Phone className="h-5 w-5 text-primary" />
          Phone Numbers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Main Office</p>
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="text-lg font-semibold hover:text-primary transition-colors"
          >
            {COMPANY_INFO.phone}
          </a>
        </div>
        <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
          <p className="text-sm text-destructive font-medium">
            Emergency 24/7
          </p>
          <a
            href={`tel:${COMPANY_INFO.emergency.replace(/\D/g, "")}`}
            className="text-lg font-bold text-destructive hover:underline"
          >
            {COMPANY_INFO.emergency}
          </a>
        </div>
      </CardContent>
    </Card>

    {/* Email Addresses */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Mail className="h-5 w-5 text-primary" />
          Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-sm text-muted-foreground">General Inquiries</p>
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="text-primary hover:underline"
          >
            {COMPANY_INFO.email}
          </a>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Quote Requests</p>
          <a
            href="mailto:quotes@rhinoconstruction.com"
            className="text-primary hover:underline"
          >
            quotes@rhinoconstruction.com
          </a>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Customer Support</p>
          <a
            href="mailto:support@rhinoconstruction.com"
            className="text-primary hover:underline"
          >
            support@rhinoconstruction.com
          </a>
        </div>
      </CardContent>
    </Card>

    {/* Business Hours */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Business Hours
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Monday - Friday</span>
          <span className="font-medium">7:00 AM - 6:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Saturday</span>
          <span className="font-medium">8:00 AM - 4:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span>Sunday</span>
          <span className="text-muted-foreground">Closed</span>
        </div>
        <Badge variant="outline" className="mt-2">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Emergency services available 24/7
        </Badge>
      </CardContent>
    </Card>

    {/* Response Times */}
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <h4 className="font-semibold mb-3">Response Times</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Email inquiries</span>
            <span className="font-medium">Within 24 hours</span>
          </li>
          <li className="flex justify-between">
            <span>Quote requests</span>
            <span className="font-medium text-primary">Within 4 hours</span>
          </li>
          <li className="flex justify-between">
            <span>Emergency calls</span>
            <span className="font-medium text-destructive">Immediate</span>
          </li>
        </ul>
      </CardContent>
    </Card>

    {/* Social Media */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Connect With Us</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="p-3 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

// ============================================
// ALTERNATIVE CONTACT METHODS
// ============================================
const AlternativeContactMethods = () => (
  <section className="py-12 bg-muted/30">
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Other Ways to Reach Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Schedule a Call */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Schedule a Call</h3>
            <p className="text-muted-foreground mb-4">
              Prefer to talk? Choose a time that works for you.
            </p>
            <Button variant="outline" className="w-full">
              Book Appointment
            </Button>
          </CardContent>
        </Card>

        {/* Live Chat */}
        <Card className="text-center hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-muted-foreground mb-4">
              Chat with us now. Average response: 5 minutes.
            </p>
            <Button variant="outline" className="w-full">
              Start Chat
            </Button>
          </CardContent>
        </Card>

        {/* Request Quote */}
        <Card className="text-center hover:shadow-lg transition-shadow border-primary">
          <CardContent className="pt-6">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Request a Quote</h3>
            <p className="text-muted-foreground mb-4">
              Fast, free, no obligation estimates.
            </p>
            <Button asChild className="w-full">
              <Link to={ROUTES.REQUEST_QUOTE}>Get Free Quote</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);

// ============================================
// FAQ SECTION
// ============================================
const FAQSection = () => (
  <section className="py-12">
    <div className="container mx-auto px-4 max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Common Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

// ============================================
// TRUST INDICATORS
// ============================================
const TrustIndicators = () => (
  <section className="py-8 bg-muted/50">
    <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold text-sm">BBB Accredited</p>
            <p className="text-xs text-muted-foreground">A+ Rating</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="h-6 w-6 text-primary fill-primary" />
          <div>
            <p className="font-semibold text-sm">Google Reviews</p>
            <p className="text-xs text-muted-foreground">4.9/5 (500+ reviews)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold text-sm">Response Rate</p>
            <p className="text-xs text-muted-foreground">98% within 4 hours</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold text-sm">Customer Rating</p>
            <p className="text-xs text-muted-foreground">4.9/5 average</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ============================================
// VISIT US SECTION
// ============================================
const VisitUsSection = () => (
  <section className="py-12 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Prefer to Visit Us?</h2>
      <p className="text-lg opacity-90 mb-2">
        {COMPANY_INFO.address.street}, {COMPANY_INFO.address.city},{" "}
        {COMPANY_INFO.address.state} {COMPANY_INFO.address.zip}
      </p>
      <p className="opacity-80 mb-4">Free parking available • No appointment necessary for consultations</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="secondary" size="lg" asChild>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Get Directions
          </a>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          asChild
        >
          <a href={`tel:${COMPANY_INFO.phoneRaw}`}>
            <Phone className="mr-2 h-4 w-4" />
            Call Us
          </a>
        </Button>
      </div>
    </div>
  </section>
);

// ============================================
// MAIN PAGE COMPONENT
// ============================================
const ContactPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Rhino Construction",
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
    },
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Rhino Construction - Seattle Home Renovation</title>
        <meta
          name="description"
          content="Contact Rhino Construction for your home repair and renovation needs in Seattle. Call (206) 555-RHINO, email us, or fill out our contact form. 24/7 emergency service available."
        />
        <link rel="canonical" href="https://rhinoconstruction.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Navbar />
      <EmergencyBanner />
      <ContactHero />

      {/* Main Two-Column Layout */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <div>
              <ContactForm />
            </div>
            {/* Right Column - Contact Info */}
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <AlternativeContactMethods />
      <FAQSection />
      <TrustIndicators />
      <VisitUsSection />
      <Footer />
    </>
  );
};

export default ContactPage;
