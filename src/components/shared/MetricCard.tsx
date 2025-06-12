'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    icon: LucideIcon;
    value: string;
    label: string;
    description?: string;
    iconColor?: string;
    iconBgColor?: string;
    animated?: boolean;
    delay?: number;
    className?: string;
}

/**
 * Reusable Metric Card Component
 * Standardizes metric display across sections
 */
export function MetricCard({
    icon: Icon,
    value,
    label,
    description,
    iconColor = 'text-blue-600',
    iconBgColor = 'bg-blue-100',
    animated = true,
    delay = 0,
    className = ''
}: MetricCardProps) {
    const CardContent = (
        <div className={`bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
            <div className={`inline-flex items-center justify-center w-12 h-12 ${iconBgColor} rounded-xl mb-4`}>
                <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                {value}
            </div>
            <div className="text-sm font-semibold text-slate-800 mb-1">
                {label}
            </div>
            {description && (
                <div className="text-xs text-slate-600 leading-tight">
                    {description}
                </div>
            )}
        </div>
    );

    if (!animated) {
        return CardContent;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            whileHover={{ y: -2 }}
        >
            {CardContent}
        </motion.div>
    );
}
