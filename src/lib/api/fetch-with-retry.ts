/**
 * Fetch with automatic retry logic
 * 
 * Implementa exponential backoff para requests que falham
 * Retry apenas em erros 5xx (server errors)
 * Errors 4xx não fazem retry (client errors)
 */

interface FetchWithRetryOptions extends RequestInit {
  maxRetries?: number;
  retryDelay?: number;
  onRetry?: (attempt: number, error: Error) => void;
}

export async function fetchWithRetry(
  url: string,
  options: FetchWithRetryOptions = {},
  maxRetries = 3
): Promise<Response> {
  const { maxRetries: userMaxRetries, retryDelay = 1000, onRetry, ...fetchOptions } = options;
  const retriesToUse = userMaxRetries ?? maxRetries;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt < retriesToUse; attempt++) {
    try {
      const response = await fetch(url, fetchOptions);

      // Se sucesso, retorna imediatamente
      if (response.ok) {
        return response;
      }

      // Se erro 4xx (client error), não faz retry
      if (response.status >= 400 && response.status < 500) {
        return response;
      }

      // Se erro 5xx (server error) e ainda tem tentativas
      if (response.status >= 500 && attempt < retriesToUse - 1) {
        const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff
        
        lastError = new Error(`Server error ${response.status}, retrying in ${delay}ms...`);
        
        if (onRetry) {
          onRetry(attempt + 1, lastError);
        }
        
        console.warn(`[fetchWithRetry] Attempt ${attempt + 1}/${retriesToUse} failed. Retrying in ${delay}ms...`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }

      // Se última tentativa, retorna response mesmo com erro
      return response;
    } catch (error) {
      lastError = error as Error;

      // Se última tentativa, lança erro
      if (attempt === retriesToUse - 1) {
        throw error;
      }

      // Calcula delay com exponential backoff
      const delay = retryDelay * Math.pow(2, attempt);
      
      if (onRetry) {
        onRetry(attempt + 1, lastError);
      }
      
      console.warn(`[fetchWithRetry] Network error on attempt ${attempt + 1}/${retriesToUse}. Retrying in ${delay}ms...`, error);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Max retries reached');
}

/**
 * Wrapper específico para API calls do checkout
 */
export async function checkoutAPIFetch(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  return fetchWithRetry(`/api/checkout/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    maxRetries: 3,
    retryDelay: 1000,
  });
}
