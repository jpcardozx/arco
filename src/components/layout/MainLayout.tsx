/**
 * ARCO Main Layout
 * Core application layout with header and footer
 */

'use client';

import React from 'react';
import { EnhancedNavigation } from '../navigation/EnhancedNavigation';
import { Footer } from './Footer';
import { ThemeProvider } from '../../design-system/core/theme';

interface MainLayoutProps {
    children: React.ReactNode;
    showHeader?: boolean;
    showFooter?: boolean;
    headerVariant?: 'default' | 'transparent' | 'solid';
    footerVariant?: 'default' | 'minimal';
    className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    showHeader = true,
    showFooter = true,
    headerVariant = 'default',
    footerVariant = 'default',
    className = ''
}) => {
    return (
        <ThemeProvider>
            <div className={`min-h-screen flex flex-col overflow-x-hidden prevent-overflow ${className}`}>
                {showHeader && (
                    <EnhancedNavigation />
                )}

                <main className="flex-1 w-full overflow-x-hidden">
                    {children}
                </main>

                {showFooter && (
                    <Footer
                        variant={footerVariant}
                        showPreFooter={true}
                    />
                )}
            </div>
        </ThemeProvider>
    );
};

export type { MainLayoutProps };
