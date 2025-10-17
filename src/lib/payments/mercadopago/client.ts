import MercadoPago from 'mercadopago';

// Initialize Mercado Pago client
export const mercadoPagoClient = new MercadoPago({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: {
    timeout: 5000,
    idempotencyKey: undefined, // Will be set per request
  }
});

// Configuration constants
export const MP_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!,
  env: process.env.MERCADOPAGO_ENV || 'test',
  webhookSecret: process.env.MERCADOPAGO_WEBHOOK_SECRET!,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const;

// Validate configuration on module load
if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
  throw new Error('MERCADOPAGO_ACCESS_TOKEN environment variable is required');
}

if (!process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY) {
  throw new Error('NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY environment variable is required');
}

// Test connection (optional - only in development)
if (process.env.NODE_ENV === 'development') {
  // Simple validation - just check if client is configured
  if (mercadoPagoClient.accessToken) {
    console.log('✅ Mercado Pago client initialized successfully');
  } else {
    console.error('❌ Failed to initialize Mercado Pago client: Missing access token');
  }
}

export default mercadoPagoClient;