// Supabase Edge Function - Resend Webhook Handler
// Handles delivery status, opens, clicks from Resend

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, svix-id, svix-timestamp, svix-signature',
}

interface ResendWebhookEvent {
  type: 'email.sent' | 'email.delivered' | 'email.delivery_delayed' | 'email.complained' | 'email.bounced' | 'email.opened' | 'email.clicked'
  created_at: string
  data: {
    email_id: string
    from: string
    to: string[]
    subject: string
    created_at: string
    click?: {
      link: string
      timestamp: string
    }
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Parse webhook payload
    const event: ResendWebhookEvent = await req.json()
    
    console.log('Resend webhook event:', event.type, event.data.email_id)

    // Find email in queue by Resend message ID
    const { data: queuedEmail } = await supabase
      .from('email_queue')
      .select('id, lead_id, status')
      .eq('resend_message_id', event.data.email_id)
      .single()

    if (!queuedEmail) {
      console.log('Email not found in queue:', event.data.email_id)
      return new Response(
        JSON.stringify({ message: 'Email not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Update status based on event type
    switch (event.type) {
      case 'email.delivered':
        // Email successfully delivered
        await supabase
          .from('email_queue')
          .update({ status: 'sent' })
          .eq('id', queuedEmail.id)
        break

      case 'email.bounced':
        // Email bounced
        await supabase
          .from('email_queue')
          .update({ 
            status: 'bounced',
            failed_reason: 'Email bounced'
          })
          .eq('id', queuedEmail.id)
        break

      case 'email.complained':
        // User marked as spam - unsubscribe from sequences
        if (queuedEmail.lead_id) {
          await supabase
            .from('email_sequences')
            .update({ 
              status: 'unsubscribed',
              unsubscribed_at: new Date().toISOString()
            })
            .eq('lead_id', queuedEmail.lead_id)
        }
        break

      case 'email.opened':
        // Email opened
        await supabase
          .from('email_queue')
          .update({ 
            status: 'opened',
            open_tracked_at: new Date().toISOString()
          })
          .eq('id', queuedEmail.id)
        
        // Update lead engagement score
        if (queuedEmail.lead_id) {
          await supabase.rpc('increment_lead_score', {
            p_lead_id: queuedEmail.lead_id,
            p_points: 5 // Points for opening email
          })
        }
        break

      case 'email.clicked':
        // Email link clicked
        await supabase
          .from('email_queue')
          .update({ 
            status: 'clicked',
            click_tracked_at: new Date().toISOString()
          })
          .eq('id', queuedEmail.id)
        
        // Update lead engagement score (higher points for clicking)
        if (queuedEmail.lead_id) {
          await supabase.rpc('increment_lead_score', {
            p_lead_id: queuedEmail.lead_id,
            p_points: 10 // Points for clicking link
          })
        }
        break

      default:
        console.log('Unhandled event type:', event.type)
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        event: event.type,
        emailId: event.data.email_id,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Webhook handler error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
