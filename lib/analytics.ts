import { type NextWebVitalsMetric } from 'next/app'

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'
const analyticsEndpoint = 'https://analytics.arco-performance.com/v1/events'

// Enhanced connection information
function getConnectionInfo() {
    const navigator = typeof window !== 'undefined' ? window.navigator : null;
    const connection = navigator && 'connection' in navigator ? 
        (navigator as any)['connection'] : null;

    if (!connection) return { effectiveType: '', saveData: false, rtt: 0 };
    
    return {
        effectiveType: connection.effectiveType || '',
        saveData: connection.saveData || false,
        rtt: connection.rtt || 0
    };
}

// Detect device category for better analytics segmentation
function getDeviceCategory() {
    const ua = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        return /iPad|tablet|Nexus 10|SM-T|Tablet|Tab/i.test(ua) ? 'tablet' : 'mobile';
    }
    return 'desktop';
}

export function sendWebVitals(metric: NextWebVitalsMetric) {
    const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID

    if (!analyticsId) {
        return
    }

    const body = {
        dsn: analyticsId,
        id: metric.id,
        page: window.location.pathname,
        href: window.location.href,
        event_name: metric.name,
        value: metric.value.toString(),
        speed: getConnectionSpeed(),
    }

    const blob = new Blob([new URLSearchParams(body).toString()], {
        type: 'application/x-www-form-urlencoded',
    })
    if (navigator.sendBeacon) {
        navigator.sendBeacon(vitalsUrl, blob)
    } else
        fetch(vitalsUrl, {
            body: blob,
            method: 'POST',
            credentials: 'omit',
            keepalive: true,
        })
}

/**
 * Track page views with additional context
 */
export function trackPageView(page: string, additionalData: Record<string, any> = {}) {
    if (typeof window === 'undefined') return;

    const { effectiveType, saveData, rtt } = getConnectionInfo();
    const deviceCategory = getDeviceCategory();
    
    const data = {
        event: 'pageview',
        page,
        url: window.location.href,
        referrer: document.referrer || '',
        deviceCategory,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        connection: {
            effectiveType,
            saveData,
            rtt
        },
        timestamp: new Date().toISOString(),
        ...additionalData
    };
    
    // Use sendBeacon for non-blocking analytics
    if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(data)], { 
            type: 'application/json'
        });
        navigator.sendBeacon(analyticsEndpoint, blob);
    } else {
        fetch(analyticsEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
            keepalive: true
        }).catch(() => {}); // Silently fail
    }
}

/**
 * Track user interactions with components
 */
export function trackEvent(eventName: string, data: Record<string, any> = {}) {
    if (typeof window === 'undefined') return;
    
    const payload = {
        event: eventName,
        page: window.location.pathname,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        ...data
    };
    
    // Use sendBeacon for non-blocking analytics
    if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { 
            type: 'application/json'
        });
        navigator.sendBeacon(analyticsEndpoint, blob);
    } else {
        fetch(analyticsEndpoint, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
            keepalive: true
        }).catch(() => {}); // Silently fail
    }
}

/**
 * Track conversion funnel progress
 */
export function trackFunnelStep(funnelName: string, stepName: string, stepIndex: number, additionalData: Record<string, any> = {}) {
    trackEvent('funnel_progress', {
        funnel: funnelName,
        step: stepName,
        stepIndex,
        ...additionalData
    });
}

/**
 * Track performance metrics of specific UI components
 */
export function trackComponentPerformance(componentName: string, renderTime: number, additionalData: Record<string, any> = {}) {
    trackEvent('component_performance', {
        component: componentName,
        renderTime,
        ...additionalData
    });
}
