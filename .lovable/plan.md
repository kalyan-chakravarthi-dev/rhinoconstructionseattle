
# Navigation Restructuring: Move "Before & After" Under Services

## Overview
This change will streamline the navigation by moving the "Before & After" gallery from a standalone navbar item to be accessible through the Services section. This creates a cleaner navigation structure and positions the portfolio as supporting evidence for the services offered.

## Changes Summary

### 1. Update Navbar Component (`src/components/Navbar.tsx`)
- Remove the "Before & After" link from the main `navItems` array
- Final navigation structure will be: **Home | Services | About Us | Contact**

### 2. Add Gallery Link to Services Page (`src/pages/ServicesPage.tsx`)
- Add a new "View Our Work" section or card that links to the Before & After gallery
- Position it prominently within the services grid or as a featured CTA
- This provides a natural discovery path: Services → See our completed work

### 3. Update Services Component on Homepage (`src/components/Services.tsx`)  
- Add a secondary CTA or link to the gallery section
- Users can go from the services overview directly to the portfolio

### 4. Update Translation Files
- No translation changes needed for the navbar (we're just removing the item)
- May add new gallery-related translations for the Services page if needed

## Benefits
- **Cleaner navigation**: 4 items instead of 5 = less cognitive load
- **Better conversion flow**: Services → Portfolio → Quote is a natural journey
- **Logical grouping**: The gallery showcases service quality, so it belongs with services
- **Mobile-friendly**: Fewer nav items means a tidier mobile menu

## Technical Details

| File | Change Type |
|------|-------------|
| `src/components/Navbar.tsx` | Remove gallery from navItems array (line 19) |
| `src/pages/ServicesPage.tsx` | Add gallery CTA/link section after ServicesGrid |
| `src/components/Services.tsx` | Add secondary "See Our Work" link |
| `src/i18n/locales/en.json` | Add new translations for gallery link on services |
| `src/i18n/locales/es.json` | Add Spanish translations |
