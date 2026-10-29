from pydantic import BaseModel
from typing import Optional, List

class Recipe(BaseModel):
    name: str
    ingredients: List[str] = []
    directions: List[str] = []