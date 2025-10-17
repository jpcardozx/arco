'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, MoreVertical, ExternalLink, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Database } from '@/types/database.types'

type AnalysisWithResults = Database['public']['Tables']['analysis_requests']['Row'] & {
  analysis_results: Database['public']['Tables']['analysis_results']['Row'][]
}

interface AnalysesListProps {
  analyses: AnalysisWithResults[]
}

const statusConfig = {
  pending: {
    label: 'Aguardando',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
  running: {
    label: 'Analisando',
    className: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  completed: {
    label: 'Concluído',
    className: 'bg-green-100 text-green-800 border-green-300',
  },
  failed: {
    label: 'Falhou',
    className: 'bg-red-100 text-red-800 border-red-300',
  },
}

export function AnalysesList({ analyses }: AnalysesListProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAnalyses = analyses.filter((analysis) =>
    analysis.url.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">ARCO Index</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAnalyses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  Nenhuma análise encontrada
                </TableCell>
              </TableRow>
            ) : (
              filteredAnalyses.map((analysis) => {
                const status = statusConfig[analysis.status as keyof typeof statusConfig] || statusConfig.pending
                const arcoIndex = analysis.arco_index
                
                return (
                  <TableRow key={analysis.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span className="truncate max-w-[300px]">{analysis.url}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={status.className}>
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {arcoIndex ? (
                        <span className="font-bold text-lg">{arcoIndex}</span>
                      ) : (
                        <span className="text-muted-foreground">--</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(analysis.created_at), 'dd MMM yyyy', { locale: ptBR })}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {analysis.status === 'completed' && (
                            <Link href={`/dashboard/diagnostico/${analysis.id}`}>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Relatório
                              </DropdownMenuItem>
                            </Link>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
