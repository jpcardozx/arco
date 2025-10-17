# 🎨 ARCO Strategic Agenda - UI/UX Components

**Continuação do sistema estratégico de agenda**  
**Foco**: Componentes de ponta, micro-interactions, design maduro

---

## 🧩 COMPONENTES PRINCIPAIS

### 1. **Strategic Calendar View** 🗓️

**Rota**: `/dashboard/agenda`

#### Layout Hierarchy
```
┌─────────────────────────────────────────────────────────────────┐
│ Header: KPIs + Quick Actions + View Switcher                   │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────┬───────────────────────────────────────────────┐ │
│ │  Filters    │          Calendar Main Area                  │ │
│ │  & Views    │                                               │ │
│ │             │  FullCalendar with:                           │ │
│ │  • Projects │  • Color-coded events                         │ │
│ │  • Clients  │  • Milestone markers                          │ │
│ │  • Team     │  • Campaign indicators                        │ │
│ │  • Types    │  • Capacity overlays                          │ │
│ │             │  • Conflict alerts                            │ │
│ │  Insights   │                                               │ │
│ │  Panel      │  Interactive Features:                        │ │
│ │             │  • Drag & drop resize                         │ │
│ │             │  • Click to create                            │ │
│ │             │  • Hover quick actions                        │ │
│ │             │  • Multi-select (batch operations)            │ │
│ └─────────────┴───────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### Component Structure
```typescript
// app/dashboard/agenda/page.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import { useStrategicAgenda } from '@/hooks/useStrategicAgenda'

