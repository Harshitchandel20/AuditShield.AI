import google.generativeai as genai
from pypdf import PdfReader
from typing import List, Dict, Any
import io
from datetime import datetime
from core.config import settings
from database.mongodb import db
from models.document import ComplianceChunk, DocumentMetadata

class IngestionService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = settings.EMBEDDING_MODEL

    async def process_pdf(self, file_content: bytes, filename: str) -> Dict[str, Any]:
        # 1. Extract Text
        reader = PdfReader(io.BytesIO(file_content))
        total_pages = len(reader.pages)
        
        all_chunks = []
        
        for i, page in enumerate(reader.pages):
            text = page.extract_text()
            if not text:
                continue
            
            # 2. Chunk Text
            page_chunks = self._chunk_text(text)
            
            # 3. Generate Embeddings & Create Chunk Objects
            for chunk_text in page_chunks:
                embedding = self._get_embedding(chunk_text)
                
                metadata = DocumentMetadata(
                    filename=filename,
                    page_number=i + 1,
                    upload_date=datetime.utcnow()
                )
                
                chunk = ComplianceChunk(
                    content=chunk_text,
                    embedding=embedding,
                    metadata=metadata
                )
                all_chunks.append(chunk.dict(by_alias=True))

        # 4. Store in MongoDB
        if all_chunks:
            collection = db.db["chunks"]
            await collection.insert_many(all_chunks)
            
        return {
            "filename": filename,
            "total_pages": total_pages,
            "chunks_processed": len(all_chunks)
        }

    def _chunk_text(self, text: str) -> List[str]:
        size = settings.CHUNK_SIZE
        overlap = settings.CHUNK_OVERLAP
        
        chunks = []
        for i in range(0, len(text), size - overlap):
            chunks.append(text[i : i + size])
        return chunks

    def _get_embedding(self, text: str) -> List[float]:
        result = genai.embed_content(
            model=self.model,
            content=text,
            task_type="retrieval_document"
        )
        return result["embedding"]

ingestion_service = IngestionService()
