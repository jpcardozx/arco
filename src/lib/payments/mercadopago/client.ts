import MercadoPago from 'mercadopago';

// Validate configuration before initialization
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
const publicKey = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY;

// Allow build to proceed even without tokens (will fail at runtime if used)
if (process.env.NODE_ENV === 'production' && !accessToken) {
  console.warn('⚠️ MERCADOPAGO_ACCESS_TOKEN not set - payment features will be disabled');
}

// Initialize Mercado Pago client only if token exists
export const mercadoPagoClient = accessToken ? new MercadoPago({
  accessToken,
  options: {
    timeout: 5000,
    idempotencyKey: undefined, // Will be set per request
  }
}) : null;

// Configuration constants
export const MP_CONFIG = {
  publicKey: publicKey || '',
  env: process.env.MERCADOPAGO_ENV || 'test',
  webhookSecret: process.env.MERCADOPAGO_WEBHOOK_SECRET || '',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  enabled: !!accessToken && !!publicKey,
} as const;

// Test connection (optional - only in development)
if (process.env.NODE_ENV === 'development') {
  // Simple validation - just check if client is configured
  if (mercadoPagoClient?.accessToken) {
    console.log('✅ Mercado Pago client initialized successfully');
  } else {
    console.warn('⚠️ Mercado Pago client not initialized - payment features disabled');
  }
}

export default mercadoPagoClient;