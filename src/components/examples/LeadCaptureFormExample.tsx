/**
 * Exemplo de Integração: Lead Capture Form com Meta Tracking
 * 
 * Este componente demonstra como integrar tracking da Meta Conversions API
 * em um formulário de captura de leads.
 * 
 * Features:
 * - Validação de formulário
 * - Salvamento no Supabase
 * - Tracking automático via Meta Conversions API
 * - Feedback visual de sucesso/erro
 */

'use client';

import { useState } from 'react';
import { useMetaTracking } from '@/hooks/useMetaTracking';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function LeadCaptureFormExample() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
  });

  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const { trackLead } = useMetaTracking();
  const supabase = createClient();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      // 1. Salvar lead no Supabase
      const { data: lead, error: dbError } = await supabase
        .from('leads')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          source: 'website',
          campaign_id: 'example-campaign',
          status: 'new',
        })
        .select()
        .single();

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('✅ Lead salvo no banco:', lead.id);

      // 2. Enviar evento para Meta Conversions API
      const [firstName, ...lastNameParts] = formData.name.split(' ');
      const lastName = lastNameParts.join(' ');

      const metaResponse = await trackLead({
        email: formData.email,
        phone: formData.phone,
        firstName,
        lastName,
        city: formData.city,
        state: formData.state,
        value: 100, // Valor estimado do lead (ajustar conforme seu negócio)
        source: 'website_form',
      });

      if (metaResponse.success) {
        console.log('✅ Evento enviado para Meta Conversions API');
      } else {
        console.warn('⚠️ Falha ao enviar para Meta:', metaResponse.error);
        // Não bloqueia o fluxo - tracking é secundário
      }

      // 3. Sucesso!
      setStatus({
        type: 'success',
        message: 'Obrigado! Entraremos em contato em breve.',
      });

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
      });

      // 4. Opcional: Redirecionar para página de obrigado
      // router.push('/obrigado');

    } catch (error) {
      console.error('❌ Erro ao processar lead:', error);
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Erro ao enviar formulário. Tente novamente.',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Solicite uma Consultoria Gratuita</CardTitle>
        <CardDescription>
          Preencha o formulário e entraremos em contato em até 24 horas
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="João Silva"
              required
              disabled={status.type === 'loading'}
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="joao@example.com"
              required
              disabled={status.type === 'loading'}
            />
          </div>

          {/* Telefone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              required
              disabled={status.type === 'loading'}
            />
          </div>

          {/* Cidade */}
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              placeholder="São Paulo"
              disabled={status.type === 'loading'}
            />
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              name="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              placeholder="SP"
              maxLength={2}
              disabled={status.type === 'loading'}
            />
          </div>

          {/* Status Messages */}
          {status.type === 'success' && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                {status.message}
              </AlertDescription>
            </Alert>
          )}

          {status.type === 'error' && (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {status.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={status.type === 'loading'}
          >
            {status.type === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              'Solicitar Consultoria'
            )}
          </Button>

          <p className="text-xs text-slate-500 text-center">
            Ao enviar, você concorda com nossa Política de Privacidade
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default LeadCaptureFormExample;
