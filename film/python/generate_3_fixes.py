#!/usr/bin/env python3
"""
DUNE.X — Regenerate 3 scenes for storyboard_visitor
01_approach → ref building.jpg
03_atrium → ref 1.jpg
09_descent → replace spiral staircase with dark corridor/light frame passage
"""

from google import genai
from google.genai import types
from pathlib import Path
import time

API_KEY = "AIzaSyA97SmBweFBqUzFr7qCzCngsFUn4BZ-7iY"
client = genai.Client(api_key=API_KEY)

OUTPUT_DIR = Path(__file__).parent / "storyboard_visitor"

TONE = (
    "Cinematic film still, 2.39:1 cinemascope widescreen aspect ratio, "
    "ultra-dark void background (#0A0A0C near-black), architectural lighting, "
    "minimal color palette of bone-white and deep black, "
    "high-fashion techwear editorial aesthetic, "
    "ARRI Alexa 65 large format look, shallow depth of field, "
    "anamorphic lens flare, 35mm film grain, "
    "theatrical darkness with precise directional light, "
    "no natural landscapes, dark stage environment. "
)

SCENES = {
    "01_approach": {
        "filename": "01_approach",
        "prompt": (
            TONE +
            "Exterior dusk blue hour. A multi-story building made of stacked offset "
            "dark concrete masses interlocking with tall vertical curtain wall glass panels. "
            "The building is approximately 6 floors — rectangular concrete volumes "
            "shifted horizontally creating terraces and cantilevers. "
            "Warm golden light glows from within through the tall glass curtain walls, "
            "illuminating the vertical mullion grid. Dark concrete sections alternate "
            "with glowing glass sections. "
            "The ground floor has a recessed entrance with warm light spilling out. "
            "Bare winter trees frame the building on either side. "
            "Wet pavement reflecting the warm interior glow. "
            "A solitary figure approaches on the sidewalk. "
            "Blue-grey overcast sky. Urban context. "
            "The building reads as interlocking dark masses with warm incisions of light. "
            "Wide establishing shot, slightly below eye level. "
            "Reference: contemporary concrete and glass stacked volume architecture at blue hour, "
            "warm interior glow through vertical curtain wall mullions."
        )
    },
    "03_atrium": {
        "filename": "03_atrium",
        "prompt": (
            TONE +
            "A vast dark theatrical interior space — the flagship store main hall. "
            "An enormous curved LED screen wall wraps the back of the space, "
            "displaying atmospheric dark smoke and fog visuals — swirling grey-black textures. "
            "The screen is massive, floor to ceiling, curved in a wide arc. "
            "The floor is dark, polished, reflective. "
            "A single solitary figure stands far away at the center of the space, "
            "tiny against the scale of the curved screen and the darkness. "
            "Rows of dark seating or display platforms line both sides, "
            "like an audience in silhouette. "
            "Overhead: a grid of small linear white lights on the ceiling structure. "
            "The space feels like a dark runway or theatrical stage — "
            "immense, cinematic, atmospheric. "
            "Haze and smoke drift through the space, catching faint light. "
            "The mood is singular solitude in a vast dark arena. "
            "Reference: dark runway stage with massive curved screen wall, "
            "solitary figure, atmospheric smoke, audience silhouettes."
        )
    },
    "09_passage": {
        "filename": "09_descent",
        "prompt": (
            TONE +
            "Interior: a vast dark hall between floors of the flagship store. "
            "A large rectangular geometric light frame floats suspended from the ceiling — "
            "a glowing white rectangular outline made of thin LED bars, "
            "hovering over a raised platform in the center of the space. "
            "The light frame casts precise geometric reflections on the wet dark floor below. "
            "A solitary visitor stands on the platform beneath the floating light frame, "
            "small against the enormous dark space. "
            "Fine vertical lines or cables descend from the ceiling, barely visible. "
            "Atmospheric haze fills the space, making the light frame glow with soft halos. "
            "The floor is dark, slightly reflective like polished concrete or wet stone. "
            "The space is a transitional chamber — between floors, between experiences. "
            "Reference: floating rectangular light installation suspended in vast dark space, "
            "solitary figure beneath, atmospheric haze, reflective floor."
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
    print("DUNE.X — Regenerating 3 scenes")
    print(f"Output: {OUTPUT_DIR}")

    for scene_id, scene_data in SCENES.items():
        try:
            generate_scene(scene_id, scene_data)
            time.sleep(5)
        except Exception as e:
            print(f"  ERROR: {e}")
            time.sleep(8)

    print("\nDone.")


if __name__ == "__main__":
    main()
