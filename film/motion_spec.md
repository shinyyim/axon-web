# DUNE.X — Motion Design Language

**Film:** *"SIGNAL"*
**Document type:** Motion specification, VFX pipeline, sound architecture, delivery formats
**Status:** Production-ready

---

## 1. Transition System

### Core Principle

Light moves first. Content follows. Every transition is a transformation of illumination, never a mechanical edit. The viewer should never feel a "cut" -- only a shift in where the light falls.

### Transition Types

#### 1.1 Light Fade-In / Fade-Out
- **Use:** Opening from void, closing to void
- **Duration:** 1600ms -- 2000ms
- **Easing:** Custom cubic-bezier (0.16, 0.0, 0.12, 1.0) -- slow start, precise deceleration
- **Behavior:** Luminance ramps from 0 to target over duration. Not a dissolve -- specific light sources activate. The biodata filaments in Scene 01 grow in brightness; they don't fade in as an image.
- **Inverse (fade-out):** Light sources dim in reverse order of appearance. Last light on, first light off.

#### 1.2 Match Dissolve
- **Use:** Scene 01 to Scene 02 (foot wireframe to parametric cloud)
- **Duration:** 1200ms
- **Easing:** Linear blend with cubic-bezier position shift (0.25, 0.0, 0.10, 1.0)
- **Behavior:** Both images are visible simultaneously during the transition. Shared geometric forms (the wireframe architecture) serve as the anchor. The foot's biodata filaments spatially reorganize into the parametric cloud -- it is not two images fading, it is one data structure transforming.
- **Technical note:** Requires pre-vis alignment of wireframe endpoint positions with parametric cloud start positions. CG team builds the morph as a continuous animation, not a compositing dissolve.

#### 1.3 Light Wipe
- **Use:** Scene 02 to Scene 03 (CG solidification to practical fabrication)
- **Duration:** 1000ms
- **Easing:** Linear luminance expansion, cubic-bezier spatial (0.20, 0.0, 0.15, 1.0)
- **Behavior:** The overhead spotlight in the CG sequence (illuminating the solidified boot) expands radially until the frame is white. The white holds for 2 frames (83ms), then collapses to reveal the practical overhead spotlight in the fabrication cell. Light is the bridge between digital and physical.
- **Peak luminance:** 92% frame coverage at center point (not 100% -- the corners stay dark, maintaining void presence).

#### 1.4 Cross-Dissolve
- **Use:** Scene 03 to 04, Scene 04 to 05
- **Duration:** 1000ms -- 1200ms
- **Easing:** Cubic-bezier (0.25, 0.0, 0.10, 1.0) on opacity. Standard cross.
- **Behavior:** Standard dual-image dissolve, but with luminance priority: highlights from the incoming shot appear before the outgoing shot's shadows fade. This creates a sensation of light arriving rather than images blending.
- **Special case (Scene 04 to 05):** Match dissolve on the boot's profile silhouette. The boot on the pedestal spatially aligns with the boot on the foot. The dissolve is anchored to the boot shape.

#### 1.5 Natural Absorption
- **Use:** Scene 05 to Scene 06 (figure walks into darkness)
- **Duration:** 2000ms
- **Easing:** Natural (no artificial ramp -- the figure physically recedes)
- **Behavior:** No optical dissolve. The figure walks into the far darkness of the stage, diminishing naturally. The void absorbs them. The camera holds. Darkness accumulates.
- **When the figure is gone:** Hold on black for 2.0 seconds before the wordmark reveal.

#### 1.6 Light Reveal
- **Use:** Scene 06 wordmark appearance
- **Duration:** 800ms
- **Easing:** Cubic-bezier (0.0, 0.0, 0.20, 1.0) -- sudden luminance, precise stop
- **Behavior:** A circle of light expands from center-frame outward, as if a portal opened above the text. The wordmark is not animated into position -- it is already there, and the light discovers it. The light expansion is radial, symmetrical, mechanical.
- **Radius expansion:** 0px to 400px over 800ms (at 4K DCI resolution). Edge feather: 60px.

