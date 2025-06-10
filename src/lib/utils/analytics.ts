/**
 * Módulo de Analytics
 * Responsável por rastrear eventos, visualizações de páginas e outros dados analíticos
 */

// Tipos básicos para analytics
export type EventData = Record<string, any>;

// Funções principais de analytics
export function trackEvent(eventName: string, eventData?: EventData): void {
  // Implementação real pode enviar para Google Analytics, Mixpanel, etc.
  console.info(`[Analytics] Event tracked: ${eventName}`, eventData || {});
}

export function trackPageView(pagePath: string, pageTitle?: string): void {
  console.info(`[Analytics] Page view: ${pagePath}`, { title: pageTitle });
}

export function trackFunnelStep(funnel: string, step: string, position: number, data?: EventData): void {
  console.info(`[Analytics] Funnel step: ${funnel} - ${step} (${position})`, data || {});
}

export function trackComponentPerformance(component: string, renderTime: number): void {
  console.info(`[Analytics] Component performance: ${component} - ${renderTime}ms`);
}

export function sendWebVitals(metric: any): void {
  console.info(`[Analytics] Web Vitals:`, metric);
}

// Exportar como módulo padrão
const analytics = {
  trackEvent,
  trackPageView,
  trackFunnelStep,
  trackComponentPerformance,
  sendWebVitals
};

export default analytics;