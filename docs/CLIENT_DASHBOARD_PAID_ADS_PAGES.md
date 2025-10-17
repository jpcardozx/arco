# 📊 CLIENT DASHBOARD - Tráfego Pago Pages (15 Propostas)

**Contexto**: Dashboard para clientes de agência pequena de tráfego pago  
**Foco**: ROI, performance de campanhas, transparência de investimento  
**Data**: 9 de outubro de 2025

---

## 📊 VISÃO GERAL

Estas páginas foram desenhadas para dar ao cliente visibilidade total sobre campanhas, gastos, resultados e otimizações, traduzindo métricas técnicas em impacto comercial.

---

## 1️⃣ **Campaigns Overview** 🎯

**Rota**: `/dashboard/campanhas`  
**Objetivo**: Visão consolidada de todas as campanhas ativas

### Features Principais
```typescript
interface CampaignsOverview {
  summary: {
    activeCampaigns: number
    totalSpend: number             // R$ mês atual
    totalBudget: number            // R$ budget aprovado
    budgetUsed: number             // %
    impressions: number
    clicks: number
    conversions: number
    ctr: number                    // %
    cpc: number                    // R$ custo por clique
    cpa: number                    // R$ custo por aquisição
    roas: number                   // Retorno sobre gasto
    roi: number                    // % retorno investimento
  }
  
  campaigns: {
    id: string
    name: string
    platform: 'google_ads' | 'meta_ads' | 'linkedin' | 'tiktok'
    status: 'active' | 'paused' | 'ended' | 'draft'
    objective: 'awareness' | 'traffic' | 'leads' | 'sales' | 'app_installs'
    budget: {
      daily: number
      total: number
      spent: number
      remaining: number
    }
    performance: {
      impressions: number
      clicks: number
      conversions: number
      ctr: number
      cpc: number
      cpa: number
      roas: number
    }
    schedule: {
      start: Date
      end: Date | null             // null = sempre ativo
      daysRunning: number
    }
    health: {
      score: number                // 0-100
      status: 'excellent' | 'good' | 'attention' | 'critical'
      issues: string[]
    }
  }[]
  
  comparison: {
    period: 'last_7_days' | 'last_30_days' | 'last_quarter'
    metrics: {
      spend: { current: number, previous: number, change: number }
      conversions: { current: number, previous: number, change: number }
      roas: { current: number, previous: number, change: number }
    }
  }
  
  topPerformers: {
    byCTR: Campaign[]
    byConversions: Campaign[]
    byROAS: Campaign[]
    mostEfficient: Campaign[]      // Melhor CPA
  }
}
```

### Componentes Visuais
- ✅ **Budget Gauge**: Círculo mostrando % gasto
- ✅ **Campaigns Grid**: Cards com métricas de cada campanha
- ✅ **Platform Icons**: Google/Meta/LinkedIn badges
- ✅ **Health Indicators**: Semáforo por campanha
- 📊 **Performance Chart**: Spend vs Conversions ao longo do tempo

### Valor para o Cliente
- 💰 **Controle de Budget**: Sabe exatamente quanto gastou
- 📈 **ROI Visível**: ROAS em destaque
- 🎯 **Campanhas Vencedoras**: Identifica best performers

---

## 2️⃣ **Ad Performance** 📢

**Rota**: `/dashboard/anuncios`  
**Objetivo**: Performance detalhada de cada anúncio/criativo

### Features Principais
```typescript
interface AdPerformance {
  overview: {
    totalAds: number
    activeAds: number
    pausedAds: number
    avgCTR: number
    avgCPC: number
    avgCPA: number
    bestPerforming: Ad
    worstPerforming: Ad
  }
  
  ads: {
    id: string
    name: string
    campaign: string
    platform: string
    format: 'image' | 'video' | 'carousel' | 'collection' | 'story'
    status: 'learning' | 'active' | 'paused' | 'rejected' | 'ended'
    creative: {
      headline: string
      description: string
      cta: string
      preview: string              // URL da imagem/vídeo
      thumbnails: string[]         // Para carousel
    }
    targeting: {
      audience: string
      locations: string[]
      ageRange: string
      gender: string
      interests: string[]
      devices: string[]
    }
    performance: {
      impressions: number
      reach: number
      clicks: number
      conversions: number
      spend: number
      ctr: number
      cpc: number
      cpa: number
      frequency: number            // Quantas vezes mesmo usuário viu
      engagementRate: number       // %
    }
    sentiment: {
      likes: number
      comments: number
      shares: number
      saves: number
      negative: number             // Comentários negativos
    }
    schedule: {
      start: Date
      end: Date | null
      daysRunning: number
    }
  }[]
  
  insights: {
    adFatigue: {                   // Criativo cansado
      ads: string[]
      reason: string
      recommendation: string
    }
    underperforming: {
      ads: string[]
      benchmarks: {
        yourCTR: number
        avgCTR: number
      }
      suggestions: string[]
    }
    opportunities: {
      type: 'increase_budget' | 'expand_targeting' | 'new_creative'
      ads: string[]
      potentialGain: string
    }[]
  }
}
```

### Componentes Visuais
- ✅ **Ads Gallery**: Grid com preview de cada anúncio
- ✅ **Performance Table**: Tabela sortável por métrica
- ✅ **Creative Preview**: Modal com anúncio completo
- ✅ **Sentiment Indicators**: 👍 👎 para engagement
- 📊 **CTR Trend**: Gráfico de performance ao longo do tempo
- ⚠️ **Fatigue Alerts**: Avisos de anúncios cansados

### Valor para o Cliente
- 🎨 **Criativos Vencedores**: Sabe qual arte funciona
- 📉 **Identifica Fadiga**: Troca anúncios no tempo certo
- 💡 **Insights Acionáveis**: Sugestões concretas de otimização

---

## 3️⃣ **Audience Insights** 👥

**Rota**: `/dashboard/audiencias`  
**Objetivo**: Quem está vendo e interagindo com os anúncios

