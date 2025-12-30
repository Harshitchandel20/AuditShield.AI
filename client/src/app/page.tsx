import React from 'react';
import { Shield, FileText, Send, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function WorkspacePage() {
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
        <section className="w-[40%] flex flex-col border-r border-slate-800">
          <header className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]/50">
            <h1 className="text-lg font-semibold flex items-center gap-2">
              Compliance Chat <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">v0.1.0</span>
            </h1>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Sample Message from AI */}
            <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 audit-border-low glass">
              <p className="text-sm leading-relaxed">
                Welcome to **AuditShield AI**. I am ready to analyze your compliance documents. Upload a PDF to begin the automated audit process.
              </p>
            </div>
            
            {/* Sample Status Card */}
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-1" />
              <div>
                <h3 className="text-sm font-medium text-primary">RAG Engine Initialized</h3>
                <p className="text-xs text-slate-400">Vector index synced with MongoDB Atlas.</p>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <footer className="p-4 border-t border-slate-800 bg-[#0f172a]/50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask about compliance evidence..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </footer>
        </section>

        {/* Right Section: Document Viewer (60%) */}
        <section className="w-[60%] flex flex-col bg-slate-950/20 relative">
          <header className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]/50">
            <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Evidence Viewer</h2>
            <div className="flex gap-2">
               <button className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 rounded-md transition-colors border border-slate-700">
                 Clear Viewer
               </button>
            </div>
          </header>
          
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full h-full max-w-4xl border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 animate-pulse">
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
          </div>
        </section>

      </div>
    </main>
  );
}
