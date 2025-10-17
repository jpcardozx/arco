-- ============================================================================
-- SQL INTELIGENTE PARA CORRIGIR CAMPOS FALTANTES
-- Este script VERIFICA o que existe antes de criar/modificar
-- Execute este script no Dashboard do Supabase (SQL Editor)
-- Depois rode: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/supabase/database.types.ts
-- ============================================================================

-- Limpar funções antigas se existirem
DROP FUNCTION IF EXISTS table_exists(text);
DROP FUNCTION IF EXISTS column_exists(text, text);

-- Função helper para verificar se tabela existe
CREATE FUNCTION table_exists(p_table_name text) 
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND information_schema.tables.table_name = p_table_name
    );
END;
$$ LANGUAGE plpgsql;

-- Função helper para verificar se coluna existe
CREATE FUNCTION column_exists(p_table_name text, p_column_name text) 
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND information_schema.columns.table_name = p_table_name
        AND information_schema.columns.column_name = p_column_name
    );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- DIAGNÓSTICO: Verificar o que já existe
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE '=== DIAGNÓSTICO DE TABELAS ===';
    
    IF table_exists('user_profiles') THEN
        RAISE NOTICE '✅ user_profiles existe';
        IF column_exists('user_profiles', 'role') THEN
            RAISE NOTICE '  ✅ user_profiles.role existe';
        ELSE
            RAISE NOTICE '  ❌ user_profiles.role NÃO existe - será criado';
        END IF;
        
        IF column_exists('user_profiles', 'email') THEN
            RAISE NOTICE '  ✅ user_profiles.email existe';
        ELSE
            RAISE NOTICE '  ❌ user_profiles.email NÃO existe - será criado';
        END IF;
    ELSE
        RAISE NOTICE '❌ user_profiles NÃO existe - tabela crítica ausente!';
    END IF;
    
    IF table_exists('consultant_availability') THEN
        RAISE NOTICE '✅ consultant_availability existe';
        IF column_exists('consultant_availability', 'max_bookings_per_slot') THEN
            RAISE NOTICE '  ✅ consultant_availability.max_bookings_per_slot existe';
        ELSE
            RAISE NOTICE '  ❌ consultant_availability.max_bookings_per_slot NÃO existe - será criado';
        END IF;
    ELSE
        RAISE NOTICE '❌ consultant_availability NÃO existe - será criada';
    END IF;
    
    IF table_exists('discount_codes') THEN
        RAISE NOTICE '✅ discount_codes existe';
        IF column_exists('discount_codes', 'description') THEN
            RAISE NOTICE '  ✅ discount_codes.description existe';
        ELSE
            RAISE NOTICE '  ❌ discount_codes.description NÃO existe - será criado';
        END IF;
    ELSE
        RAISE NOTICE '❌ discount_codes NÃO existe - será criada';
    END IF;
    
    IF table_exists('analytics_events') THEN
        RAISE NOTICE '✅ analytics_events existe';
    ELSE
        RAISE NOTICE '❌ analytics_events NÃO existe - será criada';
    END IF;
    
    IF table_exists('qualification_responses') THEN
        RAISE NOTICE '✅ qualification_responses existe';
    ELSE
        RAISE NOTICE '❌ qualification_responses NÃO existe - será criada';
    END IF;
    
    RAISE NOTICE '=== FIM DO DIAGNÓSTICO ===';
END $$;

-- 1. ESTRATÉGICO: Adicionar campo 'role' na tabela user_profiles (se não existir)
-- ============================================================================
DO $$ 
BEGIN
    IF table_exists('user_profiles') AND NOT column_exists('user_profiles', 'role') THEN
        RAISE NOTICE 'Adicionando coluna role à tabela user_profiles...';
        ALTER TABLE public.user_profiles 
        ADD COLUMN role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'manager', 'consultant'));
        
        COMMENT ON COLUMN public.user_profiles.role IS 'User role for access control';
        RAISE NOTICE '✅ Coluna role adicionada com sucesso';
    ELSIF table_exists('user_profiles') AND column_exists('user_profiles', 'role') THEN
        RAISE NOTICE '⏭️  Coluna user_profiles.role já existe - pulando';
    ELSE
        RAISE NOTICE '⚠️  Tabela user_profiles não existe - não é possível adicionar role';
    END IF;
