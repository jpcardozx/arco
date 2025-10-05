# 🚀 REFATORAÇÃO /MYDOMAIN - PLANO DE EXECUÇÃO

**Data:** Outubro 2025  
**Status:** 📋 PLANEJAMENTO  
**Branch:** fix/navbar-hero-tier-s

---

## 🎯 PROBLEMAS IDENTIFICADOS

### 1. UI/UX Issues
- ❌ **Glassmorphism desatualizado** - Ainda usa bg-white/5 + backdrop-blur-xl (padrão antigo)
- ❌ **Copy não profissional** - "Registre Seu Domínio" é genérico, não vende valor
- ❌ **Falta contexto** - Não explica POR QUE o usuário deve preencher
- ❌ **Progress bar enganoso** - 67% não significa nada para o usuário
- ❌ **Trust indicators fracos** - Ícones genéricos sem impacto
- ❌ **Falta prova social** - Nenhuma validação de autoridade
- ❌ **CTA fraco** - "Continuar para Cadastro" não gera urgência
- ❌ **Background inconsistente** - Unsplash image não alinha com dark mode atual

### 2. Technical Issues
- ❌ **Sem validação real de domínio** - Mock com setTimeout não é profissional
- ❌ **Sem integração com backend** - LocalStorage não é solução escalável
- ❌ **Sem analytics tracking** - Não mede conversão
- ❌ **Sem error handling robusto** - Erro genérico "Email inválido"
- ❌ **Falta rate limiting** - Pode ser abusado
- ❌ **Sem scripts Python** - Validação de domínio, qualificação de lead

### 3. Inconsistência com Design System
- ❌ **Cores** - Usa teal-500, purple-500, orange-500 (padrão antigo de glassmorphism)
- ❌ **Deve usar** - slate-950 background, slate-800/900 cards, teal-500 apenas em CTAs
- ❌ **Typography** - Não segue escala do projeto
- ❌ **Spacing** - Não usa tokens do design system

---

## 📋 FASE 1: UI/UX & COPY REFACTOR (FRONTEND)

### Objetivo:
Alinhar /mydomain com o design system atual (dark mode clean) e melhorar copy para aumentar conversão.

### Mudanças de Design:

#### Background
```tsx
// ❌ ANTES (glassmorphism antigo)
<div className="fixed inset-0 -z-10">
  <div className="absolute inset-0 bg-cover opacity-[0.03]" 
       style={{ backgroundImage: url(...) }} />
  <div className="absolute inset-0 bg-gradient-to-b from-slate-950..." />
</div>

// ✅ DEPOIS (dark mode clean)
<section className="min-h-screen bg-slate-950 relative">
  <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/30" />
</section>
```

#### Card Principal
```tsx
// ❌ ANTES (glassmorphism excessivo)
<div className="bg-white/5 backdrop-blur-xl border border-white/10">

// ✅ DEPOIS (dark mode card)
<div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50">
```

#### Inputs
```tsx
// ❌ ANTES
<input className="bg-white/5 border border-white/10" />

// ✅ DEPOIS
<input className="bg-slate-800 border-2 border-slate-600 focus:border-teal-500" />
```

### Mudanças de Copy:

#### Header
```tsx
// ❌ ANTES (genérico)
<h1>Registre Seu Domínio</h1>
<p>Estamos preparando seu acesso personalizado...</p>

// ✅ DEPOIS (específico, orientado a valor)
<h1>Desbloqueie Seu Diagnóstico Personalizado</h1>
<p>
  Analisamos <strong>850+ empresas</strong> e identificamos padrões críticos 
  que aumentam conversões em <strong>até 340%</strong>. 
  Receba seu relatório em <strong>48 horas</strong>.
</p>
```

#### Progress Bar
```tsx
// ❌ ANTES (enganoso)
<span>Progresso do Cadastro</span>
<span>67%</span>

// ✅ DEPOIS (informativo)
<span>Etapa 1 de 2 • Análise Inicial</span>
<span>Faltam 2 minutos</span>
```

