# Copilot Instructions for Whitehead Church App

## Repository Overview

**Purpose**: Church website for Whitehead Baptist Church  
**Type**: Next.js 16 (App Router) with React 19 and TypeScript  
**Size**: ~1,400 lines of code, 46MB (with dependencies)  
**Runtime**: Node.js v20 (tested with v20.19.6), npm v10.8.2

## Critical Setup - ALWAYS Follow This Order

### 1. Install Dependencies (REQUIRED FIRST)

**ALWAYS run `npm install` before any other command.** All npm scripts will fail without dependencies.

```bash
npm install  # Takes ~15-40 seconds, installs all required packages (~400 packages)
```

**Error if skipped**: `sh: 1: next: not found` or `sh: 1: eslint: not found`

**If npm install has issues**: Occasionally dependencies may be in a corrupted state. Clean and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

### 2. Build Commands (Validated Sequence)

```bash
# Development server (runs on http://localhost:3000 per package.json)
npm run dev

# Production build (takes ~10 seconds with Turbopack)
npm run build

# Lint code (ESLint with Prettier integration)
npm run lint

# Start production server (requires prior build)
npm run start
```

### 3. Build Output & Timing

- **Clean build time**: ~10 seconds using Turbopack
- **Output directory**: `.next/` (gitignored, safe to delete for clean builds)
- **Standalone output**: Enabled via `next.config.ts` for Docker deployment
- **Routes generated**: Home, About, Gallery, Timeline modal, Auth (login/register/logout), User settings (protected), Admin dashboard with service-times management (protected), API routes for auth and service times

## Project Architecture

### Directory Structure

```
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (home)/               # Home page
│   │   │   ├── page.tsx
│   │   │   └── _components/      # Home-only components
│   │   ├── (info)/               # Info pages
│   │   │   ├── layout.tsx
│   │   │   ├── about/            # About with timeline modal
│   │   │   │   ├── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── _components/
│   │   │   │   ├── @modal/       # Timeline modal
│   │   │   │   └── timeline/
│   │   │   └── gallery/          # Gallery page
│   │   │       ├── page.tsx
│   │   │       └── _components/
│   │   ├── (others)/             # Shared layouts + auth/admin/user
│   │   │   ├── layout.tsx
│   │   │   ├── (auth)/           # Auth routes with modals
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── email-verified/
│   │   │   │   ├── login/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   └── @modal/   # Email verification / 2FA modals
│   │   │   │   ├── logout/
│   │   │   │   └── register/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── layout.tsx
│   │   │   │       └── @modal/   # Registration success modal
│   │   │   ├── admin/            # Admin dashboard (protected)
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── service-times/
│   │   │   │       ├── layout.tsx
│   │   │   │       ├── page.tsx
│   │   │   │       └── @modal/   # CRUD modals for service times
│   │   │   ├── user/             # User settings (protected)
│   │   │   │   └── settings/
│   │   │   │       ├── layout.tsx
│   │   │   │       ├── page.tsx
│   │   │   │       └── @modal/
│   │   ├── api/                  # API routes
│   │   │   ├── auth/[...all]/    # Better Auth handler
│   │   │   └── service-times/
│   │   │       ├── route.ts      # GET/POST
│   │   │       └── [id]/route.ts # PUT/DELETE
│   │   ├── layout.tsx            # Root layout (navbar/footer)
│   │   ├── loading.tsx           # Loading UI
│   │   └── globals.css           # Global styles
│   ├── components/               # Shared UI components
│   │   └── ui/
│   │       ├── AppFooter.tsx
│   │       ├── AppNavbar.tsx
│   │       ├── AuthForm.tsx
│   │       ├── InfoPage.tsx
│   │       ├── LinkButton.tsx
│   │       ├── buttons/          # AddStarterServiceTimesButton.tsx
│   │       ├── forms/            # ServiceTimeForm.tsx
│   │       ├── images/           # CrossImage, DefaultAvatarImage
│   │       ├── modals/           # AppModal, ServiceTimeModal, 2FA, etc.
│   │       └── templates/        # Email templates (verification, 2FA)
│   ├── lib/                      # Server utilities & data
│   │   ├── actions.ts            # Server actions for mutations
│   │   ├── auth.ts / auth-client.ts / auth-config.ts
│   │   ├── auth-session.ts       # verifySession, verifyUserAdmin helpers
│   │   ├── data.ts               # Data fetching
│   │   ├── email.ts              # Resend email integration
│   │   └── mongodb.ts            # MongoDB connection helper
│   ├── schemas/                  # Zod validation schemas
│   │   └── ServiceTime.ts
│   ├── models/                   # Mongoose models
│   │   ├── GalleryImage.ts
│   │   ├── ServiceTime.ts
│   │   ├── StaffMember.ts
│   │   └── TimelineEvent.ts
│   └── types/
│       └── global.d.ts
├── public/                       # Static assets
├── Dockerfile                    # Docker configuration
├── compose.yml                   # Docker Compose (MongoDB)
└── package.json                  # Scripts and dependencies
```

### Key Configuration Files (Root Directory)

