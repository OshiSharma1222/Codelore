"use client";

import React from "react";
import { authFlowSteps, authFlowConnections } from "@/lib/mock-data";
import { ComicPanel } from "@/components/ui/ComicPanel";

interface FlowDiagramProps {
  title?: string;
}

const stepColors = [
  "#7b1fa2", // purple - frontend
  "#1565c0", // blue - api
  "#1565c0", // blue
  "#43a047", // green - db
  "#e53935", // red - auth
  "#e53935", // red
  "#7b1fa2", // purple - frontend
];

export function FlowDiagram({ title = "AUTH FLOW" }: FlowDiagramProps) {
  return (
    <ComicPanel title={title} color="#e53935">
      <div className="flex flex-col items-center gap-0 py-4">
        {authFlowSteps.map((step, i) => {
          const connection = authFlowConnections.find((c) => c.from === step.id);
          return (
            <React.Fragment key={step.id}>
              {/* Step Node */}
              <div className="comic-enter flex items-center gap-4 w-full max-w-md">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full border-3 border-black flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: stepColors[i], borderWidth: 3 }}
                >
                  {step.id}
                </div>
                <div className="flow-node flex-1">
                  <div className="font-[var(--font-bangers)] text-base tracking-wide">{step.label}</div>
                  <div className="text-xs text-zinc-500 font-mono">{step.file}</div>
                  <div className="text-xs text-zinc-600 mt-1">{step.description}</div>
                </div>
              </div>
              {/* Arrow connector */}
              {connection && (
                <div className="flex flex-col items-center my-1">
                  <div className="w-0.5 h-6 bg-black" />
                  <div className="text-xs font-bold text-zinc-500 -my-1">
                    {connection.label} ▼
                  </div>
                  <div className="w-0.5 h-4 bg-black" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </ComicPanel>
  );
}
