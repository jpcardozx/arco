import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * PageLayout Component - Layout primitivo para páginas
 * 
 * Sistema de layout consistente usando design tokens
 * Implementa padrões de acessibilidade e responsividade
 * 
 * Features:
 * - Layout flexível com container responsivo
 * - Suporte a header/footer customizáveis
 * - Acessibilidade integrada
 * - Design tokens aplicados
 */

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Componente de header (navbar)
     */
    header?: React.ReactNode

    /**
     * Componente de footer
     */
    footer?: React.ReactNode

    /**
     * Conteúdo principal da página
     */
    children: React.ReactNode

    /**
     * Remove padding do container principal
     */
    noPadding?: boolean

    /**
     * Aplica largura máxima ao container
     */
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

    /**
     * Centraliza o conteúdo horizontalmente
     */
    centered?: boolean
}

const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
    ({
        className,
        header,
        footer,
        children,
        noPadding = false,
        maxWidth = '2xl',
        centered = true,
        ...props
    }, ref) => {
        const maxWidthClasses = {
            sm: 'max-w-sm',
            md: 'max-w-md',
            lg: 'max-w-lg',
            xl: 'max-w-xl',
            '2xl': 'max-w-2xl',
            full: 'max-w-full',
        }

        return (
            <div
                ref={ref}
                className={cn(
                    'min-h-screen flex flex-col',
                    'bg-white text-neutral-900',
                    className
                )}
                {...props}
            >
                {/* Header */}
                {header && (
                    <header className="sticky top-0 z-50">
                        {header}
                    </header>
                )}

                {/* Main Content */}
                <main
                    className={cn(
                        'flex-1 flex flex-col',
                        !noPadding && 'px-4 sm:px-6 lg:px-8',
                        centered && 'items-center',
                    )}
                    role="main"
                >
                    <div
                        className={cn(
                            'w-full',
                            maxWidthClasses[maxWidth],
                            centered && 'mx-auto',
                            !noPadding && 'py-8'
                        )}
                    >
                        {children}
                    </div>
                </main>

                {/* Footer */}
                {footer && (
                    <footer className="mt-auto">
                        {footer}
                    </footer>
                )}
            </div>
        )
    }
)

PageLayout.displayName = 'PageLayout'

export { PageLayout }
export default PageLayout
