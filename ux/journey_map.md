# DUNE.X — Customer Journey Map

---

## Overview

The DUNE.X customer journey is not a shopping experience. It is a departure sequence. Every touchpoint — from first encounter to post-purchase tracking — follows the logic of transit preparation: briefing, calibration, boarding, reveal, receipt, and return.

Two personas move through the system differently. The Departure Candidate completes the full sequence, including biodata scanning. The Experience Tourist follows an abbreviated path — still theatrical, still intentional, but without the body-data layer.

Both journeys share a single principle: the customer is never rushed. Every transition is earned.

---

## Phase 0 — Awareness (Pre-Visit)

### Touchpoint: Digital Discovery

| Element | Detail |
|---|---|
| **Channel** | Instagram, architectural media (Dezeen, ArchDaily), word of mouth, SpaceX/SCRY community overlap |
| **What they see** | Campaign imagery: single figure at light portal, transparent garments catching edge glow, biodata visualizations. No product shots in isolation. Always the world first. |
| **Tone** | Clinical Poet fragments. "The body generates data. Data reveals form." No price, no CTA. Atmosphere only. |
| **Feeling** | Curiosity. Something unfamiliar. Not quite fashion, not quite technology. A threshold they want to approach. |

### Touchpoint: Website (dunex.com)

| Element | Detail |
|---|---|
| **Entry** | 2 seconds of complete darkness. Then a light ring expands from center. Then the hero image fades in behind it. Then the text: "FUTURE YOUR PERFORMANCE." |
| **Action** | Browse collection (Terrain Boot 01 as hero product), read the manifesto ("We dress the departure"), view the flagship store concept. |
| **Departure Slot booking** | Optional. A simple form: name, preferred date, email. Confirmation copy: "Your departure slot is confirmed. [DATE]. [TIME]. Arrive at the threshold." |
| **Walk-in note** | Copy on the booking page: "Walk-ins are welcomed. Every departure begins unplanned." |
| **Feeling** | Drawn in. The website does not sell. It prepares. |

### Touchpoint: Booking Confirmation

| Element | Detail |
|---|---|
| **Medium** | Email + optional calendar invite |
| **Subject line** | "DUNE.X / DEPARTURE SLOT CONFIRMED" |
| **Body** | Söhne Mono. Date, time, address. No images. One line of copy at the bottom: "Wear what you intend to leave behind." |
| **Feeling** | Anticipation. The brevity signals seriousness. |

---

## Phase 1 — Arrival (1F)

### 1F: The Airlock

**Duration:** 60–90 seconds

| Element | Detail |
|---|---|
| **What happens** | Customer enters from street through a narrow, compressed corridor (120 sqft). Ambient street light is cut immediately. The corridor is dark, with a single thin line of white light embedded in the floor, drawing forward. Sound dampens. Temperature drops 2 degrees. |
| **What they see** | Nothing decorative. Black walls, raw material. The floor light line is the only orientation. At the end of the corridor: a wider space opens. The DUNE.X wordmark is projected in Portal White on the far wall — faint, monumental, then dims. |
| **Staff interaction** | A single host stands at the threshold where the corridor opens. Dressed in DUNE.X. Does not greet verbally until the customer reaches them. Then: "Welcome to DUNE.X. Are you here for a departure, or to explore?" |
| **The branch** | This question determines the persona path. "Departure" = Departure Candidate (full journey, biodata scan). "Explore" = Experience Tourist (abbreviated path, no scan). |
| **What they receive** | A black card — matte, featureless except for a small embossed period (the D.X mark). This card is NFC-enabled. It is their identity throughout the store. For Departure Candidates, it will later hold their body signal data. For Experience Tourists, it unlocks product displays and checkout. Alternatively: the DUNE.X app on their phone serves the same function. |
| **Feeling** | Threshold crossed. The street is gone. They are inside the system now. |

### Microcopy — 1F

- Host greeting: "Welcome to DUNE.X. Are you here for a departure, or to explore?"
- If they hesitate: "There is no wrong answer. Both paths lead through."
- Card handoff: "This is your signal. It moves with you."

---

## Phase 2 — Calibration (2F) [Departure Candidate Only]

### 2F: The Biodata Scan

**Duration:** 3–4 minutes total (see `biodata_experience.md` for full spec)

