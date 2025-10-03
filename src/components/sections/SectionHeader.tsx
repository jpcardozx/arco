'use client';

/**
 * SECTION HEADER - Componente padronizado para headers de seções
 * Consistência visual em toda homepage
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  badge?: {
    icon?: LucideIcon;
    text: string;
    variant?: 'primary' | 'success' | 'warning' | 'default';
  };
  title: string;
  highlight?: string; // palavra para destacar com gradiente
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  const badgeVariants = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-500',
    success: 'bg-gradient-to-r from-emerald-600 to-teal-500',
    warning: 'bg-gradient-to-r from-orange-600 to-amber-500',
    default: 'bg-slate-800'
  };

  const titleParts = highlight ? title.split(highlight) : [title];
  const BadgeIcon = badge?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`space-y-6 max-w-4xl ${alignClass} ${className}`}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className={align === 'center' ? 'flex justify-center' : 'flex justify-start'}
        >
          <Badge
            className={`${badgeVariants[badge.variant || 'default']} text-white border-0 px-6 py-3 text-sm font-semibold shadow-lg`}
          >
            {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2" />}
            {badge.text}
          </Badge>
        </motion.div>
      )}

      {/* Title */}
      <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
        {highlight ? (
          <>
            {titleParts[0]}
            <span className="bg-gradient-to-r from-blue-500 via-teal-500 to-orange-500 bg-clip-text text-transparent">
              {highlight}
            </span>
            {titleParts[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
