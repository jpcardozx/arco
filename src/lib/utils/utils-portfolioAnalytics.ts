// Portfolio-specific analytics tracking
// import { sendWebVitals } from '../../app/api/analytics';

// Basic analytics function for now
const sendWebVitals = (data: any) => {
  console.log('Analytics:', data);
};

interface PortfolioEvent {
  eventName: string;
  section: string;
  action?: string;
  value?: string | number;
  timestamp?: number;
}

// Track portfolio-specific events
export function trackPortfolioEvent({
  eventName,
  section,
  action = 'view',
  value = '',
}: PortfolioEvent) {
  if (typeof window === 'undefined') return;
  try {
    // Send to your analytics platform if configured
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, {
        event_category: 'portfolio',
        event_label: section,
        value: value,
      });
    }

    // Store in localStorage for session analysis
    const sessionEvents = JSON.parse(localStorage.getItem('portfolio_events') || '[]');
    sessionEvents.push({
      eventName,
      section,
      action,
      value,
      timestamp: Date.now(),
    });
    localStorage.setItem('portfolio_events', JSON.stringify(sessionEvents));

    // Console log during development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Portfolio Event: ${eventName} | Section: ${section} | Action: ${action}`);
    }
  } catch (error) {
    console.error('Error tracking portfolio event:', error);
  }
}

// Track section visibility
export function trackSectionVisibility(sectionId: string, isVisible: boolean) {
  if (isVisible) {
    trackPortfolioEvent({
      eventName: 'section_view',
      section: sectionId,
      action: 'view',
    });
  }
}

// Track call to action interactions
export function trackCTAInteraction(ctaId: string, ctaText: string) {
  trackPortfolioEvent({
    eventName: 'cta_click',
    section: ctaId,
    action: 'click',
    value: ctaText,
  });
}

// Track case study engagement
export function trackCaseStudyEngagement(caseStudyId: string, action: 'view' | 'expand' | 'share') {
  trackPortfolioEvent({
    eventName: 'case_study_interaction',
    section: caseStudyId,
    action: action,
  });
}

// Initialize tracking for portfolio page
export function initPortfolioTracking() {
  if (typeof window === 'undefined') return;

  trackPortfolioEvent({
    eventName: 'portfolio_view',
    section: 'portfolio',
    action: 'pageview',
  });

  // Track time spent
  const startTime = Date.now();

  // Track when user leaves the page
  window.addEventListener('beforeunload', () => {
    const timeSpentSeconds = Math.floor((Date.now() - startTime) / 1000);
    trackPortfolioEvent({
      eventName: 'time_on_portfolio',
      section: 'portfolio',
      value: timeSpentSeconds,
    });
  });
}
