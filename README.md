# Whitehead Baptist Church Website

A modern, responsive church website built with Next.js 16, React 19, and TypeScript. This application serves as the online presence for Whitehead Baptist Church, nestled in the Blue Ridge Mountains of Alleghany County, North Carolina.

**Live Website**: [https://whiteheadchurch.org](https://whiteheadchurch.org)

## Features

- **Home Page** - Welcome message with church location and service information
- **About Page** - Church history, interactive timeline, and staff directory
- **Photo Gallery** - Carousel showcase of church activities and facilities
- **Authentication System** - Email-based user authentication powered by Better Auth
- **Responsive Design** - Built with React Bootstrap for mobile-first accessibility
- **MongoDB Integration** - Database support for user authentication and timeline data storage

## Prerequisites

- **Node.js** v20 or higher
- **npm** v10.8.2 or higher
- **Docker** (for containerized deployment)

## Quick Start

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

### Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/whitehead-church
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_ALLOW_EMAIL_SIGNUP=true
```

> **Note**: Generate a secure random string for `BETTER_AUTH_SECRET` using: `openssl rand -base64 32`

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

Start the production server:

```bash
npm start
```

The production server will run on [http://localhost:3000](http://localhost:3000)

### Linting

Run ESLint:

```bash
npm run lint
```

## Deployment

The application is deployed and hosted on the **DigitalOcean App Platform** using a Docker container.

### Deployment Process

The live site at [https://whiteheadchurch.org](https://whiteheadchurch.org) is automatically deployed from this repository using DigitalOcean's App Platform. The platform:

1. Builds the Docker image using the `Dockerfile`
2. Runs the container with required environment variables
3. Manages SSL certificates and domain routing
4. Handles auto-scaling and zero-downtime deployments

### Docker Build

Build the Docker image:

```bash
docker build -t whitehead-church-app .
```

Run the container with environment variables:

```bash
docker run -p 3000:3000 \
  -e MONGODB_URI=your-mongodb-uri \
  -e BETTER_AUTH_SECRET=your-secret-key \
  -e BETTER_AUTH_URL=https://whiteheadchurch.org \
  -e BETTER_AUTH_ALLOW_EMAIL_SIGNUP=true \
  whitehead-church-app
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
whitehead-church-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (home)/              # Home page route group
│   │   ├── (info)/              # Info pages (about, gallery)
│   │   ├── api/                 # API routes
│   │   ├── login/               # Login page
│   │   ├── logout/              # Logout handler
│   │   ├── register/            # Registration page
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/              # React components
│   ├── lib/                     # Data and configuration
│   └── models/                  # TypeScript interfaces
├── public/                      # Static assets
├── Dockerfile                   # Docker configuration
└── package.json                 # Dependencies and scripts
```

## Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type-safe development
- **React Bootstrap** - Component library
- **Bootstrap 5** - CSS framework
- **Better Auth** - Authentication solution
- **MongoDB** - Database via Mongoose ODM
- **Docker** - Containerization

## Data Storage & API Routes

### MongoDB/Mongoose

The application uses MongoDB for data persistence with Mongoose ODM. Connection management is handled via `src/lib/mongodb.ts` with connection caching for optimal performance.

**Data Models:**
- `ServiceTime` - Church service times/schedule
- `StaffMember` - Staff members affiliated with the church including name, roles, avatar URL, etc.
- `TimelineEvent` - Church history timeline events with title, date, and description
- User authentication data (managed by Better Auth)

### API Routes

The application implements Next.js API routes under `src/app/api/`:

- **`/api/timeline`** - GET endpoint that retrieves timeline events from MongoDB, sorted chronologically
- **`/api/auth/[...all]`** - Better Auth handler for authentication operations (login, register, logout)

All API routes use server-side data fetching with MongoDB queries and return JSON responses.

## Planned Features

### Administrative Operations

The authentication system is currently implemented with login and registration functionality via Better Auth. Future development will add administrative capabilities for users with admin privileges:

**Planned Admin Features:**
- **Content Management** - Administrative controls for managing church data stored in MongoDB
- **Role-Based Access** - Leveraging Better Auth's authentication system to restrict administrative operations to authorized users only

These features will enable church administrators to maintain and update website content without requiring direct database access or code deployments.

## Development Guidelines

- All components use functional components with TypeScript
- Client components require `"use client"` directive
- Use React Bootstrap for UI components
- Bootstrap CSS classes for utilities
- Path alias `@/*` resolves to `src/*`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the development guidelines
4. Run linting: `npm run lint`
5. Build the project: `npm run build`
6. Commit your changes
7. Push to the branch
8. Open a Pull Request

## License

This project is private and proprietary to Whitehead Baptist Church.
