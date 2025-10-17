/**
 * Optimistic Updates System
 * 
 * Sistema inteligente para updates otimistas com rollback automático
 * Melhora percepção de performance e UX
 */

import { toast } from 'sonner';

export interface OptimisticState<T> {
  data: T;
  isOptimistic: boolean;
  isPending: boolean;
  error: Error | null;
}

export interface OptimisticUpdate<T> {
  optimisticData: T;
  action: () => Promise<T>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  rollbackData?: T;
  toastConfig?: {
    loading?: string;
    success?: string;
    error?: string;
  };
}

class OptimisticUpdateManager {
  private static instance: OptimisticUpdateManager;
  private pendingUpdates = new Map<string, OptimisticUpdate<any>>();

  static getInstance(): OptimisticUpdateManager {
    if (!OptimisticUpdateManager.instance) {
      OptimisticUpdateManager.instance = new OptimisticUpdateManager();
    }
    return OptimisticUpdateManager.instance;
  }

  /**
   * Executa update otimista com rollback automático em caso de erro
   */
  async executeOptimistic<T>(
    key: string,
    update: OptimisticUpdate<T>,
    setState: (state: OptimisticState<T>) => void
  ): Promise<T> {
    const { optimisticData, action, onSuccess, onError, rollbackData, toastConfig } = update;

    // Guarda estado atual para rollback
    this.pendingUpdates.set(key, update);

    // 1. Aplica update otimista imediatamente
    setState({
      data: optimisticData,
      isOptimistic: true,
      isPending: true,
      error: null,
    });

    // Toast de loading (se configurado)
    const toastId = toastConfig?.loading
      ? toast.loading(toastConfig.loading, { id: `optimistic-${key}` })
      : undefined;

    try {
      // 2. Executa ação real
      const result = await action();

      // 3. Atualiza com resultado real
      setState({
        data: result,
        isOptimistic: false,
        isPending: false,
        error: null,
      });

      // Toast de sucesso
      if (toastId && toastConfig?.success) {
        toast.success(toastConfig.success, { id: toastId });
      }

      // Callback de sucesso
      onSuccess?.(result);

      // Remove da fila
      this.pendingUpdates.delete(key);

      return result;
    } catch (error) {
      const err = error as Error;

      // 4. Rollback em caso de erro
      setState({
        data: rollbackData ?? optimisticData,
        isOptimistic: false,
        isPending: false,
        error: err,
      });

      // Toast de erro
      if (toastId && toastConfig?.error) {
        toast.error(toastConfig.error, {
          id: toastId,
          description: err.message,
        });
      }

      // Callback de erro
      onError?.(err);

      // Remove da fila
      this.pendingUpdates.delete(key);

      throw err;
    }
  }

  /**
   * Verifica se há updates pendentes
   */
  hasPendingUpdates(key?: string): boolean {
    if (key) {
      return this.pendingUpdates.has(key);
    }
    return this.pendingUpdates.size > 0;
  }

  /**
   * Cancela update pendente
   */
  cancel(key: string): void {
    this.pendingUpdates.delete(key);
  }

  /**
   * Cancela todos updates pendentes
   */
  cancelAll(): void {
    this.pendingUpdates.clear();
  }
}

export const optimisticUpdateManager = OptimisticUpdateManager.getInstance();

/**
 * Hook para usar optimistic updates em React
 */
import { useState, useCallback } from 'react';

export function useOptimisticUpdate<T>(
  initialData: T,
  key: string
): [
  OptimisticState<T>,
  (update: OptimisticUpdate<T>) => Promise<T>,
  () => void
] {
  const [state, setState] = useState<OptimisticState<T>>({
    data: initialData,
    isOptimistic: false,
    isPending: false,
    error: null,
  });

  const execute = useCallback(
    async (update: OptimisticUpdate<T>) => {
      return optimisticUpdateManager.executeOptimistic(key, update, setState);
    },
    [key]
  );

  const reset = useCallback(() => {
    setState({
      data: initialData,
      isOptimistic: false,
      isPending: false,
      error: null,
    });
    optimisticUpdateManager.cancel(key);
  }, [initialData, key]);

  return [state, execute, reset];
}

/**
 * Exemplos de uso:
 * 
 * // 1. Ativar assinatura otimisticamente
 * const [subscription, updateSubscription] = useOptimisticUpdate(
 *   { status: 'pending' },
 *   'subscription-123'
 * );
 * 
 * await updateSubscription({
 *   optimisticData: { status: 'active' },
 *   action: async () => {
 *     const res = await fetch('/api/activate');
 *     return res.json();
 *   },
 *   rollbackData: { status: 'pending' },
 *   toastConfig: {
 *     loading: 'Ativando assinatura...',
 *     success: 'Assinatura ativada!',
 *     error: 'Erro ao ativar',
 *   },
 * });
 * 
 * // 2. Criar preferência otimisticamente
 * await updatePreference({
 *   optimisticData: { preferenceId: 'temp-id' },
 *   action: async () => createPreference(),
 *   toastConfig: {
 *     loading: 'Criando preferência...',
 *     success: 'Preferência criada!',
 *   },
 * });
 */
