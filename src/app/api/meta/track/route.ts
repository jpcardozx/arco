/**
 * Meta Conversions API (CAPI) Endpoint
 * 
 * Server-side tracking para Facebook/Instagram Ads
 * 
 * Por que CAPI é crítico:
 * - iOS 14.5+ ATT: 60-70% dos usuários bloqueiam tracking
 * - Ad blockers: 25-30% bloqueiam Pixel client-side
 * - CAPI bypassa limitações: 95%+ delivery rate
 * - EMQ alto (8-10) vs baixo (2-4) = 40-60% menor CPL
 * 
 * Eventos suportados:
 * - Lead: Captura de lead (lead magnet)
 * - ViewContent: Visualização de página (tripwire page)
 * - InitiateCheckout: Início do checkout
 * - Purchase: Compra confirmada (tripwire)
 * 
 * @see https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { hashData, normalizePhone, getClientIp } from '@/lib/meta-capi-helpers';

// ============================================================================
// TYPES
// ============================================================================

interface MetaTrackingRequest {
  eventName: 'Lead' | 'ViewContent' | 'InitiateCheckout' | 'Purchase'
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zipCode?: string
  value?: number
  currency?: string
  eventId?: string
  customData?: Record<string, any>
}

interface MetaEventPayload {
  event_name: string
  event_time: number
  event_id: string
  action_source: 'website'
  user_data: {
    em?: string[]
    ph?: string[]
    fn?: string[]
    ln?: string[]
    ct?: string[]
    st?: string[]
    zp?: string[]
    client_ip_address?: string
    client_user_agent?: string
    fbp?: string
    fbc?: string
  }
  custom_data?: {
    value?: number
    currency?: string
    content_type?: string
    content_name?: string
    content_category?: string
    [key: string]: any
  }
}

interface MetaAPIResponse {
  events_received?: number
  messages?: string[]
  fbtrace_id?: string
}

// ============================================================================
// HELPERS
// ============================================================================
// MAIN HANDLER
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request body
    const body: MetaTrackingRequest = await request.json()
    
    const {
      eventName,
      email,
      phone,
      firstName,
      lastName,
      city,
      state,
      zipCode,
      value,
      currency = 'BRL',
      eventId,
      customData
    } = body

    // 2. Validate required fields
    if (!eventName) {
      return NextResponse.json(
        { success: false, error: 'eventName is required' },
        { status: 400 }
      )
    }

    // 3. Generate event ID for deduplication (if not provided)
    const deduplicationId = eventId || crypto.randomUUID()

    // 4. Build user_data with hashed PII
    const userData: MetaEventPayload['user_data'] = {
      em: email ? [await hashData(email)] : undefined,
      ph: phone ? [await hashData(normalizePhone(phone))] : undefined,
      fn: firstName ? [await hashData(firstName)] : undefined,
      ln: lastName ? [await hashData(lastName)] : undefined,
      ct: city ? [await hashData(city)] : undefined,
      st: state ? [await hashData(state)] : undefined,
      zp: zipCode ? [await hashData(zipCode)] : undefined,
      
      // Server-side data (not hashed)
      client_ip_address: getClientIp(request),
      client_user_agent: request.headers.get('user-agent') || undefined,
      
      // Facebook Pixel cookies (for deduplication with client-side events)
      fbp: request.cookies.get('_fbp')?.value,
      fbc: request.cookies.get('_fbc')?.value
    }

    // Remove undefined values
    Object.keys(userData).forEach(key => {
      if (userData[key as keyof typeof userData] === undefined) {
        delete userData[key as keyof typeof userData]
      }
    })

    // 5. Build custom_data
    const customDataPayload: MetaEventPayload['custom_data'] = {
      value: value || 0,
      currency,
      ...customData
    }

    // 6. Build full event payload
    const payload: MetaEventPayload = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: deduplicationId,
      action_source: 'website',
      user_data: userData,
      custom_data: customDataPayload
    }

    // 7. Send to Meta Conversions API
    const metaResponse = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.META_DATASET_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: [payload],
          access_token: process.env.META_CONVERSION_API_ACCESS_TOKEN,
          test_event_code: process.env.META_TEST_EVENT_CODE // Remove em produção
        })
      }
    )

    const metaResult: MetaAPIResponse = await metaResponse.json()

    // 8. Handle Meta API errors
    if (!metaResponse.ok) {
      console.error('[Meta CAPI] API Error:', {
        status: metaResponse.status,
        result: metaResult
      })
      
      return NextResponse.json(
        {
          success: false,
          error: 'Meta API error',
          details: metaResult
        },
        { status: metaResponse.status }
      )
    }

    // 9. Success response
    console.log('[Meta CAPI] Event sent successfully:', {
      eventName,
      eventId: deduplicationId,
      eventsReceived: metaResult.events_received,
      fbTraceId: metaResult.fbtrace_id
    })

    return NextResponse.json({
      success: true,
      eventId: deduplicationId,
      eventsReceived: metaResult.events_received,
      fbTraceId: metaResult.fbtrace_id,
      messages: metaResult.messages
    })

  } catch (error) {
    console.error('[Meta CAPI] Unexpected error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
