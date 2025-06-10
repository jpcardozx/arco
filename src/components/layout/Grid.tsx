import { forwardRef } from 'react';
import React from "react";
import { cn } from '@/lib/utils/cn';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    cols?: 1 | 2 | 3 | 4;
    gap?: 'sm' | 'md' | 'lg';
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
    ({ className, cols = 2, gap = 'md', children, ...props }, ref) => {
        const gapMap = {
            sm: 'gap-4',
            md: 'gap-6',
            lg: 'gap-8'
        };

        const colsMap = {
            1: 'grid-cols-1',
            2: 'grid-cols-1 md:grid-cols-2',
            3: 'grid-cols-1 md:grid-cols-3',
            4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "grid",
                    colsMap[cols],
                    gapMap[gap],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Grid.displayName = "Grid";
