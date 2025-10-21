/**
 * Meta Pixel Configuration
 *
 * Inicializa o Meta Pixel com event_id tracking
 * Dataset/Pixel ID: 1677581716961792
 */

declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: any) => void;
    _fbq?: any;
  }
}

// ============================================================================
// PIXEL INITIALIZATION
// ============================================================================

export function initializeMetaPixel(): void {
  if (typeof window === 'undefined') return;

  // Verificar se já foi inicializado
  if (window.fbq) {
    console.log('✅ Meta Pixel já foi inicializado');
    return;
  }

  // Meta Pixel Script (injetado dinamicamente)
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';

  script.onload = () => {
    if (window.fbq) {
      // Init Pixel
      window.fbq('init', '1677581716961792');

      // Track PageView
      window.fbq('track', 'PageView');

      console.log('✅ Meta Pixel inicializado com sucesso');
    }
  };

  script.onerror = () => {
    console.error('❌ Erro ao carregar Meta Pixel script');
  };

  // Injetar no <head>
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(script);
}

// ============================================================================
// PIXEL TRACKING FUNCTIONS
// ============================================================================

/**
 * Track evento com event_id para deduplicação
 */
export function trackPixelEvent(
  eventName: string,
  data: {
    eventID?: string;
    value?: number;
    currency?: string;
    [key: string]: any;
  } = {}
): void {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('⚠️ Meta Pixel não inicializado');
    return;
  }

  try {
    window.fbq('track', eventName, data);

    console.log('📊 [Meta Pixel] Evento rastreado', {
      eventName,
      eventID: data.eventID,
      value: data.value,
    });
  } catch (error) {
    console.error('❌ Erro ao rastrear evento no Pixel', error);
  }
}

/**
 * Track Lead com event_id (para dedup Pixel + CAPI)
 */
export function trackPixelLead(data: {
  eventID: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}): void {
  trackPixelEvent('Lead', {
    ...data,
    currency: data.currency || 'BRL',
  });
}

/**
 * Track Contact (CTWA click)
 */
export function trackPixelContact(data: {
  eventID: string;
  [key: string]: any;
}): void {
  trackPixelEvent('Contact', data);
}

/**
 * Track Schedule (agendamento)
 */
export function trackPixelSchedule(data: {
  eventID: string;
  value?: number;
  currency?: string;
  [key: string]: any;
}): void {
  trackPixelEvent('Schedule', {
    ...data,
    currency: data.currency || 'BRL',
  });
}

/**
 * Track Purchase (conversão)
 */
export function trackPixelPurchase(data: {
  eventID: string;
  value: number;
  currency?: string;
  [key: string]: any;
}): void {
  trackPixelEvent('Purchase', {
    ...data,
    currency: data.currency || 'BRL',
  });
}

/**
 * Get Pixel state (para debugging)
 */
export function getPixelState(): any {
  if (typeof window === 'undefined' || !window.fbq) {
    return null;
  }

  try {
    // @ts-ignore - fbq getState não requer segundo argumento
    return window.fbq('getState');
  } catch (error) {
    console.error('❌ Erro ao obter estado do Pixel', error);
    return null;
  }
}

// ============================================================================
// NOSCRIPT FALLBACK
// ============================================================================

export function injectPixelNoscript(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Criar noscript tag
  const noscript = document.createElement('noscript');
  const img = document.createElement('img');

  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = 'https://www.facebook.com/tr?id=1677581716961792&ev=PageView&noscript=1';

  noscript.appendChild(img);

  // Injetar no body
  document.body.appendChild(noscript);
}
