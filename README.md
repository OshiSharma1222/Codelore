<div align="center">

# Codelore

**AI-Powered Codebase Navigator with Generative UI**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tambo AI](https://img.shields.io/badge/Tambo_AI-0.74-purple?style=for-the-badge)](https://tambo.ai/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

*Talk to your codebase. Watch it visualize itself.*

[Features](#features) • [Demo](#demo) • [Quick Start](#quick-start) • [Architecture](#architecture) • [Tech Stack](#tech-stack)

</div>

---

## What is Codelore?

Codelore is a **conversational developer tool** where AI dynamically reshapes the UI to help you understand large codebases faster. Instead of reading static documentation, you **talk to your codebase** and it shows you relevant visualizations in real-time.

```mermaid
graph LR
    A["You Ask: Show me the auth flow"] --> B["Tambo AI Processes Query"]
    B --> C["Generative UI Renders Components"]
    C --> D1[Flow Diagram]
    C --> D2[Architecture Map]
    C --> D3[File Tree]
    C --> D4[Module Cards]
    
    style A fill:#3b82f6,stroke:#1e40af,color:#fff
    style B fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style C fill:#10b981,stroke:#059669,color:#fff
    style D1 fill:#f59e0b,stroke:#d97706,color:#000
    style D2 fill:#ec4899,stroke:#db2777,color:#fff
    style D3 fill:#14b8a6,stroke:#0d9488,color:#fff
    style D4 fill:#06b6d4,stroke:#0891b2,color:#fff
```

## Features

<table>
<tr>
<td width="50%">

### AI-Powered Analysis
- Real-time GitHub repository parsing
- Automatic module & dependency detection
- Language/framework identification
- Smart code flow analysis

</td>
<td width="50%">

### Dynamic Visualizations
- **Project Graph** - Interactive architecture map
- **Code Flow** - Step-by-step execution paths
- **Module Cards** - Component breakdowns
- **Tree View** - File system explorer

</td>
</tr>
<tr>
<td width="50%">

### Conversational Interface
- Natural language queries
- Context-aware responses
- Multi-workspace tabs
- Per-workspace chat threads

</td>
<td width="50%">

### Developer Experience
- Comic-style brutal UI
- Dark theme optimized for coding
- Zoom & pan on graphs
- Instant GitHub integration

</td>
</tr>
</table>

## Demo

### System Architecture Flow

```mermaid
sequenceDiagram
    participant User
    participant ChatDock
    participant TamboAI
    participant GitHub API
    participant Visualizations
    
    User->>ChatDock: "Analyze github.com/user/repo"
    ChatDock->>GitHub API: Fetch repository data
    GitHub API-->>ChatDock: Files, modules, dependencies
    ChatDock->>TamboAI: Send context + query
    TamboAI->>TamboAI: Generate visualization plan
    TamboAI->>Visualizations: Render ProjectGraph
    Visualizations-->>User: Interactive architecture map
    
    User->>ChatDock: "Show me the auth module"
    ChatDock->>TamboAI: Query with context
    TamboAI->>Visualizations: Render CodeFlowGraph
    Visualizations-->>User: Step-by-step auth flow
    
    Note over User,Visualizations: Fully conversational & context-aware
```

### Component Registry

```mermaid
graph TB
    A[Tambo Registry] --> B[GenerativeTable]
    A --> C[ModuleCards]
    A --> D[TreeView]
    A --> E[FlowDiagram]
    A --> F[CodeFlowGraph]
    A --> G[ProjectGraph]
    A --> H[FileSummary]
    A --> I[GuidanceCard]
    
    G --> G1["Architecture Map - Column-based layout"]
    F --> F1["Execution Flow - Block connections"]
    C --> C1["Module Breakdown - Dependencies shown"]
    D --> D1["File Tree - Hierarchical view"]
    
    style A fill:#6366f1,stroke:#4f46e5,color:#fff,stroke-width:3px
    style G fill:#10b981,stroke:#059669,color:#fff
    style F fill:#f59e0b,stroke:#d97706,color:#fff
    style C fill:#ec4899,stroke:#db2777,color:#fff
    style D fill:#14b8a6,stroke:#0d9488,color:#fff
```

## Quick Start

### Prerequisites

- Node.js 18+ 
- GitHub Personal Access Token ([create one here](https://github.com/settings/tokens))
- Tambo AI API Key ([sign up at tambo.ai](https://tambo.ai))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/codelore.git
cd codelore

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys to .env:
# NEXT_PUBLIC_TAMBO_API_KEY=tambo_xxx
# GITHUB_TOKEN=ghp_xxx

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start exploring!

### Using Codelore

1. **Connect a Repository**
   ```
   Enter any GitHub URL: https://github.com/facebook/react
   ```

2. **Ask Questions**
   - "Show me the project architecture"
   - "What are the main modules?"
   - "Explain the authentication flow"
   - "Generate a dependency graph"

3. **Interact with Visualizations**
   - Zoom & pan on graphs
   - Click nodes for details
   - Open multiple workspace tabs
   - Export diagrams

## Architecture

```mermaid
graph TB
    subgraph Frontend["Frontend Layer"]
        A[Next.js App Router]
        B[React 19]
        C[Tailwind CSS 4]
    end
    
    subgraph State["State Management"]
        D[RepoProvider]
        E[WorkspaceTabsProvider]
        F[TamboThreadProvider]
    end
    
    subgraph AI["AI Layer"]
        G[Tambo AI SDK]
        H[Component Registry]
        I[Generative UI Engine]
    end
    
    subgraph API["API Layer"]
        J[GitHub REST API]
        K[Repository Analyzer]
        L[Module Detector]
    end
    
    subgraph Components["Generative Components"]
        M[ProjectGraph]
        N[CodeFlowGraph]
        O[ModuleCards]
        P[TreeView]
    end
    
    A --> D
    A --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> M
    I --> N
    I --> O
    I --> P
    
    D --> J
    J --> K
    K --> L
    L --> I
    
    style Frontend fill:#1e293b,stroke:#3b82f6,color:#e2e8f0
    style State fill:#1e293b,stroke:#10b981,color:#e2e8f0
    style AI fill:#1e293b,stroke:#8b5cf6,color:#e2e8f0
    style API fill:#1e293b,stroke:#f59e0b,color:#e2e8f0
    style Components fill:#1e293b,stroke:#ec4899,color:#e2e8f0
```

### Project Structure

```
codelore/
├── app/
│   ├── api/
│   │   └── github/           # GitHub API integration
│   │       ├── route.ts      # Repository fetching
│   │       └── analyze/      # Code analysis endpoint
│   ├── interface/            # Main workspace UI
│   └── layout.tsx            # Root layout with providers
├── components/
│   ├── generative/           # AI-rendered components
│   │   ├── ProjectGraph.tsx  # Architecture visualizer
│   │   ├── CodeFlowGraph.tsx # Execution flow
│   │   ├── ModuleCards.tsx   # Module breakdown
│   │   └── TreeView.tsx      # File explorer
│   ├── workspace/            # Workspace interface
│   │   ├── ChatDock.tsx      # Chat sidebar
│   │   ├── InfiniteCanvas.tsx# Visual canvas
│   │   └── TopNavbar.tsx     # Multi-tab navigation
│   ├── providers/            # Context providers
│   │   ├── RepoProvider.tsx
│   │   └── WorkspaceTabsProvider.tsx
│   └── ui/                   # Base UI components
│       └── ComicPanel.tsx
└── lib/
    ├── tambo-registry.ts     # Component registration
    └── utils.ts              # Utilities
```

## Tech Stack

<table>
<tr>
<td width="33%" align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

</td>
<td width="33%" align="center">

### AI & State
![Tambo AI](https://img.shields.io/badge/Tambo_AI-0.74-purple?style=flat-square)
![Zod](https://img.shields.io/badge/Zod-4.3-blue?style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer-12-pink?style=flat-square&logo=framer)

</td>
<td width="33%" align="center">

### Integrations
![GitHub API](https://img.shields.io/badge/GitHub_API-v3-black?style=flat-square&logo=github)
![Lucide Icons](https://img.shields.io/badge/Lucide-Icons-orange?style=flat-square)
![Comic Fonts](https://img.shields.io/badge/Fonts-Comic_Neue-green?style=flat-square)

</td>
</tr>
</table>

## Key Features Deep Dive

### 1. Dynamic Project Graph

The **ProjectGraph** component creates an interactive architecture map:

```typescript
// Auto-detects module types and arranges in columns
Frontend → Routes/API → Controllers → Services → Database
   ↓          ↓            ↓            ↓         ↓
  [Nodes grouped by type rank with smart layout]
```

**Features:**
- Auto-layout by module type
- Bezier curve connections with labels
- Dark theme with neon glow effects
- Zoom & pan controls
- Connection dots at endpoints
- Edge type legend

### 2. Code Flow Graph

Visualizes execution flow through your codebase:

```mermaid
graph LR
    A[Entry Point] --> B[Auth Middleware]
    B --> C[Route Handler]
    C --> D[Service Layer]
    D --> E[Database]
    E --> D
    D --> C
    C --> F[Response]
    
    style A fill:#3b82f6,stroke:#1e40af,color:#fff
    style B fill:#8b5cf6,stroke:#6d28d9,color:#fff
    style C fill:#10b981,stroke:#059669,color:#fff
    style D fill:#f59e0b,stroke:#d97706,color:#fff
    style E fill:#ec4899,stroke:#db2777,color:#fff
    style F fill:#14b8a6,stroke:#0d9488,color:#fff
```

### 3. Multi-Workspace Tabs

Work with multiple repositories simultaneously:

```mermaid
stateDiagram-v2
    [*] --> Tab1: Create Workspace
    Tab1 --> Tab2: + New Tab
    Tab2 --> Tab3: + New Tab
    Tab1 --> ChatThread1: Isolated Context
    Tab2 --> ChatThread2: Isolated Context
    Tab3 --> ChatThread3: Isolated Context
    
    note right of Tab1: Each tab has its own<br/>TamboThreadProvider
    note right of ChatThread1: Context persists<br/>within workspace
```

## UI Design Philosophy

Codelore uses a **comic/brutal design system** inspired by developer tools that prioritize clarity over polish:

- **Dark theme optimized for code**
- **Bold borders & chunky shadows**
- **Neon accent colors for graphs**
- **Comic Neue & Bangers fonts**
- **High-contrast readable text**

## Configuration

### Environment Variables

```bash
# Required
NEXT_PUBLIC_TAMBO_API_KEY=tambo_xxx  # Get from tambo.ai
GITHUB_TOKEN=ghp_xxx                  # Personal access token

# Optional
NEXT_PUBLIC_API_URL=http://localhost:3000  # API endpoint
```

### Tambo Registry

Register custom components in `lib/tambo-registry.ts`:

```typescript
export const registry: TamboRegistry = {
  components: [
    {
      name: "YourComponent",
      component: YourComponent,
      schema: z.object({
        title: z.string(),
        data: z.any(),
      }),
      description: "What your component does",
    },
  ],
};
```

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/codelore)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Contributing

We welcome contributions! Here's how you can help:

```mermaid
graph LR
    A[Fork Repo] --> B[Create Branch]
    B --> C[Make Changes]
    C --> D[Write Tests]
    D --> E[Submit PR]
    E --> F{Review}
    F -->|Approved| G[Merge]
    F -->|Changes Needed| C
    
    style A fill:#3b82f6,stroke:#1e40af,color:#fff
    style G fill:#10b981,stroke:#059669,color:#fff
```

### Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/codelore.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

4. **Push & PR**
   ```bash
   git push origin feature/amazing-feature
   ```

## License

MIT License - see [LICENSE](LICENSE) for details

## Acknowledgments

- [Tambo AI](https://tambo.ai) - Generative UI framework
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Lucide Icons](https://lucide.dev) - Icon library

---

<div align="center">

**Built with AI by developers, for developers**

[Star on GitHub](https://github.com/yourusername/codelore) • [Report Bug](https://github.com/yourusername/codelore/issues) • [Request Feature](https://github.com/yourusername/codelore/issues)

</div>
