# Whitehead Baptist Church App

## Overview
A Next.js 16 website for Whitehead Baptist Church featuring home page, about section, and gallery.

## Project Structure
- `src/app/` - Next.js App Router pages and layouts
  - `(home)/` - Home page route group
  - `(info)/` - About and gallery pages route group
  - `api/` - API routes
- `src/components/` - Reusable React components
- `src/lib/` - Library functions and configuration
- `src/models/` - TypeScript data models
- `public/` - Static assets

## Tech Stack
- Next.js 16.1.1 with App Router
- React 19
- TypeScript
- Bootstrap 5 + React Bootstrap
- Turbopack (dev)

## Development
- Dev server: `npm run dev` (runs on port 5000)
- Build: `npm run build`
- Start production: `node .next/standalone/server.js`

## Deployment
Uses Next.js standalone output for autoscale deployment.
