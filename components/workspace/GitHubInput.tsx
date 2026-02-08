"use client";

import { useGitHubIntegration } from "@/lib/useGitHub";
import { AlertCircle, ArrowRight, Github, Loader2 } from "lucide-react";
import React, { useState } from "react";

export function GitHubInput() {
  const [url, setUrl] = useState("");
  const { analyzeRepository, isAnalyzing, error } = useGitHubIntegration();

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isAnalyzing) return;

    console.log("Attempting to analyze repository:", url);
    const result = await analyzeRepository(url);
    
    if (result.success) {
      console.log("Repository analysis successful:", result.data);
      setUrl("");
    } else {
      console.error("Repository analysis failed:", result.error);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleConnect} className="relative group px-1">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-brutal-blue transition-colors z-10">
          <Github size={20} />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/owner/repository"
          className="w-full pl-12 pr-40 py-4 bg-white border-4 border-brutal-black font-bold brutal-shadow-sm focus:brutal-shadow transition-all outline-none"
          disabled={isAnalyzing}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
           <button
             type="submit"
             disabled={isAnalyzing || !url.trim()}
             className="px-6 py-2 bg-brutal-blue text-white font-black uppercase text-xs tracking-widest hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border-2 border-black"
           >
             {isAnalyzing ? (
               <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Analyzing...</span>
               </>
             ) : (
               <>
                 <span>Analyze</span>
                 <ArrowRight size={16} />
               </>
             )}
           </button>
        </div>
      </form>

      {error && (
        <div className="mx-1 flex items-center gap-2 p-3 bg-red-50 border-2 border-brutal-red text-brutal-red text-xs font-bold uppercase">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
}
