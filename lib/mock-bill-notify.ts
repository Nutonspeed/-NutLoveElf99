export interface BillNotifyOption {
  message: string
  line?: boolean
  email?: boolean
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
  }
  return true
}
