import { forwardRef } from 'react';
import React from "react";
import { cn } from '@/lib/utils/cn';

export const Section = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <section
            ref={ref}
            className={cn(
                "py-16 md:py-24 px-4",
                className
            )}
            {...props}
        >
            <div className="container mx-auto">
                {children}
            </div>
        </section>
    );
});
Section.displayName = "Section";
