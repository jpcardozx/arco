import React from 'react'
import { useTranslation } from './i18n-context'

/**
 * Type for props that need translation
 */
export type WithTranslationProps = {
    translationPrefix?: string
    translationReplacements?: Record<string, string>
}

/**
 * Higher-order component to provide translation to components
 * @param Component Component to wrap
 * @param defaultPrefix Default translation prefix to use
 */
export function withTranslation<T extends object>(
    Component: React.ComponentType<T & { t: (key: string, replacements?: Record<string, string>) => string }>,
    defaultPrefix: string = ''
) {
    const WithTranslation = (props: T & WithTranslationProps) => {
        const { t } = useTranslation()
        const { translationPrefix, translationReplacements, ...rest } = props

        // Create prefixed translation function
        const prefixedTranslation = (key: string, replacements?: Record<string, string>) => {
            const prefix = translationPrefix || defaultPrefix
            const fullKey = prefix ? `${prefix}.${key}` : key
            return t(fullKey, replacements || translationReplacements)
        }

        return <Component {...rest as T} t={prefixedTranslation} />
    }

    WithTranslation.displayName = `WithTranslation(${Component.displayName || Component.name || 'Component'})`

    return WithTranslation
}

/**
 * Hook to get translations with a prefix
 * @param prefix Translation prefix
 */
export function usePrefixedTranslation(prefix: string) {
    const { t } = useTranslation()

    return {
        t: (key: string, replacements?: Record<string, string>) => {
            return t(`${prefix}.${key}`, replacements)
        }
    }
}
