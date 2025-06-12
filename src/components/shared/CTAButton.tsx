'use client';

import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../../design-system/components';

interface CTAButtonProps {
    href: string;
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
    rightIcon?: LucideIcon;
    animated?: boolean;
    delay?: number;
    className?: string;
    external?: boolean;
}

/**
 * Reusable CTA Button Component
 * Standardizes call-to-action buttons across sections
 */
export function CTAButton({
    href,
    children,
    variant = 'primary',
    size = 'lg',
    icon: Icon,
    rightIcon: RightIcon = ArrowRight,
    animated = true,
    delay = 0,
    className = '',
    external = false
}: CTAButtonProps) {
    const ButtonContent = (
        <Button
            variant={variant}
            size={size}
            className={`group ${className}`}
        >
            {Icon && <Icon className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" />}
            {children}
            {RightIcon && !Icon && <RightIcon className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
        </Button>
    );

    const LinkWrapper = ({ children }: { children: React.ReactNode }) => {
        if (external) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            );
        }
        return <Link href={href}>{children}</Link>;
    };

    if (!animated) {
        return (
            <LinkWrapper>
                {ButtonContent}
            </LinkWrapper>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <LinkWrapper>
                {ButtonContent}
            </LinkWrapper>
        </motion.div>
    );
}

interface CTAGroupProps {
    children: React.ReactNode;
    direction?: 'horizontal' | 'vertical';
    alignment?: 'left' | 'center' | 'right';
    gap?: 'sm' | 'md' | 'lg';
    className?: string;
}

/**
 * CTA Group Container for multiple CTAs
 */
export function CTAGroup({
    children,
    direction = 'horizontal',
    alignment = 'center',
    gap = 'md',
    className = ''
}: CTAGroupProps) {
    const directionClasses = {
        horizontal: 'flex-col sm:flex-row',
        vertical: 'flex-col'
    };

    const alignmentClasses = {
        left: 'justify-start',
        center: 'justify-center',
        right: 'justify-end'
    };

    const gapClasses = {
        sm: 'gap-3',
        md: 'gap-6',
        lg: 'gap-8'
    };

    return (
        <div className={`flex ${directionClasses[direction]} ${alignmentClasses[alignment]} items-center ${gapClasses[gap]} ${className}`}>
            {children}
        </div>
    );
}
