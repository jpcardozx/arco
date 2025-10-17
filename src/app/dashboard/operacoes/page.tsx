import { getCurrentUser, getUserProjects, getUserTickets, getUserFiles } from '@/app/dashboard/actions'
import { EmptyState } from '@/components/dashboard/empty-states'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FolderKanban, MessageSquare, FileUp } from 'lucide-react'


export default async function OperacoesPage() {
  const [user, projects, tickets, files] = await Promise.all([
    getCurrentUser(),
    getUserProjects(),
    getUserTickets(),
    getUserFiles()
  ])

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Por favor, faça login para continuar.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operações & Suporte</h1>
        <p className="text-muted-foreground">
          Gerencie projetos, tickets de suporte e arquivos
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FolderKanban className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projetos
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">
              {projects.filter(p => p.status === 'in_progress').length} em andamento
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tickets
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground">
              {tickets.filter(t => t.status === 'open').length} abertos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileUp className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Arquivos
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
            <p className="text-xs text-muted-foreground">
              {(files.reduce((sum, f) => sum + (f.size_bytes || 0), 0) / 1024 / 1024).toFixed(1)} MB
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projetos">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projetos">
            <FolderKanban className="mr-2 h-4 w-4" />
            Projetos
          </TabsTrigger>
          <TabsTrigger value="suporte">
            <MessageSquare className="mr-2 h-4 w-4" />
            Suporte
          </TabsTrigger>
          <TabsTrigger value="arquivos">
            <FileUp className="mr-2 h-4 w-4" />
            Arquivos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="projetos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Projetos</CardTitle>
            </CardHeader>
            <CardContent>
              {projects.length === 0 ? (
                <EmptyState type="projects" />
              ) : (
                <div className="space-y-2">
                  {projects.map((project) => (
                    <div key={project.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="suporte" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Tickets de Suporte</CardTitle>
            </CardHeader>
            <CardContent>
              {tickets.length === 0 ? (
                <EmptyState type="tickets" />
              ) : (
                <div className="space-y-2">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">{ticket.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arquivos" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Arquivos</CardTitle>
            </CardHeader>
            <CardContent>
              {files.length === 0 ? (
                <EmptyState type="files" />
              ) : (
                <div className="space-y-2">
                  {files.map((file) => (
                    <div key={file.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold">{file.file_name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {((file.size_bytes || 0) / 1024).toFixed(1)} KB • {file.file_type || 'Arquivo'}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
