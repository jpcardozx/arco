# 🚀 ARCO Strategic Agenda - Advanced Features & Implementation

**Parte 3: Features avançadas, AI insights, integrações**

---

## 🧠 AI-POWERED FEATURES

### 1. **Smart Scheduling Assistant**

```typescript
// lib/ai/smart-scheduler.ts
export class SmartScheduler {
  /**
   * Sugere melhor horário para reunião baseado em:
   * - Disponibilidade dos participantes
   * - Padrões históricos de produtividade
   * - Carga de trabalho atual
   * - Tipo de reunião (estratégica vs operacional)
   */
  async suggestOptimalTime(params: {
    duration: number
    attendees: string[]
    eventType: EventType
    urgency: Priority
    preferredTimeRange?: { start: Date, end: Date }
  }): Promise<TimeSlotSuggestion[]> {
    const { duration, attendees, eventType, urgency } = params
    
    // 1. Buscar disponibilidade de todos
    const availability = await this.getTeamAvailability(attendees)
    
    // 2. Buscar padrões de produtividade
    const productivityPatterns = await this.getProductivityPatterns(attendees)
    
    // 3. Analisar carga de trabalho
    const workload = await this.getCurrentWorkload(attendees)
    
    // 4. Aplicar regras inteligentes
    const slots = this.findAvailableSlots(availability, duration)
    
    // 5. Rankear por score
    const rankedSlots = slots.map(slot => ({
      ...slot,
      score: this.calculateSlotScore({
        slot,
        eventType,
        urgency,
        productivityPatterns,
        workload
      }),
      reasoning: this.explainScore(slot, eventType)
    }))
    
    return rankedSlots.sort((a, b) => b.score - a.score).slice(0, 5)
  }
  
  private calculateSlotScore(params: {
    slot: TimeSlot
    eventType: EventType
    urgency: Priority
    productivityPatterns: ProductivityPattern[]
    workload: Workload[]
  }): number {
    let score = 100
    
    // Penalizar horários de alta produtividade para reuniões operacionais
    if (params.eventType === 'internal_sync' && this.isPeakProductivityTime(params.slot)) {
      score -= 30
    }
    
    // Bonus para manhãs em reuniões estratégicas
    if (params.eventType === 'sprint_planning' && this.isMorning(params.slot)) {
      score += 20
    }
    
    // Penalizar dia com muitas reuniões
    const meetingsOnDay = params.workload.filter(w => 
      isSameDay(w.date, params.slot.start)
    )
    score -= meetingsOnDay.length * 5
    
    // Bonus para evitar fragmentação
    if (this.allowsLongFocusBlock(params.slot, params.workload)) {
      score += 15
    }
    
    return score
  }
  
  private explainScore(slot: TimeSlot, eventType: EventType): string[] {
    const reasons: string[] = []
    
    if (this.isMorning(slot)) {
      reasons.push('🌅 Manhã - ideal para decisões estratégicas')
    }
    
    if (!this.isPeakProductivityTime(slot)) {
      reasons.push('⚡ Não compromete horário de alta produtividade')
    }
    
    if (this.allowsLongFocusBlock(slot, [])) {
      reasons.push('🎯 Mantém blocos de foco intactos')
    }
    
    return reasons
  }
}
```

---

### 2. **Conflict Detection & Resolution**

