# DUNE.X — Biodata Scanning Experience (2F)

---

## Overview

The biodata scan is the most intimate moment in the DUNE.X journey. It is the point where the brand stops presenting and starts listening. The customer's body becomes the input — movement, pressure, cadence, thermal signature — and the output is a unique generative identity: the body signal.

The scan is optional. Departure Candidates choose it. Experience Tourists do not. But for those who enter the scanning chamber, the experience must feel like discovery, not measurement. They should leave knowing something about their body they did not know before.

Duration: 3 minutes 30 seconds active scan + 30 seconds visualization reveal. Total: 4 minutes.

---

## Physical Setup

### The Scanning Chamber (100 sqft)

The chamber is a circular room within the 2F floor plate. The customer enters from a short transition corridor. The room has three primary elements:

**1. The Platform**
- Circular, 3m diameter, raised 50mm from the floor
- Surface: pressure-sensitive treadmill with embedded force plates
- Material: matte black composite, warm to the touch (heated to 28C)
- Edge detail: a thin ring of light at the platform perimeter (Portal White, 3mm width, initially dim)
- The platform can detect: foot pressure distribution, gait cadence, stride length, force vectors, weight shift patterns

**2. The Visualization Wall**
- 270-degree curved LED wall surrounding the platform (the remaining 90 degrees is the entry/exit gap)
- Resolution: 4K per panel, 3 panels seamlessly joined
- Height: floor to 3.5m (70% of the 5m floor-to-floor height)
- Default state: deep Void black (#0A0A0C) with barely perceptible particle drift
- During scan: real-time biodata visualization (see Visualization Sequence below)
- Post-scan: body signal reveal

**3. The Overhead Array**
- Mounted at 4m height, above the platform center
- Contains: structured-light 3D scanner (full-body mesh capture in 2 seconds), IR thermal camera (body heat mapping), depth sensors (movement tracking)
- Encased in a dark matte housing — visible but not clinical. It should feel like an eye, not a machine.
- A single downlight within the array illuminates the customer from above during the scan — they become the specimen.

### Hardware Specification

| Component | Spec | Purpose |
|---|---|---|
| Pressure-plate treadmill | 2048 sensors, 100Hz sampling | Gait analysis, force distribution |
| Structured-light scanner | 0.5mm accuracy, 2s full capture | 3D body mesh for fit computation |
| IR thermal camera | 640x480, 30fps | Thermal mapping, circulation patterns |
| Depth sensors (x4) | Time-of-flight, 30fps | Movement trajectory tracking |
| LED wall (x3 panels) | 4K each, 120Hz, 1200 nits peak | Real-time biodata visualization |
| Floor light ring | Addressable LED strip, RGBW | Movement choreography guide |
| Overhead downlight | Tunable white, 2700K–6500K | Subject illumination |
| Haptic floor transducers | 20–100Hz range | Subtle vibration feedback |

---

## Pre-Scan: Consent and Preparation

### Arrival at 2F

The customer ascends from 1F via stairs. The stairwell transitions from the raw darkness of 1F to a slightly warmer ambient — still dark, but with a faint amber undertone in the stair lighting. This signals a change in register: from theatrical to intimate.

At the top of the stairs, a short corridor (45 sqft) leads to the scanning chamber entrance. The corridor walls display a single line of text, rear-projected in Söhne Mono Light:

```
YOUR BODY CARRIES A SIGNAL. WE ARE LISTENING.
```

### The Consent Surface

Before entering the chamber, the customer encounters a vertical panel at waist height, built into the corridor wall. It is a dark glass surface, approximately 400mm x 200mm, with a faint outline of a hand printed beneath the glass.

**The ritual:**
1. The surface is dark. A small line of Söhne Mono text above it reads: "Place your hand here to begin."
2. When the customer places their palm on the surface, the glass warms slightly (piezoelectric heating, from 22C to 30C over 2 seconds) and a soft light blooms outward from under their hand — Portal White, expanding in concentric rings.
3. The light completes its expansion (1200ms). A gentle haptic pulse through the glass confirms the gesture has been registered.
4. Below the surface, a small QR code is etched into the panel frame. Scanning it opens the full privacy policy on the customer's phone. The policy details: data is anonymized, stored as mathematical patterns (not images), used only for product computation, deletable on request.
5. The chamber door — a dark panel — slides open (800ms, mechanical easing).

**Design intent:** The consent moment is kinesthetic, not bureaucratic. The hand-on-glass gesture functions as both ritual (preparation for bodily engagement) and legal consent (the gesture is logged with timestamp). The warmth of the glass is deliberate — a human temperature, a handshake with the system.

**Microcopy:**
- Above surface: "Place your hand here to begin."
- After consent registered (appears briefly on the glass): "Consent received. Your data will be held as pattern, not image."
- If they hesitate (after 10 seconds of standing): nothing changes. No prompt. The system waits. Patience is the design.

### Walk-in vs. Booked Appointment

| Scenario | Experience |
|---|---|
| **Booked (Departure Slot)** | The chamber is pre-set for them. Their name or slot ID appears faintly on the chamber entry corridor wall as they approach. No wait. The system expects them. |
| **Walk-in** | If the chamber is occupied, the customer waits in the 2F interactive installation area (100 sqft adjacent space with ambient brand immersion — projected data streams, material samples behind glass). Wait time: 5–10 minutes typical. A small counter near the corridor shows status: "CHAMBER / OCCUPIED / NEXT AVAILABLE: ~4 MIN" |
| **Walk-in, no wait** | Identical to booked experience, minus the personalized name display. |

---

## The Scan Sequence (3 Minutes 30 Seconds)

### Phase 1: Orientation (0:00–0:30)

The customer enters the chamber. The door closes behind them (800ms). Complete darkness for 2 seconds — the eyes adjust. Then:

- The platform edge light ring activates at 10% brightness. A soft ring of Portal White defining the circular boundary.
- The overhead downlight fades in at warm temperature (3000K), casting a gentle cone of light on the platform center.
- A voice — not recorded speech, but synthesized tone-text (a blend of subtle musical note and consonant, gender-neutral, unhurried) — speaks through embedded speakers:

```
"Step onto the platform. Stand at center."
```

The customer steps onto the platform. As their weight is registered by the pressure sensors, the light ring brightens to 30%. The platform is warm underfoot.

A brief calibration pause (3 seconds). The structured-light scanner fires — a wash of patterned light sweeps over the customer's body in 2 seconds. On the visualization wall, a faint wireframe outline of their body appears and dissolves. They have been measured. The wall returns to black.

```
"Your form has been captured. Now we read your movement."
```

### Phase 2: Movement Choreography (0:30–2:30)

This is the active scan period. The customer moves — but they are not told to "walk naturally" or "exercise." Instead, the floor light ring becomes their choreographer.

**Movement Sequence:**

| Time | Light Cue | Customer Action | Data Captured |
|---|---|---|---|
| 0:30–0:50 | A single point of light appears on the platform edge, directly in front of the customer. It begins to move clockwise along the ring, slowly. | The customer's eyes follow. Their body rotates. Weight shifts. | Rotational balance, lateral force distribution, spinal alignment |
| 0:50–1:10 | The point splits into two lights, moving in opposite directions around the ring. They converge at the back of the platform and pulse. | The customer turns to face the convergence point. A full rotation. | Full rotational gait, pivot mechanics, hip and ankle mobility |
| 1:10–1:40 | The ring transitions to a forward-moving pattern — a wave of light flowing from back to front, repeating. | The customer walks forward naturally, following the light flow. The treadmill activates at walking pace (1.2 m/s). | Gait cadence, stride length, heel-to-toe pressure map, force vectors per step |
| 1:40–2:00 | The treadmill speed increases slightly (1.6 m/s). The light wave accelerates. | The customer's pace increases. A faster walk, approaching a jog. | Dynamic force distribution, ankle flex, toe-off impulse |
| 2:00–2:15 | The treadmill decelerates. The light ring returns to a steady glow. | The customer slows. Stands still. | Deceleration balance, recovery stance |
| 2:15–2:30 | Three concentric rings of light expand outward from the platform center, passing under the customer's feet. | The customer stands still. The light moves beneath them. | Standing pressure distribution, weight balance, thermal footprint (IR camera captures full standing heat map) |

**During the entire movement sequence, the visualization wall is active:**

The 270-degree LED wall renders the customer's biodata in real time. Not as graphs or dashboards. As light.

- **Movement trajectories** appear as luminous trails — white lines tracking the path of shoulders, hips, ankles through space. They build up like long-exposure photography.
- **Force distribution** renders as color intensity on a ground-plane projection — areas of high pressure glow Signal Red (#E94520), medium pressure in Portal White, low pressure fades to Void.
- **Cadence** is translated into rhythmic pulses of light on the wall — the customer's walking rhythm becomes a visual heartbeat.
- **Thermal data** materializes as a ghostly heat map overlay — warm areas (core, face, hands) glow amber, cool extremities fade to blue-white.

The customer sees all of this happening around them. Their movement creates the visual. They are performing, and the room is responding.

### Phase 3: Stillness (2:30–3:00)

The treadmill is off. The customer stands on the platform.

```
"Be still. Breathe."
```

The overhead light shifts to cool (5500K). The visualization wall slowly aggregates all the data captured in the previous two minutes. The individual trails, maps, and pulses begin to converge — merging, layering, compressing into a single evolving form.

The customer watches their data becoming one thing.

The floor transducers emit a subtle vibration at 40Hz — the same frequency they will feel in the elevator later. A premonition embedded in the body.

### Phase 4: The Body Signal Reveal (3:00–3:30)

The aggregated data crystallizes.

On the visualization wall, directly in front of the customer, a single generative graphic materializes from the convergence of all biodata streams. This is their **body signal** — a unique visual identity computed from their movement, force, cadence, and thermal signature.

**What the body signal looks like:**
- A geometric form — part topographic map, part waveform, part crystalline lattice
- Unique to each individual (no two scans produce the same output)
- Color: primarily Portal White and Cold Glow (#D0D8E8) with traces of Signal Red at points of peak force
- Scale: approximately 1m x 1m on the wall, slowly rotating in 3D
- Aesthetic reference: a Voronoi diagram crossed with a sound wave, filtered through parametric mesh logic

The room holds this image for 10 seconds. The customer stands in front of their data portrait.

```
"Your signal."
```

Then the graphic compresses — shrinking, folding into itself — and a notification arrives on the customer's phone (via the black card NFC link or the DUNE.X app):

```
BODY SIGNAL CAPTURED
Your unique identifier has been recorded.
It will shape what comes next.
[View your signal →]
```

The phone now holds their body signal graphic — viewable, shareable, permanent. It becomes their DUNE.X identity.

The chamber lights dim. The door opens. The customer exits toward the stairs to 3F.

---

## Data Flow: From Signal to Product

```
BIODATA CAPTURE (2F)
    │
    ├── Gait cadence → Sole flex-zone mapping
    ├── Force distribution → Lattice density computation (heel/toe/arch)
    ├── Stride length → Upper pattern scaling
    ├── Ankle mobility → Collar height and flex geometry
    ├── Thermal signature → Material breathability zoning
    ├── Body mesh (3D scan) → Fit computation (size, volume, proportion)
    │
    ▼
AI COMPUTATION ENGINE
    │
    ├── Generates parametric sole lattice (variable density per zone)
    ├── Computes upper pattern (flex zones, seam placement, ventilation)
    ├── Determines material composition per zone
    ├── Produces fabrication instructions for 6F robotic assembly
    │
    ▼
PRODUCT RECOMMENDATION (5F)
    │
    ├── Terrain Boot 01 → customized with scan data
    ├── Transit Shell → collar and sleeve geometry adjusted
    ├── Mission Kit → accessory sizing and material spec
    │
    ▼
FABRICATION (6F)
    │
    └── Robotic assembly uses biodata-derived parameters
```

---

## Privacy Architecture

### Data Handling Principles

| Principle | Implementation |
|---|---|
| **Pattern, not image** | Raw camera footage and 3D scans are processed in real time and discarded. Only mathematical patterns (force vectors, cadence frequencies, dimensional ratios) are stored. The system cannot reconstruct the customer's appearance from stored data. |
| **Anonymous by default** | Data is linked to a signal ID, not a name. The customer's personal information (from booking or checkout) is stored separately and linked only at their request. |
| **Deletable** | The body signal profile can be deleted at any time via the app or by contacting DUNE.X. Deletion is immediate and complete. |
| **No third-party sharing** | Biodata is used exclusively for DUNE.X product computation. No sale, no sharing, no advertising use. |
| **On-premise processing** | All AI computation happens on local hardware within the flagship store. No cloud processing of biometric data. |

### Consent Record

The hand-on-glass consent gesture is logged with:
- Timestamp (ISO 8601)
- Signal ID (anonymous identifier)
- Duration of contact (confirming intentional gesture, not accidental touch)
- Privacy policy version acknowledged (linked via QR)

No biometric data is captured before consent is registered.

---

## Edge Cases

### Customer Discomfort

| Situation | Response |
|---|---|
| Customer hesitates to step on platform | Room remains in orientation state indefinitely. No timeout. No prompt. A staff member is available in the 2F corridor if needed. |
| Customer wants to stop mid-scan | Any step off the platform pauses the scan. The visualization wall holds its current state. Voice: "Take your time." Stepping back on resumes from where they left off. |
| Customer with mobility limitations | The movement choreography adapts. The treadmill is optional — standing-only scans are possible. The system captures whatever movement the customer provides. Even a stationary scan produces a valid body signal (from pressure distribution, thermal data, and 3D mesh). See Accessibility section. |
| Customer wants to redo the scan | Permitted. The chamber resets in 30 seconds. Staff can initiate a rescan via the 2F control panel. |

### Accessibility

| Need | Accommodation |
|---|---|
| **Wheelchair users** | The platform is flush with the floor at the entry point (ramped edge). Pressure sensors read wheel distribution. The movement choreography is replaced with a stationary sequence: the light ring performs its patterns around the customer without requiring movement. The visualization wall still generates a body signal from available data (pressure map, thermal, 3D mesh). |
| **Visual impairment** | The floor light choreography is supplemented by haptic cues — the platform vibrates directionally to indicate movement guidance. The visualization wall content is accompanied by subtle audio tones that vary with data intensity. The body signal is delivered as both visual and haptic pattern on the phone. |
| **Hearing impairment** | All voice prompts are also displayed as text on the visualization wall. The text appears in Söhne Mono, Portal White, lower-third placement. |
| **Anxiety / claustrophobia** | The chamber door remains unlocked at all times. Staff can accompany the customer into the chamber if requested. The 270-degree wall (not 360) ensures there is always a visible exit. |

---

## Technical Infrastructure

### Processing

| Component | Spec |
|---|---|
| Edge compute | NVIDIA Jetson AGX Orin (local AI inference) |
| Rendering | Dual NVIDIA RTX 4090 (real-time visualization) |
| Sensor fusion | Custom middleware synchronizing pressure, depth, IR, and structured-light data at 100Hz |
| Body signal generation | Proprietary generative algorithm — inputs: 47 biodata parameters, output: unique parametric graphic |
| Latency | Sensor-to-visualization: less than 50ms. The customer's movement and the wall's response feel simultaneous. |

### Maintenance

- Daily calibration: automated sensor check at store opening (5 minutes, unmanned)
- Weekly: manual inspection of treadmill surface, LED panel uniformity, IR camera alignment
- Monthly: full system diagnostic, software update window
- Treadmill belt replacement: every 6 months under normal use

---

## Experience Summary

```
ENTER CORRIDOR
    "Your body carries a signal. We are listening."
    ↓
CONSENT SURFACE
    Hand on glass → warmth → light bloom → door opens
    ↓
CHAMBER — ORIENTATION (30s)
    Step on platform → body captured → wireframe flash
    "Your form has been captured. Now we read your movement."
    ↓
CHAMBER — MOVEMENT (2 min)
    Follow the light → walk → accelerate → decelerate → stand
    Visualization wall: trails, force maps, heat, rhythm
    ↓
CHAMBER — STILLNESS (30s)
    "Be still. Breathe."
    Data converges on the wall
    ↓
CHAMBER — REVEAL (30s)
    Body signal materializes
    "Your signal."
    Sent to phone
    ↓
EXIT TO 3F
```

**Total duration:** 4 minutes
**Emotional arc:** Anticipation → Trust (consent) → Curiosity (orientation) → Engagement (movement) → Contemplation (stillness) → Recognition (reveal)

---

*The body speaks. The room listens. The signal forms. This is not measurement. This is translation.*
