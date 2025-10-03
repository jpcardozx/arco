/**
 * ARCO Chrome DevTools MCP - Usage Examples
 * 
 * Practical examples of using Chrome DevTools MCP with ARCO
 */

// ============================================================================
// Example 1: Performance Analysis Pipeline
// ============================================================================

/**
 * Complete performance analysis workflow
 * 
 * Usage with AI Assistant:
 * "Run a complete performance analysis on ARCO homepage"
 */
export const performanceAnalysisPipeline = {
  name: "Complete Performance Analysis",
  description: "Comprehensive performance audit of ARCO pages",
  
  steps: [
    {
      tool: "arco_analyze_performance",
      params: {
        url: "http://localhost:3000",
        device: "desktop",
        captureScreenshots: true
      },
      expectedOutcome: "Performance metrics and Core Web Vitals"
    },
    {
      tool: "arco_analyze_performance",
      params: {
        url: "http://localhost:3000",
        device: "mobile",
        captureScreenshots: true
      },
      expectedOutcome: "Mobile performance comparison"
    },
    {
      tool: "arco_lighthouse_audit",
      params: {
        url: "http://localhost:3000",
        categories: ["performance", "accessibility", "seo"]
      },
      expectedOutcome: "Lighthouse scores and recommendations"
    },
    {
      tool: "arco_analyze_network",
      params: {
        url: "http://localhost:3000",
        includeThirdParty: true
      },
      expectedOutcome: "Network request optimization opportunities"
    },
    {
      tool: "arco_analyze_bundle",
      params: {
        url: "http://localhost:3000",
        threshold: 250
      },
      expectedOutcome: "Bundle size analysis and code splitting suggestions"
    }
  ],
  
  aiPrompt: `
Run a complete performance analysis on ARCO:

1. Analyze performance on both desktop and mobile
2. Run Lighthouse audit focusing on performance, accessibility, and SEO
3. Analyze all network requests and identify slow ones
4. Check bundle sizes and suggest optimizations
5. Provide a comprehensive report with:
   - Current performance scores
   - Core Web Vitals metrics
   - Top 3 optimization priorities
   - Expected improvement estimates
  `
};

// ============================================================================
// Example 2: Visual Regression Testing Suite
// ============================================================================

/**
 * Visual regression testing for all major components
 * 
 * Usage with AI Assistant:
 * "Run visual regression tests on ARCO components"
 */
export const visualRegressionSuite = {
  name: "Visual Regression Testing",
  description: "Detect unintended visual changes in components",
  
  components: [
    "PremiumHeroSection",
    "PremiumNavigation",
    "PremiumShowcase",
    "Footer",
    "ROICalculator"
  ],
  
  steps: [
    {
      tool: "arco_visual_regression",
      params: {
        component: "PremiumHeroSection",
        threshold: 0.01
      }
    },
    {
      tool: "arco_visual_regression",
      params: {
        component: "PremiumNavigation",
        threshold: 0.01
      }
    }
    // ... repeat for each component
  ],
  
  aiPrompt: `
Run visual regression tests on these ARCO components:
- PremiumHeroSection
- PremiumNavigation
- PremiumShowcase
- Footer
- ROICalculator

For each component:
1. Take screenshot of current state
2. Compare with baseline
3. Report any visual differences > 1%
4. Highlight potential regressions

Provide a summary table showing pass/fail status for each component.
  `
};

// ============================================================================
// Example 3: E2E User Flow Testing
// ============================================================================

/**
 * End-to-end testing of critical user flows
 * 
 * Usage with AI Assistant:
 * "Test the contact form submission flow"
 */
export const contactFormFlow = {
  name: "Contact Form Submission",
  description: "Test complete contact form user journey",
  
  flow: {
    name: "contact-form-submission",
    steps: [
      {
        action: "navigate",
        selector: "",
        value: "http://localhost:3000"
      },
      {
        action: "wait",
        selector: "",
        value: "2000"
      },
      {
        action: "scroll",
        selector: "#contact-form",
        value: ""
      },
      {
        action: "fill",
        selector: "input[name='name']",
        value: "Test User"
      },
      {
        action: "fill",
        selector: "input[name='email']",
        value: "test@example.com"
      },
      {
        action: "fill",
        selector: "textarea[name='message']",
        value: "This is a test message"
      },
      {
        action: "click",
        selector: "button[type='submit']",
        value: ""
      },
      {
        action: "wait",
        selector: ".success-message",
        value: "5000"
      }
    ]
  },
  
  aiPrompt: `
Test the ARCO contact form submission flow:

1. Navigate to homepage
2. Scroll to contact form
3. Fill in all required fields:
   - Name: "Test User"
   - Email: "test@example.com"
   - Message: "Test automation message"
4. Submit the form
5. Wait for success message
6. Capture screenshot at each step
7. Verify no console errors occurred

Report:
- Flow completion status
- Time taken for each step
- Any errors encountered
- Screenshots of key steps
  `
};

// ============================================================================
// Example 4: Pre-Deployment Checklist
// ============================================================================

/**
 * Comprehensive pre-deployment verification
 * 
 * Usage with AI Assistant:
 * "Run pre-deployment checks on ARCO"
 */