| Element | Detail |
|---|---|
| **What happens** | The Departure Candidate ascends to 2F via stairs. They enter the scanning chamber — a circular platform surrounded by visualization walls. A brief privacy consent moment (hand placed on a lit surface). Then the scan begins: structured-light scanner, pressure-plate treadmill, IR camera. They move as guided by light patterns on the floor. |
| **What they see** | Their biodata materializing in real time on the surrounding walls — movement trajectories as light trails, force distribution as heat maps, cadence as waveforms. Abstract, beautiful, personal. |
| **What they receive** | A "body signal" — a unique generative graphic derived from their biodata. Sent to their phone via the black card / app. This becomes their DUNE.X identity. It influences the products recommended to them on 5F. |
| **Experience Tourist path** | Experience Tourists skip 2F entirely. They proceed directly from 1F to 3F via stairs. The stairwell between 1F and 3F passes by the 2F entrance but does not require entry. A subtle light gradient on the stair wall shifts color as they pass the 2F level — they sense the space without entering it. |
| **Feeling** | Intimate. The body is understood, not judged. The visualization transforms clinical data into something aesthetic. They see themselves as data, and it is beautiful. |

### Microcopy — 2F

- Entry prompt (wall text, Söhne Mono): "Your body carries a signal. We are listening."
- Consent surface: "Place your hand here to begin." (No legalese visible. Privacy details accessible via QR on the surface edge.)
- Scan initiation: "Stand at center. Follow the light."
- Scan complete: "Signal captured. Your body has spoken."
- Body signal delivery (phone notification): "Your signal is ready. It will shape what comes next."

---

## Phase 3 — Pause (3F)

### 3F: Cafe and Elevator Lobby

**Duration:** 5–15 minutes (self-paced)

| Element | Detail |
|---|---|
| **What happens** | Both personas converge on 3F. This is the social floor — a lounge with minimal seating (140 sqft), a cafe counter with a restricted menu (black coffee, matcha, water — served in unglazed ceramic vessels). The space is warmer than the floors below. Ambient sound: low-frequency hum, barely perceptible. |
| **The elevator lobby** | 60 sqft. The focal point. A departure board mounted on the wall beside the elevator doors, rendered in Söhne Mono on a dark LED panel. It reads: |

```
DEPARTURE 05F
STATUS    BOARDING
SLOT      [CUSTOMER NAME or number]
ETA       00:42
```

| Element | Detail |
|---|---|
| **What they do** | Sit. Drink. Look at the departure board. Watch it update. When their slot appears, they approach the elevator. A staff member may be present but does not direct — the board is the authority. |
| **The anticipation design** | The departure board updates in real time. Names/numbers cycle. When the customer's identifier appears, the elevator doors emit a thin rim of Portal White light at the seam. The board updates: "STATUS NOW BOARDING." |
| **Feeling** | Suspension. The journey so far has been dark, intimate, compressed. This floor breathes. The coffee is warm. But the departure board keeps pulling attention. Something is about to change. |

### Microcopy — 3F

- Departure board: "DEPARTURE 05F / STATUS BOARDING / SLOT [ID]"
- Board update when ready: "STATUS NOW BOARDING"
- If they approach early: board reads "STATUS HOLDING" — no staff intervention needed
- Cafe menu (Söhne Mono, printed on black card): "Black / Matcha / Still / Sparkling"

---

## Phase 4 — Transit (3F Elevator to 5F)

### The Elevator Moment

**Duration:** 42 seconds

This is the emotional hinge of the entire journey. The elevator skips 4F. The customer knows they are going to 5F — "The Reveal" — but they do not know what that means.

| Second | What Happens |
|---|---|
| **0–3s** | Doors close. Complete darkness. No floor indicator. No muzak. Silence. |
| **3–8s** | A low-frequency tone begins — barely audible, felt more than heard. 40Hz. Subwoofer embedded in the elevator floor. The body registers acceleration before the mind does. |
| **8–15s** | A thin line of Portal White light appears at the door seam. 1mm. Then 3mm. Growing imperceptibly. The tone rises in pitch — 40Hz to 60Hz. |
| **15–25s** | The rim light has expanded to a visible glow outlining the entire door frame. The elevator interior is no longer fully dark — the customer can see their own hands, their reflection. The tone stabilizes. |
| **25–35s** | The light intensifies. The door seam becomes bright. Something is clearly on the other side. The customer's black card / phone vibrates once — a single pulse. |
| **35–40s** | Tone fades to silence. Light holds at maximum. A breath of stillness. |
| **40–42s** | Doors open. Slowly. 1200ms mechanical slide. The light from 5F floods in. |

