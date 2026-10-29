import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getDB } from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// your routes
app.post("/api/ingredients", async (req, res) => {
  const { userId, ingredients } = req.body;
  console.log("📩 Received:", req.body);

  if (!userId || !ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const db = getDB();
    await db.collection("ingredients").insertOne({
      userId,
      ingredients,
      createdAt: new Date(),
    });
    res.status(200).json({ message: "Ingredients saved!" });
  } catch (err) {
    console.error("❌ Error saving ingredients:", err);
    res.status(500).json({ error: "Failed to save ingredients" });
  }
});

app.post("/api/survey", async (req, res) => {
  const { userId, answers } = req.body;
  console.log("📩 Received survey:", req.body);

  if (!userId || !answers || typeof answers !== "object") {
    return res.status(400).json({ error: "Invalid input from server" });
  }

  try {
    const db = getDB();
    await db.collection("surveyResponses").insertOne({
      userId,
      answers,
      submittedAt: new Date(),
    });
    res.status(200).json({ message: "Survey saved!" });
  } catch (err) {
    console.error("❌ Error saving survey:", err);
    res.status(500).json({ error: "Failed to save survey" });
  }
});

const PORT = process.env.PORT || 5000;



// 🔥 The key part:
connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
