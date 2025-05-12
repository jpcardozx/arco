'use client'

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { UserPreferencesProvider } from '../../lib/user-preferences-context.js'
import { I18nProvider } from '../../lib/i18n-context.js'
import { ThemeProvider } from '../ui/theme-provider'
import { ToastProvider } from '../ui/toast'
import PageLayout from './PageLayout'
import { extractLanguageFromPath } from '../../lib/language-utils.js'

interface AppLayoutProps {
    children: React.ReactNode
}

/**
 * Root application layout that provides context providers and core functionality
 */
export function AppLayout({ children }: AppLayoutProps) {
    const pathname = usePathname()

    // Extract language from URL (for future URL-based language switching)
    const { pathWithoutLanguage } = pathname ? extractLanguageFromPath(pathname) : { pathWithoutLanguage: pathname }

    // Generate pageId from pathname without language prefix
    const pageId = pathWithoutLanguage === '/'
        ? 'home'
        : pathWithoutLanguage.replace(/\//g, '-').substring(1) || 'unknown'

    // Determine if special layouts should be applied
    const isAdminPage = pathWithoutLanguage.startsWith('/admin')
    const isAuthPage = pathWithoutLanguage.startsWith('/auth')
    const isDashboardPage = pathWithoutLanguage.startsWith('/dashboard')

    return (
        <UserPreferencesProvider>
            <I18nProvider>
                <ThemeProvider>
                    <ToastProvider>
                        <PageLayout
                            pageId={pageId}
                            hideNavbar={isAuthPage}
                            hideFooter={isAuthPage || isAdminPage || isDashboardPage}
                        >
                            {children}
                        </PageLayout>
                    </ToastProvider>
                </ThemeProvider>
            </I18nProvider>
        </UserPreferencesProvider>
    )
}
