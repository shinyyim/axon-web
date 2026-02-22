# DUNE.X Flagship — Blender Model Specification

> Feed this file into Blender MCP. All dimensions in meters. Origin at ground level center of site.

---

## 1. Site

| Parameter | Value |
|---|---|
| Site dimensions | 18m (X) x 32m (Y) |
| Site area | 576 sqm |
| Origin (0,0,0) | Center of site, ground level |
| Site X range | -9.0 to +9.0 |
| Site Y range | -16.0 to +16.0 |
| Ground plane Z | 0.0 |
| Building orientation | Long axis along Y |

---

## 2. Building Massing — Stacked Offset Volumes

> **Primary reference: SANAA New Museum** — discrete rectangular volumes stacked vertically, each floor slightly shifted in X and/or Y. Not a smooth monolith. A composed tower of offset boxes with shadow gaps between them.

| Parameter | Value |
|---|---|
| Max footprint envelope | 18m (X) x 32m (Y) |
| Floors above grade | 6 (1F–6F) |
| Floors below grade | 1 (B1) |
| Floor-to-floor height | 5.0m |
| Total above grade | 30.0m (roof at Z +30.0) |
| Basement depth | 5.0m (B1 slab at Z -5.0) |
| Overall height | 35.0m (B1 floor to roof) |
| Slab thickness | 0.3m |
| Exterior wall thickness | 0.3m |

### Stacked Volume Offsets (per floor)

> **Primary reference: 2.jpg** — Japanese stacked building. Each floor is a genuinely different-sized box with aggressive alternating offsets (zigzag). The building tapers dramatically from base to crown. Floor heights vary — ground floor is tallest, upper floors oscillate between tall (drama) and short (compression). Offsets are 2.5–3.5m, not 1.0–2.0m. The building is designed for the diagonal/corner view.

Each floor is a separate box, shifted from the one below. Offsets create deep shadow gaps at slab edges — 0.5m–1.5m reveal between volumes. The vertical core (rear-right) remains aligned through all floors.

| Floor | X Size | Y Size | X Offset | Y Offset | Notes |
|---|---|---|---|---|---|
| B1 | 18.0m | 32.0m | 0.0 | 0.0 | Full footprint, underground — no offset |
| 1F | 18.0m | 32.0m | 0.0 | 0.0 | Full footprint. Heavy base. Tallest floor (6.0m). Glazed corner (south+east). |
| 2F | 15.0m | 29.0m | -2.5 | +2.0 | Big step-back west+north. Short floor (4.5m). Nearly blind. 76% of 1F. |
| 3F | 17.0m | 27.0m | +2.0 | -3.0 | Strong counter-shift east+south. Wider than 2F on X but shorter Y. Zigzag. Glass block floor. 80% of 1F. |
| 4F | 14.0m | 30.0m | -3.0 | +1.0 | Most dramatic west shift. Narrowest X but extends Y. Tall floor (5.5m). L-shaped corner void. 73% of 1F. |
| 5F | 16.0m | 25.0m | +2.5 | -2.5 | Counter-shift east+south. Shortest floor (4.0m). Compact + sealed. Portal ring. 69% of 1F. |
| 6F | 12.0m | 22.0m | 0.0 | -1.5 | Dramatically smallest volume. Crown. Glass curtain wall. 46% of 1F area. |

> **Blender rule:** Model each floor as a separate box object (Wall_1F, Wall_2F, etc.) — NOT one extruded volume. The offset gaps between them are key to the silhouette.

> **Key difference from v4:** Offsets are 2–3x more aggressive (2.5–3.5m vs 1.0–2.0m). Floor heights vary per floor (4.0–6.0m, not uniform 5.0m). 6F is 46% of 1F area (was 70%). The zigzag reads clearly in diagonal/corner view.

### Long Face Segmentation — 단-단-단 Mass Breaks

> **Core idea:** Each floor's long side (Y axis, 22–32m) is NOT one flat wall. It is divided into 2–3 segments along Y, where adjacent segments step in/out on X by 1.0–2.0m. This creates a faceted "단-단-단" (short-short-short) rhythm on the long face — visible as vertical shadow lines and a stepping profile from diagonal view.

Each segment is a sub-volume. In Blender, model each floor as 2–3 joined boxes (or one box with boolean additions). The break lines between segments create full-height vertical shadow gaps (0.05–0.1m) on the long facade.

| Floor | Segments | Break Y Positions | East Face X Steps | West Face X Steps | Notes |
|---|---|---|---|---|---|
| **1F** | 3 | Y = -5.0, Y = +7.0 | South: 0, Mid: -1.0, North: +0.5 | South: 0, Mid: +0.8, North: -0.5 | South widest. Middle recessed on east, bumps on west. North counter. |
| **2F** | 2 | Y = -2.0 | South: 0, North: -1.5 | South: 0, North: +1.0 | North half narrower on east, wider on west. Asymmetric. |
| **3F** | 3 | Y = -7.0, Y = +3.0 | South: 0, Mid: +1.2, North: -0.8 | South: 0, Mid: -0.8, North: +1.0 | Middle bumps east. Alternating rhythm per segment. |
| **4F** | 2 | Y = +2.0 | South: 0, North: +1.5 | South: 0, North: -1.2 | North half bumps east, recedes west. Dramatic shift. |
| **5F** | 2 | Y = -3.0 | South: 0, North: -1.0 | South: 0, North: +0.8 | North half steps back on east. Subtle. |
| **6F** | 1 | — | — | — | No segmentation. Single volume crown. |

> **Reading the table:** "East Face X Steps" means the east wall of that segment is offset from the floor's base X position by the given amount. Positive = bumps outward (east). Negative = recesses inward (west). Same logic for west face (positive = bumps outward west, negative = recesses east).

#### Segmentation Detail — 1F Example

```
Plan view (looking down):

         South (Y=-16)                           North (Y=+16)
         |← Seg A: 11m →|← Seg B: 12m →|← Seg C: 9m →|
         Y=-16      Y=-5         Y=+7       Y=+16

EAST  ───┐              ┌──────────────┐          ┌───
(X=+9)   │   Seg A      │   Seg B       │  Seg C   │
          │   full width │   steps back  │  bumps   │
          │              │   -1.0m east  │  +0.5m   │
WEST  ───┘              └──────────────┘          └───
(X=-9)       +0.8m bump     base          -0.5m recess
```

> **The result:** From a diagonal/corner view, each floor's long face has 2–3 visible facets stepping in and out. Combined with the floor-to-floor zigzag offsets, this creates a complex, articulated silhouette — not a simple stack of boxes but a cluster of interlocking masses.

