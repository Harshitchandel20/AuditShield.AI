"use client";

import { useState, useCallback } from 'react';
import { auditApi, IngestionResponse, SearchResponse, RAGResponse } from '@/lib/api';

export type IngestionStatus = 'idle' | 'uploading' | 'success' | 'error';
export type SearchStatus = 'idle' | 'searching' | 'success' | 'error';
export type ChatStatus = 'idle' | 'asking' | 'success' | 'error';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    ragResponse?: RAGResponse;
}

export function useAuditStore() {
    const [status, setStatus] = useState<IngestionStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [currentDoc, setCurrentDoc] = useState<IngestionResponse['data'] | null>(null);
    const [searchContext, setSearchContext] = useState<SearchResponse | null>(null);
    const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle');
    const [searchError, setSearchError] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [chatStatus, setChatStatus] = useState<ChatStatus>('idle');
    const [chatError, setChatError] = useState<string | null>(null);

    const uploadFile = useCallback(async (file: File) => {
        setStatus('uploading');
        setError(null);
        try {
            const result = await auditApi.uploadDocument(file);
            setCurrentDoc(result.data);
            setStatus('success');
        } catch (err: any) {
            setError(err.message || 'Failed to upload document');
            setStatus('error');
        }
    }, []);

    const performSearch = useCallback(async (query: string) => {
        if (!query.trim()) return;

        setSearchStatus('searching');
        setSearchError(null);
        try {
            const results = await auditApi.search(query, 5);
            setSearchContext(results);
            setSearchStatus('success');
        } catch (err: any) {
            setSearchError(err.message || 'Search failed');
            setSearchStatus('error');
        }
    }, []);

    const askQuestion = useCallback(async (query: string) => {
        if (!query.trim()) return;

        const userMessage: ChatMessage = { role: 'user', content: query };
        setChatHistory(prev => [...prev, userMessage]);

        setChatStatus('asking');
        setChatError(null);
        try {
            const response = await auditApi.askQuestion(query, 5);
            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: response.answer,
                ragResponse: response
            };
            setChatHistory(prev => [...prev, assistantMessage]);
            setChatStatus('success');
        } catch (err: any) {
            setChatError(err.message || 'Question failed');
            setChatStatus('error');
        }
    }, []);

    const clearAudit = useCallback(() => {
        setStatus('idle');
        setError(null);
        setCurrentDoc(null);
        setSearchContext(null);
        setSearchStatus('idle');
        setSearchError(null);
        setChatHistory([]);
        setChatStatus('idle');
        setChatError(null);
    }, []);

    return {
        status,
        error,
        currentDoc,
        searchContext,
        searchStatus,
        searchError,
        chatHistory,
        chatStatus,
        chatError,
        uploadFile,
        performSearch,
        askQuestion,
        clearAudit,
        setSearchContext,
    };
}
