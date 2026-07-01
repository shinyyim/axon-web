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

Each floor is a separate box, shifted from the one below. The vertical core (rear-right) remains aligned through all floors. Offsets create shadow gaps at slab edges — 0.3m–0.8m reveal between volumes.

| Floor | X Size | Y Size | X Offset | Y Offset | Notes |
|---|---|---|---|---|---|
| B1 | 18.0m | 32.0m | 0.0 | 0.0 | Full footprint, underground — no offset |
| 1F | 18.0m | 32.0m | 0.0 | 0.0 | Full footprint, base volume. Heavy. |
| 2F | 17.0m | 31.0m | -0.5 | +0.5 | Shifts west, north. First offset visible. |
| 3F | 17.5m | 30.0m | +0.5 | -1.0 | Shifts east, south. Cafe terrace gap on north. |
| 4F | 16.5m | 31.5m | -0.8 | +0.5 | Shifts west. Narrower. Recessive. |
| 5F | 17.0m | 30.5m | +0.5 | -0.5 | Shifts east. Portal ring floor. |
| 6F | 16.0m | 29.0m | 0.0 | -1.5 | Smallest volume. Crown. Pulls south toward street. |

> **Blender rule:** Model each floor as a separate box object (Wall_1F, Wall_2F, etc.) — NOT one extruded volume. The offset gaps between them are key to the silhouette.

### Floor Elevations (top of slab)

| Floor | Z Bottom | Z Top | Clear Height |
|---|---|---|---|
| B1 | -5.0 | 0.0 | 4.5m (exposed structure) |
| 1F | 0.0 | +5.0 | 2.4m (airlock) / 4.2m (reception) |
| 2F | +5.0 | +10.0 | 4.0m |
| 3F | +10.0 | +15.0 | 4.0m |
| 4F | +15.0 | +20.0 | 3.8m |
| 5F | +20.0 | +25.0 | 5.0m (full void, no ceiling) |
| 6F | +25.0 | +30.0 | 4.0m |

### Floor Area

| Floor | Gross Area | Usable Area |
|---|---|---|
| B1 | 576 sqm | ~550 sqm |
| 1F | 576 sqm | ~520 sqm |
| 2F | 527 sqm | ~500 sqm |
| 3F | 525 sqm | ~498 sqm |
| 4F | 520 sqm | ~493 sqm |
| 5F | 519 sqm | ~492 sqm |
| 6F | 464 sqm | ~437 sqm |
| **Total GFA** | **3,707 sqm** | **~3,390 sqm** |

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

## 5. Facade — Stacked Dark Mass with Light Slots

> **Reference direction:** Dark brutalist concrete/steel volumes (not smooth — board-formed texture). Light escapes only through controlled slots between the stacked volumes and through carved openings. Red/Signal accent glow at entry and vertical seams. The building reads as one dark mass from a distance, but up close reveals gaps, shifts, and emissive cracks.

### Facade Principle

1. **Each floor volume is clad independently** — when volumes offset, the gap between them becomes a **shadow slot** (0.3–0.8m deep reveal). Some slots are open air, some are glazed with translucent glass behind.
2. **Vertical light seams** — at corners where volumes misalign, narrow vertical slots (0.15–0.3m wide) run floor-to-floor. These emit warm or red glow from interior, referencing the dark-monolith-with-red-slots images.
3. **Ground level is carved, not cut** — the entry is a deep, tall recess with rough-edged walls (Gentle Monster reference). Not a clean rectangle.

### Material: Primary

| Surface | Material | Color (hex) | Texture |
|---|---|---|---|
| Primary cladding | Blackened concrete panels | #111114 | Board-formed texture, 150mm plank width |
| Volume edges | Blackened steel plate | #0E0E11 | Smooth, 6mm plate, reveals at slab lines |
| Shadow slot lining | Dark mineral plaster | #0A0A0C | Matte, recessed |
| Parapet cap | Blackened steel | #111114 | Folded 3mm plate |

### Shadow Slots Between Volumes

Where floor volumes offset, the gap between the upper and lower wall creates a horizontal shadow reveal. These are the "breathing lines" of the building.

| Slot Location | Z Position | Depth | Treatment |
|---|---|---|---|
| 1F → 2F gap | Z +5.0 | 0.5m recess | Open shadow. Edge-lit warm LED strip (3000K, 0.3m W). |
| 2F → 3F gap | Z +10.0 | 0.8m recess | Translucent glass panel behind. Warm glow bleeds out from cafe. |
| 3F → 4F gap | Z +15.0 | 0.3m recess | Minimal gap. Dark. No light. 4F is recessive. |
| 4F → 5F gap | Z +20.0 | 0.5m recess | Cold white edge light (5000K). Transition to reveal floor. |
| 5F → 6F gap | Z +25.0 | 0.8m recess | Brightest slot — fabrication light from 6F bleeds down. |

### Vertical Light Seams (facade corners where volumes misalign)

