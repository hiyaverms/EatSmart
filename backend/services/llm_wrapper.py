from config import OPENAI_API_KEY
from openai import OpenAI
import json
from spoonacular_api import get_recipes_by_ingredients

client = OpenAI(api_key=OPENAI_API_KEY)



def llm_filter_recipes(recipes_dict, user_preferences=None, allergies=None, max_recipes=3):
    """
    Filters recipes through an LLM based on user preferences and allergies,
    returns up to max_recipes recipes with ingredients, macronutrients, and full recipe instructions.


    Args:
        recipes_dict (dict): Output from get_recipes_by_ingredients
        user_preferences (list of str): e.g., ["vegetarian", "low-carb"]
        allergies (list of str): e.g., ["peanuts", "shellfish"]
        max_recipes (int): Maximum number of recipes to return
    Returns:
        list of dict: Each dict has "title", "ingredients", "macros", "recipe"
    """
    user_preferences = user_preferences or []
    allergies = allergies or []


    # Only include relevant fields to keep prompt size manageable
    def simplify_recipes(recipes):
        simplified = []
        for r in recipes:
            simplified.append({
                "title": r.get("title", "No title"),
                "usedIngredients": [ing.get("name", "") for ing in r.get("usedIngredients", [])],
                "missedIngredients": [ing.get("name", "") for ing in r.get("missedIngredients", [])]
            })
        return simplified


    simplified_data = {
        "ready_now": simplify_recipes(recipes_dict.get("ready_now", [])),
        "few_away": simplify_recipes(recipes_dict.get("few_away", []))
    }


    prompt = f"""
You are a professional cooking assistant. I have recipes divided into two categories:


Ready Now:
{json.dumps(simplified_data['ready_now'], indent=2)}


A Few Ingredients Away:
{json.dumps(simplified_data['few_away'], indent=2)}


User preferences: {user_preferences}
User allergies: {allergies}


Your task:
1. Filter out any recipes that violate the preferences or allergies.
2. Prioritize 'ready now' recipes. Include 'few away' recipes only if necessary.
3. Suggest substitutions for missing ingredients for 'few away' recipes if possible.
4. Select up to {max_recipes} recipes that can realistically be made by the user.
5. For each recipe, provide:
   - "title": recipe name
   - "ingredients": full list of ingredients, including substitutions
   - "macros": realistic values for "calories", "protein", "fat", "carbs"
   - "recipe": step-by-step instructions


Return ONLY a valid JSON array of recipe objects.
- Ensure the JSON is parseable.
- If no recipes meet the criteria, return an empty array [].
- Do not include any text outside the JSON.
"""


    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
    )


    llm_output = response.choices[0].message.content


    try:
        recipes = json.loads(llm_output)
    except json.JSONDecodeError:
        print("Failed to parse LLM output. Returning raw string.")
        return llm_output


    return recipes


if __name__ == "__main__":
    data = llm_filter_recipes(recipes_dict=get_recipes_by_ingredients(["tofu", "milk", "steamed veggies", "avocado", "kiwi", "grapes", "oats", "kombucha"], 20, fetch_extra=3, max_missing=10, max_recipes=20))
    with open("frontend/public/recipes.json", "w") as f:
        json.dump(data, f, indent=2)