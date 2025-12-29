# Learn: Project Vision & Architecture

## 🔍 The Audit Problem Space
Modern enterprise compliance is about verifiable evidence. AuditShield AI is designed to address the critical need for 100% groundedness in AI-assisted auditing.

## 🧠 Why RAG + Vector DB?

### Retrieval-Augmented Generation (RAG)
RAG is the superior choice for auditing because it provides:
1. **Verifiability:** Direct links to the underlying evidence.
2. **Dynamism:** No need for costly retraining as compliance documents evolve.
3. **Control:** Restricted context prevents model imagination.

### MongoDB Atlas Vector Search
MongoDB Atlas is chosen for its unified transactional and vector capabilities, enterprise-grade scalability, and powerful metadata-based filtering.

## 🏗️ Design Trade-offs
- **Overlap Chunking:** Ensures semantic continuity across chunk boundaries.
- **Accuracy First:** Prioritizes explicit refusal over uncertain answers.
