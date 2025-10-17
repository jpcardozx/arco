'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  CreditCard, Calendar, Clock, Check, Tag, Loader2, AlertCircle
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'

interface CheckoutMPProps {
  consultoria: {
    id: string
    name: string
    price: number
    duration: number
  }
  selectedDateTime: Date
  onBack?: () => void
  onSuccess?: (bookingId: string) => void
}

export function CheckoutMP({
  consultoria,
  selectedDateTime,
  onBack,
  onSuccess
}: CheckoutMPProps) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null)
  const [discountCode, setDiscountCode] = useState('')
  const [appliedDiscount, setAppliedDiscount] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize Mercado Pago
  useEffect(() => {
    // In production, use real public key
    const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY || 'TEST-your-public-key'
    initMercadoPago(publicKey)
  }, [])

  // Create payment preference on mount
  useEffect(() => {
    createPreference()
  }, [])

  const createPreference = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          consultoria,
          selectedDateTime,
          discountCode: appliedDiscount?.code || null
        })
      })

      if (!response.ok) {
        throw new Error('Erro ao criar preferência de pagamento')
      }

      const data = await response.json()
      setPreferenceId(data.preference_id)
    } catch (err: any) {
      setError(err.message)
      console.error('Error creating preference:', err)
    } finally {
      setLoading(false)
    }
  }

  const applyDiscount = async () => {
    if (!discountCode.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/mercadopago/validate-discount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: discountCode,
          consultoriaId: consultoria.id,
          amount: consultoria.price
        })
      })

      if (!response.ok) {
        throw new Error('Cupom inválido ou expirado')
      }

      const discount = await response.json()
      setAppliedDiscount(discount)
      
      // Recreate preference with discount
      await createPreference()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const removeDiscount = () => {
    setAppliedDiscount(null)
    setDiscountCode('')
    createPreference()
  }

  // Calculate final price
  const calculateFinalPrice = () => {
    let price = consultoria.price
    
    if (appliedDiscount) {
      if (appliedDiscount.discount_type === 'percentage') {
        price -= (price * appliedDiscount.discount_value) / 100
      } else {
        price -= appliedDiscount.discount_value / 100 // cents to reais
      }
    }
    
    return Math.max(price, 0)
  }

  const finalPrice = calculateFinalPrice()
  const discountAmount = consultoria.price - finalPrice

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Finalizar agendamento</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Confirme os detalhes e complete o pagamento
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Order Summary - Left Column (2/3) */}
        <div className="md:col-span-2 space-y-6">
          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Detalhes da consultoria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{consultoria.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(selectedDateTime, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {format(selectedDateTime, "HH:mm")} ({consultoria.duration} min)
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="text-lg">
                  R$ {consultoria.price.toFixed(2)}
                </Badge>
              </div>
              
              <Separator />
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span>Sessão 1:1 com especialista</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span>Gravação da sessão</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span>Plano de ação detalhado</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-4 h-4" />
                  <span>Suporte 30 dias</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discount Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Tag className="w-5 h-5" />
                Cupom de desconto
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appliedDiscount ? (
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg">
                  <div>
                    <p className="font-semibold text-green-700 dark:text-green-400">
                      Cupom "{appliedDiscount.code}" aplicado!
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      Você economizou R$ {discountAmount.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeDiscount}
                  >
                    Remover
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite seu cupom"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    disabled={loading}
                  />
                  <Button
                    onClick={applyDiscount}
                    disabled={!discountCode.trim() || loading}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Aplicar'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Payment Widget */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Pagamento
              </CardTitle>
              <CardDescription>
                Pagamento 100% seguro via Mercado Pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <span className="ml-3 text-slate-600">Carregando checkout...</span>
                </div>
              ) : preferenceId ? (
                <div className="space-y-4">
                  <Wallet
                    initialization={{ preferenceId }}
                    onReady={() => console.log('Checkout ready')}
                    onError={(error) => {
                      console.error('Checkout error:', error)
                      setError('Erro ao carregar pagamento. Tente novamente.')
                    }}
                  />
                  
                  <p className="text-xs text-slate-500 text-center">
                    Aceitamos PIX, cartão de crédito, débito e boleto
                  </p>
                </div>
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Não foi possível carregar o checkout. Tente recarregar a página.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Price Summary - Right Column (1/3) */}
        <div className="md:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Price Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Consultoria</span>
                  <span className="font-medium">R$ {consultoria.price.toFixed(2)}</span>
                </div>
                
                {appliedDiscount && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto</span>
                    <span>-R$ {discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">R$ {finalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              {/* Trust Badges */}
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Pagamento 100% seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Garantia de satisfação</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  <span>Reagendamento flexível</span>
                </div>
              </div>

              {onBack && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onBack}
                >
                  Voltar
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