### Features Principais
```typescript
interface AudienceInsights {
  demographics: {
    age: {
      range: string                // "25-34"
      percentage: number
      ctr: number
      cpa: number
      conversions: number
    }[]
    gender: {
      type: 'male' | 'female' | 'unknown'
      percentage: number
      ctr: number
      cpa: number
    }[]
    location: {
      city: string
      state: string
      country: string
      percentage: number
      conversions: number
      cpa: number
    }[]
  }
  
  devices: {
    type: 'mobile' | 'desktop' | 'tablet'
    os: string                     // "iOS", "Android"
    percentage: number
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    cpa: number
  }[]
  
  interests: {
    category: string               // "Sports", "Technology"
    subcategory: string
    affinity: number               // 0-100 força do interesse
    reach: number                  // Tamanho da audiência
    performance: {
      ctr: number
      cpa: number
      conversions: number
    }
  }[]
  
  behavior: {
    purchaseBehavior: {
      type: string                 // "Frequent shoppers"
      reach: number
      conversions: number
      avgOrderValue: number
    }[]
    deviceUsage: {
      pattern: string              // "Mobile-first", "Desktop power user"
      percentage: number
    }[]
    timeOnSite: {
      avg: number                  // segundos
      bySource: {
        source: string
        avgTime: number
      }[]
    }
  }
  
  customAudiences: {
    id: string
    name: string                   // "Carrinho Abandonado"
    type: 'remarketing' | 'lookalike' | 'custom' | 'saved'
    size: number
    growth: number                 // % crescimento
    performance: {
      impressions: number
      conversions: number
      cpa: number
      roas: number
    }
    source: {
      type: 'website' | 'email_list' | 'app' | 'offline'
      lastSync: Date
    }
  }[]
  
  insights: {
    topConverting: {
      demographic: string
      performance: string
    }
    underperforming: {
      segment: string
      issue: string
      recommendation: string
    }[]
    expansion: {
      opportunity: string
      estimatedReach: number
      potentialConversions: number
    }[]
  }
}
```

### Componentes Visuais
- ✅ **Demographics Charts**: Pirâmide etária, gênero
- ✅ **Location Heat Map**: Mapa com conversões por região
- ✅ **Device Breakdown**: Mobile vs Desktop
- ✅ **Interests Cloud**: Tag cloud de interesses
- ✅ **Custom Audiences Cards**: Listas de remarketing
- 📊 **Performance by Segment**: Tabela comparativa

### Valor para o Cliente
- 🎯 **Público Certo**: Valida personas
- 💰 **Otimiza Budget**: Investe em segmentos rentáveis
- 🔍 **Descobre Oportunidades**: Novos públicos potenciais

---

## 4️⃣ **Budget Management** 💰

**Rota**: `/dashboard/orcamento`  
**Objetivo**: Controle financeiro granular das campanhas

### Features Principais
```typescript
interface BudgetManagement {
  overview: {
    totalBudget: number            // R$ aprovado
    spent: {
      today: number
      thisWeek: number
      thisMonth: number
      total: number
    }
    remaining: {
      daily: number
      weekly: number
      monthly: number
    }
    pace: {
      current: number              // R$/dia média
      required: number             // R$/dia necessário
      status: 'on_track' | 'underspending' | 'overspending'
    }
    projection: {
      endOfMonth: number           // Projeção de gasto
      overage: number              // Quanto vai estourar (se aplicável)
    }
  }
  
  byPlatform: {
    platform: 'google_ads' | 'meta_ads' | 'linkedin' | 'tiktok'
    budget: number
    spent: number
    remaining: number
    percentage: number             // % do budget total
    performance: {
      conversions: number
      cpa: number
      roas: number
    }
    recommendation: {
      action: 'increase' | 'decrease' | 'maintain'
      amount: number
      reason: string
    }
  }[]
  
  byCampaign: {
    campaign: string
    budget: {
      daily: number
      total: number
      spent: number
      remaining: number
    }
    performance: {
      conversions: number
      cpa: number
      efficiency: number           // Conversões / R$ 1000
    }
    forecast: {
      estimatedSpend: number
      estimatedConversions: number
    }
    status: {
      health: 'good' | 'warning' | 'critical'
      message: string
    }
  }[]
  
  history: {
    date: Date
    spent: number
    conversions: number
    cpa: number
    dailyLimit: number
    exceeded: boolean
  }[]
  
  alerts: {
    type: 'budget_limit' | 'overspending' | 'underspending' | 'low_performance'
    severity: 'info' | 'warning' | 'critical'
    campaign: string
    message: string
    recommendation: string
    createdAt: Date
  }[]
  
  optimization: {
    reallocations: {
      from: string                 // Campaign name
      to: string
      amount: number
      reason: string
      estimatedImpact: string
    }[]
    suggestions: {
      action: string
      campaign: string
      currentBudget: number
      suggestedBudget: number
      expectedGain: string
    }[]
  }
}
```

### Componentes Visuais
- ✅ **Budget Gauge**: Círculo grande com % gasto
- ✅ **Spending Trend**: Gráfico de gasto diário
- ✅ **Platform Distribution**: Pizza de distribuição
- ✅ **Pace Indicator**: On track / Over / Under
- ⚠️ **Alerts Panel**: Avisos destacados
- 📊 **Budget vs Results**: Gasto x Conversões

### Valor para o Cliente
- 💵 **Controle Total**: Sabe cada centavo gasto
- 🚨 **Alertas Proativos**: Aviso antes de estourar budget
- 🎯 **Otimização Sugerida**: Onde realocar budget

---

## 5️⃣ **Conversions & Attribution** 🎁

**Rota**: `/dashboard/conversoes`  
**Objetivo**: Tracking de conversões e jornada do cliente