| Seam | Face | X/Y Position | Width | Height | Glow Color |
|---|---|---|---|---|---|
| V1 | Front (south) | X = -8.5 | 0.15m | 1F–3F (15m) | Signal Red #E94520, strength 3.0 |
| V2 | Front (south) | X = +7.0 | 0.2m | 2F–5F (20m) | Warm white #FFE0C0, strength 2.0 |
| V3 | East side | Y = -8.0 | 0.15m | 3F–5F (15m) | Signal Red #E94520, strength 2.0 |
| V4 | West side | Y = +4.0 | 0.2m | 4F–6F (15m) | Cold white #FFFFFF, strength 1.5 |

> **Blender:** Model seams as thin emissive planes (0.15–0.2m wide) recessed 0.1m behind facade surface. They should appear as glowing cracks in the dark mass.

### Facade Openings — Front Face (South, Y = -16.0)

| Element | Position | Size | Description |
|---|---|---|---|
| **1F Entry Void** | Center-bottom | 4.0m W x 5.0m H | Deep recessed threshold (2.0m deep). Walls angle inward slightly (3° taper). Inner surfaces: raw board-formed concrete. Signal Red (#E94520) emissive strip runs along inner top edge (4.0m x 0.1m). Bottom at Z 0.0, top at Z +5.0. Carved quality — not a clean rectangle. Chamfer the top corners 0.5m at 45°. |
| **2F–3F Shadow Gap** | Full width of overlap zone | ~16m W x 0.3m H | Horizontal translucent glass strip at Z +10.0. Warm cafe glow (3000K) visible through frosted glass. |
| **5F Portal Circle** | Center | 6.0m diameter | Circular glazed opening cut through facade volume. Reveals internal portal ring. Emissive white glow. Center at Z +22.5. The circle slightly breaks into the 4F→5F shadow slot, creating a continuous vertical reading. |
| **6F Glass Wall** | Near full width | 14.0m W x 4.0m H | Floor-to-ceiling glazing. Blackened steel vertical mullions at 1.4m spacing. Fabrication light (5000K, bright) visible from street. Bottom at Z +25.5. |

### Facade Openings — Side Faces (East/West, X = ±9.0)

| Element | Position | Size | Notes |
|---|---|---|---|
| No windows | 1F–3F | Fully opaque | Dark mass. |
| Narrow vertical slot | 4F, west face | 0.3m W x 3.0m H | Warm glow. |
| Narrow vertical slot | 5F, both sides, centered | 0.3m W x 3.5m H | White glow from portal floor. |
| Service door | 1F, rear-east | 2.0m W x 3.0m H | Flush, blackened steel. |

### Facade Openings — Rear Face (North, Y = +16.0)

| Element | Position | Size | Notes |
|---|---|---|---|
| Service entrance | 1F, right side | 3.0m W x 3.5m H | Roll-up door, blackened steel. |
| 6F service window | Upper right | 3.0m W x 2.0m H | Material delivery. Opaque when closed. |
| No other openings | — | — | Fully opaque dark mass. |

### Glass Block Zone (Optional — 3F Cafe, South Face)

> **Reference: HARMAY glass block facade.** Consider replacing a portion of the 3F south facade (below the 2F→3F shadow slot) with glass blocks — 8.0m W x 4.0m H zone. The glass blocks would glow warm from the cafe interior, creating a translucent field in the otherwise opaque mass. Model as a flat plane with glass block material (semi-transparent, slight green tint, IOR 1.5).

| Parameter | Value |
|---|---|
| Position | 3F south face, centered |
| Size | 8.0m W x 4.0m H |
| Glass block unit | 0.2m x 0.2m x 0.08m |
| Material | Clear glass, transmission 0.6, slight green tint #E8F0E8 |
| Interior glow | Warm emissive plane behind (3000K, strength 3.0) |

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
| Entry Void | 4.0m W x 5.0m H x 2.0m deep recess, chamfered top corners | Board-formed concrete + Signal Red emissive strip on inner top |
| Shadow Slot planes (x5) | Horizontal emissive planes at Z +5, +10, +15, +20, +25 | Per slot spec — warm, cold, or dark |
| Vertical Seam V1 | 0.15m x 15m emissive plane, recessed 0.1m | Signal Red emissive |
| Vertical Seam V2 | 0.2m x 20m emissive plane, recessed 0.1m | Warm white emissive |
| Vertical Seam V3 | 0.15m x 15m emissive plane | Signal Red emissive |
| Vertical Seam V4 | 0.2m x 15m emissive plane | Cold white emissive |
| 3F Glass Block Zone | 8.0m x 4.0m flat plane on south face | Glass block material + warm emissive behind |
| 5F Portal Circle | 6.0m diameter boolean cut + glass fill | Glass + white emissive glow |
| 6F Glass Wall | 14.0m x 4.0m glass + 10 vertical steel mullions | Clear glass + blackened steel |
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

### Phase 2 — Facade articulation
11. **Entry Void** — Boolean cut + recess on 1F south face
12. **5F Portal Circle** — Boolean cut on 5F south face
13. **6F Glass Wall** — Boolean cut + glass fill on 6F south face
14. **Shadow Slot emissive planes** — Horizontal strips at each volume gap
15. **Vertical Light Seams** — 4 emissive planes at offset corners
16. **3F Glass Block zone** — Replace portion of 3F south wall
17. **Parapet** — Top edge of 6F volume

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
