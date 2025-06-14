'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Shield, Zap, DollarSign, Target, Rocket } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/context'

export function ValueProposition() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  const valueProps = [
    {
      icon: DollarSign,
      title: t('valueProposition.props.selfFunding.title'),
      description: t('valueProposition.props.selfFunding.description'),
      stat: t('valueProposition.props.selfFunding.stat'),
      statLabel: t('valueProposition.props.selfFunding.statLabel'),
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: t('valueProposition.props.rapidDelivery.title'),
      description: t('valueProposition.props.rapidDelivery.description'),
      stat: t('valueProposition.props.rapidDelivery.stat'),
      statLabel: t('valueProposition.props.rapidDelivery.statLabel'),
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: t('valueProposition.props.guaranteedOutcomes.title'),
      description: t('valueProposition.props.guaranteedOutcomes.description'),
      stat: t('valueProposition.props.guaranteedOutcomes.stat'),
      statLabel: t('valueProposition.props.guaranteedOutcomes.statLabel'),
      color: "from-purple-500 to-violet-500"
    }
  ]

  const businessModel = [
    {
      tier: t('valueProposition.businessModel.assessment.title'),
      price: t('valueProposition.businessModel.assessment.price'),
      description: t('valueProposition.businessModel.assessment.description'),
      features: [
        t('valueProposition.businessModel.assessment.features.audit'),
        t('valueProposition.businessModel.assessment.features.quantification'),
        t('valueProposition.businessModel.assessment.features.impact'),
        t('valueProposition.businessModel.assessment.features.model'),
        t('valueProposition.businessModel.assessment.features.roadmap')
      ],
      cta: t('valueProposition.businessModel.assessment.cta'),
      popular: false
    },
    {
      tier: t('valueProposition.businessModel.implementation.title'),
      price: t('valueProposition.businessModel.implementation.price'),
      description: t('valueProposition.businessModel.implementation.description'),
      features: [
        t('valueProposition.businessModel.implementation.features.development'),
        t('valueProposition.businessModel.implementation.features.consolidation'),
        t('valueProposition.businessModel.implementation.features.optimization'),
        t('valueProposition.businessModel.implementation.features.training'),
        t('valueProposition.businessModel.implementation.features.support')
      ],
      cta: t('valueProposition.businessModel.implementation.cta'),
      popular: true
    },
    {
      tier: t('valueProposition.businessModel.partnership.title'),
      price: t('valueProposition.businessModel.partnership.price'),
      description: t('valueProposition.businessModel.partnership.description'),
      features: [
        t('valueProposition.businessModel.partnership.features.monitoring'),
        t('valueProposition.businessModel.partnership.features.sprints'),
        t('valueProposition.businessModel.partnership.features.advisory'),
        t('valueProposition.businessModel.partnership.features.maintenance'),
        t('valueProposition.businessModel.partnership.features.reviews')
      ],
      cta: t('valueProposition.businessModel.partnership.cta'),
      popular: false
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {t('valueProposition.title')}
            </span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Convert Waste Into
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Competitive Advantage</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('valueProposition.subtitle')}
          </motion.p>
        </motion.div>

        {/* Value Propositions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
        >
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${prop.color} rounded-2xl flex items-center justify-center mb-6`}>
                {React.createElement(prop.icon, { className: "w-8 h-8 text-white" })}
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">{prop.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{prop.description}</p>

              <div className="pt-6 border-t border-gray-100">
                <div className="text-3xl font-bold text-gray-900 mb-1">{prop.stat}</div>
                <div className="text-sm text-gray-500">{prop.statLabel}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Business Model */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h3 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Three-Tier Revenue Architecture
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Structured approach from assessment to long-term partnership
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {businessModel.map((tier, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 ${tier.popular
                ? 'border-blue-500 scale-105'
                : 'border-gray-200 hover:border-blue-300'
                }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{tier.tier}</h4>
                <div className="text-4xl font-bold text-blue-600 mb-2">{tier.price}</div>
                <p className="text-gray-600">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${tier.popular
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-blue-500/25'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tier.cta}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* ROI Guarantee */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 lg:p-12 text-center text-white"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">ROI Guarantee</h3>
            <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
              If our implementation doesn't deliver measurable ROI within 6 months,
              we'll refund the entire project cost. That's how confident we are in our methodology.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Schedule Risk-Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}