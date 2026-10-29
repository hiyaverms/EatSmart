from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from bson import ObjectId
from services.mongo import get_collection

router = APIRouter(prefix="/ingredients", tags=["Ingredients"])

ingredients = get_collection("ingredients")

class Ingredient(BaseModel):
    name: str
    quantity: float | None = None
    unit: str | None = None
    expires_on: str | None = None  
    category: str | None = None    # "produce", "dairy", whatevaa

def serialize_doc(doc):
    doc["_id"] = str(doc["_id"])
    return doc

@router.get("/")
async def list_ingredients():
    cursor = ingredients.find({})
    items = [serialize_doc(doc) async for doc in cursor]
    return items

@router.post("/")
async def add_ingredient(ingredient: Ingredient):
    result = await ingredients.insert_one(ingredient.model_dump())
    new_doc = await ingredients.find_one({"_id": result.inserted_id})
    return serialize_doc(new_doc)

@router.get("/{ingredient_id}")
async def get_ingredient(ingredient_id: str):
    doc = await ingredients.find_one({"_id": ObjectId(ingredient_id)})
    if not doc:
        raise HTTPException(status_code=404, detail="Ingredient not found")
    return serialize_doc(doc)

@router.delete("/{ingredient_id}")
async def delete_ingredient(ingredient_id: str):
    result = await ingredients.delete_one({"_id": ObjectId(ingredient_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Ingredient not found")
    return {"message": "Ingredient deleted"}
