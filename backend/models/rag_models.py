from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

class RiskLevel(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"

class Citation(BaseModel):
    source: str
    page: int
    text_snippet: str

class RAGRequest(BaseModel):
    query: str
    top_k: int = Field(default=5, ge=1, le=10)
    filename: Optional[str] = None

class RAGResponse(BaseModel):
    query: str
    answer: str
    citations: List[Citation]
    risk_score: float = Field(..., description="0 to 100 risk score")
    risk_level: RiskLevel
    processing_time_ms: float
