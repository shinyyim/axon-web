# DUNE.X Website Strategy — SpaceX Reference Build

## SpaceX Design DNA → DUNE.X Mapping

### What SpaceX Does

````carousel
![SpaceX Hero — Full-screen Mars image, bold headline, hollow button](/Users/shinyim/.gemini/antigravity/brain/01a63825-01d8-4e15-944b-4f1f565af83d/spacex_hero_section_1771527684402.png)
<!-- slide -->
![SpaceX Nav — Full-screen overlay, hamburger menu, upcoming launches](/Users/shinyim/.gemini/antigravity/brain/01a63825-01d8-4e15-944b-4f1f565af83d/spacex_nav_menu_1771527691752.png)
<!-- slide -->
![Falcon 9 Hero — Full-bleed photography, centered title + subtitle](/Users/shinyim/.gemini/antigravity/brain/01a63825-01d8-4e15-944b-4f1f565af83d/falcon9_hero_1771527741094.png)
<!-- slide -->
![Falcon 9 Specs — Large stat counters with thin dividers](/Users/shinyim/.gemini/antigravity/brain/01a63825-01d8-4e15-944b-4f1f565af83d/falcon9_specs_1_1771527743664.png)
<!-- slide -->
![Starship Page — Vehicle detail with full-screen imagery](/Users/shinyim/.gemini/antigravity/brain/01a63825-01d8-4e15-944b-4f1f565af83d/starship_hero_1771527789855.png)
<!-- slide -->
![Mars Page — Planetary approach, immersive background](/Users/shinyim/.gemini/antigravity/brain/01a63825-01d8-4e15-944b-4f1f565af83d/spacex_mars_hero_1771527839426.png)
<!-- slide -->
![Dragon — Vehicle hero with specs layout](/Users/shinyim/.gemini/antigravity/brain/01a63825-01d8-4e15-944b-4f1f565af83d/dragon_hero_1771527896752.png)
````

---

## Pattern Analysis

| SpaceX Pattern | How It Works | DUNE.X Adaptation |
|---|---|---|
| **Full-screen hero** | 100vh viewport image/video with text overlay, no spacing | Full-viewport images from `image_new/` with brand statement |
| **Transparent nav** | Logo left, hamburger right, overlays on dark bg | DUNE.X wordmark left, hamburger right, fixed on scroll |
| **D-DIN font** | Geometric sans, bold, ALL CAPS for headlines | Monument Extended × D-DIN hybrid — wide-tracked, caps |
| **Hollow buttons** | Thin white border, no fill, arrow icon → fills on hover | Same pattern, 1px Bone border on Void |
| **Stat counters** | Giant italic numbers + small caps labels | Product specs: "4 LAYERS", "3.2mm MEMBRANE", etc. |
| **Section transitions** | Full-bleed image sections stacked vertically, no gaps | Same — each scroll section = new world/product |
| **Spec grids** | Thin horizontal dividers, left label / right value | Product tech specs in identical layout |
| **Minimal footer** | Social links + legal, 1-line, subdued | Same minimalism |
| **Video backgrounds** | Looping cinematic footage, no controls visible | Video loops for hero + product sections |
| **Single-page depth** | Each "vehicle" page scrolls through hero → stats → details | Each product page: hero → specs → detail → CTA |

---

## Site Architecture

```
DUNE.X Website
├── / (Landing)                 → Like SpaceX homepage
│   ├── Hero: Video bg + "FUTURE YOUR PERFORMANCE."
│   ├── Scroll Section: Brand manifesto
│   ├── Scroll Section: Product highlights (3 cards)
│   ├── Scroll Section: Stat counters
│   └── Footer
│
├── /collection                 → Like SpaceX "Vehicles" 
│   ├── Transit Shell (outerwear)    → Like /vehicles/falcon9
│   ├── Terrain Boot (footwear)      → Like /vehicles/starship
│   └── Mission Kit (accessories)    → Like /vehicles/dragon
│
├── /concept                    → Like SpaceX "Human Spaceflight"
│   ├── Brand story / manifesto
│   ├── Biodata intelligence — how AI shapes the garment
│   └── Departure ready — engineered for Moon + Mars
│
├── /flagship                   → Like SpaceX "Mars" page
│   ├── Store concept visuals
│   └── Location / experience preview
│
└── /about                      → Like SpaceX "Company"
    ├── Mission statement
    └── Contact
```

