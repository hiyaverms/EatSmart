// vibe code
const BASE_URL = 'http://localhost:5000';

export async function getRecipes() {
    const response = await fetch(`${BASE_URL}/recipes`);
    if (!response.ok) {
        throw new Error(`Failed to fetch recipes.`);
    }
    return await response.json();
}