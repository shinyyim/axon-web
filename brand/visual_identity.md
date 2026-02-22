# DUNE.X — Visual Identity System

---

## Color System

### Philosophy
The DUNE.X palette is derived from two conditions: **deep void** (the darkness of transit, the space before the portal opens) and **architectural light** (white rings, edge glow, threshold illumination). Warmth is rare and surgical — **Signal Red-Orange** represents the single point of human heat in cold space. Biodata visualizations use the light palette — data rendered as luminous structure against darkness.

### Primary Palette

| Name | Hex | RGB | Role |
|---|---|---|---|
| **Void** | `#0A0A0C` | 10, 10, 12 | Primary background, the darkness of transit |
| **Bone** | `#E8E0D4` | 232, 224, 212 | Light neutral, text on dark, garment white |
| **Signal** | `#E94520` | 233, 69, 32 | Accent, CTA, alert — human warmth in void |

### Secondary Palette

| Name | Hex | RGB | Role |
|---|---|---|---|
| **Haze** | `#2A2A30` | 42, 42, 48 | Dark surface, card backgrounds |
| **Dust** | `#8B7D6B` | 139, 125, 107 | Muted tone, secondary text |
| **Membrane** | `#1E1E24` | 30, 30, 36 | Elevated dark surface |
| **Atmosphere** | `#F5F0E8` | 245, 240, 232 | Off-white for light mode contexts |
| **Regolith** | `#C4A882` | 196, 168, 130 | Warm accent, used sparingly |

### Light Palette

| Name | Value | Role |
|---|---|---|
| **Portal White** | `#FFFFFF` | Light rings, edge glow, threshold elements |
| **Cold Glow** | `#D0D8E8` | Desaturated blue-white for deep space atmospherics |
| **Rim Light** | `rgba(255,255,255,0.15)` | Edge illumination on garments and figures |

### Usage Rules
- **85% Void** — The brand lives in deep darkness
- **10% Bone + Light** — Text, garment surfaces, light architecture
- **5% Signal** — Used surgically: buttons, alerts, rare warmth
- **Regolith** — Tertiary. Not a dominant tone. Used for texture, not atmosphere.
- **Light as form** — White light is a design element: portals, rings, edges. Not fill illumination.

---

## Typography

### Primary: Monument Extended
A geometric, wide-tracking display typeface. Used for headlines, brand name, campaign titles.
- **Weight:** Bold, Ultrabold
- **Tracking:** +50 to +100 (wide)
- **Case:** ALL CAPS always

*Fallback: Neue Montreal Extended, or D-DIN (SpaceX reference)*

### Secondary: Söhne Mono
A monospaced face for technical specifications, product details, body copy in digital.
- **Weight:** Regular, Light
- **Tracking:** Default
- **Case:** Sentence case

*Fallback: JetBrains Mono, IBM Plex Mono*

### Body: Neue Montreal
Clean, geometric sans for longer text, descriptions, brand copy.
- **Weight:** Regular, Medium
- **Tracking:** Default
- **Case:** Sentence case

*Fallback: Inter, Outfit*

### Type Scale

| Usage | Font | Size | Weight | Tracking |
|---|---|---|---|---|
| Brand name | Monument Extended | 48–120px | Ultrabold | +100 |
| H1 Headline | Monument Extended | 36–64px | Bold | +80 |
| H2 Subhead | Neue Montreal | 24–32px | Medium | +20 |
| Body | Neue Montreal | 16–18px | Regular | 0 |
| Tech specs | Söhne Mono | 12–14px | Light | +10 |
| Caption | Söhne Mono | 10–12px | Regular | +20 |

---

## Logo Direction

### Concept: Typographic Wordmark
The DUNE.X logo is **type-only** — no symbol. The period between DUNE and X is the brand's visual signature: a mechanical pause, a breath before the threshold.

### Specifications
- **Font:** Monument Extended Ultrabold, all caps
- **The period (.):** Optically scaled to be slightly larger than standard, vertically centered — it should read as a deliberate design element, not a punctuation accident
- **Kerning:** Wide-tracked, each letter has breathing room — the word itself feels like vast darkness between stars
- **Reducibility:** At small sizes, collapses to **D.X** with the same period treatment

### Variants

| Variant | Use Case |
|---|---|
| **DUNE.X** (full wordmark) | Primary, hero placements, website header |
| **D.X** (abbreviation) | Garment labels, favicon, small applications |
| **The Period alone (●)** | Embossed on product, zipper pulls, hardware |

### Lockup Rules
- Minimum clear space = height of the "X" on all sides
- Always on Void background or reversed on Bone
- Never on colored backgrounds except Signal (for special campaigns)
- Never distorted, outlined, or shadowed

---

## Photography Direction

### Approach: Theatrical Darkness + Architectural Light

| Category | Direction |
|---|---|
| **Product shots** | Garments on dark void backgrounds, lit by single directional edge light. Transparent membranes catching rim glow. Feel: specimen under examination. |
| **Environmental** | Vast dark stages — runways, arenas, theatrical installations. Not natural landscapes. Architectural scale. Concentric light rings, star ceilings, monolith portals. Feel: standing in a dark cathedral. |
| **Campaign** | Single figure at a threshold — standing before a light portal, silhouetted against a ring of white. Fog, atmosphere, the moment before stepping through. Feel: chosen departure. |
| **Editorial** | Techwear fashion photography. Transparent shells on bodies, structural detail, membrane layers visible. Dark backgrounds, cold light. Feel: technical fashion meets astronaut documentation. |
| **Detail** | Extreme macro on materials — data overlays on organic surfaces, holographic spec readouts, computational lattice structures. Feel: the digital made physical. |
| **Biodata** | Visualizations of biometric capture — movement trajectories, force maps, cadence rhythms rendered as luminous data on dark backgrounds. Feel: the body's signal made visible. |

### Rules
- **Never:** Lifestyle, group shots, smiling, street-style, natural landscapes, warm ambient light
- **Always:** High contrast, intentional negative space, sense of theatrical scale, edge lighting
- **Color grading:** Desaturated cold tones. Near-monochrome. Signal red only as rare punctuation.
- **Light motifs:** Rings, portals, monoliths, edge glow. Light is architectural, not ambient.
- **Aspect ratios:** 16:9 or 2.39:1 (cinematic) for campaign, 4:5 for product, 1:1 for detail

---

## Graphic System

### Grid
- Based on **8px base unit**
- Content containers use **12-column grid** with generous gutters (32px+)
- Generous whitespace is structural — emptiness = void = brand value

### Iconography
- Monoline, geometric, 1.5px stroke
- Derived from aerospace/engineering symbology: coordinate crosses, trajectory arcs, pressure indicators
- Never decorative, always functional

### Pattern Language
- **Light ring:** Concentric circle motif — the portal, the threshold, the moment of departure
- **Data overlay:** Holographic spec readouts, grid coordinates, system text layered on imagery
- **Biodata stream:** Movement trajectories, force distribution maps, cadence waveforms — the body's signal rendered as graphic element
- **Parametric mesh:** Generated computational patterns used as texture overlays, informed by AI-processed biodata
- **Coordinate grid:** Fine graph-paper grid as subtle background element

### Motion Principles
- **Slow reveals:** Elements emerge from darkness, never snap in
- **Light first:** Portal/ring elements animate before content appears — the threshold opens, then the subject is revealed
- **Parallax depth:** Layers move at different speeds to create spatial depth
- **Mechanical easing:** Movements feel engineered, not organic — linear with precise deceleration
- **Duration:** Transitions are 800ms–1200ms, never rushed
