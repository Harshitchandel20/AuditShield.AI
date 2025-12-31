"use client";

import React from 'react';
import { Citation, RiskLevel } from '@/lib/api';
import { User, Bot, AlertTriangle, CheckCircle, Info, FileText } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  riskLevel?: RiskLevel;
  riskScore?: number;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  role, 
  content, 
  citations, 
  riskLevel, 
  riskScore 
}) => {
  const isUser = role === 'user';

  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case 'LOW': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'MEDIUM': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'HIGH': return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getRiskIcon = (level: RiskLevel) => {
    switch (level) {
      case 'LOW': return <CheckCircle className="w-3 h-3" />;
      case 'MEDIUM': return <Info className="w-3 h-3" />;
      case 'HIGH': return <AlertTriangle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-primary" />
        </div>
      )}

      <div className={`flex-1 max-w-[85%] ${isUser ? 'flex justify-end' : ''}`}>
        <div className={`rounded-xl p-4 ${
          isUser 
            ? 'bg-primary/10 border border-primary/30' 
            : 'bg-slate-900/50 border border-slate-800'
        }`}>
          {/* Message Content */}
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
            {content}
          </p>

          {/* Risk Level Badge */}
          {!isUser && riskLevel && (
            <div className={`mt-3 inline-flex items-center gap-2 px-2 py-1 rounded-md border text-xs font-medium ${getRiskColor(riskLevel)}`}>
              {getRiskIcon(riskLevel)}
              <span>Risk: {riskLevel}</span>
              {riskScore !== undefined && (
                <span className="opacity-70">({riskScore.toFixed(0)}%)</span>
              )}
            </div>
          )}

          {/* Citations */}
          {!isUser && citations && citations.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Sources ({citations.length})
              </p>
              {citations.map((citation, idx) => (
                <div 
                  key={idx}
                  className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-primary/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-3 h-3 text-slate-500 group-hover:text-primary transition-colors" />
                    <span className="text-xs text-slate-400 font-medium">
                      {citation.source}
                    </span>
                    <span className="text-[10px] text-slate-600">
                      Page {citation.page}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-1">
                    {citation.text_snippet}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
          <User className="w-4 h-4 text-slate-400" />
        </div>
      )}
    </div>
  );
};
