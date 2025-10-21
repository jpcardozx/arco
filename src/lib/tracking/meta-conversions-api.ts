/**
 * Meta Conversions API Integration
 * 
 * Implementação da API de Conversões da Meta para tracking server-side de eventos CRM.
 * Conecta dados de leads do sistema ao Meta Ads Manager para otimização de campanhas.
 * 
 * Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api
 * 
 * Dataset ID: 1574079363975678
 * API Version: v24.0
 */

import crypto from 'crypto';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type MetaEventName = 
  | 'Lead'
  | 'CompleteRegistration'
  | 'Schedule'
  | 'Purchase'
  | 'Contact'
  | 'SubmitApplication'
  | 'Subscribe';

export type ActionSource = 'system_generated';
export type EventSource = 'crm';

export interface MetaUserData {
  /** Email convertido em hash SHA-256 */
  em?: string[];
  /** Telefone convertido em hash SHA-256 */
  ph?: string[];
  /** Lead ID de 15-17 dígitos gerado pela Meta */
  lead_id?: number;
  /** Identificação do clique */
  fbc?: string;
  fbp?: string;
  /** Nome convertido em hash */
  fn?: string[];
  /** Sobrenome convertido em hash */
  ln?: string[];
  /** Cidade convertida em hash */
  ct?: string[];
  /** Estado/Província convertido em hash */
  st?: string[];
  /** Código postal convertido em hash */
  zp?: string[];
  /** País convertido em hash */
  country?: string[];
  /** Gênero (m, f) */
  ge?: string[];
  /** Data de nascimento (YYYYMMDD) */
  db?: string[];
  /** IP do cliente */
  client_ip_address?: string;
  /** User Agent do cliente */
  client_user_agent?: string;
}

export interface MetaCustomData {
  /** Nome do CRM de origem */
  lead_event_source: string;
  /** Sempre 'crm' */
  event_source: EventSource;
  /** Valor monetário do evento */
  value?: number;
  /** Moeda (BRL, USD, etc.) */
  currency?: string;
  /** Dados customizados adicionais */
  [key: string]: any;
}

export interface MetaConversionEvent {
  /** Nome do evento */
  event_name: MetaEventName;
  /** Timestamp UNIX (segundos) */
  event_time: number;
  /** Sempre 'system_generated' */
  action_source: ActionSource;
  /** Dados do usuário */
  user_data: MetaUserData;
  /** Dados customizados do evento */
  custom_data: MetaCustomData;
  /** ID único do evento (para deduplicação) */
  event_id?: string;
  /** Código de teste (opcional, para eventos de teste) */
  test_event_code?: string;
}

export interface MetaConversionsAPIPayload {
  data: MetaConversionEvent[];
  test_event_code?: string;
}

