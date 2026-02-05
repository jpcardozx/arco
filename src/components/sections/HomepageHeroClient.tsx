/**
 * HOMEPAGE HERO CLIENT WRAPPER
 *
 * Client Component com import otimizado do novo hero editorial
 * Performance-first, sem overhead de Three.js
 */
'use client';

import dynamic from 'next/dynamic';

// Dynamic import do Hero Editorial (otimizado para performance)
const HomepageHeroNew = dynamic(() => import('./HomepageHeroNew'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-xl border border-slate-700" />
          <div className="absolute inset-1 rounded-lg border border-slate-600 animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-slate-200 text-sm font-medium tracking-wide">
            Carregando...
          </p>
        </div>
      </div>
    </div>
  )
});

export function HomepageHeroClient() {
  return <HomepageHeroNew />;
}
