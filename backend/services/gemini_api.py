from google import genai
from google.genai.types import GenerateContentConfig, Part
import os
import json

# Initialize client
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

async def extract_ingredients_from_image(image_bytes: bytes):
    # send image
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        config=GenerateContentConfig(
            temperature=0.2
        ),
        contents=[
            Part.from_bytes(image_bytes, mime_type="image/jpeg"),
            "List all food items or ingredients visible in this image. Respond with a JSON array of ingredient names only, no extra text."
        ]
    )

    try:
        ingredients = json.loads(response.text)
        if isinstance(ingredients, list):
            return ingredients
    except Exception:
        pass

    text = response.text.strip()
    ingredients = [item.strip() for item in text.split(",") if item.strip()]
    return ingredients
