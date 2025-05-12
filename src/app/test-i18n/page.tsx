'use client'

import React from 'react'
import PageLayout from '../../../components/layout/PageLayout'
import { TranslationTest } from '../../../components/tests/TranslationTest'
import { Section } from '../../../components/ui/section'
import { Card } from '../../../components/ui/card'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'
import { MultilangMetadata } from '../../../components/MultilangMetadata'
import { useLanguageDetection } from '../../../hooks/useLanguageDetection'
import { useTranslation } from '../../../lib/i18n-context'

export default function TestI18nPage() {
    const { language } = useTranslation()
    const { detectedLanguage, isDetecting } = useLanguageDetection()

    // Translation metadata for SEO
    const metadataTranslations = {
        en: {
            title: 'ARCO - I18n System Test',
            description: 'Test page for the internationalization system of ARCO website',
            keywords: 'i18n, internationalization, language, translation, test'
        },
        pt: {
            title: 'ARCO - Teste do Sistema I18n',
            description: 'Página de teste para o sistema de internacionalização do site ARCO',
            keywords: 'i18n, internacionalização, idioma, tradução, teste'
        },
        es: {
            title: 'ARCO - Prueba del Sistema I18n',
            description: 'Página de prueba para el sistema de internacionalización del sitio web ARCO',
            keywords: 'i18n, internacionalización, idioma, traducción, prueba'
        },
        fr: {
            title: 'ARCO - Test du Système I18n',
            description: 'Page de test pour le système d\'internationalisation du site ARCO',
            keywords: 'i18n, internationalisation, langue, traduction, test'
        }
    }

    return (
        <PageLayout pageId="test-i18n">
            {/* SEO Metadata with language variants */}
            <MultilangMetadata
                pageId="test-i18n"
                baseUrl="https://arco-example.com"
                translations={metadataTranslations}
            />

            <div className="py-12">
                <Section>
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6">
                            Translation System Test
                        </h1>

                        <Card className="mb-8 p-4">
                            <p className="mb-4">
                                This page demonstrates the functionality of our internationalization (i18n) system.
                                Try changing languages using the switcher below to see the translations update in real-time.
                            </p>

                            {!isDetecting && (
                                <div className="p-3 bg-blue-50 text-blue-700 rounded-md mb-4">
                                    <strong>Auto-detected language:</strong> {detectedLanguage.toUpperCase()}
                                    {detectedLanguage !== language && (
                                        <span className="ml-2">(Currently using: {language.toUpperCase()})</span>
                                    )}
                                </div>
                            )}

                            <div className="flex gap-2 mb-4">
                                <Link href="/">
                                    <Button variant="outline">Return Home</Button>
                                </Link>
                            </div>
                        </Card>

                        <TranslationTest />
                    </div>
                </Section>
            </div>
        </PageLayout>
    )
}
