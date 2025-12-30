from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class SimilaritySearchRequest(BaseModel):
    query: str
    top_k: int = Field(default=5, ge=1, le=20)
    filename: Optional[str] = None

class SearchResult(BaseModel):
    content: str
    score: float
    metadata: Dict[str, Any]

class SearchResponse(BaseModel):
    query: str
    results: List[SearchResult]
    processing_time_ms: float
