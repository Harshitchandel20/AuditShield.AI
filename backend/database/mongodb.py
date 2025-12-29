import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    @classmethod
    async def connect_to_storage(cls):
        mongodb_uri = os.getenv("MONGODB_URI")
        db_name = os.getenv("DB_NAME", "auditshield")
        
        if not mongodb_uri:
            raise Exception("MONGODB_URI not found in environment variables")
            
        cls.client = AsyncIOMotorClient(mongodb_uri)
        cls.db = cls.client[db_name]
        print(f"Connected to MongoDB: {db_name}")

    @classmethod
    async def close_storage(cls):
        if cls.client:
            cls.client.close()
            print("Closed MongoDB connection")

db = MongoDB()
