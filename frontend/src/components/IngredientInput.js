import React, { useState } from "react";

function IngredientInput() {
  const [ingredients, setIngredients] = useState([""]);
  const [error, setError] = useState("");

  const handleChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const handleSubmit = async () => {
    setError("");
    const filtered = ingredients
      .map((i) => i.trim().toLowerCase())
      .filter((i) => i !== "");

    if (filtered.length === 0) {
      setError("Please enter at least one ingredient.");
      return;
    }

    const userId = "12345"; // placeholder

    try {
      const res = await fetch("http://localhost:5000/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ingredients: filtered }),
      });
      if (!res.ok) throw new Error("Failed to save ingredients");

      setIngredients([""]);
      alert("Ingredients saved! Next step...");
    } catch (err) {
      console.error(err);
      setError("Error saving ingredients.");
    }
  };

  return (
    <div id="ingredients-container">
      <h2>Enter your ingredients</h2>

      <div id="fields">
        {ingredients.map((ingredient, index) => (
          <div key={index} className="ingredient-field">
            <input
              type="text"
              value={ingredient}
              placeholder="e.g. tomato"
              onChange={(e) => handleChange(index, e.target.value)}
            />
            {ingredients.length > 1 && (
              <button type="button" onClick={() => removeIngredient(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
      </div>

      <button id="add-btn" onClick={addIngredient}>
        Add Ingredient
      </button>

      <div style={{ marginTop: "12px" }}>
        <button id="submit-btn" onClick={handleSubmit}>
          Submit Ingredients
        </button>
      </div>

      {error && <p id="error-msg" style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default IngredientInput;
