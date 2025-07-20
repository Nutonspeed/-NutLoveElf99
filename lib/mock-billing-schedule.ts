export interface BillingSchedule {
  id: string
  name: string
  rule: 'daily' | 'weekly' | 'monthly'
  items: string
  nextRun: string
  lastRun?: string
}

const KEY = 'billing_schedules'
export let billingSchedules: BillingSchedule[] = []

export function loadBillingSchedules() {
  if (typeof window !== 'undefined') {
    const s = localStorage.getItem(KEY)
    if (s) billingSchedules = JSON.parse(s)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(billingSchedules))
  }
}

export function addBillingSchedule(data: Omit<BillingSchedule, 'id' | 'nextRun' | 'lastRun'> & { start: string }) {
  const sched: BillingSchedule = {
    id: Date.now().toString(),
    name: data.name,
    rule: data.rule,
    items: data.items,
    nextRun: data.start,
  }
  billingSchedules.push(sched)
  save()
  return sched
}

import { createBill } from './mock-bills'

function advanceDate(date: Date, rule: BillingSchedule['rule']) {
  if (rule === 'daily') date.setDate(date.getDate() + 1)
  if (rule === 'weekly') date.setDate(date.getDate() + 7)
  if (rule === 'monthly') date.setMonth(date.getMonth() + 1)
}

export function runBillingSchedules() {
  loadBillingSchedules()
  const now = new Date()
  billingSchedules.forEach(s => {
    if (new Date(s.nextRun) <= now) {
      createBill('AUTO-' + s.id)
      s.lastRun = new Date().toISOString()
      const next = new Date(s.nextRun)
      advanceDate(next, s.rule)
      s.nextRun = next.toISOString()
    }
  })
  save()
}
