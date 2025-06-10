'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { 
  Search, BarChart3, Target, Calculator, 
  Layers, Clock, ArrowRight, CheckCircle 
} from 'lucide-react'

export function IMPACTFramework() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState(0)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
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

  const impactSteps = [
    {
      letter: 'I',
      title: 'Inventory',
      subtitle: 'Technology Audit',
      icon: Search,
      description: 'Complete mapping of your technical infrastructure, identifying all tools, costs, and redundancies.',
      process: [
        'Automated tool detection via BuiltWith, Wappalyzer',
        'Performance analysis via PageSpeed, Core Web Vitals',
        'Security assessment via vulnerability scanning',
        'Cost analysis of all SaaS subscriptions'
      ],
      deliverable: 'Comprehensive technology stack report with costs',
      color: 'from-red-500 to-pink-500',
      bgColor: 'from-red-50 to-pink-50'
    },
    {
      letter: 'M',
      title: 'Measure',
      subtitle: 'Performance Quantification',
      icon: BarChart3,
      description: 'Quantify the financial impact of current inefficiencies and performance issues.',
      process: [
        'Conversion funnel analysis and optimization opportunities',
        'Site speed impact on revenue calculation',
        'User experience friction point identification',
        'Competitive performance benchmarking'
      ],
      deliverable: 'Financial impact analysis of performance issues',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'from-orange-50 to-amber-50'
    },
    {
      letter: 'P',
      title: 'Prioritize',
      subtitle: 'Opportunity Ranking',
      icon: Target,
      description: 'Rank optimization opportunities by ROI potential and implementation complexity.',
      process: [
        'Cost-benefit analysis for each identified issue',
        'Implementation complexity assessment',
        'Risk evaluation for proposed changes',
        'Timeline estimation for each improvement'
      ],
      deliverable: 'Prioritized optimization roadmap',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      letter: 'A',
      title: 'Analyze',
      subtitle: 'Financial Modeling',
      icon: Calculator,
      description: 'Structure the self-funding project economics with detailed ROI projections.',
      process: [
        'Tool consolidation savings calculation',
        'Performance improvement revenue impact',
        'Development investment requirement analysis',
        'ROI timeline and break-even modeling'
      ],
      deliverable: 'Self-funding project financial model',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      letter: 'C',
      title: 'Consolidate',
      subtitle: 'Solution Architecture',
      icon: Layers,
      description: 'Design optimal technical architecture that eliminates redundancies and maximizes performance.',
      process: [
        'Custom platform architecture planning',
        'Integration strategy for retained tools',
        'Data migration and preservation planning',
        'Performance optimization implementation design'
      ],
      deliverable: 'Technical implementation blueprint',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      letter: 'T',
      title: 'Timeline',
      subtitle: 'Implementation Planning',
      icon: Clock,
      description: 'Create realistic project timeline with clear milestones and success metrics.',
      process: [
        'Phase-based implementation scheduling',
        'Resource requirement planning',
        'Risk mitigation strategy development',
        'Success metrics and KPI definition'
      ],
      deliverable: 'Detailed implementation timeline with milestones',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50'
    }
  ]

  const outcomes = [
    {
      metric: '2-5x',
      label: 'Performance Improvement',
      description: 'Average site speed and conversion optimization'
    },
    {
      metric: '$2,400+',
      label: 'Monthly Savings',
      description: 'Tool consolidation and efficiency gains'
    },
    {
      metric: '4-8 weeks',
      label: 'Implementation Time',
      description: 'From assessment to fully deployed solution'
    },
    {
      metric: '2.8 months',
      label: 'Payback Period',
      description: 'Time to recover full project investment'
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Proprietary Methodology
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            The <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">IMPACT</span> Framework™
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our systematic approach to identifying, quantifying, and converting operational waste 
            into self-funding digital transformation projects.
          </motion.p>
        </motion.div>

        {/* Framework Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {impactSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeStep === index ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`bg-gradient-to-br ${step.bgColor} rounded-2xl p-6 border-2 transition-all duration-300 ${
                  activeStep === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                }`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
                    {React.createElement(step.icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-2`}>
                      {step.letter}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active Step Details */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`bg-gradient-to-br ${impactSteps[activeStep].bgColor} rounded-3xl p-8 lg:p-12 mb-20`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-20 h-20 bg-gradient-to-r ${impactSteps[activeStep].color} rounded-2xl flex items-center justify-center`}>
                  {React.createElement(impactSteps[activeStep].icon, { className: "w-10 h-10 text-white" })}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">{impactSteps[activeStep].title}</h3>
                  <p className="text-lg text-gray-600">{impactSteps[activeStep].subtitle}</p>
                </div>
              </div>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                {impactSteps[activeStep].description}
              </p>
              
              <div className="bg-white/80 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Deliverable:</h4>
                <p className="text-gray-700 font-medium">{impactSteps[activeStep].deliverable}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-gray-900 mb-6">Process Steps:</h4>
              <ul className="space-y-4">
                {impactSteps[activeStep].process.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Outcomes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-12"
        >
          <motion.h3 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Proven Outcomes
          </motion.h3>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Results from implementing the IMPACT Framework across our client portfolio
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6"
            >
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                {outcome.metric}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-2">
                {outcome.label}
              </div>
              <div className="text-sm text-gray-600">
                {outcome.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <span>Experience the IMPACT Framework</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}