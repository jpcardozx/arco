/**
 * ARCO PATCH 1: Service Worker Registration
 * Progressive Web App capabilities for performance
 */

'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
    useEffect(() => {
        if (
            typeof window !== 'undefined' &&
            'serviceWorker' in navigator &&
            process.env.NODE_ENV === 'production'
        ) {
            registerServiceWorker()
        }
    }, [])

    return null
}

async function registerServiceWorker() {
    try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none'
        })

        // Handle updates
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing

            if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        showUpdateNotification()
                    }
                })
            }
        })

        // Check for updates periodically
        setInterval(() => {
            registration.update()
        }, 60000) // Check every minute

        console.log('Service Worker registered successfully')
    } catch (error) {
        console.error('Service Worker registration failed:', error)
    }
}

function showUpdateNotification() {
    if (window.confirm('New version available! Reload to update?')) {
        window.location.reload()
    }
}

// Web Vitals sync with Service Worker
export function syncWebVitals(metric: any) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'WEB_VITALS',
            payload: metric
        })
    }
}
