/**
 * Payment Analytics Tracking
 * 
 * Sistema inteligente de tracking para funil de pagamento
 * Integra com Google Analytics 4 e pode ser expandido para Mixpanel, Amplitude, etc.
 */

interface PaymentEvent {
  event: string;
  userId?: string;
  planId: string;
  planName: string;
  value: number;
  currency: string;
  timestamp: number;
  sessionId?: string;
  metadata?: Record<string, any>;
}

interface ConversionFunnel {
  step: 'view_plan' | 'create_preference' | 'start_payment' | 'complete_payment' | 'activate_subscription';
  planId: string;
  userId?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PaymentAnalytics {
  private static instance: PaymentAnalytics;
  private queue: PaymentEvent[] = [];
  private sessionId: string;
  private isInitialized = false;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  static getInstance(): PaymentAnalytics {
    if (!PaymentAnalytics.instance) {
      PaymentAnalytics.instance = new PaymentAnalytics();
    }
    return PaymentAnalytics.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  }

  private initializeTracking() {
    if (typeof window === 'undefined') return;

    // Google Analytics 4
    if (typeof window.gtag !== 'undefined') {
      this.isInitialized = true;
      console.log('[Analytics] Google Analytics initialized');
    }

    // Flush queue periodicamente
    setInterval(() => this.flushQueue(), 5000);

    // Flush antes de sair da página
    window.addEventListener('beforeunload', () => this.flushQueue());
  }

  private async sendToGA4(event: PaymentEvent) {
    if (typeof window === 'undefined' || typeof window.gtag === 'undefined') return;

    try {
      window.gtag('event', event.event, {
        event_category: 'payment',
        event_label: event.planName,
        value: event.value,
        currency: event.currency,
        user_id: event.userId,
        session_id: this.sessionId,
        ...event.metadata,
      });

      console.log('[Analytics] Event sent to GA4:', event.event);
    } catch (error) {
      console.error('[Analytics] Error sending to GA4:', error);
    }
  }

  private async sendToBackend(event: PaymentEvent) {
    try {
      console.log('[Analytics] Sending to backend:', event);
      
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('[Analytics] Backend error:', response.status, errorData);
      } else {
        const data = await response.json();
        console.log('[Analytics] Backend success:', data);
      }
    } catch (error) {
      console.error('[Analytics] Error sending to backend:', {
        error: error instanceof Error ? error.message : 'Unknown',
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
  }

  private flushQueue() {
    if (this.queue.length === 0) return;

    const batch = [...this.queue];
    this.queue = [];

    batch.forEach(event => {
      this.sendToGA4(event);
      this.sendToBackend(event);
    });
  }

  /**
   * Track quando usuário visualiza plano
   */
  trackPlanView(planId: string, planName: string, value: number) {
    const event: PaymentEvent = {
      event: 'view_item',
      planId,
      planName,
      value,
      currency: 'BRL',
      timestamp: Date.now(),
      sessionId: this.sessionId,
    };

    this.queue.push(event);
  }

  /**
   * Track quando preferência é criada (intenção de compra)
   */
  trackCreatePreference(planId: string, planName: string, value: number, userId?: string) {
    const event: PaymentEvent = {
      event: 'begin_checkout',
      planId,
      planName,
      value,
      currency: 'BRL',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId,
    };

    this.queue.push(event);
    this.flushQueue(); // Flush imediatamente para eventos críticos
  }

  /**
   * Track quando pagamento é iniciado (usuário clicou em pagar)
   */
  trackStartPayment(planId: string, planName: string, value: number, userId?: string) {
    const event: PaymentEvent = {
      event: 'add_payment_info',
      planId,
      planName,
      value,
      currency: 'BRL',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId,
    };

    this.queue.push(event);
    this.flushQueue();
  }

  /**
   * Track quando pagamento é concluído (webhook confirmou)
   */
  trackCompletePayment(
    planId: string,
    planName: string,
    value: number,
    transactionId: string,
    userId?: string
  ) {
    const event: PaymentEvent = {
      event: 'purchase',
      planId,
      planName,
      value,
      currency: 'BRL',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId,
      metadata: {
        transaction_id: transactionId,
      },
    };

    this.queue.push(event);
    this.flushQueue();
  }

  /**
   * Track quando assinatura é ativada (status = active)
   */
  trackActivateSubscription(
    planId: string,
    planName: string,
    value: number,
    subscriptionId: string,
    userId?: string
  ) {
    const event: PaymentEvent = {
      event: 'subscription_activated',
      planId,
      planName,
      value,
      currency: 'BRL',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId,
      metadata: {
        subscription_id: subscriptionId,
      },
    };

    this.queue.push(event);
    this.flushQueue();
  }

  /**
   * Track erros no pagamento
   */
  trackPaymentError(
    planId: string,
    planName: string,
    errorType: string,
    errorMessage: string,
    userId?: string
  ) {
    const event: PaymentEvent = {
      event: 'payment_error',
      planId,
      planName,
      value: 0,
      currency: 'BRL',
      timestamp: Date.now(),
      sessionId: this.sessionId,
      userId,
      metadata: {
        error_type: errorType,
        error_message: errorMessage,
      },
    };

    this.queue.push(event);
    this.flushQueue();
  }

  /**
   * Gera relatório de funil de conversão
   */
  getConversionFunnel(): Record<string, number> {
    // Em produção, isso viria do backend
    return {
      plan_views: 0,
      checkout_started: 0,
      payment_initiated: 0,
      payment_completed: 0,
      subscription_activated: 0,
    };
  }
}

// Export singleton instance
export const paymentAnalytics = PaymentAnalytics.getInstance();

// Type declarations para window.gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
