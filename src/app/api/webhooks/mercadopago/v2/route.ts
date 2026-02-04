import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';
import crypto from 'crypto';

// Helper to get Supabase client (lazy initialization)
async function getSupabaseClient() {
  return await createSupabaseAdmin();
}

/**
 * Valida signature do webhook Mercado Pago
 */
function validateWebhookSignature(
  signature: string,
  body: string,
  secret: string
): boolean {
  try {
    // MP envia: ts=<timestamp>,v1=<hash>
    const parts = signature.split(',');
    const tsMatch = parts.find(p => p.startsWith('ts='));
    const v1Match = parts.find(p => p.startsWith('v1='));
    
    if (!tsMatch || !v1Match) {
      return false;
    }
    
    const timestamp = tsMatch.split('=')[1];
    const receivedHash = v1Match.split('=')[1];
    
    // Construir payload: id + request_id + timestamp
    const payload = `${timestamp}.${body}`;
    
    // Calcular HMAC SHA256
    const expectedHash = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(receivedHash),
      Buffer.from(expectedHash)
    );
  } catch (error) {
    logger.error('Signature validation error', { error });
    return false;
  }
}

/**
 * POST /api/webhooks/mercadopago/v2
 * 
 * Webhook handler integrado com Supabase
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    const supabase = await getSupabaseClient();
    
    // 1. Extract headers
    const signature = request.headers.get('x-signature');
    const requestId = request.headers.get('x-request-id');
    
    logger.info('Webhook received', {
      signature: signature ? 'present' : 'missing',
      requestId,
      timestamp: new Date().toISOString(),
    });

    // 2. Validate headers
    if (!signature) {
      logger.error('Missing x-signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 401 }
      );
    }

    if (!requestId) {
      logger.error('Missing x-request-id header');
      return NextResponse.json(
        { error: 'Missing request ID' },
        { status: 400 }
      );
    }

    // 3. Read body
    const bodyText = await request.text();
    
    if (!bodyText) {
      logger.error('Empty request body');
      return NextResponse.json(
        { error: 'Empty body' },
        { status: 400 }
      );
    }

    // 4. Validate signature
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    
    if (secret && process.env.NODE_ENV === 'production') {
      const isValid = validateWebhookSignature(signature, bodyText, secret);
      
      if (!isValid) {
        logger.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
      
      logger.info('Webhook signature validated');
    } else {
      logger.warn('Skipping signature validation (development mode)');
    }

    // 5. Parse event
    let event;
    try {
      event = JSON.parse(bodyText);
    } catch (parseError) {
      logger.error('Invalid JSON body', { error: parseError });
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // 6. Validate event structure
    if (!event.data?.id) {
      logger.error('Invalid event structure', { event });
      return NextResponse.json(
        { error: 'Invalid event structure' },
        { status: 400 }
      );
    }

    logger.info('Processing webhook event', {
      type: event.type,
      action: event.action,
      dataId: event.data.id,
      liveMode: event.live_mode,
    });

    // 7. Process webhook via Supabase function
    const { data, error } = await supabase.rpc('process_webhook_event', {
      p_gateway: 'mercadopago',
      p_gateway_event_id: requestId,
      p_event_type: event.type || 'unknown',
      p_payload: event,
    });

    if (error) {
      logger.error('Webhook processing error', { error, event });
      
      // Return 200 even on error (to prevent MP retries for invalid data)
      return NextResponse.json(
        { 
          success: false, 
          error: error.message,
          webhook_id: requestId 
        },
        { status: 200 }
      );
    }

    const processingTime = Date.now() - startTime;
    
    logger.info('Webhook processed successfully', {
      result: data,
      processingTime,
    });

    return NextResponse.json(
      {
        success: true,
        data,
        processing_time: processingTime,
      },
      { status: 200 }
    );

  } catch (error) {
    const processingTime = Date.now() - startTime;
    
    logger.error('Webhook handler error', {
      error,
      processingTime,
    });
    
    // Return 500 for unexpected errors (will trigger retry)
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

/**
 * HEAD /api/webhooks/mercadopago/v2
 * Health check
 */
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'X-Webhook-Status': 'healthy',
      'X-Timestamp': new Date().toISOString(),
    },
  });
}

/**
 * GET /api/webhooks/mercadopago/v2
 * Method not allowed
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
