"use client";

import { useRepo } from "@/components/providers/RepoProvider";
import { ComicPanel } from "@/components/ui/ComicPanel";
import { modules } from "@/lib/mock-data";

interface Module {
  name: string;
  description: string;
  files: string[];
  dependencies?: string[];
  color?: string;
}

interface ModuleCardsProps {
  filter?: string;
  title?: string;
  modules?: Module[];
}

const filterMap: Record<string, string[]> = {
  all: [], // If all, we show everything. Logic below handles this.
  backend: ["Backend API", "Services", "Database"],
  frontend: ["Frontend"],
  auth: ["Authentication"],
  database: ["Database"],
  services: ["Services"],
};

export function ModuleCards({ filter = "all", title = "PROJECT OVERVIEW", modules: aiModules }: ModuleCardsProps) {
  const { repoData } = useRepo();
  
  // Priority: AI provided modules -> Real repository modules -> Mock data fallback
  const data = aiModules || repoData?.modules || modules;

  const normalizedFilter = filter.toLowerCase();

  // Filter modules based on type for real data, or name for mock data
  const visible = data.filter((m: any) => {
    if (normalizedFilter === "all") return true;
    
    // For real repository data with types
    if ('type' in m) {
      switch (normalizedFilter) {
        case 'frontend': return m.type === 'frontend';
        case 'backend': return m.type === 'backend';
        case 'database': return m.type === 'database';
        case 'config': return m.type === 'config';
        case 'tests': return m.type === 'tests';
        default: return true;
      }
    }
    
    // Fallback for mock data
    const activeFilter = filterMap[normalizedFilter] ? normalizedFilter : "all";
    if (activeFilter === "all") return true;
    return filterMap[activeFilter]?.includes(m.name);
  });

  return (
    <ComicPanel title={title} color="#FFD600">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((mod) => (
          <div
            key={mod.name}
            className="comic-border rounded-lg p-4 bg-white hover:scale-[1.02] transition-transform cursor-default"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-4 h-4 rounded-full border-2 border-black"
                style={{ backgroundColor: mod.color }}
              />
              <h3 className="font-[var(--font-bangers)] text-lg tracking-wide">{mod.name}</h3>
            </div>
            <p className="text-sm text-zinc-700 mb-3 leading-relaxed">{mod.description}</p>
            <div className="mb-2">
              <span className="text-xs font-bold uppercase text-zinc-500">Key Files:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {mod.files.slice(0, 4).map((f) => (
                  <span
                    key={f}
                    className="inline-block rounded bg-zinc-100 border border-zinc-300 px-2 py-0.5 text-xs font-mono"
                  >
                    {f}
                  </span>
                ))}
                {mod.files.length > 4 && (
                  <span className="text-xs text-zinc-400">+{mod.files.length - 4} more</span>
                )}
              </div>
            </div>
            {mod.dependencies && mod.dependencies.length > 0 && (
              <div>
                <span className="text-xs font-bold uppercase text-zinc-500">Depends on:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mod.dependencies.map((d) => (
                    <span
                      key={d}
                      className="inline-block rounded-full bg-yellow-100 border border-yellow-400 px-2 py-0.5 text-xs font-semibold"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </ComicPanel>
  );
}
