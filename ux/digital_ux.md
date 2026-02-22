# DUNE.X — Digital UX

---

## Philosophy

The DUNE.X digital experience follows the same logic as the physical flagship: darkness first, then light, then content. No screen should feel bright. No interaction should feel fast. The website and app exist in the void — they are windows into the same world the customer encounters in-store.

Digital is not a substitute for the flagship. It is the briefing before departure.

---

## Website UX

### Entry Sequence

Every visit to dunex.com begins the same way. The sequence cannot be skipped on first visit. On return visits, it plays at 2x speed (600ms instead of 1200ms transitions).

| Step | Duration | What Happens |
|---|---|---|
| 1 | 0–2000ms | Complete darkness. The screen is #0A0A0C. The cursor disappears. Nothing is interactive. |
| 2 | 2000–3200ms | A thin ring of Portal White light appears at the center of the viewport. It expands outward. 1200ms, mechanical easing. |
| 3 | 3200–4400ms | The hero background image fades in behind the ring (opacity 0 to 1, 1200ms). The ring continues to expand and fades as it reaches the viewport edges. |
| 4 | 4400–5200ms | Text appears: "FUTURE YOUR PERFORMANCE." Fades in from 0 opacity. Monument Extended, white, centered. 800ms. |
| 5 | 5200–6000ms | Navigation fades in. Scroll indicator appears at bottom. The page is now interactive. |

**Technical implementation:**
- CSS keyframe animation sequence, no JavaScript dependency for the animation itself
- IntersectionObserver tracks whether the sequence has been viewed (sessionStorage flag)
- Preloads hero image during the 2-second darkness window
- Respects `prefers-reduced-motion`: if set, skip to step 5 immediately with a simple 400ms fade-in

### Navigation

**Desktop:**
- Fixed transparent nav bar, overlaying content
- Left: DUNE.X wordmark (Monument Extended, 14px, tracked +100, Portal White)
- Right: Hamburger icon (three horizontal lines, 1.5px stroke, Portal White)
- The nav does not change on scroll. No background fill. No shadow. It stays transparent.
- On scroll past the hero section, the wordmark and hamburger reduce opacity to 60%. On hover, they return to 100%. This prevents the nav from competing with content.

**Hamburger menu (full-screen overlay):**
- Background: #0A0A0C at 97% opacity (a faint transparency letting the page beneath show as a ghost)
- Animation: slides down from top, 800ms, mechanical easing
- Menu items appear sequentially, 100ms stagger:

```
COLLECTION
CONCEPT
FLAGSHIP
DEPARTURE SLOT
ABOUT
```

- Each item: Monument Extended, 36px, tracked +80, Portal White
- Hover state: item shifts right by 20px, a thin light line appears to its left (400ms transition)
- Below the menu items, in Söhne Mono 12px at 40% opacity: "FUTURE YOUR PERFORMANCE."

**Mobile:**
- Same structure, adapted to touch
- Wordmark and hamburger in fixed header (height: 56px)
- Menu items: 28px, full-width tap targets (56px height each)
- No hover states — tap triggers the page transition directly

### Page Structure: Landing Page

The landing page is a vertical sequence of full-viewport sections. Each section is 100vh. Scrolling moves through them. No partial visibility — each section fills the screen completely before the next appears.

**Section 1: Hero**

| Element | Spec |
|---|---|
| Background | `image_new/1.jpg` — dark runway, solitary figure. Full-bleed, cover-fit, fixed position (parallax). |
| Text | "FUTURE YOUR PERFORMANCE." — Monument Extended, 48px desktop / 28px mobile, tracked +80, Portal White, centered horizontally, positioned at 65% vertical. |
| Subtitle | Two lines, Neue Montreal Regular, 16px, 60% opacity, centered below the headline. |
| CTA | Hollow button: "EXPLORE" — 1px Bone border, transparent fill, Söhne Mono 12px, tracked +30. Centered below subtitle. Hover: fill white, text black, 400ms. |
| Scroll indicator | Small downward chevron at bottom center, pulsing opacity (60%–100%, 2000ms loop). |

