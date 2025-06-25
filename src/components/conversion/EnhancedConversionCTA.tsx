/**
 * ENHANCED CTA COMPONENT - MCP OPTIMIZED
 * 
 * CTAs personalizados baseados na análise MCP de perfil de usuário
 * Urgência e personalização dinâmica para máxima conversão
 */

'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, FireIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface EnhancedCTAProps {
  userProfile: 'Technical Leader' | 'Executive Buyer' | 'Growth Focused' | 'Innovation Seeker' | 'Competitive Researcher';
  engagementLevel: 'low' | 'medium' | 'high' | 'critical';
  momentum: number;
}

export function EnhancedConversionCTA({ userProfile, engagementLevel, momentum }: EnhancedCTAProps) {
  // MCP INTELLIGENCE: Dynamic CTA based on user profile and engagement
  const getCtaConfig = () => {
    const configs = {
      'Technical Leader': {
        primary: 'Launch Technical Analysis',
        secondary: 'See Platform Capabilities',
        urgency: momentum > 70 ? 'immediate' : 'high',
        color: 'blue',
        icon: SparklesIcon,
        hook: 'Real-time competitive intelligence in under 5 minutes'
      },
      'Executive Buyer': {
        primary: 'Access Executive Dashboard',
        secondary: 'Calculate ROI Impact',
        urgency: 'critical',
        color: 'emerald',
        icon: FireIcon,
        hook: 'C-level insights with quantified business impact'
      },
      'Growth Focused': {
        primary: 'Calculate Growth Impact',
        secondary: 'See Success Stories',
        urgency: momentum > 60 ? 'high' : 'medium',
        color: 'green',
        icon: ArrowRightIcon,
        hook: '3x faster growth with competitive intelligence'
      },
      'Innovation Seeker': {
        primary: 'Explore Innovation Platform',
        secondary: 'Try Interactive Demo',
        urgency: 'medium',
        color: 'purple',
        icon: SparklesIcon,
        hook: 'Platform innovation that competitors cannot replicate'
      },
      'Competitive Researcher': {
        primary: 'Analyze Competitive Gaps',
        secondary: 'See Benchmark Results',
        urgency: 'immediate',
        color: 'red',
        icon: FireIcon,
        hook: 'Discover what your competitors are doing better'
      }
    };

    return configs[userProfile];
  };

  const config = getCtaConfig();
  
  return (
    <div className="space-y-4">
      {/* Primary CTA - High urgency based on MCP analysis */}
      <motion.button
        className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${
          config.urgency === 'immediate' 
            ? `bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/25`
            : config.urgency === 'critical'
            ? `bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/25`
            : config.urgency === 'high'
            ? `bg-${config.color}-500 hover:bg-${config.color}-600 shadow-lg shadow-${config.color}-500/25`
            : `bg-${config.color}-600 hover:bg-${config.color}-700`
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center space-x-3">
          {React.createElement(config.icon, { className: 'w-5 h-5' })}
          <span>{config.primary}</span>
          {config.urgency === 'immediate' && (
            <span className="bg-white/20 px-2 py-1 rounded text-xs">
              NOW
            </span>
          )}
        </div>
      </motion.button>

      {/* Secondary CTA - Lower friction */}
      <motion.button
        className={`px-6 py-3 rounded-lg font-medium transition-all border-2 border-${config.color}-500 text-${config.color}-500 hover:bg-${config.color}-500 hover:text-white`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {config.secondary}
      </motion.button>

      {/* Value proposition hook */}
      <p className="text-sm text-gray-600 max-w-sm">
        <span className="text-green-600 font-medium">✓</span> {config.hook}
      </p>

      {/* Urgency indicator for high-momentum users */}
      {momentum > 80 && (
        <motion.div
          className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔥 High engagement detected - Priority analysis available
        </motion.div>
      )}
    </div>
  );
}