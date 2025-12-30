"use client";

import { useState, useCallback } from 'react';
import { auditApi, IngestionResponse, SearchResponse } from '@/lib/api';

export type IngestionStatus = 'idle' | 'uploading' | 'success' | 'error';

export function useAuditStore() {
    const [status, setStatus] = useState<IngestionStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [currentDoc, setCurrentDoc] = useState<IngestionResponse['data'] | null>(null);
    const [searchContext, setSearchContext] = useState<SearchResponse | null>(null);

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

    const clearAudit = useCallback(() => {
        setStatus('idle');
        setError(null);
        setCurrentDoc(null);
        setSearchContext(null);
    }, []);

    return {
        status,
        error,
        currentDoc,
        searchContext,
        uploadFile,
        clearAudit,
        setSearchContext,
    };
}
