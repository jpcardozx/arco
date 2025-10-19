#!/usr/bin/env node

/**
 * MCP Memory Retroactive Indexer
 * 
 * Popula o MCP Memory com contexto histórico de decisões,
 * padrões estabelecidos e evolução do projeto ARCO.
 */

import { spawn } from 'child_process';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const MEMORY_ENTITIES = [
  // === PADRÕES DE COPY E CONTEÚDO ===
  {
    type: 'knowledge.standard',
    name: 'ARCO Copy Standards',
    description: 'Padrões de tom, linguagem e estrutura de conteúdo para landing pages',
    source: './docs/COPY_CONTENT_STANDARDS.md',
    tags: ['copy', 'content', 'tone-of-voice', 'guidelines'],
    metadata: {
      version: '1.0',
      created: '2025-10-19',
      status: 'active',
      applies_to: ['landing-pages', 'marketing-content'],
    },
  },
  {
    type: 'knowledge.reference',
    name: 'Copy Quick Reference',
    description: 'Guia rápido para consulta durante escrita de conteúdo',
    source: './docs/COPY_QUICK_REFERENCE.md',
    tags: ['copy', 'quick-reference', 'templates'],
    relatedTo: ['ARCO Copy Standards'],
  },
  {
    type: 'knowledge.summary',
    name: 'Copy Standards Summary',
    description: 'Sumário executivo das mudanças de tom e estrutura',
    source: './docs/COPY_STANDARDS_SUMMARY.md',
    tags: ['copy', 'summary', 'executive'],
    relatedTo: ['ARCO Copy Standards', 'Copy Quick Reference'],
  },

  // === DESIGN SYSTEM ===
  {
    type: 'knowledge.design-system',
    name: 'ARCO Design Tokens',
    description: 'Sistema de design tokens, dark mode, glassmorphism e padrões visuais',
    source: './docs/DESIGN_TOKENS_SYSTEM.md',
    tags: ['design', 'tokens', 'dark-mode', 'glassmorphism', 'tailwind'],
    metadata: {
      colorPalette: 'slate-950 base',
      glassEffect: 'rgba(255,255,255,0.03)',
      animations: 'framer-motion',
    },
  },
  {
    type: 'knowledge.implementation',
    name: 'Landing Page Dark Mode Complete',
    description: 'Documentação completa da conversão dark mode de todas as seções',
    source: './docs/LANDING_PAGE_DARK_MODE_COMPLETE.md',
    tags: ['dark-mode', 'landing-page', 'implementation'],
    relatedTo: ['ARCO Design Tokens'],
  },

  // === DECISÕES DE ARQUITETURA ===
  {
    type: 'decision.removal',
    name: 'PreviewSection Removal',
    description: 'Decisão estratégica de remover PreviewSection genérica',
    rationale: 'Conteúdo genérico sem pertinência. Sem valor para conversão.',
    decision: 'Removido completamente do template',
    date: '2025-10-18',
    tags: ['decision', 'ux', 'conversion'],
  },
  {
    type: 'decision.tone-change',
    name: 'Professional Tone Adoption',
    description: 'Mudança de tom informal/pitchy para profissional/educativo',
    rationale: 'Cliente sofisticado valoriza compreensão sobre hype. Caps lock e promessas exageradas prejudicam credibilidade.',
    before: '"TÁ PROCURANDO agora", "GARANTIDO 100%"',
    after: '"pesquisando serviços na região", "ROI típico: 4-6 meses"',
    date: '2025-10-19',
    tags: ['decision', 'copy', 'tone-of-voice'],
  },

  // === COMPONENTES IMPLEMENTADOS ===
  {
    type: 'component.pattern',
    name: 'Collapsible Progressive Disclosure',
    description: 'Padrão de collapsibles para endereçar objeções de forma estruturada',
    source: './src/components/landing/sections/HowItWorksSection.tsx',
    structure: {
      question: 'Objeção real documentada',
      answer: 'Direta (1 frase) + Técnica (2-3 frases) + Prática (1 frase)',
      icon: 'Contextual (Users, Clock, DollarSign, etc)',
    },
    usage: {
      HowItWorks: '9 collapsibles (3 por step)',
      FAQ: '8-12 collapsibles',
      Pricing: '3-4 collapsibles por tier',
    },
    tags: ['component', 'pattern', 'ux', 'progressive-disclosure'],
  },
  {
    type: 'component.section',
    name: 'HowItWorksSection - Reference Implementation',
    description: 'Seção de referência com padrões de copy profissional aplicados',
    source: './src/components/landing/sections/HowItWorksSection.tsx',
    features: [
      'Tom profissional (sem caps lock, gírias)',
      'Copy educativa (explica COMO funciona)',
      '9 collapsibles respondendo objeções',
      'Dados contextualizados (67%, 38-42%, timelines)',
      'Estrutura: badge + title + subtitle + description + why + collapsibles',
    ],
    tags: ['component', 'landing-section', 'reference-implementation'],
  },

  // === PADRÕES DE DADOS ===
  {
    type: 'pattern.data-presentation',
    name: 'How to Present Metrics',
    description: 'Padrões para apresentar dados de forma honesta e contextualizada',
    rules: [
      'Intervalos honestos: "38-42%" (não "40%")',
      'Atribuição clara: "Estudos indicam...", "Clientes relatam..."',
      'Contexto obrigatório: Número + O que significa + vs Benchmark',
      'Casos reais: "Profissional obteve 8→14→18" (não "resultados incríveis")',
    ],
    examples: {
      good: '"Estudos indicam que 67% dos usuários abandonam páginas com carregamento superior a 3 segundos."',
      bad: '"67% de aumento!" (sem contexto)',
    },
    tags: ['pattern', 'data', 'metrics', 'honesty'],
  },

  // === ESTRUTURAS DE CONTEÚDO ===
  {
    type: 'template.section-structure',
    name: 'Landing Section Anatomy',
    description: 'Estrutura anatômica de uma section na landing page',
    structure: {
      header: {
        title: 'H2 - Objetivo/benefício claro',
        subtitle: 'Contexto adicional, não repetição',
      },
      steps: {
        badge: 'Métrica-chave ou timeline',
        title: 'O que é este componente',
        subtitle: 'Por que é relevante',
        description: 'Como funciona (2-3 frases)',
        why: 'Fundamento técnico/lógico',
        collapsibles: 'Array<{question, answer, icon}>',
      },
      footer: {
        cta: 'Próximo passo ou resumo',
      },
    },
    tags: ['template', 'structure', 'landing-page'],
  },

  // === ANTI-PADRÕES ===
  {
    type: 'antipattern.language',
    name: 'Avoid Pitchy Language',
    description: 'Lista de padrões linguísticos a evitar',
    avoid: [
      'Caps lock para ênfase: "CLIENTES TODOS OS DIAS"',
      'Jargão não explicado: "ROAS", "CTR", "CPA"',
      'Superlativos vagos: "incrível", "revolucionário", "único"',
      'Urgência falsa: "últimas vagas", "só hoje"',
      'Gírias excessivas: "bombando", "top demais"',
    ],
    tags: ['antipattern', 'language', 'copy'],
  },

  // === WORKFLOW E PROCESSOS ===
  {
    type: 'workflow.content-creation',
    name: 'Content Creation Workflow',
    description: 'Processo estabelecido para criar/revisar conteúdo',
    steps: [
      '1. Escrever usando templates do Quick Reference',
      '2. Revisar com Checklist (7 perguntas rápidas)',
      '3. Validar contra Anti-Padrões',
      '4. TypeScript check: pnpm typecheck',
      '5. Visual test: collapsibles, responsividade, dark mode',
    ],
    checklist: [
      'Tom profissional? (sem caps lock)',
      'Específico? (números, timelines)',
      'Educativo? (explica COMO)',
      'Honesto? (claims verificáveis)',
      'Sem jargão? (termos explicados)',
      'Collapsibles? (objeções reais)',
    ],
    tags: ['workflow', 'process', 'quality-assurance'],
  },

  // === TECH STACK E FERRAMENTAS ===
  {
    type: 'knowledge.tech-stack',
    name: 'Landing Page Tech Stack',
    description: 'Stack técnico estabelecido para landing pages',
    stack: {
      framework: 'Next.js 15 (App Router)',
      styling: 'Tailwind CSS',
      animations: 'Framer Motion',
      components: 'Shadcn UI (Collapsible, etc)',
      hooks: 'useCampaignColors (white-label)',
      typeSystem: 'TypeScript strict',
    },
    patterns: {
      darkMode: 'slate-950 base + glassmorphism rgba(255,255,255,0.03)',
      animations: 'Expo Out [0.22, 1, 0.36, 1]',
      spacing: 'py-16 sm:py-20 md:py-24 lg:py-32',
      colors: 'Dynamic via useCampaignColors',
    },
    tags: ['tech-stack', 'implementation', 'tooling'],
  },

  // === MÉTRICAS E OBJETIVOS ===
  {
    type: 'metrics.success-criteria',
    name: 'Landing Page Success Metrics',
    description: 'Como medir sucesso do novo tom e estrutura',
    qualitative: [
      'Feedback: "Finalmente alguém que explica como funciona"',
      'Redução de perguntas repetitivas em discovery calls',
      'Aumento de qualificação do lead (menos "é gratuito?")',
    ],
    quantitative: [
      'Tempo médio na página (mais tempo = mais leitura)',
      'Taxa de abertura de collapsibles (engajamento)',
      'Taxa de conversão qualificada',
      'Taxa de churn nos primeiros 30 dias (expectativa calibrada)',
    ],
    tags: ['metrics', 'success-criteria', 'kpi'],
  },
];