### Features Principais
```typescript
interface ConversionsAttribution {
  overview: {
    totalConversions: number
    conversionRate: number         // %
    totalRevenue: number           // R$
    avgOrderValue: number          // R$
    cpa: number
    roas: number
    ltv: number                    // Lifetime value
  }
  
  conversionTypes: {
    type: 'purchase' | 'lead' | 'signup' | 'call' | 'app_install' | 'custom'
    name: string                   // "Compra Online", "Formulário Contato"
    count: number
    value: number                  // R$ total
    rate: number                   // % de conversão
    trend: 'up' | 'down' | 'stable'
    change: number                 // % vs período anterior
    sources: {
      source: string
      conversions: number
      percentage: number
    }[]
  }[]
  
  funnel: {
    stage: {
      name: string                 // "Awareness", "Consideration"
      users: number
      dropoff: number              // %
      avgTime: number              // Tempo médio nesta etapa
    }[]
    bottlenecks: {
      stage: string
      dropoffRate: number
      reason: string
      recommendation: string
    }[]
  }
  
  attribution: {
    model: 'last_click' | 'first_click' | 'linear' | 'time_decay' | 'data_driven'
    byChannel: {
      channel: 'google_ads' | 'meta_ads' | 'organic' | 'direct' | 'referral'
      conversions: number
      assistedConversions: number  // Participou mas não fechou
      value: number
      percentage: number
      cpa: number
    }[]
    touchpoints: {
      avgTouchpoints: number       // Quantos pontos de contato até converter
      distribution: {
        touchpoints: number        // 1, 2, 3...
        conversions: number
        percentage: number
      }[]
    }
    timeToConversion: {
      avg: number                  // dias
      distribution: {
        range: string              // "0-1 dias", "2-7 dias"
        conversions: number
        percentage: number
      }[]
    }
  }
  
  customerJourney: {
    path: {
      step: number
      touchpoint: string           // "Google Search Ad"
      date: Date
      device: string
      action: string               // "Clicked ad", "Viewed product"
    }[]
    commonPaths: {
      path: string                 // "Google Ad → Site → Email → Purchase"
      conversions: number
      avgValue: number
    }[]
  }
  
  microConversions: {
    type: string                   // "Add to Cart", "Video View 50%"
    count: number
    conversionRate: number         // % que viram micro e converteram
    value: number                  // Valor estimado
  }[]
}
```

### Componentes Visuais
- ✅ **Funnel Visualization**: Funil visual com dropoffs
- ✅ **Attribution Chart**: Contribuição de cada canal
- ✅ **Customer Journey Map**: Visualização da jornada
- ✅ **Conversion Types Cards**: Métricas por tipo
- 📊 **Time to Conversion**: Histograma
- 🔍 **Path Analysis**: Sankey diagram de caminhos

### Valor para o Cliente
- 🎯 **Entende a Jornada**: Como cliente chega até compra
- 💡 **Identifica Gargalos**: Onde perde mais gente
- 📊 **Atribuição Clara**: Qual canal merece crédito

---

## 6️⃣ **Keywords Performance** 🔑

**Rota**: `/dashboard/palavras-chave`  
**Objetivo**: Performance de keywords (Google Ads principalmente)

### Features Principais
```typescript
interface KeywordsPerformance {
  overview: {
    totalKeywords: number
    activeKeywords: number
    avgPosition: number
    avgCPC: number
    avgQualityScore: number
    impressionShare: number        // %
    lostISBudget: number          // % perdido por budget
    lostISRank: number            // % perdido por rank
  }
  
  keywords: {
    keyword: string
    matchType: 'exact' | 'phrase' | 'broad' | 'broad_modified'
    campaign: string
    adGroup: string
    status: 'active' | 'paused' | 'low_search_volume'
    performance: {
      impressions: number
      clicks: number
      conversions: number
      cost: number
      ctr: number
      cpc: number
      cpa: number
      conversionRate: number
    }
    position: {
      avg: number
      top: number                  // % de vezes no top
      absolute: number             // % de vezes no absoluto top
    }
    qualityScore: {
      score: number                // 1-10
      expectedCTR: 'above_avg' | 'avg' | 'below_avg'
      adRelevance: 'above_avg' | 'avg' | 'below_avg'
      landingPageExp: 'above_avg' | 'avg' | 'below_avg'
    }
    searchIntent: 'informational' | 'navigational' | 'commercial' | 'transactional'
  }[]
  
  negativeKeywords: {
    keyword: string
    matchType: string
    level: 'campaign' | 'account'
    blockedImpressions: number     // Estimativa
    savedCost: number              // R$ economizado
    addedDate: Date
  }[]
  
  searchTerms: {                   // Termos reais pesquisados
    term: string
    keyword: string                // Keyword que trigou
    impressions: number
    clicks: number
    conversions: number
    cost: number
    ctr: number
    status: 'added' | 'to_review' | 'negatived'
    recommendation: 'add_as_keyword' | 'add_as_negative' | 'monitor'
  }[]
  
  insights: {
    opportunities: {
      keyword: string
      reason: string               // "High CTR, low conversions"
      action: string
      potentialGain: string
    }[]
    underperforming: {
      keyword: string
      issue: string
      recommendation: string
    }[]
    budgetWasters: {
      keyword: string
      cost: number
      conversions: number
      recommendation: string
    }[]
  }
  
  competitorIntel: {
    keyword: string
    yourPosition: number
    competitors: {
      domain: string
      position: number
      estimatedBid: number
    }[]
    auctionInsights: {
      impressionShare: number
      overlapRate: number          // % que aparece junto
      outranking: number           // % que você rankeia acima
    }
  }[]
}
```

### Componentes Visuais
- ✅ **Keywords Table**: Tabela com todas as métricas
- ✅ **Quality Score Gauge**: Medidor por keyword
- ✅ **Position Tracker**: Gráfico de posição ao longo do tempo
- ✅ **Search Terms Cloud**: Nuvem de termos
- ⚠️ **Opportunities Panel**: Lista de otimizações
- 📊 **Match Type Distribution**: Exato vs Frase vs Ampla

