/**
 * ARCO Main Layout
 * Core application layout (navigation now in root layout)
 */

'use client';

import React from 'react';
import { Footer } from './Footer';
import { ThemeProvider } from '../../design-system/core/theme';

interface MainLayoutProps {
    children: React.ReactNode;
    showFooter?: boolean;
    footerVariant?: 'default' | 'minimal';
    className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    showFooter = true,
    footerVariant = 'default',
    className = ''
}) => {
    return (
        <ThemeProvider>
            <div className={`min-h-screen flex flex-col overflow-x-hidden prevent-overflow ${className}`}>
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
