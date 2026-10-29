from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from services.mongo import get_collection

router = APIRouter()
users_collection = get_collection("users")


class User(BaseModel):
    username: str
    dietary_restrictions: Optional[List[str]] = []
    preferred_foods: Optional[List[str]] = []
    preferred_cuisines: Optional[List[str]] = []


class UserUpdate(BaseModel):
    dietary_restrictions: Optional[List[str]] = None
    preferred_foods: Optional[List[str]] = None
    preferred_cuisines: Optional[List[str]] = None


#create
@router.post("/", response_model=User)
async def create_user(user: User):
    existing = await users_collection.find_one({"username": user.username})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    await users_collection.insert_one(user.dict())
    return user

#get
@router.get("/{username}", response_model=User)
async def get_user(username: str):
    user = await users_collection.find_one({"username": username})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**user)

#update
@router.put("/{username}", response_model=User)
async def update_user(username: str, user_update: UserUpdate):
    update_data = {k: v for k, v in user_update.dict().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No updates provided")
    result = await users_collection.update_one(
        {"username": username},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = await users_collection.find_one({"username": username})
    return User(**updated_user)

#delete
@router.delete("/{username}")
async def delete_user(username: str):
    result = await users_collection.delete_one({"username": username})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted"}
