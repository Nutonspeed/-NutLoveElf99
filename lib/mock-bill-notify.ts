export interface BillNotifyOption {
  message: string
  line?: boolean
  email?: boolean
  inApp?: boolean
}

export type BillNotifySettings = Record<string, BillNotifyOption>

export interface BillNotifyStatus {
  status: 'sent' | 'failed'
  time: string
}

export let billNotifySettings: BillNotifySettings = {}
export const billNotifyLog: Record<string, BillNotifyStatus> = {}

const SETTINGS_KEY = 'billNotifySettings'
const LOG_KEY = 'billNotifyLog'

export function loadBillNotifySettings() {
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem(SETTINGS_KEY)
    if (s) billNotifySettings = JSON.parse(s)
  }
}

function saveBillNotifySettings() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(billNotifySettings))
  }
}

export function setBillNotifySettings(s: BillNotifySettings) {
  billNotifySettings = s
  saveBillNotifySettings()
}

export function loadBillNotifyLog() {
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem(LOG_KEY)
    if (s) {
      const obj = JSON.parse(s) as Record<string, BillNotifyStatus>
      Object.assign(billNotifyLog, obj)
    }
  }
}

function saveBillNotifyLog() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOG_KEY, JSON.stringify(billNotifyLog))
  }
}

export async function sendBillNotify(id: string): Promise<boolean> {
  const success = Math.random() > 0.1
  billNotifyLog[id] = { status: success ? 'sent' : 'failed', time: new Date().toISOString() }
  saveBillNotifyLog()
  console.log('mock send bill notify', id, billNotifySettings[id])
  return success
}

export function getBillNotifyStatus(id: string): BillNotifyStatus | undefined {
  return billNotifyLog[id]
}

export function validateBillNotifySettings(obj: any): obj is BillNotifySettings {
  if (typeof obj !== 'object' || obj === null) return false
  for (const key in obj) {
    const val = obj[key]
    if (typeof val !== 'object' || typeof val.message !== 'string') return false
    if (val.line !== undefined && typeof val.line !== 'boolean') return false
    if (val.email !== undefined && typeof val.email !== 'boolean') return false
    if (val.inApp !== undefined && typeof val.inApp !== 'boolean') return false
  }
  return true
}

export type BillNotifyStatusType = 'dueSoon' | 'overdue' | 'paid'
export type BillNotifyChannel = 'email' | 'line' | 'inApp'

export interface BillNotifyHistoryEntry {
  id: string
  billId: string
  status: BillNotifyStatusType
  channel: BillNotifyChannel
  message: string
  timestamp: string
}

export const billNotifyTemplates: Record<BillNotifyStatusType, string> = {
  dueSoon: 'บิล {{billId}} ใกล้ครบกำหนด',
  overdue: 'บิล {{billId}} เลยกำหนด',
  paid: 'บิล {{billId}} ชำระแล้ว',
}

export const billNotifyHistory: BillNotifyHistoryEntry[] = []

const TEMPLATE_KEY = 'billNotifyTemplates'
const HISTORY_KEY = 'billNotifyHistory'

function saveTemplates() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(billNotifyTemplates))
  }
}

function saveHistory() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(billNotifyHistory))
  }
}

export function loadBillNotifyData() {
  loadBillNotifySettings()
  loadBillNotifyLog()
  if (typeof window !== 'undefined') {
    const t = localStorage.getItem(TEMPLATE_KEY)
    if (t) {
      const obj = JSON.parse(t) as Record<BillNotifyStatusType, string>
      Object.assign(billNotifyTemplates, obj)
    }
    const h = localStorage.getItem(HISTORY_KEY)
    if (h) {
      const arr = JSON.parse(h) as BillNotifyHistoryEntry[]
      billNotifyHistory.splice(0, billNotifyHistory.length, ...arr)
    }
  }
}

export function setChannel(
  status: BillNotifyStatusType,
  channel: BillNotifyChannel,
  value: boolean,
) {
  if (!billNotifySettings[status]) billNotifySettings[status] = { message: '' }
  ;(billNotifySettings[status] as any)[channel] = value
  saveBillNotifySettings()
}

export function setTemplate(status: BillNotifyStatusType, value: string) {
  billNotifyTemplates[status] = value
  saveTemplates()
}

export function sendPreview(id: string, status: BillNotifyStatusType) {
  const channels: BillNotifyChannel[] = ['email', 'line', 'inApp']
  const template = billNotifyTemplates[status] || ''
  channels.forEach((ch) => {
    if (billNotifySettings[status]?.[ch]) {
      const message = template.replace(/\{\{billId\}\}/g, id)
      billNotifyHistory.unshift({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        billId: id,
        status,
        channel: ch,
        message,
        timestamp: new Date().toISOString(),
      })
    }
  })
  saveHistory()
}
