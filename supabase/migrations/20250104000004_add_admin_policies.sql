-- Migration: Add Admin Role-Based Policies
-- Description: Adiciona policies específicas para admins acessarem todos os dados
-- Date: 2025-10-04

-- ============================================
-- CLIENTS TABLE - ADMIN POLICIES
-- ============================================

-- Admins podem ver todos os clientes
CREATE POLICY "Admins can view all clients"
    ON public.clients
    FOR SELECT
    USING (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- Admins podem inserir clientes para qualquer usuário
CREATE POLICY "Admins can insert any client"
    ON public.clients
    FOR INSERT
    WITH CHECK (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- Admins podem atualizar qualquer cliente
CREATE POLICY "Admins can update all clients"
    ON public.clients
    FOR UPDATE
    USING (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- Admins podem deletar qualquer cliente
CREATE POLICY "Admins can delete all clients"
    ON public.clients
    FOR DELETE
    USING (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- ============================================
-- TASKS TABLE - ADMIN POLICIES
-- ============================================

-- Admins podem ver todas as tarefas
CREATE POLICY "Admins can view all tasks"
    ON public.tasks
    FOR SELECT
    USING (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- Admins podem inserir tarefas para qualquer usuário
CREATE POLICY "Admins can insert any task"
    ON public.tasks
    FOR INSERT
    WITH CHECK (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- Admins podem atualizar qualquer tarefa
CREATE POLICY "Admins can update all tasks"
    ON public.tasks
    FOR UPDATE
    USING (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- Admins podem deletar qualquer tarefa
CREATE POLICY "Admins can delete all tasks"
    ON public.tasks
    FOR DELETE
    USING (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- ============================================
-- LEADS TABLE - ADMIN POLICIES
-- ============================================

-- Admins podem atualizar qualquer lead
CREATE POLICY "Admins can update all leads"
    ON public.leads
    FOR UPDATE
    USING (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- Admins podem deletar qualquer lead
CREATE POLICY "Admins can delete all leads"
    ON public.leads
    FOR DELETE
    USING (
        (auth.jwt() ->> 'role')::text = 'admin'
    );

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON POLICY "Admins can view all clients" ON public.clients IS 
'Permite que administradores vejam todos os clientes do sistema, independente de quem criou';

COMMENT ON POLICY "Admins can view all tasks" ON public.tasks IS 
'Permite que administradores vejam todas as tarefas do sistema, independente de quem criou ou está atribuída';

COMMENT ON POLICY "Admins can update all leads" ON public.leads IS 
'Permite que administradores gerenciem todos os leads do sistema';
