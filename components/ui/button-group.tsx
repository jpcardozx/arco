'use client'

import React from 'react'
import { cn } from '../../lib/ui-utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonGroupVariants = cva(
    "inline-flex items-center justify-start",
    {
        variants: {
            orientation: {
                horizontal: "flex-row",
                vertical: "flex-col",
            },
            spacing: {
                none: "gap-0",
                sm: "gap-1.5",
                md: "gap-2",
                lg: "gap-3",
            },
            attached: {
                true: "gap-0 [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none",
                false: "",
            },
            fullWidth: {
                true: "w-full [&>*]:flex-1",
                false: "",
            },
        },
        defaultVariants: {
            orientation: "horizontal",
            spacing: "md",
            attached: false,
            fullWidth: false,
        },
        compoundVariants: [
            {
                orientation: "vertical",
                attached: true,
                className: "[&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none",
            },
        ],
    }
)

interface ButtonGroupProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonGroupVariants> {
    children: React.ReactNode
}

/**
 * ButtonGroup component for grouping related buttons
 */
export function ButtonGroup({
    className,
    orientation = "horizontal",
    spacing = "md",
    attached = false,
    fullWidth = false,
    children,
    ...props
}: ButtonGroupProps) {
    // Process children to apply consistent styling
    const processedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            // Add consistent size and border style to all children
            return React.cloneElement(child, {
                className: cn(
                    child.props.className,
                    attached && "focus:z-10 hover:z-10",
                    orientation === "vertical" && attached && "border-b-0 last:border-b",
                    orientation === "horizontal" && attached && "border-r-0 last:border-r"
                ),
            });
        }
        return child;
    });

    return (
        <div
            className={cn(
                buttonGroupVariants({
                    orientation,
                    spacing,
                    attached,
                    fullWidth,
                }),
                className
            )}
            role="group"
            {...props}
        >
            {processedChildren}
        </div>
    );
}
