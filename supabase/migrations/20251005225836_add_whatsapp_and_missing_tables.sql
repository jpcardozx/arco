-- Migration: Add WhatsApp tables and other missing tables
-- Created: 2025-10-05

-- =====================================================
-- WHATSAPP CONTACTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.whatsapp_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Contact Information
    phone_number TEXT NOT NULL,
    name TEXT NOT NULL,
    profile_picture_url TEXT,
    
    -- WhatsApp Status
    whatsapp_status TEXT DEFAULT 'active', -- active, blocked, unsubscribed
    is_business BOOLEAN DEFAULT false,
    business_name TEXT,
    
    -- Metadata
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    is_favorite BOOLEAN DEFAULT false,
    
    -- Interaction Stats
    last_message_at TIMESTAMPTZ,
    total_messages INTEGER DEFAULT 0,
    unread_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_user_phone UNIQUE(user_id, phone_number)
);

-- =====================================================
-- WHATSAPP MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    contact_id UUID NOT NULL REFERENCES public.whatsapp_contacts(id) ON DELETE CASCADE,
    
    -- Message Content
    message_type TEXT NOT NULL DEFAULT 'text', -- text, image, video, audio, document, location
    content TEXT NOT NULL,
    media_url TEXT,
    media_type TEXT, -- mime type
    
    -- Message Direction & Status
    direction TEXT NOT NULL, -- inbound, outbound
    status TEXT DEFAULT 'pending', -- pending, sent, delivered, read, failed
    
    -- WhatsApp Metadata
    whatsapp_message_id TEXT UNIQUE,
    reply_to_message_id UUID REFERENCES public.whatsapp_messages(id),
    
    -- Timestamps
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    delivered_at TIMESTAMPTZ,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Indexes for performance
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id),
    CONSTRAINT fk_contact FOREIGN KEY (contact_id) REFERENCES public.whatsapp_contacts(id)
);

-- =====================================================
-- CLIENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Client Information
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    website TEXT,
    
    -- Business Details
    industry TEXT,
    company_size TEXT, -- small, medium, large, enterprise
    
    -- Relationship Status
    status TEXT DEFAULT 'active', -- active, inactive, prospect, churned
    tier TEXT DEFAULT 'free', -- free, basic, pro, enterprise
    
    -- Contact Info
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'BR',
    postal_code TEXT,
    
    -- Financial
    monthly_value DECIMAL(10,2),
    lifetime_value DECIMAL(10,2) DEFAULT 0,
    
    -- Metadata
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    
    -- Timestamps
    onboarded_at TIMESTAMPTZ,
    last_contact_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT unique_user_client_email UNIQUE(user_id, email)
);

-- =====================================================
-- TASKS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Task Information
    title TEXT NOT NULL,
    description TEXT,
    
    -- Organization
    status TEXT DEFAULT 'todo', -- todo, in_progress, done, cancelled
    priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
    category TEXT, -- marketing, development, client_work, admin, etc
    
    -- Relationships
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    -- Time Management
    due_date TIMESTAMPTZ,
    estimated_hours DECIMAL(5,2),
    actual_hours DECIMAL(5,2),
    
    -- Progress
    completed_at TIMESTAMPTZ,
    
    -- Metadata
    tags TEXT[] DEFAULT '{}',
    attachments JSONB DEFAULT '[]',
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================

-- WhatsApp Contacts Indexes
CREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_user_id ON public.whatsapp_contacts(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_phone ON public.whatsapp_contacts(phone_number);
CREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_favorite ON public.whatsapp_contacts(user_id, is_favorite) WHERE is_favorite = true;
CREATE INDEX IF NOT EXISTS idx_whatsapp_contacts_updated ON public.whatsapp_contacts(updated_at DESC);

-- WhatsApp Messages Indexes
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_user_id ON public.whatsapp_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_contact_id ON public.whatsapp_messages(contact_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_sent_at ON public.whatsapp_messages(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_status ON public.whatsapp_messages(status) WHERE status != 'delivered';
CREATE INDEX IF NOT EXISTS idx_whatsapp_messages_direction ON public.whatsapp_messages(direction, sent_at DESC);

-- Clients Indexes
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_tier ON public.clients(tier);
CREATE INDEX IF NOT EXISTS idx_clients_company ON public.clients(company);
CREATE INDEX IF NOT EXISTS idx_clients_updated ON public.clients(updated_at DESC);

-- Tasks Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON public.tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date) WHERE status != 'done' AND status != 'cancelled';
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON public.tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_client_id ON public.tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON public.tasks(assigned_to);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.whatsapp_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- WhatsApp Contacts Policies
CREATE POLICY "Users can view their own WhatsApp contacts"
    ON public.whatsapp_contacts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own WhatsApp contacts"
    ON public.whatsapp_contacts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own WhatsApp contacts"
    ON public.whatsapp_contacts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own WhatsApp contacts"
    ON public.whatsapp_contacts FOR DELETE
    USING (auth.uid() = user_id);

-- WhatsApp Messages Policies
CREATE POLICY "Users can view their own WhatsApp messages"
    ON public.whatsapp_messages FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own WhatsApp messages"
    ON public.whatsapp_messages FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own WhatsApp messages"
    ON public.whatsapp_messages FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own WhatsApp messages"
    ON public.whatsapp_messages FOR DELETE
    USING (auth.uid() = user_id);

-- Clients Policies
CREATE POLICY "Users can view their own clients"
    ON public.clients FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own clients"
    ON public.clients FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own clients"
    ON public.clients FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own clients"
    ON public.clients FOR DELETE
    USING (auth.uid() = user_id);

-- Tasks Policies
CREATE POLICY "Users can view their own tasks"
    ON public.tasks FOR SELECT
    USING (auth.uid() = user_id OR auth.uid() = assigned_to);

CREATE POLICY "Users can create their own tasks"
    ON public.tasks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
    ON public.tasks FOR UPDATE
    USING (auth.uid() = user_id OR auth.uid() = assigned_to);

CREATE POLICY "Users can delete their own tasks"
    ON public.tasks FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- WhatsApp Contacts
CREATE OR REPLACE FUNCTION update_whatsapp_contacts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_whatsapp_contacts_updated_at
    BEFORE UPDATE ON public.whatsapp_contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_whatsapp_contacts_updated_at();

-- Clients
CREATE OR REPLACE FUNCTION update_clients_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_clients_updated_at
    BEFORE UPDATE ON public.clients
    FOR EACH ROW
    EXECUTE FUNCTION update_clients_updated_at();

-- Tasks
CREATE OR REPLACE FUNCTION update_tasks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tasks_updated_at
    BEFORE UPDATE ON public.tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_tasks_updated_at();

-- =====================================================
-- TRIGGER FOR MESSAGE COUNT
-- =====================================================

CREATE OR REPLACE FUNCTION update_contact_message_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.whatsapp_contacts
        SET 
            total_messages = total_messages + 1,
            last_message_at = NEW.sent_at,
            unread_count = CASE 
                WHEN NEW.direction = 'inbound' THEN unread_count + 1
                ELSE unread_count
            END
        WHERE id = NEW.contact_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_contact_message_stats
    AFTER INSERT ON public.whatsapp_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_message_stats();

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.whatsapp_contacts IS 'WhatsApp business contacts for each user';
COMMENT ON TABLE public.whatsapp_messages IS 'WhatsApp message history with delivery tracking';
COMMENT ON TABLE public.clients IS 'Client/customer management table';
COMMENT ON TABLE public.tasks IS 'Task management system with project and client relationships';
