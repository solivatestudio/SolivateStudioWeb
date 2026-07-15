# Solivate Studio Web

Official website and internal dashboard for Solivate Studio, a digital solution provider for SMEs, communities, events, and meaningful personal moments.

The public site is built with Astro for a fast static frontend, while operational features run through Vercel serverless functions backed by Neon Postgres.

## Features

- Public marketing website for Solivate Studio services, pricing, projects, hiring, policies, and local SEO landing pages.
- Bilingual public content support for Indonesian and English sections.
- SEO-focused service pages for website development, SME websites, company profiles, mosque/community websites, foundations, events, digital invitations, barbershops, and car rentals.
- Portfolio/case-study pages for completed client projects.
- Contact and hiring form APIs with Resend email delivery and Cloudflare Turnstile spam protection.
- **Internal admin dashboard** with:
  - Project management with multi-step wizard (info, scope, pricing model, milestones, documents, invoice)
  - Hybrid pricing model (fixed or per-feature line items)
  - Auto-generated invoices with logo, client info, line items, payment milestones, totals, and bank info
  - Customizable invoice branding (logo, kontak, bank, tagline, footer)
  - Finance tracking with auto-invoice for project and general (non-project) transactions
  - General invoices (income) and receipts (expense) for operational transactions
  - CMS for pricing, portfolio showcase, FAQ, and contact info
  - Performance KPI tracking
  - Live traffic analytics with real-time visitor monitoring
- Lightweight traffic tracking using pageview and heartbeat events, with active visitor calculation from recent events.

## Tech Stack

- **Astro 7** — static site generation
- **TypeScript** — strict mode
- **Vanilla CSS** with custom design tokens (navy #023E8A palette)
- **Plus Jakarta Sans** — brand typography
- **Vercel serverless functions** — API layer
- **Neon Postgres** — database
- **UploadThing** — file uploads (logo, MOU, documents)
- **Resend** — email delivery
- **Cloudflare Turnstile** — bot protection
- **Chart.js** — dashboard visualizations

## Repository Layout

```text
api/
  _lib/              Shared serverless helpers (auth, db, http, turnstile, cms defaults)
  admin/             Admin dashboard API routes
  public/            Public CMS API routes
  contact.js         Contact form email endpoint
  hiring.js          Hiring form email endpoint
  track.js           Public traffic tracking endpoint

public/
  images/            Portfolio and website assets
  favicon.png        Favicon
  solivate-logo.*    Brand logo assets

scripts/
  hash-admin-password.mjs   Generate scrypt password hash for admin login
  seed-homepage-cms.mjs     Seed CMS homepage translations from built HTML

src/
  components/        Shared public UI components
  data/              SEO service, portfolio, and city page data
  layouts/           Dashboard layout (sidebar, topbar, auth check)
  pages/             Astro pages and routes
  dashboard.css      Dashboard styling (~3500 lines)
  index.css          Public website styling
```

### Key Dashboard Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Overview with project, finance & traffic stats |
| `/dashboard/projects` | Multi-step wizard: add/edit projects, scope, pricing (fixed or line items), milestones, documents, invoice |
| `/dashboard/finance` | Finance tracking with Transactions & Invoices tabs |
| `/dashboard/invoice?project=xxx` | Project invoice (printable PDF) |
| `/dashboard/invoice?doc=xxx` | General invoice / receipt (printable PDF) |
| `/dashboard/settings/invoice` | Customize invoice branding (logo, kontak, bank) |
| `/dashboard/performance` | KPI management |
| `/dashboard/traffic` | Live traffic analytics |
| `/dashboard/cms` | CMS hub for pricing, projects showcase, FAQ, contact |

## Prerequisites

- Node.js 18 or newer
- npm
- A Neon Postgres database for dashboard, CMS, and analytics data
- A Resend API key for form email delivery
- UploadThing token for file uploads
- Vercel CLI when testing serverless API routes locally

## Installation

```bash
npm install
```

## Configuration

Create `.env.local` for local development. Keep real values out of git.

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="scrypt:replace_with_generated_hash"
SESSION_SECRET="replace_with_a_long_random_string"
TRACKING_SALT="replace_with_another_long_random_string"
PUBLIC_TURNSTILE_SITE_KEY="..."
TURNSTILE_SECRET_KEY="..."
UPLOADTHING_TOKEN="..."
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."
```

Generate the admin password hash with:

```bash
npm run admin:hash -- "your-admin-password"
```

For production, add the same environment variables in Vercel project settings.

## Running Locally

Run the Astro frontend only:

```bash
npm run dev
```

Run the site with Vercel serverless functions:

```bash
npx vercel dev
```

Use `npx vercel dev` when testing `/api/*`, dashboard login, contact forms, hiring forms, CMS hydration, or traffic tracking.

## Dashboard

The dashboard is available at `/dashboard/login` and uses HMAC-SHA256 signed session cookies with scrypt password hashing. All dashboard pages use `noindex,nofollow`.

### Invoice Flow

1. Create a project via the wizard at `/dashboard/projects`
2. Choose fixed price or per-feature pricing
3. Add milestones, upload MOU/documents
4. Review and generate invoice — opens a printable invoice with logo, client info, line items, totals, and bank info
5. Customize branding at `/dashboard/settings/invoice` (logo, kontak, bank, tagline, footer)
6. Finance transactions auto-update invoice status (unpaid → DP → paid)

## Scripts

```bash
npm run dev          # Start Astro dev server
npm run build        # Build production output
npm run preview      # Preview the production build locally
npm run lint         # Run Astro/TypeScript checks
npm run admin:hash   # Generate an admin password hash
npm run cms:seed     # Seed CMS homepage translations
```

## Deployment

The project is designed for Vercel with automatic deployments from GitHub.

- Build command: `npm run build`
- Output directory: `dist`
- Serverless functions: `api/*`

Required production env vars: `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `TRACKING_SALT`, `UPLOADTHING_TOKEN`, `UPLOADTHING_SECRET`, `UPLOADTHING_APP_ID`, `PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`.

## SEO

SEO data is centralized in `src/data/seo-pages.ts`.

It drives:

- Service pages under `/layanan/[slug]`
- Portfolio pages under `/portfolio/[slug]`
- Local SEO pages under `/jasa-pembuatan-website-[city]`
- Dynamic sitemap entries in `src/pages/sitemap.xml.ts`

When adding a new service, portfolio, or target city, update the data file first so pages and sitemap remain consistent.

## Security

- HMAC-SHA256 signed session cookies (HttpOnly, SameSite=Lax, 7-day expiry)
- Scrypt password hashing with random salt
- Parameterized SQL queries (no injection)
- Cloudflare Turnstile on contact & hiring forms
- IP-based rate limiting on contact form
- Audit trail for all admin mutations
- Security headers via `vercel.json`
