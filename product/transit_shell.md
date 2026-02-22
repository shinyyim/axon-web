# DUNE.X — TRANSIT SHELL 01

## Outerwear Specification

---

## Product Identity

| Field | Detail |
|---|---|
| **Product Name** | TRANSIT SHELL 01 |
| **Collection** | DEPARTURE 001 |
| **Category** | Outerwear (Jacket) |
| **Designation** | Custom (biodata-driven) |
| **Price** | $680–840 (varies by panel complexity and membrane configuration) |
| **Colorways** | Void, Bone |
| **SKU Format** | DX-TS01-[UNIT ID] |

---

## Concept

A jacket that knows the body before it covers it.

Transit Shell 01 is a 4-layer adaptive composite outerwear piece engineered from biodata. A structured-light 3D body scan, range-of-motion capture, and infrared thermal map produce a complete profile of the wearer's torso architecture — shoulder geometry, arm arc, spinal curvature, heat generation zones, mobility constraints. AI translates this into panel cut, membrane thickness, articulation placement, and ventilation mapping.

The result is a shell that moves with precision because it was computed from the movement itself. Sealed seam architecture derived from pressure vessel engineering. A transparent outer membrane that reveals the structural lattice beneath. Collar geometry that accounts for helmet interface clearance.

Not a jacket. A second architecture for the torso.

---

## Construction Architecture

### Layer System

Transit Shell 01 is a 4-layer composite. Each layer performs a discrete structural or environmental function.

| Layer | Material | Thickness | Function |
|---|---|---|---|
| **L1: Outer Membrane** | TPU film, thermoformed | 0.3mm | Weather barrier, visual identity, transparency |
| **L2: Structural Lattice** | 3D-printed TPU lattice panels | 3–8mm (variable) | Impact distribution, structural rigidity at key zones |
| **L3: Adaptive Insulation** | Aerogel-composite quilted panels | 4–12mm (variable by thermal map) | Thermal regulation, thickness mapped to heat loss zones |
| **L4: Contact Layer** | Computational knit, moisture-wicking | 0.8mm | Skin contact, moisture management, comfort |

Total material thickness (compressed): 8.1–21.1mm depending on zone.

### L1: Outer Membrane

The outermost surface. The shell that gives the jacket its name.

- **Material:** TPU film, 0.3mm, thermoformed to body scan profile
- **Transparency:** 50–70% visible light transmission (varies by stretch state)
- **Surface:** Micro-matte finish, anti-fingerprint coating
- **Sealing:** All panel joints RF-welded (radio frequency welding). No stitching penetrates the outer membrane. Every seam is a continuous thermoplastic bond — waterproof, airtight at the surface.
- **Panel count:** 23 panels (biodata determines panel boundary placement)

**What biodata controls:**
- Panel seam placement follows body contour lines derived from 3D scan — seams align with natural crease lines, avoiding pressure points under load
- Panel size varies: larger panels over flat surfaces (upper back, chest), smaller panels at articulation zones (shoulder cap, elbow, underarm)

**What stays fixed:**
- Total panel count (23)
- RF welding process
- Material specification (0.3mm TPU)
- Transparency range

### L2: Structural Lattice

The skeleton visible through the transparent membrane. This is the architectural identity of the Transit Shell — the lattice structure that makes the jacket read as engineered object, not fabric.

- **Material:** TPU, SLS 3D-printed (same process as Terrain Boot sole)
- **Architecture:** Voronoi-tessellated lattice panels at 6 structural zones
- **Panel placement:** Shoulder caps (2), upper back (1), chest plates (2), lumbar (1)
- **Cell size:** 6–14mm (varies by zone and individual body geometry)
- **Thickness:** 3mm at chest, 5mm at shoulder, 8mm at lumbar

**What biodata controls:**
| Body Parameter | Lattice Response |
|---|---|
| Shoulder width and slope | Shoulder cap panel dimensions and cell gradient |
| Spinal curvature (kyphosis/lordosis) | Lumbar panel contour and cell density |
| Chest depth | Chest plate panel curvature radius |
| Range of motion (shoulder flexion) | Cell orientation at shoulder/chest boundary — aligns with movement arc |

