# Learn: UX for AI - Context & Confidence

## 🎯 The Challenge of AI Transparency
When users interact with AI systems, especially in high-stakes domains like compliance auditing, they need to understand:
1. **Where** the information came from
2. **How confident** the system is in its answer
3. **What evidence** supports the conclusion

## 💡 Our UX Principles

### 1. Similarity Scores as Visual Feedback
We display similarity scores (0-100%) with color-coded progress bars:
- **Green (>80%):** High confidence match
- **Amber (60-80%):** Moderate relevance
- **Gray (<60%):** Weak match

This gives auditors an immediate visual sense of retrieval quality.

### 2. Clickable Citations
Every search result is clickable, allowing users to:
- View the full context of the chunk
- See the source filename and page number
- Verify the AI's interpretation against the raw evidence

### 3. Processing Time Transparency
We show the search processing time (in milliseconds) to build trust in the system's performance and help users understand when to expect results.

### 4. Context-Aware UI States
The interface adapts based on the workflow:
- **No document uploaded:** Prompts user to upload
- **Document ingested:** Enables search
- **Search active:** Shows loading state
- **Results available:** Displays ranked chunks

## 🔮 Future Enhancements
- **Confidence thresholds:** Filter results below a certain similarity score
- **Multi-document search:** Query across multiple uploaded PDFs
- **Highlighted text:** Visual highlighting of matching keywords within chunks
