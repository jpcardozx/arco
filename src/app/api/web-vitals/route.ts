import { NextRequest, NextResponse } from 'next/server'

/**
 * Web Vitals API Endpoint
 * 
 * Receives and processes real Web Vitals data from the frontend
 * Stores metrics for analysis and alerting
 */

interface WebVitalData {
  metric_name: string
  metric_value: number
  metric_rating: string
  page_url: string
  user_agent: string
  timestamp: number
  session_id: string
}

// In-memory storage for development (replace with database in production)
const metricsStore: WebVitalData[] = []

export async function POST(request: NextRequest) {
  try {
    const data: WebVitalData = await request.json()

    // Validate required fields
    if (!data.metric_name || typeof data.metric_value !== 'number') {
      return NextResponse.json(
        { error: 'Invalid metric data' },
        { status: 400 }
      )
    }

    // Add timestamp if not provided
    data.timestamp = data.timestamp || Date.now()

    // Store metric (in production, save to database)
    metricsStore.push(data)

    // Log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Web Vital Received: ${data.metric_name} = ${data.metric_value} (${data.metric_rating})`)
    }

    // Check for performance issues and alert
    if (data.metric_rating === 'poor') {
      console.warn(`🚨 Poor Performance Alert: ${data.metric_name} = ${data.metric_value} on ${data.page_url}`)
      
      // In production, send to monitoring service (Sentry, DataDog, etc.)
      // await sendAlert({
      //   type: 'performance',
      //   metric: data.metric_name,
      //   value: data.metric_value,
      //   url: data.page_url
      // })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing web vital:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metric = searchParams.get('metric')
    const timeframe = searchParams.get('timeframe') || '24h'
    
    // Calculate time threshold
    const now = Date.now()
    const timeThresholds = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    }
    
    const threshold = now - (timeThresholds[timeframe as keyof typeof timeThresholds] || timeThresholds['24h'])
    
    // Filter metrics
    let filteredMetrics = metricsStore.filter(m => m.timestamp >= threshold)
    
    if (metric) {
      filteredMetrics = filteredMetrics.filter(m => m.metric_name === metric)
    }

    // Calculate aggregated stats
    const stats = calculateMetricStats(filteredMetrics)

    return NextResponse.json({
      metrics: filteredMetrics,
      stats,
      timeframe,
      total: filteredMetrics.length
    })
  } catch (error) {
    console.error('Error fetching web vitals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function calculateMetricStats(metrics: WebVitalData[]) {
  if (metrics.length === 0) return {}

  const grouped = metrics.reduce((acc, metric) => {
    if (!acc[metric.metric_name]) {
      acc[metric.metric_name] = []
    }
    acc[metric.metric_name].push(metric.metric_value)
    return acc
  }, {} as Record<string, number[]>)

  const stats: Record<string, any> = {}

  Object.entries(grouped).forEach(([name, values]) => {
    const sorted = values.sort((a, b) => a - b)
    stats[name] = {
      count: values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      p50: sorted[Math.floor(sorted.length * 0.5)],
      p75: sorted[Math.floor(sorted.length * 0.75)],
      p90: sorted[Math.floor(sorted.length * 0.9)],
      p95: sorted[Math.floor(sorted.length * 0.95)]
    }
  })

  return stats
}
