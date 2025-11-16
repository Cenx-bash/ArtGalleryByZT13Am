# Philippine Art Gallery

## Overview

This is a premium, minimalist web application designed to showcase Filipino culture through art. The gallery features Visual Arts, Literary Arts, Applied Arts, and Performance Arts in a museum-quality digital experience. The application emphasizes elegant design, generous whitespace, and respectful presentation of Philippine cultural heritage. Built as a full-stack TypeScript application with React frontend and Express backend, it follows a reference-based design approach inspired by prestigious museums like The Met, MoMA, and Tate Modern.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing
- React Query (TanStack Query) for server state management and data fetching

**UI Component System**
- Radix UI primitives for accessible, unstyled component foundations
- shadcn/ui component library using the "new-york" style variant
- Tailwind CSS for utility-first styling with custom design tokens
- Component path aliases configured for clean imports (`@/components`, `@/lib`, `@/hooks`)

**Design System**
- Custom color palette inspired by Philippine textiles and natural landscapes
- Warm off-white background (#FAFAF8), deep charcoal text (#2A2A2A), and muted terracotta accent (#B8735C)
- Poppins font family (via Google Fonts CDN) with multiple weights for typography hierarchy
- Responsive spacing system using Tailwind units (4, 6, 8, 12, 16, 20, 24, 32)
- Maximum container width of 1400px with responsive padding
- Custom CSS variables for consistent theming across light/dark modes

**Key UI Patterns**
- Fixed navigation header with subtle shadow on scroll
- Full-width hero section with Filipino artwork backgrounds and overlay gradients
- Responsive artwork grid (1 column mobile, 2 tablet, 3 desktop) with 4:5 aspect ratio cards
- Hover interactions with gentle lift animations and metadata overlay fade-ins
- Modal/lightbox system for artwork detail views with comprehensive metadata
- Horizontal filter bar with category pills for browsing collections

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript for API endpoints
- ESM (ES Modules) module system throughout the application
- Custom middleware for JSON request logging with automatic truncation
- Vite middleware integration for development mode with HMR support

**Development vs Production**
- Development: Vite dev server integrated via middleware for instant feedback
- Production: Static file serving from built `dist/public` directory
- Conditional Replit-specific plugins (cartographer, dev-banner) only in development

**API Structure**
- RESTful API convention with `/api` prefix for all application routes
- Centralized route registration in `server/routes.ts`
- Storage abstraction layer separating business logic from data persistence

### Data Storage Solutions

**ORM & Database**
- Drizzle ORM for type-safe database operations with PostgreSQL dialect
- Schema defined in `shared/schema.ts` for code sharing between client and server
- Database configuration via environment variable `DATABASE_URL`
- Neon Database serverless driver (`@neondatabase/serverless`) for cloud PostgreSQL
- Migration management via `drizzle-kit` with migrations stored in `/migrations`

**In-Memory Storage**
- `MemStorage` class implementing the `IStorage` interface for development/testing
- UUID-based primary keys using `crypto.randomUUID()`
- Map-based data structures for fast lookups by ID or indexed fields

**Session Management**
- `connect-pg-simple` for PostgreSQL-backed session storage
- Express session integration ready (infrastructure in place, not yet activated)

**Data Validation**
- Zod schemas via `drizzle-zod` for runtime validation
- Type-safe insert schemas generated from Drizzle table definitions
- Shared validation logic between client and server via `shared/` directory

### Authentication and Authorization

**Current State**
- User schema defined with username/password fields
- Storage interface includes user creation and lookup methods
- Authentication system prepared but not yet implemented in routes
- Session cookie configuration ready via `connect-pg-simple`

**Planned Mechanisms**
- Cookie-based session authentication with credentials included in fetch requests
- Unauthorized request handling with configurable behavior (return null or throw)
- Query client configured with `credentials: "include"` for automatic cookie transmission

### Code Organization

**Monorepo Structure**
- `/client` - React frontend application with Vite
- `/server` - Express backend with API routes
- `/shared` - Shared TypeScript code (schemas, types) used by both client and server
- `/attached_assets` - Design documentation and reference materials

**Path Aliases**
- `@/*` - Client source files (`./client/src/*`)
- `@shared/*` - Shared code (`./shared/*`)
- `@assets/*` - Static assets (`./attached_assets`)

**Type Safety**
- Strict TypeScript configuration across the entire codebase
- Shared types via Drizzle schema inference
- ESNext module resolution with bundler mode for modern import syntax

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: `react`, `react-dom` for UI rendering
- **Build Tools**: `vite`, `@vitejs/plugin-react` for frontend bundling
- **Backend**: `express` for HTTP server
- **TypeScript**: `tsx` for TypeScript execution, `esbuild` for production builds

### UI & Component Libraries
- **Radix UI**: Complete suite of accessible React primitives (`@radix-ui/react-*`)
- **shadcn/ui**: Pre-built component library following Radix patterns
- **Styling**: `tailwindcss`, `autoprefixer`, `postcss` for CSS processing
- **Utilities**: `class-variance-authority` for variant-based styling, `clsx` and `tailwind-merge` for className management

### Data & State Management
- **React Query**: `@tanstack/react-query` for server state and caching
- **Form Handling**: `react-hook-form` with `@hookform/resolvers` for validation
- **Date Utilities**: `date-fns` for date formatting and manipulation

### Database & ORM
- **Drizzle ORM**: `drizzle-orm` for database operations, `drizzle-kit` for migrations
- **Database Driver**: `@neondatabase/serverless` for PostgreSQL connection
- **Validation**: `drizzle-zod` for schema-to-Zod conversion, `zod` for runtime validation

### Specialized UI Components
- **Carousel**: `embla-carousel-react` for artwork slideshows
- **Command Palette**: `cmdk` for search and command interfaces
- **Icons**: `lucide-react` for consistent iconography
- **Drawer**: `vaul` for mobile-friendly bottom sheets

### Development Tools
- **Replit Plugins**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer`, `@replit/vite-plugin-dev-banner` for enhanced development experience
- **Routing**: `wouter` for lightweight React routing
- **Utilities**: `nanoid` for unique ID generation

### Fonts & CDN Resources
- **Google Fonts**: Poppins font family (weights 300, 400, 500, 600) loaded via CDN
- Multiple font families configured in HTML but Poppins is primary per design guidelines