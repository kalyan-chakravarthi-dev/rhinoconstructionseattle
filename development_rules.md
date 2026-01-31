# Rhino Construction - Development Rules & Guidelines

> **IMPORTANT**: Read this file BEFORE implementing any feature. These rules ensure consistency, quality, and maintainability across the entire project.

---

## 📋 TABLE OF CONTENTS
1. [Project Standards](#project-standards)
2. [Branding & Design](#branding--design)
3. [Component Development](#component-development)
4. [Form & Validation Rules](#form--validation-rules)
5. [Routing & Navigation](#routing--navigation)
6. [Data Management](#data-management)
7. [Performance Requirements](#performance-requirements)
8. [SEO Requirements](#seo-requirements)
9. [Accessibility Standards](#accessibility-standards)
10. [Mobile-First Rules](#mobile-first-rules)
11. [Security Guidelines](#security-guidelines)
12. [Testing Checklist](#testing-checklist)

---

## 🎯 PROJECT STANDARDS

### Tech Stack (REQUIRED)
- **Framework**: Vite + React 18
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 3+
- **UI Components**: Shadcn UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router DOM v6
- **State Management**: React Context API / Zustand (for global state)
- **Image Handling**: Standard `<img>` tags with lazy loading

### File Structure (MUST FOLLOW)
```
/src
  /assets (images, fonts)
  /components
    /ui (Shadcn components)
    /shared (reusable components)
    /sections (page sections)
  /hooks (custom React hooks)
  /lib
    /utils.ts
    /validations.ts
    /constants.ts
  /pages (route components)
  /test (test files)
  index.css
  App.tsx
  main.tsx
/public
  /images
  /icons
```

### Naming Conventions (STRICT)
- **Components**: PascalCase (e.g., `QuoteRequestForm.tsx`)
- **Files**: kebab-case for utilities (e.g., `format-phone.ts`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **CSS Classes**: Tailwind utilities only (no custom classes unless absolutely necessary)

---

## 🎨 BRANDING & DESIGN

### Color Palette (USE EXACTLY)
```typescript
// Define in tailwind.config.ts
colors: {
  primary: {
    DEFAULT: '#1e3a8a', // Dark Blue
    light: '#3b82f6',
    dark: '#1e40af',
  },
  secondary: {
    DEFAULT: '#f97316', // Safety Orange
    light: '#fb923c',
    dark: '#ea580c',
  },
  neutral: {
    DEFAULT: '#64748b',
    light: '#f1f5f9',
    dark: '#334155',
  },
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
}
```

### Typography (MANDATORY)
- **Font Family**: Inter (fallback: system-ui, sans-serif)
- **Headings**: 
  - H1: `text-4xl md:text-5xl lg:text-6xl font-bold`
  - H2: `text-3xl md:text-4xl font-bold`
  - H3: `text-2xl md:text-3xl font-semibold`
  - H4: `text-xl md:text-2xl font-semibold`
- **Body**: `text-base leading-relaxed`
- **Small**: `text-sm`

### Spacing (CONSISTENT)
- **Section Padding**: `py-16 md:py-24`
- **Container Max Width**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Card Padding**: `p-6 md:p-8`
- **Button Padding**: `px-6 py-3`

### Button Styles (STANDARD)
```typescript
// Primary Button
className="bg-secondary hover:bg-secondary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"

// Secondary Button
className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"

// Text Button
className="text-primary hover:text-primary-dark underline"
```

---

## ⚙️ COMPONENT DEVELOPMENT

### Component Rules (ENFORCE)

1. **Every component MUST**:
   - Be a functional component
   - Use TypeScript with proper types
   - Have a single responsibility
   - Be exported as default or named export
   - Include PropTypes/TypeScript interface

2. **Component Template**:
```typescript
import { FC } from 'react';

interface ComponentNameProps {
  title: string;
  onAction?: () => void;
  className?: string;
}

export const ComponentName: FC = ({ 
  title, 
  onAction,
  className = '' 
}) => {
  return (
    <div className={className}>
      {/* Component content */}
    </div>
  );
};
```

3. **State Management**:
   - Use `useState` for local state
   - Use `useReducer` for complex state logic
   - Use Context API for shared state across multiple components
   - Never prop-drill more than 2 levels

4. **Side Effects**:
   - Always use `useEffect` with dependency array
   - Clean up subscriptions/listeners
   - Handle loading and error states

5. **Conditional Rendering**:
   - Prefer ternary for simple conditions
   - Use early returns for complex conditions
   - Always show loading states
   - Always show error states

---

## 📝 FORM & VALIDATION RULES

### Form Requirements (CRITICAL)

1. **All Forms MUST**:
   - Use React Hook Form
   - Use Zod for validation
   - Show real-time validation errors
   - Disable submit during processing
   - Show loading state on submit
   - Handle errors gracefully
   - Be fully accessible

2. **Validation Schema Template**:
```typescript
import { z } from 'zod';

export const quoteFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone must be in format (XXX) XXX-XXXX'),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
```

3. **Required Field Indicators**:
   - Mark with asterisk (*) in label
   - Red color for error state
   - Clear error messages below field

4. **Phone Number Format**:
   - MUST be: `(XXX) XXX-XXXX`
   - Auto-format as user types
   - Use `react-input-mask` or custom formatter

5. **Email Validation**:
   - Standard email regex
   - Show format example on error
   - Trim whitespace

6. **File Upload Rules**:
   - Max size: 10MB per file
   - Accepted formats: JPG, PNG, HEIC
   - Max files: 10 images
   - Show upload progress
   - Compress before upload
   - Show preview thumbnails

---

## 🗺️ ROUTING & NAVIGATION

### Route Structure (MANDATORY)
```
/ (homepage)
/services
/services/[slug] (e.g., /services/kitchen-remodeling)
/request-quote
/request-quote/confirmation
/before-after
/about-us
/contact
/blog
/blog/[slug]
/faq
/dashboard
/dashboard/quotes
/dashboard/projects
/dashboard/profile
/sign-in
/sign-up
```

### Navigation Rules

1. **Main Navigation Items** (in order):
   - Home
   - Services (dropdown)
   - Before & After
   - Request Quote (highlighted)
   - About Us
   - Contact
   - Sign In

2. **Mobile Navigation**:
   - Hamburger menu (top right)
   - Slide-in drawer from right
   - Click-to-call button prominent
   - Emergency services banner

3. **Breadcrumbs** (on all pages except home):
   - Format: Home > Section > Current Page
   - Clickable links
   - Current page not clickable

4. **Active State**:
   - Orange underline on active nav item
   - Different style for current page

---

## 💾 DATA MANAGEMENT

### Local Storage Keys (STANDARDIZE)
```typescript
const STORAGE_KEYS = {
  QUOTE_DRAFT: 'rhino_quote_draft',
  USER_PREFERENCES: 'rhino_user_prefs',
  AUTH_TOKEN: 'rhino_auth_token',
} as const;
```

### Form Data Persistence

1. **Quote Form**:
   - Auto-save to localStorage every 30 seconds
   - Save on step change
   - Clear on successful submission
   - Restore on page load if exists

2. **User Session**:
   - Store auth token securely
   - Clear on logout
   - Validate on page load

### API Response Handling (REQUIRED)
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Always handle:
try {
  const response = await fetch('/api/quote', {...});
  const data: ApiResponse<QuoteData> = await response.json();
  
  if (!data.success) {
    // Show error to user
    toast.error(data.error || 'Something went wrong');
    return;
  }
  
  // Handle success
  toast.success(data.message || 'Success!');
} catch (error) {
  // Network error
  toast.error('Unable to connect. Please try again.');
}
```

---

## ⚡ PERFORMANCE REQUIREMENTS

### Image Optimization (STRICT)

1. **Always use Next.js Image**:
```typescript
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  priority // only for above-fold images
  className="object-cover"
/>
```

2. **Image Rules**:
   - WebP format preferred
   - Lazy load below the fold
   - Use `priority` for hero images only
   - Provide proper width/height
   - Always include descriptive alt text

3. **Image Sizes**:
   - Hero images: max 1920x1080, < 200KB
   - Gallery thumbnails: 400x300, < 50KB
   - Before/After: 800x600, < 100KB
   - Profile photos: 200x200, < 30KB

### Code Splitting

1. **Dynamic Imports** (use for):
   - Heavy components
   - Components below fold
   - Modal content
   - Dashboard features

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <LoadingSkeleton />,
  ssr: false, // if client-side only
});
```

2. **Route-Based Splitting**:
   - Automatic with Next.js App Router
   - Keep route components small
   - Extract reusable logic

### Performance Targets (MUST MEET)
- **Lighthouse Score**: 90+ (mobile and desktop)
- **First Contentful Paint**: < 1.8s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.8s
- **Cumulative Layout Shift**: < 0.1

---

## 🔍 SEO REQUIREMENTS

### Meta Tags (EVERY PAGE)
```typescript
// app/layout.tsx or page.tsx
export const metadata = {
  title: 'Page Title | Rhino Construction',
  description: 'Compelling description 150-160 characters',
  openGraph: {
    title: 'Page Title',
    description: 'Description for social sharing',
    images: ['/images/og-image.jpg'],
  },
};
```

### Heading Hierarchy (ENFORCE)
- Only ONE H1 per page
- H2 for main sections
- H3 for subsections
- Never skip levels

### Structured Data (REQUIRED)
```typescript
// Add to relevant pages
const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Rhino Construction",
  // ... rest of schema
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

### URL Rules
- Lowercase only
- Use hyphens (not underscores)
- Descriptive and readable
- No special characters
- Include keywords when relevant

---

## ♿ ACCESSIBILITY STANDARDS

### WCAG 2.1 AA Compliance (MANDATORY)

1. **Color Contrast**:
   - Normal text: 4.5:1 minimum
   - Large text: 3:1 minimum
   - Use WebAIM contrast checker

2. **Keyboard Navigation**:
   - All interactive elements tabbable
   - Logical tab order
   - Visible focus indicators
   - Escape closes modals
   - Skip to main content link

3. **ARIA Labels** (when needed):
```typescript
<button aria-label="Close modal">
  <X className="h-6 w-6" />
</button>

<nav aria-label="Main navigation">
  {/* nav items */}
</nav>

<div role="alert" aria-live="polite">
  {errorMessage}
</div>
```

4. **Form Accessibility**:
```typescript
<label htmlFor="email" className="block mb-2">
  Email Address <span className="text-error">*</span>
</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <span id="email-error" role="alert" className="text-error text-sm">
    {errors.email.message}
  </span>
)}
```

5. **Images**:
   - Decorative images: `alt=""`
   - Content images: descriptive alt text
   - Complex images: provide longer description

6. **Motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📱 MOBILE-FIRST RULES

### Breakpoints (USE THESE)
```typescript
// Tailwind config
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

### Mobile Requirements (CRITICAL)

1. **Touch Targets**:
   - Minimum 44x44px for all interactive elements
   - Adequate spacing between clickable items
   - No hover-only interactions

2. **Responsive Images**:
```typescript
<Image
  src="/images/hero.jpg"
  alt="Hero"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
  className="object-cover"
/>
```

3. **Mobile Navigation**:
   - Hamburger menu at 768px and below
   - Full-screen drawer preferred
   - Close on route change
   - Scroll lock when open

4. **Forms on Mobile**:
   - Stack fields vertically
   - Full-width inputs
   - Appropriate input types (tel, email, etc.)
   - Large, easy-to-tap buttons

5. **Click-to-Call** (automatic on mobile):
```typescript
<a href="tel:+12065557446" className="...">
  (206) 555-RHINO
</a>
```

6. **Testing Requirements**:
   - Test on real devices
   - Test in Chrome DevTools mobile view
   - Test landscape and portrait
   - Test on iOS and Android

---

## 🔒 SECURITY GUIDELINES

### Input Sanitization (ALWAYS)

1. **Never Trust User Input**:
   - Validate on client AND server
   - Sanitize before storing
   - Escape before displaying
   - Use parameterized queries

2. **XSS Prevention**:
   - React automatically escapes
   - Be careful with `dangerouslySetInnerHTML`
   - Sanitize rich text content
   - Validate file uploads

3. **File Upload Security**:
   - Validate file type (MIME and extension)
   - Check file size
   - Scan for malware (server-side)
   - Store with random names
   - Never execute uploaded files

4. **Authentication**:
   - Use secure, httpOnly cookies
   - Implement CSRF protection
   - Hash passwords (bcrypt)
   - Use secure session management

5. **API Security**:
   - Rate limiting
   - Input validation
   - Authentication required
   - CORS properly configured

---

## ✅ TESTING CHECKLIST

### Before Committing (EVERY TIME)

- [ ] Component renders without errors
- [ ] All links work correctly
- [ ] Forms validate properly
- [ ] Mobile layout looks good
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Images load properly
- [ ] Loading states work
- [ ] Error states work
- [ ] Accessibility checked (tab navigation)

### Before Deploying Feature

- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS and Android)
- [ ] Lighthouse audit passes (90+)
- [ ] All forms submit correctly
- [ ] Error handling works
- [ ] Loading states display
- [ ] Images optimized
- [ ] SEO meta tags present
- [ ] Analytics tracking working
- [ ] No broken links
- [ ] Performance acceptable
- [ ] Accessibility audit passes

### Integration Testing

- [ ] Quote form submission works end-to-end
- [ ] User authentication flow works
- [ ] Payment processing (if applicable)
- [ ] Email notifications sent
- [ ] Data persists correctly
- [ ] File uploads work
- [ ] Search functionality works
- [ ] Filtering works correctly

---

## 🚨 COMMON MISTAKES TO AVOID

### ❌ DON'T DO THIS:

1. **Don't use inline styles**:
```typescript
// BAD
<div style={{ color: 'red' }}>Error</div>

// GOOD
<div className="text-error">Error</div>
```

2. **Don't use `any` type**:
```typescript
// BAD
const handleClick = (data: any) => {}

// GOOD
interface ClickData {
  id: string;
  name: string;
}
const handleClick = (data: ClickData) => {}
```

3. **Don't forget loading states**:
```typescript
// BAD
const handleSubmit = async () => {
  await submitForm();
}

// GOOD
const [isLoading, setIsLoading] = useState(false);
const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await submitForm();
  } finally {
    setIsLoading(false);
  }
}
```

4. **Don't use `<a>` for internal links**:
```typescript
// BAD
<a href="/services">Services</a>

// GOOD
import Link from 'next/link';
<Link href="/services">Services</Link>
```

5. **Don't skip error handling**:
```typescript
// BAD
const data = await fetch('/api/data').then(r => r.json());

// GOOD
try {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed to fetch');
  const data = await response.json();
} catch (error) {
  console.error(error);
  toast.error('Failed to load data');
}
```

---

## 📊 CONSTANTS REFERENCE

### Company Information
```typescript
export const COMPANY_INFO = {
  name: 'Rhino Construction',
  tagline: 'Building Trust, One Project at a Time',
  phone: '(206) 555-RHINO',
  phoneRaw: '+12065557446',
  emergency: '(206) 555-HELP',
  email: 'info@rhinoconstruction.com',
  address: {
    street: '123 Main St',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
  },
  hours: {
    weekday: 'Mon-Fri: 7:00 AM - 6:00 PM',
    saturday: 'Sat: 8:00 AM - 4:00 PM',
    sunday: 'Sun: Closed (Emergency services available)',
  },
  license: '#123456',
  serviceRadius: '40 miles from Seattle',
} as const;
```

### Service Categories
```typescript
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
```

### File Upload Limits
```typescript
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  ACCEPTED_FORMATS: ['image/jpeg', 'image/png', 'image/heic'],
  ACCEPTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.heic'],
} as const;
```

---

## 🎓 LEARNING RESOURCES

### Official Documentation
- Next.js: https://nextjs.org/docs
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Shadcn UI: https://ui.shadcn.com
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev

### Accessibility
- WebAIM: https://webaim.org
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref
- ARIA Practices: https://www.w3.org/WAI/ARIA/apg

### SEO
- Google Search Central: https://developers.google.com/search
- Schema.org: https://schema.org

---

## 🔄 VERSION CONTROL

### Commit Message Format
```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, styling
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

Example:
```
feat(quote-form): add image upload functionality

- Implemented drag-and-drop image upload
- Added image compression
- Added preview thumbnails
- Limited to 10 images max

Closes #123
```

---

## 🎯 PRIORITY CHECKLIST

### Must Have Before Launch
- [ ] All core pages functional
- [ ] Quote request form working
- [ ] Mobile responsive
- [ ] SEO meta tags on all pages
- [ ] Analytics installed
- [ ] Contact forms working
- [ ] No console errors
- [ ] Accessibility basics met
- [ ] Performance > 85 on Lighthouse

### Nice to Have
- [ ] Blog section
- [ ] Advanced dashboard features
- [ ] Live chat
- [ ] Video testimonials
- [ ] Interactive cost calculator

---

## 📞 WHEN IN DOUBT

1. **Check this file first**
2. Refer to official documentation
3. Follow existing patterns in codebase
4. Ask for clarification
5. Test thoroughly

---

**Remember**: Quality over speed. Better to build it right the first time than to rush and fix it later.

**Last Updated**: January 2024
**Version**: 1.0.0
