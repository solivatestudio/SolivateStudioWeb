# Solivate Studio Web

Official website and lightweight internal dashboard for Solivate Studio, a digital solution provider for SMEs, communities, events, and meaningful personal moments.

The public site is built with Astro for a fast static frontend, while operational features run through Vercel serverless functions backed by Neon Postgres.

## Features

- Public marketing website for Solivate Studio services, pricing, projects, hiring, policies, and local SEO landing pages.
- Bilingual public content support for Indonesian and English sections.
- SEO-focused service pages for website development, SME websites, company profiles, mosque/community websites, foundations, events, digital invitations, barbershops, and car rentals.
- Portfolio/case-study pages for completed client projects.
- Contact and hiring form APIs with Resend email delivery.
- Internal admin dashboard for CMS content, project management, finance entries, performance metrics, and live traffic summaries.
- Lightweight traffic tracking using pageview and heartbeat events, with active visitor calculation from recent events.

## Tech Stack

- Astro 7
- TypeScript
- Vanilla CSS with custom design tokens
- Vercel serverless functions
- Neon Postgres
- Resend

## Repository Layout

```text
api/
  _lib/              Shared serverless helpers for auth, database, and HTTP responses
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
  hash-admin-password.mjs

src/
  components/        Shared public UI components
  data/              SEO service, portfolio, and city page data
  layouts/           Dashboard layout
  pages/             Astro pages and routes
  dashboard.css      Dashboard styling
  index.css          Public website styling
```

## Prerequisites

- Node.js 18 or newer
- npm
- A Neon Postgres database for dashboard, CMS, and analytics data
- A Resend API key for form email delivery
- Vercel CLI when testing serverless API routes locally

## Installation

```bash
npm install
```

## Configuration

Create `.env.local` for local development. Keep real values out of git.

```env
RESEND_API_KEY="re_xxxxxxxxx"
RESEND_TO_EMAIL="solivatestudio@gmail.com"
RESEND_FROM_EMAIL="Solivate Studio <onboarding@resend.dev>"

DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="scrypt:replace_with_generated_hash"
SESSION_SECRET="replace_with_a_long_random_string"
TRACKING_SALT="replace_with_another_long_random_string"
```

Generate the admin password hash with:

```bash
npm run admin:hash -- "your-admin-password"
```

For production, add the same environment variables in the correct Vercel project or team settings.

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

The dashboard is available at:

```text
/dashboard/login
```

Dashboard modules:

- Overview: project, finance, and traffic summary
- Website CMS: editable homepage/company profile content
- Projects: internal project tracking
- Finance: income and expense records
- Performance: internal KPI tracking
- Live Traffic: pageview, route, referrer, and active visitor summaries

The dashboard pages use `noindex,nofollow` and require the signed admin session cookie.

## Scripts

```bash
npm run dev          # Start Astro dev server
npm run build        # Build production output
npm run preview      # Preview the production build locally
npm run lint         # Run Astro/TypeScript checks
npm run admin:hash   # Generate an admin password hash
```

## Deployment

The project is designed for Vercel.

- Build command: `npm run build`
- Output directory: `dist`
- Serverless functions: `api/*`
- Required production env vars: `RESEND_API_KEY`, `RESEND_TO_EMAIL`, `RESEND_FROM_EMAIL`, `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`, `TRACKING_SALT`

After deployment, verify:

- Public pages load correctly.
- Contact and hiring forms send email through Resend.
- `/dashboard/login` accepts the configured admin account.
- Dashboard traffic receives pageview/heartbeat data.

## SEO

SEO data is centralized in `src/data/seo-pages.ts`.

It drives:

- Service pages under `/layanan/[slug]`
- Portfolio pages under `/portfolio/[slug]`
- Local SEO pages under `/jasa-pembuatan-website-[city]`
- Dynamic sitemap entries in `src/pages/sitemap.xml.ts`

When adding a new service, portfolio, or target city, update the data file first so pages and sitemap remain consistent.
