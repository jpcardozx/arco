'use client';

/**
 * EMQ Monitoring - Stub
 */

export interface EMQStats {
  score: number;
  level: string;
}

export interface EMQAlert {
  type: string;
  message: string;
}

export const EMQ_THRESHOLDS = {
  LOW: 3,
  MEDIUM: 5,
  HIGH: 7,
};

export function initEMQMonitoring() {
  // Stub
}

export function evaluateEMQ(data: any) {
  return 0;
}

export function trackEMQ(event: string, data: any) {
  // Stub
}

export function getEMQStats(): EMQStats {
  return { score: 0, level: 'low' };
}

export function getEMQRecommendations(): string[] {
  return [];
}

export function getFacebookCookies(): any[] {
  return [];
}

export function isMetaPixelLoaded(): boolean {
  return false;
}

export default { 
  initEMQMonitoring, 
  evaluateEMQ, 
  trackEMQ,
  getEMQStats,
  getEMQRecommendations,
  getFacebookCookies,
  isMetaPixelLoaded,
  EMQ_THRESHOLDS
};
