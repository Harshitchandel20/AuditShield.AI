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

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB Atlas account
- Google Gemini API key

### Backend Setup

1. **Clone and navigate to backend:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Create `.env` file:**
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/auditshield
DATABASE_NAME=auditshield
COLLECTION_NAME=compliance_chunks
VECTOR_INDEX_NAME=vector_index
```

4. **Run the backend:**
```bash
uvicorn main:app --reload
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to client:**
```bash
cd client
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the frontend:**
```bash
npm run dev
```

Frontend will be available at `http://localhost:3000`

## 📚 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/v1/ingest` | POST | Upload and process PDF documents |
| `/api/v1/search` | POST | Semantic search across documents |
| `/api/v1/chat/ask` | POST | Ask questions with grounded responses |

## 📖 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Production deployment guide
- **[learn.md](./learn.md)** - Architecture and design decisions
- **[Walkthrough](https://github.com/yourusername/AuditShield.AI)** - Complete project walkthrough

## 🎯 Usage Example

1. **Upload a PDF:** Click "Ingest Document" and select a compliance PDF
2. **Ask a question:** Type your compliance question in the chat
3. **Review citations:** Click on sources to verify evidence
4. **Check risk level:** Green (LOW) = strong evidence, Red (HIGH) = no evidence

## 🔒 Security & Privacy

- All documents are processed locally
- No data is shared with third parties except Gemini API for processing
- Citations ensure full audit trail

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for guidelines.

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

## 🔍 Retrieval Strategy
1. **Semantic Query:** `POST /api/v1/search` with a natural language query.
2. **Vector Lookup:** System performs a k-NN search across the vector index using Cosine Similarity.
3. **Top-K Results:** Returns the most relevant document chunks with their similarity scores and page metadata.