'use client';

/**
 * useFunnelTracking Hook
 *
 * Specialized hook for tracking the complete funnel:
 * Lead Ads → Lead Magnet → Tripwire → Schedule → Show
 *
 * Handles:
 * - PostHog tracking
 * - Meta Pixel + CAPI (with event_id dedup)
 * - WhatsApp cost tracking
 * - Conversion Leads status updates
 * - CAC calculation
 */

'use client';

import { useCallback } from 'react';
import posthog from 'posthog-js';
import { useMetaTracking } from './useMetaTracking';
import { useAnalytics } from './useAnalytics';
import {
  FUNNEL_EVENTS,
  META_EVENT_MAPPING,
  WHATSAPP_COSTS,
  CONVERSION_LEADS_STATUS,
  calculateCAC,
  type LeadMagnetEventProperties,
  type TripwireEventProperties,
  type ScheduleEventProperties,
  type WhatsAppEventProperties,
  type ConversionLeadEventProperties,
  type ConversionLeadsStatus,
} from '@/lib/analytics/funnel-events';

// ============================================================================
// HOOK
// ============================================================================

export function useFunnelTracking() {
  const { trackEvent: trackMetaEvent } = useMetaTracking();
  const { identify } = useAnalytics();

  /**
   * P1.3: Track Lead Magnet submission
   * Maps to CompleteRegistration in Meta
   */
  const trackLeadMagnet = useCallback(
    async (properties: LeadMagnetEventProperties): Promise<void> => {
      console.log('🎯 [Funnel] Lead Magnet submitted', properties);

      // PostHog
      if (posthog.__loaded) {
        posthog.capture(FUNNEL_EVENTS.LEAD_MAGNET_SUBMITTED, properties);

        // Identify user
        posthog.identify(properties.email, {
          email: properties.email,
          phone: properties.phone,
          name: properties.firstName ? `${properties.firstName} ${properties.lastName || ''}`.trim() : undefined,
          source: properties.source,
          campaign: properties.campaign,
        });
      }

      // Meta CAPI + Pixel (with dedup)
      try {
        const metaResponse = await trackMetaEvent({
          eventName: 'CompleteRegistration',
          userData: {
            email: properties.email,
            phone: properties.phone,
            firstName: properties.firstName,
            lastName: properties.lastName,
          },
          customData: {
            source: properties.source,
            campaign: properties.campaign,
          },
        });

        // Sync Pixel with same event_id
        if (metaResponse.success && metaResponse.eventId && typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'CompleteRegistration', {
            eventID: metaResponse.eventId,
            status: 'lead_magnet',
          });
        }
      } catch (error) {
        console.error('Failed to track lead magnet:', error);
      }
    },
    [trackMetaEvent]
  );

  /**
   * P1.3 + Extra.9: Track Tripwire (voucher purchase)
   * Used for CAC offset calculation
   */
  const trackTripwire = useCallback(
    async (action: 'viewed' | 'started' | 'paid', properties: TripwireEventProperties): Promise<void> => {
      const eventName =
        action === 'viewed'
          ? FUNNEL_EVENTS.TRIPWIRE_VIEWED
          : action === 'started'
          ? FUNNEL_EVENTS.TRIPWIRE_CHECKOUT_STARTED
          : FUNNEL_EVENTS.TRIPWIRE_PAID;

      console.log(`💰 [Funnel] Tripwire ${action}`, properties);

      // PostHog
      if (posthog.__loaded) {
        posthog.capture(eventName, {
          ...properties,
          tripwire_ticket: properties.ticket,
          tripwire_offset: properties.ticket * 0.15, // Assuming 15% uptake
        });
      }

      // Meta - Only track paid
      if (action === 'paid') {
        try {
          const metaResponse = await trackMetaEvent({
            eventName: 'Purchase',
            userData: {
              email: properties.email,
            },
            customData: {
              value: properties.value,
              currency: properties.currency,
              order_id: properties.orderId,
              content_type: 'tripwire_voucher',
              source: properties.source,
            },
          });

          // Sync Pixel
          if (metaResponse.success && metaResponse.eventId && typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'Purchase', {
              eventID: metaResponse.eventId,
              value: properties.value,
              currency: properties.currency,
              content_type: 'tripwire',
            });
          }
        } catch (error) {
          console.error('Failed to track tripwire:', error);
        }
      }
    },
    [trackMetaEvent]
  );

  /**
   * P1.3: Track Schedule (init or confirmed)
   */
  const trackSchedule = useCallback(
    async (action: 'init' | 'confirmed' | 'reminder_sent', properties: ScheduleEventProperties): Promise<void> => {
      const eventName =
        action === 'init'
          ? FUNNEL_EVENTS.SCHEDULE_INIT
          : action === 'confirmed'
          ? FUNNEL_EVENTS.SCHEDULE_CONFIRMED
          : FUNNEL_EVENTS.SCHEDULE_REMINDER_SENT;

      console.log(`📅 [Funnel] Schedule ${action}`, properties);

      // PostHog
      if (posthog.__loaded) {
        posthog.capture(eventName, properties);
      }

      // Meta - Only track confirmed
      if (action === 'confirmed') {
        try {
          const metaResponse = await trackMetaEvent({
            eventName: 'Schedule',
            userData: {
              email: properties.email,
              phone: properties.phone,
            },
            customData: {
              scheduled_date: properties.scheduledDate,
              scheduled_time: properties.scheduledTime,
              service: properties.service,
              source: properties.source,
            },
          });

          // Sync Pixel
          if (metaResponse.success && metaResponse.eventId && typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'Schedule', {
              eventID: metaResponse.eventId,
              scheduled_date: properties.scheduledDate,
            });
          }
        } catch (error) {
          console.error('Failed to track schedule:', error);
        }
      }
    },
    [trackMetaEvent]
  );

  /**
   * Extra.8: Track WhatsApp messages (per-message cost)
   * Critical for accurate CPA calculation since 01/07/2025
   */
  const trackWhatsApp = useCallback(
    async (properties: WhatsAppEventProperties): Promise<void> => {
      const eventName =
        properties.messageType === 'template'
          ? FUNNEL_EVENTS.WA_TEMPLATE_SENT
          : properties.messageType === 'reminder'
          ? FUNNEL_EVENTS.WA_REMINDER_SENT
          : FUNNEL_EVENTS.WA_CONVERSATION_OPENED;

      console.log(`📱 [WhatsApp] ${properties.messageType} sent`, {
        phone: properties.phone,
        cost: properties.cost,
      });

      // PostHog - Track cost for CPA calculation
      if (posthog.__loaded) {
        posthog.capture(eventName, {
          phone: properties.phone,
          message_type: properties.messageType,
          cost_brl: properties.cost,
          cost_usd: properties.cost / 5.0, // Approximate conversion
          template_name: properties.templateName,
        });
      }

      // No Meta tracking for WhatsApp messages (internal cost tracking only)
    },
    []
  );

  /**
   * P2.7: Track Conversion Leads status update
   * CRM status back to Meta for better optimization
   */
  const trackConversionLeadStatus = useCallback(
    async (properties: ConversionLeadEventProperties): Promise<void> => {
      const eventName = `crm_lead_${properties.status}` as const;

      console.log(`🎯 [Conversion Leads] Status: ${properties.status}`, properties);

      // PostHog
      if (posthog.__loaded) {
        posthog.capture(eventName, properties);
      }

      // Meta Conversion Leads API
      try {
        // Note: This should go through your Edge Function
        // That handles Conversion Leads API integration
        await fetch('/api/meta/conversion-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lead_id: properties.leadId,
            status: properties.status,
            email: properties.email,
            phone: properties.phone,
            value: properties.value,
            currency: properties.currency,
            timestamp: properties.timestamp,
          }),
        });

        console.log('✅ [Conversion Leads] Status sent to Meta:', properties.status);
      } catch (error) {
        console.error('Failed to track conversion lead status:', error);
      }
    },
    []
  );

  /**
   * Helper: Calculate and log CAC metrics
   */
  const logCACMetrics = useCallback(
    (cpl: number, agendamentoRate: number, showRate: number): void => {
      const cac = calculateCAC(cpl, agendamentoRate, showRate);

      console.log('💰 [CAC Metrics]', {
        grossCPL: `R$ ${cac.grossCPL.toFixed(2)}`,
        netCPL: `R$ ${cac.netCPL.toFixed(2)} (after tripwire)`,
        whatsAppCost: `R$ ${cac.whatsAppCost.toFixed(2)}`,
        grossCPA: `R$ ${cac.grossCPA.toFixed(2)}`,
        netCPA: `R$ ${cac.netCPA.toFixed(2)}`,
        isUnderTarget: cac.netCPA <= 75,
      });

      // Track in PostHog for analysis
      if (posthog.__loaded) {
        posthog.capture('cac_calculated', cac);
      }
    },
    []
  );

  return {
    // Funnel tracking
    trackLeadMagnet,
    trackTripwire,
    trackSchedule,
    trackWhatsApp,
    trackConversionLeadStatus,

    // Helpers
    logCACMetrics,

    // Constants (for convenience)
    FUNNEL_EVENTS,
    WHATSAPP_COSTS,
    CONVERSION_LEADS_STATUS,
  };
}

