'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  CreditCard,
  Copy,
  Check,
} from 'lucide-react';

/**
 * Cartões de Teste Oficiais do Mercado Pago
 * @see https://www.mercadopago.com.br/developers/pt/docs/checkout-api-v2/integration-test/cards
 */

interface TestCard {
  brand: string;
  number: string;
  cvv: string;
  expiry: string;
  icon: string;
}

interface TestScenario {
  name: string;
  description: string;
  holderName: string;
  documentType: string;
  documentNumber: string;
  email: string;
  status: 'approved' | 'rejected' | 'pending' | 'error';
  icon: any;
  color: string;
}

const TEST_CARDS: TestCard[] = [
  {
    brand: 'Mastercard',
    number: '5031 4332 1540 6351',
    cvv: '123',
    expiry: '11/30',
    icon: '💳',
  },
  {
    brand: 'Visa',
    number: '4235 6477 2802 5682',
    cvv: '123',
    expiry: '11/30',
    icon: '💳',
  },
  {
    brand: 'American Express',
    number: '3753 651535 56885',
    cvv: '1234',
    expiry: '11/30',
    icon: '💳',
  },
  {
    brand: 'Elo (Débito)',
    number: '5067 7667 8388 8311',
    cvv: '123',
    expiry: '11/30',
    icon: '🏦',
  },
];

const TEST_SCENARIOS: TestScenario[] = [
  {
    name: 'Pagamento Aprovado',
    description: 'Simula um pagamento aprovado com sucesso',
    holderName: 'APRO',
    documentType: 'CPF',
    documentNumber: '12345678909',
    email: 'test@testuser.com',
    status: 'approved',
    icon: CheckCircle2,
    color: 'text-green-600',
  },
  {
    name: 'Recusado - Erro Geral',
    description: 'Pagamento recusado por erro geral',
    holderName: 'OTHE',
    documentType: 'CPF',
    documentNumber: '12345678909',
    email: 'test@testuser.com',
    status: 'rejected',
    icon: XCircle,
    color: 'text-red-600',
  },
  {
    name: 'Pagamento Pendente',
    description: 'Pagamento aguardando processamento',
    holderName: 'CONT',
    documentType: 'CPF',
    documentNumber: '12345678909',
    email: 'test@testuser.com',
    status: 'pending',
    icon: Clock,
    color: 'text-yellow-600',
  },
  {
    name: 'Recusado - Fundos Insuficientes',
    description: 'Cartão sem limite disponível',
    holderName: 'FUND',
    documentType: 'CPF',
    documentNumber: '12345678909',
    email: 'test@testuser.com',
    status: 'rejected',
    icon: AlertTriangle,
    color: 'text-orange-600',
  },
  {
    name: 'Recusado - CVV Inválido',
    description: 'Código de segurança incorreto',
    holderName: 'SECU',
    documentType: 'CPF',
    documentNumber: '12345678909',
    email: 'test@testuser.com',
    status: 'rejected',
    icon: XCircle,
    color: 'text-red-600',
  },
  {
    name: 'Recusado - Cartão Expirado',
    description: 'Data de validade vencida',
    holderName: 'EXPI',
    documentType: 'CPF',
    documentNumber: '12345678909',
    email: 'test@testuser.com',
    status: 'rejected',
    icon: XCircle,
    color: 'text-red-600',
  },
];

interface TestCardSelectorProps {
  onSelectCard: (card: TestCard, scenario: TestScenario) => void;
}

export function TestCardSelector({ onSelectCard }: TestCardSelectorProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<TestCard | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<TestScenario | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUseTestData = () => {
    if (selectedCard && selectedScenario) {
      onSelectCard(selectedCard, selectedScenario);
    }
  };

  return (
    <Card className="w-full border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-xl">🧪 Modo de Teste - Mercado Pago</CardTitle>
            <CardDescription>
              Selecione um cartão e cenário para testar pagamentos sem usar dados reais
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-sm text-yellow-800">
            <strong>Ambiente de Teste:</strong> Use apenas o email{' '}
            <code className="bg-yellow-100 px-1 py-0.5 rounded">test@testuser.com</code> para
            testes. Nenhuma cobrança real será feita.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cards">Cartões de Teste</TabsTrigger>
            <TabsTrigger value="scenarios">Cenários de Teste</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {TEST_CARDS.map((card, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCard?.number === card.number
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedCard(card)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <span className="text-2xl">{card.icon}</span>
                        {card.brand}
                      </CardTitle>
                      {selectedCard?.number === card.number && (
                        <Badge variant="default" className="bg-blue-500">
                          Selecionado
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between group">
                        <div>
                          <p className="text-xs text-gray-500">Número do Cartão</p>
                          <p className="font-mono text-sm font-medium">{card.number}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(card.number.replace(/\s/g, ''), `number-${index}`);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedField === `number-${index}` ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex items-center gap-2 group">
                          <div>
                            <p className="text-xs text-gray-500">CVV</p>
                            <p className="font-mono text-sm font-medium">{card.cvv}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(card.cvv, `cvv-${index}`);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedField === `cvv-${index}` ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        <div className="flex items-center gap-2 group">
                          <div>
                            <p className="text-xs text-gray-500">Validade</p>
                            <p className="font-mono text-sm font-medium">{card.expiry}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(card.expiry.replace('/', ''), `expiry-${index}`);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedField === `expiry-${index}` ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-4">
            <div className="grid gap-3">
              {TEST_SCENARIOS.map((scenario, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedScenario?.name === scenario.name
                      ? 'ring-2 ring-blue-500 bg-blue-50'
                      : 'hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedScenario(scenario)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <scenario.icon className={`h-5 w-5 ${scenario.color}`} />
                        <div>
                          <CardTitle className="text-sm font-medium">{scenario.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {scenario.description}
                          </CardDescription>
                        </div>
                      </div>
                      {selectedScenario?.name === scenario.name && (
                        <Badge variant="default" className="bg-blue-500">
                          Selecionado
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between group">
                        <div>
                          <p className="text-gray-500">Nome no Cartão</p>
                          <p className="font-mono font-medium">{scenario.holderName}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(scenario.holderName, `holder-${index}`);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedField === `holder-${index}` ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between group">
                        <div>
                          <p className="text-gray-500">{scenario.documentType}</p>
                          <p className="font-mono font-medium">{scenario.documentNumber}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(scenario.documentNumber, `doc-${index}`);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedField === `doc-${index}` ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {selectedCard && selectedScenario && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-blue-900 mb-1">
                  Teste configurado com sucesso!
                </h4>
                <p className="text-sm text-blue-700 mb-3">
                  Use <strong>{selectedCard.brand}</strong> para testar{' '}
                  <strong>{selectedScenario.name.toLowerCase()}</strong>
                </p>
                <Button onClick={handleUseTestData} className="w-full bg-blue-600 hover:bg-blue-700">
                  Aplicar Dados de Teste no Formulário
                </Button>
              </div>
            </div>
          </div>
        )}

        <Alert className="bg-blue-50 border-blue-200">
          <AlertDescription className="text-xs text-blue-800 space-y-1">
            <p>
              <strong>📝 Instruções:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Escolha um cartão de teste e um cenário</li>
              <li>
                Use sempre o email: <code className="bg-blue-100 px-1 rounded">test@testuser.com</code>
              </li>
              <li>O nome do titular determina o resultado do pagamento</li>
              <li>Clique nos ícones de copiar para usar os dados rapidamente</li>
            </ul>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