### Valor para o Cliente
- 🎯 **Palavras Vencedoras**: Quais keywords convertem
- 💰 **Otimiza Gasto**: Pausa keywords que não performam
- 🔍 **Descobre Novas**: Search terms revelam oportunidades

---

## 7️⃣ **Landing Pages Analytics** 🎯

**Rota**: `/dashboard/landing-pages`  
**Objetivo**: Performance das páginas de destino

### Features Principais
```typescript
interface LandingPagesAnalytics {
  overview: {
    totalPages: number
    totalVisits: number
    avgBounceRate: number
    avgTimeOnPage: number
    avgConversionRate: number
  }
  
  pages: {
    url: string
    title: string
    campaigns: string[]            // Campanhas que direcionam pra ela
    traffic: {
      visits: number
      uniqueVisitors: number
      bounceRate: number
      avgTimeOnPage: number
      exitRate: number
      pagesPerSession: number
    }
    conversions: {
      total: number
      rate: number
      revenue: number
      aov: number                  // Average order value
    }
    sources: {
      source: string
      visits: number
      conversionRate: number
    }[]
    devices: {
      type: 'mobile' | 'desktop' | 'tablet'
      visits: number
      bounceRate: number
      conversionRate: number
    }[]
    performance: {
      loadTime: number
      coreWebVitals: {
        lcp: number
        fid: number
        cls: number
      }
      mobileSpeed: number
      desktopSpeed: number
    }
    elements: {
      cta: {
        text: string
        clicks: number
        clickRate: number
        position: string
      }[]
      forms: {
        id: string
        submissions: number
        abandonmentRate: number
        avgTimeToComplete: number
      }[]
      heatmap: {
        clicks: HeatmapData[]
        scrollDepth: {
          percentage: number       // % que rolou até aqui
          users: number
        }[]
      }
    }
  }[]
  
  abtests: {
    testId: string
    name: string
    status: 'running' | 'completed' | 'paused'
    variants: {
      name: string                 // "Control", "Variant A"
      url: string
      traffic: number              // % de tráfego
      visits: number
      conversions: number
      conversionRate: number
      confidence: number           // % confiança estatística
    }[]
    winner: {
      variant: string
      improvement: number          // % melhoria
      significanceLevel: number
    } | null
    startDate: Date
    endDate: Date | null
  }[]
  
  insights: {
    highBounce: {
      page: string
      bounceRate: number
      issue: string
      recommendation: string
    }[]
    lowConversion: {
      page: string
      conversionRate: number
      traffic: number              // Muito tráfego, pouca conversão
      potentialGain: string
    }[]
    performanceIssues: {
      page: string
      loadTime: number
      impact: string
    }[]
  }
}
```

### Componentes Visuais
- ✅ **Pages Grid**: Cards com métricas principais
- ✅ **Heatmap Viewer**: Visualização de cliques
- ✅ **Scroll Map**: Até onde usuários rolam
- ✅ **A/B Test Results**: Comparação de variantes
- ✅ **Funnel by Page**: Mini funil por landing page
- 📊 **Device Performance**: Mobile vs Desktop

### Valor para o Cliente
- 🎯 **Otimiza Conversão**: Sabe qual página converte
- 🔥 **Identifica Fricção**: Heatmap mostra problemas
- 📈 **Testes Validados**: A/B tests com dados claros

---

## 8️⃣ **Competitor Analysis** 🔍

**Rota**: `/dashboard/concorrentes`  
**Objetivo**: Inteligência competitiva de anúncios

### Features Principais
```typescript
interface CompetitorAnalysis {
  overview: {
    trackedCompetitors: number
    yourMarketShare: number        // % estimado
    avgIndustryCAC: number         // R$
    yourCAC: number
    positionVsCompetitors: 'leader' | 'challenger' | 'follower'
  }
  
  competitors: {
    domain: string
    name: string
    estimatedSpend: {
      monthly: number
      trend: 'increasing' | 'decreasing' | 'stable'
    }
    platforms: {
      platform: string
      active: boolean
      estimatedBudget: number
      adCount: number
    }[]
    adExamples: {
      headline: string
      description: string
      cta: string
      preview: string
      platform: string
      firstSeen: Date
      lastSeen: Date
      estimatedImpressions: number
    }[]
    keywords: {
      keyword: string
      position: number
      yourPosition: number
      overlap: boolean             // Ambos aparecem
      estimatedCPC: number
    }[]
    audienceOverlap: {
      percentage: number           // % audiência compartilhada
      segments: string[]
    }
    strengths: string[]
    weaknesses: string[]
  }[]
  
  marketIntel: {
    topKeywords: {
      keyword: string
      searchVolume: number
      avgCPC: number
      competition: 'low' | 'medium' | 'high'
      competitorsCount: number
      yourPosition: number | null
    }[]
    adFormats: {
      format: string
      usage: number                // % de concorrentes usando
      yourUsage: boolean
    }[]
    messaging: {
      theme: string                // "Price Focus", "Quality"
      competitors: string[]
      yourStrategy: string
    }[]
  }
  
  opportunities: {
    type: 'keyword' | 'audience' | 'platform' | 'creative'
    description: string
    competitors: string[]          // Quem já faz isso
    estimatedImpact: string
    difficulty: 'easy' | 'medium' | 'hard'
  }[]
  
  alerts: {
    type: 'new_competitor' | 'increased_spend' | 'new_campaign' | 'keyword_battle'
    competitor: string
    message: string
    date: Date
  }[]
}
```

### Componentes Visuais
- ✅ **Competitors Cards**: Info de cada concorrente
- ✅ **Market Share Pie**: Distribuição de mercado
- ✅ **Ad Gallery**: Exemplos de anúncios
- ✅ **Keyword Overlap Venn**: Diagrama de Venn
- ⚠️ **Alerts Feed**: Novidades da concorrência
- 📊 **Spend Trends**: Gráfico de investimento estimado

