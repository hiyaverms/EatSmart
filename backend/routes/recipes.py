from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from services.llm_wrapper import generate_recipe
from services.mongo import get_collection

router = APIRouter()
recipes_collection = get_collection("recipes")

# Request model
class RecipeRequest(BaseModel):
    username: str
    ingredients: List[str]

# Response model
class RecipeResponse(BaseModel):
    title: str
    instructions: str
    ingredients_needed: List[str]

@router.post("/generate", response_model=RecipeResponse)
async def generate(user_input: RecipeRequest):
    
    recipe = await generate_recipe(user_input.ingredients)
    
    #save to MongoDB?
    await recipes_collection.insert_one({
        "username": user_input.username,
        "ingredients": user_input.ingredients,
        "recipe": recipe
    })
    
    return RecipeResponse(**recipe)
