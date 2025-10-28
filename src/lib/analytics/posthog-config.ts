'use client';

/**
 * PostHog Analytics Configuration
 *
 * Professional analytics setup with:
 * - Auto-capture events
 * - Session recording
 * - Feature flags
 * - A/B testing
 * - Heatmaps
 *
 * @see https://posthog.com/docs/libraries/next-js
 */

import posthog from 'posthog-js';

export const POSTHOG_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || '',
  apiHost: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',

  // Feature configuration
  options: {
    // Auto-capture configuration
    autocapture: true,

    // Session recording
    session_recording: {
      // Record user sessions for replay
      enabled: true,
      // Minimum duration to record (in ms)
      minimumDuration: 2000,
      // Mask sensitive inputs
      maskAllInputs: true,
    },

    // Performance tracking
    capture_performance: true,
    capture_pageview: true,
    capture_pageleave: true,

    // Privacy & Security
    opt_out_capturing_by_default: false,
    respect_dnt: true,
    persistence: 'localStorage+cookie' as const,

    // Advanced features
    enable_recording_console_log: true,
    disable_session_recording: false,

    // Callback when loaded
    loaded: (posthog: any) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 PostHog loaded successfully');
      }
    },
  },
};

/**
 * Initialize PostHog
 * Should be called once in _app.tsx or layout.tsx
 */
export function initializePostHog(): void {
  if (typeof window === 'undefined') return;

  const { apiKey, apiHost, options } = POSTHOG_CONFIG;

  if (!apiKey) {
    console.warn('⚠️ PostHog API key not found. Analytics disabled.');
    return;
  }

  // Only initialize once
  if (posthog.__loaded) {
    console.log('✅ PostHog already initialized');
    return;
  }

  try {
    posthog.init(apiKey, {
      api_host: apiHost,
      ...options,
    });

    console.log('✅ PostHog initialized');
  } catch (error) {
    console.error('❌ Failed to initialize PostHog:', error);
  }
}

/**
 * Get PostHog instance
 */
export function getPostHog() {
  return posthog;
}

/**
 * Check if PostHog is enabled
 */
export function isPostHogEnabled(): boolean {
  return !!POSTHOG_CONFIG.apiKey && typeof window !== 'undefined';
}

export default posthog;
