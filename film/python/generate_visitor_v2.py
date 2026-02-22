#!/usr/bin/env python3
"""
DUNE.X — Visitor Journey Storyboard v2
Brighter, more architectural realism. Reference tone from film/reference/:
  00_entrance.jpg → real architecture photo, corner void, diamond ceiling, warm golden walls
  1.jpg  → dark runway, solitary figure, atmospheric
  11.jpg → data overlay holographic screens, glitch computational
  13.jpg → dark gallery, mannequins in techwear, overhead panels
  15.jpg → garments on hooks, concrete, spotlighting
  cfd... → monumental carved architecture, warm interior glow
  xqvxud → Balenciaga flagship, curtain wall, lit interior through glass
"""

from google import genai
from google.genai import types
from pathlib import Path
import time

API_KEY = "AIzaSyA97SmBweFBqUzFr7qCzCngsFUn4BZ-7iY"
client = genai.Client(api_key=API_KEY)

OUTPUT_DIR = Path(__file__).parent / "storyboard_visitor_v2"
OUTPUT_DIR.mkdir(exist_ok=True)

# Updated tone: brighter, more architectural realism
TONE = (
    "Architectural photography, 2.39:1 cinemascope widescreen, "
    "dark but NOT ultra-dark — visible details in shadows, strong contrast, "
    "real architectural materials: exposed concrete, dark steel, glass, "
    "warm interior lighting glowing through openings, "
    "high-end luxury retail flagship store, "
    "dusk/evening blue hour exterior light mixed with warm interior glow, "
    "atmospheric but realistic — not sci-fi fantasy, "
    "medium brightness with dramatic light contrast, "
    "35mm film grain, professional architectural photo quality, "
    "Balenciaga/Gentle Monster flagship retail aesthetic. "
)

