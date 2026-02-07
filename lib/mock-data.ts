export interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  description?: string;
  importance?: "high" | "medium" | "low";
  module?: string;
}

export interface ModuleInfo {
  name: string;
  description: string;
  files: string[];
  dependencies: string[];
  color: string;
}

export interface FlowStep {
  id: string;
  label: string;
  file: string;
  description: string;
}

export interface FlowConnection {
  from: string;
  to: string;
  label?: string;
}

export const repoTree: FileNode = {
  name: "acme-saas",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "auth",
          type: "folder",
          module: "auth",
          children: [
            { name: "login.ts", type: "file", description: "Handles user login with email/password and OAuth", importance: "high", module: "auth" },
            { name: "register.ts", type: "file", description: "User registration and validation", importance: "high", module: "auth" },
            { name: "authMiddleware.ts", type: "file", description: "JWT verification middleware for protected routes", importance: "high", module: "auth" },
            { name: "tokenService.ts", type: "file", description: "JWT token generation and refresh logic", importance: "medium", module: "auth" },
            { name: "passwordReset.ts", type: "file", description: "Forgot password and reset flow", importance: "medium", module: "auth" },
          ],
        },
        {
          name: "api",
          type: "folder",
          module: "backend",
          children: [
            { name: "routes.ts", type: "file", description: "Central route definitions", importance: "high", module: "backend" },
            { name: "userController.ts", type: "file", description: "CRUD operations for users", importance: "high", module: "backend" },
            { name: "projectController.ts", type: "file", description: "Project management endpoints", importance: "medium", module: "backend" },
            { name: "billingController.ts", type: "file", description: "Stripe billing integration", importance: "medium", module: "backend" },
          ],
        },
        {
          name: "services",
          type: "folder",
          module: "backend",
          children: [
            { name: "emailService.ts", type: "file", description: "Transactional email sending via SendGrid", importance: "medium", module: "backend" },
            { name: "paymentService.ts", type: "file", description: "Payment processing and subscription management", importance: "high", module: "backend" },
            { name: "notificationService.ts", type: "file", description: "In-app notification system", importance: "low", module: "backend" },
          ],
        },
        {
          name: "db",
          type: "folder",
          module: "database",
          children: [
            { name: "prismaClient.ts", type: "file", description: "Prisma ORM client initialization", importance: "high", module: "database" },
            { name: "migrations/", type: "folder", description: "Database migration files", importance: "medium", module: "database" },
            { name: "seed.ts", type: "file", description: "Database seeding script", importance: "low", module: "database" },
          ],
        },
        {
          name: "frontend",
          type: "folder",
          module: "frontend",
          children: [
            {
              name: "components",
              type: "folder",
              module: "frontend",
              children: [
                { name: "Dashboard.tsx", type: "file", description: "Main dashboard layout", importance: "high", module: "frontend" },
                { name: "LoginForm.tsx", type: "file", description: "Login UI component", importance: "high", module: "frontend" },
                { name: "Sidebar.tsx", type: "file", description: "Navigation sidebar", importance: "medium", module: "frontend" },
                { name: "ProjectList.tsx", type: "file", description: "List of user projects", importance: "medium", module: "frontend" },
              ],
            },
            {
              name: "pages",
              type: "folder",
              module: "frontend",
              children: [
                { name: "index.tsx", type: "file", description: "Landing page", importance: "medium", module: "frontend" },
                { name: "login.tsx", type: "file", description: "Login page", importance: "high", module: "frontend" },
                { name: "dashboard.tsx", type: "file", description: "Dashboard page", importance: "high", module: "frontend" },
                { name: "settings.tsx", type: "file", description: "User settings page", importance: "low", module: "frontend" },
              ],
            },
          ],
        },
      ],
    },
    { name: "package.json", type: "file", description: "Project dependencies and scripts", importance: "medium" },
    { name: "tsconfig.json", type: "file", description: "TypeScript configuration", importance: "low" },
    { name: ".env.example", type: "file", description: "Environment variable template", importance: "medium" },
    { name: "README.md", type: "file", description: "Project documentation", importance: "high" },
  ],
};

