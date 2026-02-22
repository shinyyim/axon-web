#!/usr/bin/env python3
"""
DUNE.X — Visitor Journey Storyboard Generator
Based on the flagship store spatial design + reference images:
  1.jpg  → vast dark runway stage, solitary figure, atmospheric smoke
  2.jpg  → circular arena, concentric light rings on floor, star ceiling
  13.jpg → dark gallery, mannequins in avant-garde techwear, overhead light panels, haze
  15.jpg → raw concrete wall, garments hanging from hooks, dramatic spotlighting
"""

from google import genai
from google.genai import types
from pathlib import Path
import time

API_KEY = "AIzaSyA97SmBweFBqUzFr7qCzCngsFUn4BZ-7iY"
client = genai.Client(api_key=API_KEY)

OUTPUT_DIR = Path(__file__).parent / "storyboard_visitor"
OUTPUT_DIR.mkdir(exist_ok=True)

# Tone extracted from reference images
TONE = (
    "Cinematic film still, 2.39:1 cinemascope widescreen, "
    "ultra-dark void environment (#0A0A0C near-black), "
    "architectural white light cutting through darkness, "
    "raw concrete and dark steel materials, "
    "high-fashion techwear retail space, "
    "atmospheric haze and volumetric light beams, "
    "ARRI Alexa large format cinematography, shallow depth of field, "
    "35mm film grain, anamorphic lens characteristics, "
    "Gentle Monster immersive retail meets James Turrell light installation. "
    "No natural daylight. Everything is theatrical darkness with precise architectural lighting. "
)

