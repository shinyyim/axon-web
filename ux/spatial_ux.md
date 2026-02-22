# DUNE.X Flagship — Spatial UX and Wayfinding

---

## Wayfinding Philosophy

There are no signs in DUNE.X. No arrows. No "You Are Here" maps. No floor numbers painted on walls.

Wayfinding in the flagship is achieved through four systems working in concert: light, sound, staff, and architecture. The customer never needs to decide where to go. The building tells them — not with text, but with sensation.

The principle: **light leads, darkness follows.** The path forward is always brighter than the path behind. Floors you have visited dim in memory. The floor you are approaching glows in anticipation.

---

## Wayfinding System: The Four Channels

### 1. Light as Direction

Light is the primary wayfinding mechanism. It replaces signage entirely.

**Floor light lines:**
- Embedded LED strips in the floor, 8mm wide, recessed flush with the surface
- Color: Portal White (#FFFFFF) at 30% opacity by default
- The lines run along the intended path of circulation — from the entry point of each floor toward the next transition (stairs, elevator, escalator)
- The lines pulse slowly in the direction of travel — a gentle wave moving forward at walking pace (1.2 m/s)
- When the customer moves in the correct direction, the line ahead of them brightens slightly (50%). When they stop or move away, it returns to 30%.

**Wall edge glow:**
- Thin strips of light at the base of walls along circulation paths
- These are secondary to floor lines — they define the corridor boundaries
- In transition zones (approaching stairs, elevator), the wall glow intensifies and rises higher up the wall, creating a sense of vertical pull

**Gradient of darkness:**
- As a customer ascends through the building, the floors behind them gradually dim
- This is controlled per-customer via the black card / phone proximity (BLE beacons on each floor)
- When a Departure Candidate leaves 2F for 3F, the 2F corridor behind them fades to minimum light over 30 seconds
- This creates a one-way feeling — the journey has a direction. You do not go back. (Until the descent from 4F to 1F, which reverses the pattern.)

**Threshold markers:**
- At every floor transition point (stairwell entry, elevator doors, escalator landing), the light system creates a distinct visual moment:
  - A thin rectangle of brighter light on the floor at the threshold (the "step through" mark)
  - A brief pulse of light along the doorframe or stairwell arch when the customer approaches
  - These moments signal: "This is a boundary. You are crossing it."

### 2. Sound as Gradient

Each floor has a distinct ambient sound identity. The transitions between floors are gradual — sound bleeds from one floor to the next in the stairwell, so the customer perceives the shift before arriving.

| Floor | Sound Character | Frequency Range | Description |
|---|---|---|---|
| **1F** | Near-silence | — | Acoustic dampening from street. The quiet is the experience. |
| **2F** | Low hum | 40–80Hz | Barely audible. Felt more than heard. The room is alive. |
| **3F** | Social warmth | 200–2000Hz | Cafe sounds — quiet conversation, ceramic on surfaces, ambient music at low volume. First "human" soundscape. |
| **Elevator** | Subsonic tone | 40–60Hz | Single rising frequency. See elevator experience spec. |
| **5F** | Atmospheric breath | 80–400Hz | Deep, slow. Like wind across terrain. Environmental. |
| **6F** | Mechanical rhythm | Various | Robotic fabrication sounds — whir, click, the pulse of machines at work. Honest, not amplified. |
| **4F** | Quiet neutral | — | Minimal ambient. Functional. The calm after the storm. |

**Stairwell sound blending:** The stairwell acts as a crossfade zone. Walking from 2F to 3F, the low hum of the scanning floor fades and the warmer cafe sound rises. This audio transition prepares the customer for the change in atmosphere before they see it.

### 3. Staff as Guides

DUNE.X staff are present on every floor, but their behavior is precisely choreographed.

**Staff presence by floor:**

| Floor | Staff Count | Role | Behavior |
|---|---|---|---|
| **1F** | 1 host | Greeter, path determiner | Stands at the airlock threshold. Speaks first. Determines persona path. |
| **2F** | 1 technician | Scan facilitator | Present in the corridor outside the chamber. Does not enter unless invited. Available for questions. |
| **3F** | 1 barista + 1 guide | Cafe service + elevator boarding | Barista operates counter. Guide monitors departure board and assists boarding. |
| **5F** | 1–2 product specialists | Product knowledge, fitting | Stand at the periphery of the environment. Approach only when the customer makes eye contact or gestures. |
| **6F** | 1 fabrication narrator | Manufacturing explanation | Stands at the viewing gallery. Narrates only if asked. Otherwise: silent witness. |
| **4F** | 1 checkout specialist | Transaction + packaging | Functional role. Warm but efficient. |

**Staff principles:**
- Never approach a customer who is looking at something. Wait for them to look up.
- Never use the word "help" — instead: "What would you like to know?"
- Never direct with pointing or verbal instructions. If a customer seems lost, walk with them to the next point, then leave.
- Dressed in DUNE.X — always. They are part of the environment. They wear current-season product.
- Voice register: quiet, unhurried. Match the Clinical Poet tone.

### 4. Architecture as Bottleneck

The building is designed so that at every floor transition, there is only one obvious path forward. The customer does not choose between multiple corridors or openings. The architecture narrows to a single passage, then opens again.

**Bottleneck moments:**

| Transition | Architectural Device |
|---|---|
| **Street → 1F** | Single narrow doorway, recessed from facade. Only one way in. |
| **1F → 2F / 3F** | Staircase at rear of 1F. Single opening. (Experience Tourists pass 2F landing and continue up.) |
| **2F chamber → corridor** | Single door. It opens when the scan is complete. One path out. |
| **3F → elevator** | The elevator lobby is the only forward path. The cafe opens toward it. The departure board pulls visual attention. |
| **Elevator → 5F** | Doors open to a single vista. No choice. You step out into the world. |
| **5F → 6F** | A staircase at the far end of the 5F environment. The customer must traverse the full environment to reach it. |
| **6F → 4F** | Stairs down. The only descent option from 6F. |
| **4F → 1F** | Escalator. Single direction. Down. |

This eliminates decision fatigue. The customer never wonders "where do I go?" The building answers for them.

---

## The Black Card / Phone as Compass

The NFC-enabled black card (or DUNE.X app on phone) serves as the customer's persistent identity throughout the building.

### Card Functions

| Function | How It Works |
|---|---|
| **Floor tracking** | BLE beacons on each floor detect the card/phone. The building knows where the customer is. This drives the gradient-of-darkness system (floors dim behind them). |
| **Product interaction** | Tap the card on vitrine NFC points (5F) to unlock detailed product specs on a built-in screen. |
| **Signal storage** | After the biodata scan, the body signal data is linked to the card ID. This enables personalized display on 5F. |
| **Elevator boarding** | The departure board on 3F references the card's ID. When it's their turn, the board displays their slot. |
| **Checkout** | The card carries the order. Tap at 4F counter to complete purchase. All selections and scan data are already linked. |
| **Post-visit** | The card ID connects to their digital body signal profile. They can log into dunex.com with it. |

### Card Design

- Matte black, credit-card dimensions (85.6 x 53.98 mm)
- No text. No logo. Only a small embossed period (D.X mark) off-center on the front face.
- NFC chip embedded. No visible antenna.
- Material: recycled carbon-fiber composite. It has weight. It feels like something.
- Given to the customer at 1F. They keep it. It is theirs.

---

## Per-Floor UX Moments

### 1F — Arrival: The Airlock

**Duration:** 60–90 seconds

**Spatial UX sequence:**

```
STREET THRESHOLD
    Narrow door, recessed 800mm into facade. Dark reveal.
    ↓
COMPRESSION CORRIDOR (120 sqft)
    Width: 1.2m. Length: 10m. Ceiling: 2.4m (deliberately low for 5m floor height).
    Walls: raw concrete or blackened steel. No finish.
    Floor: single light line, 8mm, pulsing forward.
    Sound: street noise dampens to silence over 5 meters.
    Temperature: drops 2C from exterior.
    ↓
EXPANSION
    Corridor opens into reception area (115 sqft). Ceiling rises to full 5m.
    The DUNE.X wordmark projected on far wall — Portal White, 3m wide, fades after 5 seconds.
    Host stands at the transition point.
    ↓
HOST INTERACTION
    Persona determination → Black card handoff
    ↓
STAIRS TO 2F/3F
    At the rear of the reception. Single opening. Light line continues upward.
```

**Key UX decisions:**
- The compression-to-expansion sequence is the spatial equivalent of the website's "darkness first, then light, then content."
- The wordmark projection is ephemeral — it does not stay. Like the brand itself: present, then gone, leaving an afterimage.
- The host does not stand at the door. They stand at the expansion point. The corridor is a solo experience.

### 2F — Experience Zone: The Chamber

(See `biodata_experience.md` for complete specification.)

**Spatial UX notes for 2F beyond the chamber:**

- The interactive installation area (100 sqft) adjacent to the scanning chamber serves as both a waiting area and a secondary brand immersion space.
- Content: slow-moving projected data streams on walls (biodata visualizations from anonymized aggregate scans — the collective signal of all DUNE.X visitors), material samples behind glass (sole lattice specimens, membrane fabric swatches, 3D-printed components), and a single screen showing the AI computation process in abstract form.
- This area is where Experience Tourists would linger if they chose to visit 2F without scanning. It is also the waiting zone for walk-ins.
- Ambient: 2F hum (40–80Hz). Darker than 1F. The scanning chamber emits a faint glow through its translucent door when active — others know someone is inside, but cannot see.

### 3F — Cafe and Gathering: The Pause

**Duration:** 5–15 minutes (self-paced)

**Spatial UX sequence:**

```
STAIR ARRIVAL
    Stairs from 2F open into the cafe space. Sound crossfade: hum → cafe warmth.
    Light temperature shifts: cool → amber (2700K accent lighting).
    ↓
ORIENTATION
    The space reads immediately. Three zones:
    - LEFT: Lounge seating (140 sqft). Low furniture. Dark leather and stone.
    - CENTER: Cafe counter (80 sqft). Staff visible. Menu displayed on black card.
    - RIGHT: Elevator lobby (60 sqft). The departure board. The destination.
    ↓
SOCIAL TIME
    Sit. Order. Wait. Watch the departure board.
    This is the only floor where conversation is expected.
    The ambient sound is designed to support speech (200-2000Hz range).
    ↓
BOARDING CALL
    Departure board updates: "STATUS NOW BOARDING"
    Elevator door seam emits Portal White rim light.
    Customer approaches.
```

**The departure board — detailed spec:**

- Hardware: 24-inch LED panel, portrait orientation, mounted on the wall beside the elevator doors
- Font: Söhne Mono Light, Portal White on Void black background
- Content layout:

```
─────────────────────────────
D.X TRANSIT AUTHORITY
─────────────────────────────

DEPARTURE    05F
STATUS       HOLDING
SLOT         ——

─────────────────────────────

NEXT         [SLOT ID]
ETA          00:03:42

─────────────────────────────
```

- When the customer's slot is called:

```
─────────────────────────────
D.X TRANSIT AUTHORITY
─────────────────────────────

DEPARTURE    05F
STATUS       NOW BOARDING
SLOT         DX-0847

─────────────────────────────

PROCEED TO GATE
─────────────────────────────
```

- The board updates with mechanical animation — each character flips individually, like a split-flap display (rendered digitally but mimicking the analog motion at 100ms per character).
- Maximum 1 customer/group boards at a time. Others wait. The scarcity is intentional.

**Cafe UX:**
- Menu is minimal. Four items. Presented on a small black card at the counter (same material as the identity card):

```
BLACK         ₩6,000
MATCHA        ₩7,000
STILL         ₩0
SPARKLING     ₩0
```

- Vessels: unglazed black ceramic. No logos. No branding on the cup. The object is beautiful on its own.
- Water is free. Offered without asking.

### Elevator — The 42-Second Transit

(See `journey_map.md` for second-by-second breakdown.)

**Spatial UX spec for the elevator interior:**

- Interior dimensions: 1.5m x 1.5m x 2.4m (intimate, not spacious — designed for 1–2 people maximum)
- Walls: blackened steel, seamless. No panel lines. No buttons visible.
- Floor: same matte black composite as the 2F scanning platform. Heated to 28C. Haptic transducers embedded.
- Ceiling: single recessed light panel, initially off
- Door: full-width opening, no visible tracks. Appears as a solid wall until it moves.
- No floor indicator display. No emergency phone (concealed behind a flush panel — accessible but invisible).
- The customer does not press a button. The elevator is summoned by the departure board system. It arrives when their slot is called. The doors open. They enter. The doors close. It goes to 5F. No input required.
- The experience (darkness → tone → rim light → crescendo → doors open) is detailed in `journey_map.md`.

**Elevator exit onto 5F:**
- Doors open at 1200ms (mechanical easing, not bounce)
- The light from 5F is the first thing that enters — it floods the elevator before the customer steps out
- The customer's eyes have been in darkness for 42 seconds. The 5F environment will appear brighter than it is. This is the intended optical effect.
- A 500mm threshold strip on the floor at the elevator opening, lit from below — the "step through" moment

### 5F — The Reveal: Planetary Environment

**Duration:** 10–20 minutes (self-paced)

**Spatial UX sequence:**

```
ELEVATOR EXIT
    Light floods in. Eyes adjust. The world has changed.
    ↓
FIRST VISTA
    The customer sees the full 5F environment from the elevator threshold.
    Design rule: the elevator opens to the widest possible view. No corridor. No wall.
    The entire planetary scenography is visible from the first step.
    ↓
RECOGNITION MOMENT (Departure Candidate)
    A screen (portrait-oriented, embedded in a dark monolith 2m from the elevator)
    activates as the customer's card/phone is detected.
    "SIGNAL RECOGNIZED."
    Their body signal graphic appears. Then product recommendations.
    ↓
FREE EXPLORATION
    Product vitrines are distributed throughout the environment (80 sqft total).
    They emerge from the terrain — some recessed into the floor, some elevated on plinths.
    No prescribed path. The customer wanders.
    ↓
PRODUCT INTERACTION
    Each vitrine has an NFC point (small embossed period on the vitrine surface).
    Tap the card → screen in the vitrine activates:
    - Product name (Monument Extended, small)
    - Product spec block (Söhne Mono)
    - 360-degree slow rotation of the product (holographic projection or backlit screen)
    - For Departure Candidates: "COMPUTED FOR YOUR SIGNAL" + custom parameters
    - For Experience Tourists: "STANDARD CONFIGURATION" + general specs
    ↓
TOWARD 6F
    The staircase to 6F is at the far end of the 5F environment.
    A light line appears on the floor only as the customer approaches that zone.
    It does not beckon from across the room. It waits until they are near.
```

**Product vitrine UX:**

| Vitrine Type | Product | Display Method |
|---|---|---|
| **Floor-recessed** | Terrain Boot 01 | The shoe sits below floor level, visible through a glass panel. Lit from below. The customer looks down at it — the object is in the ground, like an artifact being excavated. |
| **Plinth-elevated** | Transit Shell | Suspended on a minimal armature at chest height. The garment hangs in the planetary atmosphere. Edge-lit. Transparent membrane catches the environmental light. |
| **Wall-embedded** | Mission Kit accessories | Recessed niches in a dark wall panel. Each piece in its own void. Small individual spotlights. |

**5F — Departure Candidate personalized display:**

When the recognition screen activates:

```
SIGNAL RECOGNIZED
────────────────────────────────

BODY SIGNAL: DX-0847
CADENCE: 112 BPM WALKING
FORCE PROFILE: HEEL-DOMINANT
LATERAL BALANCE: +2.3% RIGHT

────────────────────────────────
COMPUTED PRODUCTS
────────────────────────────────

TERRAIN BOOT 01
  Sole lattice: Variable density
  Heel zone: 1.8mm wall thickness
  Forefoot: 1.2mm wall thickness
  Arch support: Elevated +4mm
  Upper flex: Medial bias

  [VIEW IN DETAIL →]

────────────────────────────────
```

This information is also sent to the customer's phone for private reference.

### 6F — Manufacturing: The Theater

**Duration:** 5–15 minutes

**Spatial UX sequence:**

```
STAIR ARRIVAL FROM 5F
    The environment shifts abruptly. 5F was landscape. 6F is lab.
    Materials: exposed concrete, steel framing, glass partition.
    Temperature: slightly warmer (machines generate heat).
    Sound: mechanical rhythm — the honest sound of fabrication.
    ↓
VIEWING GALLERY (75 sqft)
    A glass partition separates the customer from the fabrication theater (150 sqft).
    They watch through the glass. The machines are visible and audible.
    ↓
FABRICATION DISPLAY
    A monitor at the viewing gallery shows the real-time fabrication status:
    - Currently fabricating: [Product name] for signal [ID]
    - Stage: [LATTICE GENERATION / UPPER ASSEMBLY / FINAL CALIBRATION]
    - Progress: visual representation (parametric form building layer by layer)
    ↓
ORDER / HANDOFF COUNTER (60 sqft)
    At the end of the viewing gallery.
    Departure Candidates confirm their order here. Staff processes the order.
    If a piece can be fabricated on-site quickly (30-60 min): they wait, or return.
    If extended fabrication: tracking token given.
    ↓
HANDOFF RITUAL
    For immediate pieces: presented on matte black tray, single downlight.
    Staff: "Your piece."
    For tracked pieces: physical token (engraved body signal) + digital tracker.
    Staff: "Your piece is forming. We will signal when it is ready."
```

**The handoff ritual — detailed design:**

The handoff is the quiet climax. No fanfare. No bag. Not yet.

- The piece is placed on a matte black molded tray (custom-fit to the product shape — each product has its own tray)
- A single overhead downlight illuminates the product from above — the same lighting approach used in the 2F scanning chamber (the object is now the specimen, not the customer)
- Staff stands behind the counter. Presents the tray with both hands. Makes eye contact.
- Says nothing except: "Your piece."
- Pause.
- The customer takes it. The piece is warm (heated tray surface, 28C — the same temperature as the scanning platform and the elevator floor. Continuity of sensation.)
- The customer holds their product and descends to 4F.

### 4F — Checkout: The Transaction

**Duration:** 3–5 minutes

**Spatial UX sequence:**

```
STAIR ARRIVAL FROM 6F
    The atmosphere decompresses.
    Light: Bone-toned (3000K). Warmer than any floor above.
    Sound: quiet. No ambient music. No hum. Functional silence.
    Materials: lighter finishes. Not stark white, but the darkness lifts.
    ↓
CHECKOUT COUNTER (80 sqft)
    Standard counter. Payment terminal.
    The card/phone carries the order. Tap to pay.
    Screen displays: product name, body signal ID (if applicable), total.
    No itemized receipt on screen — just the essentials.
    ↓
PACKAGING STATION (70 sqft)
    Visible to the customer (like 6F manufacturing — transparency at every stage).
    Staff wraps the product in black tissue.
    Places it in a matte Void-colored box.
    The box lid has a single embossed period.
    A Sohne Mono spec card is placed inside.
    ↓
PRODUCT HANDOFF
    The boxed product is placed on the counter.
    Staff: "Thank you."
    ↓
ESCALATOR TO 1F
    The escalator is the only forward path from 4F.
    Single direction: down.
    The descent takes 45 seconds (4 floors at standard escalator speed).
    ↓
1F → EXIT
    The airlock corridor in reverse. The floor light line pulses at heartbeat rhythm.
    The street door is ahead. Daylight visible through the gap.
    Exit.
```

**Packaging spec card (placed inside the box):**

```
────────────────────────────────
DUNE.X
────────────────────────────────

TERRAIN BOOT 01
SIGNAL: DX-0847
CONFIGURATION: BIODATA-DERIVED

SOLE: Variable-density lattice
UPPER: Parametric membrane
COLORWAY: VOID / BONE

────────────────────────────────

Care: Wipe with damp cloth.
Do not machine wash.
Do not expose to sustained UV.

Designed for transit.
Worn at the threshold.

────────────────────────────────
dunex.com/signal/DX-0847
────────────────────────────────
```

---

## Accessibility Within the Dark Framework

DUNE.X operates in deep darkness. This is a brand requirement. Accessibility within this framework requires creative solutions that maintain the aesthetic while ensuring safety, comfort, and inclusion.

### Universal Access

| Need | Solution |
|---|---|
| **Minimum illumination** | All circulation paths maintain a minimum of 50 lux at floor level (provided by floor light lines and wall edge glow). This is below standard retail lighting (300–500 lux) but above minimum safety standards for walking surfaces. |
| **Contrast** | The floor light lines provide consistent high-contrast wayfinding (Portal White on Void black). Edge-of-step illumination on all stairs. |
| **Elevator access** | The elevator serves all floors. Wheelchair-accessible dimensions (1.5m x 1.5m meets ADA minimum). Door opening time extended to 1200ms. Emergency controls behind a flush panel — staff can direct customers to them. |
| **Escalator alternative** | The staircase provides an alternative to the 4F→1F escalator. The staircase is illuminated with floor-line wayfinding throughout. |

### Sensory Considerations

| Need | Solution |
|---|---|
| **Photosensitivity** | The 5F planetary environment and 2F scanning chamber can trigger light sensitivity. Staff on 1F can ask during the persona-determination moment: "Any light or sound sensitivities we should know about?" The system can reduce light intensity and disable strobe/pulse effects per-customer (linked to their card). |
| **Sound sensitivity** | The 40Hz subsonic elements (elevator, 2F) may affect some customers. Staff can offer bypass: skip the elevator experience by using the staircase 3F→5F (with stair lighting providing a gentler transition). The 2F scanning chamber haptic floor can be disabled on request. |
| **Mobility** | All floors are on a single level (no split-levels). The vertical core is in a fixed position on every floor, so the elevator path is consistent and predictable. The 2F scanning platform is flush with the floor at entry. |

### Emergency Provisions

| Element | Detail |
|---|---|
| **Emergency lighting** | Battery-backed LED strips activate at standard illumination (200 lux) if primary lighting fails. Color: warm white (not Portal White — clearly distinct from brand lighting to signal emergency). |
| **Exit signage** | Despite the no-signage principle, emergency exit signs are present per building code. They are flush-mounted, dark-housing, minimal. In normal operation, they are nearly invisible against the dark walls. In emergency, they illuminate at standard brightness. |
| **Fire stairs** | Continuous fire staircase serves all floors. Always accessible. Always illuminated at minimum safety levels. |
| **Staff training** | All staff trained in emergency evacuation of dark environments. Each carries a small flashlight (matte black, naturally). |

---

## Spatial UX Principles Summary

1. **One path forward.** Architecture eliminates choice. The customer follows the building.
2. **Light leads, darkness follows.** The path ahead is lit. The path behind dims. No signs.
3. **Sound shifts before sight.** Audio crossfades in the stairwell prepare the customer for the next floor's atmosphere before they see it.
4. **Staff observe, not direct.** They are present. They wait. They respond.
5. **Temperature as signal.** Warmth (28C) marks intimate moments: the scanning platform, the elevator floor, the handoff tray. Coolness marks spectacle: 5F, the airlock.
6. **The card is the compass.** The black card links the customer to the building's systems. It unlocks, identifies, and purchases without the customer needing to do anything except carry it.
7. **Transitions are ceremonies.** Every floor change involves a threshold moment: a light pulse, a door opening, a sound shift. Nothing is merely functional.
8. **The descent is release.** The upward journey builds intensity. The downward journey releases it. 4F is deliberately anticlimactic. The escalator to 1F is the decompression chamber.

---

*The building is the guide. The light is the language. The customer is the subject. Every surface, every sound, every pause exists to carry them from the street to the threshold and back.*
