// Supabase Edge Function - Stripe Webhook Handler
// Handles all Stripe payment events with intelligent subscription management

import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.11.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

// ============================================================================
// TYPES
// ============================================================================

interface StripeWebhookEvent {
  type: string
  data: {
    object: any
  }
}

interface SubscriptionMetadata {
  user_id: string
  tier: 'free' | 'paid'
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

/**
 * Send email notification via Resend
 */
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')

  if (!resendApiKey) {
    console.warn('[Email] Resend API key not configured')
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'arco@consultingarco.com',
      to,
      subject,
      html,
    }),
  })

  if (!response.ok) {
    console.error('[Email] Failed to send:', await response.text())
  } else {
    console.log(`[Email] Sent to ${to}: ${subject}`)
  }
}

/**
 * Get user email from user_id
 */
async function getUserEmail(supabase: any, userId: string): Promise<string | null> {
  const { data, error } = await supabase.auth.admin.getUserById(userId)

  if (error || !data.user) {
    console.error('[Auth] Failed to get user email:', error)
    return null
  }

  return data.user.email
}

// ============================================================================
// EVENT HANDLERS
// ============================================================================

/**
 * Handle checkout.session.completed
 * User completed payment - upgrade to PAID tier
 */
async function handleCheckoutCompleted(event: StripeWebhookEvent) {
  const session = event.data.object
  const userId = session.metadata?.user_id

  if (!userId) {
    throw new Error('No user_id in session metadata')
  }

  console.log(`[Checkout] Completed for user ${userId}`)

  const supabase = createSupabaseClient()

  // Update user to PAID tier
  const { error: updateError } = await supabase
    .from('user_profiles')
    .update({
      tier: 'paid',
      stripe_customer_id: session.customer,
      stripe_subscription_id: session.subscription,
      subscription_status: 'active',
      subscription_start_date: new Date().toISOString(),
      monthly_analysis_count: 0, // Reset limits
    })
    .eq('id', userId)

  if (updateError) {
    console.error('[Checkout] Failed to update user:', updateError)
    throw updateError
  }

  // Send welcome to PAID email
  const userEmail = await getUserEmail(supabase, userId)
  if (userEmail) {
    await sendEmail(
      userEmail,
      'Bem-vindo ao ARCO PRO! 🎉',
      `
        <h1>Sua conta foi ativada!</h1>
        <p>Agora você tem acesso ilimitado a:</p>
        <ul>
          <li>✅ Análises ilimitadas</li>
          <li>✅ Relatórios em PDF</li>
          <li>✅ Insights com IA</li>
          <li>✅ Suporte prioritário</li>
        </ul>
        <a href="https://arco.consultingarco.com/dashboard" style="
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          margin-top: 16px;
        ">Acessar Dashboard →</a>
      `
    )
  }

  console.log(`[Checkout] User ${userId} upgraded to PAID`)
}

/**
 * Handle customer.subscription.updated
 * Subscription status changed
 */
async function handleSubscriptionUpdated(event: StripeWebhookEvent) {
  const subscription = event.data.object
  const userId = subscription.metadata?.user_id

  if (!userId) {
    console.warn('[Subscription] No user_id in metadata, skipping')
    return
  }

  const supabase = createSupabaseClient()

  const subscriptionData: any = {
    subscription_status: subscription.status,
  }

  // If subscription ended, downgrade to FREE
  if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
    subscriptionData.tier = 'free'
    subscriptionData.subscription_end_date = new Date().toISOString()
  }

  const { error } = await supabase
    .from('user_profiles')
    .update(subscriptionData)
    .eq('id', userId)

  if (error) {
    console.error('[Subscription] Update failed:', error)
    throw error
  }

  console.log(`[Subscription] Updated user ${userId} status to ${subscription.status}`)
}

/**
 * Handle customer.subscription.deleted
 * Subscription canceled - downgrade to FREE
 */
async function handleSubscriptionDeleted(event: StripeWebhookEvent) {
  const subscription = event.data.object
  const userId = subscription.metadata?.user_id

  if (!userId) {
    console.warn('[Subscription] No user_id in metadata, skipping')
    return
  }

  const supabase = createSupabaseClient()

  const { error } = await supabase
    .from('user_profiles')
    .update({
      tier: 'free',
      subscription_status: 'canceled',
      subscription_end_date: new Date().toISOString(),
    })
    .eq('id', userId)

  if (error) {
    console.error('[Subscription] Downgrade failed:', error)
    throw error
  }

  // Send downgrade notification
  const userEmail = await getUserEmail(supabase, userId)
  if (userEmail) {
    await sendEmail(
      userEmail,
      'Sua assinatura ARCO PRO foi cancelada',
      `
        <h1>Assinatura Cancelada</h1>
        <p>Sua conta foi revertida para o plano FREE.</p>
        <p>Você ainda tem acesso a:</p>
        <ul>
          <li>✅ 3 análises por mês</li>
          <li>✅ Métricas básicas</li>
        </ul>
        <p>Sentiremos sua falta! Reative quando quiser.</p>
        <a href="https://arco.consultingarco.com/pricing">Ver Planos →</a>
      `
    )
  }

  console.log(`[Subscription] User ${userId} downgraded to FREE`)
}

