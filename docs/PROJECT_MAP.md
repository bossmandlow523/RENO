# Renovo Resource Solutions — Project Map

> **Read this first.** This file is the single source of truth for how the project works. Do NOT spend time re-analyzing the codebase — everything you need is here.

---

## Quick Facts

| Key | Value |
|-----|-------|
| **Working directory** | `c:/Users/nicks/Downloads/reno/renovo-site/` |
| **Framework** | Astro 5 (SSR mode) + React 18 + Tailwind v3 |
| **Hosting** | Wix Managed Headless (Cloudflare adapter) |
| **Dev command** | `wix dev` (NOT `npm run dev`) |
| **Build command** | `wix build` |
| **Deploy command** | `wix publish` |
| **Routing** | React Router 7 SPA inside a single Astro catch-all |
| **Styling** | Tailwind v3 + shadcn/UI (new-york style) + Framer Motion |
| **Fonts** | Montserrat (headings) + Inter (body) via Google Fonts |
| **Current focus** | Building out site sections |

---

## IGNORE the root `reno/` configs

The root-level `astro.config.mjs`, `tailwind.config.mjs`, and `package.json` at `c:/Users/nicks/Downloads/reno/` are **dead scaffolding**. They are NOT used for builds. Everything lives inside `renovo-site/`.

The `reno/designs/` and `reno/docs/` folders contain reference docs (design systems, notes) — they are documentation only, not code.

---

## Directory Structure

```
renovo-site/
├── wix.config.json                  # Wix appId + siteId (don't touch)
├── package.json                     # All deps — use `npm i` here
├── astro.config.mjs                 # SSR, Wix integration, React, Tailwind
├── components.json                  # shadcn/UI config (new-york, tsx, @/ aliases)
├── tsconfig.json                    # Strict TS, path aliases below
│
├── public/
│   ├── logo.png                     # Renovo logo
│   ├── error.svg                    # Error page icon
│   └── favicon.svg                  # (missing — needs adding)
│
└── src/
    ├── tailwind.config.mjs          # THE tailwind config (not root)
    ├── env.d.ts                     # Astro type declarations
    │
    ├── styles/
    │   ├── fonts.css                # Google Fonts @import (Inter + Montserrat)
    │   └── global.css               # @tailwind directives + base layer
    │
    ├── pages/
    │   └── [...slug].astro          # Single catch-all — loads React SPA
    │
    ├── components/
    │   ├── Head.tsx                  # <meta> tags, font preconnect
    │   ├── Router.tsx               # React Router config + Layout wrapper
    │   │
    │   ├── pages/
    │   │   └── HomePage.tsx         # Composes: Hero → Impact → Partners
    │   │
    │   ├── layout/
    │   │   ├── Header.tsx           # Sticky header (logo + centered nav)
    │   │   ├── Navigation.tsx       # Nav links (Impact, Partners, Services, Contact)
    │   │   └── Footer.tsx           # Logo + copyright
    │   │
    │   ├── impact/
    │   │   ├── ImpactSection.tsx     # "Our Impact" wrapper
    │   │   ├── ImpactStats.tsx       # 3-col grid of counters
    │   │   └── AnimatedCounter.tsx   # Scroll-triggered count-up animation
    │   │
    │   ├── partners/
    │   │   ├── PartnersSection.tsx   # "Our Partners" wrapper (placeholder data)
    │   │   ├── PartnerGrid.tsx       # Responsive 1/2/3 col grid
    │   │   └── PartnerCard.tsx       # Card with logo or letter avatar
    │   │
    │   └── ui/                       # 43 shadcn/UI components (pre-installed)
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── dialog.tsx
    │       ├── tabs.tsx
    │       ├── accordion.tsx
    │       ├── sheet.tsx
    │       ├── navigation-menu.tsx
    │       ├── ... (40 more)
    │       └── tooltip.tsx
    │
    ├── hooks/
    │   ├── use-toast.tsx             # Toast notification system
    │   └── use-size.ts               # ResizeObserver hook
    │
    └── lib/
        ├── utils.ts                  # cn() — clsx + tailwind-merge
        └── scroll-to-top.tsx         # ScrollToTop on route change
```

---

## How the App Renders

```
1. Browser hits any URL
2. Astro catches it via [...slug].astro
3. Astro renders <html> shell with:
   - <Head /> (meta, font preconnect)
   - <SEO.Tags /> (Wix SEO)
   - <AppRouter client:only="react" /> (React hydration, NO SSR for React)
4. React Router mounts:
   - Layout = Header + <Outlet /> + Footer
   - "/" → HomePage
   - anything else → redirects to "/"
5. HomePage renders sections top-to-bottom:
   - ImpactSection
   - PartnersSection
```

---

## Path Aliases (use these in imports)

| Alias | Maps to |
|-------|---------|
| `@/*` | `src/*` |
| `@components/*` | `src/components/*` |
| `@lib/*` | `src/lib/*` |
| `@layouts/*` | `src/layouts/*` |
| `@styles/*` | `src/styles/*` |

Example: `import { cn } from "@/lib/utils"`

---

## Tailwind Config (`src/tailwind.config.mjs`)

### Colors

