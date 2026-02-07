"use client";

import React from "react";
import { ComicPanel } from "@/components/ui/ComicPanel";

interface GuidanceCardProps {
  message?: string;
  suggestions?: string[];
}

export function GuidanceCard({ message = "How can I help you?", suggestions = [] }: GuidanceCardProps) {
  return (
    <ComicPanel title="💡 GUIDE" color="#FFD600">
      <div className="space-y-4">
        <p className="text-base font-semibold leading-relaxed">{message}</p>
        {suggestions.length > 0 && (
          <div>
            <span className="text-xs font-bold uppercase text-zinc-500">Try saying:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestions.map((s) => (
                <span
                  key={s}
                  className="inline-block comic-border rounded-full bg-white px-3 py-1 text-sm font-semibold cursor-default hover:bg-yellow-50 transition-colors"
                >
                  &ldquo;{s}&rdquo;
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </ComicPanel>
  );
}
