"use client";

import React from "react";

interface ComicPanelProps {
  title?: string;
  color?: string;
  children: React.ReactNode;
  className?: string;
}

export function ComicPanel({ title, color = "#FFD600", children, className = "" }: ComicPanelProps) {
  return (
    <div className={`comic-enter relative overflow-hidden rounded-lg comic-border-thick bg-white ${className}`}>
      <div className="halftone" />
      {title && (
        <div
          className="relative z-10 px-4 py-2 font-[var(--font-bangers)] text-xl tracking-wider text-black border-b-4 border-black"
          style={{ backgroundColor: color }}
        >
          {title}
        </div>
      )}
      <div className="relative z-10 p-4">
        {children}
      </div>
    </div>
  );
}
