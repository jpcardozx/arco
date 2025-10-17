-- Quiz Results Table
-- Armazena resultados completos do Quiz de Diagnóstico Estratégico

CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Relacionamento com usuário (opcional - pode ser lead não cadastrado)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Informações de contato
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  phone TEXT,
  
  -- Qualificação do lead
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  lead_score TEXT NOT NULL CHECK (lead_score IN ('cold', 'warm', 'hot', 'qualified')),
  urgency_level TEXT NOT NULL CHECK (urgency_level IN ('low', 'medium', 'high')),
  
  -- Verticais identificadas
  verticals TEXT[] NOT NULL,
  
  -- Dados estruturados (JSONB para flexibilidade)
  responses JSONB NOT NULL, -- Array de QuizResponse
  profile_data JSONB NOT NULL, -- LeadProfile completo
  recommendations JSONB NOT NULL, -- Array de recomendações
  
  -- Metadata
  source TEXT DEFAULT 'quiz-diagnostico-estrategico',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  
  -- Controle de follow-up
  contacted_at TIMESTAMPTZ,
  contacted_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  notes TEXT
);

-- Indexes para performance
CREATE INDEX idx_quiz_results_email ON quiz_results(email);
CREATE INDEX idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_lead_score ON quiz_results(lead_score);
CREATE INDEX idx_quiz_results_created_at ON quiz_results(created_at DESC);
CREATE INDEX idx_quiz_results_status ON quiz_results(status);
CREATE INDEX idx_quiz_results_verticals ON quiz_results USING GIN(verticals);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_quiz_results_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER quiz_results_updated_at
  BEFORE UPDATE ON quiz_results
  FOR EACH ROW
  EXECUTE FUNCTION update_quiz_results_updated_at();

-- RLS Policies
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

-- Usuários veem apenas seus próprios resultados
CREATE POLICY "Users can view own quiz results"
  ON quiz_results
  FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT id FROM auth.users WHERE email = quiz_results.email
  ));

-- Qualquer um pode inserir (leads não autenticados)
CREATE POLICY "Anyone can insert quiz results"
  ON quiz_results
  FOR INSERT
  WITH CHECK (true);

-- Admins veem e editam tudo
CREATE POLICY "Admins can view all quiz results"
  ON quiz_results
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

CREATE POLICY "Admins can update quiz results"
  ON quiz_results
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- View para dashboard de leads
CREATE OR REPLACE VIEW quiz_leads_summary AS
SELECT
  qr.id,
  qr.created_at,
  qr.email,
  qr.name,
  qr.company,
  qr.score,
  qr.lead_score,
  qr.urgency_level,
  qr.verticals,
  qr.status,
  qr.contacted_at,
  up.full_name as contacted_by_name,
  -- Extrai budget range do profile_data
  qr.profile_data->>'monthlyRevenue' as monthly_revenue,
  qr.profile_data->>'companySize' as company_size,
  -- Conta recomendações de alta prioridade
  (
    SELECT COUNT(*)
    FROM jsonb_array_elements(qr.recommendations) as rec
    WHERE rec->>'priority' = 'high'
  ) as high_priority_recommendations
FROM quiz_results qr
LEFT JOIN user_profiles up ON qr.contacted_by = up.id
ORDER BY qr.created_at DESC;

-- Function para buscar leads qualificados não contatados
CREATE OR REPLACE FUNCTION get_qualified_uncontacted_leads()
RETURNS TABLE (
  id UUID,
  email TEXT,
  name TEXT,
  company TEXT,
  score INTEGER,
  urgency_level TEXT,
  days_since_quiz INTEGER,
  verticals TEXT[]
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    qr.id,
    qr.email,
    qr.name,
    qr.company,
    qr.score,
    qr.urgency_level,
    EXTRACT(DAY FROM NOW() - qr.created_at)::INTEGER as days_since_quiz,
    qr.verticals
  FROM quiz_results qr
  WHERE qr.lead_score IN ('hot', 'qualified')
    AND qr.contacted_at IS NULL
    AND qr.status = 'new'
  ORDER BY
    CASE qr.urgency_level
      WHEN 'high' THEN 1
      WHEN 'medium' THEN 2
      ELSE 3
    END,
    qr.score DESC,
    qr.created_at ASC;
END;
$$ LANGUAGE plpgsql;

-- Exemplo de uso:
-- SELECT * FROM get_qualified_uncontacted_leads() LIMIT 10;

COMMENT ON TABLE quiz_results IS 'Resultados do Quiz de Diagnóstico Estratégico - Lead Magnet';
COMMENT ON COLUMN quiz_results.score IS 'Score de qualificação (0-100) baseado nas respostas';
COMMENT ON COLUMN quiz_results.lead_score IS 'Classificação: cold, warm, hot, qualified';
COMMENT ON COLUMN quiz_results.verticals IS 'Array de verticais prioritárias identificadas';
COMMENT ON COLUMN quiz_results.responses IS 'Array completo de QuizResponse (questionId, value, timestamp)';
COMMENT ON COLUMN quiz_results.profile_data IS 'LeadProfile completo com todas as informações extraídas';
COMMENT ON COLUMN quiz_results.recommendations IS 'Array de recomendações personalizadas geradas';
