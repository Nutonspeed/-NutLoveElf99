export interface BillingRule {
  id: string
  name: string
  totalOver?: number
  hasCoupon?: boolean
  time?: string
  active: boolean
}

export interface BillingLog {
  id: string
  time: string
  ruleId: string
  status: string
}

const RULES_KEY = 'billing_rules'
const LOGS_KEY = 'billing_logs'

export let billingRules: BillingRule[] = []
export let billingLogs: BillingLog[] = []

export function loadBillingAutomation() {
  if (typeof window !== 'undefined') {
    const r = localStorage.getItem(RULES_KEY)
    if (r) billingRules = JSON.parse(r)
    const l = localStorage.getItem(LOGS_KEY)
    if (l) billingLogs = JSON.parse(l)
  }
}

function saveRules() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(RULES_KEY, JSON.stringify(billingRules))
  }
}

function saveLogs() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOGS_KEY, JSON.stringify(billingLogs))
  }
}

export function addBillingRule(rule: BillingRule) {
  billingRules.push(rule)
  saveRules()
}

import { mockOrders } from './mock-orders'
import { createBill } from './mock-bills'

function matches(rule: BillingRule, order: any) {
  if (rule.totalOver && order.total <= rule.totalOver) return false
  if (rule.hasCoupon && !order.note?.includes('coupon')) return false
  return true
}

function triggerWebhook(orderId: string) {
  console.log('mock webhook for order', orderId)
}

export function runBillingAutomation() {
  loadBillingAutomation()
  billingRules.filter(r => r.active).forEach(rule => {
    const orders = mockOrders.filter(o => matches(rule, o))
    orders.forEach(o => {
      createBill(o.id)
      triggerWebhook(o.id)
      billingLogs.push({
        id: Date.now().toString(),
        time: new Date().toISOString(),
        ruleId: rule.id,
        status: 'created',
      })
    })
  })
  saveLogs()
}

export function clearBillingLogs() {
  billingLogs = []
  saveLogs()
}
