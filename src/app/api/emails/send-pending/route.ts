/**
 * Send Pending Emails Batch Job
 *
 * This endpoint processes all pending emails in the queue and sends them via Resend.
 * Can be called by:
 * - Cron job scheduler (e.g., every 5 minutes)
 * - Manual trigger for testing
 *
 * Requires CRON_SECRET for security
 */

import { NextRequest } from 'next/server';
import { sendPendingEmails } from '@/lib/leads/email-automation';
import { internalErrorResponse, successResponse } from '@/lib/api/api-response';

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get('Authorization');
    const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

    if (!authHeader || authHeader !== expectedToken) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Get limit from query params (for testing)
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);

    console.log('[Email Sender] Starting batch send, limit:', limit);

    const result = await sendPendingEmails(
      process.env.RESEND_API_KEY!,
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      limit
    );

    console.log('[Email Sender] Batch complete:', result);

    return successResponse({
      sent: result.sent,
      failed: result.failed,
      message: `${result.sent} emails sent, ${result.failed} failed`
    });
  } catch (error) {
    console.error('[Email Sender] Error:', error);
    return internalErrorResponse(
      error instanceof Error ? error.message : 'Failed to send emails'
    );
  }
}

// Health check endpoint
export async function GET(request: NextRequest) {
  return successResponse({
    status: 'ok',
    message: 'Email sender service is running'
  });
}
