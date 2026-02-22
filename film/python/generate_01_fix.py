#!/usr/bin/env python3
"""
Regenerate 01_approach — same Blender building, NO trees, darker tone.
"""

from google import genai
from google.genai import types
from pathlib import Path

API_KEY = "AIzaSyA97SmBweFBqUzFr7qCzCngsFUn4BZ-7iY"
client = genai.Client(api_key=API_KEY)

OUTPUT_DIR = Path(__file__).parent / "storyboard_visitor"
REF_IMAGE = Path(__file__).parent / "reference" / "building.jpg"

image_bytes = REF_IMAGE.read_bytes()

prompt = (
    "Generate a cinematic film still in 2.39:1 cinemascope widescreen aspect ratio. "
    "Use this building EXACTLY as shown in the reference image — "
    "same stacked offset concrete volumes, same curtain wall glass panels, "
    "same massing, same proportions, same facade composition. "
    "Do NOT change the building design. Keep the exact same architecture. "
    "Render it as an exterior night shot: "
    "dark atmosphere, deep near-black sky, NO TREES — none at all. "
    "Clean empty urban plaza around the building. Minimal landscaping. "
    "Dark concrete or stone pavement. "
    "Warm golden light glows from within through the curtain wall glass. "
    "A solitary figure approaching on the ground. "
    "The building stands alone as a dark monolith with warm light incisions. "
    "Moody, dark, architectural — like a Balenciaga or Gentle Monster flagship at night. "
    "Dark but with enough detail to read the concrete texture and glass reflections. "
    "ARRI Alexa 65 large format cinematography, 35mm film grain, "
    "anamorphic lens, shallow depth of field. "
    "The building is the hero — monumental, isolated, glowing from within against dark sky."
)

response = client.models.generate_content(
    model="gemini-2.0-flash-exp-image-generation",
    contents=[
        types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
        prompt
    ],
    config=types.GenerateContentConfig(
        response_modalities=["IMAGE", "TEXT"],
    )
)

for part in response.candidates[0].content.parts:
    if part.inline_data is not None:
        image_data = part.inline_data.data
        mime_type = part.inline_data.mime_type
        ext = "png" if "png" in mime_type else "jpg"
        filepath = OUTPUT_DIR / f"01_approach.{ext}"
        filepath.write_bytes(image_data)
        print(f"Saved: {filepath}")
        print(f"Size: {len(image_data)/1024:.1f} KB")
    elif part.text:
        print(f"Text: {part.text[:200]}")