```typescript
// lib/ai/conflict-detector.ts
export class ConflictDetector {
  /**
   * Detecta conflitos e sugere resoluções
   */
  async detectConflicts(event: StrategicEvent): Promise<Conflict[]> {
    const conflicts: Conflict[] = []
    
    // 1. Conflito de horário (simples)
    const timeConflicts = await this.detectTimeConflicts(event)
    conflicts.push(...timeConflicts)
    
    // 2. Conflito de recursos (sala, equipamento)
    const resourceConflicts = await this.detectResourceConflicts(event)
    conflicts.push(...resourceConflicts)
    
    // 3. Conflito de prioridades
    const priorityConflicts = await this.detectPriorityConflicts(event)
    conflicts.push(...priorityConflicts)
    
    // 4. Conflito de capacidade (team overload)
    const capacityConflicts = await this.detectCapacityConflicts(event)
    conflicts.push(...capacityConflicts)
    
    // 5. Conflito estratégico (deadline risk)
    const strategicConflicts = await this.detectStrategicConflicts(event)
    conflicts.push(...strategicConflicts)
    
    // Para cada conflito, sugerir resoluções
    return conflicts.map(conflict => ({
      ...conflict,
      resolutions: this.suggestResolutions(conflict)
    }))
  }
  
  private async detectCapacityConflicts(event: StrategicEvent): Promise<Conflict[]> {
    const conflicts: Conflict[] = []
    
    // Verificar se participantes já estão sobrecarregados
    for (const attendeeId of event.required_attendees) {
      const weekStart = startOfWeek(event.start_time)
      const capacity = await db
        .from('team_capacity')
        .select('*')
        .eq('user_id', attendeeId)
        .eq('week_start_date', format(weekStart, 'yyyy-MM-dd'))
        .single()
      
      if (capacity.utilization_percentage > 90) {
        conflicts.push({
          type: 'capacity_overload',
          severity: 'high',
          description: `${capacity.user.name} já está com ${capacity.utilization_percentage}% de utilização`,
          affectedEntity: attendeeId,
          impact: 'Qualidade do trabalho pode ser comprometida'
        })
      }
    }
    
    return conflicts
  }
  
  private suggestResolutions(conflict: Conflict): Resolution[] {
    const resolutions: Resolution[] = []
    
    switch (conflict.type) {
      case 'time_conflict':
        resolutions.push(
          { action: 'reschedule', description: 'Reagendar para próximo horário disponível' },
          { action: 'delegate', description: 'Delegar participação para outro membro' },
          { action: 'shorten', description: 'Reduzir duração da reunião' }
        )
        break
        
      case 'capacity_overload':
        resolutions.push(
          { action: 'reduce_scope', description: 'Reduzir escopo da reunião' },
          { action: 'async', description: 'Converter para comunicação assíncrona' },
          { action: 'delegate', description: 'Delegar para pessoa menos sobrecarregada' }
        )
        break
        
      case 'strategic_conflict':
        resolutions.push(
          { action: 'reprioritize', description: 'Re-priorizar tarefas conflitantes' },
          { action: 'allocate_resources', description: 'Alocar recursos adicionais' },
          { action: 'extend_deadline', description: 'Negociar extensão de prazo' }
        )
        break
    }
    
    return resolutions
  }
}
```

---

### 3. **Productivity Analytics**

```typescript
// components/agenda/ProductivityAnalytics.tsx
export function ProductivityAnalytics() {
  const { analytics } = useProductivityAnalytics()
  
  return (
    <div className="space-y-6">
      {/* Meeting Load Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Análise de Carga de Reuniões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <MetricCard
              label="Horas em Reuniões"
              value={`${analytics.meetingHours}h`}
              change={analytics.meetingHoursChange}
              target={20}
              status={analytics.meetingHours > 20 ? 'warning' : 'good'}
            />
            <MetricCard
              label="Horas de Foco"
              value={`${analytics.focusHours}h`}
              change={analytics.focusHoursChange}
              target={20}
              status={analytics.focusHours < 20 ? 'warning' : 'good'}
            />
            <MetricCard
              label="Fragmentação"
              value={`${analytics.fragmentationScore}/10`}
              sublabel="Menor é melhor"
              status={analytics.fragmentationScore > 7 ? 'bad' : 'good'}
            />
          </div>
          
          {/* Weekly Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.weeklyData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="meetings" name="Reuniões" fill="#3B82F6" />
              <Bar dataKey="focus" name="Foco" fill="#10B981" />
              <Bar dataKey="breaks" name="Pausas" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Time Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Tempo por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.timeDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.timeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Insights & Recommendations */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <Lightbulb className="w-5 h-5" />
            Insights & Recomendações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.insights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg">
                <insight.icon className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    {insight.title}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {insight.description}
                  </p>
                  {insight.action && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2"
                      onClick={insight.action.onClick}
                    >
                      {insight.action.label}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Meeting Quality Scores */}
      <Card>
        <CardHeader>
          <CardTitle>Qualidade das Reuniões</CardTitle>
          <CardDescription>
            Score baseado em: preparação, pontualidade, outcomes documentados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics.meetingQuality.map((meeting) => (
              <div key={meeting.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{meeting.title}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {format(meeting.date, "d 'de' MMM", { locale: ptBR })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <QualityBadge score={meeting.qualityScore} />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => viewMeetingDetails(meeting)}
                  >
                    Ver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```

---

## 🔗 INTEGRATIONS

### 1. **Google Calendar Sync**