export interface MetaConversionsAPIResponse {
  events_received?: number;
  messages?: string[];
  fbtrace_id?: string;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const META_CONFIG = {
  API_VERSION: 'v24.0',
  DATASET_ID: process.env.META_DATASET_ID || '1574079363975678',
  ACCESS_TOKEN: process.env.META_CONVERSION_API_TOKEN || '',
  TEST_EVENT_CODE: process.env.META_TEST_EVENT_CODE || '',
  CRM_NAME: 'ARCO WebDev',
} as const;

const META_API_ENDPOINT = `https://graph.facebook.com/${META_CONFIG.API_VERSION}/${META_CONFIG.DATASET_ID}/events`;

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Converte string em hash SHA-256 lowercase
 */
export function hashSHA256(value: string): string {
  if (!value) return '';
  
  // Normalizar: remover espaços, converter para lowercase
  const normalized = value.trim().toLowerCase();
  
  return crypto
    .createHash('sha256')
    .update(normalized)
    .digest('hex');
}

/**
 * Normaliza e converte email em hash
 */
export function hashEmail(email: string): string {
  if (!email) return '';
  
  // Remover espaços e converter para lowercase
  const normalized = email.trim().toLowerCase();
  
  return hashSHA256(normalized);
}

/**
 * Normaliza e converte telefone em hash
 * Remove todos os caracteres não-numéricos e adiciona código do país se necessário
 */
export function hashPhone(phone: string, countryCode: string = '55'): string {
  if (!phone) return '';
  
  // Remover todos os caracteres não-numéricos
  let normalized = phone.replace(/\D/g, '');
  
  // Adicionar código do país se não existir
  if (!normalized.startsWith(countryCode)) {
    normalized = countryCode + normalized;
  }
  
  return hashSHA256(normalized);
}

/**
 * Gera Event ID único para deduplicação
 */
export function generateEventId(prefix: string = 'evt'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Obtém timestamp UNIX em segundos
 */
export function getUnixTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

// ============================================================================
// META CONVERSIONS API CLIENT
// ============================================================================

export class MetaConversionsAPI {
  private accessToken: string;
  private datasetId: string;
  private testEventCode?: string;

  constructor(config?: {
    accessToken?: string;
    datasetId?: string;
    testEventCode?: string;
  }) {
    this.accessToken = config?.accessToken || META_CONFIG.ACCESS_TOKEN;
    this.datasetId = config?.datasetId || META_CONFIG.DATASET_ID;
    this.testEventCode = config?.testEventCode || META_CONFIG.TEST_EVENT_CODE;

    if (!this.accessToken) {
      console.warn('⚠️ Meta Conversions API: Access token não configurado');
    }
  }

  /**
   * Envia evento único para a Meta
   */
  async sendEvent(
    event: Omit<MetaConversionEvent, 'action_source' | 'custom_data'> & {
      custom_data?: Partial<MetaCustomData>;
    },
    isTest: boolean = false
  ): Promise<MetaConversionsAPIResponse> {
    const completeEvent: MetaConversionEvent = {
      ...event,
      action_source: 'system_generated',
      custom_data: {
        event_source: 'crm',
        lead_event_source: META_CONFIG.CRM_NAME,
        ...event.custom_data,
      },
      event_id: event.event_id || generateEventId(event.event_name.toLowerCase()),
      event_time: event.event_time || getUnixTimestamp(),
    };

    if (isTest && this.testEventCode) {
      completeEvent.test_event_code = this.testEventCode;
    }

    return this.sendBatch([completeEvent], isTest);
  }

  /**
   * Envia múltiplos eventos em batch
   */
  async sendBatch(
    events: MetaConversionEvent[],
    isTest: boolean = false
  ): Promise<MetaConversionsAPIResponse> {
    if (!this.accessToken) {
      throw new Error('Meta Conversions API: Access token não configurado');
    }

    const payload: MetaConversionsAPIPayload = {
      data: events,
    };

    if (isTest && this.testEventCode) {
      payload.test_event_code = this.testEventCode;
    }

    try {
      const response = await fetch(
        `${META_API_ENDPOINT}?access_token=${this.accessToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Meta API Error: ${response.status} - ${JSON.stringify(errorData)}`
        );
      }

      const result: MetaConversionsAPIResponse = await response.json();

      console.log('✅ Meta Conversions API: Evento enviado com sucesso', {
        events_received: result.events_received,
        fbtrace_id: result.fbtrace_id,
        is_test: isTest,
      });

      return result;
    } catch (error) {
      console.error('❌ Meta Conversions API: Erro ao enviar evento', error);
      throw error;
    }
  }

  /**
   * Helper: Envia evento de Lead capturado
   */
  async trackLead(data: {
    email: string;
    phone?: string;
    leadId?: number;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    ip?: string;
    userAgent?: string;
    fbc?: string;
    fbp?: string;
    value?: number;
    additionalData?: Record<string, any>;
  }): Promise<MetaConversionsAPIResponse> {
    const userData: MetaUserData = {
      em: [hashEmail(data.email)],
    };

    if (data.phone) {
      userData.ph = [hashPhone(data.phone)];
    }

    if (data.leadId) {
      userData.lead_id = data.leadId;
    }

    if (data.firstName) {
      userData.fn = [hashSHA256(data.firstName)];
    }

    if (data.lastName) {
      userData.ln = [hashSHA256(data.lastName)];
    }

    if (data.city) {
      userData.ct = [hashSHA256(data.city)];
    }

    if (data.state) {
      userData.st = [hashSHA256(data.state)];
    }

    if (data.zipCode) {
      userData.zp = [hashSHA256(data.zipCode)];
    }

    if (data.ip) {
      userData.client_ip_address = data.ip;
    }

    if (data.userAgent) {
      userData.client_user_agent = data.userAgent;
    }

    if (data.fbc) {
      userData.fbc = data.fbc;
    }

    if (data.fbp) {
      userData.fbp = data.fbp;
    }

    return this.sendEvent({
      event_name: 'Lead',
      event_time: getUnixTimestamp(),
      user_data: userData,
      custom_data: {
        value: data.value,
        currency: 'BRL',
        ...data.additionalData,
      },
    });
  }

  /**
   * Helper: Envia evento de Agendamento
   */
  async trackSchedule(data: {
    email: string;
    phone?: string;
    leadId?: number;
    value?: number;
    serviceType?: string;
    scheduledDate?: string;
    additionalData?: Record<string, any>;
  }): Promise<MetaConversionsAPIResponse> {
    return this.sendEvent({
      event_name: 'Schedule',
      event_time: getUnixTimestamp(),
      user_data: {
        em: [hashEmail(data.email)],
        ph: data.phone ? [hashPhone(data.phone)] : undefined,
        lead_id: data.leadId,
      },
      custom_data: {
        value: data.value,
        currency: 'BRL',
        service_type: data.serviceType,
        scheduled_date: data.scheduledDate,
        ...data.additionalData,
      },
    });
  }

  /**
   * Helper: Envia evento de Compra
   */
  async trackPurchase(data: {
    email: string;
    phone?: string;
    leadId?: number;
    value: number;
    currency?: string;
    orderId?: string;
    additionalData?: Record<string, any>;
  }): Promise<MetaConversionsAPIResponse> {
    return this.sendEvent({
      event_name: 'Purchase',
      event_time: getUnixTimestamp(),
      user_data: {
        em: [hashEmail(data.email)],
        ph: data.phone ? [hashPhone(data.phone)] : undefined,
        lead_id: data.leadId,
      },
      custom_data: {
        value: data.value,
        currency: data.currency || 'BRL',
        order_id: data.orderId,
        ...data.additionalData,
      },
    });
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

let metaAPIInstance: MetaConversionsAPI | null = null;

export function getMetaConversionsAPI(): MetaConversionsAPI {
  if (!metaAPIInstance) {
    metaAPIInstance = new MetaConversionsAPI();
  }
  return metaAPIInstance;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default MetaConversionsAPI;
