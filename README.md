# EatSmart

A web app that reduces food waste. You snap a photo of your fridge, and EatSmart identifies the ingredients and suggests recipes that fit your dietary preferences and health goals.

<!-- Add a screenshot here: ![EatSmart demo](docs/demo.png) -->

## How it works

1. **Survey:** new users enter their dietary preferences and health goals.
2. **Fridge photo:** the user uploads a picture of their fridge.
3. **Ingredient detection:** Google Gemini analyzes the image and returns a list of ingredients.
4. **Recipes:** the app generates recipe suggestions based on those ingredients and the user's profile.

## Tech stack

**Frontend:** React 19, React Router
**Backend:** Python, FastAPI
**AI:** Google Gemini (image → ingredient extraction)
**Database:** MongoDB

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/ingredients/` | List ingredients |
| `POST` | `/ingredients/` | Add an ingredient |
| `POST` | `/recipes/generate` | Generate recipes from ingredients and preferences |
| `POST` | `/users/` | Create a user profile |
| `GET` | `/users/{username}` | Get a user profile |

## My role

I built the **Python backend**:

- Set up the FastAPI skeleton, the MongoDB connection, and the ingredient routes
- Wrote the `users` and `recipes` routes and the user schema
- Built the **Gemini image-to-ingredient pipeline**

## Run locally

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install fastapi uvicorn google-genai pymongo python-dotenv
echo "GEMINI_API_KEY=your_key" >> .env
echo "MONGO_URI=your_mongodb_uri" >> .env
uvicorn main:app --reload

cd ../frontend
npm install
npm start
```

## Team

- **Hiya Verma** ([@hiyaverms](https://github.com/hiyaverms))
- **Brady Xue** ([@BradyXue1](https://github.com/BradyXue1))
- **Amanda Eng** ([@akeng746](https://github.com/akeng746)))
- **Brady Schultz** ([@Bradysch131](https://github.com/Bradysch131))

> Built at **BostonHacks 2025** by a team of 4. Original repo: [BradyXue1/Team-Tony](https://github.com/BradyXue1/Team-Tony)

