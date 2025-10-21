/**
 * Meta Pixel Provider
 *
 * Inicializa o Meta Pixel no carregamento da página
 * Deve ser envolvido no layout raiz (_app.tsx ou layout.tsx)
 */

'use client';

import { useEffect } from 'react';
import { initializeMetaPixel, injectPixelNoscript } from '@/lib/meta-pixel';

interface MetaPixelProviderProps {
  children: React.ReactNode;
}

export function MetaPixelProvider({ children }: MetaPixelProviderProps) {
  useEffect(() => {
    // 1. Inicializar Pixel no carregamento
    initializeMetaPixel();

    // 2. Injetar noscript para fallback
    injectPixelNoscript();

    // 3. Log de inicialização
    console.log('🚀 Meta Pixel Provider inicializado');
  }, []);

  return <>{children}</>;
}

export default MetaPixelProvider;
