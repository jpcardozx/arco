'use client';

import Script from 'next/script';
import { ReactNode } from 'react';
import React from "react";

interface HomepageLayoutProps {
    children: ReactNode;
    metadata?: {
        title?: string;
        description?: string;
        openGraph?: {
            title?: string;
            description?: string;
            images?: string[];
        };
    };
}

// Metadata foi removido, pois não é compatível com componentes client-side

export default function HomepageLayout({
    children,
    metadata: customMetadata,
}: HomepageLayoutProps) {
    // Não precisamos mais do finalMetadata aqui, pois o gerenciamento de metadata 
    // deve ser feito em arquivos server-side como layout.tsx

    return (
        <>
            {/* Performance monitoring script */}
            <Script id="performance-monitoring">
                {`
          // Performance monitoring
          window.addEventListener('load', function() {
            if (window.performance && window.performance.getEntriesByType) {
              const navEntry = window.performance.getEntriesByType('navigation')[0];
              if (navEntry) {
                console.log('Page loaded in: ' + (navEntry.loadEventEnd - navEntry.startTime) + 'ms');
              }
            }
          });
        `}
            </Script>

            {/* Web Vitals script */}
            <Script id="web-vitals" strategy="afterInteractive">
                {`
          // Report Web Vitals
          function sendToAnalytics(metric) {
            const body = JSON.stringify(metric);
            console.log('[Web Vitals]', body);
            
            // Implementar envio para analytics aqui
            // fetch('/api/analytics', { method: 'POST', body });
          }
          
          // Importar e executar web-vitals
          window.onload = function() {
            if (typeof import('web-vitals') === 'function') {
              import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(sendToAnalytics);
                getFID(sendToAnalytics);
                getFCP(sendToAnalytics);
                getLCP(sendToAnalytics);
                getTTFB(sendToAnalytics);
              });
            }
          };
        `}
            </Script>

            {/* Main content wrapper with refined styling */}
            <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-neutral-50">
                {children}
            </div>
        </>
    );
}
