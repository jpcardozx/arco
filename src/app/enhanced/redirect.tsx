'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EnhancedRouter() {
    const router = useRouter()

    useEffect(() => {
        // Track this redirect
        if (typeof window !== 'undefined') {
            console.log('Redirecting from /enhanced to /page-refined')

            // Add any analytics tracking here if needed
            try {
                if (
                    typeof window !== 'undefined' &&
                    window.gtag &&
                    typeof window.gtag === 'function'
                ) {
                    window.gtag('event', 'redirect', {
                        event_category: 'navigation',
                        event_label: 'enhanced_to_refined'
                    })
                }
            } catch (e) {
                console.error('Analytics error:', e)
            }
        }

        // Redirect to the refined page
        router.replace('/page-refined')
    }, [router])

    // Show a minimal loading state
    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p>Redirecionando para a versão mais recente...</p>
            </div>
        </div>
    )
}
