# 🚀 Guia de Implementação Rápida - Backend Integrações

**Data:** 6 de outubro de 2025  
**Objetivo:** Implementar funcionalidades backend pendentes em ordem de prioridade

---

## 📋 Checklist de Implementação

### ✅ FASE 1: Setup Base (30 min)

- [x] Criar tabela `presignups` ✅
- [ ] Aplicar migration
- [ ] Instalar dependências
- [ ] Configurar variáveis de ambiente

### ⏳ FASE 2: Email Service (1-2 horas)

- [ ] Configurar Resend
- [ ] Criar templates de email
- [ ] Implementar envio
- [ ] Testar fluxo completo

### ⏳ FASE 3: Presignup Flow (2-3 horas)

- [ ] Implementar save no Supabase
- [ ] Conectar com email service
- [ ] Lead scoring básico
- [ ] Validação de token

### ⏳ FASE 4: Lead Magnet (1 hora)

- [ ] Integrar email
- [ ] Upload PDF para Storage
- [ ] Tracking de conversão

---

## 🔧 FASE 1: Setup Base

### 1.1 Aplicar Migration

```bash
# Se usando Supabase CLI local
supabase db push

# Ou via dashboard
# 1. Ir para SQL Editor
# 2. Copiar conteúdo de 20251006000010_create_presignups_table.sql
# 3. Executar
```

### 1.2 Instalar Dependências

```bash
# Email service (escolha um)
pnpm add resend          # Recomendado - mais moderno
# OU
pnpm add @sendgrid/mail  # Alternativa

# React Email (para templates)
pnpm add @react-email/components
pnpm add -D @react-email/render
```

### 1.3 Variáveis de Ambiente

```env
# .env.local

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# OU SendGrid
# SENDGRID_API_KEY=SG.xxxxxxxxxxxxx

# From email
EMAIL_FROM="ARCO <noreply@arco.com.br>"

# Lead Scoring (opcional - Phase 2)
PYTHON_API_URL=https://scoring.arco.com

# WhatsApp (opcional - Phase 3)
WHATSAPP_API_TOKEN=xxxxx
WHATSAPP_PHONE_ID=xxxxx
```

---

## 📧 FASE 2: Email Service com Resend

### 2.1 Criar Cliente Resend

```typescript
// src/lib/email/client.ts
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY não configurada');
}

export const resend = new Resend(process.env.RESEND_API_KEY);
```

### 2.2 Criar Template de Confirmação

```typescript
// src/lib/email/templates/presignup-confirmation.tsx
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface PresignupConfirmationEmailProps {
  name: string;
  token: string;
  domain: string;
}

export const PresignupConfirmationEmail = ({
  name,
  token,
  domain,
}: PresignupConfirmationEmailProps) => {
  const signupUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/signup?token=${token}`;
  
  return (
    <Html>
      <Head />
      <Preview>Complete seu cadastro no ARCO - Análise de {domain}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Olá, {name}! 👋</Heading>
          
          <Text style={text}>
            Recebemos sua solicitação de análise para <strong>{domain}</strong>.
          </Text>
          
          <Text style={text}>
            Para continuar e receber seu diagnóstico completo, complete seu cadastro:
          </Text>
          
          <Section style={buttonContainer}>
            <Button style={button} href={signupUrl}>
              Completar Cadastro
            </Button>
          </Section>
          
          <Text style={text}>
            Este link é válido por 7 dias.
          </Text>
          
          <Text style={footer}>
            © 2025 ARCO Consulting. Todos os direitos reservados.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'left' as const,
  padding: '0 40px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#0ea5e9',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '12px 0',
  margin: '0 auto',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  marginTop: '48px',
};
```

### 2.3 Função de Envio

```typescript
// src/lib/email/send.ts
import { resend } from './client';
import { PresignupConfirmationEmail } from './templates/presignup-confirmation';
import { render } from '@react-email/render';

export async function sendPresignupConfirmation({
  email,
  name,
  token,
  domain,
}: {
  email: string;
  name: string;
  token: string;
  domain: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: [email],
      subject: `Complete seu cadastro - Análise de ${domain}`,
      react: PresignupConfirmationEmail({ name, token, domain }),
    });

    if (error) {
      console.error('[Email] Erro ao enviar:', error);
      throw error;
    }

    console.log('[Email] Enviado com sucesso:', data?.id);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('[Email] Falha no envio:', error);
    throw error;
  }
}
```

---

## 🔄 FASE 3: Implementar Presignup Flow

### 3.1 Atualizar `/api/presignup/route.ts`

```typescript
// src/app/api/presignup/route.ts
import { createClient } from '@supabase/supabase-js';
import { sendPresignupConfirmation } from '@/lib/email/send';

