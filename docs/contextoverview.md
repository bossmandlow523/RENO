# Renovo Resource Solutions — Project Source of Truth

> **Purpose of this document:** Single reference for all decisions, constraints, and architecture
> choices for the Renovo Resource Solutions website redesign. Updated as decisions are made.
> Last updated: 2026-02-07

---

## 1. Business Profile

| Field         | Value                                              |
| ------------- | -------------------------------------------------- |
| Entity        | Renovo Resource Solutions                          |
| Industry      | Recycling & Waste Management                       |
| Location      | Manatee County, FL                                 |
| Established   | 2017                                               |
| Scale         | **1.5 million pounds** of material processed/month |
| Differentiator| Deep local business partnerships + community focus |

### Brand Tone
- Industrial capability mixed with community stewardship
- Professional, scalable, impact-driven
- NOT corporate/sterile — grounded, local, real

### Growth Narrative (drives UI content)
Evolved from a small operation processing a few thousand pounds monthly into a major
regional recycling hub. Success built on partnerships with local Manatee County businesses
and an unwavering commitment to the community.

---

## 2. Technical Architecture

### 2.1 Hard Constraints
| Constraint              | Rule                                                            |
| ----------------------- | --------------------------------------------------------------- |
| No drag-and-drop        | Do NOT use the Wix Studio visual editor for layout              |
| Code-first              | All UI built programmatically                                   |
| Hosting target          | Wix infrastructure (NOT Vercel / Netlify / Cloudflare)          |
| Deployment command      | `wix publish` via Wix CLI                                       |
| Scope                   | Frontend design only — no custom backend logic at this stage    |

### 2.2 Toolchain
| Tool                    | Purpose                                                         | Status       |
| ----------------------- | --------------------------------------------------------------- | ------------ |
| Claude Code (CLI)       | Agentic coding interface                                        | Active       |
| Wix MCP Server          | SDK docs search, site management (`SearchWixSDKDocumentation`)  | Configured   |
| Wix CLI (`@wix/cli`)    | Scaffold, dev, build, publish to Wix                            | v1.1.159     |
| Wix JavaScript SDK      | `@wix/sdk`, `@wix/data`, `@wix/stores` — headless data access  | Installed    |
| Filesystem MCP          | Built into Claude Code (Read/Write/Edit tools)                  | Active       |

**Wix MCP tools available after auth:**
- `SearchWixSDKDocumentation` — SDK method signatures and usage
- `SearchWixHeadlessDocumentation` — Headless-specific guides
- `SearchWixWDSDocumentation` — Wix Design System docs
- `ManageWixSite` — Site management from CLI
- `ReadFullDocsArticle` — Full doc page content on demand

### 2.3 Chosen Stack
| Layer          | Technology                        | Notes                                                |
| -------------- | --------------------------------- | ---------------------------------------------------- |
| Framework      | Astro 5.x                         | Static-site generation, island architecture          |
| UI Library     | React 19                          | Used for interactive islands (counters, grids)       |
| Language       | TypeScript (strict)                | Project-wide, enforced via tsconfig                  |
| Styling        | Tailwind CSS 3.x                  | Utility-first, defined in code, not editor panels    |
| Wix SDK        | `@wix/sdk`, `@wix/data`           | Headless API access to CMS collections               |
| Wix (optional) | `@wix/stores`                     | Reserved for future product/processing logic         |

### 2.4 Development Workflow
| Command            | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `wix dev`          | Local dev server (Astro + synced Wix backend)        |
| `npm run dev`      | Local dev server (Astro only, no Wix backend sync)   |
| `npm run build`    | Production static build (local verification)         |
| `npm run preview`  | Preview production build locally                     |
| `wix publish`      | Compile + deploy to Wix Managed Headless servers     |

