# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Includes the CG Techno Electronics corporate website (Next.js 14) plus the shared API server infrastructure.

## Projects

### CG Techno Electronics Website (`apps/web`)
Corporate website for CG Techno Electronics, a Bengaluru-based IT infrastructure company.

**Tech stack:**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod + `@hookform/resolvers`
- **Email**: Nodemailer (SMTP via Gmail)

**Pages:** `/`, `/services`, `/about`, `/products`, `/clients`, `/careers`, `/contact`

**Contact info:**
- Phones: +91 886 115 8888 / +91 636331243 / 080 2211 1369
- Email: cgtechnoelectronics@gmail.com
- Address: #6/1, Ground Floor, 1st Cross, Sampangiramanagar, Bangalore-27

**Required env vars (set in Replit secrets):**
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`
- `CONTACT_EMAIL_TO` (defaults to cgtechnoelectronics@gmail.com)
- `CAREERS_EMAIL_TO` (defaults to cgtechnoelectronics@gmail.com)

### Shared Libraries (`libs/`)
- `libs/config` (`@cg-techno/config`) — site config, navigation, all data (services, products, clients, etc.)
- `libs/utils` (`@cg-techno/utils`) — `cn()`, rate limiting, sanitization, formatting
- `libs/features` (`@cg-techno/features`) — Zod schemas + Nodemailer email templates
  - Client-safe subpath: `@cg-techno/features/schemas`
  - Server-only subpath: `@cg-techno/features/email`

### API Server (`artifacts/api-server`)
Standard Express 5 API at `/api`. Not used by the website currently (website uses its own Next.js API routes).

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5 (api-server), Next.js API routes (website)
- **Database**: PostgreSQL + Drizzle ORM (api-server)
- **Validation**: Zod
- **Build**: esbuild (api-server), Next.js (website)

## Key Commands

- `PORT=3000 pnpm --filter @cg-techno/web run dev` — run website locally
- `pnpm --filter @cg-techno/web run build` — production build
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Vercel Deployment

The `vercel.json` at root configures Next.js deployment:
- Root directory: `apps/web`
- Build: `pnpm --filter @cg-techno/web run build`
- Output: `.next`

Set all SMTP env vars in Vercel project settings before deploying.

## Important Notes

- Lib imports use bare module specifiers (no `.js` extension) for webpack compatibility with `transpilePackages`
- Client components import schemas from `@cg-techno/features/schemas` (not the root) to avoid bundling nodemailer
- The `'use client'` pages (e.g., `/products`) use Tailwind 3 class-based design
- Logo at `apps/web/public/logo.png`