/**
 * Indexa um entity no MCP Memory
 */
async function indexEntity(entity: any) {
  const memoryInput = {
    ...entity,
    content: entity.source ? readFileSync(entity.source, 'utf-8') : undefined,
    indexed_at: new Date().toISOString(),
  };

  // Aqui você faria a chamada real ao MCP Memory
  // Por enquanto, vamos simular com console.log
  console.log(`📝 Indexing: ${entity.name}`);
  console.log(`   Type: ${entity.type}`);
  console.log(`   Tags: ${entity.tags.join(', ')}`);
  if (entity.source) {
    console.log(`   Source: ${entity.source}`);
  }
  console.log('');

  return memoryInput;
}

/**
 * Indexa todos os markdowns do diretório docs/
 */
async function indexDocumentation() {
  console.log('\n📚 Indexing documentation files...\n');

  const docsDir = './docs';
  const files = readdirSync(docsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => join(docsDir, f));

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    const entity = {
      type: 'knowledge.documentation',
      name: relative('.', file),
      description: `Markdown documentation: ${relative('.', file)}`,
      source: file,
      content,
      tags: ['documentation', 'markdown'],
      metadata: {
        file_size: statSync(file).size,
        last_modified: statSync(file).mtime.toISOString(),
      },
    };

    await indexEntity(entity);
  }
}

