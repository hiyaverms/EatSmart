import os
from dotenv import load_dotenv

# Load variables from .env into environment
load_dotenv()

# Retrieve them safely
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")