SCENES = {
    "01_approach": {
        "filename": "01_approach",
        "prompt": (
            TONE +
            "Exterior dusk. A monolithic dark concrete building — "
            "6 floors of stacked offset rectangular concrete volumes shifted asymmetrically, "
            "creating terraces and deep overhangs. Dark steel and raw concrete facade. "
            "Upper floors have curtain wall glass with warm light glowing from within, "
            "visible through vertical steel mullions. "
            "Ground level: a corner entrance void glows with warm golden light, "
            "diamond-pattern luminous ceiling visible from outside. "
            "A solitary visitor approaches on the sidewalk. "
            "Blue hour sky above, street trees silhouetted. City context visible. "
            "The building reads as a dark mass with precisely placed light — "
            "like a monolith with glowing incisions. "
            "Wide establishing shot from across the street. "
            "Reference: Balenciaga flagship at night with lit curtain wall facade."
        )
    },
    "02_entrance": {
        "filename": "02_entrance",
        "prompt": (
            TONE +
            "A corner entrance void carved into a dark concrete building mass. "
            "The entrance is a rectangular opening at the building corner, "
            "approximately 8 meters wide and 4 meters tall. "
            "Above the entrance: a geometric diamond-pattern luminous ceiling — "
            "diagonal grid of warm-white glowing panels separated by dark structural ribs, "
            "casting a precise diamond pattern of light on the ground below. "
            "Interior walls are warm-toned concrete (golden/regolith color). "
            "A frosted glass door is visible at the back of the entrance void. "
            "The exterior building facade is dark charcoal concrete with vertical panel joints. "
            "Shot from slightly across the street at eye level, showing the corner entrance "
            "as a warm glowing void carved out of the dark mass. "
            "Evening light. Realistic architectural photography. "
            "DIRECTLY REFERENCE: Japanese contemporary architecture entrance with diamond ceiling pattern, "
            "warm interior glow against dark concrete exterior."
        )
    },
    "03_atrium": {
        "filename": "03_atrium",
        "prompt": (
            TONE +
            "Interior of a vast circular arena atrium inside a flagship retail store. "
            "The floor is dark polished concrete with concentric rings of white LED light "
            "embedded flush into the surface, glowing like orbital rings. "
            "High above: a star ceiling — hundreds of small cool-white LED points "
            "scattered across the dark ceiling, like an artificial night sky. "
            "Stepped amphitheater-like display platforms arranged in concentric circles. "
            "Products on low pedestals catch focused spotlighting. "
            "The space has visible volume — you can sense the height and scale. "
            "Raw concrete walls curve around the perimeter. "
            "Light haze makes beams visible but the space is brighter than pure void — "
            "you can see the concrete texture, the steps, the products. "
            "A visitor stands near the center, looking up at the star ceiling. "
            "Mood: planetarium meets luxury retail, cathedral of commerce."
        )
    },
    "04_gallery_mannequins": {
        "filename": "04_gallery_mannequins",
        "prompt": (
            TONE +
            "Interior gallery room on an upper floor of a luxury flagship store. "
            "Multiple mannequins wearing dark avant-garde techwear garments — "
            "structural black coats, quilted technical jackets, membrane outerwear. "
            "The mannequins stand in a loose arrangement across a polished dark floor. "
            "Overhead: rectangular light boxes suspended from the exposed concrete ceiling, "
            "each casting a focused column of light down onto individual mannequins. "
            "Atmospheric haze makes each light column visible as a solid beam. "
            "The room is moody but visible — you can see the concrete walls, "
            "ceiling structure, and garment details clearly. "
            "Medium brightness with strong directional contrast. "
            "A visitor walks among the mannequins, seen from behind. "
            "Reference: dark fashion exhibition with overhead panel lights and atmospheric haze."
        )
    },
    "05_collection_wall": {
        "filename": "05_collection_wall",
        "prompt": (
            TONE +
            "Interior gallery space with a long raw concrete wall. "
            "A row of dark techwear garments — jackets, membrane coats, shell layers — "
            "hanging from minimal ceiling-mounted hooks along the wall. "
            "Each garment is individually lit by a small track spotlight from above, "
            "creating dramatic pools of light on the garments and "
            "dark organic puddle-shaped shadows on the concrete floor below. "
            "The garments hang motionless, evenly spaced, museum-quality display. "
            "Cool blue-grey desaturated color temperature overall. "
            "Raw concrete wall texture visible. Polished concrete floor. "
            "Bright enough to see garment details — texture, seams, material quality. "
            "A visitor at the far end examining a piece. "
            "Reference: garments suspended from hooks on concrete wall with dramatic spotlighting."
        )
    },
    "06_product_chamber": {
        "filename": "06_product_chamber",
        "prompt": (
            TONE +
            "A dedicated product display room inside the flagship store. "
            "A single pair of bone-white 3D-printed lattice boots on a low black pedestal, "
            "centered under an overhead ring of white light. "
            "The light ring creates a circular halo on the dark floor around the pedestal. "
            "The lattice midsole structure catches the light beautifully, "
            "casting intricate geometric shadow patterns on the pedestal surface. "
            "Behind the boots: a dark screen displaying holographic data overlays — "
            "wireframe structural diagrams, material specs in monospace type, "
            "computational data floating in layers with subtle glitch effects. "
            "The room is intimate but bright enough to see every detail of the boot. "
            "A visitor leans in close, examining the lattice construction. "
            "Reference: data overlay holographic screens + product altar lighting."
        )
    },
    "07_fabrication_window": {
        "filename": "07_fabrication_window",
        "prompt": (
            TONE +
            "Interior: a visitor on an upper floor looking through a large curtain wall window "
            "into a visible manufacturing cell. "
            "Through the glass: two robotic arms under bright work lights "
            "constructing a bone-white garment layer by layer. "
            "The fabrication space is well-lit — you can see the machinery, "
            "the material deposits, the partially-built garment clearly. "
            "On the visitor side: dark polished concrete floor, "
            "minimal steel railing, recessed floor lighting. "
            "The curtain wall has a grid of dark steel mullions (3m spacing) "
            "framing the view. Visitor's reflection faint in the glass. "
            "The contrast: dark viewing gallery vs bright fabrication cell. "
            "Mood: factory as theater, witnessing the process of creation."
        )
    },
    "08_terrace_night": {
        "filename": "08_terrace_night",
        "prompt": (
            TONE +
            "Exterior: a visitor on a cantilevered terrace of the flagship building at night. "
            "The terrace is a concrete platform projecting from the stacked building mass. "
            "A 1-meter solid concrete parapet wall (200mm thick) at the edge. "
            "Behind the visitor: the curtain wall glass of the floor above glows warm, "
            "light spilling out onto the terrace through vertical mullions. "
            "The visitor stands at the parapet edge, silhouetted against the city. "
            "Blue hour sky with visible clouds. City lights spread out below. "
            "The building's stacked offset volumes visible above and below the terrace. "
            "Warm interior glow contrasts with cool exterior atmosphere. "
            "Architectural photography quality — real building, real city. "
            "Mood: elevation, looking outward, between interior and world."
        )
    },
    "09_descent": {
        "filename": "09_descent",
        "prompt": (
            TONE +
            "Interior: a visitor descending a sculptural concrete staircase. "
            "The stairs are raw concrete with thin LED light strips "
            "embedded in each step edge — white lines marking the descent. "
            "The stairwell is a dramatic architectural volume — "
            "curved or angular concrete walls rising high. "
            "Top-down perspective looking down the stairwell, "
            "the visitor a small figure mid-descent. "
            "The stair geometry creates a spiral or angular pattern. "
            "Bright enough to see the concrete texture and architectural form. "
            "Light comes from the LED step edges and ambient glow from floors above. "
            "Raw concrete walls with visible formwork texture. "
            "Mood: vertical journey, transition between floors, architectural drama."
        )
    },
    "10_departure": {
        "filename": "10_departure",
        "prompt": (
            TONE +
            "The visitor exits the flagship store through the corner entrance void. "
            "Shot from inside looking out: the diamond-pattern luminous ceiling above, "
            "warm golden interior walls on the sides, "
            "the frosted glass doors open, the evening street beyond. "
            "The visitor walks away from camera carrying a minimal dark bag, "
            "stepping from the warm golden entrance light into the blue evening. "
            "The entrance ceiling's diamond pattern casts geometric light on the floor. "
            "Through the open doors: the street, trees, city visible. "
            "Warm interior glow spills out as a rectangle of light on the dark sidewalk. "
            "The transition from warm enclosed space to open evening air. "
            "Architectural photography, realistic, no fantasy elements. "
            "Mood: departure, threshold crossed in reverse, carrying something away."
        )
    },
}