END $$;

-- 2. ESTRATÉGICO: Adicionar campo 'email' na tabela user_profiles (se não existir)
-- ============================================================================
DO $$ 
BEGIN
    IF table_exists('user_profiles') AND NOT column_exists('user_profiles', 'email') THEN
        RAISE NOTICE 'Adicionando coluna email à tabela user_profiles...';
        ALTER TABLE public.user_profiles 
        ADD COLUMN email TEXT;
        
        COMMENT ON COLUMN public.user_profiles.email IS 'User email (denormalized from auth.users)';
        
        -- Sync existing emails from auth.users
        RAISE NOTICE 'Sincronizando emails existentes de auth.users...';
        UPDATE public.user_profiles up
        SET email = au.email
        FROM auth.users au
        WHERE up.id = au.id;
        
        RAISE NOTICE '✅ Coluna email adicionada e sincronizada com sucesso';
    ELSIF table_exists('user_profiles') AND column_exists('user_profiles', 'email') THEN
        RAISE NOTICE '⏭️  Coluna user_profiles.email já existe - pulando';
    ELSE
        RAISE NOTICE '⚠️  Tabela user_profiles não existe - não é possível adicionar email';
    END IF;
END $$;

-- 3. Adicionar campo 'max_bookings_per_slot' na tabela consultant_availability (se não existir)
-- ============================================================================
-- MOVIDO PARA SEÇÃO 6 (depois da criação da tabela)

-- 4. ESTRATÉGICO: Verificar/criar tabela discount_codes
-- ============================================================================
DO $$
BEGIN
    IF NOT table_exists('discount_codes') THEN
        RAISE NOTICE 'Criando tabela discount_codes...';
        
        CREATE TABLE public.discount_codes (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            code TEXT UNIQUE NOT NULL,
            description TEXT,
            discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
            discount_value NUMERIC NOT NULL CHECK (discount_value > 0),
            applicable_consultoria_ids UUID[],
            minimum_purchase_cents INTEGER,
            max_uses INTEGER,
            current_uses INTEGER DEFAULT 0,
            is_active BOOLEAN DEFAULT true,
            valid_from TIMESTAMPTZ,
            valid_until TIMESTAMPTZ,
            created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );

        COMMENT ON TABLE public.discount_codes IS 'Discount/coupon codes for consultoria bookings';
        COMMENT ON COLUMN public.discount_codes.code IS 'Unique discount code (uppercase)';
        COMMENT ON COLUMN public.discount_codes.discount_type IS 'Type: percentage or fixed amount';
        COMMENT ON COLUMN public.discount_codes.discount_value IS 'Value: percentage (0-100) or fixed amount in currency';
        COMMENT ON COLUMN public.discount_codes.applicable_consultoria_ids IS 'Array of consultoria type IDs this discount applies to (null = all)';
        
        RAISE NOTICE '✅ Tabela discount_codes criada com sucesso';
    ELSE
        RAISE NOTICE '⏭️  Tabela discount_codes já existe - verificando campos...';
        
        -- Adicionar campo description se não existir (para tabelas já criadas)
        IF NOT column_exists('discount_codes', 'description') THEN
            RAISE NOTICE 'Adicionando coluna description à tabela discount_codes...';
            ALTER TABLE public.discount_codes 
            ADD COLUMN description TEXT;
            
            COMMENT ON COLUMN public.discount_codes.description IS 'Human-readable description of the discount';
            RAISE NOTICE '✅ Coluna description adicionada com sucesso';
        ELSE
            RAISE NOTICE '⏭️  Coluna discount_codes.description já existe';
        END IF;
    END IF;