### Valor para o Cliente
- 👀 **Visibilidade Competitiva**: Sabe o que concorrentes fazem
- 💡 **Inspira Estratégia**: Vê anúncios que funcionam
- 🎯 **Identifica Gaps**: Oportunidades não exploradas

---

## 9️⃣ **Creative Library** 🎨

**Rota**: `/dashboard/biblioteca-criativos`  
**Objetivo**: Repositório organizado de todos os criativos

### Features Principais
```typescript
interface CreativeLibrary {
  overview: {
    totalAssets: number
    images: number
    videos: number
    gifs: number
    carousels: number
    bestPerforming: Creative
  }
  
  creatives: {
    id: string
    name: string
    type: 'image' | 'video' | 'gif' | 'carousel'
    format: string                 // "1080x1080", "16:9"
    preview: string
    thumbnails: string[]           // Para carousels
    campaigns: {
      campaign: string
      platform: string
      status: 'active' | 'paused' | 'ended'
    }[]
    performance: {
      impressions: number
      clicks: number
      conversions: number
      ctr: number
      engagementRate: number
      sentiment: {
        positive: number
        neutral: number
        negative: number
      }
    }
    metadata: {
      uploadDate: Date
      lastUsed: Date
      fileSize: string
      dimensions: string
      duration: number             // Para vídeos (segundos)
      tags: string[]
      category: string
    }
    copyVariants: {
      headline: string
      description: string
      cta: string
      performance: {
        impressions: number
        ctr: number
        conversions: number
      }
    }[]
    abtests: {
      variantA: string
      variantB: string
      winner: string
      improvement: number
    }[]
  }[]
  
  templates: {
    id: string
    name: string
    type: string
    preview: string
    usageCount: number
    avgPerformance: {
      ctr: number
      conversionRate: number
    }
  }[]
  
  insights: {
    topPerforming: {
      creative: string
      metric: 'ctr' | 'conversions' | 'engagement'
      value: number
      reason: string
    }[]
    underperforming: {
      creative: string
      issue: string
      recommendation: string
    }[]
    trends: {
      pattern: string              // "Videos outperform images"
      data: string
      recommendation: string
    }[]
  }
  
  suggestions: {
    type: 'new_creative' | 'refresh' | 'duplicate_winner'
    reason: string
    examples: string[]
    priority: 'high' | 'medium' | 'low'
  }[]
}
```

### Componentes Visuais
- ✅ **Creative Gallery**: Grid com todos os criativos
- ✅ **Filter Bar**: Por tipo, performance, campanha
- ✅ **Preview Modal**: Visualização grande
- ✅ **Performance Badges**: CTR, conversões destacadas
- 📊 **Best Performers**: Top 5 criativos
- 🎨 **Template Library**: Modelos reutilizáveis

### Valor para o Cliente
- 📚 **Organizacionado**: Todos os criativos em um lugar
- 🏆 **Identifica Vencedores**: Sabe qual arte funciona
- ♻️ **Reutiliza**: Templates de sucesso

---

## 🔟 **Retargeting & Remarketing** 🔄

**Rota**: `/dashboard/retargeting`  
**Objetivo**: Campanhas de remarketing e audiências

### Features Principais
```typescript
interface RetargetingRemarketing {
  overview: {
    activeAudiences: number
    totalReach: number
    spend: number
    conversions: number
    roas: number
    frequency: number              // Quantas vezes mesmo usuário vê
  }
  
  audiences: {
    id: string
    name: string                   // "Carrinho Abandonado"
    type: 'pixel' | 'list' | 'app' | 'engagement'
    source: string                 // "Website visitors", "Email list"
    size: number                   // Usuários na lista
    growth: {
      rate: number                 // % crescimento
      trend: 'up' | 'down' | 'stable'
    }
    rules: {
      inclusion: string[]          // "Visited product page"
      exclusion: string[]          // "Completed purchase"
      duration: number             // Dias que ficam na lista
    }
    performance: {
      impressions: number
      clicks: number
      conversions: number
      spend: number
      ctr: number
      cpa: number
      roas: number
    }
    campaigns: {
      campaign: string
      platform: string
      status: 'active' | 'paused'
    }[]
  }[]
  
  segments: {
    warmLeads: {                   // Visitou mas não converteu
      size: number
      conversions: number
      conversionRate: number
      avgDaysToConvert: number
    }
    hotLeads: {                    // Adicionou ao carrinho
      size: number
      conversions: number
      conversionRate: number
      abandonmentRate: number
    }
    pastCustomers: {               // Já comprou antes
      size: number
      repeat: number
      avgOrderValue: number
      ltv: number
    }
  }
  
  funnelRe engagement: {
    stage: string
    audienceSize: number
    spend: number
    conversions: number
    message: string                // Tipo de mensagem usada
    performance: {
      ctr: number
      conversionRate: number
      roas: number
    }
  }[]
  
  frequency: {
    distribution: {
      times: number                // 1x, 2x, 3x...
      users: number
      conversions: number
      conversionRate: number
    }[]
    optimal: number                // Frequência ideal
    current: number
    status: 'underexposed' | 'optimal' | 'overexposed'
  }
  
  crossSell: {
    product: string
    buyers: number
    recommendations: {
      product: string
      affinity: number             // % que compram ambos
      reach: number
      conversions: number
    }[]
  }[]
  
  insights: {
    opportunities: {
      type: string
      audience: string
      potentialReach: number
      estimatedROAS: number
      recommendation: string
    }[]
    fatigue: {
      audience: string
      frequency: number
      dropInPerformance: number
      recommendation: string
    }[]
  }
}
```

### Componentes Visuais
- ✅ **Audiences Grid**: Cards de cada audiência
- ✅ **Funnel Reengagement**: Funil de reconquista
- ✅ **Frequency Chart**: Distribuição de frequência
- ✅ **Segment Performance**: Tabela comparativa
- 📊 **Growth Trends**: Crescimento de audiências
- 🎯 **Cross-sell Opportunities**: Produtos relacionados

