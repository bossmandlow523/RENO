# Hero Section Redesign — Handoff

## What changed
Replaced the plain centered-text hero with a full-viewport, dark immersive hero featuring a hexagonal image collage layout.

## Why
The original hero was a basic gradient box with centered text and two buttons — generic and flat. The new design matches the "Visit Norway / Fjord" reference wireframe: dark background, floating hexagonal shapes for imagery, left-aligned bold typography, and a hexagonal CTA button.

## Files modified
- `src/pages/index.astro` — Hero markup (hexagon grid, typography, CTA, social bar)
- `src/styles/global.css` — Hexagon clip-path CSS, sizing vars, float animation, responsive breakpoints

## File created
- `.env.local` — Copied from `renovo-site/.env.local` (was missing, needed for dev server)

## Key design decisions
- Hexagons use CSS `clip-path: polygon()` with `--hex-size` custom properties — no SVGs or images needed
- 8 hexagons positioned absolutely to mirror the wireframe collage layout
- CTA is a hexagonal `<a>` link (sand/gold) instead of a rectangle button
- Typography: "Recycling" subtitle → "RENOVO" in 9xl bold → description paragraph
- Subtle float animation on hexagons (6s/8s alternating)
- Fully responsive — hex sizes scale down at 768px

## Still needed
- Drop real photos into the hex backgrounds (recycling facility, materials, team, etc.)
- Swap placeholder social links with real URLs
- Header may need a transparent/dark variant so it doesn't clash with the dark hero
