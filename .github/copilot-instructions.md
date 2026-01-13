# AI Coding Guidelines for Church App

## Project Overview
This is a **Next.js 16 church website** built with React 19, TypeScript, and React Bootstrap. It uses a page-based routing structure with app directory conventions and Tailwind CSS styling.

## Architecture

### File Structure & Key Components
- **`app/`** - Next.js app directory with route segments
  - `(home)/page.tsx` - Home page (uses path group for organization)
  - `about/`, `contact/` - Static pages with consistent layouts
  - `layout.tsx` - Root layout with global navbar/footer structure
- **`components/`** - Reusable React components (all client-only with `"use client"`)
  - UI Components: `AppNavbar`, `AppFooter`, `PageTitle` (small, composable)
  - Feature Components: `HomeCarousel`, `Timeline`, `HomeHero` (larger, page-specific)
  - Icon/Image Components: `CrossImage`, `CompassIcon`, `HomeIcon` (use Next.js `Image` for optimization)

### Layout Architecture
The app uses a sticky footer pattern: `Stack(direction="vertical", min-vh-100)` with navbar at top, content in middle, footer at bottom. All pages wrap in root layout with consistent spacing (`p-4`).

### State & Data Management
- **No state management library used** - prefer React hooks for local component state
- Data is currently hardcoded in components (e.g., carousel items, timeline events)
- For future data: fetch at page level, pass via props to presentational components

## Development Conventions

### Styling Strategy
- **React Bootstrap** for component framework (Grid, Nav, Carousel, Stack)
- **Bootstrap CSS classes** for sizing, spacing, text utilities
- **Tailwind CSS** (configured but minimally used - prefer Bootstrap for consistency)
- Dark theme enabled on `<html>` element: `data-bs-theme="dark"`
- Responsive Bootstrap utilities: `md={4}` for grid columns, `mb-4 mb-md-0` for mobile-first spacing

### Component Patterns
1. **Functional Components** - Use named exports (not default) when multiple components per file
2. **TypeScript Props** - Always type component props as inline interfaces:
   ```tsx
   export default function ComponentName({ 
     prop1, 
     prop2 = "default" 
   }: { 
     prop1: string; 
     prop2?: string;
   }) {
   ```
3. **Client Components** - Add `"use client"` directive if: using hooks, event handlers, or client state. Server components are default.
4. **Images** - Use Next.js `Image` component (not HTML `<img>`) and import static images from `@/public/`. Set `loading="eager"` for above-fold images.

### Imports & Aliases
- Use path alias `@/` for all internal imports (configured in `tsconfig.json`)
- Organize imports: React/Next → Third-party → Internal components
- No wildcard imports; Prettier enforces sorted imports via `@trivago/prettier-plugin-sort-imports`

## Development Workflow

### Build & Run Commands
```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint + Prettier checks
```

### Code Quality
- **ESLint** enforces Next.js best practices (core-web-vitals, TypeScript rules, no Prettier conflicts)
- **Prettier** auto-formats with sorted imports; no manual formatting needed
- **TypeScript Strict Mode** enabled - all types must be explicit

### Key Files to Understand Before Coding
- [next.config.ts](next.config.ts) - Empty; modify here for Next.js-specific configuration
- [config.ts](config.ts) - Currently empty; reserved for app-level constants
- [eslint.config.mjs](eslint.config.mjs) - Flat config; extends Next.js + Prettier rules
- [app/layout.tsx](app/layout.tsx) - Root layout; modify for global content or metadata

## Page-Specific Notes
- **Home page** - Uses `(home)` path group; contains hero, carousel, info cards, and timeline sections
- **About/Contact pages** - Static pages; follow home page layout pattern with `PageTitle` component
- **Responsive design** - Mobile-first; use Bootstrap breakpoints (md, lg)

## Common Gotchas
- ⚠️ All components in `components/` must have `"use client"` unless proven as server components
- ⚠️ Don't mix Tailwind and Bootstrap utilities in the same component (use Bootstrap for consistency)
- ⚠️ Next.js `Image` component requires explicit `width` and `height`; don't use responsive sizing without container queries
- ⚠️ App router uses layouts and route segments; no `pages/` directory structure

## Future Considerations
- State management: Plan for Redux/Zustand if app complexity grows beyond component props
- Backend integration: If adding API routes, use `app/api/` directory with server-only secrets in `.env.local`
- Database: No ORM configured; evaluate Prisma or Drizzle when needed
