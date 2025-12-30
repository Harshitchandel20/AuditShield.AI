"use client";

import React, { useRef } from 'react';
import { Upload, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { IngestionStatus } from '@/hooks/useAuditStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploadButtonProps {
  onUpload: (file: File) => void;
  status: IngestionStatus;
  className?: string;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onUpload, status, className }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      onUpload(file);
    } else if (file) {
      alert('Only PDF files are supported');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("relative", className)}>
      <input 
        type="file" 
        accept=".pdf" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileChange}
        disabled={status === 'uploading'}
      />
      <button
        onClick={handleClick}
        disabled={status === 'uploading'}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border",
          status === 'idle' && "bg-slate-900 border-slate-700 text-slate-300 hover:border-primary/50 hover:text-white hover:bg-slate-800",
          status === 'uploading' && "bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed",
          status === 'success' && "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20",
          status === 'error' && "bg-rose-500/10 border-rose-500/50 text-rose-400 hover:bg-rose-500/20"
        )}
      >
        {status === 'idle' && (
          <>
            <Upload className="w-4 h-4" />
            <span>Ingest Document</span>
          </>
        )}
        {status === 'uploading' && (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing PDF...</span>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>Ingestion Success</span>
          </>
        )}
        {status === 'error' && (
          <>
            <AlertCircle className="w-4 h-4" />
            <span>Upload Failed</span>
          </>
        )}
      </button>
    </div>
  );
};
