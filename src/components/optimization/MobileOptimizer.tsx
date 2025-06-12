'use client'

import { useEffect, useState } from 'react'

export function MobileOptimizer() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            const isMobileDevice = window.innerWidth < 768
            setIsMobile(isMobileDevice)

            if (isMobileDevice) {
                // Add mobile-specific optimizations
                document.documentElement.style.setProperty('--mobile-vh', `${window.innerHeight * 0.01}px`)

                // Disable hover effects on mobile
                document.documentElement.classList.add('mobile-device')

                // Optimize touch interactions
                document.documentElement.style.setProperty('touch-action', 'manipulation')

                // Reduce motion on mobile for better performance
                document.documentElement.style.setProperty('--animation-duration', '0.3s')
            } else {
                document.documentElement.classList.remove('mobile-device')
                document.documentElement.style.setProperty('--animation-duration', '0.6s')
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        window.addEventListener('orientationchange', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
            window.removeEventListener('orientationchange', checkMobile)
        }
    }, [])

    return null
}
