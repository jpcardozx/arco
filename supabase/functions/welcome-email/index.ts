// Supabase Edge Function - Welcome Email & Onboarding
// Triggered on new user signup via database webhook

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ============================================================================
// TYPES
// ============================================================================

interface WebhookPayload {
  type: 'INSERT'
  table: string
  record: {
    id: string
    email: string
    raw_user_meta_data?: {
      full_name?: string
    }
  }
  old_record: null
}

// ============================================================================
// EMAIL TEMPLATES
// ============================================================================

function getWelcomeEmailHTML(fullName: string, email: string): string {
  const firstName = fullName?.split(' ')[0] || 'Usuário'

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bem-vindo à ARCO!</title>
</head>
<body style="
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f5f5;
">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="
          background-color: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
        ">
          <!-- Header -->
          <tr>
            <td style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              padding: 40px;
              text-align: center;
            ">
              <h1 style="
                margin: 0;
                color: #ffffff;
                font-size: 32px;
                font-weight: 700;
              ">Bem-vindo à ARCO!</h1>
              <p style="
                margin: 8px 0 0;
                color: rgba(255, 255, 255, 0.9);
                font-size: 14px;
              ">Consulting & Analytics</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 48px 40px;">
              <h2 style="
                margin: 0 0 16px;
                font-size: 24px;
                color: #0f172a;
              ">Olá, ${firstName}! 👋</h2>

              <p style="
                margin: 0 0 24px;
                font-size: 15px;
                line-height: 1.7;
                color: #475569;
              ">
                Estamos felizes em tê-lo conosco! Sua conta foi criada com sucesso
                e você já pode começar a otimizar sua operação digital.
              </p>

              <!-- Quick Start Guide -->
              <div style="
                background: #f8fafc;
                border-radius: 12px;
                padding: 24px;
                margin-bottom: 32px;
              ">
                <h3 style="
                  margin: 0 0 16px;
                  font-size: 16px;
                  color: #0f172a;
                ">🚀 Primeiros Passos</h3>

                <ol style="
                  margin: 0;
                  padding-left: 20px;
                  font-size: 14px;
                  line-height: 2;
                  color: #64748b;
                ">
                  <li><strong>Complete seu perfil</strong> - Adicione informações da sua empresa</li>
                  <li><strong>Faça sua primeira análise</strong> - Insira a URL do seu site</li>
                  <li><strong>Explore o dashboard</strong> - Veja métricas e insights</li>
                </ol>
              </div>

              <!-- Features -->
              <h3 style="
                margin: 0 0 16px;
                font-size: 16px;
                color: #0f172a;
              ">O que você pode fazer agora:</h3>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td width="50%" style="padding-right: 8px; vertical-align: top;">
                    <div style="
                      background: white;
                      border: 1px solid #e2e8f0;
                      border-radius: 8px;
                      padding: 16px;
                      text-align: center;
                    ">
                      <div style="font-size: 32px; margin-bottom: 8px;">⚡</div>
                      <div style="
                        font-size: 13px;
                        font-weight: 600;
                        color: #0f172a;
                        margin-bottom: 4px;
                      ">3 Análises Grátis</div>
                      <div style="
                        font-size: 12px;
                        color: #64748b;
                      ">Por mês no plano FREE</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 8px; vertical-align: top;">
                    <div style="
                      background: white;
                      border: 1px solid #e2e8f0;
                      border-radius: 8px;
                      padding: 16px;
                      text-align: center;
                    ">
                      <div style="font-size: 32px; margin-bottom: 8px;">📊</div>
                      <div style="
                        font-size: 13px;
                        font-weight: 600;
                        color: #0f172a;
                        margin-bottom: 4px;
                      ">ARCO Index</div>
                      <div style="
                        font-size: 12px;
                        color: #64748b;
                      ">Métrica própria de performance</div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 32px;">
                    <a href="https://arco.consultingarco.com/dashboard" style="
                      display: inline-block;
                      padding: 16px 40px;
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      color: #ffffff;
                      text-decoration: none;
                      border-radius: 10px;
                      font-size: 15px;
                      font-weight: 600;
                      box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
                    ">
                      Acessar Dashboard →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Pro Upgrade CTA -->
              <div style="
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 24px;
                text-align: center;
              ">
                <p style="
                  margin: 0 0 12px;
                  font-size: 14px;
                  font-weight: 600;
                  color: #78350f;
                ">💎 Quer mais poder?</p>
                <p style="
                  margin: 0 0 16px;
                  font-size: 13px;
                  color: #92400e;
                ">Upgrade para ARCO PRO e tenha análises ilimitadas, relatórios PDF e muito mais!</p>
                <a href="https://arco.consultingarco.com/pricing" style="
                  display: inline-block;
                  padding: 10px 24px;
                  background: #f59e0b;
                  color: white;
                  text-decoration: none;
                  border-radius: 8px;
                  font-size: 13px;
                  font-weight: 600;
                ">Ver Planos →</a>
              </div>

              <!-- Support -->
              <div style="
                border-top: 1px solid #e2e8f0;
                padding-top: 24px;
              ">
                <p style="
                  margin: 0;
                  font-size: 13px;
                  color: #64748b;
                  text-align: center;
                ">
                  Precisa de ajuda? <a href="mailto:arco@consultingarco.com" style="color: #667eea;">Entre em contato</a>
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="
              background-color: #f7fafc;
              padding: 32px 40px;
              border-top: 1px solid #e2e8f0;
            ">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <p style="
                      margin: 0 0 16px;
                      font-size: 14px;
                      color: #718096;
                    ">
                      Conta criada: <strong>${email}</strong>
                    </p>

                    <div style="margin: 0 0 16px;">
                      <a href="https://consultingarco.com" style="
                        color: #667eea;
                        text-decoration: none;
                        font-size: 13px;
                        margin: 0 12px;
                      ">Website</a>
                      <span style="color: #cbd5e0;">•</span>
                      <a href="mailto:arco@consultingarco.com" style="
                        color: #667eea;
                        text-decoration: none;
                        font-size: 13px;
                        margin: 0 12px;
                      ">Suporte</a>
                    </div>

                    <p style="
                      margin: 0;
                      font-size: 12px;
                      color: #a0aec0;
                    ">
                      © 2025 ARCO Consulting. Todos os direitos reservados.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
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
    throw new Error('RESEND_API_KEY not configured')
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
    throw new Error(`Resend API error: ${error}`)
  }

  const data = await response.json()
  console.log('[Email] Sent successfully:', data.id)
  return data
}

