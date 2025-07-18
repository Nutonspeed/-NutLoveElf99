export interface BillLogEntry {
  id: string
  openedAt: string
  ref: string
  status: string
  note?: string
}

export let billLogs: BillLogEntry[] = []

export function loadBillLogs() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('billLogs')
    if (stored) billLogs = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('billLogs', JSON.stringify(billLogs))
  }
}

export function addBillLog(ref: string, status: string, note: string = ''): BillLogEntry {
  const entry: BillLogEntry = {
    id: Date.now().toString(),
    openedAt: new Date().toISOString(),
    ref,
    status,
    note,
  }
  billLogs = [entry, ...billLogs]
  save()
  return entry
}

export function listBillLogs(): BillLogEntry[] {
  return billLogs
}
