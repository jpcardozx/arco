'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  ChevronDown, 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  Clock, 
  Users,
  ArrowRight,
  BarChart3,
  RefreshCw,
  Building,
  ShoppingCart,
  Globe,
  Server,
  Database
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

/**
 * ROI CALCULATOR PREVIEW - Quantify Technical Impact on Revenue
 * 
 * Purpose:
 * - Demonstrate clear financial value of technical improvements
 * - Provide interactive tool that delivers immediate value
 * - Collect meaningful business data through engagement
 * - Create urgency by quantifying cost of inaction
 */

interface Industry {
  id: string
  name: string
  icon: React.ElementType
  conversionRateImpact: number
  averageOrderValue: number
  revenueMultiplier: number
  infroCostSavingsPercent: number
  digitalWasteFactor: number
  recoveryTimeHours: number
  exampleMetrics: {
    label: string
    value: string
  }[]
  customMetrics?: {
    label: string
    value: string
  }[]
}

interface Company {
  id: string
  name: string
  icon: React.ElementType
  sizeMultiplier: number
  complexityFactor: number
  implementationTimeWeeks: number
  budgetRange: string
  customAttributes?: {
    label: string
    value: string
  }[]
}

interface CalculatorFormState {
  selectedIndustry: string
  selectedCompanySize: string
  monthlyVisitors: number
  currentConversionRate: number
  averageOrderValue: number
  currentLoadTime: number
  infraCost: number
}

interface CalculationResult {
  // Current state
  currentMetrics: {
    annualRevenue: number
    conversionRate: number
    loadTime: number
    infraCost: number
    digitalWastePercentage?: number
  }
  // Projected improvement
  projectedMetrics: {
    conversionRate: number
    loadTime: number
    infraCost: number
    additionalRevenue: number
    infraSavings: number
    totalAnnualBenefit: number
    digitalWasteReduction: number
    recoveryTimeHours: number
  }
  // ROI metrics
  roi: {
    implementationCost: number
    implementationTimeWeeks: number
    annualROI: number
    paybackPeriodMonths: number
    threeYearReturn: number
    costOfInactionMonthly: number
    costOfInactionDaily: number
  }
  industrySpecificMetrics?: {
    label: string
    value: string
  }[]
}

