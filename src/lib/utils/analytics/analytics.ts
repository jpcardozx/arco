/**
 * Analytics Core Module
 * 
 * This module provides a standardized way to track events, page views, and performance metrics.
 * It can be configured to work with different analytics providers like Google Analytics, 
 * Mixpanel, Segment, etc.
 */

// Define types for better type safety
export type EventData = Record<string, any>;
export type PageViewData = Record<string, any>;
export type ComponentPerformanceData = Record<string, any>;
export type FunnelStepData = Record<string, any>;

/**
 * Track a custom event
 * 
 * @param eventName - The name of the event
 * @param eventData - Optional data associated with the event
 */
export function trackEvent(eventName: string, eventData?: EventData): void {
  // Implementation would send to your analytics provider
  console.info(`[Analytics Event] ${eventName}`, eventData || {});
}

/**
 * Track a page view
 * 
 * @param pagePath - The path of the page being viewed
 * @param pageData - Optional data associated with the page view
 */
export function trackPageView(pagePath: string, pageData?: PageViewData): void {
  console.info(`[Analytics PageView] ${pagePath}`, pageData || {});
}

/**
 * Track component performance
 * 
 * @param component - The name of the component
 * @param renderTime - Time taken to render in milliseconds
 */
export function trackComponentPerformance(component: string, renderTime: number): void {
  console.info(`[Analytics Performance] ${component}: ${renderTime}ms`);
}

/**
 * Track a step in a funnel
 * 
 * @param funnel - The funnel name
 * @param step - The step name
 * @param positionOrData - The numerical position in the funnel or data about the step
 * @param data - Optional additional data when position is provided as a number
 */
export function trackFunnelStep(funnel: string, step: string, positionOrData: number | FunnelStepData, data?: FunnelStepData): void {
  if (typeof positionOrData === 'number') {
    console.info(`[Analytics Funnel] ${funnel} - ${step} (${positionOrData})`, data || {});
  } else {
    console.info(`[Analytics Funnel] ${funnel} - ${step}`, positionOrData || {});
  }
}

/**
 * Send web vitals metrics
 * 
 * @param metric - The web vitals metric object
 */
export function sendWebVitals(metric: any): void {
  console.info(`[Analytics WebVitals] ${metric.name}: ${metric.value}`);
}

// Default export for convenient importing
const analytics = {
  trackEvent,
  trackPageView,
  trackComponentPerformance,
  trackFunnelStep,
  sendWebVitals
};

export default analytics;
