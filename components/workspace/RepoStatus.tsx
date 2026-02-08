"use client";

import { useRepo } from "@/components/providers/RepoProvider";
import { useGitHubIntegration } from "@/lib/useGitHub";
import { GitBranch, Github, RefreshCw, Star, Users } from "lucide-react";

export function RepoStatus() {
  const { repoData } = useRepo();
  const { refreshRepository, isAnalyzing } = useGitHubIntegration();

  if (!repoData) return null;

  const { repo, stats } = repoData;

  return (
    <div className="p-3 bg-white border-2 border-brutal-black brutal-shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Github size={16} className="text-black" />
            <span className="font-bold text-sm">
              {repo.owner}/{repo.name}
            </span>
          </div>
          
          <div className="flex items-center gap-3 text-xs text-zinc-600">
            <div className="flex items-center gap-1">
              <Star size={12} />
              <span>{repo.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitBranch size={12} />
              <span>{repo.branch}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{stats.totalFiles} files</span>
            </div>
          </div>
        </div>

        <button
          onClick={refreshRepository}
          disabled={isAnalyzing}
          className="p-1 hover:bg-zinc-100 rounded transition-colors disabled:opacity-50"
          title="Refresh repository analysis"
        >
          <RefreshCw 
            size={14} 
            className={`${isAnalyzing ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>

      {repo.description && (
        <p className="text-xs text-zinc-600 mt-2 line-clamp-1">
          {repo.description}
        </p>
      )}

      {stats.languages.length > 0 && (
        <div className="flex gap-1 mt-2">
          {stats.languages.slice(0, 3).map((lang) => (
            <span
              key={lang}
              className="px-2 py-0.5 bg-zinc-100 border border-zinc-300 rounded text-xs font-mono"
            >
              {lang}
            </span>
          ))}
          {stats.languages.length > 3 && (
            <span className="text-xs text-zinc-400 self-center">
              +{stats.languages.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}