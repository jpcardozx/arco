'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format, addDays, startOfWeek, isSameDay, set, isAfter, isBefore } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, Clock, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

interface DateTimePickerProps {
  consultoriaId: string
  duration: number
  onSelect: (dateTime: Date) => void
  onBack?: () => void
}

interface TimeSlot {
  time: string
  available: boolean
  bookedCount: number
}

export function DateTimePicker({
  consultoriaId,
  duration,
  onSelect,
  onBack
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [availableDates, setAvailableDates] = useState<Date[]>([])
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }))

  // Load available dates for current week
  useEffect(() => {
    loadAvailableDates()
  }, [currentWeekStart])

  // Load time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      loadTimeSlots(selectedDate)
    }
  }, [selectedDate])

  const loadAvailableDates = async () => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      // Get next 30 days of availability
      const dates: Date[] = []
      for (let i = 0; i < 30; i++) {
        const date = addDays(currentWeekStart, i)
        
        // Check if date has availability
        const { data, error } = await supabase
          .from('consultant_availability' as any)
          .select('*')
          .eq('day_of_week', date.getDay())
          .eq('is_active', true)
        
        if (data && data.length > 0) {
          dates.push(date)
        }
      }
      
      setAvailableDates(dates)
    } catch (error) {
      console.error('Error loading dates:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTimeSlots = async (date: Date) => {
    setLoading(true)
    try {
      const supabase = createClient()
      
      // Get availability for this day of week
      const { data: availability, error: availError } = await supabase
        .from('consultant_availability' as any)
        .select('*')
        .eq('day_of_week', date.getDay())
        .eq('is_active', true)
        .single()
      
      if (!availability) {
        setTimeSlots([])
        setLoading(false)
        return
      }
      
      // Generate time slots
      const slots: TimeSlot[] = []
      const availData = availability as any
      const startHour = parseInt(availData.start_time.split(':')[0])
      const endHour = parseInt(availData.end_time.split(':')[0])
      
      for (let hour = startHour; hour < endHour; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00`
        
        // Check if slot is already booked
        const { data: bookings, error: bookError } = await supabase
          .from('consultoria_bookings' as any)
          .select('id')
          .eq('scheduled_date', format(date, 'yyyy-MM-dd'))
          .eq('scheduled_time', timeStr)
          .in('booking_status', ['confirmed', 'pending_payment'])
        
        const bookedCount = bookings?.length || 0
        const maxBookings = availData.max_bookings_per_slot || 1
        
        slots.push({
          time: timeStr,
          available: bookedCount < maxBookings,
          bookedCount
        })
      }
      
      setTimeSlots(slots)
    } catch (error) {
      console.error('Error loading time slots:', error)
      setTimeSlots([])
    } finally {
      setLoading(false)
    }
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setSelectedTime(null)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(':').map(Number)
      const dateTime = set(selectedDate, { hours, minutes, seconds: 0 })
      onSelect(dateTime)
    }
  }

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7))
  }

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7))
  }

  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Escolha data e horário</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Selecione o melhor momento para sua consultoria de {duration} minutos
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar - Date Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Selecione a data
              </CardTitle>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToPreviousWeek}
                  disabled={isBefore(currentWeekStart, new Date())}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToNextWeek}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardDescription>
              {format(currentWeekStart, "MMMM 'de' yyyy", { locale: ptBR })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {/* Day headers */}
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, idx) => (
                <div key={idx} className="text-center text-xs font-medium text-slate-500 pb-2">
                  {day}
                </div>
              ))}
              
              {/* Date cells */}
              {weekDates.map((date, idx) => {
                const isAvailable = availableDates.some(d => isSameDay(d, date))
                const isSelected = selectedDate && isSameDay(selectedDate, date)
                const isPast = isBefore(date, new Date())
                
                return (
                  <motion.button
                    key={idx}
                    whileHover={isAvailable ? { scale: 1.05 } : {}}
                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                    onClick={() => isAvailable && handleDateSelect(date)}
                    disabled={!isAvailable || isPast}
                    className={cn(
                      "aspect-square rounded-lg border-2 transition-all text-sm font-medium",
                      isSelected && "border-blue-500 bg-blue-500 text-white shadow-lg",
                      !isSelected && isAvailable && "border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20",
                      !isAvailable && "border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                    )}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <div>{format(date, 'd')}</div>
                      {isAvailable && !isSelected && (
                        <div className="w-1 h-1 bg-green-500 rounded-full mt-1" />
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>
            
            {/* Legend */}
            <div className="mt-4 pt-4 border-t flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Disponível</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full" />
                <span>Indisponível</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Slots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Horários disponíveis
            </CardTitle>
            <CardDescription>
              {selectedDate 
                ? format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })
                : 'Selecione uma data primeiro'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
            ) : !selectedDate ? (
              <div className="text-center py-12 text-slate-500">
                Selecione uma data para ver os horários
              </div>
            ) : timeSlots.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                Nenhum horário disponível nesta data
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot.time
                  
                  return (
                    <motion.button
                      key={slot.time}
                      whileHover={slot.available ? { scale: 1.05 } : {}}
                      whileTap={slot.available ? { scale: 0.95 } : {}}
                      onClick={() => slot.available && handleTimeSelect(slot.time)}
                      disabled={!slot.available}
                      className={cn(
                        "px-4 py-3 rounded-lg border-2 transition-all text-sm font-medium",
                        isSelected && "border-blue-500 bg-blue-500 text-white shadow-lg",
                        !isSelected && slot.available && "border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20",
                        !slot.available && "border-slate-100 dark:border-slate-900 bg-slate-50 dark:bg-slate-900 text-slate-300 dark:text-slate-700 cursor-not-allowed"
                      )}
                    >
                      {slot.time}
                    </motion.button>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Selected Summary & Actions */}
      <AnimatePresence>
        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-900">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Consultoria agendada para:
                    </p>
                    <p className="text-xl font-bold">
                      {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
                    </p>
                    <p className="text-lg text-slate-700 dark:text-slate-300">
                      às {selectedTime} ({duration} minutos)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {onBack && (
                      <Button variant="outline" onClick={onBack}>
                        Voltar
                      </Button>
                    )}
                    <Button
                      size="lg"
                      onClick={handleConfirm}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      Continuar para Pagamento
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
