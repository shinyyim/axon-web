# DUNE.X — BIODATA SPECIFICATION

## Intelligence Architecture

---

## Overview

Biodata is the foundation of DUNE.X product engineering. Every custom piece begins with the body's own signal — movement, force, heat, geometry — captured through sensors and translated into manufacturing parameters by AI. The garment knows you before you wear it.

This document specifies:
- What data is captured
- How it is captured (hardware, environment, protocol)
- How AI processes it per product category
- What changes in the product as a result
- The customer experience from scan to product
- Data handling and privacy

Biodata scanning is optional. It is not mandatory for purchase. Standard pieces can be purchased without any scan. But for custom pieces — Terrain Boot 01, Transit Shell 01 — the scan is the beginning of the product. Without it, the product does not exist.

---

## Data Capture

### Categories of Biodata

| Category | Data Type | Products Affected | Capture Method |
|---|---|---|---|
| **Gait Analysis** | Pressure distribution, strike pattern, pronation, cadence, toe-off vector | Terrain Boot 01 | Pressure-plate treadmill |
| **Force Mapping** | Ground reaction force per step, peak force zones, impact timing | Terrain Boot 01 | Force sensors in treadmill |
| **3D Body Geometry** | Full torso + head + foot point cloud (0.1mm accuracy) | Transit Shell 01, Visor 01, Terrain Boot 01 | Structured-light scanner |
| **Thermal Map** | Surface skin temperature across torso (12 zones) | Transit Shell 01 | Infrared camera array |
| **Range of Motion** | Joint angles for 6 movement tests (shoulder, torso, elbow, neck) | Transit Shell 01 | Motion capture markers + camera |
| **Kinematics** | Ankle flexion, knee tracking, tibial rotation during gait | Terrain Boot 01 | High-speed camera array (240fps) |
| **Face Geometry** | Facial landmarks, temple width, nose bridge, ear position | Visor 01 | Structured-light scanner (subset) |

### Raw Data Volume

| Scan Type | Raw Data Size | Processed Profile Size |
|---|---|---|
| Gait + Force (3 minutes of capture) | ~1.8 GB | ~6 MB |
| 3D Body Geometry | ~400 MB | ~8 MB |
| Thermal Map | ~50 MB | ~2 MB |
| Range of Motion | ~120 MB | ~1.5 MB |
| Kinematics | ~80 MB | ~0.5 MB |
| Face Geometry | ~40 MB | ~1 MB |
| **Total (full scan)** | **~2.5 GB** | **~19 MB** |

---

## Scanning Hardware

### Location

All biodata scanning occurs at **2F (Experience Zone)** of the DUNE.X flagship store. The scanning environment is controlled: 22C ambient temperature (for accurate thermal mapping), diffused overhead lighting (for structured-light scanning accuracy), and acoustically dampened (for focus).

The space reads as a research laboratory, not a fitting room. Dark walls. Instrument panels. The body is the subject.

### Hardware Inventory

#### 1. Pressure-Plate Treadmill

| Specification | Value |
|---|---|
| Belt length | 2,000mm |
| Belt width | 600mm |
| Sensor array | 1,024 capacitive force sensors |
| Spatial resolution | 5mm x 5mm per sensor cell |
| Sampling rate | 200 Hz |
| Force range | 0–2,000 N per cell |
| Accuracy | +/- 2 N |
| Speed range | 0–15 km/h (variable) |

The treadmill captures the full gait cycle — heel strike through toe-off — across 80+ walking steps and 40+ running steps. The composite pressure map averages every step into a single force topology.

#### 2. Structured-Light 3D Scanner

| Specification | Value |
|---|---|
| Type | Structured-light projection + stereo camera capture |
| Scan volume | 2,000 x 1,000 x 800mm (full torso + head) |
| Accuracy | 0.1mm |
| Point density | 1.2 million points per scan |
| Scan time | 8 seconds (full body), 4 seconds (foot only), 3 seconds (face only) |
| Output | Point cloud (.PLY), mesh (.OBJ) |

The scanner captures the body as a point cloud — a three-dimensional map of every surface contour. No contact. No measurement tape. The body is digitized in the time it takes to exhale.

#### 3. Infrared Camera Array

| Specification | Value |
|---|---|
| Cameras | 4 x LWIR (long-wave infrared) cameras, positioned at 0, 90, 180, 270 degrees |
| Resolution | 640 x 480 per camera |
| Thermal range | 28C–40C (human skin temperature range) |
| Accuracy | +/- 0.3C |
| Capture time | 30 seconds (static hold, arms slightly abducted) |

The thermal array captures a 360-degree heat map of the torso. AI segments this into 12 thermal zones, each assigned an insulation thickness value for the Transit Shell 01.

#### 4. High-Speed Camera Array