#### Blender Modeling Strategy

```
For each floor with N segments:
  1. Create N cubes (sub-volumes) along Y axis
  2. Each cube has its own X position (base + segment offset)
  3. Apply Solidify (0.3m, offset=-1) to each
  4. Leave 0.05m gap between segments (shadow line)
  5. Boolean-cut facade openings AFTER segmentation
```

### Floor Elevations (top of slab)

> **Variable floor heights from 2.jpg analysis.** Ground floor is tallest (retail presence). 4F is tallest upper floor (drama of L-void). 5F is shortest (compression before crown). Rhythm: tall → short → medium → tall → short → medium.

| Floor | Z Bottom | Z Top | Floor Height | Clear Height |
|---|---|---|---|---|
| B1 | -5.0 | 0.0 | 5.0m | 4.5m (exposed structure) |
| 1F | 0.0 | +6.0 | 6.0m | 2.8m (airlock) / 5.2m (reception) |
| 2F | +6.0 | +10.5 | 4.5m | 3.5m |
| 3F | +10.5 | +15.5 | 5.0m | 4.0m |
| 4F | +15.5 | +21.0 | 5.5m | 4.5m |
| 5F | +21.0 | +25.0 | 4.0m | 3.2m (full void, no ceiling) |
| 6F | +25.0 | +30.0 | 5.0m | 4.0m |

> **Total above grade: 30.0m** (unchanged). Rhythm: 6.0 → 4.5 → 5.0 → 5.5 → 4.0 → 5.0

### Floor Area

| Floor | Gross Area | % of 1F | Usable Area |
|---|---|---|---|
| B1 | 576 sqm | 100% | ~550 sqm |
| 1F | 576 sqm | 100% | ~520 sqm |
| 2F | 435 sqm | 76% | ~410 sqm |
| 3F | 459 sqm | 80% | ~435 sqm |
| 4F | 420 sqm | 73% | ~395 sqm |
| 5F | 400 sqm | 69% | ~375 sqm |
| 6F | 264 sqm | 46% | ~240 sqm |
| **Total GFA** | **3,130 sqm** | — | **~2,925 sqm** |
| **Total GFA** | **3,415 sqm** | **~3,207 sqm** |

---

## 3. Structural Columns

### Column Grid

- **X direction (18m):** 3 bays × 6.0m = 4 column lines
- **Y direction (32m):** 4 bays × 8.0m = 5 column lines
- **Total grid intersections:** 20 positions
- **Column size:** 0.4m × 0.4m (concrete) or 0.4m diameter (round steel on upper floors)
- **Column height:** Floor-to-slab, per floor (continuous through all 7 levels)

### Column Line Positions

| Line | Direction | Position |
|---|---|---|
| X1 | X-axis | X = -9.0 (west wall) |
| X2 | X-axis | X = -3.0 |
| X3 | X-axis | X = +3.0 |
| X4 | X-axis | X = +9.0 (east wall) |
| Y1 | Y-axis | Y = -16.0 (front/south wall) |
| Y2 | Y-axis | Y = -8.0 |
| Y3 | Y-axis | Y = 0.0 (center) |
| Y4 | Y-axis | Y = +8.0 |
| Y5 | Y-axis | Y = +16.0 (rear/north wall) |

### Interior Columns (freestanding, not in walls)

6 interior columns per floor at these intersections:

| Column ID | X | Y | Notes |
|---|---|---|---|
| C1 | -3.0 | -8.0 | Interior |
| C2 | +3.0 | -8.0 | Interior |
| C3 | -3.0 | 0.0 | Interior |
| C4 | +3.0 | 0.0 | Interior |
| C5 | -3.0 | +8.0 | Interior |
| C6 | +3.0 | +8.0 | Interior — near core, may merge with core wall |

### Column Exceptions

- **5F:** Columns C3 and C4 removed (center bay opened for portal ring zone). Transfer beam at Z +20.0 slab spans 12m.
- **B1:** All 6 columns present. Exposed board-formed concrete.
- **6F:** C1 and C2 inside fabrication theater behind glass.

### Blender Column Geometry

```
For each column:
  - Box: 0.4m × 0.4m × (floor clear height)
  - Place at (X, Y, Z_floor_bottom + clear_height/2)
  - Material: Dark Concrete (B1–2F), Blackened Steel (3F–6F)
```

---

## 4. Vertical Core

Position: rear-right corner of building.

| Parameter | Value |
|---|---|
| Core position (center) | X +6.5, Y +13.5 |
| Core dimensions | 5.0m (X) x 5.0m (Y) |
| Core X range | +4.0 to +9.0 |
| Core Y range | +11.0 to +16.0 |
| Height | Full building: Z -5.0 to Z +30.0 |

### Core contains:

| Element | Dimensions | Position in core |
|---|---|---|
| Elevator shaft | 2.0m x 2.0m | X +4.5 to +6.5, Y +11.5 to +13.5 |
| Fire stair | 2.5m x 5.0m | X +6.5 to +9.0, Y +11.0 to +16.0 |
| MEP riser | 0.5m x 2.0m | X +4.0 to +4.5, Y +14.0 to +16.0 |

### Escalator (4F → 1F)

| Parameter | Value |
|---|---|
| Position | Left side of building |
| Start (4F) | X -7.0, Y -10.0, Z +15.0 |
| End (1F) | X -7.0, Y +5.0, Z 0.0 |
| Width | 1.0m |
| Enclosure | Narrow shaft, 1.5m x 15.0m |
| Run length | ~18m diagonal |

---

## 5. Facade — Stacked Volumes with Aggressive Offsets

> **Primary reference: 2.jpg** — Japanese stacked building. Each floor is a genuinely different-sized box. Offsets alternate direction (zigzag), not cumulative. The volume ratio drops significantly toward the top. Openings vary radically per floor: ground = fully glazed, mid = nearly blind with thin slots, upper = dramatic carved void, crown = minimal. The building is designed for the diagonal/corner view — offsets create a stepping 3D silhouette.

### Volume Logic (from 2.jpg analysis)

The key difference from a SANAA New Museum approach: **each floor is not just offset but genuinely resized.** Width variation is 15–25% between floors. The zigzag offset pattern creates a dramatically dynamic silhouette. Floor heights also vary — the ground is tallest, upper floors alternate between tall (drama) and short (compression).

