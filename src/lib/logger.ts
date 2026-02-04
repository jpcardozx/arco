/**
 * Production-ready logger using Pino
 * Auto-configures based on environment
 */

import pino from 'pino'

const isDevelopment = process.env.NODE_ENV === 'development'
const isServer = typeof window === 'undefined'

// Configuração do logger
export const logger = isServer
  ? pino({
      level: isDevelopment ? 'debug' : 'info',
      transport: isDevelopment
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              translateTime: 'SYS:standard',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
      formatters: {
        level: (label) => {
          return { level: label }
        },
      },
    })
  : // Browser fallback
    {
      debug: (...args: any[]) => console.debug('[DEBUG]', ...args),
      info: (...args: any[]) => console.info('[INFO]', ...args),
      warn: (...args: any[]) => console.warn('[WARN]', ...args),
      error: (...args: any[]) => console.error('[ERROR]', ...args),
      fatal: (...args: any[]) => console.error('[FATAL]', ...args),
      trace: (...args: any[]) => console.trace('[TRACE]', ...args),
      child: () => logger,
    } as any

// Helper functions para logging estruturado
export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error(
    {
      err: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      context,
      timestamp: new Date().toISOString(),
    },
    'Error occurred'
  )
}

export const logPerformance = (metric: string, duration: number, metadata?: Record<string, any>) => {
  logger.info(
    {
      metric,
      duration,
      ...metadata,
    },
    'Performance metric'
  )
}

export default logger