END $$;

-- 5. ESTRATÉGICO: Verificar/criar tabela analytics_events
-- ============================================================================
DO $$
BEGIN
    IF NOT table_exists('analytics_events') THEN
        RAISE NOTICE 'Criando tabela analytics_events...';
        
        CREATE TABLE public.analytics_events (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            event_type TEXT NOT NULL,
            event_data JSONB,
            user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
            session_id TEXT,
            ip_address TEXT,
            user_agent TEXT,
            referrer TEXT,
            metadata JSONB,
            created_at TIMESTAMPTZ DEFAULT now()
        );

        COMMENT ON TABLE public.analytics_events IS 'Stores analytics and user events';
        COMMENT ON COLUMN public.analytics_events.event_type IS 'Type of event (e.g., page_view, payment_created, etc.)';
        COMMENT ON COLUMN public.analytics_events.event_data IS 'Custom event data as JSON';
        
        RAISE NOTICE '✅ Tabela analytics_events criada com sucesso';
    ELSE
        RAISE NOTICE '⏭️  Tabela analytics_events já existe';
    END IF;
END $$;

-- 6. ESTRATÉGICO: Verificar/criar tabela consultant_availability
-- ============================================================================
DO $$
BEGIN
    IF NOT table_exists('consultant_availability') THEN
        RAISE NOTICE 'Criando tabela consultant_availability...';
        
        -- Verificar se consultoria_types existe antes de criar FK
        IF NOT table_exists('consultoria_types') THEN
            RAISE EXCEPTION 'Tabela consultoria_types não existe. Crie-a primeiro antes de criar consultant_availability.';
        END IF;
        
        CREATE TABLE public.consultant_availability (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            consultoria_type_id UUID NOT NULL REFERENCES public.consultoria_types(id) ON DELETE CASCADE,
            day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
            start_time TIME NOT NULL,
            end_time TIME NOT NULL,
            is_active BOOLEAN DEFAULT true,
            max_bookings_per_slot INTEGER DEFAULT 1 CHECK (max_bookings_per_slot > 0),
            valid_from TIMESTAMPTZ,
            valid_until TIMESTAMPTZ,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );

        COMMENT ON TABLE public.consultant_availability IS 'Defines when consultants are available for bookings';
        COMMENT ON COLUMN public.consultant_availability.day_of_week IS 'Day of week: 0=Sunday, 1=Monday, ..., 6=Saturday';
        COMMENT ON COLUMN public.consultant_availability.max_bookings_per_slot IS 'Maximum number of bookings allowed per time slot';
        
        RAISE NOTICE '✅ Tabela consultant_availability criada com sucesso';
    ELSE
        RAISE NOTICE '⏭️  Tabela consultant_availability já existe - verificando campos...';
        
        -- Adicionar campo max_bookings_per_slot se não existir (para tabelas já criadas)
        IF NOT column_exists('consultant_availability', 'max_bookings_per_slot') THEN
            RAISE NOTICE 'Adicionando coluna max_bookings_per_slot à tabela consultant_availability...';
            ALTER TABLE public.consultant_availability 
            ADD COLUMN max_bookings_per_slot INTEGER DEFAULT 1 CHECK (max_bookings_per_slot > 0);
            
            COMMENT ON COLUMN public.consultant_availability.max_bookings_per_slot IS 'Maximum number of bookings allowed per time slot';
            RAISE NOTICE '✅ Coluna max_bookings_per_slot adicionada com sucesso';
        ELSE
            RAISE NOTICE '⏭️  Coluna consultant_availability.max_bookings_per_slot já existe';
        END IF;
    END IF;
END $$;