| Quality | Rule |
|---|---|
| Width variation | Each floor is genuinely different X and Y size — not just shifted, but resized. 15–25% difference between adjacent floors. |
| Offset direction | Alternates — aggressive zigzag (2.5–3.5m). If 2F shifts west, 3F shifts east. Creates a pronounced stepping silhouette. |
| Volume ratio | Tapers dramatically: 1F = 100% → 6F = ~46%. Crown is less than half the base. |
| Floor height rhythm | Not uniform. Tall → short → medium → tall → short → medium (6.0 → 4.5 → 5.0 → 5.5 → 4.0 → 5.0). |
| Corner reading | Building designed for diagonal view. Both street facades work together. Deep offsets create a 3D stepping silhouette with significant overhangs and cantilevers. |

### Revised Stacked Volume Offsets

> **2–3x more aggressive than v4.** Offsets are 2.5–3.5m per floor. Floor heights vary 4.0–6.0m. The zigzag reads clearly from all angles. The 6F crown is dramatically small (46% of 1F).

| Floor | X Size | Y Size | X Offset | Y Offset | Notes |
|---|---|---|---|---|---|
| B1 | 18.0m | 32.0m | 0.0 | 0.0 | Full footprint, underground |
| 1F | 18.0m | 32.0m | 0.0 | 0.0 | Full footprint. Heavy base. Tallest floor (6.0m). Glazed corner. |
| 2F | 15.0m | 29.0m | -2.5 | +2.0 | Big step-back west+north. Short (4.5m). Nearly blind. 76%. |
| 3F | 17.0m | 27.0m | +2.0 | -3.0 | Counter-shift east+south. Wider X, shorter Y. Zigzag. Glass block. 80%. |
| 4F | 14.0m | 30.0m | -3.0 | +1.0 | Most dramatic west shift. Narrowest X, extends Y. Tall (5.5m). L-shaped void. 73%. |
| 5F | 16.0m | 25.0m | +2.5 | -2.5 | Counter-shift east+south. Shortest (4.0m). Compact. Portal ring. 69%. |
| 6F | 12.0m | 22.0m | 0.0 | -1.5 | Dramatically smallest crown. Glass curtain. 46%. |

### Opening Gradient (from 2.jpg)

> Openings do NOT increase linearly. The pattern peaks in the upper-middle floors. Ground = transparent, then it closes down, then one dramatic gesture, then closes again at the crown.

| Floor | Opacity | Opening Type | Description |
|---|---|---|---|
| **1F** | Transparent base | Full-height glazed corner | Glass storefront wraps the south + east corner (like 2.jpg ground floor). Warm interior glow. The only fully transparent floor. Steel beam/fascia caps the top edge. |
| **2F** | Nearly blind | 2–3 narrow horizontal slots | Small, scattered, asymmetric. 1.5–2.5m W x 0.3m H. No pattern. Dark mass. |
| **3F** | Moderate | Glass block zone + small windows | 8.0m W x 4.0m H glass block field (warm cafe glow) + grid of smaller openings (like 2.jpg 3F with its row of windows). |
| **4F** | Dramatic carved void | L-shaped corner cut | Large corner opening wrapping south + east faces. ~6m W x 4m H on each face, meeting at corner. Reveals warm interior. The biggest facade gesture — like 2.jpg's 4F carved opening. Deep recess (1.5m). |
| **5F** | Nearly blind | 1–2 tiny slots | Almost completely sealed. One narrow horizontal slot (2.0m W x 0.3m H). Portal ring visible only through 4F→5F shadow gap glow. |
| **6F** | Glass curtain wall | Near full-width glazing | 12.0m W x 4.0m H. Fabrication theater visible. The crown glows. |

### 1F Glazed Corner Detail

> **Reference: 2.jpg ground floor.** The ground floor wraps glazing around the building's street corner (south + east), creating a warm glowing base beneath the opaque mass above.

| Parameter | Value |
|---|---|
| South face glazing | 12.0m W x 4.5m H, centered. Starts 3.0m from west edge. |
| East face glazing | 8.0m W x 4.5m H, starting from south corner. |
| Corner condition | Glass meets at corner — continuous glazing wraps 90°. No column at corner. |
| Mullions | Blackened steel, 1.5m spacing, vertical only. |
| Fascia beam | 0.3m H x full width, blackened steel, runs along top of 1F glazing. Heavy horizontal cap. |
| Entry | Within the glazed south face — 4.0m W x 4.5m H glass pivot door at center. |
| Signal Red strip | Thin emissive line (0.1m H) runs along inner top edge of entry zone. |

### 4F L-Shaped Corner Void Detail

> **Reference: 2.jpg upper floor carved opening.** The most dramatic moment on the facade. A large L-shaped opening wraps the south-east corner, cutting into two faces simultaneously. Deep recess reveals warm interior.

| Parameter | Value |
|---|---|
| South face cut | 6.0m W x 4.0m H, starting from east edge. Bottom at Z +15.5, top at Z +19.5. |
| East face cut | 6.0m W x 4.0m H, starting from south corner. Same Z range. |
| Corner | The two cuts meet at the building corner — continuous open void wrapping 90°. |
| Recess depth | 1.5m from facade plane to glass. |
| Glass | Clear glass set back 1.5m. Warm interior (checkout floor) visible. |
| Edge treatment | Raw board-formed concrete reveal on all sides of the recess. |
| Night read | Warm glow from interior floods the L-shaped recess. |

### 2F Slot Windows

| Slot | Face | Position | Size | Notes |
|---|---|---|---|---|
| 2F_A | South | X = -5.0, Z = +7.0 | 2.5m W x 0.3m H | Low position |
| 2F_B | South | X = +3.0, Z = +8.5 | 1.5m W x 0.3m H | High position — asymmetric |
| 2F_C | East | X = +8.0, Z = +6.5 | 2.0m W x 0.3m H | Side face slot |
| Material | — | — | — | Flush dark glass (near-opaque from outside) |

### 3F Glass Block Zone + Small Windows

| Element | Position | Size | Notes |
|---|---|---|---|
| Glass block field | South face, centered | 8.0m W x 4.0m H | Warm cafe glow bleeds through. Translucent, not transparent. |
| Window row | South face, above glass block | 3 openings, 1.0m W x 0.8m H each, spaced 2.5m apart | Like 2.jpg's 3F grid of smaller windows |
| Flanking slot L | South, X = -7.0, Z = +12.0 | 1.5m W x 0.3m H | Left of glass block |
| Flanking slot R | South, X = +8.0, Z = +13.0 | 1.5m W x 0.3m H | Right, different height — asymmetric |

### 5F Minimal Slots

