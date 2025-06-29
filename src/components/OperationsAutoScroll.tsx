'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * OPERATIONS AUTO SCROLL - Animated Technical Operations Display
 * 
 * Purpose:
 * - Display rotating technical operations and processes
 * - Create engaging technical credibility demonstration
 * - Show real technical capabilities in action
 * - Auto-scroll through different technical operations
 */

interface Operation {
  id: string;
  title: string;
  description: string;
  status: 'running' | 'completed' | 'analyzing';
  progress?: number;
  type: 'performance' | 'security' | 'architecture' | 'optimization';
}

const TECHNICAL_OPERATIONS: Operation[] = [
  {
    id: 'bundle-analysis',
    title: 'Bundle Size Analysis',
    description: 'Analyzing JavaScript bundle sizes and dependencies',
    status: 'running',
    progress: 75,
    type: 'performance'
  },
  {
    id: 'lighthouse-audit',
    title: 'Performance Audit',
    description: 'Running Lighthouse performance metrics',
    status: 'analyzing',
    progress: 45,
    type: 'performance'
  },
  {
    id: 'security-scan',
    title: 'Security Vulnerability Scan',
    description: 'Checking for known security vulnerabilities',
    status: 'completed',
    type: 'security'
  },
  {
    id: 'code-splitting',
    title: 'Code Splitting Optimization',
    description: 'Implementing dynamic imports and lazy loading',
    status: 'running',
    progress: 60,
    type: 'optimization'
  },
  {
    id: 'database-optimization',
    title: 'Database Query Analysis',
    description: 'Optimizing N+1 queries and indexing strategies',
    status: 'analyzing',
    progress: 30,
    type: 'performance'
  },
  {
    id: 'architecture-review',
    title: 'Architecture Pattern Review',
    description: 'Evaluating component architecture and data flow',
    status: 'running',
    progress: 85,
    type: 'architecture'
  }
];

const OPERATION_DETAILS: Record<string, { impact: string; example: string }> = {
  'bundle-analysis': {
    impact: 'Pinpoint oversized bundles. No guesswork.',
    example: 'JS bundle cut by 42%. LCP -1.2s.'
  },
  'lighthouse-audit': {
    impact: 'Lighthouse, but with business context.',
    example: '+18% conversion after targeted fixes.'
  },
  'security-scan': {
    impact: 'Surface vulnerabilities before they cost you.',
    example: 'Patched 3 CVEs pre-launch.'
  },
  'code-splitting': {
    impact: 'Code splitting, automated and measured.',
    example: 'TTI -900ms for marketplace.'
  },
  'database-optimization': {
    impact: 'No more slow queries draining your budget.',
    example: 'DB response -60% for fintech.'
  },
  'architecture-review': {
    impact: 'Modern patterns, no legacy drag.',
    example: 'Monolith → microservices, 3x faster delivery.'
  }
};

interface OperationsAutoScrollProps {
  interval?: number;
  showProgress?: boolean;
  className?: string;
}

export function OperationsAutoScroll({
  interval = 3500,
  showProgress = false,
  className = ''
}: OperationsAutoScrollProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || expanded) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % TECHNICAL_OPERATIONS.length);
    }, interval);
    return () => clearTimeout(timer);
  }, [interval, paused, expanded, currentIndex]);

  const currentOperation = TECHNICAL_OPERATIONS[currentIndex];

  return (
    <div
      className={`bg-[#15181e] rounded-xl p-5 border border-[#23262c] shadow transition-all duration-300 ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-500 font-mono tracking-wide">ARCO Ops</span>
        <div className="flex gap-1">
          {TECHNICAL_OPERATIONS.map((_, idx) => (
            <button
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 focus:outline-none ${idx === currentIndex ? 'bg-emerald-400' : 'bg-slate-700'}`}
              onClick={() => { setCurrentIndex(idx); setExpanded(null); }}
              aria-label={`Go to operation ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentOperation.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="group"
        >
          <button
            className="flex items-center gap-3 w-full text-left focus:outline-none px-0 py-2 rounded hover:bg-[#181b22] transition"
            onClick={() => setExpanded(expanded === currentOperation.id ? null : currentOperation.id)}
            aria-expanded={expanded === currentOperation.id}
          >
            <span className="text-base font-semibold text-white">{currentOperation.title}</span>
            <ChevronDown className={`w-4 h-4 ml-1 text-slate-500 transition-transform ${expanded === currentOperation.id ? 'rotate-180' : ''}`} />
          </button>
          <div className="text-xs text-slate-400 pl-1 pb-1">{currentOperation.description}</div>
          <AnimatePresence>
            {expanded === currentOperation.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#181b22] border border-[#23262c] rounded-lg p-3 mt-2"
              >
                <div className="text-slate-200 text-xs mb-1 font-medium">{OPERATION_DETAILS[currentOperation.id].impact}</div>
                <div className="text-slate-500 text-xs mb-1 italic">{OPERATION_DETAILS[currentOperation.id].example}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
