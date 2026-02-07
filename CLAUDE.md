# CLAUDE.md
**Project: Rhino Remodeler – Web Application**

## Purpose
This file defines **project-specific rules, architecture, and constraints** that Claude must follow when generating or modifying code for this repository.

**Highest priority rule:**
> If user instructions conflict with this file, **follow the user**.

---

## Tech Stack (Authoritative)

- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router (defined in `App.tsx`)
- **Backend:** Supabase
  - Database (Postgres)
  - Auth
  - Storage
  - Edge Functions
- **i18n:** English + Spanish
- **Build Tool:** Vite
- **Package Manager:** npm

⚠️ **This is NOT a Next.js project. Do not introduce Next.js patterns.**

---

## Project Structure (Matches Reality)

```
src/
├── components/
│   ├── dashboard/
│   ├── service-page/
│   ├── settings/
│   └── shared/
│
├── pages/
│   ├── Index.tsx
│   ├── ServicesPage.tsx
│   ├── ServicePage.tsx
│   └── ...
│
├── data/
│   ├── services.ts
│   └── quotes-mock.ts
│
├── i18n/
│   └── locales/
│       ├── en.json
│       └── es.json
│
├── integrations/
│   └── supabase/
│       ├── client.ts
│       └── types.ts
│
├── lib/
│   ├── constants.ts
│   ├── validations.ts
│   └── ...
│
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

### Notes
- No `routes/` folder — routing lives in `App.tsx`
- No `styles/` directory — global styles in `index.css`
- Utilities belong in `lib/`, not `utils/`

---

## Path Aliases

```
@/ → ./src/
```

Use path aliases instead of deep relative imports.

---

## Supabase Context

Supabase is the **single backend**:
- Database
- Auth
- Storage
- Edge Functions

Rules:
- Respect RLS policies
- Do not bypass auth
- Prefer Edge Functions for server logic
- Never expose secrets client-side

---

## Internationalization (i18n)

- Supported: **English (en)**, **Spanish (es)**
- Locale files: `src/i18n/locales/`
- All user-facing text must be translatable

---

## Key Files

- `lib/constants.ts`
- `lib/validations.ts`
- `integrations/supabase/client.ts`
- `integrations/supabase/types.ts`

Check these before adding new logic.

---

## Business Rules

- **Tracking ID format:** `RQT-YYYY-XXXX`
  - Example: `RQT-2026-0142`
- Quote flow, dashboard, and settings are core UX paths

---

## Development

- **Dev command:** `npm run dev`
- **Port:** `8080`

### ARM64 Windows
ARM64 workarounds exist in:
- `package.json`
- `vite.config.ts`

Do not remove without instruction.

---

## Code Standards

- TypeScript only
- Prefer explicit types
- Reuse `components/shared`
- Follow existing patterns first

---

## Claude Guardrails

Claude **must**:
- Match the real codebase
- Ask before large refactors
- Respect Supabase + i18n

Claude **must not**:
- Introduce Next.js
- Invent folders
- Ignore RLS or auth

---

## Priority Order

1. User instructions
2. This file
3. Existing code patterns
4. General best practices

---

## Testing Strategy (Authoritative)

This project follows a **layered testing approach**.

### Approved Tools
- **Unit & Component Tests:** Vitest + @testing-library/react
- **E2E Tests:** Playwright

Do NOT introduce:
- Jest
- Cypress
- Enzyme

### Testing Rules
- Prefer **unit and component tests** over E2E
- E2E tests should cover **critical user flows only**
- Mock Supabase in unit/integration tests
- Never hit real Supabase services in automated tests
- Tests must be deterministic and fast

### Scope Guidelines
- Validate logic in `lib/`
- Test shared components in `components/shared`
- Avoid snapshot testing unless explicitly requested

If user instructions conflict with these rules, **follow the user**.

