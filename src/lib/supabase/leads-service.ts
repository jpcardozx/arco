/**
 * Leads Service - Supabase Implementation
 *
 * Serviço real para gerenciamento de leads usando Supabase
 * Segue padrões de arquitetura limpa com RLS (Row Level Security)
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lead, LeadInput, LeadUpdate } from '@/lib/types/supabase-helpers';

// Re-export types for external use
export type { Lead, LeadInput, LeadUpdate } from '@/lib/types/supabase-helpers';

export class LeadsService {
  /**
   * Busca todos os leads do usuário autenticado
   * RLS garante que apenas leads do usuário sejam retornados
   */
  static async getLeads(supabase: SupabaseClient): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(this.mapToLead);
  }

  /**
   * Busca um lead específico por ID
   */
  static async getLead(supabase: SupabaseClient, id: string): Promise<Lead | null> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data ? this.mapToLead(data) : null;
  }

  /**
   * Cria um novo lead
   */
  static async createLead(
    supabase: SupabaseClient,
    input: LeadInput
  ): Promise<Lead> {
    const leadData = {
      name: input.name,
      email: input.email,
      phone: input.phone,
      source: input.source,
      status: input.status || 'new',
      notes: input.notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) throw error;

    return this.mapToLead(data);
  }

  /**
   * Atualiza um lead existente
   */
  static async updateLead(
    supabase: SupabaseClient,
    id: string,
    updates: LeadUpdate
  ): Promise<Lead> {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.source !== undefined) updateData.source = updates.source;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.notes !== undefined) updateData.notes = updates.notes;

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return this.mapToLead(data);
  }

  /**
   * Deleta um lead
   */
  static async deleteLead(supabase: SupabaseClient, id: string): Promise<void> {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Converte lead em cliente
   */
  static async convertToClient(supabase: SupabaseClient, id: string): Promise<void> {
    await this.updateLead(supabase, id, { status: 'converted' });
  }

  /**
   * Retorna estatísticas dos leads
   */
  static async getLeadStats(supabase: SupabaseClient): Promise<{
    total: number;
    new: number;
    contacted: number;
    qualified: number;
    converted: number;
    lost: number;
    conversion_rate: number;
  }> {
    const leads = await this.getLeads(supabase);

    const stats = {
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      qualified: leads.filter(l => l.status === 'qualified').length,
      converted: leads.filter(l => l.status === 'converted').length,
      lost: leads.filter(l => l.status === 'lost').length,
      conversion_rate: 0,
    };

    stats.conversion_rate = stats.total > 0
      ? (stats.converted / stats.total) * 100
      : 0;

    return stats;
  }

  /**
   * Mapeia dados do Supabase para tipo Lead
   * Converte snake_case para camelCase e garante tipos corretos
   */
  private static mapToLead(data: any): Lead {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      source: data.source,
      status: data.status,
      priority: data.priority,
      interest_type: data.interest_type,
      notes: data.notes,
      // company: mappedLead.company,
      assigned_to: data.assigned_to || null,
      budget_max: data.budget_max || null,
      budget_min: data.budget_min || null,
      last_contact: data.last_contact || null,
      next_follow_up: data.next_follow_up || null,
      preferred_location: data.preferred_location || null,
      lead_score: data.lead_score || null,
      metadata: data.metadata || null,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }
}
