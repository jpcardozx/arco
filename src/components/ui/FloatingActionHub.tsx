'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, Calendar, Zap, X, ArrowRight, Clock } from 'lucide-react'
// // import { useTranslation } from '@/lib/i18n/context'

export function FloatingActionHub() {
    const [isOpen, setIsOpen] = useState(false)
    const [showUrgency, setShowUrgency] = useState(false)

    // Show urgency indicator every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isOpen) {
                setShowUrgency(true)
                setTimeout(() => setShowUrgency(false), 3000)
            }
        }, 10000)

        return () => clearInterval(interval)
    }, [isOpen])

    const actions = [{
        icon: Calendar,
        label: 'Schedule Audit',
        description: 'Book your free analysis',
        color: 'from-emerald-500 to-green-500',
        action: () => console.log('Book audit'),
        urgent: true
    }, {
        icon: Phone,
        label: 'Emergency Call',
        description: 'Talk to specialist now',
        color: 'from-red-500 to-orange-500',
        action: () => console.log('Emergency call'),
        urgent: false
    }, {
        icon: MessageCircle,
        label: 'Quick Chat',
        description: 'Get your questions answered online',
        color: 'from-blue-500 to-purple-500',
        action: () => console.log('Quick chat'),
        urgent: false
    }
    ]

    const mainButtonVariants = {
        closed: {
            scale: 1,
            rotate: 0,
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)'
        },
        open: {
            scale: 1.1,
            rotate: 135,
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.5)'
        },
        urgency: {
            scale: [1, 1.2, 1],
            boxShadow: [
                '0 10px 25px rgba(59, 130, 246, 0.3)',
                '0 20px 40px rgba(239, 68, 68, 0.6)',
                '0 10px 25px rgba(59, 130, 246, 0.3)'
            ]
        }
    }

    return (
        <>
            {/* Floating Action Button */}
            <motion.div
                className="fixed bottom-8 right-8 z-50"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2, duration: 0.5, type: 'spring' }}
            >
                {/* Urgency pulse ring */}
                <AnimatePresence>
                    {showUrgency && (
                        <motion.div
                            className="absolute inset-0 bg-red-500 rounded-full"
                            initial={{ scale: 1, opacity: 0.6 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    )}
                </AnimatePresence>

                {/* Action items */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute bottom-20 right-0 space-y-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {actions.map((action, index) => (
                                <motion.div
                                    key={action.label}
                                    initial={{ scale: 0, y: 50, opacity: 0 }}
                                    animate={{ scale: 1, y: 0, opacity: 1 }}
                                    exit={{ scale: 0, y: 50, opacity: 0 }}
                                    transition={{ delay: index * 0.1, type: 'spring' }}
                                    className="flex items-center space-x-3"
                                >
                                    {/* Label */}
                                    <motion.div
                                        className="bg-slate-900/95 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10 shadow-2xl max-w-xs"
                                        whileHover={{ scale: 1.05, x: -5 }}
                                    >
                                        <div className="text-white font-semibold mb-1 flex items-center">
                                            {action.label}
                                            {action.urgent && (
                                                <motion.div
                                                    className="ml-2 w-2 h-2 bg-red-500 rounded-full"
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ repeat: Infinity, duration: 1 }}
                                                />
                                            )}
                                        </div>
                                        <div className="text-slate-400 text-sm">{action.description}</div>
                                    </motion.div>

                                    {/* Action button */}
                                    <motion.button
                                        onClick={action.action}
                                        className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center shadow-2xl`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <action.icon className="w-6 h-6 text-white" />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main button */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    variants={mainButtonVariants}
                    animate={showUrgency ? 'urgency' : isOpen ? 'open' : 'closed'}
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl relative overflow-hidden"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {/* Animated background */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    <div className="relative">
                        {isOpen ? (
                            <X className="w-8 h-8" />
                        ) : showUrgency ? (
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                            >
                                <Zap className="w-8 h-8" />
                            </motion.div>
                        ) : (
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            >
                                <ArrowRight className="w-8 h-8" />
                            </motion.div>
                        )}
                    </div>
                </motion.button>

                {/* Urgency notification */}
                <AnimatePresence>
                    {showUrgency && !isOpen && (
                        <motion.div
                            className="absolute -top-12 -left-32 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg"
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{ type: 'spring' }}
                        >                            <div className="flex items-center space-x-2">
                                <Clock className="w-4 h-4" />
                                <span>Últimas vagas esta semana!</span>
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-red-500 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Mobile bottom bar alternative */}
            <motion.div
                className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-blue-500/20 p-4 z-40"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
            >
                <div className="flex items-center justify-between max-w-sm mx-auto">                    <motion.button
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-4 rounded-xl font-semibold mr-2"
                    whileTap={{ scale: 0.95 }}
                >
                    Auditoria Grátis
                </motion.button>
                    <motion.button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold ml-2"
                        whileTap={{ scale: 0.95 }}
                    >
                        Agendar Ligação
                    </motion.button>
                </div>
            </motion.div>
        </>
    )
}