**Section 2: Terrain Boot 01 (Hero Product)**

| Element | Spec |
|---|---|
| Background | `image_new/10.jpg` — dark techwear figure. Full-bleed. |
| Text block | Left-aligned, positioned at bottom-left (8% from left, 15% from bottom). |
| Product name | "TERRAIN BOOT 01" — Monument Extended, 36px, tracked +60, Portal White. |
| Spec line | "LATTICE SOLE / PARAMETRIC UPPER / BIODATA FIT" — Söhne Mono, 12px, 60% opacity. |
| CTA | "EXPLORE" hollow button, same spec as hero. |

**Section 3: Transit Shell**

| Element | Spec |
|---|---|
| Background | `image_new/9.jpg` — transparent membrane jacket. Full-bleed. |
| Text block | Right-aligned, positioned at bottom-right (mirrored from Section 2). |
| Product name | "TRANSIT SHELL 01" — same type spec. |
| Spec line | "4-LAYER MEMBRANE / SEALED SEAMS / HELMET CLEARANCE" |
| CTA | Hollow button. |

**Section 4: Brand Stats**

| Element | Spec |
|---|---|
| Background | Solid #0A0A0C. No image. |
| Layout | Three stat blocks in a horizontal row (desktop) or vertical stack (mobile). |
| Stats | |

```
AI-DRIVEN          BIODATA               DEPARTURE
                   ENGINEERED            READY
────────           ────────              ────────
Every piece        Your signal           The first shoes
begins with        shapes the            that touch Mars.
computation.       structure.
```

