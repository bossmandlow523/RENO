# Project Rules

## Rule #1: Do NOT make changes you were not asked to make
- Only modify files and code that the user explicitly instructed you to change
- Do not refactor, rename, "improve", add comments, add error handling, or clean up code unless asked
- Do not add features, imports, or dependencies beyond what was requested
- If you think something should change, ask first — do not just do it

## Rule #2: Read PROJECT_MAP.md before doing anything
- `renovo-site/PROJECT_MAP.md` has the full project structure, every file path, configs, and how everything connects
- Do NOT spend time exploring or re-analyzing the codebase — the map is current
- If you need info about a file, check the map first, then read the specific file

## Rule #3: Work inside `renovo-site/` only
- The root `reno/` directory has dead config files (astro.config, tailwind.config, package.json) — ignore them
- All source code, configs, and commands run from `renovo-site/`
- The `designs/` and `docs/` folders at root are reference docs only

## Tech Stack
- Astro 5 (SSR) + React 18 + Tailwind v3 + TypeScript
- Wix Managed Headless — deploy with `wix publish`, dev with `wix dev`
- shadcn/UI (new-york style) + Framer Motion
- Fonts: Montserrat (headings) + Inter (body)

## Commands
- Dev: `wix dev` (NOT `npm run dev`)
- Build: `wix build`
- Deploy: `wix publish`
- Add shadcn component: `npx shadcn@latest add <name>` (from `renovo-site/`)

## Current Focus
Building out site sections

@AGENTS.md