| Slot | Face | Position | Size | Notes |
|---|---|---|---|---|
| 5F_A | South | X = +2.0, Z = +22.5 | 2.0m W x 0.3m H | The only opening. Nearly sealed. |
| 5F_E | East | centered, Z = +22.0 | 0.3m W x 3.5m H | Vertical slot. White glow from portal ring. |
| 5F_W | West | centered, Z = +22.0 | 0.3m W x 3.5m H | Matching vertical slot. |

### 6F Glass Curtain Wall

| Parameter | Value |
|---|---|
| Position | South face, centered |
| Size | 12.0m W x 4.0m H |
| Mullions | Blackened steel, 1.2m spacing, vertical |
| Interior | Fabrication theater visible (5000K, bright) |
| Bottom | Z = +25.5 |

### Shadow Slots Between Volumes

| Slot Location | Z Position | Depth | Treatment |
|---|---|---|---|
| 1F → 2F gap | Z +5.0 | 1.0m recess | Large gap (aggressive offset). Edge-lit warm LED strip (3000K). |
| 2F → 3F gap | Z +10.0 | 1.5m recess | Largest gap. Translucent glass behind. Warm cafe glow bleeds out. |
| 3F → 4F gap | Z +15.0 | 0.8m recess | Moderate gap. Dark. No light. |
| 4F → 5F gap | Z +20.0 | 1.0m recess | Cold white edge light (5000K). |
| 5F → 6F gap | Z +25.0 | 1.5m recess | Brightest slot — fabrication light from 6F bleeds down. |

> **Note:** Shadow slot depths are larger than v1 because offsets are more aggressive. The gaps between volumes are now 1.0–1.5m, making the stacking clearly legible.

### Vertical Light Seams

| Seam | Face | Position | Width | Height | Glow Color |
|---|---|---|---|---|---|
| V1 | South | X = -8.0 | 0.15m | 1F–3F (15m) | Signal Red #E94520, strength 3.0 |
| V2 | South | X = +6.5 | 0.2m | 2F–5F (20m) | Warm white #FFE0C0, strength 2.0 |
| V3 | East | Y = -8.0 | 0.15m | 3F–5F (15m) | Signal Red #E94520, strength 2.0 |
| V4 | West | Y = +4.0 | 0.2m | 4F–6F (15m) | Cold white #FFFFFF, strength 1.5 |

### Side Faces (East/West) — Summary

| Floor | East (X = +max) | West (X = -max) |
|---|---|---|
| 1F | Glazed corner (8m wrapping from south) | Opaque |
| 2F | One narrow slot (2F_C) | Opaque |
| 3F | Opaque | Opaque |
| 4F | L-shaped void wraps from south (6m) | Opaque |
| 5F | Vertical slot (0.3m x 3.5m) | Vertical slot (0.3m x 3.5m) |
| 6F | Service slot (3m x 2m) | Opaque |

### Rear Face (North) — Summary

| Floor | Opening | Notes |
|---|---|---|
| 1F | Service entrance 3.0m W x 3.5m H | Roll-up door, right side |
| 2F–5F | No openings | Fully opaque dark mass |
| 6F | Service window 3.0m W x 2.0m H | Material delivery, upper right |

---

## 6. Floor-by-Floor Program + Area

**Gross floor area per floor: 576 sqm (18m × 32m)**
**Vertical core deduction: 25 sqm (5m × 5m)**
**Column area deduction: ~1 sqm (6 columns × 0.16 sqm)**
**Net usable per floor: ~550 sqm**

---

### B1 — Event Arena (Z -5.0 to 0.0)

**Total: 576 sqm | Clear height: 4.5m | Floor: polished dark concrete | Walls: board-formed concrete**

| Zone | Area (sqm) | Dimensions | Position (center) | Material / Notes |
|---|---|---|---|---|
| Event Arena | 384 sqm | 16.0m × 24.0m | X 0.0, Y -2.0 | Open volume. Floor-embedded 1.2m × 1.2m power/data grid. 40–60 standing, 25–30 seated. Blackout capable. |
| Backstage / Storage | 72 sqm | 8.0m × 9.0m | X -5.0, Y +11.5 | Equipment staging, temporary wardrobe. Enclosed. |
| Service Corridor | 40 sqm | 2.5m × 16.0m | X +7.5, Y 0.0 | Loading access, connects to rear service entrance at grade. |
| Service Entrance | 30 sqm | 3.0m × 10.0m | X +7.0, Y +11.0 | Equipment lift, rear access. |
| Vertical Core | 25 sqm | 5.0m × 5.0m | X +6.5, Y +13.5 | Fire stair + service elevator. |
| Walls / Structure | 25 sqm | — | — | Exterior walls, column footprints. |

---

### 1F — Arrival (Z 0.0 to +5.0)

**Total: 576 sqm | Clear height: 2.4m (airlock) → 4.2m (reception) | Floor: dark poured resin | Walls: dark mineral plaster**

| Zone | Area (sqm) | Dimensions | Position | Material / Notes |
|---|---|---|---|---|
| Street Entrance Vestibule | 24 sqm | 3.0m × 8.0m | X 0.0, Y -14.0 | Recessed 1.5m from facade. Heavy pivot door, blackened steel. |
| Airlock Entry Corridor | 42 sqm | 2.0m W × 21.0m L | X -3.0 to 0.0, Y -14.0 to -2.0 | Ceiling drops to 2.4m. 15-degree bend at 10m. Dark mineral plaster. Ankle LED strip (2700K). |
| Reception / Brand Chamber | 280 sqm | 14.0m × 20.0m | X 0.0, Y +2.0 | 4.2m ceiling. DUNE.X wordmark backlit on rear wall. Single sealed Terrain Boot 01 vitrine at center. No product for sale. |
| Escalator Landing | 48 sqm | 4.0m × 12.0m | X -7.0, Y +6.0 | Arrival from 4F descent. Spatially separated from entry corridor. Walk to exit. |
| Back of House / Staff | 54 sqm | 6.0m × 9.0m | X +5.0, Y +7.0 | Staff room, storage, security. |
| Vertical Core | 25 sqm | 5.0m × 5.0m | X +6.5, Y +13.5 | Elevator + stair up to 2F, stair down to B1. |
| Walls / Circulation | 103 sqm | — | — | Airlock wall thickness, exterior walls, corridors. |

---

### 2F — Experience Zone (Z +5.0 to +10.0)

**Total: 576 sqm | Clear height: 4.0m | Floor: dark poured resin | Walls: dark mineral plaster | Ceiling: matte black acoustic panels (invisible above 3.5m)**