export function ROICalculatorPreview() {
  const [calculatorState, setCalculatorState] = useState<CalculatorFormState>({
    selectedIndustry: 'ecommerce',
    selectedCompanySize: 'mid-market',
    monthlyVisitors: 50000,
    currentConversionRate: 2.4,
    averageOrderValue: 120,
    currentLoadTime: 4.2,
    infraCost: 4500
  })
  
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  
  // Industry data
  const industries: Industry[] = [
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: ShoppingCart,
      conversionRateImpact: 0.62, // 62% increase in conversion with optimal performance
      averageOrderValue: 120,
      revenueMultiplier: 1.05, // Additional effect on AOV
      infroCostSavingsPercent: 0.32,
      digitalWasteFactor: 0.28, // 28% of digital operations are inefficient/wasteful
      recoveryTimeHours: 48, // 48-hour inefficiency recovery cycle
      exampleMetrics: [
        { label: 'Avg. Cart Abandonment Rate', value: '68%' },
        { label: 'Typical Load Time Impact', value: '4.2s → 1.8s' },
        { label: 'Avg. Conversion Impact', value: '+62%' }
      ],
      customMetrics: [
        { label: 'Cart Abandonment Reduction', value: '38%' },
        { label: 'Mobile Conversion Improvement', value: '+74%' }
      ]
    },
    {
      id: 'saas',
      name: 'SaaS Platform',
      icon: Server,
      conversionRateImpact: 0.43, // 43% increase in trial signups
      averageOrderValue: 850, // Monthly recurring revenue per customer
      revenueMultiplier: 1.08, // Impact on customer lifetime value
      infroCostSavingsPercent: 0.47,
      digitalWasteFactor: 0.35, // 35% of digital operations are inefficient/wasteful
      recoveryTimeHours: 48, // 48-hour inefficiency recovery cycle
      exampleMetrics: [
        { label: 'Avg. Sign-up Abandonment', value: '57%' },
        { label: 'Typical Load Time Impact', value: '3.8s → 1.5s' },
        { label: 'Avg. Conversion Impact', value: '+43%' }
      ],
      customMetrics: [
        { label: 'User Retention Improvement', value: '+28%' },
        { label: 'Infrastructure Cost Reduction', value: '47%' }
      ]
    },
    {
      id: 'b2b',
      name: 'B2B Services',
      icon: Building,
      conversionRateImpact: 0.37, // 37% increase in lead submissions
      averageOrderValue: 12500, // Average deal size
      revenueMultiplier: 1.03,
      infroCostSavingsPercent: 0.25,
      digitalWasteFactor: 0.22, // 22% of digital operations are inefficient/wasteful
      recoveryTimeHours: 48, // 48-hour inefficiency recovery cycle
      exampleMetrics: [
        { label: 'Avg. Form Abandonment', value: '42%' },
        { label: 'Typical Load Time Impact', value: '5.3s → 2.1s' },
        { label: 'Avg. Conversion Impact', value: '+37%' }
      ],
      customMetrics: [
        { label: 'Lead Quality Improvement', value: '+32%' },
        { label: 'Sales Cycle Reduction', value: '19%' }
      ]
    },
    {
      id: 'media',
      name: 'Media & Content',
      icon: Globe,
      conversionRateImpact: 0.52, // 52% increase in engagement
      averageOrderValue: 25, // Revenue per user (ads, subscriptions)
      revenueMultiplier: 1.12,
      infroCostSavingsPercent: 0.38,
      digitalWasteFactor: 0.31, // 31% of digital operations are inefficient/wasteful
      recoveryTimeHours: 48, // 48-hour inefficiency recovery cycle
      exampleMetrics: [
        { label: 'Avg. Bounce Rate', value: '63%' },
        { label: 'Typical Load Time Impact', value: '4.7s → 1.9s' },
        { label: 'Avg. Engagement Impact', value: '+52%' }
      ],
      customMetrics: [
        { label: 'Ad Revenue Increase', value: '+46%' },
        { label: 'Pages Per Session Improvement', value: '+124%' }
      ]
    }
  ]
  
  // Company size data
  const companySizes: Company[] = [
    {
      id: 'small-business',
      name: 'Small Business',
      icon: Building,
      sizeMultiplier: 0.6,
      complexityFactor: 0.7,
      implementationTimeWeeks: 4,
      budgetRange: '$8,000 - $12,000'
    },
    {
      id: 'mid-market',
      name: 'Mid-Market',
      icon: Building,
      sizeMultiplier: 1.0,
      complexityFactor: 1.0,
      implementationTimeWeeks: 6,
      budgetRange: '$15,000 - $25,000'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Building,
      sizeMultiplier: 1.8,
      complexityFactor: 1.5,
      implementationTimeWeeks: 10,
      budgetRange: '$35,000 - $60,000+'
    }
  ]
  
  // Helper to get industry and company objects
  const getSelectedIndustry = () => industries.find(i => i.id === calculatorState.selectedIndustry) || industries[0]
  const getSelectedCompanySize = () => companySizes.find(c => c.id === calculatorState.selectedCompanySize) || companySizes[1]
  
  // Handle form input changes
  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const industry = industries.find(i => i.id === e.target.value)
    if (industry) {
      setCalculatorState({
        ...calculatorState,
        selectedIndustry: e.target.value,
        averageOrderValue: industry.averageOrderValue
      })
      
      // Track selection
      trackEvent({
        event: 'roi_calculator_input',
        category: 'engagement',
        action: 'industry_select',
        label: e.target.value
      })
    }
  }
  
  const handleCompanySizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCalculatorState({
      ...calculatorState,
      selectedCompanySize: e.target.value
    })
    
    // Track selection
    trackEvent({
      event: 'roi_calculator_input',
      category: 'engagement',
      action: 'company_size_select',
      label: e.target.value
    })
  }
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCalculatorState({
      ...calculatorState,
      [name]: parseFloat(value) || 0
    })
  }
  
  // Calculate ROI
  const calculateROI = () => {
    setIsCalculating(true)
    
    // Track calculation start
    trackEvent({
      event: 'roi_calculator',
      category: 'tool_usage',
      action: 'calculate_roi',
      label: calculatorState.selectedIndustry,
      custom_parameters: {
        company_size: calculatorState.selectedCompanySize,
        monthly_visitors: calculatorState.monthlyVisitors
      }
    })
    
    // Get selected industry and company size
    const industry = getSelectedIndustry()
    const companySize = getSelectedCompanySize()
    
    // Calculate current metrics
    const monthlyVisitors = calculatorState.monthlyVisitors
    const currentConversionRate = calculatorState.currentConversionRate / 100 // Convert from percentage
    const averageOrderValue = calculatorState.averageOrderValue
    const currentLoadTime = calculatorState.currentLoadTime
    const infraCost = calculatorState.infraCost
    const digitalWastePercentage = industry.digitalWasteFactor * 100 // Convert to percentage
    
    const currentMonthlyRevenue = monthlyVisitors * currentConversionRate * averageOrderValue
    const currentAnnualRevenue = currentMonthlyRevenue * 12
    
    // Calculate projected improvements
    const improvedConversionRate = currentConversionRate * (1 + industry.conversionRateImpact)
    const improvedAOV = averageOrderValue * industry.revenueMultiplier
    const improvedLoadTime = Math.max(1.5, currentLoadTime / 2.5) // Conservative estimate
    
    const projectedMonthlyRevenue = monthlyVisitors * improvedConversionRate * improvedAOV
    const projectedAnnualRevenue = projectedMonthlyRevenue * 12
    
    const additionalAnnualRevenue = projectedAnnualRevenue - currentAnnualRevenue
    
    // Calculate infrastructure savings
    const infraSavings = infraCost * industry.infroCostSavingsPercent * 12
    
    // Calculate total benefit
    const totalAnnualBenefit = additionalAnnualRevenue + infraSavings
    
    // Calculate implementation cost and ROI
    const baseImplementationCost = 18000 // Base cost
    const implementationCost = baseImplementationCost * companySize.complexityFactor * companySize.sizeMultiplier
    
    const annualROI = (totalAnnualBenefit / implementationCost) * 100
    const paybackPeriodMonths = (implementationCost / (totalAnnualBenefit / 12))
    const threeYearReturn = (totalAnnualBenefit * 3) - implementationCost
    const costOfInactionMonthly = totalAnnualBenefit / 12
    const costOfInactionDaily = costOfInactionMonthly / 30
    
    // Calculate digital waste reduction and recovery metrics
    const digitalWasteReduction = industry.digitalWasteFactor * 0.85 // 85% reduction in digital waste
    const recoveryTimeHours = industry.recoveryTimeHours // 48-hour recovery time
    
    // Build result object
    const result: CalculationResult = {
      currentMetrics: {
        annualRevenue: currentAnnualRevenue,
        conversionRate: currentConversionRate * 100, // Back to percentage
        loadTime: currentLoadTime,
        infraCost: infraCost,
        digitalWastePercentage: digitalWastePercentage
      },
      projectedMetrics: {
        conversionRate: improvedConversionRate * 100, // Back to percentage
        loadTime: improvedLoadTime,
        infraCost: infraCost * (1 - industry.infroCostSavingsPercent),
        additionalRevenue: additionalAnnualRevenue,
        infraSavings: infraSavings,
        totalAnnualBenefit: totalAnnualBenefit,
        digitalWasteReduction: digitalWasteReduction * 100, // Convert to percentage
        recoveryTimeHours: recoveryTimeHours
      },
      roi: {
        implementationCost: implementationCost,
        implementationTimeWeeks: companySize.implementationTimeWeeks,
        annualROI: annualROI,
        paybackPeriodMonths: paybackPeriodMonths,
        threeYearReturn: threeYearReturn,
        costOfInactionMonthly: costOfInactionMonthly,
        costOfInactionDaily: costOfInactionDaily
      },
      industrySpecificMetrics: industry.customMetrics
    }
    
    // Simulate API delay
    setTimeout(() => {
      setCalculationResult(result)
      setIsCalculating(false)
      
      // Track calculation complete
      trackEvent({
        event: 'roi_calculator',
        category: 'tool_usage',
        action: 'roi_calculated',
        label: calculatorState.selectedIndustry,
        custom_parameters: {
          annual_roi: Math.round(annualROI),
          payback_period: Math.round(paybackPeriodMonths),
          total_benefit: Math.round(totalAnnualBenefit)
        }
      })
    }, 1500)
  }
  
  // Reset calculator
  const resetCalculator = () => {
    setCalculationResult(null)
    
    // Track reset
    trackEvent({
      event: 'roi_calculator',
      category: 'tool_usage',
      action: 'reset_calculator'
    })
  }
  
  // Handle request for detailed report
  const handleRequestReport = () => {
    trackEvent({
      event: 'cta_click',
      category: 'conversion',
      action: 'request_detailed_roi',
      label: calculatorState.selectedIndustry,
      custom_parameters: {
        company_size: calculatorState.selectedCompanySize,
        calculated_roi: calculationResult ? Math.round(calculationResult.roi.annualROI) : 0
      }
    })
    
    // In a real implementation, this would open a lead form or redirect to contact page
    alert('In a real implementation, this would capture lead information and schedule a detailed ROI analysis')
  }

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-slate-50"
      data-section="roi-calculator"
    >
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            span className="text-slate-900"Revenue Leak/span
            span className="block bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
              Recovery Calculator
            /span
          /h2
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Calculate your specific USD monthly revenue bleeding and see how our
            72-hour recovery system translates to immediate revenue recovery and guaranteed improvement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Calculator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200"
          >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Calculator className="w-6 h-6 text-emerald-600" />
              Inefficiency Cost Calculator
            </h3>
            
            <div className="space-y-6">
              {/* Industry Selection */}
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-2">
                  Industry
                </label>
                <div className="relative">
                  <select
                    id="industry"
                    name="industry"
                    value={calculatorState.selectedIndustry}
                    onChange={handleIndustryChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  >
                    {industries.map(industry => (
                      <option key={industry.id} value={industry.id}>
                        {industry.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
                
                {/* Industry Metrics */}
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {getSelectedIndustry().exampleMetrics.map((metric, idx) => (
                    <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                      <div className="text-xs text-slate-500 mb-1">{metric.label}</div>
                      <div className="font-semibold text-slate-800">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Company Size */}
              <div>
                <label htmlFor="companySize" className="block text-sm font-medium text-slate-700 mb-2">
                  Company Size
                </label>
                <div className="relative">
                  <select
                    id="companySize"
                    name="companySize"
                    value={calculatorState.selectedCompanySize}
                    onChange={handleCompanySizeChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                  >
                    {companySizes.map(size => (
                      <option key={size.id} value={size.id}>
                        {size.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              </div>
              
              {/* Business Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="monthlyVisitors" className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Visitors
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="monthlyVisitors"
                      name="monthlyVisitors"
                      value={calculatorState.monthlyVisitors}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Users className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="currentConversionRate" className="block text-sm font-medium text-slate-700 mb-2">
                    Current Conversion Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="currentConversionRate"
                      name="currentConversionRate"
                      value={calculatorState.currentConversionRate}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <TrendingUp className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="averageOrderValue" className="block text-sm font-medium text-slate-700 mb-2">
                    Average Order Value ($)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="averageOrderValue"
                      name="averageOrderValue"
                      value={calculatorState.averageOrderValue}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <DollarSign className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="currentLoadTime" className="block text-sm font-medium text-slate-700 mb-2">
                    Current Load Time (seconds)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="currentLoadTime"
                      name="currentLoadTime"
                      value={calculatorState.currentLoadTime}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Clock className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="infraCost" className="block text-sm font-medium text-slate-700 mb-2">
                    Monthly Infrastructure Cost ($)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="infraCost"
                      name="infraCost"
                      value={calculatorState.infraCost}
                      onChange={handleInputChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Database className="w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Calculate Button */}
              <div className="pt-4">
                <button
                  onClick={calculateROI}
                  disabled={isCalculating}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isCalculating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                    <Calculator className="w-5 h-5" />
                      Calculate 48-Hour Recovery Value
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Results */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-xl border border-slate-200 sticky top-8"
          >
            {calculationResult ? (
              // Results Display
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-slate-900">ROI Analysis Results</h3>
                  <button
                    onClick={resetCalculator}
                    className="text-sm text-slate-500 hover:text-slate-700"
                  >
                    Reset
                  </button>
                </div>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-emerald-50 rounded-xl p-5 border border-emerald-100">
                    <div className="text-sm text-emerald-800 mb-1">Annual ROI</div>
                    <div className="text-3xl font-bold text-emerald-700">
                      {Math.round(calculationResult.roi.annualROI)}%
                    </div>
                    <div className="text-xs text-emerald-600 mt-1">
                      Return on investment in first year
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                    <div className="text-sm text-blue-800 mb-1">Payback Period</div>
                    <div className="text-3xl font-bold text-blue-700">
                      {calculationResult.roi.paybackPeriodMonths.toFixed(1)} months
                    </div>
                    <div className="text-xs text-blue-600 mt-1">
                      Time to recoup investment
                    </div>
                  </div>
                </div>
                
                {/* Financial Impact */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 text-white">
                  <h4 className="text-lg font-semibold mb-4">Financial Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Additional Annual Revenue</span>
                      <span className="font-bold">${numberWithCommas(Math.round(calculationResult.projectedMetrics.additionalRevenue))}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Annual Infrastructure Savings</span>
                      <span className="font-bold">${numberWithCommas(Math.round(calculationResult.projectedMetrics.infraSavings))}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                      <span>Total Annual Benefit</span>
                      <span className="font-bold text-emerald-400">${numberWithCommas(Math.round(calculationResult.projectedMetrics.totalAnnualBenefit))}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                      <span>3-Year Return</span>
                      <span className="font-bold text-emerald-400">${numberWithCommas(Math.round(calculationResult.roi.threeYearReturn))}</span>
                    </div>
                  </div>
                </div>
                
                {/* Performance Impact */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Performance Impact</h4>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Conversion Rate</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">{calculationResult.currentMetrics.conversionRate.toFixed(1)}%</span>
                          <ArrowRight className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-600">{calculationResult.projectedMetrics.conversionRate.toFixed(1)}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${calculationResult.currentMetrics.conversionRate}%` }}
                        />
                        <div 
                          className="h-full bg-emerald-700 rounded-full mt-1"
                          style={{ width: `${calculationResult.projectedMetrics.conversionRate}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Load Time</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">{calculationResult.currentMetrics.loadTime.toFixed(1)}s</span>
                          <ArrowRight className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-600">{calculationResult.projectedMetrics.loadTime.toFixed(1)}s</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${(calculationResult.currentMetrics.loadTime / 5) * 100}%` }}
                        />
                        <div 
                          className="h-full bg-emerald-500 rounded-full mt-1"
                          style={{ width: `${(calculationResult.projectedMetrics.loadTime / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Infrastructure Cost</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-500">${numberWithCommas(Math.round(calculationResult.currentMetrics.infraCost))}/mo</span>
                          <ArrowRight className="w-4 h-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-600">${numberWithCommas(Math.round(calculationResult.projectedMetrics.infraCost))}/mo</span>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${(calculationResult.currentMetrics.infraCost / 10000) * 100}%` }}
                        />
                        <div 
                          className="h-full bg-emerald-500 rounded-full mt-1"
                          style={{ width: `${(calculationResult.projectedMetrics.infraCost / 10000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Industry-specific Metrics */}
                {calculationResult.industrySpecificMetrics && (
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-semibold text-slate-900 mb-4">{getSelectedIndustry().name} Specific Benefits</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {calculationResult.industrySpecificMetrics.map((metric, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border border-blue-100">
                          <div className="text-sm text-blue-800 mb-1">{metric.label}</div>
                          <div className="font-semibold text-slate-900">{metric.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Digital Inefficiency Metrics */}
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <h4 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-blue-600" />
                    Digital Inefficiency Compression
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                      <div className="text-sm text-blue-800 mb-1">Current Digital Waste</div>
                      <div className="font-semibold text-red-600 text-xl">
                        {Math.round(calculationResult.currentMetrics.digitalWastePercentage || 0)}%
                      </div>
                      <div className="text-xs text-slate-500 mt-1">of operations are inefficient</div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-blue-100">
                      <div className="text-sm text-blue-800 mb-1">Waste Reduction</div>
                      <div className="font-semibold text-emerald-600 text-xl">
                        {Math.round(calculationResult.projectedMetrics.digitalWasteReduction)}%
                      </div>
                      <div className="text-xs text-slate-500 mt-1">efficiency improvement</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-white">
                    <div className="text-lg font-semibold mb-1">48-Hour Recovery Cycle</div>
                    <div className="text-sm opacity-90">
                      Complete digital inefficiency remediation within {calculationResult.projectedMetrics.recoveryTimeHours} hours of implementation
                    </div>
                  </div>
                </div>
                
                {/* Cost of Inaction */}
                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    Cost of Inaction
                  </h4>
                  <p className="text-slate-700 mb-4">
                    Every day you delay implementing these improvements costs your business:
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="text-xl font-bold text-red-600 mb-1">
                        ${numberWithCommas(Math.round(calculationResult.roi.costOfInactionDaily))}
                      </div>
                      <div className="text-sm text-slate-700">
                        Per day in lost revenue
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="text-xl font-bold text-red-600 mb-1">
                        ${numberWithCommas(Math.round(calculationResult.roi.costOfInactionMonthly))}
                      </div>
                      <div className="text-sm text-slate-700">
                        Per month wasted
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="pt-4">
                  <button
                    onClick={handleRequestReport}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-300"
                  >
                    <BarChart3 className="w-5 h-5" />
                    Get Detailed ROI Report
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-2">
                    Get a customized report with detailed breakdown and implementation plan
                  </p>
                </div>
              </div>
            ) : (
              // Empty State
              <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                    <RefreshCw className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">Digital Inefficiency Calculator</h3>
                <p className="text-slate-600 max-w-md mb-8">
                  Enter your business details to calculate the financial impact of digital inefficiencies
                  and the value of our 48-hour recovery system.
                </p>
                <div className="grid grid-cols-3 gap-6 w-full max-w-md">
                  {[
                    { label: "Revenue Impact", icon: DollarSign },
                    { label: "Conversion Lift", icon: TrendingUp },
                    { label: "Payback Period", icon: Clock }
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-2">
                        <item.icon className="w-6 h-6 text-slate-500" />
                      </div>
                      <span className="text-sm text-slate-600">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              quote: "The ROI calculator helped us quantify the financial impact of our technical debt. We secured executive buy-in for our optimization project within days.",
              author: "Sarah K.",
              role: "CTO, E-commerce Platform",
              color: "bg-blue-600"
            },
            {
              quote: "I was skeptical about the projected numbers, but six months later our actual results exceeded the calculator's predictions by 12%.",
              author: "Michael T.",
              role: "VP Engineering, SaaS Company",
              color: "bg-emerald-600"
            },
            {
              quote: "This calculator finally helped me translate technical improvements into language our CFO understands. Budget approved immediately.",
              author: "Jennifer R.",
              role: "Director of Technology, B2B Services",
              color: "bg-purple-600"
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="relative bg-white rounded-xl p-6 shadow-lg border border-slate-100"
            >
              <div className={`absolute top-0 left-0 w-full h-1 ${testimonial.color} rounded-t-xl`} />
              <p className="text-slate-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="ml-3">
                  <div className="font-semibold text-slate-900">{testimonial.author}</div>
                  <div className="text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Helper function to format numbers with commas
function numberWithCommas(x: number): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
