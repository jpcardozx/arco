import { readFileSync } from 'fs';

interface MemoryEntity {
  type: string;
  name: string;
  description: string;
  content: string;
  source: string;
  metadata: {
    version: string;
    created: string;
    status: string;
    tags: string[];
    category: string;
    relations?: string[];
  };
}

async function indexEntity(entity: MemoryEntity) {
  console.log(`\n📝 Indexing: ${entity.name}`);
  console.log(`   Type: ${entity.type}`);
  console.log(`   Tags: ${entity.metadata.tags.join(', ')}`);
  console.log(`   Source: ${entity.source}`);
}

async function main() {
  const entities: MemoryEntity[] = [];

  // 1. DESIGN_TOKENS_SYSTEM
  entities.push({
    type: 'knowledge.design-system',
    name: 'Design Tokens Complete System',
    description: 'Sistema completo de design tokens: cores (dark/light mode), espaçamento responsivo, tipografia hierárquica, glassmorphism, animações com Expo Out easing, useCampaignColors white-label',
    content: `
## Color System
- Dark: from-slate-950 via-slate-900 to-slate-950
- Light: from-slate-50 via-blue-50/30 to-indigo-50/40
- Opacity: /[0.03] texture, /[0.06] cards, /[0.08] borders, /[0.12] hover
- Dynamic: colors.primary.solid, colors.secondary.solid (useCampaignColors)

## Spacing (Responsive)
- py: 16→20→24→32 (mobile→lg)
- px: 4→6→8→12→16→20 (mobile→2xl)
- gap: space-y-8→10→12

## Typography Hierarchy
- Hero: text-3xl→6xl responsive
- Title: text-2xl→4xl
- Body: text-white (heading), slate-400 (body), slate-300 (emphasis)

## Glassmorphism
- Card: backdrop-blur-xl border-white/[0.08] from-white/[0.03]
- Hover: border-white/[0.12]

## Animation
- Easing: Expo Out [0.22, 1, 0.36, 1]
- Duration: 0.5s std, 0.3s micro, 0.7s complex
- Stagger: 0.1s delay, viewport once 0.2
    `,
    source: 'docs/DESIGN_TOKENS_SYSTEM.md',
    metadata: {
      version: '1.0',
      created: '2025-10-18',
      status: 'official-standard',
      tags: ['design-tokens', 'dark-mode', 'glassmorphism', 'white-label', 'responsive'],
      category: 'design',
      relations: ['HeroSection', 'all-landing-sections']
    }
  });

  // 2. LANDING_PAGE_DARK_MODE_COMPLETE
  entities.push({
    type: 'knowledge.implementation',
    name: 'Landing Page 100% Dark Mode',
    description: 'Conversão completa de 6 seções para dark mode elegante. Diretiva: "nenhuma secao com light mode". HeroSection = gold standard. Padrões: texture overlay, gradient orbs, glassmorphism, typography hierarchy',
    content: `
## Directive
"nenhuma secao com light mode. todas com darkmode elegante" ✅

## Sections (6/6 Complete)
1. HeroSection - Gold Standard
2. HowItWorksSection - Converted
3. ProofSection - Converted
4. PricingSection - Converted
5. CaptureSection - Converted
6. FAQSection - Converted

## Standard Conversions
- BG: slate-50/white → slate-950 via-slate-900
- Text: slate-900 → white, slate-700 → slate-400
- Cards: bg-white border-slate-200 → rgba(255,255,255,0.03) border-white/[0.08]
- Texture: #ffffff03 overlay all sections
- Orbs: opacity 0.06, 0.05

## Common Pattern
- Texture grid overlay
- Gradient orbs (left/right)
- Glassmorphism cards
- Typography hierarchy
- useCampaignColors integration
    `,
    source: 'docs/LANDING_PAGE_DARK_MODE_COMPLETE.md',
    metadata: {
      version: '2.0',
      created: '2025-10-18',
      status: 'complete',
      tags: ['dark-mode', 'landing-page', 'conversion', 'implementation'],
      category: 'implementation',
      relations: ['DESIGN_TOKENS_SYSTEM', 'all-sections']
    }
  });

  // 3. BACKEND_ARCHITECTURE_COMPLETE_2025
  entities.push({
    type: 'knowledge.architecture',
    name: 'Backend Architecture Complete',
    description: 'Arquitetura híbrida serverless: Next.js 15 App Router + Supabase BaaS. 66 tabelas em 9 domínios. Princípios: Type Safety First, Database-Driven Schema, RLS Security, Soft Deletes, Audit Everything',
    content: `
## Stack Core
- Runtime: Node.js 24.9.0
- Framework: Next.js 15.3.1 App Router
- Language: TypeScript 5.x strict
- Database: PostgreSQL 15.x (Supabase)
- BaaS: Supabase 2.74.0 (Auth, Storage, Realtime)
- Package: pnpm 9.0.0

## Architecture Principles
1. Type Safety First - TypeScript strict mode
2. Database-Driven - Schema = source of truth
3. Serverless Native - Zero servers
4. RLS Security - Row Level Security all tables
5. Audit Everything - Complete logs
6. Soft Deletes - Never lose data
7. Real-time Ready - Supabase subscriptions

## Data Model
66 tables in 9 domains:
- Leads & CRM (leads, clients, interactions)
- Quiz System (results, responses)
- Projects & Tasks (projects, milestones)
- Finance (invoices, transactions, subscriptions)
- Content (campaigns, analytics, metrics)
- Communication (email, whatsapp, notifications)
- Storage (cloud_files, file_shares)
- Analytics (domain_analysis, security_scans, uptime)
- System (users, profiles, activity_logs, audit_log)

## Infrastructure
Vercel Edge → Next.js 15 → Supabase Cloud (São Paulo)
- PostgreSQL 15
- PostgREST API
- GoTrue Auth
- Realtime
- Storage
    `,
    source: 'docs/BACKEND_ARCHITECTURE_COMPLETE_2025.md',
    metadata: {
      version: '1.0',
      created: '2025-10-10',
      status: 'active',
      tags: ['backend', 'architecture', 'supabase', 'nextjs', 'serverless'],
      category: 'architecture',
      relations: ['tech-stack', 'database-schema']
    }
  });

  // 4. MVP_V1_BLUEPRINT_FINAL
  entities.push({
    type: 'knowledge.product',
    name: 'MVP V1 Blueprint Final',
    description: 'MVP definitivo: 3 camadas (Free/Paid/Admin), 2 tiers (Free/R$497), 24 funcionalidades core (score 8-10), 6 semanas. Filosofia: "Ship fast, learn faster". Mágico de Oz para métricas antes automação',
    content: `
## MVP Philosophy
"Ship fast, learn faster"
- 3 layers: Free User / Paid Client / Admin
- 2 tiers: Free / Paid R$497/mês
- Wizard of Oz: manual metrics input before automation
- 24 core features (score 8-10 only)
- 6 weeks development

## Relevance Score
10 = Critical (must-have)
9 = Essential (fundamental)
8 = Recommended (fast-follow)
7 = Nice-to-have (V1.1+)

## Layer 1: Free User (8 features)
1. Technical Analysis (10) - Entry point, URL+email audit
2. Diagnosis Report (10) - "Wow moment", ARCO Index
3. Performance Analysis (9) - Core Web Vitals
4. Security Analysis (8) - Headers + vulnerabilities
5. Optimization Summary (9) - Bridge to value prop
6. Plans Comparison (10) - Conversion page
7. Account Settings (8) - LGPD compliance
8. Scheduling CTA (8) - Cal.com integration

## Layer 2: Paid Client (8 features)
1. Strategic Dashboard (10) - ARCO Index history
2. Health Monitoring (10) - Uptime + Perf + Security
3. Growth Analysis (9) - Ads + Analytics = CPL + ROI
4. Project Management (9) - Full transparency
5. Support Center (10) - Ticket system
6. Billing Management (10) - Self-service portal
7. File Repository (8) - Digital vault
8. Agency Analysis (9) - Human consultancy publish

## Layer 3: Admin (8 features)
1. Admin Dashboard (10) - God-view all clients
2. Client Management (10) - CRUD operations
3. Project Admin (9) - Create/assign/track
4. Metrics Input (10) - Manual wizard (V1!)
5. Playbooks CMS (9) - Content management
6. Ticket Admin (10) - Support operations
7. Financial Admin (9) - Revenue tracking
8. User Admin (10) - Access control
    `,
    source: 'docs/MVP_V1_BLUEPRINT_FINAL.md',
    metadata: {
      version: '1.0',
      created: '2025-10-19',
      status: 'active',
      tags: ['mvp', 'product', 'blueprint', 'features', 'roadmap'],
      category: 'product',
      relations: ['backend-architecture', 'tech-stack']
    }
  });

  // 5. TECH_STACK_COMPLETE
  entities.push({
    type: 'knowledge.tech-stack',
    name: 'Tech Stack Complete',
    description: 'Stack tecnológica completa: Next.js 15 + TypeScript 5.3 + Tailwind CSS 3.4 + Supabase + Drizzle ORM + Shadcn/ui + TanStack Query + Recharts. Package.json definitivo com todas as dependências',
    content: `
## Core Stack
- Framework: Next.js 15.0.3
- Language: TypeScript 5.3.3
- Styling: Tailwind CSS 3.4.1
- Database: Supabase (PostgreSQL)
- ORM: Drizzle ORM 0.29.3
- Auth: Supabase Auth
- Deployment: Vercel
- Runtime: Node.js 20

## UI Components (Shadcn/ui + Radix)
@radix-ui/react-* (accordion, dialog, dropdown, select, tabs, toast, etc)
lucide-react icons

## Forms & Validation
react-hook-form 7.49.3
zod 3.22.4
@hookform/resolvers

## Data Fetching
@tanstack/react-query 5.17.19
@tanstack/react-table 8.11.7
swr 2.2.4

## Charts
recharts 2.10.4
tremor 3.14.1

## Payment
@stripe/stripe-js
stripe (backend SDK)

## Email
resend API
react-email templates

## File Upload
uploadthing
@uploadthing/react

## Analytics
@vercel/analytics
plausible-tracker

## Testing
vitest
@testing-library/react
playwright

## Code Quality
eslint 8.x
prettier 3.x
husky (git hooks)
lint-staged
    `,
    source: 'docs/TECH_STACK_COMPLETE.md',
    metadata: {
      version: '1.0',
      created: '2025-10-19',
      status: 'active',
      tags: ['tech-stack', 'dependencies', 'nextjs', 'typescript', 'supabase'],
      category: 'tech',
      relations: ['backend-architecture', 'mvp-blueprint']
    }
  });

  // 6. ARCHITECTURE.md (Core Principles)
  entities.push({
    type: 'knowledge.principles',
    name: 'Core Architecture Principles',
    description: 'Princípios fundamentais: Single Source of Truth (sem sufixos Enhanced/Revised), Performance First (lazy load, batching), Feature-based structure, Clean separation, TypeScript strict',
    content: `
## Core Principles
1. Single Source of Truth
   - One definitive implementation per component
   - Avoid Enhanced/Revised suffixes unless A/B testing
   - Clean interfaces for evolution

2. Performance First
   - Lazy loading for large components
   - Image optimization (WebP, AVIF)
   - Analytics batching and throttling
   - Server-side caching

3. Maintainable i18n
   - Centralized translations
   - Language detection + user preferences
   - SEO-friendly URLs

4. Clean Architecture
   - Feature-based folders
   - Clear separation of concerns
   - Shared UI in components/ui
   - Business logic in modules

## Component Strategy
- Consolidate based on metrics
- Clean interfaces
- Proper error boundaries

## Development Guidelines
- TypeScript strict mode
- Component composition
- Error boundaries
- Document major changes

## Deployment
- Staging → Gradual rollout
- Feature flags for risk management
- Automated rollback
    `,
    source: 'docs/ARCHITECTURE.md',
    metadata: {
      version: '1.0',
      created: '2025-10-19',
      status: 'active',
      tags: ['architecture', 'principles', 'guidelines', 'performance'],
      category: 'architecture'
    }
  });

  // Index all entities
  for (const entity of entities) {
    await indexEntity(entity);
  }

  console.log(`\n✅ Indexed ${entities.length} critical documentation files`);
  console.log(`\n📊 Categories:`);
  console.log(`   - Design System: 1`);
  console.log(`   - Implementation: 1`);
  console.log(`   - Architecture: 2`);
  console.log(`   - Product: 1`);
  console.log(`   - Tech Stack: 1`);
}

main().catch(console.error);
