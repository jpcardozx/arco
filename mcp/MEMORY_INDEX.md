# MCP Memory Index - ARCO Project

**Data**: 19 de outubro de 2025  
**Total Entities Indexed**: 35+

---

## 📊 Categories

### 1. Standards & Guidelines (6)
- **Copy Standards** - Educational tone, professional language, data presentation rules
- **Copy Quick Reference** - Templates for headlines, subtitles, collapsibles
- **Copy Standards Summary** - Before/after comparisons, roadmap
- **Design Tokens** - Color system, spacing, typography, glassmorphism, animations
- **Landing Page Dark Mode** - 100% dark mode conversion, 6 sections complete
- **Core Architecture Principles** - Single source of truth, performance first, clean architecture

### 2. Decisions (2)
- **PreviewSection Removal** - Strategic decision: "genérico sem pertinência"
- **Professional Tone Adoption** - Shift from pitchy to educational (2025-10-19)

### 3. Components & Patterns (3)
- **Collapsible Progressive Disclosure** - Question → Answer structure, usage counts per section
- **HowItWorksSection Reference** - Professional implementation, 9 collapsibles, 3 per step
- **Landing Section Anatomy** - TypeScript interfaces, structure templates

### 4. Implementation Details (3)
- **Landing Page Dark Mode Complete** - 6/6 sections converted, standard patterns
- **Backend Architecture** - 66 tables, 9 domains, Supabase + Next.js 15
- **Tech Stack Complete** - Full dependency list, package.json documented

### 5. Product & Features (2)
- **MVP V1 Blueprint** - 3 layers, 24 features, 6 weeks timeline
- **Strategic Agenda System** - Context-aware calendar, AI scheduling, proactive insights

### 6. Integrations (1)
- **Mercado Pago Payment** - Payment Brick + Orders API v2, PCI compliance

### 7. Documentation Files (~15)
All markdown files in `/docs/**/*.md` auto-indexed with metadata

### 8. Source Code (6)
- HeroSection.tsx
- HowItWorksSection.tsx
- ProofSection.tsx
- PricingSection.tsx
- CaptureSection.tsx
- FAQSection.tsx

---

## 🔍 Queryable Knowledge

### Design & UI
- "What are the design tokens?"
- "How to apply dark mode to sections?"
- "What is the glassmorphism pattern?"
- "Show me the typography hierarchy"
- "How to use useCampaignColors for white-label?"

### Copy & Content
- "What are the copy standards?"
- "How should I write collapsibles?"
- "What tone should I avoid?"
- "How to present metrics and data?"
- "Show me the professional tone guidelines"

### Architecture
- "What are the core architecture principles?"
- "How is the backend structured?"
- "What's in the tech stack?"
- "Show me the database schema"
- "How does Supabase RLS work?"

### Implementation
- "How was PreviewSection handled?"
- "Why did we change the tone?"
- "Show me the HowItWorksSection implementation"
- "What sections have dark mode?"
- "How are collapsibles structured?"

### Product & Features
- "What's in the MVP V1?"
- "How does the strategic agenda work?"
- "What payment system do we use?"
- "What are the product layers?"

---

## 🏷️ Tags Index

### Design
`design-tokens`, `dark-mode`, `glassmorphism`, `white-label`, `responsive`, `typography`, `animations`, `spacing`

### Content
`copy-standards`, `tone`, `professional`, `educational`, `collapsibles`, `data-presentation`, `metrics`

### Architecture
`backend`, `architecture`, `supabase`, `nextjs`, `serverless`, `typescript`, `database-schema`, `rls-security`

### Implementation
`landing-page`, `conversion`, `implementation`, `sections`, `components`, `patterns`

### Product
`mvp`, `blueprint`, `features`, `roadmap`, `agenda`, `calendar`, `payment`, `integrations`

### Decisions
`strategic-decision`, `tone-change`, `removal`, `rationale`

---

## 🔗 Relations Map

