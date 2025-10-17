/**
 * ARCO Header Component
 * Layout header with premium navigation
 */

'use client';

import React from 'react';
import { RefinedPremiumNavigation } from '../navigation/RefinedPremiumNavigation';

interface HeaderProps {
    variant?: 'default' | 'transparent' | 'solid' | 'hybrid';
    showNavigation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    variant = 'hybrid',
    showNavigation = true
}) => {
    if (!showNavigation) {
        return null;
    }

    return (
        <header className="relative">
            <RefinedPremiumNavigation />
        </header>
    );
};

export type { HeaderProps };
