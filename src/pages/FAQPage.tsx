import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search, Phone, Mail, HelpCircle, DollarSign, Calendar, CreditCard, Shield, AlertTriangle, Wrench, ChevronRight, MessageCircle, FileText, Image, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COMPANY_INFO, ROUTES } from "@/lib/constants";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  questions: FAQItem[];
}

const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "general",
    name: "General Questions",
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        question: "What areas do you serve?",
        answer: "We proudly serve Seattle and all areas within a 40-mile radius, including Bellevue, Redmond, Kirkland, Renton, Tacoma, Everett, and surrounding King County cities. If you're unsure whether we serve your area, please contact us!"
      },
      {
        question: "Are you licensed and insured?",
        answer: "Yes! Rhino Remodeler is fully licensed (License #RHINOC*123AB), bonded, and insured. We carry $2 million in liability insurance for your peace of mind."
      },
      {
        question: "How long have you been in business?",
        answer: "We've been serving the Seattle community since 2003 - over 20 years of quality home repair and renovation experience."
      },
      {
        question: "Do you offer free estimates?",
        answer: "Absolutely! We provide free, no-obligation quotes for all services. Simply request a quote through our website or give us a call."
      }
    ]
  },
  {
    id: "services",
    name: "Services & Pricing",
    icon: <Wrench className="h-5 w-5" />,
    questions: [
      {
        question: "What services do you offer?",
        answer: "We offer comprehensive home repair and renovation services including kitchen remodeling, bathroom renovation, roofing, electrical work, plumbing, general repairs, painting, flooring, and more. View our full services page for details."
      },
      {
        question: "How much does a typical project cost?",
        answer: "Costs vary significantly based on project scope, materials, and size. Here are general ranges:\n\n• Minor repairs: $150 - $1,000\n• Medium projects: $5,000 - $20,000\n• Major renovations: $20,000 - $75,000+\n\nContact us for a detailed, customized quote."
      },
      {
        question: "Do you charge for consultations?",
        answer: "Initial consultations and quotes are completely free. We'll visit your property, assess your needs, and provide a detailed estimate at no cost."
      },
      {
        question: "Can I get a quote without a site visit?",
        answer: "For some simple repairs, we can provide rough estimates based on photos and descriptions you submit through our quote request form. However, for accurate pricing on larger projects, we recommend a site visit."
      }
    ]
  },
  {
    id: "quote",
    name: "Quote & Booking",
    icon: <FileText className="h-5 w-5" />,
    questions: [
      {
        question: "How long does it take to receive a quote?",
        answer: "We typically respond to quote requests within 2-4 business hours. For emergency services, we respond immediately."
      },
      {
        question: "How do I request a quote?",
        answer: "You can request a quote through our website's quote request form, call us directly, or email us. Our online form allows you to upload photos of your project for more accurate estimates."
      },
      {
        question: "What information do I need to provide for a quote?",
        answer: "The more details you provide, the better! Include:\n\n• Type of service needed\n• Project location and scope\n• Photos of the area\n• Your timeline and budget\n• Any specific requirements"
      },
      {
        question: "How long are quotes valid?",
        answer: "Our quotes are typically valid for 30 days. If you need more time to decide, just let us know!"
      }
    ]
  },
  {
    id: "timeline",
    name: "Project Timeline",
    icon: <Calendar className="h-5 w-5" />,
    questions: [
      {
        question: "How long does a typical kitchen remodel take?",
        answer: "Kitchen remodels typically take 3-6 weeks depending on the scope. Minor updates may take 1-2 weeks, while complete renovations can take 6-8 weeks."
      },
      {
        question: "Can I stay in my home during renovation?",
        answer: "For most projects, yes! We work to minimize disruption. For kitchen or bathroom remodels, we'll discuss temporary arrangements for those spaces."
      },
      {
        question: "Do you work weekends?",
        answer: "Our standard hours are Monday-Friday 7am-6pm, Saturday 8am-4pm. For ongoing projects, weekend work can sometimes be arranged. Emergency services are available 24/7."
      },
      {
        question: "What if my project takes longer than expected?",
        answer: "We provide realistic timelines and keep you updated throughout. If delays occur, we communicate immediately and work to get back on schedule."
      }
    ]
  },
  {
    id: "payment",
    name: "Payment & Financing",
    icon: <CreditCard className="h-5 w-5" />,
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept cash, checks, all major credit cards (Visa, Mastercard, Amex, Discover), and offer financing options through approved lenders."
      },
      {
        question: "Do you require a deposit?",
        answer: "For larger projects, we typically require a deposit (usually 30-50%) to secure materials and schedule. Terms are outlined in your contract."
      },
      {
        question: "Do you offer financing?",
        answer: "Yes! We partner with financing companies to offer flexible payment plans. Ask about current financing offers when requesting your quote."
      },
      {
        question: "When is final payment due?",
        answer: "Final payment is due upon project completion and your satisfaction. We walk through the finished work together before final payment."
      }
    ]
  },
  {
    id: "warranty",
    name: "Warranties & Guarantees",
    icon: <Shield className="h-5 w-5" />,
    questions: [
      {
        question: "Do you warranty your work?",
        answer: "Yes! We provide a workmanship warranty on all projects. Specific terms vary by project type and are detailed in your contract. Manufacturer warranties apply to materials and equipment."
      },
      {
        question: "What if I'm not satisfied with the work?",
        answer: "Your satisfaction is our priority. If you're not happy, we'll work with you to make it right. We don't consider a job complete until you're 100% satisfied."
      },
      {
        question: "Do you handle permits?",
        answer: "Yes, we obtain all necessary permits for your project. Permit costs are included in your quote."
      },
      {
        question: "What happens if something goes wrong after the project?",
        answer: "Contact us immediately! Our warranty covers any workmanship issues. We'll schedule a visit to assess and fix the problem at no additional cost within the warranty period."
      }
    ]
  },
  {
    id: "emergency",
    name: "Emergency Services",
    icon: <AlertTriangle className="h-5 w-5" />,
    questions: [
      {
        question: "Do you offer emergency services?",
        answer: "Yes! We provide 24/7 emergency services for urgent repairs like plumbing leaks, electrical issues, storm damage, and more."
      },
      {
        question: "How quickly can you respond to emergencies?",
        answer: "We aim to respond to emergency calls within 1-2 hours, often sooner depending on location and availability."
      },
      {
        question: "Is there an extra charge for emergency services?",
        answer: "Emergency services may have different rates due to after-hours response. We'll discuss costs upfront before beginning work."
      },
      {
        question: "What qualifies as an emergency?",
        answer: "Emergencies include:\n\n• Active water leaks or flooding\n• Electrical hazards or outages\n• Gas leaks (call 911 first)\n• Storm damage compromising home safety\n• Broken heating in winter\n• Security issues (broken doors/windows)"
      }
    ]
  }
];

