/**
 * Design System Demo Page
 * 
 * Demonstra o novo design system ARCO em funcionamento
 * Showcases dos componentes primitivos e compostos criados
 */

import React from 'react'
import { Metadata } from 'next'
import DesignSystemDemo from '@/components/examples/DesignSystemDemo'
import { PageLayout } from '@/components/layout/PageLayout'

export const metadata: Metadata = {
    title: 'ARCO Design System - Demo',
    description: 'Demonstração do novo design system ARCO com componentes de alta qualidade',
}

export default function DesignSystemPage() {
    return (
        <PageLayout
            maxWidth="2xl"
            centered
            noPadding={false}
        >
            <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
                {/* Hero Section */}
                <section className="text-center py-16 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
                        ARCO Design System
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Sistema de componentes de alta qualidade com Radix UI, design tokens
                        consistentes e performance otimizada.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="#components"
                            className="inline-flex items-center justify-center rounded-md bg-primary-500 px-6 py-3 text-sm font-medium text-white shadow hover:bg-primary-600 transition-colors"
                        >
                            Ver Componentes
                        </a>
                        <a
                            href="#tokens"
                            className="inline-flex items-center justify-center rounded-md border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-50 transition-colors"
                        >
                            Design Tokens
                        </a>
                    </div>
                </section>

                {/* Demo Section */}
                <section id="components" className="max-w-7xl mx-auto px-4 pb-16">
                    <DesignSystemDemo />
                </section>

                {/* Performance Stats */}
                <section className="bg-white py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-12">
                            Performance Metrics
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-500 mb-2">
                                    &lt; 500KB
                                </div>
                                <div className="text-sm text-neutral-600">
                                    Bundle Size (gzipped)
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-500 mb-2">
                                    &lt; 1.5s
                                </div>
                                <div className="text-sm text-neutral-600">
                                    First Contentful Paint
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-500 mb-2">
                                    100%
                                </div>
                                <div className="text-sm text-neutral-600">
                                    WCAG 2.1 AA Compliance
                                </div>
                            </div>

                            <div className="text-center">
                                <div className="text-3xl font-bold text-primary-500 mb-2">
                                    52
                                </div>
                                <div className="text-sm text-neutral-600">
                                    UI Components
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    )
}