export default useFunnelTracking;

// ============================================================================
// STANDALONE TRACKING FUNCTIONS (for components without hook access)
// ============================================================================

/**
 * Track CTA hover (micro-intent signal)
 * Used by ProfessionalCTA and other CTA components
 */
export function trackCTAHover(ctaId: string, ctaText: string, metadata?: Record<string, any>): void {
  if (posthog.__loaded) {
    posthog.capture('cta_hover', {
      cta_id: ctaId,
      cta_text: ctaText,
      intent_level: 'low_medium',
      timestamp: Date.now(),
      ...metadata,
    });
  }
}

/**
 * Track CTA click (high-intent signal)
 * Used by ProfessionalCTA and other CTA components
 */
export function trackCTAClick(ctaId: string, ctaText: string, href?: string, metadata?: Record<string, any>): void {
  if (posthog.__loaded) {
    posthog.capture('cta_click', {
      cta_id: ctaId,
      cta_text: ctaText,
      href,
      intent_level: 'high',
      timestamp: Date.now(),
      ...metadata,
    });
  }

  // Also track in Meta if it's a conversion-related CTA
  if (typeof window !== 'undefined' && window.fbq && (ctaId.includes('schedule') || ctaId.includes('diagnostic'))) {
    window.fbq('trackCustom', 'CTAClick', {
      cta_id: ctaId,
      cta_text: ctaText,
    });
  }
}
