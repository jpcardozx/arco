/**
 * Analytics Dashboard Component
 *
 * Real-time analytics visualization for admin/debug purposes
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Users,
  MousePointer,
  Clock,
  TrendingUp,
  Eye,
  Target,
  BarChart3,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '@/hooks/useAnalytics';

// ============================================================================
// TYPES
// ============================================================================

interface AnalyticsMetrics {
  pageViews: number;
  uniqueVisitors: number;
  scrollDepth: number;
  timeOnPage: number;
  interactions: number;
  conversions: number;
  bounceRate: number;
  engagementScore: number;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AnalyticsDashboard() {
  const { sessionDuration, sessionId } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [metrics, setMetrics] = useState<AnalyticsMetrics>({
    pageViews: 0,
    uniqueVisitors: 0,
    scrollDepth: 0,
    timeOnPage: 0,
    interactions: 0,
    conversions: 0,
    bounceRate: 0,
    engagementScore: 0,
  });

  // Only show in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsOpen(true);
    }
  }, []);

  // Mock data updates (replace with real analytics data)
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        timeOnPage: Math.floor(sessionDuration / 1000),
        scrollDepth: Math.min(
          100,
          Math.round(((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100)
        ),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, sessionDuration]);

  if (!isOpen || process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed right-4 bottom-4 z-[9997] w-96 max-w-[calc(100vw-2rem)]"
      >
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-white" />
              <h3 className="font-bold text-white">Analytics Dashboard</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white/80 hover:text-white transition-colors"
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  {/* Session Info */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Session ID</div>
                    <div className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate">{sessionId}</div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {/* Time on Page */}
                    <MetricCard
                      icon={Clock}
                      label="Time on Page"
                      value={formatDuration(metrics.timeOnPage)}
                      color="text-blue-600"
                      bgColor="bg-blue-50 dark:bg-blue-900/20"
                    />

                    {/* Scroll Depth */}
                    <MetricCard
                      icon={TrendingUp}
                      label="Scroll Depth"
                      value={`${metrics.scrollDepth}%`}
                      color="text-teal-600"
                      bgColor="bg-teal-50 dark:bg-teal-900/20"
                    />

                    {/* Interactions */}
                    <MetricCard
                      icon={MousePointer}
                      label="Interactions"
                      value={metrics.interactions.toString()}
                      color="text-purple-600"
                      bgColor="bg-purple-50 dark:bg-purple-900/20"
                    />

                    {/* Page Views */}
                    <MetricCard
                      icon={Eye}
                      label="Page Views"
                      value={metrics.pageViews.toString()}
                      color="text-amber-600"
                      bgColor="bg-amber-50 dark:bg-amber-900/20"
                    />
                  </div>

                  {/* Engagement Score */}
                  <div className="p-4 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Engagement Score</div>
                      <div className="text-2xl font-bold text-teal-600">{metrics.engagementScore}/100</div>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metrics.engagementScore}%` }}
                        className="h-full bg-gradient-to-r from-teal-500 to-blue-600 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <BarChart3 className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Target className="w-3 h-3 mr-1" />
                      Export Data
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// METRIC CARD
// ============================================================================

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
  bgColor: string;
}

function MetricCard({ icon: Icon, label, value, color, bgColor }: MetricCardProps) {
  return (
    <div className={`p-3 ${bgColor} rounded-lg`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${color}`} />
        <div className="text-xs font-medium text-slate-600 dark:text-slate-400">{label}</div>
      </div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

// ============================================================================
// UTILITIES
// ============================================================================

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds}s`;
}

export default AnalyticsDashboard;