```typescript
// lib/integrations/google-calendar.ts
export class GoogleCalendarSync {
  private oauth2Client: OAuth2Client
  
  async syncEvents(userId: string) {
    // 1. Authenticate
    const tokens = await this.getStoredTokens(userId)
    this.oauth2Client.setCredentials(tokens)
    
    // 2. Fetch Google Calendar events
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfMonth(new Date()).toISOString(),
      timeMax: endOfMonth(addMonths(new Date(), 3)).toISOString(),
      singleEvents: true,
      orderBy: 'startTime'
    })
    
    // 3. Sync to Supabase
    const events = response.data.items || []
    for (const gcalEvent of events) {
      await this.upsertEvent(userId, gcalEvent)
    }
    
    // 4. Sync back (ARCO events to Google)
    const arcoEvents = await this.getArcoEvents(userId)
    for (const arcoEvent of arcoEvents) {
      if (!arcoEvent.google_calendar_id) {
        await this.createGoogleEvent(arcoEvent)
      }
    }
  }
  
  private async upsertEvent(userId: string, gcalEvent: calendar_v3.Schema$Event) {
    const event: Partial<StrategicEvent> = {
      title: gcalEvent.summary || 'Sem título',
      description: gcalEvent.description,
      start_time: gcalEvent.start?.dateTime || gcalEvent.start?.date,
      end_time: gcalEvent.end?.dateTime || gcalEvent.end?.date,
      location: gcalEvent.location,
      meeting_url: gcalEvent.hangoutLink,
      organizer_id: userId,
      external_id: gcalEvent.id,
      external_source: 'google_calendar',
      
      // Smart categorization
      event_type: this.inferEventType(gcalEvent),
      color: this.mapGoogleColor(gcalEvent.colorId)
    }
    
    // Upsert using external_id
    await supabase
      .from('strategic_events')
      .upsert(event, {
        onConflict: 'external_id'
      })
  }
  
  private inferEventType(gcalEvent: calendar_v3.Schema$Event): EventType {
    const title = gcalEvent.summary?.toLowerCase() || ''
    const description = gcalEvent.description?.toLowerCase() || ''
    
    if (title.includes('cliente') || title.includes('client')) {
      return 'client_meeting'
    }
    if (title.includes('sprint') || title.includes('planning')) {
      return 'sprint_planning'
    }
    if (title.includes('deploy') || title.includes('release')) {
      return 'deploy'
    }
    if (title.includes('campanha') || title.includes('campaign')) {
      return 'campaign_launch'
    }
    
    return 'weekly_sync' // default
  }
}
```

---

### 2. **Slack Integration**