-- 7. ESTRATÉGICO: Verificar/criar tabela qualification_responses
-- ============================================================================
DO $$
BEGIN
    IF NOT table_exists('qualification_responses') THEN
        RAISE NOTICE 'Criando tabela qualification_responses...';
        
        -- Verificar se consultoria_types existe antes de criar FK
        IF NOT table_exists('consultoria_types') THEN
            RAISE NOTICE '⚠️  Tabela consultoria_types não existe. Criando qualification_responses sem FK.';
        END IF;
        
        CREATE TABLE public.qualification_responses (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
            session_id TEXT,
            primary_challenge TEXT NOT NULL,
            monthly_budget_range TEXT NOT NULL,
            urgency TEXT NOT NULL,
            company_name TEXT,
            company_size TEXT,
            has_existing_site BOOLEAN,
            has_active_campaigns BOOLEAN,
            additional_info TEXT,
            lead_quality_score INTEGER,
            recommended_consultoria_id UUID,
            ai_insights JSONB,
            status TEXT DEFAULT 'new',
            converted_to_booking BOOLEAN DEFAULT false,
            created_at TIMESTAMPTZ DEFAULT now(),
            updated_at TIMESTAMPTZ DEFAULT now()
        );

        -- Adicionar FK apenas se tabela consultoria_types existir
        IF table_exists('consultoria_types') THEN
            ALTER TABLE public.qualification_responses 
            ADD CONSTRAINT qualification_responses_recommended_consultoria_id_fkey 
            FOREIGN KEY (recommended_consultoria_id) REFERENCES public.consultoria_types(id) ON DELETE SET NULL;
        END IF;

        COMMENT ON TABLE public.qualification_responses IS 'Stores lead qualification responses from the qualification modal';
        COMMENT ON COLUMN public.qualification_responses.lead_quality_score IS 'AI-calculated lead quality score (0-100)';
        
        RAISE NOTICE '✅ Tabela qualification_responses criada com sucesso';
    ELSE
        RAISE NOTICE '⏭️  Tabela qualification_responses já existe';
    END IF;
END $$;

-- 8. Criar ou verificar exports de tipos helper
-- ============================================================================
-- Nota: Estes serão adicionados manualmente ao arquivo database.types.ts após regeneração

-- 9. Verificar permissões RLS nas tabelas
-- ============================================================================

-- consultant_availability
ALTER TABLE public.consultant_availability ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for all users" ON public.consultant_availability;
CREATE POLICY "Enable read access for all users" ON public.consultant_availability
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable write access for authenticated users" ON public.consultant_availability;
CREATE POLICY "Enable write access for authenticated users" ON public.consultant_availability
    FOR ALL USING (auth.uid() IS NOT NULL);

-- consultoria_bookings
ALTER TABLE public.consultoria_bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own bookings" ON public.consultoria_bookings;
CREATE POLICY "Users can view their own bookings" ON public.consultoria_bookings
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (
        SELECT id FROM public.user_profiles WHERE role IN ('admin', 'manager', 'consultant')
    ));

DROP POLICY IF EXISTS "Users can insert their own bookings" ON public.consultoria_bookings;
CREATE POLICY "Users can insert their own bookings" ON public.consultoria_bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own bookings" ON public.consultoria_bookings;
CREATE POLICY "Users can update their own bookings" ON public.consultoria_bookings
    FOR UPDATE USING (auth.uid() = user_id OR auth.uid() IN (
        SELECT id FROM public.user_profiles WHERE role IN ('admin', 'manager', 'consultant')
    ));

-- qualification_responses
ALTER TABLE public.qualification_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.qualification_responses;
CREATE POLICY "Enable read access for authenticated users" ON public.qualification_responses
    FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.qualification_responses;
CREATE POLICY "Enable insert for authenticated users" ON public.qualification_responses
    FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

-- analytics_events
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable insert for all users" ON public.analytics_events;
CREATE POLICY "Enable insert for all users" ON public.analytics_events
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Enable read for admins" ON public.analytics_events;
CREATE POLICY "Enable read for admins" ON public.analytics_events
    FOR SELECT USING (auth.uid() IN (
        SELECT id FROM public.user_profiles WHERE role IN ('admin', 'manager')
    ));

