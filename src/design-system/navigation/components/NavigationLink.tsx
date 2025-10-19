/**
 * NavigationLink Component
 *
 * Link reutilizável para navbar com suporte a:
 * - Active state automático
 * - Hover effects
 * - Ícones opcionais
 * - Temas light/dark
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationTokens } from '../tokens';
import type { UseNavigationReturn } from '../hooks/useNavigation';

interface NavigationLinkProps {
  navigation: UseNavigationReturn;
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  onClick?: () => void;
  className?: string;
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({
  navigation,
  href,
  children,
  icon: Icon,
  onClick,
  className,
}) => {
  const { isPathActive, isScrolled, colors } = navigation;
  const isActive = isPathActive(href);

  return (
    <Link href={href} onClick={onClick} className={cn('relative group', className)}>
      <motion.div
        className={cn(
          'relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200',
          isActive
            ? isScrolled
              ? 'text-teal-600 bg-teal-50 shadow-md shadow-teal-500/10 border border-teal-200/50'
              : 'text-white bg-white/20 shadow-lg shadow-white/10 border border-white/30'
            : isScrolled
            ? 'text-slate-700 hover:text-teal-600 hover:bg-slate-50 border border-transparent hover:border-slate-200'
            : 'text-white/90 hover:text-white hover:bg-white/15 border border-white/10 hover:border-white/20'
        )}
        whileHover={{ y: -1, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        {Icon && (
          <Icon
            className={cn(
              'w-4 h-4 transition-colors flex-shrink-0',
              isActive
                ? 'text-teal-500'
                : isScrolled
                ? 'text-slate-500 group-hover:text-teal-600'
                : 'text-slate-400 group-hover:text-slate-200'
            )}
          />
        )}

        <span className="whitespace-nowrap">{children}</span>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="navActive"
            className={cn(
              'absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full',
              isScrolled
                ? 'bg-gradient-to-r from-transparent via-teal-500 to-transparent'
                : 'bg-gradient-to-r from-transparent via-teal-400 to-transparent'
            )}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </motion.div>
    </Link>
  );
};

export default NavigationLink;
