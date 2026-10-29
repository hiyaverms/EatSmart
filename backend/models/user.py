from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, File, UploadFile, HTTPException
from services.mongo import get_collection
from services.gemini_api import extract_ingredients_from_image

class User(BaseModel):
    username: str
    dietary_restrictions: List[str] = []
    preferred_food: List[str] = []
    goals: List[str] = []
    ingredients: List[str] = []
    liked_recipe_names: List[str] = []

router = APIRouter()
users_collection = get_collection("users")

@router.post("/{username}/ingredients/photo")
async def upload_fridge_photo(username: str, file: UploadFile = File(...)):
    image_bytes = await file.read()

    ingredients = await extract_ingredients_from_image(image_bytes)
    if not ingredients:
        raise HTTPException(status_code=400, detail="No ingredients detected")

    result = await users_collection.update_one(
        {"username": username},
        {"$addToSet": {"ingredients": {"$each": ingredients}}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"username": username, "added_ingredients": ingredients}