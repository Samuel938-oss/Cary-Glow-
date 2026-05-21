# Spa Website — Build System

## What this is
A static, no-build-step multi-page website for a luxury med spa. Built with plain HTML + Tailwind CSS Play CDN + vanilla JS. No frameworks, no bundler, no dependencies to install. Open any `.html` file directly in a browser.

---

## File structure

```
/
├── index.html          # Home page (hero, stats, services teaser, doctor teaser, testimonials, CTA)
├── services.html       # Full services & pricing list
├── about.html          # Doctor bio, credentials, values
├── faq.html            # FAQ in 2-column card grid
├── contact.html        # Booking form + contact info sidebar
├── css/
│   └── animations.css  # All shared CSS: ticker, scroll animations, luxury card system, rotating border
├── js/
│   └── animations.js   # IntersectionObserver for .animate-on-scroll and .fade-up
└── [hero image].jpeg   # Doctor/spa photo (referenced in index.html and about.html)
```

---

## Tech stack

| Layer | Tool |
|---|---|
| HTML | Plain semantic HTML5 |
| CSS framework | Tailwind CSS via Play CDN (no build step) |
| Custom CSS | `css/animations.css` — loaded in every page `<head>` |
| Fonts | Google Fonts: Playfair Display (serif/headings) + Inter (sans/body) |
| JS | Vanilla ES5 in `js/animations.js` — IntersectionObserver only |
| Icons | Inline SVG throughout |

---

## Design system — dark luxury theme

### Color palette (Tailwind config — same block in every page `<head>`)
```js
colors: {
  teal:  { DEFAULT: '#C9A96B', light: '#D9BC88', dark: '#A88A4A', 50: '#1C1A13', 100: '#252115' },
  cream: { DEFAULT: '#191714', dark: '#2A2825', darker: '#0D0C0A' },
  ink:   '#EDE9E1',
}
```

| Role | Hex | Usage |
|---|---|---|
| Brand gold | `#C9A96B` | Buttons, links, borders, accents |
| Background | `#0D0C0A` | Page body |
| Surface | `#191714` | Cards, nav |
| Surface deep | `#111008` | Form containers |
| Surface elevated | `#1C1B18` | Nested sub-cards |
| Border | `#2A2825` | Dividers |
| Text primary | `#EDE9E1` | Headings, body |
| Text muted | `#9A9690` | Subtext, captions |

### Typography
- **Headings / display**: `Playfair Display` — add `font-serif` class or `font-family: 'Playfair Display'`
- **Body / UI**: `Inter`
- Italic `<em>` inside headings gives the elegant serif slant (used in all hero h1s)

### Buttons
| Class | Style |
|---|---|
| `.btn-primary` | Solid brand color fill, dark text |
| `.btn-outline` | Brand color border + text, fills on hover |
| `.btn-ghost-white` | White border, for dark/image backgrounds |
| `.btn-white` | Solid brand color, uppercase, for CTA sections |

---

## ⚠️ Color system — critical when building for a new client

The brand color `#C9A96B` appears in **every file** in multiple forms. When a new client has a different brand color, ALL of the following must be replaced consistently — not just the hex.

### Complete replacement map (based on #C9A96B)

Before writing any code for a new client, derive the new color's rgb values (e.g. `#8B5CF6` → `139, 92, 246`) and replace every entry below:

| Current value | What it is | Replace with |
|---|---|---|
| `#C9A96B` | Brand color hex | New hex |
| `#D9BC88` | Brand light (+15% lightness) | New hex lightened |
| `#A88A4A` | Brand dark (-15% lightness) | New hex darkened |
| `rgba(201,169,107, X)` | Brand color with opacity | `rgba(R,G,B, X)` from new hex |
| `1C1A13` / `#252115` | Brand tinted dark surface | Derive from new hue |
| `stroke="#C9A96B"` | SVG icon stroke | New hex |
| `fill="#C9A96B"` | SVG icon fill | New hex |
| `content="#C9A96B"` | `<meta name="theme-color">` | New hex |
| `outline: 2px solid #C9A96B` | Focus ring | New hex |