---

## Page-by-Page Breakdown

### 1. Landing Page (`/`)

| Section | SpaceX Reference | DUNE.X Content |
|---|---|---|
| **Hero** | Mars rotating + "MAKING LIFE MULTIPLANETARY" | Full-viewport image (`image_new/1.jpg`) + "FUTURE YOUR PERFORMANCE." centered |
| **Section 2** | Falcon 9 hero card | Transit Shell jacket — full-bleed product shot + "TRANSIT SHELL 01" + hollow "EXPLORE →" button |
| **Section 3** | Dragon hero card | Terrain Boot — full-bleed 3D shoe + "TERRAIN BOOT 01" + hollow button |
| **Section 4** | Stat counters (599 missions) | Brand stats: "AI-DRIVEN" / "BIODATA ENGINEERED" / "DEPARTURE READY" — giant italic numbers |
| **Section 5** | Starship card | Mission Kit accessories — full-bleed product shot |
| **Footer** | Social + legal, minimal | Instagram · X · Contact · © DUNE.X 2026 |

### 2. Product Pages (`/collection/transit-shell`)

| Section | SpaceX Reference | DUNE.X Content |
|---|---|---|
| **Hero** | Falcon 9 full-bleed launch photo + centered title | Full-viewport product shot + "TRANSIT SHELL 01" centered |
| **Specs** | Stats row: 599 / 553 / 519 | Specs row: "4 LAYERS" / "SEALED SEAMS" / "HELMET CLEARANCE" |
| **Detail** | Scrolling sections with bg images | Material macro textures, seam detail, full silhouette |
| **CTA** | "EXPLORE →" hollow button | "PRE-ORDER →" hollow button |

### 3. Concept Page (`/concept`)

| Section | SpaceX Reference | DUNE.X Content |
|---|---|---|
| **Hero** | Mars page — planetary approach bg | Dark void + "WE DRESS THE DEPARTURE" manifesto |
| **Story** | Human Spaceflight timeline | Brand origin → biodata intelligence → departure ready → computational craft |

---

## Technical Implementation

### Stack
- **Vanilla HTML/CSS/JS** — Single-page application feel, no framework needed
- **Scroll-triggered animations** — IntersectionObserver API for fade-in reveals
- **CSS custom properties** — Uses existing `color_system.css` design tokens
- **Video backgrounds** — HTML5 `<video>` with autoplay, muted, loop

### Key CSS Patterns from SpaceX

```css
/* Full-viewport sections */
.section { height: 100vh; position: relative; overflow: hidden; }

/* Text overlay on dark images */
.section-content { position: absolute; bottom: 15%; left: 8%; z-index: 2; }

/* Hollow button (SpaceX signature) */
.btn { border: 1px solid rgba(255,255,255,0.6); background: transparent;
       color: white; padding: 12px 28px; text-transform: uppercase;
       letter-spacing: 2px; font-size: 13px; cursor: pointer; }
.btn:hover { background: white; color: black; }

/* Giant stat numbers */
.stat-number { font-size: clamp(4rem, 10vw, 8rem); font-style: italic;
               font-weight: 300; letter-spacing: -2px; }

/* Transparent fixed nav */
.nav { position: fixed; top: 0; width: 100%; background: transparent;
       z-index: 100; padding: 20px 40px; }
```

### Scroll Animation Strategy
```
Section enters viewport → 
  opacity: 0 → 1 (800ms ease)
  transform: translateY(30px) → 0
  
Parallax on background images:
  transform: translateY(calc(scrollY * -0.15))
```

---

## Assets — Image Mapping

All images are in `web/image_new/`:

| Asset | File | Content |
|---|---|---|
| Hero background | `1.jpg` | Dark runway, solitary figure |
| Flagship store | `2.jpg` | Circular arena, star ceiling |
| Campaign hero | `4.jpg` | Figure at light portal |
| Concept page | `5.jpg` | Astronaut in deep space |
| Mission Kit product | `8.jpg` | Neon coat on lunar surface |
| Transit Shell product | `9.jpg` | Transparent membrane jacket |
| Terrain Boot product | `10.jpg` | Dark techwear figure |

Unused but available: `3.jpg`, `6.jpg`, `7.jpg`, `11.jpg`
