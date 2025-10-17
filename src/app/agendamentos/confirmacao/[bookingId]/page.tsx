'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { createEvents, EventAttributes } from 'ics'
import {
  Calendar, Clock, Download, CheckCircle2, Video, Mail,
  FileText, ArrowRight, Sparkles
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/lib/supabase/client'

interface Props {
  params: Promise<{
    bookingId: string
  }>
}

export default function ConfirmacaoPage({ params }: Props) {
  const resolvedParams = use(params)
  const router = useRouter()
  const supabase = createClient()
  
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [confettiLaunched, setConfettiLaunched] = useState(false)

  useEffect(() => {
    loadBooking()
  }, [resolvedParams.bookingId])

  useEffect(() => {
    if (booking && !confettiLaunched) {
      launchConfetti()
      setConfettiLaunched(true)
    }
  }, [booking])

  const loadBooking = async () => {
    try {
      const { data, error } = await supabase
        .from('consultoria_bookings')
        .select(`
          *,
          consultoria_types (
            name,
            description,
            duration_minutes,
            price_cents
          ),
          user_profiles (
            full_name,
            email,
            company_name
          )
        `)
        .eq('id', resolvedParams.bookingId)
        .single()

      if (error) throw error
      setBooking(data)
    } catch (error) {
      console.error('Error loading booking:', error)
    } finally {
      setLoading(false)
    }
  }

  const launchConfetti = () => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
  }

  const downloadICS = () => {
    if (!booking) return

    const meetingDate = new Date(booking.scheduled_date + 'T' + booking.scheduled_time)
    const duration = booking.consultoria_types.duration
    
    const event: EventAttributes = {
      start: [
        meetingDate.getFullYear(),
        meetingDate.getMonth() + 1,
        meetingDate.getDate(),
        meetingDate.getHours(),
        meetingDate.getMinutes()
      ],
      duration: { minutes: duration },
      title: `Consultoria ARCO - ${booking.consultoria_types.name}`,
      description: `Sessão de consultoria com a equipe ARCO.\n\nID: ${booking.id}\n\nO link da reunião será enviado por email 24h antes.`,
      location: 'Online (link será enviado)',
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'ARCO', email: 'agendamentos@arco.com.br' }
    }

    createEvents([event], (error, value) => {
      if (error) {
        console.error('Error creating ICS:', error)
        return
      }

      const blob = new Blob([value], { type: 'text/calendar' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `arco-consultoria-${booking.id}.ics`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
  }

  const addToGoogleCalendar = () => {
    if (!booking) return

    const meetingDate = new Date(booking.scheduled_date + 'T' + booking.scheduled_time)
    const endDate = new Date(meetingDate.getTime() + booking.consultoria_types.duration * 60000)
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Consultoria ARCO - ${booking.consultoria_types.name}`,
      details: `Sessão de consultoria com a equipe ARCO.\n\nID: ${booking.id}`,
      location: 'Online (link será enviado)',
      dates: `${meetingDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`
    })

    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Agendamento não encontrado</CardTitle>
            <CardDescription>
              Não foi possível carregar os detalhes do seu agendamento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/agendamentos')} className="w-full">
              Voltar para agendamentos
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const meetingDate = new Date(booking.scheduled_date + 'T' + booking.scheduled_time)
  const formattedDate = format(meetingDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
  const formattedTime = format(meetingDate, 'HH:mm')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-950 rounded-full">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Consultoria agendada! 🎉
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Obrigado pela confiança. Estamos ansiosos para ajudá-lo!
            </p>
          </div>

          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary" className="text-lg py-1 px-3">
              ID: {booking.id.substring(0, 8)}
            </Badge>
            {booking.booking_status === 'confirmed' && (
              <Badge variant="default" className="bg-green-600 text-lg py-1 px-3">
                Confirmado
              </Badge>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Meeting Details Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Detalhes da reunião
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {booking.consultoria_types.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {booking.consultoria_types.description}
                  </p>
                </div>

                <Separator />

                <div className="grid gap-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Data</p>
                      <p className="text-slate-600 dark:text-slate-400 capitalize">
                        {formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Horário</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {formattedTime} ({booking.consultoria_types.duration} minutos)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Video className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Link da reunião</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        Será enviado por email 24h antes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Confirmação enviada</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        {booking.profiles.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Adicionar ao calendário
                </CardTitle>
                <CardDescription>
                  Não perca seu horário! Adicione ao seu calendário favorito.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={addToGoogleCalendar}
                  >
                    <img
                      src="https://www.google.com/calendar/images/ext/gc_button1_pt-BR.gif"
                      alt="Google Calendar"
                      className="h-5 mr-2"
                    />
                    Google Calendar
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={downloadICS}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Baixar .ics
                  </Button>
                </div>
                <p className="text-xs text-slate-500 mt-3 text-center">
                  O arquivo .ics funciona com Outlook, Apple Calendar, e outros
                </p>
              </CardContent>
            </Card>

            {/* Preparation Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Como se preparar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'Liste seus principais desafios e objetivos',
                    'Reúna materiais relevantes (sites, campanhas, dados)',
                    'Prepare perguntas específicas que deseja responder',
                    'Teste sua câmera, microfone e conexão',
                    'Reserve um ambiente tranquilo e sem interrupções',
                    'Tenha papel e caneta para anotações'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 space-y-6">
            {/* What's Included */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  O que está incluído
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  'Sessão 1:1 com especialista',
                  'Gravação da sessão',
                  'Plano de ação detalhado',
                  'Material de apoio',
                  'Suporte 30 dias',
                  'Certificado de participação'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Próximos passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Badge variant="secondary">1-2 dias antes</Badge>
                  <p className="text-sm">Enviaremos um lembrete por email</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">24h antes</Badge>
                  <p className="text-sm">Receberá o link da reunião</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary">No dia</Badge>
                  <p className="text-sm">Entre 5 minutos antes do horário</p>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-none">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-bold text-lg">Precisa de ajuda?</h3>
                <p className="text-sm text-blue-50">
                  Entre em contato conosco para reagendar ou tirar dúvidas.
                </p>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.location.href = 'mailto:contato@arco.com.br'}
                >
                  Falar com suporte
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
