
# Add Minimal Sticky Navbar to Quote Confirmation Page

## Overview
Apply the same minimal, sticky navbar treatment from `/request-quote` to the `/request-quote/confirmation` page for consistent brand continuity throughout the quote flow.

## Current State
The confirmation page (`src/pages/QuoteConfirmation.tsx`) currently has:
- No navbar/header
- Direct content starting with the success animation
- No footer (which is correct per requirements)

## Changes Required

### File: `src/pages/QuoteConfirmation.tsx`

**1. Add Required Imports**
```typescript
import rhinoLogo from "@/assets/rhino-remodeler-logo.png";
import { COMPANY_INFO } from "@/lib/constants";
```

**2. Add Sticky Navbar Header**
Insert the same minimal navbar structure used in RequestQuote.tsx at the top of the component's return statement (before the main content div):

```jsx
{/* Minimal Sticky Navbar */}
<header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40 print:hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
    {/* Logo - links to home */}
    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
      <img 
        src={rhinoLogo} 
        alt="Rhino Remodeler" 
        className="h-10 sm:h-12 w-auto"
      />
      <span className="text-lg sm:text-xl font-bold text-primary tracking-tight hidden sm:inline">
        RHINO REMODELER
      </span>
    </Link>

    {/* Phone Number - tap to call */}
    <a 
      href={`tel:${COMPANY_INFO.phoneRaw}`}
      className="flex items-center gap-2 text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
    >
      <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
      <span className="hidden sm:inline">{COMPANY_INFO.phone}</span>
      <span className="sm:hidden">Call Us</span>
    </a>
  </div>
</header>
```

**3. Adjust Page Structure**
Wrap the existing content in a proper container to work with the sticky header:
- Current: `<div className="min-h-screen bg-muted/30 py-8 px-4 print:bg-white print:py-0">`
- Will need a wrapper `<div className="min-h-screen bg-muted/30">` with the header, then the content area

## Navbar Specifications

| Element | Desktop | Mobile |
|---------|---------|--------|
| Logo | Image + "RHINO REMODELER" text | Image only |
| Phone | Full number: (206) 487-9677 | "Call Us" with icon |
| Position | Sticky at top | Sticky at top |
| Print | Hidden | Hidden |

## Technical Details
- The `Phone` icon is already imported in the file (line 8)
- The `Link` component is already imported (line 2)
- Add `print:hidden` class to navbar to exclude from print view
- Maintains the same 21st.dev-inspired minimal aesthetic as the quote form
