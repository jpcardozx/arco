'use client';

/**
 * Client Analytics Provider Wrapper
 * 
 * Wrapper client component para permitir dynamic import com ssr: false
 * no layout raiz (server component)
 */

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const AnalyticsProvider = dynamic(
  () => import('./AnalyticsProvider').then((mod) => mod.AnalyticsProvider),
  { ssr: false }
);

interface ClientAnalyticsProviderProps {
  children: ReactNode;
  autoInit?: boolean;
}

export function ClientAnalyticsProvider({ children, autoInit = true }: ClientAnalyticsProviderProps) {
  return (
    <AnalyticsProvider autoInit={autoInit}>
      {children}
    </AnalyticsProvider>
  );
}
