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
  console.log(`\n📝 ${entity.name}`);
  console.log(`   ${entity.type}`);
  console.log(`   ${entity.metadata.tags.join(', ')}`);
}

async function main() {
  const entities: MemoryEntity[] = [];

  // ARCO Strategic Agenda System
  entities.push({
    type: 'knowledge.product-feature',
    name: 'Strategic Agenda System',
    description: 'Sistema de agenda não é "só calendário". Hub central conectando deadlines de projetos, campanhas ads, client touchpoints, performance reviews, sprints. Context-aware UI, AI scheduling, proactive insights',
    content: `
## Vision
Agenda como hub central de gestão, não apenas organização de tempo

## Core Connections
- Deadlines de Projetos (sites, landing pages, features)
- Campanhas Ads (lançamentos, otimizações, relatórios)
- Client Touchpoints (reuniões, alinhamentos, aprovações)
- Performance Reviews (análise semanal/mensal)
- Team Sprints (planning, dailies, retros)
- Strategic Planning (OKRs, metas trimestrais, roadmap)

## Design Principles
1. Context-Aware Interface
   - Admin: visão 360° projetos + team capacity
   - PM/User: projetos atribuídos + client meetings
   - Client: touchpoints + milestones apenas

2. Information Density Balanced
   - High-level: dashboard com métricas visuais
   - Mid-level: timeline com cards informativos
   - Deep-dive: modais com detalhes completos

3. Micro-interactions
   - Drag & drop fluido com feedback visual
   - Hover states revelam quick actions
   - Framer Motion animations
   - Skeleton loading states

4. Smart Defaults
   - Auto-sugestão slots baseado em patterns
   - Templates eventos recorrentes
   - Participantes sugeridos por contexto
   - Links automáticos (Zoom, Google Meet)

5. Proactive Insights
   - Alertas de conflitos
   - Sugestões otimização de tempo
   - Análise produtividade
   - Deadlines em risco

## Architecture Layers
1. Strategic Layer - OKR tracking, milestones, client health, capacity planning
2. Intelligence Layer - AI scheduling, conflict detection, analytics
3. Integration Layer - CRM sync, Google Ads API, Analytics API, Email, Slack/Teams
4. Data Layer - Events, milestones, touchpoints, availability, schedules
5. Supabase - PostgreSQL + Realtime + Edge Functions + Storage
    `,
    source: 'docs/ARCO_STRATEGIC_AGENDA_SYSTEM.md',
    metadata: {
      version: '1.0',
      created: '2025-10-09',
      status: 'planned',
      tags: ['agenda', 'calendar', 'project-management', 'ai', 'crm-integration'],
      category: 'product-feature',
      relations: ['crm-system', 'project-management', 'analytics']
    }
  });

  // Payment System Canonical
  entities.push({
    type: 'knowledge.integration',
    name: 'Mercado Pago Payment System',
    description: 'Checkout transparente com Payment Brick (UI on-site) + Orders API v2. Front: Payment Brick customizável, 3DS nativo, PCI SAQ A. Back: Orders API captura manual/automática, webhooks assinados. Dados de cartão nunca passam pelo servidor',
    content: `
## Architecture Decisions
### Front-end: Payment Brick
- UI on-site (sem redirect)
- Customizável via CSS/theme
- 3DS nativo
- Suporta: Cartão, Pix, Boleto
- PCI SAQ A (campos em iframe)

### Back-end: Orders API v2
- Orquestração pedido antes pagamento
- Captura manual (authorize → capture separado)
- Captura automática (1 estágio)
- Webhooks assinados com secret signature

### Security
- Dados cartão nunca passam pelo servidor
- Tokenização no front via SDK
- Validação webhook com x-signature
- PCI compliance mantido (SAQ A)

## File Structure (App Router)
src/app/(dashboard)/payments/
- page.tsx - Dashboard KPIs
- new/page.tsx - Checkout com Payment Brick
- [id]/page.tsx - Recibo/detalhes
- subscriptions/ - Gerenciar planos
- settings/page.tsx - Credenciais, webhooks

src/lib/payments/mercadopago/
- client.ts - SDK server-side
- orders.ts - create/capture/cancel/refund Order
- webhooks.ts - Validação x-signature + roteamento
- bricks.ts - Helpers Payment/Status Brick
- subscriptions.ts - Preapproval API

src/lib/payments/unified/
- mapper.ts - Eventos → domínio app
- metrics.ts - Taxa sucesso, chargeback
- payment-service.ts - Interface unificada

## Environment Variables
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY - Front (Payment Brick)
MERCADOPAGO_ACCESS_TOKEN - Server (Orders API)
MERCADOPAGO_WEBHOOK_SECRET - Validação webhooks
MERCADOPAGO_ENV - test/production
NEXT_PUBLIC_APP_URL - Webhooks endpoint

## Production Checklist
1. Gerar credenciais production mode
2. Configurar webhook em mercadopago.com.br/developers/panel
3. Ativar Secret Signature
4. Testar 3DS com cartões de teste
5. Validar x-signature em webhooks
    `,
    source: 'docs/PAYMENT_SYSTEM_CANONICAL.md',
    metadata: {
      version: '1.0',
      created: '2025-10-06',
      status: 'implementation-ready',
      tags: ['payment', 'mercadopago', 'checkout', 'pci-compliance', 'webhooks'],
      category: 'integration',
      relations: ['backend-architecture', 'security', 'subscriptions']
    }
  });

  for (const entity of entities) {
    await indexEntity(entity);
  }

  console.log(`\n✅ Indexed ${entities.length} additional systems`);
  console.log(`\n📊 Categories:`);
  console.log(`   - Product Features: 1`);
  console.log(`   - Integrations: 1`);
}

main().catch(console.error);
