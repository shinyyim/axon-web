# DUNE.X — MATERIALS AND FABRICATION TECHNOLOGY

## Computational Craft Specification

---

## Philosophy

Every material in the DUNE.X system is chosen for a reason that can be stated in one sentence. No material is decorative. No finish is cosmetic. The construction is the aesthetic — if a seam is welded instead of stitched, it is because a weld is stronger, waterproof, and visually cleaner. If a surface is translucent, it is because the structure beneath is worth seeing.

The digital is visible. The process is the product.

---

## Primary Materials

### 1. Thermoplastic Polyurethane (TPU)

The defining material of DUNE.X. Used across three applications: 3D-printed lattice structures, thermoformed membrane films, and injection-molded components.

| Property | Value | Test Standard |
|---|---|---|
| Shore hardness | 85A–95A (adjustable per application) | ASTM D2240 |
| Tensile strength | 30–50 MPa | ASTM D638 |
| Elongation at break | 400–600% | ASTM D638 |
| Tear strength | 80–120 kN/m | ASTM D624 |
| Operating temperature | -30C to +80C | — |
| Density | 1.12–1.21 g/cm3 | ASTM D792 |
| UV resistance | Moderate (requires UV stabilizer for Bone colorway) | — |

**Application matrix:**

| Application | Form | Process | Products |
|---|---|---|---|
| Lattice sole | Powder (SLS) | Selective laser sintering | Terrain Boot 01 |
| Structural lattice panels | Powder (SLS) | Selective laser sintering | Transit Shell 01 |
| Outer membrane film | Film (0.3–0.4mm) | Thermoforming (vacuum) | Terrain Boot 01, Transit Shell 01 |
| Zipper teeth | Molded | Injection molding | Transit Shell 01, Transit Pack 01 |

**Colorway behavior:**
- **Void (black):** Carbon-pigmented TPU. Opaque at thick sections, slightly translucent at thin walls (<0.8mm). Matte micro-texture finish. UV-stable.
- **Bone (off-white):** Natural TPU with minimal pigment. Semi-translucent at all thicknesses — light passes through, creating internal glow at thin-wall cells. Requires UV stabilizer additive to prevent yellowing. Smooth finish.

### 2. Glass-Filled Nylon (PA12-GF)

Structural rigidity material. Used where the product needs a skeleton.

| Property | Value | Test Standard |
|---|---|---|
| Tensile strength | 80–100 MPa | ASTM D638 |
| Flexural modulus | 5,500–7,000 MPa | ASTM D790 |
| Impact resistance (Charpy) | 8–12 kJ/m2 | ISO 179 |
| Heat deflection temp | 175C (at 0.45 MPa) | ASTM D648 |
| Density | 1.35–1.45 g/cm3 | ASTM D792 |
| Glass fiber content | 30% by weight | — |
| Surface finish | Matte, slight fiber texture | — |

**Application matrix:**

| Application | Process | Products |
|---|---|---|
| Structural cage (boot exoskeleton) | Injection molding | Terrain Boot 01 |
| Visor frame | Injection molding | Visor 01 |

### 3. Computational Knit (Polyester/Elastane)

Engineered textile produced on flat-bed knitting machines with zone-programmable density.

| Property | Value | Notes |
|---|---|---|
| Composition | 87% polyester, 13% elastane | — |
| Weight range | 120–260 g/m2 (variable by zone) | Programmed per product spec |
| Stretch (warp) | 15–30% | Varies by zone density |
| Stretch (weft) | 20–40% | Varies by zone density |
| Moisture wicking | Capillary channel fiber, <4 second transfer | AATCC 195 modified |
| Breathability | 12–18 RET (depending on zone density) | ISO 11092 |

**Zone programming:**
The knitting machine receives a zone map — a 2D pattern file that specifies knit density, stitch type, and yarn composition at every point on the textile. Dense zones provide structural support. Open zones provide ventilation. The transition between zones is gradual — no hard seams, no stitched panels. A single continuous fabric with spatially varying properties.

**Application matrix:**

| Application | Products | Zone Count |
|---|---|---|
| Boot upper interior layer | Terrain Boot 01 | 6 zones |
| Shell contact layer (L4) | Transit Shell 01 | 8 zones |
| Base layer (full garment) | Signal Layer 01 | 12 zones |

### 4. Aerogel-Composite Insulation

Space-grade thermal insulation adapted for garment use.