**Feeling:** Transit. The in-between. They were on 3F — warm, social, grounded. Now they are somewhere else entirely. The 42 seconds transformed them from a customer in a cafe to a figure standing at the threshold of another world.

---

## Phase 5 — The Reveal (5F)

### 5F: Planetary Environment + Product Display

**Duration:** 10–20 minutes (self-paced)

| Element | Detail |
|---|---|
| **What they see** | Elevator doors open to a complete environment change. Planetary scenography — Moon or Mars terrain simulation. The floor texture changes. The light is different: cold, directional, casting long shadows. Product vitrines are embedded in the landscape like artifacts found in alien terrain. |
| **Departure Candidate experience** | Their phone / card is recognized by the 5F system. A screen near the first vitrine activates and displays: "SIGNAL RECOGNIZED." Then their body signal graphic appears, followed by product recommendations computed from their biodata. "Based on your cadence profile, force distribution, and movement signature, the following pieces were shaped for your body." The Terrain Boot 01 is highlighted with specific customization parameters derived from their scan. |
| **Experience Tourist experience** | No personalized display. They encounter the same vitrines but browse freely. Product labels provide standard specs in Söhne Mono. The environment itself is the experience — they are walking through the world DUNE.X was designed for. |
| **Product interaction** | Each vitrine has a small NFC point. Tap the black card / phone to unlock detailed specs, 360-degree holographic projection of the product, and material close-ups displayed on a built-in screen. |
| **Staff** | Present but peripheral. Available for questions. Never approach first. They stand at the edges of the environment, dressed in DUNE.X, visible but still. |
| **Feeling** | Awe, restrained. The environment validates the brand promise. This is not marketing — this is the destination. The products belong here. So does the customer. |

### Microcopy — 5F

- Screen recognition: "SIGNAL RECOGNIZED."
- Product recommendation header: "Computed for your body."
- Vitrine label (Söhne Mono): "TERRAIN BOOT 01 / LATTICE SOLE / PARAMETRIC UPPER / BIODATA-DERIVED FIT"
- If no scan data: "TERRAIN BOOT 01 / LATTICE SOLE / PARAMETRIC UPPER / STANDARD CONFIGURATION"

---

## Phase 6 — Manufacturing (6F)

### 6F: Robotic Fabrication Theater

**Duration:** 5–15 minutes (depends on order)

| Element | Detail |
|---|---|
| **What happens** | Customer ascends from 5F to 6F via stairs. They enter the manufacturing theater — a viewing gallery overlooking robotic fabrication equipment. If they have placed an order, they watch their piece being made. If browsing, they watch the machines at work on other orders (or in demonstration mode). |
| **Departure Candidate** | Confirms their order at a handoff counter. Their body signal data flows into the fabrication parameters — visible on a monitor showing the AI generating their specific lattice structure, sole geometry, and upper pattern. A staff member explains the process without overselling. "Your signal is shaping the lattice now. Layer one of four." |
| **Experience Tourist** | Watches the machines. Can place a standard-configuration order here. The experience is still compelling — visible engineering, robots in motion, material transformation. |
| **The handoff ritual** | For pieces that can be fabricated on-site during the visit (small accessories, sole components): the finished piece is presented on a matte black tray, under a single downlight. Staff places it before the customer without ceremony. Silence. Then: "Your piece." For larger items requiring extended fabrication: a tracking token is given — a small physical object (engraved with their body signal) plus a digital tracker sent to their phone. |
| **Feeling** | Witnessing. The customer sees the system that made their piece. Manufacturing is not hidden. It is the final act of transparency. |

### Microcopy — 6F

- Fabrication monitor: "LATTICE GENERATION / LAYER 2 OF 4 / SIGNAL SOURCE: [BODY ID]"
- Handoff (staff): "Your piece."
- Tracking token copy: "Your Terrain Boot is in transit. Track its formation."
- If watching others' fabrication: "The machines are at work. Every piece begins with a signal."

---

## Phase 7 — Checkout (4F)

### 4F: Transaction and Departure

**Duration:** 3–5 minutes