### Files that contain the brand color
Every single `.html` file (inline `<style>` block + Tailwind config) and `css/animations.css`. Do a global search for `#C9A96B` and `201,169,107` across all files — those two strings cover 100% of usages.

### Step-by-step color swap
1. Get the new hex from the intake form (e.g. `#B57EDC`)
2. Calculate its RGB values (e.g. `181, 126, 220`)
3. Calculate a lighter variant (+15% lightness) for hover states
4. Calculate a darker variant (-15% lightness) for pressed states
5. Global replace `#C9A96B` → new hex in all 6 files
6. Global replace `201,169,107` → `R,G,B` of new hex in all 6 files
7. Update the Tailwind config `teal` color object in every page `<head>`
8. Update `#D9BC88` → lighter variant
9. Update `#A88A4A` → darker variant

### Prompt instruction to include (forces Claude to do this correctly)
Add this line to your prompt:
> *"Before writing any HTML, calculate the RGB breakdown of the brand color from the intake form. Then replace #C9A96B, #D9BC88, #A88A4A, and all rgba(201,169,107,X) values throughout every file with the correct new values. Do not use #C9A96B anywhere in the output."*

### Example — rose/pink brand color
If the new spa's color is `#C47B8A` (rose):
- RGB: `196, 123, 138`
- Light: `#D4939F`
- Dark: `#A45E6E`
- Replace `rgba(201,169,107,0.4)` → `rgba(196,123,138,0.4)`
- Replace `rgba(201,169,107,0.14)` → `rgba(196,123,138,0.14)`
- etc.

---

## Shared CSS classes (css/animations.css)

### Cards & containers
| Class | Use |
|---|---|
| `.luxury-card` | General card — dark bg, subtle brand-color border, lift on hover |
| `.glow-border` | Interactive container (forms, major panels) — glows on focus/hover |
| `.luxury-glow-border` | Stack on `.glow-border` — adds rotating conic-gradient border animation |
| `.surface-elevated` | Nested sub-card inside a service row |
| `.section-sep` | Full-width `<hr>` — brand-color gradient line separator between sections |

### Animations
| Class | Behavior |
|---|---|
| `.animate-on-scroll` | Fade up on scroll — driven by IntersectionObserver (threshold 0.05) |
| `.fade-up` | Legacy fade-up — same observer, adds `.visible` class |
| `.delay-1` / `.delay-2` | Stagger delays (0.1s / 0.2s) for `.fade-up` siblings |

### Ticker / marquee
```html
<div class="ticker-wrap" aria-hidden="true">
  <div class="ticker-track">
    <!-- Duplicate all items exactly once for seamless loop -->
    <span class="ticker-item">Brand Name</span><span class="ticker-dot">✦</span>
    ...same items again...
  </div>
</div>
```
Speed: `60s`. Pauses on hover. Color: `rgba(brandR, brandG, brandB, 0.45)`.

### Rotating border (luxury-glow-border)
Works via CSS `@property` + `conic-gradient` on `background-clip: border-box`. Chrome 85+.
```html
<div class="glow-border luxury-glow-border p-8">
  <!-- content -->
</div>
```

---

## Page anatomy

Every page shares:
1. `<head>`: same Tailwind config + Google Fonts + `css/animations.css` + inline `<style>` for dark mode overrides
2. `<nav id="navbar">`: sticky, blur backdrop, mobile hamburger menu
3. Hero `<section>`: brand tag → gold divider → serif h1 with `<em>` → subtext
4. `<hr class="section-sep">` between major sections
5. Footer or CTA section at the bottom
6. `<script src="js/animations.js">` before `</body>`
7. Inline FAQ/form/accordion scripts at bottom of each page that needs them

---

## How to adapt this for a new spa client

### Step 1 — Collect the intake form
The intake form must capture:

