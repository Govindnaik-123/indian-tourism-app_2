'use client';

import React, { useMemo, useCallback, useState, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
  Node,
  Edge,
  BaseEdge,
  getBezierPath,
  type NodeProps,
  type EdgeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { stateConnections } from '@/data/stateConnections';
import { formatStateSlug } from '@/lib/stateSlug';
import { useRouter } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Custom Node Component ---
interface StateNodeData extends Record<string, unknown> {
  name: string;
  count: number;
  image: string;
  isHighlighted: boolean;
  isDimmed: boolean;
}

const StateNode = ({ data }: NodeProps<Node<StateNodeData>>) => {
  const router = useRouter();
  
  return (
    <div className={cn(
      "transition-all duration-500",
      data.isDimmed ? "opacity-30 scale-90 blur-[1px]" : "opacity-100 scale-100"
    )}>
      {/* Handles for connections */}
      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
      <Handle type="source" position={Position.Left} id="left" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="right" className="opacity-0" />

      <motion.div
        whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)" }}
        onClick={() => router.push(`/destinations/states/${formatStateSlug(data.name)}`)}
        className={cn(
          "relative w-44 h-32 rounded-[2rem] bg-white shadow-2xl border-2 overflow-hidden cursor-pointer transition-colors duration-300",
          data.isHighlighted ? "border-blue-500 ring-4 ring-blue-500/20" : "border-white/50"
        )}
      >
        <img 
          src={data.image} 
          alt={data.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent text-center flex flex-col justify-end p-4 pb-6">
          <p className="text-white text-[11px] font-black uppercase tracking-widest mb-1 truncate">{data.name}</p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <p className="text-white/80 text-[10px] font-bold uppercase tracking-tighter">{data.count} Destinations</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- Custom Curved Edge with Animated Flow ---
const CurvedConnectionEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetPosition,
    targetX,
    targetY,
    curvature: 0.4, // Smooth curvature as requested
  });

  const isHighlighted = data?.isHighlighted as boolean;
  const color = data?.color as string;
  const type = data?.type as string;

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: isHighlighted ? color : '#cbd5e1',
          strokeWidth: isHighlighted ? 4 : 2,
          strokeOpacity: isHighlighted ? 1 : 0.3,
          transition: 'all 0.5s ease-in-out',
        }}
      />
      {/* Animated Flow Effect (Dots or Pulse) */}
      <circle r={isHighlighted ? 4 : 2} fill={color} opacity={isHighlighted ? 1 : 0.5}>
        <animateMotion
          path={edgePath}
          dur={type === 'Nearby' ? '1.5s' : '3s'}
          repeatCount="indefinite"
        />
      </circle>
    </>
  );
};

const nodeTypes = {
  stateNode: StateNode,
};

const edgeTypes = {
  custom: CurvedConnectionEdge,
};

interface Props {
  states: {
    name: string;
    count: number;
    image: string;
  }[];
}

const StateNetworkGraph: React.FC<Props> = ({ states }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Initialize nodes and edges with an organic, force-directed-like layout
  const initialNodes: Node<StateNodeData>[] = useMemo(() => {
    // We create a more "organic" layout by adding random offsets or using a grid with jitter
    return states.map((state, index) => {
      const angle = (index / states.length) * 2 * Math.PI;
      const radius = 450 + (index % 3) * 50; // Jittered radius for "organic" feel
      return {
        id: state.name,
        type: 'stateNode',
        position: { 
          x: radius * Math.cos(angle) + (Math.random() - 0.5) * 100, 
          y: radius * Math.sin(angle) + (Math.random() - 0.5) * 100 
        },
        data: { 
          name: state.name, 
          count: state.count, 
          image: state.image,
          isHighlighted: false,
          isDimmed: false,
        },
      };
    });
  }, [states]);

  const initialEdges: Edge[] = useMemo(() => {
    return stateConnections
      .filter(conn => states.find(s => s.name === conn.from) && states.find(s => s.name === conn.to))
      .map((conn, index) => {
        const color = conn.type === 'Nearby' ? '#3b82f6' : conn.type === 'Cultural' ? '#a855f7' : '#f97316';
        return {
          id: `edge-${index}`,
          source: conn.from,
          target: conn.to,
          type: 'custom',
          data: { 
            color,
            isHighlighted: false,
            type: conn.type,
          },
        };
      });
  }, [states]);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node<StateNodeData>>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Handle Hover Side Effects for Highlighting Paths
  useEffect(() => {
    if (!hoveredNode) {
      setNodes(nds => nds.map(n => ({ ...n, data: { ...n.data, isHighlighted: false, isDimmed: false } })));
      setEdges(eds => eds.map(e => ({ ...e, data: { ...e.data, isHighlighted: false } })));
      return;
    }

    const linkedNodeIds = new Set<string>([hoveredNode]);
    stateConnections.forEach(c => {
      if (c.from === hoveredNode) linkedNodeIds.add(c.to);
      if (c.to === hoveredNode) linkedNodeIds.add(c.from);
    });

    setNodes(nds => nds.map(n => ({
      ...n,
      data: {
        ...n.data,
        isHighlighted: n.id === hoveredNode,
        isDimmed: !linkedNodeIds.has(n.id),
      }
    })));

    setEdges(eds => eds.map(e => ({
      ...e,
      data: {
        ...e.data,
        isHighlighted: e.source === hoveredNode || e.target === hoveredNode,
      }
    })));
  }, [hoveredNode, setNodes, setEdges]);

  const onNodeMouseEnter = useCallback((_: any, node: Node) => setHoveredNode(node.id), []);
  const onNodeMouseLeave = useCallback(() => setHoveredNode(null), []);

  return (
    <section className="mb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="h-[750px] w-full rounded-[3.5rem] bg-slate-50/50 backdrop-blur-xl border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative group/graph">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeMouseEnter={onNodeMouseEnter}
          onNodeMouseLeave={onNodeMouseLeave}
          fitView
          className="bg-transparent"
        >
          <Controls className="!bg-white/90 !backdrop-blur !border-none !shadow-xl !rounded-2xl overflow-hidden m-4" />
          <MiniMap 
            className="!bg-white/80 !backdrop-blur-md !border-none !shadow-2xl !rounded-3xl m-4"
            nodeColor={(node) => (node.data?.isHighlighted ? '#3b82f6' : '#cbd5e1')}
            maskColor="rgba(241, 245, 249, 0.4)"
          />
        </ReactFlow>

        {/* Legend Overlay */}
        <div className="absolute bottom-10 left-10 z-50 flex flex-col gap-5 bg-white/90 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white shadow-2xl transition-transform duration-500 group-hover/graph:scale-105">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Route Types</p>
          <div className="flex items-center gap-5">
            <div className="w-5 h-5 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
            <span className="text-sm font-bold text-slate-700">Nearby Connection</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-5 h-5 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
            <span className="text-sm font-bold text-slate-700">Cultural Link</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-5 h-5 rounded-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]" />
            <span className="text-sm font-bold text-slate-700">Popular Travel Route</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StateNetworkGraph;