### Valor para o Cliente
- 🔄 **Reconquista Eficiente**: Remarketing estruturado
- 💰 **ROI Alto**: Audiências quentes convertem mais
- 🎯 **Segmentação Refinada**: Mensagem certa pro público certo

---

## 1️⃣1️⃣ **Ad Spend vs Revenue** 💹

**Rota**: `/dashboard/roi-detalhado`  
**Objetivo**: Análise financeira profunda do investimento

### Features Principais
```typescript
interface AdSpendRevenue {
  overview: {
    period: 'today' | 'this_week' | 'this_month' | 'this_quarter' | 'this_year'
    totalSpend: number
    totalRevenue: number
    netProfit: number
    roas: number
    roi: number                    // %
    breakeven: {
      date: Date                   // Quando pagou o investimento
      daysToBreakeven: number
    }
  }
  
  timeline: {
    date: Date
    spend: number
    revenue: number
    profit: number
    roas: number
    conversions: number
    cpa: number
  }[]
  
  byChannel: {
    channel: string
    spend: number
    revenue: number
    profit: number
    roas: number
    roi: number
    contributionMargin: number     // %
    efficiency: 'high' | 'medium' | 'low'
    recommendation: {
      action: 'scale' | 'optimize' | 'pause'
      reason: string
      potentialGain: string
    }
  }[]
  
  byCampaign: {
    campaign: string
    spend: number
    revenue: number
    profit: number
    roas: number
    profitMargin: number           // %
    paybackPeriod: number          // Dias
    ltv: number                    // Customer LTV
    cac: number                    // Customer acquisition cost
    ltvCacRatio: number            // Ideal > 3
  }[]
  
  cohortAnalysis: {
    cohort: string                 // "Jan 2025"
    customersAcquired: number
    initialSpend: number
    revenue: {
      month1: number
      month2: number
      month3: number
      month6: number
      month12: number
      cumulative: number
    }
    roas: {
      month1: number
      month3: number
      month6: number
      month12: number
    }
    retention: {
      month1: number               // %
      month3: number
      month6: number
      month12: number
    }
  }[]
  
  forecast: {
    period: 'next_month' | 'next_quarter'
    expectedSpend: number
    expectedRevenue: number
    expectedProfit: number
    expectedROAS: number
    confidence: number             // % confiança da previsão
    assumptions: string[]
  }
  
  benchmarks: {
    metric: string
    yourValue: number
    industryAvg: number
    topPerformers: number
    status: 'above' | 'at' | 'below'
  }[]
  
  attribution: {
    model: string
    revenue: {
      direct: number
      assisted: number
      total: number
    }
    lastTouchRevenue: number
    firstTouchRevenue: number
    linearRevenue: number
  }
}
```

### Componentes Visuais
- ✅ **ROI Gauge**: Medidor grande de retorno
- ✅ **Spend vs Revenue Chart**: Gráfico de linha dupla
- ✅ **Profitability Matrix**: Matriz de eficiência
- ✅ **Cohort Table**: Tabela de coortes
- ✅ **Forecast Chart**: Projeção futura
- 📊 **Benchmark Comparison**: Você vs Indústria

### Valor para o Cliente
- 💰 **Clareza Financeira**: ROI em termos de negócio
- 📈 **Projeções**: Sabe quanto vai gerar no futuro
- 🎯 **Decisões Baseadas em Dados**: Onde investir mais

---

## 1️⃣2️⃣ **Seasonal & Trends** 📅

**Rota**: `/dashboard/sazonalidade`  
**Objetivo**: Padrões temporais e tendências de busca

### Features Principais
```typescript
interface SeasonalTrends {
  overview: {
    bestMonth: string
    bestDayOfWeek: string
    bestHour: string
    peakSeason: string
    offSeason: string
  }
  
  monthly: {
    month: string
    spend: number
    revenue: number
    conversions: number
    roas: number
    trend: 'peak' | 'high' | 'normal' | 'low'
    vsAvg: number                  // % vs média anual
  }[]
  
  weekly: {
    dayOfWeek: string
    avgSpend: number
    avgConversions: number
    avgCPA: number
    performance: 'excellent' | 'good' | 'average' | 'poor'
    recommendation: string
  }[]
  
  hourly: {
    hour: number                   // 0-23
    impressions: number
    clicks: number
    conversions: number
    ctr: number
    conversionRate: number
    bestFor: 'awareness' | 'conversions' | 'both' | 'pause'
  }[]
  
  events: {
    name: string                   // "Black Friday", "Natal"
    date: Date
    type: 'holiday' | 'sale_event' | 'seasonal'
    impact: {
      spendIncrease: number        // %
      revenueIncrease: number
      conversionsIncrease: number
    }
    preparation: {
      daysBeforeStart: number
      budgetIncrease: number       // R$
      keywordAdjustments: string[]
      creativeThemes: string[]
    }
    historical: {
      year: number
      revenue: number
      roas: number
    }[]
  }[]
  
  trends: {
    keyword: string
    interest: {
      currentLevel: number         // 0-100
      trend: 'rising' | 'stable' | 'falling'
      change: number               // % vs last period
      forecast: {
        nextMonth: number
        nextQuarter: number
      }
    }
    searchVolume: {
      current: number
      historical: {
        period: string
        volume: number
      }[]
    }
    seasonality: {
      pattern: 'seasonal' | 'cyclical' | 'trending' | 'stable'
      peakMonths: string[]
    }
  }[]
  
  recommendations: {
    action: 'increase_budget' | 'pause' | 'launch_campaign' | 'adjust_bidding'
    period: string                 // "Black Friday week"
    reason: string
    suggestedBudget: number
    expectedROAS: number
    priority: 'high' | 'medium' | 'low'
  }[]
}
```

