"use client";

import React from 'react';
import { Shield, FileText, Send, AlertTriangle, CheckCircle, Info, FileSearch } from 'lucide-react';
import { UploadButton } from '@/components/UploadButton';
import { useAuditStore } from '@/hooks/useAuditStore';

export default function WorkspacePage() {
  const { status, error, currentDoc, uploadFile, clearAudit } = useAuditStore();

  return (
    <main className="flex h-screen w-full bg-[#020617] overflow-hidden">
      {/* Sidebar - Navigation */}
      <div className="w-16 h-full flex flex-col items-center py-6 border-r border-slate-800 bg-[#0f172a]">
        <div className="p-3 bg-primary/10 rounded-xl mb-8">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div className="flex flex-col gap-6">
          <FileText className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
          <Info className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Section: Chat & Controls (40%) */}
        <section className="w-[40%] flex flex-col border-r border-slate-800 bg-[#020617]">
          <header className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]/50">
            <h1 className="text-lg font-semibold flex items-center gap-2">
              Compliance Chat <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">v0.1.0</span>
            </h1>
            <UploadButton onUpload={uploadFile} status={status} />
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Context Awareness Section */}
            {currentDoc ? (
              <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400 font-medium truncate max-w-[150px]">
                    {currentDoc.filename}
                  </span>
                </div>
                <button 
                  onClick={clearAudit}
                  className="text-[10px] text-slate-500 hover:text-slate-300 uppercase tracking-wider font-bold"
                >
                  Clear Session
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 audit-border-low glass">
                <p className="text-sm leading-relaxed text-slate-300">
                  Welcome to **AuditShield AI**. I am ready to analyze your compliance documents. Upload a PDF to begin the automated audit process.
                </p>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/50 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5" />
                <p className="text-xs text-rose-400">{error}</p>
              </div>
            )}
            
            {status === 'success' && !currentDoc && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h3 className="text-sm font-medium text-primary">RAG Engine Initialized</h3>
                  <p className="text-xs text-slate-400">Vector index synced with MongoDB Atlas.</p>
                </div>
              </div>
            )}

            {/* Ingestion results indicator if success */}
            {currentDoc && status === 'success' && (
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <FileSearch className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Ingestion Complete</p>
                  <p className="text-[10px] text-slate-500">
                    {currentDoc.total_pages} pages parsed • {currentDoc.chunks_processed} semantic segments
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <footer className="p-4 border-t border-slate-800 bg-[#0f172a]/50">
            <div className="relative">
              <input 
                type="text" 
                placeholder={currentDoc ? "Ask about compliance evidence..." : "Upload a PDF document to start..."}
                disabled={!currentDoc}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                disabled={!currentDoc}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors disabled:opacity-50 disabled:grayscale"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </section>

        {/* Right Section: Document Viewer (60%) */}
        <section className="w-[60%] flex flex-col bg-slate-950/20 relative">
          <header className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]/50">
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Evidence Viewer</h2>
            <div className="flex gap-2 text-xs text-slate-500">
               {currentDoc && (
                 <span className="bg-slate-800 px-2 py-1 rounded border border-slate-700">
                   Active: {currentDoc.filename}
                 </span>
               )}
            </div>
          </header>
          
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full h-full max-w-4xl border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 animate-pulse bg-slate-900/20">
              <FileText className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-sm">No document selected for viewing</p>
              <p className="text-xs mt-2 text-slate-600 italic">Select a citation in the chat to view the source</p>
            </div>
          </div>

          {/* Floating Risk Legend */}
          <div className="absolute bottom-6 right-6 p-4 rounded-xl glass border-slate-700/50 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-audit-high" /> 
              <span>High Risk / No Evidence</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-audit-medium" /> 
              <span>Medium Risk / Ambiguous</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-audit-low" /> 
              <span>Low Risk / Confirmed</span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
