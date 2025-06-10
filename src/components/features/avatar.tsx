'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '../../../lib/utils/ui-utils';


const avatarVariants = cva('inline-flex items-center justify-center select-none overflow-hidden', {
  variants: {
    size: {
      xs: 'h-6 w-6 text-xs',
      sm: 'h-8 w-8 text-sm',
      md: 'h-10 w-10 text-base',
      lg: 'h-12 w-12 text-lg',
      xl: 'h-16 w-16 text-xl',
      '2xl': 'h-20 w-20 text-2xl',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md',
      rounded: 'rounded-xl',
    },
    border: {
      none: '',
      thin: 'ring-1 ring-neutral-200 dark:ring-neutral-800',
      thick: 'ring-2 ring-neutral-200 dark:ring-neutral-800',
      accent: 'ring-2 ring-blue-500 dark:ring-blue-400',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'circle',
    border: 'none',
  },
});

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  status?: 'online' | 'offline' | 'busy' | 'away' | 'none';
  statusPosition?: 'top-right' | 'bottom-right' | 'bottom-left' | 'top-left';
  interactive?: boolean;
  fallbackText?: string;
}

/**
 * Advanced Avatar component with status indicators
 */
export function Avatar({
  className,
  size,
  shape,
  border,
  src,
  alt,
  status = 'none',
  statusPosition = 'bottom-right',
  fallback,
  interactive = false,
  fallbackText,
  ...props
}: AvatarProps) {
  // Status indicator color mapping
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-neutral-400',
    busy: 'bg-red-500',
    away: 'bg-amber-500',
    none: 'hidden',
  };

  // Status position mapping
  const positionClasses = {
    'top-right': '-top-0.5 -right-0.5',
    'bottom-right': '-bottom-0.5 -right-0.5',
    'bottom-left': '-bottom-0.5 -left-0.5',
    'top-left': '-top-0.5 -left-0.5',
  };

  // Determine status indicator size based on avatar size
  const statusSizeMap = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-3.5 w-3.5',
    '2xl': 'h-4 w-4',
  };

  const statusSize = size ? statusSizeMap[size] : 'h-2.5 w-2.5';

  return (
    <div className="relative inline-flex">
      <AvatarPrimitive.Root
        className={cn(
          avatarVariants({ size, shape, border }),
          interactive && 'cursor-pointer transition-opacity hover:opacity-90',
          className
        )}
        {...props}
      >
        <AvatarPrimitive.Image
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
        />
        <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-neutral-800">
          {fallback || (
            <span className="font-medium uppercase text-neutral-500 dark:text-neutral-300">
              {fallbackText ? fallbackText.substring(0, 2) : alt ? alt.substring(0, 2) : 'NA'}
            </span>
          )}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {status !== 'none' && (
        <span
          className={cn(
            'absolute block rounded-full ring-2 ring-white dark:ring-neutral-950',
            statusColors[status],
            statusSize,
            positionClasses[statusPosition]
          )}
        />
      )}
    </div>
  );
}
