'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TrendingUp, Shield, Zap, DollarSign, Target, Rocket } from 'lucide-react'

export function ValueProposition() {
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
      title: "Self-Funding Projects",
      description: "Your optimization pays for itself. We identify $2,400-5,200/month in tool savings that fund superior custom solutions.",
      stat: "$78K",
      statLabel: "Average Annual ROI",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Rapid Delivery",
      description: "4-8 week implementation timeline. No endless consulting cycles. Clear milestones, guaranteed delivery dates.",
      stat: "2.8",
      statLabel: "Months Payback",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Guaranteed Outcomes",
      description: "ROI-backed guarantees. If we don't deliver measurable improvements, you don't pay. Performance or profit sharing.",
      stat: "20:1",
      statLabel: "LTV/CAC Ratio",
      color: "from-purple-500 to-violet-500"
    }
  ]

  const businessModel = [
    {
      tier: "Assessment",
      price: "$997",
      description: "72-hour comprehensive analysis",
      features: [
        "Complete technology stack audit",
        "Performance quantification",
        "Financial impact analysis",
        "Self-funding project model",
        "Implementation roadmap"
      ],
      cta: "Get Assessment",
      popular: false
    },
    {
      tier: "Implementation",
      price: "$8K-25K",
      description: "4-8 week technical transformation",
      features: [
        "Custom platform development",
        "Tool consolidation & migration",
        "Performance optimization",
        "Team training & handover",
        "6-month support included"
      ],
      cta: "Start Project",
      popular: true
    },
    {
      tier: "Partnership",
      price: "$1K-2K/mo",
      description: "Ongoing optimization & advisory",
      features: [
        "Continuous performance monitoring",
        "Monthly optimization sprints",
        "Strategic technology advisory",
        "Priority support & maintenance",
        "Quarterly strategy reviews"
      ],
      cta: "Join Partnership",
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
              The ARCO Advantage
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Convert Waste Into
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Competitive Advantage</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're the only consultancy that structures projects to be self-funding. Your operational inefficiencies 
            become the budget for superior technical solutions.
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
              className={`relative bg-white rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 ${
                tier.popular 
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
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  tier.popular
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