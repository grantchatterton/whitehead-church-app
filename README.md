# Whitehead Baptist Church Website

A modern, responsive church website built with Next.js 16, React 19, and TypeScript. This application serves as the online presence for Whitehead Baptist Church, nestled in the Blue Ridge Mountains of Alleghany County, North Carolina.

## 🌟 Features

- **Home Page** - Welcome message with church location and service information
- **About Page** - Church history, interactive timeline, and staff directory
- **Photo Gallery** - Carousel showcase of church activities and facilities
- **Authentication System** - Email-based user authentication powered by Better Auth
- **Responsive Design** - Built with React Bootstrap for mobile-first accessibility
- **Dark Mode** - Modern dark theme for comfortable viewing
- **MongoDB Integration** - Database support for user authentication and future features
- **Docker Support** - Containerized deployment with Docker and Docker Compose

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v20 or higher (specifically tested with v20.19.6)
- **npm** v10.8.2 or higher
- **Docker** (optional, for containerized deployment)
- **Docker Compose** (optional, for MongoDB service)

## 🚀 Quick Start

### Installation

1. Clone the repository:
```bash
git clone https://github.com/grantchatterton/whitehead-church-app.git
cd whitehead-church-app
```

2. Install dependencies:
```bash
npm install
```

This will install approximately 400 packages and takes 15-40 seconds.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/whitehead-church

# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_ALLOW_EMAIL_SIGNUP=true
```

> **Note**: Generate a secure random string for `BETTER_AUTH_SECRET`. You can use: `openssl rand -base64 32`

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:5000](http://localhost:5000)

### Building for Production

Build the application:

```bash
npm run build
```

Build time: ~10 seconds using Turbopack. This generates optimized static pages and API routes.

Start the production server:

```bash
npm start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 🗂️ Project Structure

```
whitehead-church-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (home)/              # Home page route group
│   │   │   └── page.tsx
│   │   ├── (info)/              # Info pages route group
│   │   │   ├── about/           # About page with history & staff
│   │   │   ├── gallery/         # Photo gallery page
│   │   │   └── layout.tsx       # Shared layout for info pages
│   │   ├── api/                 # API routes
│   │   ├── login/               # Login page
│   │   ├── logout/              # Logout handler
│   │   ├── register/            # Registration page
│   │   ├── layout.tsx           # Root layout (navbar/footer)
│   │   ├── loading.tsx          # Loading UI component
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   │   ├── about/               # About page components
│   │   ├── auth/                # Authentication components
│   │   ├── gallery/             # Gallery carousel
│   │   ├── home/                # Home page components
│   │   └── shared/              # Reusable UI components
│   ├── lib/                     # Data and configuration
│   │   ├── auth.ts              # Better Auth server setup
│   │   ├── auth-client.ts       # Better Auth client
│   │   ├── auth-config.ts       # Auth configuration
│   │   ├── gallery.ts           # Gallery image data
│   │   ├── mongodb.ts           # MongoDB connection
│   │   └── staff.ts             # Staff member data
│   └── models/                  # TypeScript interfaces
│       ├── GalleryImage.ts
│       ├── StaffMember.ts
│       └── ...
├── public/                      # Static assets (images)
├── Dockerfile                   # Multi-stage Docker build
├── compose.yml                  # Docker Compose configuration
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint configuration
├── .prettierrc.json             # Prettier configuration
└── package.json                 # Dependencies and scripts
```

## 🛠️ Technology Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type-safe development

### UI & Styling
- **React Bootstrap 2.10.10** - Component library
- **Bootstrap 5.3.8** - CSS framework with dark mode

### Authentication & Database
- **Better Auth 1.4.16** - Modern authentication solution
- **MongoDB 9.1.4** - Database via Mongoose ODM

### Development Tools
- **ESLint 9** - Code linting with Next.js and Prettier configs
- **Prettier 3.7.4** - Code formatting with import sorting
- **date-fns 4.1.0** - Date formatting utilities

### Deployment
- **Docker** - Containerization with Node 20 Alpine
- **Turbopack** - Fast builds and hot module replacement

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. Start MongoDB and build the application:
```bash
docker compose up -d
```

This will:
- Start MongoDB on port 27017
- Build and run the Next.js application on port 3000

2. Stop the services:
```bash
docker compose down
```

### Using Docker Only

1. Build the image:
```bash
docker build \
  --build-arg MONGODB_URI=mongodb://localhost:27017/whitehead-church \
  --build-arg BETTER_AUTH_SECRET=your-secret-key \
  --build-arg BETTER_AUTH_URL=http://localhost:3000 \
  -t whitehead-church-app .
```

2. Run the container:
```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/whitehead-church \
  -e BETTER_AUTH_SECRET=your-secret-key \
  -e BETTER_AUTH_URL=http://localhost:3000 \
  whitehead-church-app
```

## 🔧 Configuration

### Next.js Configuration

The application uses standalone output mode for optimized Docker deployments:

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["*"],
};
```

### TypeScript Configuration

- **Strict mode** enabled for type safety
- **Path alias**: `@/*` resolves to `src/*`
- **Target**: ES2017 with modern module resolution

### ESLint & Prettier

- **Flat config** (eslint.config.mjs) with Next.js and Prettier integration
- **Import sorting** via @trivago/prettier-plugin-sort-imports
- **Auto-formatting** on save (recommended in VS Code)

## 📝 Development Guidelines

### Component Patterns

- All components use **functional components** with TypeScript
- Client components require `"use client"` directive
- Props are typed inline, not with separate interfaces

Example:
```tsx
export default function Component({
  prop1,
  prop2 = "default",
}: {
  prop1: string;
  prop2?: string;
}) {
  // Component logic
}
```

### Styling Conventions

- **Primary**: React Bootstrap components
- **Utilities**: Bootstrap CSS classes (e.g., `mb-4`, `p-4`)
- **Theme**: Dark mode via `data-bs-theme="dark"`
- **Avoid**: Mixing Tailwind classes with Bootstrap

### Import Order

Automatically enforced by Prettier:
1. Server-only directive
2. Built-in modules
3. React/Next.js
4. React Bootstrap
5. Third-party packages
6. `@/*` imports (internal)
7. Relative imports

## 🧪 Testing & Validation

No test framework is currently configured. Manual validation is required:

1. **Build**: `npm run build` must succeed without errors
2. **Lint**: `npm run lint` must pass (warnings acceptable)
3. **Runtime**: Dev server must start and pages must load

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the development guidelines
4. Run linting: `npm run lint`
5. Build the project: `npm run build`
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 📄 License

This project is private and proprietary to Whitehead Baptist Church.

## 📧 Contact

For questions or support, please contact the church administration.

---

**Built with ❤️ for Whitehead Baptist Church**