| Specification | Value |
|---|---|
| Cameras | 4 x high-speed cameras positioned around treadmill |
| Frame rate | 240 fps |
| Resolution | 1920 x 1080 per camera |
| Tracking | Reflective marker-based (12 markers on ankle, knee, hip) |
| Data captured | Joint angles, angular velocity, trajectory paths |

Runs concurrently with the treadmill gait capture. Provides kinematic data that supplements the pressure-plate data — the camera sees what the foot does in the air; the treadmill feels what the foot does on the ground.

#### 5. Motion Capture Markers

| Specification | Value |
|---|---|
| Marker type | Retroreflective spheres, 12mm diameter |
| Marker count | 24 (full body ROM test) or 12 (gait kinematic subset) |
| Placement | Standard biomechanical landmark positions (ankle, knee, hip, shoulder, elbow, wrist, C7, T10, sacrum, acromion) |
| Capture system | Integrated with high-speed camera array |

Used during the 6 range-of-motion tests for Transit Shell 01. Captures how joints move through space — the data that positions articulation zones in the jacket pattern.

---

## Scanning Protocol

### Full Scan (Custom Footwear + Custom Outerwear + Semi-Custom Eyewear)

Total duration: 10 minutes.

| Step | Duration | Capture | Hardware |
|---|---|---|---|
| 1. Preparation | 60s | Marker placement, barefoot, light clothing | Staff-assisted |
| 2. Static stand | 30s | Weight distribution, foot geometry, body geometry, thermal baseline | Treadmill (static), structured-light scanner, IR cameras |
| 3. Walking gait | 120s | Gait cycle (3.5 km/h), pressure map, kinematics | Treadmill, high-speed cameras |
| 4. Running gait | 60s | Dynamic gait (8 km/h), force amplification, impact pattern | Treadmill, high-speed cameras |
| 5. Foot scan (stationary) | 30s | Detailed foot surface geometry (left + right) | Structured-light scanner (foot station) |
| 6. ROM: Shoulder flexion | 15s | Arms raised forward 180 degrees | Motion capture |
| 7. ROM: Shoulder abduction | 15s | Arms raised laterally | Motion capture |
| 8. ROM: Torso rotation | 15s | Seated twist, left and right | Motion capture |
| 9. ROM: Torso flexion | 15s | Forward bend from standing | Motion capture |
| 10. ROM: Elbow flexion | 10s | Full curl, both arms | Motion capture |
| 11. ROM: Neck rotation | 10s | Turn left, right, up, down | Motion capture |
| 12. Face scan | 10s | Facial geometry for Visor 01 | Structured-light scanner |
| 13. Thermal capture | 30s | Full torso heat map, static hold | IR camera array |

### Footwear-Only Scan

For customers purchasing only Terrain Boot 01.
Duration: 5 minutes.
Steps: 1, 2 (static stand + weight distribution only), 3, 4, 5.

### Eyewear-Only Scan

For customers purchasing only Visor 01.
Duration: 1 minute.
Steps: 12 only (face scan).

---

## AI Processing Pipeline

### Stage 1: Data Cleaning and Segmentation

**Duration:** 30 minutes (automated)

- Raw sensor data cleaned of noise and outliers
- Gait cycle segmented into individual steps (typically 80+ walking, 40+ running)
- Steps averaged into composite gait profile
- 3D point cloud cleaned, meshed, and aligned to standard coordinate system
- Thermal data stitched from 4 camera views into single 360-degree map
- ROM data extracted as peak angle values per movement test

### Stage 2: Pattern Recognition

**Duration:** 1–2 hours (automated, GPU-accelerated)

- **Gait classification:** Pronation type (neutral, mild over, moderate over, under), strike pattern (heel, midfoot, forefoot), cadence category
- **Body morphology:** Body proportions classified against reference database, outlier dimensions flagged for quality check
- **Thermal profiling:** 12-zone segmentation with heat-loss gradient computed per zone
- **ROM profiling:** Joint mobility classified (hypermobile, normal, restricted) per test — drives articulation zone sizing

### Stage 3: Product Generation

**Duration:** 16–20 hours per product (compute-intensive, distributed)

Each product type has its own generation pipeline:

#### Terrain Boot 01: Lattice Generation

| Sub-step | Duration | Process |
|---|---|---|
| Pressure topology mapping | 2 hours | Composite pressure map converted to density field |
| TPMS lattice seeding | 1 hour | Gyroid cell grid initialized across sole volume |
| Density optimization | 8 hours | Iterative FEA simulation (8 rounds) adjusting cell wall thickness per zone |
| Tread node mapping | 1 hour | Pressure peaks mapped to tread depth profile |
| Stiffness tuning | 2 hours | Global lattice stiffness adjusted for body weight + cadence |
| Export and validation | 2 hours | .STL export, printability check, dimensional verification |