| Zone | Area (sqm) | Dimensions | Position | Material / Notes |
|---|---|---|---|---|
| Biodata Scanning Station | 72 sqm | 6.0m × 12.0m | X -6.0, Y -10.0 | Enclosed alcove. 1.5m scanning ring in ceiling (5000K). Force-sensing floor plate. 12 depth cameras. 45-second capture. Optional. |
| AI Visualization Wall | 96 sqm | 12.0m × 8.0m | X +2.0, Y -10.0 | 8.0m W × 3.0m H rear-projection surface. Real-time generative biodata visualization. |
| Interactive Installation | 113 sqm | 12.0m × 9.4m | X 0.0, Y +1.0 | 3.0m diameter acrylic cylinder at center. Terrain Boot 01 suspended at eye level. Holographic data projections orbit. Proximity-reactive. |
| Open Display / Circulation | 140 sqm | — | Distributed | Dark void atmosphere. Low-frequency ambient drone (40–60 Hz). |
| Transition Corridor | 48 sqm | 3.0m × 16.0m | X +5.0, Y +8.0 | Narrowing passage to stair/3F. Space compresses again. |
| Vertical Core | 25 sqm | 5.0m × 5.0m | X +6.5, Y +13.5 | Stair + elevator. |
| Walls / Structure | 82 sqm | — | — | Scanning station enclosure, partitions, exterior walls. |

---

### 3F — Cafe & Gathering (Z +10.0 to +15.0)

**Total: 576 sqm | Clear height: 4.0m | Floor: dark poured resin | Walls: dark mineral plaster | The warmest floor.**

| Zone | Area (sqm) | Dimensions | Position | Material / Notes |
|---|---|---|---|---|
| Lounge Seating | 192 sqm | 12.0m × 16.0m | X -3.0, Y -6.0 | 2.0m suspended light ring at Z +13.2 (3000K, 30% dim). Low benches (380mm seat height). Sand-cast aluminum frames, dark leather. |
| Cafe Counter + Prep | 64 sqm | 8.0m × 8.0m | X +4.0, Y -6.0 | Counter: 4.0m L × 0.8m D × 0.9m H, polished dark concrete. 3-item menu. Matte black ceramic cups. |
| Elevator Lobby | 48 sqm | 6.0m × 8.0m | X +4.0, Y +8.0 | THRESHOLD text laser-etched above door. Horizontal light line (1.2m W, 3mm thick, 4000K). Elevator: 1.2m × 1.0m cab. |
| Restroom (×2) | 40 sqm | 4.0m × 5.0m each | X -7.0, Y +10.0 | Single-occupancy. Dark mineral plaster. Vertical light slot full-height (3000K). Integrated trough sink in black stone. |
| Open Gathering | 128 sqm | — | Distributed | Flexible event/social space around lounge. |
| Vertical Core | 25 sqm | 5.0m × 5.0m | X +6.5, Y +13.5 | Elevator + stair. Stair narrows above 3F to discourage casual ascent. |
| Walls / Circulation | 79 sqm | — | — | Partitions, exterior walls, corridors. |

---

### 4F — Checkout (Z +15.0 to +20.0)

**Total: 576 sqm | Clear height: 3.8m | Floor: dark polished concrete | Walls: matte black painted gypsum (deliberate downgrade) | Skipped on ascent.**

| Zone | Area (sqm) | Dimensions | Position | Material / Notes |
|---|---|---|---|---|
| Checkout Counter | 48 sqm | 6.0m × 8.0m | X +2.0, Y -8.0 | Monolithic counter: 3.0m L × 0.8m D × 1.0m H, polished dark concrete. Embedded flush tablet display. Digital payment only. |
| Packaging Station | 56 sqm | 7.0m × 8.0m | X +2.0, Y -1.0 | Visible through low glass partition (900mm H). Branded packaging: matte black boxes, bone tissue paper, biodata certificate. 3–4 min ritual. |
| Pickup Waiting | 96 sqm | 8.0m × 12.0m | X -4.0, Y -6.0 | Two benches (sand-cast aluminum). Wall-mounted status display: real-time fabrication updates from 6F. |
| Escalator Head | 48 sqm | 4.0m × 12.0m | X -7.0, Y -12.0 | Single-run descent to 1F. Enclosed narrow shaft (1.5m W). ~90 second ride. |
| Staff Support | 72 sqm | 6.0m × 12.0m | X +4.0, Y +6.0 | Back of house. Break space, packaging material storage, comms to 6F. |
| Storage | 48 sqm | 6.0m × 8.0m | X -5.0, Y +8.0 | Product staging, incoming from 6F. |
| Vertical Core | 25 sqm | 5.0m × 5.0m | X +6.5, Y +13.5 | Elevator serves this floor on descent only. |
| Walls / Circulation | 83 sqm | — | — | Painted gypsum partitions (material discontinuity signals functional floor). |

---

### 5F — The Reveal (Z +20.0 to +25.0)

**Total: 576 sqm | Clear height: 5.0m (full void, no visible ceiling) | Floor: crushed basalt aggregate (50mm) | Walls: 270° rear-projection | The emotional peak.**

| Zone | Area (sqm) | Dimensions | Position | Material / Notes |
|---|---|---|---|---|
| Planetary Environment | 420 sqm | Full floor open plan | — | Crushed basalt floor (dark, 5–15mm aggregate). 270° rear-projection surround: abstracted dark terrain, low horizon, stars. Nearly still image. Temp: 18°C. Humidity: 35%. |
| Portal Ring (suspended) | — | 6.0m diameter torus | X 0.0, Y -2.0, Z +23.5 | White LED ring. 5500K. 8,000 lumens full intensity. Casts 5m circle of cold light below. Hero visual. Fades 0%→100% over 4s synced with elevator arrival. |
| Product Vitrines (×5) | 10 sqm | 0.5m × 0.5m × 1.0m H each | Circle beneath ring, R = 2.5m | Blackened steel pedestals. Borosilicate glass domes (300mm dia × 400mm H). Edge-lit from below (4000K). Center pedestal: 1.1m H (Terrain Boot 01). |
| Elevator Arrival Zone | 20 sqm | 4.0m × 5.0m | X +5.0, Y +10.0 | Liminal strip: elevator polished floor ends, basalt begins. The first step into the other world. |
| Accessible Path | 16 sqm | 0.9m W, ~18m L | From elevator to vitrines | Flush dark resin strip through basalt. 900mm wide. |
| Open Stair to 6F | 12 sqm | 1.5m × 8.0m | X +6.0, Y +8.0 | Open-riser blackened steel. Edge-lit white LED per tread. |
| Vertical Core | 25 sqm | 5.0m × 5.0m | X +6.5, Y +13.5 | Elevator + stair. |
| Projection / Structure | 73 sqm | — | — | Projection substrate, edge containment, exterior walls. |

