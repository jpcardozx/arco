'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import {
  Building2, DollarSign, Clock, AlertCircle, ArrowRight, ArrowLeft, Loader2
} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'

import { createClient } from '@/lib/supabase/client'

interface QualificationModalProps {
  open: boolean
  onClose: () => void
  onComplete: (data: QualificationData) => void
  preselectedConsultoria?: string | null
}

interface QualificationData {
  primary_challenge: string
  monthly_budget_range: string
  urgency: 'urgent' | 'this_month' | 'next_month' | 'exploring'
  has_existing_site: boolean
  has_active_campaigns: boolean
  additional_info: string
  company_name: string
  company_size: 'solo' | 'small_2_10' | 'medium_11_50' | 'large_50_plus'
  lead_quality_score?: number
  recommended_consultoria_id?: string | null
}

export function QualificationModal({
  open,
  onClose,
  onComplete,
  preselectedConsultoria
}: QualificationModalProps) {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<QualificationData>>({
    urgency: 'this_month',
    has_existing_site: false,
    has_active_campaigns: false,
    company_size: 'small_2_10'
  })

  const totalSteps = user ? 3 : 4 // Skip login step if already authenticated
  const progress = (step / totalSteps) * 100

  const challenges = [
    { value: 'low_traffic', label: 'Pouco tráfego no site' },
    { value: 'low_conversions', label: 'Tráfego bom mas poucas conversões' },
    { value: 'high_cac', label: 'Custo de aquisição muito alto' },
    { value: 'poor_performance', label: 'Site lento ou com problemas técnicos' },
    { value: 'no_strategy', label: 'Falta de estratégia clara' },
    { value: 'campaign_management', label: 'Dificuldade em gerenciar campanhas' },
    { value: 'scale', label: 'Preciso escalar resultados' },
    { value: 'other', label: 'Outro desafio' }
  ]

  const budgetRanges = [
    { value: 'up_to_2k', label: 'Até R$ 2.000/mês' },
    { value: '2k_to_5k', label: 'R$ 2.000 - R$ 5.000/mês' },
    { value: '5k_to_10k', label: 'R$ 5.000 - R$ 10.000/mês' },
    { value: '10k_to_25k', label: 'R$ 10.000 - R$ 25.000/mês' },
    { value: '25k_plus', label: 'Acima de R$ 25.000/mês' }
  ]

  const updateField = (field: keyof QualificationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = async () => {
    // Validate current step
    if (step === 1 && !formData.primary_challenge) {
      return
    }
    if (step === 2 && !formData.monthly_budget_range) {
      return
    }

    // Check if user needs to login
    if (step === 3 && !user) {
      // Redirect to login with return URL
      const returnUrl = `/agendamentos?step=checkout&qualification=pending`
      router.push(`/login?redirect=${encodeURIComponent(returnUrl)}`)
      return
    }

    if (step === totalSteps) {
      await handleSubmit()
    } else {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      const supabase = createClient()
      
      // Calculate lead quality score (simple algorithm)
      const score = calculateLeadScore(formData)
      
      // Get AI recommendation
      const recommendedConsultoria = await getAIRecommendation(formData, score)
      
      // Save qualification response
      const { data, error } = await supabase
        .from('qualification_responses' as any)
        .insert({
          user_id: user?.id,
          session_id: !user ? generateSessionId() : null,
          primary_challenge: formData.primary_challenge,
          monthly_budget_range: formData.monthly_budget_range,
          urgency: formData.urgency,
          has_existing_site: formData.has_existing_site,
          has_active_campaigns: formData.has_active_campaigns,
          additional_info: formData.additional_info,
          company_name: formData.company_name,
          company_size: formData.company_size,
          lead_quality_score: score,
          recommended_consultoria_id: recommendedConsultoria,
          status: score >= 70 ? 'qualified' : 'pending'
        } as any)
        .select()
        .single()
      
      if (error) throw error
      
      // Call onComplete callback
      onComplete({
        ...formData as QualificationData,
        lead_quality_score: score,
        recommended_consultoria_id: recommendedConsultoria
      })
      
      onClose()
    } catch (error) {
      console.error('Error submitting qualification:', error)
      alert('Erro ao salvar. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {step === 1 && 'Qual seu principal desafio?'}
            {step === 2 && 'Orçamento e urgência'}
            {step === 3 && !user && 'Crie sua conta'}
            {step === 3 && user && 'Informações da empresa'}
            {step === 4 && 'Informações da empresa'}
          </DialogTitle>
          <DialogDescription>
            Passo {step} de {totalSteps} - Isso nos ajuda a personalizar sua consultoria
          </DialogDescription>
          
          {/* Progress Bar */}
          <Progress value={progress} className="mt-4" />
        </DialogHeader>

        <div className="py-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Primary Challenge */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <RadioGroup
                  value={formData.primary_challenge}
                  onValueChange={(value) => updateField('primary_challenge', value)}
                >
                  {challenges.map((challenge) => (
                    <div
                      key={challenge.value}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={challenge.value} id={challenge.value} />
                      <Label htmlFor={challenge.value} className="flex-1 cursor-pointer">
                        {challenge.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </motion.div>
            )}

            {/* Step 2: Budget & Urgency */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Budget */}
                <div>
                  <Label className="text-base mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Qual seu orçamento mensal para marketing digital?
                  </Label>
                  <RadioGroup
                    value={formData.monthly_budget_range}
                    onValueChange={(value) => updateField('monthly_budget_range', value)}
                  >
                    {budgetRanges.map((range) => (
                      <div
                        key={range.value}
                        className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors cursor-pointer"
                      >
                        <RadioGroupItem value={range.value} id={range.value} />
                        <Label htmlFor={range.value} className="flex-1 cursor-pointer">
                          {range.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Urgency */}
                <div>
                  <Label className="text-base mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Quando você precisa de resultados?
                  </Label>
                  <RadioGroup
                    value={formData.urgency}
                    onValueChange={(value) => updateField('urgency', value as any)}
                  >
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent" className="flex-1 cursor-pointer">
                        🔴 Urgente (esta semana)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                      <RadioGroupItem value="this_month" id="this_month" />
                      <Label htmlFor="this_month" className="flex-1 cursor-pointer">
                        🟡 Este mês
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                      <RadioGroupItem value="next_month" id="next_month" />
                      <Label htmlFor="next_month" className="flex-1 cursor-pointer">
                        🟢 Próximo mês
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-colors cursor-pointer">
                      <RadioGroupItem value="exploring" id="exploring" />
                      <Label htmlFor="exploring" className="flex-1 cursor-pointer">
                        🔵 Explorando opções
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Existing Assets */}
                <div className="space-y-3">
                  <Label className="text-base">Você já tem:</Label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.has_existing_site}
                        onChange={(e) => updateField('has_existing_site', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span>Site/E-commerce ativo</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.has_active_campaigns}
                        onChange={(e) => updateField('has_active_campaigns', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span>Campanhas de tráfego ativas</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Auth Gate (if not logged in) */}
            {step === 3 && !user && (
              <motion.div
                key="step3-auth"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Para continuar, você precisa criar uma conta ou fazer login.
                    Seus dados de qualificação serão salvos automaticamente.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() => {
                      const returnUrl = `/agendamentos?step=checkout`
                      router.push(`/login?redirect=${encodeURIComponent(returnUrl)}`)
                    }}
                  >
                    Fazer Login / Criar Conta
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3/4: Company Info */}
            {((step === 3 && user) || step === 4) && (
              <motion.div
                key="step-company"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <Label htmlFor="company_name" className="flex items-center gap-2 mb-2">
                    <Building2 className="w-4 h-4" />
                    Nome da empresa
                  </Label>
                  <Input
                    id="company_name"
                    value={formData.company_name || ''}
                    onChange={(e) => updateField('company_name', e.target.value)}
                    placeholder="Ex: Minha Empresa LTDA"
                  />
                </div>

                <div>
                  <Label htmlFor="company_size" className="mb-2 block">
                    Tamanho da empresa
                  </Label>
                  <Select
                    value={formData.company_size}
                    onValueChange={(value) => updateField('company_size', value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">Apenas eu (solo)</SelectItem>
                      <SelectItem value="small_2_10">2-10 pessoas</SelectItem>
                      <SelectItem value="medium_11_50">11-50 pessoas</SelectItem>
                      <SelectItem value="large_50_plus">50+ pessoas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="additional_info" className="mb-2 block">
                    Informações adicionais (opcional)
                  </Label>
                  <Textarea
                    id="additional_info"
                    value={formData.additional_info || ''}
                    onChange={(e) => updateField('additional_info', e.target.value)}
                    placeholder="Conte-nos mais sobre seu negócio, desafios ou objetivos..."
                    rows={4}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1 || loading}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Voltar
          </Button>

          <Button
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Processando...
              </>
            ) : step === totalSteps ? (
              <>
                Concluir Qualificação
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                Próximo
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Helper functions

function calculateLeadScore(data: Partial<QualificationData>): number {
  let score = 50 // Base score

  // Budget scoring
  const budgetScores: Record<string, number> = {
    'up_to_2k': 10,
    '2k_to_5k': 20,
    '5k_to_10k': 30,
    '10k_to_25k': 40,
    '25k_plus': 50
  }
  score += budgetScores[data.monthly_budget_range || ''] || 0

  // Urgency scoring
  const urgencyScores = {
    urgent: 20,
    this_month: 15,
    next_month: 10,
    exploring: 5
  }
  score += urgencyScores[data.urgency || 'exploring']

  // Existing assets bonus
  if (data.has_existing_site) score += 10
  if (data.has_active_campaigns) score += 10

  // Company size bonus
  const companySizeScores = {
    solo: 0,
    small_2_10: 5,
    medium_11_50: 10,
    large_50_plus: 15
  }
  score += companySizeScores[data.company_size || 'solo']

  return Math.min(score, 100)
}

async function getAIRecommendation(
  data: Partial<QualificationData>,
  score: number
): Promise<string | null> {
  // Simple rule-based recommendation
  // In production, this could call an AI API
  
  const challenge = data.primary_challenge
  const budget = data.monthly_budget_range

  // High budget + technical challenge = technical consultoria
  if (budget === '10k_to_25k' || budget === '25k_plus') {
    if (challenge === 'poor_performance' || challenge === 'low_conversions') {
      return 'consultoria-tecnica'
    }
    if (challenge === 'scale' || challenge === 'campaign_management') {
      return 'estrategia-trafego'
    }
    return 'mentoria-executiva'
  }

  // Medium budget
  if (budget === '5k_to_10k') {
    if (challenge === 'poor_performance') return 'consultoria-tecnica'
    if (challenge === 'low_traffic' || challenge === 'high_cac') return 'estrategia-trafego'
    return 'diagnostico-estrategico'
  }

  // Lower budget = diagnostico
  return 'diagnostico-estrategico'
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
