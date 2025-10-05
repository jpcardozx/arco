'use client';

import { useState, useEffect } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import type { User, UseCurrentUserReturn } from '@/lib/types/supabase-helpers';

/**
 * Current User Hook - Supabase Auth Integration
 *
 * Fornece informação do usuário autenticado via Supabase
 * Usa @supabase/ssr para garantir consistência entre servidor e cliente
 */

export function useCurrentUser(): UseCurrentUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const supabase = createSupabaseBrowserClient();

      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!authUser) {
        setUser(null);
        setError(null);
        return;
      }

      // Mapeia dados do Supabase Auth para nosso tipo User
      const mappedUser: User = {
        id: authUser.id,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Usuário',
        full_name: authUser.user_metadata?.full_name,
        email: authUser.email || '',
        role: authUser.user_metadata?.role || 'user',
        avatar: authUser.user_metadata?.avatar_url,
        company: authUser.user_metadata?.company,
        phone: authUser.user_metadata?.phone,
        created_at: authUser.created_at,
      };

      setUser(mappedUser);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Falha ao buscar usuário'));
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      const supabase = createSupabaseBrowserClient();

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          name: updates.name,
          full_name: updates.full_name,
          avatar_url: updates.avatar,
          company: updates.company,
          phone: updates.phone,
        },
      });

      if (updateError) throw updateError;

      setUser((prev: User | null) => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Falha ao atualizar usuário'));
      throw err;
    }
  };

  const signOut = async () => {
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) throw signOutError;

      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Falha ao sair'));
      throw err;
    }
  };

  useEffect(() => {
    fetchUser();

    // Subscribe to auth changes
    const supabase = createSupabaseBrowserClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUser();
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    error,
    refetch: fetchUser,
    updateUser,
    signOut,
    isAuthenticated: !!user,
  };
}
