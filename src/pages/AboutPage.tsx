import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Phone, 
  ArrowRight, 
  Shield, 
  Award, 
  Users, 
  Heart,
  CheckCircle,
  Star,
  Building2,
  Handshake,
  Leaf,
  Clock,
  DollarSign,
  MapPin,
  Linkedin,
  Quote
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO, ROUTES } from '@/lib/constants';

// Hero Section
const AboutHero = () => (
  <section 
    className="relative min-h-[50vh] flex items-center justify-center bg-cover bg-center"
    style={{ backgroundImage: 'url(/placeholder.svg)' }}
    aria-label="About us hero section"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" aria-hidden="true" />
    <div className="relative z-10 container mx-auto px-4 text-center text-white py-20">
      <p className="text-secondary font-semibold mb-2 tracking-wide uppercase">About Rhino Remodeler</p>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Building Trust Since 2015
      </h1>
      <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
        Your Seattle Home Renovation Experts
      </p>
    </div>
  </section>
);

// Our Story Section
const OurStory = () => (
  <section className="py-16 bg-background" aria-labelledby="story-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 id="story-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Story
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto" aria-hidden="true" />
        </div>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
          <p>
            <strong className="text-foreground">Rhino Remodeler</strong> was founded in 2015 with a simple mission: 
            to provide Seattle homeowners with honest, quality home repair and renovation services they can trust. 
            What started as a small operation has grown into one of the 
            Puget Sound's most respected home improvement companies.
          </p>
          
          <p>
            Our founder, Francisco, began his career as a carpenter's apprentice at age 18. After years of working 
            for large contractors and seeing how customers were often treated as just another job number, he knew 
            there had to be a better way. He envisioned a company that would treat every home as if it were their own, 
            combining old-school craftsmanship with modern techniques and genuine customer care.
          </p>
          
          <p>
            Today, that vision lives on in every project we undertake. From kitchen remodels that transform daily life 
            to emergency repairs that save the day, our team of 15+ licensed professionals carries forward the same 
            commitment to excellence that built our reputation over two decades ago.
          </p>
        </div>
        
        {/* Mission Statement */}
        <div className="mt-12 p-8 bg-primary/5 border-l-4 border-primary rounded-r-lg">
          <h3 className="font-bold text-foreground text-xl mb-3">Our Mission</h3>
          <p className="text-muted-foreground italic text-lg">
            "To deliver exceptional home improvement services with integrity, quality, and care—building lasting 
            relationships one project at a time while making Seattle homes safer, more beautiful, and more functional 
            for the families who live in them."
          </p>
        </div>
      </div>
    </div>
  </section>
);

