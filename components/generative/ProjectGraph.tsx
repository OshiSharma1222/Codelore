"use client";

import React, { useMemo, useEffect } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    Node,
    Edge,
    Position,
    MarkerType,
    BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useRepo } from "@/components/providers/RepoProvider";
import { 
    Server, 
    Database, 
    Globe, 
    Settings, 
    Code, 
    TestTube,
    Star,
    Layers,
    Package,
    Zap,
    GitBranch
} from 'lucide-react';

// Icon mapping for different node types
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    frontend: Globe,
    backend: Server,
    database: Database,
    api: Zap,
    config: Settings,
    tests: TestTube,
    entry: Star,
    utils: Code,
    services: Layers,
    routes: GitBranch,
    controllers: Package
};

// Color schemes
const nodeColors: Record<string, { bg: string; border: string; text: string; iconBg: string }> = {
    frontend: { bg: '#eff6ff', border: '#3b82f6', text: '#1e40af', iconBg: '#dbeafe' },
    backend: { bg: '#ecfdf5', border: '#10b981', text: '#065f46', iconBg: '#d1fae5' },
    database: { bg: '#eef2ff', border: '#6366f1', text: '#3730a3', iconBg: '#e0e7ff' },
    api: { bg: '#fffbeb', border: '#f59e0b', text: '#92400e', iconBg: '#fef3c7' },
    config: { bg: '#f9fafb', border: '#6b7280', text: '#374151', iconBg: '#f3f4f6' },
    tests: { bg: '#f0fdf4', border: '#22c55e', text: '#166534', iconBg: '#dcfce7' },
    entry: { bg: '#fefce8', border: '#eab308', text: '#854d0e', iconBg: '#fef9c3' },
    utils: { bg: '#faf5ff', border: '#8b5cf6', text: '#5b21b6', iconBg: '#ede9fe' },
    services: { bg: '#fdf2f8', border: '#ec4899', text: '#9d174d', iconBg: '#fce7f3' },
    routes: { bg: '#f0fdfa', border: '#14b8a6', text: '#134e4a', iconBg: '#ccfbf1' },
    controllers: { bg: '#fff7ed', border: '#f97316', text: '#9a3412', iconBg: '#ffedd5' },
};

interface GraphNode {
    id: string;
    label: string;
    type: "frontend" | "backend" | "database" | "api" | "config" | "tests" | "entry" | "utils" | "services" | "routes" | "controllers";
    description?: string;
    files?: string[];
    importance?: "high" | "medium" | "low";
    position?: { x: number; y: number };
    style?: {
        color?: string;
        icon?: string;
        size?: "small" | "medium" | "large";
    };
}

interface GraphEdge {
    id: string;
    source: string;
    target: string;
    label?: string;
    type?: "import" | "data-flow" | "api-call" | "dependency";
    animated?: boolean;
    style?: {
        color?: string;
        width?: number;
        dashArray?: string;
    };
}

interface GraphLayout {
    direction?: "horizontal" | "vertical" | "radial";
    spacing?: number;
    algorithm?: "hierarchical" | "force" | "circular";
}

interface GraphStyle {
    theme?: "modern" | "brutal" | "minimal" | "colorful";
    background?: "grid" | "dots" | "solid";
    animations?: boolean;
}

interface ProjectGraphProps {
    title?: string;
    initialNodes?: GraphNode[];
    initialEdges?: GraphEdge[];
    layout?: GraphLayout;
    style?: GraphStyle;
    // Legacy compatibility
    nodes?: Node[];
    edges?: Edge[];
}

