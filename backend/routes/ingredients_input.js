import express from 'express';
import { getDB } from './db.js'; // your MongoDB connection
const app = express();
app.use(express.json());

app.post('/api/ingredients', async (req, res) => {
  const { userId, ingredients } = req.body;
  if (!userId || !ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const db = getDB();
    await db.collection('ingredients').insertOne({
      userId,
      ingredients,
      createdAt: new Date()
    });
    res.status(200).json({ message: 'Ingredients saved!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save ingredients' });
  }
});