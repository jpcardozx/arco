'use client';

/**
 * Meta Pixel Component
 * 
 * Client-side tracking para Meta Ads (Facebook/Instagram)
 * Sincronizado com CAPI via event_id para deduplicação
 * 
 * Eventos automáticos:
 * - PageView (todas as páginas)
 * 
 * Eventos manuais (via hook):
 * - Lead, ViewContent, InitiateCheckout, Purchase
 */

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  // Track PageView on route change
  useEffect(() => {
    if (!pixelId) {
      console.warn('[Meta Pixel] NEXT_PUBLIC_META_PIXEL_ID not configured');
      return;
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
      
      console.log('[Meta Pixel] PageView tracked:', {
        pathname,
        search: searchParams?.toString(),
      });
    }
  }, [pathname, searchParams, pixelId]);

  // No render - script injected in layout
  return null;
}

/**
 * Meta Pixel Inline Script Component (Server-Safe)
 * 
 * Usage in layout.tsx:
 * ```tsx
 * <MetaPixelScript />
 * ```
 */
export function MetaPixelScript() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  
  if (!pixelId) {
    return null; // No script if not configured
  }

  const scriptContent = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;

  return (
    <script
      id="meta-pixel"
      dangerouslySetInnerHTML={{ __html: scriptContent }}
    />
  );
}

/**
 * Meta Pixel tracking helper
 * Use this in client components to track events with deduplication
 * 
 * @param event - Event name
 * @param data - Event data
 * @param eventId - Event ID for CAPI deduplication
 * 
 * @example
 * ```tsx
 * import { trackMetaEvent } from '@/components/meta-pixel';
 * 
 * // Generate event ID for deduplication
 * const eventId = crypto.randomUUID();
 * 
 * // Track client-side (Pixel)
 * trackMetaEvent('Lead', { value: 0, currency: 'BRL' }, eventId);
 * 
 * // Track server-side (CAPI)
 * await fetch('/api/meta/track', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     event_name: 'Lead',
 *     event_id: eventId, // Same ID for dedup
 *     user_data: { ... },
 *   }),
 * });
 * ```
 */
export function trackMetaEvent(
  event: string,
  data: Record<string, any> = {},
  eventId?: string
): void {
  if (typeof window.fbq !== 'function') {
    console.warn('[Meta Pixel] fbq not loaded');
    return;
  }

  const eventData = eventId
    ? { ...data, eventID: eventId } // Capital ID for Pixel
    : data;

  window.fbq('track', event, eventData);

  console.log('[Meta Pixel] Event tracked:', {
    event,
    eventId,
    data: eventData,
  });
}

/**
 * Get Facebook Pixel cookies for CAPI
 * Used for deduplication between Pixel and CAPI
 * 
 * @returns Object with _fbp and _fbc cookies
 */
export function getFacebookPixelCookies(): {
  fbp?: string;
  fbc?: string;
} {
  if (typeof document === 'undefined') {
    return {};
  }

  const cookies = document.cookie.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);

  return {
    fbp: cookies._fbp,
    fbc: cookies._fbc,
  };
}
