'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useOrchestration } from './IntelligentHomepageOrchestrator'

/**
 * SOLUTION METHODOLOGY - Competitive Performance Intelligence
 * 
 * Explains ARCO's systematic approach to identifying and eliminating
 * competitive performance gaps
 */

interface ProcessStep {
  id: string
  title: string
  description: string
  deliverable: string
  duration: string
}

export function SolutionMethodology() {
  const { recordInteraction } = useOrchestration()
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [demoFile, setDemoFile] = useState<File | null>(null)
  const [isDemoAnalyzing, setIsDemoAnalyzing] = useState(false)
  const [demoResults, setDemoResults] = useState<any>(null)
  
  const processSteps: ProcessStep[] = [
    {
      id: 'audit',
      title: 'Competitive Performance Audit',
      description: 'Speed, UX flow, conversion optimization gaps. Side-by-side analysis vs your direct competitors.',
      deliverable: 'Comprehensive competitive benchmark report',
      duration: '2-3 days'
    },
    {
      id: 'modeling',
      title: 'Revenue Correlation Modeling',
      description: 'Gap identification → Traffic impact → Conversion differential → Monthly revenue loss. Math specific to your business.',
      deliverable: 'Personalized revenue impact model',
      duration: '1-2 days'
    },
    {
      id: 'implementation',
      title: 'Strategic Implementation',
      description: '7 days of prioritized optimization based on competitive intelligence. Performance improvement verified vs competitive baseline.',
      deliverable: 'Measurable performance improvements',
      duration: '7 days'
    }
  ]
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    setDemoFile(file)
    setIsDemoAnalyzing(true)
    
    recordInteraction({
      timestamp: new Date(),
      sectionId: 'solution',
      actionType: 'demo_upload',
      details: { filename: file.name, size: file.size }
    })
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock results
    setDemoResults({
      speedScore: 72,
      competitorAverage: 85,
      potentialImprovement: '18%',
      estimatedRevenueLift: '$12,400'
    })
    
    setIsDemoAnalyzing(false)
  }
  
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              The Logic is Inevitable
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-100 rounded-xl p-8 mb-8">
                <div className="space-y-4 text-lg text-slate-700">
                  <p>If performance gaps exist (and they always do)...</p>
                  <p>And if they impact conversion (and they always do)...</p>
                  <p>And if conversion affects revenue (obviously it does)...</p>
                </div>
              </div>
              
              <p className="text-2xl font-semibold text-slate-900">
                Then the only real question is: how to quantify and eliminate these gaps systematically?
              </p>
            </div>
          </motion.div>
          
          {/* Not Optimization - Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              This isn't "optimization." It's{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                competitive performance intelligence.
              </span>
            </h3>
          </motion.div>
          
          {/* Process Steps */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`bg-white rounded-xl shadow-lg border-2 p-8 cursor-pointer transition-all ${
                  activeStep === step.id 
                    ? 'border-emerald-500 shadow-emerald-100' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                </div>
                
                <p className="text-slate-600 mb-6 leading-relaxed">{step.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Deliverable:</span>
                    <span className="text-sm font-semibold text-slate-700">{step.deliverable}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Duration:</span>
                    <span className="text-sm font-semibold text-emerald-600">{step.duration}</span>
                  </div>
                </div>
                
                {activeStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-slate-200"
                  >
                    <div className="bg-slate-50 rounded-lg p-4">
                      <h5 className="font-semibold text-slate-900 mb-2">What You Get:</h5>
                      {step.id === 'audit' && (
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• Side-by-side performance comparison with top 5 competitors</li>
                          <li>• Speed analysis across 12 key metrics</li>
                          <li>• UX flow assessment and conversion barrier identification</li>
                          <li>• Mobile vs desktop performance gaps</li>
                        </ul>
                      )}
                      {step.id === 'modeling' && (
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• Custom revenue impact calculator for your business</li>
                          <li>• Statistical correlation between performance and conversion</li>
                          <li>• Monthly and annual revenue loss projections</li>
                          <li>• ROI forecast for recommended improvements</li>
                        </ul>
                      )}
                      {step.id === 'implementation' && (
                        <ul className="text-sm text-slate-600 space-y-1">
                          <li>• Priority-ranked optimization roadmap</li>
                          <li>• Technical implementation with code examples</li>
                          <li>• Before/after performance verification</li>
                          <li>• Ongoing competitive monitoring setup</li>
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Mini Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Experience Our Process</h3>
              <p className="text-slate-300 text-lg">
                Upload your homepage for a preview of our competitive analysis.
                Quick speed test vs anonymous competitor data. Preview of 5% of what our complete analysis reveals.
              </p>
            </div>
            
            {!demoFile && (
              <div className="max-w-md mx-auto">
                <label className="block">
                  <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500 transition-colors">
                    <div className="text-4xl mb-4">📤</div>
                    <p className="text-lg font-semibold mb-2">Upload Homepage Screenshot</p>
                    <p className="text-slate-400 text-sm">PNG, JPG up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            
            {isDemoAnalyzing && (
              <div className="text-center">
                <div className="inline-flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-lg">Analyzing vs competitor database...</span>
                </div>
              </div>
            )}
            
            {demoResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 rounded-xl p-6"
              >
                <h4 className="text-xl font-bold text-emerald-400 mb-4">Quick Analysis Results</h4>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-slate-400 text-sm">Your Speed Score</p>
                    <p className="text-2xl font-bold text-orange-400">{demoResults.speedScore}/100</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Competitor Average</p>
                    <p className="text-2xl font-bold text-emerald-400">{demoResults.competitorAverage}/100</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Potential Improvement</p>
                    <p className="text-2xl font-bold text-blue-400">{demoResults.potentialImprovement}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Est. Revenue Lift</p>
                    <p className="text-2xl font-bold text-emerald-400">{demoResults.estimatedRevenueLift}/month</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Complete Analysis
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
          
        </div>
      </div>
    </div>
  )
}