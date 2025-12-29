from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class DocumentMetadata(BaseModel):
    filename: str
    page_number: Optional[int] = None
    section: Optional[str] = None
    upload_date: datetime = Field(default_factory=datetime.utcnow)

class ComplianceChunk(BaseModel):
    id: Optional[str] = Field(alias="_id")
    content: str
    embedding: List[float]
    metadata: DocumentMetadata

class ComplianceDocument(BaseModel):
    filename: str
    chunks: List[ComplianceChunk]
    total_pages: int
    summary: Optional[str] = None
