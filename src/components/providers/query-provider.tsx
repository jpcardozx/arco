/**
 * TanStack Query Provider
 * Setup React Query for client-side data fetching and caching
 */

'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState, type ReactNode } from 'react'

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Evita refetch em window focus durante desenvolvimento
            refetchOnWindowFocus: process.env.NODE_ENV === 'production',
            // Cache por 5 minutos por padrão
            staleTime: 5 * 60 * 1000,
            // Retry failed requests 1 vez
            retry: 1,
          },
          mutations: {
            // Log de erros em mutations
            onError: (error) => {
              console.error('[Mutation Error]', error)
            },
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
    </QueryClientProvider>
  )
}