Each stat label: Monument Extended, 24px, tracked +60, Portal White.
Each stat description: Neue Montreal, 14px, Dust (#8B7D6B).
Thin horizontal divider between label and description: 1px, rgba(255,255,255,0.1).

**Section 5: Mission Kit**

| Element | Spec |
|---|---|
| Background | `image_new/8.jpg` — neon coat on lunar surface. Full-bleed. |
| Text | "MISSION KIT" — bottom-left placement. Same type hierarchy as Section 2. |

**Section 6: Flagship Teaser**

| Element | Spec |
|---|---|
| Background | `image_new/2.jpg` — circular arena, star ceiling. Full-bleed. |
| Text | "THE FLAGSHIP" — centered. Below: "Seoul. 2026. The threshold is open." Söhne Mono, 14px, 60% opacity. |
| CTA | "BOOK A DEPARTURE SLOT" — hollow button. Links to booking form. |

**Footer**

| Element | Spec |
|---|---|
| Background | #0A0A0C |
| Height | 120px |
| Left | "DUNE.X" wordmark, Söhne Mono, 12px, 40% opacity |
| Center | Social links: Instagram / X — Söhne Mono, 12px, 50% opacity, 20px gap |
| Right | "2026" — Söhne Mono, 12px, 40% opacity |

### Product Page Structure

Each product page follows a consistent template. The page scrolls vertically through these sections:

**Section 1: Product Hero (100vh)**

| Element | Spec |
|---|---|
| Background | Full-bleed product shot (dark, theatrical, edge-lit) |
| Product name | Monument Extended, 48px, centered, Portal White |
| Tagline | Söhne Mono, 14px, 50% opacity, centered below name |
| Example | "TERRAIN BOOT 01" / "Lattice sole. Parametric upper. Departure ready." |

**Section 2: Spec Block (100vh)**

| Element | Spec |
|---|---|
| Background | #0A0A0C |
| Layout | Spec grid — 2 columns (desktop), 1 column (mobile). Each spec: large value on left, label on right, separated by thin divider. |
| Example specs | |

```
4             LAYERS
────────────────────────
3.2mm         MEMBRANE THICKNESS
────────────────────────
47            BIODATA PARAMETERS
────────────────────────
1             BODY. YOUR BODY.
────────────────────────
```

Values: Monument Extended, 64px, Portal White.
Labels: Söhne Mono, 14px, Dust, uppercase.

**Section 3: Clinical Poet Copy (100vh)**

| Element | Spec |
|---|---|
| Background | #0A0A0C |
| Layout | Centered text block, max-width 640px |
| Content | 3–5 paragraphs of product description in Clinical Poet tone. Neue Montreal Regular, 18px, line-height 1.7, Bone (#E8E0D4). |

Example:

```
The Terrain Boot 01 begins with your body.

Forty-seven biodata parameters — captured from your movement,
your force, your cadence — feed the AI computation engine.
The sole lattice is generated from your specific pressure map.
Heel-dominant walkers receive denser lattice at the rear.
Forefoot strikers find reinforced toe-off zones.

The upper is cut from parametric membrane — a 4-layer composite
with flex zones derived from your ankle mobility data. No two
pairs are identical. Each pair knows its owner before it is worn.

This is not customization. This is engineering.
```

**Section 4: Detail Gallery (100vh per detail, scrollable)**

3–5 full-bleed macro detail shots. No text overlay. The images speak.
On scroll, each image fades in from darkness (800ms, mechanical easing).

**Section 5: Price and Action (100vh)**

| Element | Spec |
|---|---|
| Background | #0A0A0C |
| Layout | Centered |
| Product name | Monument Extended, 24px, Portal White |
| Price | Söhne Mono, 18px, Portal White. Example: "480,000" (no currency symbol — Söhne Mono, 12px, 40% opacity, "KRW" below the number) |
| Configuration | Söhne Mono, 12px: "STANDARD CONFIGURATION" or "BIODATA CONFIGURATION (requires in-store scan)" |
| CTA | "PRE-ORDER" — hollow button. If biodata config: "BOOK A DEPARTURE SLOT" instead. |
| Below CTA | Söhne Mono, 11px, 30% opacity: "Fabrication time: 5–7 days. Shipped from Seoul." |

---

## Manufacturing Tracker

### Overview

When a customer orders a product that requires extended fabrication, they receive a tracker — accessible via the DUNE.X app or a unique URL sent to their email/phone. The tracker follows SpaceX mission-tracking aesthetics: dark, minimal, engineering-precision, real-time.

### Tracker Interface

**Layout:**

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  DUNE.X                                    ORDER DX-0847│
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  TERRAIN BOOT 01                                        │
│  BIODATA CONFIGURATION                                  │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  STATUS: LATTICE GENERATION                             │
│                                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐              │
│  │ ██  │ │ ██  │ │ ▓▓  │ │ ░░  │ │ ░░  │              │
│  │DATA │ │COMP │ │FABR │ │ASSM │ │CALI │              │
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘              │
│  SIGNAL  LATTICE  PRINT   UPPER   FINAL                │
│  MAPPED  COMPUTED IN PROG PENDING PENDING              │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  LATEST UPDATE                           02.19.2026     │
│                                          14:32 KST      │
│                                                         │
│  "Your sole lattice is being computed from your         │
│   cadence data. Variable density across 12 zones.       │
│   Layer 2 of 4."                                        │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│                                                         │
│  ESTIMATED COMPLETION                                   │
│  2026.02.24                                             │
│                                                         │
│  FABRICATION LOCATION                                   │
│  DUNE.X FLAGSHIP / 6F / SEOUL                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Visual design:**
- Background: #0A0A0C
- All text: Söhne Mono
- Status labels: 12px, Dust (#8B7D6B)
- Status values: 14px, Portal White
- Progress blocks: filled = Portal White, active = animated pulse, pending = Haze (#2A2A30)
- The active stage block pulses slowly (opacity 60%–100%, 2000ms loop)
- Thin horizontal dividers: 1px, rgba(255,255,255,0.08)

### Manufacturing Stages

| Stage | ID | Duration | Tracker Description |
|---|---|---|---|
| 1. Signal Processing | DATA | 2–4 hours | "Your biodata is being processed. 47 parameters extracted from your scan." |
| 2. Lattice Computation | COMP | 12–24 hours | "Your sole lattice is being computed from your cadence data. Variable density across 12 zones." |
| 3. 3D Fabrication | FABR | 24–48 hours | "Your sole is being printed. Layer [N] of [total]. Material: TPU lattice composite." |
| 4. Upper Assembly | ASSM | 12–24 hours | "The parametric upper is being cut. Your movement signature defined the flex zones." |
| 5. Final Calibration | CALI | 4–8 hours | "Your Terrain Boot is in final assembly. Sole bonded. Upper sealed. Quality verification." |
| 6. Departure Ready | DONE | — | "Your piece is complete. It is waiting for you." |

### Push Notifications

Each stage transition triggers a push notification (mobile app) or email update.

**Notification format:**

```
DUNE.X
TERRAIN BOOT 01 — DX-0847

STATUS: UPPER ASSEMBLY

The parametric upper is being cut.
Your movement signature defined the flex zones.
14 pattern pieces.

[View tracker →]
```

**Notification principles:**
- Maximum 1 notification per 24 hours
- Each notification is 2–3 sentences maximum
- Written in Clinical Poet tone — factual, sensory, never enthusiastic
- No emojis, no percentage bars, no "almost there" language
- The final notification ("Departure ready") is the only one that includes a call to action: "Visit the flagship to receive your piece, or select delivery."

### Delivery Option

For customers who cannot return to the flagship:

```
YOUR PIECE IS DEPARTURE READY.

────────────────────────────────

PICKUP AT FLAGSHIP
  DUNE.X Seoul / 4F Checkout
  Available now.

or

SHIP TO ADDRESS
  Estimated arrival: 2–3 business days
  Packaging: DUNE.X transit case

────────────────────────────────

[PICKUP]          [SHIP]
```

---

## Mobile In-Store Experience

The DUNE.X app (or mobile web) serves as the customer's digital companion during the flagship visit.

### App States by Floor

| Floor | App Display | Notes |
|---|---|---|
| **Pre-visit** | Booking confirmation, flagship info, wayfinding overview | Minimal. Does not reveal the journey. |
| **1F** | The screen dims to near-black. A faint DUNE.X wordmark pulses. | The phone becomes part of the void. It does not compete with the physical space. |
| **2F** | After scan: Body signal graphic appears on screen, slowly rotating. | The first moment the phone becomes interesting. The body signal is personal. |
| **3F** | Departure board mirror — shows the customer's slot status. | So they don't need to stare at the physical board. |
| **Elevator** | Screen goes completely black. Vibrates once at the 25-second mark. | The phone participates in the transit ritual. |
| **5F** | Product recommendations appear (if scanned). Specs visible. "Add to order" functionality. | The phone becomes a shopping tool — but a quiet one. |
| **6F** | Fabrication status (if ordered). Live feed of the machines (optional). | Witnessing mode. |
| **4F** | Order summary. Payment confirmation. | Functional. |
| **Post-visit** | Manufacturing tracker. Body signal profile. Order history. | The ongoing relationship. |

### App Design Principles

- Background: always #0A0A0C
- No splash screen (the store experience is the splash)
- Minimal interaction — the app responds to context (floor detection via BLE beacons), not user input
- Text: Söhne Mono for all interface text. Monument Extended only for product names.
- Animations: same 800ms–1200ms, mechanical easing
- The app never interrupts the physical experience. It augments silently.

---

## Data Visualization Design

Biodata is never displayed as dashboards, bar charts, or conventional data visualization. In the DUNE.X system, data is rendered as graphic form — the same aesthetic language used throughout the brand.

### Body Signal Graphic

The primary biodata visualization. Generated from 47 parameters. Appears:
- On the 2F visualization wall during the scan
- On the customer's phone after the scan
- On the 5F recognition screen
- On the manufacturing tracker (small version, as an identity mark)
- On the packaging spec card (printed, simplified version)

**Visual language:**
- Base form: parametric mesh — a deformed sphere or toroidal shape, computed from dimensional data
- Surface texture: Voronoi tessellation, cell density varies with force distribution data
- Color: Portal White primary, Cold Glow (#D0D8E8) secondary, Signal Red (#E94520) at peak-force points only
- Animation: slow rotation (one full revolution per 30 seconds), gentle surface deformation (breathing effect, 4-second cycle)
- Resolution: renders at 4K for wall display, 1080p for phone, simplified vector for print

### Product Computation Visualization

Shown on 5F when the AI maps biodata to product parameters:

**The stream:**
- Lines of data (Söhne Mono, very small, 8px) flow from the body signal graphic toward a product schematic
- Each line represents a parameter mapping: "CADENCE 112BPM → SOLE FLEX ZONE A3"
- The lines are animated — they flow continuously, not as a static display
- The product schematic builds in real time as data arrives: the sole lattice generates, the upper pattern unfolds, the flex zones color-code

**The reveal:**
- After all parameter lines have connected, the product schematic rotates to a beauty angle
- The data streams fade out
- The product stands alone
- Below it: "COMPUTED FOR YOUR SIGNAL"

### Aggregate Data Art

Displayed in the 2F interactive installation area (for waiting visitors) and on the website `/concept` page:

- Anonymous aggregate biodata from all DUNE.X scans, rendered as a collective body signal
- A large-scale generative graphic that shifts slowly over days and weeks as more scans contribute
- It represents the collective movement signature of the DUNE.X community
- No individual data is identifiable — it is the sum, not the parts
- Aesthetic: dense, complex, luminous. A galaxy of movement data.

---

## Interaction Patterns

### Motion Standard

All animations across digital touchpoints follow the same mechanical motion language:

| Pattern | Duration | Easing | Use |
|---|---|---|---|
| **Reveal** | 1000ms | `cubic-bezier(0.25, 0.1, 0.25, 1.0)` | Page sections appearing, product images loading |
| **Transition** | 600ms | Same cubic-bezier | Page-to-page navigation, menu open/close |
| **Micro** | 200ms | `ease-out` | Button hover, link underline, icon state change |
| **Light-first** | 400ms before content | Linear | Light ring / line animates in, then content fades behind it |

**The light-first principle in digital:**
When a new page or section loads:
1. A thin horizontal line of Portal White extends from center outward (400ms, linear)
2. The line reaches full width and fades (200ms)
3. Content fades in behind it (1000ms, mechanical easing)

This mirrors the physical experience: the portal opens, then the subject appears.

### Scroll Behavior

- Full-viewport sections snap to screen boundaries (CSS `scroll-snap-type: y mandatory`)
- Each section triggers its own reveal animation when it enters the viewport
- Parallax: background images translate at 85% scroll speed (content at 100%)
- The scroll indicator (bottom chevron) disappears after the user scrolls past the first section

### Button States

**Primary (hollow):**

| State | Style |
|---|---|
| Default | 1px border: rgba(232, 224, 212, 0.6), transparent fill, Söhne Mono 12px tracked +30, Bone text |
| Hover | Fill: #FFFFFF, text: #0A0A0C, 400ms transition |
| Active | Fill: rgba(255, 255, 255, 0.8), text: #0A0A0C |
| Disabled | 1px border: rgba(232, 224, 212, 0.15), text at 30% opacity |

**Signal (rare, for critical actions only — 5% usage):**

| State | Style |
|---|---|
| Default | Fill: #E94520, text: #0A0A0C, Söhne Mono 12px |
| Hover | Fill: #FF5A35 (slightly lighter), 400ms |
| Active | Fill: #D13A18 (slightly darker) |

### Form Inputs

Forms appear in the booking flow ("Book a Departure Slot") and checkout.

| Element | Style |
|---|---|
| Input field | Background: #1E1E24 (Membrane). Border-bottom: 1px rgba(232, 224, 212, 0.15). No border-top, left, right. Söhne Mono 14px, Bone. |
| Label | Söhne Mono 11px, Dust (#8B7D6B), uppercase, tracked +20. Positioned above the input. |
| Focus state | Border-bottom transitions to 1px Portal White, 400ms. A faint light glow appears below the input (box-shadow: 0 2px 8px rgba(255,255,255,0.05)). |
| Error state | Border-bottom: 1px #E94520. Error text below: Söhne Mono 11px, Signal Red. |
| Placeholder | Söhne Mono 14px, 30% opacity Bone. |

---

## Microcopy Guide

All interface text follows the Clinical Poet voice. This section provides templates and examples for common UI patterns.

### Buttons

| Context | Text | Not This |
|---|---|---|
| Start biodata scan | "Begin scan" | "Start your personalized experience" |
| View product | "Explore" | "Learn more" |
| Purchase | "Pre-order" | "Add to cart" |
| Book visit | "Book departure slot" | "Schedule your visit" |
| Track order | "Track formation" | "Track your order" |
| View body signal | "View your signal" | "See your results" |
| Continue shopping | "Continue" | "Keep exploring our collection" |
| Submit form | "Confirm" | "Submit" |

### Error States

| Error | Message |
|---|---|
| Form field empty | "Required." |
| Invalid email | "Check the address." |
| Payment failed | "Transaction interrupted. Try again." |
| Product unavailable | "Currently in formation. Leave your signal and we will notify you." |
| Page not found | "Nothing here. The void, as intended." Below: "[Return to threshold →]" link. |
| Server error | "Systems interrupted. We are recalibrating." |
| Scan data expired | "Your signal has aged. A new scan is recommended." |

### Loading States

| Context | Display |
|---|---|
| Page loading | The screen holds at #0A0A0C. A thin horizontal line of Portal White extends from center (the light-first principle). No spinner. No progress bar. |
| Product image loading | A faint outline of the product shape appears (wireframe, 10% opacity), then fills with the image on load. |
| Tracker updating | The active stage block pulses. No loading text. |
| Body signal processing | "Processing your signal." Söhne Mono, 14px, 50% opacity, centered. Below: the body signal graphic forming in real time (partial render). |

### Empty States

| Context | Display |
|---|---|
| No orders | "No formations in progress. Visit the flagship to begin." |
| No body signal | "No signal on file. The scanning chamber is waiting." |
| No search results | "Nothing found in the void." |

### Confirmation States

| Context | Display |
|---|---|
| Booking confirmed | "Your departure slot is confirmed. [DATE]. [TIME]. Arrive at the threshold." |
| Order placed | "Your piece is entering formation. We will signal when it is ready." |
| Body signal saved | "Signal stored. It will shape what comes next." |
| Email subscribed | "Received. We will signal when there is something to know." |

### Tone Rules

1. **Short.** Maximum 15 words per UI message. Fragments are preferred over complete sentences.
2. **Factual.** State what happened or what to do. No emotional padding.
3. **No enthusiasm.** Never use "Great", "Awesome", "Congratulations", or exclamation marks.
4. **Metaphor from the brand world.** Use "signal", "formation", "threshold", "departure", "transit" naturally. Never force them.
5. **Respect silence.** If no message is needed, display none. A completed action does not always require confirmation text.

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 768px | Single column. Navigation hamburger. Touch-first. Font sizes reduce by ~25%. |
| Tablet | 768–1199px | Flexible grid. Some 2-column layouts. Navigation hamburger. |
| Desktop | 1200–1799px | Full layout. 12-column grid. Mouse interactions (hover states active). |
| Wide | 1800px+ | Content max-width: 1600px, centered. Increased negative space. Images scale to fill. |

### Mobile-Specific UX

| Pattern | Mobile Adaptation |
|---|---|
| Full-viewport sections | Same 100vh. Snap scroll. |
| Hollow buttons | Larger tap targets: minimum 48px height, full-width on mobile. |
| Product spec grid | Single column stack. Large values remain large. |
| Hero text | Reduced from 48px to 28px. Still Monument Extended, still centered. |
| Navigation menu | Full-screen overlay. Items larger (28px). Close button: X icon, top-right. |
| Manufacturing tracker | Same layout, single column. Progress blocks stack vertically. |

---

*The screen is a portal. It opens with light, reveals with patience, and closes with darkness. Every pixel belongs to the void.*