```
renovo-green:       #2D6A4F   (primary brand green)
renovo-green-light: #40916C   (accent green)
renovo-green-dark:  #1B4332   (dark green for headings/hero)
renovo-earth:       #B7B7A4   (muted text, footer text)
renovo-sand:        #D4C7B0   (section backgrounds, accents)
renovo-charcoal:    #2B2D42   (body text, footer bg, hero bg)
renovo-slate:       #8D99AE   (secondary text)
renovo-white:       #F8F9FA   (page background)

primary:            #2D6A4F   (= renovo-green)
primary-foreground: #FFFFFF
secondary:          #DCD9D0
secondary-foreground: #1C1C1C
foreground:         #1C1C1C
background:         #F2F2F2
destructive:        #DF3131
destructiveforeground: #FFFFFF
```

### Fonts

```
font-heading: Montserrat (600-900)
font-body:    Inter (400-800)
font-paragraph: Inter (alias of body)
```

### Font Sizes

Custom scale from `xs` to `9xl`, each with letter-spacing + line-height + font-weight baked in.

### Plugins

- `@tailwindcss/container-queries`
- `@tailwindcss/typography`

---

## Global CSS (`src/styles/global.css`)

```css
@import './fonts.css';           /* Google Fonts */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-renovo-white text-renovo-charcoal font-body antialiased; }
  h1-h6 { @apply font-heading font-bold; }
}
```

---

## shadcn/UI Setup

- **Style:** new-york
- **RSC:** false (not using React Server Components)
- **Config path:** `src/tailwind.config.mjs`
- **CSS variables:** enabled
- **Component path:** `@/components/ui`
- **Utils path:** `@/lib/utils`
- **Install command:** `npx shadcn@latest add <component>` (run from `renovo-site/`)

### Installed Components (43)

accordion, alert, alert-dialog, aspect-ratio, avatar, badge, button, calendar, card, checkbox, collapsible, command, context-menu, dialog, dropdown-menu, form, hover-card, image, input, label, loading-spinner, member-protected-route, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, sheet, sign-in, skeleton, slider, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip

---

## Key Component Details

### Header (`components/layout/Header.tsx`)
- `position: absolute`, z-50, transparent
- Logo in white rounded-bottom card, far left
- Navigation centered (hidden on mobile, visible md+)

### Navigation (`components/layout/Navigation.tsx`)
- Frosted glass bar (white/10 bg, backdrop-blur)
- Links: Impact, Partners, Services, Contact (hash anchors)
- Uppercase, tracking-wider

### Footer (`components/layout/Footer.tsx`)
- renovo-charcoal bg, renovo-earth text
- Logo (inverted for dark bg) + copyright with dynamic year

### AnimatedCounter (`components/impact/AnimatedCounter.tsx`)
- IntersectionObserver triggers count-up on scroll
- 2000ms duration, cubic ease-out
- Runs once per page load

---

## Wix Integration

### Config
- `wix.config.json` — appId + siteId (don't edit)
- `.env.local` — WIX_CLIENT_ID and other secrets (don't commit)

### SDK Packages Installed
- `@wix/sdk` — Core client
- `@wix/data` — CMS queries
- `@wix/ecom` — E-commerce (unused currently)
- `@wix/members` — User accounts (unused currently)
- `@wix/seo` — SEO tags (active — used in [...slug].astro)
- `@wix/image` + `@wix/image-kit` — Image optimization
- `@wix/monitoring-astro` — Production monitoring
- `@wix/redirects` — URL redirects

### CMS Pattern (when ready)
```tsx
import { items } from "@wix/data";
// In a component or loader:
const result = await wixClient.items.query("CollectionName").find();
```

Collections planned but not yet created: Partners, ImpactStats

---

## Assets in `public/`

| File | Purpose |
|------|---------|
| `logo.png` | Renovo logo (used in Header + Footer) |
| `error.svg` | Error page illustration |

---

## How to Add a New Section

1. Create component file in `src/components/<section-name>/SectionName.tsx`
2. Import it in `src/components/pages/HomePage.tsx`
3. Add it to the JSX in render order
4. If it needs a nav link, add hash anchor to `components/layout/Navigation.tsx`

---

## How to Add a New Page

1. Create component in `src/components/pages/NewPage.tsx`
2. Add route in `src/components/Router.tsx`:
   ```tsx
   { path: "new-page", element: <NewPage /> }
   ```
3. Add nav link in Navigation.tsx

---

## Common Gotchas

- **Tailwind v3 only** — do NOT upgrade to v4, `@astrojs/tailwind` requires v3
- **`wix dev` not `npm run dev`** — Wix CLI wraps Astro with its backend tunnel
- **`client:only="react"`** — React components are client-only, NO server rendering for React parts
- **Root `reno/` configs are dead** — always work inside `renovo-site/`
- **shadcn install location** — run `npx shadcn@latest add` from `renovo-site/` directory
- **Images** — put in `public/`, reference as `/filename.png` (no import needed)
- **Font sizes** — Tailwind config has custom letter-spacing/weight baked into each size class, so `text-4xl` automatically gets `font-weight: 800` and `letter-spacing: 0.04em`
