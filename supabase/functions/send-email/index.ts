// Supabase Edge Function - Send Email
// Handles all email sending through Resend API

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
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

interface ResendResponse {
  id?: string
  error?: {
    message: string
    name: string
  }
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Validate Resend API key
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Parse request
    const emailData: EmailRequest = await req.json()

    // Validate required fields
    if (!emailData.to || !emailData.subject || !emailData.html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Send email via Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'ARCO Digital <arco@consultingarco.com>',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
        text: emailData.text,
        reply_to: emailData.replyTo || 'contato@arco.digital',
        tags: emailData.tags,
      }),
    })

    const result: ResendResponse = await resendResponse.json()

    // Handle Resend errors
    if (result.error) {
      console.error('Resend API error:', result.error)
      
      // Log failure to Supabase if leadId provided
      if (emailData.leadId) {
        const supabase = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        await supabase.from('email_queue').insert({
          lead_id: emailData.leadId,
          campaign_id: emailData.campaignId,
          to_email: Array.isArray(emailData.to) ? emailData.to[0] : emailData.to,
          subject: emailData.subject,
          html_content: emailData.html,
          status: 'failed',
          failed_reason: result.error.message,
        })
      }

      return new Response(
        JSON.stringify({ error: result.error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log success to Supabase if leadId provided
    if (emailData.leadId && result.id) {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      )

      await supabase.from('email_queue').insert({
        lead_id: emailData.leadId,
        campaign_id: emailData.campaignId,
        to_email: Array.isArray(emailData.to) ? emailData.to[0] : emailData.to,
        subject: emailData.subject,
        html_content: emailData.html,
        status: 'sent',
        sent_at: new Date().toISOString(),
        resend_message_id: result.id,
      })
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: result.id,
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
