'use client';

import { motion } from 'framer-motion';
import { Heading2, BodyLarge } from '../../design-system/components';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    alignment?: 'left' | 'center' | 'right';
    className?: string;
    titleClassName?: string;
    subtitleClassName?: string;
    badgeClassName?: string;
    animated?: boolean;
}

/**
 * Reusable Section Header Component
 * Reduces code repetition across sections
 */
export function SectionHeader({
    title,
    subtitle,
    badge,
    alignment = 'center',
    className = '',
    titleClassName = '',
    subtitleClassName = '',
    badgeClassName = '',
    animated = true
}: SectionHeaderProps) {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };

    const HeaderContent = (
        <div className={`${alignmentClasses[alignment]} ${className}`}>
            {badge && (
                <div className={`inline-flex items-center gap-2 mb-4 ${badgeClassName}`}>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                        {badge}
                    </span>
                </div>
            )}

            <Heading2 className={`mb-4 ${titleClassName}`}>
                {title}
            </Heading2>

            {subtitle && (
                <BodyLarge className={`text-slate-600 ${subtitleClassName}`}>
                    {subtitle}
                </BodyLarge>
            )}
        </div>
    );

    if (!animated) {
        return HeaderContent;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
        >
            {HeaderContent}
        </motion.div>
    );
}
