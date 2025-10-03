/**
 * Contact Info - Mobile First Premium Design
 */
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Calendar,
  Zap,
  Globe,
  CheckCircle
} from 'lucide-react';

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      label: 'Telefone',
      value: '+55 (11) 99999-9999',
      action: 'tel:+5511999999999',
      description: 'Ligação direta',
      available: true,
      priority: 'high'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+55 (11) 99999-9999',
      action: 'https://wa.me/5511999999999',
      description: 'Resposta rápida',
      available: true,
      priority: 'high'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'contato@arco.dev',
      action: 'mailto:contato@arco.dev',
      description: 'Resposta profissional',
      available: true,
      priority: 'medium'
    },
    {
      icon: Calendar,
      label: 'Agendamento',
      value: 'Reunião Online',
      action: '#',
      description: 'Agendar call',
      available: true,
      priority: 'medium'
    }
  ];

  const businessHours = [
    { day: 'Segunda - Sexta', hours: '09:00 - 18:00' },
    { day: 'Sábado', hours: '09:00 - 13:00' },
    { day: 'Domingo', hours: 'Emergências' }
  ];

  const features = [
    { icon: Zap, text: 'Resposta em 24h' },
    { icon: Globe, text: 'Atendimento global' },
    { icon: CheckCircle, text: 'Consultoria gratuita' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Contact Methods */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-black/40 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            Entre em Contato
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    method.priority === 'high' 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      method.priority === 'high'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{method.label}</span>
                      {method.available && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {method.value}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {method.description}
                    </p>
                  </div>
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    if (method.action.startsWith('http')) {
                      window.open(method.action, '_blank');
                    } else {
                      window.location.href = method.action;
                    }
                  }}
                >
                  Contatar
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-black/40 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            </div>
            Horário de Atendimento
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {businessHours.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-sm font-medium">{schedule.day}</span>
              <Badge variant="outline" className="text-xs">
                {schedule.hours}
              </Badge>
            </div>
          ))}
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">Online agora</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Resposta garantida em horário comercial
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardContent className="p-6">
          <div className="space-y-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card className="border-0 shadow-lg bg-white/80 dark:bg-black/40 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Localização</h4>
              <p className="text-sm text-muted-foreground">
                São Paulo, SP - Brasil
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Atendimento presencial e remoto
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}