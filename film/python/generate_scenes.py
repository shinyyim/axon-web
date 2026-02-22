#!/usr/bin/env python3
"""
DUNE.X — Storyboard Scene Image Generator
Based on storyboard/storyboard.md — "DEPARTURE" (30s, 5 scenes)
Uses Gemini 2.0 Flash Image Generation
"""

from google import genai
from google.genai import types
from pathlib import Path
import time

API_KEY = "AIzaSyA97SmBweFBqUzFr7qCzCngsFUn4BZ-7iY"
client = genai.Client(api_key=API_KEY)

OUTPUT_DIR = Path(__file__).parent / "images"
OUTPUT_DIR.mkdir(exist_ok=True)

TONE_PREFIX = (
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
    "scene_01_origin": {
        "filename": "scene_01_origin",
        "prompt": (
            TONE_PREFIX +
            "Extreme macro shot. Mineral dust particles suspended in pure darkness, "
            "slowly coalescing into a fabric-like material formation. "
            "Each individual particle is lit with warm amber and gold micro-highlights, "
            "like glowing grains of sand catching light. "
            "The particles drift and connect, forming an emerging ordered structure from chaos. "
            "Pure black background with no other elements. "
            "100fps slow motion feel, locked camera with imperceptible slow dolly in. "
            "Deep subsonic atmosphere. Granular texture visible. "
            "Reference: microscopy of mineral dust, creation mythology. "
            "Mood: genesis, the beginning of something from nothing, mystery."
        )
    },
    "scene_02_form": {
        "filename": "scene_02_form",
        "prompt": (
            TONE_PREFIX +
            "A bone-white garment materializing inside a dark manufacturing cell. "
            "The lower half of the garment is fully formed in smooth membrane material. "
            "The upper half is mid-construction — visible computational lattice structure "
            "being deposited layer by layer by a robotic arm under a single focused white spotlight. "
            "Cool industrial blue-white spotlight illumination on the garment, "
            "dark industrial surroundings everywhere else. "
            "Slow arc camera angle from 3/4 front view. Rack focus from robotic arm to garment. "
            "60fps slight slow motion feel. Methodical, precise deposits of material. "
            "The lattice grows before our eyes. Tiny placement details visible. "
            "Reference: SCRY digital embryo 3D printing process, SpaceX manufacturing. "
            "Mood: computation as craft, technology with poetry."
        )
    },
    "scene_03_space": {
        "filename": "scene_03_space",
        "prompt": (
            TONE_PREFIX +
            "A vast cathedral-like flagship retail store interior. "
            "Camera has just emerged through a narrow concrete corridor (airlock) "
            "into the enormous dark space. "
            "A massive amber sculptural form — raw, geological, like an alien rock formation — "
            "hangs suspended in the center of the space, casting warm volumetric amber light "
            "through floating dust particles. "
            "Products glow softly on dark pedestals arranged around the perimeter. "
            "Steadicam forward tracking perspective, the space unfolding before the viewer. "
            "Cathedral acoustics feel. Dust particles float through amber light beams. "
            "Deep darkness with warm amber-gold glow radiating from the central sculpture. "
            "Regolith warm tones mixed with deep void black. "
            "Concrete walls barely visible. Immersive retail atmosphere. "
            "Reference: Gentle Monster immersive retail, James Turrell light installations, "
            "SUB architectural scenography. "
            "Mood: sacred space, the store as temple, arrival."
        )
    },
    "scene_04_body": {
        "filename": "scene_04_body",
        "prompt": (
            TONE_PREFIX +
            "A solitary figure walking in profile through a dark minimal environment. "
            "Wearing full futuristic techwear ensemble: bone-white membrane coat "
            "with parametric panel lines and transparent sections, "
            "dark utility trousers, and 3D-printed lattice boots with engineered tread. "
            "Dramatic warm rim lighting traces the edges of the garment from behind. "
            "Shallow depth of field — background dissolves into pure darkness. "
            "Camera tracking alongside at walking speed, shot from knee height looking up. "
            "72fps slight slow motion. Deliberate stride. "
            "The coat fabric catches light with each step. "
            "Boots grip the dark surface with visible engineered tread pattern. "
            "Desaturated palette. Bone-white garment against void. "
            "Face barely visible — the design is the subject, not the person. "
            "Reference: Helmut Lang runway films, Acronym product videos. "
            "Mood: the human element, body activating design, purpose in motion."
        )
    },
    "scene_05_brand": {
        "filename": "scene_05_brand",
        "prompt": (
            TONE_PREFIX +
            "Pure black void. Tiny dust particles drift in from the edges of frame, "
            "slowly assembling and forming into the letterforms of 'DUNE.X' — "
            "the wordmark materializes in bone-white (#E8E0D4), wide-tracked geometric type. "
            "Ultra-bold extended sans-serif typeface. "
            "The particles at the letter edges are still slightly in motion — "
            "the brand born from raw material. "
            "Below the wordmark, smaller monospaced text: 'FUTURE YOUR PERFORMANCE.' "
            "Locked off, centered composition. No camera movement — absolute stillness. "
            "Maximum contrast: pure black background, bone-white letters. "
            "No warmth, no color — just the wordmark emerging from void. "
            "The period after X is prominent. "
            "Reference: SpaceX mission end cards, luxury brand film end frames. "
            "Mood: clarity, brand statement, the meaning of everything that came before."
        )
    }
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

            print(f"  Saved: {filepath}")
            print(f"  Format: {mime_type}, Size: {len(image_data)/1024:.1f} KB")
            return filepath
        elif part.text:
            print(f"  Text: {part.text[:200]}")

    print("  WARNING: No image generated")
    return None


def main():
    print("DUNE.X — 'DEPARTURE' Storyboard Scene Generator")
    print(f"Source: storyboard/storyboard.md (30s, 5 scenes)")
    print(f"Output: {OUTPUT_DIR}")

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