Output: Printable lattice sole geometry (.STL), insole profile (.STEP), upper zone map (.DXF)

#### Transit Shell 01: Panel Generation

| Sub-step | Duration | Process |
|---|---|---|
| Body mesh extraction | 1 hour | 3D scan converted to torso surface mesh |
| Panel layout optimization | 4 hours | AI positions 23 panel boundaries along contour lines |
| Articulation zone placement | 2 hours | ROM data positions flex zones and gusset depths |
| Insulation mapping | 2 hours | Thermal data converted to 12-zone thickness map |
| Lattice panel generation | 6 hours | Voronoi tessellation at 6 structural zones, FEA optimization |
| Pattern export | 2 hours | 2D panel patterns (.DXF), lattice panels (.STL), assembly instructions |

Output: Flat panel cutting patterns (.DXF), lattice panel geometries (.STL), insulation zone map, assembly guide

#### Visor 01: Fit Adjustment

| Sub-step | Duration | Process |
|---|---|---|
| Facial landmark extraction | 30 min | Key points identified from face scan mesh |
| Frame parameter calculation | 30 min | Temple width, bridge width, bridge angle, temple curve computed |
| Adjustment file generation | 1 hour | CNC trim profiles generated for bridge and temple adjustment |

Output: CNC trim files (.G-code), fit parameter card

### Stage 4: Manufacturing File Preparation

**Duration:** 1–2 hours (automated)

- All geometry files validated for manufacturing tolerances
- Print orientation and support structure computed (for SLS parts)
- Nesting and batch optimization (multiple customer orders grouped for efficient print runs)
- Files queued for 6F manufacturing floor

---

## What Changes Per Customer

### Terrain Boot 01

| Component | What Changes | What Stays Fixed |
|---|---|---|
| Lattice sole | Cell density, wall thickness, tread depth per zone | Overall sole silhouette, material (TPU), process (SLS) |
| Internal last | Arch height, heel cup depth, metatarsal relief positions | Material (dual-density EVA), process (CNC) |
| Upper knit zones | Zone density values (minor variation) | Zone positions, material, knit structure |
| Upper TPU film | Thermoformed to foot geometry | Material, transparency, thickness |
| Structural cage | No change | Fixed design, injection molded |

### Transit Shell 01

| Component | What Changes | What Stays Fixed |
|---|---|---|
| Panel cut | Seam positions, panel dimensions, overall sizing | Panel count (23), material (TPU film) |
| Structural lattice | Cell density, panel contour | Zone count (6), material (TPU), process (SLS) |
| Insulation | Thickness per zone (4-12mm) | Material (aerogel-composite), zone count (12) |
| Articulation zones | Gusset depth, flex zone position | Zone count (5), articulation method |
| Collar | Internal diameter, height ratio | Overall collar form, closure method |
| Contact knit | Zone density values | Zone positions, material |

### Visor 01

| Component | What Changes | What Stays Fixed |
|---|---|---|
| Temple width | Splay angle (132-148mm range) | Frame material, structure |
| Nose bridge | Width (16-24mm), angle (8-18 degrees) | Bridge material (silicone) |
| Temple curve | Curvature matched to ear position | Temple arm material, flex zone position |
| Lens | No change | Fixed design for all units |

---

## The Scanning Experience

### Environment

The scanning station at 2F is designed as an instrument — not a changing room or a retail space.

