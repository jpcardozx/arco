/**
 * Meta Conversion Leads API
 *
 * P2.7: Send CRM status updates back to Meta for better lead optimization
 *
 * When to use:
 * - Lead qualified in CRM
 * - Appointment scheduled
 * - Customer showed up
 * - Customer purchased
 * - Lead lost
 *
 * This helps Meta optimize for QUALITY leads, not just volume.
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ============================================================================
// TYPES
// ============================================================================

interface ConversionLeadRequest {
  lead_id: string; // From Meta Lead Ads
  status: 'qualified' | 'scheduled' | 'showed' | 'purchased' | 'lost' | 'duplicate';
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
  timestamp?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const META_API_VERSION = 'v21.0';
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1677581716961792';
const META_ACCESS_TOKEN = process.env.META_CONVERSION_API_ACCESS_TOKEN;

if (!META_ACCESS_TOKEN) {
  console.error('❌ META_CONVERSION_API_ACCESS_TOKEN not configured');
}

// ============================================================================
// HELPERS
// ============================================================================

/**
 * Hash user data for Meta (SHA256)
 */
function hashData(value: string | undefined): string | undefined {
  if (!value) return undefined;

  // Normalize
  const normalized = value.toLowerCase().trim();

  // Hash
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Map internal status to Meta Conversion Leads status
 */
function mapStatus(status: string): string {
  const statusMap: Record<string, string> = {
    qualified: 'qualified',
    scheduled: 'scheduled',
    showed: 'completed', // Meta uses "completed" for showed
    purchased: 'purchased',
    lost: 'not_qualified',
    duplicate: 'duplicate',
  };

  return statusMap[status.toLowerCase()] || 'qualified';
}

// ============================================================================
// API ROUTE
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body: ConversionLeadRequest = await request.json();

    // Validate required fields
    if (!body.lead_id || !body.status) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: lead_id, status' },
        { status: 400 }
      );
    }

    if (!META_ACCESS_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'META_CONVERSION_API_ACCESS_TOKEN not configured' },
        { status: 500 }
      );
    }

    // Build Meta Conversion Leads payload
    const payload = {
      data: [
        {
          // Lead identification
          lead_id: body.lead_id,

          // Status update
          status: mapStatus(body.status),

          // User data (for matching)
          user_data: {
            em: hashData(body.email), // hashed email
            ph: hashData(body.phone), // hashed phone
          },

          // Custom data
          custom_data: {
            value: body.value,
            currency: body.currency || 'BRL',
          },

          // Event metadata
          event_time: body.timestamp
            ? Math.floor(new Date(body.timestamp).getTime() / 1000)
            : Math.floor(Date.now() / 1000),

          // Attribution
          action_source: 'system_generated', // CRM update
        },
      ],
    };

    // Send to Meta Conversion Leads API
    const metaUrl = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`;

    console.log('📤 [Conversion Leads] Sending to Meta:', {
      lead_id: body.lead_id,
      status: body.status,
      mapped_status: mapStatus(body.status),
    });

    const metaResponse = await fetch(metaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        access_token: META_ACCESS_TOKEN,
      }),
    });

    const metaData = await metaResponse.json();

    if (!metaResponse.ok) {
      console.error('❌ [Conversion Leads] Meta API error:', metaData);
      return NextResponse.json(
        {
          success: false,
          error: 'Meta API error',
          details: metaData,
        },
        { status: metaResponse.status }
      );
    }

    console.log('✅ [Conversion Leads] Success:', metaData);

    // Return success
    return NextResponse.json({
      success: true,
      lead_id: body.lead_id,
      status: body.status,
      meta_response: metaData,
    });
  } catch (error) {
    console.error('❌ [Conversion Leads] Error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*

// Example 1: Lead qualified in CRM
await fetch('/api/meta/conversion-leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lead_id: 'lead_123456',
    status: 'qualified',
    email: 'joao@example.com',
    phone: '+5511999999999',
    timestamp: new Date().toISOString(),
  }),
});

// Example 2: Appointment scheduled
await fetch('/api/meta/conversion-leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lead_id: 'lead_123456',
    status: 'scheduled',
    email: 'joao@example.com',
    phone: '+5511999999999',
    timestamp: new Date().toISOString(),
  }),
});

// Example 3: Customer showed up
await fetch('/api/meta/conversion-leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lead_id: 'lead_123456',
    status: 'showed',
    email: 'joao@example.com',
    phone: '+5511999999999',
    timestamp: new Date().toISOString(),
  }),
});

// Example 4: Customer purchased
await fetch('/api/meta/conversion-leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lead_id: 'lead_123456',
    status: 'purchased',
    email: 'joao@example.com',
    phone: '+5511999999999',
    value: 5000,
    currency: 'BRL',
    timestamp: new Date().toISOString(),
  }),
});

// Example 5: Lead lost
await fetch('/api/meta/conversion-leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lead_id: 'lead_123456',
    status: 'lost',
    email: 'joao@example.com',
    timestamp: new Date().toISOString(),
  }),
});

*/
