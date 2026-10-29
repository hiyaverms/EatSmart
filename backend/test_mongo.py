from services.mongo import get_collection
import asyncio

async def test():
    ingredients = get_collection("ingredients")
    print(await ingredients.find_one({})) 

asyncio.run(test())