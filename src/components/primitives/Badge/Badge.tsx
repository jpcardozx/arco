import React from 'react';
import { designTokens } from '@/design-system/tokens';

export interface BadgeProps {
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'sm',
  dot = false,
  removable = false,
  onRemove
}) => {
  // ARCO Badge Variants - Professional Color System
  const variantClasses = {
    default: 'bg-neutral-100 text-neutral-900 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:border-neutral-700',
    primary: 'bg-primary-100 text-primary-900 border-primary-200 dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-800',
    secondary: 'bg-secondary-100 text-secondary-900 border-secondary-200 dark:bg-secondary-900/20 dark:text-secondary-300 dark:border-secondary-800',
    outline: 'bg-transparent text-neutral-700 border-neutral-300 dark:text-neutral-300 dark:border-neutral-600',
    success: 'bg-emerald-100 text-emerald-900 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800',
    warning: 'bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
    error: 'bg-red-100 text-red-900 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    info: 'bg-blue-100 text-blue-900 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    neutral: 'bg-neutral-100 text-neutral-600 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700'
  };

  // ARCO Size System
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',      // 6px 2px, 12px text
    sm: 'px-2 py-0.5 text-xs',        // 8px 2px, 12px text
    md: 'px-2.5 py-1 text-sm',        // 10px 4px, 14px text
    lg: 'px-3 py-1.5 text-sm'         // 12px 6px, 14px text
  };

  // Dot indicator
  const dotElement = dot && (
    <span
      className={`inline-block w-2 h-2 rounded-full mr-1.5 ${variant === 'primary' ? 'bg-primary-500' :
          variant === 'secondary' ? 'bg-secondary-500' :
            variant === 'success' ? 'bg-emerald-500' :
              variant === 'warning' ? 'bg-amber-500' :
                variant === 'error' ? 'bg-red-500' :
                  variant === 'info' ? 'bg-blue-500' :
                    'bg-neutral-500'
        }`}
    />
  );

  // Remove button
  const removeButton = removable && (
    <button
      onClick={onRemove}
      className="ml-1.5 inline-flex items-center justify-center w-3 h-3 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
      aria-label="Remove badge"
    >
      <svg className="w-2 h-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    </button>
  );

  const combinedClasses = [
    'inline-flex items-center rounded-full border font-medium transition-colors',
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <span className={combinedClasses}>
      {dotElement}
      {children}
      {removeButton}
    </span>
  );
};

export default Badge;
