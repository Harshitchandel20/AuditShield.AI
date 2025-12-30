from fastapi import APIRouter, HTTPException
from services.retrieval import retrieval_service
from models.search import SimilaritySearchRequest, SearchResponse

router = APIRouter(prefix="/search", tags=["Search"])

@router.post("", response_model=SearchResponse)
async def semantic_search(request: SimilaritySearchRequest):
    try:
        results = await retrieval_service.similarity_search(request)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")
