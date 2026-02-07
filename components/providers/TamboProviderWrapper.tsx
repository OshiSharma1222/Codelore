"use client";

import { TamboProvider } from "@tambo-ai/react";
import { componentRegistry } from "@/lib/tambo-registry";

export function TamboProviderWrapper({ children }: { children: React.ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY || "";
  
  if (typeof window !== "undefined") {
     console.log("Tambo Provider Initialized. API Key present:", !!apiKey);
     if (apiKey) console.log("API Key preview:", apiKey.substring(0, 5) + "...");
  }

  return (
    <TamboProvider
      apiKey={apiKey}
      components={componentRegistry}
    >
      {children}
    </TamboProvider>
  );
}
