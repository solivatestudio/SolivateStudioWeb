# <img src="./public/favicon.png" width="32" height="32" valign="middle" /> Solivate Studio Web

[![Astro](https://img.shields.io/badge/Astro-v4.x-FF5D01?style=flat-square&logo=astro&logoColor=white)](https://astro.build/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Aesthetics](https://img.shields.io/badge/Aesthetics-Premium_Dark-00b4d8?style=flat-square)](#-design-aesthetics)

Official website for **Solivate Studio** – a premium Digital Solution Agency based in Indonesia. Built using Astro with a modern, high-performance static architecture, fully optimized for search engines (SEO) and user experience.

---

## 💎 Design Aesthetics

- **Premium UI:** Crafted with custom HSL color systems, sleek dark-mode glassmorphism, responsive layouts, and hardware-accelerated transitions.
- **Micro-Animations:** Fluid, interactive elements including cursor-guided hover states on cards and buttons.
- **Optimized Assets:** High-fidelity images utilizing next-gen WebP formatting and responsive sizing.

---

## 🚀 Advanced SEO Architecture

- **Semantic HTML:** Fully structured layout designed for optimal accessibility (WCAG 2.2) and search crawler parsing.
- **Programmatic Local SEO:** Automated regional landing pages targeting 10 major Indonesian cities (Bekasi, Jakarta, Tangerang, Depok, Bogor, Bandung, Surabaya, Semarang, Medan, Makassar) to capture high-intent local business searches.
- **Structured Data:** High-fidelity JSON-LD schema markup (`Organization`, `LocalBusiness`, `ProfessionalService`, `CreativeWork`, and `CollectionPage`) for rich search engine snippets.
- **Dynamic Sitemap:** Automatically generated XML sitemap mapping all active service categories, portfolios, and regional paths.

---

## ⚙️ Technology Stack

| Core | Tooling / Hosting |
| --- | --- |
| **Framework:** Astro (Static Site Generation) | **Hosting Platform:** Vercel |
| **Styling:** Vanilla CSS (CSS Variables) | **Sitemap:** Dynamic XML Generator |
| **Language:** TypeScript | **Analytics:** Google Analytics 4 |

---

## 📂 Project Structure

```text
├── public/                  # Static assets (logos, favicon, robots.txt)
└── src/
    ├── components/          # Reusable Astro components (Header, Footer, WA CTA)
    ├── data/                # SEO and localized data configurations (seo-pages.ts)
    ├── pages/               # Main pages & routing
    │   ├── layanan/         # Dynamic service pages [slug].astro
    │   ├── portfolio/       # Dynamic case study pages [slug].astro
    │   ├── api/             # API endpoints (contact submissions)
    │   ├── index.astro      # Main landing page
    │   ├── pricing.astro    # Transparent pricing plans
    │   ├── project.astro    # Portfolios collection showcase
    │   ├── sitemap.xml.ts   # Dynamic sitemap generator
    │   └── jasa-pembuatan-website-[city].astro # Localized city landing pages
    └── index.css            # Base stylesheet & premium utility styles
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm or pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/solivatestudio/SolivateStudioWeb.git

# Navigate to the project directory
cd SolivateStudioWeb

# Install dependencies
npm install
```

### Development Commands

```bash
# Start the local development server
npm run dev

# Build the production bundle
npm run build

# Preview the locally built production site
npm run preview
```

---

## 🌐 Deployment

The project is configured for continuous deployment on **Vercel**.
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Configuration:** `vercel.json` (includes security headers and www-to-non-www 301 redirects).

---
Developed with ❤️ by **[Solivate Studio](https://solivate.com)**.