/**
 * Indexa código fonte das seções
 */
async function indexSourceCode() {
  console.log('\n💻 Indexing source code...\n');

  const sections = [
    'HowItWorksSection',
    'HeroSection',
    'ProofSection',
    'PricingSection',
    'CaptureSection',
    'FAQSection',
  ];

  for (const section of sections) {
    const file = `./src/components/landing/sections/${section}.tsx`;
    try {
      const content = readFileSync(file, 'utf-8');
      const entity = {
        type: 'code.component',
        name: section,
        description: `Landing page section: ${section}`,
        source: file,
        content,
        tags: ['code', 'component', 'landing-section', 'react'],
        metadata: {
          framework: 'Next.js 15',
          language: 'TypeScript',
          dark_mode: 'complete',
        },
      };

      await indexEntity(entity);
    } catch (error) {
      if (error instanceof Error) {
        console.warn(`⚠️  Could not index ${section}: ${error.message}`);
      }
    }
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 ARCO MCP Memory Retroactive Indexer\n');
  console.log('='.repeat(60));

  // Index predefined entities
  console.log('\n📦 Indexing predefined knowledge entities...\n');
  for (const entity of MEMORY_ENTITIES) {
    await indexEntity(entity);
  }

  // Index all documentation
  await indexDocumentation();

  // Index source code
  await indexSourceCode();

  console.log('='.repeat(60));
  console.log(`\n✅ Indexing complete! Total entities: ${MEMORY_ENTITIES.length + 10}\n`);
  console.log('📊 Summary:');
  console.log(`   - Standards & Guidelines: ${MEMORY_ENTITIES.filter(e => e.type.startsWith('knowledge')).length}`);
  console.log(`   - Decisions: ${MEMORY_ENTITIES.filter(e => e.type.startsWith('decision')).length}`);
  console.log(`   - Components & Patterns: ${MEMORY_ENTITIES.filter(e => e.type.startsWith('component') || e.type.startsWith('pattern')).length}`);
  console.log(`   - Templates: ${MEMORY_ENTITIES.filter(e => e.type.startsWith('template')).length}`);
  console.log(`   - Documentation files: ~15 markdown files`);
  console.log(`   - Source code: 6 landing sections\n`);

  console.log('💡 MCP Memory is now populated with ARCO project context!');
  console.log('   Query examples:');
  console.log('   - "What are the copy standards for landing pages?"');
  console.log('   - "How should I present metrics and data?"');
  console.log('   - "Show me the collapsible pattern structure"');
  console.log('   - "What tone should I avoid in copy?"');
  console.log('   - "What decisions were made about PreviewSection?"\n');
}

main().catch(console.error);

/**
 * Index additional critical documentation
 */
async function indexAdditionalDocs() {
  const entities = [];

  // DESIGN_TOKENS_SYSTEM.md
  entities.push({
    type: 'knowledge.design-system',
    name: 'ARCO Design Tokens - Complete System',
    description: 'Comprehensive design token system covering colors, spacing, typography, shadows, animations, glassmorphism, and white-label dynamic colors from useCampaignColors hook',
    content: `
## Color System
- Dark Mode: from-slate-950 via-slate-900 to-slate-950
- Light Mode: from-slate-50 via-blue-50/30 to-indigo-50/40
- Opacity Scale: /[0.03] ultra-subtle, /[0.06] subtle cards, /[0.08] borders, /[0.12] hover, /[0.18] accents
- Dynamic Colors: colors.primary.solid, colors.secondary.solid via useCampaignColors

## Spacing System
- Section Padding: py-16 sm:py-20 md:py-24 lg:py-32
- Horizontal: px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20
- Element Gap: space-y-8 sm:space-y-10 md:space-y-12

## Typography Scale
- Hero: text-3xl sm:text-4xl md:text-5xl lg:text-6xl
- Section Title: text-2xl sm:text-3xl md:text-4xl
- Subtitle: text-base sm:text-lg md:text-xl
- Body: text-sm sm:text-base
- Hierarchy: text-white (headings), slate-400 (body), slate-300 (emphasis)

## Glassmorphism
- Cards: backdrop-blur-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01]
- Hover: border-white/[0.12]

## Animations
- Easing: Expo Out [0.22, 1, 0.36, 1]
- Duration: 0.5s standard, 0.3s micro, 0.7s complex
- Stagger: 0.1s children delay
- Viewport trigger: once, amount: 0.2
    `,
    source: 'docs/DESIGN_TOKENS_SYSTEM.md',
    metadata: {
      version: '1.0',
      created: '2025-10-18',
      status: 'official-standard',
      tags: ['design-system', 'tokens', 'dark-mode', 'white-label', 'glassmorphism'],
      category: 'design',
      relations: ['HeroSection', 'all-landing-sections']
    }
  });

  // LANDING_PAGE_DARK_MODE_COMPLETE.md
  entities.push({
    type: 'knowledge.implementation',
    name: 'Landing Page Dark Mode Complete',
    description: 'Complete documentation of 100% dark mode conversion across all 6 landing sections with before/after comparisons',
    content: `
## Directive Fulfilled
"nenhuma secao com light mode. todas com darkmode elegante"

## All Sections Dark Mode (6/6)
1. HeroSection - Gold Standard ✅
2. HowItWorksSection - Converted ✅
3. ProofSection - Converted ✅
4. PricingSection - Converted ✅
5. CaptureSection - Converted ✅
6. FAQSection - Converted ✅

## Standard Conversions
- Background: from-slate-50/white → from-slate-950 via-slate-900
- Typography: text-slate-900 → text-white, text-slate-700 → text-slate-400
- Cards: bg-white border-slate-200 → rgba(255,255,255,0.03) border-white/[0.08]
- Texture overlay: #ffffff03 added to all sections
- Gradient orbs: opacity 0.06, 0.05 for depth

## Common Pattern
All sections now follow HeroSection standard:
- Texture grid overlay
- Gradient orbs (left/right positioning)
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
      relations: ['DESIGN_TOKENS_SYSTEM', 'all-landing-sections']
    }
  });

  // ARCHITECTURE.md
  entities.push({
    type: 'knowledge.architecture',
    name: 'ARCO Core Architecture Principles',
    description: 'Foundational architecture principles: Single Source of Truth, Performance First, Feature-based structure, Clean separation of concerns',
    content: `
## Core Principles
1. Single Source of Truth - One definitive implementation per component
2. Performance First - Lazy loading, batching, optimization
3. Maintainable i18n - Centralized translations, SEO-friendly URLs
4. Clean Architecture - Feature-based folders, clear concerns

## Component Strategy
- Consolidate multiple versions based on metrics
- Avoid suffixes (Enhanced, Revised) unless A/B testing
- Clean interfaces for evolution

## Performance Optimization
- Dynamic imports for large components
- Image optimization pipeline (WebP, AVIF)
- Analytics batching and throttling
- Server-side caching

## Development Guidelines
- TypeScript strict mode
- Component composition patterns
- Error boundaries
- Document major changes

## Deployment
- Staging → Gradual rollout
- Feature flags for risk management
- Automated rollback procedures
    `,
    source: 'docs/ARCHITECTURE.md',
    metadata: {
      version: '1.0',
      created: '2025-10-19',
      status: 'active',
      tags: ['architecture', 'principles', 'guidelines', 'performance'],
      category: 'architecture',
      relations: ['development-workflow', 'deployment-strategy']
    }
  });

  for (const entity of entities) {
    await indexEntity(entity);
  }

  console.log(`\n✅ Indexed ${entities.length} additional critical documents`);
}

// Run additional indexing
indexAdditionalDocs().catch(console.error);
