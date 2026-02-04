import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const preSignupSchema = z.object({
  email: z.string().email('Email inválido'),
  domain: z
    .string()
    .min(3, 'Domínio muito curto')
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/,
      'Formato de domínio inválido'
    ),
  name: z.string().min(2, 'Nome muito curto'),
  phone: z.string().optional(),
  requestId: z.string().uuid().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = preSignupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    const data = validation.data;
    const leadScore = calculateLeadScore(data);
    const token = generateToken();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    console.log('[API] Pre-signup created:', { ...data, leadScore, token });

    return NextResponse.json({
      success: true,
      data: {
        token,
        expiresAt,
        nextStep: `/signup?token=${token}`,
      },
      message: 'Pré-cadastro realizado com sucesso! Redirecionando...',
    });
  } catch (error) {
    console.error('[API] Pre-signup error:', error);

    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

function calculateLeadScore(data: z.infer<typeof preSignupSchema>): number {
  let score = 0;

  const emailDomain = data.email.split('@')[1];
  const freeEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
  score += freeEmailDomains.includes(emailDomain) ? 10 : 30;

  score += data.domain.length > 5 ? 20 : 10;

  score += data.name.includes(' ') ? 10 : 5;

  if (data.phone && data.phone.length > 8) {
    score += 10;
  }

  score += Math.floor(Math.random() * 30);

  return Math.min(score, 100);
}

function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const runtime = 'edge';