export default function StrategicAgendaPage() {
  const {
    events,
    insights,
    filters,
    setFilters,
    createEvent,
    updateEvent,
    deleteEvent,
    teamCapacity,
    upcomingDeadlines
  } = useStrategicAgenda()

  const [selectedView, setSelectedView] = useState('week')
  const [showInsights, setShowInsights] = useState(true)
  
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      {/* Strategic Header */}
      <AgendaHeader 
        insights={insights}
        deadlines={upcomingDeadlines}
        capacity={teamCapacity}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Smart Sidebar */}
        <AgendaSidebar
          filters={filters}
          onFiltersChange={setFilters}
          insights={insights}
          show={showInsights}
        />
        
        {/* Main Calendar */}
        <div className="flex-1 p-6 overflow-auto">
          <CalendarWrapper>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin
              ]}
              initialView={`timeGrid${selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}`}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              events={transformEventsForCalendar(events)}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={3}
              weekends={true}
              
              // Event handlers
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventDrop={handleEventDrop}
              eventResize={handleEventResize}
              
              // Styling
              height="100%"
              locale="pt-br"
              timeZone="America/Sao_Paulo"
              
              // Custom rendering
              eventContent={renderEventContent}
              dayCellContent={renderDayCell}
              
              // Advanced features
              eventDidMount={addEventTooltips}
              viewDidMount={checkCapacityWarnings}
            />
          </CalendarWrapper>
        </div>
        
        {/* Insights Panel (Collapsible) */}
        <AnimatePresence>
          {showInsights && (
            <InsightsPanel
              insights={insights}
              onClose={() => setShowInsights(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

---

### 2. **Agenda Header** - Strategic KPIs

```typescript
// components/agenda/AgendaHeader.tsx
interface AgendaHeaderProps {
  insights: AgendaInsight[]
  deadlines: Deadline[]
  capacity: TeamCapacity[]
}

export function AgendaHeader({ insights, deadlines, capacity }: AgendaHeaderProps) {
  // Calculate strategic metrics
  const urgentDeadlines = deadlines.filter(d => d.urgency === 'urgent').length
  const criticalInsights = insights.filter(i => i.impact_level === 'critical').length
  const avgUtilization = capacity.reduce((acc, c) => acc + c.utilization_percentage, 0) / capacity.length
  const meetingsToday = events.filter(e => isToday(e.start_time)).length
  
  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Title + Breadcrumb */}
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Strategic Agenda
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>
        
        {/* Center: KPI Cards */}
        <div className="flex gap-4">
          <KPICard
            icon={<AlertTriangle className="w-5 h-5" />}
            label="Deadlines Urgentes"
            value={urgentDeadlines}
            color="red"
            trend={urgentDeadlines > 5 ? 'up' : 'stable'}
          />
          
          <KPICard
            icon={<Brain className="w-5 h-5" />}
            label="Insights Críticos"
            value={criticalInsights}
            color="amber"
            onClick={() => scrollTo('insights')}
          />
          
          <KPICard
            icon={<Users className="w-5 h-5" />}
            label="Utilização Time"
            value={`${avgUtilization.toFixed(0)}%`}
            color={avgUtilization > 85 ? 'red' : 'green'}
            trend={avgUtilization > 85 ? 'up' : 'stable'}
          />
          
          <KPICard
            icon={<Calendar className="w-5 h-5" />}
            label="Reuniões Hoje"
            value={meetingsToday}
            color="blue"
          />
        </div>
        
        {/* Right: Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openQuickCreate()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => syncExternalCalendars()}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportCalendar('ical')}>
                <Download className="w-4 h-4 mr-2" />
                Exportar iCal
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openSettings()}>
                <Settings className="w-4 h-4 mr-2" />
                Preferências
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

// KPI Card Component
function KPICard({ icon, label, value, color, trend, onClick }: KPICardProps) {
  const colorClasses = {
    red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-900',
    amber: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-900',
    green: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/50 dark:text-green-400 dark:border-green-900',
    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-400 dark:border-blue-900'
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative px-4 py-3 rounded-xl border cursor-pointer transition-all",
        colorClasses[color]
      )}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white/50 dark:bg-black/20">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium opacity-75">{label}</p>
          <p className="text-2xl font-bold mt-0.5">{value}</p>
        </div>
      </div>
      
      {trend && (
        <div className="absolute top-2 right-2">
          <TrendIndicator trend={trend} />
        </div>
      )}
    </motion.div>
  )
}
```

---

### 3. **Smart Sidebar** - Filters & Insights

```typescript
// components/agenda/AgendaSidebar.tsx
export function AgendaSidebar({ filters, onFiltersChange, insights, show }: AgendaSidebarProps) {
  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: show ? 320 : 0, opacity: show ? 1 : 0 }}
      className="border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
    >
      <div className="p-6 space-y-6">
        {/* Filter Section */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Filtros Inteligentes
          </h3>
          
          {/* Event Type Filter */}
          <FilterGroup
            label="Tipo de Evento"
            options={[
              { value: 'client_meeting', label: '👥 Cliente', color: '#3B82F6' },
              { value: 'sprint_planning', label: '🎯 Sprint', color: '#8B5CF6' },
              { value: 'deploy', label: '🚀 Deploy', color: '#10B981' },
              { value: 'campaign_launch', label: '📢 Campanha', color: '#F59E0B' },
              { value: 'focus_time', label: '🧠 Foco', color: '#6B7280' }
            ]}
            selected={filters.eventTypes}
            onChange={(types) => onFiltersChange({ ...filters, eventTypes: types })}
          />
          
          {/* Project Filter */}
          <FilterGroup
            label="Projetos"
            options={projects.map(p => ({
              value: p.id,
              label: p.name,
              color: p.color,
              meta: `${p.client_name} • ${p.status}`
            }))}
            selected={filters.projects}
            onChange={(projects) => onFiltersChange({ ...filters, projects })}
            searchable
          />
          
          {/* Team Filter */}
          <FilterGroup
            label="Time"
            options={teamMembers.map(m => ({
              value: m.id,
              label: m.name,
              avatar: m.avatar_url,
              meta: `${m.role} • ${m.current_capacity}% utilizado`
            }))}
            selected={filters.teamMembers}
            onChange={(members) => onFiltersChange({ ...filters, teamMembers: members })}
          />
          
          {/* Priority Filter */}
          <FilterGroup
            label="Prioridade"
            options={[
              { value: 'critical', label: '🔴 Crítico', badge: true },
              { value: 'high', label: '🟠 Alto' },
              { value: 'medium', label: '🟡 Médio' },
              { value: 'low', label: '🟢 Baixo' }
            ]}
            selected={filters.priorities}
            onChange={(priorities) => onFiltersChange({ ...filters, priorities })}
          />
        </div>
        
        {/* Smart Views */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
            Views Inteligentes
          </h3>
          
          <div className="space-y-1">
            <ViewButton
              icon={<Zap />}
              label="Esta Semana"
              count={thisWeekCount}
              active={currentView === 'thisWeek'}
              onClick={() => setView('thisWeek')}
            />
            <ViewButton
              icon={<AlertTriangle />}
              label="Urgentes"
              count={urgentCount}
              active={currentView === 'urgent'}
              onClick={() => setView('urgent')}
              highlight
            />
            <ViewButton
              icon={<Target />}
              label="Meus Deadlines"
              count={myDeadlinesCount}
              active={currentView === 'myDeadlines'}
              onClick={() => setView('myDeadlines')}
            />
            <ViewButton
              icon={<Users />}
              label="Reuniões de Cliente"
              count={clientMeetingsCount}
              active={currentView === 'clientMeetings'}
              onClick={() => setView('clientMeetings')}
            />
            <ViewButton
              icon={<Rocket />}
              label="Launches"
              count={launchesCount}
              active={currentView === 'launches'}
              onClick={() => setView('launches')}
            />
          </div>
        </div>
        
        {/* Insights Preview */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Insights Estratégicos
            </h3>
            <Badge variant="secondary">{insights.length}</Badge>
          </div>
          
          <div className="space-y-2">
            {insights.slice(0, 3).map((insight) => (
              <InsightCard key={insight.id} insight={insight} compact />
            ))}
            
            {insights.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => openInsightsPanel()}
              >
                Ver todos ({insights.length - 3} mais)
              </Button>
            )}
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl">
          <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
            Estatísticas Rápidas
          </h4>
          <div className="space-y-2">
            <StatRow label="Reuniões esta semana" value={weeklyMeetings} />
            <StatRow label="Horas em reuniões" value={`${meetingHours}h`} />
            <StatRow label="Tempo de foco" value={`${focusHours}h`} />
            <StatRow label="Utilização" value={`${utilization}%`} />
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
```

---

### 4. **Event Card** - Micro-interactions

```typescript
// components/agenda/EventCard.tsx
export function EventCard({ event, onUpdate, onDelete }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showActions, setShowActions] = useState(false)
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className={cn(
          "p-3 rounded-lg border-l-4 transition-all duration-200",
          "bg-white dark:bg-slate-900",
          "border-slate-200 dark:border-slate-800",
          "hover:shadow-lg hover:shadow-blue-500/10",
          isHovered && "ring-2 ring-blue-500/20"
        )}
        style={{
          borderLeftColor: event.color
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <EventTypeIcon type={event.event_type} />
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                {event.title}
              </h4>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <Clock className="w-3 h-3" />
              <span>{format(event.start_time, 'HH:mm')} - {format(event.end_time, 'HH:mm')}</span>
              
              {event.duration && (
                <>
                  <span>•</span>
                  <span>{event.duration}</span>
                </>
              )}
            </div>
          </div>
          
          {/* Priority Badge */}
          <PriorityBadge priority={event.strategic_priority} />
        </div>
        
        {/* Meta Info */}
        <div className="mt-2 flex flex-wrap gap-2">
          {event.project_name && (
            <Badge variant="secondary" className="text-xs">
              <FolderKanban className="w-3 h-3 mr-1" />
              {event.project_name}
            </Badge>
          )}
          
          {event.client_name && (
            <Badge variant="outline" className="text-xs">
              <Building2 className="w-3 h-3 mr-1" />
              {event.client_name}
            </Badge>
          )}
          
          {event.required_attendees?.length > 0 && (
            <Badge variant="ghost" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              {event.required_attendees.length}
            </Badge>
          )}
        </div>
        
        {/* Quick Actions (on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-2 right-2 flex gap-1"
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => openEventDetails(event)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Ver detalhes</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={() => openEditModal(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Editar</TooltipContent>
                </Tooltip>
                
                {event.meeting_url && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0"
                        onClick={() => window.open(event.meeting_url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Abrir reunião</TooltipContent>
                  </Tooltip>
                )}
              </TooltipProvider>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Status Indicator */}
        {event.status !== 'scheduled' && (
          <div className="absolute -top-1 -right-1">
            <StatusBadge status={event.status} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
```

---

## 🎯 PRÓXIMA PÁGINA: Advanced Features

_(Continua com modais, AI insights, integrations...)_
