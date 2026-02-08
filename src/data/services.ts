// Rhino Remodeler - Service Page Data
// Complete data structure for all service pages

export interface ServiceOffering {
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  items: string[];
}

export interface PricingTier {
  name: string;
  range: string;
  description?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  projectType?: string;
}

export interface ServiceData {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  heroBackgroundImages?: string[];
  metaDescription: string;
  introduction: string;
  whyChooseUs: string[];
  offerings: ServiceOffering[];
  process: ProcessStep[];
  materials: {
    brands: string[];
    qualityStandards: string[];
    warranty: string;
  };
  pricing: PricingTier[];
  pricingNote: string;
  testimonials: Testimonial[];
  faqs: FAQ[];
  relatedServices: string[];
  keywords: string[];
}

export const SERVICES_DATA: Record<string, ServiceData> = {
  'kitchen-remodeling': {
    slug: 'kitchen-remodeling',
    name: 'Kitchen Remodeling',
    tagline: 'Transform Your Kitchen Into Your Dream Space',
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1920&q=80',
    heroBackgroundImages: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?auto=format&fit=crop&w=1920&q=80',
    ],
    metaDescription: 'Professional kitchen remodeling services in Seattle. From cabinet installation to complete redesigns. Licensed, insured, 20+ years experience. Free estimates!',
    introduction: 'Your kitchen is the heart of your home, and at Rhino Remodeler, we understand how important it is to create a space that reflects your style while meeting your functional needs. Our expert team combines innovative design with superior craftsmanship to deliver kitchen remodels that exceed expectations. Whether you\'re looking for a minor refresh or a complete transformation, we\'re here to bring your vision to life.',
    whyChooseUs: [
      'Over 500 successful kitchen remodels completed',
      'Custom designs tailored to your lifestyle',
      'Premium materials at competitive prices',
      'Minimal disruption to your daily routine',
    ],
    offerings: [
      { title: 'Cabinet Installation & Refinishing', description: 'Custom cabinetry, refacing, and hardware upgrades to maximize storage and style.' },
      { title: 'Countertop Installation', description: 'Granite, quartz, marble, and butcher block options with professional installation.' },
      { title: 'Kitchen Island Design & Construction', description: 'Custom islands with seating, storage, and integrated appliances.' },
      { title: 'Backsplash Installation', description: 'Tile, stone, and glass backsplashes that add personality and protection.' },
      { title: 'Appliance Installation', description: 'Professional installation of all major kitchen appliances.' },
      { title: 'Lighting Upgrades', description: 'Under-cabinet, pendant, and recessed lighting for ambiance and functionality.' },
      { title: 'Flooring Installation', description: 'Hardwood, tile, and luxury vinyl options built to withstand kitchen traffic.' },
      { title: 'Plumbing & Electrical Work', description: 'Licensed professionals handle all plumbing and electrical updates.' },
      { title: 'Complete Kitchen Redesign', description: 'Full-service renovation including layout changes and structural modifications.' },
    ],
    process: [
      { step: 1, title: 'Consultation & Design', items: ['Initial meeting to discuss your vision', 'Measurements and site assessment', 'Design concepts and 3D renderings'] },
      { step: 2, title: 'Planning & Approval', items: ['Final design approval', 'Material selection at our showroom', 'Timeline and budget finalization'] },
      { step: 3, title: 'Preparation', items: ['Permits and approvals obtained', 'Material ordering and scheduling', 'Site preparation and protection'] },
      { step: 4, title: 'Construction', items: ['Demo work (if needed)', 'Professional installation', 'Regular progress updates'] },
      { step: 5, title: 'Final Touches', items: ['Quality inspection', 'Professional cleanup', 'Client walkthrough'] },
      { step: 6, title: 'Completion', items: ['Final approval and sign-off', 'Warranty documentation', 'Care and maintenance tips'] },
    ],
    materials: {
      brands: ['KraftMaid', 'Cambria', 'Kohler', 'Delta', 'GE', 'Samsung', 'Moen', 'Shaw Flooring'],
      qualityStandards: ['NKBA certified designs', 'Energy Star appliances', 'Low-VOC materials', 'ADA-compliant options'],
      warranty: '5-year workmanship warranty on all installations, plus manufacturer warranties on materials and appliances.',
    },
    pricing: [
      { name: 'Minor Kitchen Refresh', range: '$5,000 - $15,000', description: 'Paint, hardware, fixtures, and minor updates' },
      { name: 'Mid-Range Remodel', range: '$15,000 - $35,000', description: 'New countertops, cabinets, and appliances' },
      { name: 'High-End Renovation', range: '$35,000 - $75,000', description: 'Premium materials and layout changes' },
      { name: 'Custom/Luxury', range: '$75,000+', description: 'Complete transformation with custom features' },
    ],
    pricingNote: 'Final pricing depends on materials selected, kitchen size, and project scope. All quotes are free and include detailed breakdowns.',
    testimonials: [
      { name: 'Jennifer M.', location: 'Bellevue, WA', rating: 5, text: 'Rhino Remodeler completely transformed our outdated kitchen into a modern masterpiece. The team was professional, on-time, and the results exceeded our expectations!', projectType: 'Complete Kitchen Remodel' },
      { name: 'David & Lisa K.', location: 'Seattle, WA', rating: 5, text: 'From the initial consultation to the final walkthrough, the Rhino team made our kitchen remodel stress-free. We love our new quartz countertops and custom island!', projectType: 'Mid-Range Remodel' },
      { name: 'Robert T.', location: 'Kirkland, WA', rating: 5, text: 'Best investment we\'ve made in our home. The attention to detail and quality of work is outstanding. Highly recommend for any kitchen project!', projectType: 'Cabinet & Countertop Update' },
    ],
    faqs: [
      { question: 'How long does a kitchen remodel take?', answer: 'Timeline varies by scope: minor refreshes take 1-2 weeks, mid-range remodels 4-6 weeks, and complete renovations 8-12 weeks. We\'ll provide a detailed timeline during your consultation.' },
      { question: 'Do I need permits for a kitchen remodel?', answer: 'Permits are typically required for electrical, plumbing, and structural changes. We handle all permit applications and inspections as part of our service.' },
      { question: 'Can I stay in my home during renovation?', answer: 'Yes, most homeowners stay during renovation. We set up temporary kitchen spaces and work to minimize disruption. For major renovations, we\'ll discuss the best approach for your situation.' },
      { question: 'What\'s the most cost-effective kitchen upgrade?', answer: 'Cabinet refacing, new hardware, and updated lighting offer the biggest visual impact for the investment. We can help prioritize upgrades based on your budget.' },
      { question: 'Do you offer financing options?', answer: 'Yes! We partner with several financing companies to offer flexible payment plans with competitive rates. Apply during your consultation.' },
      { question: 'What warranty do you provide?', answer: 'We offer a 5-year workmanship warranty on all installations. Materials and appliances carry their own manufacturer warranties, which we\'ll explain during selection.' },
      { question: 'Can you work with my existing layout?', answer: 'Absolutely! Many remodels work within the existing footprint. If you want layout changes, we can discuss structural modifications and associated costs.' },
      { question: 'How do you handle unexpected issues during renovation?', answer: 'We conduct thorough pre-project assessments to minimize surprises. If issues arise, we communicate immediately and provide options before proceeding.' },
    ],
    relatedServices: ['bathroom-renovation', 'flooring', 'electrical-work', 'plumbing-services'],
    keywords: ['kitchen remodeling Seattle', 'kitchen renovation', 'cabinet installation', 'countertop installation', 'kitchen contractor'],
  },

  'bathroom-renovation': {
    slug: 'bathroom-renovation',
    name: 'Bathroom Renovation',
    tagline: 'Create Your Personal Spa Retreat',
    heroImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1920&q=80',
    heroBackgroundImages: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1920&q=80',
    ],
    metaDescription: 'Expert bathroom renovation services in Seattle. Showers, tubs, vanities, and complete remodels. Licensed & insured. Free estimates!',
    introduction: 'Transform your bathroom into a relaxing sanctuary with Rhino Remodeler\'s expert renovation services. From updating fixtures to complete gut renovations, our skilled team handles every aspect of bathroom remodeling with precision and care. We combine functionality with beautiful design to create spaces that start and end your day right.',
    whyChooseUs: [
      'Specialized bathroom renovation expertise',
      'Waterproofing guaranteed on all wet areas',
      'ADA-compliant accessible designs available',
      'Quick turnaround without sacrificing quality',
    ],
    offerings: [
      { title: 'Shower Installation & Remodel', description: 'Walk-in showers, shower-tub combos, frameless glass enclosures, and custom tile work.' },
      { title: 'Bathtub Installation', description: 'Soaking tubs, jetted tubs, freestanding tubs, and tub-to-shower conversions.' },
      { title: 'Vanity & Cabinetry', description: 'Custom and pre-fabricated vanities with countertops and storage solutions.' },
      { title: 'Tile Work', description: 'Floor, wall, and accent tile installation with expert craftsmanship.' },
      { title: 'Plumbing Fixtures', description: 'Faucets, showerheads, toilets, and complete plumbing updates.' },
      { title: 'Lighting & Ventilation', description: 'Ambient lighting, vanity lights, and exhaust fan installation.' },
      { title: 'Heated Flooring', description: 'Radiant floor heating for ultimate comfort.' },
      { title: 'Accessibility Modifications', description: 'Grab bars, walk-in tubs, and barrier-free showers.' },
    ],
    process: [
      { step: 1, title: 'Consultation & Design', items: ['In-home assessment', 'Design preferences discussion', 'Layout and fixture planning'] },
      { step: 2, title: 'Planning & Approval', items: ['Final design sign-off', 'Material and fixture selection', 'Project timeline confirmation'] },
      { step: 3, title: 'Preparation', items: ['Permit acquisition', 'Material procurement', 'Bathroom protection setup'] },
      { step: 4, title: 'Construction', items: ['Demolition', 'Plumbing and electrical rough-in', 'Waterproofing and installation'] },
      { step: 5, title: 'Final Touches', items: ['Fixture installation', 'Final connections', 'Quality inspection'] },
      { step: 6, title: 'Completion', items: ['Final walkthrough', 'Warranty registration', 'Care instructions'] },
    ],
    materials: {
      brands: ['Kohler', 'Delta', 'Moen', 'American Standard', 'TOTO', 'Schluter', 'Daltile'],
      qualityStandards: ['Waterproofing certification', 'WaterSense fixtures', 'Mold-resistant materials'],
      warranty: '5-year workmanship warranty with lifetime leak protection on waterproofed areas.',
    },
    pricing: [
      { name: 'Fixture Updates', range: '$3,000 - $8,000', description: 'New fixtures, paint, and accessories' },
      { name: 'Partial Remodel', range: '$8,000 - $20,000', description: 'Vanity, shower/tub, and flooring' },
      { name: 'Full Renovation', range: '$20,000 - $40,000', description: 'Complete gut and rebuild' },
      { name: 'Luxury/Master Bath', range: '$40,000+', description: 'Premium finishes and spa features' },
    ],
    pricingNote: 'Bathroom size, fixture quality, and tile selection significantly impact final cost. Request your free detailed estimate today.',
    testimonials: [
      { name: 'Sarah P.', location: 'Seattle, WA', rating: 5, text: 'Our master bathroom is now our favorite room in the house! The heated floors and frameless shower make every morning feel like a spa day.', projectType: 'Master Bath Renovation' },
      { name: 'Mike & Karen H.', location: 'Redmond, WA', rating: 5, text: 'Rhino transformed our tiny bathroom into a functional, beautiful space. The tile work is stunning and the storage solutions are genius!', projectType: 'Small Bath Remodel' },
    ],
    faqs: [
      { question: 'How long does a bathroom renovation take?', answer: 'Simple updates take 1-2 weeks, while complete renovations typically require 3-5 weeks. We\'ll provide a specific timeline based on your project scope.' },
      { question: 'Can you make my bathroom more accessible?', answer: 'Yes! We specialize in ADA-compliant modifications including walk-in showers, grab bars, comfort-height toilets, and barrier-free designs.' },
      { question: 'Do I need a second bathroom during renovation?', answer: 'We recommend having access to another bathroom. For single-bathroom homes, we can phase the work to minimize inconvenience.' },
      { question: 'What\'s the best flooring for bathrooms?', answer: 'Porcelain tile, luxury vinyl, and natural stone are excellent choices. We help you select based on durability, maintenance, and style preferences.' },
      { question: 'Can you add a bathroom where there isn\'t one?', answer: 'Yes! We handle complete bathroom additions including plumbing rough-in, electrical, and all finishes. Permits and planning are included.' },
    ],
    relatedServices: ['kitchen-remodeling', 'plumbing-services', 'flooring', 'electrical-work'],
    keywords: ['bathroom renovation Seattle', 'bathroom remodel', 'shower installation', 'bathroom contractor'],
  },

  'roofing-services': {
    slug: 'roofing-services',
    name: 'Roofing Services',
    tagline: 'Protecting What Matters Most',
    heroImage: 'https://images.unsplash.com/photo-1632759145355-3e2f1e7b2fc9?auto=format&fit=crop&w=1920&q=80',
    heroBackgroundImages: [
      'https://images.unsplash.com/photo-1632759145355-3e2f1e7b2fc9?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80',
    ],
    metaDescription: 'Professional roofing services in Seattle. Repairs, replacements, and new installations. Storm damage experts. Licensed & insured. Free inspections!',
    introduction: 'Your roof is your home\'s first line of defense against the Pacific Northwest elements. Rhino Remodeler provides comprehensive roofing services from minor repairs to complete replacements. Our certified roofing specialists use premium materials and proven techniques to ensure your roof protects your family for decades to come.',
    whyChooseUs: [
      '24/7 emergency storm damage response',
      'GAF Master Elite certified installers',
      'Extended manufacturer warranties',
      'Insurance claim assistance provided',
    ],
    offerings: [
      { title: 'Roof Replacement', description: 'Complete tear-off and replacement with asphalt, metal, or composite materials.' },
      { title: 'Roof Repairs', description: 'Leak repairs, shingle replacement, and storm damage restoration.' },
      { title: 'New Roof Installation', description: 'Expert installation for new construction and additions.' },
      { title: 'Roof Inspections', description: 'Comprehensive inspections with detailed reports and recommendations.' },
      { title: 'Gutter Services', description: 'Gutter installation, repair, and gutter guard systems.' },
      { title: 'Ventilation', description: 'Ridge vents, soffit vents, and attic ventilation solutions.' },
      { title: 'Skylights', description: 'Skylight installation, replacement, and leak repairs.' },
      { title: 'Emergency Repairs', description: '24/7 emergency tarping and storm damage response.' },
    ],
    process: [
      { step: 1, title: 'Free Inspection', items: ['Comprehensive roof assessment', 'Drone and ladder inspection', 'Detailed photo documentation'] },
      { step: 2, title: 'Proposal & Options', items: ['Material recommendations', 'Warranty options', 'Transparent pricing'] },
      { step: 3, title: 'Scheduling', items: ['Permit acquisition', 'Material delivery', 'Weather monitoring'] },
      { step: 4, title: 'Installation', items: ['Old roof removal', 'Deck inspection and repairs', 'New roof installation'] },
      { step: 5, title: 'Quality Check', items: ['Final inspection', 'Cleanup and debris removal', 'Magnetic nail sweep'] },
      { step: 6, title: 'Warranty Activation', items: ['Warranty registration', 'Maintenance schedule', 'Documentation provided'] },
    ],
    materials: {
      brands: ['GAF', 'CertainTeed', 'Owens Corning', 'Malarkey', 'Tesla Solar Roof', 'James Hardie'],
      qualityStandards: ['Energy Star rated options', 'Class 4 impact resistance', 'Algae-resistant shingles'],
      warranty: 'Up to 50-year manufacturer warranty plus 10-year workmanship warranty. Golden Pledge warranty available.',
    },
    pricing: [
      { name: 'Minor Repairs', range: '$300 - $1,000', description: 'Shingle replacement, small leak repairs' },
      { name: 'Major Repairs', range: '$1,000 - $3,000', description: 'Large area repairs, flashing, valleys' },
      { name: 'Partial Replacement', range: '$3,000 - $8,000', description: 'Section replacement' },
      { name: 'Full Replacement', range: '$8,000 - $25,000+', description: 'Complete roof replacement' },
    ],
    pricingNote: 'Roof size, pitch, material choice, and accessibility affect pricing. Free inspections include detailed estimates.',
    testimonials: [
      { name: 'Tom & Linda W.', location: 'Shoreline, WA', rating: 5, text: 'After a major storm, Rhino had a team out the next day. They worked with our insurance and the new roof looks amazing. True professionals!', projectType: 'Storm Damage Replacement' },
      { name: 'George B.', location: 'Bothell, WA', rating: 5, text: 'Fair pricing, excellent communication, and top-quality work. The crew was respectful and cleaned up everything. Highly recommend!', projectType: 'Full Roof Replacement' },
    ],
    faqs: [
      { question: 'How do I know if I need a new roof?', answer: 'Signs include missing/curling shingles, granules in gutters, visible leaks, and age (20+ years). Our free inspection will assess your roof\'s condition.' },
      { question: 'How long does a roof replacement take?', answer: 'Most residential roofs are completed in 1-3 days, weather permitting. Larger or complex roofs may take longer.' },
      { question: 'Do you work with insurance companies?', answer: 'Yes! We have extensive experience with insurance claims and can meet with adjusters, provide documentation, and help maximize your coverage.' },
      { question: 'What roofing material is best for Seattle?', answer: 'Architectural shingles and metal roofing perform excellently in our climate. We\'ll recommend options based on your home style and budget.' },
      { question: 'Can you install solar panels with a new roof?', answer: 'Yes! We can coordinate solar-ready installations or integrate solar roofing systems. Ask about our solar partnerships.' },
    ],
    relatedServices: ['general-repairs', 'electrical-work', 'plumbing-services'],
    keywords: ['roofing Seattle', 'roof replacement', 'roof repair', 'storm damage', 'roofing contractor'],
  },

  'electrical-work': {
    slug: 'electrical-work',
    name: 'Electrical Work',
    tagline: 'Powering Your Home Safely & Efficiently',
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80',
    heroBackgroundImages: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=80',
    ],
    metaDescription: 'Licensed electrical services in Seattle. Panel upgrades, rewiring, lighting, EV chargers, and repairs. 24/7 emergency service. Free estimates!',
    introduction: 'Safe, reliable electrical systems are essential for modern living. Rhino Remodeler\'s licensed electricians provide comprehensive electrical services from troubleshooting and repairs to complete home rewiring and smart home installations. We prioritize safety, code compliance, and quality workmanship in every project.',
    whyChooseUs: [
      'Licensed Master Electricians on staff',
      'Same-day emergency service available',
      'Smart home and EV charger specialists',
      'All work exceeds electrical code requirements',
    ],
    offerings: [
      { title: 'Electrical Panel Upgrades', description: 'Upgrade to 200-400 amp service for modern power needs.' },
      { title: 'Home Rewiring', description: 'Complete rewiring for older homes with outdated electrical systems.' },
      { title: 'Lighting Installation', description: 'Recessed, pendant, track, and landscape lighting design and installation.' },
      { title: 'Outlet & Switch Installation', description: 'Additional outlets, USB outlets, smart switches, and GFCI upgrades.' },
      { title: 'EV Charger Installation', description: 'Level 2 charging station installation for electric vehicles.' },
      { title: 'Generator Installation', description: 'Whole-home and partial backup generator systems.' },
      { title: 'Smart Home Wiring', description: 'Smart home hub setup, automated lighting, and integrated systems.' },
      { title: 'Electrical Repairs', description: 'Troubleshooting, repairs, and emergency electrical services.' },
    ],
    process: [
      { step: 1, title: 'Assessment', items: ['Electrical system evaluation', 'Load calculation', 'Safety inspection'] },
      { step: 2, title: 'Proposal', items: ['Detailed scope of work', 'Material specifications', 'Permit requirements'] },
      { step: 3, title: 'Permitting', items: ['Permit application', 'Plan submission if required', 'Inspection scheduling'] },
      { step: 4, title: 'Installation', items: ['Professional installation', 'Code-compliant work', 'Minimal disruption'] },
      { step: 5, title: 'Testing', items: ['Circuit testing', 'Safety verification', 'Load testing'] },
      { step: 6, title: 'Inspection & Completion', items: ['City inspection', 'Final walkthrough', 'Documentation'] },
    ],
    materials: {
      brands: ['Square D', 'Siemens', 'Eaton', 'Leviton', 'Lutron', 'ChargePoint', 'Tesla', 'Generac'],
      qualityStandards: ['UL listed components', 'Energy-efficient options', 'Arc-fault protection'],
      warranty: '3-year workmanship warranty on all electrical installations. Manufacturer warranties on all equipment.',
    },
    pricing: [
      { name: 'Minor Electrical Work', range: '$150 - $500', description: 'Outlets, switches, fixture swaps' },
      { name: 'Medium Projects', range: '$500 - $2,500', description: 'Circuit additions, subpanel work' },
      { name: 'Panel Upgrade', range: '$2,000 - $5,000', description: '200 amp panel upgrade' },
      { name: 'Major Electrical', range: '$5,000+', description: 'Rewiring, EV chargers, generators' },
    ],
    pricingNote: 'Electrical work pricing varies based on complexity, materials, and permit requirements. All work is performed by licensed electricians.',
    testimonials: [
      { name: 'Chris R.', location: 'Seattle, WA', rating: 5, text: 'Upgraded our 60-year-old electrical panel and added an EV charger. The team was knowledgeable, efficient, and left everything spotless.', projectType: 'Panel Upgrade + EV Charger' },
      { name: 'Amanda S.', location: 'Mercer Island, WA', rating: 5, text: 'Rhino installed recessed lighting throughout our main floor. The difference is incredible! Professional team and fair pricing.', projectType: 'Lighting Installation' },
    ],
    faqs: [
      { question: 'How do I know if I need a panel upgrade?', answer: 'Signs include frequently tripped breakers, 100 amp or less service, fuse boxes, or planning to add major appliances/EV chargers. Our assessment will determine your needs.' },
      { question: 'Is electrical work permitted?', answer: 'Yes, most electrical work requires permits. We handle all permit applications and coordinate required inspections.' },
      { question: 'Can you help with smart home setup?', answer: 'Absolutely! From smart switches and thermostats to complete home automation, our technicians are certified in smart home technology.' },
      { question: 'How long does an EV charger installation take?', answer: 'Most Level 2 charger installations are completed in 4-8 hours. Panel upgrades, if needed, may require additional time.' },
      { question: 'Do you offer emergency electrical service?', answer: 'Yes, we provide 24/7 emergency electrical service for safety hazards, power outages, and urgent repairs.' },
    ],
    relatedServices: ['kitchen-remodeling', 'bathroom-renovation', 'general-repairs'],
    keywords: ['electrician Seattle', 'electrical services', 'panel upgrade', 'EV charger installation', 'home rewiring'],
  },

  'plumbing-services': {
    slug: 'plumbing-services',
    name: 'Plumbing Services',
    tagline: 'Expert Plumbing Solutions You Can Trust',
    heroImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1920&q=80',
    heroBackgroundImages: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1920&q=80',
    ],
    metaDescription: 'Professional plumbing services in Seattle. Repairs, installations, water heaters, and repiping. 24/7 emergency plumber. Licensed & insured!',
    introduction: 'From dripping faucets to complete repiping, Rhino Remodeler\'s licensed plumbers deliver reliable solutions for all your plumbing needs. We combine old-school craftsmanship with modern technology to diagnose problems accurately and fix them right the first time. Our 24/7 emergency service means we\'re here when you need us most.',
    whyChooseUs: [
      '24/7 emergency plumbing response',
      'Video camera pipe inspection',
      'Upfront pricing - no surprises',
      'All plumbers are licensed and background-checked',
    ],
    offerings: [
      { title: 'Drain Cleaning & Repair', description: 'Hydro jetting, snaking, and drain line repair for stubborn clogs.' },
      { title: 'Water Heater Services', description: 'Tank and tankless water heater installation, repair, and maintenance.' },
      { title: 'Pipe Repair & Repiping', description: 'Leak repair, burst pipe repair, and complete home repiping.' },
      { title: 'Fixture Installation', description: 'Faucets, sinks, toilets, and shower/tub installation.' },
      { title: 'Sewer Line Services', description: 'Sewer inspection, repair, and replacement including trenchless options.' },
      { title: 'Gas Line Services', description: 'Gas line installation, repair, and leak detection.' },
      { title: 'Water Filtration', description: 'Whole-home and point-of-use water filtration systems.' },
      { title: 'Emergency Plumbing', description: '24/7 emergency response for leaks, backups, and no hot water.' },
    ],
    process: [
      { step: 1, title: 'Diagnosis', items: ['Problem assessment', 'Video inspection if needed', 'Accurate diagnosis'] },
      { step: 2, title: 'Options & Pricing', items: ['Repair options presented', 'Upfront pricing', 'No hidden fees'] },
      { step: 3, title: 'Approval', items: ['Written estimate', 'Work authorization', 'Scheduling'] },
      { step: 4, title: 'Repair/Installation', items: ['Professional work', 'Quality materials', 'Code compliance'] },
      { step: 5, title: 'Testing', items: ['Pressure testing', 'Leak checks', 'System verification'] },
      { step: 6, title: 'Completion', items: ['Cleanup', 'Warranty explanation', 'Maintenance tips'] },
    ],
    materials: {
      brands: ['Kohler', 'Moen', 'Delta', 'Rheem', 'Rinnai', 'Navien', 'AO Smith', 'PEX'],
      qualityStandards: ['Lead-free fixtures', 'Energy-efficient water heaters', 'PEX piping when appropriate'],
      warranty: '2-year workmanship warranty on repairs, 5-year on installations. Manufacturer warranties on all equipment.',
    },
    pricing: [
      { name: 'Service Call + Minor Repair', range: '$150 - $350', description: 'Basic repairs, adjustments' },
      { name: 'Standard Repairs', range: '$350 - $800', description: 'Leak repairs, fixture replacement' },
      { name: 'Water Heater', range: '$1,500 - $4,000', description: 'Tank or tankless installation' },
      { name: 'Major Plumbing', range: '$4,000+', description: 'Repiping, sewer line work' },
    ],
    pricingNote: 'We provide upfront pricing before any work begins. Emergency and after-hours rates may apply.',
    testimonials: [
      { name: 'Patricia M.', location: 'Bellevue, WA', rating: 5, text: 'Had a burst pipe at 2am and Rhino was at our house within an hour. They fixed the problem quickly and even helped with the water damage documentation for insurance.', projectType: 'Emergency Pipe Repair' },
      { name: 'James L.', location: 'Seattle, WA', rating: 5, text: 'Replaced our old tank water heater with a tankless unit. The installation was clean and professional. Already seeing savings on our gas bill!', projectType: 'Tankless Water Heater' },
    ],
    faqs: [
      { question: 'How quickly can you respond to emergencies?', answer: 'Our emergency plumbers typically arrive within 1-2 hours in the Seattle area. We\'re available 24/7, 365 days a year.' },
      { question: 'Should I repair or replace my water heater?', answer: 'If your water heater is 10+ years old or requires frequent repairs, replacement is often more cost-effective. We\'ll help you evaluate your options.' },
      { question: 'What are signs of a sewer line problem?', answer: 'Multiple slow drains, sewage odors, wet spots in the yard, or gurgling sounds can indicate sewer issues. We offer video inspection to diagnose accurately.' },
      { question: 'Do you offer tankless water heaters?', answer: 'Yes! We install and service all major tankless brands. Tankless units provide endless hot water and energy savings.' },
      { question: 'Can you help with low water pressure?', answer: 'Absolutely. We diagnose pressure issues from clogged aerators to main line problems and provide appropriate solutions.' },
    ],
    relatedServices: ['bathroom-renovation', 'kitchen-remodeling', 'general-repairs'],
    keywords: ['plumber Seattle', 'plumbing services', 'water heater installation', 'drain cleaning', 'emergency plumber'],
  },

  'general-repairs': {
    slug: 'general-repairs',
    name: 'General Repairs',
    tagline: 'No Job Too Big or Small',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80',
    heroBackgroundImages: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=80',
    ],
    metaDescription: 'Professional home repair services in Seattle. Drywall, carpentry, doors, windows, and handyman services. Quality work guaranteed!',
    introduction: 'Life happens, and homes need maintenance. Rhino Remodeler\'s general repair services cover everything from minor fixes to major repairs. Our skilled craftsmen take pride in every job, whether it\'s patching drywall or rebuilding a deck. We bring the same professionalism to small repairs that we bring to major renovations.',
    whyChooseUs: [
      'One-stop shop for all home repairs',
      'Same-day service for urgent repairs',
      'No minimum job size',
      'Satisfaction guaranteed on all work',
    ],
    offerings: [
      { title: 'Drywall Repair', description: 'Holes, cracks, water damage repair, and texturing.' },
      { title: 'Carpentry', description: 'Trim work, custom built-ins, shelving, and structural repairs.' },
      { title: 'Door & Window Repair', description: 'Installation, adjustment, weatherstripping, and glass replacement.' },
      { title: 'Deck & Patio Repair', description: 'Board replacement, structural repairs, and refinishing.' },
      { title: 'Siding Repair', description: 'Damaged siding replacement and repair for all materials.' },
      { title: 'Interior Painting', description: 'Room painting, trim painting, and cabinet painting.' },
      { title: 'Fence Repair', description: 'Post replacement, board repair, and gate adjustment.' },
      { title: 'General Handyman', description: 'Mounting, assembly, caulking, and miscellaneous repairs.' },
    ],
    process: [
      { step: 1, title: 'Request', items: ['Describe your repair needs', 'Submit photos if helpful', 'Preferred timing'] },
      { step: 2, title: 'Assessment', items: ['On-site evaluation', 'Scope confirmation', 'Material needs'] },
      { step: 3, title: 'Quote', items: ['Written estimate', 'Material options', 'Timeline'] },
      { step: 4, title: 'Scheduling', items: ['Convenient appointment', 'Material procurement', 'Confirmation'] },
      { step: 5, title: 'Repair', items: ['Quality workmanship', 'Clean work area', 'Progress updates'] },
      { step: 6, title: 'Completion', items: ['Your approval', 'Cleanup', 'Warranty information'] },
    ],
    materials: {
      brands: ['Behr', 'Benjamin Moore', 'Simpson Strong-Tie', 'Trex', 'James Hardie'],
      qualityStandards: ['Premium paints', 'Exterior-grade materials', 'Proper preparation'],
      warranty: '1-year workmanship warranty on all repairs. Extended warranties on specific projects.',
    },
    pricing: [
      { name: 'Small Repairs', range: '$100 - $300', description: 'Single item repairs, quick fixes' },
      { name: 'Half-Day Service', range: '$300 - $600', description: 'Multiple small repairs' },
      { name: 'Full-Day Service', range: '$600 - $1,200', description: 'Larger repair projects' },
      { name: 'Major Repairs', range: '$1,200+', description: 'Deck, siding, structural' },
    ],
    pricingNote: 'Many repairs can be quoted over the phone with photos. Complex repairs may require an on-site assessment.',
    testimonials: [
      { name: 'Nancy K.', location: 'Seattle, WA', rating: 5, text: 'Had a list of small repairs I\'d been putting off for years. Rhino\'s handyman came out and knocked them all out in one visit. So convenient!', projectType: 'Multiple Repairs' },
      { name: 'Steve D.', location: 'Issaquah, WA', rating: 5, text: 'Our deck was in rough shape. Rhino replaced the damaged boards and refinished the whole thing. Looks brand new and we got compliments from all our neighbors!', projectType: 'Deck Repair' },
    ],
    faqs: [
      { question: 'Is there a minimum charge for small repairs?', answer: 'We have a minimum service call fee, but we\'ll often combine multiple small repairs to maximize your value. Bring us your list!' },
      { question: 'Can you match existing trim and molding?', answer: 'Yes, our carpenters are skilled at matching existing profiles. We\'ll find or mill matching pieces for seamless repairs.' },
      { question: 'Do you handle insurance repairs?', answer: 'Absolutely. We work with insurance companies regularly and can provide the documentation needed for claims.' },
      { question: 'How do I know if damage is cosmetic or structural?', answer: 'Our assessment will determine the extent of damage. We\'ll be honest about what needs fixing and what\'s optional.' },
      { question: 'Can you just repair part of my deck?', answer: 'Yes, we can do targeted repairs. However, we\'ll advise if the overall condition suggests more extensive work would be more cost-effective.' },
    ],
    relatedServices: ['roofing-services', 'electrical-work', 'plumbing-services', 'kitchen-remodeling'],
    keywords: ['home repair Seattle', 'handyman services', 'drywall repair', 'deck repair', 'carpentry'],
  },

  'flooring': {
    slug: 'flooring',
    name: 'Flooring Installation',
    tagline: 'Beautiful Floors That Last a Lifetime',
    heroImage: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1920&q=80',
    heroBackgroundImages: [
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
    ],
    metaDescription: 'Professional flooring installation in Seattle. Hardwood, tile, LVP, carpet, and refinishing. Free in-home estimates!',
    introduction: 'Your floors set the foundation for your entire home\'s aesthetic. Rhino Remodeler offers expert installation of all flooring types, from classic hardwood to modern luxury vinyl. Our installers bring precision and care to every project, ensuring your new floors look beautiful and perform flawlessly for years to come.',
    whyChooseUs: [
      'Certified installers for all flooring types',
      'Free in-home consultations with samples',
      'Furniture moving service available',
      'Dust containment systems used',
    ],
    offerings: [
      { title: 'Hardwood Flooring', description: 'Solid and engineered hardwood installation in various species and finishes.' },
      { title: 'Luxury Vinyl Plank (LVP)', description: 'Waterproof, durable LVP installation perfect for any room.' },
      { title: 'Tile Flooring', description: 'Ceramic, porcelain, and natural stone tile installation.' },
      { title: 'Laminate Flooring', description: 'Cost-effective laminate installation with realistic wood looks.' },
      { title: 'Carpet Installation', description: 'Wall-to-wall carpet and carpet tile installation.' },
      { title: 'Hardwood Refinishing', description: 'Sanding, staining, and refinishing of existing hardwood.' },
      { title: 'Subfloor Preparation', description: 'Leveling, repair, and moisture barrier installation.' },
      { title: 'Stair Installation', description: 'Hardwood stair treads, risers, and nosing.' },
    ],
    process: [
      { step: 1, title: 'Consultation', items: ['In-home measurement', 'Sample viewing', 'Lifestyle assessment'] },
      { step: 2, title: 'Selection', items: ['Material selection', 'Final quote', 'Lead time confirmation'] },
      { step: 3, title: 'Preparation', items: ['Material delivery', 'Acclimation period', 'Furniture moving'] },
      { step: 4, title: 'Installation', items: ['Subfloor prep', 'Professional installation', 'Transitions and trim'] },
      { step: 5, title: 'Finishing', items: ['Detail work', 'Cleanup', 'Furniture replacement'] },
      { step: 6, title: 'Walkthrough', items: ['Final inspection', 'Care instructions', 'Warranty activation'] },
    ],
    materials: {
      brands: ['Shaw', 'Mohawk', 'Armstrong', 'COREtec', 'Hallmark', 'Bruce', 'DalTile'],
      qualityStandards: ['FloorScore certified', 'Waterproof options', 'Scratch-resistant finishes'],
      warranty: '3-year installation warranty. Manufacturer warranties range from 15 years to lifetime.',
    },
    pricing: [
      { name: 'Laminate/LVP', range: '$4 - $8/sq ft installed', description: 'Including materials and labor' },
      { name: 'Hardwood', range: '$8 - $15/sq ft installed', description: 'Solid or engineered' },
      { name: 'Tile', range: '$10 - $20/sq ft installed', description: 'Varies by tile type' },
      { name: 'Refinishing', range: '$3 - $6/sq ft', description: 'Sand, stain, and finish' },
    ],
    pricingNote: 'Final pricing depends on material selection, subfloor condition, and room complexity. Free detailed estimates provided.',
    testimonials: [
      { name: 'Rachel & Mark P.', location: 'Seattle, WA', rating: 5, text: 'Rhino installed LVP throughout our main floor. It looks amazing and was much more affordable than we expected. Great crew!', projectType: 'LVP Installation' },
      { name: 'Brian T.', location: 'Kirkland, WA', rating: 5, text: 'Had our 50-year-old oak floors refinished. They look brand new! The dust containment was impressive - hardly any mess.', projectType: 'Hardwood Refinishing' },
    ],
    faqs: [
      { question: 'How long does flooring installation take?', answer: 'Most rooms can be completed in 1-2 days. Whole-house installations typically take 3-5 days depending on square footage and material.' },
      { question: 'Do I need to remove my furniture?', answer: 'We offer furniture moving as part of our service. Let us know during consultation and we\'ll include it in your quote.' },
      { question: 'What\'s the best flooring for pets?', answer: 'LVP is excellent for pets - waterproof, scratch-resistant, and easy to clean. We\'ll recommend pet-friendly options for your lifestyle.' },
      { question: 'Can you install over existing flooring?', answer: 'Sometimes. It depends on the condition and type of existing flooring. Our assessment will determine the best approach.' },
      { question: 'How long before I can walk on new floors?', answer: 'LVP and laminate are walkable immediately. Hardwood and tile may need 24-48 hours for adhesives and finishes to cure.' },
    ],
    relatedServices: ['kitchen-remodeling', 'bathroom-renovation', 'general-repairs'],
    keywords: ['flooring Seattle', 'hardwood installation', 'LVP flooring', 'tile installation', 'flooring contractor'],
  },

  'painting': {
    slug: 'painting',
    name: 'Painting Services',
    tagline: 'Professional Color That Transforms Your Home',
    heroImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1920&q=80',
    heroBackgroundImages: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80',
    ],
    metaDescription: 'Professional interior and exterior painting services in Seattle. Cabinet refinishing, deck staining, and color consultation. Licensed & insured. Free estimates!',
    introduction: 'A fresh coat of paint is one of the most impactful and cost-effective ways to transform your home. Rhino Remodeler\'s professional painters deliver flawless results on every project, from single accent walls to complete interior and exterior makeovers. We use premium paints, meticulous surface preparation, and proven techniques to ensure a beautiful, long-lasting finish that elevates your home\'s appearance and value.',
    whyChooseUs: [
      'Detailed surface preparation for lasting results',
      'Premium low-VOC and zero-VOC paint options',
      'Color consultation included with every project',
      'Clean, respectful crews who protect your home',
    ],
    offerings: [
      { title: 'Interior Painting', description: 'Walls, ceilings, and trim painting with premium paints and precise cutting-in for clean lines.' },
      { title: 'Exterior Painting', description: 'Complete home exterior painting including siding, trim, fascia, and soffits with weather-resistant coatings.' },
      { title: 'Cabinet Refinishing', description: 'Kitchen and bathroom cabinet painting and refinishing for a fresh, updated look at a fraction of replacement cost.' },
      { title: 'Deck & Fence Staining', description: 'Professional staining and sealing for decks, fences, pergolas, and outdoor wood structures.' },
      { title: 'Accent Walls & Specialty Finishes', description: 'Feature walls, faux finishes, textured coatings, and decorative painting techniques.' },
      { title: 'Trim & Molding Painting', description: 'Baseboards, crown molding, window frames, and door painting with smooth, drip-free finishes.' },
      { title: 'Wallpaper Removal & Prep', description: 'Professional wallpaper stripping, wall repair, and surface preparation for a smooth paint-ready finish.' },
      { title: 'Garage & Basement Painting', description: 'Epoxy floor coatings, wall painting, and moisture-resistant finishes for utility spaces.' },
    ],
    process: [
      { step: 1, title: 'Color Consultation', items: ['In-home color assessment', 'Sample swatches and test patches', 'Finish and sheen recommendations'] },
      { step: 2, title: 'Preparation', items: ['Furniture and fixture protection', 'Surface cleaning, sanding, and priming', 'Caulking, patching, and repair'] },
      { step: 3, title: 'Priming', items: ['Stain-blocking primer where needed', 'Proper adhesion preparation', 'Even base coat application'] },
      { step: 4, title: 'Painting', items: ['Professional brush and roller application', 'Multiple coats for full coverage', 'Precise cutting-in and detail work'] },
      { step: 5, title: 'Inspection & Touch-Ups', items: ['Multi-point quality inspection', 'Touch-up of any imperfections', 'Client walkthrough'] },
      { step: 6, title: 'Cleanup & Completion', items: ['Furniture replacement', 'Complete site cleanup', 'Leftover paint labeled and left for touch-ups'] },
    ],
    materials: {
      brands: ['Benjamin Moore', 'Sherwin-Williams', 'Behr', 'Farrow & Ball', 'PPG', 'Cabot Stains'],
      qualityStandards: ['Low-VOC and zero-VOC options', 'Mold and mildew-resistant formulas', 'UV-resistant exterior coatings'],
      warranty: '3-year workmanship warranty on interior painting, 5-year on exterior painting. Manufacturer warranties on all paint products.',
    },
    pricing: [
      { name: 'Single Room', range: '$500 - $1,500', description: 'Walls, ceiling, and trim for one room' },
      { name: 'Multi-Room Interior', range: '$2,000 - $5,000', description: 'Multiple rooms or full floor painting' },
      { name: 'Exterior Painting', range: '$3,000 - $8,000', description: 'Full home exterior including prep' },
      { name: 'Cabinet Refinishing', range: '$2,500 - $6,000', description: 'Kitchen or bathroom cabinets' },
    ],
    pricingNote: 'Final pricing depends on square footage, surface condition, paint quality selected, and number of coats required. All estimates are free and include detailed breakdowns.',
    testimonials: [
      { name: 'Laura & Tim G.', location: 'Seattle, WA', rating: 5, text: 'Rhino painted our entire main floor and the results are stunning. The crew was neat, efficient, and the color consultation helped us pick the perfect palette. Highly recommend!', projectType: 'Whole-Floor Interior' },
      { name: 'Michelle R.', location: 'Bellevue, WA', rating: 5, text: 'Had our kitchen cabinets refinished instead of replaced and saved thousands. They look brand new! The attention to detail and smooth finish exceeded our expectations.', projectType: 'Cabinet Refinishing' },
      { name: 'Dan & Carla W.', location: 'Kirkland, WA', rating: 5, text: 'Our house exterior was overdue for painting. Rhino\'s team did an incredible job with prep work and the final result is beautiful. Neighbors keep asking who did it!', projectType: 'Exterior Painting' },
    ],
    faqs: [
      { question: 'How long does it take to paint a room?', answer: 'A standard room typically takes 1 day including prep and two coats. Larger rooms or those needing extensive prep work may take 1-2 days. We\'ll provide a specific timeline during your estimate.' },
      { question: 'Do I need to move my furniture?', answer: 'We handle furniture moving as part of our service. We\'ll move items to the center of the room and cover everything with drop cloths for full protection.' },
      { question: 'How often should I repaint my home exterior?', answer: 'In the Pacific Northwest, exterior paint typically lasts 5-7 years depending on exposure and paint quality. We use premium exterior coatings to maximize longevity.' },
      { question: 'What\'s the difference between paint sheens?', answer: 'Flat is best for ceilings and low-traffic areas, eggshell and satin work well for living spaces, semi-gloss is ideal for trim and bathrooms, and high-gloss for accents. We\'ll recommend the right sheen for each surface.' },
      { question: 'Can you paint over wallpaper?', answer: 'We recommend removing wallpaper for the best results. Painting over wallpaper can lead to peeling and texture issues. Our wallpaper removal service ensures a smooth, paint-ready surface.' },
      { question: 'Are your paints safe for families with children?', answer: 'Yes! We offer low-VOC and zero-VOC paints that are virtually odorless and safe for occupied homes. These are our standard recommendation for interior projects.' },
      { question: 'How long does cabinet refinishing take?', answer: 'A typical kitchen cabinet refinishing project takes 5-7 days. We work in stages (doors off-site, boxes on-site) to minimize disruption to your kitchen.' },
      { question: 'Do you provide a warranty on painting?', answer: 'Yes, we offer a 3-year workmanship warranty on interior painting and a 5-year warranty on exterior painting. If paint peels, bubbles, or fails due to our workmanship, we\'ll fix it at no cost.' },
    ],
    relatedServices: ['general-repairs', 'kitchen-remodeling', 'flooring', 'bathroom-renovation'],
    keywords: ['painting services Seattle', 'house painter', 'interior painting', 'exterior painting', 'cabinet refinishing', 'deck staining', 'painting contractor'],
  },
};

// Helper function to get service by slug
export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return SERVICES_DATA[slug];
};

// Get all service slugs for routing
export const getAllServiceSlugs = (): string[] => {
  return Object.keys(SERVICES_DATA);
};

// Get related services data
export const getRelatedServices = (currentSlug: string): ServiceData[] => {
  const current = SERVICES_DATA[currentSlug];
  if (!current) return [];
  
  return current.relatedServices
    .map(slug => SERVICES_DATA[slug])
    .filter((service): service is ServiceData => service !== undefined);
};