**Columns C3 and C4 removed on this floor.** Transfer beam at slab level spans 12m to open the center for the portal ring.

---

### 6F — Manufacturing (Z +25.0 to +30.0)

**Total: 576 sqm | Clear height: 4.0m (gallery) / 4.5m (fabrication) | Floor: dark polished concrete + steel plate | The forge.**

| Zone | Area (sqm) | Dimensions | Position | Material / Notes |
|---|---|---|---|---|
| Robotic Fabrication Theater | 240 sqm | 15.0m × 16.0m | X 0.0, Y -8.0 | Behind 12mm laminated glass partition. KUKA KR6 6-axis robot arm on 1.5m × 1.5m steel base. Material feed system. 5000K overhead LEDs (12,000 lumens — brightest zone in building). Cycle: ~22 min per Terrain Boot 01. |
| Glass Partition | — | 16.0m W × 4.0m H | Y = 0.0, full width | 12mm laminated safety glass, anti-reflective coated. Angled 3° toward viewer. Blackened steel frame. |
| Viewing Gallery | 80 sqm | 16.0m × 5.0m | X 0.0, Y +2.5 | +200mm raised steel platform. Standing room. 50mm LED telemetry ticker along gallery rail (3.5m length). Real-time fabrication data: temp, force, layer count, %. |
| Handoff Counter | 24 sqm | 3.0m × 8.0m | X -5.0, Y +8.0 | Counter: 3.0m L × 0.8m D. 3000K warm downlight (only warm light on upper floors). Pass-through hatch 0.3m × 0.3m (pneumatic). Product arrives in sealed case. |
| Back of House | 48 sqm | 6.0m × 8.0m | X +4.0, Y +8.0 | Equipment maintenance, raw material storage, isolated HVAC (22°C, 35% RH). |
| Vertical Core | 25 sqm | 5.0m × 5.0m | X +6.5, Y +13.5 | Stair down to 5F → 4F. Descent begins. |
| Walls / Circulation | 159 sqm | — | — | Fabrication zone enclosure, service walls, exterior walls. |

---

## 7. Key Objects to Model

### Structural — Stacked Volumes

> Each floor is modeled as a **separate hollow box** (walls + slab), not one extruded shell. This allows the offset gaps to read correctly.

| Object | Geometry | Material |
|---|---|---|
| Volume_B1 | 18.0m x 32.0m x 5.0m, hollow, 0.3m walls | Board-formed dark concrete |
| Volume_1F | 18.0m x 32.0m x 5.0m, hollow, 0.3m walls | Blackened concrete panels |
| Volume_2F | 17.0m x 31.0m x 5.0m, offset (-0.5, +0.5) | Blackened concrete panels |
| Volume_3F | 17.5m x 30.0m x 5.0m, offset (+0.5, -1.0) | Blackened concrete panels |
| Volume_4F | 16.5m x 31.5m x 5.0m, offset (-0.8, +0.5) | Blackened concrete panels |
| Volume_5F | 17.0m x 30.5m x 5.0m, offset (+0.5, -0.5) | Blackened concrete panels |
| Volume_6F | 16.0m x 29.0m x 5.0m, offset (0.0, -1.5) | Blackened concrete panels |
| Floor slabs (x7) | Per-volume footprint x 0.3m thick | Dark concrete |
| Core walls | 0.3m thick, 5.0m x 5.0m, full height Z -5.0 to +30.0 | Concrete |
| Roof slab | 16.0m x 29.0m x 0.3m at Z +30.0 (6F footprint) | Dark concrete |
| Parapet | 0.3m thick x 0.5m tall on 6F volume top edge | Blackened steel |

### Facade Elements

| Object | Geometry | Material |
|---|---|---|
| 1F Glazed Corner | South: 12m W x 4.5m H glass + East: 8m W x 4.5m H glass, wrapping corner | Clear glass + blackened steel mullions |
| 1F Fascia Beam | 0.3m H steel band at top of 1F glazing, full width | Blackened steel |
| 1F Signal Strip | 0.1m H emissive line at inner top of entry zone | Signal Red emissive |
| 2F Slot Windows (x3) | 1.5–2.5m W x 0.3m H, asymmetric positions | Flush dark glass |
| 3F Glass Block Zone | 8.0m x 4.0m flat plane on south face | Glass block + warm emissive behind |
| 3F Small Windows (x3) | 1.0m W x 0.8m H, above glass block | Dark glass |
| 3F Flanking Slots (x2) | 1.5m W x 0.3m H, asymmetric heights | Flush dark glass |
| 4F L-Shaped Corner Void | South: 6m W x 4m H + East: 6m W x 4m H, wrapping corner, 1.5m deep | Board-formed concrete reveal + clear glass set back |
| 5F Slot (x1) | 2.0m W x 0.3m H south + vertical slots on E/W sides | Flush dark glass / emissive |
| 6F Glass Curtain Wall | 12.0m W x 4.0m H glass + mullions at 1.2m spacing | Clear glass + blackened steel |
| Shadow Slot planes (x4) | Horizontal emissive planes at Z +5, +10, +20, +25 | Per slot spec — warm, cold, fab bleed |
| Vertical Seam V1–V4 | Emissive planes at offset corners | Signal Red / Warm / Cold emissive |
| DUNE.X wordmark | Small, on 1F facade beside entry | Backlit emissive, Bone #E8E0D4 |

### Interior Key Pieces

| Object | Floor | Geometry | Material |
|---|---|---|---|
| 1F airlock walls | 1F | 2m W x 14m L x 2.4m H corridor | Dark mineral plaster |
| 2F scanning ring | 2F | 1.5m diameter torus, thin | Emissive white (5000K) |
| 2F acrylic cylinder | 2F | 3.0m dia x 4.0m H, hollow | Clear acrylic |
| 3F light ring | 3F | 2.0m diameter torus at Z +13.2 | Emissive warm (3000K) |
| 3F cafe counter | 3F | 4.0m x 0.8m x 0.9m | Polished dark concrete |
| 3F benches (x4) | 3F | 1.5m x 0.5m x 0.38m | Aluminum + dark leather |
| 5F portal ring | 5F | 6.0m diameter torus at Z +23.5 | Emissive white (5500K) — hero element |
| 5F vitrines (x5) | 5F | 0.5m x 0.5m x 1.0m columns | Blackened steel |
| 5F glass domes (x5) | 5F | 0.3m dia x 0.4m H hemispheres | Glass |
| 6F robot arm | 6F | Approximate KUKA KR6 | Steel / grey metal |
| 6F glass partition | 6F | 14m x 4m x 12mm | Clear glass |
| 6F viewing platform | 6F | 14m x 4m x 0.2m raised | Steel plate |

