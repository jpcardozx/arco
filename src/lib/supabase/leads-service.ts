/**
 * Leads Service - Supabase Implementation
 *
 * Serviço real para gerenciamento de leads usando Supabase
 * Segue padrões de arquitetura limpa com RLS (Row Level Security)
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Lead, LeadInput, LeadUpdate, LeadWithName } from '@/lib/types/supabase-helpers';

// Re-export types for external use
export type { Lead, LeadInput, LeadUpdate, LeadWithName } from '@/lib/types/supabase-helpers';

export class LeadsService {
  /**
   * Busca todos os leads do usuário autenticado
   * RLS garante que apenas leads do usuário sejam retornados
   */
  static async getLeads(supabase: SupabaseClient): Promise<LeadWithName[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(this.mapToLeadWithName);
  }

  /**
   * Busca um lead específico por ID
   */
  static async getLead(supabase: SupabaseClient, id: string): Promise<LeadWithName | null> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data ? this.mapToLeadWithName(data) : null;
  }

  /**
   * Cria um novo lead
   * Aceita tanto LeadInput (com full_name) quanto objeto com 'name' para compatibilidade
   */
  static async createLead(
    supabase: SupabaseClient,
    input: LeadInput | (Omit<LeadInput, 'full_name'> & { name?: string | null })
  ): Promise<LeadWithName> {
    const leadData = {
      full_name: 'full_name' in input ? input.full_name : (input as any).name,
      email: input.email,
      phone: input.phone,
      source: input.source,
      status: input.status || 'new',
      company_name: input.company_name,
      assigned_to: input.assigned_to,
      analysis_id: input.analysis_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) throw error;

    return this.mapToLeadWithName(data);
  }

  /**
   * Atualiza um lead existente
   * Aceita tanto LeadUpdate quanto objeto com 'name' para compatibilidade
   */
  static async updateLead(
    supabase: SupabaseClient,
    id: string,
    updates: LeadUpdate | (Omit<LeadUpdate, 'full_name'> & { name?: string | null })
  ): Promise<LeadWithName> {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    // Mapear 'name' -> 'full_name' para compatibilidade
    if ('name' in updates && updates.name !== undefined) {
      updateData.full_name = updates.name;
    } else if ('full_name' in updates && updates.full_name !== undefined) {
      updateData.full_name = updates.full_name;
    }

    if (updates.email !== undefined) updateData.email = updates.email;
    if (updates.phone !== undefined) updateData.phone = updates.phone;
    if (updates.source !== undefined) updateData.source = updates.source;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.company_name !== undefined) updateData.company_name = updates.company_name;

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return this.mapToLeadWithName(data);
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
   * Mapeia dados do Supabase para tipo LeadWithName
   * Converte full_name -> name para compatibilidade com código existente
   */
  private static mapToLeadWithName(data: any): LeadWithName {
    return {
      id: data.id,
      name: data.full_name,
      email: data.email,
      phone: data.phone,
      source: data.source,
      status: data.status,
      company_name: data.company_name,
      assigned_to: data.assigned_to || null,
      analysis_id: data.analysis_id || null,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }
}
