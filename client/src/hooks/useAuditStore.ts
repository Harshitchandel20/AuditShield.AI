"use client";

import { useState, useCallback } from 'react';
import { auditApi, IngestionResponse, SearchResponse } from '@/lib/api';

export type IngestionStatus = 'idle' | 'uploading' | 'success' | 'error';
export type SearchStatus = 'idle' | 'searching' | 'success' | 'error';

export function useAuditStore() {
    const [status, setStatus] = useState<IngestionStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [currentDoc, setCurrentDoc] = useState<IngestionResponse['data'] | null>(null);
    const [searchContext, setSearchContext] = useState<SearchResponse | null>(null);
    const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle');
    const [searchError, setSearchError] = useState<string | null>(null);

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

    const clearAudit = useCallback(() => {
        setStatus('idle');
        setError(null);
        setCurrentDoc(null);
        setSearchContext(null);
        setSearchStatus('idle');
        setSearchError(null);
    }, []);

    return {
        status,
        error,
        currentDoc,
        searchContext,
        searchStatus,
        searchError,
        uploadFile,
        performSearch,
        clearAudit,
        setSearchContext,
    };
}
