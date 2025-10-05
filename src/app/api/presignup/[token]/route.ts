import { NextRequest, NextResponse } from 'next/server';

/**
 * API ROUTE: /api/presignup/[token]
 * 
 * Retrieves pre-signup data by token for /signup page prefill
 * 
 * Phase 3: Backend Integration
 */

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await context.params;

    if (!token || token.length !== 64) {
      return NextResponse.json(
        { error: 'Invalid token format' },
        { status: 400 }
      );
    }

    // TODO Phase 3: Query database for presignup by token
    // const presignup = await db.query('SELECT * FROM presignups WHERE token = ?', [token]);

    // Mock response for now
    const presignup = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'demo@example.com',
      domain: 'example.com',
      name: 'Demo User',
      phone: '+55 11 99999-9999',
      leadScore: 85,
      domainStatus: 'available',
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      converted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Check if token exists
    if (!presignup) {
      return NextResponse.json(
        { error: 'Token not found or expired' },
        { status: 404 }
      );
    }

    // Check if expired
    if (new Date() > new Date(presignup.expiresAt)) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 410 }
      );
    }

    // Check if already converted
    if (presignup.converted) {
      return NextResponse.json(
        { error: 'Pre-signup already converted to full signup' },
        { status: 409 }
      );
    }

    // Return data (without sensitive fields)
    return NextResponse.json({
      success: true,
      data: {
        email: presignup.email,
        domain: presignup.domain,
        name: presignup.name,
        phone: presignup.phone,
        leadScore: presignup.leadScore,
        expiresAt: presignup.expiresAt,
      },
    });
  } catch (error) {
    console.error('[API] Get presignup error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: 'edge',
};
