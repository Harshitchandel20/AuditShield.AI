import google.generativeai as genai
import time
import json
from typing import List, Dict, Any
from core.config import settings
from services.retrieval import retrieval_service
from models.search import SimilaritySearchRequest
from models.rag_models import RAGRequest, RAGResponse, Citation, RiskLevel

class RAGService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.LLM_MODEL)

    async def generate_grounded_response(self, request: RAGRequest) -> RAGResponse:
        start_time = time.time()
        
        # 1. Retrieve Context
        search_request = SimilaritySearchRequest(
            query=request.query,
            top_k=request.top_k,
            filename=request.filename
        )
        search_data = await retrieval_service.similarity_search(search_request)
        
        if not search_data.results:
            return self._format_empty_response(request.query, start_time)

        # 2. Build System Prompt & Context
        context_text = self._format_context(search_data.results)
        prompt = self._build_prompt(request.query, context_text)
        
        # 3. Generate Content
        response = await self.model.generate_content_async(prompt)
        answer_text = response.text
        
        # 4. Extract Citations & Calculate Risk
        citations = self._extract_citations(search_data.results)
        risk_score, risk_level = self._assess_risk(search_data.results, answer_text)
        
        processing_time = (time.time() - start_time) * 1000
        
        return RAGResponse(
            query=request.query,
            answer=answer_text,
            citations=citations,
            risk_score=risk_score,
            risk_level=risk_level,
            processing_time_ms=processing_time
        )

    def _format_context(self, results: List[Any]) -> str:
        formatted_context = ""
        for i, res in enumerate(results):
            formatted_context += f"--- CONTEXT CHUNK {i+1} ---\n"
            formatted_context += f"Source: {res.metadata.get('filename')}\n"
            formatted_context += f"Page: {res.metadata.get('page_number')}\n"
            formatted_context += f"Content: {res.content}\n\n"
        return formatted_context

    def _build_prompt(self, query: str, context: str) -> str:
        return f"""
You are AuditShield AI, a strict compliance and audit validation specialist. Your goal is to answer the User Query based ONLY on the provided Context.

--- CONTEXT ---
{context}
--- END CONTEXT ---

USER QUERY: {query}

--- RULES ---
1. Use ONLY the provided Context to answer. Do not use outside knowledge.
2. If the Context does not contain the answer, explicitly state: "I cannot find the required evidence in the provided compliance documents."
3. Cite your sources specifically by referring to "CONTEXT CHUNK X" or mentioning the Page and Source.
4. Maintain a formal, professional audit tone.
5. If the evidence is ambiguous, mention "Evidence Level: LOW" and explain why.

ANSWER:
"""

    def _extract_citations(self, results: List[Any]) -> List[Citation]:
        citations = []
        for res in results:
            citations.append(Citation(
                source=res.metadata.get('filename', 'Unknown'),
                page=res.metadata.get('page_number', 0),
                text_snippet=res.content[:200] + "..."
            ))
        return citations

    def _assess_risk(self, results: List[Any], answer: str) -> (float, RiskLevel):
        # Placeholder for complex risk scoring logic
        # For now, if "cannot find" is in the answer, risk is high.
        if "I cannot find" in answer or "unavailable" in answer.lower():
            return 90.0, RiskLevel.HIGH
        
        # If we have few results, risk is medium
        if len(results) < 2:
            return 50.0, RiskLevel.MEDIUM
            
        return 10.0, RiskLevel.LOW

    def _format_empty_response(self, query: str, start_time: float) -> RAGResponse:
        processing_time = (time.time() - start_time) * 1000
        return RAGResponse(
            query=query,
            answer="I cannot find any relevant documents to answer your query.",
            citations=[],
            risk_score=100.0,
            risk_level=RiskLevel.HIGH,
            processing_time_ms=processing_time
        )

rag_service = RAGService()
