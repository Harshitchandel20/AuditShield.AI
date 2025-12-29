# Learn: MongoDB Atlas Vector Search

## 🚀 Vector Search in MongoDB Atlas
AuditShield AI utilizes MongoDB Atlas Vector Search to perform semantic retrieval of compliance evidence. This allows the system to understand the *meaning* of a query rather than just matching keywords.

## 📈 Index Strategy
We use the `vectorSearch` index type with the following configuration:
- **Dimensions:** 768 (as specified by `models/text-embedding-004`).
- **Similarity Metric:** `cosine` (ideal for comparing document chunks).
- **Index Definition (JSON):**
```json
{
  "mappings": {
    "dynamic": true,
    "fields": {
      "embedding": {
        "dimensions": 768,
        "similarity": "cosine",
        "type": "knnVector"
      }
    }
  }
}
```

## 🔍 Metadata-Based Filtering
One of the core strengths of using MongoDB is the ability to combine vector search with standard filtering. 
In AuditShield AI, we filter by:
- `filename`: To restrict search to specific documents.
- `upload_date`: To search within specific time windows.
- `page_number`: To pin evidence to specific sections.

This ensures that the "Retrieved Context" is not just semantically similar, but also contextually relevant to the auditor's scope.
