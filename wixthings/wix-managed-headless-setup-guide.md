# Wix Managed Headless — Setup Guide & Lessons Learned

A reference for future projects based on the Renovo Resource Solutions build (Feb 2025).

---

## The Goal

Build a custom-coded website (Astro + React + Tailwind) with Wix handling the backend (CMS, auth, hosting, CDN). This is the **Wix Managed Headless** path — Wix hosts everything, you write code.

## What We Tried (and What Actually Works)

### Attempt 1: Manual Scaffold (Wrong Approach)

We manually set up an Astro project and tried to wire in Wix ourselves:

```bash
npm create astro@latest
npm install @astrojs/react @astrojs/tailwind react react-dom tailwindcss@3
npm install @wix/sdk @wix/data @wix/stores
```

Then we wrote a manual Wix client factory (`src/lib/wix-client.ts`):

```ts
import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

export function getWixClient() {
  return createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId: import.meta.env.WIX_CLIENT_ID }),
  });
}
```

**Why this was wrong:** This is the **self-managed headless** pattern. You get no automatic auth, no managed hosting, no `wix publish`, no monitoring, no Cloudflare CDN. You're responsible for everything.

### Attempt 2: Retrofit with `@wix/astro` (Partially Right)

We tried adding the Wix integration to the existing project:

```bash
npm install @wix/astro @wix/essentials @wix/dashboard
```

Updated `astro.config.mjs`:

```js
import wix from "@wix/astro";
export default defineConfig({
  integrations: [wix(), react(), tailwind({ applyBaseStyles: false })],
});
```

**Problem:** `@wix/astro` requires React 18 (not 19), so we had to downgrade:

```bash
npm install react@18 react-dom@18 @types/react@18 @types/react-dom@18
```

Build then failed with `Missing environment variable WIX_CLIENT_ID` — correct behavior, but the project wasn't linked to any Wix site yet. And even after linking, the CLI-generated scaffold has much more infrastructure (SSR, Cloudflare adapter, monitoring, Babel plugins, PostCSS, Vite plugins) that a simple `wix()` call doesn't provide.

### Attempt 3: CLI Wizard (Correct Approach)

The right way to start a Wix Managed Headless project:

```bash
npm create @wix/headless-site@latest
```

The wizard prompts for:
1. **Business name** — becomes the Wix project name in your dashboard
2. **Template** — Blank, Commerce, Scheduler, or Registration
3. **Frontend project name** — the OAuth client name
4. **Directory** — use a lowercase, URL-friendly slug (e.g., `renovo-site`)
5. **Wix Vibe?** — Skip unless you want AI drag-and-drop + GitHub sync
6. **Publish now?** — No (publish after UI is ready)

The CLI generates a complete project with:
- `wix.config.json` linking to the Wix backend (appId + siteId)
- `.env.local` with all credentials (client ID, secret, public key)
- `astro.config.mjs` with SSR, Cloudflare adapter, monitoring, Babel plugins
- Full Radix UI component library
- `wix dev` / `wix build` / `wix publish` commands
- Proper PostCSS, Vite, and ESLint config
- React 18 + Tailwind 3 pre-configured

## The Correct Flow for New Projects

### Step 1: Run the CLI wizard

```bash
npm create @wix/headless-site@latest
```

Choose `Blank` template. Let it scaffold into a clean directory.

### Step 2: Enter the project

```bash
cd your-project-name
```

### Step 3: Start local dev

```bash
npm run dev
```

This runs `wix dev` under the hood — gives you hot reload with live Wix backend connection.

### Step 4: Build your UI

The scaffold gives you:
- `src/components/pages/HomePage.tsx` — your main page (React)
- `src/components/ui/` — full shadcn/Radix component library
- `src/tailwind.config.mjs` — customize colors, fonts, spacing here
- `src/styles/global.css` — Tailwind directives + custom base styles

The project uses a **React SPA Router** pattern:
- `src/pages/[...slug].astro` — catch-all route
- `src/components/Router.tsx` — React Router handles page navigation
- Add new pages as React components in `src/components/pages/`

### Step 5: Call Wix APIs

No manual client setup needed. Import SDK modules directly:

```ts
import { items } from "@wix/data";
const result = await items.queryDataItems({ dataCollectionId: "MyCollection" }).find();
```

Install additional Wix modules as needed:

```bash
npm install @wix/members @wix/bookings @wix/ecom
```

### Step 6: Deploy

```bash
npm run build    # wix build
npm run release  # wix release — pushes to production
```

Site is served from Wix's Cloudflare CDN with SSL.

## Key Gotchas

| Gotcha | Detail |
|--------|--------|
| **Don't manually scaffold** | Always use `npm create @wix/headless-site@latest`. The CLI sets up infrastructure you can't easily replicate. |
| **React 18 only** | `@wix/astro` peers on React 18. Don't install React 19. |
| **Tailwind 3 only** | The Astro Tailwind integration requires v3, not v4. |
| **Directory name must be lowercase** | The CLI rejects uppercase letters and spaces in the directory name. |
| **SSR, not SSG** | The CLI project uses `output: "server"`. Don't change this to `static`. |
| **React Router, not file-based** | Pages are React components routed via `[...slug].astro` + React Router, not individual `.astro` files. |
| **`.env.local` is auto-generated** | Don't create `.env` or `.env.example` manually. The CLI manages credentials. |
| **`wix dev`, not `astro dev`** | The npm scripts wrap Wix CLI commands. Use those, not bare Astro commands. |
| **Self-managed vs Managed** | `createClient()` + `OAuthStrategy()` = self-managed. Direct SDK imports = managed. Don't mix them. |

## Project Structure (CLI-Generated)

```
your-project/
├── .env.local                 # Auto-generated Wix credentials
├── .wix/                      # Wix internal config
├── wix.config.json            # Links project to Wix site
├── astro.config.mjs           # SSR + Cloudflare + monitoring + plugins
├── package.json               # wix dev/build/release scripts
├── postcss.config.mjs         # Tailwind + autoprefixer
├── tsconfig.json              # React JSX + path aliases
├── integrations/              # Wix codegen framework
├── src/
│   ├── pages/
│   │   └── [...slug].astro    # Catch-all → React Router
│   ├── components/
│   │   ├── Router.tsx         # Client-side routing
│   │   ├── Head.tsx           # SEO/meta tags
│   │   ├── pages/
│   │   │   └── HomePage.tsx   # Your main page
│   │   └── ui/                # Radix UI components (button, card, dialog, etc.)
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities
│   ├── styles/
│   │   ├── global.css         # Tailwind directives
│   │   └── fonts.css          # Wix-hosted font faces
│   ├── tailwind.config.mjs    # Brand colors, fonts, spacing
│   └── env.d.ts               # TypeScript env types
└── public/                    # Static assets
```

## Timeline of What We Did

1. Manually scaffolded Astro + React + Tailwind project
2. Wrote manual Wix SDK client with `OAuthStrategy`
3. Built UI components (hero, impact stats, partner grid, header/footer)
4. Compared against official Wix template — found we were using self-managed patterns
5. Attempted retrofit: added `@wix/astro`, downgraded React 19 → 18, removed manual client
6. Build demanded `WIX_CLIENT_ID` — proved integration was active but project wasn't linked
7. Ran `npm create @wix/headless-site@latest` — created properly linked project
8. Discovered CLI scaffold has much more infrastructure than a simple retrofit provides
9. Decision: use CLI project as base, port custom UI into it

**Lesson: always start with the CLI wizard.** Build your UI inside the generated project from day one. Don't scaffold manually and try to add Wix later.