### Componentes Visuais
- ✅ **Seasonal Calendar**: Calendário com eventos
- ✅ **Monthly Performance**: Gráfico de barras por mês
- ✅ **Hourly Heatmap**: Mapa de calor por hora/dia
- ✅ **Trend Lines**: Linhas de tendência de keywords
- 📅 **Upcoming Events**: Próximos eventos importantes
- 📊 **Historical Comparison**: Ano a ano

### Valor para o Cliente
- 📅 **Planejamento Antecipado**: Prepara para sazonalidade
- 💰 **Otimiza Budget**: Investe mais em períodos rentáveis
- 🔮 **Previsibilidade**: Sabe o que esperar em cada período

---

## 1️⃣3️⃣ **Mobile vs Desktop** 📱

**Rota**: `/dashboard/dispositivos`  
**Objetivo**: Comparação detalhada de performance por device

### Features Principais
```typescript
interface MobileVsDesktop {
  overview: {
    mobile: {
      percentage: number           // % do tráfego
      spend: number
      conversions: number
      cpa: number
      roas: number
    }
    desktop: {...}
    tablet: {...}
  }
  
  detailedComparison: {
    metric: string
    mobile: number
    desktop: number
    tablet: number
    winner: 'mobile' | 'desktop' | 'tablet'
    difference: number             // %
  }[]
  
  byPlatform: {
    platform: 'google_ads' | 'meta_ads'
    mobile: {
      spend: number
      conversions: number
      cpa: number
      roas: number
    }
    desktop: {...}
  }[]
  
  byCampaign: {
    campaign: string
    devices: {
      type: 'mobile' | 'desktop' | 'tablet'
      impressions: number
      clicks: number
      conversions: number
      spend: number
      ctr: number
      cpa: number
      roas: number
    }[]
    recommendation: {
      action: 'mobile_first' | 'desktop_focus' | 'balanced'
      adjustments: string[]
    }
  }[]
  
  operatingSystems: {
    os: 'iOS' | 'Android' | 'Windows' | 'Mac'
    version: string
    percentage: number
    conversions: number
    cpa: number
    performance: 'excellent' | 'good' | 'average' | 'poor'
  }[]
  
  screenSizes: {
    size: string                   // "360x800", "1920x1080"
    percentage: number
    bounceRate: number
    conversionRate: number
    avgTimeOnSite: number
  }[]
  
  callExtensions: {                // Específico mobile
    calls: number
    callConversions: number
    callRevenue: number
    avgCallDuration: number        // segundos
    callThroughRate: number        // %
  }
  
  locationBidAdjustments: {
    device: string
    location: string
    currentAdjustment: number      // % +/-
    recommendedAdjustment: number
    reason: string
  }[]
  
  insights: {
    mobileOpportunities: string[]
    desktopOpportunities: string[]
    crossDeviceJourney: {
      pattern: string              // "Research mobile, buy desktop"
      percentage: number
      avgTimeToConvert: number
    }[]
  }
}
```

### Componentes Visuais
- ✅ **Device Split**: Pizza de distribuição
- ✅ **Performance Table**: Tabela comparativa
- ✅ **OS Breakdown**: Barras por sistema operacional
- ✅ **Screen Sizes**: Grid de resoluções
- 📊 **Conversion Funnel by Device**: Funil separado
- 📱 **Mobile vs Desktop Chart**: Gráfico comparativo

### Valor para o Cliente
- 📱 **Mobile First**: Dados para decisão mobile
- 💰 **Bid Adjustments**: Onde ajustar lances
- 🎯 **Otimiza Criativos**: Formatos ideais por device

---

## 1️⃣4️⃣ **Automation & Rules** ⚙️

**Rota**: `/dashboard/automacao`  
**Objetivo**: Regras automáticas e otimizações programadas

### Features Principais
```typescript
interface AutomationRules {
  overview: {
    activeRules: number
    triggeredToday: number
    actionsTaken: number
    estimatedSavings: number       // R$
  }
  
  rules: {
    id: string
    name: string                   // "Pausa keywords com alto CPA"
    type: 'budget' | 'bid' | 'pause' | 'enable' | 'alert'
    status: 'active' | 'paused' | 'error'
    trigger: {
      condition: string            // "CPA > R$ 50"
      frequency: 'realtime' | 'hourly' | 'daily'
      lookbackPeriod: number       // dias
    }
    action: {
      type: string                 // "Pause keyword"
      details: string
      scope: 'campaign' | 'adgroup' | 'keyword' | 'ad'
    }
    history: {
      date: Date
      triggered: boolean
      action: string
      impactedItems: number
      result: string
    }[]
    performance: {
      timesSaved: number           // R$
      conversionsProtected: number
      efficiencyGain: number       // %
    }
  }[]
  
  scheduledOptimizations: {
    name: string
    type: 'budget_reallocation' | 'bid_adjustment' | 'dayparting' | 'audience_refresh'
    schedule: string               // "Daily at 9 AM"
    lastRun: Date
    nextRun: Date
    status: 'scheduled' | 'running' | 'completed' | 'failed'
    results: {
      itemsAffected: number
      estimatedImpact: string
    }
  }[]
  
  smartBidding: {
    campaigns: {
      campaign: string
      strategy: 'target_cpa' | 'target_roas' | 'maximize_conversions' | 'maximize_clicks'
      target: number
      performance: {
        actualCPA: number
        actualROAS: number
        vs Target: number           // %
      }
      learningStatus: 'learning' | 'eligible' | 'limited'
      recommendations: string[]
    }[]
  }
  
  alerts: {
    id: string
    name: string                   // "Budget 80% depleted"
    condition: string
    recipients: string[]           // Emails
    channels: ('email' | 'sms' | 'dashboard')[]
    triggered: {
      count: number
      lastTime: Date
    }
    acknowledged: boolean
  }[]
  
  budgetPacing: {
    campaign: string
    dailyBudget: number
    currentPace: number            // R$/hora
    recommendedPace: number
    status: 'on_track' | 'overpacing' | 'underpacing'
    adjustment: {
      type: 'increase_bid' | 'decrease_bid' | 'extend_hours'
      amount: number
    } | null
  }[]
  
  suggestions: {
    type: 'new_rule' | 'optimize_existing' | 'disable_redundant'
    description: string
    potentialImpact: string
    effort: 'easy' | 'medium' | 'hard'
  }[]
}
```

