/**
 * Funil Actions - Stub
 */
'use server'

export async function getFunnelData() {
  return { stages: [] }
}

export async function getFunnelLeads() {
  return []
}

export async function updateLeadStage(leadId: string, stageId: string) {
  return { success: true }
}
