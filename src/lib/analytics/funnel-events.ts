/**
 * Funnel Events - Standardized Event Names
 *
 * Based on CAC optimization best practices:
 * - Lead Ads → Lead Magnet → Tripwire → Schedule → Show
 * - Conversion Leads (CRM status back to Meta)
 * - WhatsApp cost tracking (per-message pricing desde 01/07/2025)
 *
 * Naming convention matches PostHog + Meta CAPI integration
 */

// ============================================================================
// FUNNEL STAGES
// ============================================================================

export const FUNNEL_EVENTS = {
  // Stage 1: Acquisition (Meta Lead Ads)
  LEAD_INSTANT_FORM_SUBMITTED: 'lead_instant_form_submitted', // Lead Ads nativo
  LP_VIEWED: 'viewcontent_lp', // Landing page view

  // Stage 2: Lead Magnet (CompleteRegistration)
  LEAD_MAGNET_SUBMITTED: 'lead_magnet_submitted',
  LEAD_MAGNET_CONFIRMED: 'lead_magnet_confirmed',

  // Stage 3: Tripwire (InitiateCheckout → Purchase)
  TRIPWIRE_VIEWED: 'tripwire_viewed',
  TRIPWIRE_CHECKOUT_STARTED: 'tripwire_checkout_started',
  TRIPWIRE_PAID: 'tripwire_paid',

  // Stage 4: Schedule (Custom event)
  SCHEDULE_INIT: 'schedule_init',
  SCHEDULE_CONFIRMED: 'schedule_confirmed',
  SCHEDULE_REMINDER_SENT: 'schedule_reminder_sent',

  // Stage 5: Show (Conversion Leads)
  FIRST_VISIT_COMPLETED: 'first_visit_completed',
  FIRST_VISIT_NO_SHOW: 'first_visit_no_show',

  // WhatsApp (per-message cost tracking)
  WA_TEMPLATE_SENT: 'wa_template_sent',
  WA_REMINDER_SENT: 'wa_reminder_sent',
  WA_CONVERSATION_OPENED: 'wa_conversation_opened',

  // CRM Status Updates (Conversion Leads)
  CRM_LEAD_QUALIFIED: 'crm_lead_qualified',
  CRM_LEAD_SCHEDULED: 'crm_lead_scheduled',
  CRM_LEAD_SHOWED: 'crm_lead_showed',
  CRM_LEAD_PURCHASED: 'crm_lead_purchased',
  CRM_LEAD_LOST: 'crm_lead_lost',
} as const;

export type FunnelEventName = typeof FUNNEL_EVENTS[keyof typeof FUNNEL_EVENTS];

// ============================================================================
// META EVENT MAPPING
// ============================================================================

/**
 * Maps funnel events to Meta standard events
 * Used for Pixel + CAPI synchronization
 */
export const META_EVENT_MAPPING: Record<string, string> = {
  [FUNNEL_EVENTS.LEAD_INSTANT_FORM_SUBMITTED]: 'Lead',
  [FUNNEL_EVENTS.LP_VIEWED]: 'ViewContent',
  [FUNNEL_EVENTS.LEAD_MAGNET_SUBMITTED]: 'CompleteRegistration',
  [FUNNEL_EVENTS.LEAD_MAGNET_CONFIRMED]: 'CompleteRegistration',
  [FUNNEL_EVENTS.TRIPWIRE_CHECKOUT_STARTED]: 'InitiateCheckout',
  [FUNNEL_EVENTS.TRIPWIRE_PAID]: 'Purchase',
  [FUNNEL_EVENTS.SCHEDULE_INIT]: 'Schedule',
  [FUNNEL_EVENTS.SCHEDULE_CONFIRMED]: 'Schedule',
  [FUNNEL_EVENTS.FIRST_VISIT_COMPLETED]: 'Purchase', // or custom event
  [FUNNEL_EVENTS.CRM_LEAD_QUALIFIED]: 'Lead',
  [FUNNEL_EVENTS.CRM_LEAD_SCHEDULED]: 'Schedule',
  [FUNNEL_EVENTS.CRM_LEAD_SHOWED]: 'Purchase',
};

// ============================================================================
// WHATSAPP COST CONFIG (per-message pricing desde 01/07/2025)
// ============================================================================

/**
 * WhatsApp conversation costs (Brazil, Marketing category)
 * Source: https://developers.facebook.com/docs/whatsapp/pricing
 */
export const WHATSAPP_COSTS = {
  // Por categoria de conversa
  MARKETING_CONVERSATION: 0.0515, // USD per conversation (24h window)
  UTILITY_CONVERSATION: 0.0120, // USD per utility message
  SERVICE_CONVERSATION: 0.0120, // USD per service message

  // Custo médio em BRL (considerar câmbio ~5.00)
  MARKETING_BRL: 0.26, // R$ 0.26 por conversa marketing
  TEMPLATE_MESSAGE_BRL: 0.13, // R$ 0.13 por template message
  REMINDER_MESSAGE_BRL: 0.13, // R$ 0.13 por reminder

  // Média para cálculo de CPA
  AVG_MESSAGES_PER_LEAD: 2, // Template + Reminder
  AVG_COST_PER_LEAD_BRL: 0.26, // R$ 0.26 por lead (2 mensagens)
} as const;

// ============================================================================
// TRIPWIRE CONFIG
// ============================================================================