export const modules: ModuleInfo[] = [
  {
    name: "Authentication",
    description: "User login, registration, JWT tokens, password reset. Protects all private routes via middleware.",
    files: ["login.ts", "register.ts", "authMiddleware.ts", "tokenService.ts", "passwordReset.ts"],
    dependencies: ["Database", "Backend API"],
    color: "#e53935",
  },
  {
    name: "Backend API",
    description: "REST API layer with controllers for users, projects, and billing. Routes defined centrally.",
    files: ["routes.ts", "userController.ts", "projectController.ts", "billingController.ts"],
    dependencies: ["Database", "Authentication"],
    color: "#1565c0",
  },
  {
    name: "Services",
    description: "Business logic layer — email, payments (Stripe), and notifications.",
    files: ["emailService.ts", "paymentService.ts", "notificationService.ts"],
    dependencies: ["Backend API", "Database"],
    color: "#ff9800",
  },
  {
    name: "Database",
    description: "Prisma ORM with PostgreSQL. Includes migrations and seed data.",
    files: ["prismaClient.ts", "migrations/", "seed.ts"],
    dependencies: [],
    color: "#43a047",
  },
  {
    name: "Frontend",
    description: "React components and pages — Dashboard, Login, Settings. Uses Next.js routing.",
    files: ["Dashboard.tsx", "LoginForm.tsx", "Sidebar.tsx", "ProjectList.tsx", "index.tsx", "login.tsx", "dashboard.tsx", "settings.tsx"],
    dependencies: ["Backend API", "Authentication"],
    color: "#7b1fa2",
  },
];

export const authFlowSteps: FlowStep[] = [
  { id: "1", label: "Login Form", file: "LoginForm.tsx", description: "User enters email & password" },
  { id: "2", label: "POST /login", file: "login.ts", description: "Credentials sent to auth endpoint" },
  { id: "3", label: "Validate Credentials", file: "login.ts", description: "Check email/password against DB" },
  { id: "4", label: "Query User", file: "prismaClient.ts", description: "Database lookup for user record" },
  { id: "5", label: "Generate JWT", file: "tokenService.ts", description: "Create access + refresh tokens" },
  { id: "6", label: "Auth Middleware", file: "authMiddleware.ts", description: "Verify token on protected routes" },
  { id: "7", label: "Dashboard", file: "Dashboard.tsx", description: "Authenticated user sees dashboard" },
];

export const authFlowConnections: FlowConnection[] = [
  { from: "1", to: "2", label: "submit" },
  { from: "2", to: "3", label: "validate" },
  { from: "3", to: "4", label: "query" },
  { from: "4", to: "5", label: "success" },
  { from: "5", to: "6", label: "token" },
  { from: "6", to: "7", label: "authorized" },
];

export const fileSummaries: Record<string, { role: string; importance: string; details: string }> = {
  "login.ts": { role: "Auth Entry Point", importance: "Critical", details: "Handles POST /login. Validates credentials, calls tokenService to issue JWT. Returns 401 on failure." },
  "authMiddleware.ts": { role: "Route Guard", importance: "Critical", details: "Express middleware that extracts JWT from Authorization header, verifies it, and attaches user to request." },
  "tokenService.ts": { role: "Token Manager", importance: "High", details: "Generates short-lived access tokens (15min) and long-lived refresh tokens (7d). Handles token rotation." },
  "routes.ts": { role: "Route Registry", importance: "Critical", details: "Maps HTTP methods + paths to controller functions. All routes defined here for central control." },
  "prismaClient.ts": { role: "DB Connection", importance: "Critical", details: "Singleton Prisma client instance. Auto-connects on first query. Handles connection pooling." },
  "Dashboard.tsx": { role: "Main UI", importance: "High", details: "Primary authenticated view. Fetches user projects, stats, and recent activity." },
};
