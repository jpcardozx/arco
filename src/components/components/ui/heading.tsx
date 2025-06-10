import React from 'react';

import { cn } from '../../../lib/utils/ui-utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, children, level = 2, as, ...props }, ref) => {
        // Explicitly type the component to avoid SVGProps type errors
        const Component = (as || `h${level}` as keyof JSX.IntrinsicElements) as React.ElementType;

        return (
            <Component
                ref={ref}
                className={cn(
                    'font-heading tracking-tight',
                    level === 1 && 'text-4xl font-bold md:text-5xl lg:text-6xl',
                    level === 2 && 'text-3xl font-semibold md:text-4xl',
                    level === 3 && 'text-2xl font-semibold md:text-3xl',
                    level === 4 && 'text-xl font-semibold',
                    level === 5 && 'text-lg font-medium',
                    level === 6 && 'text-base font-medium',
                    className
                )}
                {...props}
            >
                {children}
            </Component>
        );
    }
);

Heading.displayName = 'Heading';

export { Heading };
