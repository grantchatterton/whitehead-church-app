# Whitehead Baptist Church Website

A modern, responsive church website built with Next.js 16, React 19, and TypeScript. This application serves as the online presence for Whitehead Baptist Church, nestled in the Blue Ridge Mountains of Alleghany County, North Carolina.

**Live Website**: [https://whiteheadchurch.org](https://whiteheadchurch.org)

## Features

- **Home Page** - Welcome message with church location and service information
- **About Page** - Church history, interactive timeline with modal, and staff directory
- **Photo Gallery** - Carousel showcase of church activities and facilities
- **Authentication System** - Email-based user authentication powered by Better Auth with email verification and two-factor authentication
- **User Settings** - Protected user settings page for authenticated users
- **Admin Dashboard** - Administrative interface for managing church data (service times management)
- **Service Times Management** - Admin-only CRUD operations for church service schedules
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
│   │   │   ├── page.tsx         # Home page with service times and location
│   │   │   └── _components/     # Page-specific components
│   │   │       └── ServiceTimesList.tsx  # Service times list component
│   │   ├── (others)/            # Other pages route group
│   │   │   ├── layout.tsx       # Shared layout with AppNavbar
│   │   │   ├── (auth)/          # Authentication route group
│   │   │   │   ├── layout.tsx   # Auth layout
│   │   │   │   ├── email-verified/  # Email verification success page
│   │   │   │   ├── login/       # Login page with modals
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   └── @modal/  # Parallel route for email/2FA modals
│   │   │   │   ├── logout/      # Logout handler
│   │   │   │   └── register/    # Registration page with success modal
│   │   │   │       ├── page.tsx
│   │   │   │       ├── layout.tsx
│   │   │   │       └── @modal/  # Parallel route for registration success
│   │   │   ├── (info)/          # Info pages route group
│   │   │   │   ├── layout.tsx   # Info layout
│   │   │   │   ├── about/       # About page with timeline modal
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── _components/  # StaffMemberCard
│   │   │   │   │   ├── @modal/       # Parallel route for timeline modal
│   │   │   │   │   └── timeline/     # Timeline page
│   │   │   │   └── gallery/     # Gallery page
│   │   │   │       ├── page.tsx
│   │   │   │       └── _components/  # GalleryCarousel
│   │   │   ├── admin/           # Admin dashboard (protected)
│   │   │   │   ├── layout.tsx   # Admin layout
│   │   │   │   ├── page.tsx     # Admin home
│   │   │   │   └── service-times/  # Service times management
│   │   │   │       ├── page.tsx
│   │   │   │       ├── layout.tsx
│   │   │   │       └── @modal/  # Parallel routes for create/edit/delete modals
│   │   │   └── user/            # User-related pages
│   │   │       └── settings/    # User settings page (protected)
│   │   │           ├── page.tsx
│   │   │           ├── layout.tsx
│   │   │           └── @modal/
│   │   ├── api/                 # API routes
│   │   │   ├── auth/[...all]/   # Better Auth handler
│   │   │   └── service-times/   # Service times CRUD API
│   │   │       ├── route.ts     # GET/POST endpoints
│   │   │       └── [id]/route.ts  # PUT/DELETE endpoints
│   │   ├── layout.tsx           # Root layout with footer and BackgroundImage
│   │   ├── loading.tsx          # Loading UI
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable UI components
│   │   └── ui/                  # Shared UI components library
│   │       ├── AppFooter.tsx    # Site footer with session info
│   │       ├── AppNavbar.tsx    # Main navigation bar with AppNavbarItems
│   │       ├── AuthForm.tsx     # Authentication form component
│   │       ├── InfoPage.tsx     # Wrapper component for info pages
│   │       ├── LinkButton.tsx   # Link styled as button
│   │       ├── buttons/         # Button components
│   │       │   └── AddStarterServiceTimesButton.tsx
│   │       ├── forms/           # Form components
│   │       │   └── ServiceTimeForm.tsx
│   │       ├── images/          # Image components
│   │       │   ├── CrossImage.tsx        # Church cross image
│   │       │   └── DefaultAvatarImage.tsx  # Default avatar SVG
│   │       ├── modals/          # Modal components
│   │       │   ├── AppModal.tsx                    # Generic modal wrapper
│   │       │   ├── EmailVerificationRequiredModal.tsx
│   │       │   ├── RegistrationSuccessModal.tsx
│   │       │   ├── ServiceTimeModal.tsx            # Service time CRUD modal
│   │       │   ├── TwoFactorModal.tsx              # Two-factor auth modal
│   │       │   └── WrapperModal.tsx                # Modal wrapper utility
│   │       └── templates/       # Email templates
│   │           ├── EmailTwoFactorTemplate.tsx
│   │           └── EmailVerificationTemplate.tsx
│   ├── lib/                     # Data and configuration (8 files)
│   │   ├── actions.ts           # Server actions for data mutations
│   │   ├── auth.ts              # Better Auth server configuration
│   │   ├── auth-client.ts       # Better Auth client configuration
│   │   ├── auth-config.ts       # Auth configuration helpers
│   │   ├── auth-session.ts      # Session verification utilities
│   │   ├── data.ts              # MongoDB data fetching functions
│   │   ├── email.ts             # Resend email service integration
│   │   └── mongodb.ts           # MongoDB connection with caching
│   ├── models/                  # Mongoose models (4 files)
│   │   ├── GalleryImage.ts      # Gallery image model
│   │   ├── ServiceTime.ts       # Service times model
│   │   ├── StaffMember.ts       # Staff member model
│   │   └── TimelineEvent.ts     # Timeline event model
│   ├── schemas/                 # Zod validation schemas
│   │   └── ServiceTime.ts       # Service time validation schema
│   └── types/                   # TypeScript type definitions
│       └── global.d.ts          # Global type declarations
├── public/                      # Static assets (images)
├── Dockerfile                   # Docker configuration
├── compose.yml                  # Docker Compose with MongoDB
└── package.json                 # Dependencies and scripts
```

### Architecture Highlights

- **Co-located Components**: Page-specific components live in `_components/` folders next to their routes (e.g., `about/_components/StaffMemberCard.tsx`)
- **Shared UI Library**: Reusable components centralized in `src/components/ui/` with clear organization by type (buttons, forms, modals, images, templates)
- **Semantic HTML**: Main content uses semantic `<main>` element with Container as child, following accessibility best practices
- **Parallel Routes**: Modals use `@modal` parallel routes for clean URL-based state management (timeline, login, register, admin operations)
- **Server Actions**: Data mutations handled via Next.js Server Actions in `src/lib/actions.ts` for type-safe form handling
- **Schema Validation**: Zod schemas in `src/schemas/` ensure data integrity before database operations
- **Session Utilities**: Auth session helpers in `src/lib/auth-session.ts` provide role-based access control (`verifySession`, `verifyUserAdmin`)

## Technology Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript 5** - Type-safe development
- **React Bootstrap** - Component library
- **Bootstrap 5** - CSS framework
- **Better Auth** - Authentication solution with two-factor authentication
- **MongoDB** - Database via Mongoose ODM
- **Resend** - Email service provider with React email templates
- **@react-email/components** - React components for building email templates
- **Zod** - Schema validation library
- **date-fns** - Date utility library
- **clsx** - Utility for constructing className strings
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
- Email verification - Sent when users register, prompting them to verify their email address
- Two-factor authentication - Sent when users with 2FA enabled sign in, providing the verification code

### Server Actions

The application uses Next.js Server Actions for data mutations in `src/lib/actions.ts`:
- Form handling and validation
- Database write operations
- Error handling and response formatting

### API Routes

The application implements Next.js API routes under `src/app/api/`:

- **`/api/auth/[...all]`** - Better Auth handler for all authentication operations (login, register, logout, email verification, two-factor authentication, session management)
- **`/api/service-times`** - GET (list all) and POST (create new) service times
- **`/api/service-times/[id]`** - PUT (update) and DELETE (remove) specific service time

Data fetching is performed server-side in components using direct MongoDB queries via `src/lib/data.ts` functions.

## Administrative Features

The application includes a fully-functional admin dashboard with role-based access control:

**Current Admin Features:**
- **Service Times Management** - Full CRUD operations for managing church service schedules
- **Role-Based Access** - Admin-only routes protected using Better Auth's role system via `verifyUserAdmin()` session helper
- **Modal-Based Editing** - Clean UX for creating, editing, and deleting service times using parallel routes
- **Starter Data** - Quick setup button to populate initial service times
- **Form Validation** - Zod schemas ensure data integrity before database operations

**Planned Future Features:**
- Timeline event management
- Staff member management
- Gallery image management
- User role administration

## Development Guidelines

- All components use functional components with TypeScript
- Client components require `"use client"` directive (most interactive components)
- Server components use `"server-only"` directive for server-exclusive modules
- Use React Bootstrap for UI components
- Bootstrap CSS classes for utility styling
- Path alias `@/*` resolves to `src/*` and `@public/*` resolves to `public/*`
- Parallel routes (`@modal`) and intercepting routes (`(.)route`) used for modals
- Server Actions for data mutations (defined in `src/lib/actions.ts`)
- Zod schemas for form validation (defined in `src/schemas/`)
- Session verification helpers for protected routes (`verifySession`, `verifyUserAdmin`)
- Page-specific components co-located in `_components/` folders next to their routes
- Shared, reusable UI components centralized in `src/components/ui/` organized by type
- Semantic HTML with `<main>` as parent and `<Container>` as child for proper page structure

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
