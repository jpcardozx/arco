import crypto from 'crypto';
import { getSupabaseAdmin, type WebhookEventInsert } from '@/lib/supabase/client';
import { mercadoPagoClient } from './client';
import { processPaymentConfirmation } from './orders';
import { Payment } from 'mercadopago';

// Cliente Supabase com privilégios admin (necessário para webhooks)
const supabase = getSupabaseAdmin();

// Types
interface MercadoPagoWebhookEvent {
  id: number | string;  // Pode ser number ou string dependendo do tipo
  live_mode: boolean;
  type: string;
  date_created: string;
  application_id: number | string;
  user_id: number;
  version?: number;
  api_version: string;
  action: string;
  data: {
    id: string;
  };
}

// Validate webhook signature
export function validateWebhookSignature(
  signature: string,
  body: string,
  secret: string
): boolean {
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (error) {
    console.error('Signature validation error:', error);
    return false;
  }
}

// Check if webhook already processed
export async function checkWebhookExists(requestId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('webhook_events')
      .select('id')
      .eq('gateway_event_id', requestId)
      .maybeSingle(); // Use maybeSingle instead of single to avoid error on no results

    if (error) {
      console.error('Check webhook exists error:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Check webhook exists error:', error);
    return false;
  }
}

// Store webhook event
export async function storeWebhookEvent(
  event: MercadoPagoWebhookEvent,
  requestId: string
): Promise<string> {
  console.log('🔵 [storeWebhookEvent] Starting storage...');
  console.log('🔵 [storeWebhookEvent] Request ID:', requestId);
  console.log('🔵 [storeWebhookEvent] Event type:', event.type);
  console.log('🔵 [storeWebhookEvent] Event action:', event.action);
  console.log('🔵 [storeWebhookEvent] Full event:', JSON.stringify(event, null, 2));
  
  try {
    // Converter evento para JSON tipado
    const insertData: WebhookEventInsert = {
      gateway: 'mercadopago',
      gateway_event_id: requestId,
      event_type: event.type,
      processed: false,
      payload: event as any, // Cast necessário pois o tipo é genérico
    };
    
    console.log('🔵 [storeWebhookEvent] Insert data:', JSON.stringify(insertData, null, 2));
    
    const { data, error } = await supabase
      .from('webhook_events')
      .insert(insertData)
      .select('id')
      .single();

    if (error) {
      console.error('❌ [storeWebhookEvent] Supabase error:', error);
      console.error('❌ [storeWebhookEvent] Error details:', JSON.stringify(error, null, 2));
      throw error;
    }

    console.log('✅ [storeWebhookEvent] Successfully stored! ID:', data.id);
    return data.id;
  } catch (error) {
    console.error('❌ [storeWebhookEvent] Catch error:', error);
    throw error;
  }
}

// Process webhook event
export async function processWebhook(event: MercadoPagoWebhookEvent): Promise<void> {
  try {
    console.log('Processing webhook event:', {
      id: event.id,
      type: event.type,
      action: event.action,
      dataId: event.data.id,
    });

    switch (event.type) {
      case 'payment':
        await processPaymentWebhook(event.data.id);
        break;
      
      case 'merchant_order':
        await processMerchantOrderWebhook(event.data.id);
        break;
      
      case 'subscription_authorized_payment':
        await processSubscriptionWebhook(event.data.id);
        break;
      
      default:
        console.log('Unhandled webhook type:', event.type);
    }

  } catch (error: any) {
    console.error('Process webhook error:', error);
    throw error;
  }
}

// Process payment webhook
async function processPaymentWebhook(paymentId: string): Promise<void> {
  try {
    console.log('Processing payment webhook:', paymentId);
    
    // Use the orders.ts function to process payment
    await processPaymentConfirmation(paymentId);
    
    console.log('✅ Payment webhook processed successfully:', paymentId);
  } catch (error: any) {
    console.error('Process payment webhook error:', error);
    throw error;
  }
}

// Process merchant order webhook
async function processMerchantOrderWebhook(orderId: string): Promise<void> {
  try {
    console.log('Processing merchant order webhook:', orderId);
    
    // For now, just log - merchant orders are mainly for tracking
    console.log('✅ Merchant order webhook logged:', orderId);
  } catch (error: any) {
    console.error('Process merchant order webhook error:', error);
    throw error;
  }
}

// Process subscription webhook
async function processSubscriptionWebhook(subscriptionId: string): Promise<void> {
  try {
    console.log('Processing subscription webhook:', subscriptionId);
    
    // For now, just log - subscriptions need separate handling
    console.log('✅ Subscription webhook logged:', subscriptionId);
  } catch (error: any) {
    console.error('Process subscription webhook error:', error);
    throw error;
  }
}

// Mark webhook as processed
export async function markWebhookProcessed(
  eventId: string,
  success: boolean = true,
  error?: string
): Promise<void> {
  try {
    const { error: updateError } = await supabase
      .from('webhook_events')
      .update({
        processed: true,
        processed_at: new Date().toISOString(),
        error_message: error || null,
      })
      .eq('gateway_event_id', eventId);

    if (updateError) {
      console.error('❌ [markWebhookProcessed] Error:', updateError);
    } else {
      console.log('✅ [markWebhookProcessed] Success for:', eventId);
    }
  } catch (error) {
    console.error('❌ [markWebhookProcessed] Catch error:', error);
  }
}