| Element | Detail |
|---|---|
| **What happens** | Customer descends from 6F to 4F. This floor is deliberately functional — the least conceptual space. Clean surfaces, efficient layout, warm Bone-toned lighting (a shift from the cold light above). This is the decompression chamber. |
| **Payment** | Counter transaction. Standard payment methods. The black card / phone completes the purchase with a tap. No upselling. No "would you also like." |
| **Packaging** | The packaging station is visible. Products are wrapped in black tissue, placed in a matte Void-colored box with a single embossed period on the lid. A Söhne Mono spec card is placed inside: product name, body signal ID (if applicable), care instructions, and a single line: "Designed for transit. Worn at the threshold." |
| **Receipt** | Digital only. Sent to email. Formatted in Söhne Mono. Contains order ID, body signal reference, and a link to the manufacturing tracker (if item is still in production). |
| **Feeling** | Calm efficiency. The spectacle is over. This is the quiet after the threshold. The packaging is respectful — the product is treated as a specimen, not merchandise. |

### Microcopy — 4F

- Checkout screen: "Transaction complete."
- Packaging card: "Designed for transit. Worn at the threshold."
- Receipt subject line: "DUNE.X / ORDER [ID] / CONFIRMED"
- If item is in production: "Your piece is forming. We will signal when it is ready."

---

## Phase 8 — Exit (4F to 1F)

### Descent

| Element | Detail |
|---|---|
| **What happens** | Escalator from 4F to 1F. The journey reverses — from warm functional light back into the compressed darkness of the airlock corridor. The exit is through the same corridor they entered. |
| **What they notice** | The corridor feels different leaving. The floor light line now pulses faintly — a slow heartbeat rhythm. The DUNE.X wordmark is no longer projected. The exit is simply a door to the street. |
| **Feeling** | Transition back. The street feels different after 30–60 minutes inside the void. Colors seem louder. The ordinary world is slightly disorienting. This is the intended aftereffect. |

---

## Phase 9 — Post-Purchase (Digital)

### Manufacturing Tracker

For items in extended production (full Terrain Boot, custom Transit Shell):

| Element | Detail |
|---|---|
| **Interface** | SpaceX mission-tracker aesthetic. Dark background. A simplified schematic of the product, with each manufacturing stage represented as a phase on a horizontal timeline. |
| **Status updates** | Delivered as push notifications and visible in the tracker. Written in Clinical Poet: |

```
TERRAIN BOOT 01 — ORDER [ID]
STATUS: LATTICE GENERATION
"Your sole structure is being computed from your cadence data.
Layer 2 of 4. Estimated completion: 72 hours."

---

TERRAIN BOOT 01 — ORDER [ID]
STATUS: UPPER ASSEMBLY
"The parametric upper is being cut. Your movement signature
defined the flex zones. 14 pattern pieces."

---

TERRAIN BOOT 01 — ORDER [ID]
STATUS: FINAL CALIBRATION
"Your Terrain Boot is in final assembly. Sole bonded.
Upper sealed. Quality verification in progress."

---

TERRAIN BOOT 01 — ORDER [ID]
STATUS: DEPARTURE READY
"Your piece is complete. It is waiting for you."
```

| Element | Detail |
|---|---|
| **Cadence** | Updates arrive every 24–48 hours. Never more frequent. Each update is brief. |
| **Visual** | Each status update is accompanied by a single image — either a macro detail of the product in its current fabrication stage, or a generative visualization of the manufacturing data. |

### Body Signal Profile

| Element | Detail |
|---|---|
| **What it is** | A permanent digital artifact derived from the customer's biodata scan. Accessible via the DUNE.X app or a personal URL. |
| **What it contains** | The body signal graphic (unique generative visual), key biodata metrics (anonymized), and a log of all DUNE.X products computed from this signal. |
| **How it evolves** | Return visits and additional scans update the profile. The body signal graphic shifts over time — a living document of the customer's physical identity as interpreted by DUNE.X AI. |
| **Feeling** | Ownership. The body signal is theirs. It is not a loyalty card. It is a portrait. |

### Return Visit

| Element | Detail |
|---|---|
| **Recognition** | On return visits, the 1F host can see (via the card / app) that this is a returning customer. The greeting shifts: "Welcome back. Your signal is on file." |
| **2F option** | Returning Departure Candidates can choose to rescan (updating their body signal) or proceed with existing data. |
| **5F experience** | The product recommendations update based on the evolved body signal and new collection releases. |
| **Feeling** | Continuity. The system remembers. Each visit builds on the last. |

---

## Journey Comparison: Two Personas

### Departure Candidate (Full Sequence)

