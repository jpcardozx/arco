-- ============================================
-- FINANCE SYSTEM - Complete Implementation
-- ============================================
-- Migration: add_finance_system
-- Created: 2025-10-05
-- Description: Invoices, transactions, commissions with RLS
-- ============================================

-- ============================================
-- 1. INVOICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    
    -- Invoice Details
    invoice_number TEXT UNIQUE NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'BRL',
    
    -- Status & Dates
    status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, overdue, cancelled
    due_date TIMESTAMPTZ NOT NULL,
    paid_at TIMESTAMPTZ,
    
    -- Payment
    payment_method TEXT, -- pix, bank_transfer, credit_card, boleto, cash
    payment_reference TEXT,
    
    -- Additional Info
    description TEXT,
    notes TEXT,
    items JSONB DEFAULT '[]', -- Line items array
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_amount CHECK (amount > 0),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'paid', 'overdue', 'cancelled'))
);

-- ============================================
-- 2. TRANSACTIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Transaction Details
    type TEXT NOT NULL, -- income, expense, commission
    category TEXT NOT NULL, -- venda, locacao, marketing, operacional, etc
    description TEXT NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    currency TEXT DEFAULT 'BRL',
    
    -- Status & Date
    status TEXT NOT NULL DEFAULT 'completed', -- pending, completed, cancelled
    transaction_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Payment
    payment_method TEXT, -- pix, bank_transfer, credit_card, boleto, cash
    payment_reference TEXT,
    
    -- Relationships
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    
    -- Additional Info
    notes TEXT,
    attachments JSONB DEFAULT '[]', -- Array of file references
    tags TEXT[] DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_amount CHECK (amount != 0),
    CONSTRAINT valid_type CHECK (type IN ('income', 'expense', 'commission')),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'completed', 'cancelled'))
);

-- ============================================
-- 3. COMMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.commissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Commission Details
    agent_id UUID NOT NULL REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    transaction_id UUID REFERENCES public.transactions(id) ON DELETE SET NULL,
    
    -- Amounts
    base_amount DECIMAL(12,2) NOT NULL, -- Valor base para cálculo
    percentage DECIMAL(5,2) NOT NULL, -- Percentual de comissão
    amount DECIMAL(12,2) NOT NULL, -- Valor final da comissão
    currency TEXT DEFAULT 'BRL',
    
    -- Status
    status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, paid, cancelled
    
    -- Payment
    payment_date TIMESTAMPTZ,
    payment_method TEXT,
    payment_reference TEXT,
    
    -- Additional Info
    description TEXT,
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_amounts CHECK (base_amount > 0 AND amount > 0),
    CONSTRAINT valid_percentage CHECK (percentage >= 0 AND percentage <= 100),
    CONSTRAINT valid_status CHECK (status IN ('pending', 'approved', 'paid', 'cancelled'))
);

-- ============================================
-- 4. FINANCIAL_CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.financial_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Category Details
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- income, expense
    color TEXT DEFAULT '#6366f1',
    icon TEXT DEFAULT 'dollar-sign',
    
    -- Stats
    transaction_count INTEGER DEFAULT 0,
    total_amount DECIMAL(12,2) DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_user_category UNIQUE(user_id, name),
    CONSTRAINT valid_type CHECK (type IN ('income', 'expense'))
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Invoices
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON public.invoices(due_date) WHERE status != 'paid' AND status != 'cancelled';
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON public.invoices(created_at DESC);

