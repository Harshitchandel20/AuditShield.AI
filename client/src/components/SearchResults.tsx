"use client";

import React from 'react';
import { SearchResponse } from '@/lib/api';
import { FileText, TrendingUp } from 'lucide-react';

interface SearchResultsProps {
  searchData: SearchResponse | null;
  onResultClick?: (result: any) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ searchData, onResultClick }) => {
  if (!searchData || searchData.results.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Search Results ({searchData.results.length})
        </h3>
        <span className="text-[10px] text-slate-600">
          {searchData.processing_time_ms.toFixed(0)}ms
        </span>
      </div>

      <div className="space-y-2">
        {searchData.results.map((result, idx) => {
          const scorePercent = (result.score * 100).toFixed(1);
          const scoreColor = 
            result.score > 0.8 ? 'bg-emerald-500' :
            result.score > 0.6 ? 'bg-amber-500' :
            'bg-slate-500';

          return (
            <div
              key={idx}
              onClick={() => onResultClick?.(result)}
              className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-primary/50 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-3 h-3 text-slate-500" />
                  <span className="text-xs text-slate-400 truncate max-w-[150px]">
                    {result.metadata.filename}
                  </span>
                  <span className="text-[10px] text-slate-600">
                    p.{result.metadata.page_number}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-slate-500" />
                  <span className="text-xs font-mono text-slate-400">{scorePercent}%</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-2">
                {result.content}
              </p>

              {/* Similarity Score Bar */}
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${scoreColor} transition-all duration-300`}
                  style={{ width: `${scorePercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