// Stats Section
const StatsSection = () => {
  const stats = [
    { value: '10+', label: 'Years in Business', icon: Clock },
    { value: '100+', label: 'Projects Completed', icon: Building2 },
    { value: '50+', label: '5-Star Reviews', icon: Star },
    { value: '10+', label: 'Licensed Professionals', icon: Users },
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground" aria-labelledby="stats-heading">
      <div className="container mx-auto px-4">
        <h2 id="stats-heading" className="sr-only">Company Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
              <div className="text-primary-foreground/80">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  const team = [
    {
      name: 'Francisco',
      role: 'Founder & CEO',
      bio: 'With 10+ years in construction, Francisco founded Rhino Remodeler to bring honest, quality service to Seattle homeowners. He still oversees every major project personally.',
      image: '/placeholder.svg',
      linkedin: '#',
    },
  ];

  return (
    <section className="py-16 bg-muted/30" aria-labelledby="team-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="team-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The skilled professionals who bring your home improvement dreams to life
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {team.map((member) => (
            <Card key={member.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-muted relative">
                <img 
                  src={member.image} 
                  alt={`${member.name}, ${member.role}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{member.name}</h3>
                    <p className="text-primary font-medium text-sm">{member.role}</p>
                  </div>
                  <a 
                    href={member.linkedin}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseUs = () => {
  const benefits = [
    {
      icon: Shield,
      title: 'Licensed & Insured',
      description: 'Fully licensed, bonded, and insured for your complete peace of mind on every project.',
    },
    {
      icon: Award,
      title: 'Experienced Professionals',
      description: '10+ years of combined expertise in home renovation and repair services.',
    },
    {
      icon: CheckCircle,
      title: 'Quality Craftsmanship',
      description: 'We take pride in every project, big or small, delivering work that stands the test of time.',
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'No hidden fees, clear quotes, and honest communication from start to finish.',
    },
    {
      icon: Heart,
      title: 'Customer Satisfaction',
      description: 'Your satisfaction is our top priority—we\'re not done until you\'re thrilled with the results.',
    },
    {
      icon: MapPin,
      title: 'Local & Trusted',
      description: 'Seattle-based and community-focused, serving our neighbors with pride since 2015.',
    },
  ];

  return (
    <section className="py-16 bg-background" aria-labelledby="why-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="why-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Rhino Remodeler
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What sets us apart from the rest
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map(({ icon: Icon, title, description }) => (
            <div 
              key={title}
              className="p-6 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Certifications Section
const Certifications = () => {
  const certifications = [
    { name: 'Licensed Contractor', detail: `#${COMPANY_INFO.license}`, icon: '📋' },
    { name: 'Fully Insured', detail: 'Up to $2M Coverage', icon: '🛡️' },
    { name: 'EPA Certified', detail: 'Lead-Safe Work', icon: '🌿' },
  ];

  return (
    <section className="py-12 bg-muted/50 border-y border-border" aria-labelledby="certs-heading">
      <div className="container mx-auto px-4">
        <h2 id="certs-heading" className="text-xl font-bold text-center text-foreground mb-8">
          Certifications & Accreditations
        </h2>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {certifications.map(({ name, detail, icon }) => (
            <div key={name} className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border">
              <span className="text-2xl" aria-hidden="true">{icon}</span>
              <div>
                <div className="font-semibold text-foreground">{name}</div>
                <div className="text-sm text-muted-foreground">{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Quality Commitment Section
const QualityCommitment = () => (
  <section className="py-16 bg-background" aria-labelledby="quality-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 id="quality-heading" className="text-3xl font-bold text-foreground mb-4">
            Our Commitment to Quality
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
              Quality Guarantee
            </h3>
            <p className="text-muted-foreground text-sm">
              We stand behind every project with our satisfaction guarantee. If something isn't right, 
              we'll make it right—no questions asked. Your complete satisfaction is our measure of success.
            </p>
          </div>
          
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" aria-hidden="true" />
              Warranty Coverage
            </h3>
            <p className="text-muted-foreground text-sm">
              All workmanship is backed by our comprehensive warranty—up to 5 years depending on the project. 
              Plus, we honor all manufacturer warranties on materials and appliances.
            </p>
          </div>
          
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary" aria-hidden="true" />
              Safety Standards
            </h3>
            <p className="text-muted-foreground text-sm">
              Safety is never compromised. Our team follows strict OSHA guidelines, uses proper protective 
              equipment, and maintains a clean, secure worksite throughout every project.
            </p>
          </div>
          
          <div className="p-6 bg-muted/30 rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" aria-hidden="true" />
              Environmental Responsibility
            </h3>
            <p className="text-muted-foreground text-sm">
              We're committed to sustainable practices—recycling construction waste, using low-VOC materials 
              when possible, and recommending energy-efficient options to reduce your environmental footprint.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Community Section
const CommunitySection = () => (
  <section className="py-16 bg-secondary/5" aria-labelledby="community-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Handshake className="w-12 h-12 text-secondary mx-auto mb-4" aria-hidden="true" />
        <h2 id="community-heading" className="text-3xl font-bold text-foreground mb-4">
          Community Involvement
        </h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          We believe in giving back to the community that has supported us for over two decades.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-5 bg-background rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-2">Habitat for Humanity</h3>
            <p className="text-sm text-muted-foreground">
              Our team volunteers regularly, helping build affordable housing for Seattle families in need.
            </p>
          </div>
          <div className="p-5 bg-background rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-2">Senior Assistance Program</h3>
            <p className="text-sm text-muted-foreground">
              Discounted services for seniors, plus free safety inspections for qualifying homeowners.
            </p>
          </div>
          <div className="p-5 bg-background rounded-lg border border-border">
            <h3 className="font-bold text-foreground mb-2">Local Business Support</h3>
            <p className="text-sm text-muted-foreground">
              We partner with local suppliers and tradespeople, keeping our dollars in the Seattle community.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Jennifer M.',
      location: 'Bellevue, WA',
      text: 'Rhino Remodeler exceeded all expectations with our kitchen remodel. Professional, punctual, and the craftsmanship is outstanding. We\'ve recommended them to all our friends!',
      rating: 5,
    },
    {
      name: 'Robert & Linda K.',
      location: 'Seattle, WA',
      text: 'After a pipe burst at 2am, Rhino had someone at our house within an hour. They saved us from major water damage and handled everything with our insurance. True professionals.',
      rating: 5,
    },
    {
      name: 'David T.',
      location: 'Kirkland, WA',
      text: 'We\'ve used Rhino for multiple projects over the years—bathroom remodel, deck repair, electrical upgrades. Consistent quality and fair pricing every time. They\'re our go-to.',
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-background" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="testimonials-heading" className="text-3xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground">
            Don't just take our word for it—hear from our satisfied customers
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="relative">
              <CardContent className="pt-8 pb-6">
                <Quote 
                  className="absolute top-4 right-4 w-8 h-8 text-primary/10" 
                  aria-hidden="true" 
                />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 text-yellow-500 fill-yellow-500" 
                      aria-hidden="true" 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to={ROUTES.GALLERY}
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            See more customer success stories
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// Timeline Section
const TimelineSection = () => {
  const milestones = [
    { year: '2015', title: 'Company Founded', description: 'Francisco starts Rhino Remodeler with a vision for honest, quality service.' },
    { year: '2017', title: 'Team Expansion', description: 'Grew the team and added plumbing and electrical services.' },
    { year: '2019', title: 'Google 5-Star Rating', description: 'Achieved 5-star rating on Google Reviews for customer service excellence.' },
    { year: '2021', title: '50th Project', description: 'Celebrated our 50th completed project milestone.' },
    { year: '2023', title: 'Service Expansion', description: 'Expanded service area to cover 40 miles around Seattle.' },
    { year: '2025', title: '10 Years Strong', description: 'Celebrating 10 years and 100+ projects with the Seattle community.' },
  ];

  return (
    <section className="py-16 bg-muted/30" aria-labelledby="timeline-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="timeline-heading" className="text-3xl font-bold text-foreground mb-4">
            Our Journey
          </h2>
          <p className="text-muted-foreground">A decade of growth and commitment to excellence</p>
        </div>
        
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5"
            aria-hidden="true"
          />
          
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.year}
                className={`relative pl-12 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                {/* Timeline dot */}
                <div 
                  className={`absolute w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold left-0 md:left-1/2 md:-translate-x-1/2`}
                  aria-hidden="true"
                >
                  {milestone.year.slice(-2)}
                </div>
                
                <div className={`bg-background p-4 rounded-lg border border-border ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <span className="text-sm font-bold text-primary">{milestone.year}</span>
                  <h3 className="font-bold text-foreground">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Bottom CTA
const BottomCTA = () => (
  <section className="py-16 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
          Become Our Next Success Story
        </h2>
        <p className="text-lg text-primary-foreground/90 mb-8">
          Join the 1,000+ Seattle homeowners who trust Rhino Construction for their home improvement needs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button 
            asChild 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold px-8"
          >
            <Link to={ROUTES.REQUEST_QUOTE}>
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Link>
          </Button>
          
          <Button 
            asChild 
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 font-semibold px-8"
          >
            <a href={`tel:${COMPANY_INFO.phoneRaw}`}>
              <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
              {COMPANY_INFO.phone}
            </a>
          </Button>
        </div>
        
        <p className="text-sm text-primary-foreground/70">
          Free estimates • No obligation • {COMPANY_INFO.address.city}, WA & surrounding areas
        </p>
      </div>
    </div>
  </section>
);

// Main About Page Component
const AboutPage = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: COMPANY_INFO.name,
      description: 'Seattle home repair and renovation company founded in 2015',
      foundingDate: '2015',
      numberOfEmployees: '10+',
      areaServed: 'Seattle and surrounding areas',
      telephone: COMPANY_INFO.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY_INFO.address.street,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.zip,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>About Us | {COMPANY_INFO.name} - Seattle Home Renovation Experts</title>
        <meta 
          name="description" 
          content="Learn about Rhino Remodeler - Seattle's trusted home repair and renovation company since 2015. Meet our team, see our story, and discover why 100+ homeowners choose us." 
        />
        <link rel="canonical" href="https://rhinoremodeler.com/about" />
        
        <meta property="og:title" content={`About Us | ${COMPANY_INFO.name}`} />
        <meta property="og:description" content="Seattle's trusted home renovation experts since 2015. 10+ years, 100+ projects, 50+ 5-star reviews." />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <AboutHero />
          <OurStory />
          <StatsSection />
          <TeamSection />
          <WhyChooseUs />
          <Certifications />
          <QualityCommitment />
          <CommunitySection />
          <TestimonialsSection />
          <TimelineSection />
          <BottomCTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
