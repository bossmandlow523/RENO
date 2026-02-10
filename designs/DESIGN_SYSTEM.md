# Renovo Design System

Tokens: `src/tailwind.config.mjs` | Classes: `src/styles/global.css`

---

## Colors

| Token | Hex | Use |
|-------|-----|-----|
| `accent-500` | `#FF7F00` | Primary orange (underline, glow) |
| `accent-200` | `#FFCC80` | Hover icon tint |
| `navy-900` | `#0C2340` | Hexagon dark bg |
| `navy-700` | `#1B3A5C` | Hexagon bg, "We Buy" gradient |
| `navy-500` | `#2571A7` | "We Buy" gradient mid-blue |
| `navy-300` | `#6BB5E8` | "We Buy" gradient light blue |
| `background-dark` | `#111111` | Industrial bg base |
| `white` | `#FFFFFF` | Hero text, borders/10 |
| `slate-400` | Tailwind default | Body text, footer links |
| `slate-600`/`700` | Tailwind default | Footer text, border accents |

### Inline Gradients (hardcoded in hero)
- **"We Buy" text**: `#1B3A5C → #2571A7 → #40916C → #6BB5E8 → #2D6A4F`
- **Underline**: `#FF7F00 → #FF9933 → #FFCC80`
- **Metal shimmer**: `#9CA3AF → #D1D5DB → #FFFFFF → #6B7280` (cycling)

---

## Typography

### Fonts
| Class | Font | Use |
|-------|------|-----|
| `font-display` | Chonburi | Hero headlines, page titles |
| `font-accent` | Syncopate | Labels, badges, tabs, buttons, CTAs |
| `font-body` | Inter | Body copy, descriptions |

### Hierarchy
```
Display     font-display  text-8xl/9xl  font-black  uppercase tracking-tighter
Page Title  font-display  text-5xl-7xl  font-black  uppercase tracking-tighter
Subhead     font-accent   text-xs/sm    font-bold   uppercase tracking-[0.2em]
Body        font-body     text-base/lg  font-normal
Label       font-accent   text-[10px]   font-bold   uppercase tracking-[0.15em]
```

---

## Components

### Buttons
```html
<button class="btn-primary">Send</button>
<button class="btn-secondary">Learn More</button>
<button class="btn-ghost">Cancel</button>
<!-- Sizes: btn-sm, btn-lg -->
```

### Cards
```html
<div class="card"><div class="card-body">...</div></div>
<div class="card-interactive">...</div>  <!-- hover lift -->
<div class="card-elevated">...</div>     <!-- shadow -->
```

### Inputs
```html
<label class="label">Name</label>
<input class="input" placeholder="..." />
<textarea class="textarea" placeholder="..."></textarea>
```

### Tabs
```html
<!-- Underline -->
<div class="tab-bar">
  <button class="tab-active">All</button>
  <button class="tab">Copper</button>
</div>
<!-- Pills -->
<button class="tab-pill-active">All</button>
<button class="tab-pill">Ferrous</button>
```

### Badges
```html
<span class="badge-accent">Open Now</span>
<span class="badge-outline">7AM - 4PM</span>
```

### Page Titles
```html
<h1 class="page-title">Title</h1>
<p class="page-subtitle">Subtitle</p>
```

---

## Surfaces

```html
<section class="industrial-bg min-h-screen relative">
  <div class="relative z-10">Content</div>
</section>
<section class="section-dark section-padding"><div class="section-inner">...</div></section>
<section class="section-card section-padding"><div class="section-inner">...</div></section>
<section class="section-light section-padding"><div class="section-inner">...</div></section>
```

---

## Hexagons

```html
<div class="w-48 h-48 hexagon overflow-hidden"><img class="hexagon-image" src="..." /></div>
<div class="w-48 h-48 hexagon bg-navy-700 flex items-center justify-center text-white">...</div>
```

---

## Icons

Google Material Symbols Outlined via `fonts.css`.
```html
<span class="material-symbols-outlined">recycling</span>
```

---

## Layout

| Property | Value |
|----------|-------|
| Max content | `max-w-7xl` |
| Page padding | `px-8 md:px-16` |
| Section spacing | `py-16 md:py-24` |
| Card grid | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6` |
