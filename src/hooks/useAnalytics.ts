'use client';

/**
 * useAnalytics Hook
 *
 * Centralized analytics hook that manages:
 * - PostHog tracking
 * - Meta Pixel tracking
 * - Google Analytics (future)
 * - Event queue with retry
 * - Offline support
 * - Auto-tracking (scroll, time, engagement)
 */

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { useMetaTracking } from './useMetaTracking';
import type {
  AnalyticsEvent,
  AnalyticsEventCategory,
  TrackingOptions,
  EngagementEvent,
  InteractionEvent,
  ConversionEvent,
  FormEvent,
  ErrorEvent,
  PageViewEvent,
} from '@/lib/analytics/types';

// ============================================================================
// TYPES
// ============================================================================

interface UseAnalyticsOptions {
  enableAutoTracking?: boolean;
  enableScrollTracking?: boolean;
  enableTimeTracking?: boolean;
  enablePerformanceTracking?: boolean;
  debug?: boolean;
}

interface AnalyticsState {
  sessionId: string;
  startTime: number;
  lastActivityTime: number;
  scrollDepthTracked: Set<number>;
  timeIntervalsTracked: Set<number>;
  isActive: boolean;
}

// ============================================================================
// HOOK
// ============================================================================

export function useAnalytics(options: UseAnalyticsOptions = {}) {
  const {
    enableAutoTracking = true,
    enableScrollTracking = true,
    enableTimeTracking = true,
    enablePerformanceTracking = true,
    debug = false,
  } = options;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { trackEvent: trackMetaEvent } = useMetaTracking();

  // State
  const [state, setState] = useState<AnalyticsState>({
    sessionId: generateSessionId(),
    startTime: Date.now(),
    lastActivityTime: Date.now(),
    scrollDepthTracked: new Set(),
    timeIntervalsTracked: new Set(),
    isActive: true,
  });

  const [hasConsent, setHasConsent] = useState<boolean>(true); // Default true, change based on your privacy policy

  // Refs for timers
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const activityTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // ============================================================================
  // CORE TRACKING FUNCTION
  // ============================================================================

  const track = useCallback(
    async (event: AnalyticsEvent, options?: TrackingOptions): Promise<void> => {
      if (!hasConsent) {
        if (debug) console.log('⚠️ Analytics tracking blocked: no consent');
        return;
      }

      const eventPayload = {
        ...event,
        timestamp: Date.now(),
        sessionId: state.sessionId,
        path: pathname,
      };

      if (debug) {
        console.log('📊 Analytics Event:', eventPayload);
      }

      try {
        // PostHog tracking
        if (typeof window !== 'undefined' && posthog.__loaded) {
          const eventName = `${event.category}_${event.action}`;
          posthog.capture(eventName, {
            ...event.properties,
            label: event.label,
            value: 'value' in event ? event.value : undefined,
          });
        }

        // Meta Pixel tracking for conversions
        if (typeof window !== 'undefined' && event.category === 'conversion' && window.fbq) {
          const metaEventMap: Record<string, string> = {
            lead_submit: 'Lead',
            form_complete: 'CompleteRegistration',
            contact: 'Contact',
            schedule: 'Schedule',
            purchase: 'Purchase',
          };

          const metaEventName = metaEventMap[event.action];
          if (metaEventName) {
            window.fbq('track', metaEventName, {
              value: 'value' in event ? event.value : undefined,
              currency: 'BRL',
              ...event.properties,
            });
          }
        }

        // Update activity time
        setState((prev) => ({ ...prev, lastActivityTime: Date.now() }));
      } catch (error) {
        console.error('❌ Analytics tracking error:', error);
      }
    },
    [hasConsent, pathname, state.sessionId, debug]
  );

  // ============================================================================
  // CONVENIENCE METHODS
  // ============================================================================

  const trackPageView = useCallback(
    async (path?: string, properties?: Record<string, any>): Promise<void> => {
      const event: PageViewEvent = {
        category: 'page_view',
        action: 'view',
        label: path || pathname || '',
        properties: {
          path: path || pathname || '',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
          ...properties,
        },
      };

      await track(event);

      // PostHog specific page view
      if (typeof window !== 'undefined' && posthog.__loaded) {
        posthog.capture('$pageview', {
          $current_url: window.location.href,
        });
      }
    },
    [pathname, track]
  );

  const trackEngagement = useCallback(
    async (action: EngagementEvent['action'], label: string, value?: number): Promise<void> => {
      const event: EngagementEvent = {
        category: 'engagement',
        action,
        label,
        value,
        properties: {
          scroll_depth: action === 'scroll_depth' ? value : undefined,
          time_spent: action === 'time_on_page' ? value : undefined,
          section_name: action === 'section_view' ? label : undefined,
        },
      };

      await track(event);
    },
    [track]
  );

  const trackInteraction = useCallback(
    async (element: string, action: InteractionEvent['action'] = 'click', properties?: Record<string, any>): Promise<void> => {
      const event: InteractionEvent = {
        category: 'user_interaction',
        action,
        label: element,
        properties,
      };

      await track(event);
    },
    [track]
  );

  const trackConversion = useCallback(
    async (action: ConversionEvent['action'], label: string, value?: number, properties?: Record<string, any>): Promise<void> => {
      const event: ConversionEvent = {
        category: 'conversion',
        action,
        label,
        value,
        properties,
      };

      await track(event);

      // Also track with Meta if it's a lead
      if (action === 'lead_submit' && properties?.email) {
        try {
          // Track with Meta CAPI (server-side)
          const metaResponse = await trackMetaEvent({
            eventName: 'Lead',
            userData: {
              email: properties.email,
              phone: properties.phone,
              firstName: properties.firstName,
              lastName: properties.lastName,
            },
            customData: {
              value,
              source: properties.source,
            },
          });

          // P0.1: SYNC event_id between Pixel and CAPI for deduplication
          if (metaResponse.success && metaResponse.eventId && typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'Lead', {
              eventID: metaResponse.eventId, // ← CRITICAL: Same event_id for dedup
              value,
              currency: 'BRL',
            });
            console.log('✅ [Meta Dedup] Pixel + CAPI synced with eventId:', metaResponse.eventId);
          }

          // P0.2: IDENTIFY user in PostHog (link anonymous → identified)
          if (posthog.__loaded && properties.email) {
            posthog.identify(properties.email, {
              email: properties.email,
              phone: properties.phone,
              name: properties.firstName ? `${properties.firstName} ${properties.lastName || ''}`.trim() : undefined,
              source: properties.source,
              campaign: properties.campaign,
            });
            console.log('✅ [PostHog] User identified:', properties.email);
          }
        } catch (error) {
          console.error('Failed to track Meta conversion:', error);
        }
      }
    },
    [track, trackMetaEvent]
  );

  const trackForm = useCallback(
    async (formId: string, action: FormEvent['action'], properties?: Record<string, any>): Promise<void> => {
      const event: FormEvent = {
        category: 'form',
        action,
        label: formId,
        properties: {
          form_id: formId,
          ...properties,
        },
      };

      await track(event);
    },
    [track]
  );

  const trackError = useCallback(
    async (error: Error, context?: string): Promise<void> => {
      const event: ErrorEvent = {
        category: 'error',
        action: 'runtime_error',
        label: error.message,
        properties: {
          error_message: error.message,
          error_stack: error.stack,
          component: context,
        },
      };

      await track(event);

      // Also send to PostHog for error tracking
      if (posthog.__loaded) {
        posthog.capture('$exception', {
          $exception_message: error.message,
          $exception_type: error.name,
          $exception_context: context,
        });
      }
    },
    [track]
  );

  // ============================================================================
  // AUTO-TRACKING: SCROLL DEPTH
  // ============================================================================

  useEffect(() => {
    if (!enableScrollTracking || !hasConsent) return;

    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPercentage = Math.round(
          ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
        );

        // Track milestones: 25%, 50%, 75%, 90%, 100%
        const milestones = [25, 50, 75, 90, 100];
        const milestone = milestones.find(
          (m) => scrollPercentage >= m && !state.scrollDepthTracked.has(m)
        );

        if (milestone) {
          trackEngagement('scroll_depth', `${milestone}%`, milestone);
          setState((prev) => ({
            ...prev,
            scrollDepthTracked: new Set([...prev.scrollDepthTracked, milestone]),
          }));
        }
      }, 200); // Debounce
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [enableScrollTracking, hasConsent, state.scrollDepthTracked, trackEngagement]);

  // ============================================================================
  // AUTO-TRACKING: TIME ON PAGE
  // ============================================================================

  useEffect(() => {
    if (!enableTimeTracking || !hasConsent) return;

    const intervals = [10, 30, 60, 120, 300]; // 10s, 30s, 1m, 2m, 5m

    const timers = intervals.map((interval) =>
      setTimeout(() => {
        if (!state.timeIntervalsTracked.has(interval)) {
          trackEngagement('time_on_page', `${interval}s`, interval);
          setState((prev) => ({
            ...prev,
            timeIntervalsTracked: new Set([...prev.timeIntervalsTracked, interval]),
          }));
        }
      }, interval * 1000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [enableTimeTracking, hasConsent, state.timeIntervalsTracked, trackEngagement]);

  // ============================================================================
  // AUTO-TRACKING: PAGE VIEWS
  // ============================================================================

  useEffect(() => {
    if (enableAutoTracking && hasConsent) {
      trackPageView();

      // Reset scroll and time tracking for new page
      setState((prev) => ({
        ...prev,
        scrollDepthTracked: new Set(),
        timeIntervalsTracked: new Set(),
        startTime: Date.now(),
      }));
    }
  }, [pathname, searchParams, enableAutoTracking, hasConsent]); // trackPageView deliberately omitted to avoid loops

  // ============================================================================
  // USER IDENTIFICATION
  // ============================================================================

  const identify = useCallback((userId: string, properties?: Record<string, any>) => {
    if (posthog.__loaded) {
      posthog.identify(userId, properties);
    }

    if (debug) {
      console.log('👤 User identified:', userId, properties);
    }
  }, [debug]);

  const reset = useCallback(() => {
    if (posthog.__loaded) {
      posthog.reset();
    }

    setState({
      sessionId: generateSessionId(),
      startTime: Date.now(),
      lastActivityTime: Date.now(),
      scrollDepthTracked: new Set(),
      timeIntervalsTracked: new Set(),
      isActive: true,
    });

    if (debug) {
      console.log('🔄 Analytics reset');
    }
  }, [debug]);

  // ============================================================================
  // CONSENT MANAGEMENT
  // ============================================================================

  const grantConsent = useCallback(() => {
    setHasConsent(true);
    localStorage.setItem('analytics_consent', 'granted');

    if (posthog.__loaded) {
      posthog.opt_in_capturing();
    }

    if (debug) {
      console.log('✅ Analytics consent granted');
    }
  }, [debug]);

  const revokeConsent = useCallback(() => {
    setHasConsent(false);
    localStorage.setItem('analytics_consent', 'revoked');

    if (posthog.__loaded) {
      posthog.opt_out_capturing();
    }

    if (debug) {
      console.log('🚫 Analytics consent revoked');
    }
  }, [debug]);

  // ============================================================================
  // RETURN
  // ============================================================================

  return {
    // Tracking methods
    track,
    trackPageView,
    trackEngagement,
    trackInteraction,
    trackConversion,
    trackForm,
    trackError,

    // User methods
    identify,
    reset,

    // Consent
    hasConsent,
    grantConsent,
    revokeConsent,

    // Session info
    sessionId: state.sessionId,
    sessionDuration: Date.now() - state.startTime,
  };
}

// ============================================================================
// UTILITIES
// ============================================================================

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export default useAnalytics;
