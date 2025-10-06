/**
 * Dashboard Logger
 * Sistema de logging otimizado com performance tracking e debugging avançado
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'success'

interface LogEntry {
  level: LogLevel
  context: string
  message: string
  data?: unknown
  timestamp: string
  duration?: number
}

class DashboardLogger {
  private isDev = process.env.NODE_ENV === 'development'
  private logs: LogEntry[] = []
  private timers: Map<string, number> = new Map()

  private getIcon(level: LogLevel): string {
    const icons = {
      info: 'ℹ️',
      warn: '⚠️',
      error: '🔴',
      debug: '🐛',
      success: '✅'
    }
    return icons[level]
  }

  private getColor(level: LogLevel): string {
    const colors = {
      info: '#3b82f6',
      warn: '#f59e0b',
      error: '#ef4444',
      debug: '#8b5cf6',
      success: '#10b981'
    }
    return colors[level]
  }

  private formatLog(entry: LogEntry): void {
    if (!this.isDev) return

    const { level, context, message, data, timestamp, duration } = entry
    const icon = this.getIcon(level)
    const color = this.getColor(level)

    console.group(
      `%c${icon} [${context}] ${message}`,
      `color: ${color}; font-weight: bold;`
    )
    console.log('Time:', timestamp)
    if (duration !== undefined) {
      console.log(`Duration: ${duration}ms`)
    }
    if (data !== undefined) {
      console.log('Data:', data)
    }
    console.groupEnd()
  }

  private createEntry(
    level: LogLevel,
    context: string,
    message: string,
    data?: unknown,
    duration?: number
  ): LogEntry {
    const entry: LogEntry = {
      level,
      context,
      message,
      data,
      timestamp: new Date().toISOString(),
      duration
    }
    this.logs.push(entry)
    this.formatLog(entry)
    return entry
  }

  info(context: string, message: string, data?: unknown): void {
    this.createEntry('info', context, message, data)
  }

  warn(context: string, message: string, data?: unknown): void {
    this.createEntry('warn', context, message, data)
  }

  error(context: string, message: string, error?: unknown): void {
    this.createEntry('error', context, message, error)
  }

  debug(context: string, message: string, data?: unknown): void {
    this.createEntry('debug', context, message, data)
  }

  success(context: string, message: string, data?: unknown): void {
    this.createEntry('success', context, message, data)
  }

  // Performance tracking
  startTimer(key: string): void {
    this.timers.set(key, performance.now())
  }

  endTimer(key: string, context: string, message: string): number {
    const start = this.timers.get(key)
    if (start === undefined) {
      this.warn('Timer', `Timer '${key}' not found`)
      return 0
    }

    const duration = Math.round(performance.now() - start)
    this.timers.delete(key)
    this.createEntry('info', context, message, undefined, duration)
    return duration
  }

  // Query logging
  logQuery(
    queryKey: string[],
    status: 'loading' | 'success' | 'error',
    data?: unknown,
    error?: unknown
  ): void {
    const context = `Query: ${queryKey.join('.')}`
    
    switch (status) {
      case 'loading':
        this.debug(context, 'Fetching data...')
        break
      case 'success':
        this.success(context, 'Data fetched successfully', data)
        break
      case 'error':
        this.error(context, 'Query failed', error)
        break
    }
  }

  // Hook lifecycle logging
  logHookMount(hookName: string, params?: unknown): void {
    this.info(`Hook: ${hookName}`, 'Mounted', params)
  }

  logHookUnmount(hookName: string): void {
    this.info(`Hook: ${hookName}`, 'Unmounted')
  }

  // Get all logs
  getLogs(): LogEntry[] {
    return [...this.logs]
  }

  // Clear logs
  clearLogs(): void {
    this.logs = []
    this.timers.clear()
    if (this.isDev) {
      console.clear()
      console.log('🧹 Logs cleared')
    }
  }

  // Export logs as JSON
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }
}

// Singleton instance
export const dashboardLogger = new DashboardLogger()

// Utility functions
export function logApiCall(endpoint: string, method: string, data?: unknown): void {
  dashboardLogger.info('API', `${method} ${endpoint}`, data)
}

export function logApiError(endpoint: string, error: unknown): void {
  dashboardLogger.error('API', `Failed: ${endpoint}`, error)
}

export function logApiSuccess(endpoint: string, data: unknown, duration?: number): void {
  dashboardLogger.success('API', `Success: ${endpoint}`, { data, duration })
}
