# Ruhaus Studio Portfolio

## Overview

Ruhaus Studio is a personal portfolio website for a designer/creative studio focused on AI-powered experiences and social impact projects. The site showcases projects like "Soma" (AI wearable for neurodivergent children), "Galaxsync" (data visualization), and "Hear Me" (voice interfaces).

The application is a full-stack TypeScript monorepo with:
- A React SPA frontend (the main portfolio)
- An Express backend serving project data via REST API
- A secondary mockup sandbox (`artifacts/mockup-sandbox/`) used as a UI prototyping playground with infinite canvas

Current data storage uses in-memory storage (`MemStorage`) but the schema and config are set up for PostgreSQL via Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with **TypeScript**, bootstrapped via **Vite**
- **Routing**: `wouter` for lightweight client-side routing with routes for `/` (Home), `/galaxsync` (special case), and `/:slug` (generic project detail)
- **State/Data Fetching**: `@tanstack/react-query` with a custom `queryClient` that maps query keys to API URLs automatically
- **UI Components**: `shadcn/ui` (New York style) built on **Radix UI** primitives with **Tailwind CSS** for styling
- **Typography**: Inter, JetBrains Mono, Merriweather, Space Grotesk loaded from Google Fonts
- **Animations**: Custom `useScrollAnimation` hook using `IntersectionObserver` for scroll-triggered fade-ins; CSS keyframe animations for hero sections
- **Theme System**: CSS custom property-based themes (e.g., `theme-notebook`, `theme-jason`) applied via class names on root elements

### Backend Architecture
- **Express 5** HTTP server running on Node.js with TypeScript (via `tsx`)
- **API Routes** (in `server/routes.ts`):
  - `GET /api/projects` — list all projects
  - `GET /api/projects/:id` — get project by numeric ID
  - `GET /api/projects/slug/:slug` — get project by URL slug
- **Storage Layer** (`server/storage.ts`): `IStorage` interface with `MemStorage` implementation that seeds hardcoded project data on startup. Designed for easy swap to database-backed storage.
- **Dev Mode**: Vite middleware is integrated into Express so the dev server serves both API and frontend on the same port
- **Build**: Separate build steps — Vite builds the client, esbuild bundles the server into `dist/index.cjs`

### Database / Schema
- **Drizzle ORM** configured for **PostgreSQL** (`drizzle.config.ts` points at `DATABASE_URL`)
- Schema defined in `shared/schema.ts`:
  - `projects` table: `id`, `slug` (unique), `title`, `domain`, `intro`, `image`, `tags` (text array)
  - `users` table: `id`, `username` (unique), `password`
- `drizzle-zod` generates insert/select TypeScript types from the schema
- **Note**: The app currently uses `MemStorage` (no real DB calls). Migrating to Postgres requires implementing a `DatabaseStorage` class using the existing Drizzle schema and switching `storage` export in `server/storage.ts`

### Mockup Sandbox (`artifacts/mockup-sandbox/`)
A self-contained Vite+React app separate from the main portfolio used for UI prototyping:
- Has its own `package.json`, `vite.config.ts`, and `tsconfig.json`
- Contains a custom Vite plugin (`mockupPreviewPlugin.ts`) that auto-discovers mockup components in `src/components/mockups/` using `fast-glob` and `chokidar`, generating a module map for dynamic import
- Renders mockup previews in an infinite canvas iframe system
- Uses the same shadcn/ui + Tailwind setup as the main app

### Shared Code
- `shared/schema.ts` is imported by both server and client via the `@shared/*` path alias
- TypeScript path aliases: `@/*` → `client/src/*`, `@shared/*` → `shared/*`, `@assets/*` → `attached_assets/*`

### Key Design Decisions
- **In-memory seeding** keeps the app runnable without a database, with pre-populated project data
- **Wouter over React Router**: Lightweight (~1.5kb) — appropriate for a portfolio with few routes
- **Monorepo structure** with `client/`, `server/`, `shared/`, and `artifacts/` directories keeps frontend, backend, and prototyping tools co-located
- **Custom OpenGraph plugin** (`vite-plugin-meta-images.ts`) automatically updates `og:image` and `twitter:image` meta tags with the correct Replit deployment URL at build time

## External Dependencies

### Runtime Dependencies
- **Express 5** — HTTP server framework
- **Drizzle ORM + drizzle-zod** — Database ORM and schema validation
- **PostgreSQL (pg, connect-pg-simple)** — Target database (not yet active; requires `DATABASE_URL`)
- **@tanstack/react-query** — Server state management and data fetching
- **Radix UI** — Headless UI primitives (full suite installed)
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — Utility-first styling
- **wouter** — Client-side routing
- **lucide-react** — Icon library
- **class-variance-authority + clsx + tailwind-merge** — Conditional class utilities

### Dev/Build Tools
- **Vite** — Frontend dev server and build tool
- **tsx** — TypeScript execution for the server in development
- **esbuild** — Server bundle for production
- **drizzle-kit** — Database migration CLI (`npm run db:push`)

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal` — Shows runtime errors as overlays in dev
- `@replit/vite-plugin-cartographer` — Source map navigation (dev only)
- `@replit/vite-plugin-dev-banner` — Dev environment banner (dev only)

### Google Fonts
Loaded via `<link>` tags in `client/index.html`: Inter, JetBrains Mono, Merriweather, Space Grotesk, Nunito