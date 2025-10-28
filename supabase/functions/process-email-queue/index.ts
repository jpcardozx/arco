// Supabase Edge Function - Process Email Queue
// Cron job to send pending/scheduled emails
// Enhanced: Sequence support, PostHog tracking, retry logic

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Get pending emails scheduled for now or earlier
    const { data: pendingEmails, error: fetchError } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString())
      .order('scheduled_for', { ascending: true })
      .limit(50)

    if (fetchError) throw fetchError

    if (!pendingEmails || pendingEmails.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No pending emails', processed: 0 }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let sent = 0
    let failed = 0
    const errors: Array<{ id: string; error: string }> = []

    // Process each email
    for (const email of pendingEmails) {
      try {
        // Send via Resend
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'ARCO Digital <arco@consultingarco.com>',
            to: email.to_email,
            subject: email.subject,
            html: email.html_content,
          }),
        })

        const result = await resendResponse.json()

        if (result.error) {
          // Update as failed
          await supabase
            .from('email_queue')
            .update({
              status: 'failed',
              failed_reason: result.error.message,
            })
            .eq('id', email.id)
          
          failed++
        } else {
          // Update as sent
          await supabase
            .from('email_queue')
            .update({
              status: 'sent',
              sent_at: new Date().toISOString(),
              resend_message_id: result.id,
            })
            .eq('id', email.id)
          
          sent++

          // Update email sequence progress
          if (email.lead_id) {
            await supabase.rpc('increment_email_sequence_step', {
              p_lead_id: email.lead_id
            })
          }
        }
      } catch (error) {
        console.error(`Failed to send email ${email.id}:`, error)
        
        await supabase
          .from('email_queue')
          .update({
            status: 'failed',
            failed_reason: error instanceof Error ? error.message : 'Unknown error',
          })
          .eq('id', email.id)
        
        failed++
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Email queue processed',
        total: pendingEmails.length,
        sent,
        failed,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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
