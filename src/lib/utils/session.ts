/**
 * Session Management Utilities
 * Handles session ID generation and persistence for anonymous user tracking
 */

const SESSION_KEY = 'arco_session_id';
const SESSION_EXPIRY_DAYS = 30;

/**
 * Generates a cryptographically secure session ID
 */
export function generateSessionId(): string {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Gets or creates session ID from localStorage
 * Returns existing session ID or creates new one
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') {
    return ''; // SSR safety
  }

  try {
    // Try to get existing session
    const stored = localStorage.getItem(SESSION_KEY);
    
    if (stored) {
      const { sessionId, expiresAt } = JSON.parse(stored);
      
      // Check if session is still valid
      if (new Date(expiresAt) > new Date()) {
        return sessionId;
      }
    }
    
    // Create new session
    const newSessionId = generateSessionId();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + SESSION_EXPIRY_DAYS);
    
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({ sessionId: newSessionId, expiresAt: expiresAt.toISOString() })
    );
    
    return newSessionId;
  } catch (error) {
    console.error('[Session] Error managing session ID:', error);
    // Return temporary session ID if localStorage fails
    return generateSessionId();
  }
}

/**
 * Gets current session ID without creating new one
 */
export function getSessionId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    
    const { sessionId, expiresAt } = JSON.parse(stored);
    
    // Check if session is still valid
    if (new Date(expiresAt) > new Date()) {
      return sessionId;
    }
    
    return null;
  } catch (error) {
    console.error('[Session] Error reading session ID:', error);
    return null;
  }
}

/**
 * Clears current session (logout)
 */
export function clearSession(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('[Session] Error clearing session:', error);
  }
}

/**
 * Gets browser fingerprint for additional tracking
 * Simple implementation - can be enhanced with more sophisticated libraries
 */
export function getBrowserFingerprint(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  try {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      !!window.sessionStorage,
      !!window.localStorage,
    ];
    
    const fingerprint = components.join('|||');
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    return Math.abs(hash).toString(16);
  } catch (error) {
    console.error('[Session] Error generating fingerprint:', error);
    return '';
  }
}

/**
 * Gets UTM parameters from URL
 */
export function getUTMParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
} {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const params = new URLSearchParams(window.location.search);
    
    return {
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
      utmContent: params.get('utm_content') || undefined,
      utmTerm: params.get('utm_term') || undefined,
    };
  } catch (error) {
    console.error('[Session] Error reading UTM params:', error);
    return {};
  }
}

/**
 * Gets request metadata (IP will be handled server-side)
 */
export function getRequestMetadata() {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    userAgent: navigator.userAgent,
    referer: document.referrer || undefined,
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
  };
}
