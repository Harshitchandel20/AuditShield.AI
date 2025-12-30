import google.generativeai as genai
import time
from typing import List, Dict, Any
from core.config import settings
from database.mongodb import db
from models.search import SimilaritySearchRequest, SearchResult, SearchResponse

class RetrievalService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = settings.EMBEDDING_MODEL

    async def similarity_search(self, request: SimilaritySearchRequest) -> SearchResponse:
        start_time = time.time()
        
        # 1. Generate Query Embedding
        query_embedding = self._get_query_embedding(request.query)
        
        # 2. Perform MongoDB Vector Search
        results = await self._vector_search(query_embedding, request.top_k, request.filename)
        
        processing_time = (time.time() - start_time) * 1000
        
        return SearchResponse(
            query=request.query,
            results=results,
            processing_time_ms=processing_time
        )

    def _get_query_embedding(self, text: str) -> List[float]:
        result = genai.embed_content(
            model=self.model,
            content=text,
            task_type="retrieval_query"
        )
        return result["embedding"]

    async def _vector_search(self, embedding: List[float], top_k: int, filename: str = None) -> List[SearchResult]:
        collection = db.db["chunks"]
        
        pipeline = [
            {
                "$vectorSearch": {
                    "index": "vector_index",
                    "path": "embedding",
                    "queryVector": embedding,
                    "numCandidates": top_k * 10,
                    "limit": top_k
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "content": 1,
                    "metadata": 1,
                    "score": {"$meta": "vectorSearchScore"}
                }
            }
        ]

        search_results = []
        async for doc in collection.aggregate(pipeline):
            search_results.append(SearchResult(
                content=doc["content"],
                score=doc["score"],
                metadata=doc["metadata"]
            ))
            
        return search_results

retrieval_service = RetrievalService()
