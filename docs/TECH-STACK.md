# Renovo Resource Solutions — Tech Stack

> Last updated: 2026-02-07

## Architecture

**Wix Managed Headless** — Wix hosts both the frontend (Astro/React) and the backend (CMS, auth, ecommerce). Deployed via Wix CLI, not Vercel/Netlify/Cloudflare. No drag-and-drop editor — all UI is code-first.

---

## Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Astro | 5.x | SSR framework, serves the HTML shell and mounts the React app |
| React | 18.3 | Client-side UI runtime, all components render as a single-page app |
| TypeScript | 5.8 | Type safety across all components and SDK calls |
| react-router-dom | 7.7 | Client-side routing (SPA pattern inside Astro's catch-all route) |

## Styling

| Technology | Version | Purpose |
|-----------|---------|---------|
| Tailwind CSS | 3.4 | Utility-first CSS with custom Renovo brand tokens |
| Inter | — | Primary font (400, 500, 600, 700, 800) via Google Fonts |
| PostCSS + Autoprefixer | — | CSS processing pipeline |

## Component Libraries

| Technology | Purpose |
|-----------|---------|
| shadcn/UI | 56 pre-built accessible components (buttons, cards, dialogs, forms, etc.) |
| Radix UI | Headless primitives powering shadcn components |
| framer-motion | Animation library (available, not yet used extensively) |
| class-variance-authority | Component variant management for shadcn |
| clsx + tailwind-merge | Class name utilities (`cn()` helper) |

## Wix Backend (SDK)

| Package | Purpose | Status |
|---------|---------|--------|
| `@wix/astro` | Core Wix integration for Astro (auth, HTML embeds) | Active |
| `@wix/data` | CMS data access — query collections | Installed, not wired up yet |
| `@wix/ecom` | eCommerce APIs | Installed, not wired up yet |
| `@wix/members` | Member auth and profiles | Installed, not wired up yet |
| `@wix/seo` | Server-side SEO tag injection from Wix dashboard | Active |
| `@wix/image` / `@wix/image-kit` | Wix media CDN image optimization | Installed |
| `@wix/redirects` | URL redirect management | Installed |
| `@wix/monitoring-astro` | Error and performance reporting to Wix dashboard | Active (production only) |
| `@wix/services-manager` | Service dependency injection | Active |

## Build & Deploy

| Tool | Command | Purpose |
|------|---------|---------|
| Wix CLI (`@wix/cli`) | `wix dev` | Local dev server with Wix backend tunnel |
| Wix CLI | `wix build` | Production build (SSR + client bundle) |
| Wix CLI | `wix publish` | Deploy to Wix cloud |
| Wix CLI | `wix preview` | Preview published site |
| Cloudflare adapter | — | SSR runtime adapter for Wix's hosting infrastructure |
| Vite | 6.4 | Bundler and dev server (under the hood) |

## Testing & Quality

| Tool | Purpose |
|------|---------|
| Vitest | Unit testing framework |
| ESLint | Code linting (TypeScript, React, Astro, JSX a11y) |
| `astro check` | Astro-specific type checking |

## Infrastructure

| Item | Value |
|------|-------|
| Hosting | Wix Managed Headless cloud |
| CDN/SSL | Managed by Wix |
| Site URL | `https://renovo-site-app6912.wix-host.com` |
| Image CDN | `static.wixstatic.com` |
| Font CDN | Google Fonts (`fonts.googleapis.com`) |

---

## Brand Design Tokens

```
Colors:
  renovo-green:       #2D6A4F   (primary)
  renovo-green-light: #40916C   (accent)
  renovo-green-dark:  #1B4332   (headings, hero backgrounds)
  renovo-earth:       #B7B7A4   (muted text on dark)
  renovo-sand:        #D4C7B0   (section backgrounds)
  renovo-charcoal:    #2B2D42   (body text, footer)
  renovo-slate:       #8D99AE   (secondary text)
  renovo-white:       #F8F9FA   (page background)

Font: Inter (400, 500, 600, 700, 800)
```

---

## What's Ours vs What Came From Wix

**From the Wix CLI template:**
- Astro SSR setup, Cloudflare adapter, Vite config
- React Router SPA pattern (`[...slug].astro` → `Router.tsx`)
- shadcn/UI component library (56 components)
- framer-motion, Radix UI, react-hook-form
- All `@wix/*` SDK packages
- Monitoring, SEO, build/deploy pipeline
- `cn()` utility, scroll-to-top, toast system

**Our custom work:**
- Renovo brand tokens (colors, fonts) in Tailwind config
- Inter font (replacing Work Sans)
- Global CSS base styles
- Layout components (Header, Footer, Navigation)
- Impact section (AnimatedCounter, ImpactStats, ImpactSection)
- Partners section (PartnerCard, PartnerGrid, PartnersSection)
- HomePage with hero, impact stats, and partner grid
- Router layout with Header/Footer wrapping all pages
