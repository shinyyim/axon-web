# DUNE.X Flagship — Floor-by-Floor Program

---

## Building Overview

- **Levels:** 6 upper floors + 1 basement
- **Total height:** 30m (5m per floor, ~16.4 ft floor-to-floor)
- **Construction:** New build
- **Total area:** ~2,600 sqft (~370 sqft per floor average)
- **Vertical core:** ~45 sqft per floor, **same position on every floor**

---

## Vertical Core (Fixed Position — All Floors)

The vertical core must occupy the **same footprint on every floor**. Contains:

- **Elevator shaft** — single elevator, serves all floors. Key moment: 3F → 5F express
- **Staircase** — continuous fire stair, also used as secondary circulation
- **Escalator** — 4F → 1F descent (exit route)
- **Service runs** — MEP risers, data cabling

> Core should be positioned to maximize usable floor area. Recommended: rear or side-wall position, not center.

---

## B1 — Event Floor (370 sqft)

| Element | Area (sqft) | Notes |
|---|---|---|
| Event space | 250 | Fashion shows, launches, installations. Raw, flexible, dark arena. |
| Backstage / storage | 50 | Staging, equipment, temporary storage |
| Service access | 25 | Loading, service entrance |
| Vertical core | 45 | Stairs + service elevator |

---

## 1F — Arrival (370 sqft)

| Element | Area (sqft) | Notes |
|---|---|---|
| Airlock entry corridor | 120 | Compressed corridor, street → void transition |
| Reception / brand display | 115 | First contact with DUNE.X. Atmosphere, no product. |
| Escalator landing | 50 | Escalator from 4F terminates here (exit route) |
| Street entrance | 40 | Facade threshold, door system |
| Vertical core | 45 | |

---

## 2F — Experience Zone (370 sqft)

| Element | Area (sqft) | Notes |
|---|---|---|
| Biodata scanning station | 100 | Body scan, movement capture, biometric input |
| AI visualization wall | 80 | Real-time data-to-form visualization |
| Interactive installation | 100 | Brand immersion, sensory experience |
| Transition corridor | 45 | Connects to stairs/escalator to 3F |
| Vertical core | 45 | |

---

## 3F — Cafe & Gathering (370 sqft)

| Element | Area (sqft) | Notes |
|---|---|---|
| Lounge seating | 140 | Social space, pause in the journey |
| Cafe counter + prep | 80 | Minimal menu, on-brand presentation |
| Elevator lobby | 60 | Departure point — elevator to 5F. The last moment before the reveal. |
| Restroom | 45 | |
| Vertical core | 45 | |

---

## 4F — Checkout (370 sqft)

| Element | Area (sqft) | Notes |
|---|---|---|
| Checkout counter | 80 | Payment, transaction |
| Packaging / wrapping station | 70 | Branded packaging, ritual of handoff |
| Pickup waiting | 80 | Seating, product received from 6F |
| Escalator to 1F | 50 | Descent to exit |
| Staff support | 45 | Back of house, staff area |
| Vertical core | 45 | |

**Note:** Most functional, least conceptual floor. Clean, efficient, practical. Visited only on descent.

---

## 5F — The Reveal (370 sqft)

| Element | Area (sqft) | Notes |
|---|---|---|
| Planetary environment | 200 | Elevator doors open to another world. Moon/Mars scenery. Emotional peak. |
| Product display vitrines | 80 | Apparel shown in the environment it was designed for |
| Elevator arrival zone | 45 | First moment of the reveal — what you see when doors open |
| Vertical core | 45 | |

**Note:** Strongest conceptual floor. Total scenery change from everything below. The contrast with 4F is intentional.

---

## 6F — Manufacturing (370 sqft)

| Element | Area (sqft) | Notes |
|---|---|---|
| Robotic fabrication theater | 150 | Visible robotic assembly, AI-driven manufacturing |
| Viewing gallery | 75 | Watch your garment being made |
| Handoff / pickup counter | 60 | Receive your piece, then descend to 4F |
| Back of house | 40 | Equipment, material storage |
| Vertical core | 45 | |

---

## Area Summary

| Program Type | Area (sqft) | Floors |
|---|---|---|
| Public Retail & Display | 1,650 | 1F, 2F, 5F, 6F |
| Cultural Event & Lounge | 350 | B1, 3F |
| Back of House & Support | 350 | B1, 4F, 6F |
| Circulation (vertical core) | 315 | All floors |

---

## Conceptual Intensity

```
Intensity:  ░░▒▒▓▓░░████████
Floor:      1F 2F 3F 4F 5F  6F
```

Floors 1–3 build anticipation. 4F is deliberately neutral. 5F–6F are the peak — total scenery change.

---

## Journey Flow

```
ENTER → 1F (Arrival) → 2F (Experience) → 3F (Cafe + Elevator)
        ↓ elevator (skip 4F)
        5F (The Reveal) → 6F (Manufacturing + Pickup)
        ↓ descend
        4F (Checkout) → escalator → 1F → EXIT

B1 (Event Floor) — independent access, fashion shows + launches
```

---

## For Blender MCP

This document should be used as the basis for `spatial/blender_spec.md`. When generating the Blender model:
- Vertical core must be in the same XY position on every floor
- Floor-to-floor height to be determined by spatial agent
- Each floor's elements should be modeled as separate collections
- 5F–6F require distinct material/environment treatment from 1F–4F
- Camera views will be provided by the user
