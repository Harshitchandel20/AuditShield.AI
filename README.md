# AuditShield AI

**Production-grade, scalable AI system for enterprise compliance and audit validation.**

AuditShield AI is built for Auditors, Compliance Officers, and Enterprise Clients to perform rigorous analysis of compliance evidence using Retrieval-Augmented Generation (RAG).

## 🛡️ The Problem
Enterprise audits suffer from manual overhead, hallucination risks in standard AI, and a lack of source traceability.

## 🚀 The Solution: AuditShield AI
AuditShield AI ensures every answer is backed by verifiable evidence through a grounded architecture.

### 💎 Key Guarantees
- **Zero Hallucination Policy:** Strictly answers based only on retrieved context.
- **Risk-Aware Responses:** Explicitly flags missing evidence with "Risk Level: HIGH".
- **Source Transparency:** Accurate citations with page numbers.
- **Enterprise Ready:** Clean architecture and typed schemas.

## 🏗️ High-Level Architecture

```mermaid
graph TD
    User([User/Auditor]) --> Frontend[Next.js App Router]
    Frontend --> API[FastAPI Backend]
    
    subgraph "Ingestion Pipeline"
        PDF[PDF Documents] --> Parse[PDF Parser]
        Parse --> Chunk[Overlap Chunking]
        Chunk --> Embed[Embedding Generation]
        Embed --> VectorStore[(MongoDB Atlas Vector Search)]
    end
    
    subgraph "RAG Engine"
        API --> QueryEmbed[Query Embedding]
        QueryEmbed --> Search[Vector Search]
        Search --> Context[Context Retrieval]
        Context --> Guardrails[Safety Guardrails]
        Guardrails --> LLM[LLM Generation]
        LLM --> CitedAnswer[Cited Answer + Risk Score]
    end
    
    CitedAnswer --> Frontend
```

## 🛠️ Technology Stack
- **Backend:** Python + FastAPI
- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Database:** MongoDB Atlas (Vector Search)
- **AI/ML:** Google Gemini API (Embeddings & LLM), Pydantic for schema validation

## 🛠️ Getting Started

### Backend Setup
1. **Navigate to backend:** `cd backend`
2. **Setup virtual environment:** `python -m venv venv`
3. **Activate venv:** `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4. **Install dependencies:** `pip install -r requirements.txt`
5. **Configure Environment:** Copy `.env.example` to `.env` and fill in your keys.
6. **Run the server:** `uvicorn main:app --reload`

## 🔄 Ingestion Flow
1. **Upload:** `POST /api/v1/ingest` with a PDF file.
2. **Parse:** System extracts text per page using `pypdf`.
3. **Chunk:** Text is split into 1000-char chunks with 200-char overlap.
4. **Embed:** Each chunk is converted into a 768-dim vector using Gemini `text-embedding-004`.
5. **Store:** Chunks are saved in MongoDB Atlas with metadata (filename, page numbers).