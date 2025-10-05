/**
 * Clients Service - Supabase Implementation
 *
 * Serviço real para gerenciamento de clientes usando Supabase
 * Segue padrões de arquitetura limpa com RLS (Row Level Security)
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Client, ClientInput, ClientUpdate } from '@/lib/types/supabase-helpers';

export class ClientsService {
  /**
   * Busca todos os clientes do usuário autenticado
   * RLS garante que apenas clientes do usuário sejam retornados
   */
  static async getClients(supabase: SupabaseClient): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(this.mapToClient);
  }

  /**
   * Busca um cliente específico por ID
   */
  static async getClient(supabase: SupabaseClient, id: string): Promise<Client | null> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }

    return data ? this.mapToClient(data) : null;
  }

  /**
   * Cria um novo cliente
   */
  static async createClient(
    supabase: SupabaseClient,
    input: ClientInput
  ): Promise<Client> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Usuário não autenticado');

    const clientData = {
      ...input,
      created_by: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('clients')
      .insert(clientData)
      .select()
      .single();

    if (error) throw error;

    return this.mapToClient(data);
  }

  /**
   * Atualiza um cliente existente
   */
  static async updateClient(
    supabase: SupabaseClient,
    id: string,
    updates: ClientUpdate
  ): Promise<Client> {
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('clients')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return this.mapToClient(data);
  }

  /**
   * Deleta um cliente
   */
  static async deleteClient(supabase: SupabaseClient, id: string): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  /**
   * Gera código único para cliente
   */
  static async generateClientCode(supabase: SupabaseClient): Promise<string> {
    const { count } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true });

    const nextNumber = (count || 0) + 1;
    return `CLI-${nextNumber.toString().padStart(4, '0')}`;
  }

  /**
   * Verifica se código de cliente é único
   */
  static async ensureClientCodeUnique(
    supabase: SupabaseClient,
    code: string
  ): Promise<boolean> {
    const { count } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('client_code', code);

    return (count || 0) === 0;
  }

  /**
   * Retorna estatísticas dos clientes
   */
  static async getClientStats(supabase: SupabaseClient): Promise<{
    total: number;
    active: number;
    leads: number;
    inactive: number;
  }> {
    const clients = await this.getClients(supabase);

    return {
      total: clients.length,
      active: clients.filter(c => c.status === 'active').length,
      leads: clients.filter(c => c.status === 'lead').length,
      inactive: clients.filter(c => c.status === 'inactive').length,
    };
  }

  /**
   * Mapeia dados do Supabase para tipo Client
   * Converte snake_case para camelCase e garante tipos corretos
   */
  private static mapToClient(data: any): Client {
    return {
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      company_name: data.company_name,
      website: data.website,
      status: data.status,
      priority: data.priority,
      client_code: data.client_code,
      assigned_to: data.assigned_to,
      created_by: data.created_by,
      last_contact: data.last_contact,
      next_follow_up: data.next_follow_up,
      service_interest: data.service_interest,
      project_budget: data.project_budget,
      property_type: data.property_type,
      budget_min: data.budget_min,
      budget_max: data.budget_max,
      transaction_type: data.transaction_type,
      // city: mappedClient.city,
      // neighborhood: data.neighborhood,
      notes: data.notes,
      department: data.department || null,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }
}
