/**
 * Analytics Provider
 *
 * Global provider that initializes and manages analytics services
 */

'use client';

import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// ============================================================================
// CONTEXT
// ============================================================================

interface AnalyticsContextValue {
  isInitialized: boolean;
  hasConsent: boolean;
  grantConsent: () => void;
  revokeConsent: () => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

interface AnalyticsProviderProps {
  children: ReactNode;
  autoInit?: boolean;
}

export function AnalyticsProvider({ children, autoInit = true }: AnalyticsProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasConsent, setHasConsent] = useState<boolean>(() => {
    // Check localStorage for saved consent
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('analytics_consent');
      return saved !== 'revoked'; // Default to true unless explicitly revoked
    }
    return true;
  });

  // Initialize analytics on mount with dynamic imports
  useEffect(() => {
    if (autoInit && hasConsent && !isInitialized) {
      const initAnalytics = async () => {
        try {
          // Dynamic imports para evitar bundle no servidor
          const [{ initializePostHog }, { initSessionQualityTracking }, posthogModule] = await Promise.all([
            import('@/lib/analytics/posthog-config'),
            import('@/lib/analytics/session-quality'),
            import('posthog-js'),
          ]);

          // Initialize PostHog
          initializePostHog();

          // Extra.11: Initialize Session Quality Tracking
          initSessionQualityTracking();

          // Initialize Meta Pixel (already initialized in layout.tsx)
          // Initialize other analytics services here

          setIsInitialized(true);
          console.log('✅ Analytics services initialized');
        } catch (error) {
          console.error('❌ Failed to initialize analytics:', error);
        }
      };

      initAnalytics();
    }
  }, [autoInit, hasConsent, isInitialized]);

  const grantConsent = async () => {
    setHasConsent(true);
    localStorage.setItem('analytics_consent', 'granted');

    // Opt in to PostHog (dynamic import)
    try {
      const posthogModule = await import('posthog-js');
      const posthog = posthogModule.default;
      if (posthog.__loaded) {
        posthog.opt_in_capturing();
      }
    } catch (error) {
      console.error('Failed to opt in to PostHog:', error);
    }

    // Initialize if not already done
    // Initialize if not already done
    if (!isInitialized) {
      const { initializePostHog } = await import('@/lib/analytics/posthog-config');
      initializePostHog();
      setIsInitialized(true);
    }

    console.log('✅ Analytics consent granted');
  };

  const revokeConsent = async () => {
    setHasConsent(false);
    localStorage.setItem('analytics_consent', 'revoked');

    // Opt out of PostHog (dynamic import)
    try {
      const posthogModule = await import('posthog-js');
      const posthog = posthogModule.default;
      if (posthog.__loaded) {
        posthog.opt_out_capturing();
      }
    } catch (error) {
      console.error('Failed to opt out of PostHog:', error);
    }

    console.log('🚫 Analytics consent revoked');
  };

  const value: AnalyticsContextValue = {
    isInitialized,
    hasConsent,
    grantConsent,
    revokeConsent,
  };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

// ============================================================================
// HOOK
// ============================================================================

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error('useAnalyticsContext must be used within AnalyticsProvider');
  }

  return context;
}

export default AnalyticsProvider;