**Design intent:**
The lattice panels are visible through L1. They appear as geometric structure beneath a translucent skin — the body's second skeleton. Under edge light, the lattice casts internal shadows that shift as the wearer moves. The jacket reveals its engineering at every angle.

### L3: Adaptive Insulation

Thermal regulation mapped to the body's own heat output.

- **Material:** Aerogel-composite quilted panels (aerogel microspheres in polyester matrix)
- **Thermal performance:** 0.015 W/mK thermal conductivity (comparable to space-grade insulation)
- **Thickness variation:** 4mm at high-heat zones (underarm, mid-back) to 12mm at high-loss zones (shoulders, lower chest, collar)
- **Quilting pattern:** Computational — quilt line positions determined by thermal map boundaries

**What biodata controls:**
Infrared thermal scan of the torso (captured during 2F scanning session, 30-second hold in controlled ambient) produces a surface heat map. AI segments the torso into 12 thermal zones and maps insulation thickness to heat-loss gradient:

| Thermal Zone | Typical Heat Output | Insulation Thickness |
|---|---|---|
| Underarm | High (skin temp 35.5-36.5C) | 4mm (minimal — avoid overheating) |
| Mid-back | High (skin temp 35.0-36.0C) | 5mm |
| Shoulder cap | Low (skin temp 33.0-34.0C) | 10mm |
| Lower chest | Low (skin temp 33.5-34.5C) | 9mm |
| Collar/neck | Variable | 8–12mm (defaults to higher insulation) |
| Lumbar | Medium (skin temp 34.0-35.0C) | 7mm |

### L4: Contact Layer

The layer that touches skin. Engineered for moisture transport and comfort.

- **Material:** Computational knit — polyester/elastane blend (87/13)
- **Weight:** 140–180 g/m2 (varies by zone)
- **Zones:** High-ventilation (underarm, mid-back), high-contact (shoulder, chest), low-friction (collar, cuff)
- **Knit structure:** Warp-knit with open mesh at ventilation zones, dense jersey at contact zones
- **Moisture wicking:** Capillary channel fiber — moves moisture from skin to L3 surface in <4 seconds

---

## Seam Architecture

No thread passes through Transit Shell 01. Every structural join uses one of two thermal bonding methods:

### RF Welding (Outer Membrane)

- **Process:** Radio frequency electromagnetic field heats TPU at panel overlap (15mm overlap, 3-second weld cycle)
- **Bond strength:** 18 N/mm (exceeds stitched seam by 40%)
- **Waterproof rating:** 10,000mm water column at seam
- **Visual:** Seam reads as a smooth, slightly raised ridge — 1.5mm proud of surface. Under light, the seam line creates a subtle grid across the jacket. The geometry of the body, drawn in thermoplastic bonds.

### Ultrasonic Bonding (Internal Layers)

- **Process:** High-frequency vibration (20kHz) fuses L2/L3/L4 at contact points
- **Bond points:** 84 per jacket (positions determined by body scan for panel alignment)
- **Purpose:** Locks internal layers in registration — prevents shifting during movement
- **Visual:** Not visible from outside. Internal bond points are marked with embossed period marks (the DUNE.X dot).

---

## Collar Geometry

The collar is not decorative. It is an interface.

- **Height:** 85mm from shoulder seam to collar peak
- **Profile:** Asymmetric — higher at rear (95mm) for cervical coverage, lower at front (75mm) for chin clearance
- **Internal diameter at peak:** Computed from 3D neck scan to allow 15mm clearance on all sides
- **Helmet interface:** Collar geometry is designed to sit inside a pressure suit helmet ring without bunching or interference. The collar tapers at a 12-degree angle to nest inside a 300mm-diameter helmet neck ring (standard ISS EVA suit dimension).
- **Closure:** Magnetic — 4 neodymium magnets concealed in collar fold, 2.8 kg pull force total. Collar opens flat for donning, snaps closed magnetically.

This is not theatrical. It is specification. If the wearer transitions to a pressure suit, the collar is already compatible.

---

## Articulation

Transit Shell 01 moves because its joints were computed from how the wearer actually moves.

### Range-of-Motion Mapping

During the 2F scanning session, the customer performs 6 articulation tests:

