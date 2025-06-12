import { type NextWebVitalsMetric } from 'next/app';

// Constants
const BATCH_SIZE = 10;
const BATCH_INTERVAL = 2000; // 2 seconds

// Types
interface AnalyticsEvent {
  name: string;
  data: Record<string, unknown>;
  timestamp: number;
}

// Singleton for analytics management
class AnalyticsManager {
  private static instance: AnalyticsManager;
  private eventQueue: AnalyticsEvent[] = [];
  private isProcessing = false;
  private batchTimeout: NodeJS.Timeout | null = null;

  private constructor() {
    // Initialize with window unload handler
    if (typeof window !== 'undefined') {
      window.addEventListener('unload', () => this.flush());
    }
  }

  static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  // Add event to queue
  public track(name: string, data: Record<string, unknown> = {}) {
    this.eventQueue.push({
      name,
      data,
      timestamp: Date.now(),
    });

    this.scheduleBatch();
  }

  // Schedule batch processing
  private scheduleBatch() {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout);
    }

    this.batchTimeout = setTimeout(() => {
      this.processBatch();
    }, BATCH_INTERVAL);

    if (this.eventQueue.length >= BATCH_SIZE) {
      this.processBatch();
    }
  }

  // Process batch of events
  private async processBatch() {
    if (this.isProcessing || this.eventQueue.length === 0) return;

    this.isProcessing = true;
    const batch = this.eventQueue.splice(0, BATCH_SIZE);

    try {
      await this.sendBatch(batch);
    } catch (error) {
      console.error('Failed to send analytics batch:', error);
      // Requeue failed events
      this.eventQueue = [...batch, ...this.eventQueue];
    }

    this.isProcessing = false;
  }

  // Send batch to analytics endpoint
  private async sendBatch(batch: AnalyticsEvent[]) {
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(batch)], {
        type: 'application/json',
      });
      navigator.sendBeacon('/api/analytics', blob);
    } else {
      await fetch('/api/analytics', {
        method: 'POST',
        body: JSON.stringify(batch),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      });
    }
  }

  // Flush remaining events
  public flush() {
    if (this.eventQueue.length > 0) {
      this.processBatch();
    }
  }
}

// Exported analytics functions
export const trackEvent = (name: string, data: Record<string, unknown> = {}) => {
  AnalyticsManager.getInstance().track(name, data);
};

export const trackPageView = (page: string, additionalData: Record<string, unknown> = {}) => {
  trackEvent('pageview', { page, ...additionalData });
};

export const trackComponentPerformance = (
  componentName: string,
  duration: number,
  metadata: Record<string, unknown> = {}
) => {
  trackEvent('component_performance', {
    component: componentName,
    duration,
    ...metadata,
  });
};

export function sendWebVitals(metric: NextWebVitalsMetric) {
  trackEvent('web_vitals', {
    id: metric.id,
    name: metric.name,
    value: metric.value,
    label: metric.label,
  });
}

// Tracking para passos do funil de conversão
export const trackFunnelStep = (
  step: string,
  action: string,
  metadata: Record<string, unknown> = {}
) => {
  trackEvent('funnel_step', {
    step,
    action,
    ...metadata,
    timestamp: new Date().toISOString(),
  });
};
