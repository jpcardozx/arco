'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Check, AlertCircle } from 'lucide-react';

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export function FreeAuditForm() {
  const [formState, setFormState] = useState<FormState>({ status: 'idle', message: '' });
  const [formData, setFormData] = useState({
    website_url: '',
    email: '',
    name: '',
    monthly_traffic: '',
    conversion_rate: '',
    average_ticket: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ status: 'loading', message: '' });

    try {
      // Validar URL
      try {
        new URL(formData.website_url);
      } catch {
        setFormState({ status: 'error', message: 'URL inválida' });
        return;
      }

      const payload = {
        website_url: formData.website_url,
        email: formData.email,
        name: formData.name,
        ...(formData.monthly_traffic && { monthly_traffic: parseInt(formData.monthly_traffic) }),
        ...(formData.conversion_rate && { conversion_rate: parseFloat(formData.conversion_rate) }),
        ...(formData.average_ticket && { average_ticket: parseFloat(formData.average_ticket) }),
      };

      const response = await fetch('/api/audit/free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao processar auditoria');
      }

      setFormState({
        status: 'success',
        message: `Análise concluída! Enviamos os resultados para ${formData.email}. Verifique seu email (pode estar em spam).`,
      });

      // Limpar form
      setFormData({
        website_url: '',
        email: '',
        name: '',
        monthly_traffic: '',
        conversion_rate: '',
        average_ticket: '',
      });

      // Auto-reset após 5 segundos
      setTimeout(() => {
        setFormState({ status: 'idle', message: '' });
      }, 5000);
    } catch (error) {
      setFormState({
        status: 'error',
        message: error instanceof Error ? error.message : 'Erro ao processar auditoria',
      });
    }
  };

  const isLoading = formState.status === 'loading';
  const isSuccess = formState.status === 'success';
  const isError = formState.status === 'error';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Website URL */}
        <div>
          <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 mb-2">
            URL do seu site
          </label>
          <input
            id="website_url"
            type="url"
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            placeholder="https://seu-site.com.br"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition disabled:bg-gray-100"
          />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Seu nome
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="João Silva"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition disabled:bg-gray-100"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email para receber resultados
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="joao@empresa.com.br"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition disabled:bg-gray-100"
          />
        </div>

        {/* Optional: Traffic */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="monthly_traffic" className="block text-xs font-medium text-gray-600 mb-2">
              Tráfego/mês (opcional)
            </label>
            <input
              id="monthly_traffic"
              type="number"
              name="monthly_traffic"
              value={formData.monthly_traffic}
              onChange={handleChange}
              placeholder="500"
              disabled={isLoading}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-sm disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="conversion_rate" className="block text-xs font-medium text-gray-600 mb-2">
              Conv. % (opcional)
            </label>
            <input
              id="conversion_rate"
              type="number"
              name="conversion_rate"
              value={formData.conversion_rate}
              onChange={handleChange}
              placeholder="2"
              step="0.1"
              disabled={isLoading}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-sm disabled:bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="average_ticket" className="block text-xs font-medium text-gray-600 mb-2">
              Ticket R$ (opcional)
            </label>
            <input
              id="average_ticket"
              type="number"
              name="average_ticket"
              value={formData.average_ticket}
              onChange={handleChange}
              placeholder="1000"
              disabled={isLoading}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-sm disabled:bg-gray-100"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 italic">
          Campos opcionais não preenchidos serão estimados automaticamente baseado em seu setor.
        </p>

        {/* Error Message */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-700">{formState.message}</p>
          </motion.div>
        )}

        {/* Success Message */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3"
          >
            <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-700">{formState.message}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analisando seu site...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              Análise Gratuita Agora
            </>
          )}
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center">
          ✓ 100% gratuito • ✓ Nenhum compromisso • ✓ Resultados em 2 minutos
        </p>
      </form>
    </motion.div>
  );
}
