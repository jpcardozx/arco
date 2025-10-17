import { NextRequest, NextResponse } from 'next/server';
import { createPreferenceLimiter, getClientIp, checkRateLimit } from '@/lib/rate-limiting/checkout-limiter';
import { logger } from '@/lib/logger';

// CORS headers para desenvolvimento
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NODE_ENV === 'development' ? '*' : process.env.NEXT_PUBLIC_APP_URL || '',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  logger.info('[Analytics API] Request received', {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
  });

  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimit = await checkRateLimit(createPreferenceLimiter, clientIp);

    if (!rateLimit.success) {
      logger.warn('[Analytics API] Rate limit exceeded', { ip: clientIp });
      return NextResponse.json(
        { error: rateLimit.error },
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetAt.toString(),
            'Retry-After': Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // Body da request
    const body = await request.json();
    logger.info('[Analytics API] Body parsed', { body });

    const { event, userId, planId, planName, value, currency, metadata } = body;

    // Validação básica
    if (!event || !planId) {
      logger.error('[Analytics API] Validation failed', { event, planId });
      return NextResponse.json(
        { error: 'Missing required fields', details: { event: !!event, planId: !!planId } },
        { status: 400, headers: corsHeaders }
      );
    }

    // Log estruturado com winston
    logger.info('[Analytics] Event tracked:', {
      event,
      userId,
      planId,
      planName,
      value,
      currency,
      metadata,
      timestamp: new Date().toISOString(),
      ip: clientIp,
    });

    // TODO: Implementar integração com:
    // - Google Analytics 4 (server-side)
    // - Mixpanel
    // - Amplitude
    // - Database (analytics_events table)

    logger.info('[Analytics API] Event tracked successfully', {
      event,
      planId,
      userId: userId || 'anonymous',
    });

    return NextResponse.json(
      { success: true, tracked: { event, planId, timestamp: new Date().toISOString() } },
      {
        headers: {
          ...corsHeaders,
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
          'X-RateLimit-Reset': rateLimit.resetAt.toString(),
        },
      }
    );
  } catch (error) {
    logger.error('[Analytics API] Error tracking event:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500, headers: corsHeaders }
    );
  }
}