// Criar cliente Supabase (service role para bypass RLS)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    // ... validação existente ...
    
    const data = validation.data;
    
    // 1. Calcular lead score
    const leadScore = calculateLeadScore(data);
    const leadTier = getLeadTier(leadScore);
    
    // 2. Verificar se já existe
    const { data: existing } = await supabase
      .from('presignups')
      .select('id, email')
      .eq('email', data.email)
      .eq('converted', false)
      .single();
    
    if (existing) {
      return NextResponse.json(
        { error: 'Este email já possui um cadastro em andamento' },
        { status: 409 }
      );
    }
    
    // 3. Gerar token único
    const token = crypto.randomUUID();
    
    // 4. Salvar no Supabase
    const { data: presignup, error: dbError } = await supabase
      .from('presignups')
      .insert({
        email: data.email,
        name: data.name,
        phone: data.phone,
        domain: data.domain,
        lead_score: leadScore,
        lead_tier: leadTier,
        token,
        session_id: data.sessionId,
        request_id: data.requestId,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'url_analyzer',
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('[API] Erro ao salvar presignup:', dbError);
      throw dbError;
    }
    
    // 5. Atualizar domain_analysis_requests se houver
    if (data.requestId) {
      await supabase
        .from('domain_analysis_requests')
        .update({
          email: data.email,
          name: data.name,
          phone: data.phone,
          status: 'identified',
        })
        .eq('id', data.requestId);
    }
    
    // 6. Enviar email de confirmação
    try {
      await sendPresignupConfirmation({
        email: data.email,
        name: data.name,
        token,
        domain: data.domain,
      });
    } catch (emailError) {
      console.error('[API] Erro ao enviar email:', emailError);
      // Não falha o request se email falhar
    }
    
    // 7. Retornar sucesso
    return NextResponse.json({
      success: true,
      token,
      message: 'Verifique seu email para continuar',
      data: {
        email: data.email,
        name: data.name,
        leadScore,
        leadTier,
      },
    });
    
  } catch (error) {
    console.error('[API] Erro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Lead scoring simplificado
function calculateLeadScore(data: any): number {
  let score = 50; // Base score
  
  // Domain quality (mock - later integrate with API)
  const domainLength = data.domain.length;
  if (domainLength < 10) score += 10;
  if (domainLength < 15) score += 5;
  
  // Has phone
  if (data.phone) score += 10;
  
  // Name completeness
  const nameWords = data.name.split(' ').length;
  if (nameWords >= 2) score += 10;
  if (nameWords >= 3) score += 5;
  
  // Domain TLD
  if (data.domain.endsWith('.com.br')) score += 10;
  if (data.domain.endsWith('.com')) score += 5;
  
  return Math.min(100, Math.max(0, score));
}

function getLeadTier(score: number): 'hot' | 'warm' | 'cold' {
  if (score >= 80) return 'hot';
  if (score >= 60) return 'warm';
  return 'cold';
}
```

### 3.2 Atualizar `/api/presignup/[token]/route.ts`

```typescript
// src/app/api/presignup/[token]/route.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    
    // Query presignup by token
    const { data: presignup, error } = await supabase
      .from('presignups')
      .select('*')
      .eq('token', token)
      .eq('converted', false)
      .single();
    
    if (error || !presignup) {
      return NextResponse.json(
        { error: 'Token inválido ou expirado' },
        { status: 404 }
      );
    }
    
    // Check if expired
    if (new Date(presignup.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Token expirado' },
        { status: 410 }
      );
    }
    
    // Return presignup data (sem token)
    return NextResponse.json({
      success: true,
      data: {
        email: presignup.email,
        name: presignup.name,
        phone: presignup.phone,
        domain: presignup.domain,
        leadScore: presignup.lead_score,
      },
    });
    
  } catch (error) {
    console.error('[API] Erro:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
```

---

## 📥 FASE 4: Lead Magnet Implementation

```typescript
// src/app/api/lead-magnet/route.ts
import { sendLeadMagnetEmail } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    // ... validação existente ...
    
    const validatedData = validation.data;
    
    // 1. Save lead to database
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        full_name: validatedData.name,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        source: 'lead_magnet',
        status: 'new',
      })
      .select()
      .single();
    
    if (leadError) {
      console.error('[Lead Magnet] Erro ao salvar lead:', leadError);
    }
    
    // 2. Send email with download link
    await sendLeadMagnetEmail({
      email: validatedData.email,
      name: validatedData.name,
      company: validatedData.company,
    });
    
    // 3. Return success
    return successResponse(
      {
        name: validatedData.name,
        email: validatedData.email,
      },
      'Checklist enviado para seu email com sucesso!'
    );
    
  } catch (error) {
    return internalErrorResponse(error, 'Erro ao processar lead magnet');
  }
}
```

---

## ✅ Checklist Final de Validação

### Testar Presignup Flow
```bash
curl -X POST http://localhost:3000/api/presignup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "teste@example.com",
    "name": "Usuario Teste",
    "domain": "example.com",
    "phone": "+5511999999999"
  }'
```

### Verificar Email
- [ ] Email recebido
- [ ] Link funcional
- [ ] Token válido
- [ ] Dados corretos no /auth/signup

### Verificar Supabase
```sql
SELECT * FROM presignups ORDER BY created_at DESC LIMIT 10;
```

---

## 🎯 Timeline Estimado

| Fase | Tempo | Status |
|------|-------|--------|
| Setup Base | 30 min | ⏳ |
| Email Service | 1-2h | ⏳ |
| Presignup Flow | 2-3h | ⏳ |
| Lead Magnet | 1h | ⏳ |
| **TOTAL** | **4.5-6.5h** | ⏳ |

---

## 📞 Suporte

**Dúvidas sobre:**
- Resend: https://resend.com/docs
- React Email: https://react.email/docs
- Supabase: https://supabase.com/docs

---

**Status:** Pronto para começar! 🚀
