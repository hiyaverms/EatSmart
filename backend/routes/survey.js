import express from "express";
import { getDB } from "./db.js"; // adjust path if needed

const app = express();
app.use(express.json());

// POST /api/survey
app.post("/api/survey", async (req, res) => {
  const {userId, answers} = req.body;

  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ error: "Invalid or missing answers" });
  }

  try {
    const db = getDB();
    await db.collection("surveyResponses").insertOne({
      answers,
      submittedAt: new Date(),
    });

    res.status(201).json({ message: "Survey saved successfully!" });
  } catch (err) {
    console.error("Error saving survey:", err);
    res.status(500).json({ error: "Failed to save survey" });
  }
});

// GET /api/survey
app.get("/api/survey", async (req, res) => {
  try {
    const db = getDB();
    const all = await db.collection("surveyResponses").find().toArray();
    res.json(all);
  } catch (err) {
    console.error("Error fetching surveys:", err);
    res.status(500).json({ error: "Failed to fetch surveys" });
  }
});

export default app;
