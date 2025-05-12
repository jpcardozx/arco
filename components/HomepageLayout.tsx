import { ReactNode } from 'react';
import { Metadata } from 'next';
import Script from 'next/script';

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

// Default metadata
export const metadata: Metadata = {
    title: 'ARCO Performance | Transforme métricas em resultados financeiros',
    description: 'Para empresas que perdem receita devido a problemas técnicos invisíveis, oferecemos análises precisas e correções estratégicas que geram resultados imediatos.',
    openGraph: {
        title: 'ARCO Performance | Métricas de performance com impacto financeiro',
        description: 'Análises precisas e correções estratégicas que transformam performance técnica em resultados de negócio mensuráveis.',
        images: ['/hero-funnel-heatmap-arco.png'],
    },
};

export default function HomepageLayout({
    children,
    metadata: customMetadata
}: HomepageLayoutProps) {
    // Merge default metadata with custom metadata if provided
    const finalMetadata = customMetadata
        ? {
            title: customMetadata.title || metadata.title,
            description: customMetadata.description || metadata.description,
            openGraph: {
                ...metadata.openGraph,
                ...customMetadata.openGraph
            }
        }
        : metadata;

    return (
        <>
            {/* Performance monitoring script */}
            <Script id="performance-monitoring">
                {`
          // Performance monitoring
          const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              // Log Core Web Vitals and other metrics
              if (entry.entryType === 'largest-contentful-paint' ||
                  entry.entryType === 'first-input' ||
                  entry.entryType === 'layout-shift' ||
                  entry.name === 'first-contentful-paint' ||
                  entry.name === 'time-to-interactive') {
                console.log(\`Performance: \${entry.name} = \${entry.startTime.toFixed(1)}ms\`);
                
                // Send to analytics if needed
                if (typeof window.gtag === 'function') {
                  window.gtag('event', 'web_vitals', {
                    metric_name: entry.name,
                    metric_value: entry.entryType === 'layout-shift' ? entry.value : entry.startTime,
                    metric_delta: entry.entryType === 'layout-shift' ? entry.value : 0,
                    metric_id: entry.id
                  });
                }
              }
            });
          });
          
          // Observe performance metrics
          observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'paint'] });
        `}
            </Script>

            {children}
        </>
    );
}
