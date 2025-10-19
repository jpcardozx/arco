/**
 * NavigationCTA Component
 *
 * Botão CTA reutilizável para navbar
 * Suporta variantes primary/secondary e temas
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationTokens } from '../tokens';
import type { UseNavigationReturn } from '../hooks/useNavigation';

interface NavigationCTAProps {
  navigation: UseNavigationReturn;
  href: string;
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: 'primary' | 'secondary';
  compact?: boolean;
  className?: string;
}

export const NavigationCTA: React.FC<NavigationCTAProps> = ({
  navigation,
  href,
  children,
  icon: Icon,
  variant = 'primary',
  compact = false,
  className,
}) => {
  const { isScrolled, colors } = navigation;

  if (variant === 'primary') {
    return (
      <Link href={href}>
        <motion.div
          className={cn(
            'relative group overflow-hidden',
            compact ? 'rounded-lg' : 'rounded-xl',
            className
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 17 }}
        >
          <motion.div
            className={cn(
              'relative flex items-center justify-center gap-2.5 font-bold text-white',
              'backdrop-blur-md',
              compact ? 'px-3.5 py-2 text-sm' : 'px-6 py-3 text-base'
            )}
            style={{
              background: isScrolled
                ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'  // slate gradient
                : 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)',
              boxShadow: isScrolled
                ? '0 4px 16px rgba(15, 23, 42, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
              border: isScrolled
                ? '1px solid rgba(15, 23, 42, 0.2)'
                : '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            {/* Animated glow */}
            <motion.div
              className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 blur-sm -z-10"
              style={{
                background: isScrolled
                  ? 'linear-gradient(135deg, rgba(15,23,42,0.3), rgba(30,41,59,0.2))'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15))',
              }}
              animate={{
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Icon */}
            {Icon && (
              <motion.div
                whileHover={{ rotateZ: 8 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" strokeWidth={2.5} />
              </motion.div>
            )}

            {/* Text */}
            <span
              className={cn(
                'font-bold tracking-tight relative z-10',
                compact ? 'hidden sm:inline' : ''
              )}
            >
              {children}
            </span>

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-150%' }}
              whileHover={{ x: '150%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </motion.div>
        </motion.div>
      </Link>
    );
  }

  // Secondary variant
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
      <Link
        href={href}
        className={cn(
          'group relative inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg overflow-hidden',
          'transition-all duration-500',
          isScrolled
            ? 'text-slate-700 hover:text-teal-600' +
              ' bg-gradient-to-br from-slate-50 to-slate-100/80 hover:from-white hover:to-slate-50' +
              ' border border-slate-200/60 hover:border-teal-300/60' +
              ' shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:shadow-[0_6px_16px_rgba(20,184,166,0.1)]'
            : 'text-white hover:text-teal-100' +
              ' bg-white/[0.06] hover:bg-white/[0.12]' +
              ' border border-white/20 hover:border-teal-300/30' +
              ' backdrop-blur-lg' +
              ' shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_rgba(20,184,166,0.12)]',
          className
        )}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

        {Icon && <Icon className="w-4 h-4" />}

        <span className="relative tracking-wide">{children}</span>
      </Link>
    </motion.div>
  );
};

export default NavigationCTA;
