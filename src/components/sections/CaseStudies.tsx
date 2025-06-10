'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, TrendingUp, Clock, DollarSign } from 'lucide-react'

export function CaseStudies() {
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

  const caseStudies = [
    {
      title: "E-commerce Platform Transformation",
      industry: "Real Estate Technology",
      challenge: "Growing real estate platform struggling with performance issues and tool sprawl. 15+ disconnected tools, 25% conversion loss due to speed.",
      solution: "Consolidated 15 tools into unified platform. Custom property search with 3x faster load times. Automated lead qualification workflows.",
      results: [
        { metric: "40%", label: "Conversion Increase" },
        { metric: "$2,800", label: "Monthly Savings" },
        { metric: "3x", label: "Page Speed Improvement" },
        { metric: "6 weeks", label: "Implementation Time" }
      ],
      testimonial: "ARCO didn't just optimize our platform—they transformed our entire business model. The self-funding approach meant we improved performance while reducing costs.",
      author: "Development Partner",
      role: "Technical Director",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "SaaS Performance Optimization",
      industry: "B2B Software",
      challenge: "Post-Series A startup experiencing scaling issues. High infrastructure costs, poor user experience, team productivity bottlenecks.",
      solution: "Infrastructure optimization, automated deployment pipelines, performance monitoring, team training programs.",
      results: [
        { metric: "60%", label: "Cost Reduction" },
        { metric: "2.5x", label: "Team Productivity" },
        { metric: "95%", label: "Uptime Improvement" },
        { metric: "8 weeks", label: "Full Implementation" }
      ],
      testimonial: "The ROI was immediate. Within 2 months, our infrastructure costs dropped 60% while performance improved dramatically.",
      author: "Growth Company",
      role: "CTO",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Digital Transformation",
      industry: "Professional Services",
      challenge: "Traditional consulting firm needing digital capabilities. Manual processes, fragmented client experience, competitive disadvantage.",
      solution: "Custom client portal, automated reporting, integrated communication tools, performance analytics dashboard.",
      results: [
        { metric: "300%", label: "Client Satisfaction" },
        { metric: "$4,200", label: "Monthly Efficiency Gains" },
        { metric: "70%", label: "Process Automation" },
        { metric: "4 weeks", label: "Go-Live Timeline" }
      ],
      testimonial: "ARCO made digital transformation accessible and profitable. We're now leading our market instead of following.",
      author: "Professional Services",
      role: "Managing Partner",
      gradient: "from-purple-500 to-violet-500"
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
              Success Stories
            </span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Real Results from
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Real Companies</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            See how we've helped companies convert operational waste into competitive advantage
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {caseStudies.map((study, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Content */}
                <div>
                  <div className="mb-6">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                      {study.industry}
                    </span>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
                      {study.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                      <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                      <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <blockquote className="text-lg text-gray-700 italic leading-relaxed mb-4">
                        "{study.testimonial}"
                      </blockquote>
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">{study.author}</div>
                        <div className="text-gray-600">{study.role}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-8">Results Achieved</h4>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {study.results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className={`bg-gradient-to-br ${study.gradient} rounded-2xl p-6 text-white text-center`}
                      >
                        <div className="text-3xl lg:text-4xl font-bold mb-2">
                          {result.metric}
                        </div>
                        <div className="text-sm opacity-90">
                          {result.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Self-funding project model</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Rapid implementation timeline</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-700">Guaranteed ROI outcomes</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Write Your Success Story?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join the companies that have transformed their operations into competitive advantages
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg flex items-center space-x-2 mx-auto shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span>Start Your Transformation</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}