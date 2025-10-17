'use client';

import { Component, ReactNode, ErrorInfo } from 'react';
import { toast } from 'sonner';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary Global
 * 
 * Captura erros não tratados em componentes React
 * Mostra UI amigável e permite recovery
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Callback customizado
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Toast notification
    toast.error('Erro inesperado', {
      description: 'Algo deu errado. Por favor, recarregue a página.',
      action: {
        label: 'Recarregar',
        onClick: () => window.location.reload(),
      },
      duration: Infinity, // Não fecha automaticamente
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Se forneceu fallback customizado, usa ele
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI padrão de erro
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 p-4">
          <Card className="w-full max-w-2xl border-2 border-red-200">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-red-900">
                    Algo deu errado
                  </CardTitle>
                  <CardDescription>
                    Um erro inesperado ocorreu na aplicação
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Error message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-mono text-red-800">
                  {this.state.error?.message || 'Erro desconhecido'}
                </p>
              </div>

              {/* Stack trace (apenas em dev) */}
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <summary className="text-sm font-semibold cursor-pointer text-gray-700 mb-2">
                    Stack Trace (Dev Only)
                  </summary>
                  <pre className="text-xs text-gray-600 overflow-auto max-h-64">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => window.location.reload()}
                  className="flex-1 bg-red-600 hover:bg-red-700"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Recarregar Página
                </Button>

                <Button
                  onClick={this.handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  Tentar Novamente
                </Button>
              </div>

              {/* Help text */}
              <p className="text-sm text-gray-600 text-center pt-2">
                Se o problema persistir, entre em contato com o suporte.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook para usar Error Boundary em functional components
 */
export function useErrorBoundary() {
  const throwError = (error: Error) => {
    throw error;
  };

  return { throwError };
}
