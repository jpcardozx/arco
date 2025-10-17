/**
 * Rate Limiting System
 * 
 * Sistema inteligente de rate limiting para proteção contra abuse
 * Usa sliding window algorithm para precisão e fairness
 */

import { LRUCache } from 'lru-cache';

interface RateLimitConfig {
  windowMs: number; // Janela de tempo em ms
  maxRequests: number; // Máximo de requests na janela
  message?: string; // Mensagem customizada
}

interface RateLimitEntry {
  timestamps: number[];
  blockedUntil?: number;
}

class RateLimiter {
  private cache: LRUCache<string, RateLimitEntry>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
    this.cache = new LRUCache({
      max: 10000, // Máximo de IPs/keys no cache
      ttl: config.windowMs * 2, // TTL = 2x window para cleanup
    });
  }

  /**
   * Verifica se request está dentro do rate limit
   */
  async check(key: string): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
    const now = Date.now();
    const entry = this.cache.get(key) || { timestamps: [] };

    // Se está bloqueado temporariamente
    if (entry.blockedUntil && entry.blockedUntil > now) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: entry.blockedUntil,
      };
    }

    // Remove timestamps fora da janela (sliding window)
    const windowStart = now - this.config.windowMs;
    entry.timestamps = entry.timestamps.filter(ts => ts > windowStart);

    // Verifica se excedeu limite
    if (entry.timestamps.length >= this.config.maxRequests) {
      // Bloqueia até a janela resetar
      const oldestRequest = Math.min(...entry.timestamps);
      const resetAt = oldestRequest + this.config.windowMs;
      
      entry.blockedUntil = resetAt;
      this.cache.set(key, entry);

      return {
        allowed: false,
        remaining: 0,
        resetAt,
      };
    }

    // Adiciona novo timestamp
    entry.timestamps.push(now);
    this.cache.set(key, entry);

    return {
      allowed: true,
      remaining: this.config.maxRequests - entry.timestamps.length,
      resetAt: now + this.config.windowMs,
    };
  }

  /**
   * Reseta rate limit para uma key
   */
  reset(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpa todo o cache
   */
  clear(): void {
    this.cache.clear();
  }
}

// Rate limiters para diferentes endpoints
export const createPreferenceLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minuto
  maxRequests: 5, // 5 requests por minuto
  message: 'Muitas tentativas de criar preferência. Tente novamente em 1 minuto.',
});

export const webhookLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minuto
  maxRequests: 60, // 60 webhooks por minuto (1 por segundo)
  message: 'Rate limit excedido para webhooks.',
});

export const testPageLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minuto
  maxRequests: 10, // 10 requests por minuto
  message: 'Muitas requisições na página de teste. Aguarde 1 minuto.',
});

/**
 * Middleware helper para Next.js API routes
 */
export async function checkRateLimit(
  limiter: RateLimiter,
  identifier: string
): Promise<{
  success: boolean;
  remaining: number;
  resetAt: number;
  error?: string;
}> {
  const result = await limiter.check(identifier);

  if (!result.allowed) {
    const resetIn = Math.ceil((result.resetAt - Date.now()) / 1000);
    return {
      success: false,
      remaining: 0,
      resetAt: result.resetAt,
      error: `Rate limit excedido. Tente novamente em ${resetIn}s.`,
    };
  }

  return {
    success: true,
    remaining: result.remaining,
    resetAt: result.resetAt,
  };
}

/**
 * Helper para extrair IP do request
 */
export function getClientIp(request: Request): string {
  // Vercel/Cloudflare
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return 'unknown';
}

/**
 * Exemplo de uso em API route:
 * 
 * export async function POST(request: Request) {
 *   const ip = getClientIp(request);
 *   const rateLimit = await checkRateLimit(createPreferenceLimiter, ip);
 *   
 *   if (!rateLimit.success) {
 *     return NextResponse.json(
 *       { error: rateLimit.error },
 *       {
 *         status: 429,
 *         headers: {
 *           'X-RateLimit-Remaining': rateLimit.remaining.toString(),
 *           'X-RateLimit-Reset': rateLimit.resetAt.toString(),
 *         },
 *       }
 *     );
 *   }
 *   
 *   // Continue with request...
 * }
 */
