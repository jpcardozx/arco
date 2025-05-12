'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavBarEnhanced from '../NavBarEnhanced'
import FooterARCORevised from '../FooterARCORevised'
import { trackPageView } from '../../lib/analytics'
import { useTranslation } from '../../lib/i18n-context'

interface PageLayoutProps {
    children: React.ReactNode
    pageId: string
    pageVersion?: string
    hideNavbar?: boolean
    hideFooter?: boolean
    designSystem?: string
    withAnimation?: boolean
}

/**
 * Advanced Page Layout component for consistent page structure
 * - Handles analytics tracking
 * - Provides page transitions
 * - Includes navigation and footer
 */
export default function PageLayout({
    children,
    pageId,
    pageVersion = 'enhanced',
    hideNavbar = false,
    hideFooter = false,
    designSystem = 'arco-design-v3',
    withAnimation = true,
}: PageLayoutProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [progress, setProgress] = useState(0)    // Import i18n context
    const { language } = useTranslation()

    // Handle analytics tracking
    useEffect(() => {
        trackPageView(`${pageId}-page`, {
            version: pageVersion,
            designSystem: designSystem,
            viewportWidth: window.innerWidth,
            locale: language,
        })

        // Simulate page loading progress for UX
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + (100 - prev) * 0.3
                if (next > 99) {
                    clearInterval(interval)
                    return 100
                }
                return next
            })
        }, 100)

        const timer = setTimeout(() => {
            setIsLoaded(true)
            clearInterval(interval)
            setProgress(100)
        }, 800)

        return () => {
            clearTimeout(timer)
            clearInterval(interval)
        }
    }, [pageId, pageVersion, designSystem])

    // Page transition variants
    const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                when: "beforeChildren",
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1,
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.3
            }
        }
    }

    return (
        <>
            {/* Loading Indicator */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="w-48 h-1 bg-neutral-100 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-blue-600"
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeInOut" }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            {!hideNavbar && <NavBarEnhanced />}

            <main className="flex-grow relative z-10">
                {withAnimation ? (
                    <motion.div
                        variants={pageVariants}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                        exit="exit"
                        className="w-full"
                    >
                        {children}
                    </motion.div>
                ) : (
                    children
                )}
            </main>

            {!hideFooter && <FooterARCORevised />}
        </>
    )
}
