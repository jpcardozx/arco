'use client'

import { useEffect } from 'react'
import { initWebVitals } from '@/lib/web-vitals'

/**
 * Web Vitals Tracker Component
 * 
 * Initializes real Web Vitals monitoring on the client side
 * Automatically tracks all Core Web Vitals and sends to analytics
 */
export function WebVitalsTracker() {
    useEffect(() => {
        // Initialize Web Vitals tracking
        initWebVitals()

        // Optional: Track page visibility changes for better metrics
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // Page is being hidden, good time to send any pending metrics
                console.log('📊 Page hidden, sending final metrics...')
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    // This component doesn't render anything
    return null
}

/**
 * Performance Monitor Component - Development Only
 * 
 * Shows real-time performance metrics during development
 */
export function DevPerformanceMonitor() {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') return

        let metricsDisplay: HTMLDivElement | null = null

        const createMetricsDisplay = () => {
            metricsDisplay = document.createElement('div')
            metricsDisplay.id = 'dev-performance-monitor'
            metricsDisplay.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 8px;
        font-family: monospace;
        font-size: 12px;
        z-index: 9999;
        max-width: 300px;
        backdrop-filter: blur(10px);
      `
            document.body.appendChild(metricsDisplay)
        }

        const updateMetricsDisplay = (metrics: Record<string, any>) => {
            if (!metricsDisplay) return

            const html = `
        <div style="margin-bottom: 8px; font-weight: bold;">📊 Real-time Web Vitals</div>
        ${Object.entries(metrics).map(([name, data]: [string, any]) => {
                const color = data.rating === 'good' ? '#22c55e' :
                    data.rating === 'needs-improvement' ? '#f59e0b' : '#ef4444'
                return `
            <div style="margin-bottom: 4px;">
              <span style="color: ${color};">●</span> 
              ${name}: ${data.value?.toFixed(name === 'CLS' ? 3 : 0)}${name === 'CLS' ? '' : name.includes('CP') || name === 'TTFB' ? 'ms' : 'ms'}
              <span style="color: ${color}; font-size: 10px;">(${data.rating})</span>
            </div>
          `
            }).join('')}
        <div style="margin-top: 8px; font-size: 10px; opacity: 0.7;">
          Updated: ${new Date().toLocaleTimeString()}
        </div>
      `
            metricsDisplay.innerHTML = html
        }

        // Create display
        createMetricsDisplay()

        // Listen for Web Vitals updates
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'webVitalsMetrics') {
                try {
                    const metrics = JSON.parse(e.newValue || '{}')
                    updateMetricsDisplay(metrics)
                } catch (error) {
                    console.error('Error parsing web vitals metrics:', error)
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)

        // Cleanup
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            if (metricsDisplay) {
                document.body.removeChild(metricsDisplay)
            }
        }
    }, [])

    return null
}