const HELPFUL_TIPS = [
  {
    title: "Clear the Work Area",
    description: "Remove personal items, furniture, and valuables from the project area before work begins."
  },
  {
    title: "Secure Pets & Children",
    description: "For their safety, keep pets and children away from active work zones."
  },
  {
    title: "Plan for Disruption",
    description: "Large projects may require temporary lifestyle adjustments - we'll help you prepare."
  },
  {
    title: "Communication is Key",
    description: "We'll keep you updated daily. Don't hesitate to ask questions anytime!"
  }
];

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFAQs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    return FAQ_CATEGORIES.map(category => ({
      ...category,
      questions: category.questions.filter(q => {
        const matchesSearch = !query || 
          q.question.toLowerCase().includes(query) || 
          q.answer.toLowerCase().includes(query);
        const matchesCategory = activeCategory === "all" || category.id === activeCategory;
        return matchesSearch && matchesCategory;
      })
    })).filter(category => category.questions.length > 0);
  }, [searchQuery, activeCategory]);

  const totalResults = filteredFAQs.reduce((acc, cat) => acc + cat.questions.length, 0);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_CATEGORIES.flatMap(category =>
      category.questions.map(q => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.answer
        }
      }))
    )
  };

  return (
    <>
      <Helmet>
        <title>FAQ - Frequently Asked Questions | {COMPANY_INFO.name}</title>
        <meta 
          name="description" 
          content="Find answers to common questions about Rhino Remodeler's home repair and renovation services in Seattle. Learn about pricing, timelines, warranties, and more." 
        />
        <meta name="keywords" content="FAQ, frequently asked questions, home repair questions, renovation FAQ, Seattle contractor FAQ" />
        <link rel="canonical" href="https://rhinoremodeler.com/faq" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions about our services
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 focus:border-primary"
                />
                {searchQuery && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    {totalResults} result{totalResults !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
        <section className="border-b bg-card sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="w-full h-auto flex-wrap justify-start gap-2 bg-transparent py-4">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  All Topics
                </TabsTrigger>
                {FAQ_CATEGORIES.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main FAQ Accordion */}
              <div className="lg:col-span-2 space-y-8">
                {filteredFAQs.length === 0 ? (
                  <Card className="p-8 text-center">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No results found</h3>
                    <p className="text-muted-foreground mb-4">
                      We couldn't find any FAQs matching "{searchQuery}"
                    </p>
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </Card>
                ) : (
                  filteredFAQs.map((category) => (
                    <div key={category.id} id={category.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {category.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">
                          {category.name}
                        </h2>
                      </div>
                      
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.questions.map((faq, index) => (
                          <AccordionItem 
                            key={index} 
                            value={`${category.id}-${index}`}
                            className="border rounded-lg px-4 bg-card hover:bg-accent/50 transition-colors"
                          >
                            <AccordionTrigger className="text-left font-medium hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground whitespace-pre-line">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Still Have Questions */}
                <Card className="border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-primary" />
                      Still Have Questions?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Can't find what you're looking for? We're here to help!
                    </p>
                    <div className="space-y-3">
                      <a 
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <Phone className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Call Us</div>
                          <div className="text-sm text-muted-foreground">{COMPANY_INFO.phone}</div>
                        </div>
                      </a>
                      <a 
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                      >
                        <Mail className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">Email Us</div>
                          <div className="text-sm text-muted-foreground">{COMPANY_INFO.email}</div>
                        </div>
                      </a>
                    </div>
                    <Button asChild className="w-full">
                      <Link to={ROUTES.CONTACT}>Contact Us</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Resources */}
                <Card>
                  <CardHeader>
                    <CardTitle>Related Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link 
                      to={ROUTES.SERVICES}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Wrench className="h-5 w-5 text-muted-foreground" />
                        <span>Our Services</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to={ROUTES.REQUEST_QUOTE}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <span>Request a Quote</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to={ROUTES.GALLERY}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Image className="h-5 w-5 text-muted-foreground" />
                        <span>Before & After Gallery</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      to={ROUTES.ABOUT}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <Building className="h-5 w-5 text-muted-foreground" />
                        <span>About Us</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>

                {/* Helpful Tips */}
                <Card className="bg-accent/50">
                  <CardHeader>
                    <CardTitle>Preparing for Your Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {HELPFUL_TIPS.map((tip, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                            {index + 1}
                          </span>
                          <div>
                            <div className="font-medium">{tip.title}</div>
                            <div className="text-sm text-muted-foreground">{tip.description}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Emergency CTA */}
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="h-6 w-6 text-destructive" />
                      <h3 className="font-bold text-lg">Need Emergency Help?</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      24/7 emergency services available for urgent repairs.
                    </p>
                    <Button asChild variant="destructive" className="w-full">
                      <a href={`tel:${COMPANY_INFO.emergency}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now: {COMPANY_INFO.emergency}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Get a free, no-obligation quote for your home repair or renovation project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to={ROUTES.REQUEST_QUOTE}>
                  Get Free Quote
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href={`tel:${COMPANY_INFO.phone}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {COMPANY_INFO.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQPage;
