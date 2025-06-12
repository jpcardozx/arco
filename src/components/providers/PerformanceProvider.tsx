'use client'

import { useEffect, ReactNode } from 'react'
import { preloadCriticalResources, optimizeAnimations, lazyLoadImages, trackPagePerformance } from '../../utils/performance'

interface PerformanceProviderProps {
    children: ReactNode
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
    useEffect(() => {
        // Initialize performance optimizations
        preloadCriticalResources()
        optimizeAnimations()

        // Set up lazy loading after component mount
        const timer = setTimeout(() => {
            lazyLoadImages()
        }, 100)

        // Track performance metrics
        trackPagePerformance()

        return () => clearTimeout(timer)
    }, [])

    return <>{children}</>
}
