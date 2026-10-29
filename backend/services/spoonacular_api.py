import requests
from config import SPOONACULAR_API_KEY
'''
Ideally, target_number is 25, fetch_extra is 5, max_missing is 3
'''
def get_recipes_by_ingredients(
    ingredients, 
    target_number,    
    fetch_extra,       
    max_missing
):
    """
    Fetch recipes from Spoonacular and split into 'ready_now' and 'few_away'.
    Guarantees at least one recipe in each list if Spoonacular returns enough results.

    Args:
        ingredients (list of str): Ingredients user has.
        target_number (int): Total number of recipes to return.
        fetch_extra (int): Extra recipes to fetch to compensate for filtering.
        max_missing (int): Max number of missing ingredients for 'few_away'.

    Returns:
        dict: {
            "ready_now": [recipe_dict, ...],
            "few_away": [recipe_dict, ...]
        }
    """
    total_number = target_number + fetch_extra
    url = "https://api.spoonacular.com/recipes/findByIngredients"
    params = {
        "ingredients": ",".join(ingredients),
        "number": total_number,
        "ranking": 1,  # minimize missing ingredients
        "ignorePantry": True,
        "apiKey": SPOONACULAR_API_KEY
    }

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"Error calling Spoonacular API: {e}")
        return {"ready_now": [], "few_away": []}

    all_recipes = response.json()
    ready_now = []
    few_away = []

    for recipe in all_recipes:
        missing_count = len(recipe.get("missedIngredients", []))
        if missing_count == 0:
            ready_now.append(recipe)
        elif 1 <= missing_count <= max_missing:
            few_away.append(recipe)

    # -------------------------------
    # Guarantee at least one recipe in each list
    # -------------------------------
    if not ready_now and few_away:
        # Move first recipe from few_away to ready_now and mark missing ingredients
        ready_now.append(few_away.pop(0))
    elif not few_away and ready_now:
        # Move last recipe from ready_now to few_away and mark as missing one ingredient
        few_away.append(ready_now.pop(-1))

    # Trim lists if they exceed target_number
    total_recipes = ready_now + few_away
    if len(total_recipes) > target_number:
        if len(total_recipes) > target_number:
            ready_now = ready_now[:target_number]
        if len(ready_now) < target_number:
            few_away = few_away[:target_number - len(ready_now)]


    return {"ready_now": ready_now, "few_away": few_away}


def pretty_print_recipes(recipes_dict):
    print("=== Recipes You Can Make Now ===\n")
    for i, recipe in enumerate(recipes_dict["ready_now"], start=1):
        title = recipe.get("title", "No title")
        used = [ing["name"] for ing in recipe.get("usedIngredients", [])]
        print(f"{i}. {title} (Ingredients you have: {', '.join(used)})")

    print("\n=== Recipes You Are A Few Ingredients Away From ===\n")
    for i, recipe in enumerate(recipes_dict["few_away"], start=1):
        title = recipe.get("title", "No title")
        used = [ing["name"] for ing in recipe.get("usedIngredients", [])]
        missed = [ing["name"] for ing in recipe.get("missedIngredients", [])]
        print(f"{i}. {title} (Have: {', '.join(used)} | Missing: {', '.join(missed)})")


