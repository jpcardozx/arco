import { NextRequest, NextResponse } from 'next/server';
import {
  validateWebhookSignature,
  checkWebhookExists,
  storeWebhookEvent,
  processWebhook,
  markWebhookProcessed,
} from '@/lib/payments/mercadopago/webhooks';

// Maximum request body size (5MB)
const MAX_BODY_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Extract headers
    const signature = request.headers.get('x-signature');
    const requestId = request.headers.get('x-request-id');
    const contentType = request.headers.get('content-type');

    console.log('Webhook received:', {
      signature: signature ? 'present' : 'missing',
      requestId: requestId ? 'present' : 'missing',
      contentType,
      timestamp: new Date().toISOString(),
    });

    // Validate headers
    if (!signature) {
      console.error('Missing x-signature header');
      return new Response('Missing signature', { status: 401 });
    }

    if (!requestId) {
      console.error('Missing x-request-id header');
      return new Response('Missing request ID', { status: 400 });
    }

    // Read body
    const bodyBuffer = await request.arrayBuffer();
    
    // Check body size
    if (bodyBuffer.byteLength > MAX_BODY_SIZE) {
      console.error('Request body too large:', bodyBuffer.byteLength);
      return new Response('Request body too large', { status: 413 });
    }

    const body = new TextDecoder().decode(bodyBuffer);
    
    if (!body) {
      console.error('Empty request body');
      return new Response('Empty body', { status: 400 });
    }

    console.log('Webhook body preview:', body.substring(0, 200) + '...');

    // Validate signature (MP sends in specific format)
    const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET;
    
    if (!secret) {
      console.error('MERCADOPAGO_WEBHOOK_SECRET not configured');
      // Allow in development for testing
      if (process.env.NODE_ENV === 'production') {
        return new Response('Server configuration error', { status: 500 });
      }
      console.warn('⚠️ Skipping signature validation (development mode)');
    } else {
      const isValidSignature = validateWebhookSignature(signature, body, secret);
      
      if (!isValidSignature) {
        console.error('Invalid webhook signature', {
          signatureReceived: signature.substring(0, 20) + '...',
          secretConfigured: secret.substring(0, 10) + '...',
        });
        // Allow in development for initial testing
        if (process.env.NODE_ENV === 'production') {
          return new Response('Invalid signature', { status: 401 });
        }
        console.warn('⚠️ Signature invalid but allowing (development mode)');
      } else {
        console.log('✅ Webhook signature validated');
      }
    }

    // Check idempotency
    const alreadyProcessed = await checkWebhookExists(requestId);
    
    if (alreadyProcessed) {
      console.log('Webhook already processed:', requestId);
      return new Response('Already processed', { status: 200 });
    }

    // Parse event
    let event;
    try {
      event = JSON.parse(body);
    } catch (parseError) {
      console.error('Invalid JSON body:', parseError);
      return new Response('Invalid JSON', { status: 400 });
    }

    // Validate event structure (flexible for test events)
    if (!event.data) {
      console.error('Invalid event structure - missing data field:', event);
      return new Response('Invalid event structure', { status: 400 });
    }
    
    // For test events, data.id might be a string
    if (!event.data.id) {
      console.warn('Event has no data.id, might be a test event:', event);
      // Don't reject, just log
    }

    console.log('Processing event:', {
      type: event.type,
      action: event.action,
      dataId: event.data?.id || 'N/A',
      liveMode: event.live_mode,
      isTest: event.type === 'test',
    });

    // Store webhook event for audit trail
    console.log('🟡 [Webhook Route] About to store webhook event...');
    console.log('🟡 [Webhook Route] Request ID:', requestId);
    console.log('🟡 [Webhook Route] Event object:', JSON.stringify(event, null, 2));
    
    try {
      const webhookId = await storeWebhookEvent(event, requestId);
      console.log('✅ [Webhook Route] Webhook event stored with ID:', webhookId);
    } catch (storeError) {
      console.error('❌ [Webhook Route] Failed to store webhook event:', storeError);
      console.error('❌ [Webhook Route] Store error details:', JSON.stringify(storeError, null, 2));
      // Continue processing even if storage fails
    }

    // Process webhook (skip for test events)
    if (event.type !== 'test') {
      try {
        await processWebhook(event);
        console.log('✅ Webhook processed');
      } catch (processError) {
        console.error('Failed to process webhook:', processError);
        // Mark as failed but return 200 to MP
        await markWebhookProcessed(requestId, false, String(processError));
      }
    } else {
      console.log('⚠️ Test event, skipping processing');
    }

    // Mark as processed
    try {
      await markWebhookProcessed(requestId, true);
    } catch (markError) {
      console.error('Failed to mark webhook as processed:', markError);
      // Don't fail the request
    }

    const processingTime = Date.now() - startTime;
    console.log(`✅ Webhook completed in ${processingTime}ms`);

    return new Response('OK', { 
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'X-Processing-Time': processingTime.toString(),
      }
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error('Webhook handler error:', error);
    
    // Return 500 for unexpected errors (will trigger retry)
    return new Response('Internal server error', { 
      status: 500,
      headers: {
        'X-Processing-Time': processingTime.toString(),
      }
    });
  }
}

// Only POST method is allowed
export async function GET() {
  return new Response('Method not allowed', { status: 405 });
}

export async function PUT() {
  return new Response('Method not allowed', { status: 405 });
}

export async function DELETE() {
  return new Response('Method not allowed', { status: 405 });
}

export async function PATCH() {
  return new Response('Method not allowed', { status: 405 });
}

// Determine if error is temporary (should retry) or permanent
function isTemporaryError(error: Error): boolean {
  const temporaryErrorPatterns = [
    'timeout',
    'connection',
    'network',
    'service unavailable',
    'rate limit',
    'too many requests',
  ];

  const errorMessage = error.message.toLowerCase();
  
  return temporaryErrorPatterns.some(pattern => 
    errorMessage.includes(pattern)
  );
}

// Health check endpoint
export async function HEAD() {
  return new Response(null, { 
    status: 200,
    headers: {
      'X-Webhook-Status': 'healthy',
      'X-Timestamp': new Date().toISOString(),
    }
  });
}