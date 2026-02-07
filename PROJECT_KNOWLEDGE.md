<!-- DEPRECATED: This file is no longer the source of truth. All project context has been merged into CLAUDE.md. Do not reference this file for new development. -->

# Rhino Remodeler - Project Knowledge File (DEPRECATED)

> **DEPRECATED**: This file has been superseded by `CLAUDE.md`. All relevant project context has been consolidated there. This file is kept for reference only.

## Company Overview

**Company Name:** Rhino Remodeler  
**Founded:** 2015  
**Location:** Kent, WA 98032  
**Service Area:** 40-mile radius from Seattle  
**License:** RHINOC1750L6

### Contact Information
- **Phone:** (206) 487-9677
- **Email:** francisco@rhinoremodeler.com
- **Address:** 4527 S 256th Pl, Kent, WA 98032

### Business Hours
- Monday - Friday: 7:00 AM - 6:00 PM
- Saturday: 8:00 AM - 4:00 PM
- Sunday: Closed (Emergency services available)

### Company Stats
- 10+ Years in Business (since 2015)
- 100+ Completed Projects
- 50+ 5-Star Reviews
- 10+ Licensed Professionals

### Leadership
- **Francisco** - Founder & CEO

---

## Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design tokens
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Routing:** React Router DOM v6
- **Forms:** React Hook Form with Zod validation
- **State Management:** TanStack React Query

### Backend (Lovable Cloud)
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth (not yet implemented)
- **Storage:** Supabase Storage (quote-images bucket)
- **Edge Functions:** Deno-based serverless functions
- **Email Service:** SendGrid

### Internationalization
- **Library:** i18next with react-i18next
- **Supported Languages:** English (en), Spanish (es)
- **Persistence:** localStorage

---

## Services Offered

1. **Kitchen Remodeling** (`/services/kitchen-remodeling`)
2. **Bathroom Renovation** (`/services/bathroom-renovation`)
3. **Roofing Services** (`/services/roofing-services`)
4. **Electrical Work** (`/services/electrical-work`)
5. **Plumbing Services** (`/services/plumbing-services`)
6. **General Repairs** (`/services/general-repairs`)
7. **Flooring** (`/services/flooring`)
8. **Painting** (listed but no dedicated page)

---

## Application Routes

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, services, testimonials |
| `/services` | Services overview page |
| `/services/:slug` | Individual service detail pages |
| `/gallery` | Project gallery |
| `/before-after` | Before/After comparison gallery |
| `/about` | About the company |
| `/contact` | Contact information |
| `/faq` | Frequently asked questions |
| `/request-quote` | Multi-step quote request form |
| `/request-quote/confirmation` | Quote submission confirmation |

### Authentication
| Route | Description |
|-------|-------------|
| `/sign-in` | User login page |
| `/sign-up` | User registration page |

### Customer Dashboard (Protected)
| Route | Description |
|-------|-------------|
| `/dashboard` | Main dashboard |
| `/dashboard/quotes` | Quote management |
| `/dashboard/settings` | Settings hub |
| `/dashboard/settings/profile` | Profile settings |
| `/dashboard/settings/security` | Security/password settings |
| `/dashboard/settings/notifications` | Notification preferences |
| `/dashboard/settings/addresses` | Service addresses |
| `/dashboard/settings/payments` | Payment methods |

---

## Key Features

### 1. Multi-Step Quote Request System
- **Location:** `/request-quote`
- **Steps:** Service selection → Project details → Contact info → Review & Submit
- **Features:**
  - Dropdown menus for service and project size
  - Image upload with client-side compression
  - Mobile-optimized with auto-scroll on step change
  - Optional account creation checkbox
  - Marketing consent checkbox
  - Draft persistence in localStorage

### 2. Before/After Gallery
- Interactive image comparison sliders
- Filterable by service type
- Searchable by location
- Project detail modals

### 3. Service Pages
Standardized template including:
- Service hero section
- 6-step project timeline
- Tiered pricing guides
- Detailed service offerings
- Trade-specific FAQs
- Sticky sidebar with quick quote form

### 4. Customer Portal
- Quote tracking with visual status timeline
- Itemized quote breakdowns
- Team communication
- Account management (profile, security, notifications)
- Multiple service addresses
- Payment method management