---

## 7. Materials for Blender

| Name | Hex | Roughness | Metallic | Notes |
|---|---|---|---|---|
| Void Black | #0A0A0C | 0.9 | 0.0 | Ultra-matte, absorbs light |
| Blackened Steel | #111114 | 0.6 | 0.8 | Metallic dark, slight sheen |
| Dark Mineral Plaster | #0E0E11 | 0.95 | 0.0 | Matte, micro-texture |
| Dark Concrete | #1A1A1E | 0.85 | 0.0 | Polished concrete slab |
| Dark Resin Floor | #0D0D10 | 0.3 | 0.0 | Semi-gloss, reflective |
| Crushed Basalt | #141418 | 0.95 | 0.0 | Rough aggregate texture |
| Bone | #E8E0D4 | 0.7 | 0.0 | Off-white neutral |
| Signal Red | #E94520 | 0.5 | 0.0 | Accent only — 5% max |
| Clear Glass | #FFFFFF | 0.05 | 0.0 | Transmission 0.9, IOR 1.5 |
| Sand-Cast Aluminum | #8B8B8B | 0.7 | 0.9 | Raw aluminum, cast texture |
| Dark Leather | #1C1816 | 0.8 | 0.0 | Near-black, warm undertone |

### Emissive Materials

| Name | Hex | Strength | Application |
|---|---|---|---|
| Portal White | #FFFFFF | 15.0 | 5F portal ring, 5F facade circle |
| Warm Glow | #FFE0C0 | 5.0 | 3F light ring, 1F ankle LED, shadow slots (1F→2F, 2F→3F) |
| Cold Scan | #E0EEFF | 8.0 | 2F scanning ring |
| Cold Edge | #F0F5FF | 4.0 | Shadow slot (4F→5F), vertical seam V4 |
| Fab Bleed | #F0F0FF | 6.0 | Shadow slot (5F→6F), 6F glass wall backlight |
| Signal Glow | #E94520 | 3.0 | 1F entry void top strip, vertical seams V1/V3 |
| Telemetry Red | #E94520 | 2.0 | 6F data ticker |
| Glass Block Warm | #FFE8D0 | 3.0 | Emissive plane behind 3F glass block zone |

---

## 8. Camera Positions

| View | Position | Target | Lens | Use |
|---|---|---|---|---|
| Front elevation | (0, -50, 15) | (0, 0, 15) | 50mm | Facade view |
| 3/4 perspective | (-30, -40, 20) | (0, 0, 12) | 35mm | Hero angle |
| Street level | (0, -22, 1.7) | (0, -16, 5) | 24mm | Entry approach |
| Aerial | (0, -20, 50) | (0, 0, 15) | 50mm | Bird's eye |
| 5F interior | (0, -8, 22) | (0, 0, 23.5) | 20mm | Portal ring reveal |
| 6F interior | (-3, -2, 27) | (3, -8, 27) | 28mm | Manufacturing theater |
| Section cut | (25, 0, 15) | (0, 0, 15) | 50mm | Longitudinal section |

---

## 9. Lighting Setup (Blender Scene)

| Light | Type | Position | Color | Power | Notes |
|---|---|---|---|---|---|
| Sun (key) | Sun | — | #FFF5E8 | 2.0 | 30° elevation, from front-left |
| Sky HDRI | Environment | — | Dark city night | 0.3 | Low ambient, dark mood |
| 5F portal ring | Emissive mesh | Z +23.5, center | #FFFFFF | 15.0 | Hero glow, visible from exterior |
| 3F slot glow | Emissive plane | Z +12.0, front face | #FFE0C0 | 5.0 | Warm bleed through facade slot |
| 6F interior | Area lights (x3) | Z +28.5, inside fab zone | #F0F0FF | 10.0 | Visible through glass wall |
| 1F entry | Emissive frame | Z +2.0, front face | #E94520 | 3.0 | Signal red accent |
| Ground bounce | Area light | Z -0.5, below front | #1A1A2E | 0.5 | Subtle uplight on facade |

---

## 11. Modeling Order (Recommended)

### Phase 1 — Massing (stacked volumes)
1. **Site ground plane** — 18m x 32m, dark concrete, Z = 0.0
2. **Volume_B1** — Full footprint box, Z -5.0 to 0.0
3. **Volume_1F** — Full footprint box, Z 0.0 to +5.0
4. **Volume_2F** — Offset box, Z +5.0 to +10.0
5. **Volume_3F** — Offset box, Z +10.0 to +15.0
6. **Volume_4F** — Offset box, Z +15.0 to +20.0
7. **Volume_5F** — Offset box, Z +20.0 to +25.0
8. **Volume_6F** — Offset box (smallest), Z +25.0 to +30.0
9. **Core** — Continuous vertical element through all floors
10. **Floor slabs** — One per volume, at each Z bottom

### Phase 2 — Facade articulation (2.jpg logic: each floor different, zigzag offsets)
11. **1F Glazed Corner** — Boolean cut south (12m) + east (8m) faces of 1F. Glass + mullions + fascia beam. Signal Red strip.
12. **2F Slot Windows (x3)** — 3 narrow horizontal cuts on 2F south + east, asymmetric.
13. **3F Glass Block Zone** — 8m x 4m cut on 3F south + glass block fill + 3 small windows above + 2 flanking slots.
14. **4F L-Shaped Corner Void** — Boolean cut south (6m) + east (6m) wrapping corner. 1.5m deep recess + glass set back.
15. **5F Minimal Slots** — 1 south slot + vertical slots on E/W sides.
16. **6F Glass Curtain Wall** — 12m x 4m cut + glass + mullions on 6F south face.
17. **Shadow Slot emissive planes** — Horizontal strips at each volume gap (x4).
18. **Vertical Light Seams** — 4 emissive planes at offset corners.
19. **Parapet** — Top edge of 6F volume.

### Phase 3 — Interior key objects
18. **1F airlock walls** — Dark corridor geometry
19. **2F scanning ring + acrylic cylinder**
20. **3F light ring + cafe counter + benches**
21. **5F portal ring torus** — Hero emissive element
22. **5F vitrines + glass domes**
23. **6F glass partition + robot arm + viewing platform**
24. **Columns** — Per structural grid, per floor

