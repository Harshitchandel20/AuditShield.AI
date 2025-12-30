from fastapi import APIRouter, HTTPException
from services.rag_service import rag_service
from models.rag_models import RAGRequest, RAGResponse

router = APIRouter(prefix="/chat", tags=["RAG Chat"])

@router.post("/ask", response_model=RAGResponse)
async def ask_compliance_query(request: RAGRequest):
    try:
        response = await rag_service.generate_grounded_response(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RAG Generation failed: {str(e)}")
