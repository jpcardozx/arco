// Supabase Edge Function - Lead Notification System
// Triggered when new lead is captured - notifies sales team and creates tasks

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ============================================================================
// TYPES
// ============================================================================

interface Lead {
  id: string
  full_name: string
  email: string
  company_name?: string
  phone?: string
  source: string
  status: string
  message?: string
  created_at: string
}

interface WebhookPayload {
  type: 'INSERT'
  table: string
  record: Lead
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

function getAdminNotificationHTML(lead: Lead): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Novo Lead - ARCO</title>
</head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px 8px 0 0;">
    <h1 style="margin: 0; color: white; font-size: 24px;">🎯 Novo Lead Capturado!</h1>
  </div>

  <div style="background: white; padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="margin: 0 0 16px; color: #0f172a;">Informações do Lead:</h2>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 140px;">Nome:</td>
        <td style="padding: 8px 0; color: #0f172a;">${lead.full_name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
        <td style="padding: 8px 0;">
          <a href="mailto:${lead.email}" style="color: #667eea; text-decoration: none;">${lead.email}</a>
        </td>
      </tr>
      ${lead.company_name ? `
      <tr>
        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Empresa:</td>
        <td style="padding: 8px 0; color: #0f172a;">${lead.company_name}</td>
      </tr>
      ` : ''}
      ${lead.phone ? `
      <tr>
        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Telefone:</td>
        <td style="padding: 8px 0;">
          <a href="tel:${lead.phone}" style="color: #667eea; text-decoration: none;">${lead.phone}</a>
        </td>
      </tr>
      ` : ''}
      <tr>
        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Origem:</td>
        <td style="padding: 8px 0; color: #0f172a;">
          <span style="background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">
            ${lead.source.toUpperCase()}
          </span>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Data:</td>
        <td style="padding: 8px 0; color: #0f172a;">
          ${new Date(lead.created_at).toLocaleString('pt-BR')}
        </td>
      </tr>
    </table>

    ${lead.message ? `
    <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-radius: 8px;">
      <p style="margin: 0 0 8px; color: #64748b; font-weight: 600; font-size: 13px;">Mensagem:</p>
      <p style="margin: 0; color: #0f172a; line-height: 1.6;">${lead.message}</p>
    </div>
    ` : ''}

    <div style="margin-top: 24px; text-align: center;">
      <a href="https://arco.consultingarco.com/dashboard/leads/${lead.id}" style="
        display: inline-block;
        padding: 12px 32px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
      ">Ver Lead no Dashboard →</a>
    </div>

    <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 13px; color: #64748b; text-align: center;">
        ⏰ <strong>Lembre-se:</strong> Entre em contato nas próximas 24 horas para maior taxa de conversão!
      </p>
    </div>
  </div>
</body>
</html>
  `.trim()
}

function getLeadNurtureEmail1(fullName: string): string {
  const firstName = fullName.split(' ')[0]

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Obrigado pelo interesse - ARCO</title>
</head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
    <h1 style="margin: 0; color: white; font-size: 28px;">ARCO</h1>
    <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9);">Consulting & Analytics</p>
  </div>

  <div style="background: white; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
    <h2 style="margin: 0 0 16px; color: #0f172a;">Olá, ${firstName}! 👋</h2>

    <p style="margin: 0 0 16px; line-height: 1.7; color: #475569;">
      Obrigado por demonstrar interesse na ARCO! Recebemos sua mensagem e
      nossa equipe entrará em contato em breve.
    </p>

    <p style="margin: 0 0 24px; line-height: 1.7; color: #475569;">
      Enquanto isso, que tal conhecer melhor nossa plataforma?
    </p>

    <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
      <h3 style="margin: 0 0 12px; font-size: 16px; color: #0f172a;">O que a ARCO oferece:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #64748b; line-height: 2;">
        <li><strong>ARCO Index</strong> - Métrica proprietária de performance web</li>
        <li><strong>Análises Lighthouse</strong> - Core Web Vitals e scores detalhados</li>
        <li><strong>Insights Acionáveis</strong> - Recomendações práticas de otimização</li>
        <li><strong>Relatórios PDF</strong> - Apresentações profissionais para clientes</li>
      </ul>
    </div>

    <div style="text-align: center; margin-bottom: 24px;">
      <a href="https://arco.consultingarco.com/auth/signup" style="
        display: inline-block;
        padding: 14px 32px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        text-decoration: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 15px;
      ">Criar Conta Grátis →</a>
    </div>

    <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); padding: 16px; border-radius: 8px; text-align: center;">
      <p style="margin: 0; font-size: 14px; color: #065f46;">
        ✨ <strong>3 análises grátis</strong> ao criar sua conta!
      </p>
    </div>
  </div>

  <div style="margin-top: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
    <p style="margin: 0;">© 2025 ARCO Consulting. Todos os direitos reservados.</p>
  </div>
</body>
</html>
  `.trim()
}

// ============================================================================
// UTILITIES
// ============================================================================

function createSupabaseClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials')
  }

  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')

  if (!resendApiKey) {
    console.warn('[Email] RESEND_API_KEY not configured, skipping email')
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'ARCO Consulting <arco@consultingarco.com>',
      to,
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error('[Email] Failed to send:', error)
    throw new Error(`Resend API error: ${error}`)
  }

  const data = await response.json()
  console.log('[Email] Sent:', data.id)
}

