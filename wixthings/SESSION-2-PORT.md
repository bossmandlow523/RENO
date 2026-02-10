# Session 2 — Porting Custom UI into CLI Project

> **Date:** 2026-02-07
> **Working directory:** `C:\Users\nicks\Downloads\reno`
> **Goal:** Port our custom-built components from the manual scaffold (`reno/`) into the Wix CLI-generated project (`renovo-site/`), which is the production base.

---

## Context: Why This Was Needed

In Session 1, we discovered that our manually scaffolded Astro project (`reno/`) couldn't replicate the full Wix Managed Headless infrastructure. We ran the Wix CLI wizard (`npm create @wix/headless-site@latest`), which generated `renovo-site/` — a production-ready project with SSR, Cloudflare adapter, Wix monitoring, Babel plugins, SEO services, and a full Radix/shadcn UI library.

The CLI project had all the backend plumbing but a placeholder homepage ("HELLO: IT'S YOU."). Our manual project had all the custom UI but none of the Wix infrastructure. The task was to merge the two.

---

## Key Architecture Decision: Adapt to the CLI's React Router Pattern

The CLI project uses a **React SPA router** pattern:
- Single catch-all Astro page (`[...slug].astro`) that mounts a React app via `client:only="react"`
- `react-router-dom` handles all client-side routing inside `Router.tsx`
- Pages are React components in `src/components/pages/`

Our original project used **Astro file-based routing** with island hydration (`client:visible`). We chose to **adapt to the CLI's pattern** (Option 1 from the HANDOFF doc) because:
1. It's what the Wix CLI expects — less risk of breaking Wix's SEO/monitoring features
2. The `[...slug].astro` page handles Wix SEO tag injection at the server level
3. All future pages will follow the same React component pattern

This meant converting our Astro components (`.astro`) to React (`.tsx`).

---

## What Was Changed

### 1. Tailwind Config (`src/tailwind.config.mjs`)
**Why:** The CLI project used a warm brown palette (`primary: #8B5A45`) and Work Sans font. Renovo's brand uses greens and Inter.

**What changed:**
- Added full `renovo` color namespace (green, green-light, green-dark, earth, sand, charcoal, slate, white)
- Changed `primary` color from brown to renovo green (`#2D6A4F`)
- Replaced `work-sans-v2` font family with `Inter` for heading, body, and paragraph
- Kept all existing CLI config structure (fontSize scale, plugins, future settings) intact

### 2. Fonts (`src/styles/fonts.css`)
**Why:** The CLI shipped 57 lines of `@font-face` declarations for Work Sans loaded from Wix's Parastorage CDN. We need Inter from Google Fonts.

**What changed:** Replaced the entire file with a single `@import` for Inter (weights 400–800) from Google Fonts.

### 3. Head Component (`src/components/Head.tsx`)
**Why:** Font preconnect hints need to point to Google Fonts instead of Parastorage.

**What changed:** Replaced `parastorage.com` preconnect with `fonts.googleapis.com` and `fonts.gstatic.com`.

### 4. Global CSS (`src/styles/global.css`)
**Why:** Needed Renovo's base styles (smooth scrolling, body defaults, heading font weight) applied globally.

**What changed:** Added `@layer base` block with `html` smooth scroll, `body` renovo-white background + charcoal text + Inter font, and heading defaults.

### 5. New Component: `impact/AnimatedCounter.tsx`
**Why:** Core interactive feature — scroll-triggered counting animation for impact stats.

**What changed:** Copied as-is from `reno/`. Pure React component using `IntersectionObserver` and `requestAnimationFrame` with ease-out cubic easing. No changes needed — works identically in the SPA context since it manages its own scroll detection.

### 6. New Component: `impact/ImpactStats.tsx`
**Why:** Grid of three animated counters (1.5M lbs/month, est. 2017, 100+ partners).

**What changed:** Copied as-is. Renders a responsive 3-column grid of AnimatedCounter components with default stats data.

### 7. New Component: `impact/ImpactSection.tsx`
**Why:** Section wrapper with heading and description text.

**What changed:** Converted from Astro (`.astro`) to React (`.tsx`). The original used `client:visible` to lazy-hydrate ImpactStats — this directive was dropped because in the SPA architecture everything is already client-side React. The IntersectionObserver in AnimatedCounter handles the scroll trigger natively.

### 8. New Component: `partners/PartnerCard.tsx`
**Why:** Card displaying a partner's logo (or letter avatar fallback), name, and description.

**What changed:** Copied as-is.

### 9. New Component: `partners/PartnerGrid.tsx`
**Why:** Responsive grid that maps partner data to PartnerCard components.

**What changed:** Copied as-is. Exports the `Partner` interface for use by the section wrapper.

### 10. New Component: `partners/PartnersSection.tsx`
**Why:** Section wrapper with heading, description, and placeholder partner data.

**What changed:** Converted from Astro to React. Placeholder data (Manatee Metals, Gulf Coast Recycling, Bradenton Building Supply) kept inline with a TODO for Wix CMS integration.

### 11. New Component: `layout/Header.tsx`
**Why:** Sticky site header with logo and navigation.