| Field | Used in |
|---|---|
| Spa name | All titles, nav, logo, meta tags |
| Tagline / hero headline | index.html hero h1 |
| Hero subtext (1–2 sentences) | index.html hero paragraph |
| Doctor/provider name + credentials | about.html, index.html teaser, contact.html |
| Doctor bio (2–3 paragraphs) | about.html |
| Doctor photo filename | index.html + about.html `<img>` |
| City, state, address | contact.html, footer, FAQ |
| Phone / text number | contact.html sidebar, FAQ |
| Email | contact.html sidebar |
| Business hours | contact.html sidebar |
| Services list (name, description, price) | services.html, index.html cards |
| 3–5 core values | about.html values grid |
| Testimonials (3–5, with name + quote) | index.html testimonials |
| Stats (years experience, clients, etc.) | index.html stats bar |
| **Brand color hex** | Replace `#C9A96B` everywhere (see color section above) |
| Social links | footer |

### Step 2 — Handle colors first (before anything else)
See the **Color system** section above. Do not skip this step.

### Step 3 — Global text replacements
1. `Cary Glow` / `Cary Glow Med Spa` → new spa name
2. `Dr. Sofia Reyes` → new provider name
3. `Cary, NC` / `1200 SE Maynard Rd, Suite 104` → new address
4. `(919) 555-0147` → new phone
5. `hello@caryglow.com` → new email

### Step 4 — Swap content blocks
- **Hero image**: replace the `.jpeg` filename in index.html and about.html
- **Services**: rewrite service rows in `services.html` and 3-card teaser in `index.html`
- **FAQ**: rewrite question/answer text in `faq.html` (keep the 2-column card grid)
- **Testimonials**: replace quotes and names in `index.html`
- **Stats bar**: update numbers in `index.html`
- **Ticker phrases**: update `.ticker-item` text in each page to reflect the new brand
- **Meta descriptions**: rewrite `<meta name="description">` in each page `<head>`

---

## Prompt template for new spa build

```
Read the CLAUDE.md file in this project and follow it exactly.

Build a 5-page luxury med spa website (index.html, services.html, about.html,
faq.html, contact.html) using the same stack: HTML + Tailwind Play CDN +
vanilla JS. No build step.

IMPORTANT — colors:
Before writing any HTML, extract the brand color hex from the intake form below.
Calculate its RGB values, a lighter variant (+15% lightness), and a darker variant
(-15% lightness). Then replace #C9A96B, #D9BC88, #A88A4A, and all
rgba(201,169,107,X) values throughout every file with the correct new values.
Do not use #C9A96B anywhere in the output.

Reuse all CSS classes from css/animations.css without modifying them.
Keep the same nav, dark mode overrides, Tailwind config block, Google Fonts
import, and animations.js script tag on every page.
Do not change the technical structure — only swap content and brand color.

INTAKE FORM:
[paste intake form here]
```

---

## Dark mode overrides (copy into every page's inline `<style>`)
```css
body          { background-color: #0D0C0A !important; }
#navbar       { background: rgba(13,12,10,0.97) !important; border-color: #2A2825 !important; }
.bg-white     { background-color: #191714 !important; }
.bg-cream     { background-color: #141210 !important; }
section.bg-teal { background: linear-gradient(135deg, #1C1A13 0%, #0D0C0A 100%) !important; }
.bg-ink       { background-color: #080806 !important; }
.bg-teal-50   { background-color: #1C1A13 !important; }
.border-cream-dark { border-color: #2A2825 !important; }
.text-gray-400, .text-gray-500 { color: #9A9690 !important; }
.text-gray-600 { color: #A8A49E !important; }
.text-gray-700, .text-gray-800, .text-gray-900 { color: #C5C1B9 !important; }
.text-ink     { color: #EDE9E1 !important; }
```

---

## Known decisions & constraints
- Tailwind Play CDN is intentional — no Node.js / npm required, client opens files directly in browser
- `@property --lgb-angle` (CSS Houdini) powers the rotating border — works Chrome 85+ / Edge 85+, gracefully degrades to a static border in older browsers
- IntersectionObserver threshold is `0.05` — triggers at 5% visibility, prevents invisible content on mobile
- Never add `fade-up` or `animate-on-scroll` to large outer wrapper divs that span full viewport height — they stay invisible if the observer doesn't fire before the user scrolls past
- Ticker requires content duplicated exactly once in HTML for the seamless `translateX(-50%)` loop
- `luxury-glow-border` uses `background-clip: border-box` technique — do NOT add a Tailwind `bg-*` class to the same element or it will override the gradient border