/**
 * Handle invoice.payment_succeeded
 * Payment confirmed - create invoice record
 */
async function handleInvoicePaymentSucceeded(event: StripeWebhookEvent) {
  const invoice = event.data.object
  const customerId = invoice.customer
  const subscriptionId = invoice.subscription

  if (!subscriptionId) {
    console.log('[Invoice] No subscription, skipping')
    return
  }

  const supabase = createSupabaseClient()

  // Find user by stripe_customer_id
  const { data: user, error: userError } = await supabase
    .from('user_profiles')
    .select('id, email:auth.users(email)')
    .eq('stripe_customer_id', customerId)
    .single()

  if (userError || !user) {
    console.error('[Invoice] User not found for customer:', customerId)
    return
  }

  // Create invoice record
  const { error: invoiceError } = await supabase.from('invoices').insert({
    user_id: user.id,
    client_id: user.id,
    invoice_number: invoice.number,
    description: `Assinatura ARCO PRO - ${new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
    total_amount: invoice.amount_paid / 100, // Convert cents to BRL
    status: 'paid',
    payment_method: invoice.payment_intent?.payment_method_details?.type || 'card',
    payment_reference: invoice.payment_intent?.id,
    due_date: new Date(invoice.period_end * 1000).toISOString(),
    paid_date: new Date().toISOString(),
  })

  if (invoiceError) {
    console.error('[Invoice] Failed to create:', invoiceError)
  }

  // Send payment confirmation
  const userEmail = await getUserEmail(supabase, user.id)
  if (userEmail) {
    await sendEmail(
      userEmail,
      'Pagamento Confirmado - ARCO PRO',
      `
        <h1>Pagamento Confirmado ✅</h1>
        <p>Recebemos seu pagamento de <strong>R$ ${(invoice.amount_paid / 100).toFixed(2)}</strong></p>
        <p>Sua assinatura ARCO PRO está ativa até <strong>${new Date(invoice.period_end * 1000).toLocaleDateString('pt-BR')}</strong></p>
        <a href="https://arco.consultingarco.com/dashboard/billing">Ver Fatura →</a>
      `
    )
  }

  console.log(`[Invoice] Created for user ${user.id}, amount: ${invoice.amount_paid / 100}`)
}

/**
 * Handle invoice.payment_failed
 * Payment failed - update status to past_due
 */
async function handleInvoicePaymentFailed(event: StripeWebhookEvent) {
  const invoice = event.data.object
  const customerId = invoice.customer

  const supabase = createSupabaseClient()

  const { data: user } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!user) {
    console.error('[Invoice] User not found for failed payment')
    return
  }

  // Update subscription status
  await supabase
    .from('user_profiles')
    .update({ subscription_status: 'past_due' })
    .eq('id', user.id)

  // Send payment failure notification
  const userEmail = await getUserEmail(supabase, user.id)
  if (userEmail) {
    await sendEmail(
      userEmail,
      'Problema no Pagamento - ARCO PRO',
      `
        <h1>Falha no Pagamento ⚠️</h1>
        <p>Não conseguimos processar seu pagamento.</p>
        <p>Por favor, atualize suas informações de pagamento para continuar usando o ARCO PRO.</p>
        <a href="https://arco.consultingarco.com/dashboard/billing">Atualizar Pagamento →</a>
      `
    )
  }

  console.log(`[Invoice] Payment failed for user ${user.id}`)
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
  })

  try {
    // Verify webhook signature
    const signature = req.headers.get('stripe-signature')
    const body = await req.text()
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!signature || !webhookSecret) {
      throw new Error('Missing signature or webhook secret')
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret) as StripeWebhookEvent

    console.log(`[Stripe] Webhook received: ${event.type}`)

    // Route to appropriate handler
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event)
        break

      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event)
        break

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event)
        break

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`)
    }

    return new Response(
      JSON.stringify({ received: true, type: event.type }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[Stripe] Webhook error:', errorMessage)

    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
