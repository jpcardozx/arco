/**
 * EMQ (Event Match Quality) Dashboard
 *
 * Real-time monitoring of Meta event matching quality
 * Development/staging only - shows EMQ scores and alerts
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getEMQStats,
  getEMQRecommendations,
  getFacebookCookies,
  isMetaPixelLoaded,
  EMQ_THRESHOLDS,
  type EMQStats,
  type EMQAlert,
} from '@/lib/analytics/emq-monitoring';

// ============================================================================
// COMPONENT
// ============================================================================

export default function EMQDashboard() {
  const [stats, setStats] = useState<EMQStats | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [alerts, setAlerts] = useState<EMQAlert[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [cookies, setCookies] = useState<{ fbp?: string; fbc?: string }>({});
  const [pixelLoaded, setPixelLoaded] = useState(false);

  // Only show in development/staging
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';
    setIsVisible(isDev);
  }, []);

  // Update stats every 10 seconds
  useEffect(() => {
    if (!isVisible) return;

    const updateStats = () => {
      const newStats = getEMQStats('24h');
      setStats(newStats);
      setRecommendations(getEMQRecommendations(newStats));
      setCookies(getFacebookCookies());
      setPixelLoaded(isMetaPixelLoaded());
    };

    updateStats();
    const interval = setInterval(updateStats, 10000); // 10s

    return () => clearInterval(interval);
  }, [isVisible]);

  // Listen for EMQ alerts
  useEffect(() => {
    if (!isVisible) return;

    const handleAlert = (event: CustomEvent<EMQAlert>) => {
      setAlerts((prev) => [...prev, event.detail].slice(-5)); // Keep last 5
    };

    window.addEventListener('emq_alert' as any, handleAlert);
    return () => window.removeEventListener('emq_alert' as any, handleAlert);
  }, [isVisible]);

  if (!isVisible || !stats) return null;

  // Get color based on score
  const getScoreColor = (score: number): string => {
    if (score >= EMQ_THRESHOLDS.EXCELLENT) return 'text-green-500';
    if (score >= EMQ_THRESHOLDS.TARGET) return 'text-teal-500';
    if (score >= EMQ_THRESHOLDS.WARNING) return 'text-yellow-500';
    if (score >= EMQ_THRESHOLDS.CRITICAL) return 'text-orange-500';
    return 'text-red-500';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return '📈';
    if (trend === 'declining') return '📉';
    return '➡️';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50 w-96 bg-slate-900/95 backdrop-blur-sm border border-slate-700 rounded-lg shadow-2xl text-white text-xs font-mono"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
          <span className="font-semibold">EMQ Monitor</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-3 space-y-3 max-h-96 overflow-y-auto">
        {/* Average Score */}
        <div className="bg-slate-800/50 rounded p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Average EMQ (24h)</span>
            <span className={`text-2xl font-bold ${getScoreColor(stats.average_score)}`}>
              {stats.average_score.toFixed(1)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(stats.average_score / 10) * 100}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full ${
                stats.average_score >= EMQ_THRESHOLDS.TARGET ? 'bg-teal-500' : 'bg-orange-500'
              }`}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
            <span>Min: {stats.min_score.toFixed(1)}</span>
            <span>Max: {stats.max_score.toFixed(1)}</span>
            <span>
              {getTrendIcon(stats.trend)} {stats.trend}
            </span>
          </div>
        </div>

        {/* Event Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-slate-800/50 rounded p-2 text-center">
            <div className="text-slate-400 mb-1">Total</div>
            <div className="text-lg font-bold">{stats.total_events}</div>
          </div>
          <div className="bg-slate-800/50 rounded p-2 text-center">
            <div className="text-slate-400 mb-1">High Quality</div>
            <div className="text-lg font-bold text-green-500">{stats.high_quality_events}</div>
            <div className="text-[10px] text-slate-500">
              {((stats.high_quality_events / stats.total_events) * 100).toFixed(0)}%
            </div>
          </div>
          <div className="bg-slate-800/50 rounded p-2 text-center">
            <div className="text-slate-400 mb-1">Low Quality</div>
            <div className="text-lg font-bold text-orange-500">{stats.low_quality_events}</div>
            <div className="text-[10px] text-slate-500">
              {((stats.low_quality_events / stats.total_events) * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Meta Pixel Status */}
        <div className="bg-slate-800/50 rounded p-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400">Meta Pixel</span>
            <span className={pixelLoaded ? 'text-green-500' : 'text-red-500'}>
              {pixelLoaded ? '✓ Loaded' : '✗ Not Loaded'}
            </span>
          </div>

          <div className="space-y-1 text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">_fbp cookie:</span>
              <span className={cookies.fbp ? 'text-green-500' : 'text-red-500'}>
                {cookies.fbp ? '✓ Present' : '✗ Missing'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">_fbc cookie:</span>
              <span className={cookies.fbc ? 'text-green-500' : 'text-orange-500'}>
                {cookies.fbc ? '✓ Present' : '⚠ Missing'}
              </span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {alerts.length > 0 && (
            <div className="space-y-2">
              <div className="text-slate-400 font-semibold">Recent Alerts</div>
              {alerts.map((alert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`rounded p-2 ${
                    alert.severity === 'critical' ? 'bg-red-900/30 border border-red-700' : 'bg-yellow-900/30 border border-yellow-700'
                  }`}
                >
                  <div className="text-[10px] break-words">{alert.message}</div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-2">
            <div className="text-slate-400 font-semibold">Recommendations</div>
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-slate-800/50 rounded p-2 text-[10px] text-slate-300">
                {rec}
              </div>
            ))}
          </div>
        )}

        {/* Thresholds */}
        <div className="bg-slate-800/50 rounded p-2 text-[10px]">
          <div className="text-slate-400 mb-2">Thresholds</div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-green-500">✓ Excellent:</span>
              <span>{EMQ_THRESHOLDS.EXCELLENT}+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-teal-500">✓ Target:</span>
              <span>{EMQ_THRESHOLDS.TARGET}+</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-yellow-500">⚠ Warning:</span>
              <span>&lt; {EMQ_THRESHOLDS.WARNING}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-red-500">🚨 Critical:</span>
              <span>&lt; {EMQ_THRESHOLDS.CRITICAL}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-slate-700 text-[10px] text-slate-500 text-center">
        Dev/Staging only • Updates every 10s
      </div>
    </motion.div>
  );
}
