export interface BillAuditLog {
  id: string
  billId: string
  action: string
  timestamp: string
  ip: string
  device: string
  role: string
}

const STORAGE_KEY = 'billAuditLogs'
export let billAuditLogs: BillAuditLog[] = []

export function loadBillAuditLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) billAuditLogs = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(billAuditLogs))
  }
}

export function logBillAction(
  billId: string,
  action: string,
  source: { ip: string; device: string; role: string },
) {
  billAuditLogs.unshift({
    id: Date.now().toString(),
    billId,
    action,
    timestamp: new Date().toISOString(),
    ...source,
  })
  save()
}

export function getBillAuditLogs(id: string): BillAuditLog[] {
  return billAuditLogs.filter((l) => l.billId === id)
}

export function exportBillAuditCsv(logs: BillAuditLog[], filename: string) {
  const header = 'timestamp,action,ip,device,role\n'
  const rows = logs
    .map((l) => `${l.timestamp},${l.action},${l.ip},${l.device},${l.role}`)
    .join('\n')
  const blob = new Blob([header + rows], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
