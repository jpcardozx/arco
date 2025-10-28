# SEO Local Stack - Setup Guide

**Data:** 27 de outubro de 2025  
**Domínio:** www.consultingarco.com  
**Stack:** 100% Open-Source + APIs gratuitas do Google

---

## 📦 O QUE FOI IMPLEMENTADO

### 1. Sitemap Automático (`next-sitemap`)
✅ **Arquivo:** `next-sitemap.config.js`

**O que faz:**
- Gera `sitemap.xml` automaticamente a cada build
- Gera `robots.txt` com regras corretas
- Prioriza páginas importantes (home, serviços, blog)
- Exclui páginas privadas (/dashboard, /admin)

**Como usar:**
```bash
pnpm build  # Gera sitemap.xml automaticamente
```

**Resultado:**
- `public/sitemap.xml` - Sitemap do site
- `public/robots.txt` - Regras para crawlers

**Validação:**
- Acesse: https://www.consultingarco.com/sitemap.xml (após deploy)
- Submeta no Google Search Console

---

### 2. Schema.org LocalBusiness
✅ **Arquivo:** `src/components/seo/local-business-schema.tsx`

**O que faz:**
- Marca estruturada para Google Maps
- Melhora aparência nos resultados locais
- Rich snippets (estrelas, telefone, horário)

**Integrado em:** `src/app/layout.tsx` (todas as páginas)

**Componentes disponíveis:**
```tsx
<LocalBusinessSchema /> // Já está no layout
<ArticleSchema {...props} /> // Use em blog posts
<FAQSchema items={[...]} /> // Use em páginas com FAQ
<BreadcrumbSchema items={[...]} /> // Use em páginas internas
```

**TODO:** Atualizar dados reais:
1. Abra `src/components/seo/local-business-schema.tsx`
2. Substitua:
   - `telephone: '+55-11-99999-9999'` → Seu telefone real
   - `latitude/longitude` → Coordenadas reais (use Google Maps)
   - `sameAs: []` → Links de redes sociais (Instagram, LinkedIn)

---

### 3. Google Search Console API
✅ **Arquivo:** `src/lib/google-search-console.ts`

**O que faz:**
- Puxa cliques, impressões, CTR, posição média
- Identifica oportunidades (alto impressions, baixo CTR)
- Sincronização diária automática

**Setup necessário (5 passos):**

#### Passo 1: Criar Service Account no Google Cloud
1. Acesse: https://console.cloud.google.com/
2. Crie novo projeto: "ARCO SEO"
3. Vá em: **APIs & Services → Credentials**
4. Clique: **Create Credentials → Service Account**
5. Nome: `arco-seo-service-account`
6. Clique: **Create and Continue**
7. Role: **Project → Editor**
8. Clique: **Done**

#### Passo 2: Baixar Chave JSON
1. Na lista de Service Accounts, clique no email criado
2. Vá em: **Keys → Add Key → Create new key**
3. Tipo: **JSON**
4. Clique: **Create** (baixa arquivo JSON)

#### Passo 3: Ativar Search Console API
1. No Google Cloud Console, vá em: **APIs & Services → Library**
2. Busque: "Google Search Console API"
3. Clique: **Enable**

#### Passo 4: Adicionar Service Account no Search Console
1. Acesse: https://search.google.com/search-console
2. Se ainda não configurou, adicione propriedade: `sc-domain:consultingarco.com`
3. Vá em: **Settings (engrenagem) → Users and permissions**
4. Clique: **Add user**
5. Email: `arco-seo-service-account@arco-seo-XXXXXX.iam.gserviceaccount.com` (copie do JSON)
6. Permission: **Full**
7. Clique: **Add**

#### Passo 5: Configurar Variável de Ambiente
1. Abra o arquivo JSON baixado
2. Copie **TODO O CONTEÚDO** (é um JSON grande)
3. Adicione em `.env.local`:
```bash
GOOGLE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"arco-seo-XXXXX",...}'
```

**IMPORTANTE:** O valor deve ser o JSON completo entre aspas simples.

#### Passo 6: Testar API
```bash
curl -X GET http://localhost:3000/api/seo/sync-daily \
  -H "Authorization: Bearer seu-cron-secret"
```

Se retornar `{ "success": true, "data": {...} }` → ✅ Funcionando!

---

### 4. Cron Job Diário (Sincronização)
✅ **Arquivo:** `src/app/api/seo/sync-daily/route.ts`

