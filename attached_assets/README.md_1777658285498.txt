# README.md
# CG Techno Electronics — Corporate Website

> **Premium IT Infrastructure & Electronics Solutions — Bengaluru, India**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Nx Monorepo Architecture](#3-nx-monorepo-architecture)
4. [Folder Structure](#4-folder-structure)
5. [Prerequisites](#5-prerequisites)
6. [Installation](#6-installation)
7. [Environment Variables](#7-environment-variables)
8. [Running Locally](#8-running-locally)
9. [Useful Nx Commands](#9-useful-nx-commands)
10. [Deployment](#10-deployment-vercel)
11. [Documentation Index](#11-documentation-index)
12. [Future Improvements](#12-future-improvements)
13. [Contributing](#13-contributing)
14. [License](#14-license)

---

## 1. Project Overview

**CG Techno Electronics** is a Bengaluru-based IT infrastructure and electronics solutions
company. This repository contains the source code for their corporate website — a
**static-first, SEO-optimized, premium web presence** built to:

- Showcase the company's services and product portfolio
- Capture customer enquiries via a serverless contact form
- Accept job and internship applications via a serverless careers form
- Present the company as a professional, enterprise-grade IT partner

The system is fully static on the content side (no database, no CMS in v1), with
**two serverless API routes** handling form submissions and email dispatch via SMTP.

**Live URL:** `https://www.cgtechnoelectronics.com`

---

## 2. Tech Stack

| Layer              | Technology                   | Version   |
|--------------------|------------------------------|-----------|
| Monorepo           | Nx                           | 18+       |
| Frontend Framework | Next.js (App Router)         | 14+       |
| Language           | TypeScript                   | 5+ strict |
| Styling            | Tailwind CSS                 | 3+        |
| Animations         | Framer Motion                | 11+       |
| Forms              | React Hook Form              | 7+        |
| Validation         | Zod                          | 3+        |
| Email              | Nodemailer                   | 6+        |
| Icons              | Lucide React                 | Latest    |
| Class Merging      | clsx + tailwind-merge        | Latest    |
| Linting            | ESLint + Prettier            | Latest    |
| Testing            | Jest + React Testing Library | Latest    |
| Deployment         | Vercel                       | —         |
| Version Control    | Git + GitHub                 | —         |

---

## 3. Nx Monorepo Architecture

This project uses **Nx** to manage a monorepo containing one application and five
shared libraries. Nx provides:

- **Build caching** — Unchanged libraries are never rebuilt (massive CI speedup)
- **Project graph** — Visualize dependency relationships between libs and apps
- **Affected detection** — Only test/build what changed since last commit
- **Enforced boundaries** — Libraries cannot import from apps; circular deps prevented
- **Code generators** — Scaffold new components, libraries, and pages consistently

### Why Nx for a Website Project?

Even for a single-app project, Nx's library architecture forces clean separation of
concerns. UI primitives live in `libs/ui`. Business logic (forms, schemas, email)
lives in `libs/features`. Content data lives in `libs/config`. This means:

- Any library can be extracted and reused in a future project
- Teams can work on different libraries without merge conflicts
- The app layer (`apps/web`) stays thin — only routing and page composition

---

## 4. Folder Structure

```
cg-techno-electronics/
│
├── apps/
│   └── web/                          # Main Next.js application
│       ├── app/                      # App Router pages + API routes
│       │   ├── layout.tsx            # Root layout (Navbar, Footer, Providers)
│       │   ├── page.tsx              # / — Homepage
│       │   ├── about/page.tsx        # /about
│       │   ├── services/page.tsx     # /services
│       │   ├── products/page.tsx     # /products
│       │   ├── clients/page.tsx      # /clients
│       │   ├── careers/page.tsx      # /careers
│       │   ├── contact/page.tsx      # /contact
│       │   ├── api/
│       │   │   ├── contact/route.ts  # POST /api/contact
│       │   │   └── apply/route.ts    # POST /api/apply
│       │   ├── not-found.tsx
│       │   └── error.tsx
│       └── public/                   # Static assets (images, favicon, og-image)
│
├── libs/
│   ├── ui/                           # Reusable UI primitives
│   │   └── src/components/
│   │       ├── Button/
│   │       ├── Card/
│   │       ├── Input/
│   │       ├── Textarea/
│   │       ├── Select/
│   │       ├── Badge/
│   │       ├── Modal/
│   │       ├── Toast/
│   │       ├── Spinner/
│   │       ├── Navbar/
│   │       └── Footer/
│   │
│   ├── sections/                     # Page section components
│   │   └── src/
│   │       ├── Hero/
│   │       ├── Stats/
│   │       ├── Services/
│   │       ├── Products/
│   │       ├── Clients/
│   │       ├── Testimonials/
│   │       ├── About/
│   │       ├── Careers/
│   │       ├── Contact/
│   │       └── CTABanner/
│   │
│   ├── features/                     # Business logic: forms, schemas, email
│   │   └── src/
│   │       ├── schemas/              # Zod validation schemas
│   │       ├── forms/                # React Hook Form components
│   │       ├── email/                # Nodemailer templates + transport
│   │       ├── hooks/                # Form submission hooks
│   │       └── context/              # Toast context provider
│   │
│   ├── utils/                        # Pure helper functions
│   │   └── src/
│   │       ├── cn.ts                 # Tailwind class merging
│   │       ├── format.ts             # Date / string formatters
│   │       ├── sanitize.ts           # HTML sanitization
│   │       └── rate-limit.ts         # IP rate limiting
│   │
│   └── config/                       # Static data + site configuration
│       └── src/
│           ├── site-config.ts
│           ├── navigation.ts
│           └── data/
│               ├── services.data.ts
│               ├── products.data.ts
│               ├── clients.data.ts
│               ├── testimonials.data.ts
│               └── careers.data.ts
│
├── nx.json                           # Nx workspace configuration
├── package.json
├── tsconfig.base.json                # Shared TypeScript config + path aliases
├── .eslintrc.json
├── .prettierrc
├── .env.local.example                # Environment variable template (safe to commit)
└── README.md
```

---

## 5. Prerequisites

Ensure the following are installed on your development machine:

| Tool        | Minimum Version | Install                                    |
|-------------|-----------------|--------------------------------------------|
| Node.js     | 18.17+          | https://nodejs.org or `nvm install 20`     |
| npm         | 9+              | Bundled with Node.js                       |
| Git         | 2.40+           | https://git-scm.com                        |
| Nx CLI      | 18+             | `npm install -g nx` (optional, or use npx) |

---

## 6. Installation

### Clone the Repository

```bash
git clone https://github.com/your-org/cg-techno-electronics.git
cd cg-techno-electronics
```

### Install Dependencies

```bash
npm install
```

### Verify Project Graph

```bash
npx nx graph
# Opens a browser tab showing the dependency graph
```

---

## 7. Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.local.example .env.local
```

**Never commit `.env.local` to Git.** It is listed in `.gitignore`.

### Variable Reference

```bash
# ─── SMTP Configuration ─────────────────────────────────────────────────────
# Gmail SMTP (use App Password, not your account password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@cgtechnoelectronics.com
SMTP_PASSWORD=your_gmail_app_password_here

# ─── Email Destinations ────────────────────────────────────────────────────
# Where contact form submissions are sent
CONTACT_EMAIL_TO=info@cgtechnoelectronics.com
# Where job applications are sent
CAREERS_EMAIL_TO=hr@cgtechnoelectronics.com

# ─── Application Config ────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Setting Up Gmail App Password

1. Log in to your Google Account
2. Go to **Security** → **2-Step Verification** (must be enabled)
3. At the bottom, click **App Passwords**
4. Generate a password for "Mail" → "Other (Custom)" → `CG Techno Website`
5. Copy the 16-character password and use it as `SMTP_PASSWORD`

---

## 8. Running Locally

### Start the Development Server

```bash
npx nx serve web
```

The application will be available at: **http://localhost:3000**

Hot module replacement is active — changes to any file in `apps/web` or `libs/*`
will automatically update the browser.

### Run in Production Mode (Local)

```bash
npx nx build web
npx nx start web
```

Access at **http://localhost:3000** — this mirrors the Vercel production environment.

---

## 9. Useful Nx Commands

```bash
# ─── Development ────────────────────────────────────────────────────────────
npx nx serve web                        # Start dev server with HMR
npx nx build web                        # Production build
npx nx start web                        # Serve production build locally

# ─── Testing ────────────────────────────────────────────────────────────────
npx nx test web                         # Test the web app
npx nx test ui                          # Test the UI library
npx nx run-many --target=test --all     # Run all tests across all projects

# ─── Linting ────────────────────────────────────────────────────────────────
npx nx lint web                         # Lint the web app
npx nx run-many --target=lint --all     # Lint everything

# ─── Code Generation ────────────────────────────────────────────────────────
npx nx g @nx/react:component MyComp --project=ui           # New UI component
npx nx g @nx/react:component HeroSection --project=sections # New section

# ─── Project Graph ──────────────────────────────────────────────────────────
npx nx graph                            # Visualize project dependency graph

# ─── Affected (CI Optimization) ─────────────────────────────────────────────
npx nx affected:build                   # Build only changed projects
npx nx affected:test                    # Test only changed projects
npx nx affected:lint                    # Lint only changed projects
```

---

## 10. Deployment — Vercel

### Automatic Deployment (Recommended)

1. Push this repository to GitHub
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**
3. Import the GitHub repository
4. Configure build settings:
   - **Framework Preset:** Next.js
   - **Root Directory:** `apps/web`
   - **Build Command:** `cd ../.. && npx nx build web`
   - **Output Directory:** `apps/web/.next`
5. Add all environment variables (from Section 7) in the **Environment Variables** panel
6. Click **Deploy**

### Custom Domain

1. In your Vercel project → **Settings** → **Domains**
2. Add `www.cgtechnoelectronics.com` and `cgtechnoelectronics.com`
3. Update your DNS provider:
   - Add a `CNAME` record: `www` → `cname.vercel-dns.com`
   - Add an `A` record: `@` → `76.76.21.21`
4. Vercel automatically provisions an SSL certificate (Let's Encrypt)

### Manual Deployment

```bash
npm install -g vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Post-Deployment Checklist

- [ ] Submit `https://www.cgtechnoelectronics.com/sitemap.xml` to Google Search Console
- [ ] Verify both API forms deliver real emails
- [ ] Check Google Analytics 4 is recording sessions
- [ ] Run Lighthouse audit on the live URL (target: Performance ≥ 90)
- [ ] Verify HTTPS is active (`https://` in address bar, padlock icon)

---

## 11. Documentation Index

All project documentation is in the `/docs` folder at the repository root:

| File               | Contents                                                |
|--------------------|---------------------------------------------------------|
| `Requirements.md`  | Full functional and non-functional requirements         |
| `Architecture.md`  | System architecture, Nx structure, tech stack decisions |
| `AppFlow.md`       | Visitor journeys, system flows, error states            |
| `Schema.md`        | TypeScript schemas, Zod validation specs                |
| `DataAPI.md`       | API endpoint reference, request/response specs          |
| `Phases.md`        | 7-sprint development plan with acceptance criteria      |
| `README.md`        | This file                                               |

---

## 12. Future Improvements

The following features are planned for v2 and beyond:

| Feature                       | Priority | Notes                                      |
|-------------------------------|----------|--------------------------------------------|
| Google Analytics 4 Events     | High     | Track CTA clicks, form starts, submissions |
| WhatsApp Business CTA Button  | High     | Floating button linking to WhatsApp chat   |
| Blog / Insights Section       | Medium   | SEO content marketing via MDX or Sanity    |
| Sanity CMS Integration        | Medium   | Non-technical content management           |
| Upstash Redis Rate Limiting   | Medium   | Persistent rate limiting across edge nodes |
| hCaptcha / Cloudflare Turnstile| Medium  | Bot protection on form submissions         |
| Submission Log (Vercel KV)    | Medium   | Store form submissions as backup to email  |
| Multi-language Support        | Low      | English + Kannada + Hindi                  |
| Live Chat (Crisp / Tawk.to)   | Low      | Embedded support chat widget               |
| Admin Dashboard               | Low      | View submissions, manage content           |
| E-commerce Product Catalog    | Future   | Enquiry-only pricing system                |

---

## 13. Contributing

This is a private client project. For internal development:

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feature/section-name
   ```
2. Make changes, ensuring ESLint and TypeScript pass:
   ```bash
   npx nx lint web && npx nx test ui
   ```
3. Commit with a descriptive message:
   ```bash
   git commit -m "feat(sections): add animated stats counter section"
   ```
4. Open a Pull Request targeting `main`
5. Vercel will auto-deploy a preview URL for review

### Commit Message Convention

```
feat(scope):    New feature
fix(scope):     Bug fix
chore(scope):   Build, config, tooling changes
docs(scope):    Documentation updates
style(scope):   Formatting, Tailwind class changes
refactor(scope):Code restructure without behavior change
test(scope):    Add or update tests
```

---

## 14. License

This project is proprietary. All rights reserved — CG Techno Electronics, Bengaluru, India.
Unauthorized copying, modification, or distribution is strictly prohibited.

---

*Built with Next.js + Nx — Deployed on Vercel*
*CG Techno Electronics © 2025 — Bengaluru, Karnataka, India*
