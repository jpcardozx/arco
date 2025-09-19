/**
 * ARCO CONTEXT TESTING UTILITY
 * Simple script to test context manager effectiveness
 */

import 'dotenv/config'
import { SimpleContextManager } from '../simple-context-manager'

interface TestScenario {
  name: string
  query: string
  expectedElements: string[]
  category: 'technical' | 'business' | 'mixed'
}

export class ContextTester {
  private contextManager: SimpleContextManager
  private testScenarios: TestScenario[]

  constructor() {
    this.contextManager = new SimpleContextManager()
    this.testScenarios = [
      {
        name: "Homepage Component Optimization",
        query: "Refactor homepage component to improve mobile conversion",
        expectedElements: ["Next.js 15", "mobile-first", "conversion", "performance"],
        category: "mixed"
      },
      {
        name: "Technical Architecture Decision",
        query: "Should we use Server Components or Client Components for pricing page?",
        expectedElements: ["Server Components", "TypeScript", "Next.js", "performance"],
        category: "technical"
      },
      {
        name: "Business Strategy Question",
        query: "How should we position against WordPress agencies?",
        expectedElements: ["WordPress", "positioning", "performance-first", "ROI"],
        category: "business"
      },
      {
        name: "Complex Integration Task",
        query: "Implement Stripe payment integration with conversion tracking",
        expectedElements: ["conversion", "tracking", "performance", "TypeScript"],
        category: "mixed"
      }
    ]
  }

  /**
   * Run all test scenarios and measure context quality
   */
  async runAllTests(): Promise<TestResults> {    console.log("🧪 Testing ARCO Context Manager...")
    console.log("=".repeat(50))
    
    const results: TestResult[] = []
    
    for (const scenario of this.testScenarios) {
      console.log(`\n📋 Testing: ${scenario.name}`)
      console.log(`Query: ${scenario.query}`)
      
      const startTime = Date.now()
      const context = this.contextManager.getContextFor(scenario.query)
      const responseTime = Date.now() - startTime
      
      const result = this.evaluateContext(scenario, context, responseTime)
      results.push(result)
      
      console.log(`✅ Relevance Score: ${result.relevanceScore}%`)
      console.log(`⚡ Response Time: ${result.responseTime}ms`)
      console.log(`📊 Elements Found: ${result.foundElements.length}/${result.expectedElements.length}`)
      
      if (result.relevanceScore < 70) {
        console.log(`⚠️  Low relevance score, context may need improvement`)
      }
    }
    
    return this.summarizeResults(results)
  }

  /**
   * Test a custom query interactively
   */
  testCustomQuery(query: string): TestResult {
    console.log(`\n🔍 Testing custom query: ${query}`)
    
    const startTime = Date.now()
    const context = this.contextManager.getContextFor(query)
    const responseTime = Date.now() - startTime
      console.log("\n📄 Generated Context:")
    console.log("-".repeat(40))
    console.log(context)
    console.log("-".repeat(40))
    console.log(`⚡ Response Time: ${responseTime}ms`)
    console.log(`📏 Context Length: ${context.length} characters`)
    
    return {
      scenario: { name: "Custom Query", query, expectedElements: [], category: "mixed" },
      context,
      responseTime,
      relevanceScore: 0, // Manual evaluation needed
      foundElements: [],
      expectedElements: [],
      suggestions: []
    }
  }

  private evaluateContext(scenario: TestScenario, context: string, responseTime: number): TestResult {
    const contextLower = context.toLowerCase()
    const foundElements = scenario.expectedElements.filter(element => 
      contextLower.includes(element.toLowerCase())
    )
    
    const relevanceScore = Math.round((foundElements.length / scenario.expectedElements.length) * 100)
    
    const suggestions: string[] = []
    
    // Generate improvement suggestions
    if (relevanceScore < 80) {
      const missingElements = scenario.expectedElements.filter(element => 
        !foundElements.includes(element)
      )
      suggestions.push(`Missing key elements: ${missingElements.join(', ')}`)
    }
    
    if (responseTime > 100) {
      suggestions.push("Response time could be optimized")
    }
    
    if (context.length > 2000) {
      suggestions.push("Context might be too verbose")
    }
    
    if (context.length < 200) {
      suggestions.push("Context might be too brief")
    }
    
    return {
      scenario,
      context,
      responseTime,
      relevanceScore,
      foundElements,
      expectedElements: scenario.expectedElements,
      suggestions
    }
  }

  private summarizeResults(results: TestResult[]): TestResults {
    const avgRelevance = results.reduce((sum, r) => sum + r.relevanceScore, 0) / results.length
    const avgResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length
    const totalSuggestions = results.flatMap(r => r.suggestions)
      console.log("\n" + "=".repeat(50))
    console.log("📊 CONTEXT MANAGER TEST RESULTS")
    console.log("=".repeat(50))
    console.log(`Average Relevance Score: ${avgRelevance.toFixed(1)}%`)
    console.log(`Average Response Time: ${avgResponseTime.toFixed(1)}ms`)
    console.log(`Total Test Scenarios: ${results.length}`)
    console.log(`Passed Tests (>70%): ${results.filter(r => r.relevanceScore >= 70).length}`)
      if (totalSuggestions.length > 0) {
      console.log("\n🔧 Improvement Suggestions:")
      const uniqueSuggestions = [...new Set(totalSuggestions)]
      uniqueSuggestions.forEach(suggestion => {
        console.log(`- ${suggestion}`)
      })
    }
    
    const systemEffective = avgRelevance >= 70 && avgResponseTime <= 100
    console.log(`\n${systemEffective ? '✅' : '❌'} Context System ${systemEffective ? 'EFFECTIVE' : 'NEEDS IMPROVEMENT'}`)
    
    return {
      averageRelevance: avgRelevance,
      averageResponseTime: avgResponseTime,
      testsCount: results.length,
      passedTests: results.filter(r => r.relevanceScore >= 70).length,
      suggestions: totalSuggestions.length > 0 ? [...new Set(totalSuggestions)] : [],
      effective: systemEffective,
      results
    }
  }
}

interface TestResult {
  scenario: TestScenario
  context: string
  responseTime: number
  relevanceScore: number
  foundElements: string[]
  expectedElements: string[]
  suggestions: string[]
}

interface TestResults {
  averageRelevance: number
  averageResponseTime: number
  testsCount: number
  passedTests: number
  suggestions: string[]
  effective: boolean
  results: TestResult[]
}

// CLI usage
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  const tester = new ContextTester()
  
  const command = process.argv[2]
  const query = process.argv.slice(3).join(' ')
  
  if (command === 'test') {
    tester.runAllTests()
  } else if (command === 'query' && query) {
    tester.testCustomQuery(query)
  } else {
    console.log("Usage:")
    console.log("npm run test-context test           # Run all test scenarios")
    console.log("npm run test-context query <query> # Test custom query")
  }
}

export default ContextTester
