from fastapi import APIRouter, UploadFile, File, HTTPException
from services.ingestion import ingestion_service
from typing import Dict, Any

router = APIRouter(prefix="/ingest", tags=["Ingestion"])

@router.post("")
async def ingest_document(file: UploadFile = File(...)) -> Dict[str, Any]:
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    try:
        content = await file.read()
        result = await ingestion_service.process_pdf(content, file.filename)
        return {
            "status": "success",
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")
