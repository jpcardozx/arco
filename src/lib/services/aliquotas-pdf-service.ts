/**
 * AliquotasPDFService - Pareto Fix
 * Stub para resolver erros de importação
 */

export interface AliquotaData {
  city: string
  iss: number
  pis: number
  cofins: number
  csll: number
  irpj: number
  cpp: number
  total: number
  [key: string]: any
}

export const AliquotasPDFService = {
  async downloadPDF(data: AliquotaData): Promise<void> {
    // TODO: Implementar geração de PDF
    console.log('Download PDF:', data)
    
    // Mock implementation
    const blob = new Blob(['PDF content'], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `aliquotas-${data.city}.pdf`
    link.click()
    window.URL.revokeObjectURL(url)
  },

  async generateReport(data: AliquotaData): Promise<string> {
    return `Relatório de Alíquotas - ${data.city}`
  }
}
