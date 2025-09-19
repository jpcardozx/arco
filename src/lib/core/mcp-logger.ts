/**
 * MCP Analytics & Logging System
 * 
 * Tracks MCP tool usage, performance, and business impact
 */

interface MCPLogEntry {
  timestamp: string;
  tool: string;
  args: any;
  result: 'success' | 'error' | 'fallback';
  executionTime: number;
  businessImpact?: number;
  error?: string;
  userId?: string;
}

interface MCPAnalytics {
  totalCalls: number;
  successRate: number;
  avgExecutionTime: number;
  businessImpactGenerated: number;
  topTools: Array<{ tool: string; calls: number }>;
  errorRate: number;
}

class MCPLogger {
  private logs: MCPLogEntry[] = [];
  private isProduction = process.env.NODE_ENV === 'production';

  async logToolExecution(
    tool: string,
    args: any,
    startTime: number,
    result: 'success' | 'error' | 'fallback',
    businessImpact?: number,
    error?: string,
    userId?: string
  ) {
    const entry: MCPLogEntry = {
      timestamp: new Date().toISOString(),
      tool,
      args: this.sanitizeArgs(args),
      result,
      executionTime: Date.now() - startTime,
      businessImpact,
      error,
      userId
    };

    this.logs.push(entry);

    // Console logging based on environment
    if (!this.isProduction) {
      this.logToConsole(entry);
    }

    // Send to analytics in production
    if (this.isProduction && process.env.ENABLE_ANALYTICS === 'true') {
      await this.sendToAnalytics(entry);
    }

    // Cleanup old logs (keep last 1000)
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
  }

  private logToConsole(entry: MCPLogEntry) {
    const status = entry.result === 'success' ? '✅' : 
                  entry.result === 'fallback' ? '⚠️' : '❌';
    
    console.log(`${status} MCP Tool: ${entry.tool} (${entry.executionTime}ms)`);
    
    if (entry.businessImpact) {
      console.log(`   💰 Business Impact: $${Math.round(entry.businessImpact)}`);
    }
    
    if (entry.error) {
      console.log(`   🔍 Error: ${entry.error}`);
    }
  }

  private async sendToAnalytics(entry: MCPLogEntry) {
    try {
      // Send to Google Analytics or your analytics platform
      await fetch('/api/analytics/mcp-usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'mcp_tool_execution',
          tool: entry.tool,
          result: entry.result,
          execution_time: entry.executionTime,
          business_impact: entry.businessImpact,
          timestamp: entry.timestamp
        })
      });
    } catch (error) {
      console.warn('Analytics logging failed:', error);
    }
  }

  private sanitizeArgs(args: any): any {
    // Remove sensitive information from logs
    if (!args) return args;
    
    const sanitized = { ...args };
    
    // Remove potential PII or sensitive data
    delete sanitized.apiKey;
    delete sanitized.secret;
    delete sanitized.password;
    delete sanitized.token;
    
    return sanitized;
  }

  getAnalytics(): MCPAnalytics {
    if (this.logs.length === 0) {
      return {
        totalCalls: 0,
        successRate: 0,
        avgExecutionTime: 0,
        businessImpactGenerated: 0,
        topTools: [],
        errorRate: 0
      };
    }

    const totalCalls = this.logs.length;
    const successfulCalls = this.logs.filter(l => l.result === 'success').length;
    const errorCalls = this.logs.filter(l => l.result === 'error').length;
    
    const avgExecutionTime = this.logs.reduce((sum, log) => sum + log.executionTime, 0) / totalCalls;
    
    const businessImpactGenerated = this.logs
      .filter(l => l.businessImpact)
      .reduce((sum, log) => sum + (log.businessImpact || 0), 0);

    // Tool usage frequency
    const toolUsage = this.logs.reduce((acc, log) => {
      acc[log.tool] = (acc[log.tool] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topTools = Object.entries(toolUsage)
      .map(([tool, calls]) => ({ tool, calls }))
      .sort((a, b) => b.calls - a.calls)
      .slice(0, 5);

    return {
      totalCalls,
      successRate: successfulCalls / totalCalls,
      avgExecutionTime: Math.round(avgExecutionTime),
      businessImpactGenerated: Math.round(businessImpactGenerated),
      topTools,
      errorRate: errorCalls / totalCalls
    };
  }

  exportLogs(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = 'timestamp,tool,result,executionTime,businessImpact,error';
      const rows = this.logs.map(log => 
        `${log.timestamp},${log.tool},${log.result},${log.executionTime},${log.businessImpact || ''},${log.error || ''}`
      );
      return [headers, ...rows].join('\n');
    }
    
    return JSON.stringify(this.logs, null, 2);
  }

  // Real-time monitoring for critical issues
  async monitorPerformance() {
    const recentLogs = this.logs.slice(-50); // Last 50 calls
    
    if (recentLogs.length < 10) return; // Need minimum data
    
    const recentErrorRate = recentLogs.filter(l => l.result === 'error').length / recentLogs.length;
    const avgRecentTime = recentLogs.reduce((sum, log) => sum + log.executionTime, 0) / recentLogs.length;
    
    // Alert on high error rate
    if (recentErrorRate > 0.3) {
      console.warn(`🚨 High error rate detected: ${(recentErrorRate * 100).toFixed(1)}%`);
      await this.sendAlert('high_error_rate', { errorRate: recentErrorRate });
    }
    
    // Alert on slow performance
    if (avgRecentTime > 10000) { // 10 seconds
      console.warn(`🐌 Slow performance detected: ${avgRecentTime}ms average`);
      await this.sendAlert('slow_performance', { avgTime: avgRecentTime });
    }
  }

  private async sendAlert(type: string, data: any) {
    if (this.isProduction) {
      try {
        await fetch('/api/alerts/mcp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, data, timestamp: new Date().toISOString() })
        });
      } catch (error) {
        console.error('Alert sending failed:', error);
      }
    }
  }
}

// Singleton instance
export const mcpLogger = new MCPLogger();

// Helper function for tool logging
export async function logMCPTool<T>(
  toolName: string,
  args: any,
  toolFunction: () => Promise<T>,
  userId?: string
): Promise<T> {
  const startTime = Date.now();
  
  try {
    const result = await toolFunction();
    
    // Extract business impact if available
    const businessImpact = extractBusinessImpact(result);
    
    await mcpLogger.logToolExecution(
      toolName,
      args,
      startTime,
      'success',
      businessImpact,
      undefined,
      userId
    );
    
    return result;
  } catch (error) {
    await mcpLogger.logToolExecution(
      toolName,
      args,
      startTime,
      'error',
      undefined,
      error instanceof Error ? error.message : 'Unknown error',
      userId
    );
    
    throw error;
  }
}

function extractBusinessImpact(result: any): number | undefined {
  if (typeof result === 'object' && result !== null) {
    // Look for business impact in common response patterns
    return result.businessImpact?.revenueImpact || 
           result.projectedImpact?.monthlyRevenue ||
           result.businessInsights?.monthlyRevenue ||
           undefined;
  }
  return undefined;
}

export default MCPLogger;