| Movement | Measured | Applied To |
|---|---|---|
| Shoulder flexion (arms raised forward 180 degrees) | Maximum arc angle, scapular movement | Shoulder panel boundary placement, underarm gusset depth |
| Shoulder abduction (arms raised laterally) | Lateral arc, deltoid engagement | Lateral panel stretch zone width |
| Torso rotation (seated twist) | Rotational range, asymmetry | Panel overlap allowance at side seams |
| Torso flexion (forward bend) | Spinal extension, fabric draw | Back panel length margin, lumbar lattice flex zone |
| Elbow flexion (full curl) | Arm shortening, fabric bunching | Sleeve panel arrangement, elbow articulation zone |
| Neck rotation | Range of motion, asymmetry | Collar clearance, rear panel height |

### Articulation Zones

Based on ROM data, the AI positions 5 articulation zones — areas where panel geometry shifts from rigid to flex:

1. **Shoulder socket** — Curved panel boundary follows individual scapular movement arc
2. **Underarm gusset** — Depth computed from abduction range (typically 40–65mm deep)
3. **Elbow crease** — Accordion-fold panels whose pleat depth matches individual elbow flexion
4. **Lumbar flex** — Lattice cell density drops 40% at lumbar zone for bending freedom
5. **Side torso** — Panel overlap allows computed rotational range without binding

---

## Closure and Interface

### Front Closure