/**
 * Tripwire configuration for CAC offset calculation
 */
export interface TripwireConfig {
  enabled: boolean;
  ticket: number; // R$ value
  uptakeRate: number; // Expected conversion rate (0-1)
  offsetPerLead: number; // R$ offset per lead
}

export const DEFAULT_TRIPWIRE_CONFIG: TripwireConfig = {
  enabled: true,
  ticket: 39, // R$ 39 voucher
  uptakeRate: 0.15, // 15% uptake
  offsetPerLead: 5.85, // 39 * 0.15 = R$ 5.85 offset per lead
};

/**
 * Calculate net CPL with tripwire offset
 */
export function calculateNetCPL(
  grossCPL: number,
  tripwireConfig: TripwireConfig = DEFAULT_TRIPWIRE_CONFIG
): number {
  if (!tripwireConfig.enabled) return grossCPL;
  return grossCPL - tripwireConfig.offsetPerLead;
}

/**
 * Calculate net CPA with WhatsApp cost
 */
export function calculateNetCPA(
  grossCPA: number,
  includeWhatsApp: boolean = true
): number {
  if (!includeWhatsApp) return grossCPA;
  return grossCPA + WHATSAPP_COSTS.AVG_COST_PER_LEAD_BRL;
}

// ============================================================================
// CONVERSION LEADS STATUS MAPPING
// ============================================================================

/**
 * CRM status → Meta Conversion Leads status
 * Source: https://developers.facebook.com/docs/marketing-api/conversions-api/conversion-leads-integration
 */
export const CONVERSION_LEADS_STATUS = {
  QUALIFIED: 'qualified',
  SCHEDULED: 'scheduled',
  SHOWED: 'showed',
  PURCHASED: 'purchased',
  LOST: 'lost',
  DUPLICATE: 'duplicate',
} as const;

export type ConversionLeadsStatus = typeof CONVERSION_LEADS_STATUS[keyof typeof CONVERSION_LEADS_STATUS];

/**
 * Map CRM status to Conversion Leads status
 */
export function mapCRMToConversionLeads(crmStatus: string): ConversionLeadsStatus | null {
  const statusMap: Record<string, ConversionLeadsStatus> = {
    'qualified': CONVERSION_LEADS_STATUS.QUALIFIED,
    'agendado': CONVERSION_LEADS_STATUS.SCHEDULED,
    'compareceu': CONVERSION_LEADS_STATUS.SHOWED,
    'cliente': CONVERSION_LEADS_STATUS.PURCHASED,
    'perdido': CONVERSION_LEADS_STATUS.LOST,
    'duplicado': CONVERSION_LEADS_STATUS.DUPLICATE,
  };

  return statusMap[crmStatus.toLowerCase()] || null;
}

// ============================================================================
// EVENT PROPERTIES INTERFACES
// ============================================================================

export interface LeadMagnetEventProperties {
  email: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  source: string;
  campaign?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

export interface TripwireEventProperties {
  email: string;
  value: number;
  currency: string;
  orderId?: string;
  ticket: number;
  source: string;
}

export interface ScheduleEventProperties {
  email: string;
  phone?: string;
  scheduledDate: string;
  scheduledTime: string;
  service?: string;
  source: string;
}

export interface WhatsAppEventProperties {
  email?: string;
  phone: string;
  messageType: 'template' | 'reminder' | 'conversation';
  cost: number;
  currency: string;
  templateName?: string;
}

export interface ConversionLeadEventProperties {
  email: string;
  phone?: string;
  status: ConversionLeadsStatus;
  leadId: string;
  value?: number;
  currency?: string;
  timestamp: string;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if event should be sent to Meta CAPI
 */
export function shouldSendToMetaCAPI(eventName: FunnelEventName): boolean {
  return eventName in META_EVENT_MAPPING;
}

/**
 * Get Meta event name from funnel event
 */
export function getMetaEventName(eventName: FunnelEventName): string | null {
  return META_EVENT_MAPPING[eventName] || null;
}

/**
 * Calculate total CAC (with WhatsApp + tripwire offset)
 */
export interface CACCalculation {
  grossCPL: number;
  netCPL: number; // After tripwire offset
  whatsAppCost: number;
  agendamentoRate: number; // 0-1
  showRate: number; // 0-1
  grossCPA: number;
  netCPA: number; // Final CPA (with WhatsApp, after tripwire)
}

export function calculateCAC(
  cpl: number,
  agendamentoRate: number,
  showRate: number,
  tripwireConfig: TripwireConfig = DEFAULT_TRIPWIRE_CONFIG
): CACCalculation {
  const netCPL = calculateNetCPL(cpl, tripwireConfig);
  const whatsAppCost = WHATSAPP_COSTS.AVG_COST_PER_LEAD_BRL;
  const grossCPA = cpl / (agendamentoRate * showRate);
  const netCPA = (netCPL + whatsAppCost) / (agendamentoRate * showRate);

  return {
    grossCPL: cpl,
    netCPL,
    whatsAppCost,
    agendamentoRate,
    showRate,
    grossCPA,
    netCPA,
  };
}

/**
 * Check if CAC is below target (R$ 75)
 */
export function isCACBelowTarget(cac: CACCalculation, target: number = 75): boolean {
  return cac.netCPA <= target;
}

// ============================================================================
// EXPORTS
// ============================================================================

export default FUNNEL_EVENTS;
