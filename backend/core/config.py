import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API
    PROJECT_NAME: str = "AuditShield AI"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # AI
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "models/text-embedding-004")
    LLM_MODEL: str = os.getenv("LLM_MODEL", "gemini-1.5-pro")
    
    # RAG Pipeline
    CHUNK_SIZE: int = 1000
    CHUNK_OVERLAP: int = 200
    
    class Config:
        env_file = ".env"

settings = Settings()
