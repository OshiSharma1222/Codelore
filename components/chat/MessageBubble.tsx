"use client";

import React from "react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string | any[];
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} comic-enter`}>
      <div className={`max-w-[80%] ${isUser ? "speech-bubble" : "speech-bubble speech-bubble-ai"}`}>
        <span className="text-xs font-bold uppercase text-zinc-500 block mb-1">
          {isUser ? "You" : "AI Navigator"}
        </span>
        <div className="text-sm leading-relaxed">
          {Array.isArray(content) ? (
            content.map((part, i) =>
              part.type === "text" ? <p key={i}>{part.text}</p> : null
            )
          ) : (
            <p>{String(content)}</p>
          )}
        </div>
      </div>
    </div>
  );
}
