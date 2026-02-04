/**
 * HOMEPAGE HERO CLIENT WRAPPER
 * 
 * Client Component que usa dynamic import com ssr: false
 * para carregar o HomepageHeroUltimate (Three.js + Background)
 */
'use client';

import dynamic from 'next/dynamic';

// Dynamic import do Hero Ultimate com Three.js + Background (client-side only)
const HomepageHeroUltimate = dynamic(() => import('./HomepageHeroUltimate'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border border-slate-700/70" />
          <div className="absolute inset-0 rounded-full border-2 border-teal-400/15 border-t-teal-400 animate-spin" />
          <div className="absolute inset-2 rounded-full border border-teal-400/25 animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-slate-200 text-sm font-semibold tracking-wide">
            Carregando...
          </p>
          <p className="text-slate-500 text-xs mt-1">
            Seja bem vindo.
          </p>
        </div>
      </div>
    </div>
  )
});

export function HomepageHeroClient() {
  return <HomepageHeroUltimate />;
}
