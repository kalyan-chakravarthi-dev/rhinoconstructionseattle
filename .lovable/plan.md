

# Comprehensive Spanish Language Support

## Overview

This plan extends Spanish (Espanol) translations to all remaining sections of the Rhino Construction website. Currently, only the Navbar, Hero, Services section, Call to Action, and Footer are translated. This update will add Spanish support to all other customer-facing pages and components.

---

## What Will Be Translated

### Homepage Components
- **Testimonials Section** - Customer quotes, section headings, Google review badge text
- **Service Areas Section** - City names stay in English (proper nouns), but all labels and descriptions will be translated
- **Before/After Gallery** - Section headings, slider labels, project descriptions

### Main Pages
- **About Page** - Company story, team section, mission statement, certifications, quality commitment
- **Services Hub Page** - Page headings, service descriptions, comparison table, process steps, special offers
- **Contact Page** - Form labels, FAQ section, contact information labels, emergency banner
- **Before & After Gallery Page** - Page title, descriptions, instructions

### Authentication Pages
- **Sign In Page** - Form labels, buttons, links
- **Sign Up Page** - Form labels, buttons, validation messages

### Quote Request Flow
- **Request Quote Form** - All 5 steps including service types, project details, contact fields, and review section
- **Quote Confirmation Page** - Success messages, next steps

### Common Elements
- **Trust Badges** - Already have keys, ensure usage across all pages
- **Form Validation Messages** - Error messages in Spanish
- **Buttons & CTAs** - All common action buttons

---

## Implementation Approach

### Phase 1: Expand Translation Files
Add all new translation keys to `src/i18n/locales/en.json` and `es.json`:

**New Key Sections:**
```text
- testimonials: Section title, subtitle, review badge text
- serviceAreas: Section title, labels, CTA text
- gallery: Section headings, slider labels
- about: All section content (hero, story, stats, team, etc.)
- servicesPage: Hub page content
- contact: Form labels, FAQs, contact info labels
- auth: Sign in/up form labels and messages
- quote: All 5 steps of the quote form
- common: Shared buttons, labels, validation messages
```

### Phase 2: Update Components
Integrate `useTranslation` hook into each component:

**Homepage Components:**
1. `Testimonials.tsx` - Section headers, review count text
2. `ServiceAreas.tsx` - All text except city names
3. `BeforeAfterGallery.tsx` - Section headers, labels

**Pages:**
4. `AboutPage.tsx` - All text content
5. `ServicesPage.tsx` - Headers, descriptions, process steps
6. `ContactPage.tsx` - Form labels, FAQs, info labels
7. `SignIn.tsx` - Form labels, buttons
8. `SignUp.tsx` - Form labels, buttons
9. `RequestQuote.tsx` - All steps (largest file)
10. `QuoteConfirmation.tsx` - Success messages

### Phase 3: Data Files Consideration
For service data in `src/data/services.ts` and `src/data/services-overview.ts`:
- Create translation keys for service names and descriptions
- Keep technical specifications in English (brand names, dimensions)

---

## Translation File Structure

The updated `es.json` will include approximately 200+ new translation keys organized as:

```text
{
  "nav": { ... },           // Existing
  "hero": { ... },          // Existing
  "trustBadges": { ... },   // Existing
  "services": { ... },      // Existing
  "cta": { ... },           // Existing
  "footer": { ... },        // Existing
  "language": { ... },      // Existing
  
  // NEW SECTIONS
  "testimonials": {
    "title": "Lo Que Dicen Nuestros Clientes",
    "subtitle": "No solo tome nuestra palabra",
    "fromReviews": "de 150+ reseñas",
    "readMore": "Leer Más Reseñas en Google"
  },
  "serviceAreas": {
    "title": "Cobertura de Servicio",
    "heading": "Sirviendo Seattle y Áreas Cercanas",
    ...
  },
  "gallery": { ... },
  "about": {
    "hero": { ... },
    "story": { ... },
    "stats": { ... },
    "team": { ... },
    ...
  },
  "contact": {
    "title": "Contáctenos",
    "form": { ... },
    "faq": { ... },
    ...
  },
  "auth": {
    "signIn": { ... },
    "signUp": { ... }
  },
  "quote": {
    "step1": { ... },
    "step2": { ... },
    "step3": { ... },
    "step4": { ... },
    "step5": { ... }
  },
  "common": {
    "submit": "Enviar",
    "cancel": "Cancelar",
    "save": "Guardar",
    "next": "Siguiente",
    "back": "Atrás",
    ...
  }
}
```

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/i18n/locales/en.json` | Add ~200 new translation keys |
| `src/i18n/locales/es.json` | Add ~200 Spanish translations |
| `src/components/Testimonials.tsx` | Add `useTranslation` hook |
| `src/components/ServiceAreas.tsx` | Add `useTranslation` hook |
| `src/components/BeforeAfterGallery.tsx` | Add `useTranslation` hook |
| `src/pages/AboutPage.tsx` | Add `useTranslation` hook to all sections |
| `src/pages/ServicesPage.tsx` | Add `useTranslation` hook |
| `src/pages/ContactPage.tsx` | Add `useTranslation` hook |
| `src/pages/SignIn.tsx` | Add `useTranslation` hook |
| `src/pages/SignUp.tsx` | Add `useTranslation` hook |
| `src/pages/RequestQuote.tsx` | Add `useTranslation` hook (largest change) |
| `src/pages/QuoteConfirmation.tsx` | Add `useTranslation` hook |
| `src/pages/BeforeAfterGalleryPage.tsx` | Add `useTranslation` hook |
| `src/pages/FAQPage.tsx` | Add `useTranslation` hook |

---

## Estimated Effort

- **Translation files**: ~200 new keys per language
- **Components to update**: 13+ files
- **Priority order**: Homepage components first, then pages in order of customer visibility

---

## What Stays in English

- Brand names (Rhino Construction, GAF, Kohler, etc.)
- City names (Seattle, Bellevue, etc.)
- Technical specifications
- License numbers
- Email addresses and phone numbers

