# ARCO Page Flow and Direction Strategy

## Objective

Create a cohesive and intuitive user experience that guides visitors through an efficient conversion funnel, maintaining visual and narrative consistency between pages.

## Proposed Structure

### 1. Main Pages and Direction

#### Consolidated Homepage (`page.tsx`)

- **Function**: Main entry point with value proposition overview
- **Audience**: All visitors
- **Components**: `HeroARCOEnhanced`, `ProcessEnhanced`, `ClientTestimonials`, `CaseStudiesEnhanced`
- **Primary CTA**: "Calculate Uncaptured Revenue" → Directs to `/diagnose`
- **Secondary CTA**: "View Success Stories" → Internal link to section `#case-studies`

#### Diagnostic Page (`/diagnose`)

- **Function**: Qualify leads and start conversion process
- **Audience**: Visitors interested in quantifying problems
- **Components**: `HeroIndex`, `IndexDefinition`, `EligibilityFilter`, `MisreadingSymptoms`
- **Primary CTA**: "Start Free Diagnostic" → Form on the same page
- **Secondary CTA**: "View Implementation Plans" → Directs to `/solutions`

#### Solutions Page (`/solutions`)

- **Function**: Present packages and resolution methodologies
- **Audience**: Qualified leads who have gone through the diagnostic
- **Components**: `DeliverablesandTiers`, `CompetitiveAdvantage`, solution-specific
- **Primary CTA**: "Schedule Consultation" → Contact form
- **Secondary CTA**: "View Client Results" → Directs to `/case-studies`

#### Case Studies Page (`/case-studies`)

- **Function**: Detailed social proof with quantifiable results
- **Audience**: Leads in consideration and decision phase
- **Components**: Expanded case studies with metrics and testimonials
- **Primary CTA**: "Implement Similar Solution" → Directs to `/contact`

### 2. Technical Redirects

- `page-consolidated.tsx` → Rename to `page.tsx` (replaces current)
- `page-refined.tsx` → Keep only as landing page for specific campaigns
- `page-integrated.tsx` → Can be removed after consolidation
- `enhanced/page-fixed.tsx` → Redirect to the new `page.tsx`

### 3. Analytics Integrations for Journey Tracking

- Implement event tracking between pages to measure funnel efficiency
- Configurar UTMs para identificar origem do tráfego entre páginas internas
- Utilizar cookies para personalização progressiva de conteúdo baseada em interações anteriores

## Implementação Recomendada

1. Consolidar conteúdo em `page.tsx` (usando a nova versão consolidada)
2. Configurar redirecionamentos adequados
3. Garantir consistência visual e de mensagem entre as páginas
4. Implementar analytics cross-page para medir eficácia do funil