def generate_scene(scene_id, scene_data):
    print(f"\n{'='*60}")
    print(f"Generating: {scene_id}")
    print(f"{'='*60}")

    response = client.models.generate_content(
        model="gemini-2.0-flash-exp-image-generation",
        contents=scene_data["prompt"],
        config=types.GenerateContentConfig(
            response_modalities=["IMAGE", "TEXT"],
        )
    )

    for part in response.candidates[0].content.parts:
        if part.inline_data is not None:
            image_data = part.inline_data.data
            mime_type = part.inline_data.mime_type
            ext = "png" if "png" in mime_type else "jpg"
            filename = f"{scene_data['filename']}.{ext}"
            filepath = OUTPUT_DIR / filename

            with open(filepath, "wb") as f:
                f.write(image_data)

            print(f"  Saved: {filepath.name}")
            print(f"  Size: {len(image_data)/1024:.1f} KB")
            return filepath
        elif part.text:
            print(f"  Text: {part.text[:150]}")

    print("  WARNING: No image generated")
    return None


def main():
    print("DUNE.X — Visitor Journey Storyboard v2 (Brighter)")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Scenes: {len(SCENES)}")

    results = {}
    for scene_id, scene_data in SCENES.items():
        try:
            filepath = generate_scene(scene_id, scene_data)
            results[scene_id] = filepath
            time.sleep(5)
        except Exception as e:
            print(f"  ERROR: {e}")
            results[scene_id] = None
            time.sleep(8)

    print(f"\n{'='*60}")
    print("GENERATION COMPLETE")
    print(f"{'='*60}")
    success = sum(1 for v in results.values() if v)
    print(f"  {success}/{len(results)} scenes generated")
    for scene_id, path in results.items():
        status = f"OK → {path.name}" if path else "FAILED"
        print(f"  {scene_id}: {status}")


if __name__ == "__main__":
    main()
