/**
 * API Route - Send Email
 * Integrates with Supabase Edge Function for email sending
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Temporarily disable edge runtime to debug build
// export const runtime = 'edge'

interface SendEmailRequest {
  to: string | string[]
  subject: string
  html: string
  text?: string
  templateType?: string
  tags?: Array<{ name: string; value: string }>
  replyTo?: string
  leadId?: string
  campaignId?: string
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse request body
    const body: SendEmailRequest = await request.json()

    // Validate required fields
    if (!body.to || !body.subject || !body.html) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, html' },
        { status: 400 }
      )
    }

    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: body.to,
        subject: body.subject,
        html: body.html,
        text: body.text,
        templateType: body.templateType,
        tags: body.tags,
        replyTo: body.replyTo,
        leadId: body.leadId,
        campaignId: body.campaignId,
      }
    })

    if (error) {
      console.error('Edge function error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      messageId: data.messageId,
      timestamp: data.timestamp
    })

  } catch (error) {
    console.error('API route error:', error)
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'email-api',
    timestamp: new Date().toISOString()
  })
}