async function sendSlackNotification(lead: Lead) {
  const slackWebhook = Deno.env.get('SLACK_WEBHOOK_URL')

  if (!slackWebhook) {
    console.warn('[Slack] Webhook not configured, skipping')
    return
  }

  const message = {
    text: '🎯 Novo Lead Capturado!',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎯 Novo Lead Capturado!',
        },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Nome:*\n${lead.full_name}` },
          { type: 'mrkdwn', text: `*Email:*\n${lead.email}` },
          { type: 'mrkdwn', text: `*Empresa:*\n${lead.company_name || 'Não informado'}` },
          { type: 'mrkdwn', text: `*Origem:*\n${lead.source}` },
        ],
      },
      ...(lead.message ? [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Mensagem:*\n${lead.message}`,
          },
        },
      ] : []),
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Ver no Dashboard',
            },
            url: `https://arco.consultingarco.com/dashboard/leads/${lead.id}`,
            style: 'primary',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Enviar Email',
            },
            url: `mailto:${lead.email}`,
          },
        ],
      },
    ],
  }

  const response = await fetch(slackWebhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message),
  })

  if (!response.ok) {
    console.error('[Slack] Failed to send notification')
  } else {
    console.log('[Slack] Notification sent')
  }
}

async function createFollowUpTask(supabase: any, lead: Lead) {
  // Find admin users to assign task
  const { data: admins } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('user_type', 'admin')
    .limit(1)
    .single()

  if (!admins) {
    console.warn('[Task] No admin user found, skipping task creation')
    return
  }

  const task = {
    user_id: admins.id,
    title: `Follow-up: ${lead.full_name}`,
    description: `Lead capturado de ${lead.source}. Email: ${lead.email}${lead.company_name ? `. Empresa: ${lead.company_name}` : ''}`,
    type: 'lead_followup',
    status: 'pending',
    priority: 'high',
    due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24h
    metadata: {
      lead_id: lead.id,
      lead_email: lead.email,
      lead_source: lead.source,
    },
  }

  const { error } = await supabase.from('tasks').insert(task)

  if (error) {
    console.error('[Task] Failed to create:', error)
  } else {
    console.log('[Task] Created follow-up task')
  }
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const payload: WebhookPayload = await req.json()

    // Validate webhook payload
    if (payload.type !== 'INSERT' || payload.table !== 'leads') {
      return new Response(
        JSON.stringify({ error: 'Invalid webhook payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const lead = payload.record

    console.log(`[Lead] Processing new lead: ${lead.email}`)

    const supabase = createSupabaseClient()

    // 1. Send notification to admin team
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'arco@consultingarco.com'
    await sendEmail(
      adminEmail,
      `🎯 Novo Lead: ${lead.full_name} (${lead.source})`,
      getAdminNotificationHTML(lead)
    )

    // 2. Send Slack notification
    await sendSlackNotification(lead)

    // 3. Start nurture email sequence for lead
    await sendEmail(
      lead.email,
      'Obrigado pelo interesse na ARCO!',
      getLeadNurtureEmail1(lead.full_name)
    )

    // 4. Create follow-up task for sales team
    await createFollowUpTask(supabase, lead)

    // 5. Track event in audit log
    await supabase.from('audit_log').insert({
      action: 'lead_captured',
      resource_type: 'leads',
      resource_id: lead.id,
      details: {
        email: lead.email,
        source: lead.source,
        company: lead.company_name,
      },
    })

    console.log(`[Lead] Processing completed for ${lead.email}`)

    return new Response(
      JSON.stringify({
        success: true,
        lead_id: lead.id,
        notifications_sent: ['admin_email', 'slack', 'lead_nurture', 'task'],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Lead] Error:', errorMessage)

    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
