import { forwardRef } from 'react';
import React from "react";
import { cn } from '@/lib/utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outline' | 'filled';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant = 'default', children, ...props }, ref) => {
        const variantStyles = {
            default: 'bg-white shadow-md',
            outline: 'border border-neutral-200 bg-white',
            filled: 'bg-neutral-100'
        };

        return (
            <div
                ref={ref}
                className={cn(
                    "rounded-lg p-6",
                    variantStyles[variant],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";