---

## 2. Typography Animation

### 2.1 On-screen Text (Manifesto Fragments)

**Font:** Sohne Mono Light
**Size:** 12pt equivalent at 4K DCI (approximately 28px)
**Color:** Bone (#E8E0D4) at 80% opacity
**Position:** Lower-left, 120px from left edge, 80px from bottom edge (at 4K DCI)
**Alignment:** Left-aligned

**Animation sequence:**
1. **Fade-in:** Opacity 0% to 80% over 800ms. Cubic-bezier (0.16, 0.0, 0.12, 1.0).
2. **Hold:** Text remains for the duration of its scene.
3. **Cross-fade to next:** Outgoing text fades to 0% while incoming text fades to 80%, simultaneous, 800ms duration.

**Character-level animation:** None. The text appears as a complete phrase. No typewriter effect, no character stagger. The text is a readout, not a performance.

**Text sequence and timing:**

| Text | Appears | Fades |
|---|---|---|
| "The body generates data." | 0:05 | 0:09.2 (cross-fade to next) |
| "Data reveals patterns." | 0:10 | 0:17.2 (cross-fade to next) |
| "Patterns shape form." | 0:18 | 0:25.2 (cross-fade to next) |
| "Form defines motion." | 0:26 | 0:37.0 (fade to nothing) |

### 2.2 Endplate Typography (Scene 06)

**Wordmark: "DUNE.X"**
- **Font:** Monument Extended Ultrabold
- **Size:** 120px at 4K DCI
- **Tracking:** +100
- **Color:** Bone (#E8E0D4) at 100% opacity
- **Position:** Centered horizontally, 46% from top (slightly above true center)
- **Animation:** Light reveal (see Transition 1.6). The text is static; the light moves.
- **Period treatment:** The period between DUNE and X is the last element illuminated. The light reveal reaches the period 120ms after the rest of the wordmark. This creates a micro-pause: DUNE appears, beat, .X appears.

**Tagline: "FUTURE YOUR PERFORMANCE."**
- **Font:** Sohne Mono Regular
- **Size:** 18px at 4K DCI
- **Tracking:** +20
- **Color:** Bone (#E8E0D4) at 70% opacity
- **Position:** Centered horizontally, 24px below the wordmark baseline
- **Animation:** Simple opacity fade-in, 0% to 70% over 600ms. Begins 1.5 seconds after the wordmark is fully revealed.
- **Easing:** Cubic-bezier (0.16, 0.0, 0.12, 1.0)

**Exit animation:**
- The overhead light dims, causing both text elements to recede into darkness.
- Duration: 1200ms.
- The tagline dims first (beginning at 0:43.5), the wordmark follows 200ms later (0:43.7).
- The period is the last visible element, lingering 100ms after the rest of the wordmark dims.
- End on true black.

---

## 3. Data Visualization Animation

### 3.1 Biodata Overlay (Scene 01)

**Visual language:** Force distribution mapping. Thin luminous filaments trace the pressure and movement signature of the foot in motion.

**Animation principles:**
- **Generation:** Filaments emit from pressure nodes on the foot surface. Each node activates when force is applied at that point in the stride cycle.
- **Trail behavior:** Filaments trail the foot's motion path, decaying over 800ms (opacity fade from 100% to 0%).
- **Node behavior:** Pressure nodes pulse on contact: 0% to 100% luminance over 120ms, hold for 200ms, decay over 400ms. Size: 3px to 8px on pulse.
- **Color:** Portal white (#FFFFFF) for filaments, cold glow (#D0D8E8) for node halos.
- **Density:** Begins sparse (3-5 filaments, 2-3 nodes) and builds to dense (30+ filaments, 15+ nodes) over 4 seconds.
- **Procedural:** Generated from motion-capture data of actual foot strike, not hand-animated. Use Houdini procedural system or custom tool.

### 3.2 Parametric Point Cloud (Scene 02)

**Visual language:** The biodata resolves into a structural prediction. The AI's interpretation of the body's needs, rendered as computational geometry.

**Animation principles:**
- **Point behavior:** Individual points have slight random drift (Brownian motion, amplitude 0.5px, frequency 2Hz). When the form resolves, drift reduces to 0 over 1200ms.
- **Connection lines:** Activate procedurally based on proximity threshold. When two points are within 40px, a connection line fades in (200ms). Line weight: 0.5px. Color: cold glow (#D0D8E8) at 40% opacity.
- **Mesh resolution:** The boot form resolves from point cloud to wireframe mesh to solid surface over 3.0 seconds. Three distinct phases:
  1. **Cloud:** Random-seeming but boot-shaped distribution (1.0s)
  2. **Wireframe:** Connection lines form structural lattice (1.0s)
  3. **Solid:** Faces fill between wireframe edges, material shader applies (1.0s)
- **Material transition:** The final solid surface transitions from translucent (data glow) to opaque (bone-white composite). 800ms crossfade on material properties.

### 3.3 Fabrication Data Overlay (Scene 03)

**Visual language:** Engineering spec readout. Structural information displayed on the boot surface during manufacturing.

**Content:**
```
LATTICE DENSITY: 0.42 g/cm3
STRUCTURAL LOAD: 847N DISTRIBUTED
MIDSOLE COMPRESSION: 12.3mm @ 75kg
TREAD PATTERN: GEN-4.2.1 PARAMETRIC
BUILD PROGRESS: 78.4%
```

**Animation principles:**
- **Appearance:** Data readout fades in at 0:16, holds for 2 seconds, fades out by 0:19.
- **Font:** Sohne Mono Light, 10px at 4K DCI.
- **Color:** Bone (#E8E0D4) at 40% opacity. Not dominant. A whisper, not a shout.
- **Position:** Anchored to the boot surface (tracked in post). Slight parallax as camera moves.
- **Number animation:** The "BUILD PROGRESS" value ticks upward in real-time: 78.4% to 81.2% over 2 seconds. Other values are static.
- **Appearance easing:** 600ms fade-in, cubic-bezier (0.16, 0.0, 0.12, 1.0).

### 3.4 Body-in-Motion Overlay (Scene 05)

**Visual language:** The biodata from Scene 01 returns, briefly, to close the loop.

**Animation principles:**
- Faint force-distribution filaments appear on the boot sole during the first 2 ground contacts (approximately 0:30 -- 0:32).
- Same visual system as Scene 01 but at 30% opacity -- a ghost of the original data.
- Links visually to the opening: the data that began the process is now visible on the finished product.
- Fades completely after 2 seconds. The rest of Scene 05 is purely practical photography.

---

## 4. VFX Pipeline

### 4.1 Production Architecture

```
PRACTICAL SHOOT                    CG PRODUCTION
     |                                  |
     v                                  v
  RAW footage (ARRIRAW)           Houdini / Unreal Engine 5
  Scenes 01, 03, 04, 05           Scenes 02 (full CG)
     |                                  |
     v                                  v
  DaVinci Resolve (grade)          CG render (EXR, ACES)
     |                                  |
     +----------------------------------+
                    |
                    v
            Nuke (compositing)
            - VFX overlays (Scenes 01, 03, 05)
            - Match dissolves
            - Light wipe transition
            - Grain pass
            - Final grade adjustments
                    |
                    v
            DaVinci Resolve (final delivery)
            - Master conform
            - Multi-format output
            - Audio sync
```

### 4.2 Practical + VFX Hybrid Approach

| Scene | Practical Elements | VFX Elements | Composite Notes |
|---|---|---|---|
| 01: SIGNAL | Foot photography (studio, void backdrop, 100mm macro) | Biodata visualization overlay (Houdini procedural) | Foot is the plate. Data is the overlay. Light interaction between data and foot surface handled in Nuke (additive comp with subtle light wrap). |
| 02: TRANSLATION | None | Full CG (Houdini for point cloud, Unreal Engine 5 for photorealistic boot render) | Standalone CG shots. Must match practical colorimetry of adjacent scenes. |
| 03: FORM | Robotic fabrication footage (real manufacturing process, ARRI ALEXA 65) | Subtle spec overlay tracked to boot surface | Overlay tracked in Nuke using PFTrack data. Low opacity, non-intrusive. |
| 04: THRESHOLD | Location shoot: flagship space or LED volume stage (ARRI ALEXA 65) | Atmospheric haze enhancement, light ring bloom control | Practical light ring. Post adds subtle bloom and controlled haze density. |
| 05: BODY | Runway/stage shoot (ARRI ALEXA 65, practical red portal rig) | Brief biodata overlay on boot sole (first 2 seconds only) | Biodata overlay is a callback, same procedural system as Scene 01 but lower opacity. Red portal saturation protected in grade. |
| 06: DEPARTURE | None | Typography animation, light reveal effect | Simple compositing over black. Light reveal is a luminance mask animation. |

### 4.3 CG Specifications (Scene 02)

| Parameter | Value |
|---|---|
| **Software** | Houdini (point cloud, procedural mesh) + Unreal Engine 5 (final boot render) |
| **Resolution** | 4096 x 1716 (4K DCI, 2.39:1) |
| **Render format** | EXR 16-bit half-float, ACES color space |
| **Frame rate** | 24fps |
| **Duration** | 7.0 seconds (168 frames, including transition overlap) |
| **Boot model** | Photorealistic Terrain Boot 01 asset (provided by product team) |
| **Point cloud count** | 50,000 -- 200,000 points (ramping up during resolution phase) |
| **Render passes** | Beauty, data glow, point cloud, wireframe, solid surface, ambient occlusion, depth |
| **Anti-aliasing** | 4x MSAA minimum |

---

## 5. Sound Design Architecture

### 5.1 Design Philosophy

No music. No score. No melody. Sound is architectural: the acoustic signature of spaces, materials, and processes. Every sound is sourced from the world of the film -- subsonic room tone, servo mechanisms, material contact, human breath, electrical hum. Engineered silence. The absence of sound is as designed as its presence.

### 5.2 Frequency Map (45 seconds)

```
Frequency (Hz)
10k ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                                                                       ▪ high elec. tone
 5k ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                    ▪▪ ticks                         ▪ material sounds
 2k ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                                   ▪ tuning fork                ▪▪▪ footsteps
 1k ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                                                    ▪▪▪▪ cathedral reverb
500 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                                                                              ▪▪ 220Hz tone
220 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                ▪ mech. hum            ▪▪▪ servo     ▪▪ room hum
100 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
                                                                         ▪ sub-bass hit
 40 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
         ▪▪▪ subsonic pulse (28Hz)
 20 ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─
     |    |    |    |    |    |    |    |    |    |
     0    5   10   15   20   25   30   35   40   45   Time (s)

     S I L E N C E            S I L E N C E            S I L E N C E
     (0:00-0:02)              (0:14-0:14.5)            (0:38-0:40)
```

### 5.3 Sound Events (Chronological)

| Timecode | Sound Element | Frequency | Duration | Level (dBFS) | Notes |
|---|---|---|---|---|---|
| 0:00 -- 0:02 | True silence | -- | 2.0s | -inf | Digital silence. No room tone, no ambience. Black = silence. |
| 0:02 | Subsonic pulse | 28Hz | Sustained, slow swell | -24 to -18 | Felt in the chest, not heard by ear. Sub-woofer dependent. |
| 0:03 | Biodata micro-ticks begin | 2kHz -- 5kHz | Repeating, accelerating | -36 | Dry, metallic, precise. Like relay switches. Start at 1 per 600ms, accelerate to 1 per 80ms by 0:08. |
| 0:08 | Ticks compress | 2kHz -- 5kHz | 2.0s | -30 | Ticks become dense pulse, then fold into mechanical hum. |
| 0:09 | Mechanical hum | 100Hz -- 200Hz | Sustained, rising | -24 | Computational processing as sound. Low, resonant, not musical. |
| 0:14 | Silence (beat) | -- | 0.5s | -inf | All sound stops. A breath. |
| 0:14.5 | Tuning fork tone | 1.2kHz (fundamental) + harmonics | 1.5s with decay | -18 (peak) | Struck-metal resonance. Warm metallic decay. The moment data becomes physical. |
| 0:15 | Servo whir/stop | 80Hz -- 300Hz | Repeating pattern | -30 | Robotic arm cycle: whir (300ms), stop (200ms). Metronomic. |
| 0:15 | Material placement | 1kHz -- 4kHz | Tiny events | -36 | Filament deposits. Micro-clicks. Tactile, precise. |
| 0:15 | Low resonant tone (continued) | 120Hz | Sustained, very low | -42 | Tuning fork fundamental continuing, barely perceptible. |
| 0:22.5 | Transition: sounds fade | -- | 500ms | Fade to -inf | Manufacturing sounds dim. |
| 0:23 | Footsteps (airlock) | 500Hz -- 2kHz | Rhythmic | -24 | Hard surface, close walls. Tight reverb (RT60: 0.3s). Our footsteps. |
| 0:24 | Cathedral reverb bloom | 200Hz -- 800Hz | 3.0s bloom | -18 | As space opens, reverb RT60 shifts from 0.3s to 4.0s. The acoustic signature of the atrium. Spatial, not musical. |
| 0:25 | Room hum | 60Hz -- 120Hz | Sustained | -36 | The low-frequency resonance of the circular atrium. Constant. |
| 0:26 | Electrical threshold tone | 8kHz -- 12kHz | Sustained | -42 | At the threshold of hearing. The light ring's sound. Ultrasonic presence. |
| 0:30 | Footsteps (runway) | 800Hz -- 2kHz | Rhythmic | -18 | Terrain Boot 01 on dark stage. Specific engineered tread sound. More mechanical than the airlock steps. |
| 0:30 | Fabric movement | 2kHz -- 6kHz | Continuous, subtle | -36 | Membrane coat rustling. Technical textile sound. |
| 0:31 | Human breath | 200Hz -- 800Hz | Continuous, subtle | -42 | Barely audible beneath footsteps. Rhythmic. |
| 0:36 | Sub-bass hit (red portal) | 40Hz | 200ms | -12 (peak) | Single deep pulse. Chest impact. The loudest moment in the film. The threshold crossed. |
| 0:36.2 | Return to footsteps | 800Hz -- 2kHz | Fading | -24 to -42 | Footsteps continue, diminishing as figure recedes. |
| 0:38 | True silence | -- | 2.0s | -inf | All sound stops. Complete. The figure is gone. |
| 0:40 | Sustained analog tone | 220Hz (A3) | 5.0s with decay | -18 (peak) | Concert A. Warm, analog (tube oscillator or bowed metal). Not musical -- a resonance. The only pitched, warm sound in the film. It resolves nothing. It simply exists, then fades. |
| 0:43 | Tone decay | 220Hz fading | 2.0s | -18 to -inf | Natural decay. No artificial cutoff. The tone dies like a struck bell. |
| 0:45 | End | -- | -- | -inf | True silence. |

### 5.4 Silence Architecture

Silence is used three times. Each silence has a different character:

1. **Opening silence (0:00 -- 0:02):** Absolute. Pre-existence. Nothing has begun.
2. **Beat silence (0:14 -- 0:14.5):** Momentary. A breath between processes. Data has been translated; manufacturing has not yet begun.
3. **Closing silence (0:38 -- 0:40):** Terminal. Post-existence. The subject has departed. The void has reclaimed the space.

### 5.5 Mix Specification

| Parameter | Value |
|---|---|
| **Format** | 5.1 surround (L, R, C, LFE, LS, RS) + Dolby Atmos 7.1.4 |
| **Stereo fold-down** | Available for digital distribution |
| **Sample rate** | 48kHz |
| **Bit depth** | 24-bit |
| **Loudness** | -24 LUFS integrated (broadcast) / -16 LUFS (web) |
| **LFE channel** | Active in: subsonic pulse (0:02), room hum (0:25), sub-bass hit (0:36), final tone (0:40) |
| **Surround use** | Cathedral reverb (Scene 04) wraps to surrounds. Footsteps center-weighted. Sub-bass hit is full surround. |
| **Dynamic range** | Wide. True silence to -12 dBFS peak (sub-bass hit). The loudness variation is intentional. |

---

## 6. Color Grading Specification

### 6.1 Master Grade

| Parameter | Value |
|---|---|
| **Working color space** | ACES (ACEScg) |
| **Display target** | Rec.709 (SDR) primary, HDR10 (PQ, 1000 nit) secondary |
| **Base exposure** | Underexposed. Crush shadows early. The void is the default state. |
| **Black level** | True 0,0,0 in shadows. No lifted blacks. No milky darks. |
| **White level** | Clean clip at 100% on highlights. Light ring and portal white should be pure. |
| **Midtone balance** | Cool. Shift green-magenta toward neutral-cool. No warmth in midtones. |
| **Highlight treatment** | Clean, not bloomed (except controlled bloom on light ring, Scene 04). |
| **Shadow treatment** | Crushed. Detail preserved only in the darkest tones where subjects exist. |
| **Saturation** | Global: 60% of Rec.709 nominal. Desaturated world. |
| **Signal Red exception** | Scene 05 red portal: Signal Red (#E94520) protected at 100% saturation. Isolated in secondary correction. The only saturated element in the film. |
| **Skin tone** | If visible: desaturated, pulled toward neutral. No warmth. The human is a structure, not a portrait. |
| **Film grain** | 35mm texture overlay. Grain size varies: finer for macro (Scenes 01, 02), medium for wide (Scenes 04, 05). Grain intensity: 15% in shadows, 8% in midtones, 5% in highlights. |

### 6.2 Per-Scene Grade Notes

| Scene | Grade Notes |
|---|---|
| 01: SIGNAL | Near-monochrome. Foot is barely visible -- illuminated only by VFX overlay. Cool tones. |
| 02: TRANSLATION | CG render matched to practical grade. Cold glow on data, transitioning to bone-white on solid boot. |
| 03: FORM | Industrial. Overhead spot is clean hard white. Boot is the brightest element. Background warmth from atrium glow is subtle -- do not let it dominate. Regolith glow at 20% of actual capture. |
| 04: THRESHOLD | Maximum contrast. The light ring is pure white. Everything outside the ring is near-black. Star ceiling is cool-white pinpoints, not warm. |
| 05: BODY | Desaturated except for the 1.2-second Signal Red portal. Edge light on the figure is clean white. When red portal is active, allow red to spill onto adjacent tones but keep the spill desaturated (the red itself is pure, its reflection is muted). |
| 06: DEPARTURE | Bone-white text on void black. No grade complexity. Maximum simplicity. |

---

## 7. Delivery Formats

### 7.1 Format Matrix

| Format | Resolution | Ratio | Frame Rate | Codec | Use |
|---|---|---|---|---|---|
| **Master (4K DCI)** | 4096 x 1716 | 2.39:1 | 24fps | ProRes 4444 XQ / DNxHR 444 | Archive, cinema, post-production master |
| **Web master** | 3840 x 1608 | 2.39:1 | 24fps | H.265 (HEVC), CRF 18 | Website hero, YouTube |
| **16:9 reframe** | 3840 x 2160 | 16:9 | 24fps | H.265 (HEVC), CRF 18 | General digital, broadcast |
| **9:16 vertical** | 2160 x 3840 | 9:16 | 24fps | H.265 (HEVC), CRF 18 | Instagram Reels, TikTok, Stories |
| **1:1 square** | 2160 x 2160 | 1:1 | 24fps | H.265 (HEVC), CRF 18 | Instagram feed, gallery display |
| **HDR master** | 4096 x 1716 | 2.39:1 | 24fps | ProRes 4444 XQ, HDR10 (PQ) | HDR display, future-proofing |

### 7.2 Reframe Strategy

The master 2.39:1 frame is composed with vertical reframing in mind.

**16:9 reframe:** Slight vertical expansion. The additional frame height reveals more ceiling in Scene 04 (star ceiling) and more floor in Scene 05 (boot contact). No content loss. Letterbox bars removed.

**9:16 vertical reframe:** Center-weighted extraction from the 2.39:1 master. Key reframe decisions:

| Scene | 9:16 Strategy |
|---|---|
| 01: SIGNAL | Foot centered vertically. Data filaments extend upward. Works naturally. |
| 02: TRANSLATION | Boot form centered. Orbital camera adjusted to tighter arc. May require CG re-render for optimal framing. |
| 03: FORM | Reframe to portrait: boot fills lower frame, robotic arm enters from top. Vertical composition emphasizes the descending arm. |
| 04: THRESHOLD | Vertical advantage: ceiling-to-floor composition shows the full height of the atrium, star ceiling above, boot below. The light ring becomes a vertical column. |
| 05: BODY | Reframe to full-figure portrait. The rising camera movement (boot to torso) works naturally in vertical. Red portal slit is already vertical. |
| 06: DEPARTURE | Wordmark centered. Works in any ratio. |

**1:1 square reframe:** Center crop from 2.39:1. Most compositions survive due to centered framing. Scene 03 (lateral tracking) may need repositioned center point per shot.

### 7.3 Cutdown Deliverables

Each cutdown (30s, 15s) is delivered in all six formats above.

**30-second cut structure:**

| Shot | Scene | Duration |
|---|---|---|
| 02 (compressed) | SIGNAL | 4.0s |
| 05 | FORM | 5.0s |
| 07-08 | THRESHOLD | 6.0s |
| 09-11 | BODY | 8.0s |
| 12-14 | DEPARTURE | 7.0s |
| | | **30.0s** |

Text sequence compressed to: "The body generates data." -- "Patterns shape form." -- "Form defines motion." -- "DUNE.X" -- "FUTURE YOUR PERFORMANCE."

**15-second cut structure:**

| Shot | Scene | Duration |
|---|---|---|
| 08 | THRESHOLD | 3.0s |
| 09-11 | BODY | 6.0s |
| 12-14 | DEPARTURE | 6.0s |
| | | **15.0s** |

Text sequence compressed to: "Form defines motion." -- "DUNE.X" -- "FUTURE YOUR PERFORMANCE."

The 15-second cut is boot-focused. The boot in the light ring. The boot in motion. The boot through the red portal. The name.

---

## 8. Motion Easing Reference

### 8.1 Named Curves

All motion in the film uses one of four named easing curves. No default ease-in-out. No organic bounce. Every movement is mechanical.

| Curve Name | cubic-bezier | Character | Use |
|---|---|---|---|
| **VOID-IN** | (0.16, 0.0, 0.12, 1.0) | Slow start, precise stop. Mechanical deceleration. | Fade-ins, text appearance, light reveals |
| **VOID-OUT** | (0.76, 0.0, 0.86, 1.0) | Quick departure, slow arrival at zero. Receding into darkness. | Fade-outs, text removal, light dims |
| **TRANSIT** | (0.25, 0.0, 0.10, 1.0) | Balanced mechanical. Linear middle with controlled endpoints. | Dissolves, camera moves, spatial transitions |
| **THRESHOLD** | (0.0, 0.0, 0.20, 1.0) | Near-instant, then precise hold. Sudden arrival. | Red portal impact, sub-bass hit, period reveal |

### 8.2 Duration Standards

| Motion Type | Duration Range | Notes |
|---|---|---|
| Light fade-in/out | 1600ms -- 2000ms | The slowest motions. Light takes time. |
| Cross-dissolve | 1000ms -- 1200ms | Standard scene transition. |
| Text fade-in | 600ms -- 800ms | Text appears with purpose, not urgency. |
| Text cross-fade | 800ms | Simultaneous fade-out and fade-in. |
| Light wipe | 1000ms | Center-to-edge radial expansion. |
| Light reveal (wordmark) | 800ms | Fast enough to feel discovered, slow enough to feel intentional. |
| VFX overlay fade | 600ms -- 800ms | Data overlays are quiet arrivals. |
| Camera push-in | Continuous over 5.0s+ | Imperceptible speed. The viewer should not feel the camera moving, only realize they are closer. |

---

## 9. Production Notes

### 9.1 Shoot Days

| Day | Scenes | Location | Notes |
|---|---|---|---|
| Day 1 | Scene 01 (SIGNAL) | Studio (black void stage) | Practical foot photography. Motion capture for biodata procedural generation. 100mm macro rig. |
| Day 2 | Scene 03 (FORM) | 6F Manufacturing floor (or practical fabrication facility) | Robotic arm fabrication of Terrain Boot 01. Actual manufacturing process documented. ARRI ALEXA 65 with 50mm anamorphic. |
| Day 3 | Scenes 04, 05 (THRESHOLD, BODY) | Flagship space (or LED volume stage, e.g., Disguise/ARRI Stage London) | Light ring rig. Red portal rig. Talent. Steadicam and tracking rig. Full day. |
| -- | Scene 02 (TRANSLATION) | CG studio (remote) | No shoot day. Full CG production, 4-6 weeks. |
| -- | Scene 06 (DEPARTURE) | Post-production | Typography animation. No shoot day. |

### 9.2 Key Personnel

| Role | Responsibility |
|---|---|
| **Director** | Shot composition, talent direction, pacing. Must understand: this is documentation, not advertisement. |
| **DP** | ARRI ALEXA 65 operation, anamorphic lens selection, lighting control. Must be comfortable working in near-total darkness. |
| **Steadicam operator** | Scene 04 airlock-to-atrium continuous shot. Scene 05 tracking shot with crane-up. |
| **Gaffer** | Light ring installation and control. Red portal rig. All lighting is architectural, not cinematic-conventional. |
| **VFX supervisor** | On-set for Scenes 01 and 03. Witness plates. Tracking markers where needed. Data overlay alignment. |
| **Sound designer** | Not on set. All sound designed in post from reference recordings and synthesis. |
| **CG lead** | Scene 02 production. Houdini procedural systems. Unreal Engine 5 photorealistic render. |
| **Colorist** | DaVinci Resolve. Must understand ACES pipeline and the specific void grade requirements. |

### 9.3 Legal and Usage

| Deliverable | Usage Rights |
|---|---|
| 45s master | Website hero, YouTube premiere, cinema (pre-roll), flagship in-store display |
| 30s cut | Digital advertising (paid social, programmatic), broadcast (if applicable) |
| 15s cut | Instagram Reels, TikTok, Stories, pre-roll (YouTube, web) |
| Stills (pulled from footage) | Press, social media, editorial |
| Behind-the-scenes | Social content, brand documentary |

---

*Every frame is documentation of departure. Every silence is engineered. Every light source is a threshold.*
