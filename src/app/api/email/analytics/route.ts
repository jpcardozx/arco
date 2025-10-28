/**
 * API Route - Email Analytics
 * Get email campaign performance metrics
 */

import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseAdmin()

    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const campaignId = searchParams.get('campaignId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    // Query email_queue directly for analytics
    let query = supabase
      .from('email_queue')
      .select('status, sent_at, opened_at, clicked_at')

    if (campaignId) {
      query = query.eq('campaign_id', campaignId)
    }

    if (startDate) {
      query = query.gte('created_at', startDate)
    }

    if (endDate) {
      query = query.lte('created_at', endDate)
    }

    const { data: emails, error } = await query

    if (error) {
      console.error('Analytics error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Calculate metrics
    const totalSent = emails?.filter(e => e.sent_at).length || 0
    const totalOpened = emails?.filter(e => e.opened_at).length || 0
    const totalClicked = emails?.filter(e => e.clicked_at).length || 0
    const totalBounced = emails?.filter(e => e.status === 'bounced').length || 0
    const totalFailed = emails?.filter(e => e.status === 'failed').length || 0

    const openRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0
    const clickRate = totalOpened > 0 ? (totalClicked / totalOpened) * 100 : 0
    const bounceRate = totalSent > 0 ? (totalBounced / totalSent) * 100 : 0

    return NextResponse.json({
      success: true,
      data: {
        totalSent,
        totalOpened,
        totalClicked,
        totalBounced,
        totalFailed,
        openRate: Number(openRate.toFixed(2)),
        clickRate: Number(clickRate.toFixed(2)),
        bounceRate: Number(bounceRate.toFixed(2))
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('API route error:', error)
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
