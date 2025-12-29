# Learn: PDF Ingestion & Chunking Trade-offs

## 📄 PDF Ingestion Pipeline
AuditShield AI converts complex compliance documents into a format that the RAG engine can understand. This involves three critical steps:
1. **Extraction:** Converting PDF pages to clean text using `pypdf`.
2. **Chunking:** Splitting text into manageable segments.
3. **Embedding:** Representing segments as high-dimensional vectors via Gemini.

## ✂️ Chunking Strategy: Size & Overlap
Choosing the right chunk size and overlap is a delicate balance in RAG systems.

### Chunk Size (1000 characters)
- **Small Chunks:** Better for specific fact extraction but may lose broader context.
- **Large Chunks:** Preserves context but can introduce noise and dilute the semantic meaning of the embedding.
- **Our Choice:** 1000 characters is a balanced "Goldilocks" zone for compliance documents like SOC2 or ISO reports, where paragraphs are typically within this range.

### Chunk Overlap (200 characters)
- **Why Overlap?** Semantic information often spans across artificial boundaries. If a critical sentence is split in half, its embedding might not capture the full meaning.
- **The Benefit:** 20 overlap ensures that the "tail" of the previous chunk and the "head" of the next chunk share context. This significantly improves retrieval accuracy for queries that fall on the boundary.

## 🤖 Gemini Embeddings (`text-embedding-004`)
We use Google's latest embedding model because:
1. **Dynamic Dimensions:** High retrieval performance.
2. **Multilingual Support:** Ready for international compliance standards.
3. **Task Specificity:** We use the `retrieval_document` task type to optimize for information retrieval.