#### Form Labels
```tsx
// ❌ ANTES (técnico)
<label>Email Corporativo *</label>

// ✅ DEPOIS (orientado a benefício)
<label>
  Onde enviamos seu relatório? *
  <span className="text-xs text-slate-400">
    (+ 3 insights exclusivos sobre seu setor)
  </span>
</label>
```

#### CTA Button
```tsx
// ❌ ANTES (fraco)
<button>Continuar para Cadastro</button>

// ✅ DEPOIS (urgente, específico)
<button>
  Gerar Meu Relatório Grátis
  <span className="text-xs">Disponível por 48h apenas</span>
</button>
```

#### Trust Indicators
```tsx
// ❌ ANTES (ícones genéricos)
<div>
  <Shield /> Dados Protegidos
  <Lock /> SSL Seguro
  <Zap /> Setup Rápido
</div>

// ✅ DEPOIS (prova social + números)
<div>
  <CheckCircle2 /> 850+ empresas analisadas
  <TrendingUp /> +340% ROI médio
  <Clock /> Diagnóstico em 48h
  <Shield /> LGPD compliant
</div>
```

### Arquivos a Modificar:
- ✅ `src/app/mydomain/page.tsx` - Refactor completo

---

## 📋 FASE 2: BACKEND INTEGRATION & PYTHON SCRIPTS

### Objetivo:
Implementar validação real de domínio, integração com backend, analytics e scripts Python para qualificação de leads.

### 2.1 API Routes (Next.js)

#### `/api/domain/validate`
```typescript
// src/app/api/domain/validate/route.ts
export async function POST(req: Request) {
  const { domain } = await req.json();
  
  // 1. Validar formato
  // 2. Verificar DNS records
  // 3. Chamar script Python para análise
  // 4. Verificar se já está no banco
  // 5. Retornar status + sugestões
}
```

#### `/api/presignup`
```typescript
// src/app/api/presignup/route.ts
export async function POST(req: Request) {
  const data = await req.json();
  
  // 1. Validar dados
  // 2. Chamar Python para qualificação de lead
  // 3. Salvar no banco (Supabase/Postgres)
  // 4. Enviar email de confirmação
  // 5. Criar token de sessão
  // 6. Retornar token + next steps
}
```

#### `/api/presignup/[token]`
```typescript
// src/app/api/presignup/[token]/route.ts
export async function GET(req: Request, { params }) {
  // Retorna dados pré-preenchidos para /signup
}
```

### 2.2 Python Scripts

#### Script 1: Domain Validator
```python
# scripts/domain_validator.py
"""
Valida domínio e retorna análise técnica
- DNS records check
- SSL certificate validation
- Historical data (Archive.org)
- Lighthouse audit básico
- SEO meta tags check
"""
```

#### Script 2: Lead Qualifier
```python
# scripts/lead_qualifier.py
"""
Qualifica lead baseado em dados fornecidos
- Email validation (mx records, catch-all)
- Domain authority check
- Company size estimation
- Industry classification
- Lead score calculation (0-100)
"""
```

#### Script 3: Analytics Tracker
```python
# scripts/analytics_tracker.py
"""
Track eventos de conversão
- Presignup form start
- Domain validation
- Form submission
- Error tracking
- A/B test variants
"""
```

### 2.3 Database Schema

```sql
-- Table: presignups
CREATE TABLE presignups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  lead_score INTEGER,
  domain_status VARCHAR(50),
  token VARCHAR(255) UNIQUE,
  expires_at TIMESTAMP,
  converted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Table: domain_validations
CREATE TABLE domain_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain VARCHAR(255) NOT NULL,
  is_available BOOLEAN,
  dns_valid BOOLEAN,
  ssl_valid BOOLEAN,
  lighthouse_score INTEGER,
  cached_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_presignups_email ON presignups(email);
CREATE INDEX idx_presignups_token ON presignups(token);
CREATE INDEX idx_domain_validations_domain ON domain_validations(domain);
```