export const preDeploymentChecklist = {
  name: "Pre-Deployment Verification",
  description: "Complete quality check before deploying to production",
  
  checks: [
    {
      category: "Performance",
      tools: [
        "arco_analyze_performance",
        "arco_lighthouse_audit",
        "arco_analyze_bundle"
      ],
      criteria: {
        lighthouseScore: ">= 90",
        lcp: "< 2.5s",
        fid: "< 100ms",
        cls: "< 0.1"
      }
    },
    {
      category: "Accessibility",
      tools: ["arco_accessibility_scan"],
      criteria: {
        wcagLevel: "AA",
        violations: "0 critical"
      }
    },
    {
      category: "Visual Regression",
      tools: ["arco_visual_regression"],
      criteria: {
        changes: "< 1%",
        approvedChanges: "documented"
      }
    },
    {
      category: "Functionality",
      tools: ["arco_test_user_flow"],
      criteria: {
        criticalFlows: "100% pass",
        consoleErrors: "0"
      }
    },
    {
      category: "Error Monitoring",
      tools: ["arco_monitor_console_errors"],
      criteria: {
        errors: "0",
        warnings: "< 5"
      }
    }
  ],
  
  aiPrompt: `
Run complete pre-deployment checks on ARCO:

## Performance Checks
- Lighthouse score >= 90 on performance
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Bundle sizes within budget

## Accessibility Checks
- WCAG AA compliance
- Zero critical violations
- All images have alt text
- Keyboard navigation works

## Visual Regression
- All components match baselines
- Document any intentional changes
- No unintended visual breaks

## Functionality Tests
- Contact form submission works
- Navigation flows complete successfully
- All CTAs are clickable
- No JavaScript errors

## Error Monitoring
- No console errors during 2-minute test
- Network requests all succeed
- No memory leaks

Provide a GO/NO-GO recommendation with justification.
  `
};

// ============================================================================
// Example 5: Performance Optimization Workflow
// ============================================================================

/**
 * Iterative performance optimization process
 * 
 * Usage with AI Assistant:
 * "Help me optimize ARCO performance"
 */
export const performanceOptimizationWorkflow = {
  name: "Performance Optimization",
  description: "Systematic approach to improving page performance",
  
  phases: [
    {
      phase: "1. Baseline Measurement",
      tools: ["arco_analyze_performance", "arco_lighthouse_audit"],
      goal: "Establish current performance metrics"
    },
    {
      phase: "2. Identify Bottlenecks",
      tools: ["arco_analyze_network", "arco_analyze_bundle"],
      goal: "Find optimization opportunities"
    },
    {
      phase: "3. Implement Optimizations",
      actions: [
        "Code splitting",
        "Image optimization",
        "Lazy loading",
        "Caching strategy",
        "Bundle size reduction"
      ]
    },
    {
      phase: "4. Verify Improvements",
      tools: ["arco_analyze_performance", "arco_lighthouse_audit"],
      goal: "Measure impact of optimizations"
    },
    {
      phase: "5. Iterate",
      goal: "Repeat until targets are met"
    }
  ],
  
  aiPrompt: `
Help me optimize ARCO performance systematically:

## Phase 1: Baseline
1. Run performance analysis on homepage
2. Run Lighthouse audit
3. Document current metrics

## Phase 2: Analysis
1. Analyze network requests - identify slow ones
2. Analyze bundle sizes - find large chunks
3. Check for unused code
4. List top 5 optimization opportunities

## Phase 3: Recommendations
For each opportunity, provide:
- Expected performance impact
- Implementation difficulty (Easy/Medium/Hard)
- Code examples or links to documentation
- Estimated time to implement

## Phase 4: Prioritization
Rank optimizations by:
- Impact (High/Medium/Low)
- Effort (Low/Medium/High)
- Recommend starting with High Impact / Low Effort items

Help me create an action plan.
  `
};

// ============================================================================
// Example 6: Accessibility Audit and Fix
// ============================================================================

/**
 * Comprehensive accessibility testing and remediation
 * 
 * Usage with AI Assistant:
 * "Audit ARCO for accessibility and suggest fixes"
 */
export const accessibilityAuditWorkflow = {
  name: "Accessibility Audit & Remediation",
  description: "WCAG compliance testing and fix implementation",
  
  steps: [
    {
      tool: "arco_accessibility_scan",
      params: {
        url: "http://localhost:3000",
        wcagLevel: "AA"
      }
    },
    {
      tool: "arco_test_user_flow",
      params: {
        flowName: "keyboard-navigation",
        steps: [
          { action: "navigate", selector: "", value: "http://localhost:3000" },
          { action: "wait", selector: "", value: "1000" }
          // Tab through all interactive elements
        ]
      }
    }
  ],
  
  aiPrompt: `
Perform comprehensive accessibility audit on ARCO:

## Automated Testing
1. Run accessibility scan for WCAG AA compliance
2. Identify all violations and categorize by severity
3. Test keyboard navigation flow

## Manual Checks
1. Color contrast ratios
2. ARIA labels and roles
3. Form labels and error messages
4. Heading hierarchy
5. Alt text for images

## Remediation Plan
For each violation:
1. Explain the issue and why it matters
2. Provide specific fix with code example
3. Reference WCAG criterion
4. Estimate fix complexity

## Priority Order
1. Critical (blocks screen readers)
2. High (major usability issues)
3. Medium (important but not blocking)
4. Low (nice-to-have improvements)

Help me create an accessibility fix roadmap.
  `
};

// ============================================================================
// Export all examples
// ============================================================================

export const examples = {
  performanceAnalysisPipeline,
  visualRegressionSuite,
  contactFormFlow,
  preDeploymentChecklist,
  performanceOptimizationWorkflow,
  accessibilityAuditWorkflow
};

export default examples;
