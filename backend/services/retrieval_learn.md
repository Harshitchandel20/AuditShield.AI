# Learn: RAG Retrieval & Vector Search

## 🔍 Semantic Search vs. Keyword Search
In Hour 5, we implemented basic semantic retrieval. Unlike traditional keyword search (BM25), vector search finds chunks that are *semantically* related to the query, even if they don't share exact words.

## ⚙️ How it works: Vector Search Logic
1. **Query Embedding:** Gemini converts the auditor's question (e.g., "What is the policy for encryption?") into a 768-dimension vector.
2. **$vectorSearch:** MongoDB Atlas performs a k-Nearest Neighbors (k-NN) search to find the top `n` most similar vectors in the collection.
3. **Similarity Score:** Each result is returned with a `vectorSearchScore`. In our case (Cosine Similarity), a score closer to 1.0 indicates a stronger semantic match.

## 📊 Parameters: Top-K & Candidates
- **Top-K (limit):** The number of chunks we actually return to the user (or the LLM). We default to 5.
- **numCandidates:** To ensure accuracy, the search engine looks at a larger initial pool (Top-K * 10) before refining the results. This balance ensures high performance without sacrificing precision.

## 🛡️ Metadata Filtering (The Next Step)
While we currently fetch the best semantic matches, the next phase (advanced RAG) will include pre-filtering by source file or risk level to provide even narrower and more accurate context.