### Arquivos a Criar:
- ✅ `src/app/api/domain/validate/route.ts`
- ✅ `src/app/api/presignup/route.ts`
- ✅ `src/app/api/presignup/[token]/route.ts`
- ✅ `scripts/domain_validator.py`
- ✅ `scripts/lead_qualifier.py`
- ✅ `scripts/analytics_tracker.py`
- ✅ `scripts/requirements.txt`

---

## 🎨 FASE 1 - ESPECIFICAÇÕES DETALHADAS

### Color Palette (Dark Mode)
```css
Background: bg-slate-950
Cards: bg-slate-900/80 + backdrop-blur-sm
Borders: border-slate-700/50
Primary CTA: bg-gradient-to-r from-teal-600 to-teal-500
Text Primary: text-white
Text Secondary: text-slate-300
Text Tertiary: text-slate-400
Success: text-emerald-400
Warning: text-orange-400
Error: text-red-400
```

### Typography Scale
```css
H1: text-3xl sm:text-4xl font-bold
H2: text-xl sm:text-2xl font-bold
Body: text-base text-slate-300
Small: text-sm text-slate-400
Micro: text-xs text-slate-500
```

### Spacing System
```css
Section: py-16 md:py-24
Card: p-8 sm:p-10
Elements: space-y-6
Grids: gap-4
```

### Animation Tokens
```tsx
entrance: { opacity: 0, y: 20 } -> { opacity: 1, y: 0 }
duration: 0.6s
stagger: 0.1s delay
```

---

## 🐍 FASE 2 - PYTHON SCRIPTS SPECS

### requirements.txt
```txt
# Domain validation
dnspython==2.4.2
python-whois==0.8.0
requests==2.31.0
beautifulsoup4==4.12.2

# Email validation
validate-email==1.3
py3dns==3.2.1

# Web analysis
selenium==4.15.2
lighthouse==0.0.1

# Database
psycopg2-binary==2.9.9
sqlalchemy==2.0.23

# Analytics
mixpanel==4.10.0
posthog==3.1.0

# Utilities
python-dotenv==1.0.0
pydantic==2.5.0
```

### domain_validator.py Structure
```python
import dns.resolver
import whois
import requests
from typing import Dict, Optional

class DomainValidator:
    def __init__(self, domain: str):
        self.domain = domain
        
    def validate(self) -> Dict:
        return {
            "domain": self.domain,
            "is_valid": self.check_format(),
            "dns_records": self.check_dns(),
            "whois_data": self.get_whois(),
            "ssl_valid": self.check_ssl(),
            "is_available": self.check_availability(),
            "suggestions": self.generate_suggestions()
        }
    
    def check_format(self) -> bool:
        # Regex validation
        pass
    
    def check_dns(self) -> Dict:
        # DNS A, MX, TXT records
        pass
    
    def get_whois(self) -> Optional[Dict]:
        # WHOIS lookup
        pass
    
    def check_ssl(self) -> bool:
        # SSL certificate validation
        pass
    
    def check_availability(self) -> bool:
        # Check if domain is already in database
        pass
    
    def generate_suggestions(self) -> list:
        # Alternative domains if unavailable
        pass
```

### lead_qualifier.py Structure
```python
from typing import Dict
import re
from email_validator import validate_email

class LeadQualifier:
    def __init__(self, data: Dict):
        self.email = data.get('email')
        self.domain = data.get('domain')
        self.name = data.get('name')
        self.phone = data.get('phone')
        
    def qualify(self) -> Dict:
        return {
            "lead_score": self.calculate_score(),
            "email_quality": self.validate_email_quality(),
            "domain_authority": self.get_domain_authority(),
            "company_size": self.estimate_company_size(),
            "industry": self.classify_industry(),
            "qualification_level": self.get_qualification_level()
        }
    
    def calculate_score(self) -> int:
        score = 0
        
        # Email score (0-30)
        if self.validate_email_quality():
            score += 30
            
        # Domain authority (0-40)
        da = self.get_domain_authority()
        score += min(da, 40)
        
        # Phone provided (0-10)
        if self.phone:
            score += 10
            
        # Professional email (0-20)
        if not self.is_free_email():
            score += 20
            
        return min(score, 100)
    
    def validate_email_quality(self) -> bool:
        # MX records, catch-all detection
        pass
    
    def get_domain_authority(self) -> int:
        # Moz/Ahrefs API integration
        pass
    
    def estimate_company_size(self) -> str:
        # Based on domain + LinkedIn data
        pass
    
    def classify_industry(self) -> str:
        # ML classification based on domain content
        pass
    
    def is_free_email(self) -> bool:
        free_domains = ['gmail.com', 'yahoo.com', 'hotmail.com']
        domain = self.email.split('@')[1]
        return domain in free_domains
```

