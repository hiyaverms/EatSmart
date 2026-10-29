// frontend/src/pages/RecipesPage.js
import React, { useEffect, useState } from 'react';
import { getRecipes,  } from '../services/api';

function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

  // Fetch recipes from backend when component mounts

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const res = await fetch('/recipes.json');
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setRecipes(data);
            } catch (error) {
                console.error('Fetch error:', error);
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipes();
    }, []);


    if (loading) return <p>Loading recipes...</p>;

    return (
        <div>
            <a href= "/"> Home </a>
            <h1>Recipes</h1>
            {recipes.length === 0 ? (
                <p>No recipes found.</p>
            ) : (
                <ul>
                    {recipes.map((recipe, idx) => (
                        <li key={idx}>
                            <h3>{recipe.name}</h3>
                            <p>{recipe.ingredients}</p>
                            <p>{recipe.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Recipes;