export type BillNotifyStatus = 'dueSoon' | 'overdue' | 'paid'
export type BillNotifyChannel = 'email' | 'line' | 'inApp'

export interface BillNotifySettings {
  [key in BillNotifyStatus]: { email: boolean; line: boolean; inApp: boolean }
}

export interface BillNotifyTemplates {
  dueSoon: string
  overdue: string
  paid: string
}

export interface BillNotifyHistoryItem {
  id: string
  billId: string
  status: BillNotifyStatus
  channel: BillNotifyChannel
  message: string
  timestamp: string
}

const SETTINGS_KEY = 'billNotifySettings'
const TEMPLATE_KEY = 'billNotifyTemplates'
const HISTORY_KEY = 'billNotifyHistory'

export let billNotifySettings: BillNotifySettings = {
  dueSoon: { email: true, line: true, inApp: true },
  overdue: { email: true, line: true, inApp: true },
  paid: { email: true, line: false, inApp: true },
}

export let billNotifyTemplates: BillNotifyTemplates = {
  dueSoon: 'บิล {{billId}} กำลังจะครบกำหนดชำระ',
  overdue: 'บิล {{billId}} เลยกำหนดชำระ',
  paid: 'บิล {{billId}} ชำระเรียบร้อยแล้ว',
}

export let billNotifyHistory: BillNotifyHistoryItem[] = []

export function loadBillNotifyData() {
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem(SETTINGS_KEY)
    if (s) billNotifySettings = JSON.parse(s)
    const t = localStorage.getItem(TEMPLATE_KEY)
    if (t) billNotifyTemplates = JSON.parse(t)
    const h = localStorage.getItem(HISTORY_KEY)
    if (h) billNotifyHistory = JSON.parse(h)
  }
}

function saveSettings() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(billNotifySettings))
  }
}

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

export function setChannel(status: BillNotifyStatus, channel: BillNotifyChannel, value: boolean) {
  billNotifySettings[status][channel] = value
  saveSettings()
}

export function setTemplate(status: BillNotifyStatus, message: string) {
  billNotifyTemplates[status] = message
  saveTemplates()
}

export function addHistory(
  billId: string,
  status: BillNotifyStatus,
  channel: BillNotifyChannel,
  message: string,
) {
  billNotifyHistory.unshift({
    id: Date.now().toString(),
    billId,
    status,
    channel,
    message,
    timestamp: new Date().toISOString(),
  })
  saveHistory()
}

export function getHistory(billId: string) {
  return billNotifyHistory.filter((h) => h.billId === billId)
}

export function sendPreview(billId: string, status: BillNotifyStatus) {
  const msg = billNotifyTemplates[status].replace(/{{billId}}/g, billId)
  ;(['email', 'line', 'inApp'] as BillNotifyChannel[]).forEach((ch) => {
    if (billNotifySettings[status][ch]) {
      addHistory(billId, status, ch, msg)
    }
  })
}
