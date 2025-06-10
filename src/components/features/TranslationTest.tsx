'use client';

import React from 'react';

import { Button } from './features/button';
import { Card } from './card';
import { LanguageSwitcher } from './language-switcher';
import { useTranslation } from '../../../lib/context/i18n-context';

/**
 * Test component to verify that our i18n system is working
 */
export function TranslationTest() {
  const { t, language } = useTranslation();

  return (
    <div className="mx-auto max-w-xl p-6">
      <Card className="p-6">
        <h2 className="mb-4 text-2xl font-bold">{t('common.navigation.home')}</h2>

        <p className="mb-4">
          Current language: <strong>{language}</strong>
        </p>

        <div className="mb-6">
          <LanguageSwitcher variant="buttons" />
        </div>

        <div className="space-y-4">
          <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
            <strong>Navigation</strong>
            <ul className="mt-2 space-y-1">
              <li>{t('common.navigation.home')}</li>
              <li>{t('common.navigation.about')}</li>
              <li>{t('common.navigation.process')}</li>
              <li>{t('common.navigation.results')}</li>
            </ul>
          </div>

          <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
            <strong>Buttons</strong>
            <div className="mt-2 flex flex-wrap gap-2">
              <Button size="sm">{t('common.buttons.submit')}</Button>
              <Button size="sm" variant="outline">
                {t('common.buttons.cancel')}
              </Button>
              <Button size="sm" variant="ghost">
                {t('common.buttons.showMore')}
              </Button>
            </div>
          </div>

          <div className="rounded-md bg-neutral-100 p-4 dark:bg-neutral-800">
            <strong>Hero Section</strong>
            <h3 className="mt-2 text-xl font-bold">{t('homepage.hero.title')}</h3>
            <p className="mt-1 text-sm opacity-80">{t('homepage.hero.subtitle')}</p>
            <div className="mt-3">
              <Button>{t('homepage.hero.cta')}</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
