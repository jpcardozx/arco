/**
 * NavigationLogo Component
 *
 * Componente reutilizável para logo da navbar
 * Suporta transição white → colorful, partículas e animações
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { navigationTokens } from '../tokens';
import type { UseNavigationReturn } from '../hooks/useNavigation';

interface NavigationLogoProps {
  navigation: UseNavigationReturn;
  href?: string;
  showParticles?: boolean;
  logoVariant?: 'white' | 'colorful' | 'auto';
  className?: string;
}

export const NavigationLogo: React.FC<NavigationLogoProps> = ({
  navigation,
  href = '/',
  showParticles = false,
  logoVariant = 'auto',
  className,
}) => {
  const { isScrolled, getLogoSrc } = navigation;

  const logoSrc = getLogoSrc(logoVariant);
  const logoHeight = isScrolled
    ? navigationTokens.logo.height.desktop.scrolled
    : navigationTokens.logo.height.desktop.default;

  return (
    <Link href={href} className={cn('relative group flex-shrink-0', className)}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        {/* Particles Background (opcional) */}
        {showParticles && (
          <div className="absolute -inset-8 pointer-events-none hidden lg:block opacity-80">
            {/* Placeholder para partículas - pode integrar LogoParticles aqui */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-teal-400/10 to-teal-500/5 blur-xl animate-pulse" />
          </div>
        )}

        {/* Logo Image */}
        <motion.div
          animate={{ height: logoHeight }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative overflow-hidden"
          style={{ width: 'auto', maxWidth: '160px' }}
        >
          <Image
            src={logoSrc}
            alt="ARCO - Desenvolvimento Web e Tráfego Pago"
            width={160}
            height={52}
            className="object-contain object-left h-full w-auto transition-opacity duration-300"
            priority
            quality={95}
            style={{ maxHeight: '100%' }}
          />

          {/* Subtle glow on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-teal-500/20 -z-10 pointer-events-none" />
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default NavigationLogo;
