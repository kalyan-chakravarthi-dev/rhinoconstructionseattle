// Rhino Construction - Centralized Constants
// Following development_rules.md standards

export const COMPANY_INFO = {
  name: 'Rhino Remodeller',
  tagline: 'Building Trust, One Project at a Time',
  phone: '(206) 487-9677',
  phoneRaw: '+12064879677',
  emergency: '(206) 487-9677',
  email: 'francisco@rhinoremodeller.com',
  address: {
    street: '4527 S 256th Pl',
    city: 'Kent',
    state: 'WA',
    zip: '98032',
  },
  hours: {
    weekday: 'Mon-Fri: 7:00 AM - 6:00 PM',
    saturday: 'Sat: 8:00 AM - 4:00 PM',
    sunday: 'Sun: Closed (Emergency services available)',
  },
  license: '#123456',
  serviceRadius: '40 miles from Seattle',
} as const;

export const SERVICES = [
  'Kitchen Remodeling',
  'Bathroom Renovation',
  'Roofing Services',
  'Electrical Work',
  'Plumbing Services',
  'General Repairs',
  'Painting',
  'Flooring',
] as const;

export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  ACCEPTED_FORMATS: ['image/jpeg', 'image/png', 'image/heic'],
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.heic'],
} as const;

export const STORAGE_KEYS = {
  QUOTE_DRAFT: 'rhino_quote_draft',
  QUOTE_STEP_1: 'quoteStep1',
  QUOTE_STEP_2: 'quoteStep2',
  QUOTE_STEP_3: 'quoteStep3',
  QUOTE_STEP_4: 'quoteStep4',
  USER_PREFERENCES: 'rhino_user_prefs',
  AUTH_TOKEN: 'rhino_auth_token',
  LAST_SUBMITTED_QUOTE: 'lastSubmittedQuote',
  USER_DATA: 'rhinoUser',
  NOTIFICATION_SETTINGS: 'rhino_notification_settings',
  SERVICE_ADDRESSES: 'rhino_service_addresses',
  PAYMENT_METHODS: 'rhino_payment_methods',
} as const;

export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  GALLERY: '/gallery',
  BEFORE_AFTER: '/before-after',
  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  REQUEST_QUOTE: '/request-quote',
  QUOTE_CONFIRMATION: '/request-quote/confirmation',
  DASHBOARD: '/dashboard',
  DASHBOARD_QUOTES: '/dashboard/quotes',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  // Individual service pages
  SERVICE_KITCHEN: '/services/kitchen-remodeling',
  SERVICE_BATHROOM: '/services/bathroom-renovation',
  SERVICE_ROOFING: '/services/roofing-services',
  SERVICE_ELECTRICAL: '/services/electrical-work',
  SERVICE_PLUMBING: '/services/plumbing-services',
  SERVICE_GENERAL: '/services/general-repairs',
  SERVICE_FLOORING: '/services/flooring',
} as const;

// Type exports for TypeScript
export type ServiceType = typeof SERVICES[number];
export type RouteKey = keyof typeof ROUTES;
