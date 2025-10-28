-- Tabela para dados diários do Google Search Console
CREATE TABLE IF NOT EXISTS search_console_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL,
  page TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr NUMERIC(8,6) DEFAULT 0,
  position NUMERIC(6,2) DEFAULT 0,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Previne duplicatas (mesma keyword+página+data)
  UNIQUE(keyword, page, date)
);

-- Index para queries rápidas
CREATE INDEX IF NOT EXISTS idx_search_console_date ON search_console_daily (date DESC);
CREATE INDEX IF NOT EXISTS idx_search_console_keyword ON search_console_daily (keyword, date DESC);
CREATE INDEX IF NOT EXISTS idx_search_console_page ON search_console_daily (page, date DESC);

-- Comentários para documentação
COMMENT ON TABLE search_console_daily IS 'Dados brutos do Google Search Console sincronizados diariamente';
COMMENT ON COLUMN search_console_daily.keyword IS 'Palavra-chave que gerou impressão/clique';
COMMENT ON COLUMN search_console_daily.page IS 'URL da página que apareceu nos resultados';
COMMENT ON COLUMN search_console_daily.ctr IS 'Click-through rate (clicks/impressions)';
COMMENT ON COLUMN search_console_daily.position IS 'Posição média nos resultados de busca';

-- Tabela para métricas agregadas diárias
CREATE TABLE IF NOT EXISTS seo_metrics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  total_clicks INTEGER DEFAULT 0,
  total_impressions INTEGER DEFAULT 0,
  avg_ctr NUMERIC(8,6) DEFAULT 0,
  avg_position NUMERIC(6,2) DEFAULT 0,
  date DATE NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index para queries rápidas
CREATE INDEX IF NOT EXISTS idx_seo_metrics_date ON seo_metrics_daily (date DESC);

COMMENT ON TABLE seo_metrics_daily IS 'Métricas agregadas de SEO por dia';

-- Tabela para tracking de rankings (opcional - usar se quiser scraping próprio)
CREATE TABLE IF NOT EXISTS seo_rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL,
  position INTEGER,
  url TEXT NOT NULL,
  location TEXT DEFAULT 'São Paulo, Brazil',
  checked_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Permite apenas 1 registro por keyword+data
  UNIQUE(keyword, url, DATE(checked_at))
);

-- Index para queries rápidas
CREATE INDEX IF NOT EXISTS idx_rankings_date ON seo_rankings (keyword, checked_at DESC);

COMMENT ON TABLE seo_rankings IS 'Tracking manual de posições no Google (via scraping)';

-- View para análise de tendências (últimos 30 dias)
CREATE OR REPLACE VIEW seo_trends_30d AS
SELECT 
  date,
  total_clicks,
  total_impressions,
  avg_ctr,
  avg_position,
  -- Compara com dia anterior
  total_clicks - LAG(total_clicks) OVER (ORDER BY date) AS clicks_change,
  total_impressions - LAG(total_impressions) OVER (ORDER BY date) AS impressions_change,
  avg_position - LAG(avg_position) OVER (ORDER BY date) AS position_change
FROM seo_metrics_daily
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC;

COMMENT ON VIEW seo_trends_30d IS 'Análise de tendências de SEO nos últimos 30 dias';

-- View para identificar oportunidades (alto impressions, baixo CTR)
CREATE OR REPLACE VIEW seo_opportunities AS
SELECT 
  keyword,
  page,
  SUM(clicks) AS total_clicks,
  SUM(impressions) AS total_impressions,
  AVG(ctr) AS avg_ctr,
  AVG(position) AS avg_position
FROM search_console_daily
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
  AND impressions >= 100  -- Mínimo de impressões
  AND ctr < 0.05  -- CTR menor que 5%
  AND position < 20  -- Aparece na primeira/segunda página
GROUP BY keyword, page
ORDER BY total_impressions DESC
LIMIT 20;

COMMENT ON VIEW seo_opportunities IS 'Top 20 oportunidades de otimização (alto impressions, baixo CTR)';

-- RLS (Row Level Security) - Apenas admins podem ver
ALTER TABLE search_console_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_rankings ENABLE ROW LEVEL SECURITY;

-- Policy: Service role tem acesso total
CREATE POLICY "Service role has full access to search_console_daily"
  ON search_console_daily FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role has full access to seo_metrics_daily"
  ON seo_metrics_daily FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role has full access to seo_rankings"
  ON seo_rankings FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Policy: Admins autenticados podem ler (para dashboard)
CREATE POLICY "Authenticated users can read search_console_daily"
  ON search_console_daily FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read seo_metrics_daily"
  ON seo_metrics_daily FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read seo_rankings"
  ON seo_rankings FOR SELECT
  USING (auth.role() = 'authenticated');
