/**
 * Web Vitals Monitoring
 * 
 * Configura o rastreamento de métricas Core Web Vitals
 * e envia para o endpoint de performance
 */

import { onCLS, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Type para payload estendido com informações adicionais
interface EnhancedMetricPayload extends Record<string, any> {
  name: string;
  value: number;
  delta: number;
  id: string;
  metricType: string;
  timestamp: number;
  route: string;
  userAgent: string;
  componentName?: string;
}

/**
 * Reporta métricas Web Vitals para API de performance
 */
function reportWebVitals(metric: Metric, componentName?: string) {
  if (!metric || typeof window === 'undefined') return;

  // Preparar payload para API
  const payload: EnhancedMetricPayload = {
    ...metric,
    timestamp: Date.now(),
    metricType: 'web-vitals',
    route: window.location.pathname,
    userAgent: navigator.userAgent,
  };

  // Adicionar nome do componente se fornecido
  if (componentName) {
    payload.componentName = componentName;
  }

  // Enviar para API de performance
  try {
    // Usar sendBeacon se disponível para garantir que a métrica seja enviada
    // mesmo se a página estiver sendo fechada
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/performance', blob);
    } else {
      fetch('/api/analytics/performance', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
        // Usar keepalive para permitir que a requisição continue mesmo se a página fechar
        keepalive: true,
      });
    }

    // Log local apenas em ambiente de desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      console.log(`Web Vital: ${metric.name} = ${metric.value}`);
    }
  } catch (error) {
    console.error('Failed to send Web Vitals:', error);
  }
}

/**
 * Inicia o monitoramento de todas as métricas Web Vitals
 */
export function initWebVitalsMonitoring() {
  try {
    // Iniciar rastreamento de todas as métricas principais
    onCLS((metric) => reportWebVitals(metric));
    onLCP((metric) => reportWebVitals(metric));
    onFCP((metric) => reportWebVitals(metric));
    onTTFB((metric) => reportWebVitals(metric));
  } catch (error) {
    console.error('Failed to initialize Web Vitals monitoring:', error);
  }
}

/**
 * Hook para rastrear métricas Web Vitals em componentes específicos
 */
export function useWebVitals(componentName: string) {
  // Implementação para um hook de React que monitora métricas específicas
  // de um componente e inclui o nome do componente nos dados enviados
  return () => {
    try {
      // Usar com useEffect no componente
      onCLS((metric) => {
        reportWebVitals(metric, componentName);
      });
      onLCP((metric) => {
        reportWebVitals(metric, componentName);
      });
    } catch (error) {
      console.error(`Failed to initialize Web Vitals for ${componentName}:`, error);
    }
  };
}

export default { initWebVitalsMonitoring, useWebVitals };
