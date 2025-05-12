'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '../../lib/ui-utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'

const Tabs = TabsPrimitive.Root

const tabListVariants = cva(
    "inline-flex items-center justify-center",
    {
        variants: {
            variant: {
                default: "bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1",
                pills: "gap-2",
                underlined: "gap-4 border-b border-neutral-200 dark:border-neutral-800",
                buttons: "gap-2",
                minimal: "gap-4",
            },
            size: {
                sm: "text-sm h-8",
                md: "text-base h-10",
                lg: "text-lg h-12",
            },
            fullWidth: {
                true: "w-full",
                false: "",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            fullWidth: false
        }
    }
)

interface TabsListProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabListVariants> {
    scrollable?: boolean
}

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    TabsListProps
>(({ className, variant, size, fullWidth, scrollable, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            tabListVariants({ variant, size, fullWidth }),
            scrollable && "overflow-x-auto scrollbar-hide flex-nowrap",
            className
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const tabTriggerVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-950 data-[state=active]:shadow-sm data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-50",
                pills: "data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-50 dark:data-[state=active]:bg-neutral-50 dark:data-[state=active]:text-neutral-900 border border-transparent data-[state=active]:border-transparent dark:text-neutral-100 rounded-full",
                underlined: "border-b-2 border-transparent text-neutral-500 dark:text-neutral-400 data-[state=active]:border-neutral-900 dark:data-[state=active]:border-neutral-100 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100",
                buttons: "bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 data-[state=active]:bg-neutral-900 data-[state=active]:text-neutral-50 dark:data-[state=active]:bg-neutral-100 dark:data-[state=active]:text-neutral-900",
                minimal: "text-neutral-500 dark:text-neutral-400 data-[state=active]:text-neutral-900 dark:data-[state=active]:text-neutral-100",
            },
            size: {
                sm: "text-xs px-2.5 rounded-md",
                md: "text-sm px-3 py-1.5 rounded-md",
                lg: "text-base px-4 py-2 rounded-lg",
            },
            fullWidth: {
                true: "flex-1",
                false: "",
            },
            withIcon: {
                true: "gap-2",
                false: "",
            }
        },
        defaultVariants: {
            variant: "default",
            size: "md",
            fullWidth: false,
            withIcon: false
        }
    }
)

interface TabsTriggerProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabTriggerVariants> {
    icon?: React.ReactNode
}

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    TabsTriggerProps
>(({ className, variant, size, fullWidth, withIcon, icon, children, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            tabTriggerVariants({ variant, size, fullWidth, withIcon: !!icon }),
            className
        )}
        {...props}
    >
        {icon}
        {children}
    </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
        animate?: boolean
    }
>(({ className, animate = true, children, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2",
            className
        )}
        {...props}
    >
        {animate ? (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.div>
        ) : (
            children
        )}
    </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