---

## 📊 MÉTRICAS DE SUCESSO

### Fase 1 (UI/UX)
- [ ] Contraste WCAG AAA (7:1+)
- [ ] Lighthouse Performance 90+
- [ ] Mobile responsive em 3 breakpoints
- [ ] Copy com foco em valor (não processo)
- [ ] Trust indicators com números reais

### Fase 2 (Backend)
- [ ] Domain validation < 2s response time
- [ ] Lead qualification < 1s
- [ ] 99.9% API uptime
- [ ] Error rate < 0.5%
- [ ] Database queries < 100ms

### Conversão (Overall)
- [ ] Form start rate: 40%+ (atual baseline)
- [ ] Form completion: 70%+ (target)
- [ ] Presignup → Signup: 80%+ (target)
- [ ] Lead quality score: 60+ average

---

## 🚀 ORDEM DE EXECUÇÃO

### Dia 1 - Fase 1 (4-6 horas)
1. ✅ Refatorar página /mydomain (design + copy)
2. ✅ Testar responsividade
3. ✅ Validar contraste e acessibilidade
4. ✅ Deploy e A/B test setup

### Dia 2-3 - Fase 2 (8-12 horas)
1. ✅ Setup Python environment
2. ✅ Criar domain_validator.py
3. ✅ Criar lead_qualifier.py
4. ✅ Criar API routes
5. ✅ Setup database schema
6. ✅ Integrar frontend com backend
7. ✅ Testar fluxo completo
8. ✅ Deploy production

---

## 📁 ESTRUTURA DE ARQUIVOS

```
arco/
├── src/
│   ├── app/
│   │   ├── mydomain/
│   │   │   └── page.tsx                 ✅ FASE 1
│   │   └── api/
│   │       ├── domain/
│   │       │   └── validate/
│   │       │       └── route.ts         ✅ FASE 2
│   │       └── presignup/
│   │           ├── route.ts             ✅ FASE 2
│   │           └── [token]/
│   │               └── route.ts         ✅ FASE 2
│   └── lib/
│       └── domain-validator.ts          ✅ FASE 2 (wrapper)
│
├── scripts/
│   ├── domain_validator.py              ✅ FASE 2
│   ├── lead_qualifier.py                ✅ FASE 2
│   ├── analytics_tracker.py             ✅ FASE 2
│   └── requirements.txt                 ✅ FASE 2
│
├── api/                                  (FastAPI backend)
│   ├── main.py                          ✅ FASE 2
│   ├── routes/
│   │   ├── domain.py                    ✅ FASE 2
│   │   └── presignup.py                 ✅ FASE 2
│   └── models/
│       ├── domain.py                    ✅ FASE 2
│       └── presignup.py                 ✅ FASE 2
│
└── docs/
    ├── MYDOMAIN_REFACTOR_PLAN.md        ✅ THIS FILE
    ├── MYDOMAIN_PHASE1_SPEC.md          🚀 NEXT
    └── MYDOMAIN_PHASE2_SPEC.md          🚀 NEXT
```

---

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

1. **Aprovar este plano** ✅
2. **Criar MYDOMAIN_PHASE1_SPEC.md** com código completo
3. **Implementar Fase 1** (refactor UI/UX + copy)
4. **Testar e validar Fase 1**
5. **Criar MYDOMAIN_PHASE2_SPEC.md** com specs técnicas completas
6. **Implementar Fase 2** (backend + Python)

---

**Criado por:** GitHub Copilot  
**Data:** Outubro 2025  
**Status:** 📋 AGUARDANDO APROVAÇÃO
