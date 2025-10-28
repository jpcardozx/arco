/**
 * Analytics Event Types
 *
 * Comprehensive type system for all analytics events across the application
 */

// ============================================================================
// CORE EVENT TYPES
// ============================================================================

export type AnalyticsEventCategory =
  | 'page_view'
  | 'user_interaction'
  | 'conversion'
  | 'engagement'
  | 'form'
  | 'navigation'
  | 'media'
  | 'error'
  | 'performance';

export type AnalyticsProvider = 'meta' | 'posthog' | 'ga4' | 'vercel' | 'all';

// ============================================================================
// PAGE VIEW EVENTS
// ============================================================================

export interface PageViewEvent {
  category: 'page_view';
  action: 'view' | 'exit' | 'scroll';
  label: string;
  properties?: {
    path: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
}

// ============================================================================
// ENGAGEMENT EVENTS
// ============================================================================

export interface EngagementEvent {
  category: 'engagement';
  action: 'scroll_depth' | 'time_on_page' | 'section_view' | 'video_play' | 'video_pause' | 'video_complete';
  label: string;
  value?: number; // Percentage for scroll, seconds for time
  properties?: {
    scroll_depth?: number;
    time_spent?: number;
    section_name?: string;
    video_duration?: number;
    video_current_time?: number;
  };
}

// ============================================================================
// INTERACTION EVENTS
// ============================================================================

export interface InteractionEvent {
  category: 'user_interaction';
  action: 'click' | 'hover' | 'focus' | 'blur' | 'input' | 'select';
  label: string;
  properties?: {
    element_type?: string;
    element_id?: string;
    element_text?: string;
    element_class?: string;
    position?: { x: number; y: number };
  };
}

// ============================================================================
// CONVERSION EVENTS
// ============================================================================

export interface ConversionEvent {
  category: 'conversion';
  action: 'lead_submit' | 'form_complete' | 'cta_click' | 'contact' | 'schedule' | 'purchase';
  label: string;
  value?: number; // Monetary value
  properties?: {
    form_id?: string;
    lead_source?: string;
    lead_quality?: number;
    revenue?: number;
    currency?: string;
    items?: string[];
  };
}

// ============================================================================
// FORM EVENTS
// ============================================================================

export interface FormEvent {
  category: 'form';
  action: 'start' | 'progress' | 'complete' | 'abandon' | 'error' | 'field_focus' | 'field_blur';
  label: string;
  properties?: {
    form_id: string;
    form_name?: string;
    field_name?: string;
    field_value?: string;
    completion_rate?: number;
    time_to_complete?: number;
    errors?: string[];
  };
}

// ============================================================================
// NAVIGATION EVENTS
// ============================================================================

export interface NavigationEvent {
  category: 'navigation';
  action: 'link_click' | 'menu_open' | 'menu_close' | 'tab_switch' | 'accordion_toggle';
  label: string;
  properties?: {
    from?: string;
    to?: string;
    menu_item?: string;
    tab_name?: string;
  };
}

// ============================================================================
// ERROR EVENTS
// ============================================================================

export interface ErrorEvent {
  category: 'error';
  action: 'api_error' | 'form_error' | 'validation_error' | 'network_error' | 'runtime_error';
  label: string;
  properties?: {
    error_message?: string;
    error_code?: string;
    error_stack?: string;
    component?: string;
  };
}

// ============================================================================
// PERFORMANCE EVENTS
// ============================================================================

export interface PerformanceEvent {
  category: 'performance';
  action: 'page_load' | 'resource_load' | 'api_response' | 'web_vital';
  label: string;
  value?: number; // Milliseconds
  properties?: {
    metric_name?: string;
    metric_value?: number;
    rating?: 'good' | 'needs-improvement' | 'poor';
    // Core Web Vitals
    lcp?: number; // Largest Contentful Paint
    fid?: number; // First Input Delay
    cls?: number; // Cumulative Layout Shift
    fcp?: number; // First Contentful Paint
    ttfb?: number; // Time to First Byte
  };
}

// ============================================================================
// UNIFIED EVENT TYPE
// ============================================================================

export type AnalyticsEvent =
  | PageViewEvent
  | EngagementEvent
  | InteractionEvent
  | ConversionEvent
  | FormEvent
  | NavigationEvent
  | ErrorEvent
  | PerformanceEvent;

// ============================================================================
// EVENT PAYLOAD
// ============================================================================

export interface AnalyticsEventPayload {
  event: AnalyticsEvent;
  timestamp: number;
  sessionId?: string;
  userId?: string;
  deviceInfo?: {
    userAgent: string;
    screenWidth: number;
    screenHeight: number;
    viewportWidth: number;
    viewportHeight: number;
    deviceType: 'mobile' | 'tablet' | 'desktop';
    os?: string;
    browser?: string;
  };
  context?: {
    path: string;
    referrer?: string;
    searchParams?: Record<string, string>;
  };
}

// ============================================================================
// TRACKING OPTIONS
// ============================================================================

export interface TrackingOptions {
  providers?: AnalyticsProvider[];
  debounce?: number; // Milliseconds
  retry?: {
    enabled: boolean;
    maxAttempts: number;
    backoff: number; // Milliseconds
  };
  offline?: {
    enabled: boolean;
    maxQueueSize: number;
  };
  sampling?: {
    enabled: boolean;
    rate: number; // 0-1
  };
}

// ============================================================================
// ANALYTICS CONTEXT
// ============================================================================

export interface AnalyticsContextValue {
  // Tracking methods
  track: (event: AnalyticsEvent, options?: TrackingOptions) => Promise<void>;
  trackPageView: (path: string, properties?: Record<string, any>) => Promise<void>;
  trackEngagement: (action: EngagementEvent['action'], label: string, value?: number) => Promise<void>;
  trackInteraction: (element: string, action: InteractionEvent['action']) => Promise<void>;
  trackConversion: (action: ConversionEvent['action'], label: string, value?: number) => Promise<void>;
  trackForm: (formId: string, action: FormEvent['action']) => Promise<void>;
  trackError: (error: Error, context?: string) => Promise<void>;

  // User identification
  identify: (userId: string, properties?: Record<string, any>) => void;
  reset: () => void;

  // Feature flags
  isFeatureEnabled: (flagKey: string) => boolean;
  getFeatureFlag: (flagKey: string) => any;

  // Session management
  startSession: () => void;
  endSession: () => void;

  // Consent management
  hasConsent: boolean;
  grantConsent: () => void;
  revokeConsent: () => void;
}

// ============================================================================
// SCROLL TRACKING
// ============================================================================

export interface ScrollDepthMilestone {
  depth: number; // Percentage (0-100)
  label: string;
  tracked: boolean;
}

export const SCROLL_DEPTH_MILESTONES: ScrollDepthMilestone[] = [
  { depth: 25, label: '25%', tracked: false },
  { depth: 50, label: '50%', tracked: false },
  { depth: 75, label: '75%', tracked: false },
  { depth: 90, label: '90%', tracked: false },
  { depth: 100, label: '100%', tracked: false },
];

// ============================================================================
// TIME TRACKING
// ============================================================================

export interface TimeTrackingConfig {
  intervals: number[]; // Seconds
  maxDuration: number; // Seconds
}

export const TIME_TRACKING_CONFIG: TimeTrackingConfig = {
  intervals: [10, 30, 60, 120, 300, 600], // 10s, 30s, 1m, 2m, 5m, 10m
  maxDuration: 3600, // 1 hour
};
