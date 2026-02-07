# AI Codebase Navigator Documentation

## Overview
AI Codebase Navigator is a conversational developer tool where AI dynamically reshapes the UI to help developers understand large codebases faster. Instead of checking static files, you talk to the codebase, and it shows you relevant visualizations.

## Tech Stack
- **Framework**: [Next.js 15](https://nextjs.org/) (App Directory)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration**: [Tambo AI](https://tambo.ai/) (`@tambo-ai/react`)
- **Fonts**: Comic Neue & Bangers (Google Fonts)
- **Deployment**: Vercel

## Project Structure
```
/app          -> Next.js app router pages
/components
  /generative -> Components that the AI can render (ModuleCards, TreeView, etc.)
  /ui         -> Basic UI building blocks (ComicPanel, etc.)
  /providers  -> React Context providers
/lib
  /tambo-registry.ts -> Registers components available to Tambo AI
  /mock-data.ts      -> Static data simulating a real codebase
```

## How It Works
1.  **User Input**: The user types a query (e.g., "Show me the auth flow").
2.  **Tambo AI Processing**: The input is sent to Tambo AI via the `useTamboThread` hook.
3.  **Generative UI**: Tambo AI decides which component to render based on the user's intent.
    -   If the user asks for structure -> `TreeView`
    -   If the user asks for processes -> `FlowDiagram`
    -   If the user asks for explanations -> `FileSummary`
4.  **Rendering**: The selected component is dynamically rendered in the chat stream.

## Setup & Configuration
### Prerequisites
-   Node.js 18+
-   A Tambo AI API Key

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/VanshNagpal10/Codelore.git
    cd Codelore
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up Environment Variables:
    -   Create a `.env.local` file in the root.
    -   Add your Tambo API Key:
        ```
        NEXT_PUBLIC_TAMBO_API_KEY=your_key_here
        ```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## Troubleshooting
-   **AI not responding?** Check your `NEXT_PUBLIC_TAMBO_API_KEY`.
-   **Components not showing?** Ensure the `componentRegistry` in `lib/tambo-registry.ts` matches the component names the AI is trying to use.
