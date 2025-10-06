import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

/**
 * API ROUTE: /api/domain/capture
 * 
 * Captures domain analysis request IMMEDIATELY when user submits
 * Before any identification - tracks anonymous user by session_id
 * 
 * Priority: P0 - CRITICAL
 */

const captureSchema = z.object({
  domain: z
    .string()
    .min(3, 'Domínio muito curto')
    .max(253, 'Domínio muito longo')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/,
      'Formato de domínio inválido'
    )
    .transform(val => val.toLowerCase().trim()),
  sessionId: z.string().uuid('Session ID inválido'),
  fingerprint: z.string().optional(),
  source: z.enum(['url_analyzer', 'homepage', 'blog', 'cta']).default('url_analyzer'),
  metadata: z.object({
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
    utmContent: z.string().optional(),
    utmTerm: z.string().optional(),
    referer: z.string().optional(),
    userAgent: z.string().optional(),
    screenResolution: z.string().optional(),
    timezone: z.string().optional(),
    language: z.string().optional(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate body
    const body = await req.json();
    const validation = captureSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Validation failed', 
          details: validation.error.issues 
        },
        { status: 400 }
      );
    }

    const { domain, sessionId, fingerprint, source, metadata } = validation.data;

    // Get IP address from headers
    const ip = req.headers.get('x-forwarded-for') 
      || req.headers.get('x-real-ip') 
      || 'unknown';

    // Create Supabase admin client (server-side)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // Admin key for server operations
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Check if this session already analyzed this domain recently (prevent duplicates)
    const { data: existing } = await supabase
      .from('domain_analysis_requests')
      .select('id, created_at')
      .eq('session_id', sessionId)
      .eq('domain', domain)
      .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString()) // Last hour
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existing) {
      // Return existing request ID instead of creating duplicate
      return NextResponse.json({
        success: true,
        data: {
          requestId: existing.id,
          isDuplicate: true,
          message: 'Análise já solicitada recentemente',
        },
      });
    }

    // Insert domain analysis request
    const { data: request, error } = await supabase
      .from('domain_analysis_requests')
      .insert({
        domain,
        session_id: sessionId,
        fingerprint: fingerprint || null,
        source,
        ip_address: ip !== 'unknown' ? ip : null,
        user_agent: metadata?.userAgent || req.headers.get('user-agent') || null,
        referer: metadata?.referer || req.headers.get('referer') || null,
        utm_source: metadata?.utmSource || null,
        utm_medium: metadata?.utmMedium || null,
        utm_campaign: metadata?.utmCampaign || null,
        utm_content: metadata?.utmContent || null,
        utm_term: metadata?.utmTerm || null,
        status: 'anonymous',
        metadata: {
          screenResolution: metadata?.screenResolution,
          timezone: metadata?.timezone,
          language: metadata?.language,
          capturedAt: new Date().toISOString(),
        },
      })
      .select('id')
      .single();

    if (error) {
      console.error('[API] Domain capture error:', error);
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to capture domain analysis',
          message: error.message 
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json({
      success: true,
      data: {
        requestId: request.id,
        domain,
        sessionId,
        nextStep: `/mydomain?domain=${encodeURIComponent(domain)}&requestId=${request.id}`,
      },
      message: 'Análise capturada com sucesso',
    });

  } catch (error) {
    console.error('[API] Domain capture unexpected error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
