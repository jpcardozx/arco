'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpDown, BarChart2, TrendingUp, CheckCircle2, MessageSquareDot } from 'lucide-react'

interface IntegrationControllerProps {
    activeView: string
    onChange: (view: string) => void
}

export default function IntegrationController({ activeView, onChange }: IntegrationControllerProps) {
    const [expanded, setExpanded] = useState(false)
    const [showAdmin, setShowAdmin] = useState(false)

    // Determine if we should show the controller
    // In production, this would check if user is admin or if URL parameter is set
    const shouldShow = () => {
        if (typeof window === 'undefined') return false

        // Check for URL parameter that enables the controller for testing
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.has('view_control') || showAdmin
    }

    if (!shouldShow()) return null

    return (
        <div className="fixed top-20 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="bg-white rounded-xl shadow-2xl border border-neutral-200 mb-3 overflow-hidden"
                    >
                        <div className="p-4 max-w-md">
                            <h3 className="text-neutral-900 font-semibold mb-2 flex items-center">
                                <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
                                Controlador de Visualização
                            </h3>

                            <p className="text-sm text-neutral-600 mb-4 border-l-2 border-blue-500 pl-3 bg-blue-50 py-1">
                                Este controle permite alternar entre diferentes abordagens de conteúdo para testes A/B.
                            </p>

                            <div className="space-y-3 mb-4">
                                <button
                                    onClick={() => onChange('market-focused')}
                                    className={`w-full px-4 py-3 rounded-lg flex items-center justify-between transition ${activeView === 'market-focused'
                                        ? "bg-blue-100 border border-blue-300 shadow-sm"
                                        : "bg-white border border-neutral-200 hover:border-blue-200 hover:bg-blue-50"
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0 mr-3">
                                            <MessageSquareDot className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-medium text-neutral-900">Posicionamento de Mercado</div>
                                            <div className="text-xs text-neutral-500">Foco em estratégia e posicionamento premium</div>
                                        </div>
                                    </div>

                                    {activeView === 'market-focused' && (
                                        <span className="text-blue-700 text-xs font-medium px-2 py-1 rounded-full bg-blue-50 border border-blue-200">
                                            ATIVO
                                        </span>
                                    )}
                                </button>

                                <button
                                    onClick={() => onChange('performance-focused')}
                                    className={`w-full px-4 py-3 rounded-lg flex items-center justify-between transition ${activeView === 'performance-focused'
                                        ? "bg-indigo-100 border border-indigo-300 shadow-sm"
                                        : "bg-white border border-neutral-200 hover:border-indigo-200 hover:bg-indigo-50"
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center flex-shrink-0 mr-3">
                                            <BarChart2 className="h-4 w-4 text-white" />
                                        </div>
                                        <div className="text-left">
                                            <div className="font-medium text-neutral-900">Performance Técnica</div>
                                            <div className="text-xs text-neutral-500">Foco em métricas e otimização de performance</div>
                                        </div>
                                    </div>

                                    {activeView === 'performance-focused' && (
                                        <span className="text-indigo-700 text-xs font-medium px-2 py-1 rounded-full bg-indigo-50 border border-indigo-200">
                                            ATIVO
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div className="text-center border-t border-neutral-200 pt-3">
                                <button
                                    onClick={() => setExpanded(false)}
                                    className="inline-flex items-center text-xs text-neutral-500 hover:text-neutral-800"
                                >
                                    <span>Fechar controlador</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white shadow-lg border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>Controlador de Visão</span>
                <ArrowUpDown className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
        </div>
    )
}
