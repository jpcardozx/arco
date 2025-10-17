/**
 * Dashboard Activity Logger
 * 
 * Logs user activities in the dashboard for analytics and debugging
 */

import { getSupabaseClient } from './client'

export type ActivityType = 
  | 'page_view'
  | 'navigation'
  | 'action'
  | 'error'
  | 'auth'
  | 'api_call'

export interface ActivityLog {
  user_id?: string
  activity_type: ActivityType
  activity_name: string
  metadata?: Record<string, any>
  timestamp: string
  session_id?: string
}

class DashboardLogger {
  private sessionId: string
  private userId?: string
  private enabled: boolean

  constructor() {
    this.sessionId = this.generateSessionId()
    this.enabled = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENABLE_LOGS === 'true'
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  private async logToConsole(log: ActivityLog) {
    const emoji = this.getEmoji(log.activity_type)
    console.log(
      `${emoji} [${log.activity_type.toUpperCase()}] ${log.activity_name}`,
      log.metadata || ''
    )
  }

  private getEmoji(type: ActivityType): string {
    const emojiMap: Record<ActivityType, string> = {
      page_view: '📄',
      navigation: '🧭',
      action: '⚡',
      error: '🔴',
      auth: '🔐',
      api_call: '🌐',
    }
    return emojiMap[type] || '📝'
  }

  private async logToSupabase(log: ActivityLog) {
    if (!this.enabled) return

    try {
      const supabase = getSupabaseClient()
      
      // Check if logs table exists, if not, just log to console
      const { error } = await supabase
        .from('activity_logs' as any)
        .insert({
          user_id: log.user_id,
          activity_type: log.activity_type,
          activity_name: log.activity_name,
          metadata: log.metadata,
          session_id: log.session_id,
          created_at: log.timestamp,
        } as any)

      if (error) {
        // Table might not exist yet, that's ok
        console.warn('Activity log to DB failed (table might not exist):', error.message)
      }
    } catch (error) {
      // Silently fail - logging should never break the app
      console.warn('Failed to log to Supabase:', error)
    }
  }

  async log(
    type: ActivityType,
    name: string,
    metadata?: Record<string, any>
  ) {
    const log: ActivityLog = {
      user_id: this.userId,
      activity_type: type,
      activity_name: name,
      metadata,
      timestamp: new Date().toISOString(),
      session_id: this.sessionId,
    }

    // Always log to console in development
    if (this.enabled) {
      await this.logToConsole(log)
    }

    // Optionally log to Supabase
    await this.logToSupabase(log)
  }

  // Convenience methods
  pageView(path: string, metadata?: Record<string, any>) {
    return this.log('page_view', path, metadata)
  }

  navigation(from: string, to: string) {
    return this.log('navigation', 'route_change', { from, to })
  }

  action(actionName: string, metadata?: Record<string, any>) {
    return this.log('action', actionName, metadata)
  }

  error(errorName: string, error: Error | string, metadata?: Record<string, any>) {
    return this.log('error', errorName, {
      ...metadata,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
    })
  }

  auth(event: 'login' | 'logout' | 'signup', metadata?: Record<string, any>) {
    return this.log('auth', event, metadata)
  }

  apiCall(endpoint: string, method: string, metadata?: Record<string, any>) {
    return this.log('api_call', `${method} ${endpoint}`, metadata)
  }
}

// Singleton instance
export const dashboardLogger = new DashboardLogger()

// Hook for easy usage in components
export function useDashboardLogger() {
  return dashboardLogger
}
