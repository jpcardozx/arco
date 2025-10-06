/**
 * Hooks Barrel Export
 * Centralized exports for all React Query hooks
 */

// User hooks
export { useUserStats } from './use-user-stats'
export { useUserTasks } from './use-user-tasks'
export { useUserLeads } from './use-user-leads'

// Client hooks
export { useClientMetrics } from './use-client-metrics'
export {
  useClientDomain,
  type DomainData,
  type SSLData,
  type DNSData,
  type DNSRecord,
  type PerformanceData,
  type PageData
} from './use-client-domain'
export { useClientTimeline, type TimelineEvent } from './use-client-timeline'

// Admin hooks
export { useAdminStats, useConversionMetrics, useMonthlyRevenue } from './use-admin'
