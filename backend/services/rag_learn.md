# Learn: RAG Core & Grounded Response Generation

## 🛡️ Groundedness: The "Zero Hallucination" Policy
In an audit context, "innovation" or "creativity" from an AI is a bug, not a feature. AuditShield AI implements a **Grounded RAG** strategy.

### 1. Context Injection
We wrap the retrieved document chunks in a strict system prompt that delimits the boundary between "outside knowledge" and "verified context".

### 2. Explicit Refusal
The model is instructed to refuse to answer if the context is insufficient. This converts a potential hallucination into a "high risk" flag for the auditor.

## 📝 Citation Strategy
Our RAG service automatically extracts source metadata from the context chunks:
- **Source Linkage:** Every claim is tied back to a specific file and page number.
- **Traceability:** We return structured `Citation` objects so the frontend can display clickable links to the evidence.

## ⚖️ Automated Risk Scoring (V1)
AuditShield AI performs a preliminary risk assessment on every response:
- **LOW Risk:** High-confidence match with multiple supporting chunks.
- **MEDIUM Risk:** Partial match or ambiguous evidence.
- **HIGH Risk:** No evidence found or contradictory context (triggers explicit warning).

## 🤖 Prompt Engineering for Audits
We use **Chain-of-Thought (CoT)** prompting implicitly by instructing the model to identify specific "Context Chunks" before formulating the final answer. This forces the LLM to "look" at the data before "speaking".