### Phase 4 — Materials + Lighting + Cameras
25. **Assign all materials** — Per Section 8 spec
26. **Scene lighting** — Per Section 10 spec
27. **Emissive elements** — Shadow slots, seams, portal ring, scanning ring
28. **Camera positions** — Per Section 9 spec

---

*"The building is a stack of dark rooms. Light escapes only where we let it."*

---

## 12. Reference Analysis (spatial/reference/)

### Category A — Stacked Offset Massing (PRIMARY)
**Informs: Building silhouette, volume composition**

| File | Subject | What We Take |
|---|---|---|
| 1.jpg | SANAA New Museum (photo) | Stacked offset white boxes. THE massing diagram. |
| 4.jpg | New Museum render (night, glowing) | Translucent skin, light glow between offsets. |
| d723f447 | New Museum (day, street) | Narrow urban frontage, boxes read as discrete. |
| ff652ad0 | New Museum (night, lit) | Shadow gaps glow. Ground floor transparent. |
| db09bf95 | New Museum (desert collage) | Tower-in-landscape. Alien presence. |
| e840ca93 | Japanese stacked building (dusk) | Offset boxes, warm interior glow at openings. Smaller urban scale. |
| 2.jpg | Japanese tiled stacked building | Similar offset logic, textured surface (tile grid). |
| 9cffeb8d | Lego stacked box model | Reduced diagram: opaque masses + transparent layers between. |
| b1ac583e | Abstract curved panel facade | Interlocking scroll-like forms. Softened mass composition. |
| d0ae8d78 | Ivonesio Ramos "Meteoro XIII" | Stacked white cubes as pure sculpture. |

### Category B — Dark Monolith + Light Slots (CORE MOOD)
**Informs: Facade material, light behavior, atmosphere**

| File | Subject | What We Take |
|---|---|---|
| 2d67c465 | Dark twin towers, orange light slot | Vertical light seam between dark masses. Signal glow. |
| aaa70c4d | Dark monolith, vertical amber line, water | Single controlled light emission. Monumental solitude. |
| 78ba848 | Dark concrete twin forms, warm gap | Light between heavy masses. Reflection. |
| c88681fd | Dark brutalist stack, red neon slots | Red LED accent in concrete seams. Exactly our Signal Red. |
| 1483de31 | Same language, red glow on dark mass | Entry glow, vertical seam glow. Night atmosphere. |
| a290b440 | Brutalist tower, amber vertical slots, rocks | Narrow light slits in fortress wall. Raw landscape. |
| 55878f52 | Dark corridor, red glow, parametric blocks | Interior atmosphere. Stone + data + red signal. |
| bb74ff6c | Dark ribbed pavilion, light orb | Vertical fins, controlled aperture, moon/portal. |

### Category C — Glass Block / Translucent Zones
**Informs: 3F cafe facade, translucent material**

| File | Subject | What We Take |
|---|---|---|
| 3.jpg | Glass block residential facade | Glass block grid, warm glow from within. |
| ad50bc58 | HARMAY store, full glass block facade | Monumental glass block wall, tiny entry below. Scale contrast. |
| c9fe344e | Translucent vertical fin facade | Ethereal veil over warm interior. Vertical lines. |
| c3a154a9 | Icy glass towers in dark void | Translucent stacked volumes. Otherworldly. |

### Category D — Carved / Eroded Entry
**Informs: 1F entry threshold treatment**

| File | Subject | What We Take |
|---|---|---|
| cf188c7e | Gentle Monster Seoul, eroded cave entry | Concrete mass with rough-carved entry. Brand entry as event. |
| 07a7588c | Broken concrete framing warm glass interior | Raw edge meeting refined interior. Duality. |
| fc1e742f | Raw rock + stainless display, sneakers | Geological material in retail. Primordial meets product. |
| 9af5a620 | Dark tower with rock eruption | Mass interrupted by nature. Violent revelation. |
| cfd9638e | Cube building with carved rock face | Geometric precision vs geological chaos. |
| 692691022 | Similar rock-through-tower | Interior exposed through rupture. |

### Category E — Brutalist Sculptural / Conceptual
**Informs: Volumetric ambition, material weight**

| File | Subject | What We Take |
|---|---|---|
| 625a330e | Massive concrete megastructure | Vertical articulation, monumental scale. |
| 8208979 | Interlocking concrete monument | Cantilevered offset masses. Pure concrete. |
| cad21e53 | Terraced concrete tower section | Stacked platforms with zigzag circulation visible. |
| 5aaae3f6 | Concrete box tower, many windows | Aggregated volumes. Brutalist. |
| cf01444 | Stone/rock stacked tower, warm base | Geological stacking. Building as carved earth. |
| 4abb4cb4 | Monumental concrete amphitheater | Circular forms, water, solitary figure. Scale of ritual. |
| aaf68800 | Exploded axonometric with vertical rods | Transparency diagram. Interior visible through screen. |
| e73dd71c | Sou Fujimoto stacked block model | White translucent mass. Voxel accumulation. |
| d08c90ae | Perforated screen facade, offset boxes | Patterned skin over stacked volumes. Screen as veil. |

### Category F — Retail / Fashion Reference
**Informs: Brand spatial language at street level**

| File | Subject | What We Take |
|---|---|---|
| 49d7e5c5 | Balenciaga store, dark vertical fins | Dark metal cladding, controlled translucency, logo as light. |
| cbfff3c0 | Balenciaga entry, raw concrete + dark fins | Material honesty. Industrial retail. |
| ac2db87b | Industrial atrium, LED columns | Exposed structure, digital overlay on physical. |
| b111fe75 | Lattice pavilion exterior | Dissolving boundary between inside/outside. |
| 1e1fbb62 | Same lattice interior | Light through grid. Atmospheric porosity. |

---

## Summary: What the References Change in the Blender Model

| Original Spec | Updated (Reference-Informed) |
|---|---|
| Single extruded box, 18m x 32m | **7 stacked offset volumes**, each shifted |
| Flat dark facade | **Board-formed concrete panels** with visible offset gaps |
| Simple rectangular entry | **Deep carved threshold** (2m recess, chamfered, Signal Red strip) |
| Clean horizontal light slot at 3F | **Shadow slots at every volume gap** (5 horizontal light lines) |
| No vertical seams | **4 vertical emissive seams** at misaligned corners (red + white) |
| No glass block | **3F glass block zone** (8m x 4m, warm glow) |
| Smooth monolith reads as office | **Stacked mass reads as composed sculpture** — each floor distinct |
