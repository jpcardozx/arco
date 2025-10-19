'use client'

export const dynamic = 'force-dynamic'

import { MainLayout } from '@/components/layout/MainLayout'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const user = await signIn({ email, password })
      
      if (user) {
        toast.success('Login realizado com sucesso!')
        router.push('/dashboard')
        router.refresh()
      } else {
        toast.error('Credenciais inválidas')
      }
    } catch (error: any) {
      console.error('[LoginPage] Error:', error)
      toast.error(error.message || 'Erro ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout  showFooter={true}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">ARCO</h1>
            <p className="text-gray-400">Dashboard de Clientes</p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Login</CardTitle>
            <CardDescription className="text-gray-400">
              Entre com suas credenciais para acessar o dashboard
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-gray-200">Senha</Label>
                  <Link 
                    href="/auth/reset-password" 
                    className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </Button>

              <div className="text-center text-sm text-gray-400">
                Não tem uma conta?{' '}
                <Link 
                  href="/auth/signup" 
                  className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                >
                  Cadastre-se
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>

          {/* Development credentials */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
              <p className="text-xs text-blue-300 font-medium mb-2">🔧 Credenciais de Teste:</p>
              <p className="text-xs text-blue-400">Email: dev@arco.com</p>
              <p className="text-xs text-blue-400">Senha: arco123456</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
