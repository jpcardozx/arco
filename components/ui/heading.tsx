'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/ui-utils'
import { motion } from 'framer-motion'

const headingVariants = cva(
    "font-bold text-neutral-900 tracking-tight",
    {
        variants: {
            size: {
                h1: "text-4xl md:text-5xl lg:text-6xl leading-tight",
                h2: "text-3xl md:text-4xl lg:text-5xl leading-tight",
                h3: "text-2xl md:text-3xl leading-snug",
                h4: "text-xl md:text-2xl leading-snug",
                h5: "text-lg md:text-xl leading-snug",
                h6: "text-base md:text-lg leading-normal",
            },
            weight: {
                light: "font-light",
                normal: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
                extrabold: "font-extrabold",
            },
            align: {
                left: "text-left",
                center: "text-center",
                right: "text-right",
            },
            font: {
                sans: "font-sans",
                serif: "font-serif",
                mono: "font-mono",
            },
            gradient: {
                none: "",
                primary: "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent",
                success: "bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent",
                warning: "bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent",
                premium: "bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent",
            },
        },
        defaultVariants: {
            size: "h2",
            weight: "bold",
            align: "left",
            font: "sans",
            gradient: "none",
        },
    }
)

export interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
    animated?: boolean;
    animationDelay?: number;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({
        className,
        size,
        weight,
        align,
        font,
        gradient,
        as: Component = "h2",
        animated = false,
        animationDelay = 0,
        children,
        ...props
    }, ref) => {
        if (animated) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        duration: 0.7,
                        delay: animationDelay,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                >
                    <Component
                        ref={ref}
                        className={cn(headingVariants({ size, weight, align, font, gradient, className }))}
                        {...props}
                    >
                        {children}
                    </Component>
                </motion.div>
            )
        }

        return (
            <Component
                ref={ref}
                className={cn(headingVariants({ size, weight, align, font, gradient, className }))}
                {...props}
            >
                {children}
            </Component>
        )
    }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
