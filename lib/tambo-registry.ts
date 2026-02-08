import { type TamboComponent } from "@tambo-ai/react";
import { TreeView } from "@/components/generative/TreeView";
import { ModuleCards } from "@/components/generative/ModuleCards";
import { FlowDiagram } from "@/components/generative/FlowDiagram";
import { FileSummary } from "@/components/generative/FileSummary";
import { GuidanceCard } from "@/components/generative/GuidanceCard";
import { CodeFlowGraph } from "@/components/generative/CodeFlowGraph";
import { z } from "zod";

export const componentRegistry: TamboComponent[] = [
  {
    name: "ModuleCards",
    description:
      "Shows a high-level architecture overview of the codebase as module cards. Use when the user asks to explain the project, wants a high-level overview, architecture, or what the codebase does. This component AUTO-READS real repository data — just render it with a title and filter, do NOT pass custom modules unless specifically needed.",
    component: ModuleCards,
    propsSchema: z.object({
      filter: z
        .string()
        .optional()
        .default("all")
        .describe("Which modules to show. Use 'all' by default. Options: 'all', 'frontend', 'backend', 'database', 'config', 'tests'. Real repositories auto-detect these types."),
      title: z
        .string()
        .optional()
        .default("PROJECT OVERVIEW")
        .describe("A short comic-style title for the section, e.g. 'PROJECT OVERVIEW!' or 'BACKEND MODULES!'"),
      modules: z
        .array(
          z.object({
            name: z.string().describe("Name of the module, e.g. 'Next.js Frontend', 'Node.js Backend'"),
            description: z.string().describe("Brief description of what this module does"),
            files: z.array(z.string()).describe("List of key files in this module"),
            dependencies: z.array(z.string()).optional().describe("List of other modules this module depends on"),
            color: z.string().optional().describe("Hex color code for the module tag"),
            type: z.enum(['frontend', 'backend', 'database', 'config', 'tests', 'docs']).optional().describe("Module type for filtering"),
          })
        )
        .optional()
        .describe("Optional custom modules. If omitted, will use real repository analysis or fall back to mock data."),
    }),
  },
  {
    name: "TreeView",
    description:
      "Shows the folder/file structure of the codebase as a collapsible tree. This component AUTO-READS real repository data from the connected GitHub repo. Just render it — do NOT pass file data as props. Use when user asks to 'show folder structure', 'show files', 'what files are there', or 'project structure'.",
    component: TreeView,
    propsSchema: z.object({
      filter: z
        .string()
        .optional()
        .default("all")
        .describe("Which part of the tree to show. 'all' shows everything. For advanced filtering, use specific types."),
      highlightImportant: z
        .boolean()
        .optional()
        .default(true)
        .describe("If true, highlight important files with a star icon."),
      title: z
        .string()
        .optional()
        .default("FOLDER STRUCTURE")
        .describe("A short comic-style title, e.g. 'FOLDER STRUCTURE!' or 'REPOSITORY FILES!'"),
    }),
  },
  {
    name: "FlowDiagram",
    description:
      "Shows a simple linear flow diagram of the authentication flow. Use ONLY when user asks about 'auth flow', 'how does authentication work', 'login flow', 'how does login work'. Shows steps from Login Form → API → DB → JWT → Dashboard.",
    component: FlowDiagram,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .default("AUTH FLOW")
        .describe("A comic-style title, e.g. 'AUTH FLOW!' or 'LOGIN SEQUENCE!'"),
    }),
  },
  {
    name: "CodeFlowGraph",
    description:
      "Shows a detailed code-level flow diagram with actual code snippets, highlighted function calls, and arrows connecting code blocks across columns. Use when user asks for 'code flow', 'how does X work step by step', 'show me the initialization flow', 'trace the code path', 'entry point flow', 'startup sequence', 'request lifecycle', or any request for a visual code walkthrough with actual code. This is more detailed than FlowDiagram — it shows real code, not just labels. Generate columns for logical stages (e.g. 'Entry Point', 'Initialization', 'Service Layer') and populate each with code blocks containing realistic code snippets from the connected repository.",
    component: CodeFlowGraph,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .default("CODE FLOW")
        .describe("A comic-style title, e.g. 'STARTUP FLOW!', 'REQUEST LIFECYCLE!', 'ENTRY POINT TRACE!'"),
      columns: z
        .array(
          z.object({
            title: z.string().describe("Column stage name, e.g. 'Entry Point', 'Initialization', 'Service Layer'"),
            color: z.string().describe("Background color hex for the column header, e.g. '#FFD600' (yellow), '#bbdefb' (light blue), '#c8e6c9' (light green)"),
            blocks: z.array(
              z.object({
                id: z.string().describe("Unique ID for the block, e.g. 'main', 'startup', 'createServices'"),
                label: z.string().describe("Label shown above code, e.g. 'private async startup()', 'main(): void'"),
                code: z.string().describe("The actual code snippet to display. Use realistic code with function calls, try/catch, await, etc. Keep to 4-10 lines. Use \\n for newlines."),
                highlights: z.array(z.string()).optional().describe("Function names or keywords to highlight in the code with a blue background, e.g. ['startup', 'createServices']"),
                description: z.string().optional().describe("Optional short explanation shown below the code block"),
              })
            ).describe("Code blocks within this column. Each block shows a code snippet with optional highlights."),
          })
        )
        .describe("Columns representing stages in the code flow. Arrange left-to-right for the logical progression."),
      connections: z
        .array(
          z.object({
            from: z.string().describe("ID of the source code block"),
            to: z.string().describe("ID of the target code block"),
            label: z.string().optional().describe("Arrow label, e.g. 'calls', 'returns', 'awaits'"),
          })
        )
        .optional()
        .describe("Arrows connecting code blocks to show the flow between them."),
    }),
  },
  {
    name: "FileSummary",
    description:
      "Explains a specific file in the codebase — its purpose, role, and importance. Use when the user asks about a specific file.",
    component: FileSummary,
    propsSchema: z.object({
      filename: z
        .string()
        .optional()
        .describe(
          "The filename to explain, e.g. 'login.ts', 'authMiddleware.ts', 'routes.ts'."
        ),
      title: z
        .string()
        .optional()
        .default("FILE BREAKDOWN!")
        .describe(
          "A comic-style title, e.g. 'FILE BREAKDOWN!' or 'INSIDE login.ts!'"
        ),
    }),
  },
  {
    name: "GuidanceCard",
    description:
      "Shows a helpful guidance or suggestion message. Use when the user greets the system, asks an unclear question, or when no other component applies.",
    component: GuidanceCard,
    propsSchema: z.object({
      message: z
        .string()
        .optional()
        .default("Try asking about the project architecture, folder structure, or auth flow.")
        .describe("The guidance message to display."),
      suggestions: z
        .array(z.string())
        .optional()
        .default([
          "Explain this project",
          "Show folder structure",
          "Show auth flow",
        ])
        .describe("Suggested follow-up queries."),
    }),
  },
];
