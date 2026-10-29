from API_stuff.spoonacular_api import get_recipes_by_ingredients, pretty_print_recipes

# Example ingredients — feel free to change
ingredients = ["chicken", "rice", "tomato", "onion", "garlic", "pepper", "cheese", "lettuce", "cucumber", "carrot", "cashews", "greek yogurt"]

recipes = get_recipes_by_ingredients(ingredients, target_number=25, fetch_extra=10, max_missing=5)

# Pretty print for testing
pretty_print_recipes(recipes)

# Quick check for guaranteed lists
print("\nCheck lengths:")
print("Recipes ready now:", len(recipes["ready_now"]))
print("Recipes few away:", len(recipes["few_away"]))
