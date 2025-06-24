/**
 * ARCO PATCH 1: API Performance Architecture
 * tRPC with response caching, rate limiting, error handling
 * Target: <50ms P95 API response time
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Rate limiting implementation
const rateLimitMap = new Map()

interface RateLimit {
  count: number
  resetTime: number
}

function rateLimit(identifier: string, limit = 100, windowMs = 60000): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(identifier) as RateLimit

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }

  if (userLimit.count >= limit) {
    return false
  }

  userLimit.count++
  return true
}

// Cache implementation
interface CacheEntry {
  data: any
  timestamp: number
  ttl: number
}

const apiCache = new Map<string, CacheEntry>()

function getCached(key: string): any | null {
  const entry = apiCache.get(key)
  
  if (!entry) return null
  
  if (Date.now() > entry.timestamp + entry.ttl) {
    apiCache.delete(key)
    return null
  }
  
  return entry.data
}

function setCache(key: string, data: any, ttl = 300000): void {
  apiCache.set(key, {
    data,
    timestamp: Date.now(),
    ttl
  })
}

// Input validation schemas
const domainAnalysisSchema = z.object({
  domain: z.string().url().max(253),
  options: z.object({
    includeSubdomains: z.boolean().optional().default(false),
    checkSecurity: z.boolean().optional().default(true),
    analyzePerformance: z.boolean().optional().default(true)
  }).optional().default({})
})

const webVitalsSchema = z.object({
  metric: z.enum(['LCP', 'FID', 'CLS', 'INP', 'FCP', 'TTFB']),
  value: z.number().positive(),
  rating: z.enum(['good', 'needs-improvement', 'poor']),
  url: z.string().url(),
  timestamp: z.number().int().positive(),
  deviceType: z.enum(['desktop', 'mobile']).optional(),
  connectionType: z.string().optional()
})

// Error handling
class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

function handleAPIError(error: unknown): NextResponse {
  console.error('API Error:', error)

  if (error instanceof APIError) {
    return NextResponse.json(
      { 
        error: error.message, 
        code: error.code,
        timestamp: new Date().toISOString()
      },
      { status: error.statusCode }
    )
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { 
        error: 'Validation failed', 
        details: error.errors,
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { 
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    },
    { status: 500 }
  )
}

// Performance monitoring
function trackAPIPerformance(endpoint: string, startTime: number) {
  const duration = Date.now() - startTime
  
  // Log slow queries
  if (duration > 1000) {
    console.warn(`Slow API call: ${endpoint} took ${duration}ms`)
  }
  
  // Send to monitoring service in production
  if (process.env.NODE_ENV === 'production') {
    // Implementation for APM service (DataDog, New Relic, etc.)
  }
}

// Middleware wrapper for performance and security
function withPerformance<T extends any[], R>(
  handler: (...args: T) => Promise<R>,
  options: {
    cache?: { ttl?: number; key?: (...args: T) => string }
    rateLimit?: { limit?: number; windowMs?: number }
    timeout?: number
  } = {}
): (...args: T) => Promise<R> {
  return async (...args: T): Promise<R> => {
    const startTime = Date.now()
    
    try {
      // Rate limiting
      if (options.rateLimit) {
        const identifier = getClientIdentifier(args[0] as NextRequest)
        if (!rateLimit(identifier, options.rateLimit.limit, options.rateLimit.windowMs)) {
          throw new APIError('Rate limit exceeded', 429, 'RATE_LIMIT_EXCEEDED')
        }
      }
      
      // Cache check
      if (options.cache) {
        const cacheKey = options.cache.key ? options.cache.key(...args) : JSON.stringify(args)
        const cached = getCached(cacheKey)
        if (cached) {
          return cached
        }
      }
      
      // Execute with timeout
      const result = options.timeout 
        ? await Promise.race([
            handler(...args),
            new Promise((_, reject) => 
              setTimeout(() => reject(new APIError('Request timeout', 408, 'TIMEOUT')), options.timeout)
            )
          ])
        : await handler(...args)
      
      // Cache result
      if (options.cache) {
        const cacheKey = options.cache.key ? options.cache.key(...args) : JSON.stringify(args)
        setCache(cacheKey, result, options.cache.ttl)
      }
      
      return result as R
    } finally {
      trackAPIPerformance('handler', startTime)
    }
  }
}

function getClientIdentifier(request: NextRequest): string {
  return request.headers.get('x-forwarded-for') || 
         request.headers.get('x-real-ip') || 
         'unknown'
}

// Export utilities
export {
  domainAnalysisSchema,
  webVitalsSchema,
  APIError,
  handleAPIError,
  withPerformance,
  rateLimit,
  getCached,
  setCache
}