```typescript
// lib/integrations/slack.ts
export class SlackIntegration {
  /**
   * Envia notificação de evento no Slack
   */
  async notifyEvent(event: StrategicEvent, action: 'created' | 'updated' | 'cancelled') {
    const channel = this.getChannelForEvent(event)
    
    const blocks: KnownBlock[] = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: this.getActionEmoji(action) + ' ' + this.getActionText(action)
        }
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: `*Evento:*\n${event.title}` },
          { type: 'mrkdwn', text: `*Tipo:*\n${this.formatEventType(event.event_type)}` },
          { type: 'mrkdwn', text: `*Data:*\n${format(event.start_time, "d 'de' MMM 'às' HH:mm", { locale: ptBR })}` },
          { type: 'mrkdwn', text: `*Prioridade:*\n${this.formatPriority(event.strategic_priority)}` }
        ]
      }
    ]
    
    if (event.description) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Descrição:*\n${event.description}`
        }
      })
    }
    
    if (event.meeting_url) {
      blocks.push({
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '🔗 Entrar na Reunião' },
            url: event.meeting_url,
            style: 'primary'
          },
          {
            type: 'button',
            text: { type: 'plain_text', text: '📅 Ver no ARCO' },
            url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/agenda?event=${event.id}`
          }
        ]
      })
    }
    
    await this.slackClient.chat.postMessage({
      channel,
      blocks,
      text: `${this.getActionText(action)}: ${event.title}` // Fallback
    })
  }
  
  /**
   * Cria reminder antes da reunião
   */
  async scheduleReminder(event: StrategicEvent, minutesBefore: number) {
    const reminderTime = subMinutes(event.start_time, minutesBefore)
    
    await this.slackClient.chat.scheduleMessage({
      channel: this.getUserSlackId(event.organizer_id),
      post_at: Math.floor(reminderTime.getTime() / 1000),
      text: `🔔 Lembrete: "${event.title}" começa em ${minutesBefore} minutos`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `🔔 *Lembrete de Reunião*\n\n*${event.title}*\nComeça em *${minutesBefore} minutos* (${format(event.start_time, 'HH:mm')})`
          }
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: '🚀 Entrar Agora' },
              url: event.meeting_url,
              style: 'primary'
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: '⏰ Adiar 5min' },
              action_id: 'snooze_reminder'
            }
          ]
        }
      ]
    })
  }
}
```

---

### 3. **Zoom Integration**

```typescript
// lib/integrations/zoom.ts
export class ZoomIntegration {
  /**
   * Cria reunião Zoom automaticamente
   */
  async createMeeting(event: StrategicEvent): Promise<string> {
    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await this.getAccessToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic: event.title,
        type: 2, // Scheduled meeting
        start_time: event.start_time,
        duration: differenceInMinutes(event.end_time, event.start_time),
        timezone: 'America/Sao_Paulo',
        agenda: event.description,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          waiting_room: event.event_type === 'client_meeting',
          auto_recording: event.event_type.includes('client') ? 'cloud' : 'none',
          alternative_hosts: await this.getAlternativeHosts(event.required_attendees)
        }
      })
    })
    
    const data = await response.json()
    
    // Update event with Zoom link
    await supabase
      .from('strategic_events')
      .update({
        meeting_url: data.join_url,
        external_meeting_id: data.id
      })
      .eq('id', event.id)
    
    return data.join_url
  }
  
  /**
   * Busca gravações após reunião
   */
  async fetchRecordings(meetingId: string) {
    const response = await fetch(
      `https://api.zoom.us/v2/meetings/${meetingId}/recordings`,
      {
        headers: {
          'Authorization': `Bearer ${await this.getAccessToken()}`
        }
      }
    )
    
    const data = await response.json()
    
    return data.recording_files.map((file: any) => ({
      type: file.recording_type,
      url: file.download_url,
      size: file.file_size,
      duration: file.recording_end - file.recording_start
    }))
  }
}
```

---

## 📱 MOBILE EXPERIENCE

### 1. **PWA Configuration**

```typescript
// app/manifest.ts
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ARCO Strategic Agenda',
    short_name: 'ARCO Agenda',
    description: 'Sistema estratégico de agenda para web dev + tráfego pago',
    start_url: '/dashboard/agenda',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    shortcuts: [
      {
        name: 'Criar Evento',
        url: '/dashboard/agenda?action=create',
        icons: [{ src: '/icons/shortcut-create.png', sizes: '96x96' }]
      },
      {
        name: 'Hoje',
        url: '/dashboard/agenda?view=today',
        icons: [{ src: '/icons/shortcut-today.png', sizes: '96x96' }]
      },
      {
        name: 'Próximos Deadlines',
        url: '/dashboard/agenda?view=deadlines',
        icons: [{ src: '/icons/shortcut-deadlines.png', sizes: '96x96' }]
      }
    ]
  }
}
```

---

## 🎯 IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1-2) ✅
- [x] Database schema
- [x] Basic CRUD operations
- [x] RLS policies
- [x] Core UI components

### Phase 2: Intelligence (Week 3-4) 🚧
- [ ] Smart scheduling assistant
- [ ] Conflict detection
- [ ] Productivity analytics
- [ ] AI insights generation

### Phase 3: Integrations (Week 5-6) ⏳
- [ ] Google Calendar sync
- [ ] Zoom auto-creation
- [ ] Slack notifications
- [ ] Email reminders

### Phase 4: Advanced Features (Week 7-8) ⏳
- [ ] Team capacity planning
- [ ] OKR integration
- [ ] Custom workflows
- [ ] Mobile PWA optimization

### Phase 5: Polish & Launch (Week 9-10) ⏳
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] User testing
- [ ] Documentation
- [ ] Training materials

---

## 💡 KEY DIFFERENTIATORS

### vs Calendly
✅ **Integrated with CRM** - Eventos linkados a projetos e clientes  
✅ **Strategic context** - Não só horários, mas objetivos e outcomes  
✅ **Team capacity** - Visibility de carga de trabalho  
✅ **AI insights** - Recomendações proativas

### vs Google Calendar
✅ **Project-aware** - Entende contexto de agência  
✅ **Campaign integration** - Sincronizado com ads  
✅ **Deadline tracking** - Milestones visuais  
✅ **Productivity analytics** - Métricas de eficiência

### vs Notion Calendar
✅ **Native to platform** - Não precisa sair do ARCO  
✅ **Realtime collaboration** - WebSocket updates  
✅ **Custom workflows** - Adaptado para agência  
✅ **Performance focused** - Otimizado para velocidade

---

**Status:** 📝 Proposta completa - Pronto para discussão e priorização!  
**Next:** Definir MVP mínimo e começar implementação Phase 1