SCENES = {
    "01_approach": {
        "filename": "01_approach",
        "prompt": (
            TONE +
            "Exterior night. A solitary visitor approaches a monolithic dark concrete building. "
            "The building is a stacked mass of offset rectangular volumes — "
            "6 floors of asymmetric concrete boxes shifted east and west, "
            "creating terraces and overhangs. The facade is raw dark concrete (#1E1E24). "
            "Curtain wall glass glows faintly from within on recessed floors. "
            "The only warm element: a corner entrance void on ground level "
            "emitting a faint amber-white glow from a luminous diamond-pattern ceiling inside. "
            "The visitor is a small silhouette against the massive dark structure. "
            "Street level, no other buildings visible. Atmospheric haze around the base. "
            "Shot from across the street, wide establishing shot. "
            "Mood: monumental solitude, approaching the threshold."
        )
    },
    "02_entrance": {
        "filename": "02_entrance",
        "prompt": (
            TONE +
            "A visitor stepping into a corner entrance void cut into a dark concrete mass. "
            "The entrance is a tall rectangular void (8m wide, 4m high) carved from the building corner. "
            "Above: a luminous diamond-pattern ceiling — geometric grid of glowing white panels "
            "with dark structural ribs between them, casting precise geometric light patterns "
            "on the polished dark floor. "
            "The visitor is seen from behind, silhouetted against the warm interior glow. "
            "Frosted glass doors ahead. Raw concrete walls on either side — "
            "warm regolith tone (#C4A882) on the interior walls contrasting with dark exterior. "
            "The threshold moment: stepping from darkness into architectural light. "
            "Camera behind the visitor, following them in. "
            "Mood: crossing the boundary, entering sacred space."
        )
    },
    "03_atrium": {
        "filename": "03_atrium",
        "prompt": (
            TONE +
            "A vast circular arena interior — the flagship store's main atrium. "
            "Concentric rings of white LED light embedded in the dark polished floor, "
            "glowing like orbital paths. A star ceiling high above: "
            "hundreds of pinpoint cool-white fiber optic LEDs scattered across "
            "a dark dome ceiling, creating an artificial night sky. "
            "The space is cathedral-scale, dark amphitheater-like stepped seating "
            "or display platforms arranged in concentric circles. "
            "A single bone-white product pedestal at the center, inside the innermost light ring. "
            "One visitor stands at the edge of the arena, tiny against the vast dark space. "
            "Atmospheric haze makes the light beams visible. "
            "Raw dark concrete walls curve around the perimeter. "
            "Directly inspired by: circular arena with concentric floor light rings and star ceiling. "
            "Mood: arrival, sacred space, technological planetarium."
        )
    },
    "04_gallery_mannequins": {
        "filename": "04_gallery_mannequins",
        "prompt": (
            TONE +
            "A dark interior gallery room on an upper floor of a flagship retail store. "
            "Multiple dark mannequins wearing avant-garde techwear garments — "
            "structural black membrane coats, quilted technical jackets, "
            "parametric panel outerwear with visible lattice construction. "
            "The mannequins are arranged in a loose grid formation across the dark floor. "
            "Overhead: rectangular light panels suspended from the ceiling, "
            "each casting a focused pool of light down onto individual mannequins. "
            "Atmospheric haze fills the room, making light beams visible as solid columns. "
            "The spaces between mannequins are deep shadow. "
            "Dark concrete walls and floor. Museum-quality display. "
            "A visitor walks among the mannequins, seen from behind, "
            "dwarfed by the garments on display. "
            "Directly inspired by: dark exhibition with mannequins in techwear under square overhead lights. "
            "Mood: fashion as installation art, garments as artifacts."
        )
    },
    "05_collection_wall": {
        "filename": "05_collection_wall",
        "prompt": (
            TONE +
            "Interior of a raw concrete gallery space within the flagship store. "
            "A long concrete wall with a row of garments hanging from minimal ceiling hooks — "
            "dark techwear jackets, membrane coats, transparent shell layers, "
            "each suspended like specimens in a laboratory. "
            "Dramatic spotlighting from small ceiling track lights above, "
            "each garment lit individually, casting dark organic puddle-shaped shadows "
            "on the polished concrete floor below. "
            "The garments hang motionless, evenly spaced, gallery-style. "
            "Cool desaturated blue-grey color temperature. "
            "No mannequins — just the garments floating, "
            "as if the bodies have departed and only the shells remain. "
            "A visitor at the far end of the wall, contemplating. "
            "Directly inspired by: raw concrete wall with garments on hooks, dramatic top-lighting. "
            "Mood: archive, specimen collection, quiet contemplation."
        )
    },
    "06_product_chamber": {
        "filename": "06_product_chamber",
        "prompt": (
            TONE +
            "A dedicated product display chamber deep inside the flagship store. "
            "A single pair of bone-white 3D-printed lattice boots on a low black pedestal, "
            "centered under an overhead ring of pure white light. "
            "The light ring casts a perfect circular halo on the dark floor. "
            "The lattice midsole structure of the boots catches the light, "
            "creating intricate geometric shadow patterns on the pedestal surface. "
            "Behind the boots: a large dark screen showing faint holographic data overlays — "
            "structural stress maps, material specs in monospace type, "
            "parametric wireframe of the boot construction. "
            "The room is intimate, enclosed, dark on all sides. "
            "A visitor leans in close, examining the lattice detail. "
            "Mood: product as sacred object, engineering as art."
        )
    },
    "07_fabrication_window": {
        "filename": "07_fabrication_window",
        "prompt": (
            TONE +
            "Interior scene: a visitor on an upper floor looking through a large glass curtain wall "
            "into a visible manufacturing cell on the floor above. "
            "Through the glass: a robotic arm under a single overhead spotlight "
            "is depositing material onto a bone-white garment being constructed layer by layer. "
            "The fabrication cell is dark except for the focused work light. "
            "On the visitor's side: dark polished concrete floor, "
            "minimal steel railing, ambient glow from recessed floor lights. "
            "The visitor presses close to the glass, watching the machine work. "
            "Reflection of the visitor faintly visible in the glass. "
            "Mullion grid of the curtain wall frames the view (3m spacing, dark steel frames). "
            "Mood: witnessing creation, transparency of process, factory as theater."
        )
    },
    "08_terrace_night": {
        "filename": "08_terrace_night",
        "prompt": (
            TONE +
            "Exterior terrace on an upper floor of the flagship building at night. "
            "A visitor stands at a 1-meter high solid concrete parapet wall, "
            "looking out over a dark cityscape. "
            "The terrace is a protruding concrete platform — "
            "the offset massing of the building creates this outdoor balcony. "
            "Behind the visitor: the glowing curtain wall of the floor above, "
            "warm light spilling through glass onto the dark concrete terrace floor. "
            "The parapet is raw concrete, 200mm thick. "
            "Stars visible in the dark sky above. City lights distant and dim below. "
            "The visitor is silhouetted against the faint city glow. "
            "Edge lighting catches the parapet and the visitor's techwear silhouette. "
            "Mood: elevation, looking outward from the threshold, departure point."
        )
    },
    "09_descent": {
        "filename": "09_descent",
        "prompt": (
            TONE +
            "Interior: a visitor descending a dark stairwell inside the flagship store. "
            "The staircase is raw concrete, minimal, industrial. "
            "Thin strips of white LED light embedded in the stair edges — "
            "each step outlined in a precise line of white light against dark concrete. "
            "The visitor descends into deeper darkness below, "
            "seen from above in a dramatic top-down perspective. "
            "The spiral or angular staircase creates geometric patterns of light strips. "
            "Atmospheric haze softens the deeper levels. "
            "Dark concrete walls on both sides, no handrail — "
            "just the floating light-edged stairs descending into void. "
            "Mood: transition between worlds, vertical journey, going deeper."
        )
    },
    "10_departure": {
        "filename": "10_departure",
        "prompt": (
            TONE +
            "The visitor exits the flagship store back through the corner entrance void. "
            "Shot from inside the store looking out: the luminous diamond-pattern ceiling above, "
            "the frosted glass doors now open, the dark street beyond. "
            "The visitor walks away from camera into the night, carrying a dark minimal bag. "
            "Their silhouette shrinks against the darkness outside. "
            "The warm interior glow from the entrance ceiling spills out onto the dark sidewalk, "
            "creating a rectangle of architectural light on the ground. "
            "Inside the store behind camera: faint glow of the atrium light rings. "
            "The threshold crossed in reverse — from light back into void. "
            "Mood: departure, carrying something away, the threshold behind you."
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
    print("DUNE.X — Visitor Journey Storyboard Generator")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Scenes: {len(SCENES)}")
    print(f"Reference tone: web/image_new/ 1.jpg, 2.jpg, 13.jpg, 15.jpg")

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
