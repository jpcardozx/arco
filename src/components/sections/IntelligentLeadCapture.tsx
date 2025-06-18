'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { PremiumSection, PremiumButton, PremiumCard } from '../experience/PremiumComponents'
import { useInView } from 'react-intersection-observer'
import confetti from 'canvas-confetti'

/**
 * IntelligentLeadCapture - Sistema avançado de captura de leads
 * Multi-step form com personalização dinâmica e validação inteligente
 */
export function IntelligentLeadCapture() {
    const [currentStep, setCurrentStep] = useState(0)
    const [formData, setFormData] = useState({
        businessType: '',
        monthlyVisitors: '',
        currentConversion: '',
        name: '',
        email: '',
        company: '',
        phone: '',
        priority: 'conversion'
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const formRef = useRef<HTMLDivElement>(null)
    const [ref, inView] = useInView({
        threshold: 0.3,
        triggerOnce: true
    })

    const steps = [
        {
            title: 'Qual seu tipo de negócio?',
            subtitle: 'Vamos personalizar nossa análise para seu segmento',
            field: 'businessType',
            options: [
                { value: 'saas', label: 'SaaS B2B', icon: '💻', description: 'Software como serviço' },
                { value: 'ecommerce', label: 'E-commerce', icon: '🛒', description: 'Loja online' },
                { value: 'leadgen', label: 'Lead Generation', icon: '🎯', description: 'Geração de leads' },
                { value: 'education', label: 'Educação', icon: '🎓', description: 'Cursos e treinamentos' },
                { value: 'services', label: 'Serviços', icon: '🔧', description: 'Prestação de serviços' },
                { value: 'other', label: 'Outro', icon: '📋', description: 'Outro tipo de negócio' }
            ]
        },
        {
            title: 'Quantos visitantes mensais?',
            subtitle: 'Isso nos ajuda a calcular seu potencial de ROI',
            field: 'monthlyVisitors',
            options: [
                { value: '1k-10k', label: '1K - 10K', icon: '📈', description: 'Até R$ 50K potencial/mês' },
                { value: '10k-50k', label: '10K - 50K', icon: '📊', description: 'Até R$ 250K potencial/mês' },
                { value: '50k-100k', label: '50K - 100K', icon: '🚀', description: 'Até R$ 500K potencial/mês' },
                { value: '100k+', label: '100K+', icon: '💎', description: 'R$ 1M+ potencial/mês' }
            ]
        },
        {
            title: 'Taxa de conversão atual?',
            subtitle: 'Nosso sistema calculará o improvement específico',
            field: 'currentConversion',
            options: [
                { value: '0-1', label: '0% - 1%', icon: '🔴', description: 'Alto potencial de melhoria' },
                { value: '1-3', label: '1% - 3%', icon: '🟡', description: 'Bom potencial de otimização' },
                { value: '3-5', label: '3% - 5%', icon: '🟢', description: 'Refinamento de performance' },
                { value: '5+', label: '5%+', icon: '💚', description: 'Otimização de elite' }
            ]
        }
    ]

    const benefits = {
        saas: {
            title: 'Otimização SaaS B2B',
            benefits: ['Trial-to-paid +89%', 'Churn reduction -67%', 'MRR growth +234%'],
            cta: 'Otimizar Funil SaaS'
        },
        ecommerce: {
            title: 'E-commerce Neural',
            benefits: ['AOV increase +45%', 'Cart abandonment -73%', 'Revenue +156%'],
            cta: 'Maximizar E-commerce'
        },
        leadgen: {
            title: 'Lead Generation IA',
            benefits: ['Form conversion +178%', 'Lead quality +89%', 'Cost-per-lead -56%'],
            cta: 'Acelerar Lead Gen'
        },
        education: {
            title: 'EdTech Optimization',
            benefits: ['Course completion +123%', 'Student retention +89%', 'Revenue +201%'],
            cta: 'Otimizar EdTech'
        },
        services: {
            title: 'Services Conversion',
            benefits: ['Consultation booking +167%', 'Lead quality +78%', 'Close rate +89%'],
            cta: 'Converter Mais Serviços'
        },
        other: {
            title: 'Custom Optimization',
            benefits: ['Tailored strategy', 'Industry-specific AI', 'Custom metrics'],
            cta: 'Análise Personalizada'
        }
    }

    const calculatePotential = () => {
        const visitors = {
            '1k-10k': 5000,
            '10k-50k': 25000,
            '50k-100k': 75000,
            '100k+': 150000
        }[formData.monthlyVisitors] || 5000

        const currentRate = {
            '0-1': 0.5,
            '1-3': 2,
            '3-5': 4,
            '5+': 6
        }[formData.currentConversion] || 1

        const improvement = currentRate < 2 ? 3.5 : 2.2
        const newRate = currentRate * improvement
        const additionalConversions = visitors * (newRate - currentRate) / 100
        const revenue = additionalConversions * 150 // Valor médio por conversão

        return {
            improvement: improvement.toFixed(1),
            additionalConversions: Math.round(additionalConversions),
            monthlyRevenue: Math.round(revenue / 1000)
        }
    }

    const handleOptionSelect = (value: string) => {
        setFormData(prev => ({
            ...prev,
            [steps[currentStep].field]: value
        }))

        setTimeout(() => {
            if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1)
            } else {
                // Show contact form
                setCurrentStep(steps.length)
            }
        }, 300)
    }

    const handleSubmit = () => {
        // Simulate form submission
        setIsSubmitted(true)

        // Celebration effect
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#8b5cf6', '#06b6d4']
        })

        // Track conversion (replace with actual tracking)
        console.log('Lead captured:', formData)
    }

    const potential = calculatePotential()
    const selectedBenefit = benefits[formData.businessType as keyof typeof benefits] || benefits.other

    return (
        <PremiumSection className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6"
                    >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        Análise Gratuita Personalizada
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Descubra Seu
                        <motion.span
                            initial={{ backgroundPosition: '0% 50%' }}
                            animate={{ backgroundPosition: '100% 50%' }}
                            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                            className="bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent bg-[length:200%_auto] ml-3"
                        >
                            Potencial
                        </motion.span>
                    </h2>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Em 3 perguntas, nossa IA calculará exatamente quanto você pode ganhar
                        com otimização neural de conversão.
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-400 text-sm">
                            {currentStep < steps.length ? `Pergunta ${currentStep + 1} de ${steps.length}` : 'Seus Dados'}
                        </span>
                        <span className="text-slate-400 text-sm">
                            {Math.round(((currentStep + 1) / (steps.length + 1)) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / (steps.length + 1)) * 100}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                        />
                    </div>
                </div>

                {/* Form Steps */}
                <div ref={formRef} className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <>
                                {currentStep < steps.length ? (
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <PremiumCard className="p-8 md:p-12">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
                                                {steps[currentStep].title}
                                            </h3>
                                            <p className="text-slate-300 text-center mb-12">
                                                {steps[currentStep].subtitle}
                                            </p>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                {steps[currentStep].options.map((option, index) => (
                                                    <motion.button
                                                        key={option.value}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: index * 0.1, duration: 0.4 }}
                                                        onClick={() => handleOptionSelect(option.value)}
                                                        whileHover={{ scale: 1.02, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/30 rounded-xl transition-all duration-300 text-left"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-3xl">{option.icon}</div>
                                                            <div>
                                                                <div className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                                                                    {option.label}
                                                                </div>
                                                                <div className="text-slate-400 text-sm">
                                                                    {option.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </PremiumCard>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="contact"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <PremiumCard className="p-8 md:p-12">
                                            <div className="grid md:grid-cols-2 gap-12">

                                                {/* Potential Results */}
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-6">
                                                        Seu Potencial Calculado
                                                    </h3>

                                                    <div className="space-y-6 mb-8">
                                                        <div className="bg-green-500/10 p-6 rounded-xl">
                                                            <div className="text-3xl font-bold text-green-400 mb-2">
                                                                +{potential.improvement}x
                                                            </div>
                                                            <div className="text-slate-300">Melhoria na conversão</div>
                                                        </div>

                                                        <div className="bg-blue-500/10 p-6 rounded-xl">
                                                            <div className="text-3xl font-bold text-blue-400 mb-2">
                                                                +{potential.additionalConversions}
                                                            </div>
                                                            <div className="text-slate-300">Conversões adicionais/mês</div>
                                                        </div>

                                                        <div className="bg-purple-500/10 p-6 rounded-xl">
                                                            <div className="text-3xl font-bold text-purple-400 mb-2">
                                                                R$ {potential.monthlyRevenue}K
                                                            </div>
                                                            <div className="text-slate-300">Receita adicional/mês</div>
                                                        </div>
                                                    </div>

                                                    <div className="bg-slate-800/50 p-6 rounded-xl">
                                                        <h4 className="text-white font-semibold mb-3">
                                                            {selectedBenefit.title}
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {selectedBenefit.benefits.map((benefit, index) => (
                                                                <li key={index} className="text-slate-300 text-sm flex items-center gap-2">
                                                                    <span className="text-green-400">✓</span>
                                                                    {benefit}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Contact Form */}
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white mb-6">
                                                        Receba Sua Análise Detalhada
                                                    </h3>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <input
                                                                type="text"
                                                                placeholder="Seu nome"
                                                                value={formData.name}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                                                            />
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="email"
                                                                placeholder="Email profissional"
                                                                value={formData.email}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                                                            />
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="text"
                                                                placeholder="Empresa"
                                                                value={formData.company}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                                                            />
                                                        </div>

                                                        <div>
                                                            <input
                                                                type="tel"
                                                                placeholder="WhatsApp (opcional)"
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors"
                                                            />
                                                        </div>

                                                        <PremiumButton
                                                            variant="primary"
                                                            size="lg"
                                                            onClick={handleSubmit}
                                                            className="w-full text-lg py-4"
                                                        >
                                                            {selectedBenefit.cta} (Grátis)
                                                        </PremiumButton>

                                                        <p className="text-xs text-slate-500 text-center">
                                                            Análise gratuita • Sem compromisso • Resultados em 24h
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </PremiumCard>
                                    </motion.div>
                                )}
                            </>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                            >
                                <PremiumCard className="p-12 text-center">
                                    <div className="text-6xl mb-6">🎉</div>
                                    <h3 className="text-3xl font-bold text-white mb-6">
                                        Análise Iniciada!
                                    </h3>
                                    <p className="text-xl text-slate-300 mb-8">
                                        Nossa IA está processando seus dados. Você receberá sua análise
                                        personalizada em <strong>24 horas</strong>.
                                    </p>

                                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                                        {[
                                            { icon: '🧠', title: 'Análise IA', desc: 'Processamento neural' },
                                            { icon: '📊', title: 'Relatório', desc: 'Métricas personalizadas' },
                                            { icon: '🚀', title: 'Estratégia', desc: 'Plano de implementação' }
                                        ].map((item, index) => (
                                            <div key={index} className="bg-white/5 p-4 rounded-xl">
                                                <div className="text-2xl mb-2">{item.icon}</div>
                                                <div className="text-white font-medium">{item.title}</div>
                                                <div className="text-slate-400 text-sm">{item.desc}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-slate-400">
                                        Fique atento ao email <strong>{formData.email}</strong>
                                    </p>
                                </PremiumCard>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PremiumSection>
    )
}
