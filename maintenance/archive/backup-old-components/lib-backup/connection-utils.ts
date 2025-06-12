// lib/connection-utils.ts
export function getConnectionSpeed(): 'slow' | 'medium' | 'fast' {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'medium'; // Default para SSR
  }

  try {
    const connection =
      (navigator as unknown).connection ||
      (navigator as unknown).mozConnection ||
      (navigator as unknown).webkitConnection;

    if (!connection) {
      // Fallback para detecção baseada em user-agent se API de conexão não estiver disponível
      const userAgent = navigator.userAgent || '';
      if (/(mobi|android|iphone|ipad|ipod|blackberry)/i.test(userAgent.toLowerCase())) {
        return 'medium'; // Dispositivos móveis como velocidade média por padrão
      }
      return 'fast'; // Desktop como rápido por padrão
    }

    const type = connection.effectiveType;

    switch (type) {
      case 'slow-2g':
      case '2g':
        return 'slow';
      case '3g':
        return 'medium';
      case '4g':
        return 'fast';
      default:
        return 'medium';
    }
  } catch (error) {
    console.error('[ConnectionUtils] Error detecting connection speed:', error);
    return 'medium'; // Valor padrão em caso de erro
  }
}