- **Type:** Aquaguard vislon zipper, full-length (YKK #8 gauge)
- **Material:** Molded TPU teeth on woven tape
- **Treatment:** RF-welded storm flap (internal) — zipper is weather-sealed
- **Pull:** Sand-cast aluminum, DUNE.X period mark debossed, 22mm diameter

### Cuff

- **Type:** Velcro tab closure with internal elastic (30mm elastic, 40mm Velcro tab)
- **Adjustment range:** 50mm wrist circumference range
- **Interface consideration:** Cuff internal diameter accommodates suit glove interface ring (150mm max diameter)

### Hem

- **Type:** Internal drawcord with sand-cast aluminum cord lock
- **Profile:** Straight hem, sits at hip bone
- **Length (Frame 04 reference):** 720mm from shoulder seam to hem

### Pockets

| Pocket | Position | Type | Size |
|---|---|---|---|
| Chest left | Over left chest plate | RF-welded entry, concealed | 160 x 120mm |
| Chest right | Over right chest plate | RF-welded entry, concealed | 160 x 120mm |
| Internal left | Inside left panel, L3 level | Bonded mesh pocket | 200 x 150mm |
| Rear right | Lower back, external | RF-welded entry, vertical zip | 180 x 100mm |

All pockets are sealed-entry: no open pocket bags. Each opening is a welded slit with a concealed zipper or magnetic closure. Nothing interrupts the membrane surface.

---

## Colorways

### Void

- **L1 (Outer Membrane):** Smoke-black TPU film. Semi-transparent — the structural lattice beneath reads as dark geometric shadows. Under single-source light, the membrane catches a faint sheen while the lattice creates depth.
- **L2 (Lattice):** Black TPU lattice panels. Visible through L1 as structural geometry.
- **L3 (Insulation):** Black aerogel-composite panels. Not visible externally.
- **L4 (Contact):** Charcoal computational knit.
- **Hardware:** Black sand-cast aluminum (zipper pull, cord lock, magnetic collar). Black Aquaguard zipper.

### Bone

- **L1 (Outer Membrane):** Frosted off-white TPU film. High transparency — the lattice, insulation quilting, and body silhouette are all visible through the membrane. The jacket reads as an X-ray of itself.
- **L2 (Lattice):** Off-white TPU lattice panels. Fully visible, reads as skeletal architecture.
- **L3 (Insulation):** Pale grey aerogel-composite. Visible through membrane as soft, quilted depth behind the lattice.
- **L4 (Contact):** Light grey computational knit.
- **Hardware:** Brushed aluminum (zipper pull, cord lock, magnetic collar). Off-white Aquaguard zipper.

---

## Dimensions and Weight

| Specification | Value (Frame 04 reference) |
|---|---|
| Shoulder width | 480mm (adjusted per individual scan) |
| Chest circumference | 1,080mm (adjusted per individual scan) |
| Body length (shoulder to hem) | 720mm |
| Sleeve length (shoulder to cuff) | 660mm |
| Collar height (rear) | 95mm |
| Weight | 780–860g (varies by insulation mapping and lattice extent) |

Weight target: under 900g. The jacket achieves lightness through selective material placement — insulation only where heat loss occurs, lattice only where structure is needed, membrane at minimum viable thickness.

---

## Biodata Integration Summary

| Data Captured | Scan Method | Processing Time | Product Impact |
|---|---|---|---|
| 3D body geometry | Structured-light scanner | 2 hours | Panel cut, seam placement, overall dimensions |
| Range of motion (6 tests) | Motion capture markers | 4 hours | Articulation zone placement, gusset depth, panel overlap |
| Thermal map | Infrared camera (30s hold) | 1 hour | Insulation thickness distribution (12 zones) |
| Neck geometry | Included in body scan | Concurrent | Collar dimensions and clearance |

**Total AI processing time:** 18–24 hours
**Manufacturing timeline:** 5–7 days from scan

---

## Manufacturing Process

| Step | Process | Duration |
|---|---|---|
| Panel cutting | Automated laser cutting from AI-generated pattern files | 2 hours |
| Lattice panel printing | SLS 3D printing, TPU (batch with other orders) | 18–24 hours |
| Computational knit (L4) | Flat-bed knitting, zone-programmed | 3 hours |
| Insulation assembly | Aerogel-composite panels cut and quilted per thermal map | 2 hours |
| Layer bonding | Ultrasonic bonding of L2/L3/L4 at 84 points | 1 hour |
| Membrane forming | TPU film thermoformed to body scan profile | 1 hour |
| RF welding | All 23 membrane panels sealed | 3 hours |
| Hardware installation | Zipper, magnets, cord locks, Velcro tabs | 1 hour |
| Quality inspection | Seam integrity, dimensional check, ROM simulation | 1 hour |
| Packaging | Garment bag, biodata card, care card | 15 minutes |

**Total active process time:** 32–38 hours
**Calendar time:** 5–7 days

---

## Product Description (Clinical Poet)

### Short Form

> TRANSIT SHELL 01
>
> Parametric-cut membrane jacket. 4-layer adaptive composite. Sealed seam architecture derived from pressure vessel engineering. Transparent shell reveals structural lattice beneath. Collar geometry accounts for helmet interface clearance.
>
> Your thermal map determines insulation. Your range of motion determines articulation. Your body scan determines cut.
>
> Colorway: Void / Bone
> DEPARTURE 001

### Long Form

> TRANSIT SHELL 01
>
> The jacket begins with a body standing still.
>
> Structured-light scan. Infrared thermal capture. Six articulation tests — shoulder flexion, abduction, torso rotation, forward bend, elbow curl, neck turn. The data that defines how one body occupies space and generates heat.
>
> AI translates this into a 23-panel membrane shell. Panel boundaries follow your contour lines. Insulation thickness maps your heat-loss gradient — 4mm where you run hot, 12mm where you cool fastest. Articulation zones are positioned at your measured movement arcs, not an average. The shoulder gusset is the depth your arms actually need.
>
> The outer membrane is 0.3mm TPU film — transparent enough to reveal the Voronoi lattice structure beneath. Six 3D-printed lattice panels provide impact distribution at shoulder, chest, and lumbar zones. The jacket's skeleton is visible. Its engineering is the aesthetic.
>
> Every seam is RF-welded. No thread. No needle penetration. Thermoplastic bond at every junction — waterproof, airtight at the surface. 84 ultrasonic bond points lock the internal layers in registration.
>
> The collar rises 95mm at the rear, 75mm at the front. Internal diameter computed from your neck scan with 15mm clearance. The angle is 12 degrees — compatible with a 300mm helmet neck ring. This is not aspiration. It is interface specification.
>
> Weight: 780–860g.
> Outer: TPU membrane, RF-welded.
> Structure: SLS 3D-printed TPU lattice.
> Insulation: Aerogel-composite, thermal-mapped.
> Contact: Computational knit, zone-programmed.
> Closure: Aquaguard vislon, magnetic collar.
> Colorway: Void / Bone.
> Manufacturing: 5-7 days from scan to hand.
>
> The shell that knows the body it covers.