| Property | Value | Notes |
|---|---|---|
| Thermal conductivity | 0.015 W/mK | Comparable to NASA aerogel blankets |
| Weight | 80–120 g/m2 (at 10mm thickness) | Extremely light for thermal performance |
| Thickness range | 4–12mm (variable by thermal zone) | Set per customer thermal map |
| Compression recovery | 90% after 50% compression | — |
| Moisture resistance | Hydrophobic matrix — does not absorb water | — |
| Composition | Aerogel microspheres in polyester fiber matrix | Quilted between two thin scrim layers |

**Application:** Transit Shell 01 only (L3 insulation layer). Thickness mapped to customer thermal profile.

### 5. EVA Foam (Ethylene-Vinyl Acetate)

Internal comfort material. Used where the product contacts the body under sustained pressure.

| Property | Soft Layer (Open-Cell) | Structural Layer (Closed-Cell) |
|---|---|---|
| Shore hardness | 25C | 45C |
| Density | 0.08 g/cm3 | 0.15 g/cm3 |
| Compression set | 30% (after 25% compression, 72hr) | 15% (after 25% compression, 72hr) |
| Thickness | 4mm | 8mm |
| Process | Die-cut | CNC-milled from biodata profile |

**Application:** Terrain Boot 01 insole (dual-density), Transit Pack 01 back panel and shoulder straps.

### 6. Ripstop Nylon (420D, TPU-Laminated)

Durable textile for standard (non-custom) products.

| Property | Value | Notes |
|---|---|---|
| Denier | 420D | Balance of weight and durability |
| Weave | Ripstop (reinforced grid pattern) | Prevents tear propagation |
| Lamination | TPU film (0.1mm) on exterior face | Weather resistance, sealed surface |
| Tear strength | 45 N (warp), 40 N (weft) | ISO 13937 |
| Water column | 5,000mm | With lamination |
| Weight | 160 g/m2 (with lamination) | — |

**Application:** Transit Pack 01 (all exterior panels), Specimen Container 01 interior accessories.

### 7. Polycarbonate

Impact-resistant thermoplastic for hard-shell components.

| Property | Value | Test Standard |
|---|---|---|
| Tensile strength | 55–75 MPa | ASTM D638 |
| Impact resistance (Izod) | 600–850 J/m | ASTM D256 |
| Transparency | Up to 90% VLT (clear) | — |
| Heat deflection temp | 130C (at 0.45 MPa) | ASTM D648 |
| Density | 1.20 g/cm3 | — |

**Application:** Specimen Container 01 (shell), Visor 01 (lens).

### 8. Sand-Cast Aluminum

All DUNE.X hardware is sand-cast aluminum — a process that produces objects with a slightly textured surface, visible grain, and material honesty. The casting process is deliberately chosen over CNC machining for its raw, handcraft quality.

| Property | Value | Notes |
|---|---|---|
| Alloy | A356 (Al-Si-Mg) | Good castability, corrosion resistance |
| Tensile strength | 230 MPa (T6 heat treated) | — |
| Density | 2.68 g/cm3 | — |
| Surface | As-cast with light bead-blast finish | Not polished — retains casting character |
| Finish (Void) | Black anodized (Type II, 15 micron) | — |
| Finish (Bone) | Natural anodized (Type II, clear) | Reveals aluminum grain |

**Application matrix:**

| Component | Products | Weight per Unit |
|---|---|---|
| Eyelet rings (boot lacing) | Terrain Boot 01 | 2g each (8 per pair) |
| Zipper pull | Transit Shell 01 | 8g |
| Cord lock | Transit Shell 01, Transit Pack 01 | 4g each |
| Roll-top buckle | Transit Pack 01 | 12g |
| Sternum clip | Transit Pack 01 | 6g |
| Compression latch | Specimen Container 01 | 14g |
| Hinge pins | Specimen Container 01 | 3g each (2 per unit) |
| DUNE.X period mark sticker | Terrain Boot 01 (packaging) | 4g |

### 9. Dyneema Lacing

Ultra-high-molecular-weight polyethylene cord. The strongest fiber per unit weight available.

| Property | Value |
|---|---|
| Tensile strength | 3.5 GPa |
| Diameter | 2.5mm (waxed) |
| Weight | 0.97 g/m |
| Stretch | <1% at working load |
| UV resistance | Moderate (waxed coating provides additional protection) |
| Color | Black (Void), off-white (Bone) |

**Application:** Terrain Boot 01 lacing system.

---

## Fabrication Methods

### 1. Selective Laser Sintering (SLS)

The primary 3D printing process for all DUNE.X lattice structures.

**Process:**
1. TPU powder is spread in a thin layer (0.1mm) across the build platform
2. A CO2 laser selectively fuses powder particles at points defined by the .STL geometry
3. The platform lowers 0.1mm, a new powder layer is spread, and the laser fuses the next cross-section
4. This repeats for 800–1,200 layers per sole (depending on height)
5. The build chamber cools for 8–12 hours (critical for dimensional accuracy in TPU)
6. The part is excavated from unfused powder, which is recycled

