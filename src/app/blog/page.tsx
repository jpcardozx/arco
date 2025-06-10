'use client';

import React from 'react';

import NavBarEnhanced from '../../components/features/NavBarEnhanced';
import FooterARCORevised from '../../components/layout/FooterARCORevised';
import PageLayout from '../../components/layout/PageLayout';
import { useTranslation } from '../../lib/context/i18n-context';

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      <NavBarEnhanced />
      <main className="container mx-auto px-4 py-16 md:px-6 md:py-24">
        <h1 className="mb-6 mt-12 text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl">
          {t('common.blog.title', { defaultValue: 'Blog' })}
        </h1>
        <p className="mb-12 max-w-3xl text-xl text-neutral-700">
          {t('common.blog.description', {
            defaultValue:
              'Insights and perspectives from our team of digital strategists and transformation experts.',
          })}
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder for blog posts */}
          <div className="flex flex-col rounded-lg border border-neutral-200 bg-white shadow-sm transition-all hover:shadow-md">
            <div className="h-48 w-full bg-neutral-200" />
            <div className="p-6">
              <p className="mb-2 text-sm font-medium text-blue-600">
                {t('common.blog.category', { defaultValue: 'Category' })}
              </p>
              <h2 className="mb-3 text-xl font-bold text-neutral-900">
                {t('common.blog.placeholder_title', { defaultValue: 'Coming Soon' })}
              </h2>
              <p className="mb-4 text-neutral-600">
                {t(
                  'common.blog.placeholder_text',
                  { defaultValue: 'Our blog posts are currently being crafted with care. Check back soon for valuable insights.' }
                )}
              </p>
              <p className="text-sm text-neutral-500">
                {t('common.blog.date_format', { defaultValue: 'May 12, 2025' })}
              </p>
            </div>
          </div>
        </div>
      </main>
      <FooterARCORevised />
    </div>
  );
}
