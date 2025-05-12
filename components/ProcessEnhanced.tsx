'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ArrowRight, Gauge, LineChart, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from '../lib/i18n-context'

export default function ProcessEnhanced() {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState(0);

    const processSteps = [
        {
            id: 'diagnosis',
            title: t('solutions.analysis.title'),
            description: t('solutions.analysis.description'),
            icon: Gauge,
            color: "from-blue-500 to-indigo-500",
            features: [
                t('solutions.analysis.feature1'),
                t('solutions.analysis.feature2'),
                t('solutions.analysis.feature3'),
                t('solutions.analysis.feature4')
            ],
            cta: t('common.buttons.calculate'),
            price: "$147",
            image: "/hero-funnel-heatmap-arco.png"
        },
        {
            id: 'implementation',
            title: t('solutions.recovery.title'),
            description: t('solutions.recovery.description'),
            icon: LineChart,
            color: "from-indigo-500 to-violet-500",
            features: [
                t('solutions.recovery.feature1'),
                t('solutions.recovery.feature2'),
                t('solutions.recovery.feature3'),
                t('solutions.recovery.feature4')
            ],
            cta: t('common.buttons.viewPackages'),
            price: "Starting at $897",
            image: "/hero-case-mosaic-2.png"
        },
        {
            id: 'results',
            title: t('solutions.growth.title'),
            description: t('solutions.growth.description'),
            icon: TrendingUp,
            color: "from-violet-500 to-purple-500",
            features: [
                t('solutions.growth.feature1'),
                t('solutions.growth.feature2'),
                t('solutions.growth.feature3'),
                t('solutions.growth.feature4')
            ],
            cta: t('common.buttons.downloadReport'),
            price: "From $297/mo",
            image: "/hero-case-mosaic-1.png"
        }
    ]; const titleRef = useRef(null);
    const { scrollYProgress: titleScrollProgress } = useScroll({
        target: titleRef,
        offset: ["start end", "end start"]
    });

    const titleOpacity = useTransform(titleScrollProgress, [0, 0.5], [0, 1]);
    const titleTranslateY = useTransform(titleScrollProgress, [0, 0.5], [20, 0]);

    return (
        <section id="process" className="bg-white dark:bg-neutral-900 py-24 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <div ref={titleRef} className="text-center mb-16">
                    <motion.span
                        style={{ opacity: titleScrollProgress, translateY: useTransform(titleScrollProgress, [0, 1], [20, 0]) }}
                        className="inline-block text-sm uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400 mb-2"
                    >
                        {t('homepage.process.title')}
                    </motion.span>
                    <motion.h2
                        style={{ opacity: titleScrollProgress, translateY: useTransform(titleScrollProgress, [0, 1], [20, 0]) }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white"
                    >
                        {t('homepage.process.subtitle')}
                    </motion.h2>
                </div>

                {/* Process tabs navigation */}
                <div className="flex flex-wrap justify-center mb-12">
                    {processSteps.map((step, index) => (
                        <button
                            key={step.id}
                            onClick={() => setActiveTab(index)}
                            className={`relative flex items-center px-6 py-3 mx-2 mb-4 text-sm font-medium rounded-full transition-all ${activeTab === index
                                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                                }`}
                        >
                            <step.icon size={18} className="mr-2" />
                            <span>{step.title}</span>
                            {activeTab === index && (
                                <motion.span
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 rounded-full"
                                    transition={{ type: "spring", duration: 0.5 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Process step content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left column - Content */}
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="h-full flex flex-col"
                            >
                                <div className="mb-6">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-800 dark:text-white mb-4">
                                        {processSteps[activeTab].title}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-300 text-lg mb-6">
                                        {processSteps[activeTab].description}
                                    </p>
                                </div>

                                <div className="flex-grow">
                                    <h4 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">Key features:</h4>
                                    <ul className="space-y-3 mb-8">
                                        {processSteps[activeTab].features.map((feature, i) => (
                                            <li key={i} className="flex items-start">
                                                <CheckCircle className="text-green-500 mt-0.5 mr-2" size={18} />
                                                <span className="text-neutral-700 dark:text-neutral-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-baseline mb-4">
                                        <span className="text-2xl font-bold text-neutral-800 dark:text-white">{processSteps[activeTab].price}</span>
                                    </div>
                                    <Link href="#contact" className={`inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r ${processSteps[activeTab].color} hover:shadow-lg transition-all`}>
                                        {processSteps[activeTab].cta}
                                        <ArrowRight size={16} className="ml-2" />
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right column - Image */}
                    <div className="relative h-[400px] lg:h-auto rounded-2xl overflow-hidden shadow-xl">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={processSteps[activeTab].image}
                                    alt={processSteps[activeTab].title}
                                    fill
                                    className="object-cover"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-br ${processSteps[activeTab].color} opacity-20`} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
