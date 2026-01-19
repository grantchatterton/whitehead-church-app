# Whitehead Baptist Church Website

Official website for Whitehead Baptist Church located in Sparta, North Carolina. A modern, responsive web application built with Next.js 16 and React 19.

## What This Project Does

This is a church website providing:
- **Church Information**: Service times, location, and contact details
- **About Page**: Church history and timeline of significant events
- **Photo Gallery**: Visual showcase of the church and grounds
- **Staff Directory**: Information about church leadership and staff

## Key Features

- 🎨 **Modern UI**: Built with React Bootstrap and dark theme design
- 📱 **Responsive**: Mobile-friendly layout that works on all devices
- ⚡ **Fast Performance**: Powered by Next.js 16 with Turbopack for rapid builds
- 🐳 **Docker Ready**: Multi-stage Dockerfile for production deployment
- 🔧 **TypeScript**: Fully typed codebase for better developer experience
- 🎯 **SEO Optimized**: Proper metadata and semantic HTML structure

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v20 or higher (tested with v20.19.6)
- **npm** v10 or higher (tested with v10.8.2)

## Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/grantchatterton/whitehead-church-app.git
   cd whitehead-church-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages (~400 packages, takes 15-40 seconds).

### Running the Development Server

Start the development server on port 5000:

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser to view the website.

The page auto-updates as you edit files. Changes are reflected instantly thanks to Next.js Fast Refresh.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

The build typically completes in ~10 seconds using Turbopack. Output is generated in the `.next/` directory with standalone mode enabled for Docker deployment.

### Running Production Build

After building, start the production server:

```bash
npm run start
```

### Linting

Check code quality and formatting:

```bash
npm run lint
```

The project uses ESLint with Next.js and Prettier configurations.

## Docker Deployment

### Building the Docker Image

```bash
docker build -t whitehead-church-app .
```

The multi-stage Dockerfile:
- Uses Node 20 Alpine for minimal image size
- Optimizes dependencies with npm ci
- Creates a standalone production build
- Runs as non-root user for security

### Running with Docker

```bash
docker run -p 3000:3000 whitehead-church-app
```

### Using Docker Compose

The project includes a `compose.yml` file with MongoDB service (for future database integration):

```bash
docker compose up -d
```

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (home)/            # Home page route group
│   │   ├── (info)/            # Info pages (about, gallery)
│   │   │   ├── about/         # Church history and timeline
│   │   │   └── gallery/       # Photo gallery
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout with navbar/footer
│   ├── components/            # React components
│   │   ├── about/            # About page components
│   │   ├── gallery/          # Gallery carousel
│   │   ├── home/             # Home page components
│   │   └── shared/           # Reusable UI (navbar, footer)
│   ├── lib/                   # Data and configuration
│   │   ├── config.ts         # Site constants (title, address, contact)
│   │   ├── gallery.ts        # Gallery image data
│   │   ├── home.ts           # Home page data
│   │   ├── staff.ts          # Staff member data
│   │   └── timeline.ts       # Timeline events data
│   └── models/                # TypeScript interfaces
├── public/                    # Static assets (images)
├── Dockerfile                 # Multi-stage Docker build
├── compose.yml               # Docker Compose configuration
└── package.json              # Dependencies and scripts
```

## Technology Stack

### Core Framework
- **Next.js 16.1.1**: React framework with App Router
- **React 19.2.3**: UI library
- **TypeScript 5**: Type-safe JavaScript

### UI & Styling
- **React Bootstrap 2.10.10**: Component library
- **Bootstrap 5.3.8**: CSS framework
- **Dark Theme**: Custom dark mode design

### Development Tools
- **ESLint 9**: Code linting
- **Prettier 3.7.4**: Code formatting
- **Turbopack**: Fast build tool (Next.js default)

### Deployment
- **Docker**: Containerized deployment
- **Standalone Output**: Optimized production builds
- **MongoDB Ready**: Docker Compose includes MongoDB service

## Configuration

### Site Configuration

Edit site-wide settings in `src/lib/config.ts`:

```typescript
export const title = "Whitehead Baptist Church";
export const address = "5444 Pine Swamp Rd, Sparta, North Carolina, 28675";
export const serviceTimes = ["Sundays at 10:00 AM", "Wednesdays at 7:00 PM"];
export const contactEmail = "contact@whiteheadbaptist.org";
export const phoneNumber = "(123) 456-7890";
```

### Content Management

All content is statically defined in TypeScript files under `src/lib/`:
- **Home page**: `home.ts`
- **Staff members**: `staff.ts`
- **Timeline events**: `timeline.ts`
- **Gallery images**: `gallery.ts`

## Development Workflow

### Code Style

The project enforces consistent code style through:
- **TypeScript strict mode**: Full type checking
- **ESLint**: Code quality rules
- **Prettier**: Automatic code formatting with import sorting

### Component Patterns

- All components use functional components with TypeScript
- Client components use `"use client"` directive
- Props are typed with inline interfaces
- Bootstrap components preferred over custom CSS

### Import Organization

Imports are automatically sorted by Prettier:
1. Built-in modules
2. React/Next.js
3. React Bootstrap
4. Third-party packages
5. `@/*` path aliases (project imports)
6. Relative imports

## Troubleshooting

### Common Issues

**Error: `next: not found`**
- Solution: Run `npm install` before any other commands

**TypeScript errors during build**
- Solution: Check `tsconfig.json` strict mode compliance

**Module not found with `@/*` imports**
- Solution: Verify path aliases are correctly configured in `tsconfig.json`

**Hydration errors in browser**
- Solution: Ensure client-only features use `"use client"` directive

### Clean Install

If you encounter dependency issues:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Getting Help

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Bootstrap Docs**: [https://react-bootstrap.github.io](https://react-bootstrap.github.io)
- **TypeScript Handbook**: [https://www.typescriptlang.org/docs](https://www.typescriptlang.org/docs)
- **Report Issues**: Open an issue on the [GitHub repository](https://github.com/grantchatterton/whitehead-church-app/issues)

## Maintainers

This project is maintained by Grant Chatterton and contributors.

For questions or support, please open an issue on GitHub or contact the development team.

## License

This project is private and proprietary. All rights reserved.