**O que faz:**
- Roda todo dia às 6h AM
- Puxa dados do Search Console (últimos 7 dias)
- Salva no Supabase

**Setup no Vercel:**
1. Crie arquivo `vercel.json` na raiz:
```json
{
  "crons": [
    {
      "path": "/api/seo/sync-daily",
      "schedule": "0 6 * * *"
    }
  ]
}
```

2. Adicione variável de ambiente `CRON_SECRET`:
```bash
# .env.local
CRON_SECRET="gere-um-token-aleatorio-seguro-aqui"
```

3. No Vercel Dashboard:
   - Settings → Environment Variables
   - Adicione: `CRON_SECRET` = mesmo valor

**Como testar manualmente:**
```bash
curl -X GET https://www.consultingarco.com/api/seo/sync-daily \
  -H "Authorization: Bearer SEU_CRON_SECRET"
```

---

### 5. Tabelas no Supabase
✅ **Arquivo:** `supabase/migrations/20250127_seo_tracking_tables.sql`

**Tabelas criadas:**
- `search_console_daily` - Dados brutos (keyword, clicks, impressions, CTR, position)
- `seo_metrics_daily` - Métricas agregadas por dia
- `seo_rankings` - Tracking manual de posições (opcional)

**Views criadas:**
- `seo_trends_30d` - Tendências dos últimos 30 dias
- `seo_opportunities` - Top 20 oportunidades (alto impressions, baixo CTR)

**Como aplicar:**
```bash
pnpm db:push
```

Ou execute diretamente no Supabase SQL Editor:
1. Acesse: https://supabase.com/dashboard/project/vkclegvrqprevcdgosan/sql
2. Cole o conteúdo de `supabase/migrations/20250127_seo_tracking_tables.sql`
3. Clique: **Run**

---

## 🎯 PRÓXIMOS PASSOS (Opcional - Week 2+)

### Dashboard de SEO (4h)
Criar página `/dashboard/seo` com:
- Gráfico de cliques/impressões (últimos 30 dias)
- Top 10 keywords por cliques
- Oportunidades de otimização (alto impressions, baixo CTR)
- Posição média por keyword

**Stack para o dashboard:**
```bash
pnpm add recharts  # Já instalado
```

**Exemplo de página:**
```tsx
// src/app/dashboard/seo/page.tsx
import { getRecentSearchAnalytics, aggregateSearchMetrics } from '@/lib/google-search-console';
import { LineChart, Line, XAxis, YAxis } from 'recharts';

export default async function SEODashboard() {
  const data = await getRecentSearchAnalytics('consultingarco.com', 30);
  const metrics = aggregateSearchMetrics(data);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">SEO Analytics</h1>
      
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card>
          <CardTitle>Cliques (30d)</CardTitle>
          <p className="text-4xl font-bold">{metrics.totalClicks}</p>
        </Card>
        {/* ... mais cards */}
      </div>

      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Line dataKey="clicks" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
```

---

### Google Business Profile Automation
**Não use a API oficial** (aprovação demorada).

**Solução recomendada:**
1. **n8n self-hosted** (100% free)
   ```bash
   docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n
   ```

2. **Workflow:**
   - Trigger: Webhook (quando artigo publicado)
   - Action: Google Business Profile → Create Post
   - Dados: Título do artigo + link + imagem

3. **Como usar:**
   - Publique artigo no blog
   - Dispara webhook: `POST https://n8n.seudominio.com/webhook/blog-post`
   - n8n cria post no Google Maps automaticamente

---

### Rank Tracking Local (Scraping)
Se quiser tracking de posições sem API paga:

```bash
pnpm add puppeteer-core chrome-aws-lambda
```

