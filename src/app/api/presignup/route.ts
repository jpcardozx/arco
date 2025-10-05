import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * API ROUTE: /api/presignup
 * 
 * Handles pre-signup form submission
 * - Validates data
 * - Calls Python script for lead qualification
 * - Saves to database (presignups table)
 * - Sends confirmation email
 * - Creates session token
 * - Returns token for /signup prefill
 * 
 * Phase 3: Backend Integration
 */

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
});

export async function POST(req: NextRequest) {
  try {
    // Parse body
    const body = await req.json();
    
    // Validate input
    const validation = preSignupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.issues },
        { status: 400 }
      );
    }

    const data = validation.data;

    // TODO Phase 3: Call Python script for lead qualification
    const leadScore = calculateMockLeadScore(data);

    // TODO Phase 3: Check if email/domain already exists in database
    const existingLead = false; // Mock

    if (existingLead) {
      return NextResponse.json(
        { error: 'Este email ou domínio já possui um cadastro em andamento' },
        { status: 409 }
      );
    }

    // Generate session token
    const token = generateToken();

    // TODO Phase 3: Save to database (presignups table)
    const presignup = {
      id: crypto.randomUUID(),
      ...data,
      leadScore,
      domainStatus: 'available',
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      converted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('[API] Pre-signup created:', presignup);

    // TODO Phase 3: Send confirmation email
    // await sendConfirmationEmail(data.email, data.name, token);

    // TODO Phase 3: Track analytics event
    // await trackEvent('presignup_completed', { ...data, leadScore });

    return NextResponse.json({
      success: true,
      data: {
        token,
        expiresAt: presignup.expiresAt,
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

// ========================================
// HELPER FUNCTIONS
// ========================================

function calculateMockLeadScore(data: z.infer<typeof preSignupSchema>): number {
  let score = 0;

  // Email quality (0-30)
  if (data.email.includes('@')) {
    const emailDomain = data.email.split('@')[1];
    const freeEmailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    
    if (!freeEmailDomains.includes(emailDomain)) {
      score += 30; // Corporate email
    } else {
      score += 10; // Free email
    }
  }

  // Domain format (0-20)
  if (data.domain && data.domain.length > 5) {
    score += 20;
  } else {
    score += 10;
  }

  // Name completeness (0-10)
  if (data.name.split(' ').length >= 2) {
    score += 10; // Full name
  } else {
    score += 5; // First name only
  }

  // Phone provided (0-10)
  if (data.phone && data.phone.length > 8) {
    score += 10;
  }

  // Domain authority mock (0-30)
  // TODO Phase 3: Call real domain authority API
  score += Math.floor(Math.random() * 30);

  return Math.min(score, 100);
}

function generateToken(): string {
  // Generate cryptographically secure random token
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const config = {
  runtime: 'edge',
};
