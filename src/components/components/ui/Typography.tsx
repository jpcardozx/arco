import { forwardRef } from 'react';
import React from 'react';
import { cn } from '@/lib/utils/cn';

export const Heading1 = forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
    return (
        <h1
            ref={ref}
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    );
});
Heading1.displayName = "Heading1";

export const Heading2 = forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
    return (
        <h2
            ref={ref}
            className={cn(
                "scroll-m-20 text-3xl font-semibold tracking-tight lg:text-4xl",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
});
Heading2.displayName = "Heading2";

export const Heading3 = forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => {
    return (
        <h3
            ref={ref}
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
});
Heading3.displayName = "Heading3";

export const BodyLarge = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn(
                "leading-7 text-lg [&:not(:first-child)]:mt-6",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
});
BodyLarge.displayName = "BodyLarge";

export const BodyRegular = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn(
                "leading-7 [&:not(:first-child)]:mt-6",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
});
BodyRegular.displayName = "BodyRegular";

export const Caption = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    return (
        <p
            ref={ref}
            className={cn(
                "text-sm text-neutral-500",
                className
            )}
            {...props}
        >
            {children}
        </p>
    );
});
Caption.displayName = "Caption";
