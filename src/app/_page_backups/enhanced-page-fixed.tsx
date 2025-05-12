'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

// Define window.gtag for TypeScript
declare global {
    interface Window {
        gtag: (command: string, action: string, params: any) => void;
    }
}

// Analytics tracking function
const trackEvent = (eventName: string, section: string) => {
    try {
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
            // Use any type to avoid TS errors with gtag
            (window as any).gtag('event', eventName, {
                event_category: 'enhanced_homepage',
                event_label: section
            });
        }
        console.log(`Analytics event: ${eventName} | Section: ${section}`);
    } catch (e) {
        console.error('Analytics error:', e);
    }
};

// Import enhanced components as needed
const NavBarEnhanced = dynamic(() => import("../../components/NavBarEnhanced").catch(() => {
    console.error('Failed to load NavBarEnhanced');
    return { default: () => <div className="h-16 bg-neutral-900">Navigation not available</div> };
}));

export default function EnhancedHomePage() {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    // Redirect to the refined page
    useEffect(() => {
        // Track page view
        trackEvent('page_view', 'enhanced_homepage');

        // Set a small timeout to allow analytics to fire
        const timer = setTimeout(() => {
            setIsRedirecting(true);
            router.replace('/page-refined');
        }, 100);

        return () => clearTimeout(timer);
    }, [router]);

    // Show loader while redirecting
    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-xl font-medium mb-2">Redirecionando para a versão refinada</p>
                <p className="text-sm text-neutral-400">Aguarde um momento...</p>
            </div>
        </div>
    );
}
