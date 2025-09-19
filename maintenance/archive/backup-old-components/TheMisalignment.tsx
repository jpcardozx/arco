'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

const insights = [
    {
        id: 'depth-paradox',
        tension: 'The deeper your expertise, the wider the communication gap',
        observation: 'Ten years of experience compressed into ten seconds of attention. Your breakthrough feels like noise because the journey that made it inevitable remains invisible. Mastery creates distance.',
        reflection: 'What took you a decade to understand, your audience needs to grasp instantly.'
    },
    {
        id: 'language-inheritance',
        tension: 'New thinking trapped in old vocabulary',
        observation: 'Revolutionary ideas explained with evolutionary terms. You\'re building tomorrow with yesterday\'s dictionary. The words exist, but they belong to what you\'ve replaced.',
        reflection: 'Category creation requires linguistic invention, not just product innovation.'
    },
    {
        id: 'clarity-complexity',
        tension: 'Sophisticated solutions, primitive explanations',
        observation: 'The more elegant your solution, the cruder it sounds when simplified. Nuance dies in translation. Your precision becomes their approximation.',
        reflection: 'True sophistication is making the complex feel inevitable, not complicated.'
    },
    {
        id: 'value-visibility',
        tension: 'Transformative impact, incremental perception',
        observation: 'They see what you do, not what it means. Features are visible; transformation is felt. You\'re selling the ladder when they need to see the view.',
        reflection: 'Value isn\'t in what you\'ve built—it\'s in what they become.'
    }
]

export default function SymbolicTensions() {
    const [expanded, setExpanded] = useState(null)

    return (
        <section className="py-32 px-6 bg-gradient-to-b from-neutral-950 to-black">
            <div className="max-w-4xl mx-auto">
                {/* Minimal header */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                        Four tensions that define every
                        <span className="block text-neutral-400">misunderstood breakthrough</span>
                    </h2>
                </motion.div>

                {/* Insights */}
                <div className="space-y-px">
                    {insights.map((insight, index) => (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div
                                className={`
                                    group cursor-pointer transition-all duration-500
                                    ${expanded === insight.id ? 'bg-white/5' : 'hover:bg-white/[0.02]'}
                                `}
                                onClick={() => setExpanded(expanded === insight.id ? null : insight.id)}
                            >
                                {/* Tension statement */}
                                <div className="px-8 py-8 flex items-center justify-between">
                                    <h3 className="text-xl text-white/90 font-light">
                                        {insight.tension}
                                    </h3>
                                    <motion.div
                                        animate={{ rotate: expanded === insight.id ? 45 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {expanded === insight.id ? (
                                            <Plus className="w-5 h-5 text-white/30" />
                                        ) : (
                                            <Minus className="w-5 h-5 text-white/30" />
                                        )}
                                    </motion.div>
                                </div>

                                {/* Expanded content */}
                                <AnimatePresence>
                                    {expanded === insight.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-8 pb-8">
                                                <p className="text-white/60 mb-6 leading-relaxed">
                                                    {insight.observation}
                                                </p>
                                                <p className="text-white/40 text-sm italic pl-4 border-l border-white/10">
                                                    {insight.reflection}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Subtle bridge to next section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-32 text-center"
                >
                    <p className="text-white/40 text-lg">
                        Recognition is the first step toward resolution.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}