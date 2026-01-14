# Copilot Instructions for Whitehead Church App

## Repository Overview

**Purpose**: Church website for Whitehead Baptist Church  
**Type**: Next.js 16 web application with React 19 and TypeScript  
**Size**: ~900 lines of code, 46MB (with dependencies)  
**Runtime**: Node.js v20 (specifically tested with v20.19.6), npm v10.8.2

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
# Development server (runs on http://localhost:3000)
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
- **Routes generated**: 4 static pages (/, /about, /gallery, /\_not-found) + 1 dynamic API route (/api/timeline)

## Project Architecture

### Directory Structure

```
├── app/                      # Next.js App Router (7 route files)
│   ├── (home)/page.tsx      # Home page (route group)
│   ├── (info)/              # Info pages route group
│   │   ├── about/page.tsx   # About page with timeline
│   │   ├── gallery/page.tsx # Photo gallery page
│   │   └── layout.tsx       # Shared layout for info pages
│   ├── api/timeline/        # API route for timeline data
│   ├── layout.tsx           # Root layout (navbar/footer)
│   ├── loading.tsx          # Loading UI
│   └── globals.css          # Global styles
├── components/              # React components (18 files, all client-side)
│   ├── about/               # About page components
│   ├── gallery/             # Gallery carousel
│   ├── home/                # Home page components
│   └── shared/              # Reusable UI (navbar, footer, images)
├── lib/                     # Data and configuration (5 files)
│   ├── config.ts            # Site constants (title, address, contact)
│   ├── gallery.ts           # Gallery image data
│   ├── home.ts              # Home page data
│   ├── staff.ts             # Staff member data
│   └── timeline.ts          # Timeline events data
├── models/                  # TypeScript interfaces (4 files)
│   ├── GalleryImage.ts
│   ├── ServiceTime.ts
│   ├── StaffMember.ts
│   └── TimelineEvent.ts
└── public/                  # Static assets (images)
```

### Key Configuration Files (Root Directory)

- `package.json` - Dependencies and npm scripts
- `tsconfig.json` - TypeScript config with strict mode, `@/*` path alias
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
# Expected: "✓ Compiled successfully in ~10s", generates 7 routes

# 3. Format check (optional, Prettier validation)
npx prettier --check .
# Expected: "All matched files use Prettier code style!"
```

### Known Lint Warnings (Safe to Ignore)

- `components/gallery/GalleryCarousel.tsx` - "Button is defined but never used" (current as of last check)

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
import AppNavbar from "@/components/shared/AppNavbar";

// Internal
import "./globals.css";

// Relative
```

### Path Aliases

- **`@/*`** resolves to project root (e.g., `@/components`, `@/lib/config`)
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

Note: MongoDB configured but not currently used by app (future database integration)

## Data Management

- **No database**: All data is hardcoded in `lib/*.ts` files
- **API route**: `/api/timeline` serves data from `lib/timeline.ts`
- **State management**: None (use React hooks for component state)

## Common Pitfalls & Solutions

### Build Failures

❌ **`next: not found`** → Run `npm install` first  
❌ **TypeScript errors** → Check `tsconfig.json` strict mode compliance  
❌ **Module not found** → Verify `@/*` imports use correct paths

### Component Issues

❌ **Hydration errors** → Ensure `"use client"` for client-only features  
❌ **Image optimization errors** → Use `next/image` with explicit width/height  
❌ **Bootstrap styles not loading** → Check `bootstrap/dist/css/bootstrap.min.css` import in layout

## Testing & Validation

**No test framework configured** - Manual validation required:

1. Build must succeed without errors (`npm run build`)
2. Lint must pass with only known warnings (`npm run lint`)
3. Dev server must start (`npm run dev`) and pages load at localhost:3000

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
