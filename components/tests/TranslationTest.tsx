'use client'

import React from 'react'
import { useTranslation } from '../../lib/i18n-context'
import { LanguageSwitcher } from '../ui/language-switcher'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

/**
 * Test component to verify that our i18n system is working
 */
export function TranslationTest() {
    const { t, language } = useTranslation()

    return (
        <div className="p-6 max-w-xl mx-auto">
            <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">
                    {t('common.navigation.home')}
                </h2>

                <p className="mb-4">
                    Current language: <strong>{language}</strong>
                </p>

                <div className="mb-6">
                    <LanguageSwitcher variant="buttons" />
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                        <strong>Navigation</strong>
                        <ul className="mt-2 space-y-1">
                            <li>{t('common.navigation.home')}</li>
                            <li>{t('common.navigation.about')}</li>
                            <li>{t('common.navigation.process')}</li>
                            <li>{t('common.navigation.results')}</li>
                        </ul>
                    </div>

                    <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                        <strong>Buttons</strong>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <Button size="sm">{t('common.buttons.submit')}</Button>
                            <Button size="sm" variant="outline">{t('common.buttons.cancel')}</Button>
                            <Button size="sm" variant="ghost">{t('common.buttons.showMore')}</Button>
                        </div>
                    </div>

                    <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                        <strong>Hero Section</strong>
                        <h3 className="text-xl font-bold mt-2">{t('homepage.hero.title')}</h3>
                        <p className="text-sm opacity-80 mt-1">{t('homepage.hero.subtitle')}</p>
                        <div className="mt-3">
                            <Button>{t('homepage.hero.cta')}</Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
