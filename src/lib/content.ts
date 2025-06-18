// Professional I18n System - Clean & Direct
// English-first with high-converting copy

export type Locale = 'en'

export const content = {
  en: {
    // Hero Section - Professional & Converting
    hero: {
      badge: "Enterprise Performance Specialists",
      headline: "Turn Infrastructure Costs into Revenue Drivers",
      subheadline: "We identify hidden revenue leaks in mid-market companies and deliver measurable ROI in under 45 days. No consulting fluff—just documented results.",
      cta: {
        primary: "Get Free Revenue Audit",
        secondary: "View $12.8M+ Results"
      },
      guarantees: [
        "ROI verified by third-party audits",
        "Results in 45 days or money back", 
        "Zero long-term contracts required"
      ],
      metrics: {
        revenue: { value: "$490K", label: "Average Revenue Impact", desc: "Per transformation project" },
        roi: { value: "340%", label: "Average ROI", desc: "Documented in 12 months" },
        time: { value: "<45 days", label: "Time to First Results", desc: "Measurable impact guaranteed" },
        success: { value: "96%", label: "Success Rate", desc: "Projects exceeding targets" }
      }
    },    // Value Proposition - Clear frameworks
    value: {
      title: "Three Ways to Capture Hidden Revenue",
      subtitle: "Choose your engagement model based on risk tolerance and timeline requirements",
      frameworks: {
        insight: {
          title: "Revenue Audit",
          duration: "5 business days",
          price: "$4,900",
          description: "Complete performance audit revealing exactly where revenue is being lost and how to capture it",
          deliverable: "Executive report with prioritized $$ impact roadmap",
          features: [
            "Technical infrastructure deep-dive",
            "Revenue leak quantification", 
            "Growth bottleneck analysis",
            "ROI-ranked implementation plan"
          ]
        },
        pov: {
          title: "Proof of Value",
          duration: "30-45 days",
          price: "$24,900",
          description: "We implement the highest-impact fix and prove ROI before any larger engagement",
          deliverable: "Working solution with documented revenue impact",
          features: [
            "Single highest-ROI implementation",
            "Hands-on execution by our team",
            "Guaranteed results or full refund",
            "Knowledge transfer to your team"
          ]
        },
        scale: {
          title: "Scale Partnership",
          duration: "Quarterly",
          price: "From $39K/quarter",
          description: "Ongoing revenue optimization with performance-based bonuses tied to results",
          deliverable: "Continuous revenue growth and optimization",
          features: [
            "Quarterly revenue optimization",
            "Performance-based bonus structure",
            "Executive advisory access",
            "Priority implementation queue"
          ]
        }
      }
    },

    // Results - Credible case studies
    results: {
      title: "Documented Impact for Mid-Market Leaders",
      subtitle: "Real transformations of mid-market companies that captured hidden revenue through systematic improvements. All results audited by third parties.",
      metrics: [
        { label: "Average Revenue Impact", value: "$1.4M", desc: "Per mid-market project", highlight: "ROI documented in 90 days" },
        { label: "Success Rate", value: "96%", desc: "Projects exceeding ROI targets", highlight: "Zero negative outcomes" },
        { label: "Companies Transformed", value: "47", desc: "Mid-market enterprises", highlight: "94% continue engagement" },
        { label: "Time to Value", value: "<45 days", desc: "First measurable impact", highlight: "3x faster than traditional consulting" }
      ],
      cases: [
        {
          title: "SaaS Platform - TechFlow",
          industry: "B2B SaaS • 420 employees • $24M ARR",
          challenge: "Losing $1.2M annually due to inefficient cloud infrastructure and 34% customer churn from performance issues.",
          solution: "Complete infrastructure audit and optimization: Database query optimization, CDN implementation, and resource reallocation.",
          methodology: "Insight Sprint → Focused PoV → Scale Partnership",
          results: {
            "Revenue Recovery": "+$1.4M ARR",
            "Cost Reduction": "-38% infrastructure spend", 
            "Performance Gain": "4.2s → 1.1s load time",
            "Customer Retention": "+52% retention rate"
          },
          roi: "340%",
          testimonial: "ARCO identified $1.4M in hidden losses we didn't know existed. ROI was evident in 60 days.",
          timeframe: "90 days total"
        },
        {
          title: "FinTech - CoreSystem",
          industry: "Financial Services • 650 employees • $45M revenue",
          challenge: "Complex 9-step onboarding causing 42% abandonment and generating $90K monthly support overhead.",
          solution: "Complete user journey re-engineering: Simplified to 3 steps with intelligent automation and progressive data collection.",
          methodology: "Intensive PoV Sprint → Scale Partnership for optimization",
          results: {
            "Conversion Increase": "+89% onboarding completion",
            "Support Reduction": "-64% ticket volume",
            "Revenue Impact": "+$975K MRR from funnel",
            "Process Automation": "73% manual tasks automated"
          },
          roi: "285%",
          testimonial: "The onboarding transformation paid for itself in 2 months. Absolutely transformative results.",
          timeframe: "75 days total"
        }
      ]
    },

    // Business Metrics - Professional data
    metrics: {
      title: "Business Performance",
      subtitle: "Proven results in digital performance and revenue growth",
      indicators: [
        { label: "Revenue Growth Rate", value: "+127%", trend: "up" },
        { label: "Client Retention", value: "94%", trend: "up" },
        { label: "Average Project ROI", value: "340%", trend: "up" },
        { label: "Time to Value", value: "<30 days", trend: "up" }      ]
    }
  }
} as const

// Simple hook - no provider needed
export function useContent(locale: Locale = 'en') {
  return content[locale]
}

export default content