**What changed:** Converted from Astro to React. Same markup — sticky positioning, backdrop blur, renovo-green-dark logo text. Imports the Navigation component.

### 12. New Component: `layout/Footer.tsx`
**Why:** Site footer with company name and copyright.

**What changed:** Converted from Astro to React. Dynamic year calculation moved from Astro frontmatter to a `const` inside the React component body.

### 13. New Component: `layout/Navigation.tsx`
**Why:** Horizontal nav links (Our Impact, Partners, Services, Contact).

**What changed:** Converted from Astro to React. Link data moved from Astro frontmatter to a module-level const. Added `key` prop for React list rendering.

### 14. Updated: `pages/HomePage.tsx`
**Why:** Replace the CLI's placeholder page with our actual homepage content.

**What changed:** Replaced the framer-motion "HELLO: IT'S YOU." with:
- Hero section: gradient background (green-dark → green), headline, subtitle, two CTA buttons
- ImpactSection component
- PartnersSection component

Removed the `framer-motion` import (not needed for the hero — can be added back later for entrance animations).

### 15. Updated: `Router.tsx`
**Why:** The layout wrapper needed Header and Footer around all page content.

**What changed:**
- Added Header and Footer imports
- Layout component now renders: `ScrollToTop → Header → <main><Outlet /></main> → Footer`
- Removed the ErrorPage import (the `integrations/` directory was empty — Wix generates error handlers at deploy time)

---

## What Was NOT Changed

- **`[...slug].astro`** — Untouched. This is the Wix infrastructure page handling SSR, SEO tags, and React mounting.
- **`astro.config.mjs`** — Untouched. All Wix integrations, Babel plugins, and build config preserved.
- **`src/components/ui/`** — All 56 shadcn/Radix components left intact. Available for future use.
- **`src/lib/utils.ts`** — The `cn()` utility kept as-is.
- **`src/lib/scroll-to-top.tsx`** — Kept as-is. Works with react-router to handle hash-based anchor scrolling.
- **`src/hooks/`** — `use-toast.tsx` and `use-size.ts` left intact.
- **`package.json`** — No new dependencies added. All our components use React, Tailwind classes, and browser APIs already available in the CLI project.
- **`wix.config.json`** — Site/app IDs untouched.

---

## Build Result

```
npm run build  →  wix build  →  SUCCESS (5.53s)
```

- Server build: 3.61s (396 modules)
- Client build: 1.37s
- No errors, only standard Wix/Cloudflare warnings about node built-in externalization

---

## Wix Backend Explained

`wix dev` starts Astro plus a tunnel to the live Wix site backend. This provides:
- **CMS data access** — `@wix/data` queries hit the real Wix database
- **Auth** — OAuth tokens, visitor sessions, member login
- **SEO** — tags configured in the Wix dashboard are fetched server-side
- **eCommerce/Members** — any Wix business app APIs
- **Monitoring** — error/performance reporting to the Wix dashboard
- **Env vars** — auto-injected from `.env.local`

`npx astro dev` (without Wix) is useful for offline frontend work or when you don't need live data. Right now with placeholder data, either command works.

---

## File Structure After Port

```
renovo-site/src/
├── pages/
│   └── [...slug].astro          # Wix SSR shell (unchanged)
├── components/
│   ├── Router.tsx                # SPA router with Header/Footer layout
│   ├── Head.tsx                  # Meta tags + Inter font preconnects
│   ├── pages/
│   │   └── HomePage.tsx          # Hero + Impact + Partners
│   ├── layout/
│   │   ├── Header.tsx            # Sticky header with nav
│   │   ├── Footer.tsx            # Footer with dynamic year
│   │   └── Navigation.tsx        # Nav links
│   ├── impact/
│   │   ├── AnimatedCounter.tsx   # Scroll-triggered counter
│   │   ├── ImpactStats.tsx       # 3-column stats grid
│   │   └── ImpactSection.tsx     # Section wrapper
│   ├── partners/
│   │   ├── PartnerCard.tsx       # Partner card with avatar
│   │   ├── PartnerGrid.tsx       # Responsive grid
│   │   └── PartnersSection.tsx   # Section with placeholder data
│   └── ui/                       # 56 shadcn/Radix components (unchanged)
├── styles/
│   ├── global.css                # Tailwind + Renovo base styles
│   └── fonts.css                 # Inter from Google Fonts
├── lib/
│   ├── utils.ts                  # cn() utility (unchanged)
│   └── scroll-to-top.tsx         # Route scroll management (unchanged)
├── hooks/                        # use-toast, use-size (unchanged)
└── tailwind.config.mjs           # Renovo brand tokens + Inter font
```

---

## Next Steps

1. **Preview locally** — `cd renovo-site && npm run dev` to see the full homepage
2. **Wire up Wix CMS** — Create Partners and ImpactStats collections in the Wix dashboard, replace placeholder data with `@wix/data` queries
3. **Add remaining pages** — About, Services, Contact as React components in `src/components/pages/`, with routes added to `Router.tsx`
4. **Mobile nav** — Current Navigation is desktop-only (`hidden md:flex`), needs a hamburger menu for mobile
5. **Deploy** — `wix publish` to push to `https://renovo-site-app6912.wix-host.com`
