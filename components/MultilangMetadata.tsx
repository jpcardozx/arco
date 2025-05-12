'use client'

import React, { useEffect } from 'react'
import Head from 'next/head'
import { useTranslation } from '../lib/i18n-context.js'
import { SupportedLanguage } from '../lib/i18n-context.js'

interface MetadataTranslations {
    title: string
    description: string
    keywords: string
}

interface MultilangMetadataProps {
    pageId: string
    baseUrl: string
    translations: Record<SupportedLanguage, MetadataTranslations>
    imageUrl?: string
    imageAlt?: string
}

/**
 * Component to handle multilingual metadata for SEO
 * This enhances SEO by providing language-specific metadata 
 * and proper hreflang attributes
 */
export function MultilangMetadata({
    pageId,
    baseUrl,
    translations,
    imageUrl,
    imageAlt
}: MultilangMetadataProps) {
    const { language } = useTranslation()
    const currentTranslation = translations[language]

    // Ensure the baseUrl doesn't end with a slash
    const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl

    // Generate canonical and alternate URLs
    const canonicalUrl = `${normalizedBaseUrl}${pageId === 'home' ? '' : `/${pageId}`}`

    // Only update metadata on the client side
    useEffect(() => {
        // Update the document title
        document.title = currentTranslation.title

        // Update meta description
        let descriptionTag = document.querySelector('meta[name="description"]')
        if (descriptionTag) {
            descriptionTag.setAttribute('content', currentTranslation.description)
        } else {
            descriptionTag = document.createElement('meta')
            descriptionTag.setAttribute('name', 'description')
            descriptionTag.setAttribute('content', currentTranslation.description)
            document.head.appendChild(descriptionTag)
        }

        // Update meta keywords
        let keywordsTag = document.querySelector('meta[name="keywords"]')
        if (keywordsTag) {
            keywordsTag.setAttribute('content', currentTranslation.keywords)
        } else {
            keywordsTag = document.createElement('meta')
            keywordsTag.setAttribute('name', 'keywords')
            keywordsTag.setAttribute('content', currentTranslation.keywords)
            document.head.appendChild(keywordsTag)
        }

        // Open Graph tags
        updateMetaTag('og:title', currentTranslation.title)
        updateMetaTag('og:description', currentTranslation.description)
        updateMetaTag('og:url', canonicalUrl)
        if (imageUrl) {
            updateMetaTag('og:image', imageUrl.startsWith('http') ? imageUrl : `${normalizedBaseUrl}${imageUrl}`)
            if (imageAlt) {
                updateMetaTag('og:image:alt', imageAlt)
            }
        }

        // Twitter card tags
        updateMetaTag('twitter:card', 'summary_large_image')
        updateMetaTag('twitter:title', currentTranslation.title)
        updateMetaTag('twitter:description', currentTranslation.description)
        if (imageUrl) {
            updateMetaTag('twitter:image', imageUrl.startsWith('http') ? imageUrl : `${normalizedBaseUrl}${imageUrl}`)
            if (imageAlt) {
                updateMetaTag('twitter:image:alt', imageAlt)
            }
        }
    }, [language, currentTranslation, canonicalUrl, imageUrl, imageAlt, normalizedBaseUrl])

    // Helper function to update meta tags
    function updateMetaTag(property: string, content: string) {
        const propertySelector = property.startsWith('og:') ?
            `meta[property="${property}"]` :
            `meta[name="${property}"]`

        let tag = document.querySelector(propertySelector)
        if (tag) {
            if (property.startsWith('og:')) {
                tag.setAttribute('property', property)
            } else {
                tag.setAttribute('name', property)
            }
            tag.setAttribute('content', content)
        } else {
            tag = document.createElement('meta')
            if (property.startsWith('og:')) {
                tag.setAttribute('property', property)
            } else {
                tag.setAttribute('name', property)
            }
            tag.setAttribute('content', content)
            document.head.appendChild(tag)
        }
    }

    return (
        <Head>
            <link rel="canonical" href={canonicalUrl} key="canonical" />

            {/* Add hreflang links for all supported languages */}
            {Object.entries(translations).map(([langCode, _]) => (
                <link
                    key={`hreflang-${langCode}`}
                    rel="alternate"
                    hrefLang={langCode}
                    href={`${normalizedBaseUrl}/${langCode}${pageId === 'home' ? '' : `/${pageId}`}`}
                />
            ))}

            {/* Add x-default hreflang for search engines */}
            <link
                key="hreflang-default"
                rel="alternate"
                hrefLang="x-default"
                href={`${normalizedBaseUrl}${pageId === 'home' ? '' : `/${pageId}`}`}
            />
        </Head>
    )
}
