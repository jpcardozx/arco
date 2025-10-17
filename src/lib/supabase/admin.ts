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
let _supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabaseAdmin = () => {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // During build time, environment variables may not be available
  if (!supabaseUrl || !serviceRoleKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured');
    }
    // During build, return a dummy client
    console.warn('⚠️ Supabase admin client not available during build');
    return createClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-service-key',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  }

  _supabaseAdmin = createClient<Database>(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  return _supabaseAdmin;
};

// Keep backward compatibility
export const supabaseAdmin = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(target, prop) {
    return getSupabaseAdmin()[prop as keyof ReturnType<typeof createClient<Database>>];
  }
});

/**
 * Supabase Client with Anon Key (respects RLS)
 * 
 * ✅ Use em:
 * - Client-side (páginas/componentes)
 * - Public data queries
 * - Authenticated user queries (com RLS)
 */
let _supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export const getSupabaseClient = () => {
  if (_supabaseClient) return _supabaseClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // During build time, environment variables may not be available
  if (!supabaseUrl || !anonKey) {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
      throw new Error('Supabase credentials are not configured');
    }
    // During build, return a dummy client
    return createClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-anon-key'
    );
  }

  _supabaseClient = createClient<Database>(supabaseUrl, anonKey);
  return _supabaseClient;
};

// Keep backward compatibility
export const supabaseClient = new Proxy({} as ReturnType<typeof createClient<Database>>, {
  get(target, prop) {
    return getSupabaseClient()[prop as keyof ReturnType<typeof createClient<Database>>];
  }
});

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
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc('upsert_subscription' as any, {
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
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc('activate_subscription' as any, {
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
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc('cancel_subscription' as any, {
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
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc('process_webhook_event' as any, {
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
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc(
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
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc('get_user_payment_history' as any, {
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
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc('calculate_revenue_metrics' as any, {
    p_start_date: startDate?.toISOString() || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    p_end_date: endDate?.toISOString() || new Date().toISOString(),
  });

  if (error) {
    throw new Error(`Failed to calculate revenue metrics: ${error.message}`);
  }

  return data;
}
