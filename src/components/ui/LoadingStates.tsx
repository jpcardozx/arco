'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, TrendingUp, Calculator, Mail } from 'lucide-react'

interface LoadingProps {
    type?: 'default' | 'hero' | 'calculator' | 'form'
    message?: string
    className?: string
}

/**
 * Loading States Component - Enhanced UX
 * 
 * Provides contextual loading animations for different sections
 */
export function LoadingState({ type = 'default', message, className = '' }: LoadingProps) {
    const baseClasses = "flex flex-col items-center justify-center p-8 rounded-2xl"

    const getIcon = () => {
        switch (type) {
            case 'hero':
                return <TrendingUp className="w-8 h-8 text-primary-500" />
            case 'calculator':
                return <Calculator className="w-8 h-8 text-blue-500" />
            case 'form':
                return <Mail className="w-8 h-8 text-green-500" />
            default:
                return <Loader2 className="w-8 h-8 text-primary-500" />
        }
    }

    const getMessage = () => {
        if (message) return message

        switch (type) {
            case 'hero':
                return 'Preparando experiência personalizada...'
            case 'calculator':
                return 'Calculando impacto no ROI...'
            case 'form':
                return 'Enviando informações...'
            default:
                return 'Carregando conteúdo...'
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`${baseClasses} ${className}`}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="mb-4"
            >
                {getIcon()}
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-neutral-600 font-medium"
            >
                {getMessage()}
            </motion.p>

            {/* Loading bar animation */}
            <motion.div
                className="w-16 h-1 bg-neutral-200 rounded-full mt-3 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="h-full bg-primary-500 rounded-full"
                    animate={{ x: [-64, 64] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.div>
    )
}

/**
 * Skeleton Component for better perceived performance
 */
interface SkeletonProps {
    className?: string
    lines?: number
    showAvatar?: boolean
}

export function Skeleton({ className = '', lines = 3, showAvatar = false }: SkeletonProps) {
    return (
        <div className={`animate-pulse ${className}`}>
            <div className="space-y-4">
                {showAvatar && (
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                        <div className="space-y-2 flex-1">
                            <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                            <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                        </div>
                    </div>
                )}

                {Array.from({ length: lines }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-4 bg-neutral-200 rounded w-full"></div>
                        <div className="h-4 bg-neutral-200 rounded w-4/5"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/**
 * Interactive Button with Loading State
 */
interface ButtonWithLoadingProps {
    onClick: () => void | Promise<void>
    children: React.ReactNode
    className?: string
    disabled?: boolean
    loadingText?: string
    icon?: React.ReactNode
}

export function ButtonWithLoading({
    onClick,
    children,
    className = '',
    disabled = false,
    loadingText = 'Processando...',
    icon
}: ButtonWithLoadingProps) {
    const [isLoading, setIsLoading] = useState(false)

    const handleClick = async () => {
        if (isLoading || disabled) return

        setIsLoading(true)
        try {
            await onClick()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.button
            onClick={handleClick}
            disabled={isLoading || disabled}
            className={`relative overflow-hidden ${className} ${isLoading || disabled ? 'opacity-75 cursor-not-allowed' : ''
                }`}
            whileHover={!isLoading && !disabled ? { scale: 1.02 } : {}}
            whileTap={!isLoading && !disabled ? { scale: 0.98 } : {}}
        >
            <motion.div
                className="flex items-center justify-center gap-2"
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.2 }}
            >
                {icon}
                {children}
            </motion.div>

            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-inherit"
                >
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span>{loadingText}</span>
                </motion.div>)}
        </motion.button>
    )
}
