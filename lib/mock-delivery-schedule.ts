export interface DeliveryScheduleEntry {
  date: string
  note: string
}

export const mockDeliverySchedule: Record<string, DeliveryScheduleEntry> = {}
const STORAGE_KEY = 'mockDeliverySchedule'

export function loadDeliverySchedule() {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const data = JSON.parse(raw) as Record<string, DeliveryScheduleEntry>
        Object.assign(mockDeliverySchedule, data)
      } catch {}
    }
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockDeliverySchedule))
  }
}

export function setDeliverySchedule(orderId: string, date: string, note: string) {
  mockDeliverySchedule[orderId] = { date, note }
  save()
}

export function resetDeliverySchedule() {
  for (const k in mockDeliverySchedule) {
    // eslint-disable-next-line no-prototype-builtins
    if (Object.prototype.hasOwnProperty.call(mockDeliverySchedule, k)) {
      delete mockDeliverySchedule[k]
    }
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}
