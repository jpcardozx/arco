'use client';

import { LandingIcon, IconContainer, ICON_COLORS } from '@/components/landing/assets';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon; // Agora recebe o ícone diretamente do Lucide
  color?: 'amber' | 'rose' | 'pink' | 'purple' | 'blue';
  className?: string;
}

const colorClasses = {
  amber: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400',
  rose: 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400',
  pink: 'bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800 text-pink-600 dark:text-pink-400',
  purple: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400',
  blue: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
};

const iconBackgrounds = {
  amber: 'bg-amber-500/10',
  rose: 'bg-rose-500/10',
  pink: 'bg-pink-500/10',
  purple: 'bg-purple-500/10',
  blue: 'bg-blue-500/10',
};

const iconColors: Record<string, keyof typeof ICON_COLORS> = {
  amber: 'primary',
  rose: 'error',
  pink: 'error',
  purple: 'primary',
  blue: 'primary',
};

/**
 * ServiceCard Component
 * 
 * Card para exibir serviços com ícone Lucide animado
 * Ideal para seções de serviços/pain points
 * 
 * Uso:
 * ```tsx
 * import { Calendar } from 'lucide-react';
 * 
 * <ServiceCard
 *   title="Agendamento Online"
 *   description="Sistema automatizado de captura"
 *   icon={Calendar}
 *   color="amber"
 * />
 * ```
 */
export function ServiceCard({
  title,
  description,
  icon,
  color = 'amber',
  className = '',
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-lg border-2 transition-all duration-300',
        'hover:shadow-lg hover:scale-105 hover:-translate-y-1',
        colorClasses[color],
        className
      )}
    >
      {/* Icon Container */}
      <div className="mb-4">
        <IconContainer
          icon={icon}
          size="xl"
          color={iconColors[color]}
          variant="circle"
          background={iconBackgrounds[color]}
          padding="p-3"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

/**
 * ServiceGrid Component
 * 
 * Grade de serviços 2x2 ou 3x4 responsiva
 * 
 * Uso:
 * ```tsx
 * import { Calendar, Zap, TrendingUp } from 'lucide-react';
 * 
 * <ServiceGrid
 *   services={[
 *     { title: 'Agendamento', description: '...', icon: Calendar, color: 'amber' },
 *     { title: 'Automação', description: '...', icon: Zap, color: 'blue' },
 *     { title: 'Crescimento', description: '...', icon: TrendingUp, color: 'rose' },
 *   ]}
 *   columns={{ sm: 1, md: 2, lg: 3 }}
 * />
 * ```
 */
interface ServiceGridProps {
  services: ServiceCardProps[];
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

export function ServiceGrid({
  services,
  columns = { sm: 1, md: 2, lg: 3 },
}: ServiceGridProps) {
  const gridClass = cn(
    'grid gap-6',
    columns.sm && `grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`
  );

  return (
    <div className={gridClass}>
      {services.map((service, idx) => (
        <ServiceCard
          key={`${service.title}-${idx}`}
          {...service}
        />
      ))}
    </div>
  );
}
