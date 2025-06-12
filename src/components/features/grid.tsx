'use client';

import React from 'react';

import { cn } from '@/lib/utils/ui-utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number; '2xl'?: number };
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rowGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  colGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  flow?: 'row' | 'col' | 'dense' | 'row-dense' | 'col-dense';
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
}

/**
 * Responsive Grid component with customizable columns and spacing
 */
export function Grid({
  children,
  className,
  cols = 1,
  gap = 'md',
  rowGap,
  colGap,
  flow,
  alignItems,
  justifyItems,
  ...props
}: GridProps) {
  // Configure gap values
  const gapClass = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const rowGapClass = rowGap
    ? {
        none: 'row-gap-0',
        xs: 'row-gap-1',
        sm: 'row-gap-2',
        md: 'row-gap-4',
        lg: 'row-gap-6',
        xl: 'row-gap-8',
      }
    : {};

  const colGapClass = colGap
    ? {
        none: 'col-gap-0',
        xs: 'col-gap-1',
        sm: 'col-gap-2',
        md: 'col-gap-4',
        lg: 'col-gap-6',
        xl: 'col-gap-8',
      }
    : {};

  // Configure flow values
  const flowClass = flow
    ? {
        row: 'grid-flow-row',
        col: 'grid-flow-col',
        dense: 'grid-flow-dense',
        'row-dense': 'grid-flow-row-dense',
        'col-dense': 'grid-flow-col-dense',
      }
    : {};

  // Configure alignment values
  const alignItemsClass = alignItems
    ? {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
        baseline: 'items-baseline',
      }
    : {};

  const justifyItemsClass = justifyItems
    ? {
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        stretch: 'justify-items-stretch',
      }
    : {};

  // Generate grid column classes based on responsive config
  const generateColsClass = (cols: GridProps['cols']) => {
    if (typeof cols === 'number') {
      return `grid-cols-${cols}`;
    }

    if (typeof cols === 'object') {
      return cn(
        cols.sm && `sm:grid-cols-${cols.sm}`,
        cols.md && `md:grid-cols-${cols.md}`,
        cols.lg && `lg:grid-cols-${cols.lg}`,
        cols.xl && `xl:grid-cols-${cols.xl}`,
        cols['2xl'] && `2xl:grid-cols-${cols['2xl']}`
      );
    }

    return '';
  };

  return (
    <div
      className={cn(
        'grid',
        generateColsClass(cols),
        gapClass[gap],
        rowGap && rowGapClass[rowGap],
        colGap && colGapClass[colGap],
        flow && flowClass[flow],
        alignItems && alignItemsClass[alignItems],
        justifyItems && justifyItemsClass[justifyItems],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