### 5. Internationalization (i18n)
- Full English/Spanish support
- Language switcher in navbar
- Persisted preference in localStorage
- Technical terms remain in English

---

## Database Schema

### Table: `quote_requests`
| Column | Type | Nullable | Default |
|--------|------|----------|---------|
| id | uuid | No | gen_random_uuid() |
| created_at | timestamp with time zone | No | now() |
| customer_name | text | No | - |
| email | text | No | - |
| phone | text | Yes | - |
| service_requested | text | No | - |
| property_city | text | Yes | - |
| property_state | text | Yes | - |
| message | text | Yes | - |

### Row Level Security (RLS)
All public access is **DENIED** for INSERT, SELECT, UPDATE, DELETE.
Data operations are handled through Edge Functions with service_role key.

### Storage Buckets
- **quote-images** (public) - Stores uploaded images from quote requests

---

## Edge Functions

### 1. `submit-quote`
- **Purpose:** Process quote submissions
- **Actions:**
  - Validates input data
  - Stores quote in database
  - Triggers notification function

### 2. `send-notification`
- **Purpose:** Send email notifications via SendGrid
- **Recipients:**
  - Customer confirmation email
  - Business notification to francisco@rhinoremodeler.com
- **Sender:** noreply@rhinoremodeler.com

---

## Environment Variables

### Frontend (Vite)
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

### Backend Secrets
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`
- `SENDGRID_API_KEY`
- `LOVABLE_API_KEY`

---

## File Structure

```
src/
├── assets/              # Images (hero, logos, before/after photos)
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── dashboard/       # Dashboard-specific components
│   ├── service-page/    # Service page template components
│   ├── settings/        # Settings page components
│   └── shared/          # Shared/reusable components
├── data/                # Static data (services, mock quotes)
├── hooks/               # Custom React hooks
├── i18n/
│   └── locales/         # Translation files (en.json, es.json)
├── integrations/
│   └── supabase/        # Supabase client & types
├── lib/
│   ├── constants.ts     # Centralized constants
│   ├── utils.ts         # Utility functions
│   └── validations.ts   # Zod schemas
├── pages/               # Page components
│   └── settings/        # Settings sub-pages
└── test/                # Test setup

supabase/
├── config.toml          # Supabase configuration
└── functions/           # Edge functions
    ├── submit-quote/
    └── send-notification/
```

---

## Design System

### Colors (HSL in index.css)
- **Primary:** Brand orange
- **Secondary:** Dark blue/navy
- **Background/Foreground:** Light/dark theme support
- **Semantic tokens:** Used throughout via Tailwind classes

### Typography
- System font stack with fallbacks
- Responsive sizing

### Components
- All UI components from shadcn/ui
- Custom variants defined in component files
- Consistent spacing and border radius

---

## localStorage Keys

| Key | Purpose |
|-----|---------|
| `quoteStep1` - `quoteStep4` | Quote form draft data |
| `lastSubmittedQuote` | Last successful submission |
| `rhinoUser` | User profile data |
| `rhino_notification_settings` | Notification preferences |
| `rhino_service_addresses` | Saved addresses |
| `rhino_payment_methods` | Payment methods (no CVV) |

---

## Brand Guidelines

### Logo
- File: `src/assets/rhino-remodeler-logo.png`
- Text: "RHINO REMODELER" (always uppercase)
- Consistent display in navbar and footer

### Hero Image
- File: `src/assets/hero-construction.png`
- Features branded white service vehicles
- Dark blue and safety orange color scheme

### Spelling
- Always "Remodeler" (American spelling)
- Never "Remodeller"

---

## URLs

- **Preview:** https://id-preview--980a5d59-efda-410d-ab8c-3ab8ae7e441d.lovable.app
- **Published:** https://rhinoremodeler.lovable.app

---

## Development Notes

### Standards
- Follow `development_rules.md` for coding standards
- Use centralized constants from `src/lib/constants.ts`
- Use Zod schemas from `src/lib/validations.ts`
- Never store raw colors in components - use design tokens

### Security
- RLS policies block all direct table access
- All data operations through Edge Functions
- No CVV storage for payment methods
- Image filenames sanitized before upload

---

*Last Updated: February 2026*