```
DESIGN_TOKENS_SYSTEM
  └─> all-landing-sections
  └─> HeroSection (gold standard)
  └─> useCampaignColors

LANDING_PAGE_DARK_MODE_COMPLETE
  └─> DESIGN_TOKENS_SYSTEM
  └─> all-landing-sections (6/6)

COPY_CONTENT_STANDARDS
  └─> HowItWorksSection (reference)
  └─> ProofSection (pending)
  └─> PricingSection (pending)
  └─> CaptureSection (pending)
  └─> FAQSection (pending)

BACKEND_ARCHITECTURE_COMPLETE_2025
  └─> tech-stack
  └─> database-schema
  └─> mvp-blueprint

MVP_V1_BLUEPRINT_FINAL
  └─> backend-architecture
  └─> tech-stack
  └─> strategic-agenda
  └─> payment-system

ARCO_STRATEGIC_AGENDA_SYSTEM
  └─> crm-system
  └─> project-management
  └─> analytics-integration

PAYMENT_SYSTEM_CANONICAL
  └─> backend-architecture
  └─> security
  └─> subscriptions
```

---

## 📈 Status Overview

### Completed ✅
- Design Tokens System (official standard)
- Landing Page Dark Mode (6/6 sections)
- Copy Standards Documentation (3 files)
- HowItWorksSection Professional Copy
- Backend Architecture Documentation
- Tech Stack Complete Documentation
- MCP Memory Configuration
- Retroactive Indexing Infrastructure

### In Progress 🔄
- ProofSection Copy Refactor
- PricingSection Copy Refactor
- CaptureSection Copy Refactor
- FAQSection Copy Refactor

### Planned 📋
- Visual Testing (after all copy complete)
- Performance Audit
- Strategic Agenda Implementation
- Payment System Integration

---

## 🎯 Next Actions

1. **ProofSection Copy Refactor**
   - Apply professional tone standards
   - Add 2-3 collapsibles (methodology, niche focus, expectations)
   - Contextualize metrics with attribution
   - Remove vague promises

2. **PricingSection Copy Refactor**
   - Remove urgency (false scarcity)
   - Add collapsibles per tier
   - Explain setup fee (R$ 897 breakdown)
   - ROI calculator explanation

3. **CaptureSection Copy Refactor**
   - Specific benefits with timelines
   - LGPD collapsible
   - Realistic onboarding timeline
   - Remove false urgency

4. **FAQSection Copy Refactor**
   - Real objections from discovery calls
   - 3-part answers (Direct + Technical + Practical)
   - Remove pitchy tone
   - Cover main objections (cost, time, risk, complexity)

5. **Visual Testing**
   - All breakpoints (375px → 2560px)
   - Collapsibles working
   - Forms validation
   - GA4 events
   - Professional copy visible

---

## 💡 Usage Examples

```bash
# Query MCP Memory for copy standards
"What are the ARCO copy standards?"
# Returns: Full standards with DO/DON'T lists, examples, checklist

# Query for implementation details
"Show me how HowItWorksSection is structured"
# Returns: Component anatomy, 9 collapsibles, professional tone examples

# Query for architectural decisions
"Why was PreviewSection removed?"
# Returns: Decision rationale, date, context

# Query for design patterns
"How to apply glassmorphism to cards?"
# Returns: CSS classes, opacity values, border colors

# Query for product roadmap
"What's in the MVP V1?"
# Returns: 3 layers, 24 features, 6 weeks timeline, priorities
```

---

## 🔐 Context Persistence

All indexed knowledge persists across sessions:
- ✅ Standards and guidelines remain accessible
- ✅ Decisions are documented with rationale and dates
- ✅ Patterns are reusable with examples
- ✅ Implementation details are queryable
- ✅ Relations between entities are maintained
- ✅ Temporal context (when changes happened)
- ✅ Semantic search across all documentation

This enables future AI assistants to:
1. Understand why decisions were made
2. Follow established patterns consistently
3. Apply standards without repetition
4. Reference previous implementations
5. Build on existing knowledge systematically
