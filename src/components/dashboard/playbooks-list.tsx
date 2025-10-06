'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, Zap, Shield, TrendingUp, Globe } from 'lucide-react'
import type { Database } from '@/types/supabase'

type Playbook = Database['public']['Tables']['playbooks']['Row']

interface PlaybooksListProps {
  playbooks: Playbook[]
}

const categoryConfig = {
  performance: { label: 'Performance', icon: Zap, color: 'bg-blue-100 text-blue-800' },
  security: { label: 'Segurança', icon: Shield, color: 'bg-red-100 text-red-800' },
  seo: { label: 'SEO', icon: TrendingUp, color: 'bg-green-100 text-green-800' },
  accessibility: { label: 'Acessibilidade', icon: Globe, color: 'bg-purple-100 text-purple-800' },
}

export function PlaybooksList({ playbooks }: PlaybooksListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredPlaybooks = playbooks.filter((playbook) => {
    const matchesSearch =
      playbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      playbook.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeTab === 'all' || playbook.category === activeTab
    return matchesSearch && matchesCategory && playbook.is_published
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar playbooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="accessibility">Acessibilidade</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3 mt-4">
          {filteredPlaybooks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum playbook encontrado
            </div>
          ) : (
            filteredPlaybooks.map((playbook) => {
              const category = categoryConfig[playbook.category as keyof typeof categoryConfig]
              const Icon = category.icon

              return (
                <Card key={playbook.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{playbook.title}</h3>
                        <Badge variant="outline" className={category.color}>
                          {category.label}
                        </Badge>
                      </div>
                      {playbook.description && (
                        <p className="text-sm text-muted-foreground">
                          {playbook.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