-- Transactions
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON public.transactions(category);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON public.transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON public.transactions(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_invoice_id ON public.transactions(invoice_id);
CREATE INDEX IF NOT EXISTS idx_transactions_client_id ON public.transactions(client_id);

-- Commissions
CREATE INDEX IF NOT EXISTS idx_commissions_user_id ON public.commissions(user_id);
CREATE INDEX IF NOT EXISTS idx_commissions_agent_id ON public.commissions(agent_id);
CREATE INDEX IF NOT EXISTS idx_commissions_transaction_id ON public.commissions(transaction_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON public.commissions(status);
CREATE INDEX IF NOT EXISTS idx_commissions_created_at ON public.commissions(created_at DESC);

-- Categories
CREATE INDEX IF NOT EXISTS idx_financial_categories_user_id ON public.financial_categories(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_categories_type ON public.financial_categories(type);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_categories ENABLE ROW LEVEL SECURITY;

-- Invoices Policies
CREATE POLICY "Users can view own invoices"
    ON public.invoices FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own invoices"
    ON public.invoices FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own invoices"
    ON public.invoices FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own invoices"
    ON public.invoices FOR DELETE
    USING (auth.uid() = user_id);

-- Transactions Policies
CREATE POLICY "Users can view own transactions"
    ON public.transactions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own transactions"
    ON public.transactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions"
    ON public.transactions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions"
    ON public.transactions FOR DELETE
    USING (auth.uid() = user_id);

-- Commissions Policies
CREATE POLICY "Users can view commissions they manage"
    ON public.commissions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Agents can view their own commissions"
    ON public.commissions FOR SELECT
    USING (auth.uid() = agent_id);

CREATE POLICY "Users can create commissions"
    ON public.commissions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update commissions they manage"
    ON public.commissions FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete commissions they manage"
    ON public.commissions FOR DELETE
    USING (auth.uid() = user_id);

-- Financial Categories Policies
CREATE POLICY "Users can view own categories"
    ON public.financial_categories FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create own categories"
    ON public.financial_categories FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own categories"
    ON public.financial_categories FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own categories"
    ON public.financial_categories FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- Invoices
CREATE OR REPLACE FUNCTION update_invoices_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_invoices_updated_at
    BEFORE UPDATE ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION update_invoices_updated_at();

-- Transactions
CREATE OR REPLACE FUNCTION update_transactions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_transactions_updated_at
    BEFORE UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_transactions_updated_at();

-- Commissions
CREATE OR REPLACE FUNCTION update_commissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_commissions_updated_at
    BEFORE UPDATE ON public.commissions
    FOR EACH ROW
    EXECUTE FUNCTION update_commissions_updated_at();

-- Categories
CREATE OR REPLACE FUNCTION update_financial_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_financial_categories_updated_at
    BEFORE UPDATE ON public.financial_categories
    FOR EACH ROW
    EXECUTE FUNCTION update_financial_categories_updated_at();

-- ============================================
-- TRIGGER FOR CATEGORY STATS
-- ============================================

CREATE OR REPLACE FUNCTION update_category_stats()
RETURNS TRIGGER AS $$
DECLARE
    category_record RECORD;
BEGIN
    -- Update stats when transaction is inserted or updated
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Find or create category
        SELECT * INTO category_record
        FROM public.financial_categories
        WHERE user_id = NEW.user_id 
        AND name = NEW.category
        AND type = CASE WHEN NEW.type = 'expense' THEN 'expense' ELSE 'income' END
        LIMIT 1;
        
        IF NOT FOUND THEN
            INSERT INTO public.financial_categories (user_id, name, type)
            VALUES (
                NEW.user_id, 
                NEW.category, 
                CASE WHEN NEW.type = 'expense' THEN 'expense' ELSE 'income' END
            );
        END IF;
        
        -- Recalculate stats
        UPDATE public.financial_categories
        SET 
            transaction_count = (
                SELECT COUNT(*) FROM public.transactions 
                WHERE user_id = NEW.user_id 
                AND category = NEW.category
                AND status = 'completed'
            ),
            total_amount = (
                SELECT COALESCE(SUM(amount), 0) FROM public.transactions 
                WHERE user_id = NEW.user_id 
                AND category = NEW.category
                AND status = 'completed'
            )
        WHERE user_id = NEW.user_id AND name = NEW.category;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_category_stats
    AFTER INSERT OR UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_category_stats();

-- ============================================
-- TRIGGER FOR INVOICE STATUS AUTO-UPDATE
-- ============================================

CREATE OR REPLACE FUNCTION auto_update_invoice_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-mark as overdue if past due date
    UPDATE public.invoices
    SET status = 'overdue'
    WHERE status = 'pending'
    AND due_date < NOW()
    AND user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_update_invoice_status
    AFTER INSERT ON public.invoices
    FOR EACH ROW
    EXECUTE FUNCTION auto_update_invoice_status();

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Get financial summary for user
CREATE OR REPLACE FUNCTION get_financial_summary(
    p_user_id UUID,
    p_period TEXT DEFAULT '30d'
)
RETURNS TABLE(
    total_income DECIMAL,
    total_expenses DECIMAL,
    total_commissions DECIMAL,
    net_profit DECIMAL,
    pending_payments DECIMAL,
    transaction_count INTEGER
) AS $$
DECLARE
    period_start TIMESTAMPTZ;
BEGIN
    -- Calculate period start
    period_start := CASE
        WHEN p_period = '7d' THEN NOW() - INTERVAL '7 days'
        WHEN p_period = '30d' THEN NOW() - INTERVAL '30 days'
        WHEN p_period = '90d' THEN NOW() - INTERVAL '90 days'
        WHEN p_period = '1y' THEN NOW() - INTERVAL '1 year'
        ELSE NOW() - INTERVAL '30 days'
    END;
    
    RETURN QUERY
    SELECT
        COALESCE(SUM(CASE WHEN t.type = 'income' AND t.status = 'completed' THEN t.amount ELSE 0 END), 0) as total_income,
        COALESCE(SUM(CASE WHEN t.type = 'expense' AND t.status = 'completed' THEN t.amount ELSE 0 END), 0) as total_expenses,
        COALESCE(SUM(CASE WHEN t.type = 'commission' AND t.status = 'completed' THEN t.amount ELSE 0 END), 0) as total_commissions,
        COALESCE(
            SUM(CASE WHEN t.type = 'income' AND t.status = 'completed' THEN t.amount ELSE 0 END) -
            SUM(CASE WHEN t.type = 'expense' AND t.status = 'completed' THEN t.amount ELSE 0 END) -
            SUM(CASE WHEN t.type = 'commission' AND t.status = 'completed' THEN t.amount ELSE 0 END),
            0
        ) as net_profit,
        COALESCE(SUM(CASE WHEN t.status = 'pending' THEN t.amount ELSE 0 END), 0) as pending_payments,
        COUNT(*)::INTEGER as transaction_count
    FROM public.transactions t
    WHERE t.user_id = p_user_id
    AND t.transaction_date >= period_start;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SEED DEFAULT CATEGORIES
-- ============================================

CREATE OR REPLACE FUNCTION seed_default_financial_categories(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
    -- Income categories
    INSERT INTO public.financial_categories (user_id, name, type, color, icon)
    VALUES
        (p_user_id, 'Venda', 'income', '#10b981', 'trending-up'),
        (p_user_id, 'Locação', 'income', '#3b82f6', 'home'),
        (p_user_id, 'Consultoria', 'income', '#8b5cf6', 'briefcase'),
        (p_user_id, 'Outros Recebimentos', 'income', '#6366f1', 'dollar-sign')
    ON CONFLICT (user_id, name) DO NOTHING;
    
    -- Expense categories
    INSERT INTO public.financial_categories (user_id, name, type, color, icon)
    VALUES
        (p_user_id, 'Marketing', 'expense', '#ef4444', 'megaphone'),
        (p_user_id, 'Operacional', 'expense', '#f59e0b', 'settings'),
        (p_user_id, 'Pessoal', 'expense', '#ec4899', 'users'),
        (p_user_id, 'Tecnologia', 'expense', '#06b6d4', 'cpu'),
        (p_user_id, 'Outros Gastos', 'expense', '#64748b', 'minus-circle')
    ON CONFLICT (user_id, name) DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE public.invoices IS 'Financial invoices with payment tracking';
COMMENT ON TABLE public.transactions IS 'All financial transactions (income, expense, commission)';
COMMENT ON TABLE public.commissions IS 'Commission payments to agents';
COMMENT ON TABLE public.financial_categories IS 'Custom financial categories per user';
COMMENT ON FUNCTION get_financial_summary IS 'Get financial summary for a user in a given period';
COMMENT ON FUNCTION seed_default_financial_categories IS 'Create default categories for new users';