### 2.5 Project Structure (current)
```
reno/
├── astro.config.mjs              # Astro + React + Tailwind config
├── tsconfig.json                 # Strict TS, path aliases (@components/*, @lib/*, etc.)
├── tailwind.config.mjs           # Renovo brand tokens (colors, fonts)
├── package.json                  # Scripts: dev, build, preview
├── .env.example                  # PUBLIC_WIX_CLIENT_ID
├── public/
│   └── favicon.svg
└── src/
    ├── env.d.ts                  # Astro + env var types
    ├── styles/global.css         # Tailwind directives + base layer
    ├── lib/wix-client.ts         # Wix SDK client factory + collection IDs
    ├── layouts/BaseLayout.astro  # HTML shell, fonts, Header/Footer
    ├── pages/index.astro         # Homepage: Hero → Impact → Partners
    └── components/
        ├── layout/               # Header, Navigation, Footer (Astro)
        ├── impact/               # AnimatedCounter, ImpactStats (React), ImpactSection (Astro)
        ├── partners/             # PartnerCard, PartnerGrid (React), PartnersSection (Astro)
        └── ui/                   # Button (React) — shared primitives
```

---

## 3. Design & Feature Requirements

### 3.1 Pages (planned)
| Page       | Route     | Status     | Notes                              |
| ---------- | --------- | ---------- | ---------------------------------- |
| Home       | `/`       | Scaffolded | Hero, Impact, Partners sections    |
| About      | `/about`  | Planned    | Full growth story, team            |
| Services   | `/services` | Planned  | Recycling services breakdown       |
| Contact    | `/contact`| Planned    | Form, location, hours              |

### 3.2 Key Features
- **Animated impact counters** — scroll-triggered, eased count-up to 1.5M lbs/month
  (React component, hydrated via `client:visible`)
- **Partner showcase grid** — dynamic cards pulled from Wix CMS `Partners` collection
- **Performance-first** — static HTML wherever possible, React only for interactive islands
- **Responsive** — mobile-first Tailwind layout, all breakpoints

### 3.3 Brand Design Tokens
```
Colors:
  renovo-green:       #2D6A4F   (primary)
  renovo-green-light: #40916C   (accent)
  renovo-green-dark:  #1B4332   (headings, hero bg)
  renovo-earth:       #B7B7A4   (muted text on dark)
  renovo-sand:        #D4C7B0   (section backgrounds)
  renovo-charcoal:    #2B2D42   (body text, footer bg)
  renovo-slate:       #8D99AE   (secondary text)
  renovo-white:       #F8F9FA   (page background)

Font: Inter (400, 500, 600, 700, 800) via Google Fonts
```

---

## 4. Wix Integration Details

### 4.1 Approach: Wix Managed Headless (NOT Self-Hosted Headless)
There are three Wix architecture paths. We are using **Managed Headless**:

| Architecture              | Frontend Host    | Deploy Tool | Visual Editor? | Our Choice? |
| ------------------------- | ---------------- | ----------- | -------------- | ----------- |
| Wix Studio (Standard)     | Wix              | Editor/CLI  | Yes            | NO          |
| Wix Headless (Self-Hosted)| Vercel/Netlify   | Vercel CLI  | No             | NO          |
| **Wix Managed Headless**  | **Wix**          | **Wix CLI** | **No**         | **YES**     |

**What this means:**
- Wix hosts both the frontend AND the backend (CMS, Stores, etc.)
- Wix handles CDN, SSL, and scaling for our Astro application
- `wix publish` compiles and uploads Astro/React artifacts to Wix's cloud
- No Vercel/Netlify/Cloudflare needed at all

**Critical workflow note:** The project should be initialized via the Wix CLI
(`wix dev`) using the Managed Headless Astro template to ensure the correct
project structure for `wix publish`. Standard `npm create astro` projects may
need adaptation to match the expected Wix Managed Headless structure.

### 4.2 Wix CMS Collections (planned)
| Collection    | Fields (draft)                                | Purpose                  |
| ------------- | --------------------------------------------- | ------------------------ |
| Partners      | name, description, logoUrl, website, featured | Partner showcase grid    |
| ImpactStats   | label, value, suffix, prefix, sortOrder       | Animated counter data    |

### 4.3 Authentication — RESOLVED
**Strategy:** `OAuthStrategy` with `clientId`

