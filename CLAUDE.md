# DUNE.X — Project Context

> **All agents must read this file before starting work.**

---

## What Is This Project?

DUNE.X is an **AI-driven future apparel laboratory** — a brand that engineers clothing, footwear, and accessories from biodata at the threshold of departure. The concept: performance apparel forged in darkness and shaped by light. Every garment begins with the body's own signal — movement, force, cadence, breath — captured and translated into engineered structure through AI. Not literal space suits, but the real thing: the first apparel you pack for the Moon, the first shoes that touch Mars.

**Tagline:** *"Future your Performance."*

---

## Brand DNA (Non-Negotiable)

These must be reflected in every output:

1. **Biodata Intelligence** — Every piece begins with the body's own data. AI captures biometric signals and translates them into engineered structure. The garment knows you before you wear it.
2. **Departure Ready** — The first apparel you pack for the Moon. The first shoes that touch Mars. Engineered for real departure, not costume.
3. **Void + Light Architecture** — Deep darkness (#0A0A0C) is the primary environment. Light is architectural: rings, portals, edge glow, monoliths of white cutting through black. Warmth comes from Signal red-orange (#E94520) used at 5% max.
4. **Clinical Poet tone** — Formal, restrained awe. Short sentences. Fragments allowed. Never use hype language, exclamation marks, or words like "innovative", "revolutionary", "game-changing".
5. **Computational Craft** — Parametric structures, 3D-printed components, generative patterns, data overlays. Design with data, manufacture with algorithms. The digital is visible.
6. **Singular Solitude** — Single figures in vast dark spaces. Runway-scale stages, not natural landscapes. Theatrical, not pastoral.
7. **The Period** — DUNE.X always written with the period. It's a mechanical pause before the unknown.

---

## Visual Direction

The DUNE.X world is defined by these recurring motifs:

- **Dark stages** — Vast theatrical spaces, runway scale, architectural darkness
- **Light portals** — Rings, arcs, and monoliths of white light cutting through void
- **Transparent membranes** — Garments that reveal structure, layered shells catching edge light
- **Data surfaces** — Holographic overlays, spec readouts, computational textures on material
- **Threshold moments** — Figures at the edge of portals, doorways, the boundary between here and there

---

## Reference Brands

Study these for context — what we take and what we don't:

| Brand | URL | Take | Don't Take |
|---|---|---|---|
| SpaceX | spacex.com | Black aesthetic, engineering ethos, D-DIN font | Literal aerospace branding |
| Gentle Monster | gentlemonster.com | Experiential retail, surreal storytelling | Mass-market positioning |
| SCRY | scccccry.com | 3D-printed "digital embryo", prototype culture | Shopify-first e-commerce feel |
| SUB | sub.global | Architectural scenography, raw material honesty | Pure architecture firm identity |
| Tamburins | tamburins.com | "Anomalous beauty", curated objects | Beauty/fragrance category |

---

## Design System Quick Reference

### Colors (CSS variables in `brand/color_system.css`)
```
--dx-void: #0A0A0C       (primary bg — deep darkness)
--dx-regolith: #C4A882   (warm accent, used sparingly)
--dx-bone: #E8E0D4       (light neutral, text, garment white)
--dx-signal: #E94520     (accent, 5% usage max — human warmth)
--dx-haze: #2A2A30       (dark surface)
--dx-dust: #8B7D6B       (secondary text)
--dx-membrane: #1E1E24   (elevated surface)
--dx-atmosphere: #F5F0E8  (off-white)
```

### Light Palette (New)
Light is a design element, not just illumination:
- **Portal White** — Pure white (#FFFFFF) used for light rings, edge glow, threshold elements
- **Cold Blue** — Desaturated blue-white for deep space atmospherics
- **Signal Red** — #E94520 for rare warmth accents in darkness

### Typography
- **Display:** Monument Extended (Ultrabold, ALL CAPS, wide-tracked)
- **Body:** Neue Montreal (Regular/Medium)
- **Technical:** Söhne Mono (Light/Regular)

### Motion
- Slow reveals from darkness (800ms–1200ms)
- Mechanical easing, not organic
- Parallax depth for spatial feel
- Light elements animate before content — the portal opens, then the subject appears

---

## File Ownership Rules

Each agent/team writes ONLY to their assigned folder:

| Team | Command | Folder | Key Files |
|---|---|---|---|
| Team Leader | `/team-leader` | — | Oversees all teams, manages workflow |
| Brand Strategy | `/brand-strategy` | `brand/` | `brand_strategy.md`, `visual_identity.md`, `color_system.css` |
| Commercial Film | `/commercial-film` | `film/` | `storyboard.md`, `shot_list.md`, `motion_spec.md` |
| Spatial Design | `/spatial-design` | `spatial/` | `retail_plan.md`, `floor_program.md`, `blender_spec.md` |
| Product Design | `/product-design` | `product/` | `collection_overview.md`, `biodata_spec.md`, product specs |
| UX Design | `/ux-design` | `ux/` | `journey_map.md`, `biodata_experience.md`, `wireframes.html` |
| Web Platform | `/web-platform` | `web/` | `index.html`, `style.css`, `script.js` |

Shared context files at root level (`brand_brief.md`, `CLAUDE.md`) are read-only for all teams.

---

## Existing Work (Phase 1)

Before creating anything, read what already exists:

- **`brand_brief.md`** — Full creative brief with vision, audience, values, competitive position
- **`brand/brand_strategy.md`** — Manifesto, positioning map, audience persona, tone of voice
- **`brand/visual_identity.md`** — Color system, typography, logo direction, photography rules, graphic system
- **`brand/color_system.css`** — CSS custom properties for all design tokens
- **`moodboard/moodboard_brief.md`** — Moodboard images with written rationale
- **`storyboard/storyboard.md`** — 5-scene commercial storyboard with concept art
- **`web/image_new/`** — 11 reference images defining the current visual direction

---

## Phase 2 Work

| Deliverable | Owner Folder | Description |
|---|---|---|
| Commercial Film | `film/` | Expand storyboard into full production specs, shot list, motion design |
| Retail Flagship | `spatial/` | Spatial design, floor plan, materials palette, lighting spec, interactive layout |
| Brand Website | `web/` | Landing page, product pages, e-commerce structure using design system |

---

## Language Rules

- Conversations with the user may be in Korean or English.
- All file output (code, markdown, copy, specs) must be written in English only.

---

## Document Authority

All `.md` files in this project represent **minimum guidelines**, not final deliverables. Agent teams are expected to expand, refine, and improve upon them. If an agent identifies a stronger direction, better copy, sharper positioning, or missing details — add it. These documents are living foundations, not ceilings.

---

## Quality Standards

- Every output must feel like it belongs in the DUNE.X world
- Use the brand color palette — no off-brand colors
- Follow typography rules — Monument Extended for display, Söhne Mono for specs
- Photography direction: theatrical darkness + architectural light. Not nature. Not lifestyle.
- Write in Clinical Poet tone — precise, sensory, never hype
- When in doubt, ask: *"Would this feel right at the threshold?"*
