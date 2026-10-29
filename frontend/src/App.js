import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Survey from "./components/Survey";
import IngredientInput from "./components/IngredientInput";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("Tony");

  const handleSubmit = () => {
    if (image) {
      alert("Submission received! ✅");
      setImage(null);
      document.getElementById("imageInput").value = null;
    }
  };

  return (
    <div className="App">
      {/* Top Header */}
      <header className="site-header">
        <h1>Boston Hacks 2025</h1>
      </header>

      <Routes>
        {/* Home page route */}
        <Route
          path="/"
          element={
            <>
              <section className="hero">
                <div className="food-emojis">
                  <span>🍔</span>
                  <span>🍕</span>
                  <span>🍜</span>
                </div>
                <h2>
                  Start by filling out our{" "}
                  <Link to="/Survey" className="link">
                    survey!
                  </Link>
                </h2>
              </section>

              <section id="submission-section" className="input-section">
                <h2>Submit your picture or go to Ingredient Input!</h2>

                <div className="input-container">
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <button onClick={handleSubmit}>Submit Picture</button>
                </div>

                {/* Ingredient Input Link placed here */}
                <div style={{ marginTop: "15px" }}>
                  <Link to="/IngredientInput" className="link">
                    Go to Ingredient Input →
                  </Link>
                </div>
              </section>

              <div style={{ paddingTop: 20 }}></div>

              <Link to="/Recipes">Get Recipes!</Link>
            </>
          }
        />

        {/* Other pages */}
        <Route path="/Recipes" element={<Recipes />} />
        <Route path="/Survey" element={<Survey />} />
        <Route path="/IngredientInput" element={<IngredientInput />} />
      </Routes>
    </div>
  );
}

export default App;