**Why OAuthStrategy (not ApiKeyStrategy):**
- Designed for client-facing Headless sites
- Works in both SSG (build-time) and client-side hydration (browser)
- Generates anonymous visitor tokens for public data access
- Safe to include in client bundles (no admin secrets exposed)
- `ApiKeyStrategy` is only needed for draft/restricted content at build time

**Credentials needed:**
| Credential | Env Var            | Where to find it                                           |
| ---------- | ------------------ | ---------------------------------------------------------- |
| Client ID  | `WIX_CLIENT_ID`   | Wix Dashboard → Settings → Headless Settings → OAuth Apps |

**`ApiKeyStrategy` (admin, build-only) — reserved for future use if needed:**
| Credential | Env Var        | Where to find it                                        |
| ---------- | -------------- | ------------------------------------------------------- |
| API Key    | `WIX_API_KEY`  | Wix Dashboard → Settings → API Keys → Generate          |
| Site ID    | `WIX_SITE_ID`  | Wix Dashboard URL: `wix.com/dashboard/{SITE_ID}/home`   |

### 4.4 Data Fetching Pattern — RESOLVED
**Package:** `@wix/data` (NOT legacy `wix-data`)
**Import:** `import { items } from "@wix/data"`
**Runtime:** Isomorphic — works in Node.js (build time) AND browser

**Standard query (chaining syntax — recommended):**
```ts
const result = await wixClient.items.query("Partners")
  .limit(10)
  .find();

return result.items; // Array of partner objects
```

**Structured query syntax (2026 update — for dynamic/complex filters):**
```ts
const result = await wixClient.items.query("Partners", {
  filter: { status: "ACTIVE" },
  sorting: [{ fieldName: "_createdDate", order: "DESC" }],
  paging: { limit: 10 }
}).find();
```

**Note:** `items.queryDataItems()` exists as a lower-level wrapper but
`items.query("CollectionName")` is the recommended higher-level API.

---

## 5. Resolved Questions

### Q1: RESOLVED — Can an Astro static build be hosted on Wix?
**Answer:** Yes. Use **Wix Managed Headless** (not Self-Hosted Headless).
- `wix publish` compiles Astro/React code and uploads to Wix cloud
- Wix handles CDN, SSL, and scaling
- Frontend lives on Wix servers, not a third-party host
- Must initialize via Wix CLI with the Managed Headless Astro template
- Local dev via `wix dev` (syncs with Wix backend)

### Q2: RESOLVED — Correct SDK auth strategy for Astro SSG
**Answer:** Use `OAuthStrategy` with a `clientId`.
- Works for both build-time (SSG) and client-side hydration
- Generates anonymous visitor tokens for public CMS data
- `clientId` obtained from: Dashboard → Settings → Headless Settings → OAuth Apps
- `ApiKeyStrategy` (apiKey + siteId) only needed for admin/draft content access

### Q3: RESOLVED — How to query Wix CMS from external environments
**Answer:** `@wix/data` with `items.query()` chaining syntax.
- Import: `import { items } from "@wix/data"`
- Query: `wixClient.items.query("Partners").find()`
- Isomorphic: works in Node.js (build) and browser (hydration)
- Also supports structured query syntax (2026) for complex filters
- Do NOT use legacy `wix-data` package (Velo-only)

---

## 6. Decision Log

| Date       | Decision                                    | Rationale                               |
| ---------- | ------------------------------------------- | --------------------------------------- |
| 2026-02-07 | Astro 5 + React 19 + Tailwind 3             | Island architecture, perf-first         |
| 2026-02-07 | TypeScript strict mode                       | Type safety across Wix SDK + components |
| 2026-02-07 | Tailwind v3 (not v4)                         | @astrojs/tailwind requires v3           |
| 2026-02-07 | Static output mode (initial)                 | SSG for speed, revisit if CMS needs SSR |
| 2026-02-07 | Wix Managed Headless (not Self-Hosted)       | Hosts frontend on Wix, deploy via CLI   |
| 2026-02-07 | OAuthStrategy for SDK auth                   | Safe for SSG + client, no admin secrets |
| 2026-02-07 | `items.query()` chaining for CMS access      | Modern API, isomorphic, recommended     |
