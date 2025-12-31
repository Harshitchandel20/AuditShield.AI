export interface IngestionResponse {
    status: string;
    data: {
        filename: string;
        total_pages: number;
        chunks_processed: number;
    };
}

export interface SearchResult {
    content: string;
    score: number;
    metadata: {
        filename: string;
        page_number: number;
        upload_date: string;
    };
}

export interface SearchResponse {
    query: string;
    results: SearchResult[];
    processing_time_ms: number;
}

export interface Citation {
    source: string;
    page: number;
    text_snippet: string;
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface RAGResponse {
    query: string;
    answer: string;
    citations: Citation[];
    risk_score: number;
    risk_level: RiskLevel;
    processing_time_ms: number;
}

const API_BASE = '/api/v1';

export const auditApi = {
    async uploadDocument(file: File): Promise<IngestionResponse> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE}/ingest`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Upload failed');
        }

        return response.json();
    },

    async search(query: string, topK: number = 5): Promise<SearchResponse> {
        const response = await fetch(`${API_BASE}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, top_k: topK }),
        });

        if (!response.ok) {
            throw new Error('Search failed');
        }

        return response.json();
    },

    async askQuestion(query: string, topK: number = 5): Promise<RAGResponse> {
        const response = await fetch(`${API_BASE}/chat/ask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, top_k: topK }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Question failed');
        }

        return response.json();
    },
};
