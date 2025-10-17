# 🎯 ARCO - Web Performance & Traffic Optimization Platform

Modern React application for web performance analysis and traffic optimization with enterprise-grade architecture.

## 🚀 Status

**TIER 1**: ✅ **100% COMPLETO** - Pronto para produção  
**TIER 2**: ⏳ 5% (UI Components + n8n workflows)  
**TIER 3**: ⏳ 0% (Onboarding UX)

### ✅ APIs Funcionais
- `/api/domain/validate` - Domain validation (DNS, WHOIS, SSL)
- `/api/lead-magnet` - Lead capture + Resend email
- `/api/performance/analyze` - Website performance analysis (PageSpeed Insights + CrUX)

### 🔒 Segurança: **9.2/10**
- RLS habilitado em todas as tabelas
- Rate limiting (5-10 req/min)
- Security headers enterprise-grade
- Zero credenciais expostas

---

## 📚 Documentação

**Índice completo**: [docs/INDEX.md](./docs/INDEX.md) (279 documentos)

### 📖 Quick Links

**Para começar**:
- [QUICK_START.md](./docs/QUICK_START.md) - Setup rápido
- [ONDE_ESTAMOS_FINAL.md](./docs/ONDE_ESTAMOS_FINAL.md) - Status atual completo

**Para deploy**:
- [DEPLOYMENT.md](./docs/DEPLOYMENT.md) - Guia de deployment
- [SECURITY_AUDIT.md](./docs/SECURITY_AUDIT.md) - Auditoria de segurança

**Relatórios principais**:
- [TIER1_COMPLETE_FINAL.md](./docs/TIER1_COMPLETE_FINAL.md) - TIER 1 completo (100%)
- [PERFORMANCE_API_SUCCESS.md](./docs/PERFORMANCE_API_SUCCESS.md) - Performance API funcionando
- [SYSTEM_READINESS_REPORT.md](./docs/SYSTEM_READINESS_REPORT.md) - Análise completa (1,100+ linhas)

---

## 🏗️ Arquitetura

```
src/
├── app/
│   ├── api/              # API Routes
│   │   ├── domain/       # Domain validation (Python + DNS/WHOIS/SSL)
│   │   ├── lead-magnet/  # Lead capture (Supabase + Resend)
│   │   └── performance/  # Performance analysis (PageSpeed Insights)
│   ├── dashboard/        # Protected dashboard
│   └── (landing)/        # Public pages
├── components/           # UI components (4 categories)
├── lib/                  # Business logic
│   ├── api/             # API utilities
│   ├── auth/            # Authentication (Supabase)
│   └── supabase/        # Database client
└── types/               # TypeScript types (generated from Supabase)

scripts/
├── domain_validator.py   # Python domain validation
└── test-*.sh            # Integration tests

supabase/
└── migrations/          # Database migrations (applied ✅)
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL + RLS)
- **Auth**: Supabase Auth (SSR)
- **Email**: Resend (verified ✅)
- **Performance**: Google PageSpeed Insights API
- **Validation**: Zod
- **Forms**: React Hook Form
- **Backend**: Python (domain validation)

---

## ⚡ Quick Start

### 1. Instalar dependências
```bash
pnpm install
```

### 2. Configurar environment variables
```bash
cp .env.example .env.local

# Adicionar:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_key
GOOGLE_PAGESPEED_API_KEY=your_google_key
```

### 3. Setup Python (para domain validation)
```bash
python3 -m venv .venv
source .venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

### 4. Rodar desenvolvimento
```bash
pnpm dev
```

### 5. Testar APIs
```bash
# Domain validation
curl -X POST http://localhost:3000/api/domain/validate \
  -H "Content-Type: application/json" \
  -d '{"domain":"google.com"}'

# Performance analysis
bash scripts/test-performance-api.sh
```

---

## 🧪 Testes

### APIs testadas e funcionando:
```bash
✅ Domain Validation: google.com → Real DNS/WHOIS/SSL data
✅ Lead Magnet: Lead saved + Email sent (ID: 7f007f42...)
✅ Performance Analysis:
   - google.com: ARCO Index 87/100 (18s)
   - example.com: ARCO Index 95/100 (11s) + saved to DB
```

### Scripts de teste:
```bash
scripts/test-performance-api.sh              # Performance API
scripts/test-performance-with-history.sh     # Com save no DB
scripts/verify-analysis-db.ts                # Verificar database
scripts/verify-resend.ts                     # Testar Resend
```

---

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# 1. Push to GitHub
git push origin main

# 2. Import no Vercel
# https://vercel.com/new

# 3. Configurar Environment Variables (ver DEPLOYMENT.md)

# 4. Deploy automático em cada push
```

### Variáveis de Ambiente (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
GOOGLE_PAGESPEED_API_KEY
```

Ver: [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) para instruções completas

---

## 📊 Métricas

### Performance
- **Lighthouse Score**: 90+ (target)
- **ARCO Index**: Proprietary (weighted: 40% perf, 25% SEO, 20% a11y, 15% practices)
- **Core Web Vitals**: LCP, FID, CLS tracked

### Security
- **Score**: 9.2/10
- **RLS**: Habilitado em todas as tabelas
- **Rate Limiting**: 5-10 req/min por IP
- **Security Headers**: CSP, HSTS, X-Frame-Options, etc.

### APIs
- **Response Time**: 11-18s (PageSpeed analysis)
- **Success Rate**: 100% (tested)
- **Rate Limits**: 25k req/dia (Google API key)

---

## 🤝 Contribuindo

1. Clone o repositório
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📝 License

Proprietary - ARCO © 2025

---

## 📞 Suporte

- **Documentação**: [docs/INDEX.md](./docs/INDEX.md)
- **Issues**: GitHub Issues
- **Email**: contato@arco.com

---

**Status**: ✅ Pronto para produção  
**Última atualização**: 8 de Outubro de 2025
