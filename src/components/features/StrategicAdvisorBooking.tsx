'use client';

import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, CheckCircle, ChevronRight, Shield } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

// Types for booking system
interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface BookingDate {
  date: string;
  dayOfWeek: string;
  month: string;
  day: number;
  slots: TimeSlot[];
}

// Generate available dates (next 5 business days)
const generateAvailableDates = (): BookingDate[] => {
  const dates: BookingDate[] = [];
  const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const currentDate = new Date();

  while (dates.length < 5) {
    currentDate.setDate(currentDate.getDate() + 1);

    // Skip weekends (0 = Sunday, 6 = Saturday)
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      continue;
    }

    // Generate time slots with some randomization for availability
    const slots: TimeSlot[] = [
      {
        id: `${currentDate.toISOString().split('T')[0]}-1`,
        time: '09:00',
        available: Math.random() > 0.7,
      },
      {
        id: `${currentDate.toISOString().split('T')[0]}-2`,
        time: '11:00',
        available: Math.random() > 0.5,
      },
      {
        id: `${currentDate.toISOString().split('T')[0]}-3`,
        time: '14:00',
        available: Math.random() > 0.4,
      },
      {
        id: `${currentDate.toISOString().split('T')[0]}-4`,
        time: '16:00',
        available: Math.random() > 0.6,
      },
    ];

    dates.push({
      date: currentDate.toISOString().split('T')[0],
      dayOfWeek: daysOfWeek[currentDate.getDay()],
      month: months[currentDate.getMonth()],
      day: currentDate.getDate(),
      slots: slots,
    });
  }

  return dates;
};

