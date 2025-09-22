# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a monorepo for "MarkMyWords" - a prediction tracking application built with Next.js 15, tRPC, Drizzle ORM, and Clerk authentication. The project uses Turborepo for task orchestration and pnpm as the package manager.

## Architecture

### Monorepo Structure

- `apps/web/` - Next.js application with App Router
- `packages/ui/` - Shared UI components built with shadcn/ui
- `packages/db/` - Database schema and client using Drizzle ORM with PostgreSQL
- `packages/eslint-config/` - Shared ESLint configuration
- `packages/typescript-config/` - Shared TypeScript configuration

### Key Technologies

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **UI**: shadcn/ui components, Tailwind CSS, Lucide icons
- **State Management**: tRPC with React Query for server state
- **Authentication**: Clerk for user management
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS with dark mode support (next-themes)
- **Forms**: React Hook Form with Zod validation
- **Animations**: Motion (Framer Motion)

### Data Model

The application tracks predictions with the following core entities:

- `users` - User profiles (managed by Clerk)
- `predictions` - User predictions with content, reminders, and privacy settings

### tRPC Setup

- Client: `apps/web/trpc/client.ts` - tRPC React client
- Server routers: `apps/web/server/routers/` - API route definitions
- Context: `apps/web/server/context.ts` - Request context with auth

## Common Commands

### Development

```bash
# Start development server
pnpm dev

# Build all packages
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format
```

### Web App Specific (from apps/web/)

```bash
# Lint with auto-fix
pnpm lint:fix
```

### Database (from packages/db/)

```bash
# Generate migrations
pnpm db:generate

# Run migrations
pnpm db:migrate

# Push schema to database
pnpm db:push
```

### Adding UI Components

Add shadcn/ui components to the UI package:

```bash
pnpm dlx shadcn@latest add [component-name] -c apps/web
```

Components are installed to `packages/ui/src/components/` and imported as:

```tsx
import { Button } from '@workspace/ui/components/button'
```

## Environment Requirements

- Node.js >= 20
- pnpm 10.4.1+
- PostgreSQL database (configure DATABASE_URL in .env)
- Clerk authentication keys

## Development Notes

- The project uses workspace dependencies with `@workspace/*` imports
- UI components are shared across the monorepo through the `packages/ui` package
- Database schema changes require running `pnpm db:generate` and `pnpm db:migrate`
- The web app includes Clerk authentication with sign-in/sign-up flows
- tRPC provides type-safe API routes with React Query integration
- DO NOT read any env var files in the format of .env\*.