export function ProjectGraph({
    title = "PROJECT MAP",
    initialNodes = [],
    initialEdges = [],
    layout = { direction: "horizontal", spacing: 350, algorithm: "hierarchical" },
    style = { theme: "modern", background: "dots", animations: true },
    nodes: legacyNodes,
    edges: legacyEdges
}: ProjectGraphProps) {
    const { repoData } = useRepo();

    // Use legacy props if provided for backward compatibility
    const effectiveNodes = legacyNodes || initialNodes;
    const effectiveEdges = legacyEdges || initialEdges;

    // Enhanced AI-driven node generation
    const { autoNodes, autoEdges } = useMemo(() => {
        // If nodes are already provided (AI-generated), use them directly
        if (effectiveNodes && effectiveNodes.length > 0) {
            const processedNodes = effectiveNodes.map((node: any) => {
                // Handle legacy Node format
                if (node.data && node.position) return node;
                
                // New GraphNode format - convert to ReactFlow Node
                const moduleType = node.type || 'backend';
                const colors = nodeColors[moduleType] || nodeColors.backend;
                const IconComponent = iconMap[moduleType] || Code;
                const sizeMap = {
                    small: { width: 200, height: 90 },
                    medium: { width: 240, height: 110 },
                    large: { width: 280, height: 130 }
                };
                const dim = sizeMap[node.style?.size || 'medium'];
                
                return {
                    id: node.id,
                    position: node.position || { x: 0, y: 0 },
                    data: { 
                        label: (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', width: '100%' }}>
                                <div style={{ 
                                    width: 36, height: 36, minWidth: 36, borderRadius: 8,
                                    background: colors.iconBg, border: `2px solid ${colors.border}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <IconComponent size={18} className="shrink-0" />
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden', textAlign: 'left' }}>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: colors.text, lineHeight: 1.2, marginBottom: 2 }}>
                                        {node.label}
                                    </div>
                                    {node.description && (
                                        <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.3, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                            {node.description.length > 50 ? node.description.slice(0, 50) + '…' : node.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    },
                    sourcePosition: Position.Right,
                    targetPosition: Position.Left,
                    style: {
                        background: colors.bg,
                        border: `2px solid ${colors.border}`,
                        borderRadius: '10px',
                        padding: 0,
                        width: dim.width,
                        boxShadow: `3px 3px 0px ${colors.border}40`,
                        overflow: 'hidden',
                    },
                    type: 'default',
                };
            });
            
            const processedEdges = (effectiveEdges || []).map((edge: any) => {
                if (edge.source && edge.target && edge.id && edge.markerEnd) return edge;
                
                const edgeColors: Record<string, string> = {
                    import: '#3b82f6',
                    'data-flow': '#10b981',
                    'api-call': '#f59e0b',
                    dependency: '#9ca3af'
                };
                const edgeColor = edge.style?.color || edgeColors[edge.type] || '#9ca3af';
                
                return {
                    id: edge.id,
                    source: edge.source,
                    target: edge.target,
                    label: edge.label,
                    animated: edge.animated !== false && style.animations,
                    style: { stroke: edgeColor, strokeWidth: edge.style?.width || 2 },
                    markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor, height: 14, width: 14 },
                    labelStyle: { fontSize: '10px', fontWeight: 700, fill: edgeColor },
                    labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
                    labelBgPadding: [4, 8] as [number, number],
                    labelBgBorderRadius: 4,
                };
            });
            
            return { autoNodes: processedNodes, autoEdges: processedEdges };
        }

        if (!repoData?.modules) return { autoNodes: [], autoEdges: [] };

        const modules = repoData.modules;
        const generatedNodes: Node[] = [];
        const generatedEdges: Edge[] = [];

        // Enhanced layout algorithm with multiple strategies
        const layoutAlgorithm = layout.algorithm || 'hierarchical';
        const direction = layout.direction || 'horizontal';
        const spacing = layout.spacing || 350;
        
        // Define ranks for module types with more granular classification
        const ranks: Record<string, number> = {
            "frontend": 0,
            "config": 0,
            "entry": 0,
            "routes": 1,
            "middleware": 1.5,
            "controllers": 2,
            "services": 3,
            "utils": 3.5,
            "database": 4,
            "tests": 4
        };
        
        // Enhanced module type detection
        const getModuleType = (mod: any): string => {
            const name = mod.name.toLowerCase();
            const desc = mod.description?.toLowerCase() || '';
            
            if (name.includes("frontend") || name.includes("react") || name.includes("next") || name.includes("vue")) return "frontend";
            if (name.includes("entry") || name.includes("server") || name.includes("main") || name.includes("app.js")) return "entry";
            if (name.includes("config") || name.includes("settings")) return "config";
            if (name.includes("route") || name.includes("api")) return "routes";
            if (name.includes("middleware")) return "middleware";
            if (name.includes("controller")) return "controllers";
            if (name.includes("service")) return "services";
            if (name.includes("util") || name.includes("helper")) return "utils";
            if (name.includes("database") || name.includes("model") || name.includes("prisma")) return "database";
            if (name.includes("test") || name.includes("spec")) return "tests";
            
            // Fallback based on description
            if (desc.includes("frontend") || desc.includes("ui") || desc.includes("react")) return "frontend";
            if (desc.includes("backend") || desc.includes("server") || desc.includes("api")) return "backend";
            if (desc.includes("database") || desc.includes("data")) return "database";
            
            return "backend";
        };
        
        // Enhanced rank calculation
        const getRank = (mod: any) => {
            const type = getModuleType(mod);
            return ranks[type] || 2;
        };

        // Group modules by rank with enhanced positioning
        const layers: Record<number, any[]> = {};
        modules.forEach(mod => {
            const rank = getRank(mod);
            if (!layers[rank]) layers[rank] = [];
            layers[rank].push({ ...mod, type: getModuleType(mod) });
        });

        // Node generation with proper sizing
        const spacingX = spacing;
        const spacingY = direction === 'vertical' ? 200 : 160;

        Object.keys(layers).forEach(rankStr => {
            const rank = parseFloat(rankStr);
            const mods = layers[rank];
            const layerHeight = mods.length * spacingY;

            mods.forEach((mod, index) => {
                const moduleType = mod.type as string;
                const colors = nodeColors[moduleType] || nodeColors.backend;
                const IconComponent = iconMap[moduleType] || Code;
                
                const x = direction === 'vertical' 
                    ? (index % 2) * spacingX + 100
                    : rank * spacingX;
                const y = direction === 'vertical'
                    ? Math.floor(index / 2) * spacingY + 100
                    : (index * spacingY) - (layerHeight / 2) + 300;

                generatedNodes.push({
                    id: mod.name,
                    position: { x, y },
                    data: { 
                        label: (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', width: '100%' }}>
                                <div style={{ 
                                    width: 36, height: 36, minWidth: 36, borderRadius: 8,
                                    background: colors.iconBg, border: `2px solid ${colors.border}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <IconComponent size={18} className="shrink-0" />
                                </div>
                                <div style={{ flex: 1, overflow: 'hidden', textAlign: 'left' }}>
                                    <div style={{ fontWeight: 700, fontSize: 13, color: colors.text, lineHeight: 1.2, marginBottom: 2 }}>
                                        {mod.name}
                                    </div>
                                    {mod.description && (
                                        <div style={{ fontSize: 10, color: '#6b7280', lineHeight: 1.3, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                            {mod.description.length > 50 ? mod.description.slice(0, 50) + '…' : mod.description}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    },
                    sourcePosition: direction === 'vertical' ? Position.Bottom : Position.Right,
                    targetPosition: direction === 'vertical' ? Position.Top : Position.Left,
                    style: {
                        background: colors.bg,
                        border: `2px solid ${colors.border}`,
                        borderRadius: '10px',
                        padding: 0,
                        width: 240,
                        boxShadow: `3px 3px 0px ${colors.border}40`,
                        overflow: 'hidden',
                    },
                    type: 'default',
                });

                // Enhanced edge creation with relationship types
                if (mod.dependencies) {
                    mod.dependencies.forEach((dep: string) => {
                        if (modules.some(m => m.name === dep)) {
                            const edgeType = moduleType === 'database' ? 'data-flow' : 
                                          moduleType === 'routes' ? 'api-call' : 
                                          'dependency';
                            const edgeColors = {
                                'data-flow': '#10b981',
                                'api-call': '#f59e0b',
                                'dependency': '#6b7280',
                                'import': '#3b82f6'
                            };
                            const edgeColor = edgeColors[edgeType as keyof typeof edgeColors] || '#9ca3af';
                            
                            generatedEdges.push({
                                id: `${mod.name}-${dep}`,
                                source: mod.name,
                                target: dep,
                                label: edgeType === 'data-flow' ? 'data' : 
                                       edgeType === 'api-call' ? 'API' : 
                                       edgeType === 'dependency' ? 'depends' : 'imports',
                                animated: style.animations,
                                style: { stroke: edgeColor, strokeWidth: 2 },
                                markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor, height: 14, width: 14 },
                                labelStyle: { fontSize: '10px', fontWeight: 700, fill: edgeColor },
                                labelBgStyle: { fill: 'white', fillOpacity: 0.9 },
                                labelBgPadding: [4, 8] as [number, number],
                                labelBgBorderRadius: 4,
                            });
                        }
                    });
                }
            });
        });

        return { autoNodes: generatedNodes, autoEdges: generatedEdges };
    }, [repoData, effectiveNodes, effectiveEdges, layout.algorithm, layout.direction, layout.spacing, style.animations, style.theme]);

    const [nodes, setNodes, onNodesChange] = useNodesState(autoNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(autoEdges);

    // Sync state if props or auto-generation changes
    useEffect(() => {
        setNodes(autoNodes);
        setEdges(autoEdges);
    }, [autoNodes, autoEdges, setNodes, setEdges]);

    // Enhanced styling with theme support
    const backgroundVariant = style.background === 'grid' ? BackgroundVariant.Lines : 
                           style.background === 'solid' ? undefined : 
                           BackgroundVariant.Dots;

    return (
        <div className="border-2 border-black bg-white shadow-[6px_6px_0px_black] overflow-hidden" style={{ width: '100%' }}>
            {/* Title Bar */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 border-b-2 border-black flex items-center justify-between">
                <h3 className="font-[var(--font-bangers)] text-lg tracking-wider text-white drop-shadow-[1px_1px_0px_rgba(0,0,0,0.3)]">
                    {title}
                </h3>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400 border border-black/20" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black/20" />
                    <div className="w-3 h-3 rounded-full bg-green-400 border border-black/20" />
                </div>
            </div>

            {/* Graph Container */}
            <div style={{ width: '100%', height: '500px' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    style={{ width: '100%', height: '100%', background: '#fafafa' }}
                    fitView
                    fitViewOptions={{ padding: 0.3 }}
                    attributionPosition="bottom-right"
                    proOptions={{ hideAttribution: true }}
                    minZoom={0.3}
                    maxZoom={2}
                >
                    {backgroundVariant && (
                        <Background 
                            color="#e5e7eb"
                            gap={24} 
                            variant={backgroundVariant} 
                            size={1}
                        />
                    )}
                    <Controls
                        style={{
                            border: '2px solid #000',
                            borderRadius: '6px',
                            boxShadow: '3px 3px 0px rgba(0,0,0,0.15)',
                            background: '#fff',
                        }}
                        showInteractive={false}
                    />
                    <MiniMap
                        style={{
                            border: '2px solid #000',
                            borderRadius: '6px',
                            background: '#fff',
                            boxShadow: '3px 3px 0px rgba(0,0,0,0.1)',
                        }}
                        maskColor="rgba(0,0,0,0.08)"
                        zoomable
                        pannable
                        nodeColor={(n) => {
                            const borderColor = (n.style as any)?.border;
                            if (typeof borderColor === 'string') {
                                const match = borderColor.match(/#[0-9a-fA-F]{6}/);
                                return match ? match[0] : '#ddd';
                            }
                            return '#ddd';
                        }}
                    />
                </ReactFlow>
            </div>

            {/* Footer */}
            <div className="px-4 py-1.5 border-t-2 border-black bg-zinc-50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Drag nodes to rearrange • Scroll to zoom
                </span>
                <span className="text-[10px] font-mono text-zinc-300">
                    {nodes.length} nodes · {edges.length} edges
                </span>
            </div>
        </div>
    );
}