export default function StrategicAdvisorBooking() {
  const [availableDates] = useState<BookingDate[]>(generateAvailableDates());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    revenue: '',
    challenge: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot when date changes
  };

  // Handle slot selection
  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  // Handle form changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle next step
  const handleNextStep = () => {
    if (bookingStep === 1 && selectedSlot) {
      setBookingStep(2);
    } else if (bookingStep === 2) {
      setBookingStep(3);
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send data to your backend
    // For now, we'll just simulate a successful submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  // Get readable date and time for confirmation
  const getReadableDateTime = () => {
    if (!selectedDate || !selectedSlot) return '';

    const date = availableDates.find(d => d.date === selectedDate);
    const slot = date?.slots.find(s => s.id === selectedSlot);

    if (!date || !slot) return '';

    return `${date.dayOfWeek}, ${date.day} de ${date.month} às ${slot.time}`;
  };

  return (
    <section
      ref={containerRef}
      id="booking"
      className="bg-gradient-to-br from-blue-50 to-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-3xl text-neutral-900 md:text-4xl">
            Consultoria Estratégica
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-600">
            Agende uma sessão personalizada para identificar e corrigir os desalinhamentos
            simbólicos específicos do seu negócio
          </p>
        </motion.div>

        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
          >
            <div className="p-0">
              {/* Progress Header */}
              <div className="bg-neutral-900 p-6 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Schedule Strategic Consultation</h3>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map(step => (
                      <div
                        key={step}
                        className={`h-2.5 w-2.5 rounded-full ${
                          step === bookingStep
                            ? 'bg-blue-500'
                            : step < bookingStep
                              ? 'bg-green-500'
                              : 'bg-neutral-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {!isSubmitted ? (
                <div className="p-6">
                  {bookingStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="mb-4 text-lg font-medium text-neutral-900">
                          Selecione uma data e horário
                        </h4>

                        {/* Date Selection */}
                        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                          {availableDates.map(date => (
                            <button
                              key={date.date}
                              onClick={() => handleDateSelect(date.date)}
                              className={`rounded-lg border p-3 text-center transition-all ${
                                selectedDate === date.date
                                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                                  : 'border-neutral-200 hover:border-blue-200 hover:bg-blue-50/50'
                              }`}
                            >
                              <p className="text-sm text-neutral-500">{date.dayOfWeek}</p>
                              <p className="text-xl font-medium">{date.day}</p>
                              <p className="text-xs">{date.month}</p>
                            </button>
                          ))}
                        </div>

                        {/* Time Slot Selection */}
                        {selectedDate && (
                          <div>
                            <h4 className="mb-2 text-lg font-medium text-neutral-900">
                              Horários Disponíveis
                            </h4>
                            <p className="mb-4 text-sm text-neutral-500">
                              Selecione o horário que funciona melhor para você
                            </p>

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                              {availableDates
                                .find(d => d.date === selectedDate)
                                ?.slots.map(slot => (
                                  <button
                                    key={slot.id}
                                    onClick={() => slot.available && handleSlotSelect(slot.id)}
                                    disabled={!slot.available}
                                    className={`flex items-center justify-center rounded-lg border px-4 py-3 transition-all ${
                                      !slot.available
                                        ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400'
                                        : selectedSlot === slot.id
                                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                                          : 'border-neutral-200 hover:border-blue-200 hover:bg-blue-50/50'
                                    }`}
                                  >
                                    <Clock
                                      className={`mr-2 h-4 w-4 ${!slot.available ? 'text-neutral-400' : 'text-blue-500'}`}
                                    />
                                    <span>{slot.time}</span>

                                    {!slot.available && (
                                      <span className="ml-2 rounded bg-neutral-200 px-1.5 py-0.5 text-xs text-neutral-600">
                                        Indisponível
                                      </span>
                                    )}
                                  </button>
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div>
                      <h4 className="mb-4 text-lg font-medium text-neutral-900">
                        Informações para a Consultoria
                      </h4>

                      <div className="mb-6 grid gap-6 md:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-sm font-medium text-neutral-700">
                            Nome completo
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-neutral-700">
                            E-mail profissional
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-neutral-700">
                            Empresa
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-neutral-700">
                            Faturamento mensal (opcional)
                          </label>
                          <select
                            name="revenue"
                            value={formData.revenue}
                            onChange={handleInputChange}
                            className="block w-full rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Selecione</option>
                            <option value="<50k">Menos de R$50 mil</option>
                            <option value="50k-100k">R$50 mil - R$100 mil</option>
                            <option value="100k-500k">R$100 mil - R$500 mil</option>
                            <option value="500k-1M">R$500 mil - R$1 milhão</option>
                            <option value=">1M">Acima de R$1 milhão</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="mb-1 block text-sm font-medium text-neutral-700">
                            Principal desafio atual
                          </label>
                          <textarea
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleInputChange}
                            rows={3}
                            className="block w-full rounded-lg border border-neutral-300 px-4 py-2.5 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            required
                           />
                          <p className="mt-1 text-xs text-neutral-500">
                            Compartilhe brevemente qual é o principal obstáculo que você está
                            enfrentando. Isso nos ajudará a preparar a consultoria para máximo
                            impacto.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div>
                      <h4 className="mb-4 text-lg font-medium text-neutral-900">
                        Confirmar Agendamento
                      </h4>

                      <div className="mb-6 rounded-xl bg-neutral-50 p-6">
                        <div className="mb-6 flex items-start gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Calendar className="h-6 w-6" />
                          </div>

                          <div>
                            <p className="mb-1 text-sm text-neutral-500">Data e horário:</p>
                            <p className="text-lg font-medium text-neutral-900">
                              {getReadableDateTime()}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between border-b border-neutral-200 pb-2">
                            <span className="text-neutral-600">Nome:</span>
                            <span className="font-medium">{formData.name}</span>
                          </div>

                          <div className="flex justify-between border-b border-neutral-200 pb-2">
                            <span className="text-neutral-600">E-mail:</span>
                            <span className="font-medium">{formData.email}</span>
                          </div>

                          <div className="flex justify-between border-b border-neutral-200 pb-2">
                            <span className="text-neutral-600">Empresa:</span>
                            <span className="font-medium">{formData.company}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                          <Shield className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500" />
                          <div>
                            <p className="font-medium text-blue-800">
                              Compromisso de Confidencialidade
                            </p>
                            <p className="text-sm text-blue-700">
                              Todas as informações compartilhadas durante a consultoria são
                              estritamente confidenciais e protegidas por nosso acordo de não
                              divulgação.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between border-t border-neutral-200 pt-4">
                    {bookingStep > 1 ? (
                      <button
                        onClick={handlePreviousStep}
                        className="px-4 py-2 text-neutral-700 transition-colors hover:text-neutral-900"
                      >
                        Voltar
                      </button>
                    ) : (
                      <div /> // Empty div to maintain flex spacing
                    )}

                    {bookingStep < 3 ? (
                      <button
                        onClick={handleNextStep}
                        disabled={bookingStep === 1 && !selectedSlot}
                        className={`flex items-center rounded-lg px-6 py-2.5 transition-all ${
                          bookingStep === 1 && !selectedSlot
                            ? 'cursor-not-allowed bg-neutral-300 text-neutral-500'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        <span>Continuar</span>
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmit}
                        className="flex items-center rounded-lg bg-blue-600 px-6 py-2.5 text-white transition-all hover:bg-blue-700"
                      >
                        <span>Confirmar Agendamento</span>
                        <CheckCircle className="ml-2 h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-10 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                  </div>

                  <h3 className="mb-3 text-2xl font-medium text-neutral-900">
                    Agendamento Confirmado
                  </h3>

                  <p className="mb-6 text-neutral-600">
                    Sua consultoria estratégica foi agendada com sucesso para
                    <span className="font-medium text-neutral-900"> {getReadableDateTime()}</span>
                  </p>

                  <div className="mb-6 rounded-xl bg-neutral-50 p-6 text-left">
                    <h4 className="mb-3 font-medium text-neutral-900">Próximos passos:</h4>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600">
                          1
                        </div>
                        <p className="text-neutral-700">
                          Você receberá um e-mail de confirmação com os detalhes e um link para a
                          chamada.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600">
                          2
                        </div>
                        <p className="text-neutral-700">
                          Nossa equipe analisará suas informações para personalizar a consulta.
                        </p>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm text-blue-600">
                          3
                        </div>
                        <p className="text-neutral-700">
                          Enviaremos um diagnóstico preliminar 24 horas antes da nossa conversa.
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="/ical-download"
                    className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-white transition-all hover:bg-blue-700"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Adicionar ao Calendário</span>
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          {/* Value Propositions */}
          {!isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  title: 'Diagnóstico Preciso',
                  description:
                    'Identificação exata dos desalinhamentos causando perda de receita em seu negócio',
                  icon: <CheckCircle className="h-5 w-5" />,
                },
                {
                  title: 'Plano de Ação Imediato',
                  description:
                    'Recomendações estratégicas com priorização baseada em impacto financeiro',
                  icon: <Clock className="h-5 w-5" />,
                },
                {
                  title: 'Garantia de Valor',
                  description:
                    'Se você não identificar pelo menos 3 oportunidades de melhoria imediata, devolvemos seu investimento',
                  icon: <Shield className="h-5 w-5" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-5"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {item.icon}
                  </div>

                  <div>
                    <h4 className="mb-1 font-medium text-neutral-900">{item.title}</h4>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
