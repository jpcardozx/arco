import { mercadoPagoClient, MP_CONFIG } from './client';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { Preference, Payment } from 'mercadopago';

// Helper to get Supabase client (lazy initialization)
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!url || !key) {
    throw new Error('Supabase configuration missing');
  }
  
  return createClient(url, key);
}

// Types
interface CreateOrderParams {
  userId: string;
  planId: string;
  amount: number;
  currency?: string;
  description?: string;
  paymentMethodId?: string;
}

interface OrderResponse {
  id: string;
  status: string;
  paymentId?: string;
  preferenceId?: string;
  init_point?: string;
}

interface CaptureResponse {
  id: string;
  status: string;
  amount: number;
}

// Create Order using Preference API (correct for Bricks)
export async function createOrder(params: CreateOrderParams): Promise<OrderResponse> {
  const { userId, planId, amount, currency = 'BRL', description } = params;
  
  try {
    // Check if MercadoPago is configured
    if (!MP_CONFIG.enabled || !mercadoPagoClient) {
      throw new Error('MercadoPago not configured');
    }

    const supabase = getSupabaseClient();

    // Generate external reference
    const externalReference = randomUUID();
    
    // Get plan details
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();
    
    if (!plan) {
      throw new Error('Plan not found');
    }

    // Create preference for Payment Bricks
    const preferenceData = {
      items: [
        {
          id: planId,
          title: description || `Assinatura ${plan.name}`,
          quantity: 1,
          unit_price: amount,
          currency_id: currency,
        }
      ],
      payer: {
        email: '', // Will be filled by Payment Brick
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/payments/success`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/payments/failure`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/payments/pending`,
      },
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
      external_reference: externalReference,
      payment_methods: {
        excluded_payment_types: [],
        excluded_payment_methods: [],
        installments: 12,
      },
      metadata: {
        user_id: userId,
        plan_id: planId,
      },
    };

    const preference = new Preference(mercadoPagoClient);
    const response = await preference.create({ body: preferenceData });

    // Store transaction in database
    const { error: dbError } = await supabase
      .from('payment_transactions')
      .insert({
        user_id: userId,
        gateway: 'mercadopago',
        gateway_order_id: response.id?.toString(),
        gateway_transaction_id: response.id?.toString(),
        amount: amount,
        currency: currency,
        status: 'pending',
        payment_method_type: 'credit_card',
        metadata: {
          plan_id: planId,
          external_reference: externalReference,
          preference_id: response.id,
        },
      });

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue anyway, we can fix data later
    }

    return {
      id: response.id?.toString() || '',
      status: 'pending',
      preferenceId: response.id?.toString(),
      init_point: response.init_point,
    };

  } catch (error: any) {
    console.error('Create order error:', error);
    throw new Error(`Failed to create order: ${error.message}`);
  }
}

// Get payment details
export async function getPayment(paymentId: string) {
  try {
    // Check if MercadoPago is configured
    if (!MP_CONFIG.enabled || !mercadoPagoClient) {
      throw new Error('MercadoPago not configured');
    }

    const payment = new Payment(mercadoPagoClient);
    const response = await payment.get({ id: paymentId });
    return response;
  } catch (error: any) {
    console.error('Get payment error:', error);
    throw new Error(`Failed to get payment: ${error.message}`);
  }
}

// Process payment confirmation (called by webhook)
export async function processPaymentConfirmation(paymentId: string): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    const payment = await getPayment(paymentId);
    
    // Update transaction in database
    const { error: dbError } = await supabase
      .from('payment_transactions')
      .update({
        status: payment.status || 'unknown',
        gateway_response: payment,
        processed_at: new Date().toISOString(),
      })
      .eq('gateway_transaction_id', paymentId.toString());

    if (dbError) {
      console.error('Database update error:', dbError);
    }

    // If payment approved, update subscription
    if (payment.status === 'approved') {
      await activateSubscription(payment);
    }

  } catch (error: any) {
    console.error('Process payment confirmation error:', error);
    throw error;
  }
}

// Activate subscription after successful payment
async function activateSubscription(payment: any): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    const metadata = payment.metadata || {};
    const userId = metadata.user_id;
    const planId = metadata.plan_id;

    if (!userId || !planId) {
      console.error('Missing user_id or plan_id in payment metadata');
      return;
    }

    // Calculate subscription end date
    const { data: plan } = await supabase
      .from('subscription_plans')
      .select('*')
      .eq('id', planId)
      .single();

    if (!plan) {
      console.error('Plan not found:', planId);
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    
    // Add billing cycle duration
    switch (plan.billing_cycle) {
      case 'monthly':
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 'yearly':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      case 'lifetime':
        endDate.setFullYear(endDate.getFullYear() + 100); // Far future
        break;
      default:
        endDate.setMonth(endDate.getMonth() + 1);
    }

    // Create or update subscription
    const { error: subError } = await supabase
      .from('subscriptions')
      .upsert({
        user_id: userId,
        plan_id: planId,
        status: 'active',
        current_period_start: startDate.toISOString(),
        current_period_end: endDate.toISOString(),
        gateway: 'mercadopago',
        gateway_subscription_id: payment.id?.toString(),
      }, {
        onConflict: 'user_id'
      });

    if (subError) {
      console.error('Subscription creation error:', subError);
    } else {
      console.log('✅ Subscription activated for user:', userId);
    }

  } catch (error: any) {
    console.error('Activate subscription error:', error);
  }
}

export { getPayment as getOrderStatus };