# Whitehead Baptist Church Website

A modern, responsive church website built with Next.js 16, React 19, and TypeScript. This application serves as the online presence for Whitehead Baptist Church, nestled in the Blue Ridge Mountains of Alleghany County, North Carolina.

**Live Website**: [https://whiteheadchurch.org](https://whiteheadchurch.org)

## Features

- **Home Page** - Welcome message with church location and service information
- **About Page** - Church history, interactive timeline with modal, and staff directory
- **Photo Gallery** - Carousel showcase of church activities and facilities
- **Authentication System** - Email-based user authentication powered by Better Auth with email verification
- **User Settings** - Protected user settings page for authenticated users
- **Responsive Design** - Built with React Bootstrap for mobile-first accessibility
- **MongoDB Integration** - Database support for user authentication, timeline events, staff members, service times, and gallery images

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
# Application Configuration
NEXT_PUBLIC_APP_TITLE=Whitehead Baptist Church

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/whitehead-church

# Better Auth Configuration
BETTER_AUTH_ALLOW_EMAIL_SIGNUP=true

# Email Service Configuration (Resend)
RESEND_API_KEY=your-resend-api-key
APP_EMAIL_ADDRESS=noreply@whiteheadchurch.org
```

**Environment Variable Details:**
- `NEXT_PUBLIC_APP_TITLE` - Application title displayed in the site header and metadata
- `MONGODB_URI` - MongoDB connection string for user data, timeline events, staff members, service times, and gallery images
- `BETTER_AUTH_ALLOW_EMAIL_SIGNUP` - Toggle email signup feature (set to `"false"` to disable registration)
- `RESEND_API_KEY` - API key for Resend email service (required for email verification emails)
- `APP_EMAIL_ADDRESS` - Sender email address for automated emails (e.g., verification emails)

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
  -e NEXT_PUBLIC_APP_TITLE="Whitehead Baptist Church" \
  -e MONGODB_URI=your-mongodb-uri \
  -e BETTER_AUTH_ALLOW_EMAIL_SIGNUP=true \
  -e RESEND_API_KEY=your-resend-api-key \
  -e APP_EMAIL_ADDRESS=noreply@whiteheadchurch.org \
  whitehead-church-app
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
whitehead-church-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (home)/              # Home page route group
│   │   │   ├── layout.tsx       # Home layout with navbar
│   │   │   └── page.tsx         # Home page
│   │   ├── (others)/            # Other pages route group
│   │   │   ├── (auth)/          # Authentication route group
│   │   │   │   ├── login/       # Login page with email verification modal
│   │   │   │   ├── logout/      # Logout handler
│   │   │   │   └── register/    # Registration page with success modal
│   │   │   ├── (info)/          # Info pages route group
│   │   │   │   ├── about/       # About page with timeline modal
│   │   │   │   └── gallery/     # Gallery page
│   │   │   └── user/            # User-related pages
│   │   │       └── settings/    # User settings page (protected)
│   │   ├── api/                 # API routes
│   │   │   └── auth/[...all]/   # Better Auth handler
│   │   ├── layout.tsx           # Root layout with footer
│   │   ├── loading.tsx          # Loading UI
│   │   └── globals.css          # Global styles
│   ├── components/              # React components (23 files)
│   │   ├── about/               # About page components (staff, timeline)
│   │   ├── auth/                # Authentication components (forms, modals, email templates)
│   │   ├── gallery/             # Gallery carousel component
│   │   ├── home/                # Home page components (navbar, info sections)
│   │   ├── modals/              # Shared modal component
│   │   └── shared/              # Reusable UI (navbar, footer, images, buttons)
│   ├── lib/                     # Data and configuration (6 files)
│   │   ├── auth.ts              # Better Auth server configuration
│   │   ├── auth-client.ts       # Better Auth client configuration
│   │   ├── auth-config.ts       # Auth configuration helpers
│   │   ├── data.ts              # MongoDB data fetching functions
│   │   ├── email.ts             # Resend email service integration
│   │   └── mongodb.ts           # MongoDB connection with caching
│   └── models/                  # Mongoose models (4 files)
│       ├── GalleryImage.ts      # Gallery image model
│       ├── ServiceTime.ts       # Service times model
│       ├── StaffMember.ts       # Staff member model
│       └── TimelineEvent.ts     # Timeline event model
├── public/                      # Static assets (images)
├── Dockerfile                   # Docker configuration
├── compose.yml                  # Docker Compose with MongoDB
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
- **Resend** - Email service provider with React email templates
- **@react-email/components** - React components for building email templates
- **date-fns** - Date utility library
- **Docker** - Containerization

## Data Storage & API Routes

### MongoDB/Mongoose

The application uses MongoDB for data persistence with Mongoose ODM. Connection management is handled via `src/lib/mongodb.ts` with connection caching for optimal performance.

**Mongoose Models:**
- `GalleryImage` - Gallery images with captions, alt text, and display order
- `ServiceTime` - Church service times/schedule
- `StaffMember` - Staff members with name, roles, avatar URL, and display order
- `TimelineEvent` - Church history timeline events with title, date, and description
- User authentication data (managed internally by Better Auth)

**Data Access:**
All application data is fetched server-side using functions in `src/lib/data.ts`:
- `getTimelineEvents()` - Retrieves timeline events sorted by date
- `getStaffMembers()` - Retrieves staff members sorted by display order
- `getGalleryImages()` - Retrieves gallery images sorted by display order
- `getServiceTimes()` - Retrieves service times sorted by name

These functions are called directly in server components and use MongoDB queries for data retrieval.

### Email Service

The application integrates **Resend** for sending transactional emails with React-based email templates built using `@react-email/components`.

Email functionality requires:
- Valid `RESEND_API_KEY` environment variable
- `APP_EMAIL_ADDRESS` configured for the sender address

**Email Templates:**
- Email verification - Sent when users sign in, prompting them to verify their email address

### API Routes

The application implements Next.js API routes under `src/app/api/`:

- **`/api/auth/[...all]`** - Better Auth handler for all authentication operations (login, register, logout, email verification, session management)

All data fetching is performed server-side in components using direct MongoDB queries via `src/lib/data.ts` functions.

## Planned Features

### Administrative Operations

The authentication system is currently implemented with login and registration functionality via Better Auth. Future development will add administrative capabilities for users with admin privileges:

**Planned Admin Features:**
- **Content Management** - Administrative controls for managing church data stored in MongoDB
- **Role-Based Access** - Leveraging Better Auth's authentication system to restrict administrative operations to authorized users only

These features will enable church administrators to maintain and update website content without requiring direct database access or code deployments.

## Development Guidelines

- All components use functional components with TypeScript
- Client components require `"use client"` directive (most interactive components)
- Server components use `"server-only"` directive for server-exclusive modules
- Use React Bootstrap for UI components
- Bootstrap CSS classes for utility styling
- Path alias `@/*` resolves to `src/*`
- Parallel routes and intercepting routes used for modals (timeline, email verification, registration success)

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
