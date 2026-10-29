import React, { useState } from "react";

function Survey() {
  const [name, setName] = useState("");
  const [preferences, setPreferences] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const userId = "12345"; // Example userId — replace with real user ID

  const handleSubmit = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!name.trim() || !preferences.trim() || !restrictions.trim()) {
      setErrorMsg("⚠️ Please fill out all fields.");
      return;
    }

    const answers = { name, preferences, restrictions };

    try {
      const res = await fetch("http://localhost:5000/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, answers }),
      });

      if (!res.ok) throw new Error("Failed to submit survey");

      setSuccessMsg("✅ Survey submitted successfully!");
      setName("");
      setPreferences("");
      setRestrictions("");
    } catch (err) {
      console.error("Error submitting survey:", err);
      setErrorMsg("❌ Error submitting survey. Please try again.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Welcome! Please fill out this survey:</h2>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="name" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="preferences" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Food Preferences:
        </label>
        <textarea
          id="preferences"
          rows="3"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          placeholder="e.g. I like Italian food, spicy dishes..."
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #aaa" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="restrictions" style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Dietary Restrictions:
        </label>
        <textarea
          id="restrictions"
          rows="3"
          value={restrictions}
          onChange={(e) => setRestrictions(e.target.value)}
          placeholder="e.g. No peanuts, lactose intolerant..."
          style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #aaa" }}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px 16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Submit Survey
      </button>

      {errorMsg && <p style={{ marginTop: "10px", color: "red", textAlign: "center" }}>{errorMsg}</p>}
      {successMsg && <p style={{ marginTop: "10px", color: "green", textAlign: "center" }}>{successMsg}</p>}
    </div>
  );
}

export default Survey;