**Specifications:**

| Parameter | Value |
|---|---|
| Layer height | 0.1mm |
| Laser spot size | 0.3mm |
| Build chamber temperature | 110C (TPU sintering) |
| Cooling time | 8–12 hours |
| Build volume (per machine) | 380 x 284 x 380mm |
| Parts per build (soles) | Up to 6 pairs |
| Surface finish | Slightly granular (inherent to SLS) — post-processed with bead blasting |
| Minimum wall thickness | 0.6mm (for TPU lattice) |
| Dimensional accuracy | +/- 0.2mm |

**Equipment at 6F:** 2 x industrial SLS printers (EOS P 396 class or equivalent). Capacity: 12 pairs of soles per day, or 6 pairs of soles + 4 sets of Transit Shell lattice panels.

### 2. Thermoforming (Vacuum)

Used to shape TPU membrane films over 3D surfaces (foot lasts, body form molds).

**Process:**
1. TPU film sheet (0.3–0.4mm) is clamped in a frame
2. Film is heated to 160–180C (softening point)
3. Heated film is draped over the form (foot last or torso mold section)
4. Vacuum pulls film tight against form surface, conforming to every contour
5. Film cools and retains the 3D shape
6. Excess material trimmed by laser or blade

**Specifications:**

| Parameter | Value |
|---|---|
| Film thickness | 0.3mm (shell), 0.4mm (boot) |
| Heating temperature | 160–180C |
| Vacuum pressure | -0.8 bar |
| Cycle time | 3–5 minutes per form |
| Minimum feature radius | 2mm |
| Dimensional accuracy | +/- 0.5mm |

### 3. RF Welding (Radio Frequency Welding)

The seam-sealing method for all TPU membrane panels. No thread. No adhesive. Thermoplastic molecular bond.

**Process:**
1. Two TPU panels are overlapped by 15mm at the seam line
2. An RF die (shaped to the seam geometry) is pressed against the overlap
3. Radio frequency electromagnetic field (27.12 MHz) excites the TPU molecules, generating internal heat
4. The TPU softens and fuses at the interface (molecular bond)
5. Pressure maintained during cooling (3-second cycle)
6. Bond is permanent, waterproof, and airtight

**Specifications:**

| Parameter | Value |
|---|---|
| Frequency | 27.12 MHz |
| Overlap width | 15mm |
| Bond strength | 18 N/mm (exceeds stitched seam by ~40%) |
| Cycle time | 3 seconds per seam segment |
| Waterproof rating | 10,000mm water column |
| Seam profile | 1.5mm proud of surface (visible as a smooth ridge) |
| Minimum seam radius | 5mm (curved seams possible) |

**Equipment at 6F:** 1 x RF welding station with custom die library (dies are CNC-machined for each panel configuration; frequently used configurations are stocked, unique configurations are machined on-demand).

### 4. Ultrasonic Bonding

Used to bond internal layers without penetrating the outer membrane.

**Process:**
1. Layers are aligned on a jig
2. An ultrasonic horn (sonotrode) is pressed against the material stack at each bond point
3. High-frequency vibration (20 kHz) generates frictional heat at the layer interfaces
4. Materials fuse at the contact point (2–4mm diameter bond)
5. Horn retracts. Bond cools in <1 second.

**Specifications:**

| Parameter | Value |
|---|---|
| Frequency | 20 kHz |
| Bond diameter | 2–4mm per point |
| Bond strength | 12 N/mm (sufficient for layer registration) |
| Cycle time | 0.5 seconds per bond point |
| Layer compatibility | TPU, polyester, EVA, nylon |

### 5. Computational Knitting

Flat-bed knitting with digitally programmed zone maps.

**Process:**
1. Zone map (.DXF file) is loaded into knitting machine software
2. Machine programs yarn feeders, needle selection, and stitch type per zone
3. Fabric is knitted in a single pass — no seaming, no panel assembly for the knit layer itself
4. Complete fabric piece is removed from machine, steamed, and trimmed

**Specifications:**

| Parameter | Value |
|---|---|
| Machine gauge | 18 gauge (18 needles per inch) |
| Working width | 1,800mm (sufficient for full torso or boot upper) |
| Zone resolution | 5mm minimum zone boundary |
| Yarn capacity | 8 yarn feeders (enables multi-density and multi-fiber programming) |
| Output speed | ~1 m2 per hour |

