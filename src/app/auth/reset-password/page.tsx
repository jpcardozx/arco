'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { resetPassword } from '@/lib/supabase/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await resetPassword(email)
      
      setSuccess(true)
      toast.success('Email de recuperação enviado com sucesso!')
    } catch (error: any) {
      console.error('[ResetPasswordPage] Error:', error)
      toast.error(error.message || 'Erro ao enviar email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout showHeader={true} showFooter={true}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">ARCO</h1>
            <p className="text-gray-400">Recuperar senha</p>
          </div>

          <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Esqueceu sua senha?</CardTitle>
            <CardDescription className="text-gray-400">
              {success 
                ? 'Verifique seu email para redefinir sua senha'
                : 'Digite seu email para receber as instruções de recuperação'
              }
            </CardDescription>
          </CardHeader>

          {!success ? (
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
                      Enviando...
                    </span>
                  ) : (
                    'Enviar Email de Recuperação'
                  )}
                </Button>

                <div className="text-center text-sm text-gray-400">
                  Lembrou sua senha?{' '}
                  <Link 
                    href="/auth/login" 
                    className="text-amber-400 hover:text-amber-300 transition-colors font-medium"
                  >
                    Faça login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <CardContent className="space-y-4">
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <p className="text-sm text-green-300">
                  ✅ Email enviado com sucesso!
                </p>
                <p className="text-xs text-green-400 mt-2">
                  Verifique sua caixa de entrada e spam. O link expira em 1 hora.
                </p>
              </div>

              <Link href="/auth/login">
                <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                  Voltar para o Login
                </Button>
              </Link>
            </CardContent>
          )}
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
