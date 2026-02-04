import { NextRequest, NextResponse } from 'next/server';

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

    // TODO: substituir por query no banco (presignups WHERE token = ?)
    // Quando conectado, adicionar checks de expiração e conversão aqui.
    const presignup = {
      email: 'demo@example.com',
      domain: 'example.com',
      name: 'Demo User',
      phone: '+55 11 99999-9999',
      leadScore: 85,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    return NextResponse.json({
      success: true,
      data: presignup,
    });
  } catch (error) {
    console.error('[API] Get presignup error:', error);

    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