-- discount_codes
ALTER TABLE public.discount_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read for all users" ON public.discount_codes;
CREATE POLICY "Enable read for all users" ON public.discount_codes
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Enable all for admins" ON public.discount_codes;
CREATE POLICY "Enable all for admins" ON public.discount_codes
    FOR ALL USING (auth.uid() IN (
        SELECT id FROM public.user_profiles WHERE role IN ('admin', 'manager')
    ));

-- 7. Criar índices para performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_consultant_availability_day_active 
ON public.consultant_availability(day_of_week, is_active);

CREATE INDEX IF NOT EXISTS idx_consultoria_bookings_user_status 
ON public.consultoria_bookings(user_id, booking_status);

CREATE INDEX IF NOT EXISTS idx_consultoria_bookings_date_time 
ON public.consultoria_bookings(scheduled_date, scheduled_time);

CREATE INDEX IF NOT EXISTS idx_discount_codes_code_active 
ON public.discount_codes(code) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_qualification_responses_user 
ON public.qualification_responses(user_id);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type_user 
ON public.analytics_events(event_type, user_id);

-- 10. Criar trigger para updated_at automático
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger nas tabelas
DROP TRIGGER IF EXISTS update_discount_codes_updated_at ON public.discount_codes;
CREATE TRIGGER update_discount_codes_updated_at 
    BEFORE UPDATE ON public.discount_codes 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_consultant_availability_updated_at ON public.consultant_availability;
CREATE TRIGGER update_consultant_availability_updated_at 
    BEFORE UPDATE ON public.consultant_availability 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_qualification_responses_updated_at ON public.qualification_responses;
CREATE TRIGGER update_qualification_responses_updated_at 
    BEFORE UPDATE ON public.qualification_responses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- FIM DO SCRIPT
-- ============================================================================

-- Após executar este SQL, rode:
-- npx supabase gen types typescript --project-id SEU_PROJECT_ID > src/lib/supabase/database.types.ts
--
-- Depois adicione estas linhas ao final do arquivo database.types.ts:
--
-- export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
-- export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
-- export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
-- export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

-- ============================================================================
-- VERIFICAÇÃO FINAL E CLEANUP
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE '=== VERIFICAÇÃO FINAL ===';
    
    -- Verificar tabelas críticas
    IF table_exists('user_profiles') THEN
        RAISE NOTICE '✅ user_profiles OK';
    ELSE
        RAISE NOTICE '❌ user_profiles AUSENTE - pode causar erros';
    END IF;
    
    IF table_exists('consultoria_types') THEN
        RAISE NOTICE '✅ consultoria_types OK';
    ELSE
        RAISE NOTICE '⚠️  consultoria_types AUSENTE - algumas FK podem falhar';
    END IF;
    
    IF table_exists('consultoria_bookings') THEN
        RAISE NOTICE '✅ consultoria_bookings OK';
    ELSE
        RAISE NOTICE '⚠️  consultoria_bookings AUSENTE - sistema de agendamento pode falhar';
    END IF;
    
    -- Contar tabelas criadas/modificadas
    RAISE NOTICE '=== RESUMO ===';
    RAISE NOTICE 'Tabelas verificadas/criadas: analytics_events, discount_codes, consultant_availability, qualification_responses';
    RAISE NOTICE 'Campos verificados/adicionados: user_profiles.role, user_profiles.email, consultant_availability.max_bookings_per_slot';
    RAISE NOTICE '=== CONCLUÍDO ===';
END $$;

-- Cleanup das funções helper (opcional - manter comentado se quiser reutilizar)
-- DROP FUNCTION IF EXISTS table_exists(text);
-- DROP FUNCTION IF EXISTS column_exists(text, text);

SELECT 'Script executado com sucesso! Agora regenere os tipos do Supabase.' as message;
