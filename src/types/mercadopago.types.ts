// Mercado Pago Types
export interface MercadoPagoPreference {
  id: string;
  items: Array<{
    id: string;
    title: string;
    description?: string;
    quantity: number;
    unit_price: number;
    currency_id: string;
  }>;
  back_urls?: {
    success?: string;
    failure?: string;
    pending?: string;
  };
  auto_return?: 'approved' | 'all';
  external_reference?: string;
  statement_descriptor?: string;
  metadata?: Record<string, any>;
}

export interface MercadoPagoPayment {
  id: number;
  status: 'pending' | 'approved' | 'authorized' | 'in_process' | 'in_mediation' | 'rejected' | 'cancelled' | 'refunded' | 'charged_back';
  status_detail: string;
  transaction_amount: number;
  currency_id: string;
  payment_method_id: string;
  payment_type_id: string;
  date_created: string;
  date_approved?: string;
  payer: {
    id?: string;
    email?: string;
    identification?: {
      type: string;
      number: string;
    };
  };
  external_reference?: string;
  metadata?: Record<string, any>;
}

export interface MercadoPagoWebhookEvent {
  id: string;
  type: 'payment' | 'plan' | 'subscription' | 'invoice' | 'point_integration_wh';
  action: string;
  data: {
    id: string;
  };
  date_created: string;
  live_mode: boolean;
  user_id: string;
  api_version: string;
}
