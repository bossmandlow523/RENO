# Wix Managed Headless Retrofit

## Problem

Our project was manually scaffolded with Astro + React + Tailwind and used **self-managed headless** patterns to connect to Wix, even though the architecture decision was to use **Wix Managed Headless**. The gap meant we were writing boilerplate that the Wix platform handles automatically and missing out on managed hosting, automatic auth, and the `wix publish` deploy pipeline.

### What was wrong

- `src/lib/wix-client.ts` manually created a Wix SDK client using `createClient()` + `OAuthStrategy()` — this is the self-managed pattern.
- `.env.example` required the developer to manually obtain and configure `WIX_CLIENT_ID`.
- `astro.config.mjs` had no `@wix/astro` integration, so the project had no connection to the Wix Managed Headless platform.
- React was pinned to v19, which conflicts with `@wix/astro`'s peer dependency on React 18.

## What we changed

### Packages added

| Package | Purpose |
|---------|---------|
| `@wix/astro` | Core integration — handles OAuth tokens, env vars, auth endpoints, and hosting automatically |
| `@wix/essentials` | Required peer dependency for Wix Managed Headless |
| `@wix/dashboard` | Required peer dependency for Wix Managed Headless |

### React downgrade: 19 to 18

`@wix/astro@2.25.0` requires `react@^18.3.1` as a peer dependency. Our existing island components (AnimatedCounter, ImpactStats, PartnerGrid, PartnerCard, Button) use no React 19-specific features, so this is a safe change.

| Package | Before | After |
|---------|--------|-------|
| `react` | ^19.2.4 | ^18.3.1 |
| `react-dom` | ^19.2.4 | ^18.3.1 |
| `@types/react` | ^19.2.13 | ^18.3.28 |
| `@types/react-dom` | ^19.2.3 | ^18.3.7 |

### Files modified

**`astro.config.mjs`** — Added `wix()` integration, removed explicit `output: "static"` (Wix manages the output mode).

```js
// Before
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  output: "static",
});

// After
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import wix from "@wix/astro";

export default defineConfig({
  integrations: [wix(), react(), tailwind({ applyBaseStyles: false })],
});
```

**`src/components/partners/PartnersSection.astro`** — Updated the commented-out CMS fetch to use direct SDK imports instead of the manual client factory.

```diff
-// import { getWixClient, COLLECTIONS } from "@lib/wix-client";
-// const wix = getWixClient();
-// const result = await wix.items.query(COLLECTIONS.PARTNERS).find();
-// const partners = result.items;
+// import { items } from "@wix/data";
+// const result = await items.queryDataItems({ dataCollectionId: "Partners" }).find();
+// const partners = result.items.map((item) => item.data);
```

**`src/env.d.ts`** — Simplified to just the Astro client reference. Manual `WIX_CLIENT_ID` typing is no longer needed because `@wix/astro` manages auth env vars automatically.

### Files removed

| File | Reason |
|------|--------|
| `src/lib/wix-client.ts` | The manual `createClient()` + `OAuthStrategy()` factory is replaced by `@wix/astro`'s automatic client. SDK methods can now be called directly: `import { items } from "@wix/data"; await items.queryDataItems(...)` |
| `.env.example` | Environment variables are managed by the Wix CLI (`npx wix env pull`), not manually configured |

## What `@wix/astro` gives us

| Capability | Before (manual) | After (@wix/astro) |
|------------|-----------------|---------------------|
| Visitor auth tokens | Manual `OAuthStrategy()` setup | Automatic — managed in background |
| Member login/logout | Not implemented | Built-in `/api/auth/login` and `/api/auth/logout` endpoints |
| SDK calls | Via factory: `getWixClient().items.query(...)` | Direct: `import { items } from "@wix/data"; await items.queryDataItems(...)` |
| Environment variables | Manual `.env` file | Auto-configured via `npx wix env pull` |
| Hosting + deploy | No deploy target | `wix publish` — CDN, SSL, auto-scaling |
| Local dev with backend | `astro dev` (no backend) | `npm run dev` with live Wix backend sync |

## What we kept (unaffected)

All existing UI work was preserved:

- Tailwind brand tokens (`renovo-green`, `renovo-sand`, etc.) in `tailwind.config.mjs`
- React island components: AnimatedCounter, ImpactStats, PartnerGrid, PartnerCard, Button
- Layout system: Header, Footer, Navigation, BaseLayout
- Hero section with CTAs
- TypeScript strict mode and path aliases
- Global CSS with Tailwind directives

## Remaining step

The retrofit is code-complete. To activate the Wix backend connection:

```bash
npm create @wix/headless-site@latest
npx wix env pull
npm run build
```

This links the local project to a Wix Headless backend, pulls the auto-generated `WIX_CLIENT_ID`, and verifies the full build pipeline.
