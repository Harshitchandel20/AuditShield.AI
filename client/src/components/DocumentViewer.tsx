"use client";

import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

interface DocumentViewerProps {
  selectedChunk?: {
    content: string;
    metadata: {
      filename: string;
      page_number: number;
    };
  } | null;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ selectedChunk }) => {
  if (!selectedChunk) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center text-slate-500">
          <FileText className="w-16 h-16 mb-4 opacity-20 mx-auto" />
          <p className="text-sm">No document selected for viewing</p>
          <p className="text-xs mt-2 text-slate-600 italic">
            Select a citation in the search results to view the source
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-slate-300">
            {selectedChunk.metadata.filename}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            Page {selectedChunk.metadata.page_number}
          </span>
          <ExternalLink className="w-3 h-3 text-slate-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-800">
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
            {selectedChunk.content}
          </p>
        </div>

        {/* Highlight Indicator */}
        <div className="mt-4 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
          <p className="text-xs text-amber-400/80">
            <span className="font-semibold">Citation Context:</span> This excerpt was retrieved based on semantic similarity to your query.
          </p>
        </div>
      </div>
    </div>
  );
};