async function createOnboardingTasks(supabase: any, userId: string) {
  const tasks = [
    {
      user_id: userId,
      title: 'Complete seu perfil',
      description: 'Adicione informações da sua empresa e personalize sua conta',
      type: 'onboarding',
      status: 'pending',
      priority: 'high',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    },
    {
      user_id: userId,
      title: 'Faça sua primeira análise',
      description: 'Insira a URL do seu site para começar a otimizar',
      type: 'onboarding',
      status: 'pending',
      priority: 'high',
      due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
    },
    {
      user_id: userId,
      title: 'Explore o dashboard',
      description: 'Conheça as métricas e ferramentas disponíveis',
      type: 'onboarding',
      status: 'pending',
      priority: 'medium',
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]

  const { error } = await supabase.from('tasks').insert(tasks)

  if (error) {
    console.error('[Tasks] Failed to create onboarding tasks:', error)
  } else {
    console.log(`[Tasks] Created ${tasks.length} onboarding tasks`)
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
    if (payload.type !== 'INSERT' || payload.table !== 'users') {
      return new Response(
        JSON.stringify({ error: 'Invalid webhook payload' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const user = payload.record
    const fullName = user.raw_user_meta_data?.full_name || 'Usuário'
    const email = user.email

    console.log(`[Welcome] Processing signup for ${email}`)

    const supabase = createSupabaseClient()

    // 1. Send welcome email
    await sendEmail(
      email,
      'Bem-vindo à ARCO! Vamos começar? 🚀',
      getWelcomeEmailHTML(fullName, email)
    )

    // 2. Create onboarding tasks
    await createOnboardingTasks(supabase, user.id)

    // 3. Track signup event (optional - for analytics)
    await supabase.from('audit_log').insert({
      user_id: user.id,
      action: 'user_signup',
      resource_type: 'auth.users',
      resource_id: user.id,
      details: {
        email,
        full_name: fullName,
        source: 'signup_flow',
      },
    })

    console.log(`[Welcome] Completed for ${email}`)

    return new Response(
      JSON.stringify({
        success: true,
        user_id: user.id,
        email,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Welcome] Error:', errorMessage)

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