### Componentes Visuais
- ✅ **Rules Grid**: Cards de cada regra ativa
- ✅ **Activity Timeline**: Ações tomadas automaticamente
- ✅ **Savings Calculator**: R$ economizado por automação
- ✅ **Smart Bidding Status**: Status de cada campanha
- ⚙️ **Rule Builder**: Interface para criar regras
- 📊 **Impact Chart**: Gráfico de impacto das automações

### Valor para o Cliente
- ⏰ **Economia de Tempo**: Automação 24/7
- 💰 **Protege Budget**: Regras evitam desperdício
- 🎯 **Otimização Constante**: Ajustes automáticos

---

## 1️⃣5️⃣ **Reports & Exports** 📄

**Rota**: `/dashboard/relatorios`  
**Objetivo**: Relatórios customizáveis e exportações

### Features Principais
```typescript
interface ReportsExports {
  overview: {
    scheduledReports: number
    lastGenerated: Date
    totalDownloads: number
  }
  
  templates: {
    id: string
    name: string                   // "Relatório Executivo Mensal"
    type: 'executive' | 'performance' | 'financial' | 'custom'
    frequency: 'daily' | 'weekly' | 'monthly' | 'on_demand'
    sections: {
      name: string                 // "Campaign Performance"
      metrics: string[]
      visualizations: ('table' | 'chart' | 'gauge')[]
    }[]
    recipients: {
      email: string
      name: string
      role: string
    }[]
    format: 'pdf' | 'excel' | 'powerpoint' | 'google_sheets'
    lastSent: Date
    nextScheduled: Date
  }[]
  
  customReports: {
    id: string
    name: string
    dateRange: {
      start: Date
      end: Date
      preset: 'last_7_days' | 'last_month' | 'custom'
    }
    metrics: {
      category: string
      metrics: string[]
    }[]
    filters: {
      campaigns: string[]
      platforms: string[]
      devices: string[]
      locations: string[]
    }
    groupBy: 'campaign' | 'platform' | 'device' | 'day'
    comparisons: {
      type: 'previous_period' | 'year_over_year' | 'custom'
      enabled: boolean
    }
  }[]
  
  exports: {
    format: 'csv' | 'excel' | 'pdf' | 'google_sheets'
    scope: 'all_data' | 'current_view' | 'selected'
    options: {
      includeCharts: boolean
      includeRawData: boolean
      includeInsights: boolean
      includeRecommendations: boolean
    }
  }
  
  dashboards: {
    id: string
    name: string                   // "CEO Dashboard"
    widgets: {
      type: 'metric' | 'chart' | 'table' | 'goal'
      position: { x: number, y: number }
      size: { width: number, height: number }
      data: any
    }[]
    sharedWith: {
      email: string
      permission: 'view' | 'edit'
    }[]
    publicLink: string | null
    refreshInterval: number        // minutos
  }[]
  
  snapshots: {
    date: Date
    type: 'scheduled' | 'manual'
    metrics: {
      metric: string
      value: number
    }[]
    notes: string
  }[]
  
  integrations: {
    googleSheets: {
      connected: boolean
      spreadsheetId: string
      autoUpdate: boolean
      frequency: string
    }
    dataStudio: {
      connected: boolean
      reportUrl: string
    }
    powerBI: {
      connected: boolean
    }
  }
}
```

### Componentes Visuais
- ✅ **Templates Library**: Galeria de templates
- ✅ **Report Builder**: Interface drag-and-drop
- ✅ **Preview Panel**: Visualização antes de gerar
- ✅ **Schedule Manager**: Agendar relatórios
- 📧 **Distribution List**: Gerenciar destinatários
- 📊 **Export Options**: Formatos e configurações

### Valor para o Cliente
- 📊 **Relatórios Customizados**: Cria o que precisa
- ⏰ **Automação**: Recebe por email automaticamente
- 🔗 **Integrações**: Conecta com suas ferramentas

---

## 🎯 RESUMO & RECOMENDAÇÕES

### Páginas Essenciais (MVP)
Se precisar priorizar, comece com:
1. ✅ **Campaigns Overview** - Visão geral consolidada
2. ✅ **Ad Performance** - Performance de anúncios
3. ✅ **Budget Management** - Controle financeiro
4. ✅ **Conversions & Attribution** - ROI e atribuição
5. ✅ **Reports & Exports** - Relatórios customizados

### Páginas de Médio Prazo
6. ✅ Audience Insights
7. ✅ Keywords Performance
8. ✅ Landing Pages Analytics
9. ✅ Ad Spend vs Revenue
10. ✅ Retargeting & Remarketing

### Páginas Avançadas
11. ✅ Competitor Analysis
12. ✅ Creative Library
13. ✅ Seasonal & Trends
14. ✅ Mobile vs Desktop
15. ✅ Automation & Rules

---

## 🔧 INTEGRAÇÕES NECESSÁRIAS

```typescript
// APIs Principais
- Google Ads API
- Meta Business Suite API (Facebook/Instagram)
- LinkedIn Campaign Manager API
- TikTok Ads API
- Google Analytics 4 API

// Ferramentas Complementares
- SEMrush/Ahrefs API (Competitor intel)
- Hotjar/Crazy Egg (Heatmaps)
- CallRail (Call tracking)
- Segment/Mixpanel (Event tracking)
- Stripe/Payment Gateway (Revenue attribution)
```

---

**Próximo**: Criar páginas que integram Web Dev + Tráfego 🚀