**Implementação:**
```typescript
// src/app/api/seo/track-ranking/route.ts
import puppeteer from 'puppeteer-core';
import chrome from 'chrome-aws-lambda';

export async function POST(request: Request) {
  const { keyword } = await request.json();
  
  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: await chrome.executablePath,
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(`https://www.google.com.br/search?q=${keyword}&num=100`);
  
  const position = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('div.g a'));
    return links.findIndex(l => l.href.includes('consultingarco.com')) + 1;
  });

  await browser.close();
  
  // Salva no Supabase
  await supabase.from('seo_rankings').insert({ keyword, position });
  
  return Response.json({ keyword, position });
}
```

**Custo:** R$0 (mas mais lento que APIs pagas)

---

## 📊 KEYWORDS ALVO (Prioridade)

Com base na estratégia de conteúdo para manicures/salões:

### Alta Prioridade (Implementar primeiro)
1. **"sistema de agendamento para manicure"** - Volume médio, competição baixa
2. **"como conseguir mais clientes para salão"** - Volume alto, competição média
3. **"trinks vs booksy"** - Volume baixo, competição ZERO (oportunidade!)
4. **"como aparecer no google maps salão"** - Volume médio, competição baixa

### Média Prioridade
5. "site para salão de beleza [sua cidade]"
6. "landing page manicure"
7. "sistema de agendamento online salão"

### Long-tail (Menos volume, alta conversão)
8. "quanto custa um site para manicure"
9. "como criar site salão de beleza"
10. "melhor app agendamento salão"

---

## ✅ CHECKLIST DE VALIDAÇÃO

Após setup completo, validar:

### SEO On-Page
- [ ] Sitemap acessível em `https://www.consultingarco.com/sitemap.xml`
- [ ] `robots.txt` acessível
- [ ] Schema.org LocalBusiness presente (use Google Rich Results Test)
- [ ] Meta tags corretas (title, description, og:image)
- [ ] URLs amigáveis (sem caracteres especiais)

### Google Search Console
- [ ] Propriedade configurada (sc-domain:consultingarco.com)
- [ ] Sitemap submetido
- [ ] Service Account adicionada como usuário
- [ ] API retornando dados (teste manual)
- [ ] Cron job rodando diariamente

### Supabase
- [ ] Tabelas criadas (search_console_daily, seo_metrics_daily)
- [ ] RLS habilitado
- [ ] Dados sendo salvos (verifique após 24h do primeiro sync)

### Performance
- [ ] Lighthouse Score > 90 (Performance)
- [ ] Lighthouse Score > 90 (SEO)
- [ ] Core Web Vitals "Good" (LCP, FID, CLS)

---

## 🚨 ERROS COMUNS

### "Unauthorized" ao chamar API
**Causa:** `GOOGLE_SERVICE_ACCOUNT_KEY` malformado  
**Solução:** Certifique que o JSON está completo entre aspas simples

### "Property not found"
**Causa:** Service Account não adicionada no Search Console  
**Solução:** Vá em Search Console → Settings → Users → Add user

### Sitemap não gerado
**Causa:** `postbuild` script não rodou  
**Solução:** Rode `pnpm build` localmente e verifique se `public/sitemap.xml` foi criado

### Cron não roda
**Causa:** Plano Vercel gratuito não suporta crons  
**Solução:** Upgrade para Vercel Pro ($20/mês) OU use GitHub Actions (free)

---

## 📈 EXPECTATIVAS REALISTAS

### Primeiros 30 dias
- ❌ Não espere tráfego orgânico significativo
- ✅ Google começará a indexar suas páginas
- ✅ Sitemap será processado
- ✅ Schema.org melhorará rich snippets

### 60-90 dias
- ✅ Primeiras keywords começam a rankear (posição 20-50)
- ✅ Tráfego orgânico: 10-50 visitantes/mês (se publicar 4-6 artigos)
- ✅ Google Maps: Aparece em buscas locais (se otimizar perfil)

### 6+ meses
- ✅ Keywords alvo em posição 5-15
- ✅ Tráfego orgânico: 100-500 visitantes/mês
- ✅ 1-5 leads orgânicos/mês (se conteúdo for relevante)

**Por isso a recomendação:** Validar funil tripwire PRIMEIRO (R$500-1k em ads) para ter caixa enquanto SEO amadurece.

---

## 🎯 DECISÃO ESTRATÉGICA

Você tem 2 caminhos:

### Opção A: SEO Agora (Paralelo)
- ✅ Implementa setup acima (4-6h)
- ✅ Publica 1 artigo/semana
- ✅ SEO cresce em background
- ❌ Tráfego só em 60-90 dias

### Opção B: SEO Depois (Sequencial)
- ✅ Valida funil tripwire primeiro (Week 2-3)
- ✅ Consegue primeiros clientes pagos
- ✅ Depois implementa SEO (Week 4+)
- ✅ Mais pragmático

**Minha recomendação:** Opção B (SEO depois), EXCETO se você já tem:
- ✅ Caixa para aguentar 3 meses sem receita
- ✅ Tempo para escrever 1 artigo/semana
- ✅ Estratégia de conteúdo definida

**Se não, foque no tripwire primeiro.**

---

**Qual caminho você escolhe?** 🎯
