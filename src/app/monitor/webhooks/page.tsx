'use client';

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface WebhookEvent {
  id: string;
  gateway: string;
  gateway_event_id: string;
  event_type: string;
  processed: boolean;
  payload: any;
  received_at: string;
  processed_at: string | null;
  processing_error: string | null;
}

export default function WebhookMonitorPage() {
  const [webhooks, setWebhooks] = useState<WebhookEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchWebhooks = async () => {
    try {
      const { data, error } = await supabase
        .from('webhook_events')
        .select('*')
        .order('received_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setWebhooks(data || []);
    } catch (error) {
      console.error('Erro ao buscar webhooks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebhooks();

    if (autoRefresh) {
      const interval = setInterval(fetchWebhooks, 2000); // Atualiza a cada 2s
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('webhook_events')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'webhook_events',
        },
        (payload) => {
          setWebhooks((prev) => [payload.new as WebhookEvent, ...prev]);
          // Notificação sonora
          if (typeof Audio !== 'undefined') {
            new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVqzn77BdGAg+ltryxnMpBSp+zPLaizsIGGS57OihUBELTKXh8bllHAU2kNXzzn0vBSV6yvHajD0JGmm+7eSaThANUqjl8bVpHwU7k9n0yoA2Bx9qv+3mnFARDFCn5O+zaxwFN4/W88yAMQYebL/v45hKDRBUqufus2oaCD2V2/PAci0GKXzM8tuJOQcZZ7zs56BWFApGnt7wxnQrBSx/z/HajDwIF2a67OKaTQ8MUajk8LJoHgU4kdTzzn0uBSR4yPDajz0IFmS57OWhUhEKSKLf8bllHAU0jdXz0H4zBiFrwO3mnFARDFCn5O+yaxsFOJHW88x+LwUme8rx3Ik7CBdluuvioVIRCkii3vG4Yx0FM4/W88+AMQMAAAA=') 
              .play().catch(() => {});
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const getStatusColor = (processed: boolean) => {
    return processed
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  const getEventTypeColor = (eventType: string) => {
    const colors: Record<string, string> = {
      payment: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      merchant_order: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      subscription_authorized_payment: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
    };
    return colors[eventType] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <h1 className="text-2xl font-bold text-white">
                  Monitor de Webhooks
                </h1>
              </div>
              <div className="px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30">
                <span className="text-sm text-teal-400 font-medium">
                  Tempo Real
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  autoRefresh
                    ? 'bg-teal-500/20 border-teal-500/30 text-teal-400'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                {autoRefresh ? '🔄 Auto-refresh ON' : '⏸️ Auto-refresh OFF'}
              </button>
              <button
                onClick={fetchWebhooks}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all disabled:opacity-50"
              >
                {loading ? '⏳' : '🔄'} Atualizar
              </button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-sm text-gray-400">Total</div>
              <div className="text-2xl font-bold text-white">{webhooks.length}</div>
            </div>
            <div className="px-4 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-sm text-green-400">Processados</div>
              <div className="text-2xl font-bold text-green-400">
                {webhooks.filter((w) => w.processed).length}
              </div>
            </div>
            <div className="px-4 py-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="text-sm text-yellow-400">Pendentes</div>
              <div className="text-2xl font-bold text-yellow-400">
                {webhooks.filter((w) => !w.processed).length}
              </div>
            </div>
            <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="text-sm text-red-400">Erros</div>
              <div className="text-2xl font-bold text-red-400">
                {webhooks.filter((w) => w.processing_error).length}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading && webhooks.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400">Carregando webhooks...</div>
          </div>
        ) : webhooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="text-6xl">📡</div>
            <div className="text-xl text-gray-400">Aguardando webhooks...</div>
            <div className="text-sm text-gray-500">
              Configure no Mercado Pago: https://38503f230378.ngrok-free.app/api/webhooks/mercadopago
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {webhooks.map((webhook) => (
              <div
                key={webhook.id}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getEventTypeColor(webhook.event_type)}`}>
                        {webhook.event_type}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(webhook.processed)}`}>
                        {webhook.processed ? '✅ Processado' : '⏳ Pendente'}
                      </span>
                      <span className="text-sm text-gray-500">
                        ID: {webhook.gateway_event_id}
                      </span>
                    </div>

                    {/* Timestamps */}
                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-gray-500">Recebido:</span>
                        <span className="text-white ml-2">{formatDate(webhook.received_at)}</span>
                      </div>
                      {webhook.processed_at && (
                        <div>
                          <span className="text-gray-500">Processado:</span>
                          <span className="text-white ml-2">{formatDate(webhook.processed_at)}</span>
                        </div>
                      )}
                    </div>

                    {/* Error */}
                    {webhook.processing_error && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-sm text-red-400">
                          ❌ Erro: {webhook.processing_error}
                        </div>
                      </div>
                    )}

                    {/* Payload */}
                    <details className="group">
                      <summary className="cursor-pointer text-sm text-gray-400 hover:text-white transition-colors">
                        📋 Ver Payload Completo
                      </summary>
                      <pre className="mt-2 p-4 rounded-lg bg-black/50 border border-white/10 text-xs text-gray-300 overflow-x-auto">
                        {JSON.stringify(webhook.payload, null, 2)}
                      </pre>
                    </details>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
