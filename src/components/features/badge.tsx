'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils/ui-utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:focus:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900',
        secondary:
          'border-transparent bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50',
        destructive:
          'border-transparent bg-red-500 text-neutral-50 dark:bg-red-900 dark:text-neutral-50',
        outline: 'text-neutral-950 dark:text-neutral-50 border-neutral-200 dark:border-neutral-800',
        success: 'border-transparent bg-green-500 text-white dark:bg-green-900 dark:text-green-100',
        warning: 'border-transparent bg-amber-500 text-white dark:bg-amber-900 dark:text-amber-100',
        info: 'border-transparent bg-blue-500 text-white dark:bg-blue-900 dark:text-blue-100',
        premium:
          'border-transparent bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-inner',
        brand:
          'border-transparent bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-inner',
      },
      size: {
        xs: 'text-xs px-2 py-0.5',
        sm: 'text-xs px-2.5 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-sm px-4 py-1.5',
      },
      rounded: {
        default: 'rounded-full',
        md: 'rounded-md',
        sm: 'rounded-sm',
        lg: 'rounded-lg',
        none: 'rounded-none',
      },
      withDot: {
        true: 'pl-2.5', // Extra padding for the dot
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
      rounded: 'default',
      withDot: false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dotColor?: string;
  withIcon?: boolean;
  icon?: React.ReactNode;
  interactive?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

/**
 * Badge component for showing status indicators or labels
 */
export function Badge({
  className,
  variant,
  size,
  rounded,
  withDot = false,
  dotColor,
  withIcon = false,
  icon,
  interactive = false,
  removable = false,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  // The dot element to show inside the badge
  const dotElement = withDot && (
    <span
      className={cn('mr-1 inline-block h-2 w-2 rounded-full', dotColor ? dotColor : 'bg-current')}
    />
  );

  // Icon element if badge has an icon
  const iconElement = withIcon && icon && <span className="mr-1">{icon}</span>;

  // Remove button for removable badges
  const removeButton = removable && (
    <button
      onClick={e => {
        e.stopPropagation();
        onRemove?.();
      }}
      className="-mr-1 ml-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-neutral-500/80 hover:bg-neutral-400/20 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
      aria-label="Remove"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </button>
  );

  return (
    <div
      className={cn(
        badgeVariants({ variant, size, rounded, withDot }),
        interactive && 'cursor-pointer transition-opacity hover:opacity-80',
        className
      )}
      {...props}
    >
      {dotElement}
      {iconElement}
      <span>{children}</span>
      {removeButton}
    </div>
  );
}