- `package.json` - Dependencies and npm scripts
- `tsconfig.json` - TypeScript config with strict mode, `@/*` and `@public/*` path aliases
- `eslint.config.mjs` - Flat config using Next.js + Prettier rules
- `.prettierrc.json` - Prettier config with import sorting plugin
- `next.config.ts` - Next.js config with `output: "standalone"` for Docker
- `postcss.config.mjs` - PostCSS with Tailwind CSS plugin
- `Dockerfile` - Multi-stage Docker build (Node 20 Alpine)
- `compose.yml` - Docker Compose with MongoDB service (port 27017)

## Build & Validation Workflow

### Pre-Build Checklist

1. ✅ Run `npm install` if `node_modules/` doesn't exist
2. ✅ Check Node version is v20+ (`node --version`)
3. ✅ Ensure no `.next/` conflicts (delete for clean build if needed)

### Validation Steps (in order)

```bash
# 1. Lint check (catches TypeScript errors + style issues)
npm run lint
# Expected: May show warnings (e.g., unused imports), but should exit 0

# 2. Production build (validates everything compiles)
npm run build
# Expected: "✓ Compiled successfully in ~10s", generates all app routes (home, info pages, auth, admin, user, modals, APIs)

# 3. Format check (optional, Prettier validation)
npx prettier --check .
# Expected: "All matched files use Prettier code style!"
```

### Known Lint Warnings (Safe to Ignore)

- `src/app/(info)/gallery/_components/GalleryCarousel.tsx` - "Button is defined but never used" (current as of last check)

## Component & Code Conventions

### TypeScript & Component Patterns

- **All components**: Functional components with TypeScript
- **Client components**: Add `"use client"` directive for hooks/event handlers (most components)
- **Props typing**: Use inline interfaces, not separate type definitions
  ```tsx
  export default function Component({
    prop1,
    prop2 = "default",
  }: {
    prop1: string;
    prop2?: string;
  }) {}
  ```

### Styling Strategy (IMPORTANT)

- **Primary**: React Bootstrap components (Container, Stack, Row, Col, Nav, Carousel)
- **Utility classes**: Bootstrap CSS utilities for spacing/sizing (e.g., `mb-4`, `p-4`)
- **Avoid**: Mixing Tailwind classes with Bootstrap (Tailwind configured but minimally used)
- **Theme**: Dark mode via `data-bs-theme="dark"` on `<html>`

### Import Organization (Prettier enforced)

Order: `server-only` → Built-ins → React/Next → React Bootstrap → Third-party → `@/*` imports → Relative

```tsx
import { Metadata } from "next";

// Next.js
import Container from "react-bootstrap/Container";

// React Bootstrap
import AppNavbar from "@/components/ui/AppNavbar";

// Internal
import "./globals.css";

// Relative
```

### Path Aliases

- **`@/*`** resolves to project root (e.g., `@/components`, `@/lib/config`)
- **`@public/*`** resolves to `public/*`
- Configured in `tsconfig.json` paths

## Docker & Deployment

### Docker Build (Multi-stage)

```bash
# Build image (uses package-lock.json, runs npm ci)
docker build -t whitehead-church-app .

# Run container
docker run -p 3000:3000 whitehead-church-app
```

**Build stages**: deps → builder → runner (production-optimized)  
**Output**: Standalone mode with optimized static assets

### Docker Compose (MongoDB)

```bash
docker compose up -d  # Starts MongoDB on port 27017
```

Note: MongoDB is used for authentication, service times, and content data. Compose is optional if you supply your own MongoDB URI.

## Data Management

- **Database**: MongoDB via Mongoose models in `src/models`
- **Data access**: Server utilities in `src/lib/data.ts`
- **Server Actions**: Mutations handled in `src/lib/actions.ts`
- **Validation**: Zod schemas in `src/schemas/ServiceTime.ts`
- **API routes**: `/api/auth/[...all]` (Better Auth) and `/api/service-times` (+ `/api/service-times/[id]`)

## Common Pitfalls & Solutions

### Build Failures

❌ **`next: not found`** → Run `npm install` first  
❌ **TypeScript errors** → Check `tsconfig.json` strict mode compliance  
❌ **Module not found** → Verify `@/*` and `@public/*` imports use correct paths

### Component Issues

❌ **Hydration errors** → Ensure `"use client"` for client-only features  
❌ **Image optimization errors** → Use `next/image` with explicit width/height  
❌ **Bootstrap styles not loading** → Check `bootstrap/dist/css/bootstrap.min.css` import in layout

## Testing & Validation

**No test framework configured** - Manual validation required:

1. Build must succeed without errors (`npm run build`)
2. Lint must pass with only known warnings (`npm run lint`)
3. Dev server must start (`npm run dev`) and pages load at http://localhost:3000

## CI/CD Information

**No GitHub Actions workflows configured** - Validation is manual only. When adding CI:

- Use Node 20+ in workflow
- Run `npm install → npm run lint → npm run build` sequence
- Consider adding `npx prettier --check .` for formatting validation

## Quick Reference: File Manifest

**Root files**: `.dockerignore`, `.gitignore`, `.prettierignore`, `.prettierrc.json`, `compose.yml`, `Dockerfile`, `eslint.config.mjs`, `next.config.ts`, `package.json`, `postcss.config.mjs`, `README.md`, `tsconfig.json`  
**Gitignored**: `node_modules/`, `.next/`, `.env*`, `*.log`, `*.tsbuildinfo`, `info.txt`, `/secrets`

---

**Trust these instructions.** Only search for additional information if commands fail or documented behavior differs from observed behavior.