- **Walls:** Void (#0A0A0C) matte surface
- **Floor:** Raised platform, matte black, with alignment marks for scanning positions
- **Lighting:** Overhead diffused panel (5000K, CRI 95+) for accurate scanning. Edge-lit floor perimeter in Portal White. During thermal capture, overhead lighting dims to minimize IR interference.
- **Display:** 3 x 55" screens surrounding the platform. During gait capture, real-time pressure visualization is displayed — the customer watches their own force signature appear as a luminous topography on the dark screen. During body scan, the point cloud builds in real time. The data is the show.
- **Sound:** Ambient low-frequency tone (35Hz), barely perceptible. Mechanical sounds from treadmill. No music.
- **Staff:** One DUNE.X technician guides the protocol. Clinical, precise, minimal conversation.

### Customer Journey

| Moment | Duration | Experience |
|---|---|---|
| Arrival at 2F | — | Customer enters from elevator/stair. The scanning platform is visible ahead — a raised dark stage in the center of the floor. Screens are dark. |
| Preparation | 60s | Technician applies reflective markers (if full scan). Customer removes shoes and outer layers. |
| Scan initiation | — | Screens illuminate. A single line of text appears: "BIODATA CAPTURE. STAND STILL." The overhead diffuser activates. |
| Static capture | 30s | Customer stands still on treadmill. Point cloud builds on screens in real time — the body appearing as thousands of luminous dots on dark background. Weight distribution displayed as a heat map underfoot. |
| Gait capture | 180s | Treadmill begins. Walking, then running. Screens show pressure footprints blooming and fading with each step — a luminous choreography of force. Cadence displayed as a waveform. The body's rhythm made visible. |
| Foot scan | 30s | Customer steps onto scanning platform. Structured light sweeps across feet. On screen: foot geometry materializes as a detailed mesh. |
| ROM tests | 80s | Technician guides 6 movements. Each movement is captured and immediately visualized as a joint-angle trajectory on screen. The body's range, drawn as data arcs. |
| Face scan | 10s | Quick scan. Facial geometry appears on screen as a wireframe — clinical, precise. |
| Thermal capture | 30s | Lights dim. IR cameras capture silently. On screen: the body appears as a thermal gradient — warmth rendered as luminous zones against the cold void. |
| Completion | — | Screens display: "BIODATA CAPTURED. PROCESSING: 24 HOURS." A summary card is generated with key metrics. Customer is guided to 3F (Cafe) or can continue shopping. |

Total time on platform: 10 minutes.
The experience is designed to feel like a scientific procedure, not a fitting. The body is the experiment. The data is the result.

---

## Data-to-Garment Timeline

| Phase | Duration | Activity |
|---|---|---|
| Scan | 10 minutes | In-store biodata capture |
| Processing | 24 hours | AI pipeline: cleaning, pattern recognition, product generation |
| Manufacturing | 3-5 days (boot), 5-7 days (shell), 1-2 days (visor) | On-site fabrication at 6F |
| Quality check | 2-4 hours | Dimensional verification, functional testing |
| Customer notification | — | SMS/email: "Your [PRODUCT] is ready for pickup at 4F." |
| Pickup | 15 minutes | 4F checkout, packaging, departure |

**Total: 4-8 days from scan to hand, depending on product.**

---

## Privacy and Data Handling

### Principles

1. **The body's data belongs to the body.** All biodata is owned by the customer. DUNE.X processes it under a limited license for product manufacturing.
2. **No sale. No sharing.** Biodata is never sold to third parties, never shared with partners, never used for advertising.
3. **Aggregation is anonymous.** When biodata contributes to collective datasets (e.g., Transit Pack surface pattern generation), it is fully anonymized — stripped of all identifying information, reduced to statistical distributions.
4. **Deletion is absolute.** Customer can request full deletion of their biodata profile at any time. Deletion is permanent and irrecoverable.

### Data Architecture

| Data Type | Storage | Retention | Customer Access |
|---|---|---|---|
| Raw scan data | Encrypted cloud storage (AES-256) | 90 days, then auto-deleted | Not accessible (too large, too raw) |
| Processed biodata profile | Encrypted customer account | Indefinite (until deletion requested) | Accessible via web platform |
| Digital embryo (product geometry) | Customer account | Indefinite | Viewable as 3D model on web platform |
| Manufacturing files | 6F production system | 30 days post-manufacture, then deleted | Not accessible |
| Aggregated anonymous data | DUNE.X research database | Indefinite | Not individually identifiable |

### Customer Controls

- **View:** Customer can view their biodata profile and digital embryo via the DUNE.X web platform at any time
- **Export:** Customer can export their 3D body scan and gait profile in standard formats (.OBJ, .CSV)
- **Delete:** One-click deletion from web platform. 48-hour grace period, then permanent deletion.
- **Update:** Customer can book a rescan at any time. New data replaces old profile. Previous manufacturing files are unaffected (products already made retain their geometry).
- **Opt out of aggregation:** Customer can opt out of contributing to anonymous collective datasets. This does not affect their custom products.

### Consent Flow

1. Before scanning, customer reviews a data consent screen on a tablet at the scanning station
2. Consent is granular: customer can consent to manufacturing use only (required for custom products) and separately consent to anonymous aggregation (optional)
3. No dark patterns. No pre-checked boxes. Clear language.
4. Consent is stored with the biodata profile and can be modified at any time via the web platform.

---

## Future Applications

The biodata architecture is designed to scale beyond DEPARTURE 001:

- **Longitudinal tracking:** Customers who rescan over time build a biomechanical history. AI can detect changes in gait, posture, or mobility — useful for product evolution and potentially for health insights (with explicit consent).
- **Cross-product learning:** Gait data from the boot informs panel placement in the shell. Thermal data from the shell informs ventilation in future base layers. The system learns across products.
- **Collective intelligence:** As the anonymized dataset grows, collective patterns emerge — demographic gait signatures, thermal profiles by climate, mobility distributions by age. This collective intelligence improves the AI's generation quality for every new customer.
- **Remote scanning:** Future development of at-home scanning via smartphone LiDAR (for body geometry) and smart insole (for gait). Lower fidelity than the flagship experience, but sufficient for standard products and re-orders.

The biodata system is not a feature of DEPARTURE 001. It is the foundation of every collection that follows.
