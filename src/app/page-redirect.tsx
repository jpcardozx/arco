'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trackPageView, trackEvent } from "../../lib/analytics";

export default function RedirectPage() {
    const router = useRouter();

    useEffect(() => {
        // Track redirect
        trackPageView('page-refined-redirect', {
            action: 'redirect',
            destination: '/'
        });

        trackEvent('redirect', 'refined-to-consolidated', {
            timestamp: new Date().toISOString()
        });

        // Redirect to consolidated homepage
        router.replace('/');
    }, [router]);

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-xl font-medium mb-2">Redirecionando para nossa nova homepage</p>
                <p className="text-sm text-neutral-400">Aguarde um momento...</p>
            </div>
        </div>
    );
}
