import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

/**
 * Supabase Client with Service Role Key
 * 
 * ⚠️ ATENÇÃO: Este cliente bypassa RLS (Row Level Security)
 * Use APENAS em:
 * - API routes (server-side)
 * - Webhooks
 * - Background jobs
 * 
 * ❌ NUNCA use no client-side (páginas/componentes)
 */
export const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Supabase Client with Anon Key (respects RLS)
 * 
 * ✅ Use em:
 * - Client-side (páginas/componentes)
 * - Public data queries
 * - Authenticated user queries (com RLS)
 */
export const supabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Helper: Create subscription
 */
export async function createSubscription(params: {
  userId: string;
  planSlug: string;
  gateway: 'mercadopago' | 'stripe';
  gatewaySubscriptionId: string;
  status?: string;
}) {
  const { data, error } = await supabaseAdmin.rpc('upsert_subscription' as any, {
    p_user_id: params.userId,
    p_plan_slug: params.planSlug,
    p_gateway: params.gateway,
    p_gateway_subscription_id: params.gatewaySubscriptionId,
    p_status: params.status || 'incomplete',
  });

  if (error) {
    throw new Error(`Failed to create subscription: ${error.message}`);
  }

  return data as string; // Returns subscription UUID
}

/**
 * Helper: Activate subscription
 */
export async function activateSubscription(
  subscriptionId: string,
  paymentId: string
) {
  const { data, error } = await supabaseAdmin.rpc('activate_subscription' as any, {
    p_subscription_id: subscriptionId,
    p_payment_id: paymentId,
  });

  if (error) {
    throw new Error(`Failed to activate subscription: ${error.message}`);
  }

  return data as boolean;
}

/**
 * Helper: Cancel subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  cancelAtPeriodEnd: boolean = false
) {
  const { data, error } = await supabaseAdmin.rpc('cancel_subscription' as any, {
    p_subscription_id: subscriptionId,
    p_cancel_at_period_end: cancelAtPeriodEnd,
  });

  if (error) {
    throw new Error(`Failed to cancel subscription: ${error.message}`);
  }

  return data as boolean;
}

/**
 * Helper: Process webhook event
 */
export async function processWebhookEvent(params: {
  gateway: 'mercadopago' | 'stripe';
  gatewayEventId: string;
  eventType: string;
  payload: any;
}) {
  const { data, error } = await supabaseAdmin.rpc('process_webhook_event' as any, {
    p_gateway: params.gateway,
    p_gateway_event_id: params.gatewayEventId,
    p_event_type: params.eventType,
    p_payload: params.payload,
  });

  if (error) {
    throw new Error(`Failed to process webhook: ${error.message}`);
  }

  return data;
}

/**
 * Helper: Get user active subscription
 */
export async function getUserActiveSubscription(userId: string) {
  const { data, error } = await supabaseAdmin.rpc(
    'get_user_active_subscription' as any,
    {
      p_user_id: userId,
    }
  );

  if (error) {
    throw new Error(
      `Failed to get user subscription: ${error.message}`
    );
  }

  return (data as any)?.[0] || null;
}

/**
 * Helper: Get user payment history
 */
export async function getUserPaymentHistory(
  userId: string,
  limit: number = 10
) {
  const { data, error } = await supabaseAdmin.rpc('get_user_payment_history' as any, {
    p_user_id: userId,
    p_limit: limit,
  });

  if (error) {
    throw new Error(`Failed to get payment history: ${error.message}`);
  }

  return data || [];
}

/**
 * Helper: Calculate revenue metrics
 */
export async function calculateRevenueMetrics(
  startDate?: Date,
  endDate?: Date
) {
  const { data, error } = await supabaseAdmin.rpc('calculate_revenue_metrics' as any, {
    p_start_date: startDate?.toISOString() || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    p_end_date: endDate?.toISOString() || new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Failed to calculate revenue metrics: ${error.message}`);
  }

  return data;
}
