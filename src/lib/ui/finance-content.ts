export const financeContent = {
  en: {
    hero: {
      title: "Digital overhead silently erodes margin—ARCO isolates and removes it.",
      subtitle: "Evidence-based optimization that historically delivers 8-20% OPEX relief, with transparent methodology and verifiable results.",
      cta: "Book 15-min Discovery",
      ctaCounter: "Limited slots this week",
      trustBadge: "Data-driven, not hype-driven"
    },    whatWeDo: {
      title: "Fractional Ops & Performance Partner",
      subtitle: "Not a SaaS broker, not an agency",
      weDo: [
        "Digital asset performance optimization",
        "SaaS cost reduction through utilization analysis",
        "Technical debt remediation with ROI tracking",
        "Evidence-based performance optimization with clear metrics"
      ],
      weDont: [
        "Short-term 'quick fixes' without long-term value",
        "Vendor-biased SaaS recommendations",
        "Marketing services or redesigns",
        "Generic IT consulting without verifiable ROI"
      ]
    },    marketCost: {
      title: "The Cost of Digital Inefficiency",
      subtitle: "Based on 2025 Blissfully / Flexera Reports",
      stats: [
        {
          value: "12.3%",
          label: "Average SaaS waste in mid-market companies",
          source: "Flexera 2025"
        },
        {
          value: "33%",
          label: "Duplicate or overlapping digital tooling",
          source: "Blissfully Report"
        },
        {
          value: "8.2s",
          label: "Average enterprise mobile page load time",
          source: "WebPerf Observatory"
        },
        {
          value: "$12,304",
          label: "Annual overhead per 10 employees",
          source: "ARCO Benchmark Data (n=87)"
        }
      ],
      cta: "Download White Paper",
      whitePaperLabel: "2025 Digital Overhead Analysis (PDF, 2.3MB)"
    },    methodology: {
      title: "Repeatable, Evidence-Based Process",
      subtitle: "Weeks not months; tangible deliverables; Git-based change log",
      steps: [
        {
          title: "Diagnose",
          description: "Comprehensive digital asset audit and performance assessment with benchmarking against industry standards.",
          timeline: "Week 1-2",
          deliverable: "Performance Audit Report with validated metrics",
          artifacts: ["SaaS utilization matrix", "Performance benchmark data", "Cost opportunity chart"]
        },
        {
          title: "Remediate",
          description: "Surgical implementation of performance optimizations and cost-reduction measures with clear governance checkpoints.",
          timeline: "Week 3-5",
          deliverable: "Implementation Log + Before/After Metrics",
          artifacts: ["Git-based change log", "Daily performance metrics", "Invoice optimization records"]
        },
        {
          title: "Evidence Review",
          description: "Verification of improvements and ROI calculation with transparent documentation and audit trails.",
          timeline: "Week 6",
          deliverable: "ROI Analysis Document with fiscal validation",
          artifacts: ["Verified metrics dashboard", "Savings documentation", "Future optimization roadmap"]
        }
      ],
      governance: {
        title: "Governance Checkpoints",
        description: "Clear accountability and verification at each stage",
        checkpoints: [
          "Kick-off alignment meeting with defined success criteria",
          "Week 2 diagnosis review with stakeholder sign-off",
          "Week 4 implementation progress review",
          "Final evidence presentation with verification"
        ]
      },
      cta: "View Sample Changelog",
      ganttUrl: "/assets/methodology-gantt.svg",
      sampleChangelogUrl: "/sample-changelog.pdf"
    },proofStack: {
      title: "Verifiable Results",
      subtitle: "Anonymized case studies with independent verification",
      cases: [
        {
          id: "#038",
          industry: "Financial Services",
          metrics: [
            { label: "SaaS Spend Reduction", value: "19.7%", delta: "-$43,250/yr" },
            { label: "Mobile Performance", value: "32.4%", delta: "LCP 4.2s → 2.8s" },
            { label: "Conversion Impact", value: "+3.8%", delta: "+$198K revenue" }
          ],
          hash: "SHA-256: e7d81f05dbad641c86b",
          timeline: "6-week engagement",
          screenshotUrl: "/assets/case-038-dashboard.png"
        },
        {
          id: "#041",
          industry: "Healthcare Technology",
          metrics: [
            { label: "Technical Debt Reduction", value: "41%", delta: "102 → 60 issues" },
            { label: "API Response Time", value: "67%", delta: "340ms → 112ms" },
            { label: "Annual Cost Savings", value: "$78,500", delta: "12.3% reduction" }
          ],          hash: "SHA-256: 3fa7d91e5bce89a76f4",
          timeline: "8-week engagement",
          screenshotUrl: "/assets/case-041-dashboard.png"
        }
      ],
      cta: "Download CSV Dataset",
      disclaimer: "All metrics independently auditable via provided hash verification",
      verificationNote: "Hash codes allow any analyst to verify data integrity"
    },    compliance: {
      title: "Enterprise-Grade Security & Compliance",
      subtitle: "SOC 2 storage, ISO 27001 servers, CRC-licensed fiscal partners",
      points: [
        { label: "Data Security", value: "SOC 2 Type II compliant storage" },
        { label: "Infrastructure", value: "ISO 27001 certified servers" },
        { label: "Financial Partners", value: "CRC-licensed fiscal analysis" },
        { label: "Audit Trail", value: "Complete documentation and Git-based changelog" }
      ],
      certifications: ["SOC2", "ISO27001", "GDPR", "CRC"],
      dataHandlingPolicy: "All client data is stored in compliant systems with access controls and audit logs",
      auditCapabilities: "Complete digital paper trail for all changes and recommendations"
    },    engage: {
      title: "Two Clear Entry Points",
      subtitle: "Choose the option that fits your needs",
      options: [
        {
          title: "Pilot Sprint",
          price: "$997",
          description: "Fixed-price, focused assessment with clear deliverables and no long-term commitment.",
          includes: [
            "2-week diagnostic period",
            "Performance assessment report",
            "ROI projection with timeframes",
            "Implementation roadmap"
          ],
          cta: "Schedule Pilot",
          noteText: "Fixed price, no hidden costs"
        },
        {
          title: "Deep Assessment",
          price: "Custom Quote",
          description: "Comprehensive analysis with full implementation and verified ROI.",
          includes: [
            "Full 6-week engagement",
            "Complete implementation",
            "Verified metrics & ROI",
            "Optional success-based fee component"
          ],
          cta: "Request Quote",
          noteText: "Variable fee tied to realized savings"
        }
      ],
      comparisonNote: "Both options include detailed documentation and evidence-based recommendations"
    },    calculator: {
      title: "Calculate Your Potential Savings",
      subtitle: "Estimate what you could save with ARCO",
      formulaExplanation: "Annual savings = (SaaS optimization + performance gains) - engagement fee",
      downloadableMethodology: "Download our complete ROI calculation methodology",
      methodologyBriefUrl: "/roi-methodology-brief.pdf",
      fields: [
        { 
          label: "Annual SaaS spend ($)", 
          placeholder: "e.g., $120,000",
          tooltip: "Total annual expenditure on software subscriptions and services"
        },
        { 
          label: "Mobile traffic (%)", 
          placeholder: "e.g., 65",
          tooltip: "Percentage of your web traffic coming from mobile devices" 
        },
        { 
          label: "Current bounce rate (%)", 
          placeholder: "e.g., 38", 
          tooltip: "Percentage of visitors leaving without further interaction"
        }
      ],
      industryPresets: [
        {
          industry: "Financial Services",
          saasSpend: 180000,
          mobileTraffic: 42,
          bounceRate: 35
        },
        {
          industry: "Healthcare",
          saasSpend: 220000,
          mobileTraffic: 58,
          bounceRate: 41
        },
        {
          industry: "Professional Services",
          saasSpend: 150000,
          mobileTraffic: 38,
          bounceRate: 32
        }
      ],
      resultLabel: "Estimated Annual Savings Range:",
      disclaimer: "This is a projection based on historical client data with statistical ranges. Your actual results may vary based on implementation variables.",
      projectionNote: "Projection uses median values from our client dataset (n=87)",
      assumptionDetails: "View detailed calculation assumptions",
      assumptionsUrl: "/calculation-assumptions.pdf"
    },    finalCta: {
      title: "Get a Validated Savings Range",
      subtitle: "15-minute discovery call gives you a validated savings range",
      buttonText: "Book Discovery Call",
      timeslots: ["Wednesday, 10:30 AM", "Thursday, 2:15 PM", "Friday, 11:00 AM"],
      calendarApi: "Real-time availability from our calendar",
      consultationDetails: [
        {
          title: "What to Expect",
          steps: [
            "Brief discussion of your current digital operations",
            "Initial assessment of potential savings areas",
            "Explanation of methodology and verification process",
            "Clear next steps with no pressure tactics"
          ]
        },
        {
          title: "Who You'll Speak With",
          description: "All discovery calls are conducted by senior operations specialists with 10+ years of experience in digital efficiency optimization."
        },
        {
          title: "Preparation",
          description: "No special preparation needed. Come with questions about how our approach differs from typical consultancies."
        }
      ],
      privacyNote: "All discussions are covered by our standard NDA. We respect your confidentiality from first contact.",
      callToAction: {
        primary: "Reserve Your Spot Now",
        secondary: "Limited availability this week"
      }
    },    navigation: {
      mainItems: [
        { label: "What We Do", href: "#what-why" },
        { label: "Market Cost", href: "#market-cost" },
        { label: "Methodology", href: "#methodology" },
        { label: "Results", href: "#results" },
        { label: "Compliance", href: "#compliance" }
      ],
      ctaButton: {
        primary: "Book Discovery",
        secondary: "View Case Studies"
      },
      logoAlt: "ARCO | Operational Excellence"
    },
    trustPrinciples: {
      title: "Foundational Trust Principles",
      principles: [
        {
          title: "Transparent Assumptions",
          implementation: "Published ROI formula (annual savings – engagement fee) with downloadable methodology brief.",
          effect: "Positions ARCO as data-driven, not hype-driven."
        },
        {
          title: "Shared Risk, Not Gimmicks",
          implementation: "Optional success-based adjustment (variable fee tied to realised savings) instead of all-caps 'money-back guarantees'.",
          effect: "Conveys alignment of incentives; mature buyers know refunds are often theatre."
        },
        {
          title: "Empirical Proof > Slogans",
          implementation: "Mini-dashboards (Lighthouse, SaaS invoice excerpts) with salted SHA-256 hashes for independent verification.",
          effect: "Shows the numbers can be audited by any analyst."
        },
        {
          title: "Repeatable Process",
          implementation: "Visualised 3-step workflow (Diagnose → Remediate → Evidence Review) with clear artifacts and governance checkpoints.",
          effect: "Signals professionalism and predictability."
        }
      ]
    }
  }
};
