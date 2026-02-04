'use client';

export const runtime = 'nodejs';

import { MainLayout } from '@/components/layout/MainLayout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MercadoPagoProvider } from '@/providers/MercadoPagoProvider';
import { TestCardSelector } from '@/components/testing/TestCardSelector';
import { WalletBrick } from '@/components/payment/WalletBrick';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Loader2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Rocket,
  TestTube2,
  ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';

const TEST_PLANS = [
  {
    id: 'essencial',
    name: 'Essencial',
    price: 2497, // R$ 24,97 para teste
    description: 'Teste do plano básico',
  },
  {
    id: 'profissional',
    name: 'Profissional',
    price: 4997, // R$ 49,97 para teste
    description: 'Teste do plano intermediário',
  },
  {
    id: 'empresarial',
    name: 'Empresarial',
    price: 9997, // R$ 99,97 para teste
    description: 'Teste do plano completo',
  },
];

export default function CheckoutTestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState(TEST_PLANS[1]); // Profissional por padrão
  const [testResults, setTestResults] = useState<any[]>([]);

  const handleSelectTestData = (card: any, scenario: any) => {
    console.log('📝 Dados de teste selecionados:', { card, scenario });
    // Aqui você pode auto-preencher o formulário se necessário
  };

  const handleCreatePreference = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simular userId de teste
      const testUserId = 'test-user-' + Date.now();

      // Importar dynamicamente para evitar circular dependency
      const { fetchWithRetry } = await import('@/lib/api/fetch-with-retry');
      const { paymentAnalytics } = await import('@/lib/analytics/payment-tracking');

      // Track begin_checkout
      paymentAnalytics.trackCreatePreference(
        selectedPlan.id,
        selectedPlan.name,
        selectedPlan.price,
        testUserId
      );

      const response = await fetchWithRetry('/api/checkout/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          userId: testUserId,
        }),
        maxRetries: 3,
        onRetry: (attempt, error) => {
          toast.loading(`Tentativa ${attempt}/3...`, {
            id: 'retry-toast',
            description: error.message,
          });
        },
      });

      toast.dismiss('retry-toast');
      const data = await response.json();

      if (response.ok && data.preferenceId) {
        setPreferenceId(data.preferenceId);
        console.log('✅ Preferência criada:', data.preferenceId);
        
        toast.success('Checkout preparado!', {
          description: `Preference ID: ${data.preferenceId.slice(0, 10)}...`,
        });
      } else {
        throw new Error(data.error || 'Erro ao criar preferência');
      }
    } catch (err) {
      console.error('❌ Erro:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
      
      toast.error('Erro ao criar preferência', {
        description: errorMessage,
        action: {
          label: 'Tentar novamente',
          onClick: () => {
            setError(null);
            handleCreatePreference();
          },
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    console.log('✅ Pagamento concluído:', paymentId);
    
    // Track payment completion
    const { paymentAnalytics } = await import('@/lib/analytics/payment-tracking');
    paymentAnalytics.trackCompletePayment(
      selectedPlan.id,
      selectedPlan.name,
      selectedPlan.price,
      paymentId,
      `test-user-${Date.now()}`
    );
    
    toast.success('Pagamento processado!', {
      description: `ID: ${paymentId.slice(0, 8)}... | Plano: ${selectedPlan.name}`,
      duration: 5000,
    });
    
    setTestResults([
      ...testResults,
      {
        id: paymentId,
        status: 'success',
        timestamp: new Date(),
        plan: selectedPlan.name,
      },
    ]);
  };

  const handlePaymentError = (err: any) => {
    console.error('❌ Erro no pagamento:', err);
    
    toast.error('Erro no pagamento', {
      description: err.message || 'Não foi possível processar o pagamento',
      action: {
        label: 'Ver detalhes',
        onClick: () => console.log('Error details:', err),
      },
    });
    
    setTestResults([
      ...testResults,
      {
        id: Date.now(),
        status: 'error',
        error: err,
        timestamp: new Date(),
        plan: selectedPlan.name,
      },
    ]);
  };

  return (
    <MainLayout  showFooter={true}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="inline-block mb-4">
              <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 text-sm">
                <TestTube2 className="h-4 w-4 mr-2 inline" />
                Ambiente de Teste - Mercado Pago Integration
              </Badge>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              🧪 Centro de Testes de Pagamento
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Teste todos os cenários de pagamento usando cartões de teste oficiais do Mercado Pago.
              Nenhuma cobrança real será feita.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Test Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* Test Cards Selector */}
            <TestCardSelector onSelectCard={handleSelectTestData} />

            {/* Payment Brick */}
            {preferenceId ? (
              <MercadoPagoProvider>
                <Card className="border-2 border-green-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      Checkout Pronto para Teste
                    </CardTitle>
                    <CardDescription>
                      Use os dados de teste selecionados acima no formulário de pagamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <WalletBrick preferenceId={preferenceId} />
                  </CardContent>
                </Card>
              </MercadoPagoProvider>
            ) : (
              <Card className="border-2 border-blue-100">
                <CardHeader>
                  <CardTitle>Selecione um Plano para Testar</CardTitle>
                  <CardDescription>Escolha qual plano deseja testar a integração</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {TEST_PLANS.map((plan) => (
                      <Card
                        key={plan.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedPlan.id === plan.id
                            ? 'ring-2 ring-blue-500 bg-blue-50'
                            : 'hover:border-blue-300'
                        }`}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{plan.name}</h3>
                              <p className="text-sm text-gray-600">{plan.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-600">
                                R$ {(plan.price / 100).toFixed(2)}
                              </p>
                              <p className="text-xs text-gray-500">/mês</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Button
                    onClick={handleCreatePreference}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Preparando teste...
                      </>
                    ) : (
                      <>
                        <Rocket className="mr-2 h-4 w-4" />
                        Iniciar Teste com {selectedPlan.name}
                      </>
                    )}
                  </Button>

                  {error && (
                    <Alert variant="destructive">
                      <XCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Test Results & Documentation */}
          <div className="space-y-6">
            {/* Test Results */}
            <Card className="border-2 border-purple-100">
              <CardHeader>
                <CardTitle className="text-base">Resultados dos Testes</CardTitle>
                <CardDescription>Histórico das transações testadas</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <TestTube2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">Nenhum teste executado ainda</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((result, idx) => (
                      <Card
                        key={idx}
                        className={`${
                          result.status === 'success' ? 'bg-green-50' : 'bg-red-50'
                        }`}
                      >
                        <CardContent className="pt-4">
                          <div className="flex items-start gap-2">
                            {result.status === 'success' ? (
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                            )}
                            <div className="flex-1 text-xs">
                              <p className="font-medium">{result.plan}</p>
                              <p className="text-gray-600">{result.id}</p>
                              <p className="text-gray-500 mt-1">
                                {result.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Guide */}
            <Card className="border-2 border-amber-100 bg-gradient-to-br from-amber-50 to-white">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  Guia Rápido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm">
                  <li className="flex gap-2">
                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center flex-shrink-0">
                      1
                    </Badge>
                    <span>Escolha um cartão de teste e um cenário</span>
                  </li>
                  <li className="flex gap-2">
                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center flex-shrink-0">
                      2
                    </Badge>
                    <span>Selecione um plano e clique em "Iniciar Teste"</span>
                  </li>
                  <li className="flex gap-2">
                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center flex-shrink-0">
                      3
                    </Badge>
                    <span>Preencha o checkout com os dados de teste</span>
                  </li>
                  <li className="flex gap-2">
                    <Badge variant="outline" className="h-6 w-6 rounded-full p-0 flex items-center justify-center flex-shrink-0">
                      4
                    </Badge>
                    <span>Verifique o resultado no histórico</span>
                  </li>
                </ol>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/dashboard')}
              >
                Voltar ao Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </MainLayout>
  );
}