**Equipment at 6F:** 1 x flat-bed knitting machine (Stoll or Shima Seiki class). Used for boot upper inner layers, shell contact layers, and Signal Layer 01.

### 6. CNC Milling (3-Axis)

Used for precision shaping of EVA insoles and Visor 01 fit adjustments.

**Process:**
1. EVA foam block (or nylon frame blank) is clamped in the machine
2. 3-axis CNC follows toolpath generated from biodata profile
3. Material is removed by rotating cutter to achieve desired contour
4. Finished part is cleaned and inspected

**Specifications:**

| Parameter | Value |
|---|---|
| Working volume | 400 x 200 x 100mm |
| Positional accuracy | +/- 0.05mm |
| Surface finish | Smooth (EVA), tool-marked then finished (nylon) |
| Cycle time | 20 minutes per insole, 15 minutes per visor frame trim |

### 7. Injection Molding

Used for standard (non-custom) structural components produced in volume.

**Products:** Structural cage (boot), Visor frame, Specimen Container shell, zipper teeth.

These components are not produced on-site at 6F — they are manufactured at partner facilities and stocked at the flagship. Injection molding requires dedicated tooling (molds), making it efficient for standard components but not suitable for custom geometry.

### 8. Sand Casting (Aluminum Hardware)

Small-batch casting for all DUNE.X metal hardware.

**Process:**
1. Master patterns (3D-printed in resin) are pressed into sand to create mold cavities
2. Molten aluminum (A356, 660C) is poured into the sand mold
3. Aluminum solidifies and sand mold is broken away
4. Castings are cleaned, deburred, heat-treated (T6), and surface-finished
5. Anodizing: Type II anodize for corrosion resistance and color (black or clear)

**Specifications:**

| Parameter | Value |
|---|---|
| Minimum wall thickness | 2mm |
| Surface finish | As-cast with light bead blast (retains casting grain) |
| Minimum feature size | 1mm |
| Batch size | 50–200 units per mold set |
| Lead time | 5–7 days per batch |

Hardware is not produced on-site. Batches are cast at a partner foundry and stocked at the flagship.

---

## 6F Manufacturing Floor Layout

All custom manufacturing occurs at 6F of the flagship store. The floor is both production facility and experience — customers observe their product being made through full-height glass viewing panels.

| Station | Equipment | Output |
|---|---|---|
| Print bay | 2 x SLS 3D printers + cooling chamber | Lattice soles, structural panels |
| Post-processing | Powder extraction cabinet, bead-blast booth | Cleaned SLS parts |
| Knitting station | 1 x flat-bed knitting machine | Boot uppers, shell contact layers |
| Thermoform station | 1 x vacuum thermoformer + film heater | TPU membrane forming |
| Welding station | 1 x RF welder + 1 x ultrasonic bonder | Sealed seams, layer bonding |
| CNC station | 1 x 3-axis CNC mill | Insoles, visor frame adjustments |
| Assembly bench | Manual assembly with precision jigs | Final product assembly |
| QC station | Dimensional inspection tools, flex test rig | Quality verification |
| Packaging | Specimen Container stock, garment bags, cards | Customer-ready product |

**Floor area:** ~400 sqft (within the 6F footprint)
**Staff:** 2 technicians per shift, cross-trained on all stations
**Capacity:** 6–8 custom products per day (mix of boots, shells, visors)
**Viewing:** Full-height glass on one face of the production bay. Customers at 6F see the machines, the materials, the process. The manufacturing is the final experience — you watch your product emerge from data into matter.

---

## Material Sustainability Notes

- **TPU:** Recyclable. SLS powder that is not sintered (approximately 40% per build) is sieved and reused in subsequent builds, with up to 50% recycled content. End-of-life TPU components can be granulated and reprocessed.
- **Nylon (PA12-GF):** Recyclable with fiber separation. End-of-life components can be returned to DUNE.X for granulation.
- **Polyester/Elastane knit:** Standard textile recycling pathways. DUNE.X accepts used knit components for fiber recovery.
- **Aerogel-composite:** Not currently recyclable. Research ongoing for aerogel recovery processes. Lifespan: 5+ years before insulation degradation.
- **EVA foam:** Recyclable via granulation. Returned insoles are granulated and used as filler material in non-critical applications.
- **Aluminum hardware:** Infinitely recyclable. All DUNE.X aluminum is sourced from minimum 30% recycled content.
- **Polycarbonate:** Recyclable via granulation.

DUNE.X operates a return program for all products. Worn-out or damaged pieces can be returned to the flagship for material recovery. The boot's lattice sole is ground into TPU pellets. The shell's membrane is reprocessed into new film. Nothing is discarded if it can be reprocessed. The data survives. The material cycles.
