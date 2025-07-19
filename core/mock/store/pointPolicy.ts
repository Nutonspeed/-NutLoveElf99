import { loadFromStorage, saveToStorage } from './persist'
import type { PointLog } from '@/lib/mock-customers'
import type { Customer } from '@/lib/mock-customers'

const KEY = 'mockStore_pointPolicy'

let expiryDays: number = loadFromStorage<number>(KEY, 365)

function persist() {
  saveToStorage(KEY, expiryDays)
}

export function getPointExpiry() {
  return expiryDays
}

export function setPointExpiry(days: number) {
  expiryDays = days
  persist()
}

export function resetPointPolicy() {
  expiryDays = 365
  persist()
}

export function pointsAboutToExpire(customer: Customer) {
  if (!customer.pointHistory) return 0
  const ms = expiryDays * 24 * 60 * 60 * 1000
  const now = Date.now()
  // warn if expiring within next 7 days
  return customer.pointHistory
    .filter(p => p.change > 0 && now - new Date(p.timestamp).getTime() >= ms - 7*24*60*60*1000 && now - new Date(p.timestamp).getTime() < ms)
    .reduce((sum, p) => sum + p.change, 0)
}

export function removeExpiredPoints(customer: Customer) {
  if (!customer.pointHistory) return
  const ms = expiryDays * 24 * 60 * 60 * 1000
  const now = Date.now()
  const valid = customer.pointHistory.filter(p => now - new Date(p.timestamp).getTime() < ms)
  const expiredTotal = customer.pointHistory.filter(p => p.change > 0 && now - new Date(p.timestamp).getTime() >= ms).reduce((s,p)=>s+p.change,0)
  customer.pointHistory = valid
  customer.points = Math.max((customer.points || 0) - expiredTotal, 0)
}