```
WEBSITE → Book departure slot (or walk in)
    ↓
1F  ARRIVAL → Airlock corridor → Host greeting → "Departure" → Black card
    ↓
2F  CALIBRATION → Biodata scan (3–4 min) → Body signal generated → Sent to phone
    ↓
3F  PAUSE → Cafe → Departure board → Wait for boarding call
    ↓
    ELEVATOR → 42-second transit → Darkness → Tone → Light builds → Doors open
    ↓
5F  REVEAL → Planetary environment → Signal recognized → Personalized product display
    ↓
6F  MANUFACTURING → Watch fabrication → Order confirmed → Handoff or tracking token
    ↓
4F  CHECKOUT → Payment → Packaging ritual → Receipt
    ↓
1F  EXIT → Escalator descent → Airlock reversal → Street
    ↓
POST → Manufacturing tracker → Body signal profile → Return visits
```

**Total in-store duration:** 45–75 minutes
**Emotional arc:** Curiosity → Intimacy → Suspension → Awe → Witnessing → Calm → Re-entry

### Experience Tourist (Abbreviated Sequence)

```
WEBSITE → Browse (no booking required, walk-in)
    ↓
1F  ARRIVAL → Airlock corridor → Host greeting → "Explore" → Black card
    ↓
    SKIP 2F → Stairs directly to 3F (pass 2F entrance, sense the space)
    ↓
3F  PAUSE → Cafe → Departure board → Wait for boarding call
    ↓
    ELEVATOR → Same 42-second transit experience
    ↓
5F  REVEAL → Planetary environment → Standard product display (no personalization)
    ↓
    OPTIONAL: 6F → Watch machines, place standard order
    ↓
4F  CHECKOUT → Payment → Packaging → Receipt
    ↓
1F  EXIT → Escalator descent → Street
    ↓
POST → Standard order tracking (no body signal profile)
```

**Total in-store duration:** 25–45 minutes
**Emotional arc:** Curiosity → Atmosphere → Suspension → Awe → Decision → Calm → Re-entry

---

## Touchpoint Inventory

| # | Touchpoint | Physical / Digital | Persona | Key Emotion |
|---|---|---|---|---|
| 01 | Social media discovery | Digital | Both | Curiosity |
| 02 | Website entry sequence | Digital | Both | Drawn in |
| 03 | Departure slot booking | Digital | DC | Commitment |
| 04 | Booking confirmation email | Digital | DC | Anticipation |
| 05 | 1F Airlock corridor | Physical | Both | Threshold |
| 06 | 1F Host greeting + branch | Physical | Both | Guided |
| 07 | 1F Black card handoff | Physical | Both | Identity |
| 08 | 2F Biodata scan | Physical | DC only | Intimacy |
| 09 | 2F Body signal delivery | Phys + Digital | DC only | Recognition |
| 10 | 3F Cafe + social pause | Physical | Both | Suspension |
| 11 | 3F Departure board | Physical | Both | Anticipation |
| 12 | Elevator transit (42s) | Physical | Both | Transit |
| 13 | 5F Environment reveal | Physical | Both | Awe |
| 14 | 5F Signal recognition | Phys + Digital | DC only | Validation |
| 15 | 5F Product interaction | Physical | Both | Engagement |
| 16 | 6F Fabrication theater | Physical | Both | Witnessing |
| 17 | 6F Handoff / token | Physical | Both | Receipt |
| 18 | 4F Checkout + packaging | Physical | Both | Calm |
| 19 | 4F → 1F Descent | Physical | Both | Re-entry |
| 20 | Manufacturing tracker | Digital | Both | Patience |
| 21 | Body signal profile | Digital | DC only | Ownership |
| 22 | Return visit recognition | Physical | DC | Continuity |

---

## Emotional Temperature Map

```
PHASE:    AWARENESS  ARRIVAL  SCAN    PAUSE   TRANSIT  REVEAL  MFG    CHECKOUT  POST

INTENSITY:   ░░       ▒▒      ▓▓      ░░      ████     ████    ▓▓      ░░       ▒▒

WARMTH:      cold     cold    warm    warm    cold     cold    neutral warm     neutral

LIGHT:       dark     dark    data    amber   void→    bright  task    bone     screen
                              glow            white    cold    light   warm     dark

SOUND:       none     damp    hum     cafe    40-60Hz  ambient mech    quiet    notif
                              pulse   murmur  tone     breath  whir
```

---

*"Would this feel right at the threshold?" Every touchpoint answers yes. The journey does not sell. It prepares.*
