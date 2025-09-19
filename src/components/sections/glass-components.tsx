/**
 * ARCO Glass Components
 * Professional glassmorphism components using ARCO design tokens
 */

import React from 'react';
import { designTokens } from '../system/design-tokens';

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated' | 'subtle';
}

export const GlassCard: React.FC<GlassCardProps> = ({
    children,
    className = '',
    variant = 'default'
}) => {
    const variants = {
        default: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg border border-white/20 dark:border-neutral-700/20',
        elevated: 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-white/30 dark:border-neutral-600/30 shadow-xl',
        subtle: 'bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border border-white/10 dark:border-neutral-800/10'
    };

    return (
        <div className={`rounded-lg p-6 ${variants[variant]} ${className}`}>
            {children}
        </div>
    );
};

interface GlassTextProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'body' | 'title' | 'subtitle';
}

export const GlassText: React.FC<GlassTextProps> = ({
    children,
    className = '',
    variant = 'body'
}) => {
    const variants = {
        body: 'text-neutral-700 dark:text-neutral-300',
        title: 'text-xl font-semibold text-neutral-900 dark:text-neutral-100',
        subtitle: 'text-lg font-medium text-neutral-800 dark:text-neutral-200'
    };

    return (
        <div className={`${variants[variant]} ${className}`}>
            {children}
        </div>
    );
};

interface GlassBadgeProps {
    children: React.ReactNode;
    className?: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning';
}

export const GlassBadge: React.FC<GlassBadgeProps> = ({
    children,
    className = '',
    color = 'primary'
}) => {
    const colors = {
        primary: 'bg-primary-100/80 text-primary-900 border-primary-200/50',
        secondary: 'bg-secondary-100/80 text-secondary-900 border-secondary-200/50',
        success: 'bg-emerald-100/80 text-emerald-900 border-emerald-200/50',
        warning: 'bg-amber-100/80 text-amber-900 border-amber-200/50'
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${colors[color]} ${className}`}>
            {children}
        </span>
    );
};

interface GlassButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'ghost';
}

export const GlassButton: React.FC<GlassButtonProps> = ({
    children,
    className = '',
    onClick,
    variant = 'primary'
}) => {
    const variants = {
        primary: 'bg-primary-500/80 hover:bg-primary-600/80 text-white border-primary-400/50',
        secondary: 'bg-white/80 hover:bg-white/90 text-neutral-900 border-white/30',
        ghost: 'bg-transparent hover:bg-white/10 text-neutral-700 dark:text-neutral-300 border-transparent'
    };

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur-sm border ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};