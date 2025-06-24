/**
 * Enhanced Analytics System - ARCO Performance Tracking
 * 
 * Comprehensive event tracking for conversion optimization
 * and performance monitoring
 */

interface TrackingEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

interface PerformanceMetric {
  name: string
  value: number
  rating: string
  url: string
  timestamp: number
}

class AnalyticsManager {
  private static instance: AnalyticsManager
  private isInitialized = false
  private sessionId: string
  private userId: string | null = null

  constructor() {
    this.sessionId = this.generateSessionId()
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager()
    }
    return AnalyticsManager.instance
  }

  private generateSessionId(): string {
    return crypto.randomUUID()
  }
  async initialize() {
    if (this.isInitialized || typeof window === 'undefined') return

    try {
      // Load Google Analytics 4 if gtag is available
      if (typeof window.gtag !== 'undefined') {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          session_id: this.sessionId,
          custom_map: {
            performance_rating: 'performance_rating'
          }
        })
      }

      // Initialize user ID from localStorage or generate new
      this.userId = localStorage.getItem('arco_user_id') || crypto.randomUUID()
      localStorage.setItem('arco_user_id', this.userId)

      this.isInitialized = true
      console.log('📊 Analytics initialized:', { sessionId: this.sessionId, userId: this.userId })
    } catch (error) {
      console.error('Analytics initialization failed:', error)
    }
  }

  /**
   * Track custom events with enhanced metadata
   */
  trackEvent({ event, category, action, label, value, custom_parameters }: TrackingEvent) {
    try {
      const eventData = {
        event_category: category,
        event_label: label,
        value: value,
        session_id: this.sessionId,
        user_id: this.userId,
        page_url: window.location.href,
        page_title: document.title,
        timestamp: Date.now(),
        user_agent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        ...custom_parameters
      }

      // Send to Google Analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, eventData)
      }

      // Send to custom analytics endpoint
      this.sendToCustomAnalytics(event, eventData)

      // Development logging
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Event tracked:', { event, category, action, label, value })
      }
    } catch (error) {
      console.error('Event tracking failed:', error)
    }
  }

  /**
   * Track performance metrics
   */
  trackPerformance(metric: PerformanceMetric) {
    this.trackEvent({
      event: 'performance_metric',
      category: 'performance',
      action: 'web_vital',
      label: metric.name,
      value: metric.value,
      custom_parameters: {
        performance_rating: metric.rating,
        metric_name: metric.name,
        metric_value: metric.value
      }
    })
  }

  /**
   * Track conversion funnel steps
   */
  trackFunnelStep(step: string, funnel: string, metadata?: Record<string, any>) {
    this.trackEvent({
      event: 'funnel_step',
      category: 'conversion',
      action: 'funnel_progress',
      label: `${funnel}_${step}`,
      custom_parameters: {
        funnel_name: funnel,
        funnel_step: step,
        ...metadata
      }
    })
  }

  /**
   * Track page views with enhanced data
   */
  trackPageView(page?: string) {
    const pageUrl = page || window.location.pathname
    
    this.trackEvent({
      event: 'page_view',
      category: 'engagement',
      action: 'page_view',
      label: pageUrl,
      custom_parameters: {
        page_location: window.location.href,
        page_referrer: document.referrer,
        scroll_depth: 0
      }
    })

    // Track scroll depth
    this.trackScrollDepth(pageUrl)
  }

  /**
   * Track scroll depth for engagement analysis
   */
  private trackScrollDepth(pageUrl: string) {
    let maxScroll = 0
    const thresholds = [25, 50, 75, 90, 100]
    const tracked = new Set<number>()

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      maxScroll = Math.max(maxScroll, scrollPercent)

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold)
          this.trackEvent({
            event: 'scroll_depth',
            category: 'engagement',
            action: 'scroll',
            label: `${threshold}%`,
            value: threshold,
            custom_parameters: {
              page_url: pageUrl,
              max_scroll: maxScroll
            }
          })
        }
      })
    }

    window.addEventListener('scroll', trackScroll, { passive: true })
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      window.removeEventListener('scroll', trackScroll)
    })
  }

  /**
   * Send data to custom analytics endpoint
   */
  private async sendToCustomAnalytics(event: string, data: any) {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event,
          data,
          timestamp: Date.now()
        })
      })
    } catch (error) {
      // Silently fail for analytics
      console.warn('Custom analytics failed:', error)
    }
  }
}

// Singleton instance
const analytics = AnalyticsManager.getInstance()

// Predefined tracking functions for common events
export const trackingEvents = {
  // Hero section events
  heroCTA: (cta_text: string) => analytics.trackEvent({
    event: 'cta_click',
    category: 'hero',
    action: 'click',
    label: 'primary_cta',
    custom_parameters: { cta_text }
  }),

  // Calculator events
  calculatorStart: () => analytics.trackEvent({
    event: 'calculator_start',
    category: 'tools',
    action: 'start',
    label: 'roi_calculator'
  }),

  calculatorComplete: (roi: number, inputs: Record<string, any>) => analytics.trackEvent({
    event: 'calculator_complete',
    category: 'tools',
    action: 'complete',
    label: 'roi_calculator',
    value: roi,
    custom_parameters: { ...inputs, calculated_roi: roi }
  }),

  // Case study engagement
  caseStudyView: (case_id: string) => analytics.trackEvent({
    event: 'case_study_view',
    category: 'content',
    action: 'view',
    label: case_id
  }),

  // Contact form events
  contactFormStart: () => analytics.trackEvent({
    event: 'contact_form_start',
    category: 'conversion',
    action: 'start',
    label: 'contact_form'
  }),

  contactFormSubmit: (form_data: Record<string, any>) => analytics.trackEvent({
    event: 'contact_form_submit',
    category: 'conversion',
    action: 'submit',
    label: 'contact_form',
    custom_parameters: form_data
  }),

  // Performance budget violations
  performanceBudgetViolation: (metric: string, value: number, budget: number) => analytics.trackEvent({
    event: 'performance_budget_violation',
    category: 'performance',
    action: 'budget_violation',
    label: metric,
    value: value,
    custom_parameters: {
      metric_name: metric,
      metric_value: value,
      budget_limit: budget,
      violation_percentage: ((value - budget) / budget * 100).toFixed(1)
    }
  })
}

// Export main functions
export function initializeAnalytics() {
  analytics.initialize()
}

export function trackEvent(event: TrackingEvent) {
  analytics.trackEvent(event)
}

export function trackPageView(page?: string) {
  analytics.trackPageView(page)
}

export function trackPerformance(metric: PerformanceMetric) {
  analytics.trackPerformance(metric)
}

export function trackFunnelStep(step: string, funnel: string, metadata?: Record<string, any>) {
  analytics.trackFunnelStep(step, funnel, metadata)
}

// Export analytics instance for advanced usage
export { analytics }

// Global type declarations
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void
  }
}
