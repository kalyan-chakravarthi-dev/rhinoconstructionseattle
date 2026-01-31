// Mock data for quote management dashboard

export type QuoteStatus = 
  | 'pending'
  | 'in_review'
  | 'quote_sent'
  | 'approved'
  | 'in_progress'
  | 'completed'
  | 'declined'
  | 'archived';

export interface QuoteTimelineEvent {
  id: string;
  status: string;
  label: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface QuoteMessage {
  id: string;
  sender: 'customer' | 'team';
  senderName: string;
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface QuoteBreakdown {
  labor: number;
  materials: number;
  permits: number;
  otherFees: number;
  subtotal: number;
  tax: number;
  total: number;
  validUntil: string;
  paymentTerms: string;
}

export interface Quote {
  id: string;
  serviceType: string;
  status: QuoteStatus;
  submittedDate: string;
  lastUpdated: string;
  propertyAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  estimatedValue?: {
    min: number;
    max: number;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  projectDetails: {
    description: string;
    photos: string[];
    scopeOfWork: string[];
    urgency: 'low' | 'medium' | 'high' | 'emergency';
    timeline: string;
  };
  timeline: QuoteTimelineEvent[];
  messages: QuoteMessage[];
  breakdown?: QuoteBreakdown;
}

export const QUOTE_STATUS_CONFIG: Record<QuoteStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  in_review: { label: 'In Review', color: 'text-blue-700', bgColor: 'bg-blue-100' },
  quote_sent: { label: 'Quote Sent', color: 'text-purple-700', bgColor: 'bg-purple-100' },
  approved: { label: 'Approved', color: 'text-green-700', bgColor: 'bg-green-100' },
  in_progress: { label: 'In Progress', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  completed: { label: 'Completed', color: 'text-gray-700', bgColor: 'bg-gray-100' },
  declined: { label: 'Declined', color: 'text-red-700', bgColor: 'bg-red-100' },
  archived: { label: 'Archived', color: 'text-gray-500', bgColor: 'bg-gray-50' },
};

export const MOCK_QUOTES: Quote[] = [
  {
    id: 'RQT-2024-001',
    serviceType: 'Kitchen Remodeling',
    status: 'quote_sent',
    submittedDate: '2024-01-15T09:00:00',
    lastUpdated: '2024-01-18T14:30:00',
    propertyAddress: {
      street: '123 Main St',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
    },
    estimatedValue: { min: 15000, max: 20000 },
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(206) 555-1234',
    },
    projectDetails: {
      description: 'Complete kitchen renovation including new cabinets, countertops, and appliances. Looking for a modern farmhouse style with white shaker cabinets and quartz countertops.',
      photos: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
      scopeOfWork: ['Cabinet replacement', 'Countertop installation', 'New appliances', 'Lighting upgrade', 'Flooring'],
      urgency: 'medium',
      timeline: 'Within 3 months',
    },
    timeline: [
      { id: '1', status: 'submitted', label: 'Submitted', timestamp: '2024-01-15T09:00:00', completed: true },
      { id: '2', status: 'reviewed', label: 'Reviewed', timestamp: '2024-01-15T14:30:00', completed: true },
      { id: '3', status: 'quote_sent', label: 'Quote Sent', timestamp: '2024-01-16T10:00:00', completed: true },
      { id: '4', status: 'awaiting', label: 'Awaiting Your Response', timestamp: '', completed: false, current: true },
      { id: '5', status: 'approved', label: 'Approved', timestamp: '', completed: false },
      { id: '6', status: 'scheduled', label: 'Project Scheduled', timestamp: '', completed: false },
      { id: '7', status: 'completed', label: 'Completed', timestamp: '', completed: false },
    ],
    messages: [
      {
        id: 'm1',
        sender: 'team',
        senderName: 'Sarah Johnson',
        message: 'Thank you for your quote request! We have reviewed your project and prepared a detailed estimate. Please review and let us know if you have any questions.',
        timestamp: '2024-01-16T10:00:00',
      },
      {
        id: 'm2',
        sender: 'customer',
        senderName: 'John Doe',
        message: 'Thanks for the quick response! Can you tell me more about the cabinet options?',
        timestamp: '2024-01-17T11:30:00',
      },
      {
        id: 'm3',
        sender: 'team',
        senderName: 'Sarah Johnson',
        message: 'Of course! We offer three cabinet lines - Standard (solid wood doors), Premium (soft-close, full extension), and Luxury (custom sizing and finishes). The quote includes our Premium line.',
        timestamp: '2024-01-17T14:15:00',
      },
    ],
    breakdown: {
      labor: 8500,
      materials: 7200,
      permits: 350,
      otherFees: 450,
      subtotal: 16500,
      tax: 1650,
      total: 18150,
      validUntil: '2024-02-15',
      paymentTerms: '50% deposit, 25% at midpoint, 25% upon completion',
    },
  },
  {
    id: 'RQT-2024-002',
    serviceType: 'Bathroom Renovation',
    status: 'in_review',
    submittedDate: '2024-01-18T15:00:00',
    lastUpdated: '2024-01-19T09:00:00',
    propertyAddress: {
      street: '456 Oak Ave',
      city: 'Bellevue',
      state: 'WA',
      zip: '98004',
    },
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(206) 555-1234',
    },
    projectDetails: {
      description: 'Master bathroom remodel. Need new walk-in shower, double vanity, and updated fixtures.',
      photos: ['/placeholder.svg', '/placeholder.svg'],
      scopeOfWork: ['Shower installation', 'Vanity replacement', 'New fixtures', 'Tile work'],
      urgency: 'low',
      timeline: 'Flexible, within 6 months',
    },
    timeline: [
      { id: '1', status: 'submitted', label: 'Submitted', timestamp: '2024-01-18T15:00:00', completed: true },
      { id: '2', status: 'reviewed', label: 'In Review', timestamp: '', completed: false, current: true },
      { id: '3', status: 'quote_sent', label: 'Quote Sent', timestamp: '', completed: false },
      { id: '4', status: 'awaiting', label: 'Awaiting Your Response', timestamp: '', completed: false },
      { id: '5', status: 'approved', label: 'Approved', timestamp: '', completed: false },
      { id: '6', status: 'scheduled', label: 'Project Scheduled', timestamp: '', completed: false },
      { id: '7', status: 'completed', label: 'Completed', timestamp: '', completed: false },
    ],
    messages: [
      {
        id: 'm1',
        sender: 'team',
        senderName: 'Mike Chen',
        message: 'We received your bathroom renovation request. Our team is currently reviewing the details and we\'ll have a quote ready within 24-48 hours.',
        timestamp: '2024-01-19T09:00:00',
      },
    ],
  },
  {
    id: 'RQT-2024-003',
    serviceType: 'Roofing Services',
    status: 'in_progress',
    submittedDate: '2024-01-05T10:30:00',
    lastUpdated: '2024-01-20T08:00:00',
    propertyAddress: {
      street: '789 Pine St',
      city: 'Seattle',
      state: 'WA',
      zip: '98103',
    },
    estimatedValue: { min: 12000, max: 15000 },
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(206) 555-1234',
    },
    projectDetails: {
      description: 'Complete roof replacement. Current roof is 25 years old with multiple leaks.',
      photos: ['/placeholder.svg'],
      scopeOfWork: ['Full roof tear-off', 'New underlayment', 'Architectural shingles', 'Gutter replacement'],
      urgency: 'high',
      timeline: 'ASAP',
    },
    timeline: [
      { id: '1', status: 'submitted', label: 'Submitted', timestamp: '2024-01-05T10:30:00', completed: true },
      { id: '2', status: 'reviewed', label: 'Reviewed', timestamp: '2024-01-05T16:00:00', completed: true },
      { id: '3', status: 'quote_sent', label: 'Quote Sent', timestamp: '2024-01-06T09:00:00', completed: true },
      { id: '4', status: 'approved', label: 'Approved', timestamp: '2024-01-07T11:00:00', completed: true },
      { id: '5', status: 'scheduled', label: 'Project Scheduled', timestamp: '2024-01-10T09:00:00', completed: true },
      { id: '6', status: 'in_progress', label: 'In Progress', timestamp: '2024-01-15T07:00:00', completed: false, current: true },
      { id: '7', status: 'completed', label: 'Completed', timestamp: '', completed: false },
    ],
    messages: [
      {
        id: 'm1',
        sender: 'team',
        senderName: 'Tom Wilson',
        message: 'Work has begun on your roof replacement. Weather looks good for the next week so we should stay on schedule.',
        timestamp: '2024-01-15T07:30:00',
      },
      {
        id: 'm2',
        sender: 'team',
        senderName: 'Tom Wilson',
        message: 'Day 3 update: Tear-off complete, underlayment installed. Starting shingles tomorrow.',
        timestamp: '2024-01-17T16:00:00',
      },
    ],
    breakdown: {
      labor: 5500,
      materials: 6800,
      permits: 200,
      otherFees: 300,
      subtotal: 12800,
      tax: 1280,
      total: 14080,
      validUntil: '2024-02-05',
      paymentTerms: '50% deposit, 50% upon completion',
    },
  },
  {
    id: 'RQT-2023-042',
    serviceType: 'Electrical Work',
    status: 'completed',
    submittedDate: '2023-11-10T14:00:00',
    lastUpdated: '2023-12-05T15:30:00',
    propertyAddress: {
      street: '321 Cedar Lane',
      city: 'Kirkland',
      state: 'WA',
      zip: '98033',
    },
    estimatedValue: { min: 3500, max: 4500 },
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(206) 555-1234',
    },
    projectDetails: {
      description: 'Panel upgrade from 100A to 200A and add dedicated circuits for home office.',
      photos: [],
      scopeOfWork: ['Panel upgrade', 'New circuits', 'Outlet installation'],
      urgency: 'medium',
      timeline: 'Within 1 month',
    },
    timeline: [
      { id: '1', status: 'submitted', label: 'Submitted', timestamp: '2023-11-10T14:00:00', completed: true },
      { id: '2', status: 'reviewed', label: 'Reviewed', timestamp: '2023-11-11T10:00:00', completed: true },
      { id: '3', status: 'quote_sent', label: 'Quote Sent', timestamp: '2023-11-12T11:00:00', completed: true },
      { id: '4', status: 'approved', label: 'Approved', timestamp: '2023-11-14T09:00:00', completed: true },
      { id: '5', status: 'scheduled', label: 'Project Scheduled', timestamp: '2023-11-20T09:00:00', completed: true },
      { id: '6', status: 'in_progress', label: 'In Progress', timestamp: '2023-12-01T08:00:00', completed: true },
      { id: '7', status: 'completed', label: 'Completed', timestamp: '2023-12-05T15:30:00', completed: true },
    ],
    messages: [],
    breakdown: {
      labor: 1800,
      materials: 1500,
      permits: 150,
      otherFees: 100,
      subtotal: 3550,
      tax: 355,
      total: 3905,
      validUntil: '2023-12-12',
      paymentTerms: '50% deposit, 50% upon completion',
    },
  },
  {
    id: 'RQT-2024-004',
    serviceType: 'General Repairs',
    status: 'pending',
    submittedDate: '2024-01-20T11:00:00',
    lastUpdated: '2024-01-20T11:00:00',
    propertyAddress: {
      street: '555 Maple Dr',
      city: 'Redmond',
      state: 'WA',
      zip: '98052',
    },
    contactInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(206) 555-1234',
    },
    projectDetails: {
      description: 'Several small repairs needed: fix squeaky doors, patch drywall holes, repair deck railing.',
      photos: ['/placeholder.svg', '/placeholder.svg'],
      scopeOfWork: ['Door repair', 'Drywall patching', 'Deck repair'],
      urgency: 'low',
      timeline: 'Flexible',
    },
    timeline: [
      { id: '1', status: 'submitted', label: 'Submitted', timestamp: '2024-01-20T11:00:00', completed: true, current: true },
      { id: '2', status: 'reviewed', label: 'In Review', timestamp: '', completed: false },
      { id: '3', status: 'quote_sent', label: 'Quote Sent', timestamp: '', completed: false },
      { id: '4', status: 'awaiting', label: 'Awaiting Your Response', timestamp: '', completed: false },
      { id: '5', status: 'approved', label: 'Approved', timestamp: '', completed: false },
      { id: '6', status: 'scheduled', label: 'Project Scheduled', timestamp: '', completed: false },
      { id: '7', status: 'completed', label: 'Completed', timestamp: '', completed: false },
    ],
    messages: [],
  },
];

export const DASHBOARD_STATS = {
  activeQuotes: 2,
  pendingResponse: 1,
  projectsInProgress: 1,
  lifetimeProjects: 5,
};
