import React, { useState } from 'react';
import { triggerHaptic } from '../../utils/haptics';

export type SandboxType = 'aegis' | 'collabai' | 'ancestry';

interface SystemSandboxPreviewProps {
  type: SandboxType;
  compact?: boolean;
}

/**
 * 1. AEGIS CREDIT TERMINAL — B&G Foods ($2.275B) ICR Debt Surveillance Micro-Sandbox
 * Institutional Bloomberg-Dark (#0A0E1A) telemetry surface with 3-tier RBAC & Covenant Breach Gauge.
 */
const AegisCreditSandbox: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [role, setRole] = useState<'admin' | 'director' | 'analyst'>('director');
  const [tranche, setTranche] = useState<'stack' | 'secured' | 'tlb'>('stack');

  const trancheData = {
    stack: {
      label: 'TOTAL DEBT STACK',
      principal: '$2,275.0M',
      leverage: '7.52x',
      covenant: '6.00x',
      delta: '+1.52x BREACH',
      coverage: '1.41x',
      gaugePct: 88,
      isBreach: true,
    },
    secured: {
      label: 'SR. SECURED NOTES (8.00%)',
      principal: '$1,150.0M',
      leverage: '3.81x',
      covenant: '4.25x',
      delta: '-0.44x HEADROOM',
      coverage: '2.64x',
      gaugePct: 58,
      isBreach: false,
    },
    tlb: {
      label: 'TERM LOAN B (SOFR+450)',
      principal: '$1,125.0M',
      leverage: '7.52x',
      covenant: '6.00x',
      delta: '+1.52x BREACH',
      coverage: '1.41x',
      gaugePct: 88,
      isBreach: true,
    },
  }[tranche];

  const rolePermissions = {
    admin: 'RBAC L3: Full Covenant Waiver & Treasury Mutation',
    director: 'RBAC L2: IR Executive Telemetry & Scenario Stress',
    analyst: 'RBAC L1: Read-Only SEC 10-Q Surveillance',
  }[role];

  return (
    <div
      className={`sandbox-surface sandbox-aegis ${compact ? 'is-compact' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Telemetry Bar */}
      <div className="sandbox-topbar">
        <div className="sandbox-brand-group">
          <span className="sandbox-live-dot breach" />
          <span className="sandbox-mono-label">AEGIS // B&amp;G FOODS ICR SURVEILLANCE</span>
        </div>
        <div className="sandbox-pill-group" role="tablist" aria-label="RBAC Role Switcher">
          {(['admin', 'director', 'analyst'] as const).map((r) => (
            <button
              key={r}
              type="button"
              className={`sandbox-micro-pill ${role === r ? 'active-cyan' : ''}`}
              onClick={() => {
                triggerHaptic('selection');
                setRole(r);
              }}
            >
              {r === 'admin' ? 'Admin' : r === 'director' ? 'IR Dir' : 'Analyst'}
            </button>
          ))}
        </div>
      </div>

      {/* Tranche Selector Tabs */}
      <div className="sandbox-subbar">
        {(['stack', 'secured', 'tlb'] as const).map((t) => (
          <button
            key={t}
            type="button"
            className={`sandbox-tranche-tab ${tranche === t ? 'active' : ''}`}
            onClick={() => {
              triggerHaptic('light');
              setTranche(t);
            }}
          >
            {t === 'stack' ? '$2.275B Stack' : t === 'secured' ? 'Sr. Secured' : 'Term Loan B'}
          </button>
        ))}
      </div>

      {/* Core Telemetry Grid */}
      <div className="sandbox-aegis-grid">
        <div className="sandbox-metric-cell">
          <span className="sandbox-cell-kicker">{trancheData.label}</span>
          <strong className="sandbox-cell-value">{trancheData.principal}</strong>
          <span className="sandbox-cell-sub">ICR: {trancheData.coverage}</span>
        </div>

        <div className="sandbox-metric-cell">
          <span className="sandbox-cell-kicker">NET LEVERAGE VS. 6.00x MAX</span>
          <div className="sandbox-leverage-row">
            <strong
              className={`sandbox-cell-value ${trancheData.isBreach ? 'text-breach' : 'text-cyan'}`}
            >
              {trancheData.leverage}
            </strong>
            <span
              className={`sandbox-status-tag ${trancheData.isBreach ? 'tag-breach' : 'tag-ok'}`}
            >
              {trancheData.delta}
            </span>
          </div>
          {/* SVG Covenant Bar Gauge */}
          <svg className="sandbox-gauge-svg" viewBox="0 0 220 16" aria-hidden="true">
            <rect x="0" y="5" width="220" height="6" rx="3" fill="rgba(255,255,255,0.1)" />
            <rect
              x="0"
              y="5"
              width={(220 * trancheData.gaugePct) / 100}
              height="6"
              rx="3"
              fill={trancheData.isBreach ? '#FF6B35' : '#06B6D4'}
              style={{ transition: 'width 0.35s cubic-bezier(0.22, 1, 0.36, 1), fill 0.25s ease' }}
            />
            {/* 6.00x Covenant Threshold Marker */}
            <line x1="154" y1="1" x2="154" y2="15" stroke="#FACC15" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        </div>
      </div>

      {/* Footer RBAC Status */}
      <div className="sandbox-footer-bar">
        <span className="sandbox-rbac-readout">{rolePermissions}</span>
        <span className="sandbox-token-tag">JetBrains Mono · Tabular</span>
      </div>
    </div>
  );
};

/**
 * 2. COLLABAI 91-VARIABLE TOKEN & MULTI-AGENT ORCHESTRATION SANDBOX
 * Live theme engine (Dark #171717 / Light #FFFFFF / Emerald #10A37F) + 64px Icon Rail & Agent Pipeline.
 */
const CollabAiTokenSandbox: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'emerald'>('dark');
  const [railCollapsed, setRailCollapsed] = useState(true);
  const [activeAgent, setActiveAgent] = useState<0 | 1 | 2>(0);

  const agents = [
    { name: '@Aster', role: 'Lead Systems Architect', latency: '42ms · Groq LPU', output: 'Synthesizing 91 semantic CSS tokens across 14 workspace modules...' },
    { name: '#Knowledge', role: 'Vector RAG Indexer', latency: '68ms · Gemini 2.5', output: '73 low-contrast legacy nodes remediated to WCAG AA (7.2:1).' },
    { name: '@Advisor', role: 'Reasoning Verifier', latency: '51ms · OpenRouter', output: 'Multi-agent handoff verified. Ready for zero-slop deployment.' },
  ];

  return (
    <div
      className={`sandbox-surface sandbox-collabai theme-${theme} ${compact ? 'is-compact' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Top Bar: Theme Switcher + Rail Toggle */}
      <div className="sandbox-topbar">
        <div className="sandbox-brand-group">
          <span className="sandbox-live-dot emerald" />
          <span className="sandbox-mono-label">COLLABAI // 91-TOKEN ENGINE</span>
        </div>
        <div className="sandbox-pill-group" role="tablist" aria-label="Theme Token Switcher">
          {(['dark', 'light', 'emerald'] as const).map((t) => (
            <button
              key={t}
              type="button"
              className={`sandbox-micro-pill ${theme === t ? 'active-emerald' : ''}`}
              onClick={() => {
                triggerHaptic('selection');
                setTheme(t);
              }}
            >
              {t === 'dark' ? 'Dark' : t === 'light' ? 'Light' : 'Emerald'}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Workspace Layout */}
      <div className="sandbox-collab-workspace">
        {/* 64px Collapsible Icon Rail */}
        <button
          type="button"
          className={`sandbox-collab-rail ${railCollapsed ? 'collapsed' : 'expanded'}`}
          onClick={() => {
            triggerHaptic('light');
            setRailCollapsed((prev) => !prev);
          }}
          title="Click to toggle 64px Icon Rail"
        >
          <div className="sandbox-rail-item active">
            <span className="sandbox-rail-dot" />
            {!railCollapsed && <span className="sandbox-rail-text">Chat</span>}
          </div>
          <div className="sandbox-rail-item">
            <span className="sandbox-rail-dot" />
            {!railCollapsed && <span className="sandbox-rail-text">Agents</span>}
          </div>
          <div className="sandbox-rail-badge">
            {railCollapsed ? '64px' : '220px'}
          </div>
        </button>

        {/* Main Multi-Agent Stage */}
        <div className="sandbox-collab-stage">
          <div className="sandbox-agent-chain">
            {agents.map((ag, idx) => (
              <button
                key={ag.name}
                type="button"
                className={`sandbox-agent-node ${activeAgent === idx ? 'active' : ''}`}
                onClick={() => {
                  triggerHaptic('light');
                  setActiveAgent(idx as 0 | 1 | 2);
                }}
              >
                <span>{ag.name}</span>
              </button>
            ))}
          </div>

          <div className="sandbox-composer-preview">
            <div className="sandbox-composer-meta">
              <span className="sandbox-agent-role">{agents[activeAgent].role}</span>
              <span className="sandbox-agent-latency">{agents[activeAgent].latency}</span>
            </div>
            <p className="sandbox-composer-stream">{agents[activeAgent].output}</p>
          </div>
        </div>
      </div>

      <div className="sandbox-footer-bar">
        <span className="sandbox-rbac-readout">WCAG AA: 73/73 Nodes Remediated</span>
        <span className="sandbox-token-tag">Click Rail or Theme</span>
      </div>
    </div>
  );
};

/**
 * 3. ANCESTRYFORGE / CONTROL TOWER — ANIMATED SVG DAG GRAPH ENGINE
 * Interactive Directed Acyclic Graph (DAG) with live telemetry packet animation & node inspection.
 */
const AncestryDagSandbox: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const [mode, setMode] = useState<'dag' | 'tower'>('dag');
  const [selectedNode, setSelectedNode] = useState<'root' | 'union' | 'branchA' | 'branchB'>('union');

  const nodeDetails = {
    dag: {
      title: 'ANCESTRYFORGE // DAG LINEAGE ENGINE',
      nodes: {
        root: { label: 'Gen-01 Patriarch', meta: 'Fuzzy Date: ~1894 · B-Tree Indexed' },
        union: { label: 'Union Node #402', meta: 'Dagre Auto-Layout · 0 Edge Crossings' },
        branchA: { label: 'Lineage Branch A', meta: 'GEDCOM 5.5.1 Bidirectional Sync' },
        branchB: { label: 'Lineage Branch B', meta: 'React Flow Viewport Virtualized' },
      },
    },
    tower: {
      title: 'CONTROL TOWER // 10-VERTICAL AI ROUTER',
      nodes: {
        root: { label: 'Voice/SMS Intake', meta: '24/7 Clinical & Agency Triage' },
        union: { label: 'Control Tower Hub', meta: 'Multi-Tenant Routing · <50ms' },
        branchA: { label: 'ePhysician EHR', meta: 'HIPAA Verified · Auto-Schedule' },
        branchB: { label: 'Agency CRM Deal', meta: 'Automated GHL Pipeline Sync' },
      },
    },
  }[mode];

  return (
    <div
      className={`sandbox-surface sandbox-ancestry ${compact ? 'is-compact' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="sandbox-topbar">
        <div className="sandbox-brand-group">
          <span className="sandbox-live-dot cyan" />
          <span className="sandbox-mono-label">{nodeDetails.title}</span>
        </div>
        <div className="sandbox-pill-group">
          <button
            type="button"
            className={`sandbox-micro-pill ${mode === 'dag' ? 'active-cyan' : ''}`}
            onClick={() => {
              triggerHaptic('selection');
              setMode('dag');
            }}
          >
            DAG Tree
          </button>
          <button
            type="button"
            className={`sandbox-micro-pill ${mode === 'tower' ? 'active-cyan' : ''}`}
            onClick={() => {
              triggerHaptic('selection');
              setMode('tower');
            }}
          >
            Control Tower
          </button>
        </div>
      </div>

      {/* Interactive SVG DAG Graph */}
      <div className="sandbox-dag-canvas">
        <svg className="sandbox-dag-svg" viewBox="0 0 320 112" aria-label="Interactive Architecture Graph">
          {/* Orthogonal Bézier Connectors */}
          <path
            d="M 62 56 L 128 56"
            className="sandbox-dag-edge active-edge"
          />
          <path
            d="M 182 56 C 208 56, 208 28, 236 28"
            className={`sandbox-dag-edge ${selectedNode === 'branchA' || selectedNode === 'union' ? 'active-edge' : ''}`}
          />
          <path
            d="M 182 56 C 208 56, 208 84, 236 84"
            className={`sandbox-dag-edge ${selectedNode === 'branchB' || selectedNode === 'union' ? 'active-edge' : ''}`}
          />

          {/* Root Node */}
          <g
            className={`sandbox-svg-node ${selectedNode === 'root' ? 'is-selected' : ''}`}
            onClick={() => {
              triggerHaptic('light');
              setSelectedNode('root');
            }}
          >
            <rect x="10" y="38" width="52" height="36" rx="8" />
            <text x="36" y="59" textAnchor="middle">
              {mode === 'dag' ? 'GEN-01' : 'INTAKE'}
            </text>
          </g>

          {/* Central Union / Hub Node */}
          <g
            className={`sandbox-svg-node hub-node ${selectedNode === 'union' ? 'is-selected' : ''}`}
            onClick={() => {
              triggerHaptic('light');
              setSelectedNode('union');
            }}
          >
            <rect x="128" y="36" width="54" height="40" rx="10" />
            <text x="155" y="59" textAnchor="middle">
              {mode === 'dag' ? 'UNION' : 'HUB'}
            </text>
          </g>

          {/* Child Branch A */}
          <g
            className={`sandbox-svg-node ${selectedNode === 'branchA' ? 'is-selected' : ''}`}
            onClick={() => {
              triggerHaptic('light');
              setSelectedNode('branchA');
            }}
          >
            <rect x="236" y="12" width="72" height="32" rx="8" />
            <text x="272" y="31" textAnchor="middle">
              {mode === 'dag' ? 'NODE-A' : 'CLINIC'}
            </text>
          </g>

          {/* Child Branch B */}
          <g
            className={`sandbox-svg-node ${selectedNode === 'branchB' ? 'is-selected' : ''}`}
            onClick={() => {
              triggerHaptic('light');
              setSelectedNode('branchB');
            }}
          >
            <rect x="236" y="68" width="72" height="32" rx="8" />
            <text x="272" y="87" textAnchor="middle">
              {mode === 'dag' ? 'NODE-B' : 'CRM'}
            </text>
          </g>
        </svg>
      </div>

      {/* Node Inspector Footer */}
      <div className="sandbox-footer-bar">
        <span className="sandbox-rbac-readout">
          <strong>{nodeDetails.nodes[selectedNode].label}:</strong> {nodeDetails.nodes[selectedNode].meta}
        </span>
      </div>
    </div>
  );
};

export const SystemSandboxPreview: React.FC<SystemSandboxPreviewProps> = ({ type, compact }) => {
  if (type === 'aegis') return <AegisCreditSandbox compact={compact} />;
  if (type === 'collabai') return <CollabAiTokenSandbox compact={compact} />;
  return <AncestryDagSandbox compact={compact} />;
};
