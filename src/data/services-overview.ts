// Rhino Construction - Services Overview Data
// Data for the main /services hub page

import { 
  ChefHat, 
  Bath, 
  Home, 
  Zap, 
  Wrench, 
  Hammer, 
  Paintbrush, 
  Grid3X3, 
  LucideIcon
} from 'lucide-react';

export interface ServiceOverviewCard {
  id: string;
  slug: string;
  name: string;
  icon: LucideIcon;
  description: string;
  startingPrice: string;
  features: string[];
  
  bestFor: string;
  timeline: string;
  priceRange: string;
}

export const SERVICES_OVERVIEW: ServiceOverviewCard[] = [
  {
    id: 'kitchen',
    slug: 'kitchen-remodeling',
    name: 'Kitchen Remodeling',
    icon: ChefHat,
    description: 'Transform your kitchen with modern designs and quality materials',
    startingPrice: 'Custom pricing',
    features: [
      'Cabinet Installation',
      'Countertop Replacement',
      'Complete Renovations',
      'Design Consultation',
    ],
    bestFor: 'Complete kitchen makeovers',
    timeline: '4-12 weeks',
    priceRange: '$5,000 - $75,000+',
  },
  {
    id: 'bathroom',
    slug: 'bathroom-renovation',
    name: 'Bathroom Renovation',
    icon: Bath,
    description: 'Create your dream bathroom with expert design and installation',
    startingPrice: 'Custom pricing',
    features: [
      'Shower/Tub Installation',
      'Vanity & Fixtures',
      'Tile Work',
      'Accessibility Upgrades',
    ],
    bestFor: 'Bathroom updates & remodels',
    timeline: '2-6 weeks',
    priceRange: '$3,000 - $40,000+',
  },
  {
    id: 'roofing',
    slug: 'roofing-services',
    name: 'Roofing Services',
    icon: Home,
    description: 'Protect your home with quality roofing solutions',
    startingPrice: 'Starting at $5,000',
    features: [
      'Roof Replacement',
      'Repairs & Maintenance',
      'Gutter Installation',
      'Emergency Services',
    ],
    bestFor: 'Roof repair & replacement',
    timeline: '1-5 days',
    priceRange: '$300 - $25,000+',
  },
  {
    id: 'electrical',
    slug: 'electrical-work',
    name: 'Electrical Work',
    icon: Zap,
    description: 'Safe, code-compliant electrical installations and repairs',
    startingPrice: 'Starting at $150',
    features: [
      'Wiring & Rewiring',
      'Panel Upgrades',
      'Outlet Installation',
      'Lighting Solutions',
    ],
    bestFor: 'Electrical upgrades & repairs',
    timeline: '1 day - 2 weeks',
    priceRange: '$150 - $5,000+',
  },
  {
    id: 'plumbing',
    slug: 'plumbing-services',
    name: 'Plumbing Services',
    icon: Wrench,
    description: 'Expert plumbing for repairs, installations, and emergencies',
    startingPrice: 'Starting at $100',
    features: [
      'Leak Repairs',
      'Fixture Installation',
      'Pipe Replacement',
      'Water Heaters',
    ],
    bestFor: 'Plumbing issues & installs',
    timeline: 'Same day - 1 week',
    priceRange: '$150 - $4,000+',
  },
  {
    id: 'general',
    slug: 'general-repairs',
    name: 'General Repairs',
    icon: Hammer,
    description: 'Handyman services for all your home maintenance needs',
    startingPrice: 'Starting at $85/hour',
    features: [
      'Door/Window Repair',
      'Drywall Patching',
      'Deck Maintenance',
      'Misc. Repairs',
    ],
    bestFor: 'Small fixes & maintenance',
    timeline: 'Same day - 3 days',
    priceRange: '$100 - $1,200+',
  },
  {
    id: 'painting',
    slug: 'painting',
    name: 'Painting Services',
    icon: Paintbrush,
    description: 'Professional interior and exterior painting',
    startingPrice: 'Custom pricing',
    features: [
      'Interior Painting',
      'Exterior Painting',
      'Cabinet Refinishing',
      'Deck Staining',
    ],
    bestFor: 'Interior & exterior refresh',
    timeline: '1-5 days',
    priceRange: '$500 - $8,000+',
  },
  {
    id: 'flooring',
    slug: 'flooring',
    name: 'Flooring Installation',
    icon: Grid3X3,
    description: 'Beautiful, durable flooring solutions',
    startingPrice: 'Custom pricing',
    features: [
      'Hardwood Installation',
      'Tile & Stone',
      'Laminate & Vinyl',
      'Carpet Installation',
    ],
    bestFor: 'New floors & refinishing',
    timeline: '1-5 days',
    priceRange: '$3 - $20/sq ft',
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Request Quote',
    description: 'Fill out our simple form or call us to describe your project needs.',
    icon: '📋',
  },
  {
    step: 2,
    title: 'Consultation',
    description: 'We\'ll schedule a free on-site visit to assess your project.',
    icon: '🤝',
  },
  {
    step: 3,
    title: 'Project Planning',
    description: 'Receive a detailed proposal with timeline and transparent pricing.',
    icon: '📐',
  },
  {
    step: 4,
    title: 'Expert Execution',
    description: 'Our skilled team completes your project with quality craftsmanship.',
    icon: '🔨',
  },
  {
    step: 5,
    title: 'Final Inspection',
    description: 'We walk through together to ensure your complete satisfaction.',
    icon: '✅',
  },
];

export const SPECIAL_OFFERS = [
  {
    title: 'First-Time Customer Discount',
    description: '10% off your first project with Rhino Construction',
    highlight: true,
  },
  {
    title: 'Senior & Military Discounts',
    description: 'Special pricing for seniors (65+) and active/veteran military',
    highlight: false,
  },
  {
    title: 'Seasonal Promotions',
    description: 'Check back for seasonal deals on specific services',
    highlight: false,
  },
];
